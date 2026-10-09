"""Record completed primary review; requires fresh regression and matching sources."""
import collections, hashlib, json, subprocess
from pathlib import Path
root = Path(__file__).resolve().parents[1]
def read(p): return json.loads((root/p).read_text(encoding='utf-8'))
def write(p,d): (root/p).write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
reg=read('docs/batch-10-regression-results.json')
assert reg['result']=='PASS' and len(reg['checks'])==14
assert all(c['exitCode']==0 and c['result']=='PASS' for c in reg['checks'])
primary_paths=['docs/batch-10-primary-model-results.json','docs/batch-10-service-primary-results.json']
for p in primary_paths:
    r=read(p); assert r['result']=='PASS'
    for source,digest in r['sourceSha256'].items(): assert hashlib.sha256((root/source).read_bytes()).hexdigest()==digest,source
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root))
batch=bundles['10']; all_lessons=[l for b in bundles.values() for l in b]
assert len(batch)==20 and len(all_lessons)==135
prompts=collections.Counter(q['question'] for l in all_lessons for q in l['exams'])
assert len(prompts)==1350 and all(n==1 for n in prompts.values())
limits='Batch10 browser worksheets evaluate supplied declarations and bounded ideal calculations. No Cisco target commands, real packet service, protocol state machine or convergence were executed. Workbook configuration, fault and restore steps are GUIDED_NOT_EXECUTED. Prior Batch09 actual isolated Linux/FRR evidence retains its separate scope. Editorial acceptance does not mark learner study progress.'
notes=[
 'Import admission, NEXT_HOP, protocol choice, system installation, export and original return gates remain distinct.',
 'Exact-prefix selected-source redistribution, declared seed metric and tag guard are scoped; no universal loop prevention claim.',
 'Prefix-list deny is nonmatch in route-map matching; matching map deny terminates; set action is not installation.',
 'Containment and length both apply; bare default matches only default; ordering and strict aligned parsing reviewed.',
 'Noncontiguous wildcard bit comparison, standard source-only and extended TCP/port rules, first match and stateless return reviewed.',
 'Attachment selects tenant context before lookup; overlapping routes stay independent; explicit leak needs source and target resolution. Linux RPDB and FRR backend differences disclosed.',
 'VLAN membership and logical L3 binding agree; shared trunk failure does not merge RIBs; untagged sentinel is not a wire VLAN.',
 'HSRPv2 group10 addressing, priority, history, preemption and declared expiry reviewed; supplied upstream health is separate.',
 'RFC9568 owner255, nonowner priority, default preemption, relinquish advertisement and TTL scope reviewed; no current compliance claim.',
 'AVG ARP and cached AVF ownership are separate; IOS defaults version-scoped; no assignment or timer simulation.',
 'One-hop RPF, TTL, eligible outgoing interfaces and live local/transit demand remain distinct; ASM versus SSM range reviewed.',
 'Supplied tree state selects RP/source RPF context; SSM does not use an RP gate; no PIM state machine.',
 'RFC9776 current source filtering, bounded INCLUDE/EXCLUDE unions and explicit live cards reviewed; no timer emulation.',
 'Aggregate offered utilization and byte serialization have correct units; no queue delay or service guarantee inferred.',
 'Local UDP/TCP port classifier uses protocol and destination port; no application identity inferred; DSCP/ECN preserved.',
 'Local trust policies manipulate six DSCP bits and preserve two ECN bits; EF/AF21 do not imply universal scheduling.',
 'Initially full single bucket, capped fractional refill, atomic excess drop without token debit; differs from RFC2697 three-color marker.',
 'FIFO token eligibility preserves credit history; separate line serialization is not added to releases; oversize rejection explicit.',
 'Only arrived waiting packets compete at nonpreemptive server boundaries; FIFO ties, strict priority and wait/sojourn reviewed.',
 'Four campus devices plus separately owned external peer; VLAN10/20 shared RIB, HSRP independent of upstream readiness. Workbook maps exact routes, policies, baseline, single fault, restore and original timestamped observations; no recovery simulation.'
]
evidence=['content/batch-10.js','docs/review-batch-10.json','docs/exam-review-batch-10.json','docs/commands-results-batch-10.json','docs/batch-10-regression-results.json',*primary_paths,'docs/browser-batch-10-results.json','docs/browser-batch-10-acceptance-results.json','docs/batch-10-manual-review-hashes.json','labs/advanced-routing-switching-workbook.md']
criteria=[dict(number=c['number'],requirement=c['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for c in read('docs/acceptance-batch-08.json')['topicCriteria']]
gates=[dict(number=c['number'],requirement=c['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for c in read('docs/acceptance-batch-09.json')['batchGates']]
sheets=[root/'docs/screenshots/batch-10/review'/f'{i:02}-{g}.png' for i in range(20) for g in ['wide','narrow']]
assert all(p.exists() for p in sheets)
write('docs/batch-10-manual-review-hashes.json',dict(date='2026-10-09',reviewer='Primary assistant',result='PASS',scope='40 directly inspected contact sheets containing 140 captured views: desktop, flow, mechanism, both mobile themes and both table ends. Hashes identify the exact reviewed sheets; tall displays may be scaled. Intentional focusable table scrolling is verified separately in browser tests.',sha256={str(p.relative_to(root)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in sheets}))
topics=[]; exams=[]; blocks=[]
for i,(l,note) in enumerate(zip(batch,notes)):
    assert len(l['exams'])==10 and len(l['quick'])==3
    topics.append(dict(topicId=l['id'],originalContent=dict(originalTitle=l['title'],source='Preserved original inventory '+l['id']),technicalReview=note,questionReview='docs/exam-review-batch-10.json',manualRendering=dict(result='PASS',sheets=[f'docs/screenshots/batch-10/review/{i:02}-{g}.png' for g in ['wide','narrow']]),topicCriteria=criteria,evidenceLimits=limits))
    exams.append(dict(topicId=l['id'],examCount=10,quickCount=3,reviewed=[dict(q,result='RETAINED_AFTER_PRIMARY_REVIEW') for q in l['exams']],quickReviewed=[dict(q,result='RETAINED_AFTER_PRIMARY_REVIEW') for q in l['quick']]))
    for j,c in enumerate(l['commands']): blocks.append(dict(topicId=l['id'],index=j+1,code=c['code'],platform=c['platform'],classification='GUIDED_NOT_EXECUTED',sources=l['sources'],limits=c['expected']))
write('docs/exam-review-batch-10.json',dict(date='2026-10-09',result='PASS_PRIMARY_REVIEW',examCount=200,quickCount=60,courseExamPromptsChecked=1350,identicalCourseExamPrompts=[],review='Primary checked answers, explanations, distractors and declared scope. No certification alignment claimed.',topics=exams))
write('docs/commands-results-batch-10.json',dict(date='2026-10-09',summary=dict(total=len(blocks),guidedNotExecuted=len(blocks),targetExecuted=0),blocks=blocks,workbook='labs/advanced-routing-switching-workbook.md',limits=limits))
write('docs/review-batch-10.json',dict(date='2026-10-09',status='ACCEPTED',reviewer='Primary assistant; direct work following user instruction not to use GapCode',reviewedIds=[l['id'] for l in batch],remainingIds=[],topics=topics,batchGates=gates,evidenceLimits=limits))
manifest=read('content/enrichment.json'); b=next(b for b in manifest['batches'] if b['id']=='10')
assert set(b['nodeIds'])=={l['id'] for l in batch}
assert len(manifest['completedNodeIds'])==115
manifest['completedNodeIds']+=b['nodeIds'];manifest.update(currentBatch='11',nextNode='s4-g0-t0')
b.update(status='complete',acceptedDate='2026-10-09',acceptanceEvidence='docs/acceptance-batch-10.json',draftNodeIds=[],nextAuthoringNode=None,interactions='Twenty accepted lessons,200 reviewed exams/60 quick checks; bounded route-control, VRF, FHRP, multicast, QoS and original-path worksheets. Guided target lab remains unexecuted.')
manifest['limitations'][0]='Batches 01-10 complete; 307 original nodes remain unenriched or pending editorial acceptance.'
manifest['limitations'].append('Batch10 accepted within declared browser, ideal calculation and guided lab scopes. Actual target-router configuration, traffic and convergence remain unexecuted.')
write('content/enrichment.json',manifest)
for tool in ['catalog.py','progress.py']: subprocess.run(['python','tools/'+tool],cwd=root,check=True)
write('docs/acceptance-batch-10.json',dict(date='2026-10-09',status='ACCEPTED',reviewer='Primary assistant',originalSpecification='22 topic criteria and13 batch gates retained',acceptedTopicCount=20,overallAcceptedOriginalNodes=135,topicCriteria=criteria,topics=topics,batchGates=gates,regressionEvidence='docs/batch-10-regression-results.json',regressionCommands=14,independentPrimaryCases=20508,manualReviewSheets=40,acceptedStateEvidence='docs/browser-batch-10-acceptance-results.json',limits=limits,nextBatch='11',nextNode='s4-g0-t0'))
validation='''# Batch10 acceptance — 2026-10-09

Advanced Routing & Switching is editorially complete: Batch09 routing and all20 Batch10 route-control, VRF, gateway redundancy, multicast, QoS and integrated lab lessons are accepted. The course now contains135 authored/accepted original nodes,1,350 exams and405 quick checks;307 originals remain.

Primary reviewed200 exams and60 quick checks, technical semantics, version applicability and the complete advanced workbook. Fixed prose spacing and replaced repeated route-control lab prompts with topic-specific investigations. Forty inspected contact sheets cover140 rendered views. All fourteen sequential regression commands passed, including20,508 independent primary model expectations, seven staging suites, shared content and reader checks, full Batch10 browser checks and cross-course quality audit. Responsive checks cover320/390/768/1440 widths, both themes, table scrolling, keyboard/reset, invalid input, inert text, timed flow and reduced-motion static alternatives.

See [acceptance](acceptance-batch-10.json), [primary review](review-batch-10.json), [question review](exam-review-batch-10.json), [command scope](commands-results-batch-10.json), [regression outputs](batch-10-regression-results.json), [reviewed sheet hashes](batch-10-manual-review-hashes.json) and [accepted-state browser evidence](browser-batch-10-acceptance-results.json).

Batch10 models consume supplied declarations or bounded ideal calculations. Target-router commands and workbook build/fault/restore remain GUIDED_NOT_EXECUTED; no device traffic, convergence or application measurement is claimed. Worksheet agreement is not original service evidence. Historical Batch09 actual isolated Linux/FRR fixtures retain their recorded limits. Learner checkmarks remain independent. Work proceeded directly after the user said not to use GapCode.

Reproduce model/content/browser regression with `python tools/regression-batch-10.py` from the workspace root while the documented localhost server is running. Browser tests require the installed Playwright runtime and Microsoft Edge. Next editorial work: Batch11, `s4-g0-t0`.
'''
(root/'docs/validation-batch-10.md').write_text(validation,encoding='utf-8')
p=root/'README.md';text=p.read_text(encoding='utf-8');lines=text.splitlines();lines[2]='Current checkpoint:135 accepted original nodes through Batch10;135 authored lessons,1,350 exams and405 quick checks. Advanced Routing & Switching is complete; Batch11 is next.';text='\n'.join(lines)+'\n'
start=text.index('Batch 01 contains');end=text.index('\n\nThe RAID model',start)
text=text[:start]+'Batches01–10 provide135 accepted lessons, each with teaching, a mechanism diagram/stepper, practical guidance, troubleshooting, a scoped lab, three quick checks and ten original exams. Advanced Routing & Switching is complete, including route control, VRF/VRF-Lite, HSRP/VRRP/GLBP, multicast/PIM/IGMP, QoS and the integrated advanced lab. See [Batch10 verification](docs/validation-batch-10.md) for current evidence. The dated checkpoints below are historical records.'+text[end:]
text=text.replace('Its full original draft lesson is integrated; BGP attributes authoring is next and full Batch 09 acceptance remains pending.','Its complete lesson and all Batch09/10 lessons are now accepted. Next editorial work is Batch11 (`s4-g0-t0`).')
text=text.replace('current progress is 61/442','that historical progress snapshot was 61/442')
text=text.replace('## Current EIGRP','## Historical EIGRP').replace('### Current Batch 08','### Historical Batch 08')
text=text.replace('## Continue the curriculum','## Continue the curriculum\n\nCurrent next step: Batch11 (`s4-g0-t0`). Historical development notes below describe the retained runtime evidence.')
for title in ['ERSPAN draft checkpoint','BGP fundamentals integrated draft','eBGP integrated draft','iBGP integrated draft']:
    text=text.replace('## '+title,'## Historical '+title)
text=text.replace('**Next: Batch 08, STP','**Historical next step: Batch 08, STP')
text+='\n## Batch10 accepted — 2026-10-09\n\nAll20 remaining advanced lessons are accepted, completing Advanced Routing & Switching. Fourteen regression commands and20,508 independent model expectations pass;200 exams/60 quick checks and40 visual review sheets were inspected. The guided Cisco workbook remains unexecuted. Course editorial progress is135/442; learner progress stays separate. Next:Batch11 (`s4-g0-t0`). See [acceptance](docs/acceptance-batch-10.json) and [validation](docs/validation-batch-10.md). Direct work followed the user instruction not to use GapCode.\n'
p.write_text(text,encoding='utf-8')
p=root/'ROADMAP_DECISIONS.md';p.write_text(p.read_text(encoding='utf-8')+'\n\n## ADR47 — Accept Advanced Routing & Switching with scoped evidence\n\nAccept all20 Batch10 originals after primary technical/assessment/workbook review,40 inspected visual sheets,14 passing regression commands and20,508 independent model expectations. Preserve admission, selection, installation, forwarding, return and original service declarations separately; retain bounded multicast and QoS contracts. Target configuration/fault/restore is guided and unexecuted. Course acceptance advances to135/442 and Batch11 (`s4-g0-t0`), without changing learner progress or claiming the whole roadmap complete. Latest user instruction prohibits GapCode; primary performed the changes and verification directly.\n',encoding='utf-8')
print(f'Accepted20 topics;135 originals. {len(blocks)} guided command blocks. Run accepted-state verification next.')
