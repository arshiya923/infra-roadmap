"""Primary readability repair for merged ordinary words/numeric examples."""
import json,re,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[1]
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf-8'))
pattern=re.compile(r'\b(in|as|bare|Bare|For|and|contains|denies|permits|permit|integers|octets|least|most|lengths|Length|length|through|entry|test|packet|port|destination|gateway|between|from|with|tag|protocol|Is|Does|Thus|match|ge|le|the|then|below|above|excludes|neighboring|child|aligned|Wildcard|wildcard|rejects|hexadecimal|range|only|independent|service|remote|campus|on)(?=\d)')
skip={'id','topicId','questionId','interactive','code','url','checked','batch','path'}
def clean(v,key=''):
 if isinstance(v,str):return v if key in skip else pattern.sub(r'\1 ',v)
 if isinstance(v,list):return [clean(x,key) for x in v]
 if isinstance(v,dict):return {k:clean(x,k) for k,x in v.items()}
 return v
ls=clean(bundles['10'])
# Preserve exact answer-option identity after readable spacing normalization.
for l in ls:
 for q in l['exams']:assert q['answer'] in q['options']
p=root/'content/batch-10.js';s=p.read_text(encoding='utf-8');start=s.index('const lessons = ')+len('const lessons = ');end=s.index(';\nfor(const l of lessons)',start)
p.write_text(s[:start]+json.dumps(ls,ensure_ascii=False,indent=2)+s[end:],encoding='utf-8')
for group in ['route-control','vrf-scope','gateway-redundancy']:
 p=root/'staging'/group/'lessons.json';p.write_text(json.dumps(clean(json.loads(p.read_text(encoding='utf-8'))),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
subprocess.run(['python','tools/catalog.py'],cwd=root,check=True)
print('Primary numeric-example prose spacing repaired; technical identifiers and CLI untouched.')
