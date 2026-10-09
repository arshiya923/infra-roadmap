"""Integrate named primary-reviewed staging groups, preserving accepted status."""
import json, shutil, subprocess, sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
config={'route-control':('RouteControlModels',['s3-g5-t'+str(i) for i in range(5)]),
        'vrf-scope':('VrfScopeModels',['s3-g6-t0','s3-g6-t1']),
        'gateway-redundancy':('GatewayRedundancyModels',['s3-g7-t'+str(i) for i in range(3)]),
        'multicast':('MulticastModels',['s3-g8-t'+str(i) for i in range(3)]),
        'qos-labels':('QosLabelModels',['s3-g9-t1','s3-g9-t2']),
        'qos-service':('QosServiceModels',['s3-g9-t0','s3-g9-t3','s3-g9-t4','s3-g9-t5']),
        'advanced-lab':('AdvancedLabModels',['lab-3'])}
names=sys.argv[1:];assert names and all(n in config for n in names)
manifest=json.loads((root/'content/enrichment.json').read_text(encoding='utf-8'))
b=next(b for b in manifest['batches'] if b['id']=='10')
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root).decode('utf-8'))
lessons=bundles.get('10',[]);existing={l['id'] for l in lessons}
inventory=json.loads((root/'content/roadmap-inventory.json').read_text(encoding='utf-8'))
known={n['id'] for n in inventory['nodes']}
html=(root/'learn.html').read_text(encoding='utf-8');reader=(root/'scripts/learning.js').read_text(encoding='utf-8')
for name in names:
    ns,ids=config[name];folder=root/'staging'/name
    ls=json.loads((folder/'lessons.json').read_text(encoding='utf-8'))
    assert {l['id'] for l in ls}==set(ids) and not existing.intersection(ids)
    for l in ls:
        assert l['batch']=='10' and len(l['exams'])==10 and len(l['quick'])==3 and len(l['flow'])==4
        assert isinstance(l['glossary'],dict)
        assert set(l['prerequisites']+l['related'])<=known
        assert all(isinstance(a,dict) and a.get('path','').startswith('labs/') for a in l.get('artifacts',[]))
        for q in l['exams']:assert q['answer'] in q['options'] and len(set(q['options']))==len(q['options'])
    subprocess.run(['node',str(folder/'model.test.cjs')],cwd=root,check=True)
    if name=='advanced-lab':
        shutil.copyfile(folder/'workbook.md',root/'labs/advanced-routing-switching-workbook.md')
    lessons+=ls;existing.update(ids)
    shutil.copyfile(folder/'model.js',root/'scripts'/f'{name}-models.js')
    shutil.copyfile(folder/'style.css',root/'styles'/f'{name}.css')
    html=html.replace('  <script defer src="scripts/learning.js"></script>',f'  <link rel="stylesheet" href="styles/{name}.css">\n  <script defer src="scripts/{name}-models.js"></script>\n  <script defer src="scripts/learning.js"></script>')
    reader=reader.replace('window.IbgpModels.html(l.interactive)',f'window.{ns}.html(l.interactive)||window.IbgpModels.html(l.interactive)',1)
    reader=reader.replace('window.IbgpModels.mount(l.interactive);',f'window.{ns}.mount(l.interactive);window.IbgpModels.mount(l.interactive);',1)
lessons.sort(key=lambda l:b['nodeIds'].index(l['id']))
source="'use strict';\n(() => {\nconst lessons = "+json.dumps(lessons,ensure_ascii=False,indent=2)+";\n"
source+="for(const l of lessons){l.exams.forEach((x,i)=>Object.assign(x,{topicId:l.id,questionId:`${l.id}-Q${String(i+1).padStart(2,'0')}`}));l.quick.forEach((x,i)=>Object.assign(x,{topicId:l.id,questionId:`${l.id}-QC${i+1}`}));}\nwindow.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['10']=lessons;\n})();\n"
(root/'content/batch-10.js').write_text(source,encoding='utf-8')
(root/'learn.html').write_text(html,encoding='utf-8');(root/'scripts/learning.js').write_text(reader,encoding='utf-8')
b.update(status='in-progress',draftNodeIds=[n for n in b['nodeIds'] if n in existing],
    nextAuthoringNode=next((n for n in b['nodeIds'] if n not in existing),None),draftEvidence='docs/validation-batch-10.md')
(root/'content/enrichment.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
for tool in ['catalog.py','progress.py']:subprocess.run(['python','tools/'+tool],cwd=root,check=True)
print('Integrated '+str(len(lessons))+' Batch10 drafts; accepted nodes remain '+str(len(manifest['completedNodeIds'])))
