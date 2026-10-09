"""Verify the integrated topology draft without accepting the full routing batch."""
import collections,hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(n):return json.loads((root/n).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json');assert reg['result']=='PASS' and len(reg['checks'])==39 and all(c['result']=='PASS' and c['exitCode']==0 for c in reg['checks'])
for command in [['python','tools/build-eigrp-neighbor-evidence.py'],['node','tests/eigrp-neighbor-evidence.cjs'],['node','tests/browser-eigrp-neighbors.cjs']]:assert command in [c['command'] for c in reg['checks']]
quality=read('docs/quality-audit-latest.json');assert quality['result']=='PASS' and quality['lessons']==107 and not quality['issues']
model=read('docs/eigrp-neighbor-evidence-results.json');assert model['result']=='PASS' and model['combinations']==32 and model['views']==8 and len(model['checks'])==5
browser=read('docs/browser-eigrp-neighbors-results.json');assert browser['result']=='PASS' and len(browser['checks'])==9 and not browser['errors']
topology=read('docs/eigrp-topology-results.json');assert topology['result']=='PASS' and topology['combinations']==24 and topology['views']==8 and topology['prefixScopes']==3 and len(topology['checks'])==5
browserTopology=read('docs/browser-eigrp-topology-results.json');assert browserTopology['result']=='PASS' and len(browserTopology['checks'])==8 and not browserTopology['errors']
for command in [['node','tests/eigrp-topology.cjs'],['node','tests/browser-eigrp-topology.cjs']]:assert command in [c['command'] for c in reg['checks']]
views=json.loads(subprocess.check_output(['node','-e',"const m=require('./scripts/eigrp-topology.js');process.stdout.write(JSON.stringify(m.catalog().flatMap(c=>['remote','local','transit'].map(k=>m.view(c.id,k)))))"],cwd=root).decode('utf8'))
assert len(views)==24
for v in views:
 if v['kind']=='remote' and v['phase'] in ['BASELINE','RECOVERED']:assert len(v['paths'])==1 and v['paths'][0]['corroborated'] and v['paths'][0]['totalDisplayed']==30720 and v['paths'][0]['rdDisplayed']==28160
 if v['kind']=='remote' and v['phase']=='FAULT':assert v['entry']['successorsDisplayed']>0 and not any(p['corroborated'] for p in v['paths']) and v['selectedEigrp']==0 and not v['kernel'] and all(p['exitCode']!=0 for p in v['probes'])
 if v['kind']=='local' and v['phase']=='BASELINE':assert v['selectedEigrp']==0 and v['kernel'] and all(p['totalDisplayed'] is None and p['rdDisplayed'] is None for p in v['paths'])
 if v['phase']=='LINK_RESTORED':assert all(not p['recorded'] for p in v['probes'])
actual=read('docs/eigrp-routing-lab-results.json');assert actual['result']=='PASS' and len(actual['checks'])==12
assert len(actual['interruptedCleanup'])==5 and [c['exitCode'] for c in actual['interruptedCleanup']]==[23,24,25,26,27] and all(c['baselineMatched'] for c in actual['interruptedCleanup'])
assert any(line.startswith('RECOVERY_ACTION owned link up followed by identity-checked restart') for line in actual['output'])
for router in ['R1','R2']:assert actual['records']['BASELINE_CONFIG_'+router]['output']==actual['records']['RECOVERED_CONFIG_'+router]['output']
for endpoint in ['CLIENT','SERVER']:
 assert actual['records']['BASELINE_PROBE_'+endpoint]['exitCode']==0 and actual['records']['FAULT_PROBE_'+endpoint]['exitCode']!=0 and actual['records']['RECOVERED_PROBE_'+endpoint]['exitCode']==0
 assert 'LINK_RESTORED_PROBE_'+endpoint not in actual['records']
payload=json.loads(subprocess.check_output(['node','-e',"process.stdout.write(JSON.stringify(require('./content/eigrp-neighbor-evidence.js')))"],cwd=root).decode('utf8'))
assert payload['source']['sha256']==hashlib.sha256((root/payload['source']['path']).read_bytes()).hexdigest()
assert len(payload['views'])==8 and payload['packets']==actual['records']['PACKETS'] and any(p[3]=='1' and int(p[6])>0 for p in payload['packets'])
for v in payload['views']:
 for key,value in v['records'].items():assert value==actual['records'][key]
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'));lessons=[l for a in bundles.values() for l in a]
assert len(lessons)==107 and sum(len(l['exams']) for l in lessons)==1070 and sum(len(l['quick']) for l in lessons)==321
lesson=next(l for l in lessons if l['id']=='s3-g2-t3');assert lesson['title']=='EIGRP topology' and lesson['interactive']=='eigrp-topology'
assert len(lesson['sources'])==8 and all(s['checked']=='2026-10-09' and s['url'].startswith('https://') for s in lesson['sources'])
assert lesson['prerequisites']==['s3-g2-t0','s3-g2-t1','s3-g2-t2'] and len(lesson['commands'])==7 and len(lesson['mechanism'])==12 and len(lesson['flow'])==4 and len(lesson['comparison'])==8
assert isinstance(lesson['ports'],str) and all(isinstance(c,str) for c in lesson['components']) and not any(l['id']=='s3-g3-t0' for l in lessons)
prompts=collections.Counter(q['question'].strip().casefold() for l in lessons for q in l['exams']);assert max(prompts.values())==1
manifest=read('content/enrichment.json');batch=next(b for b in manifest['batches'] if b['id']=='09')
assert len(manifest['completedNodeIds'])==95 and len(batch['draftNodeIds'])==12 and batch['nextAuthoringNode']=='s3-g3-t0' and manifest['nextNode']=='s3-g0-t0'
assert batch['eigrpTopologyGroundwork']['status']=='INTEGRATED_DRAFT_LESSON'
catalog=json.loads(subprocess.check_output(['node','-e',"const fs=require('node:fs'),vm=require('node:vm'),c={window:{}};vm.runInNewContext(fs.readFileSync('content/catalog.js','utf8'),c);process.stdout.write(JSON.stringify(c.window.INFRA_CATALOG))"],cwd=root).decode('utf8'))
assert next(n for n in catalog if n['id']=='s3-g3-t0')['name']=='BGP fundamentals'
review=read('docs/review-batch-09.json');assert len(review['topics'])==12 and len(review['remainingIds'])==8 and review['nextAuthoringNode']=='s3-g3-t0' and review['overallAuthoredLessons']==107
assert len(review['batchGates'])==13 and all(g['result']=='PENDING_FULL_20_TOPIC_BATCH' for g in review['batchGates'])
assert all(len(t['topicCriteria'])==22 and all(c['result']=='PASS_WITH_DOCUMENTED_SCOPE' for c in t['topicCriteria']) for t in review['topics'])
questions=read('docs/exam-review-batch-09.json');assert questions['examCount']==120 and questions['quickCount']==36 and questions['courseExamPromptsChecked']==1070 and not questions['identicalCourseExamPrompts']
commands=read('docs/commands-results-batch-09.json');assert len(commands['blocks'])==108 and collections.Counter(c['classification'] for c in commands['blocks'])==dict(GUIDED_NOT_EXECUTED=85,PASS_ACTUAL_ISOLATED_LINUX=14,PASS_ACTUAL_PACKAGE_EXTRACTION=9)
for topic in review['topics']:
 l=next(l for l in lessons if l['id']==topic['topicId']);qtopic=next(t for t in questions['topics'] if t['topicId']==l['id']);assert len(qtopic['reviewed'])==13
 for q,r in zip(l['exams']+l['quick'],qtopic['reviewed']):
  for key in ['questionId','question','answer','explanation','testedConcept']:assert q[key]==r[key],(l['id'],key)
  if 'options' in r:assert q['options']==r['options']
 rows=[c for c in commands['blocks'] if c['topicId']==l['id']];assert len(rows)==len(l['commands'])
 for c,r in zip(l['commands'],rows):assert c['code']==r['code'] and c['platform']==r['platform'] and c['expected']==r.get('limits',r.get('review'))
rejected=read('docs/eigrp-runtime-rejected-trials.json');assert len(rejected['trials'])==2 and all(t['result']=='REJECTED' and t['exitCode']==1 for t in rejected['trials'])
for trial in rejected['trials']:assert hashlib.sha256((root/trial['rawEvidence']).read_bytes()).hexdigest()==trial['sha256']
screens=['et-'+s+'.png' for s in ['desktop','light-mobile','dark-mobile','table-start','table-end','flow','lab','example-light','example-dark','lab-start','lab-end']]
assert review['topics'][-1]['manualRendering']['reviewed']==screens
manual=read('docs/eigrp-topology-manual-screenshot-hashes.json');assert set(manual['sha256'])==set(screens)
assert all(hashlib.sha256((root/'docs/screenshots/batch-09'/s).read_bytes()).hexdigest()==manual['sha256'][s] for s in screens),'Inspect changed screenshots before updating reviewed hashes'
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
links=[]
for name in ['docs/eigrp-topology-foundation.md','docs/validation-batch-09.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target and target!='eigrp-topology-checkpoint-results.json':assert (p.parent/target).is_file(),ref
  links.append([name,ref])
assert all(s in (root/'learn.html').read_text(encoding='utf8') for s in ['content/eigrp-neighbor-evidence.js','scripts/eigrp-topology.js','styles/eigrp-topology.css'])
assert not any((root/'tools'/n).exists() for n in ['_author-eigrp-topology.py','_integrate-eigrp-topology.py','_review-eigrp-topology.py','_document-eigrp-topology.py'])
checks=['39 fresh regression commands pass across 107 lessons and original structure/prerequisites', '24 independently compared observer/checkpoint/prefix combinations preserve literal headers/paths and separate peer/selected RIB/kernel predicates', 'Eight topology browser categories pass with HTTP/direct-file, context invalidation, inert text, exact downloads, four widths/two themes, keyboard scrolling, mechanism/reduced motion, assessment/progress and adjacency', 'Eleven current screenshots individually inspected with exact retained hashes', 'Twelve unchanged actual EIGRP categories and five interrupted cleanup boundaries preserve combined link/daemon repair and unchanged configs; absent intermediate probes and rejected trials remain explicit', '107 lessons/1070 exams/321 quick checks, eight checked primary sources and unique course exam prompts', 'Twelve scoped 22-criterion reviews, 120 exams/36 quick checks and 108 exact command blocks reviewed', '95 accepted original nodes unchanged; eight original topics and thirteen full-batch gates pending; BGP fundamentals next', 'Immutable source, rejected raw hashes, local evidence links and removal of own temporary helpers verified']
result=dict(date='2026-10-09',result='PASS',checks=checks,screenshots=screens,sourceHash=sourcehash,localLinks=links,scope='Reviewed integrated topology draft, not full Batch 09 acceptance. Preserved actual single-transit IPv4 topology/peer/RIB/kernel and phase-specific ICMP with explicit combined repair. No full FD history/DUAL, valid-peer endorsement of anomalous tokens, software-root-cause, physical multipath/Cisco/application/hardware/convergence execution. No GapCode.')
(root/'docs/eigrp-topology-checkpoint-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('PASS integrated EIGRP topology checkpoint')
