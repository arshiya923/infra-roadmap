"""Verify generated accepted state without repeating unchanged model suites."""
import hashlib,json,os,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
os.environ.setdefault('NODE_PATH',r'C:\Users\Arshiya\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules')
checks=[]
for script in ['tests/content.cjs','tests/browser-batch-10-acceptance.cjs','tests/browser.cjs','tests/quality-audit.cjs']:
    r=subprocess.run(['node',script],cwd=root,capture_output=True,text=True,encoding='utf-8')
    checks.append(dict(command=['node',script],exitCode=r.returncode,result='PASS' if r.returncode==0 else 'FAIL',output=r.stdout,error=r.stderr))
    print(script,checks[-1]['result'],flush=True)
    if r.returncode: break
manifest=json.loads((root/'content/enrichment.json').read_text(encoding='utf-8'))
browser=json.loads((root/'docs/browser-batch-10-acceptance-results.json').read_text(encoding='utf-8'))
valid=len(manifest['completedNodeIds'])==135 and manifest['currentBatch']=='11' and manifest['nextNode']=='s4-g0-t0' and browser['editorialCount']==135 and browser['batchStatus']=='complete'
valid=valid and all(n in manifest['completedNodeIds'] for b in manifest['batches'] if b['id'] in ['09','10'] for n in b['nodeIds'])
result='PASS' if len(checks)==4 and all(c['exitCode']==0 for c in checks) and valid else 'FAIL'
out=dict(date='2026-10-09',result=result,editorialCount=135,advancedSectionComplete=valid,checks=checks,sourceSha256={p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in ['content/enrichment.json','content/batch-10.js','content/catalog.js','ROADMAP_ENRICHMENT_PROGRESS.md','ROADMAP_BATCH_PLAN.md','README.md'] if (root/p).exists()})
(root/'docs/batch-10-final-verification.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(result,flush=True)
raise SystemExit(0 if result=='PASS' else 1)
