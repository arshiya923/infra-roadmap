(function(root){'use strict';
// One supplied IPv4 eBGP candidate. Declarations are not live device observations.
const fields=['origin','exportPermit','established','importPermit','ownAsPresent','nextHopResolved','systemSelect','forwardReady','returnReady'];
const labels=['Sender originates 198.51.100.0/24','Sender export permits that exact prefix','Session is declared Established','Receiver import permits that exact prefix','Received ordinary AS_SEQUENCE includes local AS 65001','NEXT_HOP has declared usable resolution','System selects this BGP route','Forward path and endpoint are declared ready','Opposite direction is declared ready'];
const base={origin:true,exportPermit:true,established:true,importPermit:true,ownAsPresent:false,nextHopResolved:true,systemSelect:true,forwardReady:true,returnReady:true};
const cases=[
 ['baseline','All supplied gates ready',{}],
 ['origin','Sender withdraws this origin',{origin:false}],
 ['export','Sender export rejects this prefix',{exportPermit:false}],
 ['session','Session is not Established',{established:false}],
 ['import','Receiver import rejects this prefix',{importPermit:false}],
 ['loop','Received ordinary path includes local AS',{ownAsPresent:true}],
 ['resolution','Admitted route, unresolved NEXT_HOP',{nextHopResolved:false}],
 ['selection','Usable candidate, other system source selected',{systemSelect:false}],
 ['forward','Installed declaration, downstream unavailable',{forwardReady:false}],
 ['return','One direction ready, opposite direction unavailable',{returnReady:false}]
];
function catalog(){return cases.map(([id,title])=>({id,title}));}
function preset(id){const c=cases.find(x=>x[0]===id);if(!c)throw Error('Choose a listed scenario.');return {...base,...c[2]};}
function evaluate(input){if(!input||fields.some(k=>typeof input[k]!=='boolean')||Object.keys(input).some(k=>!fields.includes(k)))throw Error('Use exactly the nine declared boolean gates.');
 const trace=[];let proceeding=true;
 const gates=[['Origin',input.origin],['Export policy',input.exportPermit],['Established session',input.established],['Import policy',input.importPermit],['Ordinary AS-loop check',!input.ownAsPresent],['NEXT_HOP resolution',input.nextHopResolved],['System selection',input.systemSelect]];
 for(const [gate,pass] of gates){trace.push({gate,status:proceeding?(pass?'Pass':'Blocked'):'Not evaluated'});if(proceeding&&!pass)proceeding=false;}
 const received=input.origin&&input.exportPermit&&input.established,admitted=received&&input.importPermit&&!input.ownAsPresent,eligible=admitted&&input.nextHopResolved,installed=eligible&&input.systemSelect;
 return {prefix:'198.51.100.0/24',localAs:65001,remoteAs:65002,path:input.ownAsPresent?'65002 65001':'65002',trace,received,admitted,eligible,installed,exchangePermittedByDeclarations:installed&&input.forwardReady&&input.returnReady,limit:'Supplied declaration worksheet only: one ordinary AS_SEQUENCE, no loop exceptions/confederations, cached stale routes, refresh/replay, route servers, full best-path/FSM or actual installation. Read both real observers separately. Forward/return gates never change candidate admission. Predicted prerequisite agreement is not a measured service result.'};
}
function html(kind){if(kind!=='ebgp-policy')return '';return `<section id="ep-tool" class="en-tool"><p class="kicker">ONE PREFIX / ONE EXTERNAL CANDIDATE</p><h2>Where is this eBGP prefix blocked?</h2><p>R2 AS65002 supplies 198.51.100.0/24 to R1 AS65001. Toggle declared prerequisites; this worksheet sends no update and observes no router.</p><label for="ep-case">Supplied scenario</label><select id="ep-case"></select><fieldset><legend>Independent declarations</legend>${fields.map((f,i)=>`<label><input id="ep-${f}" type="checkbox"> ${labels[i]}</label>`).join('')}</fieldset><p id="ep-error" role="alert" hidden></p><div id="ep-output"><p id="ep-path"></p><div class="en-scroll" role="region" aria-label="Ordered eBGP prefix admission gates" tabindex="0"><table><thead><tr><th scope="col">Gate</th><th scope="col">Declared result</th></tr></thead><tbody id="ep-trace"></tbody></table></div><p id="ep-summary" aria-live="polite"></p><p id="ep-exchange"></p><p id="ep-limit" class="en-note"></p></div><button id="ep-reset" type="button">Reset external-prefix worksheet</button></section>`;}
function mount(kind){if(kind!=='ebgp-policy')return;const el=id=>document.getElementById('ep-'+id),select=el('case');for(const c of catalog()){const o=document.createElement('option');o.value=c.id;o.textContent=c.title;select.append(o);}
 function render(){try{if(!catalog().some(c=>c.id===select.value))throw Error('Choose a listed scenario.');const v=evaluate(Object.fromEntries(fields.map(k=>[k,el(k).checked])));el('error').hidden=true;el('output').hidden=false;el('path').textContent=`${v.prefix} · supplied path declaration ${v.path} · local AS ${v.localAs}`;el('trace').replaceChildren(...v.trace.map(r=>{const row=document.createElement('tr');for(const s of [r.gate,r.status]){const cell=document.createElement('td');cell.textContent=s;row.append(cell);}return row;}));el('summary').textContent=`Received in supplied snapshot: ${v.received?'Yes':'No'} · admitted: ${v.admitted?'Yes':'No'} · eligible: ${v.eligible?'Yes':'No'} · selected installation declaration: ${v.installed?'Yes':'No'}`;el('exchange').textContent=`Original exchange prerequisites agree: ${v.exchangePermittedByDeclarations?'Yes':'No'}. No traffic was tested by this worksheet.`;el('limit').textContent=v.limit;}catch(e){el('error').textContent=e.message;el('error').hidden=false;el('output').hidden=true;el('trace').replaceChildren();}}
 function load(){try{const s=preset(select.value);fields.forEach(k=>el(k).checked=s[k]);render();}catch(e){el('error').textContent=e.message;el('error').hidden=false;el('output').hidden=true;el('trace').replaceChildren();}}
 select.addEventListener('change',load);fields.forEach(k=>el(k).addEventListener('change',render));el('reset').addEventListener('click',()=>{select.value='baseline';load();});select.value='baseline';load();
}
const api={fields:[...fields],catalog,preset,evaluate,html,mount};if(typeof module==='object'&&module.exports)module.exports=api;else root.EbgpPolicyModels=api;
})(typeof window!=='undefined'?window:globalThis);
