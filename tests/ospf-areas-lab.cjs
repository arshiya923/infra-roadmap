'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'labs/ospf-areas.sh'),'utf8');
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
const before=snapshot();const syntax=spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','-n'],{input:source,encoding:'utf8',timeout:10000});assert.equal(syntax.status,0,syntax.stderr);const help=run(source);assert.equal(help.status,0,help.stderr);assert.match(help.stdout,/Usage:/);assert.deepEqual(snapshot(),before);
const actual=run(source,['--run']);assert.equal(actual.status,0,actual.stderr+'\n'+actual.stdout);const lines=actual.stdout.trim().split(/\r?\n/),records={};for(const line of lines){const match=line.match(/^([A-Z_0-9]+) (\{.*|\[.*)$/);if(match)records[match[1]]=JSON.parse(match[2]);}
for(const stage of ['baseline','mismatch','recovery','cleanup'])assert(lines.some(x=>x.startsWith('PASS '+stage+':')),stage);
const full=(key,ids)=>{const n=records[key].neighbors;assert.deepEqual(Object.keys(n).sort(),ids.sort());for(const id of ids){assert.equal(n[id].length,1);assert.equal(n[id][0].converged,'Full');assert.equal(n[id][0].state,'Full/-');}};
const area=(key,id,routers)=>{const a=records[key].areas[id];assert(a);assert.equal(a.routerLinkStatesCount,2);assert.deepEqual(a.routerLinkStates.map(l=>l.advertisedRouter).sort(),routers.sort());return a;};
const summary=(a,prefix)=>assert(a.summaryLinkStates.some(l=>l.summaryAddress===prefix&&l.advertisedRouter==='2.2.2.2'));
const installed=(key,prefix,gateway,cost)=>{const r=records[key][prefix].filter(x=>x.selected&&x.installed);assert.equal(r.length,1);assert.equal(r[0].protocol,'ospf');assert.equal(r[0].metric,cost);assert(r[0].nexthops.some(n=>n.ip===gateway&&n.fib&&n.active));};
for(const phase of ['', 'RECOVERED_']){
 full(phase+'NEIGHBORS_R1',['2.2.2.2']);full(phase+'NEIGHBORS_ABR',['1.1.1.1','3.3.3.3']);full(phase+'NEIGHBORS_R3',['2.2.2.2']);
 assert.equal(records[phase+'PROCESS_ABR'].abrType,'Standard (RFC2328)');assert.equal(records[phase+'PROCESS_ABR'].attachedAreaCounter,2);assert.deepEqual(Object.keys(records[phase+'PROCESS_ABR'].areas).sort(),['0.0.0.0','0.0.0.1']);
 assert.deepEqual(Object.keys(records[phase+'DATABASE_R1'].areas),['0.0.0.0']);assert.deepEqual(Object.keys(records[phase+'DATABASE_R3'].areas),['0.0.0.1']);
 summary(area(phase+'DATABASE_R1','0.0.0.0',['1.1.1.1','2.2.2.2']),'198.51.100.0/24');summary(area(phase+'DATABASE_R3','0.0.0.1',['2.2.2.2','3.3.3.3']),'192.0.2.0/24');
 area(phase+'DATABASE_ABR','0.0.0.0',['1.1.1.1','2.2.2.2']);area(phase+'DATABASE_ABR','0.0.0.1',['2.2.2.2','3.3.3.3']);
 for(const [key,prefix,gateway] of [['R1','198.51.100.0/24','203.0.113.2'],['R3','192.0.2.0/24','203.0.113.5']]){const r=records[phase+'OSPF_ROUTES_'+key][prefix];assert.equal(r.routeType,'N IA');assert.equal(r.cost,30);installed(phase+'RIB_'+key,prefix,gateway,30);assert(records[phase+'KERNEL_'+key].some(r=>r.dst===prefix&&r.gateway===gateway&&r.protocol==='ospf'));}
 for(const [prefix,gateway] of [['192.0.2.0/24','203.0.113.1'],['198.51.100.0/24','203.0.113.6']]){assert.equal(records[phase+'OSPF_ROUTES_ABR'][prefix].routeType,'N');assert.equal(records[phase+'OSPF_ROUTES_ABR'][prefix].cost,20);installed(phase+'RIB_ABR',prefix,gateway,20);}
 assert.equal(records[phase+'INTERFACES_ABR'].interfaces.backbone.area,'0.0.0.0');assert.equal(records[phase+'INTERFACES_ABR'].interfaces.branch.area,'0.0.0.1');assert.equal(records[phase+'INTERFACES_R3'].interfaces.branch.area,'0.0.0.1');
 for(const [key,name] of [['R1','lan'],['R1','backbone'],['ABR','backbone'],['ABR','branch'],['R3','branch'],['R3','lan']])assert.equal(records[phase+'INTERFACES_'+key].interfaces[name].cost,10);
 for(const [key,id] of [['R1','0.0.0.0'],['R3','0.0.0.1']]){const lan=records[phase+'INTERFACES_'+key].interfaces.lan;assert.equal(lan.area,id);assert.equal(lan.ospfEnabled,true);assert.equal(lan.timerPassiveIface,true);assert.equal(lan.nbrCount,0);assert.equal(lan.nbrAdjacentCount,0);}
 for(const [key,name] of [['R1','backbone'],['ABR','backbone'],['ABR','branch'],['R3','branch']]){const transit=records[phase+'INTERFACES_'+key].interfaces[name];assert.equal(transit.networkType,'POINTOPOINT');assert.equal(transit.timerMsecs,1000);assert.equal(transit.timerDeadSecs,4);assert.equal(transit.nbrAdjacentCount,1);}
}
full('FAULT_NEIGHBORS_R1',['2.2.2.2']);full('FAULT_NEIGHBORS_ABR',['1.1.1.1']);assert.deepEqual(records.FAULT_NEIGHBORS_R3.neighbors,{});assert.equal(records.FAULT_INTERFACES_ABR.interfaces.branch.area,'0.0.0.1');assert.equal(records.FAULT_INTERFACES_R3.interfaces.branch.area,'0.0.0.2');assert(records.FAULT_BRANCH_LINK[0].flags.includes('UP'));assert(records.FAULT_BRANCH_LINK[0].flags.includes('LOWER_UP'));
for(const [key,prefix] of [['R1','198.51.100.0/24'],['R3','192.0.2.0/24']]){assert(!records['FAULT_OSPF_ROUTES_'+key][prefix]);assert(!records['FAULT_KERNEL_'+key].some(r=>r.dst===prefix));}
assert.deepEqual(snapshot(),before,'Normal cleanup preserves host routes/links/forwarding, mounts/groups, pre-existing daemons/namespaces and temporary runtime directories');
for(const [anchor,status] of [['connect "$client" eth0 192.0.2.10 "$r1" lan 192.0.2.1 24',23],['start_router "$r2" 2.2.2.2',24],['start_router "$r3" 3.3.3.3',25]]){assert.equal(source.split(anchor).length,2);const failed=run(source.replace(anchor,'exit '+status),['--run']);assert.equal(failed.status,status,failed.stderr);assert.deepEqual(snapshot(),before,'Failure after namespaces/first router/ABR must clean only owned resources');}
// A stopped owned daemon cannot handle TERM; cleanup must escalate and restore isolation.
const stoppedSource=source.replace('start_router "$r3" 3.3.3.3',`
for ((i=0;i<50;i++)); do [[ -s "$work/$r2/ospfd.pid" ]] && break; sleep .1; done
[[ -s "$work/$r2/ospfd.pid" ]]
kill -STOP "$(cat "$work/$r2/ospfd.pid")"
exit 26`);
const stopped=run(stoppedSource,['--run']);assert.equal(stopped.status,26,stopped.error?.message||stopped.stderr);assert.deepEqual(snapshot(),before,'Stopped owned daemon cleanup must preserve independent host and existing resources');
const versions=run('ip -Version\nuname -r\nsha256sum "$FRR_ROOT"/../packages/*.deb\n');assert.equal(versions.status,0);
const checks=['Default help and shell syntax are inert and valid','Actual Full backbone and branch adjacencies with domain-unique router IDs','ABR explicitly uses Standard RFC2328 mode and retains two area databases','Internal routers have only their own area topology; foreign router LSAs do not cross the boundary','ABR-originated type-3 reachability summaries preserve opposite LAN /24 prefixes without aggregation','Actual endpoint calculated routes are inter-area cost 30; ABR routes are intra-area cost 20','Selected installed FRR remote routes and independent Linux OSPF kernel next hops agree','Explicit interface cost ten, area scope and passive endpoint LAN configuration retained','Actual bidirectional ICMP crosses both areas at baseline and after recovery','R3-only area mismatch loses branch adjacency while backbone Full, carrier and local probes remain','Missing opposite LAN calculations/kernel routes correlate with failed remote exchange; exact area reversal recovers','Normal, three partial-start failures and a stopped-daemon escalation preserve independent host/group/mount/process/runtime/namespace snapshots'];
fs.writeFileSync(path.join(root,'docs/ospf-areas-lab-results.json'),JSON.stringify({date:'2026-10-09',result:'PASS',checks,environment:versions.stdout.trim().split(/\r?\n/),records,output:lines,scope:'Actual FRR 8.4.4 extracted Ubuntu runtime, three isolated routers and two host namespaces on shared WSL kernel. Standard ABR mode explicitly configured. No Cisco execution, redistribution, external/default/stub/NSSA/virtual-link/aggregation behavior, application transaction, hardware forwarding, packet capture or convergence benchmark. Linux kernel route metric is not asserted to equal OSPF path cost.'},null,2)+'\n');console.log('PASS '+checks.length+' actual multi-area OSPF and isolation checks');
