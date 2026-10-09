const assert=require('node:assert/strict'),{step,html}=require('../scripts/guard-models.js');
const triggers={none:[false,false],global:[false,true],interface:[true,true]};let count=0;
for(const scope of Object.keys(triggers))for(const edge of [false,true])for(const disabled of [false,true])for(const event of ['bpdu','restore'])for(const corrected of [false,true]){
 const r=step(disabled,scope,edge,event,corrected),trigger=triggers[scope][Number(edge)];
 assert.equal(r.applies,trigger);
 const expected=event==='bpdu'?(disabled||trigger):(disabled&&!corrected);
 assert.equal(r.disabled,expected);assert.equal(r.restored,event==='restore'&&disabled&&corrected);assert.equal(r.pending,event==='restore'&&disabled&&!corrected);count++;
}
assert.equal(count,48);
let r=step(false,'interface',false,'bpdu');assert.equal(r.disabled,true);
r=step(r.disabled,'none',false,'bpdu');assert.equal(r.disabled,true);
r=step(r.disabled,'none',false,'restore');assert.equal(r.pending,true);assert.match(r.note,/not an IOS command rejection/);
r=step(r.disabled,'interface',false,'restore',true);assert.equal(r.disabled,false);assert.match(r.note,/service remain untested/);
r=step(r.disabled,'interface',false,'bpdu');assert.equal(r.disabled,true);
for(const args of [[0,'none',false,'bpdu'],[false,'bad',false,'bpdu'],[false,'none',1,'bpdu'],[false,'none',false,'bad'],[false,'none',false,'restore',null]])assert.throws(()=>step(...args),RangeError);
r.note='changed';assert.notEqual(step(false,'interface',false,'bpdu').note,'changed');assert.equal(html('other'),'');
console.log('PASS 48 scope/event/recovery combinations, incident history, workflow disclosure and invalid inputs');
