"""Fresh targeted eBGP/shared-reader verification; separate from full-batch acceptance."""
import hashlib,json,subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
commands=[['node','tests/content.cjs'],['node','tests/ebgp-policy-models.cjs'],['node','tests/browser-ebgp-policy.cjs'],['node','tests/browser-ebgp-lesson.cjs'],['node','tests/browser-bgp-lesson.cjs'],['node','tests/browser-bgp.cjs'],['node','tests/browser.cjs']]
checks=[]
for command in commands:
    r=subprocess.run(command,cwd=root,capture_output=True,encoding='utf-8',errors='replace',timeout=180)
    item=dict(command=command,exitCode=r.returncode,result='PASS' if r.returncode==0 else 'FAIL',output=r.stdout.strip(),error=r.stderr.strip() or None)
    checks.append(item);print(item['result']+' '+' '.join(command),flush=True)
    if r.returncode:print(r.stderr or r.stdout,flush=True)
audit=json.loads((root/'docs/quality-audit-latest.json').read_text(encoding='utf-8'))
assert audit['result']=='PASS' and any('All 109 authored routes' in x for x in audit['checks'])
result=dict(date='2026-10-09',result='PASS' if all(x['exitCode']==0 for x in checks) else 'FAIL',checks=checks,allRouteAudit='docs/quality-audit-latest.json',sourceSha256={p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in ['content/batch-09.js','scripts/ebgp-policy-models.js','scripts/learning.js','learn.html','labs/bgp-routing.sh']},scope='Fourteen authored routing drafts, 109 total authored lessons and 95 accepted originals. New eBGP declaration worksheet has ten scenarios and512 masks. Actual BGP companion unchanged from the preceding 44-command passing regression; no import/export/AS-loop/multihop mutation or measured application/convergence added. Full batch acceptance pending.')
(root/'docs/ebgp-draft-regression-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
sys.exit(0 if result['result']=='PASS' else 1)
