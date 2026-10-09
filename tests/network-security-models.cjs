const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);for(const p of ['content/network-security-cases.js','scripts/network-security-models.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx);
const m=ctx.window.NetworkSecurity;let checks=0;const eq=(a,b)=>{assert.equal(a,b);checks++},yes=(a)=>{assert(a);checks++},throws=f=>{assert.throws(f);checks++};
// Independent bit-by-bit wildcard reference, including noncontiguous masks.
for(let w=0;w<256;w++)for(let address=0;address<256;address++){const bits=Array.from({length:8},(_,i)=>i);const expected=bits.every(i=>Math.floor(w/2**i)%2===1||Math.floor(address/2**i)%2===Math.floor(2/2**i)%2);eq(m.wildcard('192.0.2.'+address,'192.0.2.2','0.0.0.'+w),expected);}
function base(key,changes={}){return {...m.preset(key,'baseline'),...changes};}function run(key,changes={}){return m.evaluate(key,base(key,changes)).decision;}
for(const source of ['192.0.2.0','192.0.2.255','203.0.113.1'])for(const destination of ['198.51.100.10','198.51.100.11'])for(const protocol of ['tcp','udp','icmp'])for(const port of [0,22,443,65535])for(const denyFirst of [true,false]){
 const v={source,destination,protocol,port,denyFirst},extended=!denyFirst&&source.startsWith('192.0.2.')&&destination==='198.51.100.10'&&protocol==='tcp'&&port===443,standard=!denyFirst&&source.startsWith('192.0.2.');
 eq(run('nsec-acl',v).startsWith('PERMIT'),extended);eq(run('nsec-standard-acl',v).startsWith('PERMIT'),standard);}
for(let mask=0;mask<64;mask++){
 const b=Array.from({length:6},(_,i)=>!!(mask&(1<<i))),[trusted,present,ip,mac,vlan,attachment]=b;
 const x={trusted,present,ip,mac,vlan,attachment};const actual=run('nsec-dai',x);eq(actual.startsWith('BYPASS'),trusted);if(!trusted)eq(actual.startsWith('PERMIT'),present&&ip&&mac&&vlan&&attachment);
 for(const mode of ['ip-only','ip-and-mac'])eq(run('nsec-ipsg',{present,ip,mac,vlan,attachment,mode}).startsWith('PERMIT'),present&&ip&&vlan&&attachment&&(mode==='ip-only'||mac));
}
for(const enabled of [false,true])for(const server of [false,true])for(const trusted of [false,true])eq(run('nsec-snooping',{enabled,server,trusted}).startsWith('REJECT'),enabled&&server&&!trusted);
for(const from of ['isolated','community','promiscuous'])for(const to of ['isolated','community','promiscuous'])for(const mapped of [false,true])for(const toCommunity of [10,11]){const expected=mapped&&(from==='promiscuous'||to==='promiscuous'||(from==='community'&&to==='community'&&toCommunity===10));eq(run('nsec-pvlan',{from,to,mapped,toCommunity}).startsWith('PERMIT'),expected);}
for(const auth of ['accept','reject','unavailable'])for(let mask=0;mask<32;mask++){
 const [fallback,local,role,attached,accounted]=Array.from({length:5},(_,i)=>!!(mask&(1<<i)));eq(run('nsec-aaa',{auth,fallback,local,role,attached,accounted}).startsWith('PERMIT'),(auth==='accept'||auth==='unavailable'&&fallback&&local)&&role&&attached);
}
for(const maximum of [1,2,16])for(let count=0;count<=maximum;count++)for(const accepted of [false,true])for(const mode of ['protect','restrict','shutdown'])eq(run('nsec-port-security',{maximum,count,accepted,mode}).startsWith('VIOLATION'),!accepted&&count>=maximum);
for(const pps of [0,1,100,1000])for(const bytes of [1,64,1500])for(const unit of ['pps','bit/s'])for(const rate of [1,100,80000,100000])eq(run('nsec-copp',{pps,bytes,unit,rate}).startsWith('WITHIN'),(unit==='pps'?pps:pps*bytes*8)<=rate);
eq(run('nsec-acl',{explicitDeny:false,port:22}),'DENY by implicit default');eq(run('nsec-acl',{explicitDeny:false}),'PERMIT at sequence 10');
for(const s of m.catalog){for(const c of s.cases)yes(m.evaluate('nsec-'+s.key,c.values).rows.length>0);throws(()=>m.preset('nsec-'+s.key,'<script>'));for(const [k,,type,choices]of s.fields){const v=base('nsec-'+s.key);v[k]=type==='bool'?'false':type==='number'?NaN:type==='select'?'not-listed':'';throws(()=>m.evaluate('nsec-'+s.key,v));}}
for(const address of ['1.2.3','256.0.0.1','192.0.2.1x','<img>'])throws(()=>m.wildcard(address,'192.0.2.0','0.0.0.255'));
throws(()=>m.evaluate('nsec-copp',base('nsec-copp',{pps:-1})));throws(()=>m.evaluate('nsec-copp',base('nsec-copp',{bytes:0})));throws(()=>m.evaluate('nsec-port-security',base('nsec-port-security',{count:2,maximum:1})));
if(m.catalog.some(s=>s.kind==='vpn'))for(let mask=0;mask<64;mask++){const v=Object.fromEntries(['underlay','identity','child','route','return','authorized'].map((k,i)=>[k,!!(mask&(1<<i))]));eq(run('nsec-ipsec',v).startsWith('All'),mask===63);}
if(m.catalog.some(s=>s.kind==='firewall'))for(const action of ['inspect','pass','drop'])for(const direction of ['initiation','response'])for(let mask=0;mask<8;mask++){const [forward,state,reverse]=Array.from({length:3},(_,i)=>!!(mask&(1<<i)));eq(run('nsec-firewall',{action,direction,forward,state,reverse}).startsWith('PERMIT'),direction==='initiation'?action!=='drop':reverse||(action==='inspect'&&forward&&state));}
if(m.catalog.some(s=>s.kind==='detector'))for(const mode of ['IDS','IPS','WAF'])for(let mask=0;mask<16;mask++){const [visible,match,blocking,application]=Array.from({length:4},(_,i)=>!!(mask&(1<<i)));eq(run('nsec-ids-ips',{mode,visible,match,blocking,application}).startsWith('BLOCK'),visible&&match&&mode!=='IDS'&&blocking);}
if(m.catalog.some(s=>s.kind==='access'))for(let mask=0;mask<32;mask++){const v=Object.fromEntries(['identity','device','resource','fresh','enforced'].map((k,i)=>[k,!!(mask&(1<<i))]));eq(run('nsec-zero-trust',v).startsWith('PERMIT'),mask===31);}
if(m.catalog.some(s=>s.kind==='zones')){
 const zones=['Internet','DMZ','Users','Servers','Management','Guest','Backup'];
 // Independent requirement table, rather than executing the module's rules.
 const requirements=new Set(['Internet/DMZ/tcp/443','Users/Servers/tcp/443','DMZ/Servers/tcp/8443','Management/DMZ/tcp/22','Management/Users/tcp/22','Management/Servers/tcp/22','Management/Backup/tcp/22','Guest/Internet/tcp/443','Servers/Backup/tcp/443']);
 for(const source of zones)for(const destination of zones)for(const protocol of ['tcp','udp'])for(const port of [22,53,443,8443])for(const direction of ['initiation','response'])for(const state of [false,true])for(const userRule of [false,true]){
  const from=direction==='response'?destination:source,to=direction==='response'?source:destination,match=requirements.has([from,to,protocol,port].join('/'))&&(userRule||from!=='Users');eq(run('nsec-security-lab',{source,destination,protocol,port,direction,state,userRule}).startsWith('PERMIT'),match&&(direction==='initiation'||state));
 }
 eq(run('nsec-security-lab',{source:'Servers',destination:'Users',direction:'initiation'}).startsWith('DENY'),true);eq(run('nsec-security-lab',{source:'Servers',destination:'Users',direction:'response',state:true}).startsWith('PERMIT'),true);
}
fs.writeFileSync(path.join(root,'docs/network-security-model-results.json'),JSON.stringify({date:'2026-10-09',result:'PASS',checks,topics:m.catalog.length,scope:'Independent wildcard bits, ordered tuples, binding/mode/role/auth/count/envelope and conditional policy truth tables; not device execution.'},null,2)+'\n');console.log('PASS '+checks+' independent model checks across '+m.catalog.length+' topics');
