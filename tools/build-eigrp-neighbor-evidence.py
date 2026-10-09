"""Preserve two observers at four actual checkpoints; never execute a router."""
import hashlib,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
path='docs/eigrp-routing-lab-results.json';raw=(root/path).read_bytes();report=json.loads(raw);assert report['result']=='PASS' and len(report['checks'])==12
records=report['records'];views=[]
for phase,title,intervention in [
 ('BASELINE','Baseline','No fault applied; settled single-transit IPv4 AS 100 experiment.'),
 ('FAULT','Owned transit down','Only R1 owned transit is taken down; this is not a hold-expiry or passive-interface experiment.'),
 ('LINK_RESTORED','Link restored before daemon restart','Owned transit is restored; retain observed peer/route records without assuming automatic recovery. No endpoint probe was retained for this intermediate checkpoint.'),
 ('RECOVERED','Combined recovery','Owned transit restored, then both identity-checked owned eigrpd children restarted with unchanged configuration; original bounded endpoint ICMP rechecked.')]:
 for router,peer,prefix in [('R1','203.0.113.2','198.51.100.0/24'),('R2','203.0.113.1','192.0.2.0/24')]:
  keys=[phase+'_'+kind+'_'+router for kind in ['NEIGHBORS','INTERFACES','TOPOLOGY','CONFIG','RIB','KERNEL']]
  if phase=='FAULT':keys.append('FAULT_TRANSIT_LINK')
  for endpoint in ['CLIENT','SERVER']:
   key=phase+'_PROBE_'+endpoint
   if key in records:keys.append(key)
  assert all(k in records for k in keys)
  views.append(dict(id=phase.lower().replace('_','-')+'-'+router.lower(),title=title+' / '+router,phase=phase,observer=router,expectedPeer=peer,remotePrefix=prefix,intervention=intervention,records={k:records[k] for k in keys}))
payload=dict(schemaVersion=1,kind='PRESERVED_ACTUAL_EIGRP_NEIGHBORS',source=dict(path=path,sha256=hashlib.sha256(raw).hexdigest(),date=report['date']),views=views,packets=records['PACKETS'],packetScope='Startup transit capture only; shared by all views for separate header inspection. Seven retained fields omit timestamps, flags, parameter/authentication TLVs and route bodies. Filters overlap when UPDATE carries an acknowledgment. No INIT-handshake, timer expiry, capture completeness or convergence timing is proved.')
body=json.dumps(payload,ensure_ascii=True,separators=(',',':'))
(root/'content/eigrp-neighbor-evidence.js').write_text("(function(root){'use strict';const evidence="+body+";if(typeof module==='object'&&module.exports)module.exports=evidence;else root.EigrpNeighborEvidence=evidence;})(typeof window!=='undefined'?window:globalThis);\n",encoding='utf8')
print('Built eight source-hashed EIGRP neighbor views and separate startup headers')
