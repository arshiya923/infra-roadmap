'use strict';
(()=>{
const ids=['established','late','failover','recovered','cold','tie','zero','single','lone','bdr-failure','rib','forward','return'];
const names=['R1','R2','R3','R4'],flags=['ribReady','forwardReady','returnReady'];
function scenario(id){
 if(!ids.includes(id))throw new RangeError('Choose an authored DR/BDR case');
 const s={priorities:[100,50,0,200],events:[1,3,7,15,14,15],ribReady:true,forwardReady:true,returnReady:true};
 if(id==='established')s.events=[1,3,7];
 if(id==='late')s.events=[1,3,7,15];
 if(id==='failover')s.events=[1,3,7,15,14];
 if(['cold','tie','zero','single'].includes(id))s.events=[15];
 if(id==='tie')s.priorities=[1,1,1,1];
 if(id==='zero')s.priorities=[0,0,0,0];
 if(id==='single')s.priorities=[100,0,0,0];
 if(id==='lone')s.events=[1];
 if(id==='bdr-failure')s.events=[1,3,7,15,13];
 if(id==='rib')s.ribReady=false;
 if(id==='forward')s.forwardReady=false;
 if(id==='return')s.returnReady=false;
 return s;
}
// Settled, mutually bidirectional broadcast segment only. A departed attachment
// loses its declaration before rejoining. No conflicting DR declarations or FSM.
function evaluate(s){
 if(!s||!Array.isArray(s.priorities)||s.priorities.length!==4||Array.from(s.priorities).some(p=>!Number.isInteger(p)||p<0||p>255)||!Array.isArray(s.events)||!s.events.length||s.events.length>16||Array.from(s.events).some(m=>!Number.isInteger(m)||m<0||m>15)||flags.some(k=>typeof s[k]!=='boolean'))throw new RangeError('Supply four whole priorities 0–255, 1–16 presence masks 0–15 and boolean readiness declarations');
 let dr=null,bdr=null,previous=0;
 const history=s.events.map((mask,event)=>{
  const present=i=>!!(mask&(1<<i)),eligible=i=>i!==null&&present(i)&&s.priorities[i]>0;
  const rank=[0,1,2,3].filter(eligible).sort((a,b)=>s.priorities[b]-s.priorities[a]||b-a);
  if(!eligible(dr))dr=eligible(bdr)?bdr:null;
  if(!eligible(bdr)||bdr===dr)bdr=null;
  if(dr===null)dr=rank[0]??null;
  if(bdr===null)bdr=rank.find(i=>i!==dr)??null;
  const roles=names.map((_,i)=>!present(i)?'Absent':i===dr?'DR':i===bdr?'BDR':'DROther');
  const pairs=[];
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++)pairs.push({a:names[a],b:names[b],state:!present(a)||!present(b)?'Absent':a===dr||b===dr||a===bdr||b===bdr?'Full':'2-Way'});
  const attached=dr===null?[]:names.flatMap((_,i)=>present(i)?[`${i+1}.${i+1}.${i+1}.${i+1}`]:[]);
  const type2=attached.length>1?{linkStateId:`192.0.2.${dr+1}`,advertisingRouter:`${dr+1}.${dr+1}.${dr+1}.${dr+1}`,mask:'/24',attached}:null;
  const arrived=names.filter((_,i)=>present(i)&&!(previous&(1<<i))),departed=names.filter((_,i)=>!present(i)&&!!(previous&(1<<i)));
  const change=[arrived.length?'Arrive '+arrived.join(', '):'',departed.length?'Reset/down '+departed.join(', '):''].filter(Boolean).join('; ')||'Same attachments';
  previous=mask;
  return {event,mask,change,dr:dr===null?null:names[dr],bdr:bdr===null?null:names[bdr],roles,pairs,type2};
 });
 const current=history[history.length-1],peersPresent=(current.mask&12)===12;
 return {history,current,peersPresent,possible:peersPresent&&current.dr!==null&&flags.every(k=>s[k])};
}
const labels=['R1 establishes DR; R2 and R3 arrive','Higher-priority R4 arrives late','R1 attachment down/reset','R1 rejoins after reset','All four initially available, no incumbents','Equal priorities, no incumbents','All priorities zero','One eligible router, four participants','R1 alone: DR with no neighbor','Existing BDR R2 attachment down/reset','Rejoined segment, RIB readiness absent','Rejoined segment, forward readiness absent','Rejoined segment, return readiness absent'];
const map=`<svg viewBox="0 0 700 280" role="img" aria-labelledby="dr-map-title dr-map-desc"><title id="dr-map-title">Four router attachments to one broadcast segment</title><desc id="dr-map-desc">Fixed router IDs one through four and LAN addresses 192.0.2.1 through four. Each box shows its calculated settled role. Lines are attachments, not packet paths.</desc><path d="M65 205 H635" stroke="var(--accent)" stroke-width="5"/><text x="350" y="245" fill="var(--ink)" text-anchor="middle" font-size="16">Broadcast LAN · 192.0.2.0/24 · area 0</text>${names.map((name,i)=>{const x=15+i*175;return `<g data-router="${i}"><path d="M${x+75} 145 V205" fill="none" stroke="var(--accent)" stroke-width="3"/><rect x="${x}" y="20" width="150" height="125" rx="8" fill="var(--paper)" stroke="var(--line)"/><g fill="var(--ink)" font-size="15" text-anchor="middle"><text x="${x+75}" y="48">${name} · RID ${i+1}.${i+1}.${i+1}.${i+1}</text><text x="${x+75}" y="76" id="dr-role-${i}"></text><text x="${x+75}" y="103" id="dr-priority-${i}"></text><text x="${x+75}" y="130">LAN 192.0.2.${i+1}</text></g></g>`;}).join('')}</svg>`;
function html(kind){if(kind!=='ospf-dr-bdr')return '';return `<div class="calculator service-tool" id="dr-tool"><p class="kicker">INTERACTIVE / ELECTION HISTORY</p><h3>Replay arrivals, failure and rejoining</h3><p>Change the event history to see why the highest-priority router does not always become DR. Priority zero makes a router ineligible for DR and BDR; it can still form adjacencies with them.</p><p class="small">Bounded settled-state teaching model: one healthy broadcast segment, fixed unique router IDs, mutually bidirectional participants and consistent incumbent declarations. A down attachment resets its declaration before return. No Hello/dead/wait timers, neighbor FSM, flooding, LSA aging, partitions or conflicting DR declarations are simulated. Every input change replays the selected timeline from scratch; it does not alter a live router's priority.</p><label for="dr-case">Authored event history</label><select id="dr-case">${ids.map((id,i)=>`<option value="${id}">${labels[i]}</option>`).join('')}</select><fieldset><legend>Interface priorities · whole numbers 0–255</legend><div class="dr-priorities">${names.map((n,i)=>`<label for="dr-p${i}">${n} · fixed RID ${i+1}.${i+1}.${i+1}.${i+1}<input id="dr-p${i}" type="number" min="0" max="255" step="1"></label>`).join('')}</div></fieldset><fieldset><legend>Independent R3 ↔ R4 readiness declarations</legend>${[['ribReady','Peer-loopback OSPF routes declared selected and installed in both directions'],['forwardReady','Forward data plane and policy declared ready'],['returnReady','Return data plane, policy and original service declared ready']].map(([k,l])=>`<label><input id="dr-${k}" type="checkbox"> ${l}</label>`).join('')}</fieldset><p id="dr-error" role="alert" hidden></p><div id="dr-output" aria-live="polite"><h3 id="dr-choice"></h3><p id="dr-status"></p><div id="dr-topology" role="region" tabindex="0" aria-label="Broadcast role topology, scroll horizontally if needed">${map}</div><h3>Settled event history</h3><p class="small">Rows are consecutive settled results. An arriving router does not displace a healthy incumbent. If the DR departs, an eligible incumbent BDR promotes first; a new BDR fills the vacancy.</p><div class="table-wrap" role="region" tabindex="0" aria-label="Election history, scroll horizontally if needed"><table><thead><tr><th>Event</th><th>Attachment change</th><th>DR / BDR</th><th>R1 / R2 / R3 / R4 roles</th></tr></thead><tbody id="dr-history"></tbody></table></div><h3>Expected neighbor relationships at the last event</h3><p class="small">Full and 2-Way below are expected settled relationships under the model assumptions, not observed CLI output. Two DROthers normally stay 2-Way with each other on this broadcast segment.</p><div class="table-wrap" role="region" tabindex="0" aria-label="Broadcast neighbor pairs, scroll horizontally if needed"><table><thead><tr><th>Router pair</th><th>Expected state</th><th>Reason</th></tr></thead><tbody id="dr-pairs"></tbody></table></div><h3>Current-DR network-LSA identity template</h3><p id="dr-lsa"></p><p class="small">This is a structural template after complete adjacency synchronization, not an emitted LSDB. A lone DR with no Full neighbor does not originate a network LSA. Old DR LSAs are not modeled; the actual lab can retain them during change.</p><h3>Roles and packet forwarding</h3><p id="dr-service"></p><p>The R3 ↔ R4 peer-loopback path in the actual lab uses the other peer's LAN IP as its next hop. DR/BDR organize protocol adjacency and flooding; the role does not require data traffic to use them as forwarding relays. This explorer does not compute a RIB, transmit packets or certify a transaction.</p></div><button id="dr-reset">Reset election exercise</button></div>`;}
function mount(kind){if(kind!=='ospf-dr-bdr')return;const el=k=>document.getElementById('dr-'+k);let events;
 const row=cells=>{const tr=document.createElement('tr');cells.forEach((v,i)=>{const cell=document.createElement(i?'td':'th');if(!i)cell.scope='row';cell.textContent=v;tr.append(cell);});return tr;};
 const update=()=>{try{
  const priorities=names.map((_,i)=>{const raw=el('p'+i).value;if(!/^\d{1,3}$/.test(raw))throw new RangeError('Enter whole priorities from 0 to 255');return Number(raw);});
  const r=evaluate({priorities,events,...Object.fromEntries(flags.map(k=>[k,el(k).checked]))}),c=r.current;
  el('error').hidden=true;el('output').hidden=false;
  el('choice').textContent=`Settled DR: ${c.dr||'None'} · BDR: ${c.bdr||'None'}`;
  el('status').textContent=c.dr?'Current roles follow this replayed event history; priorities rank eligible routers only when a vacancy needs filling.':'No eligible DR in the last event. Bidirectional discovery alone does not create Full adjacencies between DROthers.';
  el('history').replaceChildren(...r.history.map(h=>row([String(h.event+1),h.change,`${h.dr||'None'} / ${h.bdr||'None'}`,h.roles.join(' / ')])));
  el('pairs').replaceChildren(...c.pairs.map(p=>row([`${p.a} ↔ ${p.b}`,p.state,p.state==='Absent'?'At least one attachment is absent':p.state==='Full'?'At least one peer is DR or BDR':'Both peers are DROthers'])));
  el('lsa').textContent=c.type2?`Link-state ID ${c.type2.linkStateId} · advertising router ${c.type2.advertisingRouter} · mask ${c.type2.mask} · attached RIDs ${c.type2.attached.join(', ')}`:'No current-DR network-LSA template: no elected DR with a Full neighbor.';
  el('service').textContent=r.possible?'R3 ↔ R4 original exchange possible under all supplied declarations; no transaction has been measured.':!r.peersPresent?'R3 ↔ R4 original exchange not established: at least one participant is absent.':c.dr===null?'R3 ↔ R4 OSPF prefix-exchange readiness not established: no eligible DR.':'R3 ↔ R4 original exchange not established: at least one independent RIB, forward or return declaration is absent.';
  names.forEach((_,i)=>{el('role-'+i).textContent=c.roles[i];el('priority-'+i).textContent='Priority '+priorities[i];const g=el('topology').querySelector(`[data-router="${i}"]`);g.querySelector('path').setAttribute('stroke-dasharray',c.roles[i]==='Absent'?'6 5':'none');g.querySelector('rect').setAttribute('fill',['DR','BDR'].includes(c.roles[i])?'var(--soft)':'var(--paper)');});
 }catch(error){el('error').textContent=error.message;el('error').hidden=false;el('output').hidden=true;}};
 const load=()=>{try{const s=scenario(el('case').value);events=s.events;names.forEach((_,i)=>el('p'+i).value=String(s.priorities[i]));flags.forEach(k=>el(k).checked=s[k]);update();}catch(error){el('error').textContent=error.message;el('error').hidden=false;el('output').hidden=true;}};
 el('case').addEventListener('change',load);names.forEach((_,i)=>el('p'+i).addEventListener('input',update));flags.forEach(k=>el(k).addEventListener('change',update));el('reset').addEventListener('click',()=>{el('case').value='established';load();});load();
}
const api={scenario,evaluate,html,mount};if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.OspfDrBdrModels=api;
})();
