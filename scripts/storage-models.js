'use strict';
(() => {
// Authored inventory; decimal MB for every size. Never reads or changes storage.
const inventory=[
 {id:'manifest',name:'packages.conf',mb:1,protected:true,reason:'Selected boot manifest'},
 {id:'active',name:'active-package-set',mb:800,protected:true,reason:'Dependencies of selected manifest'},
 {id:'rollback',name:'rollback-image.bin',mb:700,protected:true,reason:'Retained recovery artifact in this plan'},
 {id:'evidence',name:'incident-evidence',mb:100,protected:true,reason:'Unexported incident evidence'},
 {id:'stale',name:'reviewed-stale-copy.bin',mb:400,protected:false,reason:'Confirmed unused in this synthetic case'},
 {id:'unknown',name:'unclassified.bin',mb:300,protected:true,reason:'Dependency and retention status unknown'}
];
function plan(selected,known=true){
 if(!Array.isArray(selected)||typeof known!=='boolean'||selected.some(id=>!inventory.some(x=>x.id===id)))throw new RangeError('Unknown inventory selection');
 const ids=new Set(selected),blocked=inventory.filter(x=>ids.has(x.id)&&x.protected).map(x=>x.id);
 const reclaimed=inventory.filter(x=>ids.has(x.id)&&!x.protected).reduce((n,x)=>n+x.mb,0);
 const capacity=3200,used=inventory.reduce((n,x)=>n+x.mb,0),free=capacity-used;
 const available=free+reclaimed,required=known?1100:null;
 return {capacity,used,free,reclaimed,available,required,blocked,
  verdict:blocked.length?'Protected/unknown selection: revise plan.':!known?'Requirements unknown: readiness unresolved.':available>=required?'Teaching capacity check fits; deployment readiness remains unproven.':'Teaching capacity check short by '+(required-available)+' MB.'};
}
function html(kind){if(kind!=='storage-plan')return '';return `<div class="calculator service-tool" id="storage-tool"><p class="kicker">INTERACTIVE / DRY-RUN INVENTORY</p><h3>Make space without losing the recovery path</h3><p class="small">Synthetic 3,200 MB filesystem, decimal MB. No host files are inspected or deleted. This plan retains rollback and incident evidence; their real retention policy must be established separately.</p><fieldset><legend>Propose cleanup candidates</legend>${inventory.map(x=>`<label class="small"><input type="checkbox" name="storage-candidate" value="${x.id}"> ${x.name} · ${x.mb} MB — ${x.reason}</label>`).join('')}</fieldset><label for="storage-requirements">Peak additional space estimate</label><select id="storage-requirements"><option value="known">Known teaching estimate: 600 MB staging + 400 MB expansion + 100 MB reserve</option><option value="unknown">Actual requirements not established</option></select><p id="storage-space" aria-live="polite"></p><p id="storage-verdict" aria-live="polite"></p><button id="storage-reset">Reset plan</button><p class="small">A fit does not establish signature, platform compatibility, install support, member readiness or service recovery. No deletion command is generated.</p></div>`;}
function mount(kind){if(kind!=='storage-plan')return;const el=id=>document.getElementById('storage-'+id),boxes=[...document.querySelectorAll('[name="storage-candidate"]')];const update=()=>{const r=plan(boxes.filter(b=>b.checked).map(b=>b.value),el('requirements').value==='known');el('space').textContent=`Initial free: ${r.free} MB. Eligible proposed reclamation: ${r.reclaimed} MB. Hypothetical available: ${r.available} MB. ${r.required===null?'Required space unknown.':'Peak additional estimate: '+r.required+' MB.'}`;el('verdict').textContent=r.verdict;};boxes.forEach(b=>b.addEventListener('change',update));el('requirements').addEventListener('change',update);el('reset').addEventListener('click',()=>{boxes.forEach(b=>b.checked=false);el('requirements').value='known';update();});update();}
window.StorageModels={plan,html,mount};
})();
