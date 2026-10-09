"""Record reachability separately from technical source review; errors remain visible."""
import concurrent.futures
import hashlib
import json
import subprocess
import urllib.request
from pathlib import Path
R=Path(__file__).resolve().parents[1]
lessons=json.loads(subprocess.check_output(['node',str(R/'tools/read-content.cjs')],encoding='utf-8'))['27']
sources={s['url']:s['title'] for l in lessons for s in l['sources']}
def check(item):
    url,title=item
    try:
        with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=15) as r:
            body=r.read(2_000_000)
            return dict(url=url,title=title,status=r.status,finalURL=r.url,bytesRead=len(body),sampleSHA256=hashlib.sha256(body).hexdigest())
    except Exception as e:
        return dict(url=url,title=title,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results=list(pool.map(check,sources.items()))
report=dict(date='2026-10-09',scope='HTTP reachability, not proof of every technical assertion; sample bodies limited to 2 MB',sources=results)
(R/'docs/troubleshooting-source-checks.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
print(json.dumps(dict(total=len(results),reachable=sum(x.get('status')==200 for x in results),errors=[x for x in results if 'error' in x]),indent=2))
