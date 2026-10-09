"""Verify the integrated draft without accepting the full twenty-topic batch."""
import collections,hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(p):return json.loads((root/p).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json')
assert reg['result']=='PASS' and len(reg['checks'])==28
assert all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
assert read('docs/quality-audit-latest.json')['lessons']==103
actual=read('docs/ospf-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==16
for phase in ['forwarding fault','forwarding recovery','return fault','return recovery']:
 assert any(line.startswith('PASS '+phase+':') for line in actual['output'])
assert all(s in actual['checks'][-1] for s in ['forwarding disable','endpoint route removal'])
areas=read('docs/ospf-areas-lab-results.json');assert areas['result']=='PASS' and len(areas['checks'])==12 and 'stopped-daemon' in areas['checks'][-1]
shutdown=[(root/'labs'/n).read_text(encoding='utf8').split('cleanup(){')[1].split('trap cleanup EXIT')[0] for n in ['ospf-routing.sh','ospf-areas.sh','ospf-dr-bdr.sh']]
assert shutdown[0]==shutdown[1]==shutdown[2] and 'kill -KILL' in shutdown[0]
evidence=read('docs/ospf-troubleshooting-evidence-results.json');assert evidence['result']=='PASS' and evidence['views']==10 and len(evidence['checks'])==7
browser=read('docs/browser-ospf-troubleshooting-results.json');assert browser['result']=='PASS' and len(browser['checks'])==9 and not browser['errors']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for ls in bundles.values() for l in ls]
assert len(lessons)==103 and sum(len(l['exams']) for l in lessons)==1030 and sum(len(l['quick']) for l in lessons)==309
lesson=next(l for l in lessons if l['id']=='s3-g1-t4');assert lesson['title']=='OSPF troubleshooting' and lesson['interactive']=='ospf-troubleshooting'
assert len(lesson['sources'])==10 and all(s['checked']=='2026-10-09' for s in lesson['sources'])
prompts=collections.Counter(q['question'].strip().casefold() for l in lessons for q in l['exams']);assert max(prompts.values())==1
manifest=read('content/enrichment.json');batch=next(b for b in manifest['batches'] if b['id']=='09')
assert len(manifest['completedNodeIds'])==95 and len(batch['draftNodeIds'])==8 and batch['nextAuthoringNode']=='s3-g2-t0' and manifest['nextNode']=='s3-g0-t0'
assert batch['troubleshootingGroundwork']['status']=='INTEGRATED_DRAFT_LESSON'
review=read('docs/review-batch-09.json');assert len(review['topics'])==8 and len(review['remainingIds'])==12 and review['nextAuthoringNode']=='s3-g2-t0'
assert len(review['batchGates'])==13 and all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates'])
assert all(len(t['topicCriteria'])==22 and all(c['result']=='PASS_WITH_DOCUMENTED_SCOPE' for c in t['topicCriteria']) for t in review['topics'])
questions=read('docs/exam-review-batch-09.json');assert questions['examCount']==80 and questions['quickCount']==24 and questions['courseExamPromptsChecked']==1030 and not questions['identicalCourseExamPrompts']
commands=read('docs/commands-results-batch-09.json');assert len(commands['blocks'])==77
counts=collections.Counter(c['classification'] for c in commands['blocks']);assert counts==dict(GUIDED_NOT_EXECUTED=62,PASS_ACTUAL_ISOLATED_LINUX=10,PASS_ACTUAL_PACKAGE_EXTRACTION=5)
for topic in review['topics']:
 l=next(l for l in lessons if l['id']==topic['topicId'])
 qtopic=next(t for t in questions['topics'] if t['topicId']==l['id'])
 assert len(qtopic['reviewed'])==13
 for q,r in zip(l['exams']+l['quick'],qtopic['reviewed']):
  for key in ['questionId','question','answer','explanation','testedConcept']:assert q[key]==r[key],(l['id'],key)
  if 'options' in r:assert q['options']==r['options']
 rows=[c for c in commands['blocks'] if c['topicId']==l['id']];assert len(rows)==len(l['commands'])
 for c,r in zip(l['commands'],rows):
  assert c['code']==r['code'] and c['platform']==r['platform']
  assert c['expected']==r.get('limits',r.get('review')),(l['id'],r['index'])
screens=['triage-'+s+'.png' for s in ['desktop','flow','light-mobile','dark-mobile','workflow-start','workflow-end','table-start','table-end','raw-start','raw-end','lab-start','lab-end']]
assert review['topics'][-1]['manualRendering']['reviewed']==screens
assert all((root/'docs/screenshots/batch-09'/s).is_file() for s in screens)
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
links=[]
for name in ['docs/ospf-troubleshooting-foundation.md','docs/validation-batch-09.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target and target!='ospf-troubleshooting-lesson-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([name,ref])
assert not any((root/'tools'/n).exists() for n in ['_author-troubleshooting.py','_integrate-troubleshooting-browser.py','_review-troubleshooting.py','_document-troubleshooting.py'])
result=dict(date='2026-10-09',result='PASS',checks=[
'28 passing regression commands and broad audit of all 103 authored routes',
'16 actual single-area checks with four interrupted cleanup boundaries and both independent fault/recovery pairs',
'Identical owned shutdown repair in three runners; deterministic stopped-daemon Areas cleanup preserves independent baseline',
'Seven independent source-hash/raw-field evidence checks across ten separate experiment views',
'Nine integrated browser checks, fifty focus comparisons, four downloads, navigation, feedback and direct-file use',
'Twelve current screenshots manually inspected; named keyboard-scrolling regions and both mobile themes',
'103 lessons/1030 exams/309 quick checks; ten checked primary sources and no identical course exam prompts',
'Eight topics each have 22 scoped criteria; 80 exams/24 quick checks and 77 exact reviewed command blocks',
'95 accepted nodes; twelve topics and thirteen full-batch gates remain pending; EIGRP next',
'Immutable original source, local evidence links and removal of own temporary authoring helpers verified'],screenshots=screens,localLinks=links,sourceHash=sourcehash,scope='Integrated reviewed draft, not full Batch 09 acceptance. Known interventions, no live diagnosis/Cisco/exchange/authentication fault execution or application/hardware/zero-loss/convergence claim. No GapCode.')
(root/'docs/ospf-troubleshooting-lesson-checkpoint-results.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n')
print('PASS integrated OSPF troubleshooting lesson checkpoint')
