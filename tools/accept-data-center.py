"""Publish a batch only after retained primary review and verification evidence."""
from pathlib import Path
import hashlib,json,subprocess,sys
R=Path(__file__).resolve().parents[1];batch=sys.argv[1];assert batch in ('15','16')
read=lambda p:json.loads((R/p).read_text(encoding='utf-8'))
def write(p,x):(R/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
m=read('content/enrichment.json');inv=read('content/roadmap-inventory.json');assert hashlib.sha256((R/'original/index.html').read_bytes()).hexdigest()==inv['sha256']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));ls=bundles[batch];total=sum(map(len,bundles.values()));bm=next(x for x in m['batches'] if x['id']==batch);assert set(bm['nodeIds'])=={l['id'] for l in ls}
for dep in bm['dependencies']:assert next(b for b in m['batches'] if b['id']==dep)['status']=='completed'
browser=read('docs/browser-data-center-results.json');models=read('docs/data-center-model-results.json');commands=read('docs/commands-data-center-results.json');audit=read('docs/quality-audit-latest.json');visual=read('docs/data-center-visual-review.json');primary=read('docs/data-center-primary-review.json');question=read('docs/data-center-question-review.json')
for r in [browser,models,commands,audit,visual,primary,question]:assert r['result']=='PASS'
assert audit['lessons']==total;assert {l['id'] for l in ls}<={x['id'] for x in browser['checks']};assert visual['topics']>=len(ls)
for p,h in visual['sha256'].items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==h
byId={x['id']:x for x in primary['topics']};qById={x['id']:x for x in question['questions']}
for l in ls:
 assert byId[l['id']]['sha256']==hashlib.sha256(json.dumps(l,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
 for q in l['quick']+l['exams']:assert qById[q['questionId']]['sha256']==hashlib.sha256(json.dumps(q,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
if batch=='16':
 reg=read('docs/data-center-regression-results.json');assert reg['result']=='PASS' and len(reg['results'])==9 and all(r['exit']==0 for r in reg['results']);assert read('docs/data-center-plan-results.json')['result']=='PASS'
for l in ls:
 if l['id'] not in m['completedNodeIds']:m['completedNodeIds'].append(l['id'])
bm.update(status='completed',acceptedDate='2026-10-09',acceptanceEvidence=f'docs/acceptance-batch-{batch}.json');bm.pop('draftNodeIds',None);m.update(reviewedDate='2026-10-09',currentBatch='16' if batch=='15' else '17',nextNode='s6-g3-t0' if batch=='15' else 's7-g0-t0');write('content/enrichment.json',m)
evidence=['docs/data-center-primary-review.json','docs/data-center-question-review.json','docs/data-center-visual-review.json','docs/browser-data-center-results.json','docs/data-center-model-results.json','docs/commands-data-center-results.json',f'docs/quality-audit-batch-{batch}.json','labs/data-center-workbook.md']
template=read('docs/acceptance-batch-07.json');criteria=[dict(number=c['number'],requirement=c['requirement'],evidence=evidence) for c in template['topicCriteria']];gates=[dict(number=g['number'],requirement=g['requirement'],result='PASS',evidence=evidence) for g in template['batchGates']]
write(f'docs/acceptance-batch-{batch}.json',dict(date='2026-10-09',result='PASS',reviewer='Primary assistant',topicCriteria=criteria,batchGates=gates,topics=[dict(id=l['id'],result='PASS',contentHash=byId[l['id']]['sha256'],criteria=list(range(1,23)),exams=10,quick=3) for l in ls],courseAccepted=len(m['completedNodeIds']),limits=['All browser worksheets are supplied-input calculations, not observed hardware, electrical or thermal behavior.','Read-only observations run in WSL guest context; physical inventory, RAID operations and BMC sessions remain guided.','Three-rack artifact rehearsal validates offline declared design, not a physical or electrical installation.','No full WCAG, vendor interoperability, workload throughput or facility compliance certification.']))
write(f'docs/quality-audit-batch-{batch}.json',audit)
for p in ['tools/catalog.py','tools/progress.py']:subprocess.run(['python',p],cwd=R,check=True)
print(f'Accepted Batch {batch}: {len(ls)} topics; {len(m["completedNodeIds"])}/442; next {m["nextNode"]}.')
