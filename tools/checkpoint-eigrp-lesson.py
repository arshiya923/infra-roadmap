"""Verify the integrated EIGRP draft without accepting the full twenty-topic batch."""
import collections,hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(name):return json.loads((root/name).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json');assert reg['result']=='PASS' and len(reg['checks'])==32
assert all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
failed=read('docs/batch-09-regression-eigrp-pending-test-failure.json');assert failed['result']=='FAIL' and len(failed['checks'])==32
assert [c['command'] for c in failed['checks'] if c['result']=='FAIL']==[['node','tests/browser.cjs']]
generic=read('docs/browser-results.json');assert generic['result']=='PASS' and len(generic['checks'])==18 and not generic['errors']
quality=read('docs/quality-audit-latest.json');assert quality['result']=='PASS' and quality['lessons']==104 and not quality['issues']
actual=read('docs/eigrp-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==12
assert len(actual['interruptedCleanup'])==5 and [c['exitCode'] for c in actual['interruptedCleanup']]==[23,24,25,26,27] and all(c['baselineMatched'] for c in actual['interruptedCleanup'])
assert any(line.startswith('RECOVERY_ACTION owned link up followed by identity-checked restart') for line in actual['output'])
for router in ['R1','R2']:
 assert actual['records']['BASELINE_CONFIG_'+router]['output']==actual['records']['RECOVERED_CONFIG_'+router]['output']
for endpoint in ['CLIENT','SERVER']:
 assert actual['records']['BASELINE_PROBE_'+endpoint]['exitCode']==0
 assert actual['records']['FAULT_PROBE_'+endpoint]['exitCode']!=0
 assert actual['records']['RECOVERED_PROBE_'+endpoint]['exitCode']==0
model=read('docs/eigrp-model-results.json');assert model['result']=='PASS' and model['combinations']==34816 and model['cases']==9 and len(model['checks'])==6
for name,count in [('docs/browser-eigrp-results.json',6),('docs/browser-eigrp-lesson-results.json',7)]:
 report=read(name);assert report['result']=='PASS' and len(report['checks'])==count and not report['errors']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for ls in bundles.values() for l in ls]
assert len(lessons)==104 and sum(len(l['exams']) for l in lessons)==1040 and sum(len(l['quick']) for l in lessons)==312
lesson=next(l for l in lessons if l['id']=='s3-g2-t0');assert lesson['title']=='EIGRP' and lesson['interactive']=='eigrp'
assert len(lesson['sources'])==7 and all(s['checked']=='2026-10-09' for s in lesson['sources'])
assert lesson['prerequisites']==['s1-g4-t0','s3-g0-t0','s3-g1-t0']
assert all(isinstance(c,str) for c in lesson['components']) and isinstance(lesson['ports'],str)
prompts=collections.Counter(q['question'].strip().casefold() for l in lessons for q in l['exams']);assert max(prompts.values())==1
manifest=read('content/enrichment.json');batch=next(b for b in manifest['batches'] if b['id']=='09')
assert len(manifest['completedNodeIds'])==95 and len(batch['draftNodeIds'])==9 and batch['nextAuthoringNode']=='s3-g2-t1' and manifest['nextNode']=='s3-g0-t0'
assert batch['eigrpGroundwork']['status']=='INTEGRATED_DRAFT_LESSON'
assert not any(l['id']=='s3-g2-t1' for l in lessons)
review=read('docs/review-batch-09.json');assert len(review['topics'])==9 and len(review['remainingIds'])==11 and review['nextAuthoringNode']=='s3-g2-t1'
assert len(review['batchGates'])==13 and all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates'])
assert all(len(t['topicCriteria'])==22 and all(c['result']=='PASS_WITH_DOCUMENTED_SCOPE' for c in t['topicCriteria']) for t in review['topics'])
questions=read('docs/exam-review-batch-09.json');assert questions['examCount']==90 and questions['quickCount']==27 and questions['courseExamPromptsChecked']==1040 and not questions['identicalCourseExamPrompts']
commands=read('docs/commands-results-batch-09.json');assert len(commands['blocks'])==85
assert collections.Counter(c['classification'] for c in commands['blocks'])==dict(GUIDED_NOT_EXECUTED=68,PASS_ACTUAL_ISOLATED_LINUX=11,PASS_ACTUAL_PACKAGE_EXTRACTION=6)
for topic in review['topics']:
 l=next(l for l in lessons if l['id']==topic['topicId']);qtopic=next(t for t in questions['topics'] if t['topicId']==l['id']);assert len(qtopic['reviewed'])==13
 for q,r in zip(l['exams']+l['quick'],qtopic['reviewed']):
  for key in ['questionId','question','answer','explanation','testedConcept']:assert q[key]==r[key],(l['id'],key)
  if 'options' in r:assert q['options']==r['options']
 rows=[c for c in commands['blocks'] if c['topicId']==l['id']];assert len(rows)==len(l['commands'])
 for c,r in zip(l['commands'],rows):
  assert c['code']==r['code'] and c['platform']==r['platform']
  assert c['expected']==r.get('limits',r.get('review')),(l['id'],r['index'])
rejected=read('docs/eigrp-runtime-rejected-trials.json');assert len(rejected['trials'])==2 and all(t['result']=='REJECTED' and t['exitCode']==1 for t in rejected['trials'])
for trial in rejected['trials']:
 p=root/trial['rawEvidence'];assert p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()==trial['sha256']
screens=['eigrp-'+s+'.png' for s in ['desktop','light-mobile','dark-mobile','table-start','table-end','lesson-flow','lesson-lab','lesson-example-light','lesson-example-dark','lesson-lab-start','lesson-lab-end']]
assert review['topics'][-1]['manualRendering']['reviewed']==screens
assert all((root/'docs/screenshots/batch-09'/name).is_file() for name in screens)
manual=read('docs/eigrp-manual-screenshot-hashes.json');assert set(manual['sha256'])==set(screens)
assert all(hashlib.sha256((root/'docs/screenshots/batch-09'/name).read_bytes()).hexdigest()==manual['sha256'][name] for name in screens),'Fresh screenshots differ from manually inspected images; inspect changed files before updating hashes'
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
links=[]
for name in ['docs/eigrp-runtime-foundation.md','docs/validation-batch-09.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target and target!='eigrp-lesson-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([name,ref])
assert not any((root/'tools'/name).exists() for name in ['_author-eigrp.py','_integrate-eigrp.py','_review-eigrp.py','_document-eigrp.py'])
result=dict(date='2026-10-09',result='PASS',checks=[
 '32 actual regression commands pass, including all 104 authored routes and original prerequisite/previous-next structure',
 'Twelve actual EIGRP peer/topology/RIB/kernel/raw-ICMP/startup-header categories and five interrupted cleanup boundaries preserve independent baseline',
 'Both endpoint fault/recovery probes and exact unchanged configurations corroborate explicit combined link/owned-daemon repair; rejected trials and hashes preserved',
 '34816 independent supplied-distance/declaration combinations, nine cases, strict historical FD/equality and safe fresh values',
 'Six standalone and seven integrated browser categories, byte-exact downloads, four widths/both themes, named scrolling, mechanism motion/reduced motion, exam/progress and direct-file use',
 'Eleven current screenshots manually inspected: worksheet controls/table ends and integrated flow/topology/light-dark example/scroll endpoints',
 '104 lessons/1040 exams/312 quick checks; seven checked primary sources and no identical course exam prompts',
 'Nine scoped 22-criterion topic reviews; 90 reviewed exams/27 quick checks and 85 exact command blocks with six new guided blocks and two actual references',
 '95 accepted original nodes unchanged; eleven original topics and thirteen full-batch gates pending; EIGRP metrics next',
 'Original immutable source, local evidence links and removal of own temporary helpers verified'],screenshots=screens,sourceHash=sourcehash,localLinks=links,scope='Integrated reviewed EIGRP draft, not full Batch 09 acceptance. Actual single-transit IPv4 with explicit combined link/owned-daemon recovery; supplied alternatives are no full DUAL/alternate-path/metric/SIA execution. Cisco, authentication, IPv6, application, hardware, zero-loss/convergence remain unexecuted. No GapCode.')
(root/'docs/eigrp-lesson-checkpoint-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('PASS integrated EIGRP lesson checkpoint')
