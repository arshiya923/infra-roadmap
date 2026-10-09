import hashlib,json,runpy,subprocess,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1];batch=sys.argv[1];p=R/f'content/batch-{batch}.js';raw=p.read_text(encoding='utf-8');lessons=json.loads(raw[raw.index(' = [')+3:].rstrip().removesuffix(';'))
specs=runpy.run_path(str(R/'tools/automation-authoring.py'))['S'];specs={s['id']:s for s in specs}
checks=[]
for l in lessons:
 s=specs[l['id']];assert l['definition']==s['definition'];assert l['mechanism']==s['mechanism'];assert len(l['exams'])==10 and len(l['quick'])==3
 assert len({q['question'] for q in l['exams']})==10
 for q in l['exams']+l['quick']:
  for k in ('answer','explanation','testedConcept'):assert q[k].strip()
 r=subprocess.run([sys.executable,'labs/automation-evidence.py','--topic',l['id']],cwd=R,capture_output=True,text=True,check=True);e=json.loads(r.stdout);assert e['topic']==l['id'] and e['fault']==s['fault']
 for a in l['artifacts']:assert (R/a['path']).is_file()
 if len(l['commands'])>1:
  code=l['commands'][1]['code'];result=subprocess.run([sys.executable,'-c',code],cwd=R,capture_output=True,text=True,check=True);assert result.stdout.strip()
 checks.append(dict(id=l['id'],questions=13,inspector='PASS',standaloneExample=len(l['commands'])>1))
bad=subprocess.run([sys.executable,'labs/automation-evidence.py','--topic','unknown'],cwd=R,capture_output=True,text=True);assert bad.returncode!=0
report=dict(result='PASS',batch=batch,topics=len(lessons),questions=len(lessons)*13,checks=checks,sha256=hashlib.sha256(p.read_bytes()).hexdigest())
(R/f'docs/automation-content-{batch}-results.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8');print('PASS batch',batch,len(lessons),'topics and',len(lessons)*13,'questions; actual inspector and local examples')
