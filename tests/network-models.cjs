const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {linkBudget,packetJourney}=require('../scripts/network-models.js');
const base={version:4,payload:1472,mtu:1500,overhead:0,rate:100,rtt:40,propagation:10,queue:0};
const check=(a,b)=>assert(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const a=linkBudget(base);assert.equal(a.inner,1500);assert.equal(a.outer,1500);assert.equal(a.fits,true);assert.equal(a.maxPayload,1472);check(a.serialization,0.12);check(a.subtotal,10.12);assert.equal(a.bdpBytes,500000);
assert.equal(linkBudget({...base,payload:1473}).fits,false);
const tunnel=linkBudget({...base,overhead:60,payload:1412});assert.equal(tunnel.fits,true);assert.equal(tunnel.outer,1500);assert.equal(tunnel.maxPayload,1412);
const v6=linkBudget({...base,version:6,overhead:60,payload:1392});assert.equal(v6.fits,true);assert.equal(v6.maxPayload,1392);assert.equal(v6.inner,1440);
assert.equal(linkBudget({...base,version:6,mtu:1280,overhead:60}).ipv6BelowMinimum,true);
// Independently specified boundary values. Exercise both sides of every boundary.
let boundaryCases=0;
for(const [version,mtu,overhead,boundary] of [[4,1500,0,1472],[6,1500,0,1452],[4,1500,60,1412],[6,1500,60,1392],[4,9000,0,8972],[6,9000,0,8952],[4,1280,512,740],[6,1280,512,720]]){
 for(let delta=-5;delta<=5;delta++){const r=linkBudget({...base,version,mtu,overhead,payload:boundary+delta});assert.equal(r.fits,delta<=0);assert.equal(r.maxPayload,boundary);boundaryCases++;}
}
// Rate and RTT are independent; queue delay never alters MTU fit or flight-size estimate.
let relationCases=0;
for(const rate of [0.1,1,10,100,1000,100000])for(const rtt of [0,0.1,40,2000])for(const queue of [0,0.1,200,2000]){
 const x=linkBudget({...base,rate,rtt,queue}),faster=linkBudget({...base,rate:rate===100000?50000:rate*2,rtt,queue});
 check(x.serialization*rate,12);check(x.subtotal-x.serialization,10+queue);assert.equal(x.fits,true);check(x.bdpBytes,rate*rtt*125);
 if(rate!==100000)check(x.serialization/2,faster.serialization);relationCases++;
}
let invalidCases=0;
for(const key of ['payload','mtu','overhead','rate','rtt','propagation','queue'])for(const value of [NaN,Infinity,-1,'5',undefined]){assert.throws(()=>linkBudget({...base,[key]:value}),RangeError);invalidCases++;}
for(const bad of [{version:5},{payload:1.5},{mtu:1500.5},{overhead:0.5},{rate:0},{payload:64001},{mtu:9001},{overhead:513}]){assert.throws(()=>linkBudget({...base,...bad}),RangeError);invalidCases++;}
const first=packetJourney(0),sw=packetJourney(1),router=packetJourney(2),last=packetJourney(3);
assert.deepEqual(sw,first);assert.deepEqual(last,router);assert.equal(router.ttl,63);assert.equal(first.ttl,64);
for(const k of ['sourceIP','destinationIP','sourcePort','destinationPort'])assert.equal(first[k],router[k]);
for(const k of ['sourceMAC','destinationMAC','checksum'])assert.notEqual(first[k],router[k]);
for(const bad of [-1,4,1.5,NaN,'1'])assert.throws(()=>packetJourney(bad),RangeError);
const result={date:'2026-10-04',result:'PASS',boundaryCases,relationCases,invalidCases,journeySteps:4,notes:'Independent numeric examples, size boundaries, rate/delay independence and invalid input rejection. Model excludes actual network behavior.'};
fs.writeFileSync(path.join(__dirname,'../docs/network-model-results.json'),JSON.stringify(result,null,2));console.log(result);
