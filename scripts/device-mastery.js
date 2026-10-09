'use strict';
(() => {
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const gates={identity:'Exact platform identity recorded',compatibility:'Supported combination evidenced',baseline:'Current baseline preserved',recovery:'Independent recovery path ready',service:'Positive and negative service tests recorded'};
 function evaluate(v){
  if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).length!==5||Object.keys(gates).some(k=>!Object.hasOwn(v,k)||!['pass','fail','unknown'].includes(v[k])))throw Error('Supply all five gates as pass, fail or unknown.');
  const failed=Object.keys(gates).filter(k=>v[k]==='fail'),unknown=Object.keys(gates).filter(k=>v[k]==='unknown');
  return {eligible:!failed.length&&!unknown.length,failed,unknown};
 }
 const lesson=kind=>typeof kind==='string'&&kind.startsWith('dm-')?(window.INFRA_BATCHES?.['25']||[]).find(l=>'dm-'+l.id===kind):null;
 function html(kind){const l=lesson(kind);if(!l)return '';return `<div class="callout" id="dm-tool"><h3>Device incident rehearsal</h3><p>Authored evidence, not a connected Cisco device. ${esc(l.deviceCase.scope)}</p><div class="flow-controls">${['baseline','fault','restore'].map((s,i)=>`<button data-dm-stage="${s}" aria-pressed="${i===0}">${['Baseline','Fault','Recovery'][i]}</button>`).join('')}</div><p id="dm-scenario" aria-live="polite"></p><label for="dm-prediction">Predict the failed boundary and next observation</label><textarea id="dm-prediction" rows="3"></textarea><button id="dm-reveal">Reveal reasoning</button><p id="dm-reason" hidden></p><h4>Separate declared-evidence checklist</h4><p>These values are your declarations. The worksheet cannot discover compatibility or verify a target. Unknown evidence blocks eligibility.</p><fieldset><legend>Evidence gates</legend>${Object.entries(gates).map(([k,label])=>`<p><label for="dm-${k}">${label}</label><select id="dm-${k}"><option value="unknown">Unknown</option><option value="pass">Pass, evidenced</option><option value="fail">Fail</option></select></p>`).join('')}</fieldset><p id="dm-result" aria-live="polite"></p><button id="dm-reset">Reset declarations</button></div>`;}
 function mount(kind){const l=lesson(kind),root=document.getElementById('dm-tool');if(!l||!root)return;const el=k=>root.querySelector('#dm-'+k);let stage='baseline';
 const change=s=>{stage=s;el('scenario').textContent=l.deviceCase[s];el('reason').hidden=true;root.querySelectorAll('[data-dm-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dmStage===s)));};
 root.querySelectorAll('[data-dm-stage]').forEach(b=>b.addEventListener('click',()=>change(b.dataset.dmStage)));
 el('reveal').addEventListener('click',()=>{el('reason').textContent=stage==='baseline'?l.mechanism.join(' '):l.deviceCase.restore+' This is authored reasoning; target execution remains unverified.';el('reason').hidden=false;});
 const update=()=>{const r=evaluate(Object.fromEntries(Object.keys(gates).map(k=>[k,el(k).value])));el('result').textContent=r.eligible?'Eligible by your declarations only; no device action or verification occurred.':'Blocked by declarations. Failed: '+(r.failed.map(k=>gates[k]).join('; ')||'none')+'. Unknown: '+(r.unknown.map(k=>gates[k]).join('; ')||'none')+'.';};
 Object.keys(gates).forEach(k=>el(k).addEventListener('change',update));el('reset').addEventListener('click',()=>{Object.keys(gates).forEach(k=>el(k).value='unknown');el('prediction').value='';change('baseline');update();});change(stage);update();
 }
 window.DeviceMastery={evaluate,html,mount};
})();
