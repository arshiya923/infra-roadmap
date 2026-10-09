import concurrent.futures,json,urllib.request
from pathlib import Path
R=Path(__file__).resolve().parents[1]
sources=json.loads((R/'docs/device-source-register.json').read_text())
def check(item):
 key,s=item
 try:
  req=urllib.request.Request(s['url'],headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=25) as r:
   data=r.read(100000)
   return dict(key=key,url=s['url'],finalUrl=r.url,status=r.status,bytesRead=len(data),result='PASS' if r.status==200 and len(data)>100 else 'REVIEW')
 except Exception as e:return dict(key=key,url=s['url'],result='UNAVAILABLE',error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(check,sources.items()))
(R/'docs/device-source-checks.json').write_text(json.dumps(dict(date='2026-10-09',checks=results),indent=2)+'\n')
print(json.dumps(results,indent=2))
