'use strict';
// Primary independent expectations: fixed mathematical profiles and set unions.
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const q=require('../scripts/qos-service-models.js'),labels=require('../scripts/qos-labels-models.js'),mc=require('../scripts/multicast-models.js'),lab=require('../scripts/advanced-lab-models.js');
let cases=0;const near=(a,b)=>assert(Math.abs(a-b)<=Math.max(1e-10,Math.abs(b)*1e-14),`${a} != ${b}`);
for(const R of [1,7,800,3000,8000,1000000000])for(const B of [1,2,3,1000])for(const size of [1,2,3,999,1000,1001])for(const dt of [0,1,10,1000,1000000000]){
 const packets=[{arrivalMs:0,bytes:size},{arrivalMs:dt,bytes:1}];
 const afterFirst=size<=B?B-size:B;
 const credit=Math.min(B*8000,afterFirst*8000+dt*R);
 const rows=q.evaluate('policing',{rateBps:R,bucketBytes:B,packets,applicationReady:false}).rows;
 assert.equal(rows[0].decision,size<=B?'conform':'drop excess');assert.equal(rows[1].decision,credit>=8000?'conform':'drop excess');near(rows[1].beforeBytes,credit/8000);cases++;
}
const tenths=q.evaluate('policing',{rateBps:800,bucketBytes:1,packets:Array.from({length:11},(_,arrivalMs)=>({arrivalMs,bytes:1})),applicationReady:true}).rows;
assert.equal(tenths[10].decision,'conform');assert.equal(tenths[10].beforeBytes,1);cases++;
for(const R of [1,7,800,3000,8000,1000000000])for(const B of [1,2,3,8])for(const C of [1,3000,1000000000]){
 const packets=Array.from({length:12},()=>({arrivalMs:0,bytes:1}));const rows=q.evaluate('shaping',{rateBps:R,bucketBytes:B,capacityBps:C,packets,applicationReady:true}).rows;
 rows.forEach((row,i)=>{near(row.releaseMs,Math.max(0,i+1-B)*8000/R);near(row.waitMs,row.releaseMs);near(row.serializationMs,8000/C)});cases++;
}
for(let mask=0;mask<256;mask++)for(const C of [3000,8000,80000])for(const policy of ['fifo','strict-priority']){
 const packets=Array.from({length:8},(_,i)=>({arrivalMs:0,bytes:i+1,class:mask&(1<<i)?'H':'L'}));
 const order=policy==='fifo'?[0,1,2,3,4,5,6,7]:[...packets.flatMap((p,i)=>p.class==='H'?[i]:[]),...packets.flatMap((p,i)=>p.class==='L'?[i]:[])];
 const rows=q.evaluate('queuing',{capacityBps:C,policy,packets,applicationReady:false}).rows;let total=0;
 rows.forEach((row,i)=>{assert.equal(row.id,order[i]+1);near(row.startMs,total*8000/C);total+=packets[order[i]].bytes;near(row.finishMs,total*8000/C);near(row.sojournMs,row.finishMs)});cases++;
}
const boundary=q.evaluate('queuing',{capacityBps:80000,policy:'strict-priority',packets:[{arrivalMs:0,bytes:3,class:'L'},{arrivalMs:0,bytes:6,class:'L'},{arrivalMs:0,bytes:1,class:'L'},{arrivalMs:0,bytes:1,class:'L'},{arrivalMs:1,bytes:1,class:'H'}],applicationReady:true});assert.deepEqual(boundary.rows.map(x=>x.id),[1,2,3,5,4]);assert.equal(boundary.rows[3].startMs,1);cases++;
for(let dscp=0;dscp<64;dscp++)for(let ecn=0;ecn<4;ecn++){
 for(const [klass,mark] of [['voice',46],['interactive',18],['default',0]]){
  const s=labels.preset('marking','map-voice');Object.assign(s,{inputDscp:dscp,inputEcn:ecn,className:klass,policy:'class-map'});const v=labels.evaluate('marking',s);
  // Field names asserted below are obtained from public contract, not inferred traffic.
  assert.equal(v.outputDscp,mark);assert.equal(v.outputEcn,ecn);assert.equal(v.after.field,mark*4+ecn);cases++;
 }
}
const sources=['192.0.2.10','192.0.2.20'];
const cards=[];for(const filter of ['INCLUDE','EXCLUDE'])for(let bits=0;bits<4;bits++)cards.push({filter,sources:sources.filter((_,i)=>bits&(1<<i)),recordValid:true,timerLive:true});
for(const mode of ['asm','ssm'])for(const a of cards)for(const b of cards)for(const live of [false,true])for(const querierPresent of [false,true]){
 const hostA={...a,timerLive:live},hostB={...b},s={mode,hostA,hostB,querierPresent,sourceReady:true,applicationReady:true};
 const wanted=sources.filter(x=>[hostA,hostB].some(h=>h.timerLive&&(mode==='asm'||h.filter==='INCLUDE')&&(h.filter==='INCLUDE'?h.sources.includes(x):!h.sources.includes(x))));
 assert.deepEqual(mc.evaluate('igmp',s).accepted,wanted);cases++;
}
for(let mask=0;mask<8192;mask++){
 const s=lab.preset('advanced-lab','baseline');lab.bools.forEach((key,i)=>s[key]=Boolean(mask&(1<<i)));const v=lab.evaluate('advanced-lab',s);
 assert.equal(v.declaredAgreement,mask===8191);assert.equal(v.forwardPrerequisites,(mask&2047)===2047);assert.equal(v.exchangePrerequisites,(mask&4095)===4095);cases++;
}
const files=['content/batch-10.js','scripts/qos-service-models.js','scripts/qos-labels-models.js','scripts/multicast-models.js','scripts/advanced-lab-models.js','labs/advanced-routing-switching-workbook.md','tests/batch-10-service-primary.cjs'];
const sourceSha256=Object.fromEntries(files.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
fs.writeFileSync('docs/batch-10-service-primary-results.json',JSON.stringify({date:'2026-10-09',result:'PASS',independentCases:cases,sourceSha256,scope:'Independent exact refill boundary, two-packet credit, constant-size shaping closed forms, simultaneous nonpreemptive schedules, DS field marking, settled demand unions and nine-stage lab declarations. Numeric output tolerance never determines eligibility. No actual target commands, traffic or convergence.'},null,2)+'\n');
console.log(`PASS ${cases} primary service/multicast/lab cases`);
