'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'labs/bgp-routing.sh'),'utf8');
const runtime=process.env.INFRA_FRR_ROOT||'/root/.cache/infra-fieldbook/frr-8.4.4/root';
const run=(code,args=[])=>spawnSync('wsl.exe',['-d','Ubuntu-24.04','-u','root','--','env','FRR_ROOT='+runtime,'bash','-s','--',...args],{input:code,encoding:'utf8',timeout:120000});
const snapshotCode=`set -e
ip -j link show
ip -j -4 route show table all
ip -j -6 route show table all
sysctl -n net.ipv4.ip_forward net.ipv6.conf.all.forwarding
python3 - <<'PY'
import glob,hashlib,json,pathlib,subprocess
processes=[]
for entry in pathlib.Path('/proc').glob('[0-9]*'):
    try:
        name=(entry/'comm').read_text().strip()
        if name in ['zebra','ospfd','eigrpd','bgpd','tshark','dumpcap']:processes.append([int(entry.name),name])
    except (FileNotFoundError,PermissionError,ProcessLookupError):pass
print(json.dumps(dict(groups=hashlib.sha256(pathlib.Path('/etc/group').read_bytes()).hexdigest(),mounts=hashlib.sha256(pathlib.Path('/proc/self/mountinfo').read_bytes()).hexdigest(),processes=sorted(processes),temporary=sorted(glob.glob('/tmp/infra-ospf.*')+glob.glob('/tmp/infra-eigrp.*')+glob.glob('/tmp/infra-bgp.*')),names=sorted(line.split()[0] for line in subprocess.check_output(['ip','netns','list'],text=True).splitlines()),frrConfig=pathlib.Path('/etc/frr').exists(),frrPam=pathlib.Path('/etc/pam.d/frr').exists())))
PY
`;
const snapshot=()=>{const r=run(snapshotCode);assert.equal(r.status,0,r.error?.message||r.stderr);const l=r.stdout.trim().split(/\r?\n/);return {links:JSON.parse(l[0]).map(x=>[x.ifindex,x.ifname,x.link_type]).sort(),v4:JSON.parse(l[1]),v6:JSON.parse(l[2]),forwarding:l.slice(3,5),isolation:JSON.parse(l[5])};};
const before=snapshot();
const syntax=spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','-n'],{input:source,encoding:'utf8',timeout:10000});assert.equal(syntax.status,0,syntax.error?.message||syntax.stderr);
const help=run(source);assert.equal(help.status,0,help.stderr);assert.match(help.stdout,/Usage:/);assert.deepEqual(snapshot(),before);
const actual=run(source,['--run']);
const lines=actual.stdout.trim().split(/\r?\n/),records={};for(const line of lines){const m=line.match(/^([A-Z_0-9]+) (\{.*|\[.*)$/);if(m)records[m[1]]=JSON.parse(m[2]);}
fs.writeFileSync(path.join(root,'docs/bgp-runtime-trial.json'),JSON.stringify({exitCode:actual.status,records,output:lines,error:actual.stderr,scope:'Raw trial awaiting independent assertions; not a passing verification report.'},null,2)+'\n');
assert.equal(actual.status,0,actual.error?.message||actual.stderr+'\n'+actual.stdout);
assert(lines.some(l=>l==='RECOVERY_ACTION restore only the exact owned R2 network statement; no daemon restart or session clear'));
for(const label of ['baseline','origin withdrawal','recovery','cleanup'])assert(lines.some(l=>l.startsWith('PASS '+label+':')));
for(const [key,localAs,remoteAs,peer,localPrefix,remotePrefix,rid,remoteRid] of [['R1',65001,65002,'203.0.113.2','192.0.2.0/24','198.51.100.0/24','1.1.1.1','2.2.2.2'],['R2',65002,65001,'203.0.113.1','198.51.100.0/24','192.0.2.0/24','2.2.2.2','1.1.1.1']]){
 for(const phase of ['BASELINE','FAULT','RECOVERED']){
  const summary=records[phase+'_SUMMARY_'+key];assert.equal(summary.routerId,rid);assert.equal(summary.as,localAs);assert.equal(summary.vrfName,'default');assert.deepEqual(Object.keys(summary.peers),[peer]);const p=summary.peers[peer];assert.equal(p.state,'Established');assert.equal(p.localAs,localAs);assert.equal(p.remoteAs,remoteAs);
  const base=records['BASELINE_SUMMARY_'+key].peers[peer];assert.equal(p.connectionsEstablished,base.connectionsEstablished);assert.equal(p.connectionsDropped,base.connectionsDropped);assert.equal(p.connectionsDropped,0);assert(p.peerUptimeMsec>=base.peerUptimeMsec);
  const n=records[phase+'_NEIGHBORS_'+key][peer];assert.equal(n.bgpState,'Established');assert.equal(n.remoteRouterId,remoteRid);assert.equal(n.localRouterId,rid);assert.equal(n.localAs,localAs);assert.equal(n.remoteAs,remoteAs);const af=n.addressFamilyInfo.ipv4Unicast;assert.equal(af.inboundPathPolicyConfig,true);assert.equal(af.outboundPathPolicyConfig,true);assert.equal(af.routeMapForIncomingAdvertisements,'PEER-IMPORT');assert.equal(af.routeMapForOutgoingAdvertisements,'OWN-EXPORT');assert(n.neighborCapabilities.multiprotocolExtensions.ipv4Unicast.advertisedAndReceived);
  for(const link of records[phase+'_LINKS_'+key].filter(l=>['lan','transit'].includes(l.ifname)))assert(link.flags.includes('UP')&&link.flags.includes('LOWER_UP'));
 }
 assert.equal(records['BASELINE_CONFIG_'+key].output,records['RECOVERED_CONFIG_'+key].output);
 const config=records['BASELINE_CONFIG_'+key].output;assert(config.includes('router bgp '+localAs));assert(config.includes('bgp router-id '+rid));assert(config.includes('neighbor '+peer+' remote-as '+remoteAs));assert(config.includes('ip prefix-list OWN-LAN seq 10 permit '+localPrefix));assert(config.includes('ip prefix-list PEER-LAN seq 10 permit '+remotePrefix));assert(config.includes('network '+localPrefix));assert(!config.includes('no bgp ebgp-requires-policy'));
 for(const phase of ['BASELINE','RECOVERED']){
  const table=records[phase+'_TABLE_'+key];assert.equal(table.localAS,localAs);assert.deepEqual(Object.keys(table.routes).sort(),[localPrefix,remotePrefix].sort());const paths=table.routes[remotePrefix];assert.equal(paths.length,1);const p=paths[0];assert.equal(p.valid,true);assert.equal(p.bestpath,true);assert.equal(p.path,String(remoteAs));assert.equal(p.peerId,peer);assert.equal(p.origin,'IGP');assert(p.nexthops.some(h=>h.ip===peer&&h.used));
  const local=table.routes[localPrefix][0];assert.equal(local.path,'');assert.equal(local.origin,'IGP');assert(local.nexthops.some(h=>h.ip==='0.0.0.0')); // literal local sentinel, not usable wire gateway
  const rib=records[phase+'_RIB_'+key][remotePrefix];assert.equal(rib.length,1);const r=rib[0];assert.equal(r.protocol,'bgp');assert.equal(r.distance,20);assert.equal(r.selected,true);assert.equal(r.installed,true);assert(r.nexthops.some(h=>h.ip===peer&&h.interfaceName==='transit'&&h.active&&h.fib));
  assert(records[phase+'_KERNEL_'+key].some(r=>r.dst===remotePrefix&&r.protocol==='bgp'&&r.gateway===peer&&r.dev==='transit'));
  assert(records[phase+'_KERNEL_'+key].some(r=>r.dst===localPrefix&&r.protocol==='kernel'&&r.dev==='lan'&&!r.gateway));
  assert.equal(records[phase+'_SUMMARY_'+key].peers[peer].pfxRcd,1);
 }
}
assert.equal(records.FAULT_CONFIG_R1.output,records.BASELINE_CONFIG_R1.output);assert.equal(records.FAULT_CONFIG_R2.output,records.BASELINE_CONFIG_R2.output.replace('  network 198.51.100.0/24\n',''));
assert.equal(records.FAULT_TABLE_R1.routes['198.51.100.0/24'],undefined);assert.equal(records.FAULT_TABLE_R2.routes['198.51.100.0/24'],undefined);assert.equal(records.FAULT_RIB_R1['198.51.100.0/24'],undefined);assert(!records.FAULT_KERNEL_R1.some(r=>r.dst==='198.51.100.0/24'));assert(records.FAULT_TABLE_R2.routes['192.0.2.0/24'][0].bestpath);assert(records.FAULT_RIB_R2['192.0.2.0/24'][0].selected);assert(records.FAULT_KERNEL_R2.some(r=>r.dst==='192.0.2.0/24'&&r.gateway==='203.0.113.1'));assert.equal(records.FAULT_SUMMARY_R1.peers['203.0.113.2'].pfxRcd,0);assert.equal(records.FAULT_SUMMARY_R2.peers['203.0.113.1'].pfxRcd,1);
const success=(label,target)=>{const r=records[label];assert.equal(r.target,target);assert.equal(r.exitCode,0);assert.match(r.output,/1 received/);};
for(const phase of ['BASELINE','RECOVERED']){success(phase+'_PROBE_CLIENT','198.51.100.20');success(phase+'_PROBE_SERVER','192.0.2.10');}
for(const endpoint of ['CLIENT','SERVER']){assert.notEqual(records['FAULT_PROBE_'+endpoint].exitCode,0);assert.match(records['FAULT_PROBE_'+endpoint].output,/0 received|unreachable/i);}
success('FAULT_PROBE_CLIENT_GATEWAY','192.0.2.1');success('FAULT_PROBE_SERVER_GATEWAY','198.51.100.1');
assert(records.PACKETS.length>0);for(const p of records.PACKETS){assert.equal(p.length,5);assert(['203.0.113.1','203.0.113.2'].includes(p[0]));assert(['203.0.113.1','203.0.113.2'].includes(p[1]));assert.equal(p[0]===p[1],false);assert(p[2]==='179'||p[3]==='179');assert(p[4].split(',').every(t=>['1','2','3','4','5'].includes(t)));}
for(const address of ['203.0.113.1','203.0.113.2'])for(const type of ['1','2','4'])assert(records.PACKETS.some(p=>p[0]===address&&p[4].split(',').includes(type)),'Decoded startup OPEN/UPDATE/KEEPALIVE in both directions');
assert.deepEqual(snapshot(),before,'Normal cleanup preserves independent host/resources');
const interruptedCleanup=[];
for(const [anchor,replacement,status,label] of [
 ['connect "$client" eth0 192.0.2.10 "$r1" lan 192.0.2.1 24','exit 23',23,'after namespaces'],
 ['# Capture is ready before the peer starts.','exit 24\n# Capture is ready before the peer starts.',24,'after first router'],
 ['start_router "$r2" 2.2.2.2','exit 25',25,'during capture'],
 ['# Capture is ready before the peer starts.',`for ((i=0;i<50;i++)); do [[ -s "$work/$r1/bgpd.pid" ]] && break; sleep .1; done
[[ -s "$work/$r1/bgpd.pid" ]]
kill -STOP "$(cat "$work/$r1/bgpd.pid")"
exit 26
#`,26,'with stopped owned daemon'],
 ["change_network 'network 198.51.100.0/24'",'exit 27',27,'while origin withdrawn']
]){assert.equal(source.split(anchor).length,2);const r=run(source.replace(anchor,replacement),['--run']);assert.equal(r.status,status,r.error?.message||r.stderr);assert.deepEqual(snapshot(),before,label);interruptedCleanup.push({label,exitCode:r.status,baselineMatched:true});}
const versions=run('ip -Version\nuname -r\nsha256sum "$FRR_ROOT"/../packages/*.deb\n');assert.equal(versions.status,0);
const checks=['Default help and syntax are inert; baseline resources preserved','Explicit private AS/RID/peer/family and exact-prefix import/export policies are retained','All three phases retain Established with unchanged established/drop counters and live LAN/transit links','Remote one-AS path and next hop are actual valid/best BGP candidates; local empty path/zero sentinel are separate','Selected installed eBGP distance20 active-FIB RIB agrees with independent kernel gateway','Connected LAN kernel routes remain live and distinct from local BGP origin','Owned R2 origin removal alone changes exact config and removes R1 remote BGP/RIB/kernel while R2 retains the opposite prefix','Fault original round trips fail while both local gateway probes work; baseline/recovered original ICMP succeeds','Exact network restoration recovers both directions with baseline configs and no session clear or daemon restart','Startup decoded frames carry TCP endpoint179 and OPEN/UPDATE/KEEPALIVE in both directions; multiple PDU type fields preserved','Normal/five interrupted cleanup paths preserve independent host links/routes/sysctls/group/mounts/daemons/namespaces/private paths'];
fs.writeFileSync(path.join(root,'docs/bgp-routing-lab-results.json'),JSON.stringify({date:'2026-10-09',result:'PASS',checks,environment:versions.stdout.trim().split(/\r?\n/),records,output:lines,interruptedCleanup,scope:'Actual FRR8.4.4 single direct IPv4 eBGP peering AS65001/65002, explicit exact-prefix policies and origin withdrawal/restoration with three checkpoints retaining Established and unchanged connection counters. Selected RIB/kernel and original bounded ICMP, separate incomplete startup type fields. No full best-path contest, iBGP/RR/confederation, IPv6/EVPN, RPKI/authentication, wire proof of fault withdrawal, complete TCP/FSM history, Cisco/application/hardware/zero-loss or elapsed convergence benchmark.'},null,2)+'\n');console.log('PASS '+checks.length+' actual BGP categories; five interrupted cleanup boundaries');
