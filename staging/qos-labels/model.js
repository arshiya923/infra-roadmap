(function(root){'use strict';
const KINDS=['classification','marking'],MAX_DSCP=63,MAX_ECN=3;
const classBase={protocol:'udp',sourcePort:50000,destinationPort:20000,inputDscp:12,inputEcn:2};
const classCases=[
 ['voice','UDP voice destination in range',{protocol:'udp',sourcePort:40000,destinationPort:16384,inputDscp:12,inputEcn:2}],
 ['below','Port below voice range',{protocol:'udp',sourcePort:16383,destinationPort:16383,inputDscp:0,inputEcn:0}],
 ['at-low','Lower voice boundary',{protocol:'udp',sourcePort:1234,destinationPort:16384,inputDscp:10,inputEcn:1}],
 ['at-high','Upper voice boundary',{protocol:'udp',sourcePort:32767,destinationPort:32767,inputDscp:46,inputEcn:3}],
 ['above','Port above voice range',{protocol:'udp',sourcePort:20000,destinationPort:32768,inputDscp:18,inputEcn:2}],
 ['tcp-443','TCP HTTPS port',{protocol:'tcp',sourcePort:5555,destinationPort:443,inputDscp:8,inputEcn:0}],
 ['udp-443','UDP 443 is not the TCP 443 rule',{protocol:'udp',sourcePort:443,destinationPort:443,inputDscp:46,inputEcn:1}],
 ['icmp','ICMP carries no transport ports in this contract',{protocol:'icmp',sourcePort:0,destinationPort:0,inputDscp:0,inputEcn:3}],
 ['src-independent','Voice rule tests destination port only',{protocol:'udp',sourcePort:16383,destinationPort:20000,inputDscp:1,inputEcn:2}],
 ['tcp-other','TCP other than 443 defaults',{protocol:'tcp',sourcePort:16384,destinationPort:20000,inputDscp:63,inputEcn:1}],
 ['ecn-ce','Classification leaves ECN declaration alone',{protocol:'udp',sourcePort:1,destinationPort:32768,inputDscp:7,inputEcn:3}]
];
const markBase={className:'voice',policy:'class-map',trustBoundary:false,inputDscp:12,inputEcn:2};
const markCases=[
 ['trusted-preserve','Preserve trusted incoming DSCP',{className:'interactive',policy:'trusted-preserve',trustBoundary:true,inputDscp:46,inputEcn:2}],
 ['trust-mismatch','Reject preserve when boundary is untrusted',{className:'voice',policy:'trusted-preserve',trustBoundary:false,inputDscp:46,inputEcn:1}],
 ['untrusted-zero','Clear untrusted DSCP and retain ECN',{className:'voice',policy:'untrusted-zero',trustBoundary:false,inputDscp:46,inputEcn:3}],
 ['map-voice','Class map marks voice as local 46',{className:'voice',policy:'class-map',trustBoundary:false,inputDscp:0,inputEcn:0}],
 ['map-interactive','Class map marks interactive as local 18',{className:'interactive',policy:'class-map',trustBoundary:false,inputDscp:46,inputEcn:1}],
 ['map-default','Class map marks default as local 0',{className:'default',policy:'class-map',trustBoundary:true,inputDscp:63,inputEcn:2}],
 ['ecn-00','Class map preserves ECN 00',{className:'voice',policy:'class-map',trustBoundary:false,inputDscp:12,inputEcn:0}],
 ['ecn-01','Class map preserves ECN 01',{className:'interactive',policy:'class-map',trustBoundary:false,inputDscp:12,inputEcn:1}],
 ['ecn-10','Class map preserves ECN 10',{className:'default',policy:'class-map',trustBoundary:false,inputDscp:12,inputEcn:2}],
 ['ecn-11','Class map preserves ECN 11',{className:'voice',policy:'class-map',trustBoundary:false,inputDscp:12,inputEcn:3}],
 ['dscp-max','Maximum DSCP value is valid',{className:'default',policy:'trusted-preserve',trustBoundary:true,inputDscp:63,inputEcn:3}],
 ['zero','DSCP zero is valid',{className:'default',policy:'untrusted-zero',trustBoundary:false,inputDscp:0,inputEcn:0}]
];
function catalog(kind){if(kind==='classification')return classCases.map(x=>({id:x[0],title:x[1]}));if(kind==='marking')return markCases.map(x=>({id:x[0],title:x[1]}));return [];}
function preset(kind,id){const cs=kind==='classification'?classCases:kind==='marking'?markCases:null;if(!cs)throw Error('Choose classification or marking.');const c=cs.find(x=>x[0]===id);if(!c)throw Error('Choose a listed scenario.');return {...(kind==='classification'?classBase:markBase),...c[2]};}
function exactKeys(x,keys){return x&&typeof x==='object'&&!Array.isArray(x)&&Object.keys(x).sort().join(',')===[...keys].sort().join(',');}
function intRange(x,min,max){return typeof x==='number'&&Number.isInteger(x)&&x>=min&&x<=max;}
function validateHeader(s,keys){if(!exactKeys(s,keys))throw Error('Use exactly the declared fields for this worksheet.');if(!intRange(s.inputDscp,0,MAX_DSCP)||!intRange(s.inputEcn,0,MAX_ECN))throw Error('DSCP must be an integer from 0 to 63 and ECN an integer from 0 to 3.');}
function ds(dscp,ecn){return {dscp,dscpBits:dscp.toString(2).padStart(6,'0'),ecn,ecnBits:ecn.toString(2).padStart(2,'0'),field:dscp*4+ecn};}
function evaluate(kind,s){
 if(kind==='classification'){
  validateHeader(s,['protocol','sourcePort','destinationPort','inputDscp','inputEcn']);
  if(!['tcp','udp','icmp'].includes(s.protocol))throw Error('Protocol must be tcp, udp, or icmp.');
  if(!intRange(s.sourcePort,0,65535)||!intRange(s.destinationPort,0,65535))throw Error('Ports must be integers from 0 to 65535.');
  if(s.protocol==='icmp'&&(s.sourcePort!==0||s.destinationPort!==0))throw Error('ICMP uses source and destination port 0 in this header contract.');
  let className='default',matchedRule='default';
  if(s.protocol==='udp'&&s.destinationPort>=16384&&s.destinationPort<=32767){className='voice';matchedRule='udp-destination-16384-32767';}
  else if(s.protocol==='tcp'&&s.destinationPort===443){className='interactive';matchedRule='tcp-destination-443';}
  const before=ds(s.inputDscp,s.inputEcn),after=ds(s.inputDscp,s.inputEcn);
  return {kind,className,matchedRule,protocol:s.protocol,sourcePort:s.sourcePort,destinationPort:s.destinationPort,inputDscp:s.inputDscp,outputDscp:s.inputDscp,inputEcn:s.inputEcn,outputEcn:s.inputEcn,before,after,limit:'Fixed ordered header rules only: UDP destination 16384–32767 → voice, then TCP destination 443 → interactive, otherwise default. Header fields do not authenticate application identity. No payload/DPI, packets, fragmentation, counters, scheduler, or forwarding are modeled.'};
 }
 if(kind==='marking'){
  validateHeader(s,['className','policy','trustBoundary','inputDscp','inputEcn']);
  if(!['voice','interactive','default'].includes(s.className))throw Error('Class must be voice, interactive, or default.');
  if(!['trusted-preserve','untrusted-zero','class-map'].includes(s.policy))throw Error('Choose trusted-preserve, untrusted-zero, or class-map policy.');
  if(typeof s.trustBoundary!=='boolean')throw Error('Trust boundary must be a boolean declaration.');
  if(s.policy==='trusted-preserve'&&!s.trustBoundary)throw Error('trusted-preserve requires trustBoundary=true.');
  const values={voice:46,interactive:18,default:0};
  const outputDscp=s.policy==='trusted-preserve'?s.inputDscp:s.policy==='untrusted-zero'?0:values[s.className];
  const before=ds(s.inputDscp,s.inputEcn),after=ds(outputDscp,s.inputEcn);
  return {kind,className:s.className,policy:s.policy,trustBoundary:s.trustBoundary,inputDscp:s.inputDscp,outputDscp,inputEcn:s.inputEcn,outputEcn:s.inputEcn,before,after,changed:before.field!==after.field,limit:'Local policy worksheet: trusted-preserve requires a declared trusted boundary; untrusted-zero sets DSCP to zero; class-map uses local values voice=46, interactive=18, default=0. All policies preserve the supplied ECN bits. No checksum update, tunnel propagation, CE marking, TCP congestion response, scheduler, automatic CoS mapping, forwarding or service guarantee is modeled.'};
 }
 throw Error('Choose classification or marking.');
}
function html(kind){
 if(kind==='classification')return '<section id="qc-tool" class="en-tool"><p class="kicker">FIXED HEADER RULES / LOCAL CLASS</p><h2>Which class matches these supplied headers?</h2><p>Ordered contract: UDP destination 16384–32767 → voice; TCP destination 443 → interactive; otherwise default. Incoming DSCP and ECN are displayed unchanged.</p><label for="qc-case">Supplied scenario</label><select id="qc-case"></select><fieldset><legend>Packet header declarations</legend><label for="qc-protocol">Protocol</label><select id="qc-protocol"><option value="tcp">TCP</option><option value="udp">UDP</option><option value="icmp">ICMP</option></select><label for="qc-sourcePort">Source port (ICMP uses 0)</label><input id="qc-sourcePort" type="number" min="0" max="65535" step="1"><label for="qc-destinationPort">Destination port (ICMP uses 0)</label><input id="qc-destinationPort" type="number" min="0" max="65535" step="1"><label for="qc-inputDscp">Input DSCP (0–63)</label><input id="qc-inputDscp" type="number" min="0" max="63" step="1"><label for="qc-inputEcn">Input ECN (0–3)</label><input id="qc-inputEcn" type="number" min="0" max="3" step="1"></fieldset><p id="qc-error" role="alert" hidden></p><div id="qc-output"><p id="qc-summary" aria-live="polite"></p><div class="en-scroll" role="region" aria-label="Classification result and DS field breakdown" tabindex="0"><table><thead><tr><th scope="col">Class</th><th scope="col">Matched rule</th><th scope="col">Input DSCP / ECN</th><th scope="col">Output DSCP / ECN</th><th scope="col">Input DS field</th><th scope="col">Output DS field</th></tr></thead><tbody id="qc-rows"></tbody></table></div><p id="qc-limit" class="en-note"></p></div><button id="qc-reset" type="button">Reset classification worksheet</button></section>';
 if(kind==='marking')return '<section id="qm-tool" class="en-tool"><p class="kicker">TRUST DECLARATION / LOCAL MARKING</p><h2>Which DSCP does this policy produce?</h2><p>Choose a local policy, class, trust declaration and incoming DSCP/ECN. ECN is preserved while the policy changes or retains DSCP.</p><label for="qm-case">Supplied scenario</label><select id="qm-case"></select><fieldset><legend>Marking policy declarations</legend><label for="qm-className">Class from classification stage</label><select id="qm-className"><option value="voice">voice</option><option value="interactive">interactive</option><option value="default">default</option></select><label for="qm-policy">Local policy</label><select id="qm-policy"><option value="trusted-preserve">trusted-preserve</option><option value="untrusted-zero">untrusted-zero</option><option value="class-map">class-map</option></select><label><input id="qm-trustBoundary" type="checkbox"> Input DSCP is trusted at this declared boundary</label><label for="qm-inputDscp">Input DSCP (0–63)</label><input id="qm-inputDscp" type="number" min="0" max="63" step="1"><label for="qm-inputEcn">Input ECN (0–3)</label><input id="qm-inputEcn" type="number" min="0" max="3" step="1"></fieldset><p id="qm-error" role="alert" hidden></p><div id="qm-output"><p id="qm-summary" aria-live="polite"></p><div class="en-scroll" role="region" aria-label="Before and after DS field breakdown" tabindex="0"><table><thead><tr><th scope="col">Stage</th><th scope="col">DSCP</th><th scope="col">DSCP bits</th><th scope="col">ECN</th><th scope="col">ECN bits</th><th scope="col">DS field value</th></tr></thead><tbody id="qm-rows"></tbody></table></div><p id="qm-limit" class="en-note"></p></div><button id="qm-reset" type="button">Reset marking worksheet</button></section>';
 return '';
}
function mount(kind){
 if(!KINDS.includes(kind))return;const prefix=kind==='classification'?'qc':'qm',el=id=>document.getElementById(prefix+'-'+id),select=el('case'),cs=catalog(kind);
 for(const c of cs){const o=document.createElement('option');o.value=c.id;o.textContent=c.title;select.append(o);}
 const keys=kind==='classification'?['protocol','sourcePort','destinationPort','inputDscp','inputEcn']:['className','policy','trustBoundary','inputDscp','inputEcn'];
 function input(){const s={};for(const k of keys){const n=el(k);s[k]=n.type==='checkbox'?n.checked:n.type==='number'?n.valueAsNumber:n.value;}return s;}
 function row(cells){const r=document.createElement('tr');for(const value of cells){const c=document.createElement('td');c.textContent=value;r.append(c);}return r;}
 function render(){try{if(!cs.some(c=>c.id===select.value))throw Error('Choose a listed scenario.');const v=evaluate(kind,input());el('error').hidden=true;el('output').hidden=false;
  if(kind==='classification'){el('summary').textContent='Class '+v.className+' · matched '+v.matchedRule+' · input DSCP '+v.inputDscp+' / ECN '+v.inputEcn+'; classification leaves them unchanged.';el('rows').replaceChildren(row([v.className,v.matchedRule,v.inputDscp+' ('+v.before.dscpBits+') / '+v.inputEcn+' ('+v.before.ecnBits+')',v.outputDscp+' ('+v.after.dscpBits+') / '+v.outputEcn+' ('+v.after.ecnBits+')',String(v.before.field),String(v.after.field)]));}
  else{el('summary').textContent='Policy '+v.policy+' · class '+v.className+' · DS field '+v.before.field+' → '+v.after.field+'; ECN '+v.inputEcn+' is preserved.';el('rows').replaceChildren(row(['Before',String(v.before.dscp),v.before.dscpBits,String(v.before.ecn),v.before.ecnBits,String(v.before.field)]),row(['After',String(v.after.dscp),v.after.dscpBits,String(v.after.ecn),v.after.ecnBits,String(v.after.field)]));}
  el('limit').textContent=v.limit;
 }catch(err){el('error').textContent=err.message;el('error').hidden=false;el('output').hidden=true;el('rows').replaceChildren();}}
 function load(){try{const s=preset(kind,select.value);for(const k of keys){const n=el(k);if(n.type==='checkbox')n.checked=s[k];else n.value=String(s[k]);}render();}catch(err){el('error').textContent=err.message;el('error').hidden=false;el('output').hidden=true;el('rows').replaceChildren();}}
 select.addEventListener('change',load);for(const k of keys){el(k).addEventListener('input',render);el(k).addEventListener('change',render);}el('reset').addEventListener('click',()=>{select.value=cs[0].id;load();});select.value=cs[0].id;load();
}
const api={catalog,preset,evaluate,html,mount};if(typeof module==='object'&&module.exports)module.exports=api;else root.QosLabelModels=api;
})(typeof window!=='undefined'?window:globalThis);
