"""Accept only reviewed Batch 25; preserve concurrent section state."""
import hashlib,json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def read(p):return json.loads((R/p).read_text(encoding='utf-8'))
def write(p,x):(R/p).write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def sha(p):return hashlib.sha256((R/p).read_bytes()).hexdigest()
primary=read('docs/device-primary-review.json')
assert primary['result']=='PASS'
assert primary['bundleSha256']==sha('content/batch-25.js')
for p,h in primary['implementationHashes'].items():assert sha(p)==h,p
for p in primary['visualSheets']:assert (R/p).exists()
browser=read('docs/browser-devices-results.json');model=read('docs/device-mastery-results.json');audit=read('docs/quality-audit-devices.json')
assert browser['result']==model['result']==audit['result']=='PASS'
assert browser['topics']==17 and model['checks']==508
assert audit['lessons']>=400
subprocess.run(['node','tests/content.cjs'],cwd=R,check=True)
assert sha('original/index.html')==read('content/roadmap-inventory.json')['sha256']
m=read('content/enrichment.json');b=next(x for x in m['batches'] if x['id']=='25')
assert next(x for x in m['batches'] if x['id']=='24')['status']=='completed'
assert b['nodeIds']==['device-'+str(i) for i in range(17)]
for id in b['nodeIds']:
 if id not in m['completedNodeIds']:m['completedNodeIds'].append(id)
b.update(status='completed',acceptedDate='2026-10-09',acceptanceEvidence='docs/acceptance-batch-25.json');b.pop('draftNodeIds',None)
pending=next((x for x in m['batches'] if x['status']!='completed'),None)
if pending:m.update(currentBatch=pending['id'],nextNode=next((x for x in pending['nodeIds'] if x not in m['completedNodeIds']),pending['nodeIds'][0]))
m['reviewedDate']='2026-10-09'
m['limitations'][0]=f'{len(m["completedNodeIds"])}/442 original nodes accepted; {442-len(m["completedNodeIds"])} remain pending editorial acceptance. Planned expansion/supporting content has separate status.'
limit='Cisco Device Mastery Batch 25 is accepted as authored teaching, interactive worksheets and guided labs. Cisco target commands, configuration, traffic, power, RF, failover and SAN I/O remain unexecuted; the local Python lab only computes declared evidence gates.'
if limit not in m['limitations']:m['limitations'].append(limit)
write('content/enrichment.json',m)
write('docs/acceptance-batch-25.json',dict(result='PASS',date='2026-10-09',reviewer='Primary assistant; direct work, no GapCode',topics=primary['topics'],bundleSha256=primary['bundleSha256'],visualSheets=primary['visualSheets'],evidence=['docs/device-primary-review.json','docs/browser-devices-results.json','docs/device-mastery-results.json','docs/quality-audit-devices.json','docs/research-batch-25.md'],acceptedTopics=17,exams=170,quickChecks=51,limits=limit))
for script in ['tools/catalog.py','tools/progress.py']:subprocess.run(['python',script],cwd=R,check=True)
print('Batch 25 accepted; current total',len(m['completedNodeIds']))
