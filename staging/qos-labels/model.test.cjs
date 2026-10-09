'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const m=require('./model.js'),lessons=JSON.parse(fs.readFileSync(path.join(__dirname,'lessons.json'),'utf8'));
const browser={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'model.js'),'utf8'),browser);assert.equal(typeof browser.window.QosLabelModels.evaluate,'function');
assert.deepEqual(lessons.map(x=>x.id),['s3-g9-t1','s3-g9-t2']);
for(const l of lessons){assert.equal(l.batch,'10');assert.equal(l.exams.length,10);assert.equal(l.quick.length,3);assert.equal(l.exams.every(q=>q.type==='multiple-choice'&&q.options.includes(q.answer)),true,l.id);assert.equal(l.flow.length,4);assert.equal(l.commands.length,4);assert.equal(l.lab.topologyKind,'shared');assert.deepEqual(l.artifacts,[]);}
assert(m.catalog('classification').length>=10);assert(m.catalog('marking').length>=10);
const expectedClass=(protocol,dst)=>protocol==='udp'&&dst>=16384&&dst<=32767?'voice':protocol==='tcp'&&dst===443?'interactive':'default';
let classified=0;
for(const protocol of ['tcp','udp'])for(let dst=0;dst<=65535;dst++){const s={protocol,sourcePort:65535-dst,destinationPort:dst,inputDscp:63,inputEcn:3},v=m.evaluate('classification',s);assert.equal(v.className,expectedClass(protocol,dst));assert.equal(v.outputDscp,63);assert.equal(v.outputEcn,3);assert.equal(v.before.field,255);assert.equal(v.after.field,255);classified++;}
for(const id of ['voice','below','at-low','at-high','above','tcp-443','udp-443','icmp','src-independent','tcp-other','ecn-ce']){const s=m.preset('classification',id),v=m.evaluate('classification',s);assert.equal(v.className,expectedClass(s.protocol,s.destinationPort),id);}
assert.equal(m.evaluate('classification',m.preset('classification','at-low')).className,'voice');
assert.equal(m.evaluate('classification',m.preset('classification','at-high')).className,'voice');
for(let d=0;d<64;d++)for(let e=0;e<4;e++){
 const trusted={className:'voice',policy:'trusted-preserve',trustBoundary:true,inputDscp:d,inputEcn:e},v=m.evaluate('marking',trusted);assert.equal(v.outputDscp,d);assert.equal(v.outputEcn,e);assert.equal(v.after.field,d*4+e);assert.equal(v.after.dscpBits,d.toString(2).padStart(6,'0'));assert.equal(v.after.ecnBits,e.toString(2).padStart(2,'0'));
 const zero={className:'default',policy:'untrusted-zero',trustBoundary:false,inputDscp:d,inputEcn:e},z=m.evaluate('marking',zero);assert.equal(z.outputDscp,0);assert.equal(z.outputEcn,e);assert.equal(z.after.field,e);
 for(const [c,n] of [['voice',46],['interactive',18],['default',0]]){const s={className:c,policy:'class-map',trustBoundary:false,inputDscp:d,inputEcn:e},r=m.evaluate('marking',s);assert.equal(r.outputDscp,n);assert.equal(r.outputEcn,e);assert.equal(r.after.field,n*4+e);}
}
for(const id of ['trusted-preserve','trust-mismatch','untrusted-zero','map-voice','map-interactive','map-default','ecn-00','ecn-01','ecn-10','ecn-11','dscp-max','zero']){const s=m.preset('marking',id);if(id==='trust-mismatch')assert.throws(()=>m.evaluate('marking',s));else assert(m.evaluate('marking',s),id);}
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','map-voice'),extra:1}));
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','map-voice'),inputDscp:'46'}));
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','map-voice'),inputEcn:4}));
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','map-voice'),trustBoundary:1}));
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','map-voice'),policy:'preserve'}));
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','map-voice'),className:'VOICE'}));
assert.throws(()=>m.evaluate('marking',{...m.preset('marking','trusted-preserve'),trustBoundary:false}));
assert.throws(()=>m.evaluate('classification',{...m.preset('classification','voice'),sourcePort:'50000'}));
assert.throws(()=>m.evaluate('classification',{...m.preset('classification','voice'),destinationPort:65536}));
assert.throws(()=>m.evaluate('classification',{...m.preset('classification','icmp'),sourcePort:1}));
assert.throws(()=>m.evaluate('classification',{...m.preset('classification','voice'),protocol:'sctp'}));
assert.throws(()=>m.preset('unknown','voice'));
assert.deepEqual(m.catalog('unknown'),[]);
assert.equal(m.html('classification').includes('id="qc-tool"'),true);
assert.equal(m.html('marking').includes('id="qm-tool"'),true);
assert.equal(m.html('marking').includes('tabindex="0"'),true);
assert.match(fs.readFileSync(require.resolve('./model.js'),'utf8'),/\.textContent\s*=/);
function fakeDoc(kind){
 const prefix=kind==='classification'?'qc':'qm',ids=kind==='classification'?['case','protocol','sourcePort','destinationPort','inputDscp','inputEcn','error','output','summary','rows','limit','reset']:['case','className','policy','trustBoundary','inputDscp','inputEcn','error','output','summary','rows','limit','reset'],nodes={};
 function node(id){return {id,type:id==='trustBoundary'?'checkbox':['sourcePort','destinationPort','inputDscp','inputEcn'].includes(id)?'number':['case','protocol','className','policy'].includes(id)?'select':'',value:'',checked:false,hidden:false,textContent:'',children:[],events:{},append(x){this.children.push(x)},replaceChildren(...xs){this.children=xs},addEventListener(ev,fn){this.events[ev]=fn},fire(ev){this.events[ev]?.({target:this})},get valueAsNumber(){return this.value===''?NaN:Number(this.value)}};}
 ids.forEach(id=>nodes[prefix+'-'+id]=node(id));global.document={getElementById:id=>nodes[id],createElement:tag=>node(tag)};
 return {nodes,prefix};
}
let d=fakeDoc('marking');m.mount('marking');let n=d.nodes;
n['qm-case'].value='trust-mismatch';n['qm-case'].fire('change');assert.equal(n['qm-output'].hidden,true);assert.equal(n['qm-error'].hidden,false);n['qm-inputEcn'].value='2';n['qm-inputEcn'].fire('input');assert.equal(n['qm-output'].hidden,true);assert.equal(n['qm-error'].hidden,false);
n['qm-case'].value='bad-case';n['qm-case'].fire('change');n['qm-inputDscp'].value='30';n['qm-inputDscp'].fire('input');assert.equal(n['qm-output'].hidden,true);n['qm-reset'].fire('click');assert.equal(n['qm-output'].hidden,false);assert.equal(n['qm-case'].value,'trusted-preserve');
d=fakeDoc('classification');m.mount('classification');n=d.nodes;n['qc-inputDscp'].value='';n['qc-inputDscp'].fire('input');assert.equal(n['qc-output'].hidden,true);n['qc-sourcePort'].value='1';n['qc-sourcePort'].fire('input');assert.equal(n['qc-output'].hidden,true);n['qc-reset'].fire('click');assert.equal(n['qc-output'].hidden,false);assert.equal(n['qc-case'].value,'voice');
console.log('PASS: 11 classification presets and 12 marking presets, 131072 TCP/UDP port cases, all DSCP×ECN combinations for all marking policies/classes, strict adversarial validation, schema/MCQ checks, hidden-invalid and keyboard reset behavior.');
