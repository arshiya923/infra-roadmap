"""Check actual normal/interrupted restoration and standalone inspector delivery."""
import json
import hashlib
import runpy
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
R=Path(__file__).resolve().parents[1]
lab=R/'labs/troubleshooting-lab.py'
results=[]
for args in [['--run'], ['--run','--interrupt']]:
    result=json.loads(subprocess.check_output([sys.executable,str(lab),*args],encoding='utf-8'))
    assert result['result']=='PASS' and result['detected'] and result['restored'] and result['cleaned']
    assert result['baseline']['port']==443 and result['fault']['port']==444
    assert bool(result.get('interruption')) == ('--interrupt' in args)
    results.append(result)
with tempfile.TemporaryDirectory(prefix='tm-download-test-') as d:
    standalone=Path(d)/lab.name
    shutil.copyfile(lab,standalone)
    for i in range(21):
        result=json.loads(subprocess.check_output([sys.executable,str(standalone),'--topic',f'trouble-{i}'],cwd=d,encoding='utf-8'))
        assert result['scope']=='AUTHORED' and result['topic']==f'trouble-{i}'
        assert all(result.get(k) for k in ['baseline','fault','test','diagnosis','alternative','guard','recovery'])
bad=subprocess.run([sys.executable,str(lab),'--topic','trouble-99'],capture_output=True)
assert bad.returncode==2
bad=subprocess.run([sys.executable,str(lab),'--topic','trouble-0','--interrupt'],capture_output=True)
assert bad.returncode==2
report=dict(result='PASS',localRuns=results,standaloneTopics=21,invalidInputsRejected=2,labSHA256=hashlib.sha256(lab.read_bytes()).hexdigest())
(R/'docs/troubleshooting-lab-results.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps(report,indent=2))
