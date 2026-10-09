"""Structural and guided-command classification checks, not Cisco parser execution."""
from pathlib import Path
import hashlib,json,re,subprocess,sys
R=Path(__file__).resolve().parents[1];b=sys.argv[1]
ls=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'))[b]
allowed={'show version','show inventory','show feature','show interface brief','show interface trunk','show module','show vpc brief','show port-channel summary','show vpc peer-keepalive','show fex','show ip route','show nve peers','show nve vni','show vlan brief','show nve interface','show bgp l2vpn evpn','show bgp l2vpn evpn summary'}
checks=[]
for l in ls:
 assert len(l['exams'])==10 and len(l['quick'])==3
 assert len(set(q['question'] for q in l['exams']))==10
 assert l['ciscoDC']['fault'] in l['configuration'] and l['ciscoDC']['restore'] in l['lab']['verification']
 assert not re.search(r'\bTODO\b|COMING SOON|PLACEHOLDER',json.dumps(l))
 for c in l['commands']:
  for line in c['code'].splitlines():
   assert line in allowed or line.startswith('python labs/cisco-dc-fabric.py') or line.startswith('APIC GUI:') or line.startswith('GET /api/'),(l['id'],line)
  assert 'not executed' in c['platform'] or l['id']=='lab-7'
 for q in l['exams']+l['quick']:
  assert q['type']=='short-answer' and q['answer'] and q['explanation']
 for a in l['artifacts']:assert (R/a['path']).is_file()
 checks.append(dict(id=l['id'],questions=13,commandExecution='Guided and unexecuted on Cisco targets',result='PASS'))
result=dict(date='2026-10-09',result='PASS',batch=b,topics=len(ls),checks=checks,scope='Structure, question identifiers/answers, incident continuity, artifact paths and command classification only. No vendor parser or device execution.')
(R/f'docs/cisco-dc-content-{b}-results.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');print(json.dumps(dict(result='PASS',topics=len(ls),questions=len(ls)*13)))
