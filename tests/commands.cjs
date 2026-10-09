// Execute only the reviewed read-only examples. Server-only cmdlets are not run on this workstation.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'content/batch-02.js'),'utf8'),ctx);
const lessons=ctx.window.INFRA_BATCHES['02'],cli=lessons[3];
const runBash=code=>spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','--noprofile','--norc','-s'],{input:code+'\n',encoding:'utf8',timeout:15000});
const results=[];
for(const [index,expected] of [[2,['2','previous status: 1']],[3,['default: 0','pipefail: 1']]]){
 const result=runBash(cli.commands[index].code);assert.equal(result.status,0,result.stderr);assert.deepEqual(result.stdout.trim().split(/\r?\n/).map(x=>x.trim()),expected);results.push({name:`CLI example ${index+1}`,result:'PASS',output:expected});
}
const linux=runBash('cat /etc/os-release | head -n 4\nuname -r\nps -p 1 -o comm=\nsystemctl is-active systemd-journald.service\napt-cache policy bash | head -n 4');assert.equal(linux.status,0,linux.stderr);assert.match(linux.stdout,/Ubuntu/);assert.match(linux.stdout,/systemd/);assert.match(linux.stdout,/active/);results.push({name:'Ubuntu distribution/kernel/systemd/package observations',result:'PASS',context:'Ubuntu 24.04 / WSL2; systemd active'});
for(const [index,c] of lessons[0].commands.entries()){
 // Output is deliberately not persisted: process inventories/events can contain private context.
 const encoded=Buffer.from(c.code,'utf16le').toString('base64');
 const r=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-EncodedCommand',encoded],{encoding:'utf8',timeout:20000});assert.equal(r.status,0,`Windows example ${index+1} failed`);assert(r.stdout.trim().length>0);results.push({name:`Windows read-only example ${index+1}`,result:'PASS',outputRetained:false});
}
results.push({name:'Windows Server role inventory',result:'NOT EXECUTED',reason:'No Windows Server VM provided; ServerManager syntax verified against Microsoft documentation; tabletop lab is explicit.'});
fs.writeFileSync(path.join(root,'docs/commands-batch-02.json'),JSON.stringify({date:'2026-10-04',results},null,2));console.log(JSON.stringify(results,null,2));
