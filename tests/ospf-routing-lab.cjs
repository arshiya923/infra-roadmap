'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'labs/ospf-routing.sh'),'utf8'),prepare=fs.readFileSync(path.join(root,'labs/prepare-frr-runtime.sh'),'utf8');
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
        if name in ['zebra','ospfd']: processes.append([int(entry.name),name])
    except (FileNotFoundError,PermissionError,ProcessLookupError): pass
print(json.dumps(dict(groups=hashlib.sha256(pathlib.Path('/etc/group').read_bytes()).hexdigest(),mounts=hashlib.sha256(pathlib.Path('/proc/self/mountinfo').read_bytes()).hexdigest(),processes=sorted(processes),temporary=sorted(glob.glob('/tmp/infra-ospf.*')),names=sorted(line.split()[0] for line in subprocess.check_output(['ip','netns','list'],text=True).splitlines()),frrConfig=pathlib.Path('/etc/frr').exists(),frrPam=pathlib.Path('/etc/pam.d/frr').exists())))
PY
`;
const snapshot=()=>{const r=run(snapshotCode);assert.equal(r.status,0,r.stderr);const l=r.stdout.trim().split(/\r?\n/);return {links:JSON.parse(l[0]).map(x=>[x.ifindex,x.ifname,x.link_type]).sort(),v4:JSON.parse(l[1]),v6:JSON.parse(l[2]),forwarding:l.slice(3,5),isolation:JSON.parse(l[5])};};
const before=snapshot();for(const script of [source,prepare]){const syntax=spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','-n'],{input:script,encoding:'utf8',timeout:10000});assert.equal(syntax.status,0,syntax.stderr);const help=run(script);assert.equal(help.status,0,help.stderr);assert.match(help.stdout,/Usage:/);assert.deepEqual(snapshot(),before,'Default help must not create resources');}
const prepared=run(prepare,['--prepare']);assert.equal(prepared.status,0,prepared.stderr);assert.match(prepared.stdout,/ospfd version 8\.4\.4/);assert.deepEqual(snapshot(),before,'Private runtime extraction must not change host routing/groups/mounts/services');
const actual=run(source,['--run']);assert.equal(actual.status,0,actual.stderr+'\n'+actual.stdout);
const lines=actual.stdout.trim().split(/\r?\n/),records={};for(const line of lines){const match=line.match(/^([A-Z_0-9]+) (\{.*|\[.*)$/);if(match)records[match[1]]=JSON.parse(match[2]);}
for(const label of ['baseline','passive transit','recovery','forwarding fault','forwarding recovery','return fault','return recovery','cleanup'])assert(lines.some(x=>x.startsWith('PASS '+label+':')),label);
const full=(record,id)=>{assert.deepEqual(Object.keys(record.neighbors),[id]);assert.equal(record.neighbors[id].length,1);assert.equal(record.neighbors[id][0].converged,'Full');assert.equal(record.neighbors[id][0].state,'Full/-');assert.match(record.neighbors[id][0].ifaceName,/^transit:/);};
for(const phase of ['', 'RECOVERED_', 'FORWARD_FAULT_', 'RETURN_FAULT_', 'FORWARD_RECOVERED_', 'RETURN_RECOVERED_']){full(records[phase+'NEIGHBORS_R1'],'2.2.2.2');full(records[phase+'NEIGHBORS_R2'],'1.1.1.1');}
for(const key of ['INTERFACES_R1','INTERFACES_R2']){const interfaces=records[key].interfaces;for(const name of ['lan','transit']){assert.equal(interfaces[name].ospfEnabled,true);assert.equal(interfaces[name].area,'0.0.0.0');assert.equal(interfaces[name].cost,10);}assert.equal(interfaces.lan.timerPassiveIface,true);assert.equal(interfaces.lan.nbrCount,0);assert.equal(interfaces.transit.networkType,'POINTOPOINT');assert.equal(interfaces.transit.timerMsecs,1000);assert.equal(interfaces.transit.timerDeadSecs,4);assert.equal(interfaces.transit.nbrAdjacentCount,1);}
const route=(record,prefix,gateway)=>{assert(record[prefix]);const selected=record[prefix].filter(x=>x.selected&&x.installed);assert.equal(selected.length,1);const r=selected[0];assert.equal(r.protocol,'ospf');assert.equal(r.distance,110);assert.equal(r.metric,20);assert(r.nexthops.some(n=>n.ip===gateway&&n.interfaceName==='transit'&&n.active&&n.fib));};
for(const phase of ['', 'RECOVERED_', 'FORWARD_FAULT_', 'RETURN_FAULT_', 'FORWARD_RECOVERED_', 'RETURN_RECOVERED_']){route(records[phase+'ROUTES_R1'],'198.51.100.0/24','203.0.113.2');route(records[phase+'ROUTES_R2'],'192.0.2.0/24','203.0.113.1');}
for(const [key,prefix,gateway] of [['KERNEL_R1','198.51.100.0/24','203.0.113.2'],['KERNEL_R2','192.0.2.0/24','203.0.113.1']])assert(records[key].some(r=>r.dst===prefix&&r.gateway===gateway&&r.dev==='transit'&&r.protocol==='ospf'));
const area=records.DATABASE_R1.areas['0.0.0.0'];assert.equal(area.routerLinkStatesCount,2);assert.deepEqual(area.routerLinkStates.map(x=>x.advertisedRouter).sort(),['1.1.1.1','2.2.2.2']);
assert.deepEqual(records.FAULT_NEIGHBORS_R1.neighbors,{});assert.deepEqual(records.FAULT_NEIGHBORS_R2.neighbors,{});assert(records.FAULT_TRANSIT_R1[0].flags.includes('UP'));assert(records.FAULT_TRANSIT_R1[0].flags.includes('LOWER_UP'));
assert(!records.FAULT_KERNEL_R1.some(r=>r.dst==='198.51.100.0/24'));assert(!records.FAULT_KERNEL_R2.some(r=>r.dst==='192.0.2.0/24'));
const hellos=records.PACKETS.filter(row=>row[3]==='1');for(const address of ['203.0.113.1','203.0.113.2'])assert(hellos.some(row=>row[0]===address&&row[1]==='224.0.0.5'&&row[2]==='89'&&row[4]==='0.0.0.0'));
for(const phase of ['FORWARD_FAULT_','RETURN_FAULT_','FORWARD_RECOVERED_','RETURN_RECOVERED_'])for(const [number,prefix,gateway] of [[1,'198.51.100.0/24','203.0.113.2'],[2,'192.0.2.0/24','203.0.113.1']])assert(records[phase+'KERNEL_R'+number].some(r=>r.dst===prefix&&r.gateway===gateway&&r.dev==='transit'&&r.protocol==='ospf'));
for(const side of ['CLIENT','SERVER']){assert.equal(records['BASELINE_PROBE_'+side].exitCode,0);assert.match(records['BASELINE_PROBE_'+side].output,/1 received/);}
assert.equal(records.FAULT_INTERFACES_R1.interfaces.transit.timerPassiveIface,true);
assert(!records.FAULT_ROUTES_R1['198.51.100.0/24']);assert(!records.FAULT_ROUTES_R2['192.0.2.0/24']);
assert.equal(records.FORWARD_FAULT_STATE.r2IPv4Forwarding,0);
assert.equal(records.FORWARD_RECOVERED_STATE.r2IPv4Forwarding,1);
assert.equal(records.RETURN_FAULT_STATE.r2IPv4Forwarding,1);
for(const phase of ['FORWARD_FAULT_','RETURN_FAULT_'])for(const [side,target] of [['CLIENT','198.51.100.20'],['SERVER','192.0.2.10']]){const probe=records[phase+'PROBE_'+side];assert.equal(probe.target,target);assert([1,2].includes(probe.exitCode));assert.equal(typeof probe.output,'string');assert(probe.output.length>0);assert.equal(records[phase+'PROBES'][side==='CLIENT'?'clientToServer':'serverToClient'],false);}
for(const [key,target] of [['FORWARD_FAULT_PROBE_TRANSIT','203.0.113.2'],['FORWARD_FAULT_PROBE_CLIENT_GATEWAY','192.0.2.1'],['FORWARD_FAULT_PROBE_SERVER_GATEWAY','198.51.100.1'],['RETURN_FAULT_PROBE_CLIENT_GATEWAY','192.0.2.1'],['RETURN_FAULT_PROBE_SERVER_GATEWAY','198.51.100.1'],['RETURN_FAULT_PROBE_SERVER_LAN','198.51.100.20']]){assert.equal(records[key].target,target);assert.equal(records[key].exitCode,0);assert.match(records[key].output,/1 received/);}
for(const phase of ['FORWARD_RECOVERED_','RETURN_RECOVERED_'])for(const side of ['CLIENT','SERVER']){assert.equal(records[phase+'PROBE_'+side].exitCode,0);assert.match(records[phase+'PROBE_'+side].output,/1 received/);assert.equal(records[phase+'PROBES'][side==='CLIENT'?'clientToServer':'serverToClient'],true);}
const serverRoute=r=>r.some(x=>x.dst==='192.0.2.0/24'&&x.gateway==='198.51.100.1'&&x.dev==='eth0');
assert(serverRoute(records.RETURN_BASELINE_SERVER_KERNEL));assert(!serverRoute(records.RETURN_FAULT_SERVER_KERNEL));assert(!records.RETURN_FAULT_SERVER_KERNEL.some(r=>r.dst==='default'));
assert.deepEqual(records.RETURN_RECOVERED_SERVER_KERNEL,records.RETURN_BASELINE_SERVER_KERNEL,'Exact introduced endpoint route restored without unrelated changes');
assert.deepEqual(snapshot(),before,'Normal cleanup must preserve host routes/links/forwarding, groups, mounts, pre-existing FRR processes, namespaces and runtime directories');
const faults=[['connect "$client" eth0 192.0.2.10 "$r1" lan 192.0.2.1 24','exit 23',23],['start_router "$r2" 2.2.2.2','exit 24',24],['ip netns exec "$r2" sysctl -qw net.ipv4.ip_forward=0','ip netns exec "$r2" sysctl -qw net.ipv4.ip_forward=0\nexit 25',25],['ip -n "$server" route del 192.0.2.0/24 via 198.51.100.1','ip -n "$server" route del 192.0.2.0/24 via 198.51.100.1\nexit 26',26]];
for(const [anchor,replacement,status] of faults){assert.equal(source.split(anchor).length,2);const failed=run(source.replace(anchor,replacement),['--run']);assert.equal(failed.status,status,failed.stderr);assert.deepEqual(snapshot(),before,'Early failure must leave no owned daemon, mount, namespace or temporary directory');}
const version=run('ip -Version\nuname -r\ntshark --version | head -n 1\nsha256sum "$FRR_ROOT"/../packages/*.deb\n');assert.equal(version.status,0,version.stderr);
const report={date:'2026-10-09',result:'PASS',environment:version.stdout.trim().split(/\r?\n/),checks:['Default help is inert','Pinned private package extraction executes without host routing/group/mount/service changes','Actual interface JSON confirms enabled area 0, LAN passive/no neighbors, transit point-to-point with 1/4 timers and observed cost ten on both interfaces','Actual Full point-to-point adjacency on both routers','Actual area-0 database has both router LSAs','Actual FRR-selected installed remote-prefix routes and Linux OSPF kernel entries in both directions','Bounded original bidirectional ICMP exchange succeeds over learned routes','Actual isolated transit capture includes Hello packets from both peers: IP protocol 89, area 0 and AllSPFRouters multicast','Making only R1 transit passive removes both neighbor relationships and learned remote routes, with carrier still up; remote exchange fails while local client gateway works','Exact passive-interface reversal restores Full neighbors, selected installed remote routes and bidirectional exchange','Normal cleanup preserves independent host and existing-resource snapshots','Early failure after namespace creation and after starting the first pair of daemons preserves independent snapshots'],records,preparationOutput:prepared.stdout.trim().split(/\r?\n/),output:lines,scope:'Actual FRR 8.4.4 Ubuntu packages extracted into a private cache, isolated network and mount namespaces on the shared WSL kernel. No Cisco execution, system FRR service/account/configuration changes, Internet protocol traffic, application transaction, hardware forwarding, benchmark or measured convergence claim. Packet files are temporary; decoded actual header metadata is retained.'};
report.checks.splice(10,0,
 'Owned R2 forwarding disabled: Full adjacencies and selected/installed kernel routes persist while raw endpoint probes fail and connected controls succeed',
 'Exact owned forwarding restoration returns state 1 and both raw endpoint probes succeed',
 'Owned endpoint return route removed: Full adjacencies, selected/installed router paths and R2 forwarding persist while raw endpoint probes fail and connected controls succeed',
 'Exact endpoint route restoration matches baseline kernel routes and both raw endpoint probes succeed');
report.checks[report.checks.length-1]='Early failures after namespace creation, first router daemons, owned forwarding disable and endpoint route removal preserve independent snapshots';
fs.writeFileSync(path.join(root,'docs/ospf-routing-lab-results.json'),JSON.stringify(report,null,2)+'\n');console.log('PASS '+report.checks.length+' actual OSPF, packet and isolation checks');
