"""Run fresh declared checks serially against the existing localhost preview."""
from pathlib import Path
import json,os,subprocess,time
R=Path(__file__).resolve().parents[1];env=os.environ.copy();env['NODE_PATH']=r'C:\Users\Arshiya\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
commands=[['node','--check','scripts/data-center-models.js'],['node','--check','scripts/learning.js'],['node','tests/content.cjs'],['node','tests/data-center-models.cjs'],['node','tests/commands-data-center.cjs']]
if (R/'tests/data-center-plan.py').exists():commands.append(['python','tests/data-center-plan.py'])
commands += [['node','tests/browser-data-center.cjs'],['node','tests/browser.cjs'],['node','tests/quality-audit.cjs']]
results=[]
for command in commands:
 start=time.monotonic();r=subprocess.run(command,cwd=R,env=env,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=1200)
 results.append(dict(command=command,exit=r.returncode,seconds=round(time.monotonic()-start,2),stdout=r.stdout,stderr=r.stderr))
 (R/'docs/data-center-regression-results.json').write_text(json.dumps(dict(date='2026-10-09',result='PASS' if len(results)==len(commands) and all(x['exit']==0 for x in results) else 'IN_PROGRESS' if r.returncode==0 else 'FAIL',results=results),indent=2)+'\n',encoding='utf-8')
 print(f'{r.returncode}: {" ".join(command)}',flush=True)
 if r.returncode:raise SystemExit(r.returncode)
