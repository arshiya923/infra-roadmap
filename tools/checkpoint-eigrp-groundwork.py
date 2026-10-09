"""Verify actual runtime plus standalone groundwork; original EIGRP stays pending."""
import hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(p):return json.loads((root/p).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json');assert reg['result']=='PASS' and len(reg['checks'])==31 and all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
assert read('docs/quality-audit-latest.json')['lessons']==103
actual=read('docs/eigrp-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==12
assert len(actual['interruptedCleanup'])==5 and [c['exitCode'] for c in actual['interruptedCleanup']]==[23,24,25,26,27] and all(c['baselineMatched'] for c in actual['interruptedCleanup'])
assert any(s.startswith('RECOVERY_ACTION owned link up followed by identity-checked restart') for s in actual['output'])
for key in ['R1','R2']:assert actual['records']['BASELINE_CONFIG_'+key]['output']==actual['records']['RECOVERED_CONFIG_'+key]['output']
assert actual['records']['FAULT_PROBE_CLIENT']['exitCode']!=0 and actual['records']['RECOVERED_PROBE_CLIENT']['exitCode']==0
assert 'owned-daemon reinitialization' in actual['checks'][8]
model=read('docs/eigrp-model-results.json');assert model['result']=='PASS' and model['combinations']==34816 and model['cases']==9 and len(model['checks'])==6
browser=read('docs/browser-eigrp-results.json');assert browser['result']=='PASS' and len(browser['checks'])==6 and not browser['errors']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for ls in bundles.values() for l in ls]
assert len(lessons)==103 and not any(l['id']=='s3-g2-t0' for l in lessons)
assert sum(len(l['exams']) for l in lessons)==1030 and sum(len(l['quick']) for l in lessons)==309
m=read('content/enrichment.json');b=next(b for b in m['batches'] if b['id']=='09');assert len(m['completedNodeIds'])==95 and len(b['draftNodeIds'])==8 and b['nextAuthoringNode']=='s3-g2-t0' and m['nextNode']=='s3-g0-t0' and b['eigrpGroundwork']['status']=='PENDING_FULL_LESSON'
review=read('docs/review-batch-09.json');assert len(review['topics'])==8 and len(review['remainingIds'])==12 and 's3-g2-t0' in review['remainingIds'] and len(review['batchGates'])==13 and all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates'])
questions=read('docs/exam-review-batch-09.json');commands=read('docs/commands-results-batch-09.json');assert questions['examCount']==80 and questions['quickCount']==24 and len(commands['blocks'])==77
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
rejected=read('docs/eigrp-runtime-rejected-trials.json');assert len(rejected['trials'])==2 and all(t['result']=='REJECTED' and t['exitCode']==1 for t in rejected['trials'])
for trial in rejected['trials']:
 p=root/trial['rawEvidence'];assert p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==trial['sha256']
screens=['eigrp-'+s+'.png' for s in ['desktop','light-mobile','dark-mobile','table-start','table-end']];assert all((root/'docs/screenshots/batch-09'/s).is_file() for s in screens)
links=[]
for name in ['docs/eigrp-runtime-foundation.md','docs/validation-batch-09.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target and target!='eigrp-groundwork-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([name,ref])
assert not any((root/'tools'/n).exists() for n in ['_create-eigrp-lab.py','_fix-eigrp-preview.py','_fix-eigrp-browser.py','_document-eigrp.py','_clarify-eigrp-history.py','_diagnose-eigrp-stop.cjs'])
result=dict(date='2026-10-09',result='PASS',checks=[
'31 actual regression commands pass, including all 103 authored routes and isolated EIGRP runtime',
'12 EIGRP peer/topology/RIB/kernel/raw-probe/startup-packet categories; normal and five interrupted cleanup paths preserve independent baseline',
'Recovery explicitly requires link restoration and owned-daemon reinitialization; unchanged configuration and rejected trials preserved',
'34816 independent distance/declaration combinations, nine cases, strict equality/historical FD and safe fresh inputs',
'Six HTTP/direct-file browser checks, two byte-exact downloads, named keyboard scrolling, four widths/both themes and five manually inspected screenshots',
'103 lessons/1030 exams/309 quick checks and eight drafts/95 accepted nodes unchanged; no EIGRP lesson count promotion',
'Twelve original topics and thirteen full-batch gates remain pending; eighty reviewed exams/twenty-four quick checks and seventy-seven command blocks unchanged',
'Original immutable source, rejection hashes, local evidence links and own-helper removal verified'],screenshots=screens,sourceHash=sourcehash,localLinks=links,scope='Actual IPv4 EIGRP runtime and separate supplied-distance preview groundwork. Original full EIGRP lesson remains pending/next. No Cisco/alternate-successor/active-query-SIA/metric-config/authentication/IPv6/application/hardware/zero-loss/convergence execution claim. No GapCode.')
(root/'docs/eigrp-groundwork-checkpoint-results.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n');print('PASS EIGRP groundwork checkpoint with unchanged lesson/editorial counts')
