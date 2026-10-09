'use strict';
(() => {
const modes=['active','passive','desirable','auto'];
const label=m=>['active','passive'].includes(m)?'LACP '+m:'PAgP '+m;
function pairing(a,b,carrier=true,compatible=true,partner=true){
 if(!modes.includes(a)||!modes.includes(b)||[carrier,compatible,partner].some(x=>typeof x!=='boolean'))throw new RangeError('Unsupported mode or nonboolean assumption');
 const protocolA=['active','passive'].includes(a)?'LACP':'PAgP',protocolB=['active','passive'].includes(b)?'LACP':'PAgP';
 const same=protocolA===protocolB,initiated=same&&(a==='active'||b==='active'||a==='desirable'||b==='desirable');
 const reasons=[];
 if(!carrier)reasons.push('The selected member pair lacks usable physical carrier.');
 if(!same)reasons.push('LACP and PAgP do not negotiate with each other.');
 else if(!initiated)reasons.push('Neither selected peer initiates this protocol negotiation.');
 if(!compatible)reasons.push('Selected member/role settings are incompatible.');
 if(!partner)reasons.push('The selected links do not belong to the intended consistent partner system/group.');
 const eligible=carrier&&initiated&&compatible&&partner;
 return {protocolA,protocolB,modePair:initiated,eligible,reasons,conclusion:eligible?'Eligible under the stated teaching assumptions. Actual exchange, synchronization, member selection, collecting/distributing, logical state and service remain unproven.':'Not eligible under the stated teaching assumptions. This does not predict whether a real unsupported member is suspended, individual, blocked or otherwise handled.'};
}
function html(kind){if(!['lacp-pair','pagp-pair'].includes(kind))return '';const lacp=kind==='lacp-pair',local=lacp?['active','passive']:['desirable','auto'];return `<div class="calculator service-tool" id="aggregation-tool"><p class="kicker">INTERACTIVE / ${lacp?'LACP':'PAgP'} PAIRING</p><h3>Compatible intent is an early checkpoint</h3><p class="small">Selected normal responsive-peer context; prerequisite flags are teaching assumptions. No packets, timers, keys, priorities, hashing or actual member states are simulated. Static on, standalone and PAgP silent-partner behavior are excluded.</p><label for="aggregation-local">Local mode</label><select id="aggregation-local">${local.map(m=>`<option value="${m}">${label(m)}</option>`).join('')}</select><label for="aggregation-peer">Peer mode</label><select id="aggregation-peer">${modes.map(m=>`<option value="${m}" ${m===(lacp?'passive':'auto')?'selected':''}>${label(m)}</option>`).join('')}</select><label><input id="aggregation-carrier" type="checkbox" checked> Selected pair has usable carrier</label><label><input id="aggregation-compatible" type="checkbox" checked> Member and role settings are compatible</label><label><input id="aggregation-partner" type="checkbox" checked> Links belong to intended consistent partner/group</label><p id="aggregation-status" aria-live="polite"></p><ul id="aggregation-reasons"></ul><p id="aggregation-conclusion"></p><button id="aggregation-reset">Reset pairing</button></div>`;}
function mount(kind){if(!['lacp-pair','pagp-pair'].includes(kind))return;const el=id=>document.getElementById('aggregation-'+id),update=()=>{const r=pairing(el('local').value,el('peer').value,el('carrier').checked,el('compatible').checked,el('partner').checked);el('status').textContent=`${r.protocolA} / ${r.protocolB}: ${r.eligible?'eligible':'not eligible'} in this teaching model.`;el('conclusion').textContent=r.conclusion;el('reasons').replaceChildren(...r.reasons.map(reason=>{const li=document.createElement('li');li.textContent=reason;return li;}));};for(const id of ['local','peer','carrier','compatible','partner'])el(id).addEventListener('change',update);el('reset').addEventListener('click',()=>{const lacp=kind==='lacp-pair';el('local').value=lacp?'active':'desirable';el('peer').value=lacp?'passive':'auto';for(const id of ['carrier','compatible','partner'])el(id).checked=true;update();});update();}
window.AggregationModels={pairing,html,mount};
})();
