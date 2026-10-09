// Execute only the explicitly reviewed read-only / bounded-loopback commands.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const lessons=JSON.parse(cp.execFileSync(process.execPath,[path.join(root,'tools/read-content.cjs')],{encoding:'utf8'}))['05'];
const allowed=new Set(['ip -brief link show','ip -4 route get 127.0.0.1','ss -ltn','ss -tan','ss -uan','ip -6 route get ::1','bridge link show','bridge fdb show','bridge vlan show','ip -4 neigh show','ip -4 route show','ip -4 neigh show dev lo','ping -4 -c 2 -W 1 127.0.0.1','ping -6 -c 2 -W 1 ::1']);
const localName=`python3 -c "import socket; print(socket.gethostbyname('localhost'))"`;
const tagCommand='python3 -c "print(hex((5 << 13) | (1 << 12) | 123))"',vlanLab='sudo bash labs/vlan-trunk.sh --run';
allowed.add('ip -d link show');allowed.add(tagCommand);allowed.add(vlanLab);
allowed.add('ip -d link show type bridge');allowed.add('bridge -j fdb show');
allowed.add('ip -4 -brief address show');allowed.add('ss -tn');allowed.add('ss -tin');allowed.add('python3 labs/transport-loopback.py --run');allowed.add(localName);
const routingLab='sudo bash labs/dual-stack-routing.sh --run';
for(const c of ['ip -4 route show table all','ip -4 rule show','ip -4 route show default','ip -6 route show default','ip -4 route show proto static','ip -6 address show','ip -6 neigh show','ip -6 route show table all',routingLab])allowed.add(c);
const commands=[...new Set(lessons.flatMap(l=>l.commands.map(c=>c.code)))],results=[];
for(const command of commands){
 assert(allowed.has(command),'Command needs explicit review before execution: '+command);
 const args=command===localName?['python3','-c',"import socket; print(socket.gethostbyname('localhost'))"]:command===tagCommand?['python3','-c','print(hex((5 << 13) | (1 << 12) | 123))']:command===routingLab?['bash','labs/dual-stack-routing.sh','--run']:command===vlanLab?['bash','labs/vlan-trunk.sh','--run']:command.split(' ');
 const p=cp.spawnSync('wsl',['-d','Ubuntu-24.04',...([vlanLab,routingLab].includes(command)?['-u','root']:[]),'--',...args],{encoding:'utf8',timeout:20000,windowsHide:true,cwd:root});
 assert.ifError(p.error);assert.equal(p.status,0,command+' failed: '+p.stderr);
 const out=p.stdout.trim();
 if(command.startsWith('ping '))assert.match(out,/2 packets transmitted, 2 received/);
 if(command==='ip -4 route get 127.0.0.1')assert.match(out,/local 127\.0\.0\.1 dev lo/);
 if(command==='ip -6 route get ::1')assert.match(out,/local ::1.*dev lo/);
 if(command.startsWith('ss '))assert.match(out,/State/);
 if(command==='ip -4 neigh show dev lo')assert.equal(out,'');
 if(command===localName)assert.equal(out,'127.0.0.1');
 if(command===tagCommand)assert.equal(out,'0xb07b');
 if(command==='bridge -j fdb show')assert(Array.isArray(JSON.parse(out)));
 if(command===routingLab){assert.match(out,/PASS baseline:/);assert.match(out,/PASS injected fault:/);assert.match(out,/PASS recovery:/);assert.match(out,/PASS cleanup:/);}
 if(command===vlanLab){assert.match(out,/PASS isolation:/);assert.match(out,/PASS injected fault:/);assert.match(out,/PASS recovery:/);assert.match(out,/PASS cleanup:/);}
 if(command==='python3 labs/transport-loopback.py --run'){const r=JSON.parse(out);assert.equal(r.result,'PASS');assert.equal(r.tcp.bytes,'HELLOWORLD');assert.deepEqual(r.udp.datagram_lengths,[5,5]);}
 results.push({command,result:'PASS',exitCode:p.status,nonemptyOutput:!!out,scope:[vlanLab,routingLab].includes(command)?'Owned isolated namespaces with automatic cleanup; no host uplink':'Local read-only/offline inspection or bounded loopback; no external-path claim'});
 console.log('PASS '+command);
}
fs.writeFileSync(path.join(root,'docs/commands-results-batch-05.json'),JSON.stringify({date:'2026-10-04',scope:'Eighteen lessons; read-only/offline, bounded loopback and isolated VLAN and dual-stack routing labs. sudo lab executed through WSL root. No raw host inventories saved.',results},null,2)+'\n');
