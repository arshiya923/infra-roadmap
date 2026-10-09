"""Final sequential regression and acceptance/hash reconciliation."""
from pathlib import Path
import hashlib,json,os,re,subprocess,sys
R=Path(__file__).resolve().parents[1];env=os.environ.copy()
env.setdefault('NODE_PATH',r'C:\Users\Arshiya\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules')
commands=[['node','tests/content.cjs'],['node','tests/storage-virtualization-models.cjs'],[sys.executable,'tests/storage-virtualization-lab.py']]
commands += [[sys.executable,'tests/storage-virtualization-content.py',b] for b in ('19','20','21')]
commands += [['node','tests/storage-virtualization-final-browser.cjs','--accepted'],['node','tests/browser.cjs'],['node','tests/quality-audit.cjs']]
results=[]
for command in commands:
 p=subprocess.run(command,cwd=R,env=env,text=True,encoding='utf-8',errors='replace',capture_output=True)
 results.append(dict(command=command,exit=p.returncode,stdout=p.stdout,stderr=p.stderr))
 print(('PASS' if p.returncode==0 else 'FAIL')+' '+' '.join(command),flush=True)
 if p.returncode:print(p.stdout,p.stderr);break
assert len(results)==len(commands) and all(r['exit']==0 for r in results)
read=lambda p:json.loads((R/p).read_text(encoding='utf-8'))
def digest(x):return hashlib.sha256(json.dumps(x,ensure_ascii=False,sort_keys=True).encode()).hexdigest()
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));m=read('content/enrichment.json')
assert len(m['completedNodeIds'])==321 and m['currentBatch']=='22' and m['nextNode']=='s9-g0-t0'
assert hashlib.sha256((R/'original/index.html').read_bytes()).hexdigest()==read('content/roadmap-inventory.json')['sha256']
for b in ('19','20','21'):
 bm=next(x for x in m['batches'] if x['id']==b);assert bm['status']=='completed' and not bm.get('draftNodeIds')
 review=read(f'docs/storage-virtualization-primary-review-{b}.json');accept=read(f'docs/acceptance-batch-{b}.json')
 for l in bundles[b]:
  for report in (review,accept):
   t=next(x for x in report['topics'] if x['id']==l['id']);assert t['sha256']==digest(l)
   assert t['questions']=={q['questionId']:digest(q) for q in l['quick']+l['exams']}
 for relative in [f'docs/validation-batch-{b}.md',f'labs/storage-virtualization-{b}-workbook.md']:
  text=(R/relative).read_text(encoding='utf-8')
  for target in re.findall(r'\]\(([^)]+)\)',text):
   if not re.match(r'^[a-z]+:',target) and not target.startswith('#'):assert ((R/relative).parent/target.split('#')[0]).exists(),target
for relative in ['scripts/storage-virtualization.js','tools/storage-virtualization-authoring.py','tools/build-storage-virtualization.py']:
 text=(R/relative).read_text(encoding='utf-8');assert not any(x in text for x in ['\u00c2\u00b7','\u00e2\u20ac','\u00e2\u2020','\u00c3\u00a2']),relative+' text encoding'
audit=read('docs/quality-audit-latest.json');(R/'docs/quality-audit-batch-21.json').write_text(json.dumps(audit,indent=2)+'\n',encoding='utf-8')
files=['scripts/storage-virtualization.js','styles/storage-virtualization.css','labs/storage-evidence.py','labs/storage-virtualization.py','content/batch-19.js','content/batch-20.js','content/batch-21.js','content/enrichment.json','content/catalog.js']
report=dict(result='PASS',date='2026-10-09',commands=results,addedLessons=47,addedExams=470,addedQuickChecks=141,acceptedOriginal=321,totalOriginal=442,modelChecks=read('docs/storage-virtualization-model-results.json')['checks'],labChecks=read('docs/storage-virtualization-lab-results.json')['checks'],hashes={p:hashlib.sha256((R/p).read_bytes()).hexdigest() for p in files},scope='Nine fresh sequential regression commands plus acceptance/question hash, immutable source, UTF-8 and local documentation link checks. Focused 47-route evidence and primary visual review are separately retained.')
(R/'docs/storage-virtualization-regression-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print('PASS final acceptance and evidence reconciliation',flush=True)
