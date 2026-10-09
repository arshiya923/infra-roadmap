'use strict';
// Independent primary expectations for the first ten Batch10 models.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),rc=require('../scripts/route-control-models.js'),vf=require('../scripts/vrf-scope-models.js'),gr=require('../scripts/gateway-redundancy-models.js');let cases=0;
const bits=(mask,n)=>Array.from({length:n},(_,i)=>!!(mask&(1<<i)));
for(let m=0;m<256;m++){
 const [sessionEstablished,importPermit,exportPermit,nextHopResolved,bgpSelected,systemSelected,forwardReady,returnReady]=bits(m,8);
 const s={sessionEstablished,importPermit,exportPermit,nextHopResolved,bgpSelected,systemSelected,forwardReady,returnReady},v=rc.evaluate('route-filtering',s);
 const imported=sessionEstablished&&importPermit,choice=imported&&nextHopResolved&&bgpSelected;
 assert.equal(v.received,imported);assert.equal(v.bgpChoice,choice);assert.equal(v.advertised,choice&&exportPermit);assert.equal(v.systemChoice,choice&&systemSelected);assert.equal(v.exchangePrerequisites,choice&&systemSelected&&forwardReady&&returnReady);cases++;
}
for(let third=0;third<256;third++)for(const last of [0,1,77,255]){
 const s=rc.preset('access-lists','wildcard-even');s.source=`10.1.${third}.${last}`;assert.equal(rc.evaluate('access-lists',s).permitted,third%2===0);cases++;
}
for(const family of ['ipv4','ipv6'])for(const routePrefix of ['198.51.100.0/24','198.51.100.0/25','203.0.113.0/24'])for(const sourceTag of [0,100,200])for(let m=0;m<64;m++){
 const [sourceSelected,seedPresent,targetSelected,systemSelected,forwardReady,returnReady]=bits(m,6),s={...rc.preset('route-redistribution','baseline'),family,routePrefix,sourceTag,sourceSelected,seedPresent,targetSelected,systemSelected,forwardReady,returnReady},v=rc.evaluate('route-redistribution',s);
 const admitted=family==='ipv4'&&routePrefix==='198.51.100.0/24'&&sourceTag!==100&&sourceSelected&&seedPresent;
 assert.equal(v.permitted,admitted);assert.equal(v.targetTag,admitted?100:null);assert.equal(v.exchangePrerequisites,admitted&&targetSelected&&systemSelected&&forwardReady&&returnReady);cases++;
}
for(const prefix of ['198.51.100.0/24','198.51.100.128/25','198.51.100.240/28','198.51.100.248/29','198.51.101.0/25'])for(const ruleset of ['bounded','list-deny']){
 const s={...rc.preset('route-maps','baseline'),routePrefix:prefix,ruleset},v=rc.evaluate('route-maps',s);
 const permitted=ruleset==='list-deny'||['198.51.100.128/25','198.51.100.240/28'].includes(prefix);
 assert.equal(v.permitted,permitted);assert.equal(v.localPref,permitted?200:null);cases++;
}
for(const kind of ['vrf','vrf-lite'])for(const context of ['BLUE','RED','default'])for(const target of ['overlap','service'])for(let m=0;m<256;m++){
 const [present,resolved,selected,sourceService,permit,policy,forward,back]=bits(m,8),s=vf.preset(kind,'overlap-blue');
 s.attachment=context==='default'?'default-port':kind==='vrf'?context==='BLUE'?'blue-lan':'red-lan':context==='BLUE'?'blue-dot10':'red-dot20';
 s.ingressVRF=s.endpointVRF=s.gatewayOwner=context;s.target=target;
 if(kind==='vrf-lite')s.packetVlan=context==='BLUE'?10:context==='RED'?20:0;
 s.blueOverlap=s.redOverlap=s.defaultOverlap=present;s.blueService=sourceService;s.leakPermit=permit;
 s.blueResolved=s.redResolved=s.defaultResolved=s.leakResolved=resolved;s.blueSelected=s.redSelected=s.defaultSelected=s.leakSelected=selected;
 s.servicePolicyReady=policy;s.forwardReady=forward;s.returnReady=back;
 const v=vf.evaluate(kind,s),candidate=target==='overlap'?present:context==='BLUE'?sourceService:context==='RED'?sourceService&&permit:false;
 assert.equal(v.queried.candidate,candidate);assert.equal(v.selectedRouteInstalled,candidate&&resolved&&selected);assert.equal(v.exchangePrerequisites,candidate&&resolved&&selected&&policy&&forward&&back);cases++;
}
for(const kind of ['hsrp','vrrp'])for(const current of ['none','A','B'])for(const aPriority of [90,100,110])for(const bPriority of [90,100,110])for(let m=0;m<32;m++){
 const [aAlive,bAlive,aPreempt,bPreempt,returnReady]=bits(m,5),s={...gr.preset(kind,'active'),current,aPriority,bPriority,aAlive,bAlive,aPreempt,bPreempt,returnReady};
 const highest=!aAlive&&!bAlive?'none':!aAlive?'B':!bAlive?'A':aPriority>bPriority?'A':'B';
 for(const expired of [false,true]){
  s.expired=expired;const priorAvailable=current==='A'?aAlive:current==='B'?bAlive:false;
  if(expired&&(current==='none'||priorAvailable)){assert.throws(()=>gr.evaluate(kind,s));continue;}
  let expected=current;
  if(current==='none')expected=highest;
  else if(!priorAvailable){if(expired)expected=highest;}
  else if(current==='A'&&bAlive&&bPriority>aPriority&&bPreempt)expected='B';
  else if(current==='B'&&aAlive&&aPriority>bPriority&&aPreempt)expected='A';
  const v=gr.evaluate(kind,s);assert.equal(v.active,expected);const available=expected==='A'?aAlive:expected==='B'?bAlive:false;assert.equal(v.exchangePrerequisites,available&&returnReady);cases++;
 }
}
for(const current of ['none','A','B'])for(let m=0;m<8;m++){
 const [aAlive,aPreempt,bAlive]=bits(m,3),s={...gr.preset('vrrp','owner'),current,aAlive,aPreempt,bAlive},v=gr.evaluate('vrrp',s);if(aAlive){assert.equal(v.active,'A');assert.equal(v.primaryA,'192.0.2.1');}cases++;
}
for(const avg of ['none','A','B'])for(const macAOwner of ['none','A','B'])for(const macBOwner of ['none','A','B'])for(let m=0;m<32;m++){
 const [aAlive,bAlive,arpReady,aUplink,returnReady]=bits(m,5),s={...gr.preset('glbp','split'),avg,macAOwner,macBOwner,aAlive,bAlive,arpReady,aUplink,returnReady},v=gr.evaluate('glbp',s);
 assert.equal(v.newArpAnswer,(avg==='A'?aAlive:avg==='B'?bAlive:false)&&arpReady);
 for(const [i,owner] of [macAOwner,macBOwner].entries()){const ready=owner==='A'?aAlive&&aUplink:owner==='B'?bAlive:false;assert.equal(v.hosts[i].forwardReady,ready);assert.equal(v.hosts[i].exchangePrerequisites,ready&&returnReady);}cases++;
}
const sources=['content/batch-10.js','scripts/route-control-models.js','scripts/vrf-scope-models.js','scripts/gateway-redundancy-models.js','tests/batch-10-primary.cjs'];
fs.writeFileSync(path.join(root,'docs/batch-10-primary-model-results.json'),JSON.stringify({date:'2026-10-09',result:'PASS',independentCases:cases,sourceSha256:Object.fromEntries(sources.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')])),scope:'Independent supplied-declaration expectations; no target router, packet, protocol FSM or convergence execution.'},null,2)+'\n');
console.log('PASS '+cases+' independent primary expectations for route control, VRF and gateway redundancy');
