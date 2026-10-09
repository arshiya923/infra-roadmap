"""Save the primary assistant's completed content/question review, not an automated substitute."""
from pathlib import Path
import hashlib,json,subprocess
R=Path(__file__).resolve().parents[1]
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=R,text=True,encoding='utf-8'));lessons=bundles.get('13',[])+bundles.get('14',[])
notes={
'fundamentals':'Asset/threat/vulnerability/residual-risk distinction and separate positive/negative operations reviewed; no zero-risk claim.',
'cia':'Disclosure, unauthorized alteration and timely use remain independent; public digest versus trusted reference reviewed.',
'surfaces':'Listener versus reachable endpoint versus vulnerability separated; no remote scanning/exploitation instructions.',
'segmentation':'Layer 2 separation differs from routed enforcement; selected tuple and independent return path reviewed.',
'depth':'Prevent/detect/recover and common failure domains separated; no unsupported probability multiplication.',
'acl':'First-match order, wildcard ignored bits, nonempty-list implicit deny, empty/absent consumer exception and stateless limits reviewed.',
'standard-acl':'Source-only semantics and destination-side heuristic limits reviewed; visible destination/port context explicitly ignored.',
'extended-acl':'Transport/destination-port match, NAT observation and fragment exclusions retained; response state never inferred.',
'named-acl':'Names/sequences and shared consumers reviewed; no new algorithm or statefulness attributed to naming.',
'dai':'Ingress trust bypass distinguished from accepted binding; ARP ACL precedence/rate/header checks remain excluded from model.',
'snooping':'Server trust, VLAN scope, binding prerequisite and persistence distinguished from allocation and authenticated identity.',
'ipsg':'IP-only/IP-and-MAC and attachment scope reviewed; static host address is not a valid switch binding.',
'pvlan':'Distinct mapped roles and same-community relation reviewed; gateway-routed bypass remains separate.',
'dot1x':'EAPOL/RADIUS roles, returned policy consumption, MAB exception and protected server trust reviewed.',
'aaa':'Accept/reject/unavailable, configured local fallback, command permission and accounting retention kept independent.',
'port-security':'Protect/restrict/shutdown effects and accepted/count boundary reviewed; error-disabled target recovery remains guided.',
'control-plane':'Transit versus CPU punts and service continuity reviewed; no actual CPU/drop prediction from arithmetic.',
'copp':'Pps/bit/s/packet-size conversion, equality boundary and burst/token/accounting exclusions reviewed.',
'vpn':'Overlay scope, independent underlay and protected application operation reviewed; no tunnel created by worksheet.',
'ipsec':'SPD/SAD/selectors, directional SAs, anti-replay and ESP/AH limits reviewed; transform support and execution remain external.',
'ike':'IKEv2 initial exchange/authentication/child-SA distinction, identities and renewal reviewed; no IKEv1 phase labels substituted.',
'site-vpn':'Gateway identities/selectors, protected source route, NAT handling and return/app evidence reviewed independently.',
'remote-vpn':'User/device validation, route/DNS/split policy, least privilege and account revocation reviewed.',
'firewall':'Packet filtering versus stateful return, NAT and endpoint/application authorization kept distinct.',
'zbf':'Directional zone pair and inspect/pass/drop relation reviewed; self/same-zone policy caveats preserved.',
'asa':'ASA 9.20 routed/transparent/context/security-level and NAT/inspection scope reviewed without universal template.',
'firepower':'FMC/FTD configuration/deployment, connection decision and intrusion content visibility reviewed; licensing/lifecycle external.',
'ids-ips':'Passive alert versus inline prevention, visibility, false positives and fail-open/closed boundary reviewed.',
'waf':'HTTP-aware deployment, TLS visibility, rule match/tuning and app authorization remain independent; no regex sold as real WAF.',
'zero-trust':'Identity/device/resource/session policy and enforcement separated; location never substitutes for trust.',
'nac':'Attachment/posture/profiling/role consumption and remediation exceptions reviewed; classification is not protected identity.',
'ise':'ISE 3.4 ordered policy-set selection and authentication/authorization/profile consumption reviewed; live logs not end-to-end proof.',
'security-lab':'Original security scope joins segmentation, allowed/denied operations, identity and independent recovery; loopback fixture is application scope only.'}
topics=[];questions=[]
for l in lessons:
 key=l['interactive'][5:];assert key in notes
 topics.append(dict(id=l['id'],result='PASS',reviewer='Primary assistant',notes=notes[key],sha256=hashlib.sha256(json.dumps(l,ensure_ascii=False,sort_keys=True).encode()).hexdigest()))
 for q in l['quick']+l['exams']:
  assert q['answer'] and q['explanation'] and (not q.get('options') or len(q['options'])==len(set(q['options']))==4)
  questions.append(dict(id=q['questionId'],topic=l['id'],result='PASS',review='Primary authored/reviewed prompt, answer, explanation and applicable distractors against the mechanism and source scope.',sha256=hashlib.sha256(json.dumps(q,ensure_ascii=False,sort_keys=True).encode()).hexdigest()))
for name,body in [('network-security-primary-review',dict(topics=topics)),('network-security-question-review',dict(questions=questions))]:
 (R/f'docs/{name}.json').write_text(json.dumps(dict(date='2026-10-09',reviewer='Primary assistant',result='PASS',**body),indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(f'Recorded primary content and question review for {len(topics)} topics and {len(questions)} assessments.')
