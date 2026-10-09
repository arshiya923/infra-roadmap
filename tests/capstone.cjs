const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path');
const model=require('../scripts/capstone.js');
const base={nodes:3,failed:1,capacity:100,reserve:20,demand:140,detect:5,decide:10,restore:25,verify:15,rto:60,age:10,rpo:15};
let checks=0;
assert.deepEqual(model.evaluate(base),{usable:160,duration:55,capacityFits:true,rtoFits:true,rpoFits:true});checks++;
for(let n=1;n<=8;n++)for(let f=0;f<=n;f++)for(const reserve of [0,20,100])for(const demand of [0,80,140,160,500]){
 const v={...base,nodes:n,failed:f,reserve,demand};let expected=0;for(let i=f;i<n;i++)expected+=100-reserve;
 const r=model.evaluate(v);assert.equal(r.usable,expected);assert.equal(r.capacityFits,expected>=demand);checks++;
}
for(const restore of [0,25,30,40,100])for(const age of [0,10,15,16,100]){
 const r=model.evaluate({...base,restore,age});assert.equal(r.duration,30+restore);assert.equal(r.rtoFits,restore<=30);assert.equal(r.rpoFits,age<=15);checks++;
}
for(const key of Object.keys(base))for(const bad of [NaN,Infinity,-1,1000001,'1',undefined]){assert.throws(()=>model.evaluate({...base,[key]:bad}));checks++;}
for(const v of [{nodes:0},{nodes:2.5},{failed:0.5},{failed:4},{reserve:101}]){assert.throws(()=>model.evaluate({...base,...v}));checks++;}
const records=[];
for(const stage of [null,'baseline','backup','fault','restored']){
 const args=['labs/capstone-recovery.py','--run',...(stage?['--interrupt',stage]:[])];const out=cp.spawnSync('python',args,{encoding:'utf8'});assert.equal(out.status,stage?1:0,out.stderr);
 const r=JSON.parse(out.stdout);assert.equal(r.result,stage?'INTERRUPTED':'PASS');assert.equal(r.cleanupVerified,true);assert.equal(fs.existsSync(r.ownedDirectory),false);
 if(!stage){assert.deepEqual(r.baselineRows,[[1,'switch',2],[2,'optic',8]]);assert.deepEqual(r.faultRows,[]);assert.deepEqual(r.restoredRows,r.baselineRows);assert.deepEqual(r.lostAcknowledgedIds,[3]);assert.equal(r.integrity,'ok');assert.equal(r.baselineDigest,r.backupDigest);assert.equal(r.restoredDigest,r.backupDigest);}
 else assert.equal(r.events.at(-1),stage);
 records.push(r);
}
const workbook=fs.readFileSync('labs/capstone-workbook.md','utf8');assert.equal((workbook.match(/^## \d+\./gm)||[]).length,15);
const report={result:'PASS',modelChecks:checks,actualLocalRuns:records.length,workbookDeliverables:15,records};fs.writeFileSync('docs/capstone-results.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({result:'PASS',modelChecks:checks,actualLocalRuns:records.length,workbookDeliverables:15}));
