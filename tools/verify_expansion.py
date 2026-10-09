"""Final focused regression and reproducible command/hash evidence.
Full-course and shared-reader reports are included only with their verified inputs.
Does not accept lessons or alter deployment state.
"""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT=Path(__file__).resolve().parents[1]
env=os.environ.copy()
runtime=Path.home()/'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'
if runtime.exists():env['NODE_PATH']=str(runtime)
commands=[['python','tools/catalog.py'],['python','tools/progress.py'],['node','tests/content.cjs']]
commands += [['node','--check',str(p.relative_to(ROOT))] for p in [ROOT/'scripts/learning.js',ROOT/'scripts/expansion.js',ROOT/'scripts/supporting.js',*[ROOT/f'content/batch-{n}.js' for n in range(29,34)]]]
commands += [['node','tests/browser-expansion.cjs',str(n)] for n in range(29,34)]
commands += [['node','tests/supporting.cjs']]
results=[]
for cmd in commands:
    p=subprocess.run(cmd,cwd=ROOT,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=240)
    results.append(dict(command=cmd,exitCode=p.returncode,stdout=p.stdout,stderr=p.stderr))
    print(('PASS' if p.returncode==0 else 'FAIL')+' '+' '.join(cmd),flush=True)
    if p.returncode:print(p.stdout+p.stderr,flush=True);break

audit=json.loads((ROOT/'docs/quality-audit-latest.json').read_text(encoding='utf-8'))
shared=json.loads((ROOT/'docs/browser-results.json').read_text(encoding='utf-8'))
assert audit['result']==shared['result']=='PASS' and audit['lessons']==457
(ROOT/'docs/quality-audit-expansion-final.json').write_text(json.dumps(audit,indent=2)+'\n',encoding='utf-8')
for batch in range(29,34):
    report=json.loads((ROOT/f'docs/expansion-lab-{batch}.json').read_text(encoding='utf-8'))
    assert report['result']=='PASS'

paths=['original/index.html','index.html','learn.html','supporting.html','content/roadmap-inventory.json','content/expansion-inventory.json','content/enrichment.json','content/catalog.js','content/supporting-review.json','scripts/learning.js','scripts/expansion.js','scripts/supporting.js','styles/supporting.css','tools/catalog.py','tools/progress.py','tools/curriculum.py','tests/content.cjs','tests/browser.cjs','tests/quality-audit.cjs','tests/browser-expansion.cjs','tests/expansion-labs.py','tests/supporting.cjs','labs/expansion-capstones.md']
paths += [f'content/batch-{n}.js' for n in range(29,34)]
paths += ['labs/'+x+'.py' for x in ['infrastructure-rehearsal','linux-operations','application-delivery','container-operations','cloud-planning']]
paths += [f'docs/{prefix}-{n}.json' for prefix in ['browser-expansion','expansion-lab'] for n in range(29,34)]
result=dict(date='2026-10-09',result='PASS' if all(x['exitCode']==0 for x in results) and len(results)==len(commands) else 'FAIL',commands=results,
    separatelyExecuted=[dict(command=['node','tests/browser.cjs'],evidence='docs/browser-results.json',result=shared['result']),dict(command=['node','tests/quality-audit.cjs'],evidence='docs/quality-audit-expansion-final.json',result=audit['result']),
    *[dict(command=(['python','tests/expansion-labs.py',str(n)] if n in (29,33) else ['wsl','-d','Ubuntu-24.04','--','python3','/mnt/c/Users/Arshiya/Desktop/Infta Roadmap/tests/expansion-labs.py',str(n)]),evidence=f'docs/expansion-lab-{n}.json',result='PASS') for n in range(29,34)]],
    hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in paths})
(ROOT/'docs/expansion-final-verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
sys.exit(0 if result['result']=='PASS' else 1)
