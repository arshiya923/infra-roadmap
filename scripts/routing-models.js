'use strict';
(() => {
const routes=[
 {prefix:'192.0.2.0/24',metric:0,via:'Connected LAN',action:'connected'},
 {prefix:'198.51.100.0/24',metric:20,via:'192.0.2.1',action:'forward'},
 {prefix:'198.51.100.0/24',metric:50,via:'192.0.2.3',action:'forward'},
 {prefix:'198.51.100.128/25',metric:500,via:'192.0.2.2',action:'forward'},
 {prefix:'203.0.113.0/24',metric:1,via:'Blackhole',action:'discard'},
 {prefix:'0.0.0.0/0',metric:100,via:'192.0.2.254',action:'forward'}
];
function address(text){
 if(typeof text!=='string'||! /^(0|[1-9]\d{0,2})(\.(0|[1-9]\d{0,2})){3}$/.test(text))throw new RangeError('Enter a dotted-decimal IPv4 address without leading zeros.');
 const parts=text.split('.').map(Number);if(parts.some(n=>n>255))throw new RangeError('Each IPv4 octet must be 0–255.');
 return parts.reduce((n,x)=>n*256+x,0);
}
function lookup(destination,defaultEnabled=true){
 const n=address(destination);if(typeof defaultEnabled!=='boolean')throw new TypeError('Default route switch must be boolean.');
 const rows=routes.filter(r=>defaultEnabled||r.prefix!=='0.0.0.0/0').map(r=>{const [base,bits]=r.prefix.split('/'),length=Number(bits),block=2**(32-length);return {...r,length,matches:Math.floor(n/block)===Math.floor(address(base)/block)};});
 const winner=rows.filter(r=>r.matches).sort((a,b)=>b.length-a.length||a.metric-b.metric)[0];
 return {destination,rows:rows.map(r=>({...r,selected:r===winner})),selected:winner?{...winner}:null};
}
function html(kind){if(kind!=='route-lookup')return '';return `<div class="calculator service-tool" id="route-tool"><p class="kicker">INTERACTIVE / ROUTE LOOKUP</p><h3>Longest prefix wins first</h3><label for="route-destination">Destination IPv4 address</label><input id="route-destination" value="198.51.100.200" inputmode="decimal" autocomplete="off" spellcheck="false"><label for="route-default"><input id="route-default" type="checkbox" checked> Include the default route</label><p class="small">One eligible IPv4 table with fixed next hops. Prefix length wins; lower metric breaks equal-prefix choices. Policy rules, protocol preference, ECMP and next-hop reachability are outside this model. Synthetic addresses; no packets are sent.</p><p id="route-error" role="alert" hidden></p><div id="route-output" aria-live="polite"><h3 id="route-choice"></h3><p id="route-action"></p><div class="table-wrap" tabindex="0" role="region" aria-label="Route candidates, scroll horizontally if needed"><table><thead><tr><th>Prefix</th><th>Metric</th><th>Next hop / action</th><th>Lookup</th></tr></thead><tbody id="route-rows"></tbody></table></div><p class="small">On narrow screens, focus the table and use arrow keys to scroll.</p></div><button id="route-reset">Reset lookup</button></div>`;}
function mount(kind){if(kind!=='route-lookup')return;const el=id=>document.getElementById('route-'+id);
 const update=()=>{try{const r=lookup(el('destination').value,el('default').checked),s=r.selected;el('error').hidden=true;el('output').hidden=false;el('choice').textContent=s?'Selected '+s.prefix+' · metric '+s.metric:'No matching route';el('action').textContent=!s?'This table cannot forward the destination.':s.action==='discard'?'Discard the packet. A matching blackhole route does not fall through to the default.':s.action==='connected'?'Resolve the destination on the connected LAN, subject to neighbor and link state.':'Forward via '+s.via+'. Selection alone does not prove neighbor reachability or a return path.';el('rows').innerHTML=r.rows.map(x=>`<tr><td>${x.prefix}</td><td>${x.metric}</td><td>${x.via}</td><td>${x.selected?'Selected':x.matches?'Matches':'No match'}</td></tr>`).join('');}catch(e){el('error').textContent=e.message;el('error').hidden=false;el('output').hidden=true;}};
 el('destination').addEventListener('input',update);el('default').addEventListener('change',update);el('reset').addEventListener('click',()=>{el('destination').value='198.51.100.200';el('default').checked=true;update();});update();
}
const api={lookup,html,mount};if(typeof module!=='undefined')module.exports=api;if(typeof window!=='undefined')window.RoutingModels=api;
})();
