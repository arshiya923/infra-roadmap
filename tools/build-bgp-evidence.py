"""Retain the independently verified BGP experiment; no router execution."""
import hashlib,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1];path='docs/bgp-routing-lab-results.json';raw=(root/path).read_bytes();report=json.loads(raw)
assert report['result']=='PASS' and len(report['checks'])==11
views=[]
for phase,title,intervention in [('BASELINE','Baseline','Explicit exact-prefix import/export; both owned local network origins present.'),('FAULT','R2 origin withdrawn','Only R2 network 198.51.100.0/24 is removed. Links and observed Established sessions remain; R1 loses that prefix, while R2 retains the opposite prefix.'),('RECOVERED','Exact origin restored','Only the exact R2 network statement is restored. No daemon restart or session clear; baseline configurations and original endpoint ICMP rechecked.')]:
 for router,peer,local,remote,asn,remote_as in [('R1','203.0.113.2','192.0.2.0/24','198.51.100.0/24',65001,65002),('R2','203.0.113.1','198.51.100.0/24','192.0.2.0/24',65002,65001)]:
  keys=[phase+'_'+k+'_'+router for k in ['SUMMARY','TABLE','NEIGHBORS','CONFIG','RIB','KERNEL','LINKS']]+[phase+'_PROBE_'+e for e in ['CLIENT','SERVER']]
  if phase=='FAULT':keys +=['FAULT_PROBE_CLIENT_GATEWAY','FAULT_PROBE_SERVER_GATEWAY']
  assert all(k in report['records'] for k in keys)
  views.append(dict(id=phase.lower()+'-'+router.lower(),title=title+' / '+router,phase=phase,observer=router,peer=peer,localPrefix=local,remotePrefix=remote,localAs=asn,remoteAs=remote_as,intervention=intervention,records={k:report['records'][k] for k in keys}))
payload=dict(schemaVersion=1,kind='PRESERVED_ACTUAL_BGP_FOUNDATION',source=dict(path=path,sha256=hashlib.sha256(raw).hexdigest(),date=report['date']),views=views,packets=report['records']['PACKETS'],packetScope='Separate incomplete startup transit capture: source/destination, TCP source/destination ports and comma-separated decoded BGP message types per captured frame. One frame may carry multiple PDUs. No attributes/NLRI, timestamps, complete TCP/FSM history or wire proof of the later origin withdrawal is retained.')
body=json.dumps(payload,ensure_ascii=True,separators=(',',':'));(root/'content/bgp-evidence.js').write_text("(function(root){'use strict';const evidence="+body+";if(typeof module==='object'&&module.exports)module.exports=evidence;else root.BgpEvidence=evidence;})(typeof window!=='undefined'?window:globalThis);\n",encoding='utf8')
print('Built six source-hashed BGP observer/checkpoint views')
