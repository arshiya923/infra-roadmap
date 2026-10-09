import copy,importlib.util,json,subprocess,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1];spec=importlib.util.spec_from_file_location('lab',R/'labs/automation-lab.py');lab=importlib.util.module_from_spec(spec);spec.loader.exec_module(lab)
checks=0
def check(value):
 global checks
 assert value;checks+=1
def reject(value):
 global checks
 try:lab.validate(value)
 except (ValueError,TypeError):checks+=1
 else:raise AssertionError('Invalid accepted: '+repr(value))
for vlan in range(-2,4098):
 value=copy.deepcopy(lab.BASE);value['devices'][0]['vlan']=vlan
 if 1<=vlan<=4094:check(lab.validate(value)['devices'][0]['vlan']==vlan)
 else:reject(value)
for field,values in {'name':['','a\ncommand','../escape',1],'address':['999.1.1.1',None,1],'vlan':[True,False,'20',20.0],'enabled':['false',1,None]}.items():
 for bad in values:
  value=copy.deepcopy(lab.BASE);value['devices'][0][field]=bad;reject(value)
for field in ['name','address']:
 value=copy.deepcopy(lab.BASE);value['devices'][1][field]=value['devices'][0][field];reject(value)
for bad in [None,[],{},dict(lab.BASE,extra=1),dict(lab.BASE,revision=True),dict(lab.BASE,devices=[])]:reject(bad)
try:lab.decode('{"vlan":10,"vlan":20}')
except ValueError:checks+=1
else:raise AssertionError('duplicate accepted')
before=copy.deepcopy(lab.BASE);out=lab.render(before);check(before==lab.BASE);check(out==b'# LOCAL PLAN ONLY; not vendor CLI\nedge-a address=192.0.2.10 vlan=10 enabled=true\nedge-b address=192.0.2.11 vlan=10 enabled=true\n')
reverse=copy.deepcopy(before);reverse['devices'].reverse();check(lab.render(reverse)==out)
runs=[]
for phase in [None,*lab.PHASES]:
 args=[sys.executable,str(R/'labs/automation-lab.py'),'--run']+(['--inject-failure',phase] if phase else [])
 p=subprocess.run(args,capture_output=True,text=True,check=False);check(p.returncode==(2 if phase else 0));r=json.loads(p.stdout);check(r['restored'] and r['cleaned']);check(not Path(r['ownedDirectory']).exists());check(r['result']==('INTERRUPTED' if phase else 'PASS'));runs.append(r)
 if phase:check(r['interruptedAt']==phase)
 else:
  check(r['invalidRejected'] and r['changed'] and not r['secondChanged'] and r['staleRejected']);check(r['designCalculations']['rtoGapMinutes']==10);check(r['designCalculations']['rpoGapMinutes']==25)
  check([x['phase'] for x in r['events']]==list(lab.PHASES))
  check(r['events'][0]['sha256']==lab.digest(out))
  check(r['events'][1]['sha256']==r['artifactSha256'])
  check(r['events'][2]['sha256']==lab.digest(b'LOCAL DRIFT\n'))
  check(r['events'][3]['sha256']==lab.digest(out))
help_result=subprocess.run([sys.executable,str(R/'labs/automation-lab.py')],capture_output=True,text=True);check(help_result.returncode==0 and '--inject-failure' in help_result.stdout)
(R/'docs/automation-lab-results.json').write_text(json.dumps(dict(result='PASS',checks=checks,runs=runs),indent=2)+'\n',encoding='utf-8');print('PASS',checks,'local lab checks')
