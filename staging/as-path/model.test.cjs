'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const m=require('./model.js'),lesson=require('./lesson.json');
test('independent preset outcome table',()=>{
 const expected={ 'short-a':['shorter-sequence','A',2,3,true,true],'short-b':['shorter-sequence','B',3,2,true,true],equal:['later-stages-unresolved',null,2,2,false,false],'loop-a':['only-eligible','B',1,3,true,true],'loop-both':['none',null,2,2,false,false],'ineligible-a':['only-eligible','B',2,3,true,true],'policy-a':['only-eligible','B',2,3,true,true],none:['none',null,2,3,false,false],prepend:['shorter-sequence','B',4,3,true,true],'lp-boundary':['earlier-policy-boundary',null,2,3,false,false],'four-byte':['shorter-sequence','A',2,3,true,true],'system-displaced':['shorter-sequence','A',2,3,false,false],'return-missing':['shorter-sequence','A',2,3,true,false]};
 assert.equal(m.catalog().length,Object.keys(expected).length);
 for(const [id,e]of Object.entries(expected)){const v=m.evaluate(m.preset(id));assert.deepEqual([v.stage,v.choice,v.a.length,v.b.length,v.systemSelected,v.exchangePrerequisites],e,id);}
});
test('all 64 independent loop, policy and resolution combinations',()=>{
 for(let mask=0;mask<64;mask++){const s=m.preset('short-a'),aLoop=!!(mask&1),bLoop=!!(mask&2);s.aPath=aLoop?'65001 65003':'65002 65003';s.bPath=bLoop?'65004 65001 65003':'65004 65005 65003';s.aAdmitted=!!(mask&4);s.bAdmitted=!!(mask&8);s.aResolved=!!(mask&16);s.bResolved=!!(mask&32);const ae=!aLoop&&s.aAdmitted&&s.aResolved,be=!bLoop&&s.bAdmitted&&s.bResolved,v=m.evaluate(s);assert.equal(v.a.eligible,ae);assert.equal(v.b.eligible,be);assert.equal(v.choice,ae?'A':be?'B':null);}
});
test('length sweep counts occurrences independently',()=>{
 for(let a=1;a<=64;a++)for(let b=1;b<=64;b++){const s=m.preset('short-a');s.aPath=Array(a).fill('65002').join(' ');s.bPath=Array(b).fill('65003').join(' ');const v=m.evaluate(s);assert.equal(v.choice,a===b?null:a<b?'A':'B');assert.equal(v.a.length,a);assert.equal(v.b.length,b);}
});
test('earlier policy never fabricates a length-stage winner',()=>{for(const [a,b]of [['0','1'],['200','100'],['4294967295','0']]){const s=m.preset('short-a');s.aLocalPref=a;s.bLocalPref=b;assert.equal(m.evaluate(s).stage,'earlier-policy-boundary');assert.equal(m.evaluate(s).choice,null);}});
test('strict input rejects unsupported syntax, coercion and reserved ASNs',()=>{
 const invalid=['','0','65535','4294967295','4294967296','-1','1e3','1.10','{65002}','65002,65003','65002\t65003','65002 \t65003','65002\n65003',true,65002,null,[],{},'Infinity'];
 for(const value of invalid){assert.throws(()=>m.evaluate({...m.preset('short-a'),aPath:value}),String(value));assert.throws(()=>m.evaluate({...m.preset('short-a'),ownAs:value}),String(value));}
 assert.throws(()=>m.evaluate({...m.preset('short-a'),aPath:Array(65).fill('65002').join(' ')}));
 for(const value of ['1','23456','65534','65536','4294967294','  4200000001  '])assert.doesNotThrow(()=>m.evaluate({...m.preset('short-a'),aPath:value}));
 assert.equal(m.evaluate({...m.preset('short-a'),ownAs:'065001',aPath:'00065001'}).a.ownLoop,true);
 for(const v of [0,'1e2','-1','4294967296',null])assert.throws(()=>m.evaluate({...m.preset('short-a'),aLocalPref:v}));
 assert.throws(()=>m.evaluate({...m.preset('short-a'),forwardReady:'true'}));assert.throws(()=>m.evaluate({...m.preset('short-a'),extra:true}));const missing=m.preset('short-a');delete missing.ownAs;assert.throws(()=>m.evaluate(missing));assert.throws(()=>m.preset('bogus'));
});
test('system, forwarding and return gates are independent',()=>{for(let mask=0;mask<8;mask++){const s=m.preset('short-a');s.systemSelected=!!(mask&1);s.forwardReady=!!(mask&2);s.returnReady=!!(mask&4);const v=m.evaluate(s);assert.equal(v.choice,'A');assert.equal(v.systemSelected,!!(mask&1));assert.equal(v.forwardDeclared,!!(mask&1)&&!!(mask&2));assert.equal(v.returnDeclared,!!(mask&4));assert.equal(v.exchangePrerequisites,mask===7);}});
test('lesson schema counts and answers',()=>{assert.equal(lesson.exams.length,10);assert.equal(lesson.quick.length,3);assert.equal(lesson.commands.length,4);assert.equal(lesson.flow.length,4);for(const q of lesson.exams){assert.equal(q.type,'multiple-choice');assert.equal(q.options.length,4);assert.equal(q.options.filter(x=>x===q.answer).length,1);}assert.equal(new Set([...lesson.exams,...lesson.quick].map(x=>x.questionId)).size,13);assert.equal(lesson.interactive,'as-path');for(const c of lesson.commands)assert.match(c.platform,/guided not executed/);});
test('browser export and static accessible UI contract',()=>{const context={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/model.js','utf8'),context);assert.equal(typeof context.window.AsPathModels.evaluate,'function');assert.equal(m.html('other'),'');const h=m.html('as-path');for(const id of ['asp-tool','asp-case','asp-output','asp-error','asp-reset'])assert.ok(h.includes('id="'+id+'"'));assert.match(h,/role="region" aria-label="AS Path candidate eligibility and sequence length" tabindex="0"/);assert.match(h,/class="en-tool"/);assert.match(h,/type="button"/);});
test('mount clears stale rows and unknown scenario remains hidden after edits; reset works',()=>{
 class Element{constructor(){this.value='';this.checked=false;this.hidden=false;this.children=[];this.handlers={};this.textContent='';}append(x){this.children.push(x);}replaceChildren(...xs){this.children=xs;}addEventListener(k,f){this.handlers[k]=f;}fire(k){this.handlers[k]();}}
 const els=Object.fromEntries(['case','error','output','rows','stage','system','exchange','limit','reset',...m.fields].map(k=>['asp-'+k,new Element()]));const context={window:{},document:{getElementById:id=>els[id],createElement:()=>new Element()}};vm.runInNewContext(fs.readFileSync(__dirname+'/model.js','utf8'),context);context.window.AsPathModels.mount('as-path');assert.equal(els['asp-output'].hidden,false);assert.equal(els['asp-rows'].children.length,2);
 els['asp-aPath'].value='{65002}';els['asp-aPath'].fire('input');assert.equal(els['asp-output'].hidden,true);assert.equal(els['asp-rows'].children.length,0);
 els['asp-case'].value='bogus';els['asp-case'].fire('change');els['asp-aPath'].value='65002';els['asp-aPath'].fire('input');assert.equal(els['asp-output'].hidden,true);els['asp-returnReady'].checked=false;els['asp-returnReady'].fire('change');assert.equal(els['asp-output'].hidden,true);
 els['asp-reset'].fire('click');assert.equal(els['asp-case'].value,'short-a');assert.equal(els['asp-output'].hidden,false);assert.equal(els['asp-returnReady'].checked,true);assert.equal(els['asp-rows'].children.length,2);
});
