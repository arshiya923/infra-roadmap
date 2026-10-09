from pathlib import Path
import json,re,subprocess
from curriculum import inventories, completed
R=Path(__file__).resolve().parents[1]
inv, additions, nodes = inventories()
manifest=json.loads((R/'content/enrichment.json').read_text(encoding='utf-8'))
catalog=[]
bundles=json.loads(subprocess.check_output(['node',str(R/'tools/read-content.cjs')],text=True,encoding='utf-8'))
authored={l['id']:(batch,l) for batch,lessons in bundles.items() for l in lessons}
assert len(authored)==sum(len(x) for x in bundles.values()),'Duplicate authored IDs'
assert set(authored)<={n['id'] for n in nodes},'Unknown authored IDs'
accepted=completed(manifest)
batch_names={b['id']:b['title'] for b in manifest['batches']}
def strings(value):
    if isinstance(value,str):yield value
    elif isinstance(value,list):
        for v in value:yield from strings(v)
    elif isinstance(value,dict):
        for k,v in value.items():
            if k=='glossary':yield ' '.join(v.keys())
            if k not in ['url','questionId','topicId','id','checked']:yield from strings(v)
for n in nodes:
    x={k:n[k] for k in ['id','name','kind']}
    x['section']=n['section'] if n['kind']=='expansion' else inv['originalData']['stages'][n['stage']]['title'] if 'stage' in n else {'device':'Cisco Device Mastery','hardware':'Physical Hardware','trouble':'Troubleshooting Mastery','capstone':'Capstone'}[n['kind']]
    x['batch']=authored[n['id']][0] if n['id'] in authored else None
    if x['batch']:
        x['batchTitle']=batch_names[x['batch']]
        x['lessonNumber']=next(i+1 for i,l in enumerate(bundles[x['batch']]) if l['id']==n['id'])
        # Word search across all available content without downloading every bundle.
        x['searchTerms']=' '.join(sorted(set(re.findall(r"[\w$?./-]+",' '.join(strings(authored[n['id']][1])).lower()))))
    x['complete']=n['id'] in accepted
    x['originalBrief']=inv['originalData']['briefs'].get(n['name'])
    catalog.append(x)
(R/'content/catalog.js').write_text('window.INFRA_CATALOG = '+json.dumps(catalog,ensure_ascii=False)+';\n',encoding='utf-8')
print(f'Wrote {len(catalog)} catalog entries.')
