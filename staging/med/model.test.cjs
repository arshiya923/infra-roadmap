'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const api=require('./model.js');
let checks=0;
function equal(actual,expected,label){assert.deepEqual(actual,expected,label);checks++;}
function rejects(input,label){assert.throws(()=>api.evaluate(input),Error,label);checks++;}
// Independent authored input: do not use a production preset as the oracle.
const baseline={aNeighborAS:65002,bNeighborAS:65002,aAsPathLength:2,bAsPathLength:2,aLocalPref:100,bLocalPref:100,aMed:100,bMed:200,aOrigin:'igp',bOrigin:'igp',aAdmitted:true,bAdmitted:true,aResolved:true,bResolved:true,alwaysCompare:false,missingMode:'default-zero',systemSelect:true,forwardReady:true,returnReady:true};
const fixed=[
 [{},'med-winner','a',true,true,true,100,200],
 [{aMed:201},'med-winner','b',true,true,true,201,200],
 [{bNeighborAS:65003},'different-neighbor',null,false,null,null,100,200],
 [{bNeighborAS:65003,alwaysCompare:true},'med-winner','a',true,true,true,100,200],
 [{aMed:200},'med-tie',null,true,null,null,200,200],
 [{aLocalPref:0},'earlier-boundary',null,false,null,null,100,200],
 [{aAsPathLength:3,alwaysCompare:true},'earlier-boundary',null,false,null,null,100,200],
 [{bOrigin:'egp'},'earlier-boundary',null,false,null,null,100,200],
 [{aOrigin:'incomplete',bOrigin:'egp',aMed:0},'earlier-boundary',null,false,null,null,0,200],
 [{aResolved:false,aMed:0},'single-usable','b',false,true,true,0,200],
 [{bAdmitted:false,bMed:0},'single-usable','a',false,true,true,100,0],
 [{aAdmitted:false,bResolved:false},'no-usable',null,false,false,false,100,200],
 [{aMed:null},'med-winner','a',true,true,true,0,200],
 [{aMed:null,missingMode:'missing-as-worst'},'med-winner','b',true,true,true,4294967295,200],
 [{aMed:null,bMed:4294967295,missingMode:'missing-as-worst'},'med-tie',null,true,null,null,4294967295,4294967295],
 [{aMed:null,bMed:null},'med-tie',null,true,null,null,0,0],
 [{aMed:null,bMed:0},'med-tie',null,true,null,null,0,0],
 [{aMed:4294967295,bMed:null,missingMode:'missing-as-worst'},'med-tie',null,true,null,null,4294967295,4294967295],
 [{aMed:null,bNeighborAS:65003,missingMode:'missing-as-worst'},'different-neighbor',null,false,null,null,4294967295,200],
 [{aNeighborAS:4200000001,bNeighborAS:4200000001},'med-winner','a',true,true,true,100,200],
 [{aNeighborAS:1,bNeighborAS:4294967294,alwaysCompare:true,aMed:0,bMed:4294967295},'med-winner','a',true,true,true,0,4294967295],
 [{systemSelect:false},'med-winner','a',true,false,false,100,200],
 [{forwardReady:false},'med-winner','a',true,true,false,100,200],
 [{returnReady:false},'med-winner','a',true,true,false,100,200]
];
for(const [change,status,winner,compared,installed,exchange,medA,medB] of fixed){const s={...baseline,...change},before=JSON.stringify(s),v=api.evaluate(s);equal([v.status,v.winner,v.medCompared,v.systemInstalled,v.exchangePrerequisites,v.effectiveMed.a,v.effectiveMed.b],[status,winner,compared,installed,exchange,medA,medB],JSON.stringify(change));equal(JSON.stringify(s),before,'evaluate does not mutate input');}
// Eligibility table is independently authored, covering admission/resolution pairs.
const gates=[[false,false,false],[false,true,false],[true,false,false],[true,true,true]];
for(const [aAdmitted,aResolved,aUsable] of gates)for(const [bAdmitted,bResolved,bUsable] of gates){const v=api.evaluate({...baseline,aAdmitted,aResolved,bAdmitted,bResolved});equal(v.eligible,{a:aUsable,b:bUsable},'admission/resolution gates');equal(v.status,aUsable&&bUsable?'med-winner':aUsable||bUsable?'single-usable':'no-usable','contest count');}
// Numerically attractive unusable input and unequal earlier data never enter MED.
for(const change of [{aLocalPref:1000},{aAsPathLength:1},{aOrigin:'egp'},{bNeighborAS:65003}]){const v=api.evaluate({...baseline,...change,aAdmitted:false,aMed:0});equal([v.status,v.winner,v.medCompared],['single-usable','b',false],'sole usable independent of excluded dimensions');}
const invalidNumbers=[undefined,'100','',null,false,true,-1,0.5,NaN,Infinity,4294967296];
for(const key of ['aLocalPref','bLocalPref','aAsPathLength','bAsPathLength','aNeighborAS','bNeighborAS'])for(const value of invalidNumbers)rejects({...baseline,[key]:value},key+' strict numeric type/range');
for(const key of ['aNeighborAS','bNeighborAS','aAsPathLength','bAsPathLength'])rejects({...baseline,[key]:0},key+' disallows zero');
for(const key of ['aNeighborAS','bNeighborAS'])rejects({...baseline,[key]:4294967295},key+' reserved last-AS exclusion');
for(const key of ['aMed','bMed'])for(const value of invalidNumbers.filter(x=>x!==null))rejects({...baseline,[key]:value},key+' strict nullable uint32');
for(const key of ['aAdmitted','bAdmitted','aResolved','bResolved','alwaysCompare','systemSelect','forwardReady','returnReady'])for(const value of [undefined,0,1,'false',null,{}])rejects({...baseline,[key]:value},key+' strict boolean');
for(const key of ['aOrigin','bOrigin'])for(const value of [undefined,null,0,'IGP','unknown',''])rejects({...baseline,[key]:value},key+' strict enum');
for(const value of [undefined,null,true,'default','worst',''])rejects({...baseline,missingMode:value},'missing mode enum');
for(const input of [null,undefined,[],{}, {...baseline,extra:true}])rejects(input,'exact shape');
const missing={...baseline};delete missing.aMed;rejects(missing,'missing key is not null attribute');
equal(api.evaluate({...baseline,aLocalPref:4294967295,bLocalPref:4294967295}).winner,'a','LP unsigned max accepted');
const expectedPresets={ 'same-as':['med-winner','a'], 'b-lower':['med-winner','b'], 'different-as':['different-neighbor',null], 'always-compare':['med-winner','a'], 'equal-med':['med-tie',null], 'local-pref-boundary':['earlier-boundary',null], 'path-boundary':['earlier-boundary',null], 'origin-boundary':['earlier-boundary',null], 'a-unresolved':['single-usable','b'], 'b-rejected':['single-usable','a'], 'none-usable':['no-usable',null], 'missing-default':['med-winner','a'], 'missing-worst':['med-winner','b'], 'missing-max-tie':['med-tie',null], 'both-missing':['med-tie',null], 'system-other':['med-winner','a'], 'return-missing':['med-winner','a'], 'zero-max':['med-winner','a'], 'four-octet-as':['med-winner','a'] };
equal(api.catalog().map(x=>x.id).sort(),Object.keys(expectedPresets).sort(),'catalog IDs');
for(const [id,expected] of Object.entries(expectedPresets)){const v=api.evaluate(api.preset(id));equal([v.status,v.winner],expected,'preset '+id);}
const fresh=api.preset('same-as');fresh.aMed=99;equal(api.preset('same-as').aMed,100,'preset returns fresh input');
assert.throws(()=>api.preset('unknown'));checks++;
equal(api.html('unrelated'),'','unrelated HTML');
const html=api.html('med');for(const expected of ['id="med-tool"','id="med-case"','id="med-output"','id="med-error"','id="med-reset"','role="region"','aria-label="MED candidate declarations and eligibility table"','tabindex="0"']){assert.ok(html.includes(expected),expected);checks++;}
// DOM contract test: controls, stale-result hiding, enum rejection and reset.
// This is a fake DOM test, not browser layout or keyboard evidence.
class Node{constructor(){this.value='';this.checked=false;this.hidden=false;this.textContent='';this.children=[];this.listeners={};this.validity={badInput:false};}append(x){this.children.push(x);}replaceChildren(...x){this.children=x;}addEventListener(k,f){this.listeners[k]=f;}fire(k='change'){this.listeners[k]();}set innerHTML(_){throw Error('Use textContent for output');}}
const nodes=new Map([...api.fields,'case','error','output','rows','decision','installation','service','limit','reset'].map(k=>['med-'+k,new Node()]));
global.document={getElementById:id=>nodes.get(id),createElement:()=>new Node()};api.mount('med');const node=k=>nodes.get('med-'+k);
equal([node('case').value,node('output').hidden,node('rows').children.length],['same-as',false,2],'mount baseline');
node('case').value='equal-med';node('case').fire();assert.ok(node('decision').textContent.includes('Undetermined here'));checks++;
node('aMed').value='-1';node('aMed').fire();equal([node('error').hidden,node('output').hidden,node('rows').children.length,node('decision').textContent],[false,true,0,''],'invalid metric clears stale output');
node('reset').fire('click');equal([node('case').value,node('aMed').value,node('output').hidden],['same-as','100',false],'reset restores valid baseline');
node('aMed').value='';node('aMed').validity.badInput=true;node('aMed').fire();equal(node('output').hidden,true,'bad numeric input not treated absent');
node('reset').fire('click');node('aMed').validity.badInput=false;node('reset').fire('click');
node('case').value='<img onerror=alert(1)>';node('case').fire();equal([node('output').hidden,node('rows').children.length,node('service').textContent],[true,0,''],'unlisted scenario hides outcome');
node('reset').fire('click');node('aOrigin').value='IGP';node('aOrigin').fire();equal(node('output').hidden,true,'invalid enum hides outcome');
node('reset').fire('click');equal(node('error').textContent,'','reset clears error text');delete global.document;
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(require.resolve('./model.js'),'utf8'),ctx);equal(typeof ctx.window.MedModels.evaluate,'function','browser API export');
const lesson=JSON.parse(fs.readFileSync(require.resolve('./lesson.json'),'utf8'));
equal([lesson.id,lesson.interactive,lesson.commands.length,lesson.flow.length,lesson.exams.length,lesson.quick.length],['s3-g4-t1','med',4,4,10,3],'lesson required counts');
for(const q of lesson.exams){equal(q.type,'multiple-choice','MCQ type');equal(q.options.filter(x=>x===q.answer).length,1,'exact MCQ answer option');}
equal(lesson.prerequisites,['s3-g3-t0','s3-g3-t1','s3-g3-t2','s3-g3-t3','s3-g4-t0'],'prerequisites');
for(const cmd of lesson.commands){assert.ok(cmd.code.split('\n').every(x=>x.startsWith('show ')),'read-only show command');checks++;}
console.log('MED independent assertions: '+checks+' passed; 19 presets, 24 authored outcome cases, 16 admission/resolution combinations, strict invalid-input and fake-DOM contracts. No actual FRR or browser-layout execution.');
