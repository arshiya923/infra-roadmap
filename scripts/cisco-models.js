'use strict';
(() => {
const clone=x=>JSON.parse(JSON.stringify(x));
const initial=()=>({mode:'user',running:{hostname:'Lab',description:null,shutdown:true},startup:{hostname:'Lab',description:null,shutdown:true}});
function config(c){return ['hostname '+c.hostname,'interface GigabitEthernet1',...(c.description===null?[]:[' description '+c.description]),c.shutdown?' shutdown':' no shutdown','end'].join('\n');}
function prompt(s){return s.running.hostname+({user:'>',privileged:'#',global:'(config)#',interface:'(config-if)#'}[s.mode]);}
function execute(previous,input){const s=clone(previous),c=String(input).trim();let output='',ok=true;
 const reject=message=>{ok=false;output='% Teaching model: '+message;};
 if(c==='?')output=({user:'enable | show version | ? | exit',privileged:'disable | configure terminal | show version | show running-config | show startup-config | exit (session notice) | copy running-config startup-config | copy startup-config running-config | ?',global:'hostname NAME | interface GigabitEthernet1 | do show running-config | exit | end | ?',interface:'description TEXT | no description | shutdown | no shutdown | exit | end | ?'}[s.mode]);
 else if(c==='show version'&&['user','privileged'].includes(s.mode))output='SYNTHETIC IDENTITY: IOS XE family example; no image, platform, release, license or uptime has been inspected. Run show version on your authorized device for actual evidence.';
 else if(c==='enable'&&s.mode==='user'){s.mode='privileged';output='Model mode changed. No password/AAA authentication is implemented.';}
 else if(c==='disable'&&s.mode==='privileged')s.mode='user';
 else if(c==='configure terminal'&&s.mode==='privileged')s.mode='global';
 else if(c==='interface GigabitEthernet1'&&s.mode==='global')s.mode='interface';
 else if(c==='end'&&['global','interface'].includes(s.mode))s.mode='privileged';
 else if(c==='exit'){if(s.mode==='interface')s.mode='global';else if(s.mode==='global')s.mode='privileged';else output='EXEC exit ends a real terminal session. This browser retains the exercise and mode; use disable to return from privileged to user EXEC in the model.';}
 else if(/^hostname [A-Za-z][A-Za-z0-9-]{0,30}$/.test(c)&&s.mode==='global')s.running.hostname=c.slice(9);
 else if(/^description .{1,80}$/.test(c)&&s.mode==='interface')s.running.description=c.slice(12);
 else if(c==='no description'&&s.mode==='interface')s.running.description=null;
 else if(c==='shutdown'&&s.mode==='interface')s.running.shutdown=true;
 else if(c==='no shutdown'&&s.mode==='interface')s.running.shutdown=false;
 else if(c==='show running-config'&&s.mode==='privileged'||c==='do show running-config'&&['global','interface'].includes(s.mode))output=config(s.running);
 else if(c==='show startup-config'&&s.mode==='privileged')output=config(s.startup);
 else if(c==='copy running-config startup-config'&&s.mode==='privileged'){s.startup=clone(s.running);output='MODEL SAVE: running → startup. Destination prompts and filesystem failures are not simulated.';}
 else if(c==='copy startup-config running-config'&&s.mode==='privileged'){s.running.hostname=s.startup.hostname;s.running.shutdown=s.startup.shutdown;if(s.startup.description!==null)s.running.description=s.startup.description;output='MODEL MERGE: saved commands applied to running. An absent saved description does not remove an existing running description.';}
 else if(c==='show ?'&&s.mode==='privileged')output='version | running-config | startup-config (only this model subset)';
 else reject('Unsupported command or wrong mode. Use ? for this model’s exact subset; abbreviations and other IOS commands are not implemented.');
 return {state:s,ok,output:output||'Model command applied.'};}
function reboot(s){const next=clone(s);next.running=clone(s.startup);next.mode='user';return next;}
function html(kind){if(kind!=='cisco-cli')return '';return `<div class="calculator service-tool" id="cisco-tool"><p class="kicker">INTERACTIVE / BOUNDED TEACHING MODEL</p><h3>Context, active changes and saved state</h3><p class="small">Local simulation only. No Cisco device, software image, authentication, routing, interface link or persistent filesystem is emulated. EXEC exit is explained without creating or closing a terminal session; disable changes the represented EXEC level. Exact supported commands: use ?. Input changes only this panel and is never sent to a shell or network.</p><form id="cisco-form"><label for="cisco-command">Command after <span id="cisco-prompt"></span></label><input id="cisco-command" autocomplete="off" spellcheck="false" maxlength="100" placeholder="Try enable"><button type="submit">Run in model</button></form><p id="cisco-status" aria-live="polite"></p><pre id="cisco-output" tabindex="0" aria-label="Teaching command output"></pre><div class="flow-controls"><button id="cisco-help">Help for current mode</button><button id="cisco-reboot">Simulate reboot from saved state</button><button id="cisco-reset">Reset entire exercise</button></div><h3>Running configuration · model</h3><pre id="cisco-running" tabindex="0" aria-label="Model running configuration"></pre><h3>Startup configuration · model</h3><pre id="cisco-startup" tabindex="0" aria-label="Model startup configuration"></pre><p id="cisco-difference" aria-live="polite"></p></div>`;}
function mount(kind){if(kind!=='cisco-cli')return;let state=initial();const el=x=>document.getElementById('cisco-'+x);
 const render=()=>{el('prompt').textContent=prompt(state);el('running').textContent=config(state.running);el('startup').textContent=config(state.startup);el('difference').textContent=config(state.running)===config(state.startup)?'Model running and startup representations match. Operational behavior is untested.':'Model running and startup differ. Inspect the changed fields before saving.';};
 const run=c=>{const result=execute(state,c);state=result.state;el('output').textContent=result.output;el('status').textContent=result.ok?'Accepted by teaching model':'Rejected by teaching model';render();};
 el('form').addEventListener('submit',e=>{e.preventDefault();run(el('command').value);el('command').value='';el('command').focus();});el('help').addEventListener('click',()=>run('?'));el('reset').addEventListener('click',()=>{state=initial();el('output').textContent='Exercise reset, including both model configurations.';el('status').textContent='Reset';render();});el('reboot').addEventListener('click',()=>{state=reboot(state);el('output').textContent='Model reboot: saved state replaces active state. No real reboot, boot-variable processing or hardware failure is simulated.';el('status').textContent='Model reboot complete';render();});render();run('?');}
const api={initial,config,prompt,execute,reboot,html,mount};if(typeof module!=='undefined')module.exports=api;if(typeof window!=='undefined')window.CiscoModels=api;
})();
