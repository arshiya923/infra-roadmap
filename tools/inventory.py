"""Freeze and inventory the original roadmap. Run from the project root."""
from pathlib import Path
import re, json, hashlib, shutil, ast
from html.parser import HTMLParser
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]
original = ROOT / 'original/index.html'
original.parent.mkdir(exist_ok=True)
if not original.exists():
    shutil.copyfile(ROOT / 'index.html', original)
raw = original.read_bytes()
html = raw.decode('utf-8')
data = json.loads(re.search(r'const DATA=(.*?);\r?\n', html).group(1))
nodes, groups = [], []
def add(id, name, kind, locator, **extra):
    nodes.append(dict(id=id, name=name, kind=kind, source=locator, **extra))
for si, stage in enumerate(data['stages']):
    for gi, group in enumerate(stage['groups']):
        gid = f'g-{si}-{gi}'
        groups.append(dict(id=gid,name=group['name'],stage=si,children=[]))
        for ti, name in enumerate(group['topics']):
            nid = f's{si}-g{gi}-t{ti}'
            add(nid,name,'topic',f'DATA.stages[{si}].groups[{gi}].topics[{ti}]',stage=si,groupId=gid)
            groups[-1]['children'].append(nid)
    add(f'lab-{si}', 'Architecture design rehearsal' if si==9 else stage['title']+' Lab','lab',f'DATA.stages[{si}].lab',stage=si)
for key,prefix in [('devices','device'),('hardware','hardware'),('trouble','trouble')]:
    for i, item in enumerate(data[key]):
        add(f'{prefix}-{i}',item[0] if isinstance(item,list) else item,prefix,f'DATA.{key}[{i}]')
add('capstone-final','Enterprise Data Center Architecture Capstone','capstone','HTML #capstone')
support = []
for key in ['certs','deliverables','method']:
    match = re.search(r'const '+key+r'=(.*?);',html)
    support.append(dict(id='support-'+key,source='const '+key,originalExpression=match.group(1) if match else '',status='not-enriched'))
for key in ['lab-environment','capstone']:
    match = re.search(r'<section[^>]*id="'+key+r'".*?</section>',html,re.S)
    support.append(dict(id='support-'+key,source='HTML #'+key,originalHTML=match.group(0),status='not-enriched'))
assert len({n['id'] for n in nodes})==len(nodes)
support_nodes=[]
for collection in support:
    if collection.get('originalExpression'):
        values=ast.literal_eval(collection['originalExpression'])
        for i,value in enumerate(values):
            support_nodes.append(dict(id=f"{collection['id']}-{i}",parentId=collection['id'],name=value[0] if isinstance(value,list) else value,original=value,source=f"{collection['source']}[{i}]",status='not-enriched'))
class SupportingParser(HTMLParser):
    def __init__(self,parent):
        super().__init__(); self.parent=parent; self.capture=None; self.parts=[]; self.count=0
    def handle_starttag(self,tag,attrs):
        if tag in ['h3','li','text','figcaption']:
            self.capture=tag; self.parts=[]
    def handle_data(self,data):
        if self.capture:self.parts.append(data)
    def handle_endtag(self,tag):
        if tag==self.capture:
            value=''.join(self.parts).strip()
            if value:
                support_nodes.append(dict(id=f'{self.parent}-{self.count}',parentId=self.parent,name=value,kind=tag,source=f'{self.parent} {tag} occurrence {self.count}',status='not-enriched'))
                self.count+=1
            self.capture=None
for collection in support:
    if collection.get('originalHTML'):SupportingParser(collection['id']).feed(collection['originalHTML'])
assert len({n['id'] for n in support_nodes})==len(support_nodes)
(ROOT/'content').mkdir(exist_ok=True)
inventory=dict(schemaVersion=1,source='original/index.html',sha256=hashlib.sha256(raw).hexdigest(),nodes=nodes,groups=groups,supportingMaterial=support,supportingNodes=support_nodes,originalData=data)
(ROOT/'content/roadmap-inventory.json').write_text(json.dumps(inventory,indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps(dict(originalNodes=len(nodes),groupNodes=len(groups),stageTopics=sum(n['kind']=='topic' for n in nodes),supportingCollections=len(support),supportingNodes=len(support_nodes),sha256=inventory['sha256']),indent=2))
