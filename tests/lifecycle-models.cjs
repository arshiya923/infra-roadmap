const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('scripts/lifecycle-models.js','utf8'),ctx);const {inspect,scenario}=ctx.window.LifecycleModels;
const names=['manifest','packageA','packageB','image'];let cases=0;
for(const mode of ['install','bundle'])for(const selected of ['manifest','image'])for(let mask=0;mask<16;mask++){
 const present=names.filter((_,i)=>mask&(1<<i)),r=inspect(mode,selected,present);
 assert.equal(r.coherent,(mode==='install')===(selected==='manifest'));
 const expectedMissing=selected==='image'?(!(mask&8)?['image']:[]):names.slice(0,3).filter((_,i)=>!(mask&(1<<i)));
 assert.equal(JSON.stringify(r.missing),JSON.stringify(expectedMissing));
 if(r.coherent&&expectedMissing.length===0)assert.match(r.conclusion,/remain unproven/);
 if(!r.coherent)assert.match(r.conclusion,/differs/);cases++;
}
assert.equal(inspect('bundle','image',['image']).missing.length,0);
assert.equal(inspect('install','manifest',['manifest','image']).missing.length,2);
for(const key of ['local','corrupt','merge','service','tested']){const a=scenario(key);a.observation='changed';assert.notEqual(scenario(key).observation,'changed');}
for(const f of [()=>inspect('other','image',[]),()=>inspect('install','bad',[]),()=>inspect('install','manifest',['unknown']),()=>inspect('install','manifest',null),()=>scenario('constructor')])assert.throws(f);
console.log(`PASS ${cases} independent dependency states, five recovery cases and invalid-state boundaries`);

fs.writeFileSync('docs/lifecycle-models-results.json',JSON.stringify({date:'2026-10-09',result:'PASS',dependencyCases:cases,recoveryCases:5,limits:'Authored dependency/evidence model only; no actual Cisco install, backup or restoration'},null,2)+'\n');
