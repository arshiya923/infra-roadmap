"""Build Batch 27 drafts from reviewed foundations and distinct incident cases."""
import copy
import json
import runpy
import re
import subprocess
from pathlib import Path

R = Path(__file__).resolve().parents[1]
authored = runpy.run_path(str(R / 'tools/troubleshooting-cases.py'))
cases = authored['CASES']
bundles = json.loads(subprocess.check_output(['node', str(R / 'tools/read-content.cjs')], encoding='utf-8'))
foundation = {l['id']: l for ls in bundles.values() for l in ls}
inventory = json.loads((R / 'content/roadmap-inventory.json').read_text(encoding='utf-8'))
names = {n['id']: n['name'] for n in inventory['nodes']}
new_sources = {
    0: ('Cisco: switch port and interface problems', 'https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12027-53.html'),
    1: ('Cisco: switch port and interface problems', 'https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12027-53.html'),
    2: ('Cisco: Ethernet troubleshooting, historical platform examples', 'https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html'),
    3: ('Cisco: Ethernet negotiation, media-specific applicability', 'https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.pdf'),
    5: ('Cisco: troubleshoot STP issues on Catalyst', 'https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/28943-170.html'),
    6: ('Cisco: LAN switching troubleshooting', 'https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/12006-chapter22.html'),
    15: ('Cisco: wireless client state troubleshooting; platform-specific examples', 'https://www.cisco.com/c/en/us/support/docs/wireless/5508-wireless-controller/200072-Cheat-Sheet-Common-Wireless-issues.html'),
    16: ('Dell PowerEdge troubleshooting guide; match the installed generation', 'https://dl.dell.com/topicspdf/troubleshootingguide_en-us.pdf'),
    17: ('Dell PowerEdge troubleshooting guide; controller-specific recovery', 'https://dl.dell.com/topicspdf/troubleshootingguide_en-us.pdf'),
    19: ('Broadcom: ESXi all-paths-down conditions', 'https://knowledge.broadcom.com/external/article/318938/esxi-hosts-in-all-paths-down-apd-conditi.html'),
    20: ('Google SRE: incident response', 'https://sre.google/workbook/incident-response/'),
}
lessons = []
workbook = ['# Troubleshooting Mastery — incident workbook', '',
            'All 21 records below are authored synthetic cases. No device output or physical repair is claimed.',
            'Record scope, timestamp, observer, baseline, hypothesis, discriminating test, bounded change, rollback and recovery evidence.',
            'The browser case desk lets you predict before revealing evidence. The separate Python lab executes only owned temporary-file operations.', '',
            '## Eight-step diagnostic method', '',
            '1. Define the problem: name the failed user operation, affected endpoints, start time and impact; distinguish a symptom from its cause.',
            '2. Gather evidence: record observer, clock/epoch, current state and a comparable healthy baseline before clearing counters or changing configuration.',
            '3. Identify the affected layer: trace the last successful handoff and the first failed one; shared dependencies may cross nominal layers.',
            '4. Build hypotheses: list at least two plausible explanations and a prediction that could disprove each one.',
            '5. Test safely: choose the least disruptive discriminating observation and bound duration, targets and collected data.',
            '6. Apply corrective action: state the exact intended change, owner, stop condition and captured baseline for rollback.',
            '7. Validate: repeat the original transaction under comparable conditions and verify required isolation, redundancy and observation-window behavior.',
            '8. Document root cause: separate proven cause, contributing factors and unresolved hypotheses; retain a timeline, recovery evidence and follow-up owners.', '',
            'These steps preserve the eight original roadmap method items. An incident may return to an earlier step when a test disproves a hypothesis.', '']
for i, row in enumerate(cases):
    base, boundary, baseline, fault, test, diagnosis, recovery, alternative, guard, challenge = row
    id = f'trouble-{i}'
    title = names[id]
    source = foundation[base]
    # Retain technical explanations and concept distinctions already reviewed in the prerequisite.
    l = {k: copy.deepcopy(source[k]) for k in ['mental', 'components', 'mechanism', 'comparison', 'glossary', 'sources']}
    l['ports'] = source.get('ports', 'Port and transport depend on the tested service. Physical carrier, frame counters and local evidence inspection have no intrinsic TCP or UDP port; identify the actual protocol before interpreting a filter.')
    scope = 'Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.'
    l.update(id=id, batch='27', title=title, subtitle=boundary, level='Applied diagnosis → Recovery evidence', minutes=50,
        interactive='tm-'+id,
        definition=title+' is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on '+boundary.lower()+'.',
        purpose='Restore the original service without enlarging the fault or weakening its access boundaries. '+baseline+' The incident to explain is: '+fault+' A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.',
        example='Synthetic worked incident. Baseline: '+baseline+' Observed failure: '+fault+' Discriminating test: '+test+' Interpretation: '+diagnosis+' Recovery contract: '+recovery,
        flow=[['Scope and baseline', baseline], ['Locate the failed boundary', fault], ['Test a competing explanation', test], ['Recover and verify', recovery]],
        commands=[dict(filename='troubleshooting-lab.txt', platform='Python 3.10+ standard library; course root', code='python labs/troubleshooting-lab.py --topic '+id,
                       explanation='Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.',
                       expected='JSON with scope AUTHORED, topic '+id+', baseline, fault, test, diagnosis and recovery; these are supplied teaching records.')],
        configuration='First record target identity, administrative scope and the captured baseline. '+test+' The proposed change must address only the demonstrated failed boundary. '+guard+' Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.',
        production='Separate severity from certainty: declare the impact, owner and observation window before investigating. '+diagnosis+' '+alternative+' Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.',
        security=guard+' Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.',
        performance='Compare equivalent workload and sampling intervals before and after the change. '+recovery+' Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.',
        troubleshooting=[['Observed incident', fault], ['Competing explanation', alternative], ['Next discriminating test', test], ['Supported conclusion and limit', diagnosis], ['Recovery acceptance', recovery]],
        mistakes=[guard, alternative, 'Treating a green intermediate status as proof of the original application outcome. '+challenge[1],
                  'Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery.'],
        prerequisites=[base], related=[base]+([f'trouble-{i+1}'] if i<20 else ['capstone-final']),
        incident=dict(boundary=boundary, baseline=baseline, fault=fault, test=test, diagnosis=diagnosis, recovery=recovery, alternative=alternative, guard=guard, scope=scope),
        artifacts=[dict(title='21-case evidence workbook', path='labs/troubleshooting-workbook.md'), dict(title='Local fault/recovery rehearsal and read-only case inspector', path='labs/troubleshooting-lab.py')])
    l['mechanism'] = authored['FOUNDATIONS'][i] + [boundary+': '+diagnosis, test, alternative]
    l['mental'] = 'Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow '+boundary.lower()+'. '+authored['FOUNDATIONS'][i][0]+' The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.'
    if i == 2:
        l['components'] = ['Transmitting peer and medium: possible sources along the observed segment.', 'Receiving interface: where FCS/CRC errors are counted.', 'Timestamped counter samples: evidence of current growth or historical residue.', 'Application test: separate evidence that intended delivery is restored.']
        l['comparison'] = [['CRC/FCS error', 'Detected receive-frame corruption', 'Does not uniquely identify a cable'], ['Output drop', 'A transmit packet was discarded', 'Does not necessarily indicate corruption'], ['Interval rate', 'Comparable counter delta divided by elapsed time', 'Invalid across an unexplained reset']]
    l['glossary'].update({'Discriminating test': 'An observation whose possible outcomes separate at least two competing explanations.', 'Recovery contract': 'The original intended operation and its protected boundaries, measured again after a bounded change.', 'Evidence epoch': 'An interval during which observer identity and counter continuity are comparable.'})
    if i == 15:
        # Wireless needs its own conceptual teaching, not DHCP presented as the whole WLAN.
        l['mental'] = 'Treat wireless access as successive gates: discovering an AP, associating, satisfying the configured security exchange, obtaining Layer 3 settings and reaching a service. Passing one gate is not a receipt for the next. The exact security/roaming sequence depends on WLAN mode and release; signal strength is only one RF observation.'
        l['components'] = ['Client radio and supplicant: signal/retry behavior and identity negotiation.', 'AP and controller: association state, WLAN-to-VLAN mapping and policy enforcement.', 'Authentication service: accept/reject and method/certificate evidence for the configured security mode.', 'DHCP, gateway and DNS: address and service dependencies after link admission.']
        l['comparison'] = [['Associated', 'Client has joined the AP at the link layer', 'Does not prove authentication or a valid address'], ['Authenticated', 'Configured security exchange succeeded', 'Does not prove DHCP or DNS'], ['Application healthy', 'A fresh intended transaction succeeds', 'Still test roaming and denied access separately']]
        l['mechanism'] = [test, 'Correlate association and authentication state by client identity and time.', 'Verify the resulting VLAN, address, gateway and DNS before application tests.', 'For RF complaints, compare retries, channel use and roaming events; RSSI alone is insufficient.']
        l['glossary'] = {'Association': 'A link-layer relationship with an AP.', 'Supplicant': 'Client component participating in network authentication.', 'Roaming': 'Moving the client connection between APs; continuity depends on the deployed mobility/security design.', 'RSSI': 'Received signal strength indication, not a complete quality or capacity measure.'}
        l['ports'] = '802.11 association has no TCP/UDP port. Addressing and name services commonly involve DHCP UDP 67/68 and DNS UDP/TCP 53; authentication transports depend on deployment. Verify the actual controller and identity path.'
    if i in new_sources:
        t, u = new_sources[i]
        l['sources'].append(dict(title=t, url=u, checked='2026-10-09'))
    observations = {0:[0,1], 1:[1], 2:[0,1], 3:[0], 4:[0], 5:[0,1], 6:[0,1], 7:[0,1], 8:[1], 10:[0], 11:[0], 13:[0], 15:[0,1], 19:[1]}
    for n in observations.get(i, []):
        command = copy.deepcopy(source['commands'][n])
        command['platform'] = command.get('platform','Supported isolated platform')+'; guided reference, not executed for Batch 27'
        command['explanation'] = command.get('explanation','')+' Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.'
        if i == 5:
            command['code'] = command['code'].replace('vlan 10','vlan 20')
        l['commands'].append(command)
    l['lab'] = dict(objective='Produce a defensible incident record for '+title+'. '+boundary+'.',
        requirements='Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.',
        topology=[baseline, 'Observation boundary: '+boundary, 'Recovery target: '+recovery],
        steps=['Read Baseline and write the intended operation and observer.', 'Select Fault; write two hypotheses before revealing the proposed test. '+fault,
               'Choose the least disruptive next observation. Predict how it separates your hypotheses.', 'Reveal the diagnostic test and compare your prediction: '+test,
               'Write the bounded repair, original state to restore, stop condition and independent access path. '+guard,
               'Select Recovery and explain what each observation establishes: '+recovery,
               'Run python labs/troubleshooting-lab.py --topic '+id+' to inspect the same authored evidence without a browser.',
               'Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.',
               'Complete the workbook record, including the remaining alternative: '+alternative],
        verification=recovery+' Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.',
        troubleshooting=alternative+' '+guard, challenge=challenge[0], cleanup='Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service.')
    prompts = [
        ('What exact boundary does this '+title+' case investigate?', boundary+'. '+diagnosis, 'Name a boundary supported by the observations, not an entire device as a guessed root cause.', 'Fault scope'),
        ('Which baseline observation matters when interpreting this incident?', baseline, 'A baseline identifies the intended operation and allows comparable recovery checks.', 'Baseline'),
        ('What is the strongest next test for the supplied failure?', test, alternative, 'Discriminating test'),
        ('What competing explanation must remain open until tested?', alternative, 'An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.', 'Alternative hypothesis'),
        ('Which observation supports your diagnosis, and what does it not establish?', fault+' '+diagnosis, 'Intermediate state should be interpreted at its own boundary.', 'Evidence interpretation'),
        ('What change guard and rollback preparation apply to this case?', guard+' Preserve the exact owned baseline and stop if the original operation worsens.', 'A repair without a known target and reversal can turn a bounded incident into a broader one.', 'Safe recovery'),
        ('What evidence is required to close this specific incident?', recovery, 'Repeat the original operation and check protected boundaries, not merely the action completion message.', 'Acceptance'),
        challenge + ('Use the mechanism and evidence boundary to separate the two claims.', 'Transfer'),
        ('Which claim would exceed the browser exercise evidence?', 'Claiming an actual device failure, hardware repair or measured convergence from these authored '+title+' records.', scope, 'Evidence scope'),
        ('Write a compact handoff for the '+title+' incident.', 'Scope: '+boundary+'. Observation: '+fault+' Next test: '+test+' Acceptance: '+recovery, 'Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.', 'Incident handoff'),
    ]
    def question(item, n, prefix):
        q, a, e, concept = item
        return dict(questionId=id+'-'+prefix+str(n+1), topicId=id, difficulty='foundational' if n<2 else 'intermediate' if n<7 else 'advanced', type='short-answer', question=q, answer=a, explanation=e, testedConcept=concept)
    l['exams'] = [question(x, n, 'Q') for n, x in enumerate(prompts)]
    l['quick'] = [question(x, n, 'QC') for n, x in enumerate([
        ('What is the first known failing observation?', fault, diagnosis, 'Observation'),
        ('Why should the alternative hypothesis be recorded?', alternative, test, 'Uncertainty'),
        ('What is the minimum recovery evidence?', recovery, guard, 'Recovery')])]
    lessons.append(l)
    workbook += ['## '+id+' — '+title, '', 'Baseline: '+baseline, '', 'Fault: '+fault, '', 'Test: '+test, '', 'Interpretation: '+diagnosis, '', 'Alternative: '+alternative, '', 'Guard: '+guard, '', 'Recovery: '+recovery, '', 'Challenge: '+challenge[0], '', 'Your evidence record: observer / time / hypothesis / result / change / rollback / remaining uncertainty.', '']
(R / 'content/batch-27.js').write_text('window.INFRA_BATCHES = window.INFRA_BATCHES || {};\nwindow.INFRA_BATCHES["27"] = '+json.dumps(lessons, ensure_ascii=False, indent=2)+';\n', encoding='utf-8')
lab_path = R / 'labs/troubleshooting-lab.py'
lab_text = lab_path.read_text(encoding='utf-8')
payload = '# BEGIN AUTHORED CASES\nCASES = '+repr({l['id']:l['incident'] for l in lessons})+'\n# END AUTHORED CASES'
lab_path.write_text(re.sub(r'# BEGIN AUTHORED CASES.*?# END AUTHORED CASES', lambda _:payload, lab_text, flags=re.S), encoding='utf-8')
(R / 'labs/troubleshooting-workbook.md').write_text('\n'.join(workbook)+'\n', encoding='utf-8')
m_path = R / 'content/enrichment.json'
m = json.loads(m_path.read_text(encoding='utf-8'))
b = next(b for b in m['batches'] if b['id']=='27')
if b['status'] != 'completed':
    b.update(status='in-progress', draftNodeIds=b['nodeIds'])
b.update(visualizations='21 diagnostic flows, comparison tables and staged incident desks with static evidence alternatives.', labs='21 synthetic incident workbooks; one executable isolated local-file fault/recovery rehearsal. Vendor and physical operations are guided only.', interactions='21 baseline/fault/recovery desks, 210 self-assessed exams and 63 quick checks.')
m_path.write_text(json.dumps(m, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print('Built 21 Troubleshooting Mastery drafts, 210 exams and 63 quick checks.')
