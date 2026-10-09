'use strict';
// Pure arithmetic/state models also load under Node for independent verification.
(() => {
const limits={payload:[0,64000],mtu:[1280,9000],overhead:[0,512],rate:[0.1,100000],rtt:[0,2000],propagation:[0,1000],queue:[0,2000]};
function linkBudget(v){
 for(const [key,[min,max]] of Object.entries(limits)){
  if(typeof v[key]!=='number'||!Number.isFinite(v[key])||v[key]<min||v[key]>max)throw new RangeError(`Invalid ${key}`);
  if(['payload','mtu','overhead'].includes(key)&&!Number.isInteger(v[key]))throw new RangeError(`Whole bytes required for ${key}`);
 }
 if(![4,6].includes(v.version))throw new RangeError('Invalid IP version');
 const ipHeader=v.version===4?20:40,inner=v.payload+ipHeader+8,outer=inner+v.overhead;
 const serialization=outer*8/(v.rate*1000);
 return {ipHeader,inner,outer,fits:outer<=v.mtu,maxPayload:v.mtu-v.overhead-ipHeader-8,serialization,subtotal:serialization+v.propagation+v.queue,bdpBytes:v.rate*125*v.rtt,ipv6BelowMinimum:v.version===6&&v.mtu-v.overhead<1280};
}
function packetJourney(step){
 if(!Number.isInteger(step)||step<0||step>3)throw new RangeError('Invalid journey step');
 const routed=step>=2;
 return {sourceIP:'192.0.2.10',destinationIP:'198.51.100.20',sourceMAC:routed?'02:00:00:00:00:02':'02:00:00:00:00:10',destinationMAC:routed?'02:00:00:00:00:20':'02:00:00:00:00:01',sourcePort:51514,destinationPort:443,ttl:routed?63:64,checksum:routed?'Updated for TTL 63':'Original for TTL 64'};
}
const api={linkBudget,packetJourney};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(typeof window==='undefined')return;
window.NetworkModels=api;
const names=['Client sends','Switch forwards','Router reframes','Server receives'];
const descriptions=['The remote server IP is inside a frame addressed to the local router. Neighbor resolution is assumed complete.','An ordinary Layer 2 switch preserves this IP lifetime and the frame’s source/destination addresses. VLAN and policy are assumed valid.','The router reduces IPv4 TTL, updates the IPv4 header checksum and creates a new Ethernet frame on the server link. No NAT is present.','The server receives the new frame and demultiplexes the IP/TCP payload. Arrival alone does not prove TLS or an application transaction succeeded.'];
const fields=[['Source IP','sourceIP'],['Destination IP','destinationIP'],['Source MAC','sourceMAC'],['Destination MAC','destinationMAC'],['TCP source port','sourcePort'],['TCP destination port','destinationPort'],['IPv4 TTL','ttl'],['IPv4 header checksum','checksum']];
api.html=kind=>kind==='journey'?journeyHTML():kind==='link-budget'?budgetHTML():'';
function journeyHTML(){return `<div class="network-panel" id="packet-journey"><p class="kicker">PACKET JOURNEY / ONE ROUTED HOP</p><h3>One packet. Two local envelopes.</h3><p class="small">Synthetic documentation addresses. Ordinary IPv4/TCP, one router, no NAT, tunnels, VLAN tags, loss or TCP state. Neighbor resolution and permitted forwarding are assumed. Manual steps send no packets.</p><div class="journey-map-scroll" tabindex="0" role="region" aria-label="Packet topology; scroll horizontally on small screens"><svg class="journey-topology" viewBox="0 0 660 130" role="img" aria-labelledby="journey-title journey-desc"><title id="journey-title">Client through switch and router to server</title><desc id="journey-desc">The switch stays on the client link. The router connects to a second link and replaces the MAC addresses while decrementing TTL.</desc><path d="M85 52H575" fill="none" stroke="currentColor" stroke-width="2"/>${['Client','Switch','Router','Server'].map((name,i)=>`<g data-journey-node="${i}"><rect x="${i*165+10}" y="20" width="145" height="65" rx="7"/><text x="${i*165+82}" y="58" text-anchor="middle">${name}</text></g>`).join('')}<text x="170" y="117" text-anchor="middle" class="link-label">Client Ethernet link</text><text x="515" y="117" text-anchor="middle" class="link-label">Server Ethernet link</text></svg></div><p class="small">Follow the highlighted device. On a small screen, scroll the topology horizontally; the field table below shows the same state.</p><p id="journey-caption" aria-live="polite"></p><div class="comparison-scroll"><table class="comparison journey-fields"><caption id="journey-state-name"></caption><thead><tr><th scope="col">Field</th><th scope="col">Current value</th><th scope="col">At this step</th></tr></thead><tbody id="journey-fields"></tbody></table></div><div class="network-controls"><button id="journey-prev">← Previous packet step</button><button id="journey-next">Next packet step →</button><button id="journey-reset">Reset packet journey</button><span id="journey-count"></span></div><details><summary>Read the whole journey without operating controls</summary><ol>${names.map((name,i)=>`<li><b>${name}.</b> ${descriptions[i]} Source MAC ${packetJourney(i).sourceMAC}; destination MAC ${packetJourney(i).destinationMAC}; TTL ${packetJourney(i).ttl}.</li>`).join('')}</ol><p>All four steps keep source IP 192.0.2.10, destination IP 198.51.100.20 and TCP ports 51514 → 443. Ethernet FCS belongs to each frame and is not calculated by this model.</p></details></div>`}
const control=(key,label,value,step='1')=>`<label for="budget-${key}">${label}<input id="budget-${key}" type="number" min="${limits[key][0]}" max="${limits[key][1]}" step="${step}" value="${value}" required></label>`;
function budgetHTML(){return `<div class="network-panel" id="link-budget"><p class="kicker">LINK BUDGET / EXPLICIT ASSUMPTIONS</p><h3>Change size, capacity and delay separately.</h3><p class="small">Arithmetic model, not a network test. The inner packet is ICMP Echo with minimum IP headers; tunnel overhead is a user-supplied total. No IP options, IPv6 extensions, Ethernet overhead, fragmentation, congestion control, loss or endpoint processing is modeled.</p><div class="network-inputs"><label for="budget-version">Inner IP version<select id="budget-version"><option value="4">IPv4 · 20-byte header</option><option value="6">IPv6 · 40-byte header</option></select></label>${control('payload','Echo data (bytes)',1472)}${control('mtu','Underlay IP MTU (bytes)',1500)}${control('overhead','Extra tunnel headers (bytes)',0)}${control('rate','Link rate (decimal Mb/s)',100,'0.1')}${control('rtt','Independent RTT input (ms)',40,'0.1')}${control('propagation','One-way propagation input (ms)',10,'0.1')}${control('queue','One-way queue delay input (ms)',0,'0.1')}</div><p id="budget-error" role="status" hidden></p><div id="budget-output" aria-live="polite"><p id="budget-fit" class="network-result"></p><p id="budget-size"></p><div class="packet-bars" id="budget-bars" aria-hidden="true"></div><p class="small">Size composition: Echo data · IP + ICMP headers · optional tunnel headers. Exact byte counts appear above; narrow bar labels may be clipped.</p><p id="budget-caution" class="small"></p><dl class="budget-metrics"><dt>IP-unit serialization only</dt><dd id="budget-serialization"></dd><dt>One-way subtotal: one serialization + entered propagation + queue</dt><dd id="budget-subtotal"></dd><dt>BDP using independent entered RTT</dt><dd id="budget-bdp"></dd></dl><p class="small">RTT is independent of the one-way inputs; this tool does not infer one from the other. The subtotal omits additional links and processing. For an oversized unit, serialization is hypothetical at the entered size: the model does not transmit or fragment it.</p></div><button id="budget-reset">Reset link calculator</button><details><summary>Read the arithmetic without the calculator</summary><p>Inner IP size = Echo data + IP header + 8-byte ICMP header. Outer size = inner size + entered tunnel overhead. It fits when outer size ≤ underlay MTU. Maximum Echo data = MTU − overhead − IP header − 8. Serialization in milliseconds = outer bytes × 8 ÷ (Mb/s × 1000). BDP in bytes = Mb/s × RTT milliseconds × 125. The separate one-way subtotal adds one serialization, propagation and queue input.</p><p>For IPv4, data 1472, MTU 1500, overhead 0 and rate 100 Mb/s: inner/outer size 1500, maximum data 1472, serialization 0.12 ms. At RTT 40 ms, BDP is 500,000 bytes. With 10 ms propagation and zero queue, the stated one-way subtotal is 10.12 ms.</p></details></div>`}
api.mount=kind=>{
 if(kind==='journey'){
  let step=0;
  const show=()=>{const current=packetJourney(step),previous=step?packetJourney(step-1):null;
   document.querySelectorAll('[data-journey-node]').forEach((el,i)=>el.classList.toggle('active',i===step));
   document.querySelector('#journey-caption').textContent=descriptions[step];
   document.querySelector('#journey-state-name').textContent=names[step];
   document.querySelector('#journey-fields').innerHTML=fields.map(([label,key])=>{const changed=previous&&current[key]!==previous[key];return `<tr ${changed?'class="field-changed"':''}><th scope="row">${label}</th><td>${current[key]}</td><td>${changed?'Changed here':step?'Unchanged':'Initial value'}</td></tr>`}).join('');
   document.querySelector('#journey-count').textContent=`${step+1} / 4`;
   document.querySelector('#journey-prev').disabled=step===0;document.querySelector('#journey-next').disabled=step===3;
  };
  document.querySelector('#journey-prev').onclick=()=>{step=Math.max(0,step-1);show()};
  document.querySelector('#journey-next').onclick=()=>{step=Math.min(3,step+1);show()};
  document.querySelector('#journey-reset').onclick=()=>{step=0;show()};show();
 }
 if(kind==='link-budget'){
  const panel=document.querySelector('#link-budget');
  const update=()=>{
   const input={version:Number(document.querySelector('#budget-version').value)};
   for(const key of Object.keys(limits)){const el=document.querySelector('#budget-'+key);input[key]=el.value===''?NaN:Number(el.value)}
   let result;
   try{result=linkBudget(input);for(const el of panel.querySelectorAll('input'))if(!el.checkValidity())throw new RangeError('Use the displayed input ranges and steps.')}catch{
    document.querySelector('#budget-output').hidden=true;const error=document.querySelector('#budget-error');error.textContent='Enter valid numbers within each field’s range. Packet sizes must be whole bytes; rates must be positive. No result is shown for invalid inputs.';error.hidden=false;return;
   }
   document.querySelector('#budget-error').hidden=true;document.querySelector('#budget-output').hidden=false;
   document.querySelector('#budget-fit').textContent=`${result.fits?'Fits this model':'Too large for this model'} · maximum Echo data ${result.maxPayload.toLocaleString('en-US')} bytes.`;
   document.querySelector('#budget-size').textContent=`${input.payload} data + ${result.ipHeader} IP + 8 ICMP = ${result.inner} inner bytes; + ${input.overhead} tunnel = ${result.outer} outer bytes / MTU ${input.mtu}.`;
   document.querySelector('#budget-bars').innerHTML=[[input.payload,'Echo data'],[result.ipHeader+8,'IP + ICMP'],[input.overhead,'Tunnel']].filter(([n])=>n>0).map(([n,label])=>`<span style="flex-grow:${n}" title="${label}: ${n} bytes">${label}</span>`).join('');
   document.querySelector('#budget-caution').textContent=result.ipv6BelowMinimum?'IPv6 caution: the effective inner budget is below 1280 bytes. This arithmetic is not a valid ordinary IPv6 tunnel design; additional link adaptation/encapsulation handling would need separate engineering.':`IPv${input.version} ${input.version===6?'routers do not fragment packets.':'DF behavior and discovery policy matter for oversized packets.'} Fit here is arithmetic, not observed path delivery.`;
   document.querySelector('#budget-serialization').textContent=result.serialization.toLocaleString('en-US',{maximumFractionDigits:6})+' ms';
   document.querySelector('#budget-subtotal').textContent=result.subtotal.toLocaleString('en-US',{maximumFractionDigits:6})+' ms';
   document.querySelector('#budget-bdp').textContent=result.bdpBytes.toLocaleString('en-US',{maximumFractionDigits:2})+' bytes';
  };
  panel.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',update));
  document.querySelector('#budget-reset').onclick=()=>{panel.querySelectorAll('input').forEach(el=>el.value=el.defaultValue);document.querySelector('#budget-version').value='4';update()};update();
 }
};
})();
