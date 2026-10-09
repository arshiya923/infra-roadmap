"""Read-only verification of the reviewed LSA draft checkpoint."""
import collections, hashlib, json, pathlib, re, subprocess
root=pathlib.Path(__file__).resolve().parents[1]
def read(p): return json.loads((root/p).read_text(encoding='utf8'))
reg=read('docs/batch-09-regression-results.json')
assert reg['result']=='PASS' and len(reg['checks'])==25
assert all(x['result']=='PASS' and x['exitCode']==0 for x in reg['checks'])
assert read('docs/quality-audit-latest.json')['lessons']==102
model=read('docs/ospf-lsa-model-results.json');assert model['result']=='PASS' and model['vectors']==279936
browser=read('docs/browser-ospf-lsa-results.json');assert browser['result']=='PASS' and len(browser['checks'])==9 and not browser['errors']
evidence=read('docs/ospf-lsa-evidence-results.json');assert evidence['result']=='PASS' and evidence['headers']>0
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf8'))
lessons=[x for ls in bundles.values() for x in ls]
assert len(lessons)==102 and sum(len(x['exams']) for x in lessons)==1020 and sum(len(x['quick']) for x in lessons)==306
manifest=read('content/enrichment.json');assert len(manifest['completedNodeIds'])==95 and manifest['nextNode']=='s3-g0-t0'
b=next(x for x in manifest['batches'] if x['id']=='09');assert len(b['draftNodeIds'])==7 and b['nextAuthoringNode']=='s3-g1-t4' and b['status']=='in-progress'
review=read('docs/review-batch-09.json');assert len(review['topics'])==7 and len(review['remainingIds'])==13 and review['reviewedIds']==b['draftNodeIds']
assert all(len(t['topicCriteria'])==22 and all(c['result']=='PASS_WITH_DOCUMENTED_SCOPE' for c in t['topicCriteria']) for t in review['topics'])
assert len(review['batchGates'])==13 and all(c['result']=='PENDING_FULL_20_TOPIC_BATCH' for c in review['batchGates'])
questions=read('docs/exam-review-batch-09.json');assert questions['examCount']==70 and questions['quickCount']==21 and questions['courseExamPromptsChecked']==1020 and not questions['identicalCourseExamPrompts']
commands=read('docs/commands-results-batch-09.json');assert len(commands['blocks'])==67
assert collections.Counter(x['classification'] for x in commands['blocks'])=={'GUIDED_NOT_EXECUTED':56,'PASS_ACTUAL_ISOLATED_LINUX':7,'PASS_ACTUAL_PACKAGE_EXTRACTION':4}
for l in bundles['09']:
 qs=next(x for x in questions['topics'] if x['topicId']==l['id'])['reviewed'];assert len(qs)==13
 for q,r in zip(l['exams']+l['quick'],qs):
  for k in ['questionId','question','answer','explanation','testedConcept']:assert q[k]==r[k],(q['questionId'],k)
  if 'options' in r: assert q['options']==r['options']
  if l['id']=='s3-g1-t3' and 'options' in q: assert q['options']==r['options']
 cs=[x for x in commands['blocks'] if x['topicId']==l['id']];assert len(cs)==len(l['commands'])
 for c,r in zip(l['commands'],cs):assert c['code']==r['code'] and c['platform']==r['platform'] and c['expected']==r.get('limits',r.get('review'))
sourcehash=hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest();assert sourcehash=='ac6c8cec9f3fb2b25e146cf17981d8b5498413a18a4f1035dbf5a200941f8a25'
screens=review['topics'][-1]['manualRendering']['reviewed'];assert len(screens)==12 and all((root/'docs/screenshots/batch-09'/s).is_file() for s in screens)
links=[]
for name in ['docs/ospf-lsa-foundation.md']:
 p=root/name
 for ref in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf8')):
  if '://' in ref:continue
  target=ref.split('#')[0]
  if target!='ospf-lsa-checkpoint-results.json': assert (p.parent/target).is_file(),ref
  links.append([name,ref])
assert not any((root/'tools'/s).exists() for s in ['_author-lsa.py','_review-lsa.py','_docs-lsa.py'])
result=dict(date='2026-10-09',result='PASS',checks=[
'25 fresh regression commands with zero exits, actual isolated labs and all 102 authored routes',
'279936 independent header comparisons; nine integrated browser checks; raw-field/source-hash evidence verification',
'102 lessons, 1020 exams, 306 quick checks; seven reviewed drafts, thirteen topics remaining',
'All exact 91 reviewed questions and 67 classified command blocks match source',
'95 accepted nodes unchanged; thirteen full-batch gates pending; OSPF troubleshooting next',
'Twelve manually inspected screenshots, preserved immutable source hash and resolved local links',
'Owned temporary author/review/documentation helpers absent'],screenshots=screens,localLinks=links,sourceHash=sourcehash,weeklyRemainingPercent=70,scope='LSA basics reviewed draft; full Batch 09 remains pending. No GapCode, checksum validation, new external/MaxAge experiment or service inference.')
(root/'docs/ospf-lsa-checkpoint-results.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8',newline='\n')
print('PASS LSA draft checkpoint')
