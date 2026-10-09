// Only read-only inventory and bounded loopback packets; never configure links or probe external destinations.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../content/batch-03.js'),'utf8'),ctx);
const lessons=ctx.window.INFRA_BATCHES['03'],results=[],seen=new Set();
const bash=code=>spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','--noprofile','--norc','-s'],{input:'set -e\n'+code+'\n',encoding:'utf8',timeout:20000});
for(const l of lessons)for(const c of l.commands){
 if(seen.has(c.code))continue;seen.add(c.code);
 if(c.code.startsWith('netsh')){
  const r=spawnSync('netsh.exe',['wlan','show','interfaces'],{encoding:'utf8',timeout:15000});
  assert(!r.error,'netsh failed to start');
  const limited=/permission|location|denied|no wireless|not running/i.test(r.stdout+' '+r.stderr);
  if(!limited)assert.equal(r.status,0,'netsh failure');
  results.push({code:c.code,result:limited?'LIMITED':'PASS',note:limited?'Host WLAN inspection limited by permission/service/interface availability; no policy changed.':'Host WLAN inventory only; no RF capacity/roaming test.',outputRetained:false});continue;
 }
 if(c.platform.startsWith('Windows')){
  const encoded=Buffer.from('$ErrorActionPreference="Stop"\n'+c.code,'utf16le').toString('base64');
  const r=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-EncodedCommand',encoded],{encoding:'utf8',timeout:20000});assert.equal(r.status,0,'PowerShell inventory failed');assert(r.stdout.trim());results.push({code:c.code,result:'PASS',outputRetained:false});continue;
 }
 if(c.code.startsWith('ethtool')){
  const available=bash('command -v ethtool >/dev/null && ip link show eth0 >/dev/null');
  if(available.status!==0){results.push({code:c.code,result:'NOT EXECUTED',note:'Optional ethtool or example eth0 unavailable; no installation performed.'});continue;}
  const r=bash(c.code);results.push({code:c.code,result:r.status===0?'LIMITED':'NOT SUPPORTED',note:'WSL virtual interface only; no physical link-partner, duplex or cable validation.',outputRetained:false});continue;
 }
 assert(/^(ip |ping )/.test(c.code),'Unexpected command outside reviewed scope');
 if(c.code.startsWith('ping'))assert(c.code.endsWith('127.0.0.1'));
 const r=bash(c.code);assert.equal(r.status,0,`Command failed: ${c.code}`);
 if(c.code.startsWith('ping'))assert.match(r.stdout,/0% packet loss/);
 results.push({code:c.code,result:'PASS',outputRetained:false,note:c.code.startsWith('ping')?'Bounded local ICMP only; not a physical-path or WAN test.':'Read-only WSL network context; route get is a local lookup, not a probe.'});
}
results.push({name:'Physical network failure labs',result:'TABLETOP',note:'No switch/router/AP/physical Linux NIC supplied; VLAN, RF, cable, tunnel and duplex failure records are explicitly synthetic. No network configuration changed.'});
fs.writeFileSync(path.join(__dirname,'../docs/commands-batch-03.json'),JSON.stringify({date:'2026-10-04',results},null,2));console.log(JSON.stringify(results,null,2));
