'use strict';
(() => {
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lesson = kind => typeof kind === 'string' && kind.startsWith('tm-') ? window.INFRA_BATCHES?.['27']?.find(l => 'tm-'+l.id === kind) : null;
function html(kind) {
 const l = lesson(kind); if (!l) return '';
 const c = l.incident;
 return `<div class="calculator service-tool" id="tm-tool"><p class="kicker">SYNTHETIC INCIDENT / EVIDENCE DESK</p><h3>${esc(c.boundary)}</h3><p>${esc(c.scope)}</p><div class="flow-controls">${['baseline','fault','recovery'].map((s,i)=>`<button data-tm-stage="${s}" aria-pressed="${i===0}">${['Baseline','Fault','Recovery'][i]}</button>`).join('')}</div><p id="tm-observation" aria-live="polite"></p><label for="tm-prediction">Your hypothesis and the observation that could disprove it</label><textarea id="tm-prediction" rows="3"></textarea><button id="tm-reveal">Reveal diagnostic reasoning</button><div id="tm-reasoning" hidden><h4>Discriminating test</h4><p>${esc(c.test)}</p><h4>Interpretation</h4><p>${esc(c.diagnosis)}</p><h4>Competing explanation</h4><p>${esc(c.alternative)}</p><h4>Change guard</h4><p>${esc(c.guard)}</p></div><button id="tm-reset">Reset case</button><details><summary>Static case record</summary>${['baseline','fault','test','diagnosis','alternative','guard','recovery'].map(k=>`<h4>${esc(k[0].toUpperCase()+k.slice(1))}</h4><p>${esc(c[k])}</p>`).join('')}</details></div>`;
}
function mount(kind) {
 const l = lesson(kind), root = document.getElementById('tm-tool'); if (!l || !root) return;
 const change = stage => {
  root.querySelector('#tm-observation').textContent = l.incident[stage];
  root.querySelector('#tm-reasoning').hidden = true;
  root.querySelectorAll('[data-tm-stage]').forEach(b=>b.setAttribute('aria-pressed', String(b.dataset.tmStage===stage)));
 };
 root.querySelectorAll('[data-tm-stage]').forEach(b=>b.addEventListener('click',()=>change(b.dataset.tmStage)));
 root.querySelector('#tm-reveal').addEventListener('click',()=>{root.querySelector('#tm-reasoning').hidden=false;});
 root.querySelector('#tm-reset').addEventListener('click',()=>{root.querySelector('#tm-prediction').value='';change('baseline');});
 change('baseline');
}
window.TroubleshootingMastery = {html, mount};
})();
