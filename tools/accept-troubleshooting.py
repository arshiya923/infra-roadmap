"""Promote only Batch 27 after primary review and current artifact verification."""
import hashlib
import json
import subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
read=lambda p:json.loads((R/p).read_text(encoding='utf-8'))
digest=lambda p:hashlib.sha256((R/p).read_bytes()).hexdigest()
browser=read('docs/browser-troubleshooting-mastery-results.json')
lab=read('docs/troubleshooting-lab-results.json')
audit=read('docs/quality-audit-latest.json')
assert browser['result']=='PASS' and browser['topics']==21 and not browser['errors']
assert browser['batchSHA256']==digest('content/batch-27.js'), 'Browser evidence is stale'
assert lab['result']=='PASS' and lab['standaloneTopics']==21
assert lab['labSHA256']==digest('labs/troubleshooting-lab.py'), 'Lab evidence is stale'
assert audit['result']=='PASS'
assert digest('original/index.html')==read('content/roadmap-inventory.json')['sha256']
assert (R/'docs/validation-batch-27.md').is_file()
lessons=json.loads(subprocess.check_output(['node',str(R/'tools/read-content.cjs')],encoding='utf-8'))['27']
expected=[f'trouble-{i}' for i in range(21)]
assert [l['id'] for l in lessons]==expected
assert all(len(l['exams'])==10 and len(l['quick'])==3 and len(l['flow'])==4 for l in lessons)
report=dict(result='PASS',date='2026-10-09',reviewer='Primary assistant, direct authoring and review; no GapCode',
    scope='Teaching, 21 synthetic incident cases, 273 self-assessed questions, reader behavior and actual local-file recovery only',
    batchSHA256=digest('content/batch-27.js'),labSHA256=digest('labs/troubleshooting-lab.py'),
    topicReview=[dict(id=l['id'],boundary=l['incident']['boundary'],result='PASS',
                     checked=['technical distinction and competing hypothesis','bounded test and repair','recovery and rollback','10 exam answers and 3 quick checks','4-step flow and static alternative','platform/synthetic limits']) for l in lessons],
    originalMethodSteps=8,sources='See troubleshooting-source-checks.json and validation-batch-27.md for direct-client access limits',
    evidence=['browser-troubleshooting-mastery-results.json','troubleshooting-lab-results.json','quality-audit-latest.json','validation-batch-27.md'])
(R/'docs/acceptance-batch-27.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
manifest_path=R/'content/enrichment.json'
m=json.loads(manifest_path.read_text(encoding='utf-8'))
b=next(b for b in m['batches'] if b['id']=='27')
assert b['nodeIds']==expected
b.update(status='completed',draftNodeIds=[],acceptedDate='2026-10-09',acceptanceEvidence='docs/acceptance-batch-27.json')
for id in expected:
    if id not in m['completedNodeIds']:m['completedNodeIds'].append(id)
m['reviewedDate']='2026-10-09'
manifest_path.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Accepted only the 21 Batch 27 IDs; preserved other batch states and continuation pointers.')
