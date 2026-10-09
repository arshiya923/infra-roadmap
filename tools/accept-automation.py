"""Accept one batch only after primary review and fresh passing evidence."""
from pathlib import Path
import hashlib,json,subprocess,sys
R=Path(__file__).resolve().parents[1];batch=sys.argv[1];assert batch in ('22','23','24')
read=lambda p:json.loads((R/p).read_text(encoding='utf-8'))
def write(p,x):(R/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def digest(x):return hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
m=read('content/enrichment.json');bm=next(b for b in m['batches'] if b['id']==batch)
for dep in bm['dependencies']:assert next(b for b in m['batches'] if b['id']==dep)['status']=='completed'
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));ls=bundles[batch]
assert set(bm['nodeIds'])=={l['id'] for l in ls}
primary=read(f'docs/automation-primary-review-{batch}.json')
content=read(f'docs/automation-content-{batch}-results.json');browser=read(f'docs/browser-automation-{batch}-results.json');audit=read('docs/quality-audit-latest.json');models=read('docs/automation-model-results.json')
for r in (primary,content,browser,audit,models):assert r['result']=='PASS'
assert content['sha256']==hashlib.sha256((R/f'content/batch-{batch}.js').read_bytes()).hexdigest()
assert browser['topics']==len(ls)
assert any(f'All {sum(len(x) for x in bundles.values())} authored routes' in x for x in audit['checks'])
for l in ls:
 t=next(t for t in primary['topics'] if t['id']==l['id']);assert t['sha256']==digest(l)
 assert t['questions']=={q['questionId']:digest(q) for q in l['exams']+l['quick']}
for p in primary['visualSheets']:assert (R/p).is_file()
if batch=='24':assert read('docs/automation-lab-results.json')['result']=='PASS'
assert hashlib.sha256((R/'original/index.html').read_bytes()).hexdigest()==read('content/roadmap-inventory.json')['sha256']
for id in bm['nodeIds']:
 if id not in m['completedNodeIds']:m['completedNodeIds'].append(id)
bm.update(status='completed',acceptedDate='2026-10-09',acceptanceEvidence=f'docs/acceptance-batch-{batch}.json');bm.pop('draftNodeIds',None)
nextbatch=next(b for b in m['batches'] if b['id']==str(int(batch)+1));m.update(reviewedDate='2026-10-09',currentBatch=nextbatch['id'],nextNode=nextbatch['nodeIds'][0]);m['limitations'][0]=f'Batches 01–{batch} complete; {442-len(m["completedNodeIds"])} original nodes remain pending editorial acceptance.'
write('content/enrichment.json',m);write(f'docs/quality-audit-batch-{batch}.json',audit)
write(f'docs/acceptance-batch-{batch}.json',dict(result='PASS',date='2026-10-09',reviewer='Primary assistant; no GapCode or delegated work',topics=primary['topics'],visualSheets=primary['visualSheets'],evidence=[f'docs/automation-primary-review-{batch}.json',f'docs/automation-content-{batch}-results.json',f'docs/browser-automation-{batch}-results.json',f'docs/quality-audit-batch-{batch}.json','docs/automation-model-results.json'],courseAccepted=len(m['completedNodeIds']),limits=primary['limits']))
for script in ['tools/catalog.py','tools/progress.py']:subprocess.run(['python',script],cwd=R,check=True)
print('Accepted',batch,'total',len(m['completedNodeIds']),'next',m['nextNode'])
