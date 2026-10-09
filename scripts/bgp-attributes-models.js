(function(root){'use strict';
// Supplied attribute declarations, not an UPDATE parser or a route-selection engine.
const definitions=[
 [1,'ORIGIN','Well-known mandatory',false,true,'How the route entered BGP; IGP, EGP or INCOMPLETE does not identify the current receiving protocol.'],
 [2,'AS_PATH','Well-known mandatory',false,true,'AS-level propagation and loop context; AS count is not latency. AS_SET and AS_CONFED_SET are deprecated by RFC 9774.'],
 [3,'NEXT_HOP','Well-known mandatory',false,true,'IPv4-unicast next-hop context requiring independent resolution. Multiprotocol reachability has different encoding rules.'],
 [4,'MED','Optional nontransitive',true,false,'An inter-AS exit preference hint with scoped comparison rules; not a universal bandwidth metric.'],
 [5,'LOCAL_PREF','Well-known discretionary',false,true,'Preference distributed within an AS; ordinarily not sent to external peers. Discretionary does not mean every context permits omission.'],
 [6,'ATOMIC_AGGREGATE','Well-known discretionary',false,true,'Signals aggregation information loss under its defined rules; it is not an AS list.'],
 [7,'AGGREGATOR','Optional transitive',true,true,'Identifies aggregation origin context; separate from ATOMIC_AGGREGATE.'],
 [8,'COMMUNITIES','Optional transitive',true,true,'RFC 1997 sets of four-octet values; useful labels require defined matching policy.'],
 [9,'ORIGINATOR_ID','Optional nontransitive',true,false,'Route-reflection loop context identifying the original internal speaker.'],
 [10,'CLUSTER_LIST','Optional nontransitive',true,false,'Route-reflection cluster history for loop protection.'],
 [32,'LARGE_COMMUNITIES','Optional transitive',true,true,'RFC 8092 sets of twelve-octet values, conventionally displayed as three unsigned decimal fields.'],
 ['unknown','Declared unrecognized attribute','Not known from type declaration',null,null,'An explicit hypothetical unrecognized attribute, not a claim that a particular IANA type code is unassigned.']
];
const scenarios=[
 ['origin','ORIGIN · flags 64 (0x40)',1,64],['as-path','AS_PATH · flags 64 (0x40)',2,64],['next-hop','NEXT_HOP · flags 64 (0x40)',3,64],
 ['med','MED · flags 128 (0x80)',4,128],['local-pref','LOCAL_PREF · flags 64 (0x40)',5,64],['atomic','ATOMIC_AGGREGATE · flags 64 (0x40)',6,64],
 ['aggregator','AGGREGATOR · flags 192 (0xC0)',7,192],['community','COMMUNITIES · flags 192 (0xC0)',8,192],['large','Large communities · flags 208 (0xD0)',32,208],
 ['originator','ORIGINATOR_ID · flags 128 (0x80)',9,128],['cluster','CLUSTER_LIST · flags 128 (0x80)',10,128],
 ['unknown-transitive','Unrecognized optional transitive · flags 192', 'unknown',192],['unknown-partial','Unrecognized optional transitive, partial · flags 224','unknown',224],
 ['unknown-nontransitive','Unrecognized optional nontransitive · flags 128','unknown',128],['known-mismatch','MED with conflicting Transitive bit · flags 192',4,192],
 ['partial-mismatch','ORIGIN with forbidden Partial bit · flags 96',1,96],['reserved','COMMUNITIES with reserved low bit · flags 193',8,193]
];
const limit='One declared type and FLAGS byte only. No attribute value/length validation, full UPDATE parsing, route admission, best-path competition, policy execution, session error simulation, packets or router changes. Attribute Extended Length selects a one- or two-octet attribute length field; it does not negotiate RFC 8654 extended messages.';
function catalog(){return scenarios.map(([id,title])=>({id,title}));}
function preset(id){const s=scenarios.find(x=>x[0]===id);if(!s)throw Error('Choose a listed BGP attributes scenario.');return {type:s[2],flags:s[3]};}
function attributes(){return definitions.map(([type,name,classification,optional,transitive,meaning])=>({type,name,classification,optional,transitive,meaning}));}
function evaluate(input){
 if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length!==2||!Object.hasOwn(input,'type')||!Object.hasOwn(input,'flags'))throw Error('Provide exactly a declared type and integer FLAGS byte.');
 const d=definitions.find(x=>x[0]===input.type);if(!d)throw Error('Choose a listed declared type; numeric strings are not type codes.');
 if(typeof input.flags!=='number'||!Number.isInteger(input.flags)||input.flags<0||input.flags>255)throw Error('FLAGS must be an integer from 0 through 255.');
 const f=input.flags,optional=(f&128)!==0,transitive=(f&64)!==0,partial=(f&32)!==0,extendedLength=(f&16)!==0,reserved=f&15;
 const known=d[0]!=='unknown',typeMatch=known?optional===d[3]&&transitive===d[4]:null,issues=[];
 if(!optional&&!transitive)issues.push('Well-known attributes require the Transitive bit set.');
 if(partial&&(!optional||!transitive))issues.push('Partial must be zero for well-known and optional nontransitive attributes.');
 if(typeMatch===false)issues.push('Optional/Transitive bits conflict with the declared known type. RFC 7606 generally specifies treat-as-withdraw, unless the attribute specification requires different handling; no UPDATE is parsed here.');
 const flagsClass=!optional?'Well-known (mandatory/discretionary not encoded)':transitive?'Optional transitive':'Optional nontransitive';
 let handling=known?'Use the declared attribute specification and applicable policy. A matching FLAGS class alone does not prove value validity, route acceptance or propagation.':!optional?'A declared unrecognized well-known attribute is not an optional-extension case. This worksheet does not compute a protocol error action.':transitive?'RFC 4271 says paths with unrecognized optional transitive attributes should be accepted. If such a path is accepted, preserve the attribute and set Partial when passing it onward. Admission still depends on applicable validation and policy.':'RFC 4271 says an unrecognized optional nontransitive attribute is quietly ignored and not passed to other peers; this does not itself discard the entire route.';
 return {type:input.type,name:d[1],declaredClass:d[2],meaning:d[5],flags:f,hex:'0x'+f.toString(16).toUpperCase().padStart(2,'0'),binary:f.toString(2).padStart(8,'0'),optional,transitive,partial,extendedLength,reserved,lengthOctets:extendedLength?2:1,flagsClass,typeMatch,issues,reservedNote:reserved?'Nonzero reserved low bits: sender must send them as zero; receivers must ignore them. No receive-side malformed/reset conclusion follows from these bits alone.':'Reserved low bits are zero. Senders must zero them and receivers ignore them.',handling,limit};
}
function html(kind){if(kind!=='bgp-attributes')return '';return `<section id="ba-tool" class="en-tool"><p class="kicker">TYPE / FLAGS / DECLARED SCOPE</p><h2>Read the attribute label before the path decision</h2><p>Decode one supplied FLAGS octet and compare it with a declared attribute type. Values, lengths and whole UPDATE messages are outside this worksheet.</p><div class="ba-controls"><label for="ba-case">Supplied attribute scenario</label><select id="ba-case"></select><label for="ba-type">Declared attribute type</label><select id="ba-type"></select><label for="ba-flags">FLAGS byte (decimal integer, 0–255)</label><input id="ba-flags" type="text" inputmode="numeric" autocomplete="off" aria-describedby="ba-input-note"><p id="ba-input-note">Enter decimal digits only. The result also shows hexadecimal and binary.</p></div><p id="ba-error" role="alert" hidden></p><div id="ba-output"><p id="ba-summary" aria-live="polite"></p><div class="en-scroll ba-scroll" role="region" aria-label="BGP attribute FLAGS bit worksheet" tabindex="0"><table><thead><tr><th scope="col">Mask</th><th scope="col">Field</th><th scope="col">Supplied value</th><th scope="col">Interpretation</th></tr></thead><tbody id="ba-bits"></tbody></table></div><p id="ba-class"></p><p id="ba-consistency"></p><p id="ba-reserved"></p><p id="ba-handling"></p><p id="ba-limit" class="en-note"></p></div><h3>Declared attribute reference</h3><div class="en-scroll ba-scroll" role="region" aria-label="BGP declared attribute classification reference" tabindex="0"><table><thead><tr><th scope="col">Type</th><th scope="col">Attribute</th><th scope="col">Defined classification</th><th scope="col">Meaning and scope</th></tr></thead><tbody id="ba-reference"></tbody></table></div><p class="en-note">Weight is a local implementation preference, not a BGP wire path attribute. The Optional/Transitive bits cannot tell mandatory from discretionary. LOCAL_PREF propagation follows its specification despite its well-known classification.</p><button id="ba-reset" type="button">Reset attributes worksheet</button></section>`;}
function mount(kind){if(kind!=='bgp-attributes')return;const e=id=>document.getElementById('ba-'+id),select=e('case'),type=e('type');
 const option=(v,t)=>{const o=document.createElement('option');o.value=v;o.textContent=t;return o;};
 for(const c of catalog())select.append(option(c.id,c.title));for(const d of attributes())type.append(option(String(d.type),`${d.type} · ${d.name}`));
 const row=values=>{const r=document.createElement('tr');for(const value of values){const c=document.createElement('td');c.textContent=String(value);r.append(c);}return r;};
 e('reference').replaceChildren(...attributes().filter(x=>x.type!=='unknown').map(x=>row([x.type,x.name,x.classification,x.meaning])));
 function fail(err){e('error').textContent=err.message;e('error').hidden=false;e('output').hidden=true;e('bits').replaceChildren();for(const id of ['summary','class','consistency','reserved','handling','limit'])e(id).textContent='';}
 function render(){try{
  if(!catalog().some(c=>c.id===select.value))throw Error('Choose a listed BGP attributes scenario.');
  const d=attributes().find(x=>String(x.type)===type.value);if(!d)throw Error('Choose a listed declared attribute type.');
  const raw=e('flags').value;if(!/^[0-9]+$/.test(raw))throw Error('Enter FLAGS as decimal digits for an integer from 0 through 255.');
  const v=evaluate({type:d.type,flags:Number(raw)});e('error').hidden=true;e('output').hidden=false;
  e('summary').textContent=`${v.name} · FLAGS ${v.flags} = ${v.hex} = ${v.binary}`;
  e('bits').replaceChildren(...[
   ['0x80','Optional',v.optional?'1':'0',v.optional?'Optional attribute':'Well-known attribute'],
   ['0x40','Transitive',v.transitive?'1':'0',v.optional?(v.transitive?'Optional transitive':'Optional nontransitive'):'Required to be 1 for well-known attributes'],
   ['0x20','Partial',v.partial?'1':'0','Partial information applies only to optional transitive attributes'],
   ['0x10','Extended Length',v.extendedLength?'1':'0',`${v.lengthOctets}-octet attribute length field; not extended-message negotiation`],
   ['0x0F','Reserved low four bits',v.reserved.toString(2).padStart(4,'0'),'Zero when sent; ignored when received']
  ].map(row));
  e('class').textContent=`FLAGS class: ${v.flagsClass}. Declared specification: ${v.declaredClass}. ${v.meaning}`;
  e('consistency').textContent=v.issues.length?v.issues.join(' '):v.typeMatch===null?'No known-type comparison is available for this explicit unrecognized declaration.':'Optional/Transitive bits agree with the declared type; this is not complete attribute validation.';
  e('reserved').textContent=v.reservedNote;e('handling').textContent=v.handling;e('limit').textContent=v.limit;
 }catch(err){fail(err);}}
 function load(){try{const s=preset(select.value);type.value=String(s.type);e('flags').value=String(s.flags);render();}catch(err){fail(err);}}
 select.addEventListener('change',load);type.addEventListener('change',render);e('flags').addEventListener('input',render);e('reset').addEventListener('click',()=>{select.value='origin';load();});select.value='origin';load();
}
const api={catalog,preset,attributes,evaluate,html,mount};if(typeof module==='object'&&module.exports)module.exports=api;else root.BgpAttributesModels=api;
})(typeof window!=='undefined'?window:globalThis);
