'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),m=require('./model.js');
// Independent specification matrix; no expected results imported from production definitions.
const expected=new Map([[1,['ORIGIN','Well-known mandatory',0,1]],[2,['AS_PATH','Well-known mandatory',0,1]],[3,['NEXT_HOP','Well-known mandatory',0,1]],[4,['MED','Optional nontransitive',1,0]],[5,['LOCAL_PREF','Well-known discretionary',0,1]],[6,['ATOMIC_AGGREGATE','Well-known discretionary',0,1]],[7,['AGGREGATOR','Optional transitive',1,1]],[8,['COMMUNITIES','Optional transitive',1,1]],[9,['ORIGINATOR_ID','Optional nontransitive',1,0]],[10,['CLUSTER_LIST','Optional nontransitive',1,0]],[32,['LARGE_COMMUNITIES','Optional transitive',1,1]]]);
assert.equal(m.attributes().length,12);assert.equal(m.catalog().length,17);
let cases=0;
for(const type of [...expected.keys(),'unknown'])for(let flags=0;flags<256;flags++){
 const input=Object.freeze({type,flags}),v=m.evaluate(input),bits=flags.toString(2).padStart(8,'0');
 assert.equal(v.binary,bits);assert.equal(v.optional,bits[0]==='1');assert.equal(v.transitive,bits[1]==='1');assert.equal(v.partial,bits[2]==='1');assert.equal(v.extendedLength,bits[3]==='1');assert.equal(v.reserved,flags%16);assert.equal(v.lengthOctets,bits[3]==='1'?2:1);assert.equal(v.hex,'0x'+flags.toString(16).toUpperCase().padStart(2,'0'));
 assert.equal(v.flagsClass,bits[0]==='0'?'Well-known (mandatory/discretionary not encoded)':bits[1]==='1'?'Optional transitive':'Optional nontransitive');
 if(type!=='unknown'){const x=expected.get(type);assert.equal(v.name,x[0]);assert.equal(v.declaredClass,x[1]);assert.equal(v.typeMatch,Number(bits[0])===x[2]&&Number(bits[1])===x[3]);}else assert.equal(v.typeMatch,null);
 const baseProblem=bits[0]==='0'&&bits[1]==='0',partialProblem=bits[2]==='1'&&(bits[0]==='0'||bits[1]==='0');assert.equal(v.issues.length,Number(baseProblem)+Number(partialProblem)+Number(v.typeMatch===false));
 cases++;
}
const scenarioExpected={origin:[1,64], 'as-path':[2,64], 'next-hop':[3,64], med:[4,128], 'local-pref':[5,64], atomic:[6,64], aggregator:[7,192], community:[8,192], large:[32,208],originator:[9,128],cluster:[10,128],'unknown-transitive':['unknown',192],'unknown-partial':['unknown',224],'unknown-nontransitive':['unknown',128],'known-mismatch':[4,192],'partial-mismatch':[1,96],reserved:[8,193]};
for(const c of m.catalog()){const s=m.preset(c.id);assert.deepEqual([s.type,s.flags],scenarioExpected[c.id]);m.evaluate(s);s.flags=-1;assert.equal(m.preset(c.id).flags,scenarioExpected[c.id][1]);}
for(const flags of [undefined,null,true,false,'64','0x40','',NaN,Infinity,-Infinity,-1,256,64.1,{},[],new Number(64)])assert.throws(()=>m.evaluate({type:1,flags}));
for(const type of [undefined,null,true,false,'1','med','weight',0,11,255,1.5,{},[],new Number(1)])assert.throws(()=>m.evaluate({type,flags:64}));
for(const input of [undefined,null,[],{}, {type:1},{flags:64},{type:1,flags:64,extra:true}])assert.throws(()=>m.evaluate(input));
assert.throws(()=>m.preset('invalid'));assert.throws(()=>m.preset({toString:()=> 'origin'}));assert.equal(m.html('wrong'),'');
assert.equal(m.evaluate({type:1,flags:64}).flagsClass,m.evaluate({type:5,flags:64}).flagsClass);
assert.notEqual(m.evaluate({type:1,flags:64}).declaredClass,m.evaluate({type:5,flags:64}).declaredClass);
assert.match(m.evaluate({type:'unknown',flags:192}).handling,/If such a path is accepted/);assert.match(m.evaluate({type:'unknown',flags:128}).handling,/does not itself discard the entire route/);
assert.match(m.evaluate({type:8,flags:193}).reservedNote,/receivers must ignore/);assert.equal(m.evaluate({type:8,flags:193}).issues.length,0);
// Browser export and mounted interaction without substituting HTML parsing for browser verification.
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'model.js'),'utf8'),sandbox);assert.equal(typeof sandbox.window.BgpAttributesModels.evaluate,'function');
class Element{
 constructor(tag){this.tag=tag;this.children=[];this.listeners={};this.value='';this.textContent='';this.hidden=false;}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=[...nodes];}
 addEventListener(event,cb){this.listeners[event]=cb;}
 emit(event){assert.equal(typeof this.listeners[event],'function');this.listeners[event]();}
}
const ids=['case','type','flags','reference','error','output','bits','summary','class','consistency','reserved','handling','limit','reset'],els=Object.fromEntries(ids.map(id=>['ba-'+id,new Element(id)]));
global.document={getElementById:id=>els[id],createElement:tag=>new Element(tag)};
try{
 m.mount('bgp-attributes');const e=id=>els['ba-'+id];assert.equal(e('case').children.length,17);assert.equal(e('type').children.length,12);assert.equal(e('reference').children.length,11);assert.equal(e('bits').children.length,5);assert(!e('output').hidden);assert.equal(e('flags').value,'64');
 e('case').value='large';e('case').emit('change');assert.equal(e('flags').value,'208');assert.match(e('summary').textContent,/11010000/);assert.match(e('bits').children[3].children[3].textContent,/2-octet/);
 for(const raw of ['', ' ', '1.5','1e2','0x40','-1','256','Infinity','<img src=x onerror=alert(1)>']){e('flags').value=raw;e('flags').emit('input');assert(e('output').hidden);assert(!e('error').hidden);assert.equal(e('bits').children.length,0);assert.equal(e('summary').textContent,'');}
 for(const raw of ['0','255']){e('flags').value=raw;e('flags').emit('input');assert(!e('output').hidden);assert(e('error').hidden);}
 e('case').value='unknown injected scenario';e('case').emit('change');assert(e('output').hidden);e('flags').value='64';e('flags').emit('input');assert(e('output').hidden,'editing flags must not recover invalid scenario identity');
 e('reset').emit('click');assert.equal(e('case').value,'origin');assert.equal(e('type').value,'1');assert.equal(e('flags').value,'64');assert(!e('output').hidden);assert(e('error').hidden);
 e('type').value='not-declared';e('type').emit('change');assert(e('output').hidden);e('flags').value='128';e('flags').emit('input');assert(e('output').hidden);e('reset').emit('click');assert(!e('output').hidden);
}finally{delete global.document;}
const markup=m.html('bgp-attributes');assert.match(markup,/id="ba-tool" class="en-tool"/);assert.equal((markup.match(/role="region"/g)||[]).length,2);assert.equal((markup.match(/tabindex="0"/g)||[]).length,2);assert.match(markup,/for="ba-flags"/);assert(!/innerHTML|eval\(/.test(fs.readFileSync(path.join(__dirname,'model.js'),'utf8')));
const lesson=JSON.parse(fs.readFileSync(path.join(__dirname,'lesson.json'),'utf8'));assert.equal(lesson.id,'s3-g3-t3');assert.equal(lesson.interactive,'bgp-attributes');assert.equal(lesson.exams.length,10);assert.equal(lesson.quick.length,3);assert.equal(lesson.commands.length,4);assert.equal(lesson.flow.length,4);for(const q of lesson.exams){assert.equal(q.type,'multiple-choice');assert.equal(q.options.length,4);assert.equal(q.options.filter(x=>x===q.answer).length,1);assert(q.explanation&&q.testedConcept);}for(const source of lesson.sources)assert.equal(source.checked,'2026-10-09');
const result={date:'2026-10-09',result:'PASS',presets:17,byteTypeCases:cases,knownTypes:11,mountedBehavior:'Stub DOM validation/reset and inert text contract verified; no real browser layout verification in this test.',scope:'Declared type and FLAGS only; no protocol/packet/device execution.'};fs.writeFileSync(path.join(__dirname,'model-results.json'),JSON.stringify(result,null,2)+'\n');console.log(`PASS: 17 presets, ${cases} independent type/byte cases, rejection boundaries and mounted invalid-context/reset tests.`);
