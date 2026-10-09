"""Verify the integrated metrics draft without accepting the full routing batch."""
import collections,hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(n):return json.loads((root/n).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json');assert reg['result']=='PASS' and len(reg['checks'])==34
assert all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
failed=read('docs/batch-09-regression-enterprise-timeout-failure.json');assert failed['result']=='FAIL' and len(failed['checks'])==34
assert [c['command'] for c in failed['checks'] if c['result']=='FAIL']==[['node','tests/browser-enterprise-lab.cjs']]
enterprise=read('docs/browser-enterprise-lab-results.json');assert enterprise['result']=='PASS' and len(enterprise['checks'])==6 and not enterprise['errors']
for command in ['tests/eigrp-metric-models.cjs','tests/browser-eigrp-metrics.cjs']:assert ['node',command] in [c['command'] for c in reg['checks']]
quality=read('docs/quality-audit-latest.json');assert quality['result']=='PASS' and quality['lessons']==105 and not quality['issues']
model=read('docs/eigrp-metric-model-results.json');assert model['result']=='PASS' and model['combinations']==19600 and model['cases']==9 and len(model['checks'])==6
browser=read('docs/browser-eigrp-metrics-results.json');assert browser['result']=='PASS' and len(browser['checks'])==8 and not browser['errors']
actual=read('docs/eigrp-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==12
assert len(actual['interruptedCleanup'])==5 and [c['exitCode'] for c in actual['interruptedCleanup']]==[23,24,25,26,27] and all(c['baselineMatched'] for c in actual['interruptedCleanup'])
assert any(line.startswith('RECOVERY_ACTION owned link up followed by identity-checked restart') for line in actual['output'])
for router in ['R1','R2']:assert actual['records']['BASELINE_CONFIG_'+router]['output']==actual['records']['RECOVERED_CONFIG_'+router]['output']
for endpoint in ['CLIENT','SERVER']:
 assert actual['records']['BASELINE_PROBE_'+endpoint]['exitCode']==0 and actual['records']['FAULT_PROBE_'+endpoint]['exitCode']!=0 and actual['records']['RECOVERED_PROBE_'+endpoint]['exitCode']==0
recorded=json.dumps(actual['records']);assert '30720' in recorded and '28160' in recorded and '100000' in recorded
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for a in bundles.values() for l in a]
assert len(lessons)==105 and sum(len(l['exams']) for l in lessons)==1050 and sum(len(l['quick']) for l in lessons)==315
lesson=next(l for l in lessons if l['id']=='s3-g2-t1');assert lesson['title']=='EIGRP metrics' and lesson['interactive']=='eigrp-metrics'
assert len(lesson['sources'])==8 and all(s['checked']=='2026-10-09' and s['url'].startswith('https://') for s in lesson['sources'])
assert lesson['prerequisites']==['s3-g2-t0','s1-g4-t0'] and len(lesson['commands'])==7
assert isinstance(lesson['ports'],str) and all(isinstance(c,str) for c in lesson['components'])
assert len(lesson['mechanism'])==12 and len(lesson['flow'])==4 and len(lesson['comparison'])==8
assert not any(l['id']=='s3-g2-t2' for l in lessons)
prompts=collections.Counter(q['question'].strip().casefold() for l in lessons for q in l['exams']);assert max(prompts.values())==1
manifest=read('content/enrichment.json');batch=next(b for b in manifest['batches'] if b['id']=='09')
assert len(manifest['completedNodeIds'])==95 and len(batch['draftNodeIds'])==10 and batch['nextAuthoringNode']=='s3-g2-t2' and manifest['nextNode']=='s3-g0-t0'
assert batch['eigrpMetricsGroundwork']['status']=='INTEGRATED_DRAFT_LESSON'
review=read('docs/review-batch-09.json');assert len(review['topics'])==10 and len(review['remainingIds'])==10 and review['nextAuthoringNode']=='s3-g2-t2' and review['overallAuthoredLessons']==105
assert len(review['batchGates'])==13 and all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates'])
assert all(len(t['topicCriteria'])==22 and all(c['result']=='PASS_WITH_DOCUMENTED_SCOPE' for c in t['topicCriteria']) for t in review['topics'])
questions=read('docs/exam-review-batch-09.json');assert questions['examCount']==100 and questions['quickCount']==30 and questions['courseExamPromptsChecked']==1050 and not questions['identicalCourseExamPrompts']
commands=read('docs/commands-results-batch-09.json');assert len(commands['blocks'])==92
assert collections.Counter(c['classification'] for c in commands['blocks'])==dict(GUIDED_NOT_EXECUTED=73,PASS_ACTUAL_ISOLATED_LINUX=12,PASS_ACTUAL_PACKAGE_EXTRACTION=7)
for topic in review['topics']:
 l=next(l for l in lessons if l['id']==topic['topicId']);qtopic=next(t for t in questions['topics'] if t['topicId']==l['id']);assert len(qtopic['reviewed'])==13
 for q,r in zip(l['exams']+l['quick'],qtopic['reviewed']):
  for key in ['questionId','question','answer','explanation','testedConcept']:assert q[key]==r[key],(l['id'],key)
  if 'options' in r:assert q['options']==r['options']
 rows=[c for c in commands['blocks'] if c['topicId']==l['id']];assert len(rows)==len(l['commands'])
 for c,r in zip(l['commands'],rows):assert c['code']==r['code'] and c['platform']==r['platform'] and c['expected']==r.get('limits',r.get('review'))
rejected=read('docs/eigrp-runtime-rejected-trials.json');assert len(rejected['trials'])==2 and all(t['result']=='REJECTED' and t['exitCode']==1 for t in rejected['trials'])
for trial in rejected['trials']:assert hashlib.sha256((root/trial['rawEvidence']).read_bytes()).hexdigest()==trial['sha256']
screens=['em-'+s+'.png' for s in ['desktop','light-mobile','dark-mobile','table-start','table-end','flow','lab','example-light','example-dark','lab-start','lab-end']]
assert review['topics'][-1]['manualRendering']['reviewed']==screens
manual=read('docs/eigrp-metrics-manual-screenshot-hashes.json');assert set(manual['sha256'])==set(screens)
assert all(hashlib.sha256((root/'docs/screenshots/batch-09'/s).read_bytes()).hexdigest()==manual['sha256'][s] for s in screens),'Inspect changed screenshots before updating reviewed hashes'
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
links=[]
for name in ['docs/eigrp-metrics-foundation.md','docs/validation-batch-09.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target and target!='eigrp-metrics-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([name,ref])
assert 'eigrp-metric-models.js' in (root/'learn.html').read_text(encoding='utf8')
assert not any((root/'tools'/n).exists() for n in ['_author-eigrp-metrics.py','_integrate-eigrp-metrics.py','_review-eigrp-metrics.py','_document-eigrp-metrics.py','_metrics-content.json'])
checks=[
 '34 actual regression commands pass across 105 authored lessons, with original structure and prerequisites preserved',
 '19600 independent BigInt arithmetic combinations, nine cases and six model categories verify vector units, rounding, RD/current values and boundaries',
 'Eight browser categories verify all cases/conventions, invalid state, text-only rendering, exact downloads, four widths/both themes, scrolling, flow/reduced motion, feedback/progress and HTTP/direct-file use',
 'Eleven current screenshots individually inspected and their exact hashes preserved',
 'Twelve actual unchanged EIGRP runtime categories, five interrupted cleanup boundaries and explicit combined recovery retain original evidence scope',
 '105 lessons/1050 exams/315 quick checks, eight checked primary sources and no identical course exam prompts',
 'Ten scoped 22-criterion topic reviews, 100 exams/30 quick checks and all 92 exact command blocks reviewed',
 '95 accepted original nodes unchanged; ten original topics and thirteen full-batch gates pending; EIGRP neighbors next',
 'Immutable original source, rejected trial hashes, local evidence links and removal of temporary helpers verified'
]
result=dict(date='2026-10-09',result='PASS',checks=checks,screenshots=screens,sourceHash=sourcehash,localLinks=links,scope='Reviewed integrated metrics draft, not full Batch 09 acceptance. Supplied default-classic vector arithmetic and unchanged actual uniform-default observations; no executed metric mutation, full FRR/wide parity, historical DUAL or installed alternate-path/service claims. No GapCode.')
(root/'docs/eigrp-metrics-checkpoint-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('PASS integrated EIGRP metrics checkpoint')
