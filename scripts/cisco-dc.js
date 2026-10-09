'use strict';
(() => {
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bool=(v,k)=>{if(typeof v[k]!=='boolean')throw Error(k+': choose true or false.');return v[k];};
const num=(v,k,min,max)=>{if(typeof v[k]!=='number'||!Number.isSafeInteger(v[k])||v[k]<min||v[k]>max)throw Error(k+': enter an integer from '+min+' through '+max+'.');return v[k];};
const choice=(v,k,opts)=>{if(!opts.includes(v[k]))throw Error(k+': choose a listed value.');return v[k];};
const rt=s=>{if(typeof s!=='string'||!/^\d{1,5}:\d{1,10}$/.test(s))throw Error('RT: use the taught 16-bit-ASN:32-bit-number form.');const [a,n]=s.split(':').map(Number);if(a>65535||n>4294967295)throw Error('RT component exceeds the taught form.');return a+':'+n;};
function evaluate(kind,v){
 if(!v||typeof v!=='object'||Array.isArray(v))throw Error('Provide a complete input record.');
 if(kind==='vpc'){
  const peer=bool(v,'peer'),keepalive=bool(v,'keepalive');
  return {state:peer?(keepalive?'coordinated':'degraded'):keepalive?'secondary-suspended':'indeterminate',rows:[['Peer link',String(peer)],['Keepalive',String(keepalive)],['Secondary vPC members',peer?'Eligible under stated assumptions':keepalive?'Normally suspended after detection':'Cannot determine from this snapshot']],note:'Both peers assumed alive and consistent. No timers, boot/recovery sequence or orphan-port prediction.'};
 }
 if(kind==='vni'){
  const localVlan=num(v,'localVlan',1,4094),remoteVlan=num(v,'remoteVlan',1,4094),localVNI=num(v,'localVNI',1,16777215),remoteVNI=num(v,'remoteVNI',1,16777215),same=localVNI===remoteVNI;
  return {same,rows:[['Local VLAN → L2 VNI',localVlan+' → '+localVNI],['Remote VLAN → L2 VNI',remoteVlan+' → '+remoteVNI],['Identifier mapping',same?'Same declared overlay identifier':'Different declared overlay identifiers']],note:'VLAN numbers are locally significant. This checks mapping consistency only, not EVPN import, routing, platform reserved values or observed isolation.'};
 }
 if(kind==='vxlan'){
  const inner=num(v,'inner',68,9000),mtu=num(v,'mtu',576,10000),ip=choice(v,'outer',['IPv4','IPv6']),tag=bool(v,'tag');
  const overhead=14+(tag?4:0)+8+8+(ip==='IPv4'?20:40),outer=inner+overhead;
  return {outer,overhead,fits:outer<=mtu,rows:[['Inner IP packet',inner+' bytes'],['Added bytes within outer IP',overhead+' bytes'],['Outer IP packet',outer+' bytes'],['Underlay IP MTU',mtu+' bytes'],['Maximum inner IP budget',mtu-overhead+' bytes']],note:outer<=mtu?'Fits this byte budget only; target path and hardware untested.':'Exceeds this declared IP MTU; do not infer automatic fragmentation or recovery.'};
 }
 if(kind==='evpn'){
  const session=bool(v,'session'),family=bool(v,'family'),present=bool(v,'present'),nextHop=bool(v,'nextHop'),exportRT=rt(v.exportRT),importRT=rt(v.importRT),rd=rt(v.rd);
  const imported=session&&family&&present&&exportRT===importRT,eligible=imported&&nextHop;
  return {imported,eligible,rows:[['Transport / EVPN family',session+' / '+family],['Route present',String(present)],['Export RT / import RT',exportRT+' / '+importRT],['RD (uniqueness only)',rd],['Import eligible',String(imported)],['Reachable next hop',String(nextHop)]],note:eligible?'Eligible in the single-route model; hardware installation and delivery remain untested.':'Not eligible for usable forwarding in this bounded model.'};
 }
 if(kind==='fabric'){
  const links=num(v,'links',1,16),lost=num(v,'lost',0,links),rate=num(v,'rate',1,1600),demand=num(v,'demand',0,100000),down=num(v,'down',1,100000),remaining=(links-lost)*rate;
  return {remaining,fits:remaining>0&&demand<=remaining,ratio:remaining?down/remaining:null,rows:[['Healthy uplink envelope',links*rate+' Gb/s'],['Surviving uplink envelope',remaining+' Gb/s'],['Declared inter-leaf demand',demand+' Gb/s'],['Downlink envelope',down+' Gb/s'],['Oversubscription',remaining?(down/remaining).toFixed(2)+':1':'No uplink']],note:remaining>0&&demand<=remaining?'Within aggregate envelope; no per-flow rate or measured performance implied.':'No adequate declared inter-leaf envelope for this demand.'};
 }
 if(kind==='aci'){
  for(const k of ['attachment','route','deployed','contract','apic'])bool(v,k);
  const port=num(v,'port',1,65535),allowedPort=num(v,'allowedPort',1,65535),allowed=v.attachment&&v.route&&v.deployed&&v.contract&&port===allowedPort;
  return {allowed,rows:[['Attachment and route',v.attachment+' / '+v.route],['Policy already deployed',String(v.deployed)],['Consumer/provider relationship',String(v.contract)],['Requested / permitted TCP destination',port+' / '+allowedPort],['APIC reachable',String(v.apic)],['Narrow policy outcome',allowed?'Permitted by stated relation':'Not permitted by stated relation']],note:'Enforced inter-EPG example only. Existing policy is supplied independently of APIC reachability. No session tracking, exceptions, service graphs or actual packet forwarding.'};
 }
 throw Error('Unknown model.');
}
const fields={
 vpc:[['peer','Peer link available','bool',true],['keepalive','Keepalive available','bool',true]],
 vni:[['localVlan','Local access VLAN','number',10],['remoteVlan','Remote access VLAN','number',110],['localVNI','Local L2 VNI','number',10100],['remoteVNI','Remote L2 VNI','number',10100]],
 vxlan:[['inner','Inner IP packet (bytes)','number',1500],['mtu','Underlay IP MTU (bytes)','number',1600],['outer','Outer base IP header','select',['IPv4','IPv6']],['tag','Retain one inner VLAN tag in this calculation','bool',false]],
 evpn:[['session','BGP transport ready','bool',true],['family','EVPN family ready','bool',true],['present','Synthetic route present','bool',true],['nextHop','Next hop reachable','bool',true],['exportRT','Advertised RT (16-bit-ASN:number)','text','65000:10100'],['importRT','Local import RT','text','65000:10100'],['rd','RD (simplified ASN:number)','text','65000:1']],
 fabric:[['links','Installed uplinks per leaf','number',2],['lost','Unavailable uplinks per leaf','number',0],['rate','Rate per uplink (Gb/s)','number',100],['demand','Inter-leaf demand (Gb/s)','number',150],['down','Aggregate downlinks (Gb/s)','number',1200]],
 aci:[['attachment','Correct EPG attachment','bool',true],['route','Required route available','bool',true],['deployed','Policy already deployed','bool',true],['contract','Consumer/provider contract matches','bool',true],['apic','APIC currently reachable','bool',true],['port','Requested TCP destination port','number',443],['allowedPort','Permitted TCP destination port','number',443]]};
const defaults=kind=>Object.fromEntries(fields[kind].map(([k,,t,d])=>[k,t==='select'?d[0]:d]));
const lesson=key=>Object.values(window.INFRA_BATCHES||{}).flat().find(l=>l.interactive===key);
function fabricDiagram(){
 const node=(x,y,w,label,detail)=>`<g><rect x="${x}" y="${y}" width="${w}" height="52" rx="6"/><text x="${x+w/2}" y="${y+21}" text-anchor="middle">${label}</text><text class="cdc-detail" x="${x+w/2}" y="${y+40}" text-anchor="middle">${detail}</text></g>`;
 return `<figure class="cdc-diagram"><div class="comparison-scroll" tabindex="0" role="region" aria-label="Two-spine four-leaf reference topology, scroll horizontally"><svg viewBox="0 0 800 430" role="img" aria-labelledby="cdc-map-title cdc-map-desc"><title id="cdc-map-title">Two spines, four leaves and declared endpoint attachments</title><desc id="cdc-map-desc">S1 and S2 each connect to L1 through L4: eight 100-Gb/s links with declared IP MTU 1600. Blue Web attaches to L1 and L2. Blue App and IP storage attach to L3 and L4. Firewall A attaches to L3 and Firewall B to L4. Dashed endpoint links are attachment intent, not a tested vPC or firewall failover.</desc><g class="cdc-links">${[270,530].flatMap(s=>[90,290,490,690].map(l=>`<path d="M${s} 82 L${l} 160"/>`)).join('')}</g><g class="cdc-links cdc-endpoint-links"><path d="M90 212L190 275M290 212L190 275M490 212V275M690 212V250H490V275M490 212V235H390V360M690 212V225H390V360M490 212V245H610V360M690 212V235H730V360"/></g>${node(205,30,130,'Spine S1','Underlay transit')}${node(465,30,130,'Spine S2','Underlay transit')}${[1,2,3,4].map((n,i)=>node(25+i*200,160,130,'Leaf L'+n,'VTEP .'+(10+n))).join('')}${node(110,275,160,'Blue Web','L1 / L2 attachment')}${node(410,275,160,'Blue App','L3 / L4 attachment')}${node(320,360,140,'IP storage','L3 / L4')}${node(555,360,110,'Firewall A','L3')}${node(675,360,110,'Firewall B','L4')}</svg></div><figcaption>Declared NX-OS alternative: 8 × 100-Gb/s leaf-spine links; each outer IP MTU 1600. Endpoint links are schematic attachment intent. Red Audit attaches to L2 (listed in the workbook). ACI uses the separate policy worksheet below and the mapping in the workbook.</figcaption></figure>`;
}
function html(key){if(typeof key!=='string'||!key.startsWith('cdc-'))return '';const l=lesson(key);if(!l?.ciscoDC)return '';const s=l.ciscoDC;
 return `<div id="cdc-tool" class="tool-panel"><p class="kicker">CISCO DATA CENTER · EVIDENCE WORKBENCH</p><h3>${esc(l.title)} incident rehearsal</h3><p>${esc(s.scope)}</p>${key==='cdc-lab-7'?fabricDiagram():''}<div class="cdc-stages" role="group" aria-label="Incident stage"><button type="button" data-cdc-stage="baseline" aria-pressed="true">Baseline</button><button type="button" data-cdc-stage="fault" aria-pressed="false">Fault</button><button type="button" data-cdc-stage="restore" aria-pressed="false">Recovery</button></div><p id="cdc-scenario" aria-live="polite"></p><label for="cdc-prediction">Your prediction and next observation</label><textarea id="cdc-prediction" rows="3" placeholder="Name the first failing boundary and evidence that would disprove your diagnosis."></textarea><button type="button" id="cdc-reveal">Reveal analyst note</button><p id="cdc-note" hidden></p>`+
 (fields[s.kind]?`<h4>Explore the bounded relation</h4><div class="cdc-fields">${fields[s.kind].map(([k,label,t,d])=>`<label for="cdc-${k}">${esc(label)}${t==='select'?`<select id="cdc-${k}">${d.map(x=>`<option>${esc(x)}</option>`).join('')}</select>`:`<input id="cdc-${k}" type="${t==='bool'?'checkbox':t==='number'?'number':'text'}" ${t==='bool'?(d?'checked':''):`value="${esc(d)}"`} ${t==='number'?'step="1"':''}>`}</label>`).join('')}</div><button type="button" id="cdc-reset">Reset model</button><p id="cdc-error" role="alert" hidden></p><div id="cdc-result" aria-live="polite"></div>`:'<p>Use the authored incident to practice evidence interpretation. This topic has no artificial numeric simulator.</p>')+'</div>';
}
function mount(key){const l=lesson(key),tool=document.getElementById('cdc-tool');if(!l?.ciscoDC||!tool)return;const s=l.ciscoDC;let stage='baseline';
 const change=x=>{if(!['baseline','fault','restore'].includes(x))return;stage=x;tool.querySelector('#cdc-scenario').textContent=s[x];tool.querySelector('#cdc-note').hidden=true;tool.querySelectorAll('[data-cdc-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.cdcStage===x)));};
 tool.querySelectorAll('[data-cdc-stage]').forEach(b=>b.addEventListener('click',()=>change(b.dataset.cdcStage)));
 tool.querySelector('#cdc-reveal').addEventListener('click',()=>{const n=tool.querySelector('#cdc-note');n.textContent=stage==='baseline'?'Record identity, time and the required observation before introducing a fault. '+l.mechanism[0]:stage==='fault'?'Fault analysis: '+s.fault+' Next evidence: '+s.restore:'Recovery is conditional on the stated evidence: '+s.restore+' The browser did not execute a device change.';n.hidden=false;});change(stage);
 if(!fields[s.kind])return;
 const update=()=>{const out=tool.querySelector('#cdc-result'),error=tool.querySelector('#cdc-error');try{const v={};for(const [k,,t]of fields[s.kind]){const el=tool.querySelector('#cdc-'+k);v[k]=t==='bool'?el.checked:t==='number'?(el.value.trim()===''?NaN:Number(el.value)):el.value;}const r=evaluate(s.kind,v);out.innerHTML=`<div class="comparison-scroll" tabindex="0" role="region" aria-label="Model evidence table"><table><thead><tr><th scope="col">Boundary</th><th scope="col">Calculated or supplied result</th></tr></thead><tbody>${r.rows.map(([a,b])=>`<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div><p>${esc(r.note)}</p>`;out.hidden=false;error.hidden=true;error.textContent='';}catch(e){out.hidden=true;out.textContent='';error.hidden=false;error.textContent=e.message;}};
 for(const [k]of fields[s.kind])tool.querySelector('#cdc-'+k).addEventListener('input',update);
 tool.querySelector('#cdc-reset').addEventListener('click',()=>{const d=defaults(s.kind);for(const [k,,t]of fields[s.kind]){const el=tool.querySelector('#cdc-'+k);if(t==='bool')el.checked=d[k];else el.value=d[k];}update();});update();
}
window.CiscoDC={evaluate,defaults,html,mount};
})();
