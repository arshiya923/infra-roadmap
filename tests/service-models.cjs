const assert=require('node:assert/strict'),{leaseState,natPacket}=require('../scripts/service-models.js');
const vectors=[[0,'BOUND',3600],[1799,'BOUND',1801],[1800,'RENEWING',1800],[3149,'RENEWING',451],[3150,'REBINDING',450],[3599,'REBINDING',1],[3600,'EXPIRED → INIT',0],[7200,'EXPIRED → INIT',0]];
for(const [age,state,remaining] of vectors){const r=leaseState(3600,age);assert.equal(r.state,state);assert.equal(r.remaining,remaining);assert.equal(r.t1,1800);assert.equal(r.t2,3150);}
for(const [l,a,state] of [[8,3,'BOUND'],[8,4,'RENEWING'],[8,7,'REBINDING'],[8,8,'EXPIRED → INIT'],[9,4,'BOUND'],[9,5,'RENEWING'],[9,8,'REBINDING'],[86400,75600,'REBINDING']])assert.equal(leaseState(l,a).state,state);
for(const [l,a] of [[7,0],[86401,0],[8,-1],[8,172801],[8.5,0],[8,0.5],[NaN,0],[Infinity,0],['3600',0],[3600,'0']])assert.throws(()=>leaseState(l,a),RangeError);
const a=natPacket('out-a'),b=natPacket('out-b');assert.equal(a.before.source,'10.0.0.10:51514');assert.equal(a.after.source,'198.51.100.7:40000');assert.equal(b.before.source,'10.0.0.20:51514');assert.equal(b.after.source,'198.51.100.7:40001');assert.equal(a.after.destination,a.before.destination);assert.equal(b.after.destination,b.before.destination);
for(const [name,inside,outside] of [['a','10.0.0.10:51514','198.51.100.7:40000'],['b','10.0.0.20:51514','198.51.100.7:40001']]){const p=natPacket('return-'+name);assert.equal(p.before.destination,outside);assert.equal(p.after.destination,inside);assert.equal(p.after.source,'203.0.113.80:443');}
const expired=natPacket('expired-a');assert.equal(expired.after,null);assert.deepEqual(expired.mappings.map(x=>x.client),['B']);assert.match(expired.note,/not modelled/);assert.throws(()=>natPacket('unknown'),RangeError);a.mappings[0].inside='mutated';assert.equal(natPacket('out-a').mappings[0].inside,'10.0.0.10:51514');
console.log('PASS 16 lease vectors, 10 invalid lease inputs, five NAT scenarios and independent returned state');

const {vlanTag}=require('../scripts/service-models.js');let tags=0;
for(let p=0;p<8;p++)for(let d=0;d<2;d++)for(const v of [0,1,10,123,2048,4094,4095]){const t=vlanTag(p,d,v);assert.equal(t.tci,p*8192+d*4096+v);assert.equal(Number.parseInt(t.bits.join(''),2),t.tci);assert.equal(Number.parseInt(t.hex,16),t.tci);tags++;}
assert.equal(vlanTag(5,1,123).hex,'0xB07B');assert.match(vlanTag(0,0,0).meaning,/Priority-tagged/);assert.match(vlanTag(7,1,4095).meaning,/Reserved/);
for(const args of [[8,0,1],[0,2,1],[0,0,4096],[-1,0,1],[0,-1,1],[0,0,-1],[1.5,0,1],[0,0,NaN],[0,0,'123']])assert.throws(()=>vlanTag(...args),RangeError);
console.log(`PASS ${tags} independent tag encodings and nine invalid inputs`);
