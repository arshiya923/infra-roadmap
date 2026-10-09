'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),m=require('../scripts/ebgp-policy-models.js');
// Independently enumerate the first failed prerequisite by its scenario truth table.
const expected={baseline:[true,true,true,true,true],origin:[false,false,false,false,false],export:[false,false,false,false,false],session:[false,false,false,false,false],import:[true,false,false,false,false],loop:[true,false,false,false,false],resolution:[true,true,false,false,false],selection:[true,true,true,false,false],forward:[true,true,true,true,false],return:[true,true,true,true,false]};
for(const c of m.catalog()){const r=m.evaluate(m.preset(c.id));assert.deepEqual([r.received,r.admitted,r.eligible,r.installed,r.exchangePermittedByDeclarations],expected[c.id],c.id);}
// Independent mask oracle: requirements encoded as bits, with local-AS inclusion inverted.
let n=0;for(let mask=0;mask<512;mask++){const input=Object.fromEntries(m.fields.map((k,i)=>[k,Boolean(mask&(1<<i))])),r=m.evaluate(input);const all=(mask&15)===15&&(mask&16)===0;
assert.equal(r.received,(mask&7)===7);assert.equal(r.admitted,all);assert.equal(r.eligible,all&&(mask&32)!==0);assert.equal(r.installed,all&&(mask&96)===96);assert.equal(r.exchangePermittedByDeclarations,mask===495);
const blocked=r.trace.findIndex(x=>x.status==='Blocked');if(blocked>=0)assert(r.trace.slice(blocked+1).every(x=>x.status==='Not evaluated'));n++;}
for(const k of m.fields){const b=m.preset('baseline');b[k]='true';assert.throws(()=>m.evaluate(b));}assert.throws(()=>m.evaluate({...m.preset('baseline'),unexpected:true}));assert.throws(()=>m.preset('unknown'));const b=m.preset('baseline');b.origin=false;assert.equal(m.preset('baseline').origin,true);
const result={date:'2026-10-09',result:'PASS',cases:10,combinations:n,scope:'Declared single ordinary eBGP candidate only. No actual protocol/installation/service/convergence execution.'};fs.writeFileSync(path.resolve(__dirname,'../docs/ebgp-policy-model-results.json'),JSON.stringify(result,null,2)+'\n');console.log('PASS ten independent scenarios and 512 prerequisite masks');
