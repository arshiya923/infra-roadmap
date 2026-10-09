'use strict';
(() => {
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const stateHTML=s=>`<h4>${esc(s.name)}</h4><ul>${s.evidence.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p><strong>Interpretation.</strong> ${esc(s.interpretation)}</p><p><strong>Next observation.</strong> ${esc(s.next)}</p>`;
 function html(lesson){
  const r=lesson.rehearsal;if(!r)return '';
  return `<div class="lab" id="expansion-desk"><h3>Incident evidence desk</h3><p>${esc(r.scope)}</p><div class="flow-controls" role="group" aria-label="Incident phase">${r.states.map((s,i)=>`<button data-phase="${i}" aria-pressed="${i===0}">${esc(s.name)}</button>`).join('')}<button id="incident-reset">Reset incident</button></div><div id="incident-evidence" aria-live="polite">${stateHTML(r.states[0])}</div><details><summary>Read all incident evidence without controls</summary>${r.states.map(stateHTML).join('')}</details></div>`;
 }
 function mount(lesson){
  if(!lesson.rehearsal)return;
  const root=document.getElementById('expansion-desk');
  function select(i){root.querySelectorAll('[data-phase]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.phase)===i)));root.querySelector('#incident-evidence').innerHTML=stateHTML(lesson.rehearsal.states[i]);}
  root.querySelectorAll('[data-phase]').forEach(b=>b.onclick=()=>select(Number(b.dataset.phase)));
  root.querySelector('#incident-reset').onclick=()=>select(0);
 }
 window.Expansion={html,mount};
})();
