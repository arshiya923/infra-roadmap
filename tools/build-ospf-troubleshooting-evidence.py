"""Preserve separate passing lab views; never execute or merge experiments."""
import hashlib,json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
sources={}; reports={}
for experiment,name in [('single','ospf-routing'),('areas','ospf-areas'),('broadcast','ospf-dr-bdr')]:
 path='docs/'+name+'-lab-results.json';raw=(root/path).read_bytes();report=json.loads(raw);assert report['result']=='PASS'
 reports[experiment]=report;sources[experiment]=dict(path=path,sha256=hashlib.sha256(raw).hexdigest(),date=report['date'])
views=[]
def view(id,title,experiment,intervention,focus,keys,observations,notes):
 records=reports[experiment]['records'];assert all(k in records for k in keys),(id,[k for k in keys if k not in records])
 assert all(k in keys for o in observations for k in o['keys'])
 views.append(dict(id=id,title=title,experiment=experiment,intervention=intervention,expectedFocus=focus,notes=notes,records={k:records[k] for k in keys},observations=observations))
def observation(layer,observer,finding,*keys):return dict(layer=layer,observer=observer,finding=finding,keys=list(keys))
for id,title,phase,intervention,focus in [
 ('single-baseline','Single area / baseline','','No fault applied.','no-demonstrated-fault'),
 ('single-passive','Single area / passive transit','FAULT_','Only R1 transit is made passive; carrier remains up.','neighbor'),
 ('single-adjacency-recovered','Single area / adjacency restored','RECOVERED_','Remove only the introduced R1 transit passive setting.','no-demonstrated-fault'),
 ('single-forwarding','Single area / forwarding disabled','FORWARD_FAULT_','Only owned R2 net.ipv4.ip_forward changes from 1 to 0.','forwarding'),
 ('single-forwarding-recovered','Single area / forwarding restored','FORWARD_RECOVERED_','Restore owned R2 forwarding from 0 to 1.','no-demonstrated-fault'),
 ('single-return','Single area / endpoint route removed','RETURN_FAULT_','Remove only server route 192.0.2.0/24 via 198.51.100.1.','endpoint-return'),
 ('single-return-recovered','Single area / endpoint route restored','RETURN_RECOVERED_','Restore exactly that owned endpoint route.','no-demonstrated-fault')]:
 rec=reports['single']['records'];keys=[];observations=[]
 for number,prefix in [(1,'198.51.100.0/24'),(2,'192.0.2.0/24')]:
  key=phase+'NEIGHBORS_R'+str(number);keys.append(key);neighbors=rec[key]['neighbors'];states=[n['state'] for ns in neighbors.values() for n in ns]
  observations.append(observation('Neighbor','R'+str(number),', '.join(states) if states else 'No neighbors retained in this view.',key))
  key=phase+'ROUTES_R'+str(number);keys.append(key);entries=rec[key].get(prefix,[]);chosen=[r for r in entries if r.get('selected') and r.get('installed')]
  observations.append(observation('Selected RIB','R'+str(number),prefix+(': OSPF selected and installed.' if chosen else ': no selected/installed OSPF candidate recorded.'),key))
  key=phase+'KERNEL_R'+str(number)
  if key in rec:
   keys.append(key);routes=[r for r in rec[key] if r.get('dst')==prefix]
   observations.append(observation('Kernel path','R'+str(number),prefix+(': '+', '.join(r.get('gateway','direct')+' via '+r.get('dev','?') for r in routes) if routes else ': absent.'),key))
 if phase=='FAULT_':
  keys+=['FAULT_INTERFACES_R1','FAULT_TRANSIT_R1']
  observations.append(observation('Interface','R1','Transit passive flag '+str(rec['FAULT_INTERFACES_R1']['interfaces']['transit']['timerPassiveIface'])+'; link flags '+', '.join(rec['FAULT_TRANSIT_R1'][0]['flags']),*keys[-2:]))
 state=phase+'STATE'
 if state in rec:
  keys.append(state);observations.append(observation('Forwarding switch','R2','Namespace IPv4 forwarding = '+str(rec[state]['r2IPv4Forwarding']),state))
 for key in ['RETURN_BASELINE_SERVER_KERNEL'] if phase=='RETURN_FAULT_' else []:keys.append(key)
 key=phase+'SERVER_KERNEL'
 if key in rec:
  keys.append(key);remote=any(r.get('dst')=='192.0.2.0/24' for r in rec[key]);observations.append(observation('Endpoint route','Server','192.0.2.0/24 '+('present.' if remote else 'absent; no default route in this isolated endpoint.'),key))
 probephase='BASELINE_' if phase=='' else phase
 probes=[k for k in rec if k.startswith(probephase+'PROBE_')]
 for key in probes:
  keys.append(key);p=rec[key];observations.append(observation('Actual ICMP','Probe '+key.split('PROBE_')[1],p['target']+' / exit '+str(p['exitCode'])+' / '+('succeeded' if p['exitCode']==0 else 'failed'),key))
 if not probes:observations.append(observation('Probe scope','Runner','Bidirectional settled exchange/fault is checked by the source runner and verifier; this older phase has no individual raw ping record.'))
 view(id,title,'single',intervention,focus,keys,observations,'Retained observations from one isolated two-router experiment. Selected/kernel route presence is not a forwarding-enable or application-health test. Successful ICMP is a bounded request/reply exchange, not proof of an application transaction. Changing Linux ip_forward also resets IPv4 host/router defaults in the owned namespace; restoring its flag is not a universal rollback of custom sysctl tuning.')
for id,title,phase,focus in [('areas-mismatch','Areas / branch mismatch','FAULT_','area-compatibility'),('areas-recovered','Areas / branch restored','RECOVERED_','no-demonstrated-fault')]:
 rec=reports['areas']['records'];keys=[];obs=[]
 for router in ['R1','ABR','R3']:
  key=phase+'NEIGHBORS_'+router;keys.append(key);states=[n['state'] for ns in rec[key]['neighbors'].values() for n in ns];obs.append(observation('Neighbor',router,', '.join(states) or 'No neighbors retained.',key))
 for router in ['ABR','R3']:
  key=phase+'INTERFACES_'+router;keys.append(key);obs.append(observation('Area compatibility',router,'Branch area '+rec[key]['interfaces']['branch']['area'],key))
 for router,prefix in [('R1','198.51.100.0/24'),('R3','192.0.2.0/24')]:
  key=phase+'OSPF_ROUTES_'+router;keys.append(key);obs.append(observation('OSPF calculation',router,prefix+(' present.' if prefix in rec[key] else ' absent.'),key))
  key=phase+'KERNEL_'+router;keys.append(key);obs.append(observation('Kernel path',router,prefix+(' present.' if any(r.get('dst')==prefix for r in rec[key]) else ' absent.'),key))
 if phase=='FAULT_':keys.append('FAULT_BRANCH_LINK');obs.append(observation('Carrier','R3','Branch link flags '+', '.join(rec['FAULT_BRANCH_LINK'][0]['flags']),'FAULT_BRANCH_LINK'))
 view(id,title,'areas','R3 branch only: area 1 to area 2, then exact restoration to area 1.',focus,keys,obs,'Backbone and branch are distinct scopes. Settled ICMP behavior is separately verified by the source lab; individual raw ping output was not retained for this experiment. Foreign-area router LSAs are not expected in an internal router database.')
rec=reports['broadcast']['records'];keys=['LATE_INTERFACES_R3','LATE_INTERFACES_R4','LATE_NEIGHBORS_R3','LATE_NEIGHBORS_R4','LATE_RIB_R3','LATE_RIB_R4','LATE_KERNEL_R3','LATE_KERNEL_R4','CAPTURE','R3_LINK','R4_LINK'];obs=[]
for number,other in [(3,4),(4,3)]:
 key='LATE_NEIGHBORS_R'+str(number);neighbor=rec[key]['neighbors']['.'.join([str(other)]*4)][0];obs.append(observation('Expected pair','R'+str(number)+' to R'+str(other),neighbor['state']+' between two DROthers is expected here.',key,'LATE_INTERFACES_R'+str(number)))
 key='LATE_RIB_R'+str(number);prefix='198.51.100.'+str(other)+'/32';routes=[r for r in rec[key][prefix] if r.get('selected') and r.get('installed')];assert routes;obs.append(observation('Selected RIB','R'+str(number),prefix+' selected/installed, next hop 192.0.2.'+str(other),key))
obs.append(observation('Actual capture','R3 LAN','Decoded Hello and direct peer ICMP headers; not an application or zero-loss benchmark.','CAPTURE','R3_LINK','R4_LINK'))
view('broadcast-two-way','Broadcast / healthy DROther pair','broadcast','Staged existing DR/BDR and higher-priority late arrival; no fault in this selected view.','no-demonstrated-fault',keys,obs,'Only the R3/R4 pair is 2-Way; each DROther is Full with the DR/BDR. The DR is not a required data-plane relay. Keep this experiment separate from the single-area and Areas examples.')
payload=dict(schemaVersion=1,kind='PRESERVED_ACTUAL_OSPF_TROUBLESHOOTING',sources=sources,views=views)
body=json.dumps(payload,ensure_ascii=True,separators=(',',':'))
(root/'content/ospf-troubleshooting-evidence.js').write_text("(function(root){'use strict';const evidence="+body+";if(typeof module==='object'&&module.exports)module.exports=evidence;else root.OspfTroubleshootingEvidence=evidence;})(typeof window!=='undefined'?window:globalThis);\n",encoding='utf8',newline='\n')
print('Built '+str(len(views))+' separate actual troubleshooting views')
