'use strict';
(() => {
function octet(text,base=10){
 if(![2,10,16].includes(base)||typeof text!=='string')throw new RangeError('Choose a supported base.');
 const value=text.trim(),pattern=base===2?/^[01]{1,8}$/:base===16?/^[0-9a-fA-F]{1,2}$/:/^(0|[1-9][0-9]{0,2})$/;
 if(!pattern.test(value))throw new RangeError('Use unsigned digits for the selected base, without a prefix.');
 const n=parseInt(value,base);if(n>255)throw new RangeError('An octet must be 0–255.');
 return {decimal:n,binary:n.toString(2).padStart(8,'0'),hex:n.toString(16).toUpperCase().padStart(2,'0')};
}
function ipv4(text){
 if(typeof text!=='string'||!/^((0|[1-9][0-9]{0,2})\.){3}(0|[1-9][0-9]{0,2})$/.test(text))throw new RangeError('Use four decimal octets without leading zeros.');
 const parts=text.split('.').map(Number);if(parts.some(n=>n>255))throw new RangeError('IPv4 octets must be 0–255.');
 return parts.reduce((n,x)=>n*256+x,0);
}
function dotted(n){
 if(!Number.isInteger(n)||n<0||n>=2**32)throw new RangeError('Invalid IPv4 integer.');
 return [24,16,8,0].map(power=>Math.floor(n/2**power)%256).join('.');
}
function subnet(address,prefix){
 const value=ipv4(address);if(!Number.isInteger(prefix)||prefix<0||prefix>32)throw new RangeError('Prefix must be a whole number 0–32.');
 const count=2**(32-prefix),network=Math.floor(value/count)*count,last=network+count-1,mask=2**32-count;
 return {address,prefix,network:dotted(network),last:dotted(last),mask:dotted(mask),count,broadcast:prefix<=30?dotted(last):null,firstHost:dotted(prefix<=30?network+1:network),lastHost:dotted(prefix<=30?last-1:last),candidates:prefix<=30?count-2:count,kind:prefix===31?'Point-to-point /31: both endpoints only where supported; no ordinary directed broadcast.':prefix===32?'Single-address /32: host-route or endpoint context; not a two-host LAN.':'Conventional IPv4 subnet arithmetic: exclude network and directed broadcast; additional reservations and special-purpose ranges still apply.',addressBits:value.toString(2).padStart(32,'0'),maskBits:mask.toString(2).padStart(32,'0')};
}
function normalize6(text){
 if(typeof text!=='string'||!text.length||/[^0-9a-fA-F:]/.test(text))throw new RangeError('Use a pure hexadecimal IPv6 address; no zone, prefix or dotted IPv4 tail.');
 let groups;
 const read=s=>s===''?[]:s.split(':');
 if(text.includes('::')){
  const halves=text.split('::');if(halves.length!==2)throw new RangeError('Use :: at most once.');
  const left=read(halves[0]),right=read(halves[1]);if(left.length+right.length>=8)throw new RangeError(':: must omit at least one group.');
  groups=[...left,...Array(8-left.length-right.length).fill('0'),...right];
 }else groups=text.split(':');
 if(groups.length!==8||groups.some(g=>! /^[0-9a-fA-F]{1,4}$/.test(g)))throw new RangeError('An expanded address needs eight 1–4-digit hextets.');
 const nums=groups.map(g=>parseInt(g,16)),short=nums.map(n=>n.toString(16));let best=-1,length=0;
 for(let i=0;i<8;){if(nums[i]!==0){i++;continue}let j=i;while(j<8&&nums[j]===0)j++;if(j-i>length&&j-i>=2){best=i;length=j-i}i=j;}
 const canonical=best<0?short.join(':'):short.slice(0,best).join(':')+'::'+short.slice(best+length).join(':');
 return {canonical,expanded:nums.map(n=>n.toString(16).padStart(4,'0')).join(':'),groups:nums.map(n=>({hex:n.toString(16).padStart(4,'0'),binary:n.toString(2).padStart(16,'0')}))};
}
function vlsm(parent,demands){
 if(typeof parent!=='string')throw new RangeError('Use an aligned parent prefix.');
 const split=parent.split('/');if(split.length!==2||!/^(0|[1-9][0-9]?)$/.test(split[1]))throw new RangeError('Use address/prefix for the parent.');
 const p=subnet(split[0],Number(split[1]));if(p.network!==split[0])throw new RangeError('Parent address must be aligned; host bits must be zero.');
 if(!Array.isArray(demands)||!demands.length||demands.length>16||demands.some(n=>!Number.isInteger(n)||n<1||n>4294967294))throw new RangeError('Use 1–16 positive whole host demands, at most 4,294,967,294 each.');
 const requests=demands.map((hosts,i)=>({request:i+1,hosts,size:2**Math.ceil(Math.log2(hosts+2))})).sort((a,b)=>b.size-a.size||a.request-b.request);
 let cursor=ipv4(p.network);const end=ipv4(p.last),allocations=[];
 for(const r of requests){const start=Math.ceil(cursor/r.size)*r.size;if(start+r.size-1>end)throw new RangeError('Requests do not fit the parent as aligned conventional subnets. No plan accepted.');
  const child=subnet(dotted(start),32-Math.log2(r.size));allocations.push({...r,...child});cursor=start+r.size;
 }
 return {parent:p,allocations,remaining:end-cursor+1,remainingStart:cursor<=end?dotted(cursor):null};
}
const api={octet,ipv4,dotted,subnet,normalize6,vlsm};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(typeof window==='undefined')return;
window.AddressTools=api;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const panel=(id,title,description,body)=>`<div class="network-panel address-panel" id="${id}"><p class="kicker">ADDRESS WORKSHOP / NO NETWORK CHANGES</p><h3>${title}</h3><p class="small">${description}</p>${body}</div>`;
function radixHTML(){return panel('radix-tool','Eight bits, three representations.','Unsigned octet only (0–255). Decimal input has no leading zeros; binary uses up to eight digits; hex uses up to two digits without 0x. Toggle bits or enter a value.',`<div class="network-inputs"><label for="radix-base">Input base<select id="radix-base"><option value="10">Decimal</option><option value="2">Binary</option><option value="16">Hexadecimal</option></select></label><label for="radix-input">Value<input id="radix-input" type="text" value="192" autocomplete="off" spellcheck="false"></label></div><div class="bit-toggles">${[128,64,32,16,8,4,2,1].map(n=>`<button type="button" data-bit="${n}" aria-pressed="false" aria-label="Toggle bit weight ${n}"><small>${n}</small><b>0</b></button>`).join('')}</div><p id="radix-error" role="status" hidden></p><div id="radix-output" aria-live="polite"><dl class="budget-metrics"><dt>Decimal</dt><dd id="radix-decimal"></dd><dt>Binary (eight bits)</dt><dd id="radix-binary"></dd><dt>Hex (two digits)</dt><dd id="radix-hex"></dd></dl><p id="radix-sum"></p></div><button id="radix-reset">Reset octet to 192</button><details><summary>Read the conversion rule</summary><p>Bit weights left to right: 128, 64, 32, 16, 8, 4, 2, 1. Add weights whose bits are 1. Group four binary digits per hex digit. Example: 11000000 = 128 + 64 = decimal 192 = hex C0.</p></details>`)}
function subnetHTML(){return panel('subnet-tool','Derive the block, then read its meaning.','Mathematical IPv4 calculation only. No ownership, reachability, duplicate detection or cloud/vendor reservations are inferred. /31 assumes supported point-to-point use; /32 is a single-address context.',`<div class="network-inputs"><label for="subnet-address">IPv4 address<input id="subnet-address" value="192.0.2.130" type="text" autocomplete="off" spellcheck="false"></label><label for="subnet-prefix">Prefix length (0–32)<input id="subnet-prefix" value="26" type="number" min="0" max="32" step="1"></label></div><p id="subnet-error" role="status" hidden></p><div id="subnet-output" aria-live="polite"><p id="subnet-kind" class="network-result"></p><dl id="subnet-results" class="budget-metrics"></dl><div class="prefix-visual"><p class="small">Address bits: labelled N = network, H = host/remainder. Mask bits shown below.</p><div id="subnet-bits" class="address-bits"></div><code id="subnet-maskbits"></code></div><p class="small">Candidate counts are conventional arithmetic, not permission to assign or scan. A /0 includes special-purpose ranges and is commonly a default-route match.</p></div><button id="subnet-reset">Reset subnet example</button><details><summary>Read the calculation rule</summary><p>Block size = 2^(32 − prefix). Network = floor(address integer / block size) × block size. Last address = network + block size − 1. In the ordinary /0–/30 arithmetic model, exclude first and last for conventional candidates. Handle /31 and /32 separately; other reservations remain outside this model.</p></details>`)}
function ipv6HTML(){return panel('ipv6-tool','Expand and normalize an IPv6 address.','Pure hexadecimal IPv6 syntax only. IPv4-embedded forms, zone identifiers and /prefix suffixes are intentionally outside this widget; rejection here does not mean every excluded form is invalid in other contexts.',`<label for="ipv6-input">IPv6 text<input id="ipv6-input" type="text" value="2001:0DB8:0:0:0:0:0:1" autocomplete="off" spellcheck="false"></label><p id="ipv6-error" role="status" hidden></p><div id="ipv6-output" aria-live="polite"><p>Canonical: <strong id="ipv6-canonical"></strong></p><p>Expanded: <code id="ipv6-expanded"></code></p><div class="comparison-scroll"><table class="comparison"><caption>Eight groups × 16 bits = 128 bits</caption><thead><tr><th scope="col">Group</th><th scope="col">Hex</th><th scope="col">Binary</th></tr></thead><tbody id="ipv6-groups"></tbody></table></div></div><button id="ipv6-reset">Reset IPv6 example</button><details><summary>Read the normalization rules</summary><p>Remove leading zeros in each hextet, use lowercase, and replace one longest run of at least two zero groups with ::. If longest runs tie, choose the first. Do not compress a single zero group with :: in canonical output. Input may have :: at most once.</p></details>`)}
function vlsmHTML(){return panel('vlsm-tool','Allocate an empty parent, largest requirements first.','Conventional IPv4 subnets through /30 only. Demands include gateway, infrastructure, reservations and growth. This classroom allocator has no existing reservations or topology constraints; it does not publish an IPAM plan.',`<div class="network-inputs"><label for="vlsm-parent">Aligned parent prefix<input id="vlsm-parent" type="text" value="192.0.2.0/24" spellcheck="false"></label><label for="vlsm-demands">Host demands (comma separated, up to 16)<input id="vlsm-demands" type="text" value="120,50,20" spellcheck="false"></label></div><button id="vlsm-calculate">Calculate allocation</button><p id="vlsm-error" role="status" hidden></p><div id="vlsm-output" aria-live="polite"><div class="comparison-scroll"><table class="comparison"><caption>Largest-first plan; original request numbers are retained</caption><thead><tr><th scope="col">Request</th><th scope="col">Demand</th><th scope="col">Network</th><th scope="col">Conventional candidates</th></tr></thead><tbody id="vlsm-rows"></tbody></table></div><p id="vlsm-remaining"></p></div><button id="vlsm-reset">Reset allocation example</button><details><summary>Read the planning rule</summary><p>For each positive host demand, choose the smallest power-of-two block ≥ demand + 2. Sort larger blocks first and allocate aligned, non-overlapping children within the parent. Reject the entire proposal if any request cannot fit. Example 120,50,20 inside 192.0.2.0/24 produces .0/25, .128/26, .192/27, leaving .224–.255 unallocated.</p></details>`)}
api.html=kind=>({radix:radixHTML,subnet:subnetHTML,ipv6:ipv6HTML,vlsm:vlsmHTML}[kind]?.()||'');
function guarded(id,fn){try{fn();document.querySelector('#'+id+'-error').hidden=true;document.querySelector('#'+id+'-output').hidden=false;return true}catch(e){const error=document.querySelector('#'+id+'-error');error.textContent=e.message;error.hidden=false;document.querySelector('#'+id+'-output').hidden=true;return false}}
api.mount=kind=>{
 if(kind==='radix'){
  let value=192;const input=document.querySelector('#radix-input'),base=document.querySelector('#radix-base');
  const show=()=>guarded('radix',()=>{const r=octet(input.value,Number(base.value));value=r.decimal;for(const name of ['decimal','binary','hex'])document.querySelector('#radix-'+name).textContent=r[name];const on=[];document.querySelectorAll('[data-bit]').forEach(b=>{const set=!!(value&Number(b.dataset.bit));b.setAttribute('aria-pressed',String(set));b.querySelector('b').textContent=set?'1':'0';if(set)on.push(b.dataset.bit)});document.querySelector('#radix-sum').textContent=(on.length?on.join(' + '):'No weights set')+' = '+value;});
  input.oninput=()=>{if(!show())document.querySelectorAll('[data-bit]').forEach(b=>b.disabled=true);else document.querySelectorAll('[data-bit]').forEach(b=>b.disabled=false)};
  base.onchange=()=>{input.value=value.toString(Number(base.value)).toUpperCase();document.querySelectorAll('[data-bit]').forEach(b=>b.disabled=false);show()};
  document.querySelectorAll('[data-bit]').forEach(b=>b.onclick=()=>{value^=Number(b.dataset.bit);input.value=value.toString(Number(base.value)).toUpperCase();show()});
  document.querySelector('#radix-reset').onclick=()=>{value=192;base.value='10';input.value='192';document.querySelectorAll('[data-bit]').forEach(b=>b.disabled=false);show()};show();
 }
 if(kind==='subnet'){
  const update=()=>guarded('subnet',()=>{const address=document.querySelector('#subnet-address').value.trim(),text=document.querySelector('#subnet-prefix').value;if(text==='')throw new RangeError('Enter a whole prefix 0–32.');const r=subnet(address,Number(text));document.querySelector('#subnet-kind').textContent=r.kind;
   const rows=[['Containing network',r.network+'/'+r.prefix],['Mask',r.mask],['Last address in block',r.last],['Directed broadcast',r.broadcast||'None in this stated /31 or /32 model'],['Total address patterns',r.count.toLocaleString('en-US')],['Candidate interval',r.firstHost+' – '+r.lastHost],['Candidate count (stated model)',r.candidates.toLocaleString('en-US')]];
   document.querySelector('#subnet-results').innerHTML=rows.map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
   document.querySelector('#subnet-bits').innerHTML=[0,1,2,3].map(o=>`<div class="address-octet" aria-label="Octet ${o+1}">${r.addressBits.slice(o*8,o*8+8).split('').map((b,i)=>`<span class="${o*8+i<r.prefix?'network-bit':'host-bit'}"><small>${o*8+i<r.prefix?'N':'H'}</small>${b}</span>`).join('')}</div>`).join('');document.querySelector('#subnet-maskbits').textContent='Mask: '+r.maskBits.match(/.{8}/g).join('.');
  });document.querySelectorAll('#subnet-tool input').forEach(el=>el.oninput=update);document.querySelector('#subnet-reset').onclick=()=>{document.querySelector('#subnet-address').value='192.0.2.130';document.querySelector('#subnet-prefix').value='26';update()};update();
 }
 if(kind==='ipv6'){
  const input=document.querySelector('#ipv6-input'),update=()=>guarded('ipv6',()=>{const r=normalize6(input.value.trim());document.querySelector('#ipv6-canonical').textContent=r.canonical;document.querySelector('#ipv6-expanded').textContent=r.expanded;document.querySelector('#ipv6-groups').innerHTML=r.groups.map((g,i)=>`<tr><th scope="row">${i+1}</th><td>${g.hex}</td><td><code>${g.binary}</code></td></tr>`).join('')});input.oninput=update;document.querySelector('#ipv6-reset').onclick=()=>{input.value='2001:0DB8:0:0:0:0:0:1';update()};update();
 }
 if(kind==='vlsm'){
  const update=()=>guarded('vlsm',()=>{const parts=document.querySelector('#vlsm-demands').value.split(',').map(s=>s.trim());if(parts.some(s=>!/^\d+$/.test(s)))throw new RangeError('Enter comma-separated positive whole host demands.');const r=vlsm(document.querySelector('#vlsm-parent').value.trim(),parts.map(Number));document.querySelector('#vlsm-rows').innerHTML=r.allocations.map(a=>`<tr><th scope="row">${a.request}</th><td>${a.hosts}</td><td>${a.network}/${a.prefix}</td><td>${a.firstHost} – ${a.lastHost}<br>${a.candidates} candidates</td></tr>`).join('');document.querySelector('#vlsm-remaining').textContent=r.remaining?`${r.remaining} patterns unallocated: ${r.remainingStart} – ${r.parent.last}. Review growth and topology before deployment.`:'No unallocated patterns remain in this empty-pool model.';});document.querySelector('#vlsm-calculate').onclick=update;document.querySelectorAll('#vlsm-tool input').forEach(el=>el.oninput=()=>{document.querySelector('#vlsm-output').hidden=true;document.querySelector('#vlsm-error').textContent='Inputs changed. Calculate to review the new plan.';document.querySelector('#vlsm-error').hidden=false});document.querySelector('#vlsm-reset').onclick=()=>{document.querySelector('#vlsm-parent').value='192.0.2.0/24';document.querySelector('#vlsm-demands').value='120,50,20';update()};update();
 }
};
})();
