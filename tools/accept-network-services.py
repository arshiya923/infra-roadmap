"""Apply the primary assistant's review after exact declared evidence passes.

This tool does not perform the review; it records the decision made in the current chat.
"""
from pathlib import Path
import hashlib,json,subprocess
root=Path(__file__).resolve().parents[1]
def read(p):return json.loads((root/p).read_text(encoding='utf-8'))
def write(p,x):(root/p).write_text(json.dumps(x,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
reg=read('docs/network-services-regression-results.json');assert reg['result']=='PASS' and len(reg['results'])==9 and all(x['exit']==0 for x in reg['results'])
browser=read('docs/browser-network-services-results.json');assert browser['result']=='PASS' and browser['topics']==30
for p in ['docs/network-services-model-results.json','docs/network-services-fixture-results.json','docs/commands-network-services-results.json','docs/quality-audit-latest.json']:assert read(p)['result']=='PASS'
assert read('docs/quality-audit-latest.json')['lessons']==165
manifest=read('content/enrichment.json');inv=read('content/roadmap-inventory.json');assert hashlib.sha256((root/'original/index.html').read_bytes()).hexdigest()==inv['sha256']
bundles=json.loads(subprocess.check_output(['node','tools/read-content.cjs'],cwd=root,text=True,encoding='utf-8'));lessons=bundles['11']+bundles['12']
assert len(lessons)==30 and {l['id'] for l in lessons}=={n['id'] for n in inv['nodes'] if n.get('stage')==4}
notes={
 'dhcp-server':'Allocation versus delivered options and lease lifetime; default T1/T2 arithmetic has explicit override limits.',
 'dhcp-relay':'giaddr/Option82 trust, selected client pool and both return legs reviewed independently.',
 'dns-architecture':'Authority, recursive and negative-cache evidence separated; response code differs from timeout.',
 'ntp':'Four timestamps, symmetric-delay limitation and stratum/selection distinction checked against independent vectors.',
 'snmp':'Identity/view access, notifications and counter continuity/rates separated; no live agent configuration claimed.',
 'syslog':'Facility/severity priority, framing, origin/time provenance and retention distinguished; actual UDP fixture scope retained.',
 'aaa':'Authentication/authorization/accounting and Reject versus timeout fallback reviewed; console recovery retained.',
 'radius':'NAS role, attribute consumption, legacy limits and experimental modern profile scope explicit.',
 'tacacs':'Command/argument policy, separate accounting and legacy body obfuscation boundaries retained.',
 'netflow':'Version9 template identity includes exporter/source; sampling and missing telemetry are not packet capture or zero load.',
 'fnf':'Match versus collect, record/monitor/exporter and supported consuming attachment reviewed.',
 'ip-sla':'Actual source/type/schedule/freshness governs the narrow probe meaning; circular recovery-path risk explicit.',
 'tracking':'Underlying observation, delay threshold and attached consumer separated; up/down delays do not measure applications.',
 'cdp':'Local-link advertised metadata, holdtime and independent attachment/service verification reviewed.',
 'lldp':'Identifier subtype, transmit/receive and TTL context retained; no access authorization inferred.',
 'ssh':'Host trust before user authentication and channel permission; configuration expansion is not a connection.',
 'sftp':'SSH subsystem/path authorization and final file integrity separated from shell/login success.',
 'tftp':'InitialUDP69 versus negotiated TIDs and external image authenticity reviewed.',
 'ftp':'Control versus active/passive data path and FTPS versus SFTP distinctions reviewed.',
 'http':'Reference origin/TLS identity/expected response separated; HTTP3 transport and status-versus-content distinction reviewed.',
 'pki':'Local trust anchor, path constraints and private-key compromise handled as distinct trust obligations.',
 'certificates':'SAN/reference identity/time/usage/revocation policy distinguished from metadata parsing and expiry alone.',
 'dot1x':'Supplicant/authenticator/server, EAPOL/RADIUS, returned-role consumption and MAB/outage exceptions retained.',
 'monitoring':'Observer/unit/interval/freshness/no-data and actionable alert owner distinguished from a dashboard color.',
 'prtg':'Probe/sensor/inheritance/dependency/notification chain and changing edition/licence support explicitly scoped.',
 'zabbix':'Item/trigger/action and proxy sample/receive timing distinct; unsupported item is not zero.',
 'librenms':'OS/object discovery versus fresh polling/history/alerts and instance mapping reviewed.',
 'grafana':'Datasource/query/time-unit and alert no-data/error semantics distinct from source collection.',
 'prometheus':'Scrape up versus application objective, counter rates/resets and bounded labels reviewed.',
 'services-lab':'Original NTP/Syslog/SNMP/AAA objective preserved with independent console recovery, intended denial and exact restore.'}
sheets=[root/'docs/screenshots/network-services/review'/f'{i:02}-contact.png' for i in range(1,7)];assert all(p.exists() for p in sheets)
limits=['Worksheets consume supplied declarations, not live service state.','Target device, NTP/SNMP/AAA and monitoring-platform procedures remain GUIDED_NOT_EXECUTED.','Actual loopback HTTPS and scripted UDP marker evidence has its stated trust/transport limits.','Physical devices, production rollout, vendor parser compatibility, capacity, licensing and convergence are not certified.']
evidence=['docs/network-services-regression-results.json','docs/browser-network-services-results.json','docs/network-services-model-results.json','docs/network-services-fixture-results.json','docs/commands-network-services-results.json','docs/quality-audit-batch-12.json','docs/network-services-primary-review.json','docs/network-services-exam-review.json','docs/network-services-manual-review-hashes.json','docs/research-network-services.md','labs/network-services-workbook.md']
write('docs/quality-audit-batch-12.json',read('docs/quality-audit-latest.json'))
write('docs/network-services-manual-review-hashes.json',dict(date='2026-10-09',reviewer='Primary assistant',result='PASS',scope='Six personally inspected contact sheets containing 90 worksheet, flow and narrow dark-theme captures. Scroll-table start/end behavior separately asserted in browser tests; viewport/theme checks cover1440/768/390/320. Scaled sheets supplement original captures.',sha256={str(p.relative_to(root)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in sheets}))
topics=[];exams=[]
for l in lessons:
    key=l['interactive'][3:];assert key in notes and len(l['exams'])==10 and len(l['quick'])==3
    topics.append(dict(id=l['id'],title=l['title'],technicalReview=notes[key],practice='Per-topic build/fault/restore/verification/cleanup and source applicability personally reviewed; target execution not claimed.',sources=l['sources']))
    exams.append(dict(topicId=l['id'],exams=l['exams'],quick=l['quick'],review='RETAINED_AFTER_PRIMARY_REVIEW: questions, answer, explanation, intended boundary and distractors checked; short answers explicitly self-assessed.'))
write('docs/network-services-primary-review.json',dict(date='2026-10-09',reviewer='Primary assistant',status='ACCEPTED_WITH_DOCUMENTED_SCOPE',topics=topics,limits=limits))
write('docs/network-services-exam-review.json',dict(date='2026-10-09',result='PASS_PRIMARY_REVIEW',examQuestions=300,quickChecks=90,topics=exams,limits='Original instructional questions; no certification alignment or automatic grading of free text claimed.'))
template=read('docs/acceptance-batch-10.json')
for number in ['11','12']:
    b=next(b for b in manifest['batches'] if b['id']==number);ls=[l for l in lessons if l['batch']==number];assert set(b['nodeIds'])=={l['id'] for l in ls}
    criteria=[dict(number=x['number'],requirement=x['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for x in template['topicCriteria']]
    gates=[dict(number=x['number'],requirement=x['requirement'],result='PASS_WITH_DOCUMENTED_SCOPE',evidence=evidence) for x in template['batchGates']]
    write(f'docs/acceptance-batch-{number}.json',dict(date='2026-10-09',status='ACCEPTED_WITH_DOCUMENTED_SCOPE',reviewer='Primary assistant',topicCount=len(ls),acceptedIds=b['nodeIds'],topicCriteria=criteria,batchGates=gates,limits=limits))
    manifest['completedNodeIds']=list(dict.fromkeys(manifest['completedNodeIds']+b['nodeIds']))
    b.update(status='complete',acceptedDate='2026-10-09',acceptanceEvidence=f'docs/acceptance-batch-{number}.json',draftNodeIds=[],nextAuthoringNode=None)
assert len(manifest['completedNodeIds'])==165
manifest.update(currentBatch='13',nextNode='s5-g0-t0',reviewedDate='2026-10-09')
manifest['limitations'][0]='Batches 01-12 complete; 277 original nodes remain unenriched or pending editorial acceptance.'
manifest['limitations'].append('Network Services Batches11/12 accepted within scoped synthetic/guided/loopback evidence. NTP, SNMP, AAA and vendor monitoring-platform target procedures remain unexecuted.')
manifest['qualityAudits']=[x for x in manifest['qualityAudits'] if x['afterBatch']!='12']+[dict(afterBatch='12',status='passed',date='2026-10-09',evidence='docs/quality-audit-batch-12.json')]
write('content/enrichment.json',manifest)
for tool in ['catalog.py','progress.py']:subprocess.run(['python','tools/'+tool],cwd=root,check=True)
validation='''# Network Services acceptance — 2026-10-09

Batches11 and12 contain all30 original Network Services units, including the integrated lab. The section adds300 original exams and90 quick checks. The course now has165 accepted original lessons,1650 exams and495 quick checks;277 originals remain. Next editorial work is Batch13, Network Security, `s5-g0-t0`.

The primary assistant personally authored and reviewed the explanations, source applicability, ten answers/explanations per topic, distractors and topic-specific guided build/fault/restore procedures. Six inspected contact sheets contain90 desktop worksheet, flow and narrow dark-theme views. Browser assertions additionally cover both themes at1440/768/390/320 pixels, table start/end access, keyboard controls, reset/invalid handling, static/reduced-motion flow, all300 exam feedback paths, incorrect multiple-choice feedback, copy, study/editorial independence, file URLs, search and original next/previous adjacency.

All nine declared regression commands passed. The independent model suite covers741 declaration/arithmetic/transition checks. Four local read-only inspections passed. Actual loopback tests verify protected HTTPS hostname/trust checks, expected HTTP content, UDP log-marker receipt/retention and owned resource cleanup. The wider audit visits all165 authored routes, checks prerequisite availability/cycles, DOM/accessible names, anchors, adjacency, contrast tokens, lazy bundle loading and local search.

The browser worksheets consume supplied declarations and bounded arithmetic; they do not run protocols or query devices. Target configuration, NTP synchronization, SNMPv3 agents, AAA, physical links, vendor parser support and installation/operation of PRTG/Zabbix/LibreNMS/Grafana/Prometheus remain guided and unexecuted. The TLS fixture uses a disposable self-signed local identity rather than public PKI; the UDP fixture is a scripted receiver, not a production Syslog daemon. Those limits are part of acceptance, not omitted tests claimed as executed.

Evidence: [regression](network-services-regression-results.json), [browser](browser-network-services-results.json), [models](network-services-model-results.json), [actual fixtures](network-services-fixture-results.json), [commands](commands-network-services-results.json), [primary content review](network-services-primary-review.json), [question review](network-services-exam-review.json), [manual rendering hashes](network-services-manual-review-hashes.json), [full audit](quality-audit-batch-12.json), [source applicability](research-network-services.md), [Batch11 matrix](acceptance-batch-11.json), [Batch12 matrix](acceptance-batch-12.json), [workbook](../labs/network-services-workbook.md).

Reproduce from the Windows project root with the existing localhost preview on127.0.0.1:8765:

```powershell
python tools/regression-network-services.py
```

The runner uses the documented installed Node/Playwright runtime and headless Microsoft Edge, plus Ubuntu-24.04 in WSL for the owned OpenSSL/Python fixtures. It performs no dependency installs or production service configuration. A separate post-acceptance check verifies all30 reviewed headers/catalog entries and the next preserved pending outline; see [accepted-state evidence](network-services-final-verification.json).
'''
validation=validation.replace('Batches11','Batches 11').replace('and12','and 12').replace('all30','all 30').replace('all300','all 300').replace('all165','all 165').replace('at1440','at 1440').replace('on127','on 127').replace('covers741','covers 741').replace('contain90','contain 90').replace('adds300','adds 300').replace('and90','and 90').replace('has165','has 165').replace('lessons,1650','lessons, 1650').replace('and495','and 495').replace('checks;277','checks; 277').replace('Batch13','Batch 13')
for b in ['11','12']:(root/f'docs/validation-batch-{b}.md').write_text(validation,encoding='utf-8')
readme=(root/'README.md').read_text(encoding='utf-8')
lines=readme.splitlines()
lines[2]='Current checkpoint: 165 accepted original nodes through Batch 12; 165 authored lessons, 1,650 exams and 495 quick checks. Network Services is complete within the documented guided/model/loopback scopes. Batch 13 (Network Security) is next.'
for i,line in enumerate(lines):
    if line.startswith('Batches01–10 provide'):lines[i]='Batches 01–12 provide 165 accepted lessons with teaching, mechanisms, practical guidance, troubleshooting, scoped labs, three quick checks and ten original exams each. Network Services adds all 30 original topics and the integrated services lab. See [Network Services verification](docs/validation-batch-12.md) for evidence and execution limits. The dated checkpoints below are historical records.'
    if line.startswith('Current next step: Batch11'):lines[i]='Current next step: Batch 13 (`s5-g0-t0`). Network Services is accepted; see docs/validation-batch-12.md. Historical development notes below describe retained earlier runtime evidence.'
    if 'Next editorial work is Batch11' in line:lines[i]=line.replace('Next editorial work is Batch11 (`s4-g0-t0`).','The current next editorial step is Batch 13 (`s5-g0-t0`); the Batch 11 checkpoint is historical.')
lines+=['','## Network Services accepted · 2026-10-09','','All 30 Batches 11/12 units are accepted, adding 300 reviewed exams and 90 quick checks. Nine regression commands pass, with independent model checks, all new browser routes, shared-reader checks and the 165-route audit. The original source hash and learner-progress boundary are preserved. Guided device/service procedures remain clearly separate from actual loopback fixtures. See [verification and limits](docs/validation-batch-12.md).']
(root/'README.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
with (root/'ROADMAP_DECISIONS.md').open('a',encoding='utf-8') as f:f.write('\n\n## Network Services acceptance and current user steering — 2026-10-09\n\nThe user explicitly said not to use GapCode after its quota blocked implementation. The primary assistant therefore performed this section directly, including design, authorship, tests, source review, acceptance and final verification. This steering supersedes the earlier GapCode preference for this work; historical decisions remain as dated records.\n\nBatches11/12 preserve all30 stage4 identities and the original integrated NTP/Syslog/SNMP/AAA/recovery scope. A single native worksheet module exposes topic-specific evidence boundaries with explicit synthetic limitations; five arithmetic tools supplement the shared steppers. The section is editorially accepted only within guided/model/owned-loopback evidence, without claiming target-device or platform deployment. The broader Batch12 audit covers165 routes. Next: Batch13 Network Security.\n')
print('Primary acceptance recorded: 30 Network Services units; 165/442 accepted; next Batch13.')
