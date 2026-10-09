"""Publish only after current content, questions, browser and primary review evidence."""
from pathlib import Path
import hashlib,json,subprocess,sys
R=Path(__file__).resolve().parents[1];batch=sys.argv[1];assert batch in ('17','18')
read=lambda p:json.loads((R/p).read_text(encoding='utf-8'))
def write(p,x):(R/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def digest(x):return hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
m=read('content/enrichment.json');bm=next(b for b in m['batches'] if b['id']==batch)
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));ls=bundles[batch];assert set(bm['nodeIds'])=={l['id'] for l in ls}
for dep in bm['dependencies']:assert next(b for b in m['batches'] if b['id']==dep)['status']=='completed'
primary=read(f'docs/cisco-dc-primary-review-{batch}.json');browser=read(f'docs/browser-cisco-dc-{batch}-results.json');audit=read('docs/quality-audit-latest.json');models=read('docs/cisco-dc-model-results.json')
for r in (primary,browser,audit,models):assert r['result']=='PASS'
assert browser['topics']==len(ls);assert audit['lessons']==sum(len(x) for x in bundles.values())
for l in ls:
 t=next(t for t in primary['topics'] if t['id']==l['id']);assert t['sha256']==digest(l)
 assert len(t['questions'])==13
 for q in l['exams']+l['quick']:assert t['questions'][q['questionId']]==digest(q)
assert hashlib.sha256((R/'original/index.html').read_bytes()).hexdigest()==read('content/roadmap-inventory.json')['sha256']
if batch=='18':assert read('docs/cisco-dc-fabric-results.json')['result']=='PASS'
for id in bm['nodeIds']:
 if id not in m['completedNodeIds']:m['completedNodeIds'].append(id)
bm.update(status='completed',acceptedDate='2026-10-09',acceptanceEvidence=f'docs/acceptance-batch-{batch}.json');bm.pop('draftNodeIds',None)
m.update(reviewedDate='2026-10-09',currentBatch='18' if batch=='17' else '19',nextNode='s7-g5-t0' if batch=='17' else 's8-g0-t0')
write('content/enrichment.json',m)
template=read('docs/acceptance-batch-16.json');evidence=[f'docs/cisco-dc-primary-review-{batch}.json',f'docs/browser-cisco-dc-{batch}-results.json','docs/cisco-dc-model-results.json',f'docs/quality-audit-batch-{batch}.json','docs/research-cisco-dc.md',f'labs/cisco-dc-{batch}-workbook.md']
write(f'docs/acceptance-batch-{batch}.json',dict(date='2026-10-09',result='PASS',reviewer='Primary assistant; direct implementation authorized by user',topicCriteria=[dict(number=c['number'],requirement=c['requirement'],evidence=evidence) for c in template['topicCriteria']],batchGates=[dict(number=c['number'],requirement=c['requirement'],result='PASS',evidence=evidence) for c in template['batchGates']],topics=[dict(id=l['id'],result='PASS',contentHash=digest(l),exams=10,quick=3) for l in ls],courseAccepted=len(m['completedNodeIds']),limits=primary['limits']))
write(f'docs/quality-audit-batch-{batch}.json',audit)
for p in ['tools/catalog.py','tools/progress.py']:subprocess.run(['python',p],cwd=R,check=True)
print('Accepted batch',batch,'with',len(ls),'lessons;',len(m['completedNodeIds']),'total; next',m['nextNode'])
