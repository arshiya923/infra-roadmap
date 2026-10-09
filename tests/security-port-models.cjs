const assert=require('node:assert/strict'),m=require('../scripts/security-port-models.js');
const A='02:00:00:00:00:0a',B='02:00:00:00:00:0b';let cases=0;
// Independent expected trajectories: capacity changes which distinct source first violates.
for(const profile of ['dynamic','sticky','static-seeded'])for(const limit of [1,2,3])for(const mode of ['protect','restrict','shutdown']){
 let s=m.initial(profile);const types=profile==='sticky'?'sticky':'dynamic';
 for(const [i,source] of ['A','B','C'].entries()){
  const before=structuredClone(s),r=m.receive(s,source,limit,mode,profile);assert.deepEqual(s,before);s=r.state;
  assert.equal(s.secure.length,Math.min(i+1,limit));assert.equal(s.disabled,mode==='shutdown'&&i>=limit);
  const expectedCount=mode==='protect'?0:mode==='shutdown'?(i>=limit?1:0):Math.max(0,i+1-limit);assert.equal(s.violations,expectedCount);
  if(i<limit)assert.equal(s.secure[i].type,profile==='static-seeded'&&i===0?'static':types);
  if(i===limit)assert.match(r.decision,/Unlisted source at capacity: dropped/);
  cases++;
 }
 const r=m.receive(s,'A',limit,mode,profile);assert.deepEqual(r.state,s);assert.match(r.decision,s.disabled?/no frame processed/:/condition satisfied/);cases++;
}
assert.equal(cases,108);
for(const mode of ['protect','restrict','shutdown']){let s=m.receive(m.initial(),'A',1,mode,'dynamic').state;const r=m.receive(s,'B',1,mode,'dynamic');assert.match(r.notification,mode==='protect'?/no selected/:mode==='restrict'?/intent; delivery/:/source table and command prose differ/);}
// Address persistence is separate from runtime latches and from a whole-device restart.
let d=m.receive(m.initial(),'A',2,'restrict','dynamic').state;assert.deepEqual(m.save(d).startup,[]);assert.deepEqual(m.savedCheckpoint(d).secure,[]);
let s=m.receive(m.initial('sticky'),'A',1,'shutdown','sticky').state;assert.deepEqual(s.secure,[{mac:A,type:'sticky'}]);assert.deepEqual(m.savedCheckpoint(s).secure,[]);
s=m.save(s);assert.deepEqual(s.startup,[{mac:A,type:'sticky'}]);s=m.receive(s,'B',1,'shutdown','sticky').state;assert.equal(s.disabled,true);assert.equal(s.violations,1);
const removed=m.remove(s,'A');assert.deepEqual(removed.secure,[]);assert.deepEqual(removed.startup,[{mac:A,type:'sticky'}]);assert.equal(removed.disabled,true);
const restored=m.savedCheckpoint(removed);assert.deepEqual(restored.secure,[{mac:A,type:'sticky'}]);assert.equal(restored.disabled,true);assert.equal(restored.violations,1);
assert.deepEqual(m.savedCheckpoint(m.save(removed)).secure,[]);
let seed=m.receive(m.initial('static-seeded'),'B',2,'restrict','static-seeded').state;assert.deepEqual(seed.secure,[{mac:A,type:'static'},{mac:B,type:'dynamic'}]);assert.deepEqual(m.savedCheckpoint(m.save(seed)).secure,[{mac:A,type:'static'}]);
for(const fn of [m.save,m.savedCheckpoint]){const prior=structuredClone(s),out=fn(s);out.secure[0].type='static';out.startup[0].type='static';assert.deepEqual(s,prior);}
const init=m.initial('static-seeded');init.secure[0].type='sticky';assert.equal(init.startup[0].type,'static');assert.equal(m.initial('static-seeded').secure[0].type,'static');
const prior=m.initial('static-seeded'),copied=m.receive(prior,'A',1,'restrict','static-seeded').state;copied.secure[0].type='sticky';copied.startup[0].type='sticky';assert.equal(prior.secure[0].type,'static');assert.equal(prior.startup[0].type,'static');
for(const source of ['toString','__proto__','D',new String('A'),null,1]){assert.throws(()=>m.receive(m.initial(),source,1,'restrict','dynamic'),RangeError);assert.throws(()=>m.remove(m.initial(),source),RangeError);}
for(const limit of [0,4,1.5,'1',NaN])assert.throws(()=>m.receive(m.initial(),'A',limit,'restrict','dynamic'),RangeError);
assert.throws(()=>m.receive(seed,'A',1,'restrict','static-seeded'),RangeError);
for(const profile of ['other',null,{}]){assert.throws(()=>m.initial(profile),RangeError);assert.throws(()=>m.receive(m.initial(),'A',1,'restrict',profile),RangeError);}
for(const mode of ['shutdown vlan','toString',null])assert.throws(()=>m.receive(m.initial(),'A',1,mode,'dynamic'),RangeError);
for(const bad of [null,{...m.initial(),disabled:1},{...m.initial(),violations:-1},{...m.initial(),violations:1.1},{...m.initial(),secure:new Array(1)},{...m.initial(),secure:[{mac:A,type:'other'}]},{...m.initial(),secure:[{mac:A,type:'static'},{mac:A,type:'sticky'}]},{...m.initial(),startup:[{mac:A,type:'dynamic'}]}])for(const fn of [m.save,m.savedCheckpoint])assert.throws(()=>fn(bad),RangeError);
assert.throws(()=>m.receive({...d,violations:Number.MAX_SAFE_INTEGER},'B',1,'restrict','dynamic'),RangeError);assert.equal(m.html('other'),'');
console.log('PASS 108 independent capacity/source trajectories, violation observability, saved/current persistence, retained latch/counter, invalid inputs and copy isolation');
