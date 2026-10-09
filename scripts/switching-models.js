'use strict';
(() => {
const edges=[['A','B'],['A','C'],['B','C']];
function spanningTree(failed='none'){
 if(!['none','AB','AC','BC'].includes(failed))throw new RangeError('Unknown link failure.');
 const active=edges.filter(e=>e.join('')!==failed),dist={A:0,B:Infinity,C:Infinity};
 for(let i=0;i<3;i++)for(const [a,b] of active){dist[a]=Math.min(dist[a],dist[b]+10);dist[b]=Math.min(dist[b],dist[a]+10);}
 const rootPort={};
 for(const node of ['B','C']){const options=active.filter(e=>e.includes(node)).map(e=>e.find(n=>n!==node)).sort((a,b)=>dist[a]-dist[b]||a.localeCompare(b));rootPort[node]=options[0];}
 const ports=[];
 for(const [a,b] of edges){const off=a+b===failed;const designated=dist[a]<dist[b]?a:dist[b]<dist[a]?b:a;
  for(const [node,peer] of [[a,b],[b,a]]){const role=off?'Disabled':rootPort[node]===peer?'Root':designated===node?'Designated':'Alternate';ports.push({link:a+b,node,peer,role,state:off?'Down':role==='Alternate'?'Discarding':'Forwarding'});}
 }
 return {root:'A',dist,ports,forwardingLinks:edges.filter(([a,b])=>ports.filter(p=>p.link===a+b).every(p=>p.state==='Forwarding')).map(e=>e.join(''))};
}
const portVlan={p1:10,p2:10,p3:10,p4:20};
const frames=[{time:0,port:'p1',vlan:10,src:'A',dst:'B'},{time:1,port:'p2',vlan:10,src:'B',dst:'A'},{time:2,port:'p1',vlan:10,src:'A',dst:'B'},{time:3,port:'p3',vlan:10,src:'A',dst:'B'},{time:304,port:'p1',vlan:10,src:'C',dst:'B'},{time:305,port:'p4',vlan:20,src:'D',dst:'C'}];
function macLearning(index){
 if(!Number.isInteger(index)||index<0||index>=frames.length)throw new RangeError('Unknown frame.');
 const table=new Map();let result;
 for(let i=0;i<=index;i++){
  const f=frames[i],expired=[];for(const [key,entry] of table)if(f.time-entry.seen>=300){expired.push(entry.mac);table.delete(key);}
  const key=f.vlan+'|'+f.src,old=table.get(key),learning=old?(old.port===f.port?'Refresh':'Move'):'Learn';
  table.set(key,{mac:f.src,vlan:f.vlan,port:f.port,seen:f.time});
  const destination=table.get(f.vlan+'|'+f.dst),eligible=Object.keys(portVlan).filter(p=>p!==f.port&&portVlan[p]===f.vlan);
  const egress=destination?(eligible.includes(destination.port)?[destination.port]:[]):eligible;
  result={frame:{...f},learning,oldPort:old?.port||null,expired,reason:destination?'Known unicast lookup':'Unknown destination in this VLAN',egress,table:[...table.values()].map(x=>({...x}))};
 }
 return result;
}
function html(kind){
 if(kind==='spanning-tree')return `<div class="calculator service-tool" id="stp-tool"><p class="kicker">INTERACTIVE / STABLE TREE</p><h3>A triangle without a forwarding cycle</h3><label for="stp-failure">Unavailable link</label><select id="stp-failure"><option value="none">None · all links available</option><option value="AB">A–B down</option><option value="AC">A–C down</option><option value="BC">B–C down</option></select><p class="small">One tree instance, A &lt; B &lt; C bridge IDs, cost 10 per link, no parallel links. Shows eventual stable RSTP-style roles, not timers or BPDU exchanges.</p><div id="stp-result" aria-live="polite"><div id="stp-diagram"></div><p id="stp-paths"></p><div class="table-wrap" tabindex="0" role="region" aria-label="Stable port roles, scroll horizontally if needed"><table><thead><tr><th>Link end</th><th>Role</th><th>State</th></tr></thead><tbody id="stp-ports"></tbody></table></div></div><button id="stp-reset">Restore all links</button></div>`;
 if(kind==='mac-learning')return `<div class="calculator service-tool" id="mac-tool"><p class="kicker">INTERACTIVE / FRAME REPLAY</p><h3>Learn the source, look up the destination</h3><p class="small">A/B/C/D are distinct unicast MAC labels, not IP names. p1–p3 belong to VLAN 10; only p4 belongs to VLAN 20. Empty initial table; all entries dynamic; illustrative 300-second aging. No real frames are sent.</p><div id="mac-result" aria-live="polite"><h3 id="mac-frame"></h3><p id="mac-action"></p><p id="mac-egress"></p><p id="mac-expired"></p><div class="table-wrap" tabindex="0" role="region" aria-label="Learned MAC entries, scroll horizontally if needed"><table><thead><tr><th>MAC</th><th>VLAN</th><th>Port</th><th>Last seen</th></tr></thead><tbody id="mac-entries"></tbody></table></div></div><div class="flow-controls"><button id="mac-prev">Previous frame</button><button id="mac-next">Next frame</button><button id="mac-reset">Reset replay</button><span id="mac-count"></span></div></div>`;
 return '';
}
function tableRows(id,values){const body=document.getElementById(id);body.replaceChildren();for(const cells of values){const tr=document.createElement('tr');cells.forEach((value,i)=>{const cell=document.createElement(i?'td':'th');if(!i)cell.scope='row';cell.textContent=String(value);tr.append(cell);});body.append(tr);}}
function stpSVG(tree){
 const coords={A:[200,42],B:[55,205],C:[345,205]};
 const lines=edges.map(([a,b])=>{const ends=tree.ports.filter(p=>p.link===a+b),off=ends[0].state==='Down',blocked=ends.find(p=>p.state==='Discarding');const [x1,y1]=coords[a],[x2,y2]=coords[b];const label=off?`${a}–${b}: down`:blocked?`${a}–${b}: ${blocked.node} discards`:`${a}–${b}: forwards`;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${off?'var(--muted)':blocked?'var(--amber)':'var(--accent)'}" stroke-width="3" ${off||blocked?'stroke-dasharray="7 5"':''}/><text x="${(x1+x2)/2}" y="${a==='B'?242:(y1+y2)/2-9}" text-anchor="middle" fill="var(--ink)" font-size="18">${label}</text>`;
 }).join('');
 return `<svg viewBox="0 0 400 270" role="img" aria-labelledby="stp-svg-title stp-svg-desc"><title id="stp-svg-title">Stable triangle forwarding topology</title><desc id="stp-svg-desc">${tree.forwardingLinks.join(' and ')} forward at both ends. Root A. Endpoint roles are also listed in the table.</desc>${lines}${Object.entries(coords).map(([n,[x,y]])=>`<circle cx="${x}" cy="${y}" r="25" fill="var(--surface)" stroke="var(--accent)" stroke-width="${n==='A'?4:2}"/><text x="${x}" y="${y+5}" text-anchor="middle" fill="var(--ink)" font-size="22">${n}</text>`).join('')}</svg>`;
}
function mount(kind){
 if(kind==='spanning-tree'){const select=document.getElementById('stp-failure');const update=()=>{const t=spanningTree(select.value);document.getElementById('stp-diagram').innerHTML=stpSVG(t);document.getElementById('stp-paths').textContent=`Root A · cost from B: ${t.dist.B} · cost from C: ${t.dist.C}. Both-end forwarding links: ${t.forwardingLinks.join(', ')}.`;tableRows('stp-ports',t.ports.map(p=>[`${p.node} → ${p.peer}`,p.role,p.state]));};select.addEventListener('change',update);document.getElementById('stp-reset').addEventListener('click',()=>{select.value='none';update();});update();
 }else if(kind==='mac-learning'){let index=0;const update=()=>{const r=macLearning(index),f=r.frame;document.getElementById('mac-frame').textContent=`t=${f.time}s · ${f.src} → ${f.dst} · ingress ${f.port} / VLAN ${f.vlan}`;document.getElementById('mac-action').textContent=`${r.learning} source ${f.src}${r.learning==='Move'?' from '+r.oldPort:''} on ${f.port}. ${r.reason}.`;document.getElementById('mac-egress').textContent='Egress: '+(r.egress.join(', ')||'none eligible in this VLAN (ingress excluded)');document.getElementById('mac-expired').textContent='Expired before this frame: '+(r.expired.join(', ')||'none');tableRows('mac-entries',r.table.map(e=>[e.mac,e.vlan,e.port,e.seen+'s']));document.getElementById('mac-count').textContent=`${index+1} / ${frames.length}`;document.getElementById('mac-prev').disabled=index===0;document.getElementById('mac-next').disabled=index===frames.length-1;};document.getElementById('mac-prev').addEventListener('click',()=>{if(index>0)index--;update();});document.getElementById('mac-next').addEventListener('click',()=>{if(index<frames.length-1)index++;update();});document.getElementById('mac-reset').addEventListener('click',()=>{index=0;update();});update();}
}
const api={spanningTree,macLearning,html,mount};if(typeof module!=='undefined'&&module.exports)module.exports=api;else window.SwitchingModels=api;
})();
