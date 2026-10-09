'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'labs/eigrp-routing.sh'),'utf8');
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
        if name in ['zebra','ospfd','eigrpd','tshark','dumpcap']:processes.append([int(entry.name),name])
    except (FileNotFoundError,PermissionError,ProcessLookupError):pass
print(json.dumps(dict(groups=hashlib.sha256(pathlib.Path('/etc/group').read_bytes()).hexdigest(),mounts=hashlib.sha256(pathlib.Path('/proc/self/mountinfo').read_bytes()).hexdigest(),processes=sorted(processes),temporary=sorted(glob.glob('/tmp/infra-ospf.*')+glob.glob('/tmp/infra-eigrp.*')),names=sorted(line.split()[0] for line in subprocess.check_output(['ip','netns','list'],text=True).splitlines()),frrConfig=pathlib.Path('/etc/frr').exists(),frrPam=pathlib.Path('/etc/pam.d/frr').exists())))
PY
`;
const snapshot=()=>{const r=run(snapshotCode);assert.equal(r.status,0,r.error?.message||r.stderr);const l=r.stdout.trim().split(/\r?\n/);return {links:JSON.parse(l[0]).map(x=>[x.ifindex,x.ifname,x.link_type]).sort(),v4:JSON.parse(l[1]),v6:JSON.parse(l[2]),forwarding:l.slice(3,5),isolation:JSON.parse(l[5])};};
const before=snapshot();
const syntax=spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','-n'],{input:source,encoding:'utf8',timeout:10000});assert.equal(syntax.status,0,syntax.error?.message||syntax.stderr);
const help=run(source);assert.equal(help.status,0,help.stderr);assert.match(help.stdout,/Usage:/);assert.deepEqual(snapshot(),before);
const actual=run(source,['--run']);
const lines=actual.stdout.trim().split(/\r?\n/),records={};for(const line of lines){const m=line.match(/^([A-Z_0-9]+) (\{.*|\[.*)$/);if(m)records[m[1]]=JSON.parse(m[2]);}
fs.writeFileSync(path.join(root,'docs/eigrp-runtime-trial.json'),JSON.stringify({exitCode:actual.status,records,output:lines,error:actual.stderr,scope:'Raw trial awaiting independent assertions; not a passing verification report.'},null,2)+'\n');
assert.equal(actual.status,0,actual.error?.message||actual.stderr+'\n'+actual.stdout);
assert(lines.some(line=>line.startsWith('RECOVERY_ACTION owned link up followed by identity-checked restart')));
for(const key of ['R1','R2'])assert.equal(records['BASELINE_CONFIG_'+key].output,records['RECOVERED_CONFIG_'+key].output,'Owned daemon reinitialization uses unchanged observed configuration');
for(const label of ['baseline','transit interruption','recovery','cleanup'])assert(lines.some(x=>x.startsWith('PASS '+label+':')),label);
const tableRows=text=>text.split('\n').filter(line=>/^\d+\s+\d+\.\d+\.\d+\.\d+\s+/.test(line.trim())).map(line=>line.trim().split(/\s+/));
for(const phase of ['BASELINE_','RECOVERED_'])for(const [key,peer,prefix,gateway,rid] of [['R1','203.0.113.2','198.51.100.0/24','203.0.113.2','1.1.1.1'],['R2','203.0.113.1','192.0.2.0/24','203.0.113.1','2.2.2.2']]){
 const n=records[phase+'NEIGHBORS_'+key];assert.equal(n.command,'show ip eigrp neighbors');assert.match(n.output,/AS\(100\)/);const rows=tableRows(n.output);assert.equal(rows.length,1);assert.equal(rows[0][1],peer);assert.equal(rows[0][2],'transit');assert.equal(Number(rows[0][7]),0,'Settled neighbor retransmit queue is empty');
 const config=records[phase+'CONFIG_'+key].output;assert.match(config,/router eigrp 100/);assert(config.includes('eigrp router-id '+rid));assert.match(config,/network 203\.0\.113\.0\/30/);assert(config.includes('network '+(key==='R1'?'192.0.2.0/24':'198.51.100.0/24')));
 const topology=records[phase+'TOPOLOGY_'+key].output;assert(topology.includes('AS(100)/ID('+rid+')'));const remote=topology.split('\n').find(line=>line.startsWith('P  '+prefix));assert(remote,'Remote prefix is retained in PASSIVE route state');assert.match(remote,/1 successors, FD is \d+/);assert(topology.includes('via '+gateway+' ('));
 const route=records[phase+'RIB_'+key][prefix];assert.equal(route.length,1);const r=route[0];assert.equal(r.protocol,'eigrp');assert.equal(r.distance,90);assert.equal(r.selected,true);assert.equal(r.installed,true);assert(r.metric>0);assert(r.nexthops.some(h=>h.ip===gateway&&h.interfaceName==='transit'&&h.active&&h.fib));
 assert(records[phase+'KERNEL_'+key].some(r=>r.dst===prefix&&r.protocol==='eigrp'&&r.gateway===gateway&&r.dev==='transit'));
 const connected=records[phase+'RIB_'+key][key==='R1'?'192.0.2.0/24':'198.51.100.0/24'];assert(connected&&connected.every(r=>!r.selected&&!r.installed),'Protocol connected candidates are not the selected connected kernel route');
 const iface=records[phase+'INTERFACES_'+key].output;assert.match(iface,/^transit\s+\d+\s+\d+\s+1\s/m);assert.match(iface,/^lan\s+\d+\s+\d+\s+0\s/m);
}
for(const key of ['R1','R2'])assert.equal(tableRows(records['FAULT_NEIGHBORS_'+key].output).length,0);
for(const [key,prefix] of [['R1','198.51.100.0/24'],['R2','192.0.2.0/24']]){assert((records['FAULT_RIB_'+key][prefix]||[]).every(r=>!r.selected&&!r.installed&&!r.nexthops.some(h=>h.active&&h.fib)));assert(!records['FAULT_KERNEL_'+key].some(r=>r.dst===prefix));}
assert(!records.FAULT_TRANSIT_LINK[0].flags.includes('UP'));
const success=(label,target)=>{const r=records[label];assert.equal(r.target,target);assert.equal(r.exitCode,0);assert.match(r.output,/1 received/);};
for(const phase of ['BASELINE_','RECOVERED_']){success(phase+'PROBE_CLIENT','198.51.100.20');success(phase+'PROBE_SERVER','192.0.2.10');}
for(const [label,target] of [['FAULT_PROBE_CLIENT','198.51.100.20'],['FAULT_PROBE_SERVER','192.0.2.10']]){assert.equal(records[label].target,target);assert.notEqual(records[label].exitCode,0);assert.match(records[label].output,/0 received|unreachable/i);}
success('FAULT_PROBE_CLIENT_GATEWAY','192.0.2.1');success('FAULT_PROBE_SERVER_GATEWAY','198.51.100.1');
const packets=records.PACKETS;assert(packets.length>0);for(const p of packets){assert.equal(p.length,7);assert(['203.0.113.1','203.0.113.2'].includes(p[0]));assert.equal(p[2],'88');assert.equal(p[4],'100');}
for(const address of ['203.0.113.1','203.0.113.2']){assert(packets.some(p=>p[0]===address&&p[1]==='224.0.0.10'&&p[3]==='5'&&p[5]==='0'&&p[6]==='0'),'Actual multicast Hello in both directions');assert(packets.some(p=>p[0]===address&&p[3]==='1'&&Number(p[5])>0),'Actual sequenced UPDATE in both directions');assert(packets.some(p=>p[0]===address&&p[3]==='5'&&p[5]==='0'&&Number(p[6])>0),'Actual acknowledgment-bearing Hello-format packet in both directions');}
assert.deepEqual(snapshot(),before,'Normal cleanup preserves independent host and pre-existing resources');
const failureEvidence=[];
for(const [anchor,replacement,status,label] of [
 ['connect "$client" eth0 192.0.2.10 "$r1" lan 192.0.2.1 24','exit 23',23,'after namespaces'],
 ['# Capture is ready before the peer starts.','exit 24\n# Capture is ready before the peer starts.',24,'after first router'],
 ['start_router "$r2" 2.2.2.2','exit 25',25,'during capture'],
 ['# Capture is ready before the peer starts.',`for ((i=0;i<50;i++)); do [[ -s "$work/$r1/eigrpd.pid" ]] && break; sleep .1; done
[[ -s "$work/$r1/eigrpd.pid" ]]
kill -STOP "$(cat "$work/$r1/eigrpd.pid")"
exit 26
#`,26,'with stopped owned daemon'],
 ['ip -n "$r1" link set transit up','exit 27',27,'while transit is down']
]){assert.equal(source.split(anchor).length,2);const failed=run(source.replace(anchor,replacement),['--run']);assert.equal(failed.status,status,failed.error?.message||failed.stderr);assert.deepEqual(snapshot(),before,label+' must preserve independent baseline');failureEvidence.push({label,exitCode:failed.status,baselineMatched:true});}
const versions=run('ip -Version\nuname -r\nsha256sum "$FRR_ROOT"/../packages/*.deb\n');assert.equal(versions.status,0);
const checks=['Default help and shell syntax are inert and valid','Actual AS 100 peers use the owned transit and settled retransmit queues are empty','Explicit domain-unique RIDs and interface-selecting network statements are retained','Remote topology entries are PASSIVE with a successor; this differs from passive-interface configuration','Selected installed internal EIGRP routes, distance 90 and active FIB next hops are retained','Independent Linux EIGRP kernel next hops corroborate remote installation; kernel priority is not protocol metric','Local connected EIGRP candidates are not selected over connected kernel routes','Actual multicast Hellos, sequenced UPDATEs and acknowledgment-bearing packets use IP protocol 88/AS 100 in both directions','Original endpoint ICMP succeeds at baseline and after owned link restoration plus explicit owned-daemon reinitialization','Owned link interruption withdraws peer and remote route evidence; both remote probes fail while local gateways work','Actual FRR timer/interface output is retained without promoting unsupported trial settings into configured facts','Normal and five interrupted paths including capture, stopped-daemon escalation and link-down state preserve independent host/resources'];
fs.writeFileSync(path.join(root,'docs/eigrp-routing-lab-results.json'),JSON.stringify({date:'2026-10-09',result:'PASS',checks,environment:versions.stdout.trim().split(/\r?\n/),records,output:lines,interruptedCleanup:failureEvidence,scope:'Actual FRR 8.4.4 Ubuntu runtime; two owned IPv4 EIGRP routers and two endpoints, AS 100, unique RIDs, interface activation via network prefixes, kernel installation, raw ICMP and startup capture. Recovery explicitly restores the link then identity-checks/restarts both owned eigrpd children with unchanged configuration; link-only recovery was not reliably successful. No Cisco execution, effective passive-interface/timer mutation, alternate/feasible-successor switchover, active/query/SIA trace, metric configuration, redistribution, IPv6, authentication, application/hardware/zero-loss or convergence benchmark. Rejected interface/passive trial retained separately; no universal FRR support/default assumption.'},null,2)+'\n');console.log('PASS '+checks.length+' actual EIGRP/probe/packet/isolation checks; five interrupted cleanup paths');
