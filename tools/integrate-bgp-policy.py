"""Integrate explicitly selected, primary-reviewed worker drafts; never accept a batch."""
import json,shutil,subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
config={'bgp-attributes':('s3-g3-t3','BgpAttributesModels'),'local-preference':('s3-g4-t0','LocalPreferenceModels'),'med':('s3-g4-t1','MedModels'),'as-path':('s3-g4-t2','AsPathModels'),'communities':('s3-g4-t3','CommunitiesModels')}
names=sys.argv[1:];assert names and all(n in config for n in names)
p=root/'content/batch-09.js';bundle=p.read_text(encoding='utf8');marker='\n];\nfor(const l of lessons)';assert marker in bundle
manifest_path=root/'content/enrichment.json';manifest=json.loads(manifest_path.read_text(encoding='utf8'));batch=next(b for b in manifest['batches'] if b['id']=='09')
html_path=root/'learn.html';html=html_path.read_text(encoding='utf8');reader_path=root/'scripts/learning.js';reader=reader_path.read_text(encoding='utf8')
for name in names:
 node,namespace=config[name];folder=root/'staging'/name;l=json.loads((folder/'lesson.json').read_text(encoding='utf8'));assert l['id']==node and l['interactive']==name and l['batch']=='09';assert len(l['exams'])==10 and len(l['quick'])==3 and len(l['flow'])==4;assert isinstance(l['glossary'],dict);assert all(isinstance(a,dict) and a.get('path','').startswith('labs/') for a in l.get('artifacts',[]))
 assert node not in batch['draftNodeIds'],'Already integrated: '+node
 for q in l['exams']:assert q['answer'] in q['options']
 subprocess.run(['node',str(folder/'model.test.cjs')],cwd=root,check=True)
 bundle=bundle.replace(marker,',\n'+json.dumps(l,ensure_ascii=False,indent=2)+marker,1)
 shutil.copyfile(folder/'model.js',root/'scripts'/f'{name}-models.js');shutil.copyfile(folder/'style.css',root/'styles'/f'{name}.css')
 html=html.replace('  <script defer src="scripts/learning.js"></script>',f'  <link rel="stylesheet" href="styles/{name}.css">\n  <script defer src="scripts/{name}-models.js"></script>\n  <script defer src="scripts/learning.js"></script>')
 reader=reader.replace('window.IbgpModels.html(l.interactive)',f'window.{namespace}.html(l.interactive)||window.IbgpModels.html(l.interactive)',1)
 reader=reader.replace('window.IbgpModels.mount(l.interactive);',f'window.{namespace}.mount(l.interactive);window.IbgpModels.mount(l.interactive);',1)
 batch['draftNodeIds'].append(node)
batch['draftNodeIds']=[n for n in batch['nodeIds'] if n in batch['draftNodeIds']]
remaining=[n for n in batch['nodeIds'] if n not in batch['draftNodeIds']]
batch['nextAuthoringNode']=remaining[0] if remaining else None
p.write_text(bundle,encoding='utf8');html_path.write_text(html,encoding='utf8');reader_path.write_text(reader,encoding='utf8');manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
for tool in ['catalog.py','progress.py']:subprocess.run(['python',str(root/'tools'/tool)],cwd=root,check=True)
print('Integrated drafts; accepted-node count unchanged:',', '.join(names))
