// Primary acceptance gate; preserve concurrent work in every other batch.
const fs=require('fs'),cp=require('child_process'),crypto=require('crypto'),assert=require('assert/strict');
const read=p=>JSON.parse(fs.readFileSync(p)),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const content=read('docs/physical-hardware-content-results.json'),browser=read('docs/browser-physical-hardware-results.json'),audit=read('docs/quality-audit-latest.json');
for(const r of [content,browser,audit])assert.equal(r.result,'PASS');assert.equal(browser.topics,20);
assert.equal(content.bundleSha256,crypto.createHash('sha256').update(fs.readFileSync('content/batch-26.js')).digest('hex'));
assert.equal(read('docs/physical-hardware-primary-review.json').result,'PASS');
for(let n=1;n<=5;n++)assert(fs.existsSync('docs/screenshots/physical-hardware/batch-26-review-'+n+'.jpg'));
const m=read('content/enrichment.json'),b=m.batches.find(b=>b.id==='26');
for(const id of b.nodeIds)if(!m.completedNodeIds.includes(id))m.completedNodeIds.push(id);
b.status='completed';delete b.draftNodeIds;b.acceptedDate='2026-10-09';b.acceptanceEvidence='docs/acceptance-batch-26.json';
// Preserve planned predecessor dependency as history; scope exception is explicit.
m.reviewedDate='2026-10-09';
const next=m.batches.find(x=>x.nodeIds.some(id=>!id.startsWith('ADD-')&&!m.completedNodeIds.includes(id)));
if(next){m.currentBatch=next.id;m.nextNode=next.nodeIds.find(id=>!m.completedNodeIds.includes(id));}
m.limitations[0]=m.completedNodeIds.length+' original nodes accepted; '+(442-m.completedNodeIds.length)+' remain pending. Consult per-batch status; Physical Hardware was completed at user request out of sequence.';
const limit='Physical Hardware accepted within reused foundation-model, authored incident, guided tabletop and local read-only scopes; physical/vendor operations remain unexecuted.';
if(!m.limitations.includes(limit))m.limitations.push(limit);
write('content/enrichment.json',m);
write('docs/acceptance-batch-26.json',{result:'PASS',date:'2026-10-09',reviewer:'Primary assistant; no GapCode',topics:content.topics,bundleSha256:content.bundleSha256,evidence:['docs/physical-hardware-primary-review.json','docs/physical-hardware-content-results.json','docs/browser-physical-hardware-results.json','docs/quality-audit-batch-26.json','docs/validation-batch-26.md'],limits:limit});
fs.copyFileSync('docs/quality-audit-latest.json','docs/quality-audit-batch-26.json');
for(const script of ['tools/catalog.py','tools/progress.py'])cp.execFileSync('python',[script],{stdio:'inherit'});
console.log('Accepted Physical Hardware: 20/20; course accepted '+m.completedNodeIds.length+'/442.');
