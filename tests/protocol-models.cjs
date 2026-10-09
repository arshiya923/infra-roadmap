const assert=require('node:assert/strict'),{dnsCache,describe}=require('../scripts/protocol-models.js');
let cases=0;
for(const kind of ['positive','negative'])for(const ttl of [0,1,60,300,86400])for(const age of new Set([0,Math.max(0,ttl-1),ttl,ttl+1,604800])){
 const r=dnsCache(kind,ttl,age);assert.equal(r.hit,age<ttl);assert.equal(r.remaining,Math.max(0,ttl-age));assert.equal(r.steps.length,age<ttl?2:6);if(r.hit)assert.match(r.result,kind==='positive'?/192.0.2.20/:/NXDOMAIN/);else assert.match(r.result,/not predicted/);cases++;
}
for(const [ttl,age] of [[60,0],[60,59],[60,60],[0,0]]){assert.equal(dnsCache('empty',ttl,age).hit,false);cases++;}
for(const args of [['bad',60,0],['positive',-1,0],['negative',86401,0],['empty',1.5,0],['empty',NaN,0],['empty',Infinity,0],['empty','60',0],['empty',60,-1],['empty',60,604801],['empty',60,0.5],['empty',60,'0']])assert.throws(()=>dnsCache(...args),RangeError);
assert.equal(describe('osi',0).mapping,'TCP/IP: Application');assert.equal(describe('osi',6).mapping,'TCP/IP: Link');assert.equal(describe('tcpip',0).mapping,'OSI: Application / Presentation / Session');assert.equal(describe('tcpip',3).mapping,'OSI: Data link / Physical');
console.log(`PASS ${cases} DNS cache vectors, 11 invalid inputs and layer mapping boundaries`);
