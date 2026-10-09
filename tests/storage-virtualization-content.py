"""Check authored contracts and execute the actual offline inspection command per topic."""
import json,subprocess,sys,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1];batch=sys.argv[1]
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));ls=bundles[batch]
for l in ls:
 assert len(l['exams'])==10 and len(l['quick'])==3
 assert len({q['question'] for q in l['exams']})==10
 assert len(l['mechanism'])==3 and len(l['flow'])==4
 assert all(len(q['answer'])>=2 and len(q['explanation'])>10 for q in l['exams']+l['quick'])
 for p in l['artifacts']:assert (R/p['path']).is_file()
 r=json.loads(subprocess.check_output([sys.executable,'labs/storage-evidence.py','--topic',l['id']],cwd=R,text=True))
 assert r['topic']==l['id'] and r['fault']==l['storageVirtualization']['fault'] and 'not captured' in r['evidenceType']
bad=subprocess.run([sys.executable,'labs/storage-evidence.py','--topic','../../unknown'],cwd=R,capture_output=True);assert bad.returncode!=0
report=dict(result='PASS',batch=batch,topics=len(ls),questions=len(ls)*13,commandScope='Actual read-only offline inspector for every topic; no vendor commands executed.',sha256=hashlib.sha256((R/f'content/batch-{batch}.js').read_bytes()).hexdigest())
(R/f'docs/storage-virtualization-content-{batch}-results.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
