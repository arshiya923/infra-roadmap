"""Normalize preserved actual FRR headers; never invent or execute protocol state."""
import hashlib,ipaddress,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
sources={}
for name in ['ospf-areas-lab-results.json','ospf-dr-bdr-lab-results.json']:
 path=root/'docs'/name;raw=path.read_bytes();report=json.loads(raw)
 assert report['result']=='PASS'
 sources[name]=dict(sha256=hashlib.sha256(raw).hexdigest(),date=report['date'],report=report)
snapshots=[]
for experiment,observer,phase,area in [('areas','R1','','0.0.0.0'),('areas','ABR','','0.0.0.0'),('areas','ABR','','0.0.0.1'),('areas','R3','','0.0.0.1'),('broadcast','R3','LATE_','0.0.0.0'),('broadcast','R3','FAILOVER_','0.0.0.0'),('broadcast','R3','RECOVERED_','0.0.0.0')]:
 source='ospf-areas-lab-results.json' if experiment=='areas' else 'ospf-dr-bdr-lab-results.json';record=phase+'DATABASE_'+observer
 table=sources[source]['report']['records'][record]['areas'][area];entries=[]
 for field,kind in [('routerLinkStates',1),('networkLinkStates',2),('summaryLinkStates',3)]:
  for header in table.get(field,[]):
   for key in ['lsId','advertisedRouter']:assert str(ipaddress.IPv4Address(header[key]))==header[key]
   sequence=header['sequenceNumber'].upper();checksum=header['checksum'].upper().zfill(4)
   assert len(sequence)==8 and len(checksum)==4 and 0<int(checksum,16)<=65535 and int(sequence,16)!=0x80000000
   assert isinstance(header['lsaAge'],int) and 0<=header['lsaAge']<=3600
   hint='Router link count '+str(header['numOfRouterLinks']) if kind==1 else 'Current/retained network header; inspect current DR separately' if kind==2 else 'Destination '+header['summaryAddress']
   entries.append(dict(type=kind,area=area,id=header['lsId'],adv=header['advertisedRouter'],sequence=sequence,checksum=checksum,age=header['lsaAge'],hint=hint))
 entries.sort(key=lambda e:(e['type'],int(ipaddress.IPv4Address(e['id'])),int(ipaddress.IPv4Address(e['adv']))))
 key=experiment+'-'+(phase.rstrip('_').lower()+'-' if phase else '')+observer.lower()+'-'+area[-1]
 snapshots.append(dict(id=key,experiment=experiment,observer=observer,phase=phase.rstrip('_') or 'BASELINE',area=area,source='docs/'+source,record=record,label=f'{experiment} / {observer} / {phase.rstrip("_") or "BASELINE"} / area {area}',entries=entries))
payload=dict(schemaVersion=1,date='2026-10-09',kind='PRESERVED_ACTUAL_FRR_HEADERS',sources={name:{k:v for k,v in value.items() if k!='report'} for name,value in sources.items()},snapshots=snapshots,scope='Separate actual isolated experiments, not a combined/live LSDB. Headers are copied from current passing reports; no type-4/5/7, flooding/aging/timing or application execution is claimed.')
text="'use strict';\n(()=>{const evidence="+json.dumps(payload,ensure_ascii=False,indent=2)+";if(typeof module!=='undefined'&&module.exports)module.exports=evidence;else window.OspfLsaEvidence=evidence;})();\n"
(root/'content/ospf-lsa-evidence.js').write_text(text,encoding='utf8',newline='\n')
print('Built seven preserved actual OSPF LSA header views from two passing experiments')
