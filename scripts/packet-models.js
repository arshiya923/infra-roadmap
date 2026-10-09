'use strict';
(() => {
const packets=[
 ['ARP',42,42,'Who has 192.0.2.20?','Broadcast request from 192.0.2.10; no TCP/UDP port.'],
 ['ARP',42,42,'192.0.2.20 is at 02:00:00:00:00:14','A mapping assertion, not authenticated endpoint identity.'],
 ['ICMP',51,51,'Echo request · id 123 · seq 1','Request bytes are present; this row alone does not show a reply.'],
 ['ICMP',51,51,'Echo reply · id 123 · seq 1','A matching synthetic reply is present; no application transaction is validated.'],
 ['TCP',54,54,'50000 → 443 · SYN · seq 100','Connection initiation; port 443 alone does not establish TLS.'],
 ['TCP',54,54,'443 → 50000 · SYN,ACK · seq 200 · ack 101','Acknowledges the client SYN and proposes the server sequence.'],
 ['TCP',54,54,'50000 → 443 · ACK · seq 101 · ack 201','Completes the represented three-way handshake; application health is separate.'],
 ['DNS',76,76,'Query · example.lab.test. · A · id 0xbeef','Question uses UDP; its answer is represented in the next record.'],
 ['DNS',92,92,'Response · A 192.0.2.20 · TTL 60','Response data exists; the returned service address was never contacted.'],
 ['TCP',54,162,'50000 → 443 · PSH,ACK · declared payload 108 bytes','Only Ethernet/IP/TCP headers were saved. The 108 payload bytes are absent; do not reconstruct them from a length field.']
].map(([protocol,captured,original,summary,meaning],i)=>({number:i+1,protocol,captured,original,summary,meaning}));
function select(filter='all'){if(!['all','ARP','ICMP','TCP','DNS','truncated'].includes(filter))throw new RangeError('Unknown teaching filter');return packets.filter(p=>filter==='all'||filter==='truncated'&&p.captured<p.original||p.protocol===filter).map(p=>({...p}));}
function html(kind){if(kind!=='packet-inspection')return '';return `<div class="calculator service-tool" id="packet-tool"><p class="kicker">INTERACTIVE / SYNTHETIC CAPTURE</p><h3>Inspect the bytes actually saved</h3><p class="small">Ten generated Ethernet records; no live traffic. Filter choices below are teaching categories, not a free-form capture/display-filter parser. Fixed timestamps are not measured latency.</p><label for="packet-filter">Visible packet category</label><select id="packet-filter"><option value="all">All records</option><option value="ARP">ARP</option><option value="ICMP">ICMP</option><option value="TCP">TCP</option><option value="DNS">DNS</option><option value="truncated">Truncated records</option></select><p id="packet-count" aria-live="polite"></p><div id="packet-buttons" class="flow-controls"></div><div id="packet-detail" aria-live="polite"></div><button id="packet-reset">Show all records</button></div>`;}
function mount(kind){if(kind!=='packet-inspection')return;const el=id=>document.getElementById('packet-'+id);let current=1;
function render(){const rows=select(el('filter').value);if(!rows.some(p=>p.number===current))current=rows[0].number;el('count').textContent=rows.length+' of 10 records shown';el('buttons').innerHTML=rows.map(p=>`<button data-packet="${p.number}" aria-pressed="${p.number===current}">Packet ${p.number} · ${p.protocol}</button>`).join('');const p=rows.find(p=>p.number===current);el('detail').innerHTML=`<h3>Packet ${p.number} · ${p.protocol}</h3><p>${p.summary}</p><p><strong>Captured:</strong> ${p.captured} bytes · <strong>Original length field:</strong> ${p.original} bytes</p><p>${p.meaning}</p>`;}
el('filter').addEventListener('change',render);el('buttons').addEventListener('click',event=>{const button=event.target.closest('[data-packet]');if(button){current=Number(button.dataset.packet);render();el('buttons').querySelector(`[data-packet="${current}"]`).focus();}});el('reset').addEventListener('click',()=>{el('filter').value='all';current=1;render();});render();}
const api={select,html,mount};if(typeof module!=='undefined')module.exports=api;if(typeof window!=='undefined')window.PacketModels=api;
})();
