"""Build Batch 25 drafts without accepting them."""
import json, runpy
from pathlib import Path
R=Path(__file__).resolve().parents[1]
C='https://www.cisco.com/c/en/us/'
SRC={
'2960':('2960-X IOS 15.2(2)E VLANs',C+'td/docs/switches/lan/catalyst2960x/software/15-2_2_e/vlan/configuration_guide/b_vlan_1522e_2960x_cg/b_vlan_152ex_2960-x_cg_chapter_011.html'),
'trunk':('2960-X IOS 15.2(2)E trunks',C+'td/docs/switches/lan/catalyst2960x/software/15-2_2_e/vlan/configuration_guide/b_vlan_1522e_2960x_cg/b_vlan_152ex_2960-x_cg_chapter_0100.html'),
'multilayer':('3560-X / 3750-X IOS 15.0(2)SE routing',C+'td/docs/switches/lan/catalyst3750x_3560x/software/release/15-0_2_se/configuration/guide/3750x_cg/swiprout.html'),
'vlan3750':('3560-X / 3750-X IOS 15.2(1)E VLANs',C+'td/docs/switches/lan/catalyst3750x_3560x/software/release/15-2_1_e/configuration/guide/scg3750x/swvlan.html'),
'9200':('Catalyst 9200 family data sheet',C+'products/collateral/switches/catalyst-9200-series-switches/nb-06-cat9200-ser-data-sheet-cte-en.html'),
'9300':('Catalyst 9300 family data sheet',C+'products/collateral/switches/catalyst-9300-series-switches/nb-06-cat9300-ser-data-sheet-cte-en.html'),
'9500':('C9500 IOS XE 16.10 StackWise Virtual',C+'td/docs/switches/lan/catalyst9500/software/release/16-10/configuration_guide/ha/b_1610_ha_9500_cg/configuring_cisco_stackwise_virtual.html'),
'isr':('ISR 4000 support and release guides',C+'support/routers/4000-series-integrated-services-routers-isr/series.html'),
'qfp':('IOS XE CPU/QFP diagnostic evidence',C+'support/docs/technical-details/222469-reporting-problems-effectively-to-tac-se.html'),
'asr':('ASR 1000 IOS XE data sheet',C+'products/collateral/routers/asr-1000-series-aggregation-services-routers/datasheet-c78-731632.html'),
'xr':('ASR 9000 IOS XR 64-bit data sheet',C+'products/collateral/routers/asr-9000-series-aggregation-services-routers/datasheet-c78-737841.html'),
'asa':('ASA packet-tracer diagnostic scope','https://edge.us.cdo.cisco.com/content/docs/c-asa-packet-tracer.html'),
'ftd':('Threat Defense 7.0 access control','https://secure.cisco.com/secure-firewall/v7.0/docs/access-control-policy'),
'natftd':('FTD NAT configuration and verification',C+'support/docs/security/firepower-management-center/212702-configure-and-verify-nat-on-ftd.pdf'),
'aironet':('Historical autonomous/lightweight conversion scope',C+'td/docs/wireless/controller/9800/17-3/config-guide/b_wl_17_3_cg/m_ap_convert-autonomousaps_cg.html'),
'wireless':('Wireless software compatibility matrix',C+'td/docs/wireless/compatibility/matrix/compatibility-matrix.pdf'),
'tags':('Catalyst 9800 configuration model',C+'support/docs/wireless/catalyst-9800-series-wireless-controllers/213911-understand-catalyst-9800-wireless-contro.html'),
'aireos':('Historical AireOS and lightweight AP setup',C+'support/docs/wireless/4400-series-wireless-lan-controllers/69719-wlc-lwap-config.pdf'),
'n3k':('Nexus 3000 NX-OS 7.x L2 interfaces',C+'td/docs/switches/datacenter/nexus3000/sw/interfaces/7_x/b_Cisco_Nexus_3000_Series_NX-OS_Interfaces_Configuration_Guide_7x/b_Cisco_Nexus_3000_Series_NX-OS_Interfaces_Configuration_Guide_7x_chapter_01.html'),
'n3kl3':('Nexus 3000 NX-OS 9.3(x) L3 interfaces',C+'td/docs/switches/datacenter/nexus3000/sw/interfaces/93x/configuration/guide/b-cisco-nexus-3000-nx-os-interfaces-configuration-guide-93x/b-cisco-nexus-3000-nx-os-interfaces-configuration-guide-93x_chapter_011.html'),
'n5k':('Nexus 5000 NPIV/FCoE example',C+'support/docs/switches/nexus-5000-series-switches/116248-configure-fcoe-00.html'),
'vdc':('Nexus 7000 VDC overview',C+'td/docs/switches/datacenter/sw/nx-os/virtual_device_context/configuration/archive_601/vdc_nx-os_cfg/vdc_overview.html'),
'n7kl2':('Nexus 7000 Layer 2 context',C+'td/docs/switches/datacenter/sw/nx-os/layer2/configuration/guide/b_Cisco_Nexus_7000_Series_NX-OS_Layer_2_Switching_Configuration_Guide/b_Cisco_Nexus_7000_Series_NX-OS_Layer_2_Switching_Configuration_Guide_chapter_010.html'),
'n9k':('Nexus 9000 mode-specific release notes',C+'support/switches/nexus-9000-series-switches/products-release-notes-list.html'),
'mds':('MDS 9000 NX-OS 9.x zoning',C+'td/docs/dcn/mds9000/sw/9x/configuration/fabric/cisco-mds-9000-nx-os-fabric-configuration-guide-9x/configuring_and_managing_zones.html'),
}
specs=runpy.run_path(str(R/'tools/device-authoring.py'))['S']
inv=json.loads((R/'content/roadmap-inventory.json').read_text(encoding='utf-8'))
names={n['id']:n['name'] for n in inv['nodes']}
m=json.loads((R/'content/enrichment.json').read_text(encoding='utf-8'))
b=next(x for x in m['batches'] if x['id']=='25')
assert next(x for x in m['batches'] if x['id']=='24')['status']=='completed'
assert [s['id'] for s in specs]==b['nodeIds']
lessons=[]
LABELS=[
 ['Access VLAN','MAC lookup','Trunk forwarding','Gateway path'],
 ['Gateway MAC','Route lookup','Egress neighbor','Return path'],
 ['Member identity','Compatibility','Stack readiness','Endpoint service'],
 ['Power request','Budget admission','Endpoint link','Uplink traffic'],
 ['Pair support','Pair roles','Bundle members','Single-fault drill'],
 ['Ingress context','Packet services','Egress queues','Correlated samples'],
 ['Chassis and OS','Service architecture','Matching workflow','Forwarding evidence'],
 ['Ingress tuple','Policy and NAT','Connection state','Reply and deny test'],
 ['Policy owner','Reviewed revision','Target deployment','Fresh connection'],
 ['AP inventory','Operating mode','Controller join','Client service'],
 ['Power and join','AP tags','WLAN policy','Client journey'],
 ['WLAN mapping','Authentication','Switching location','Client addressing'],
 ['Port capability','Lane mapping','L2 or L3 intent','Traffic validation'],
 ['Converged link','vFC and VSAN','Fabric login','Zoning and I/O'],
 ['Current context','Port allocation','VDC service','Shared chassis'],
 ['Mode and owner','Authoritative policy','Endpoint mapping','Allowed and denied'],
 ['FC login','WWPN and VSAN','Active zoneset','Host I/O']]
wb=['# Cisco Device Mastery — guided evidence workbook','','All cases below are authored teaching scenarios, not captured device transcripts. Commands are guided and unexecuted on Cisco targets. The separate Python fixture exercises only a declared compatibility checklist; it does not emulate any Cisco device.','','## Required evidence record','','Record: exact PID, serial redacted, OS, release, mode, license/features, topology, management recovery path, source applicability, baseline, one scoped fault, narrow repair, positive test, denied/control test, rollback and cleanup. Keep unknown values unknown.','','## Optional target procedure','','Use only an owned isolated compatible target. Capture its baseline and confirm console access first. Translate the stated fault into an exact reviewed change using the installed-release guide; the lesson deliberately does not supply universal write commands. Do not perform power, reload, fabric merge, image conversion or dual-link failures without a separate platform runbook. Restore the captured baseline and prove both intended service and isolation.','','## Local executable worksheet','','Run `python labs/device-preflight.py --run` to calculate baseline, unknown-version rejection, declared failure and restoration. No files, sockets, credentials or devices are accessed. A passing worksheet means only that supplied declarations satisfy its rule.','']
for i,s in enumerate(specs):
 id=s['id'];title=names[id];t=s['terms'];steps=s['steps']
 questions=s['questions']+[
 ['Locate the first unsupported conclusion in the supplied '+title+' incident.',s['fault'],'Distinguish observations from assumptions before proposing a write. '+s['repair']],
 ['Write a recovery acceptance test for this device case.',s['repair'],'Include a working service and an unchanged or denied control; one green status does not cover all dependencies.'],
 ['Compare '+t[0][0]+' and '+t[1][0]+' in this design.',t[0][1]+'. '+t[1][1]+'.',t[0][2]+'. '+t[1][2]+'.'],
 ['What would make a replacement plan incomplete for '+title+'?',s['decision'],'Record identity, capability and recovery evidence before assuming compatibility.'],
 ['Which performance observation is relevant, and which shortcut should be rejected?',s['performance'],'Use the measurement at the affected boundary over the incident time window.'],
 ['How should the lab report distinguish authored recovery from verified target recovery?','The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.','The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.']]
 def q(row,j,prefix):
  return dict(questionId=f'{id}-{prefix}{j+1}',topicId=id,difficulty='foundational' if j<2 else 'intermediate' if j<6 else 'advanced',type='short-answer',question=row[0],answer=row[1],explanation=row[2],testedConcept=t[j%3][0] if j<4 else ['Fault inference','Recovery criteria','Concept distinction','Platform choice','Performance evidence','Evidence scope'][j-4])
 quick=[['What role does '+title+' play?',s['definition'],s['scope']],['What should be checked before choosing its runbook?',s['scope'],'Model, operating system, mode and release jointly determine applicability.'],['What is the first observation after the stated repair?',s['repair'],'Retest the original symptom and preserve an isolation or unaffected-service control.']]
 l=dict(id=id,batch='25',title=title,subtitle='Identify the platform. Trace its service. Prove the boundary.',level='Foundation → Device operations',minutes=45,interactive='dm-'+id,
 definition=s['definition'],purpose=s['decision']+' In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.',
 mental='Think of the device as a set of handoffs, not a single green status light. '+t[0][0]+' answers one question: '+t[0][1]+'. '+t[1][0]+' answers another: '+t[1][1]+'. '+t[2][0]+' adds '+t[2][1]+'. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.',
 components=[a+': '+v+'. Boundary: '+limit+'.' for a,v,limit in t],comparison=t,mechanism=steps,flow=[[LABELS[i][j],x] for j,x in enumerate(steps)],
 example=s['case']+' Fault: '+s['fault']+' Required recovery evidence: '+s['repair']+' Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.',
 commands=[dict(filename='guided-observation.txt',platform=s['scope']+' Guided; no Cisco execution claimed.',code=s['commands'],explanation='Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.',expected='Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is '+s['fault']),dict(filename='offline-worksheet.txt',platform='Python 3.10+; course root; actual local calculation only',code='python labs/device-preflight.py --run',explanation='Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.',expected='Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service.')],
 configuration='Applicability: '+s['scope']+' First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: '+s['repair']+' For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.',
 production=s['decision']+' Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.',
 security=s['security']+' Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.',
 performance=s['performance']+' State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.',
 troubleshooting=[['Observed incident',s['case']],['First hypothesis and discriminating evidence',s['fault']+' Compare the relevant observation with the captured baseline before changing anything.'],['Narrow repair and service verification',s['repair']],['The reported state looks correct but traffic still fails','Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy.']],
 mistakes=[x[2]+'.' for x in t]+[s['fault'],'Treating a guided procedure or authored case as executed device evidence.'],
 ports='The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.',
 prerequisites=['lab-2'] if i==0 else ['device-'+str(i-1)],related=['device-'+str(i+1)] if i<16 else ['hardware-0','s7-g0-t0'],
 lab=dict(objective='Investigate the supplied '+title+' case and write a bounded recovery record. '+s['case'],requirements='Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.',topology=[x[0]+' → '+x[1] for x in t],steps=['Record applicability and topology. '+s['scope'],'Select Baseline in the incident panel and predict the service outcome without revealing the explanation. '+s['case'],'Select Fault. Write the first failed handoff and one alternative diagnosis. '+s['fault'],'Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.','Reveal the reasoning, then select Recovery and compare with your prediction. '+s['repair'],'Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.','Run the local Python worksheet and label the output calculated, not captured from a Cisco device.','Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline.'],verification=s['repair']+' Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.',troubleshooting=s['fault']+' If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.',challenge=s['questions'][3][0]+' Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.',cleanup='Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed.'),
 glossary={a:v+'. '+limit+'.' for a,v,limit in t},sources=[dict(title=SRC[k][0],url=SRC[k][1],checked='2026-10-09') for k in s['refs']],quick=[q(x,j,'QC') for j,x in enumerate(quick)],exams=[q(x,j,'Q') for j,x in enumerate(questions)],deviceCase=dict(baseline=s['case'],fault=s['fault'],restore=s['repair'],scope=s['scope']),artifacts=[dict(title='Cisco device evidence workbook',path='labs/device-mastery-workbook.md'),dict(title='Offline declared-evidence worksheet',path='labs/device-preflight.py')])
 lessons.append(l)
 wb+=['## '+id+' — '+title,'',s['scope'],'','Baseline: '+s['case'],'','Fault: '+s['fault'],'','Recovery acceptance: '+s['repair'],'','Guided observations (unexecuted):','','```text',s['commands'],'```','','Design decision: '+s['decision'],'']
(R/'content/batch-25.js').write_text('window.INFRA_BATCHES = window.INFRA_BATCHES || {};\nwindow.INFRA_BATCHES["25"] = '+json.dumps(lessons,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
(R/'labs/device-mastery-workbook.md').write_text('\n'.join(wb)+'\n',encoding='utf-8')
(R/'docs/device-source-register.json').write_text(json.dumps({k:dict(title=v[0],url=v[1],checked='2026-10-09',method='Official Cisco web search result and subsequent link check; applicability limited to stated reference') for k,v in SRC.items()},indent=2)+'\n',encoding='utf-8')
if b['status']!='completed':
 b.update(status='in-progress',draftNodeIds=b['nodeIds'])
 m.update(currentBatch='25',nextNode='device-0')
b.update(visualizations='17 four-step mechanisms, component comparisons and incident worksheets.',labs='17 authored fault/recovery cases with guided target extensions and a local three-valued evidence worksheet.',interactions='17 keyboard-operable incident panels; 170 original exams and 51 quick checks.')
(R/'content/enrichment.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Built 17 Batch 25 lessons; acceptance remains separate.')
