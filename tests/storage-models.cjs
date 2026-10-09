const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('scripts/storage-models.js','utf8'),ctx);
const {plan}=ctx.window.StorageModels;
assert.equal(plan([]).free,899);assert.equal(plan([]).required,1100);
assert.match(plan([]).verdict,/short by 201/);
assert.equal(plan(['stale']).available,1299);assert.match(plan(['stale']).verdict,/fits/);
assert.equal(plan(['stale','stale']).reclaimed,400);
for(const id of ['manifest','active','rollback','evidence','unknown']){const r=plan([id,'stale']);assert.equal(r.blocked[0],id);assert.match(r.verdict,/revise/);assert.equal(r.reclaimed,400);}
assert.equal(plan(['stale'],false).required,null);assert.match(plan(['stale'],false).verdict,/unresolved/);
for(const bad of [null,'stale',['other']])assert.throws(()=>plan(bad));assert.throws(()=>plan([],1));
const r=plan(['active']);r.blocked.push('stale');assert.equal(plan(['active']).blocked.length,1);
console.log('PASS storage planner: capacity boundary, protected dependencies, unknown requirements, duplicate selections and isolated results');
