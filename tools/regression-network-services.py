"""Run the declared Network Services regression; localhost preview must already be running."""
import json,os,subprocess,time
from pathlib import Path
root=Path(__file__).resolve().parents[1]
env=os.environ.copy();env['NODE_PATH']=r'C:\Users\Arshiya\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
commands=[['node','--check','scripts/network-services-models.js'],['node','--check','scripts/learning.js'],['node','tests/content.cjs'],['node','tests/network-services-models.cjs'],['node','tests/commands-network-services.cjs'],['wsl','-d','Ubuntu-24.04','--','python3','/mnt/c/Users/Arshiya/Desktop/Infta Roadmap/tests/network-services-fixtures.py'],['node','tests/browser-network-services.cjs'],['node','tests/browser.cjs'],['node','tests/quality-audit.cjs']]
results=[]
for command in commands:
    start=time.monotonic();r=subprocess.run(command,cwd=root,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=900)
    results.append(dict(command=command,exit=r.returncode,seconds=round(time.monotonic()-start,2),stdout=r.stdout,stderr=r.stderr))
    (root/'docs/network-services-regression-results.json').write_text(json.dumps(dict(date='2026-10-09',result='PASS' if len(results)==len(commands) and all(x['exit']==0 for x in results) else 'IN_PROGRESS' if r.returncode==0 else 'FAIL',results=results),indent=2)+'\n',encoding='utf-8')
    print(f'{r.returncode}: {" ".join(command)}',flush=True)
    if r.returncode:raise SystemExit(r.returncode)
