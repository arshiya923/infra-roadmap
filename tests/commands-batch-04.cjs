const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(__dirname,'../content/batch-04.js'),'utf8'),c);const lessons=c.window.INFRA_BATCHES['04'];
const expected={
 '0:0':'11000000\n192','0:1':'128\n256 255','1:0':'3221225985\n192.0.2.1','1:1':"['192.0.2.20', '192.0.2.100']",'2:0':'C0\n192\n16','2:1':'0000110110111000\na00','3:1':'192.0.2.130\n192.0.2.128/26','4:0':'2001:db8::1\n2001:0db8:0000:0000:0000:0000:0000:0001','5:0':'192.0.2.128/26\n255.255.255.192\n64','5:1':'True\nFalse','6:0':"[IPv4Network('192.0.2.0/26'), IPv4Network('192.0.2.64/26'), IPv4Network('192.0.2.128/26'), IPv4Network('192.0.2.192/26')]",'6:1':'False\nTrue','7:0':'192.0.2.128 192.0.2.191 64\n255.255.255.192','7:1':"[IPv4Address('192.0.2.0'), IPv4Address('192.0.2.1')]\n[IPv4Address('192.0.2.1')]"
};const results=[];
for(let i=0;i<8;i++)for(const [j,cmd] of lessons[i].commands.entries()){
 const match=cmd.code.match(/^python -c "([\s\S]+)"$/);let r;
 if(match){r=spawnSync('python',['-c',match[1]],{encoding:'utf8',timeout:10000});assert.equal(r.status,0,r.stderr);assert.equal(r.stdout.trim().replace(/\r\n/g,'\n'),expected[i+':'+j]);results.push({topicId:lessons[i].id,command:j+1,result:'PASS',output:r.stdout.trim().split(/\r?\n/)});}
 else{assert(cmd.code.startsWith('ip -'));r=spawnSync('wsl.exe',['-d','Ubuntu-24.04','--','bash','-s'],{input:'set -e\n'+cmd.code+'\n',encoding:'utf8',timeout:15000});assert.equal(r.status,0,r.stderr);results.push({topicId:lessons[i].id,command:j+1,result:'PASS',outputRetained:false,context:'Read-only WSL network context; no physical/remote reachability claim.'});}
}
fs.writeFileSync(path.join(__dirname,'../docs/commands-batch-04.json'),JSON.stringify({date:'2026-10-04',result:'PASS',results,foundationLabEvidence:'foundation-lab-results.json'},null,2));console.log(`PASS ${results.length} exact lesson commands; foundation runner verified separately.`);
