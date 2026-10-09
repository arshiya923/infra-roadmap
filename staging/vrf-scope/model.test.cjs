'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const api=require('./model.js');let count=0;
function eq(a,b,label){assert.deepEqual(a,b,label);count++;}
function reject(kind,s,label){assert.throws(()=>api.evaluate(kind,s),Error,label);count++;}
// Independent authored baseline and route inventory, not production preset output.
const common={attachment:'blue-lan',ingressVRF:'BLUE',endpointVRF:'BLUE',gatewayOwner:'BLUE',target:'overlap',attachmentPresent:true,blueOverlap:true,redOverlap:true,defaultOverlap:true,blueService:true,blueResolved:true,redResolved:true,defaultResolved:true,blueSelected:true,redSelected:true,defaultSelected:true,leakPermit:false,leakResolved:true,leakSelected:true,forwardReady:true,returnReady:true,servicePolicyReady:true};
function input(kind,change={}){return {...common,...(kind==='vrf-lite'?{attachment:'blue-dot10',packetVlan:10,trunkReady:true}:{}),...change};}
function red(kind,change={}){return input(kind,{attachment:kind==='vrf-lite'?'red-dot20':'red-lan',ingressVRF:'RED',endpointVRF:'RED',gatewayOwner:'RED',...(kind==='vrf-lite'?{packetVlan:20}:{}),...change});}
function defaults(kind,change={}){return input(kind,{attachment:'default-port',ingressVRF:'default',endpointVRF:'default',gatewayOwner:'default',...(kind==='vrf-lite'?{packetVlan:0}:{}),...change});}
const baselineRows=[['BLUE','10.10.0.0/24',true,true],['BLUE','203.0.113.0/24',true,true],['RED','10.10.0.0/24',true,true],['RED','203.0.113.0/24',false,false],['default','10.10.0.0/24',true,true],['default','203.0.113.0/24',false,false]];
const presetExpected={ 'overlap-blue':['BLUE','declared-prerequisites-agree',true,true], 'overlap-red':['RED','declared-prerequisites-agree',true,true], 'wrong-attachment':['RED','attachment-mismatch',false,false], 'wrong-binding':['RED','attachment-mismatch',false,false], 'missing-route':['BLUE','no-candidate',false,false], 'unresolved':['BLUE','next-hop-unresolved',false,false], 'leak-denied':['RED','no-candidate',false,false], 'leak-permitted':['RED','declared-prerequisites-agree',true,true], 'leak-unresolved':['RED','next-hop-unresolved',false,false], 'leak-source-absent':['RED','no-candidate',false,false], 'leak-displaced':['RED','source-displaced',false,false], 'default-separate':['default','no-candidate',false,false], 'default-overlap':['default','declared-prerequisites-agree',true,true], 'source-displaced':['BLUE','source-displaced',false,false], 'return-missing':['BLUE','exchange-prerequisites-missing',true,false], 'gateway-wrong':['BLUE','gateway-mismatch',false,false], 'policy-missing':['BLUE','exchange-prerequisites-missing',true,false], 'attachment-absent':['BLUE','ingress-unavailable',false,false] };
for(const kind of ['vrf','vrf-lite']){
 const base=input(kind),before=JSON.stringify(base),v=api.evaluate(kind,base);
 eq(v.rows.map(r=>[r.context,r.prefix,r.candidate,r.installed]),baselineRows,kind+' independent baseline inventory');eq(JSON.stringify(base),before,'pure input');
 eq([v.context,v.prefix,v.queried.nextHop,v.gatewayAddress,v.lookupApplied,v.exchangePrerequisites],['BLUE','10.10.0.0/24','192.0.2.2 / BLUE uplink','10.10.0.1',true,true],'BLUE ownership');
 const r=api.evaluate(kind,red(kind));eq([r.context,r.queried.nextHop,r.gatewayAddress],['RED','192.0.2.6 / RED uplink','10.10.0.1'],'overlap distinct RED gateway/next hop');
 const d=api.evaluate(kind,defaults(kind));eq([d.context,d.queried.nextHop,d.gatewayAddress],['default','192.0.2.10 / default uplink','192.0.2.1'],'separate default record');
 const noBlue=api.evaluate(kind,input(kind,{blueOverlap:false}));eq([noBlue.status,noBlue.queried.candidate,noBlue.rows.find(x=>x.context==='RED'&&x.query==='overlap').installed,noBlue.rows.find(x=>x.context==='default'&&x.query==='overlap').installed],['no-candidate',false,true,true],'RED/default cannot repair missing BLUE');
 eq(api.evaluate(kind,input(kind,{blueOverlap:false,leakPermit:true})).selectedRouteInstalled,false,'service permit never leaks overlap route');
 const wrong=api.evaluate(kind,input(kind,{ingressVRF:'RED'}));eq([wrong.context,wrong.attachmentExpectedContext,wrong.endpointContext,wrong.lookupApplied,wrong.rows[2].installed],['RED','BLUE','BLUE',false,true],'binding before query, inventories unaffected by intended-owner disagreement');
 // Complete independently specified leak admission/resolution/selection truth table.
 const leakCases=[
  [false,false,false,false,'no-candidate',false],
  [false,true,true,true,'no-candidate',false],
  [true,false,true,true,'no-candidate',false],
  [true,true,false,true,'next-hop-unresolved',false],
  [true,true,true,false,'source-displaced',false],
  [true,true,true,true,'declared-prerequisites-agree',true]
 ];
 for(const [blueService,leakPermit,leakResolved,leakSelected,status,installed] of leakCases){const x=api.evaluate(kind,red(kind,{target:'service',blueService,leakPermit,leakResolved,leakSelected}));eq([x.status,x.selectedRouteInstalled],[status,installed],'authored service gates');eq(x.queried.context,'RED','target owns query');}
 eq(api.evaluate(kind,defaults(kind,{target:'service',leakPermit:true})).status,'no-candidate','default does not import BLUE service');
 eq(api.evaluate(kind,red(kind,{target:'service',leakPermit:true,blueResolved:false})).selectedRouteInstalled,true,'separate declared RED imported resolution does not use BLUE native resolver flag');
 eq(api.evaluate(kind,red(kind,{target:'service',leakPermit:true,redResolved:false})).selectedRouteInstalled,true,'import resolution gate is separate from native RED gate');
 eq(api.evaluate(kind,red(kind,{target:'service',leakPermit:true,leakResolved:false,blueResolved:true})).selectedRouteInstalled,false,'BLUE native resolver does not satisfy target RED import');
 for(const key of ['forwardReady','returnReady','servicePolicyReady']){const x=api.evaluate(kind,input(kind,{[key]:false}));eq([x.status,x.selectedRouteInstalled,x.exchangePrerequisites],['exchange-prerequisites-missing',true,false],'separate service '+key);}
 const expected={...presetExpected,...(kind==='vrf-lite'?{'vlan-mismatch':['BLUE','vlan-mismatch',false,false],'trunk-absent':['BLUE','ingress-unavailable',false,false]}:{})};
 eq(api.catalog(kind).map(c=>c.id).sort(),Object.keys(expected).sort(),'listed scenarios');
 for(const [id,outcome] of Object.entries(expected)){const x=api.evaluate(kind,api.preset(kind,id));eq([x.context,x.status,x.selectedRouteInstalled,x.exchangePrerequisites],outcome,kind+' preset '+id);}
 const first=api.preset(kind,'overlap-blue');first.blueOverlap=false;eq(api.preset(kind,'overlap-blue').blueOverlap,true,'fresh preset copy');assert.throws(()=>api.preset(kind,'unknown'));count++;
 // Strict exact shape and primitive types: no accidental coercion or default.
 for(const key of api.fields(kind).filter(k=>typeof base[k]==='boolean'))for(const value of [undefined,null,0,1,'false',[],{}])reject(kind,{...base,[key]:value},key+' strict boolean');
 for(const key of ['ingressVRF','endpointVRF','gatewayOwner'])for(const value of [undefined,null,0,'blue','UNKNOWN',{},['BLUE']])reject(kind,{...base,[key]:value},key+' strict enum');
 for(const value of [undefined,null,'UNKNOWN','__proto__','constructor',[],{toString:()=>base.attachment}])reject(kind,{...base,attachment:value},'strict known attachment');
 for(const value of [undefined,null,0,'10.10.0.42','UNKNOWN',{},['overlap']])reject(kind,{...base,target:value},'strict query enum');
 for(const value of [undefined,null,[],{}, {...base,unexpected:true}])reject(kind,value,'exact shape');
 const missing={...base};delete missing.blueOverlap;reject(kind,missing,'missing field not false');
 if(kind==='vrf-lite'){
  for(const value of [undefined,null,'10',false,1,10.5,-1,4095,{},['10']])reject(kind,{...base,packetVlan:value},'strict fixture VLAN numeric enum');
  const blocked=api.evaluate(kind,input(kind,{trunkReady:false}));eq([blocked.lookupApplied,blocked.rows[0].installed,blocked.rows[2].installed],[false,true,true],'trunk absence does not erase route declarations');
  eq(api.evaluate(kind,defaults(kind,{trunkReady:false})).exchangePrerequisites,true,'separate default-port outside tenant trunk');
  for(const value of [0,20])eq(api.evaluate(kind,input(kind,{packetVlan:value})).status,'vlan-mismatch','VLAN mismatch never fallback');
 }
 const markup=api.html(kind),prefix=kind==='vrf'?'vf':'vl';for(const expected of ['id="'+prefix+'-tool"','id="'+prefix+'-case"','id="'+prefix+'-error"','id="'+prefix+'-output"','id="'+prefix+'-reset"','role="region"','tabindex="0"','aria-label="'+(kind==='vrf'?'VRF':'VRF-Lite')+' independent context route inventory"']){assert.ok(markup.includes(expected));count++;}
}
reject('UNKNOWN',common,'unknown kind');eq(api.html('UNKNOWN'),'','unrelated HTML');
// Fake DOM contracts cover stale-result clearing and immediate input validation.
// They deliberately make innerHTML throw. This is not a browser layout test.
class Node{constructor(){this.value='';this.checked=false;this.hidden=false;this.textContent='';this.children=[];this.listeners={};}append(n){this.children.push(n);}replaceChildren(...x){this.children=x;}addEventListener(k,fn){this.listeners[k]=fn;}fire(k='change'){this.listeners[k]();}set innerHTML(_){throw Error('Unsafe output mutation');}}
for(const kind of ['vrf','vrf-lite']){
 const p=kind==='vrf'?'vf':'vl',nodes=new Map([...api.fields(kind),'case','error','output','rows','context','decision','service','limit','reset'].map(k=>[p+'-'+k,new Node()])),node=k=>nodes.get(p+'-'+k);
 global.document={getElementById:id=>nodes.get(id),createElement:()=>new Node()};api.mount(kind);
 eq([node('case').value,node('rows').children.length,node('output').hidden],['overlap-blue',6,false],'mounted baseline');
 node('case').value='leak-unresolved';node('case').fire();assert.ok(node('decision').textContent.includes('does not resolve'));count++;
 node('ingressVRF').value='UNKNOWN';node('ingressVRF').fire('input');eq([node('output').hidden,node('rows').children.length,node('decision').textContent],[true,0,''],'immediate invalid VRF hide and clear');
 node('reset').fire('click');eq([node('case').value,node('ingressVRF').value,node('output').hidden,node('error').textContent],['overlap-blue','BLUE',false,''],'reset restores valid context/text');
 node('attachment').value='UNKNOWN';node('attachment').fire('input');eq(node('output').hidden,true,'unknown attachment does not default');
 node('reset').fire('click');node('case').value='<unknown>';node('case').fire();eq(node('output').hidden,true,'invalid scenario hidden');
 node('returnReady').checked=false;node('returnReady').fire('input');eq([node('output').hidden,node('service').textContent,node('rows').children.length],[true,'',0],'invalid scenario remains hidden after later inputs');
 node('reset').fire('click');eq(node('returnReady').checked,true,'keyboard click reset restores service declaration');
 if(kind==='vrf-lite'){node('packetVlan').value='010';node('packetVlan').fire('input');eq(node('output').hidden,true,'UI VLAN does not coerce unlisted raw enum');node('reset').fire('click');eq(node('packetVlan').value,'10','reset VLAN');}
 delete global.document;
}
const browser={window:{}};vm.createContext(browser);vm.runInContext(fs.readFileSync(require.resolve('./model.js'),'utf8'),browser);eq(typeof browser.window.VrfScopeModels.evaluate,'function','window API');
const lessons=JSON.parse(fs.readFileSync(require.resolve('./lessons.json'),'utf8')),required=['id','batch','title','subtitle','level','minutes','interactive','definition','purpose','mental','components','mechanism','flow','comparison','example','ports','commands','configuration','production','troubleshooting','security','performance','mistakes','prerequisites','related','artifacts','lab','glossary','exams','quick','sources'];
const inventory=JSON.parse(fs.readFileSync('content/roadmap-inventory.json','utf8')),topicIds=new Set(inventory.nodes.filter(n=>n.kind==='topic').map(n=>n.id));
const authoredContext={window:{}};vm.createContext(authoredContext);for(const file of fs.readdirSync('content').filter(x=>/^batch-\d+\.js$/.test(x)))vm.runInContext(fs.readFileSync('content/'+file,'utf8'),authoredContext);
const authored=Object.values(authoredContext.window.INFRA_BATCHES).flat(),dependencyMap=new Map([...authored,...lessons].map(l=>[l.id,l.prerequisites]));
for(const l of lessons){for(const id of [...l.prerequisites,...l.related]){assert.ok(topicIds.has(id),'known original topic '+id);count++;}for(const id of l.prerequisites){assert.ok(dependencyMap.has(id),'authored prerequisite '+id);count++;}}
const visiting=new Set(),visited=new Set();function acyclic(id){if(visiting.has(id))throw Error('Cyclic prerequisite '+id);if(visited.has(id))return;visiting.add(id);for(const p of dependencyMap.get(id)||[])acyclic(p);visiting.delete(id);visited.add(id);}for(const l of lessons)acyclic(l.id);count++;
eq(lessons.map(x=>[x.id,x.batch,x.interactive]),[['s3-g6-t0','10','vrf'],['s3-g6-t1','10','vrf-lite']],'two lesson IDs');
for(const l of lessons){eq(Object.keys(l).sort(),required.sort(),'exact full schema');eq([l.exams.length,l.quick.length,l.flow.length,l.commands.length],[10,3,4,4],'required counts');assert.ok(l.glossary&&!Array.isArray(l.glossary)&&typeof l.glossary==='object');count++;eq(l.artifacts,[],'no unsupported artifact strings');for(const q of l.exams){eq(q.type,'multiple-choice','MCQ');eq(q.options.length,4,'four answer options');eq(new Set(q.options).size,4,'distinct options');eq(q.options.filter(x=>x===q.answer).length,1,'exact unique answer option');}for(const cmd of l.commands){assert.ok(cmd.code.split('\n').every(x=>/^(show |ip (-d link show|link show|rule show|route show|route get))/.test(x)));count++;assert.ok(/guided read-only, not executed/.test(cmd.platform));count++;}for(const [label,text] of l.flow){assert.ok(label&&text);count++;}}
console.log('VRF scope independent assertions: '+count+' passed; 18 VRF presets, 20 VRF-Lite presets, explicit leak truth cases, strict invalid-input and fake-DOM contracts; two full-schema lessons with 20 MCQs/6 quick checks. No live FRR/Linux/Cisco or browser-layout execution.');
