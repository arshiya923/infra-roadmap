"""Record primary review of the five policy lessons and accept the twenty-node batch.

Run only after the primary has reviewed the authored content and all 35 new renders.
Retain historical per-topic reviews; do not re-sign older screenshots as freshly viewed.
"""
import collections, hashlib, json, subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
def read(p): return json.loads((root / p).read_text(encoding='utf-8'))
def write(p, d): (root / p).write_text(json.dumps(d, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
reg = read('docs/batch-09-regression-results.json')
assert reg['result'] == 'PASS' and len(reg['checks']) == 58
assert all(c['exitCode'] == 0 and c['result'] == 'PASS' for c in reg['checks'])
primary = read('docs/bgp-policy-primary-results.json')
assert primary['result'] == 'PASS' and primary['independentCases'] == 8064
for p, digest in primary['sourceSha256'].items():
    assert hashlib.sha256((root/p).read_bytes()).hexdigest() == digest, p
assert read('docs/browser-bgp-policy-series-results.json')['result'] == 'PASS'
bundles = json.loads(subprocess.check_output(['node','tools/read-content.cjs'], cwd=root).decode('utf-8'))
lessons = [l for b in bundles.values() for l in b]
batch = bundles['09']; assert len(batch) == 20 and len(lessons) == 115
prompts = collections.Counter(q['question'] for l in lessons for q in l['exams'])
assert len(prompts) == 1150 and all(n == 1 for n in prompts.values())
names = ['bgp-attributes','local-preference','med','as-path','communities']
ids = ['s3-g3-t3','s3-g4-t0','s3-g4-t1','s3-g4-t2','s3-g4-t3']
technical = [
    ['Declared attribute type and FLAGS class are separate from value validity and complete UPDATE validation.',
     'Optional/Transitive classification cannot distinguish mandatory from discretionary; the declared specification does.',
     'Partial and reserved bits, RFC7606 error handling, RFC9774 AS_SET restrictions and extended attribute length versus extended-message negotiation are explicitly scoped.',
     'Weight is an implementation-local preference, not an on-wire BGP attribute.'],
    ['Admission and NEXT_HOP resolution precede this fixed two-candidate LOCAL_PREF comparison.',
     'Earlier implementation-local factors are held equal; larger LOCAL_PREF wins, ties remain unresolved for later stages.',
     'System-source selection and original forward/return readiness are separate declarations.',
     'Import policy validation, ownership, rollback and well-known discretionary classification are source-described.'],
    ['Only ordinary nonempty AS_SEQUENCE candidates for one exact prefix are compared; leftmost ASN is supplied, not inferred from peer identity.',
     'Unequal LOCAL_PREF, path length or ORIGIN prevents a MED-only winner; default comparison requires the same neighboring AS.',
     'FRR8.4.4 missing MED is effective zero by default or UINT32_MAX with the explicit missing-as-worst setting, including equality at that boundary.',
     'Always-compare is an explicit local option. Full best-path, deterministic MED, multipath, route history and live RIB are excluded.'],
    ['Ordinary own-AS loop exclusion, supplied admission and NEXT_HOP resolution are checked before comparison.',
     'Higher LOCAL_PREF prevents the shorter-path stage; ordinary AS_SEQUENCE length is evaluated only after equal earlier factors.',
     'Equal lengths leave later stages unresolved. Four-byte ASN width, prepend direction and AS_SET/confederation exceptions remain source-described.',
     'System installation, original bidirectional readiness and no-packet scope remain independent.'],
    ['Standard 16-bit components and large 32-bit components have strict numeric widths, canonical sets and duplicate handling.',
     'Exact tags invoke only the declared local contract; tags do not universally assign LOCAL_PREF.',
     'NO_EXPORT, NO_ADVERTISE and NO_EXPORT_SUBCONFED apply to their stated target scopes; independent admission/export/session gates remain required.',
     'RFC1997 reserved blocks and RFC8092 reserved global administrators are described honestly; reserved values are not called malformed solely for being reserved.',
     'Numeric four-byte ASN4200000001 exceeds the standard 16-bit component width; large communities have no invented well-known export restrictions.']
]
limits = ('Actual isolated Linux/FRR fixtures retain their explicitly recorded topologies and phases. '
          'The five policy worksheets consume supplied declarations; no live UPDATE, full universal best-path, '
          'iBGP/RR execution, vendor hardware, packet service or convergence evidence is inferred. '
          'First fifteen manual reviews remain historical; the five new lessons have 35 directly reviewed current renders.')
screens = [n+'-lesson-'+s+'.png' for n in names for s in ['desktop','mechanism','flow','light-mobile','dark-mobile','table-start','table-end']]
write('docs/bgp-policy-series-manual-screenshot-hashes.json', dict(date='2026-10-09', reviewer='Primary assistant',
    scope='35 new policy lesson renders inspected directly; historical reviews retained separately',
    sha256={s: hashlib.sha256((root/'docs/screenshots/batch-09'/s).read_bytes()).hexdigest() for s in screens}))
review = read('docs/review-batch-09.json'); assert len(review['reviewedIds']) == 15
exam = read('docs/exam-review-batch-09.json'); commands = read('docs/commands-results-batch-09.json')
criteria = read('docs/acceptance-batch-08.json')['topicCriteria']
evidence = ['content/batch-09.js','docs/review-batch-09.json','docs/exam-review-batch-09.json',
            'docs/commands-results-batch-09.json','docs/batch-09-regression-results.json',
            'docs/browser-bgp-policy-series-results.json','docs/bgp-policy-primary-results.json',
            'docs/bgp-policy-series-manual-screenshot-hashes.json']
for name, node, technical_review in zip(names,ids,technical):
    l = next(l for l in batch if l['id'] == node)
    assert len(l['exams']) == 10 and len(l['quick']) == 3 and len(l['commands']) == 4
    assert isinstance(l['glossary'],dict)
    for q in l['exams']:
        if 'options' in q: assert q['answer'] in q['options']
    review['topics'].append(dict(topicId=node, originalContent=dict(source='Preserved original inventory '+node,
        originalTitle=l['title'], priorAudit='Original outline preserved; full lesson authored'),
        technicalReview=technical_review, commandReview='Four read-only guided context blocks; not executed on target routers.',
        implementationReview=['Strict parsing, isolated fresh presets and inert text output reviewed.',
          '79 supplied scenarios across five models, independent worker tests and8064 primary expectations pass.',
          'Unknown-context hiding survives later edits; malformed input hides stale output immediately, including repaired MED input listeners.',
          'HTTP/file routes, fifty MC answers, four widths in both themes, flow controls and focusable table overflow pass.'],
        questionReview='docs/exam-review-batch-09.json:'+node,
        manualRendering=dict(result='PASS', reviewed=[s for s in screens if s.startswith(name+'-lesson-')],
          folder='docs/screenshots/batch-09', review='Primary directly inspected desktop, mechanism, flow, two mobile themes and both table ends.'),
        topicCriteria=[dict(number=c['number'],requirement=c['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for c in criteria],
        evidenceLimits=limits))
    exam['topics'].append(dict(topicId=node,examCount=10,quickCount=3,
        reviewed=[dict(q,result='RETAINED_AFTER_PRIMARY_REVIEW',review='Checked exact scope, eligibility, boundary semantics and independent evidence declarations.') for q in l['exams']],
        quickReviewed=[dict(q,result='RETAINED_AFTER_PRIMARY_REVIEW') for q in l['quick']]))
    for i,c in enumerate(l['commands']): commands['blocks'].append(dict(topicId=node,index=i+1,code=c['code'],platform=c['platform'],
        classification='GUIDED_NOT_EXECUTED',evidence=l['sources'],limits=c['expected']))
review.update(status='ACCEPTED',reviewer='Primary assistant; five native worker agents, no GapCode',
    reviewedIds=[l['id'] for l in batch],overallAuthoredLessons=115,overallAcceptedOriginalNodes=115,
    remainingIds=[],nextAuthoringNode='s3-g5-t0',evidenceLimits=limits)
for gate in review['batchGates']:
    gate.update(result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence+['docs/browser-batch-09-acceptance-results.json'])
write('docs/review-batch-09.json',review)
exam.update(result='PASS_PRIMARY_REVIEW',examCount=200,quickCount=60,courseExamPromptsChecked=1150,
    identicalCourseExamPrompts=[],review='Primary reviewed all twenty topics;200 exams/60 quick checks. Five new models add50 exams/15 quick checks. No certification alignment claimed.')
write('docs/exam-review-batch-09.json',exam)
commands['summary']['total'] += 20; commands['summary']['guidedNotExecuted'] += 20
assert commands['summary']['total'] == 141 and commands['summary']['guidedNotExecuted'] == 115
write('docs/commands-results-batch-09.json',commands)
write('docs/bgp-policy-series-checkpoint-results.json',dict(date='2026-10-09',result='PASS',reviewedIds=ids,
    independentPrimaryCases=8064,presets=79,manualRenders=35,regressionCommands=58,
    assessments=dict(exams=50,quick=15),evidence=evidence,scope=limits))
manifest = read('content/enrichment.json'); b = next(b for b in manifest['batches'] if b['id']=='09')
assert set(b['nodeIds']) == set(review['reviewedIds']) and len(manifest['completedNodeIds']) == 95
manifest['completedNodeIds'] += b['nodeIds']; manifest.update(currentBatch='10',nextNode='s3-g5-t0')
b.update(status='complete',acceptedDate='2026-10-09',acceptanceEvidence='docs/acceptance-batch-09.json',nextAuthoringNode=None,
    interactions='Twenty reviewed lessons;200 exams/60 quick checks. Actual fixture inspectors and declared policy worksheets retain separate evidence scopes.')
b['visualizations'] += ' Attribute FLAGS, LOCAL_PREF, conditional MED, ordinary AS_SEQUENCE and community contract tables plus five labelled flows.'
write('content/enrichment.json',manifest)
for tool in ['catalog.py','progress.py']: subprocess.run(['python','tools/'+tool],cwd=root,check=True)
acceptance = dict(date='2026-10-09',status='ACCEPTED',reviewer=review['reviewer'],
    originalSpecification='Original 22 topic criteria and13 batch gates retained from user mission',
    acceptedTopicCount=20,overallAcceptedOriginalNodes=115,
    topicCriteria=[dict(number=c['number'],requirement=c['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for c in criteria],
    topics=review['topics'],batchGates=review['batchGates'],regressionEvidence='docs/batch-09-regression-results.json',
    regressionCommands=58,acceptedStateEvidence='docs/browser-batch-09-acceptance-results.json',limits=limits,nextBatch='10',nextNode='s3-g5-t0')
write('docs/acceptance-batch-09.json',acceptance)
text = ('\n\n## Batch09 accepted — 2026-10-09\n\nAll20 original routing topics are now reviewed and accepted. '
        'The course has115 accepted/authored lessons,1,150 exams and345 quick checks. Fifty-eight fresh regression commands pass. '
        'The five new BGP policy lessons add79 supplied scenarios,8,064 independent primary expectations and35 directly reviewed renders. '
        'Actual isolated routing fixtures and declared browser worksheets retain distinct scopes; target-router guidance is explicitly unexecuted. '
        'Native workers prepared bounded drafts and the primary reviewed and verified them. No GapCode used. '
        'Next:Batch10 route control, VRF, gateway redundancy, multicast, QoS and the advanced stage lab;20 original units remain. '
        'See [acceptance](docs/acceptance-batch-09.json) and [regression](docs/batch-09-regression-results.json).\n')
for p in ['README.md','docs/validation-batch-09.md']:
    file = root/p; s=file.read_text(encoding='utf-8')
    if p=='README.md':
        lines=s.splitlines(); lines[2]='Current checkpoint:115 accepted original nodes through Batch09;115 authored lessons,1,150 exams and345 quick checks. Batch10 is next.'; s='\n'.join(lines)+'\n'
    else: text=text.replace('(docs/','(')
    file.write_text(s+text,encoding='utf-8')
p=root/'ROADMAP_DECISIONS.md';p.write_text(p.read_text(encoding='utf-8')+'\n\n## ADR46 — Accept routing with explicit evidence boundaries\n\n'
    'Keep attribute classification, conditional candidate comparisons, local tag contracts, system installation and original traffic declarations distinct. '
    'Primary repaired stale MED input handling, reviewed all13 questions per policy topic and35 current renders, and required58 fresh regression checks. '
    'Batch09 all20 nodes accepted;115 course originals accepted. Reuse five native agents in separate staging paths for Batch10, with primary design/review/acceptance. No GapCode.\n',encoding='utf-8')
print('Recorded primary review and115 accepted nodes; run accepted-state browser verification next.')
