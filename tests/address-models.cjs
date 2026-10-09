const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const a=require('../scripts/address-tools.js');
let octetCases=0;
for(let n=0;n<256;n++)for(const base of [2,10,16]){const r=a.octet(n.toString(base),base);assert.equal(r.decimal,n);assert.equal(r.binary.length,8);assert.equal(r.hex.length,2);octetCases++;}
for(const [text,base] of [['256',10],['-1',10],['1.5',10],['01',10],['2',2],['100000000',2],['0xFF',16],['GG',16],['',10]])assert.throws(()=>a.octet(text,base),RangeError);
const vectors=spawnSync('python',['-c',String.raw`import ipaddress,json,random
r=random.Random(404)
values=[0,1,2**31-1,2**31,2**32-1]+[r.randrange(2**32) for _ in range(128)]
v4=[]
for x in values:
 for p in range(33):
  addr=str(ipaddress.IPv4Address(x)); n=ipaddress.ip_network(addr+'/'+str(p),strict=False)
  v4.append([addr,p,str(n.network_address),str(n.broadcast_address),str(n.netmask),n.num_addresses])
texts=['::','::1','2001:0:0:1:0:0:1:1','1:2:3:4:5:6:0:8','2001:db8::','ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff']+[ipaddress.IPv6Address(r.randrange(2**128)).exploded for _ in range(128)]
v6=[[x,ipaddress.IPv6Address(x).compressed,ipaddress.IPv6Address(x).exploded] for x in texts]
print(json.dumps({'v4':v4,'v6':v6}))`],{encoding:'utf8',maxBuffer:4*1024*1024});assert.equal(vectors.status,0,vectors.stderr);const data=JSON.parse(vectors.stdout);
for(const [address,prefix,network,last,mask,count] of data.v4){const r=a.subnet(address,prefix);assert.deepEqual([r.network,r.last,r.mask,r.count],[network,last,mask,count]);assert.equal(a.dotted(a.ipv4(address)),address);assert.equal(r.addressBits.length,32);assert.equal(r.maskBits.split('1').length-1,prefix);if(prefix===31||prefix===32)assert.equal(r.broadcast,null);}
for(const [input,canonical,expanded] of data.v6){const r=a.normalize6(input);assert.equal(r.canonical,canonical);assert.equal(r.expanded,expanded);assert.equal(r.groups.length,8);assert.equal(a.normalize6(r.canonical).expanded,expanded);}
let invalidCases=0;
for(const text of ['1.2.3','1.2.3.256','01.2.3.4','1.2.3.-1','1.2.3.4x','1.2.3.4/24','','1.2.3.4\n']){assert.throws(()=>a.subnet(text,24),RangeError);invalidCases++;}
for(const p of [-1,33,24.5,NaN,Infinity,'24',null]){assert.throws(()=>a.subnet('192.0.2.1',p),RangeError);invalidCases++;}
for(const text of ['2001::db8::1','1:2:3:4:5:6:7','1:2:3:4:5:6:7:8:9','12345::','1:2:3:4:5:6:7:8::',':::','fe80::1%eth0','::ffff:192.0.2.1','2001:db8::1/64','g::','']){assert.throws(()=>a.normalize6(text),RangeError);invalidCases++;}
const plan=a.vlsm('192.0.2.0/24',[120,50,20]);assert.deepEqual(plan.allocations.map(x=>[x.request,x.network,x.prefix,x.candidates]),[[1,'192.0.2.0',25,126],[2,'192.0.2.128',26,62],[3,'192.0.2.192',27,30]]);assert.equal(plan.remaining,32);assert.equal(plan.remainingStart,'192.0.2.224');
assert.deepEqual(a.vlsm('192.0.2.0/24',[20,120,50]).allocations.map(x=>x.request),[2,3,1]);
for(const [parent,demands] of [['192.0.2.0/24',[120,50,20,40]],['192.0.2.1/24',[20]],['192.0.2.0/31',[1]],['192.0.2.0/24',[0]],['192.0.2.0/24',[1.5]],['192.0.2.0/24',[]],['192.0.2.0/24',Array(17).fill(1)]]){assert.throws(()=>a.vlsm(parent,demands),RangeError);invalidCases++;}
let allocationCases=0;
for(let demand=1;demand<=250;demand++){
 const r=a.vlsm('192.0.2.0/24',[demand]);const child=r.allocations[0];assert(child.candidates>=demand);assert(child.size/2-2<demand);assert.equal(child.network,'192.0.2.0');assert.equal(child.count+r.remaining,256);allocationCases++;
}
assert.equal(a.vlsm('0.0.0.0/0',[4294967294]).remaining,0);
const result={date:'2026-10-04',result:'PASS',octetCases,ipv4ReferenceCases:data.v4.length,ipv6ReferenceCases:data.v6.length,allocationCases,invalidCases,reference:'Python ipaddress with deterministic seeded vectors; fixed independent /31-/32 and VLSM expectations.'};
fs.writeFileSync(path.join(__dirname,'../docs/address-model-results.json'),JSON.stringify(result,null,2));console.log(result);
