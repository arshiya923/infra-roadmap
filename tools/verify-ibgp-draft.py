"""Verify iBGP and shared routes without claiming full-batch acceptance."""
import hashlib,json,subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
commands=[['node','tests/content.cjs'],['node','tests/ibgp-models.cjs'],['node','tests/browser-ibgp.cjs'],['node','tests/browser-ibgp-lesson.cjs'],['node','tests/browser-ebgp-lesson.cjs'],['node','tests/browser-bgp.cjs'],['node','tests/browser.cjs'],['node','tests/quality-audit.cjs']]
checks=[]
for c in commands:
 r=subprocess.run(c,cwd=root,capture_output=True,encoding='utf-8',errors='replace',timeout=180);d=dict(command=c,exitCode=r.returncode,result='PASS' if r.returncode==0 else 'FAIL',output=r.stdout.strip(),error=r.stderr.strip() or None);checks.append(d);print(d['result']+' '+' '.join(c),flush=True)
 if r.returncode:print(r.stderr or r.stdout,flush=True)
report=dict(date='2026-10-09',result='PASS' if all(c['exitCode']==0 for c in checks) else 'FAIL',checks=checks,sourceSha256={p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in ['content/batch-09.js','scripts/ibgp-models.js','styles/ibgp.css','scripts/learning.js','learn.html']},scope='Fifteen authored routing drafts;110 authored lessons total;95 accepted original nodes. iBGP fixed declared source/target/session/role/resolution/selection context only. No actual iBGP/RR, originator/cluster-loop history, full best-path/FSM, physical forwarding, application or convergence execution.')
(root/'docs/ibgp-draft-regression-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');sys.exit(0 if report['result']=='PASS' else 1)
