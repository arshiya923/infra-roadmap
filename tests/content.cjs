const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const inventory=JSON.parse(read('content/roadmap-inventory.json')),manifest=JSON.parse(read('content/enrichment.json'));
const ctx={window:{}};vm.createContext(ctx);for(const f of fs.readdirSync(path.join(root,'content')).filter(x=>/^batch-\d+\.js$/.test(x)))vm.runInContext(read('content/'+f),ctx);vm.runInContext(read('content/catalog.js'),ctx);
const additions=JSON.parse(read('content/expansion-inventory.json')).nodes;
const originalIds=new Set(inventory.nodes.map(n=>n.id)),ids=new Set([...originalIds,...additions.map(n=>n.id)]);
const accepted=[...manifest.completedNodeIds,...(manifest.completedExpansionNodeIds||[])];
const lessons=Object.values(ctx.window.INFRA_BATCHES).flat();
assert.equal(originalIds.size,442);assert.equal(inventory.groups.length,69);
assert.equal(ids.size,442+additions.length);assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
assert(manifest.completedNodeIds.every(id=>originalIds.has(id)));assert((manifest.completedExpansionNodeIds||[]).every(id=>additions.some(n=>n.id===id)));
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'original/index.html'))).digest('hex'),inventory.sha256);
const assigned=manifest.batches.flatMap(b=>b.nodeIds);assert.equal(assigned.length,ids.size);assert.equal(new Set(assigned).size,ids.size);assert(assigned.every(id=>ids.has(id)));
assert.equal(new Set(accepted).size,accepted.length);
assert.equal(lessons.length,accepted.length+manifest.batches.reduce((n,b)=>n+(b.draftNodeIds||[]).filter(id=>!accepted.includes(id)).length,0));const questionIds=new Set();
for(const l of lessons){
 assert(ids.has(l.id));assert.equal(l.exams.length,10);assert.equal(l.quick.length,3);
 assert(l.title?.length>0);
 assert(l.glossary&&typeof l.glossary==='object'&&!Array.isArray(l.glossary),`${l.id}: glossary must map terms to definitions`);
 for(const k of ['definition','purpose','mental','example','configuration','production','security','performance'])assert(l[k]?.length>20,`${l.id}: ${k}`);
 for(const k of ['components','mechanism','flow','commands','troubleshooting','mistakes','sources'])assert(l[k]?.length>0,`${l.id}: ${k}`);
 for(const id of [...l.prerequisites,...l.related])assert(ids.has(id),`${l.id} broken reference ${id}`);
 for(const q of [...l.quick,...l.exams]){assert(!questionIds.has(q.questionId));questionIds.add(q.questionId);assert.equal(q.topicId,l.id);for(const k of ['question','answer','explanation','testedConcept','difficulty'])assert(q[k]);if(q.options)assert(q.options.includes(q.answer));}
 for(const k of ['objective','requirements','topology','steps','verification','troubleshooting','challenge','cleanup'])assert(l.lab[k]?.length);
 for(const s of l.sources){assert(/^https:\/\//.test(s.url));assert(s.checked);}
 for(const a of l.artifacts||[]){assert(a.title);assert(/^labs\/[a-z0-9-]+\.(sh|py|pcap|md)$/.test(a.path));assert(fs.existsSync(path.join(root,a.path)));}
 const entry=ctx.window.INFRA_CATALOG.find(n=>n.id===l.id);assert.equal(entry.batch,l.batch);assert(entry.searchTerms.length);assert(entry.batchTitle);assert(entry.lessonNumber>0);
}
for(const id of accepted)assert(lessons.some(l=>l.id===id),'Completed node lacks authored lesson');
for(const entry of ctx.window.INFRA_CATALOG)assert.equal(entry.complete,accepted.includes(entry.id),'Stale editorial status: '+entry.id);
assert.deepEqual([...ctx.window.INFRA_CATALOG.map(n=>n.id)].sort(),[...ids].sort());
console.log(JSON.stringify({result:'PASS',originalNodes:442,expansionNodes:additions.length,acceptedExpansionNodes:(manifest.completedExpansionNodeIds||[]).length,groups:69,lessons:lessons.length,examQuestions:lessons.reduce((n,l)=>n+l.exams.length,0),quickChecks:lessons.reduce((n,l)=>n+l.quick.length,0),labs:lessons.length,sourceHash:inventory.sha256,batches:manifest.batches.length},null,2));
