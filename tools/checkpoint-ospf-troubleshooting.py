"""Verify groundwork without promoting the original lesson to completion."""
import hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(p):return json.loads((root/p).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json');assert reg['result']=='PASS' and len(reg['checks'])==28 and all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
actual=read('docs/ospf-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==16
for label in ['forwarding fault','forwarding recovery','return fault','return recovery']:assert any(line.startswith('PASS '+label+':') for line in actual['output'])
assert all(word in actual['checks'][-1] for word in ['forwarding disable','endpoint route removal'])
assert read('docs/quality-audit-latest.json')['lessons']==102
evidence=read('docs/ospf-troubleshooting-evidence-results.json');assert evidence['result']=='PASS' and evidence['views']==10 and len(evidence['checks'])==7
browser=read('docs/browser-ospf-troubleshooting-results.json');assert browser['result']=='PASS' and len(browser['checks'])==6 and not browser['errors']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for ls in bundles.values() for l in ls]
assert len(lessons)==102 and not any(l['id']=='s3-g1-t4' for l in lessons);assert sum(len(l['exams']) for l in lessons)==1020 and sum(len(l['quick']) for l in lessons)==306
m=read('content/enrichment.json');b=next(x for x in m['batches'] if x['id']=='09');assert len(m['completedNodeIds'])==95 and len(b['draftNodeIds'])==7 and b['nextAuthoringNode']=='s3-g1-t4' and m['nextNode']=='s3-g0-t0';assert b['troubleshootingGroundwork']['status']=='PENDING_FULL_LESSON'
review=read('docs/review-batch-09.json');assert len(review['topics'])==7 and len(review['remainingIds'])==13 and 's3-g1-t4' in review['remainingIds'];assert all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates'])
questions=read('docs/exam-review-batch-09.json');commands=read('docs/commands-results-batch-09.json');assert questions['examCount']==70 and questions['quickCount']==21 and len(commands['blocks'])==67
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
screens=['triage-'+s+'.png' for s in ['desktop','light-mobile','dark-mobile','workflow-start','workflow-end','table-start','table-end','raw-start','raw-end']];assert all((root/'docs/screenshots/batch-09'/s).is_file() for s in screens)
links=[]
for name in ['docs/ospf-troubleshooting-foundation.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target!='ospf-troubleshooting-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([name,ref])
result=dict(date='2026-10-09',result='PASS',checks=[
'28 fresh regression commands, expanded actual single-area lab and all 102 authored routes',
'16 actual protocol/route/forwarding/raw-probe/isolation checks with four interrupted cleanup boundaries',
'Three source hashes and exact raw fields corroborated across ten separate actual troubleshooting views',
'Seven evidence checks and six preview-browser checks; all fifty focus comparisons scoped to known interventions',
'Nine current screenshots manually inspected; keyboard-scrolling workflow, observations and raw records, both mobile themes',
'102 lessons/1020 exams/306 quick checks, seven reviewed drafts/95 accepted nodes, existing question/command-review counts unchanged',
'Full troubleshooting lesson still pending and next; thirteen remaining topics and full-batch gates remain pending',
'Immutable source hash and local evidence links preserved'],screenshots=screens,localLinks=links,sourceHash=sourcehash,scope='Actual troubleshooting groundwork and read-only preview. No lesson completion, live diagnosis, application transaction, zero-loss, MTU/authentication fault execution, hardware or convergence claim. No GapCode.')
(root/'docs/ospf-troubleshooting-checkpoint-results.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print('PASS troubleshooting groundwork checkpoint')
