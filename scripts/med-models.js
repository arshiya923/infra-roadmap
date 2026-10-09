(function(root){'use strict';
// Two fixed IPv4-unicast candidates for 198.51.100.0/24. No protocol engine.
const max=4294967295;
const numeric=['aNeighborAS','bNeighborAS','aAsPathLength','bAsPathLength','aLocalPref','bLocalPref'];
const bools=['aAdmitted','bAdmitted','aResolved','bResolved','alwaysCompare','systemSelect','forwardReady','returnReady'];
const enums=['aOrigin','bOrigin','missingMode'];
const fields=[...numeric,'aMed','bMed',...bools,...enums];
const base={aNeighborAS:65002,bNeighborAS:65002,aAsPathLength:2,bAsPathLength:2,aLocalPref:100,bLocalPref:100,aMed:100,bMed:200,aOrigin:'igp',bOrigin:'igp',aAdmitted:true,bAdmitted:true,aResolved:true,bResolved:true,alwaysCompare:false,missingMode:'default-zero',systemSelect:true,forwardReady:true,returnReady:true};
const cases=[
 ['same-as','Same neighboring AS: A MED 100, B MED 200',{}],
 ['b-lower','Same neighboring AS: B has lower MED',{aMed:200,bMed:100}],
 ['different-as','Different neighboring AS: skip MED',{bNeighborAS:65003}],
 ['always-compare','Different neighboring AS: explicit always compare',{bNeighborAS:65003,alwaysCompare:true}],
 ['equal-med','Equal MED: later stages needed',{bMed:100}],
 ['local-pref-boundary','Unequal LOCAL_PREF: outside MED-only comparison',{bLocalPref:200,bMed:400}],
 ['path-boundary','Unequal AS_SEQUENCE lengths: outside MED-only comparison',{bAsPathLength:1,bMed:400}],
 ['origin-boundary','Unequal ORIGIN: outside MED-only comparison',{bOrigin:'incomplete',bMed:0}],
 ['a-unresolved','A lower MED but unresolved: B sole usable',{aResolved:false}],
 ['b-rejected','B rejected by import: A sole usable',{bAdmitted:false,bMed:0}],
 ['none-usable','Neither candidate usable',{aAdmitted:false,bResolved:false}],
 ['missing-default','A MED absent: FRR 8.4.4 default effective 0',{aMed:null}],
 ['missing-worst','A MED absent: explicit FRR 8.4.4 missing-as-worst',{aMed:null,missingMode:'missing-as-worst'}],
 ['missing-max-tie','Absent as worst ties explicit unsigned maximum',{aMed:null,bMed:max,missingMode:'missing-as-worst'}],
 ['both-missing','Both MED attributes absent: tie',{aMed:null,bMed:null}],
 ['system-other','BGP choice exists; system source displaces it',{systemSelect:false}],
 ['return-missing','BGP choice and system selection; return not ready',{returnReady:false}],
 ['zero-max','Explicit MED range endpoints',{aMed:0,bMed:max}],
 ['four-octet-as','Four-octet private-AS declaration',{aNeighborAS:4200000001,bNeighborAS:4200000001}]
];
const limit='Two supplied IPv4-unicast candidates for exactly 198.51.100.0/24; ordinary nonempty AS_SEQUENCE only. Neighbor AS means its declared leftmost ASN, not the iBGP peer AS. Numeric ASN input excludes reserved 4294967295 but does not verify assignment or authorize ASN use. Other earlier FRR dimensions (weight, local origination and specialized bestpath policy) are held equal or excluded. Unequal supplied LOCAL_PREF, path length or ORIGIN ends this MED-only worksheet without computing a winner. Later stages, multipath, AS_SET, confederations, three or more paths, deterministic-MED processing, convergence and route history are not computed. System selection and forward/return readiness are declarations; no FIB or traffic is measured.';
function catalog(){return cases.map(([id,title])=>({id,title}));}
function preset(id){const row=cases.find(x=>x[0]===id);if(!row)throw Error('Choose a listed MED scenario.');return {...base,...row[2]};}
function integer(x,min,maxValue){return typeof x==='number'&&Number.isInteger(x)&&x>=min&&x<=maxValue;}
function validate(s){
 if(!s||typeof s!=='object'||Array.isArray(s)||Object.keys(s).length!==fields.length||fields.some(k=>!Object.prototype.hasOwnProperty.call(s,k))||Object.keys(s).some(k=>!fields.includes(k)))throw Error('Provide exactly the listed MED declarations.');
 for(const k of numeric){const min=k.includes('NeighborAS')||k.includes('PathLength')?1:0;const upper=k.includes('NeighborAS')?max-1:max;if(!integer(s[k],min,upper))throw Error(k+' must be an unsigned integer in its declared range (ASNs 1..4294967294; path lengths start at 1).');}
 for(const k of ['aMed','bMed'])if(s[k]!==null&&!integer(s[k],0,max))throw Error(k+' must be null (attribute absent) or an integer from 0 to 4294967295.');
 for(const k of bools)if(typeof s[k]!=='boolean')throw Error(k+' must be a boolean.');
 for(const k of ['aOrigin','bOrigin'])if(!['igp','egp','incomplete'].includes(s[k]))throw Error(k+' must be igp, egp or incomplete.');
 if(!['default-zero','missing-as-worst'].includes(s.missingMode))throw Error('Choose a listed FRR 8.4.4 missing-MED mode.');
}
function evaluate(s){
 validate(s);
 const eligible={a:s.aAdmitted&&s.aResolved,b:s.bAdmitted&&s.bResolved};
 const effectiveMed={a:s.aMed===null?(s.missingMode==='missing-as-worst'?max:0):s.aMed,b:s.bMed===null?(s.missingMode==='missing-as-worst'?max:0):s.bMed};
 const earlierEqual=s.aLocalPref===s.bLocalPref&&s.aAsPathLength===s.bAsPathLength&&s.aOrigin===s.bOrigin;
 const sameNeighbor=s.aNeighborAS===s.bNeighborAS;
 let status,winner=null,medCompared=false,reason;
 if(!eligible.a&&!eligible.b){status='no-usable';reason='Neither candidate is admitted and resolvable. No MED contest or BGP choice exists.';}
 else if(eligible.a!==eligible.b){status='single-usable';winner=eligible.a?'a':'b';reason=winner.toUpperCase()+' is the sole usable candidate. Its MED did not defeat an ineligible candidate.';}
 else if(!earlierEqual){status='earlier-boundary';reason='Both candidates are usable, but supplied earlier dimensions differ. Stop: a full earlier-stage decision is outside this MED-only worksheet.';}
 else if(!sameNeighbor&&!s.alwaysCompare){status='different-neighbor';reason='Earlier dimensions tie, but the neighboring AS declarations differ. Default MED comparison is skipped; later stages are required.';}
 else{medCompared=true;if(effectiveMed.a===effectiveMed.b){status='med-tie';reason='Comparable effective MED values tie. Later bestpath stages are required; no arbitrary winner is supplied.';}else{status='med-winner';winner=effectiveMed.a<effectiveMed.b?'a':'b';reason=winner.toUpperCase()+' has lower effective MED among these two usable candidates with tied earlier dimensions.';}}
 const choiceKnown=winner!==null||status==='no-usable';
 const systemInstalled=choiceKnown?(winner!==null&&s.systemSelect):null;
 const exchangePrerequisites=systemInstalled===null?null:systemInstalled&&s.forwardReady&&s.returnReady;
 return {prefix:'198.51.100.0/24',eligible,effectiveMed,earlierEqual,sameNeighbor,medCompared,status,winner,systemInstalled,exchangePrerequisites,reason,limit};
}
function html(kind){if(kind!=='med')return '';return `<section id="med-tool" class="en-tool"><p class="kicker">TWO CANDIDATES / ONE EXACT PREFIX</p><h2>Does this comparison reach MED?</h2><p>Fixed IPv4 unicast 198.51.100.0/24. Enter post-policy declarations. Both paths are ordinary nonempty AS_SEQUENCE; their leftmost ASN and lengths are supplied separately. Other earlier dimensions are held equal or excluded.</p><label for="med-case">Supplied MED scenario</label><select id="med-case"></select><div class="med-candidates">${['a','b'].map(k=>`<fieldset><legend>Candidate ${k.toUpperCase()}</legend><label for="med-${k}NeighborAS">Leftmost ordinary AS_SEQUENCE ASN</label><input id="med-${k}NeighborAS" type="number" min="1" max="4294967294" step="1"><label for="med-${k}AsPathLength">Ordinary AS_SEQUENCE length</label><input id="med-${k}AsPathLength" type="number" min="1" max="4294967295" step="1"><label for="med-${k}LocalPref">LOCAL_PREF</label><input id="med-${k}LocalPref" type="number" min="0" max="4294967295" step="1"><label for="med-${k}Origin">ORIGIN</label><select id="med-${k}Origin"><option value="igp">IGP</option><option value="egp">EGP</option><option value="incomplete">Incomplete</option></select><label for="med-${k}Med">MED (blank means attribute absent)</label><input id="med-${k}Med" type="number" min="0" max="4294967295" step="1"><label><input id="med-${k}Admitted" type="checkbox"> Admitted by policy and ordinary eligibility checks</label><label><input id="med-${k}Resolved" type="checkbox"> NEXT_HOP resolves in the destination table</label></fieldset>`).join('')}</div><fieldset><legend>Scoped policy and separate installation/service declarations</legend><label><input id="med-alwaysCompare" type="checkbox"> Always compare MED across neighboring ASes (explicit option)</label><label for="med-missingMode">FRR 8.4.4 absent-MED handling</label><select id="med-missingMode"><option value="default-zero">Default: effective 0</option><option value="missing-as-worst">Explicit missing-as-worst: effective 4294967295</option></select><label><input id="med-systemSelect" type="checkbox"> System selects this BGP choice over other route sources</label><label><input id="med-forwardReady" type="checkbox"> Original forward path declared ready</label><label><input id="med-returnReady" type="checkbox"> Original return path declared ready</label></fieldset><p id="med-error" role="alert" hidden></p><div id="med-output"><div class="en-scroll med-scroll" role="region" aria-label="MED candidate declarations and eligibility table" tabindex="0"><table><thead><tr><th scope="col">Candidate</th><th scope="col">Leftmost AS</th><th scope="col">AS length</th><th scope="col">LOCAL_PREF</th><th scope="col">ORIGIN</th><th scope="col">Received MED</th><th scope="col">Effective MED</th><th scope="col">Usable</th></tr></thead><tbody id="med-rows"></tbody></table></div><p id="med-decision" aria-live="polite"></p><p id="med-installation"></p><p id="med-service"></p><p id="med-limit" class="en-note"></p></div><button id="med-reset" type="button">Reset MED worksheet</button></section>`;}
function mount(kind){if(kind!=='med')return;const e=id=>document.getElementById('med-'+id),select=e('case');if(!select)return;select.replaceChildren();for(const c of catalog()){const o=document.createElement('option');o.value=c.id;o.textContent=c.title;select.append(o);}
 function fail(err){e('error').textContent=err.message;e('error').hidden=false;e('output').hidden=true;e('rows').replaceChildren();for(const id of ['decision','installation','service','limit'])e(id).textContent='';}
 function readNumber(k,allowMissing){const el=e(k);if(el.validity&&el.validity.badInput)throw Error(k+' is not a valid integer.');const raw=el.value;if(allowMissing&&raw==='')return null;if(!/^(0|[1-9][0-9]*)$/.test(raw))throw Error(k+' must use whole decimal digits in range.');return Number(raw);}
 function render(){try{if(!catalog().some(c=>c.id===select.value))throw Error('Choose a listed MED scenario.');const s={};numeric.forEach(k=>s[k]=readNumber(k,false));['aMed','bMed'].forEach(k=>s[k]=readNumber(k,true));bools.forEach(k=>s[k]=e(k).checked);enums.forEach(k=>s[k]=e(k).value);const v=evaluate(s);e('error').textContent='';e('error').hidden=true;e('output').hidden=false;e('rows').replaceChildren(...['a','b'].map(k=>{const row=document.createElement('tr');for(const value of [k.toUpperCase(),s[k+'NeighborAS'],s[k+'AsPathLength'],s[k+'LocalPref'],s[k+'Origin'],s[k+'Med']===null?'Absent':s[k+'Med'],v.effectiveMed[k],v.eligible[k]?'Yes':'No']){const cell=document.createElement('td');cell.textContent=String(value);row.append(cell);}return row;}));e('decision').textContent=v.reason+' MED compared: '+(v.medCompared?'Yes':'No')+'. BGP choice: '+(v.winner?v.winner.toUpperCase():v.status==='no-usable'?'None':'Undetermined here')+'.';e('installation').textContent='System installation declaration: '+(v.systemInstalled===null?'Undetermined until BGP choice is known':v.systemInstalled?'Agrees for this BGP choice':'No installation of this BGP choice')+'. No actual RIB/FIB was inspected.';e('service').textContent='Original exchange prerequisite agreement: '+(v.exchangePrerequisites===null?'Undetermined':v.exchangePrerequisites?'Yes':'No')+'. No traffic was sent or measured.';e('limit').textContent=v.limit;}catch(err){fail(err);}}
 function load(){try{const s=preset(select.value);for(const k of fields){if(bools.includes(k))e(k).checked=s[k];else e(k).value=s[k]===null?'':String(s[k]);}render();}catch(err){fail(err);}}
 select.addEventListener('change',load);fields.forEach(k=>{e(k).addEventListener('change',render);e(k).addEventListener('input',render);});e('reset').addEventListener('click',()=>{select.value='same-as';load();});select.value='same-as';load();
}
const api={fields:[...fields],catalog,preset,evaluate,html,mount};if(typeof module==='object'&&module.exports)module.exports=api;else root.MedModels=api;
})(typeof window!=='undefined'?window:globalThis);
