const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),c={window:{}};vm.createContext(c);
for(const f of ['content/network-services-cases.js','scripts/network-services-models.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c);
const m=c.window.NetworkServices;let checks=0;
assert.equal(m.catalog.length,30);
// Exhaust all eight independently specified truth combinations for every topic.
for(const s of m.catalog)for(let mask=0;mask<8;mask++){const v=[Boolean(mask&1),Boolean(mask&2),Boolean(mask&4)],r=m.evaluate(s.key,v);assert.equal(r.agrees,mask===7);assert.equal(r.rows.filter(x=>x.supplied).length,v.filter(Boolean).length);for(let i=0;i<3;i++)assert.equal(r.rows[i].meaning,v[i]?s.gates[i][1]:s.gates[i][2]);checks++;}
for(const s of m.catalog){assert(m.evaluate(s.key,m.preset(s.key,'restored')).agrees);for(const id of ['boundary-1','boundary-2','boundary-3'])assert(!m.evaluate(s.key,m.preset(s.key,id)).agrees);assert.throws(()=>m.preset(s.key,'unknown'));for(const v of [[],[true],[1,true,true],[true,true,'false'],null])assert.throws(()=>m.evaluate(s.key,v));checks+=10;}
// Four-timestamp examples are independently hand-derived, including nonzero epoch and offset.
for(const [v,offset,delay] of [[[0,12,14,10],8,8],[[100,105,106,111],0,10],[[0,1,2,5],-1,4],[[1000,1000,1000,1000],0,0]]){const r=m.ntp(v);assert.equal(r.offset,offset);assert.equal(r.delay,delay);checks++;}
for(const v of [[0,0,11,10],[1,2,1,3],[3,4,5,2],[0,1,2,Infinity],[]])assert.throws(()=>m.ntp(v));
for(let f=0;f<24;f++)for(let s=0;s<8;s++){const pri=m.priority(f,s);assert.equal(Math.floor(pri/8),f);assert.equal(pri%8,s);checks++;}
for(const v of [[24,0],[-1,0],[0,8],[1.5,2],[0,NaN]])assert.throws(()=>m.priority(...v));
assert.equal(m.counter(1000,7000,60,true),800);assert.equal(m.counter(0,0,1,true),0);assert.throws(()=>m.counter(10,9,1,true));assert.throws(()=>m.counter(0,1,0,true));assert.throws(()=>m.counter(0,1,1,false));
const l=m.lease(8);assert.equal(l.t1,4);assert.equal(l.t2,7);assert.equal(l.expiry,8);assert.throws(()=>m.lease(0));
for(const [p,o,e,d,want] of [[true,false,9,10,true],[true,false,10,10,false],[false,true,9,10,false],[false,true,10,10,true],[true,true,0,10,true]]){assert.equal(m.track(p,o,e,d),want);checks++;}
assert.throws(()=>m.track(true,false,-1,10));assert.throws(()=>m.evaluate('unknown',[true,true,true]));
const result={date:'2026-10-09',result:'PASS',topics:30,checks,scope:'All supplied declaration combinations; independently derived arithmetic/transition examples and invalid boundaries. Not executed service protocols.'};
fs.writeFileSync(path.join(root,'docs/network-services-model-results.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
