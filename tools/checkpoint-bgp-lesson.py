"""Record the primary-reviewed BGP draft only after current regression evidence passes."""
import collections
import hashlib
import json
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[1]
def read(name):
    return json.loads((root / name).read_text(encoding='utf-8'))
def write(name, value):
    (root / name).write_text(json.dumps(value, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

reg = read('docs/batch-09-regression-results.json')
assert reg['result'] == 'PASS' and len(reg['checks']) == 44
assert all(x['result']=='PASS' and x['exitCode']==0 for x in reg['checks'])
for name in ['browser-bgp-lesson-results', 'bgp-evidence-results', 'bgp-routing-lab-results', 'quality-audit-latest']:
    assert read('docs/'+name+'.json')['result']=='PASS'
bundles = json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf-8'))
lessons = [l for b in bundles.values() for l in b]
lesson = next(l for l in lessons if l['id']=='s3-g3-t0')
assert len(lessons)==108 and len(lesson['exams'])==10 and len(lesson['quick'])==3
manifest=read('content/enrichment.json');batch=next(b for b in manifest['batches'] if b['id']=='09')
assert len(manifest['completedNodeIds'])==95 and len(batch['draftNodeIds'])==13 and batch['nextAuthoringNode']=='s3-g3-t1'
prompts=collections.Counter(q['question'] for l in lessons for q in l['exams'])
assert all(n==1 for n in prompts.values())
screens=['bgp-lesson-'+s+'.png' for s in ['desktop','mechanism','light-mobile','dark-mobile','table-start','table-end']]
hashes={s:hashlib.sha256((root/'docs/screenshots/batch-09'/s).read_bytes()).hexdigest() for s in screens}
write('docs/bgp-lesson-manual-screenshot-hashes.json',dict(date='2026-10-09',reviewer='Primary assistant',sha256=hashes))
technical=[
 'TCP179/base messages and conceptual RIBs separated from implementation stores and physical traffic.',
 'RFC8212 explicit import/export defaults separated from implementation options and unsafe permit-all intent.',
 'AS relationship, origin/network import-check, AS_PATH and recursive NEXT_HOP interpreted in exact family/table context.',
 'ORIGIN IGP and local empty-path/0.0.0.0 sentinel do not establish OSPF or a usable wire gateway.',
 'Established, candidate, selected/installed RIB, kernel and original bidirectional ICMP remain independent evidence layers.',
 'Known R2 origin withdrawal and exact restoration preserve sessions/configuration; startup capture does not prove phase NLRI, application behavior or elapsed convergence.',
 'Read-only inspection blocks now match retained FRR command forms; explicit runner command supplies the privately prepared FRR_ROOT.'
]
review=read('docs/review-batch-09.json')
assert 's3-g3-t0' not in review['reviewedIds']
evidence=['content/batch-09.js','scripts/bgp.js','docs/bgp-evidence-results.json','docs/bgp-routing-lab-results.json','docs/browser-bgp-lesson-results.json','docs/batch-09-regression-results.json']
topic=dict(topicId=lesson['id'],originalContent=dict(source='DATA.stages[3].groups[3].topics[0]',originalTitle='BGP fundamentals',priorAudit='Original outline preserved; full topic authored',foundation='Six actual observer/phase views and twelve prefix comparisons'),technicalReview=technical,commandReview='Five blocks: two isolated owned runner references reverified; three guided read-only inspections with retained command families. No execution on a new target claimed.',implementationReview=['Reader loads BGP evidence and model; existing text renderer and independent source-hash comparison retained.','Five integrated browser categories cover all twelve views, invalid inputs, exact downloads, four widths/two themes, keyboard scrolling, mechanism/reduced motion, assessment/progress and original adjacency.'],questionReview='docs/exam-review-batch-09.json:s3-g3-t0',manualRendering=dict(result='PASS',reviewed=screens,folder='docs/screenshots/batch-09',review='Primary inspected desktop, mechanism, both mobile themes and both table endpoints; endpoints are checked after keyboard scrolling settles.'),topicCriteria=[dict(number=c['number'],requirement=c['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for c in review['topics'][0]['topicCriteria']],evidenceLimits='One actual IPv4 external transit and known origin withdrawal. No full selection contest, iBGP/RR, live Cisco, RPKI/authentication, phase wire attributes, application/hardware or convergence benchmark. Full twenty-topic batch remains pending.')
review['topics'].append(topic);review['reviewedIds'].append(lesson['id']);review['remainingIds'].remove(lesson['id']);review['overallAuthoredLessons']=108;review['status']='THIRTEEN_TOPIC_REVIEW_BATCH_PENDING';review['nextAuthoringNode']='s3-g3-t1';review['evidenceLimits']+=' BGP fundamentals now has full reviewed teaching and thirteen assessments; seven Batch 09 topics remain.';write('docs/review-batch-09.json',review)
exams=read('docs/exam-review-batch-09.json')
exams['topics'].append(dict(topicId=lesson['id'],examCount=10,quickCount=3,reviewed=[dict(q,result='RETAINED_AFTER_PRIMARY_REVIEW',review='Checked against source-described conceptual boundaries and actual scoped companion records; one correct MC answer, written model answer and explanation retained.') for q in lesson['exams']],quickReviewed=[dict(q,result='RETAINED_AFTER_PRIMARY_REVIEW') for q in lesson['quick']]))
exams.update(result='PASS_THIRTEEN_TOPIC_REVIEW_BATCH_PENDING',examCount=130,quickCount=39,courseExamPromptsChecked=1080,review='Primary reviewed thirteen routing drafts and all 169 new questions. BGP questions distinguish control session, policy/prefix admission, table/attribute meaning, original round-trip requirements and exact repair/capture limits. No certification alignment.')
write('docs/exam-review-batch-09.json',exams)
commands=read('docs/commands-results-batch-09.json')
for i,c in enumerate(lesson['commands']):
    commands['blocks'].append(dict(topicId=lesson['id'],index=i+1,code=c['code'],platform='Owned Ubuntu24.04/FRR8.4.4' if i<2 else 'Prepared isolated FRR/Linux read-only context; guided',classification='ACTUAL_ISOLATED_LINUX' if i<2 else 'GUIDED_NOT_EXECUTED',evidence=['docs/bgp-routing-lab-results.json'] if i<2 else lesson['sources'],limits=c['expected']))
commands['summary']['total']+=5;commands['summary']['actualIsolatedLinux']+=2;commands['summary']['guidedNotExecuted']+=3;write('docs/commands-results-batch-09.json',commands)
checkpoint=dict(date='2026-10-09',result='PASS',nodeId=lesson['id'],checks=['44 fresh sequential regression commands pass','108 authored routes and original immutable source/IDs audited','Twelve BGP evidence combinations independently compared','Full draft has ten original exams and three quick checks reviewed','Six current rendering screenshots inspected and hashed','95 accepted original nodes unchanged; seven Batch09 topics plus all Batch10 remain'],scope=topic['evidenceLimits'],screenshots=screens)
write('docs/bgp-lesson-checkpoint-results.json',checkpoint)
checkpoint_text='''\n\n## BGP fundamentals integrated draft — 2026-10-09\n\nBGP fundamentals now has complete original teaching, a four-step mechanism, the six-view/twelve-prefix actual-evidence inspector, scoped procedures and thirteen original assessments. Session, admission, attributes, selected RIB, kernel and original return-service remain separate; no full best-path, Cisco/application/hardware or convergence execution is claimed. Forty-four fresh sequential regression commands pass across all 108 authored lessons. Six BGP screenshots and all thirteen questions were inspected by the primary assistant.\n\nTotals: 108 authored lessons, 1,080 exams, 324 quick checks and 95 accepted nodes. Thirteen Batch 09 drafts are reviewed; seven original topics and the full twenty-topic batch gates remain pending. Next authoring: eBGP (`s3-g3-t1`). The separate eBGP declaration worksheet has ten scenarios and 512 independently checked masks; its full lesson remains pending. No GapCode was used, following the current user instruction. See [BGP lesson checkpoint](docs/bgp-lesson-checkpoint-results.json) and [browser evidence](docs/browser-bgp-lesson-results.json).\n'''
p=root/'README.md';s=p.read_text(encoding='utf-8').replace('twelve reviewed routing drafts in Batch 09: 107 authored lessons, 1,070 exams and 321 quick checks','thirteen reviewed routing drafts in Batch 09: 108 authored lessons, 1,080 exams and 324 quick checks').replace('Its full original lesson authoring is next; full Batch 09 acceptance remains pending.','Its full original draft lesson is integrated; eBGP authoring is next and full Batch 09 acceptance remains pending.');p.write_text(s+checkpoint_text,encoding='utf-8')
for filename in ['docs/validation-batch-09.md','docs/bgp-runtime-foundation.md']:
    text=checkpoint_text.replace('(docs/','(')
    p=root/filename;p.write_text(p.read_text(encoding='utf-8')+text,encoding='utf-8')
p=root/'ROADMAP_DECISIONS.md';p.write_text(p.read_text(encoding='utf-8')+'''\n\n## ADR 43 — BGP prefix evidence integrated without inventing service\n\nThe full BGP draft reuses the actual explicit-policy single-transit origin withdrawal/repair. Keep conceptual BGP stores, candidate selection, system installation, local-origin sentinel, ORIGIN classification and bidirectional original probes separate. Startup type lists are not a phase withdrawal wire trace. The exact runner invocation supplies its privately prepared FRR_ROOT; guided CLI forms match retained capture commands. Reader hooks and original topology/BGP/eBGP adjacency work over HTTP and disk. Keep 95 accepted nodes until all twenty routing topics and full batch gates pass. The latest user instruction prohibits GapCode; all subsequent work is direct. Next: eBGP.\n''',encoding='utf-8')
print('PASS reviewed BGP fundamentals draft checkpoint; full batch remains pending.')
