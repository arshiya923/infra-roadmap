const fs=require('fs'),cp=require('child_process'),crypto=require('crypto'),assert=require('assert/strict');
const lessons=JSON.parse(cp.execFileSync('node',['tools/read-content.cjs'],{maxBuffer:30e6}))['26'];
const m=JSON.parse(fs.readFileSync('content/enrichment.json')),b=m.batches.find(b=>b.id==='26');
assert.deepEqual(lessons.map(l=>l.id),b.nodeIds);assert.equal(lessons.length,20);
const commands=new Map(),topics=[];
for(const l of lessons){
 assert.equal(l.batch,'26');assert.equal(l.exams.length,10);assert.equal(l.quick.length,3);assert.equal(new Set(l.exams.map(q=>q.question)).size,10);
 assert(l.example.startsWith('Authored incident:'));assert(l.lab.steps.some(s=>s.includes('Close this specific incident')));
 assert(l.prerequisites.every(id=>m.completedNodeIds.includes(id)));assert.equal(l.artifacts[0].path,'labs/physical-hardware-workbook.md');
 for(const c of l.commands)commands.set(c.code,c);
 for(const q of [...l.exams,...l.quick]){assert.equal(q.topicId,l.id);assert(q.questionId.startsWith(l.id+'-'));if(q.options)assert.equal(q.options.filter(o=>o===q.answer).length,1);}
 if(l.storageVirtualization){assert.equal(l.interactive,'sv-'+l.id);assert(l.example.includes(l.storageVirtualization.fault));}
 topics.push({id:l.id,foundation:l.prerequisites[0],sha256:crypto.createHash('sha256').update(JSON.stringify(l)).digest('hex'),questions:13});
}
const commandEvidence=[];
for(const code of commands.keys()){
 if(code==='show zoneset active'){assert(commands.get(code).platform.includes('guided and unexecuted'));commandEvidence.push({code,result:'GUIDED_UNEXECUTED',scope:'Cisco MDS 9.x reference only; no target available'});continue;}
 let program,args;
 if(code==='lscpu'){program='wsl';args=['-d','Ubuntu-24.04','--','lscpu'];}
 else if(code==='sha256sum labs/data-center-workbook.md'){program='wsl';args=['-d','Ubuntu-24.04','--','sha256sum','labs/data-center-workbook.md'];}
 else if(/^python labs\/storage-evidence\.py --topic s8-g[02]-t\d+$/.test(code)){program='python';args=code.split(' ').slice(1);}
 else throw Error('Unreviewed command: '+code);
 const output=cp.execFileSync(program,args,{encoding:'utf8',timeout:30000});assert(output.trim());
 commandEvidence.push({code,result:'PASS',scope:code==='lscpu'?'WSL virtual CPU observation; no server identity verification':code.startsWith('sha256sum')?'Local workbook digest only':'Authored foundation scenario, not captured hardware output',output});
}
const result={result:'PASS',topics,commandEvidence,bundleSha256:crypto.createHash('sha256').update(fs.readFileSync('content/batch-26.js')).digest('hex')};
fs.writeFileSync('docs/physical-hardware-content-results.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({result:'PASS',topics:topics.length,questions:260,commands:commands.size}));
