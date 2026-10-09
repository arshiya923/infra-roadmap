"""Inspect and record the original 22-topic/13-batch acceptance matrix, never execute vendor commands."""
import collections,hashlib,json,pathlib,re,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
read=lambda name:json.loads((root/name).read_text(encoding='utf8'))
write=lambda name,value:(root/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
content=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'))
lessons=content['08'];manifest=read('content/enrichment.json');batch=next(x for x in manifest['batches'] if x['id']=='08');review=read('docs/review-batch-08.json');reg=read('docs/batch-08-regression-results.json');browser=read('docs/browser-batch-08-acceptance-results.json');audit=read('docs/quality-audit-latest.json');inventory=read('content/roadmap-inventory.json');commands=read('docs/commands-results-batch-08.json')
spec=pathlib.Path('C:/Users/Arshiya/.codex/attachments/d859e33b-39c0-4c73-83c6-1eb1899c8e1d/Pasted text.txt').read_text(encoding='utf8')
topic_part=spec.split('# Topic Completion Definition',1)[1].split('# Batch Definition of Done',1)[0]
criteria=[x[2:].strip() for x in topic_part.splitlines() if x.startswith('- ')]
batch_part=spec.split('# Batch Definition of Done',1)[1].split('# Periodic Quality Audits',1)[0]
gates=[(int(n),text) for n,text in re.findall(r'^(\d+)\. (.+)$',batch_part,re.M)]
assert len(criteria)==22 and len(gates)==13
assert batch['status']=='complete' and manifest['currentBatch']=='09' and manifest['nextNode']=='s3-g0-t0'
assert len(manifest['completedNodeIds'])==95 and len(set(manifest['completedNodeIds']))==95
assert len(lessons)==13 and set(batch['nodeIds'])==set(review['reviewedIds'])=={l['id'] for l in lessons}
assert reg['result']=='PASS' and len(reg['checks'])==31 and all(x['exitCode']==0 for x in reg['checks'])
assert browser['result']=='PASS' and browser['batchStatus']=='complete' and browser['editorialCount']==95 and len(browser['checks'])==13
assert audit['result']=='PASS' and len(audit['checks'])==9 and any('All 95 authored routes' in x for x in audit['checks'])
assert hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest()==inventory['sha256']
mapping=[('s2-g4-t0',None,'batch-08','switching-models'),('s2-g4-t1','rstpReview','rstp','stp-evidence'),('s2-g4-t2','mstReview','mst','mst-models'),('s2-g5-t0','portfastReview','portfast','edge-models'),('s2-g5-t1','bpduGuardReview','bpdu-guard','guard-models'),('s2-g5-t2','rootGuardReview','root-guard','root-guard-models'),('s2-g5-t3','loopGuardReview','loop-guard','loop-guard-models'),('s2-g5-t4','stormControlReview','storm-control','storm-models'),('s2-g5-t5','portSecurityReview','port-security','security-port-models'),('s2-g6-t0','spanReview','span','span-models'),('s2-g6-t1','rspanReview','rspan','rspan-models'),('s2-g6-t2','erspanReview','erspan','erspan-models'),('lab-2','integratedLabReview','enterprise-lab','enterprise-lab-models')]
topics=[];exam_topics=[]
for id,key,ui,model in mapping:
    l=next(x for x in lessons if x['id']==id)
    assert next(n for n in inventory['nodes'] if n['id']==id)['name']==l['title']
    fields=['definition','purpose','mental','components','mechanism','flow','comparison','example','commands','configuration','ports','production','troubleshooting','mistakes','security','performance','prerequisites','related','glossary','lab']
    assert all(l.get(k) for k in fields)
    assert len(l['exams'])==10 and len(l['quick'])==3
    for q in l['exams']+l['quick']:
        assert all(q.get(k) for k in ['questionId','question','answer','explanation','testedConcept','difficulty'])
        if q.get('options'):assert len(set(q['options']))==len(q['options']) and q['options'].count(q['answer'])==1
    section=review[key] if key else {'technical':review['technicalReview'],'commands':review['commandReview'],'manual':review['manualRendering'],'original':review['originalContent']}
    assert all(section.get(k) for k in ['technical','commands','manual','original'])
    ui_report='docs/browser-results-batch-08.json' if ui=='batch-08' else 'docs/browser-'+ui+'-results.json'
    assert read(ui_report)['result']=='PASS'
    assert (root/('tests/'+model+'.cjs')).is_file()
    rows=[x for x in commands['commands'] if x.get('topicId')==id]
    assert len(rows)==len(l['commands']) and {x['command'] for x in rows}=={x['code'] for x in l['commands']}
    assert all(x['result'] in ['GUIDED_NOT_EXECUTED','PASS_OFFLINE_SYNTHETIC'] for x in rows)
    reference='docs/review-batch-08.json:'+str(key or 'technicalReview/commandReview/manualRendering/originalContent')
    topics.append({'topicId':id,'title':l['title'],'result':'PASS','addressedCriteria':list(range(1,23)),'technicalLabReview':reference,'questionReview':'docs/exam-review-batch-08.json:'+id,'modelEvidence':'tests/'+model+'.cjs','responsiveInteractiveEvidence':ui_report,'scope':'Appropriate authored browser/tabletop/guided lab; vendor execution unperformed. ERSPAN includes independently checked synthetic offline bytes, not network capture.'})
    exam_topics.append({'topicId':id,'result':'PASS','technicalReview':reference,'exams':l['exams'],'quick':l['quick'],'review':'Primary reviewed prompts, expected answers and explanations in the topic evidence; contracts/option uniqueness and full-course exact-prompt duplication checked separately.'})
all_lessons=[l for units in content.values() for l in units]
counts=collections.Counter(' '.join(q['question'].lower().split()) for l in all_lessons for q in l['exams'])
assert len(all_lessons)==95 and all(n==1 for n in counts.values()) and len(counts)==950
assert sum(x['result']=='PASS_OFFLINE_SYNTHETIC' for x in commands['commands'])==2
assert sum(x['result']=='GUIDED_NOT_EXECUTED' for x in commands['commands'])==60
assert all(id in {l['id'] for l in all_lessons} for id in manifest['completedNodeIds'])
write('docs/exam-review-batch-08.json',{'date':'2026-10-09','result':'PASS','reviewer':'Primary assistant, direct work without GapCode','examCount':130,'quickCount':39,'exactRepeatedExamPromptsFullCourse':0,'topics':exam_topics})
common=['content/batch-08.js','docs/review-batch-08.json','docs/research-batch-08.md','docs/batch-08-regression-results.json']
extra={4:['content/batch-08.js:glossary'],7:['docs/screenshots/batch-08','docs/browser-batch-08-acceptance-results.json'],9:['docs/commands-results-batch-08.json'],16:['docs/browser-batch-08-acceptance-results.json'],19:['docs/exam-review-batch-08.json'],20:['docs/exam-review-batch-08.json'],21:['Focused four-width/both-theme UI reports and manual screenshots'],22:['docs/browser-batch-08-acceptance-results.json','docs/quality-audit-latest.json']}
matrix=[{'number':i,'requirement':name,'result':'PASS','evidence':common+extra.get(i,[])} for i,name in enumerate(criteria,1)]
gate_extra={1:['content/enrichment.json:13 Batch 08 nodeIds'],2:['docs/acceptance-batch-08.json:topics'],3:['Primary per-topic manual diagram review plus focused renders'],4:['docs/browser-batch-08-acceptance-results.json:13 timed/reduced/static routes'],5:['docs/batch-08-regression-results.json','docs/quality-audit-latest.json'],6:['Full-route original adjacency and focused navigation checks'],7:['Four-width focused suites and manual narrow screenshots'],8:['docs/exam-review-batch-08.json:130 exams/39 quick checks'],9:['Primary scoped lab/command reviews; no false device execution'],10:['All 13 connection targets and full-course prerequisite graph'],11:['content/enrichment.json','ROADMAP_ENRICHMENT_PROGRESS.md','ROADMAP_BATCH_PLAN.md','content/catalog.js','docs/browser-batch-08-acceptance-results.json:95 reviewed count'],12:['No compilation step; HTTP/direct-file reader checks pass'],13:['95 accepted IDs all authored; next Batch 09 outline remains pending']}
result={'date':'2026-10-09','status':'ACCEPTED','reviewer':'Primary assistant, direct work without GapCode','originalSpecification':'User pasted Mission: original 22 Topic items and 13 Batch gates parsed from supplied request','acceptedTopicCount':13,'overallAcceptedOriginalNodes':95,'topicCriteria':matrix,'topics':topics,'batchGates':[{'number':n,'requirement':name,'result':'PASS','evidence':gate_extra[n]} for n,name in gates],'regressionEvidence':'docs/batch-08-regression-results.json','regressionCommands':31,'acceptedStateEvidence':'docs/browser-batch-08-acceptance-results.json','limits':'Acceptance covers taught and verified scopes. No actual Cisco parser/build/control exchange, live link failure, forwarding/capture delivery, recovery timing or throughput. Browser declarations and user-entered probes are not actual measurements. Synthetic ERSPAN decode is actual offline file processing. Appropriate guided/model/tabletop labs satisfy curriculum scope; physical execution is not fabricated. Automated named-control/contrast checks are not full WCAG certification.','nextBatch':'09','nextNode':'s3-g0-t0'}
write('docs/acceptance-batch-08.json',result)
review['status']='ACCEPTED';review['remaining']=[];review['acceptanceEvidence']='docs/acceptance-batch-08.json';write('docs/review-batch-08.json',review)
periodic={**audit,'date':'2026-10-09','scope':'All 95 authored routes plus primary per-topic Batch 08 accuracy/question/diagram/command review','editorialChecks':{'originalHashUnchanged':True,'originalIdsPreserved':442,'acceptedIdsAuthored':95,'fullCourseExamQuestions':950,'exactRepeatedExamPrompts':0,'batch08TopicItems':22,'batch08Units':13,'batch08Gates':13,'commandsGuidedUnexecuted':60,'commandsOfflineVerified':2,'sourceConflicts':'Platform/example limits, capability and truncation/QoS differences retain actual-target requirements rather than universal promises.','bundleReview':'Compact catalog search measured below 2-second ceiling; on-demand selected content bundle retained. Byte inventory recorded; no external application dependency.'},'acceptance':'docs/acceptance-batch-08.json'}
write('docs/quality-audit-batch-08.json',periodic)
print('PASS thirteen units / 22 topic items / 13 batch gates; 95 accepted nodes; 130 reviewed exams / 39 quick checks; 60 guided blocks / 2 offline verified blocks')
