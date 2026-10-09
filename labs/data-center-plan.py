"""Offline three-rack plan rehearsal; no hardware, circuits, network or BMC is configured."""
import argparse,copy,hashlib,json,math,tempfile
from pathlib import Path

BASELINE={
 'racks':[
  dict(id='R1',u=42,load=6,feedA=10,feedB=10,items=[['Storage',1,4],['Compute',5,8],['Leaf A',40,1],['Leaf B',41,1]]),
  dict(id='R2',u=42,load=6,feedA=10,feedB=10,items=[['Compute',1,12],['Leaf A',40,1],['Leaf B',41,1]]),
  dict(id='R3',u=42,load=4,feedA=10,feedB=10,items=[['Backup',1,4],['Leaf A',36,1],['Leaf B',37,1],['Spine A',38,1],['Spine B',39,1],['OOB',40,1]])],
 'allowedPercent':80,'upstreamA':25,'upstreamB':25,'domainA':'Supply A','domainB':'Supply B',
 'coolingKW':20,'airM3s':2,'inletC':22,
 'powerPaths':{'A':['PSU A','PDU A','UPS A','Supply A'],'B':['PSU B','PDU B','UPS B','Supply B']},
 'cables':[
  ['R1 Leaf A uplink1','R3 Spine A port1','100G supported fiber','Route A'],
  ['R1 Leaf A uplink2','R3 Spine B port1','100G supported fiber','Route B'],
  ['R1 Leaf B uplink1','R3 Spine A port2','100G supported fiber','Route A'],
  ['R1 Leaf B uplink2','R3 Spine B port2','100G supported fiber','Route B'],
  ['R2 Leaf A uplink1','R3 Spine A port3','100G supported fiber','Route A'],
  ['R2 Leaf A uplink2','R3 Spine B port3','100G supported fiber','Route B'],
  ['R2 Leaf B uplink1','R3 Spine A port4','100G supported fiber','Route A'],
  ['R2 Leaf B uplink2','R3 Spine B port4','100G supported fiber','Route B'],
  ['Jump host .10','R3 OOB switch access1','1G supported copper / planned 10 m','OOB route']],
 'oob':dict(subnet='192.0.2.0/24',jump='192.0.2.10',controllers=[f'192.0.2.{n}' for n in range(21,33)],standby=True,hostOS=False,
            readRules=[dict(subject='administrator',source='192.0.2.10',operation='read',protocol='https',port=443)],guestAllowed=False),
 'airflow':['cold fronts','supported front-to-rear devices','hot rears','cooling return'],
 'externalChecks':['rack depth/rails/mass/floor and service clearance','qualified electrical phase/circuit/outlet and safety approval','supported maximum inlet/humidity and failure-state cooling','vendor optics/length/bend/support and controller/role/TLS session tests']}
# Explicit endpoint schedule, not configured links. Copper/fiber choices and lengths are invented design inputs.
for rack,count in [('R1',4),('R2',6)]:
 for n in range(1,count+1):
  for side in ['A','B']:BASELINE['cables'].append([f'{rack} Server{n} NIC{side}',f'{rack} Leaf {side} downlink{n}','25G supported media / planned 3 m','Route '+side])
assets=['R1 Storage']+[f'R1 Server{n}' for n in range(1,5)]+[f'R2 Server{n}' for n in range(1,7)]+['R3 Backup']
for n,asset in enumerate(assets):BASELINE['cables'].append([asset+' BMC '+f'192.0.2.{21+n}',f'R3 OOB switch access{2+n}','1G supported copper / planned 15 m','OOB route'])
for n,asset in enumerate(['R1 Leaf A','R1 Leaf B','R2 Leaf A','R2 Leaf B','R3 Leaf A','R3 Leaf B','R3 Spine A','R3 Spine B']):BASELINE['cables'].append([asset+' management '+f'192.0.2.{40+n}',f'R3 OOB switch access{14+n}','1G supported copper / planned 15 m','OOB route'])
for side,index in [('A',5),('B',6)]:
 for spine in ['A','B']:BASELINE['cables'].append([f'R3 Leaf {side} uplink'+('1' if spine=='A' else '2'),f'R3 Spine {spine} port{index}','100G supported fiber / planned 3 m','Route '+spine])
for rack,asset in [('R1','Storage'),('R3','Backup')]:
 for side in ['A','B']:BASELINE['cables'].append([f'{rack} {asset} NIC{side}',f'{rack} Leaf {side} downlink'+('5' if rack=='R1' else '1'),'25G supported media / planned 3 m','Route '+side])
for cable in BASELINE['cables'][:8]:cable[2]='100G supported fiber / planned 15 m'
REQUIRED_ENDPOINTS=frozenset((c[0],c[1]) for c in BASELINE['cables'])

def numeric(x,minimum,maximum,label):
 if isinstance(x,bool) or not isinstance(x,(int,float)) or not math.isfinite(x) or not minimum<=x<=maximum:raise ValueError(label+' must be a finite bounded number')
 return x

def allowed(plan,subject,source,target,operation='read',protocol='https',port=443):
 """Evaluate only the declared offline policy. No identity or network transaction occurs."""
 oob=plan['oob']
 return oob['standby'] and target in oob['controllers'] and any(r==dict(subject=subject,source=source,operation=operation,protocol=protocol,port=port) for r in oob['readRules'])

def validate(plan):
 """Check the bounded classroom design; leave physical/external checks explicitly unverified."""
 if not isinstance(plan,dict):raise ValueError('plan must be an object')
 issues=[];racks=plan['racks']
 if not isinstance(racks,list) or len(racks)!=3:raise ValueError('exact three-rack list required')
 if {r['id'] for r in racks}!={'R1','R2','R3'}:issues.append('exact three rack identities required')
 limit=numeric(plan['allowedPercent'],1,100,'allowed percent')/100;total=0
 for r in racks:
  if type(r['u']) is not int or r['u']!=42:issues.append(r['id']+' requires 42U')
  load=numeric(r['load'],.001,10000,'rack kW');total+=load
  for feed in ['feedA','feedB']:
   rating=numeric(r[feed],.001,10000,feed)
   if load>rating*limit:issues.append(r['id']+' '+feed+' cannot carry full load')
  occupied=set();names=set()
  if not isinstance(r['items'],list) or not 1<=len(r['items'])<=42:raise ValueError('bounded item list required')
  for name,start,height in r['items']:
   if not isinstance(name,str) or not name or len(name)>100 or name in names:raise ValueError('unique bounded item name required')
   names.add(name)
   if type(start) is not int or type(height) is not int or start<1 or height<1 or start+height-1>42:issues.append(r['id']+' invalid U interval');continue
   units=set(range(start,start+height))
   if occupied&units:issues.append(r['id']+' overlap at '+name)
   occupied|=units
 for field in ['upstreamA','upstreamB']:
  if total>numeric(plan[field],.001,10000,field)*limit:issues.append(field+' cannot carry whole site load')
 if plan['domainA']==plan['domainB']:issues.append('A/B upstream domain labels are not distinct')
 if plan['powerPaths']!={'A':['PSU A','PDU A','UPS A','Supply A'],'B':['PSU B','PDU B','UPS B','Supply B']}:issues.append('power-path schedule differs from scoped baseline requirement')
 if total>numeric(plan['coolingKW'],0,10000,'cooling kW'):issues.append('sensible cooling envelope exceeded')
 flow=numeric(plan['airM3s'],.01,10000,'air m³/s');inlet=numeric(plan['inletC'],-20,80,'inlet °C')
 if plan['airflow']!=['cold fronts','supported front-to-rear devices','hot rears','cooling return']:issues.append('airflow path is incomplete')
 if not isinstance(plan['cables'],list) or len(plan['cables'])!=57:issues.append('twelve fabric, twenty-four workload and twenty-one management records required')
 else:
  endpoints=set()
  for source,target,media,route in plan['cables']:
   if not all(isinstance(x,str) and 0<len(x)<=120 for x in [source,target,media,route]):raise ValueError('bounded cable fields required')
   if source in endpoints or target in endpoints:issues.append('cable endpoint reused')
   endpoints.update([source,target])
   if route not in ['Route A','Route B','OOB route']:issues.append('unknown cable route')
  if {(c[0],c[1]) for c in plan['cables']}!=REQUIRED_ENDPOINTS:issues.append('cable schedule misses scoped required endpoint pairs')
 o=plan['oob']
 if type(o['standby']) is not bool or type(o['hostOS']) is not bool:raise ValueError('management/host declarations must be boolean')
 if o['guestAllowed'] is not False:issues.append('guest management declaration must deny')
 if not allowed(plan,'administrator','192.0.2.10','192.0.2.21'):issues.append('intended administrator read denied')
 if allowed(plan,'guest','192.0.2.99','192.0.2.21'):issues.append('guest read unexpectedly allowed')
 if not isinstance(plan['externalChecks'],list) or len(plan['externalChecks'])<4:issues.append('unverified external installation checks missing')
 return dict(result='PASS' if not issues else 'FAIL',issues=issues,totalKW=total,meanRiseK=total/(1.2*1.005*flow),meanExhaustC=inlet+total/(1.2*1.005*flow),scope='Offline design predicates only; no hardware, electrical, thermal, network or BMC measurement.',externalUnverified=plan['externalChecks'])

def serialize(plan):return (json.dumps(plan,ensure_ascii=False,sort_keys=True,indent=2)+'\n').encode('utf-8')

def run(interrupt=None):
 events=[];evidence={};owned=None;baseline=serialize(BASELINE)
 try:
  with tempfile.TemporaryDirectory(prefix='infra-dc-owned-') as folder:
   owned=Path(folder);p=owned/'plan.json';p.write_bytes(baseline)
   try:
    evidence['baseline']=validate(json.loads(p.read_bytes()));assert evidence['baseline']['result']=='PASS';events.append('baseline')
    if interrupt=='baseline':raise RuntimeError('injected interruption')
    fault=copy.deepcopy(BASELINE);fault['racks'][0]['feedB']=5;p.write_bytes(serialize(fault));evidence['fault']=validate(json.loads(p.read_bytes()));assert evidence['fault']['issues']==['R1 feedB cannot carry full load'];events.append('fault')
    if interrupt=='fault':raise RuntimeError('injected interruption')
    p.write_bytes(baseline);evidence['restored']=validate(json.loads(p.read_bytes()));assert evidence['restored']['result']=='PASS' and p.read_bytes()==baseline;events.append('restored')
    if interrupt=='restored':raise RuntimeError('injected interruption')
   finally:
    p.write_bytes(baseline);evidence['exactRestoredBeforeCleanup']=p.read_bytes()==baseline;evidence['restoredSha256']=hashlib.sha256(p.read_bytes()).hexdigest()
 except RuntimeError as e:
  if interrupt is None:raise
  evidence['interruption']=str(e)
 finally:evidence['ownedDirectoryRemoved']=owned is not None and not owned.exists()
 assert evidence['exactRestoredBeforeCleanup'] and evidence['ownedDirectoryRemoved'];evidence.update(result='PASS',events=events,baselineSha256=hashlib.sha256(baseline).hexdigest(),scope='Actual temporary JSON file write/read/validation/fault/exact restore/cleanup; not actual equipment or failover.')
 return evidence

if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--run',action='store_true',help='Execute only an owned temporary offline JSON plan rehearsal and cleanup.');args=parser.parse_args()
 if args.run:print(json.dumps(run(),indent=2))
 else:parser.print_help()
