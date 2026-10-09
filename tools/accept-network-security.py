"""Record the primary assistant's explicit review; does not conduct that review."""
from pathlib import Path
import hashlib,json,subprocess,sys
R=Path(__file__).resolve().parents[1];batch=sys.argv[1];assert batch in ('13','14')
read=lambda p:json.loads((R/p).read_text(encoding='utf-8'))
def write(p,x):(R/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
m=read('content/enrichment.json');inv=read('content/roadmap-inventory.json');assert hashlib.sha256((R/'original/index.html').read_bytes()).hexdigest()==inv['sha256']
reg=read('docs/network-security-regression-results.json');assert reg['result']=='PASS' and all(r['exit']==0 for r in reg['results']) and len(reg['results'])>=8
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));lessons=bundles[batch];total=sum(len(ls) for ls in bundles.values())
browser=read('docs/browser-network-security-results.json');assert browser['result']=='PASS' and {l['id'] for l in lessons}<={x['id'] for x in browser['checks']}
assert read('docs/network-security-model-results.json')['result']=='PASS';assert read('docs/commands-network-security-results.json')['result']=='PASS';audit=read('docs/quality-audit-latest.json');assert audit['result']=='PASS' and audit['lessons']==total
if batch=='14':assert next(b for b in m['batches'] if b['id']=='13')['status']=='completed'
bm=next(b for b in m['batches'] if b['id']==batch);assert {l['id'] for l in lessons}==set(bm['nodeIds'])
review=read('docs/network-security-primary-review.json');byId={x['id']:x for x in review['topics']};assert all(byId[l['id']]['result']=='PASS' and byId[l['id']]['sha256']==hashlib.sha256(json.dumps(l,ensure_ascii=False,sort_keys=True).encode()).hexdigest() for l in lessons)
questions=read('docs/network-security-question-review.json');assert all(x['result']=='PASS' for x in questions['questions']);assert {q['questionId'] for l in lessons for q in l['quick']+l['exams']}<={x['id'] for x in questions['questions']}
assert (R/'docs/network-security-visual-review.json').exists()
for l in lessons:
 if l['id'] not in m['completedNodeIds']:m['completedNodeIds'].append(l['id'])
bm.update(status='completed',acceptedDate='2026-10-09',acceptanceEvidence=f'docs/acceptance-batch-{batch}.json');bm.pop('draftNodeIds',None)
m['reviewedDate']='2026-10-09';m['currentBatch']='14' if batch=='13' else '15';m['nextNode']='s5-g4-t0' if batch=='13' else 's6-g0-t0'
write('content/enrichment.json',m);write(f'docs/quality-audit-batch-{batch}.json',audit)
limits=['Worksheets calculate or trace supplied inputs; no device or protocol execution is inferred.','Target switch/router/ASA/FTD/ISE configuration, VPN negotiation and physical forwarding remain guided/unexecuted.','Read-only WSL inspection and, when available, owned application loopback evidence retain separate scopes.','No production deployment, hardware capacity, vendor parser certification or full WCAG certification is claimed.']
write(f'docs/acceptance-batch-{batch}.json',dict(date='2026-10-09',result='PASS',reviewer='Primary assistant',topics=[dict(id=l['id'],result='PASS',exams=10,quick=3,contentHash=byId[l['id']]['sha256']) for l in lessons],courseAccepted=len(m['completedNodeIds']),evidence=['docs/network-security-regression-results.json','docs/network-security-primary-review.json','docs/network-security-question-review.json','docs/network-security-visual-review.json',f'docs/quality-audit-batch-{batch}.json'],limits=limits))
for p in ['tools/catalog.py','tools/progress.py']:subprocess.run(['python',p],cwd=R,check=True)
print(f'Accepted Batch {batch}: {len(lessons)} units; course {len(m["completedNodeIds"])}/442; next {m["nextNode"]}.')
