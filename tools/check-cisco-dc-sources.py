"""Record actual HTTP checks and content identity for the cited source set."""
from pathlib import Path
import concurrent.futures,hashlib,json,runpy,urllib.request
R=Path(__file__).resolve().parents[1];src=runpy.run_path(str(R/'tools/cisco-dc-authoring.py'))['SRC']
def check(item):
 key,(title,url)=item
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
  with urllib.request.urlopen(req,timeout=35) as r:
   body=r.read();return dict(key=key,title=title,url=url,status=r.status,finalURL=r.url,bytes=len(body),sha256=hashlib.sha256(body).hexdigest())
 except Exception as e:return dict(key=key,title=title,url=url,error=str(e))
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:results=list(pool.map(check,src.items()))
(R/'docs/cisco-dc-source-checks.json').write_text(json.dumps(dict(date='2026-10-09',sources=results),indent=2)+'\n',encoding='utf-8')
print(json.dumps(results,indent=2))
