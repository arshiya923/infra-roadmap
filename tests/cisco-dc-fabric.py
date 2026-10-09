"""Independent boundary and mutation checks for the offline reference plan."""
from pathlib import Path
import copy,importlib.util,itertools,json
R=Path(__file__).resolve().parents[1];spec=importlib.util.spec_from_file_location('cdc',R/'labs/cisco-dc-fabric.py');lab=importlib.util.module_from_spec(spec);spec.loader.exec_module(lab)
checks=[]
def check(name,condition):
 assert condition,name
 checks.append(name)
p=lab.baseline();check('2 spines / 4 leaves / 8 exact edges',len(p['spines'])==2 and len(p['leaves'])==4 and len(p['links'])==8 and lab.validate(p))
check('server storage firewall attachments',set(p['endpoints'])=={'web','app','storage','red','firewall-a','firewall-b'})
for mask in range(256):
 q=copy.deepcopy(p)
 for i,link in enumerate(q['links']):link['up']=bool(mask&(1<<i))
 # Independent graph search ignoring the runner's path enumeration.
 graph={n:set() for n in ['S1','S2','L1','L2','L3','L4']}
 for i,(leaf,spine) in enumerate(itertools.product(['L1','L2','L3','L4'],['S1','S2'])):
  if mask&(1<<i):graph[leaf].add(spine);graph[spine].add(leaf)
 # No leaf transit between spines: direct eligible common spine for a source/destination leaf pair.
 expected=any(graph[a]&graph[b] for a in ['L1','L2'] for b in ['L3','L4'])
 check('path mask '+str(mask),lab.overlay(q,'web','app')['eligible']==expected)
for mtu in [1499,1500,1549,1550,1551,1600]:
 q=copy.deepcopy(p)
 for x in q['links']:x['mtu']=mtu
 check('MTU boundary '+str(mtu),lab.overlay(q,'web','app')['eligible']==(mtu>=1550))
q=copy.deepcopy(p);q['routes']['app']['present']=False;check('route withdrawal',lab.overlay(q,'web','app')['reason']=='destination route withdrawn')
q=copy.deepcopy(p);q['imports']['Blue']=[];check('RT omission',lab.overlay(q,'web','app')['reason']=='RT not imported')
check('Red isolation',not lab.overlay(p,'red','app')['eligible'])
q=copy.deepcopy(p);q['endpoints']['red']['vni']=10100;q['imports']['Red']=['65000:10100'];check('demonstrate broad mapping/import leak',lab.overlay(q,'red','app')['eligible'])
q=copy.deepcopy(p)
for x in q['links']:
 if x['spine']=='S1':x['up']=False
check('one-spine survivor envelope',set(lab.capacity(q).values())=={100} and lab.overlay(q,'web','app')['eligible'])
for apic,deployed in itertools.product([False,True],repeat=2):
 q=copy.deepcopy(p);q['aci'].update(apic=apic,deployed=deployed)
 for port in [22,80,443,3260,65535]:check('ACI '+str((apic,deployed,port)),lab.aci(q,'web','app',port)==(deployed and port==443))
check('storage service intent',lab.aci(p,'app','storage',3260) and not lab.aci(p,'web','storage',3260))
def rejects(name,mutate):
 q=copy.deepcopy(p);mutate(q)
 try:lab.validate(q)
 except (ValueError,KeyError):check(name,True)
 else:raise AssertionError(name)
rejects('duplicate fabric edge',lambda q:q['links'].append(q['links'][0].copy()))
rejects('missing fabric edge',lambda q:q['links'].pop())
rejects('unknown endpoint leaf',lambda q:q['endpoints']['web'].update(leaves=['L9']))
rejects('duplicate IP',lambda q:q['endpoints']['web'].update(ip='192.0.2.20'))
rejects('boolean as rate',lambda q:q['links'][0].update(rate=True))
rejects('invalid MTU',lambda q:q['links'][0].update(mtu=0))
rejects('route identity mismatch',lambda q:q['routes']['app'].update(ip='192.0.2.99'))
rejects('invalid port',lambda q:q['aci']['contracts'][0].update(port=65536))
r=lab.run();check('real owned-file normal restore/cleanup',r['result']=='PASS' and r['restored'] and r['cleaned'])
for stage in ['baseline','fault','restored']:
 r=lab.run(stage);check('injected interruption '+stage,r['result']=='INTERRUPTED' and r['restored'] and r['cleaned'])
report=dict(date='2026-10-09',result='PASS',checks=checks,count=len(checks),scope='All 256 link availability masks, MTU boundaries, withdrawal/import/isolation, ACI intent and real owned-file restore/cleanup. No Cisco/device traffic.')
(R/'docs/cisco-dc-fabric-results.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8');print(json.dumps(dict(result='PASS',checks=len(checks))))
