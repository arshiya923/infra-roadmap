'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const m=require('./model.js'),lesson=JSON.parse(fs.readFileSync(require.resolve('./lesson.json'),'utf8'));
const template=JSON.parse(fs.readFileSync(require.resolve('../local-preference/lesson.json'),'utf8'));
assert.deepEqual(Object.keys(lesson).sort(),Object.keys(template).sort(),'exact existing lesson schema');
assert.equal(lesson.id,'s3-g4-t3');assert.equal(lesson.batch,'09');assert.equal(lesson.interactive,'communities');
assert.equal(lesson.exams.length,10);assert(lesson.exams.every(q=>q.type==='multiple-choice'&&q.options.length===4&&q.options.includes(q.answer)));
assert.equal(lesson.quick.length,3);assert.equal(lesson.commands.length,4);assert(lesson.commands.every(c=>c.code.startsWith("vtysh -c 'show ")&&c.expected.includes('NOT EXECUTED')));assert.equal(lesson.flow.length,4);assert(lesson.flow.every(x=>x.length===2));
assert.deepEqual(lesson.prerequisites,['s3-g3-t0','s3-g3-t1','s3-g3-t2','s3-g3-t3','s3-g4-t0']);
assert.deepEqual(lesson.related,['s3-g4-t1','s3-g4-t2']);
for(const key of Object.keys(template.lab))assert(key in lesson.lab);
// Fixed independent scenario outcomes: preference, local application, export declaration and restriction.
const expected={
 'exact-standard':[200,true,true,[]],'exact-large':[200,true,true,[]],
 'disabled-policy':[100,false,true,[]],'nonmatching-standard':[100,false,true,[]],
 'nonmatching-large':[100,false,true,[]],'wrong-family':[100,false,true,[]],
 duplicates:[200,true,true,[]],'order-permuted':[200,true,true,[]],
 'noexport-ibgp':[200,true,true,[]],'noexport-external':[200,true,false,['NO_EXPORT']],
 'noexport-confed':[200,true,true,[]],noadvertise:[200,true,false,['NO_ADVERTISE']],
 subconfed:[200,true,false,['NO_EXPORT_SUBCONFED']],'subconfed-ibgp':[100,false,true,[]],
 'export-denied':[200,true,false,[]],'session-down':[200,true,false,[]],stripped:[100,false,true,[]],
 'not-admitted':[100,false,false,[]],'numeric-boundaries':[100,false,true,[]]
};
assert.equal(m.catalog().length,19);
for(const c of m.catalog()){const v=m.evaluate(m.preset(c.id));assert.deepEqual([v.localPreference,v.policyApplied,v.exportAllowed,v.restrictions],expected[c.id],c.id);}
// An independent RFC target table, rather than reproducing the model's conditionals.
const targetTable={ibgp:[[],[],['NO_ADVERTISE'],['NO_ADVERTISE'],[],[],['NO_ADVERTISE'],['NO_ADVERTISE']],sameconfedexternal:[[],[],['NO_ADVERTISE'],['NO_ADVERTISE'],['NO_EXPORT_SUBCONFED'],['NO_EXPORT_SUBCONFED'],['NO_ADVERTISE','NO_EXPORT_SUBCONFED'],['NO_ADVERTISE','NO_EXPORT_SUBCONFED']],outsideconfedexternal:[[],['NO_EXPORT'],['NO_ADVERTISE'],['NO_ADVERTISE','NO_EXPORT'],['NO_EXPORT_SUBCONFED'],['NO_EXPORT','NO_EXPORT_SUBCONFED'],['NO_ADVERTISE','NO_EXPORT_SUBCONFED'],['NO_ADVERTISE','NO_EXPORT','NO_EXPORT_SUBCONFED']]};
const tags=['65535:65281','65535:65282','65535:65283'];let independentCases=0;
for(const target of Object.keys(targetTable))for(let restrictionBits=0;restrictionBits<8;restrictionBits++)for(let gates=0;gates<16;gates++)for(const policyKind of ['standard','large'])for(let membership=0;membership<4;membership++){
 const s=m.preset('exact-standard');s.standard=tags.filter((_,i)=>restrictionBits&(1<<i));s.large=[];
 if(membership&1)s.standard.push('65001:200');if(membership&2)s.large.push('4200000001:200:0');
 s.target=target;s.policyKind=policyKind;s.policyEnabled=Boolean(gates&1);s.admitted=Boolean(gates&2);s.exportPermit=Boolean(gates&4);s.sessionReady=Boolean(gates&8);
 const v=m.evaluate(s),restriction=targetTable[target][restrictionBits],matched=Boolean(membership&(policyKind==='standard'?1:2));
 assert.deepEqual(v.restrictions,restriction);assert.equal(v.matched,matched);
 assert.equal(v.localPreference,((gates&3)===3&&matched)?200:100);
 assert.equal(v.exportAllowed,(gates&14)===14&&restriction.length===0);independentCases++;
}
assert.equal(independentCases,3072);
assert.deepEqual(m.evaluate(m.preset('duplicates')).standard,['65001:100','65001:200']);
assert.deepEqual(m.evaluate(m.preset('duplicates')),m.evaluate(m.preset('order-permuted')));
const leading=m.preset('exact-large');leading.large=['04200000001:00200:000','4200000001:200:0'];assert.deepEqual(m.evaluate(leading).large,['4200000001:200:0']);
const bound=m.evaluate(m.preset('numeric-boundaries'));assert.deepEqual(bound.standard,['0:0','65535:65535']);assert.deepEqual(bound.large,['0:0:0','4294967295:4294967295:4294967295']);
const thirtyTwo=m.preset('exact-standard');thirtyTwo.standard=Array(32).fill('65001:200');assert.equal(m.evaluate(thirtyTwo).standard.length,1);assert.throws(()=>m.evaluate({...thirtyTwo,large:['0:0:0']}));
for(const family of ['standard','large'])for(const tag of [null,1,{},false,undefined,'',' ','-1:0','+1:0','1.0:0','1e2:0','0x1:0','1: 0','1:0 ','1:0\n','1:0:0:0','1','1::0',family==='standard'?'65536:0':'4294967296:0:0','0'.repeat(129)+(family==='standard'?':0':':0:0')]){const s=m.preset('exact-standard');s[family]=[tag];assert.throws(()=>m.evaluate(s),`${family} invalid ${String(tag)}`);}
for(const s of [null,[],{}, {...m.preset('exact-standard'),extra:true}, {...m.preset('exact-standard'),standard:'65001:200'}, {...m.preset('exact-standard'),large:new Array(2)}, {...m.preset('exact-standard'),standard:['1:2:3']}, {...m.preset('exact-standard'),large:['1:2']}, {...m.preset('exact-standard'),policyKind:'extended'}, {...m.preset('exact-standard'),target:'internet'}])assert.throws(()=>m.evaluate(s));
for(const f of ['policyEnabled','admitted','exportPermit','sessionReady'])for(const bad of [0,1,'true',null])assert.throws(()=>m.evaluate({...m.preset('exact-standard'),[f]:bad}));
const p=m.preset('exact-standard');p.standard.push('0:0');assert.deepEqual(m.preset('exact-standard').standard,['65001:200']);assert.throws(()=>m.preset('unknown'));
// Standard well-known numbers written in the large family have no invented effect.
assert.equal(m.evaluate({...m.preset('stripped'),large:['65535:65282:0']}).exportAllowed,true);
assert.equal(m.html('other'),'');const html=m.html('communities');for(const id of ['comm-tool','comm-case','comm-output','comm-error','comm-reset'])assert(html.includes(`id="${id}"`));assert.match(html,/role="region" aria-label="[^"]+" tabindex="0"/);assert.match(html,/<button id="comm-reset" type="button">/);
// Minimal DOM harness checks text-only rendering and invalid scenario persistence, not browser layout.
class Element{constructor(){this.value='';this.checked=false;this.hidden=false;this.children=[];this.listeners={};this.textContent='';}append(node){this.children.push(node);}replaceChildren(...nodes){this.children=nodes;}addEventListener(type,fn){(this.listeners[type]||=[]).push(fn);}fire(type){for(const fn of this.listeners[type]||[])fn();}}
const elements=Object.fromEntries([...m.fields,'case','error','output','rows','summary','export','limit','reset'].map(k=>['comm-'+k,new Element()]));
const document={getElementById:id=>elements[id],createElement:()=>new Element()};const context={window:{},document};vm.runInNewContext(fs.readFileSync(require.resolve('./model.js'),'utf8'),context);assert.equal(typeof context.window.CommunitiesModels.evaluate,'function');context.window.CommunitiesModels.mount('communities');assert.equal(elements['comm-output'].hidden,false);assert.match(elements['comm-summary'].textContent,/200/);
elements['comm-case'].value='unknown';elements['comm-case'].fire('change');assert.equal(elements['comm-output'].hidden,true);assert.equal(elements['comm-error'].hidden,false);elements['comm-policyEnabled'].checked=false;elements['comm-policyEnabled'].fire('change');assert.equal(elements['comm-output'].hidden,true,'invalid scenario remains hidden after later control changes');
elements['comm-reset'].fire('click');assert.equal(elements['comm-case'].value,'exact-standard');assert.equal(elements['comm-output'].hidden,false);assert.equal(elements['comm-error'].hidden,true);
elements['comm-standard'].value='<script>alert(1)</script>';elements['comm-standard'].fire('input');assert.equal(elements['comm-output'].hidden,true);elements['comm-reset'].fire('click');
console.log(`PASS: 19 preset oracles; ${independentCases} independent target/gate/family/membership cases; strict range, syntax, coercion, sparse array and 32-entry checks; exact lesson schema; DOM error persistence/reset and text rendering contract.`);
