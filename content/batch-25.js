window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["25"] = [
  {
    "id": "device-0",
    "batch": "25",
    "title": "Catalyst 2960 / 2960X",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-0",
    "definition": "Catalyst 2960 and 2960X are campus access-switch families used to attach endpoints to VLANs and carry those VLANs toward a gateway.",
    "purpose": "Place gateways according to verified routing capability rather than assuming all 2960 variants are identical. Record the exact image, uplink media and management dependency before a migration. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Access port answers one question: An endpoint-facing VLAN attachment. Trunk answers another: A link carrying selected VLANs. Management SVI adds An IP interface for device management. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Access port: An endpoint-facing VLAN attachment. Boundary: Untagged does not mean unsegmented.",
      "Trunk: A link carrying selected VLANs. Boundary: Link-up does not prove VLAN membership.",
      "Management SVI: An IP interface for device management. Boundary: It does not establish arbitrary inter-VLAN routing."
    ],
    "comparison": [
      [
        "Access port",
        "An endpoint-facing VLAN attachment",
        "Untagged does not mean unsegmented"
      ],
      [
        "Trunk",
        "A link carrying selected VLANs",
        "Link-up does not prove VLAN membership"
      ],
      [
        "Management SVI",
        "An IP interface for device management",
        "It does not establish arbitrary inter-VLAN routing"
      ]
    ],
    "mechanism": [
      "Classify an incoming untagged endpoint frame into the configured access VLAN.",
      "Learn the source and look up the destination MAC within that VLAN.",
      "Forward on eligible VLAN ports; on a trunk verify allowance and native-tag handling.",
      "Use the upstream gateway for another subnet and verify its return path."
    ],
    "flow": [
      [
        "Access VLAN",
        "Classify an incoming untagged endpoint frame into the configured access VLAN."
      ],
      [
        "MAC lookup",
        "Learn the source and look up the destination MAC within that VLAN."
      ],
      [
        "Trunk forwarding",
        "Forward on eligible VLAN ports; on a trunk verify allowance and native-tag handling."
      ],
      [
        "Gateway path",
        "Use the upstream gateway for another subnet and verify its return path."
      ]
    ],
    "example": "Authored case: workstation A is in VLAN 20 on Gi1/0/1; the uplink carries VLANs 10 and 20 to an external gateway. VLAN 10 management still works. Fault: After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up. Required recovery evidence: Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation. Guided; no Cisco execution claimed.",
        "code": "show version\nshow vlan brief\nshow interfaces trunk\nshow mac address-table dynamic",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: 2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Place gateways according to verified routing capability rather than assuming all 2960 variants are identical. Record the exact image, uplink media and management dependency before a migration. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Keep management off the user VLAN where possible; restrict SSH and SNMP access. Introduce edge protections only after identifying genuine endpoint ports. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Check uplink oversubscription and error-counter deltas. A fast access port cannot overcome a congested uplink. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: workstation A is in VLAN 20 on Gi1/0/1; the uplink carries VLANs 10 and 20 to an external gateway. VLAN 10 management still works."
      ],
      [
        "First hypothesis and discriminating evidence",
        "After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Untagged does not mean unsegmented.",
      "Link-up does not prove VLAN membership.",
      "It does not establish arbitrary inter-VLAN routing.",
      "After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "lab-2"
    ],
    "related": [
      "device-1"
    ],
    "lab": {
      "objective": "Investigate the supplied Catalyst 2960 / 2960X case and write a bounded recovery record. Authored case: workstation A is in VLAN 20 on Gi1/0/1; the uplink carries VLANs 10 and 20 to an external gateway. VLAN 10 management still works.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Access port → An endpoint-facing VLAN attachment",
        "Trunk → A link carrying selected VLANs",
        "Management SVI → An IP interface for device management"
      ],
      "steps": [
        "Record applicability and topology. 2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: workstation A is in VLAN 20 on Gi1/0/1; the uplink carries VLANs 10 and 20 to an external gateway. VLAN 10 management still works.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Why add one VLAN instead of replacing the list? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Access port": "An endpoint-facing VLAN attachment. Untagged does not mean unsegmented.",
      "Trunk": "A link carrying selected VLANs. Link-up does not prove VLAN membership.",
      "Management SVI": "An IP interface for device management. It does not establish arbitrary inter-VLAN routing."
    },
    "sources": [
      {
        "title": "2960-X IOS 15.2(2)E VLANs",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960x/software/15-2_2_e/vlan/configuration_guide/b_vlan_1522e_2960x_cg/b_vlan_152ex_2960-x_cg_chapter_011.html",
        "checked": "2026-10-09"
      },
      {
        "title": "2960-X IOS 15.2(2)E trunks",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2960x/software/15-2_2_e/vlan/configuration_guide/b_vlan_1522e_2960x_cg/b_vlan_152ex_2960-x_cg_chapter_0100.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-0-QC1",
        "topicId": "device-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Catalyst 2960 / 2960X play?",
        "answer": "Catalyst 2960 and 2960X are campus access-switch families used to attach endpoints to VLANs and carry those VLANs toward a gateway.",
        "explanation": "2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation.",
        "testedConcept": "Access port"
      },
      {
        "questionId": "device-0-QC2",
        "topicId": "device-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Trunk"
      },
      {
        "questionId": "device-0-QC3",
        "topicId": "device-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Management SVI"
      }
    ],
    "exams": [
      {
        "questionId": "device-0-Q1",
        "topicId": "device-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can management survive this fault?",
        "answer": "Its VLAN 10 is still permitted.",
        "explanation": "A working management path does not test VLAN 20.",
        "testedConcept": "Access port"
      },
      {
        "questionId": "device-0-Q2",
        "topicId": "device-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an SVI prove routing support?",
        "answer": "No; verify the platform feature set and routing configuration.",
        "explanation": "Management reachability and transit routing differ.",
        "testedConcept": "Trunk"
      },
      {
        "questionId": "device-0-Q3",
        "topicId": "device-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation separates a trunk fault from a bad access VLAN?",
        "answer": "Compare the endpoint access assignment and the uplink allowed/forwarding lists.",
        "explanation": "Observe both boundaries before editing.",
        "testedConcept": "Management SVI"
      },
      {
        "questionId": "device-0-Q4",
        "topicId": "device-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why add one VLAN instead of replacing the list?",
        "answer": "Replacement can remove unrelated working VLANs.",
        "explanation": "Recovery must preserve existing service.",
        "testedConcept": "Access port"
      },
      {
        "questionId": "device-0-Q5",
        "topicId": "device-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Catalyst 2960 / 2960X incident.",
        "answer": "After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-0-Q6",
        "topicId": "device-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-0-Q7",
        "topicId": "device-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Access port and Trunk in this design.",
        "answer": "An endpoint-facing VLAN attachment. A link carrying selected VLANs.",
        "explanation": "Untagged does not mean unsegmented. Link-up does not prove VLAN membership.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-0-Q8",
        "topicId": "device-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Catalyst 2960 / 2960X?",
        "answer": "Place gateways according to verified routing capability rather than assuming all 2960 variants are identical. Record the exact image, uplink media and management dependency before a migration.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-0-Q9",
        "topicId": "device-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Check uplink oversubscription and error-counter deltas. A fast access port cannot overcome a congested uplink.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-0-Q10",
        "topicId": "device-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: workstation A is in VLAN 20 on Gi1/0/1; the uplink carries VLANs 10 and 20 to an external gateway. VLAN 10 management still works.",
      "fault": "After an uplink edit, its allowed list contains only VLAN 10. VLAN 20 fails although both physical interfaces remain up.",
      "restore": "Restore VLAN 20 on the owned uplink without replacing the other allowed VLANs. Verify endpoint MAC learning, VLAN 20 gateway traffic both ways and continued VLAN 10 management.",
      "scope": "2960-X IOS 15.2(2)E VLAN teaching reference; original 2960 images and feature sets must be checked separately. Treat these as existing-estate practice, not a current purchase recommendation."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-1",
    "batch": "25",
    "title": "Catalyst 3560 / 3750",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-1",
    "definition": "Catalyst 3560 and 3750 are multilayer campus-switch families that can combine VLAN switching with supported IP routing.",
    "purpose": "Separate gateway availability from stack availability. A stack shares operational fate; select a resource template against actual route and MAC scale, then plan any required reload in the release guide. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. SVI answers one question: Layer 3 interface for a VLAN. SDM template answers another: Hardware resource allocation profile. StackWise adds Supported 3750 stack interconnect. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "SVI: Layer 3 interface for a VLAN. Boundary: Its operational state depends on VLAN conditions.",
      "SDM template: Hardware resource allocation profile. Boundary: A feature list is not a capacity guarantee.",
      "StackWise: Supported 3750 stack interconnect. Boundary: A 3560 is not a 3750 stack member."
    ],
    "comparison": [
      [
        "SVI",
        "Layer 3 interface for a VLAN",
        "Its operational state depends on VLAN conditions"
      ],
      [
        "SDM template",
        "Hardware resource allocation profile",
        "A feature list is not a capacity guarantee"
      ],
      [
        "StackWise",
        "Supported 3750 stack interconnect",
        "A 3560 is not a 3750 stack member"
      ]
    ],
    "mechanism": [
      "An endpoint resolves its gateway address to the switch SVI MAC.",
      "The switch terminates the incoming Layer 2 frame and performs a route lookup when routing is enabled.",
      "The selected egress interface resolves a next hop or local endpoint.",
      "Build the egress frame and verify the return route and policy."
    ],
    "flow": [
      [
        "Gateway MAC",
        "An endpoint resolves its gateway address to the switch SVI MAC."
      ],
      [
        "Route lookup",
        "The switch terminates the incoming Layer 2 frame and performs a route lookup when routing is enabled."
      ],
      [
        "Egress neighbor",
        "The selected egress interface resolves a next hop or local endpoint."
      ],
      [
        "Return path",
        "Build the egress frame and verify the return route and policy."
      ]
    ],
    "example": "Authored case: VLANs 20 and 30 have live SVIs and correct endpoint gateways. Hosts reach their own gateway but not the other subnet. Fault: The teaching baseline lost its ip routing setting; both VLANs still switch locally. Required recovery evidence: On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently. Guided; no Cisco execution claimed.",
        "code": "show version\nshow ip interface brief\nshow ip route\nshow sdm prefer",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The teaching baseline lost its ip routing setting; both VLANs still switch locally."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Separate gateway availability from stack availability. A stack shares operational fate; select a resource template against actual route and MAC scale, then plan any required reload in the release guide. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Routing enables reachability, not authorization. Apply reviewed inter-VLAN policy and preserve independent management access. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Route and MAC resource allocations can trade off. Compare the intended table sizes with the selected hardware profile. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: VLANs 20 and 30 have live SVIs and correct endpoint gateways. Hosts reach their own gateway but not the other subnet."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The teaching baseline lost its ip routing setting; both VLANs still switch locally. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Its operational state depends on VLAN conditions.",
      "A feature list is not a capacity guarantee.",
      "A 3560 is not a 3750 stack member.",
      "The teaching baseline lost its ip routing setting; both VLANs still switch locally.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-0"
    ],
    "related": [
      "device-2"
    ],
    "lab": {
      "objective": "Investigate the supplied Catalyst 3560 / 3750 case and write a bounded recovery record. Authored case: VLANs 20 and 30 have live SVIs and correct endpoint gateways. Hosts reach their own gateway but not the other subnet.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "SVI → Layer 3 interface for a VLAN",
        "SDM template → Hardware resource allocation profile",
        "StackWise → Supported 3750 stack interconnect"
      ],
      "steps": [
        "Record applicability and topology. IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: VLANs 20 and 30 have live SVIs and correct endpoint gateways. Hosts reach their own gateway but not the other subnet.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The teaching baseline lost its ip routing setting; both VLANs still switch locally.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The teaching baseline lost its ip routing setting; both VLANs still switch locally. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Why inspect SDM before expanding routes? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "SVI": "Layer 3 interface for a VLAN. Its operational state depends on VLAN conditions.",
      "SDM template": "Hardware resource allocation profile. A feature list is not a capacity guarantee.",
      "StackWise": "Supported 3750 stack interconnect. A 3560 is not a 3750 stack member."
    },
    "sources": [
      {
        "title": "3560-X / 3750-X IOS 15.0(2)SE routing",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750x_3560x/software/release/15-0_2_se/configuration/guide/3750x_cg/swiprout.html",
        "checked": "2026-10-09"
      },
      {
        "title": "3560-X / 3750-X IOS 15.2(1)E VLANs",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750x_3560x/software/release/15-2_1_e/configuration/guide/scg3750x/swvlan.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-1-QC1",
        "topicId": "device-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Catalyst 3560 / 3750 play?",
        "answer": "Catalyst 3560 and 3750 are multilayer campus-switch families that can combine VLAN switching with supported IP routing.",
        "explanation": "IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently.",
        "testedConcept": "SVI"
      },
      {
        "questionId": "device-1-QC2",
        "topicId": "device-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "SDM template"
      },
      {
        "questionId": "device-1-QC3",
        "topicId": "device-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "StackWise"
      }
    ],
    "exams": [
      {
        "questionId": "device-1-Q1",
        "topicId": "device-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What changes at an SVI routing boundary?",
        "answer": "The Layer 2 frame is replaced and IP TTL is decremented.",
        "explanation": "IP endpoint addresses normally remain unchanged without NAT.",
        "testedConcept": "SVI"
      },
      {
        "questionId": "device-1-Q2",
        "topicId": "device-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why test both directions?",
        "answer": "The return gateway or policy can differ.",
        "explanation": "One successful request path does not establish a conversation.",
        "testedConcept": "SDM template"
      },
      {
        "questionId": "device-1-Q3",
        "topicId": "device-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a 3560 join a 3750 StackWise ring?",
        "answer": "Do not assume that; they are distinct platform capabilities.",
        "explanation": "Check the supported members and cabling.",
        "testedConcept": "StackWise"
      },
      {
        "questionId": "device-1-Q4",
        "topicId": "device-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect SDM before expanding routes?",
        "answer": "Hardware allocations may constrain scale.",
        "explanation": "Unused bandwidth is not unused route-table capacity.",
        "testedConcept": "SVI"
      },
      {
        "questionId": "device-1-Q5",
        "topicId": "device-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Catalyst 3560 / 3750 incident.",
        "answer": "The teaching baseline lost its ip routing setting; both VLANs still switch locally.",
        "explanation": "Distinguish observations from assumptions before proposing a write. On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-1-Q6",
        "topicId": "device-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-1-Q7",
        "topicId": "device-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare SVI and SDM template in this design.",
        "answer": "Layer 3 interface for a VLAN. Hardware resource allocation profile.",
        "explanation": "Its operational state depends on VLAN conditions. A feature list is not a capacity guarantee.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-1-Q8",
        "topicId": "device-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Catalyst 3560 / 3750?",
        "answer": "Separate gateway availability from stack availability. A stack shares operational fate; select a resource template against actual route and MAC scale, then plan any required reload in the release guide.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-1-Q9",
        "topicId": "device-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Route and MAC resource allocations can trade off. Compare the intended table sizes with the selected hardware profile.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-1-Q10",
        "topicId": "device-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: VLANs 20 and 30 have live SVIs and correct endpoint gateways. Hosts reach their own gateway but not the other subnet.",
      "fault": "The teaching baseline lost its ip routing setting; both VLANs still switch locally.",
      "restore": "On the isolated supported multilayer target, restore the captured routing setting. Verify both connected routes, bidirectional cross-VLAN traffic and the intended inter-VLAN deny rule.",
      "scope": "IOS 15.0(2)SE / 15.2(1)E 3560-X and 3750-X references illustrate the mechanism; check the original 3560/3750 image and SDM support independently."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-2",
    "batch": "25",
    "title": "Catalyst 9200",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-2",
    "definition": "Catalyst 9200 is an IOS XE campus access family whose port, uplink, power and stacking choices depend on the exact product identifier.",
    "purpose": "Build a bill of materials from exact PIDs and supported combinations. Stage replacement membership before reconnecting production endpoints; keep numbering and port maps explicit. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Product identifier answers one question: Exact hardware variant. Stack member answers another: A supported switch in a logical stack. Power budget adds Usable power for attached devices. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Product identifier: Exact hardware variant. Boundary: Family branding cannot select accessories.",
      "Stack member: A supported switch in a logical stack. Boundary: Physical connection alone does not establish readiness.",
      "Power budget: Usable power for attached devices. Boundary: Installed supply wattage is not all available PoE."
    ],
    "comparison": [
      [
        "Product identifier",
        "Exact hardware variant",
        "Family branding cannot select accessories"
      ],
      [
        "Stack member",
        "A supported switch in a logical stack",
        "Physical connection alone does not establish readiness"
      ],
      [
        "Power budget",
        "Usable power for attached devices",
        "Installed supply wattage is not all available PoE"
      ]
    ],
    "mechanism": [
      "Inventory each product identifier, software version and stack accessory.",
      "Check compatibility and stack connectivity before adding a member.",
      "Verify role, member readiness and interface numbering.",
      "Trace endpoint VLAN and power service through the resulting logical switch."
    ],
    "flow": [
      [
        "Member identity",
        "Inventory each product identifier, software version and stack accessory."
      ],
      [
        "Compatibility",
        "Check compatibility and stack connectivity before adding a member."
      ],
      [
        "Stack readiness",
        "Verify role, member readiness and interface numbering."
      ],
      [
        "Endpoint service",
        "Trace endpoint VLAN and power service through the resulting logical switch."
      ]
    ],
    "example": "Authored case: an access stack serves desks; an added member is cabled but never reaches the expected ready state. Fault: The change record omitted the new member software version, so compatibility has not been established. Required recovery evidence: Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable. Guided; no Cisco execution claimed.",
        "code": "show version\nshow inventory\nshow switch\nshow interfaces status",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The change record omitted the new member software version, so compatibility has not been established."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Build a bill of materials from exact PIDs and supported combinations. Stage replacement membership before reconnecting production endpoints; keep numbering and port maps explicit. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "A newly joined member must inherit only the intended management and endpoint policy. Sanitize exported configurations before sharing evidence. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Measure uplink utilization, queue drops and available PoE separately. Do not infer stack capacity from the sum of faceplate speeds. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: an access stack serves desks; an added member is cabled but never reaches the expected ready state."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The change record omitted the new member software version, so compatibility has not been established. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Family branding cannot select accessories.",
      "Physical connection alone does not establish readiness.",
      "Installed supply wattage is not all available PoE.",
      "The change record omitted the new member software version, so compatibility has not been established.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-1"
    ],
    "related": [
      "device-3"
    ],
    "lab": {
      "objective": "Investigate the supplied Catalyst 9200 case and write a bounded recovery record. Authored case: an access stack serves desks; an added member is cabled but never reaches the expected ready state.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Product identifier → Exact hardware variant",
        "Stack member → A supported switch in a logical stack",
        "Power budget → Usable power for attached devices"
      ],
      "steps": [
        "Record applicability and topology. Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: an access stack serves desks; an added member is cabled but never reaches the expected ready state.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The change record omitted the new member software version, so compatibility has not been established.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The change record omitted the new member software version, so compatibility has not been established. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Does a ready stack prove endpoint service? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Product identifier": "Exact hardware variant. Family branding cannot select accessories.",
      "Stack member": "A supported switch in a logical stack. Physical connection alone does not establish readiness.",
      "Power budget": "Usable power for attached devices. Installed supply wattage is not all available PoE."
    },
    "sources": [
      {
        "title": "Catalyst 9200 family data sheet",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9200-series-switches/nb-06-cat9200-ser-data-sheet-cte-en.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-2-QC1",
        "topicId": "device-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Catalyst 9200 play?",
        "answer": "Catalyst 9200 is an IOS XE campus access family whose port, uplink, power and stacking choices depend on the exact product identifier.",
        "explanation": "Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable.",
        "testedConcept": "Product identifier"
      },
      {
        "questionId": "device-2-QC2",
        "topicId": "device-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Stack member"
      },
      {
        "questionId": "device-2-QC3",
        "topicId": "device-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Power budget"
      }
    ],
    "exams": [
      {
        "questionId": "device-2-Q1",
        "topicId": "device-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is missing before the join can be diagnosed?",
        "answer": "Exact member software and hardware compatibility evidence.",
        "explanation": "Cabling is only one prerequisite.",
        "testedConcept": "Product identifier"
      },
      {
        "questionId": "device-2-Q2",
        "topicId": "device-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does C9200L identify the same uplink hardware as C9200?",
        "answer": "No; verify the exact variant.",
        "explanation": "An accessory order must use supported PIDs.",
        "testedConcept": "Stack member"
      },
      {
        "questionId": "device-2-Q3",
        "topicId": "device-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why record member numbers?",
        "answer": "They affect interface identity and the port map.",
        "explanation": "A valid VLAN applied to the wrong interface can cause an outage.",
        "testedConcept": "Power budget"
      },
      {
        "questionId": "device-2-Q4",
        "topicId": "device-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a ready stack prove endpoint service?",
        "answer": "No; verify VLAN and power delivery separately.",
        "explanation": "Control membership is only one boundary.",
        "testedConcept": "Product identifier"
      },
      {
        "questionId": "device-2-Q5",
        "topicId": "device-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Catalyst 9200 incident.",
        "answer": "The change record omitted the new member software version, so compatibility has not been established.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-2-Q6",
        "topicId": "device-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-2-Q7",
        "topicId": "device-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Product identifier and Stack member in this design.",
        "answer": "Exact hardware variant. A supported switch in a logical stack.",
        "explanation": "Family branding cannot select accessories. Physical connection alone does not establish readiness.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-2-Q8",
        "topicId": "device-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Catalyst 9200?",
        "answer": "Build a bill of materials from exact PIDs and supported combinations. Stage replacement membership before reconnecting production endpoints; keep numbering and port maps explicit.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-2-Q9",
        "topicId": "device-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Measure uplink utilization, queue drops and available PoE separately. Do not infer stack capacity from the sum of faceplate speeds.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-2-Q10",
        "topicId": "device-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: an access stack serves desks; an added member is cabled but never reaches the expected ready state.",
      "fault": "The change record omitted the new member software version, so compatibility has not been established.",
      "restore": "Collect both versions and exact models, resolve compatibility using the matching release procedure and retest member readiness. Confirm the old member interfaces and endpoint VLANs still work.",
      "scope": "Catalyst 9200 family data sheet; feature and compatibility decisions require the installed IOS XE release guide. C9200, C9200L and compact variants are not interchangeable."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-3",
    "batch": "25",
    "title": "Catalyst 9300",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-3",
    "definition": "Catalyst 9300 is an IOS XE campus access family with model-specific stacking, uplink and powered-endpoint capabilities.",
    "purpose": "Specify the endpoint power mode and failure budget as well as port speed. Validate stack data and power designs independently; do not infer a power pool from a data-stack cable. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. PoE allocation answers one question: Power admitted for connected endpoints. Stack data path answers another: Inter-member traffic connectivity. Uplink module adds External connectivity choice. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "PoE allocation: Power admitted for connected endpoints. Boundary: Requested power may exceed the remaining budget.",
      "Stack data path: Inter-member traffic connectivity. Boundary: It is distinct from shared power arrangements.",
      "Uplink module: External connectivity choice. Boundary: Not every module fits every variant."
    ],
    "comparison": [
      [
        "PoE allocation",
        "Power admitted for connected endpoints",
        "Requested power may exceed the remaining budget"
      ],
      [
        "Stack data path",
        "Inter-member traffic connectivity",
        "It is distinct from shared power arrangements"
      ],
      [
        "Uplink module",
        "External connectivity choice",
        "Not every module fits every variant"
      ]
    ],
    "mechanism": [
      "An endpoint connects and negotiates power where supported.",
      "The switch admits power against the available budget and policy.",
      "The powered endpoint establishes its data link and VLAN identity.",
      "Traffic crosses local or stack links to the selected uplink."
    ],
    "flow": [
      [
        "Power request",
        "An endpoint connects and negotiates power where supported."
      ],
      [
        "Budget admission",
        "The switch admits power against the available budget and policy."
      ],
      [
        "Endpoint link",
        "The powered endpoint establishes its data link and VLAN identity."
      ],
      [
        "Uplink traffic",
        "Traffic crosses local or stack links to the selected uplink."
      ]
    ],
    "example": "Authored case: three lab APs need 30 W each. A supplied usable budget is 80 W after reserved loads; the last AP cannot receive the requested allocation. Fault: The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement. Required recovery evidence: Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks. Guided; no Cisco execution claimed.",
        "code": "show version\nshow inventory\nshow power inline\nshow switch",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Specify the endpoint power mode and failure budget as well as port speed. Validate stack data and power designs independently; do not infer a power pool from a data-stack cable. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Protect unused ports and management access, and verify that an AP power workaround has not moved it onto an unauthorized VLAN. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Record endpoint operating mode when comparing throughput. Reduced power can constrain a device even while its Ethernet link is up. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: three lab APs need 30 W each. A supplied usable budget is 80 W after reserved loads; the last AP cannot receive the requested allocation."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Requested power may exceed the remaining budget.",
      "It is distinct from shared power arrangements.",
      "Not every module fits every variant.",
      "The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-2"
    ],
    "related": [
      "device-4"
    ],
    "lab": {
      "objective": "Investigate the supplied Catalyst 9300 case and write a bounded recovery record. Authored case: three lab APs need 30 W each. A supplied usable budget is 80 W after reserved loads; the last AP cannot receive the requested allocation.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "PoE allocation → Power admitted for connected endpoints",
        "Stack data path → Inter-member traffic connectivity",
        "Uplink module → External connectivity choice"
      ],
      "steps": [
        "Record applicability and topology. Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: three lab APs need 30 W each. A supplied usable budget is 80 W after reserved loads; the last AP cannot receive the requested allocation.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Can supply nameplate wattage replace usable PoE budget? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "PoE allocation": "Power admitted for connected endpoints. Requested power may exceed the remaining budget.",
      "Stack data path": "Inter-member traffic connectivity. It is distinct from shared power arrangements.",
      "Uplink module": "External connectivity choice. Not every module fits every variant."
    },
    "sources": [
      {
        "title": "Catalyst 9300 family data sheet",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9300-series-switches/nb-06-cat9300-ser-data-sheet-cte-en.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-3-QC1",
        "topicId": "device-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Catalyst 9300 play?",
        "answer": "Catalyst 9300 is an IOS XE campus access family with model-specific stacking, uplink and powered-endpoint capabilities.",
        "explanation": "Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks.",
        "testedConcept": "PoE allocation"
      },
      {
        "questionId": "device-3-QC2",
        "topicId": "device-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Stack data path"
      },
      {
        "questionId": "device-3-QC3",
        "topicId": "device-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Uplink module"
      }
    ],
    "exams": [
      {
        "questionId": "device-3-Q1",
        "topicId": "device-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the supplied power shortfall?",
        "answer": "10 W.",
        "explanation": "Three times 30 W is 90 W, exceeding 80 W.",
        "testedConcept": "PoE allocation"
      },
      {
        "questionId": "device-3-Q2",
        "topicId": "device-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a data stack imply shared power?",
        "answer": "No; verify the supported power topology independently.",
        "explanation": "The two arrangements solve different problems.",
        "testedConcept": "Stack data path"
      },
      {
        "questionId": "device-3-Q3",
        "topicId": "device-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect AP operating mode after power recovery?",
        "answer": "Link-up may coexist with reduced capabilities.",
        "explanation": "Test the actual service profile.",
        "testedConcept": "Uplink module"
      },
      {
        "questionId": "device-3-Q4",
        "topicId": "device-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can supply nameplate wattage replace usable PoE budget?",
        "answer": "No.",
        "explanation": "System consumption, reservations and redundancy policy also matter.",
        "testedConcept": "PoE allocation"
      },
      {
        "questionId": "device-3-Q5",
        "topicId": "device-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Catalyst 9300 incident.",
        "answer": "The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-3-Q6",
        "topicId": "device-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-3-Q7",
        "topicId": "device-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare PoE allocation and Stack data path in this design.",
        "answer": "Power admitted for connected endpoints. Inter-member traffic connectivity.",
        "explanation": "Requested power may exceed the remaining budget. It is distinct from shared power arrangements.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-3-Q8",
        "topicId": "device-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Catalyst 9300?",
        "answer": "Specify the endpoint power mode and failure budget as well as port speed. Validate stack data and power designs independently; do not infer a power pool from a data-stack cable.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-3-Q9",
        "topicId": "device-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Record endpoint operating mode when comparing throughput. Reduced power can constrain a device even while its Ethernet link is up.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-3-Q10",
        "topicId": "device-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: three lab APs need 30 W each. A supplied usable budget is 80 W after reserved loads; the last AP cannot receive the requested allocation.",
      "fault": "The requested 90 W exceeds the supplied 80 W budget by 10 W. This is budget arithmetic, not a physical power measurement.",
      "restore": "Restore the approved power design or reduce only the owned test load. Recheck delivered power, AP operating mode, link state and client traffic; preserve the reserved loads.",
      "scope": "Catalyst 9300 family data sheet; C9300, C9300L and C9300X variants require exact stacking and power compatibility checks."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-4",
    "batch": "25",
    "title": "Catalyst 9500",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-4",
    "definition": "Catalyst 9500 is a campus core and aggregation switch family; supported StackWise Virtual designs make a pair operate as one logical switching system.",
    "purpose": "Compare one logical pair with independent routed nodes against the operational failure model. Avoid a dual-failure experiment merely to demonstrate resilience. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. SVL answers one question: StackWise Virtual interconnect. Dual-active detection answers another: Detection of a split logical system. Multi-chassis EtherChannel adds A logical bundle spanning the supported pair. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "SVL: StackWise Virtual interconnect. Boundary: Its failure changes pair coordination.",
      "Dual-active detection: Detection of a split logical system. Boundary: It is not an ordinary user uplink.",
      "Multi-chassis EtherChannel: A logical bundle spanning the supported pair. Boundary: Member health still needs inspection."
    ],
    "comparison": [
      [
        "SVL",
        "StackWise Virtual interconnect",
        "Its failure changes pair coordination"
      ],
      [
        "Dual-active detection",
        "Detection of a split logical system",
        "It is not an ordinary user uplink"
      ],
      [
        "Multi-chassis EtherChannel",
        "A logical bundle spanning the supported pair",
        "Member health still needs inspection"
      ]
    ],
    "mechanism": [
      "Validate pair hardware, software and interconnect support.",
      "Establish the logical pair and check active/standby roles.",
      "Attach an approved multi-chassis bundle and verify member consistency.",
      "Observe a controlled single-link failure and confirm the intended surviving path."
    ],
    "flow": [
      [
        "Pair support",
        "Validate pair hardware, software and interconnect support."
      ],
      [
        "Pair roles",
        "Establish the logical pair and check active/standby roles."
      ],
      [
        "Bundle members",
        "Attach an approved multi-chassis bundle and verify member consistency."
      ],
      [
        "Single-fault drill",
        "Observe a controlled single-link failure and confirm the intended surviving path."
      ]
    ],
    "example": "Authored case: a reviewed pair plan includes an SVL and a physically separate dual-active detection path. A technician proposes removing that separate path because the SVL is up. Fault: The proposal removes evidence that the design can detect a split when the main interconnect fails. Required recovery evidence: Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release. Guided; no Cisco execution claimed.",
        "code": "show version\nshow stackwise-virtual\nshow stackwise-virtual dual-active-detection\nshow etherchannel summary",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The proposal removes evidence that the design can detect a split when the main interconnect fails."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Compare one logical pair with independent routed nodes against the operational failure model. Avoid a dual-failure experiment merely to demonstrate resilience. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Physical access to pair interconnects is a control-plane concern. Protect console access and ensure both members have an approved management recovery path. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Check the surviving interconnect and uplink load rather than doubling nominal capacity. Redundancy that survives but overloads is insufficient. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a reviewed pair plan includes an SVL and a physically separate dual-active detection path. A technician proposes removing that separate path because the SVL is up."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The proposal removes evidence that the design can detect a split when the main interconnect fails. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Its failure changes pair coordination.",
      "It is not an ordinary user uplink.",
      "Member health still needs inspection.",
      "The proposal removes evidence that the design can detect a split when the main interconnect fails.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-3"
    ],
    "related": [
      "device-5"
    ],
    "lab": {
      "objective": "Investigate the supplied Catalyst 9500 case and write a bounded recovery record. Authored case: a reviewed pair plan includes an SVL and a physically separate dual-active detection path. A technician proposes removing that separate path because the SVL is up.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "SVL → StackWise Virtual interconnect",
        "Dual-active detection → Detection of a split logical system",
        "Multi-chassis EtherChannel → A logical bundle spanning the supported pair"
      ],
      "steps": [
        "Record applicability and topology. StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a reviewed pair plan includes an SVL and a physically separate dual-active detection path. A technician proposes removing that separate path because the SVL is up.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The proposal removes evidence that the design can detect a split when the main interconnect fails.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The proposal removes evidence that the design can detect a split when the main interconnect fails. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "What must precede a fault drill? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "SVL": "StackWise Virtual interconnect. Its failure changes pair coordination.",
      "Dual-active detection": "Detection of a split logical system. It is not an ordinary user uplink.",
      "Multi-chassis EtherChannel": "A logical bundle spanning the supported pair. Member health still needs inspection."
    },
    "sources": [
      {
        "title": "C9500 IOS XE 16.10 StackWise Virtual",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/16-10/configuration_guide/ha/b_1610_ha_9500_cg/configuring_cisco_stackwise_virtual.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-4-QC1",
        "topicId": "device-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Catalyst 9500 play?",
        "answer": "Catalyst 9500 is a campus core and aggregation switch family; supported StackWise Virtual designs make a pair operate as one logical switching system.",
        "explanation": "StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release.",
        "testedConcept": "SVL"
      },
      {
        "questionId": "device-4-QC2",
        "topicId": "device-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Dual-active detection"
      },
      {
        "questionId": "device-4-QC3",
        "topicId": "device-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Multi-chassis EtherChannel"
      }
    ],
    "exams": [
      {
        "questionId": "device-4-Q1",
        "topicId": "device-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does the separate detection path serve?",
        "answer": "It helps detect a dual-active condition.",
        "explanation": "An operational SVL today does not cover its future failure.",
        "testedConcept": "SVL"
      },
      {
        "questionId": "device-4-Q2",
        "topicId": "device-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can every 9500 use every SVL port?",
        "answer": "No; consult the exact model and release restrictions.",
        "explanation": "A family name is insufficient.",
        "testedConcept": "Dual-active detection"
      },
      {
        "questionId": "device-4-Q3",
        "topicId": "device-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why observe bundle members after recovery?",
        "answer": "A logical bundle can be up with missing members.",
        "explanation": "Availability and capacity differ.",
        "testedConcept": "Multi-chassis EtherChannel"
      },
      {
        "questionId": "device-4-Q4",
        "topicId": "device-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must precede a fault drill?",
        "answer": "Approved scope, console access, baseline and supported restoration procedure.",
        "explanation": "The drill must not depend on the path being removed.",
        "testedConcept": "SVL"
      },
      {
        "questionId": "device-4-Q5",
        "topicId": "device-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Catalyst 9500 incident.",
        "answer": "The proposal removes evidence that the design can detect a split when the main interconnect fails.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-4-Q6",
        "topicId": "device-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-4-Q7",
        "topicId": "device-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare SVL and Dual-active detection in this design.",
        "answer": "StackWise Virtual interconnect. Detection of a split logical system.",
        "explanation": "Its failure changes pair coordination. It is not an ordinary user uplink.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-4-Q8",
        "topicId": "device-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Catalyst 9500?",
        "answer": "Compare one logical pair with independent routed nodes against the operational failure model. Avoid a dual-failure experiment merely to demonstrate resilience.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-4-Q9",
        "topicId": "device-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Check the surviving interconnect and uplink load rather than doubling nominal capacity. Redundancy that survives but overloads is insufficient.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-4-Q10",
        "topicId": "device-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a reviewed pair plan includes an SVL and a physically separate dual-active detection path. A technician proposes removing that separate path because the SVL is up.",
      "fault": "The proposal removes evidence that the design can detect a split when the main interconnect fails.",
      "restore": "Retain the supported detection path, document independent cabling and perform only the approved single-fault lab procedure with console access. Verify pair role, bundle members and end-to-end traffic after restoration.",
      "scope": "StackWise Virtual IOS XE 16.10 reference is a historical scoped example; supported models, links and restrictions must be resolved for the installed release."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-5",
    "batch": "25",
    "title": "Cisco ISR 4000",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-5",
    "definition": "Cisco ISR 4000 routers provide branch routing and integrated services using IOS XE, with service capacity tied to the specific platform and enabled feature set.",
    "purpose": "Choose a branch design using measured service throughput and failure demand. Interface speed is not a promise of encrypted or inspected throughput. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Control plane answers one question: Routing and management processes. QFP answers another: Packet-processing subsystem on applicable platforms. Service path adds Routing plus enabled packet services. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Control plane: Routing and management processes. Boundary: Low CPU does not prove forwarding headroom.",
      "QFP: Packet-processing subsystem on applicable platforms. Boundary: Its utilization differs from control CPU.",
      "Service path: Routing plus enabled packet services. Boundary: Feature combinations change resource demand."
    ],
    "comparison": [
      [
        "Control plane",
        "Routing and management processes",
        "Low CPU does not prove forwarding headroom"
      ],
      [
        "QFP",
        "Packet-processing subsystem on applicable platforms",
        "Its utilization differs from control CPU"
      ],
      [
        "Service path",
        "Routing plus enabled packet services",
        "Feature combinations change resource demand"
      ]
    ],
    "mechanism": [
      "Receive a packet and classify the relevant interface and service context.",
      "Resolve forwarding and apply configured packet services.",
      "Transmit on the selected path while accounting for queues and drops.",
      "Compare forwarding load with control-plane and application observations."
    ],
    "flow": [
      [
        "Ingress context",
        "Receive a packet and classify the relevant interface and service context."
      ],
      [
        "Packet services",
        "Resolve forwarding and apply configured packet services."
      ],
      [
        "Egress queues",
        "Transmit on the selected path while accounting for queues and drops."
      ],
      [
        "Correlated samples",
        "Compare forwarding load with control-plane and application observations."
      ]
    ],
    "example": "Authored case: a branch experiences loss during a service-heavy traffic interval; routing neighbors stay established and management CPU appears moderate. Fault: The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence. Required recovery evidence: Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific. Guided; no Cisco execution claimed.",
        "code": "show version\nshow ip route\nshow platform hardware qfp active datapath utilization\nshow interfaces",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Choose a branch design using measured service throughput and failure demand. Interface speed is not a promise of encrypted or inspected throughput. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Restrict management and routing adjacencies to approved peers; retain tunnel and policy protection during performance troubleshooting. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Use time-aligned packet-processing, interface and application samples. Avoid comparing a since-boot total with a one-minute incident. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a branch experiences loss during a service-heavy traffic interval; routing neighbors stay established and management CPU appears moderate."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Low CPU does not prove forwarding headroom.",
      "Its utilization differs from control CPU.",
      "Feature combinations change resource demand.",
      "The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-4"
    ],
    "related": [
      "device-6"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco ISR 4000 case and write a bounded recovery record. Authored case: a branch experiences loss during a service-heavy traffic interval; routing neighbors stay established and management CPU appears moderate.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Control plane → Routing and management processes",
        "QFP → Packet-processing subsystem on applicable platforms",
        "Service path → Routing plus enabled packet services"
      ],
      "steps": [
        "Record applicability and topology. ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a branch experiences loss during a service-heavy traffic interval; routing neighbors stay established and management CPU appears moderate.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Should security services be disabled to claim recovery? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Control plane": "Routing and management processes. Low CPU does not prove forwarding headroom.",
      "QFP": "Packet-processing subsystem on applicable platforms. Its utilization differs from control CPU.",
      "Service path": "Routing plus enabled packet services. Feature combinations change resource demand."
    },
    "sources": [
      {
        "title": "ISR 4000 support and release guides",
        "url": "https://www.cisco.com/c/en/us/support/routers/4000-series-integrated-services-routers-isr/series.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE CPU/QFP diagnostic evidence",
        "url": "https://www.cisco.com/c/en/us/support/docs/technical-details/222469-reporting-problems-effectively-to-tac-se.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-5-QC1",
        "topicId": "device-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco ISR 4000 play?",
        "answer": "Cisco ISR 4000 routers provide branch routing and integrated services using IOS XE, with service capacity tied to the specific platform and enabled feature set.",
        "explanation": "ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific.",
        "testedConcept": "Control plane"
      },
      {
        "questionId": "device-5-QC2",
        "topicId": "device-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "QFP"
      },
      {
        "questionId": "device-5-QC3",
        "topicId": "device-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Service path"
      }
    ],
    "exams": [
      {
        "questionId": "device-5-Q1",
        "topicId": "device-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why is moderate CPU inconclusive?",
        "answer": "Packet forwarding and control processing have different observations.",
        "explanation": "Inspect the actual congested boundary.",
        "testedConcept": "Control plane"
      },
      {
        "questionId": "device-5-Q2",
        "topicId": "device-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does link speed equal VPN throughput?",
        "answer": "No.",
        "explanation": "Packet size, encryption, services and entitlement affect results.",
        "testedConcept": "QFP"
      },
      {
        "questionId": "device-5-Q3",
        "topicId": "device-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which counters need a common time window?",
        "answer": "Load, drop and application-loss samples.",
        "explanation": "Misaligned windows can suggest a false cause.",
        "testedConcept": "Service path"
      },
      {
        "questionId": "device-5-Q4",
        "topicId": "device-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should security services be disabled to claim recovery?",
        "answer": "No; the approved service profile must still work.",
        "explanation": "A faster unprotected path does not satisfy intent.",
        "testedConcept": "Control plane"
      },
      {
        "questionId": "device-5-Q5",
        "topicId": "device-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco ISR 4000 incident.",
        "answer": "The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-5-Q6",
        "topicId": "device-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-5-Q7",
        "topicId": "device-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Control plane and QFP in this design.",
        "answer": "Routing and management processes. Packet-processing subsystem on applicable platforms.",
        "explanation": "Low CPU does not prove forwarding headroom. Its utilization differs from control CPU.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-5-Q8",
        "topicId": "device-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco ISR 4000?",
        "answer": "Choose a branch design using measured service throughput and failure demand. Interface speed is not a promise of encrypted or inspected throughput.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-5-Q9",
        "topicId": "device-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Use time-aligned packet-processing, interface and application samples. Avoid comparing a since-boot total with a one-minute incident.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-5-Q10",
        "topicId": "device-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a branch experiences loss during a service-heavy traffic interval; routing neighbors stay established and management CPU appears moderate.",
      "fault": "The operator concludes that the router has spare capacity from management CPU alone, without packet-processing or drop evidence.",
      "restore": "Correlate QFP utilization and drop-counter deltas with the same traffic interval. Validate the actual service mix and entitlement before resizing or changing features; retest a bounded representative flow.",
      "scope": "ISR 4000 support portal and Cisco IOS XE QFP diagnostic guidance; throughput entitlement and command availability are release-specific."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-6",
    "batch": "25",
    "title": "Cisco ASR",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-6",
    "definition": "Cisco ASR names several router families; platform identity must precede any assumption about operating system, forwarding architecture or configuration workflow.",
    "purpose": "Require chassis, OS, release, modules, scale and service objectives in procurement and change records. A vague ASR label is insufficient for either. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. ASR 1000 answers one question: An IOS XE router family. ASR 9000 answers another: An IOS XR router family. Forwarding resource adds Platform-specific packet and table capacity. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "ASR 1000: An IOS XE router family. Boundary: Its procedures cannot be presumed on ASR 9000.",
      "ASR 9000: An IOS XR router family. Boundary: Candidate and commit behavior differs from IOS XE CLI.",
      "Forwarding resource: Platform-specific packet and table capacity. Boundary: Control reachability does not establish it."
    ],
    "comparison": [
      [
        "ASR 1000",
        "An IOS XE router family",
        "Its procedures cannot be presumed on ASR 9000"
      ],
      [
        "ASR 9000",
        "An IOS XR router family",
        "Candidate and commit behavior differs from IOS XE CLI"
      ],
      [
        "Forwarding resource",
        "Platform-specific packet and table capacity",
        "Control reachability does not establish it"
      ]
    ],
    "mechanism": [
      "Read the chassis and software identity before selecting a runbook.",
      "Map the intended routing service to the platform architecture.",
      "Use the matching configuration and verification workflow.",
      "Confirm route installation, forwarding and return policy with independent observations."
    ],
    "flow": [
      [
        "Chassis and OS",
        "Read the chassis and software identity before selecting a runbook."
      ],
      [
        "Service architecture",
        "Map the intended routing service to the platform architecture."
      ],
      [
        "Matching workflow",
        "Use the matching configuration and verification workflow."
      ],
      [
        "Forwarding evidence",
        "Confirm route installation, forwarding and return policy with independent observations."
      ]
    ],
    "example": "Authored case: a maintenance ticket says only ASR. The supplied inventory shows ASR 9000 with IOS XR; the attached runbook was written for ASR 1000 IOS XE. Fault: The runbook targets the wrong operating system and cannot establish a valid change or rollback. Required recovery evidence: Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted. Guided; no Cisco execution claimed.",
        "code": "show version\nshow inventory",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The runbook targets the wrong operating system and cannot establish a valid change or rollback."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Require chassis, OS, release, modules, scale and service objectives in procurement and change records. A vague ASR label is insufficient for either. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Separate operator roles and keep management reachable during a routing change. Review imported configuration as privileged input. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Consider packet rate, enabled services and table scale in addition to bandwidth. Different line cards can impose different limits. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a maintenance ticket says only ASR. The supplied inventory shows ASR 9000 with IOS XR; the attached runbook was written for ASR 1000 IOS XE."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The runbook targets the wrong operating system and cannot establish a valid change or rollback. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Its procedures cannot be presumed on ASR 9000.",
      "Candidate and commit behavior differs from IOS XE CLI.",
      "Control reachability does not establish it.",
      "The runbook targets the wrong operating system and cannot establish a valid change or rollback.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-5"
    ],
    "related": [
      "device-7"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco ASR case and write a bounded recovery record. Authored case: a maintenance ticket says only ASR. The supplied inventory shows ASR 9000 with IOS XR; the attached runbook was written for ASR 1000 IOS XE.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "ASR 1000 → An IOS XE router family",
        "ASR 9000 → An IOS XR router family",
        "Forwarding resource → Platform-specific packet and table capacity"
      ],
      "steps": [
        "Record applicability and topology. ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a maintenance ticket says only ASR. The supplied inventory shows ASR 9000 with IOS XR; the attached runbook was written for ASR 1000 IOS XE.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The runbook targets the wrong operating system and cannot establish a valid change or rollback.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The runbook targets the wrong operating system and cannot establish a valid change or rollback. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Does a route in the control table prove service? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "ASR 1000": "An IOS XE router family. Its procedures cannot be presumed on ASR 9000.",
      "ASR 9000": "An IOS XR router family. Candidate and commit behavior differs from IOS XE CLI.",
      "Forwarding resource": "Platform-specific packet and table capacity. Control reachability does not establish it."
    },
    "sources": [
      {
        "title": "ASR 1000 IOS XE data sheet",
        "url": "https://www.cisco.com/c/en/us/products/collateral/routers/asr-1000-series-aggregation-services-routers/datasheet-c78-731632.html",
        "checked": "2026-10-09"
      },
      {
        "title": "ASR 9000 IOS XR 64-bit data sheet",
        "url": "https://www.cisco.com/c/en/us/products/collateral/routers/asr-9000-series-aggregation-services-routers/datasheet-c78-737841.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-6-QC1",
        "topicId": "device-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco ASR play?",
        "answer": "Cisco ASR names several router families; platform identity must precede any assumption about operating system, forwarding architecture or configuration workflow.",
        "explanation": "ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted.",
        "testedConcept": "ASR 1000"
      },
      {
        "questionId": "device-6-QC2",
        "topicId": "device-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "ASR 9000"
      },
      {
        "questionId": "device-6-QC3",
        "topicId": "device-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Forwarding resource"
      }
    ],
    "exams": [
      {
        "questionId": "device-6-Q1",
        "topicId": "device-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which fact invalidates the supplied runbook?",
        "answer": "It is an IOS XE runbook for an IOS XR target.",
        "explanation": "The shared ASR name does not resolve syntax.",
        "testedConcept": "ASR 1000"
      },
      {
        "questionId": "device-6-Q2",
        "topicId": "device-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What belongs in the platform key?",
        "answer": "Exact chassis, operating system and release, plus relevant modules.",
        "explanation": "A model family alone is ambiguous.",
        "testedConcept": "ASR 9000"
      },
      {
        "questionId": "device-6-Q3",
        "topicId": "device-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why review a candidate diff?",
        "answer": "To identify the exact intended change before commit.",
        "explanation": "A syntactically valid configuration may still violate intent.",
        "testedConcept": "Forwarding resource"
      },
      {
        "questionId": "device-6-Q4",
        "topicId": "device-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a route in the control table prove service?",
        "answer": "No; validate forwarding and return policy.",
        "explanation": "Installation and application success are separate.",
        "testedConcept": "ASR 1000"
      },
      {
        "questionId": "device-6-Q5",
        "topicId": "device-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco ASR incident.",
        "answer": "The runbook targets the wrong operating system and cannot establish a valid change or rollback.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-6-Q6",
        "topicId": "device-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-6-Q7",
        "topicId": "device-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare ASR 1000 and ASR 9000 in this design.",
        "answer": "An IOS XE router family. An IOS XR router family.",
        "explanation": "Its procedures cannot be presumed on ASR 9000. Candidate and commit behavior differs from IOS XE CLI.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-6-Q8",
        "topicId": "device-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco ASR?",
        "answer": "Require chassis, OS, release, modules, scale and service objectives in procurement and change records. A vague ASR label is insufficient for either.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-6-Q9",
        "topicId": "device-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Consider packet rate, enabled services and table scale in addition to bandwidth. Different line cards can impose different limits.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-6-Q10",
        "topicId": "device-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a maintenance ticket says only ASR. The supplied inventory shows ASR 9000 with IOS XR; the attached runbook was written for ASR 1000 IOS XE.",
      "fault": "The runbook targets the wrong operating system and cannot establish a valid change or rollback.",
      "restore": "Reject that runbook before writes. Identify the exact XR release and supported transaction/rollback procedure; review the candidate diff and verify the routing service on a disposable matching target.",
      "scope": "ASR 1000 IOS XE and ASR 9000 IOS XR are distinct teaching branches; no family-wide syntax or capacity is asserted."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-7",
    "batch": "25",
    "title": "Cisco ASA",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-7",
    "definition": "Cisco ASA is a stateful firewall platform and software family that combines connection tracking, access policy, address translation and routing.",
    "purpose": "Name the routed or transparent mode, contexts and failover design explicitly. Treat packet-tracer as a diagnostic prediction to corroborate with observed traffic. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Connection state answers one question: Tracked flow context. NAT rule answers another: Address translation selection. Access rule adds Policy for a traffic class. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Connection state: Tracked flow context. Boundary: It does not authorize unrelated new flows.",
      "NAT rule: Address translation selection. Boundary: Translation does not grant access.",
      "Access rule: Policy for a traffic class. Boundary: Its address view depends on platform semantics."
    ],
    "comparison": [
      [
        "Connection state",
        "Tracked flow context",
        "It does not authorize unrelated new flows"
      ],
      [
        "NAT rule",
        "Address translation selection",
        "Translation does not grant access"
      ],
      [
        "Access rule",
        "Policy for a traffic class",
        "Its address view depends on platform semantics"
      ]
    ],
    "mechanism": [
      "Identify ingress, protocol and the original source/destination tuple.",
      "Evaluate the applicable translation, policy and route using the actual ASA release rules.",
      "Create or match state for the permitted conversation.",
      "Observe replies and connection counters, then test an excluded flow."
    ],
    "flow": [
      [
        "Ingress tuple",
        "Identify ingress, protocol and the original source/destination tuple."
      ],
      [
        "Policy and NAT",
        "Evaluate the applicable translation, policy and route using the actual ASA release rules."
      ],
      [
        "Connection state",
        "Create or match state for the permitted conversation."
      ],
      [
        "Reply and deny test",
        "Observe replies and connection counters, then test an excluded flow."
      ]
    ],
    "example": "Authored case: a client should reach one published HTTPS service. A NAT entry exists, but a synthetic packet-tracer evaluation reports a policy drop. Fault: The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule. Required recovery evidence: Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it. Guided; no Cisco execution claimed.",
        "code": "show version\nshow access-list\nshow nat detail\nshow conn\npacket-tracer input inside tcp 192.0.2.10 49152 198.51.100.20 443",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Name the routed or transparent mode, contexts and failover design explicitly. Treat packet-tracer as a diagnostic prediction to corroborate with observed traffic. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Keep default-deny intent, narrow source/destination/service scope and management restrictions. Redact session addresses and credentials before sharing real captures. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Track connection count, setup rate, drops and inspection cost. A low average bandwidth can hide connection exhaustion. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a client should reach one published HTTPS service. A NAT entry exists, but a synthetic packet-tracer evaluation reports a policy drop."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It does not authorize unrelated new flows.",
      "Translation does not grant access.",
      "Its address view depends on platform semantics.",
      "The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-6"
    ],
    "related": [
      "device-8"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco ASA case and write a bounded recovery record. Authored case: a client should reach one published HTTPS service. A NAT entry exists, but a synthetic packet-tracer evaluation reports a policy drop.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Connection state → Tracked flow context",
        "NAT rule → Address translation selection",
        "Access rule → Policy for a traffic class"
      ],
      "steps": [
        "Record applicability and topology. ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a client should reach one published HTTPS service. A NAT entry exists, but a synthetic packet-tracer evaluation reports a policy drop.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Why distinguish routed and transparent mode? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Connection state": "Tracked flow context. It does not authorize unrelated new flows.",
      "NAT rule": "Address translation selection. Translation does not grant access.",
      "Access rule": "Policy for a traffic class. Its address view depends on platform semantics."
    },
    "sources": [
      {
        "title": "ASA packet-tracer diagnostic scope",
        "url": "https://edge.us.cdo.cisco.com/content/docs/c-asa-packet-tracer.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-7-QC1",
        "topicId": "device-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco ASA play?",
        "answer": "Cisco ASA is a stateful firewall platform and software family that combines connection tracking, access policy, address translation and routing.",
        "explanation": "ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it.",
        "testedConcept": "Connection state"
      },
      {
        "questionId": "device-7-QC2",
        "topicId": "device-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "NAT rule"
      },
      {
        "questionId": "device-7-QC3",
        "topicId": "device-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Access rule"
      }
    ],
    "exams": [
      {
        "questionId": "device-7-Q1",
        "topicId": "device-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does successful translation grant access?",
        "answer": "No.",
        "explanation": "Policy and routing still need independent evaluation.",
        "testedConcept": "Connection state"
      },
      {
        "questionId": "device-7-Q2",
        "topicId": "device-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is packet-tracer evidence?",
        "answer": "A synthetic evaluation of the supplied tuple through the device configuration.",
        "explanation": "It is not an observed client transaction.",
        "testedConcept": "NAT rule"
      },
      {
        "questionId": "device-7-Q3",
        "topicId": "device-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test a denied management port?",
        "answer": "To confirm the repair did not broaden access.",
        "explanation": "Positive-only checks miss over-permissive recovery.",
        "testedConcept": "Access rule"
      },
      {
        "questionId": "device-7-Q4",
        "topicId": "device-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why distinguish routed and transparent mode?",
        "answer": "They affect the deployment and forwarding model.",
        "explanation": "Do not transplant a runbook without its mode assumptions.",
        "testedConcept": "Connection state"
      },
      {
        "questionId": "device-7-Q5",
        "topicId": "device-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco ASA incident.",
        "answer": "The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-7-Q6",
        "topicId": "device-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-7-Q7",
        "topicId": "device-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Connection state and NAT rule in this design.",
        "answer": "Tracked flow context. Address translation selection.",
        "explanation": "It does not authorize unrelated new flows. Translation does not grant access.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-7-Q8",
        "topicId": "device-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco ASA?",
        "answer": "Name the routed or transparent mode, contexts and failover design explicitly. Treat packet-tracer as a diagnostic prediction to corroborate with observed traffic.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-7-Q9",
        "topicId": "device-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Track connection count, setup rate, drops and inspection cost. A low average bandwidth can hide connection exhaustion.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-7-Q10",
        "topicId": "device-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a client should reach one published HTTPS service. A NAT entry exists, but a synthetic packet-tracer evaluation reports a policy drop.",
      "fault": "The operator treats the NAT mapping as permission and proposes a broad any-to-any allow rule.",
      "restore": "Inspect the matched policy and ASA address semantics; correct only the intended service rule in the isolated target. Verify HTTPS, the return flow and a denied management-port probe.",
      "scope": "ASA routed-mode IPv4 diagnostic teaching case; confirm ASA software version, NAT semantics and access-list placement before adapting it."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-8",
    "batch": "25",
    "title": "Cisco Firepower",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-8",
    "definition": "Cisco Firepower, now part of the Secure Firewall product lineage, requires distinguishing hardware identity, Threat Defense software and the manager that owns policy.",
    "purpose": "Document whether FMC or FDM owns policy, target membership and a recoverable revision. Use the manager workflow instead of treating a diagnostic CLI as the policy source. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Manager policy answers one question: Configured desired rules. Deployment answers another: Applying a policy revision to a target. Connection event adds Observation of a classified flow. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Manager policy: Configured desired rules. Boundary: Saved edits may not be deployed.",
      "Deployment: Applying a policy revision to a target. Boundary: Job completion still needs traffic verification.",
      "Connection event: Observation of a classified flow. Boundary: Event settings and inspection path affect visibility."
    ],
    "comparison": [
      [
        "Manager policy",
        "Configured desired rules",
        "Saved edits may not be deployed"
      ],
      [
        "Deployment",
        "Applying a policy revision to a target",
        "Job completion still needs traffic verification"
      ],
      [
        "Connection event",
        "Observation of a classified flow",
        "Event settings and inspection path affect visibility"
      ]
    ],
    "mechanism": [
      "Identify the device software and authoritative manager.",
      "Review access policy, NAT and inspection scope as separate decisions.",
      "Deploy the reviewed revision to the intended managed target.",
      "Correlate deployment outcome with a fresh connection and rule/event evidence."
    ],
    "flow": [
      [
        "Policy owner",
        "Identify the device software and authoritative manager."
      ],
      [
        "Reviewed revision",
        "Review access policy, NAT and inspection scope as separate decisions."
      ],
      [
        "Target deployment",
        "Deploy the reviewed revision to the intended managed target."
      ],
      [
        "Fresh connection",
        "Correlate deployment outcome with a fresh connection and rule/event evidence."
      ]
    ],
    "example": "Authored case: the manager editor contains an approved HTTPS rule. The target still uses the previous deployed revision and a new client flow is denied. Fault: The operator mistakes a saved manager edit for installed device policy. Required recovery evidence: Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated. Guided; no Cisco execution claimed.",
        "code": "show version\nshow managers",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator mistakes a saved manager edit for installed device policy."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Document whether FMC or FDM owns policy, target membership and a recoverable revision. Use the manager workflow instead of treating a diagnostic CLI as the policy source. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Limit deployment privileges and audit changes. Do not bypass inspection merely to make a connectivity test pass. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Evaluate inspection policy and encrypted-traffic treatment alongside throughput. Deployment duration and steady-state forwarding are different measurements. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: the manager editor contains an approved HTTPS rule. The target still uses the previous deployed revision and a new client flow is denied."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator mistakes a saved manager edit for installed device policy. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Saved edits may not be deployed.",
      "Job completion still needs traffic verification.",
      "Event settings and inspection path affect visibility.",
      "The operator mistakes a saved manager edit for installed device policy.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-7"
    ],
    "related": [
      "device-9"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Firepower case and write a bounded recovery record. Authored case: the manager editor contains an approved HTTPS rule. The target still uses the previous deployed revision and a new client flow is denied.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Manager policy → Configured desired rules",
        "Deployment → Applying a policy revision to a target",
        "Connection event → Observation of a classified flow"
      ],
      "steps": [
        "Record applicability and topology. Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: the manager editor contains an approved HTTPS rule. The target still uses the previous deployed revision and a new client flow is denied.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator mistakes a saved manager edit for installed device policy.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator mistakes a saved manager edit for installed device policy. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Does Firepower hardware imply Threat Defense is running? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Manager policy": "Configured desired rules. Saved edits may not be deployed.",
      "Deployment": "Applying a policy revision to a target. Job completion still needs traffic verification.",
      "Connection event": "Observation of a classified flow. Event settings and inspection path affect visibility."
    },
    "sources": [
      {
        "title": "Threat Defense 7.0 access control",
        "url": "https://secure.cisco.com/secure-firewall/v7.0/docs/access-control-policy",
        "checked": "2026-10-09"
      },
      {
        "title": "FTD NAT configuration and verification",
        "url": "https://www.cisco.com/c/en/us/support/docs/security/firepower-management-center/212702-configure-and-verify-nat-on-ftd.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-8-QC1",
        "topicId": "device-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Firepower play?",
        "answer": "Cisco Firepower, now part of the Secure Firewall product lineage, requires distinguishing hardware identity, Threat Defense software and the manager that owns policy.",
        "explanation": "Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated.",
        "testedConcept": "Manager policy"
      },
      {
        "questionId": "device-8-QC2",
        "topicId": "device-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Deployment"
      },
      {
        "questionId": "device-8-QC3",
        "topicId": "device-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Connection event"
      }
    ],
    "exams": [
      {
        "questionId": "device-8-Q1",
        "topicId": "device-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why does the saved rule not fix the case?",
        "answer": "The target still runs the previous deployed revision.",
        "explanation": "Desired and installed state differ.",
        "testedConcept": "Manager policy"
      },
      {
        "questionId": "device-8-Q2",
        "topicId": "device-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which identity belongs in deployment evidence?",
        "answer": "Manager, target and exact policy revision.",
        "explanation": "A green job for another target is irrelevant.",
        "testedConcept": "Deployment"
      },
      {
        "questionId": "device-8-Q3",
        "topicId": "device-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why create a fresh flow?",
        "answer": "Existing connection handling can differ from new-flow policy evaluation.",
        "explanation": "Record the test time and tuple.",
        "testedConcept": "Connection event"
      },
      {
        "questionId": "device-8-Q4",
        "topicId": "device-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does Firepower hardware imply Threat Defense is running?",
        "answer": "No; identify the actual image and manager.",
        "explanation": "Hardware branding is not a policy contract.",
        "testedConcept": "Manager policy"
      },
      {
        "questionId": "device-8-Q5",
        "topicId": "device-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Firepower incident.",
        "answer": "The operator mistakes a saved manager edit for installed device policy.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-8-Q6",
        "topicId": "device-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-8-Q7",
        "topicId": "device-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Manager policy and Deployment in this design.",
        "answer": "Configured desired rules. Applying a policy revision to a target.",
        "explanation": "Saved edits may not be deployed. Job completion still needs traffic verification.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-8-Q8",
        "topicId": "device-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Firepower?",
        "answer": "Document whether FMC or FDM owns policy, target membership and a recoverable revision. Use the manager workflow instead of treating a diagnostic CLI as the policy source.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-8-Q9",
        "topicId": "device-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Evaluate inspection policy and encrypted-traffic treatment alongside throughput. Deployment duration and steady-state forwarding are different measurements.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-8-Q10",
        "topicId": "device-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: the manager editor contains an approved HTTPS rule. The target still uses the previous deployed revision and a new client flow is denied.",
      "fault": "The operator mistakes a saved manager edit for installed device policy.",
      "restore": "Review and deploy the intended revision to the owned target, then create a fresh test flow and inspect its matched rule. Confirm an excluded flow remains denied and preserve the previous revision for rollback.",
      "scope": "Threat Defense / management-center access-control teaching case; ASA images, FDM and FMC workflows must not be conflated."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-9",
    "batch": "25",
    "title": "Cisco Aironet",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-9",
    "definition": "Cisco Aironet covers legacy access-point families whose standalone or controller-managed operating mode determines where configuration and troubleshooting belong.",
    "purpose": "Use legacy equipment for bounded learning with a migration plan. Do not imply every autonomous AP can be converted or every old AP can join a modern controller. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Autonomous mode answers one question: AP-local configuration ownership. Lightweight mode answers another: Controller-managed operation. CAPWAP adds AP-controller control and data tunneling. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Autonomous mode: AP-local configuration ownership. Boundary: It is not a controller policy model.",
      "Lightweight mode: Controller-managed operation. Boundary: The AP must successfully join a compatible controller.",
      "CAPWAP: AP-controller control and data tunneling. Boundary: A reachable controller IP does not prove join."
    ],
    "comparison": [
      [
        "Autonomous mode",
        "AP-local configuration ownership",
        "It is not a controller policy model"
      ],
      [
        "Lightweight mode",
        "Controller-managed operation",
        "The AP must successfully join a compatible controller"
      ],
      [
        "CAPWAP",
        "AP-controller control and data tunneling",
        "A reachable controller IP does not prove join"
      ]
    ],
    "mechanism": [
      "Inventory the AP model, image, regulatory domain and power state.",
      "Determine whether it is autonomous or controller-managed.",
      "For managed operation, follow address acquisition, discovery and secure join.",
      "Validate radio service, client association, authentication and data access separately."
    ],
    "flow": [
      [
        "AP inventory",
        "Inventory the AP model, image, regulatory domain and power state."
      ],
      [
        "Operating mode",
        "Determine whether it is autonomous or controller-managed."
      ],
      [
        "Controller join",
        "For managed operation, follow address acquisition, discovery and secure join."
      ],
      [
        "Client service",
        "Validate radio service, client association, authentication and data access separately."
      ]
    ],
    "example": "Authored case: a lightweight Aironet AP has an IP address and can reach the controller subnet, but the compatibility matrix does not include the proposed AP/release pairing. Fault: The operator repeatedly changes DHCP despite an unsupported proposed pairing. Required recovery evidence: Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal. Guided; no Cisco execution claimed.",
        "code": "show version",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator repeatedly changes DHCP despite an unsupported proposed pairing."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Use legacy equipment for bounded learning with a migration plan. Do not imply every autonomous AP can be converted or every old AP can join a modern controller. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Preserve certificate validation and regulatory settings; isolate unsupported lab equipment from sensitive networks. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Check power mode, channel use, retries and client capabilities. AP association counts alone do not describe usable airtime. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a lightweight Aironet AP has an IP address and can reach the controller subnet, but the compatibility matrix does not include the proposed AP/release pairing."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator repeatedly changes DHCP despite an unsupported proposed pairing. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It is not a controller policy model.",
      "The AP must successfully join a compatible controller.",
      "A reachable controller IP does not prove join.",
      "The operator repeatedly changes DHCP despite an unsupported proposed pairing.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-8"
    ],
    "related": [
      "device-10"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Aironet case and write a bounded recovery record. Authored case: a lightweight Aironet AP has an IP address and can reach the controller subnet, but the compatibility matrix does not include the proposed AP/release pairing.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Autonomous mode → AP-local configuration ownership",
        "Lightweight mode → Controller-managed operation",
        "CAPWAP → AP-controller control and data tunneling"
      ],
      "steps": [
        "Record applicability and topology. Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a lightweight Aironet AP has an IP address and can reach the controller subnet, but the compatibility matrix does not include the proposed AP/release pairing.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator repeatedly changes DHCP despite an unsupported proposed pairing.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator repeatedly changes DHCP despite an unsupported proposed pairing. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Can all Aironet APs be converted? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Autonomous mode": "AP-local configuration ownership. It is not a controller policy model.",
      "Lightweight mode": "Controller-managed operation. The AP must successfully join a compatible controller.",
      "CAPWAP": "AP-controller control and data tunneling. A reachable controller IP does not prove join."
    },
    "sources": [
      {
        "title": "Historical autonomous/lightweight conversion scope",
        "url": "https://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/17-3/config-guide/b_wl_17_3_cg/m_ap_convert-autonomousaps_cg.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Wireless software compatibility matrix",
        "url": "https://www.cisco.com/c/en/us/td/docs/wireless/compatibility/matrix/compatibility-matrix.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-9-QC1",
        "topicId": "device-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Aironet play?",
        "answer": "Cisco Aironet covers legacy access-point families whose standalone or controller-managed operating mode determines where configuration and troubleshooting belong.",
        "explanation": "Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal.",
        "testedConcept": "Autonomous mode"
      },
      {
        "questionId": "device-9-QC2",
        "topicId": "device-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Lightweight mode"
      },
      {
        "questionId": "device-9-QC3",
        "topicId": "device-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "CAPWAP"
      }
    ],
    "exams": [
      {
        "questionId": "device-9-Q1",
        "topicId": "device-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What determines configuration ownership?",
        "answer": "The AP operating mode.",
        "explanation": "An autonomous runbook does not configure controller policy.",
        "testedConcept": "Autonomous mode"
      },
      {
        "questionId": "device-9-Q2",
        "topicId": "device-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an AP IP address prove wireless service?",
        "answer": "No.",
        "explanation": "Join, radio, authentication and client addressing remain separate.",
        "testedConcept": "Lightweight mode"
      },
      {
        "questionId": "device-9-Q3",
        "topicId": "device-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should precede another DHCP change?",
        "answer": "Compatibility evidence for the exact AP/controller release.",
        "explanation": "A dependency mismatch cannot be repaired with discovery options.",
        "testedConcept": "CAPWAP"
      },
      {
        "questionId": "device-9-Q4",
        "topicId": "device-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can all Aironet APs be converted?",
        "answer": "No; check model and image support.",
        "explanation": "A historical conversion guide is not a blanket guarantee.",
        "testedConcept": "Autonomous mode"
      },
      {
        "questionId": "device-9-Q5",
        "topicId": "device-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Aironet incident.",
        "answer": "The operator repeatedly changes DHCP despite an unsupported proposed pairing.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-9-Q6",
        "topicId": "device-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-9-Q7",
        "topicId": "device-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Autonomous mode and Lightweight mode in this design.",
        "answer": "AP-local configuration ownership. Controller-managed operation.",
        "explanation": "It is not a controller policy model. The AP must successfully join a compatible controller.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-9-Q8",
        "topicId": "device-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Aironet?",
        "answer": "Use legacy equipment for bounded learning with a migration plan. Do not imply every autonomous AP can be converted or every old AP can join a modern controller.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-9-Q9",
        "topicId": "device-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Check power mode, channel use, retries and client capabilities. AP association counts alone do not describe usable airtime.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-9-Q10",
        "topicId": "device-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a lightweight Aironet AP has an IP address and can reach the controller subnet, but the compatibility matrix does not include the proposed AP/release pairing.",
      "fault": "The operator repeatedly changes DHCP despite an unsupported proposed pairing.",
      "restore": "Resolve the supported AP/controller combination before configuration. Keep the original approved controller or a compatible lab image, then verify join, client authentication and client DHCP separately.",
      "scope": "Historical Aironet mode-conversion reference and wireless compatibility matrix; conversion availability and controller support are model-specific, not universal."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-10",
    "batch": "25",
    "title": "Cisco Catalyst Wireless",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-10",
    "definition": "Cisco Catalyst Wireless access points provide radio access within a supported management architecture; wired connectivity, power, RF policy and client security form separate dependencies.",
    "purpose": "Keep AP hardware identity separate from the controller policy model. Plan a small AP canary and record its original tag assignments. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. RF tag answers one question: Assignment of RF profiles. Policy tag answers another: Mapping between WLAN and policy profiles. Site tag adds Site and AP-join-related settings. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "RF tag: Assignment of RF profiles. Boundary: It does not map client VLAN policy.",
      "Policy tag: Mapping between WLAN and policy profiles. Boundary: An SSID name alone is insufficient.",
      "Site tag: Site and AP-join-related settings. Boundary: Its role differs from the RF policy."
    ],
    "comparison": [
      [
        "RF tag",
        "Assignment of RF profiles",
        "It does not map client VLAN policy"
      ],
      [
        "Policy tag",
        "Mapping between WLAN and policy profiles",
        "An SSID name alone is insufficient"
      ],
      [
        "Site tag",
        "Site and AP-join-related settings",
        "Its role differs from the RF policy"
      ]
    ],
    "mechanism": [
      "Confirm AP power, software compatibility and join state.",
      "Resolve the AP policy, site and RF tag assignments.",
      "Advertise the intended WLAN with its client policy.",
      "Trace a client through authentication, address acquisition and application access."
    ],
    "flow": [
      [
        "Power and join",
        "Confirm AP power, software compatibility and join state."
      ],
      [
        "AP tags",
        "Resolve the AP policy, site and RF tag assignments."
      ],
      [
        "WLAN policy",
        "Advertise the intended WLAN with its client policy."
      ],
      [
        "Client journey",
        "Trace a client through authentication, address acquisition and application access."
      ]
    ],
    "example": "Authored case: an AP joins successfully and the intended WLAN profile exists, but the AP policy tag maps only a different WLAN. Fault: The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag. Required recovery evidence: Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides. Guided; no Cisco execution claimed.",
        "code": "show ap summary\nshow wireless tag policy summary\nshow wlan summary",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Keep AP hardware identity separate from the controller policy model. Plan a small AP canary and record its original tag assignments. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Validate client authentication and segment boundaries after changing tags. Correct SSID visibility alone is not acceptance. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Use airtime, retries, channel width and client mix to interpret performance; a newer AP cannot force a client to use unsupported capabilities. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: an AP joins successfully and the intended WLAN profile exists, but the AP policy tag maps only a different WLAN."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It does not map client VLAN policy.",
      "An SSID name alone is insufficient.",
      "Its role differs from the RF policy.",
      "The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-9"
    ],
    "related": [
      "device-11"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Catalyst Wireless case and write a bounded recovery record. Authored case: an AP joins successfully and the intended WLAN profile exists, but the AP policy tag maps only a different WLAN.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "RF tag → Assignment of RF profiles",
        "Policy tag → Mapping between WLAN and policy profiles",
        "Site tag → Site and AP-join-related settings"
      ],
      "steps": [
        "Record applicability and topology. Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: an AP joins successfully and the intended WLAN profile exists, but the AP policy tag maps only a different WLAN.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Why inspect client VLAN after recovery? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "RF tag": "Assignment of RF profiles. It does not map client VLAN policy.",
      "Policy tag": "Mapping between WLAN and policy profiles. An SSID name alone is insufficient.",
      "Site tag": "Site and AP-join-related settings. Its role differs from the RF policy."
    },
    "sources": [
      {
        "title": "Catalyst 9800 configuration model",
        "url": "https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/213911-understand-catalyst-9800-wireless-contro.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Wireless software compatibility matrix",
        "url": "https://www.cisco.com/c/en/us/td/docs/wireless/compatibility/matrix/compatibility-matrix.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-10-QC1",
        "topicId": "device-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Catalyst Wireless play?",
        "answer": "Cisco Catalyst Wireless access points provide radio access within a supported management architecture; wired connectivity, power, RF policy and client security form separate dependencies.",
        "explanation": "Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides.",
        "testedConcept": "RF tag"
      },
      {
        "questionId": "device-10-QC2",
        "topicId": "device-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Policy tag"
      },
      {
        "questionId": "device-10-QC3",
        "topicId": "device-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Site tag"
      }
    ],
    "exams": [
      {
        "questionId": "device-10-Q1",
        "topicId": "device-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which tag is relevant to the missing WLAN mapping?",
        "answer": "The policy tag.",
        "explanation": "RF tuning does not create that mapping.",
        "testedConcept": "RF tag"
      },
      {
        "questionId": "device-10-Q2",
        "topicId": "device-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does successful AP join prove the SSID is served?",
        "answer": "No.",
        "explanation": "Join and WLAN policy are separate stages.",
        "testedConcept": "Policy tag"
      },
      {
        "questionId": "device-10-Q3",
        "topicId": "device-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What prevents a broad accidental rollout?",
        "answer": "Limit the change to an identified AP canary and review tag reuse.",
        "explanation": "A shared tag can affect many APs.",
        "testedConcept": "Site tag"
      },
      {
        "questionId": "device-10-Q4",
        "topicId": "device-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect client VLAN after recovery?",
        "answer": "The right SSID can still map to the wrong policy.",
        "explanation": "Identity and segmentation must agree.",
        "testedConcept": "RF tag"
      },
      {
        "questionId": "device-10-Q5",
        "topicId": "device-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Catalyst Wireless incident.",
        "answer": "The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-10-Q6",
        "topicId": "device-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-10-Q7",
        "topicId": "device-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare RF tag and Policy tag in this design.",
        "answer": "Assignment of RF profiles. Mapping between WLAN and policy profiles.",
        "explanation": "It does not map client VLAN policy. An SSID name alone is insufficient.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-10-Q8",
        "topicId": "device-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Catalyst Wireless?",
        "answer": "Keep AP hardware identity separate from the controller policy model. Plan a small AP canary and record its original tag assignments.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-10-Q9",
        "topicId": "device-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Use airtime, retries, channel width and client mix to interpret performance; a newer AP cannot force a client to use unsupported capabilities.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-10-Q10",
        "topicId": "device-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: an AP joins successfully and the intended WLAN profile exists, but the AP policy tag maps only a different WLAN.",
      "fault": "The intended SSID is missing on this AP because the relevant WLAN-to-policy mapping is absent from its assigned tag.",
      "restore": "Correct only the owned AP policy-tag mapping after recording the original assignment. Verify SSID visibility, authentication, expected client VLAN and absence of unauthorized WLANs.",
      "scope": "Catalyst APs with Catalyst 9800 tag/profile teaching scope; exact AP support, bands and power requirements come from the current compatibility and hardware guides."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-11",
    "batch": "25",
    "title": "Cisco Wireless LAN Controller",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-11",
    "definition": "A Cisco wireless LAN controller manages supported APs and client policy; AireOS and Catalyst 9800 IOS XE controllers have different configuration models.",
    "purpose": "Write the switching location into the topology before troubleshooting. Controller redundancy and AP support require matching release documentation, not only a shared vendor. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. WLAN profile answers one question: SSID and wireless security definition. Policy profile answers another: Client networking and policy settings. Switching location adds Where client traffic enters the wired VLAN. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "WLAN profile: SSID and wireless security definition. Boundary: It is separate from forwarding policy.",
      "Policy profile: Client networking and policy settings. Boundary: A correct SSID can map to an incorrect VLAN.",
      "Switching location: Where client traffic enters the wired VLAN. Boundary: Central and local switching change the path."
    ],
    "comparison": [
      [
        "WLAN profile",
        "SSID and wireless security definition",
        "It is separate from forwarding policy"
      ],
      [
        "Policy profile",
        "Client networking and policy settings",
        "A correct SSID can map to an incorrect VLAN"
      ],
      [
        "Switching location",
        "Where client traffic enters the wired VLAN",
        "Central and local switching change the path"
      ]
    ],
    "mechanism": [
      "Resolve the WLAN and its policy mapping for the specific AP.",
      "Authenticate the client using the configured security method.",
      "Bridge client traffic at the declared central or local switching location.",
      "Verify the VLAN, DHCP and return path at that location."
    ],
    "flow": [
      [
        "WLAN mapping",
        "Resolve the WLAN and its policy mapping for the specific AP."
      ],
      [
        "Authentication",
        "Authenticate the client using the configured security method."
      ],
      [
        "Switching location",
        "Bridge client traffic at the declared central or local switching location."
      ],
      [
        "Client addressing",
        "Verify the VLAN, DHCP and return path at that location."
      ]
    ],
    "example": "Authored case: a centrally switched client authenticates but never obtains an address. Its policy selects VLAN 40, while the controller uplink permits only VLAN 10. Fault: Client VLAN 40 is absent from the wired path at the declared central switching boundary. Required recovery evidence: Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command. Guided; no Cisco execution claimed.",
        "code": "show version\nshow ap summary\nshow wlan summary\nshow wireless client summary",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is Client VLAN 40 is absent from the wired path at the declared central switching boundary."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Write the switching location into the topology before troubleshooting. Controller redundancy and AP support require matching release documentation, not only a shared vendor. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Protect controller management, AAA secrets and client separation. Use sanitized client identifiers in evidence. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "For central switching, examine controller and uplink load; for local switching, inspect branch resources. Neither removes RF airtime constraints. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a centrally switched client authenticates but never obtains an address. Its policy selects VLAN 40, while the controller uplink permits only VLAN 10."
      ],
      [
        "First hypothesis and discriminating evidence",
        "Client VLAN 40 is absent from the wired path at the declared central switching boundary. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It is separate from forwarding policy.",
      "A correct SSID can map to an incorrect VLAN.",
      "Central and local switching change the path.",
      "Client VLAN 40 is absent from the wired path at the declared central switching boundary.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-10"
    ],
    "related": [
      "device-12"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Wireless LAN Controller case and write a bounded recovery record. Authored case: a centrally switched client authenticates but never obtains an address. Its policy selects VLAN 40, while the controller uplink permits only VLAN 10.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "WLAN profile → SSID and wireless security definition",
        "Policy profile → Client networking and policy settings",
        "Switching location → Where client traffic enters the wired VLAN"
      ],
      "steps": [
        "Record applicability and topology. Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a centrally switched client authenticates but never obtains an address. Its policy selects VLAN 40, while the controller uplink permits only VLAN 10.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. Client VLAN 40 is absent from the wired path at the declared central switching boundary.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "Client VLAN 40 is absent from the wired path at the declared central switching boundary. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "How does local switching change the investigation? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "WLAN profile": "SSID and wireless security definition. It is separate from forwarding policy.",
      "Policy profile": "Client networking and policy settings. A correct SSID can map to an incorrect VLAN.",
      "Switching location": "Where client traffic enters the wired VLAN. Central and local switching change the path."
    },
    "sources": [
      {
        "title": "Catalyst 9800 configuration model",
        "url": "https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/213911-understand-catalyst-9800-wireless-contro.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Historical AireOS and lightweight AP setup",
        "url": "https://www.cisco.com/c/en/us/support/docs/wireless/4400-series-wireless-lan-controllers/69719-wlc-lwap-config.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-11-QC1",
        "topicId": "device-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Wireless LAN Controller play?",
        "answer": "A Cisco wireless LAN controller manages supported APs and client policy; AireOS and Catalyst 9800 IOS XE controllers have different configuration models.",
        "explanation": "Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command.",
        "testedConcept": "WLAN profile"
      },
      {
        "questionId": "device-11-QC2",
        "topicId": "device-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Policy profile"
      },
      {
        "questionId": "device-11-QC3",
        "topicId": "device-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Switching location"
      }
    ],
    "exams": [
      {
        "questionId": "device-11-Q1",
        "topicId": "device-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Where is the failed VLAN boundary in this case?",
        "answer": "At the centrally switched controller wired path.",
        "explanation": "The AP management VLAN can remain healthy.",
        "testedConcept": "WLAN profile"
      },
      {
        "questionId": "device-11-Q2",
        "topicId": "device-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does authentication success prove DHCP?",
        "answer": "No.",
        "explanation": "Authorization and addressing are separate stages.",
        "testedConcept": "Policy profile"
      },
      {
        "questionId": "device-11-Q3",
        "topicId": "device-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why specify AireOS or IOS XE?",
        "answer": "Their configuration models and commands differ.",
        "explanation": "A WLC label is not sufficient.",
        "testedConcept": "Switching location"
      },
      {
        "questionId": "device-11-Q4",
        "topicId": "device-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How does local switching change the investigation?",
        "answer": "Client VLAN traffic exits at the AP-side wired location.",
        "explanation": "Move the observation point with the data path.",
        "testedConcept": "WLAN profile"
      },
      {
        "questionId": "device-11-Q5",
        "topicId": "device-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Wireless LAN Controller incident.",
        "answer": "Client VLAN 40 is absent from the wired path at the declared central switching boundary.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-11-Q6",
        "topicId": "device-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-11-Q7",
        "topicId": "device-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare WLAN profile and Policy profile in this design.",
        "answer": "SSID and wireless security definition. Client networking and policy settings.",
        "explanation": "It is separate from forwarding policy. A correct SSID can map to an incorrect VLAN.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-11-Q8",
        "topicId": "device-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Wireless LAN Controller?",
        "answer": "Write the switching location into the topology before troubleshooting. Controller redundancy and AP support require matching release documentation, not only a shared vendor.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-11-Q9",
        "topicId": "device-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "For central switching, examine controller and uplink load; for local switching, inspect branch resources. Neither removes RF airtime constraints.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-11-Q10",
        "topicId": "device-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a centrally switched client authenticates but never obtains an address. Its policy selects VLAN 40, while the controller uplink permits only VLAN 10.",
      "fault": "Client VLAN 40 is absent from the wired path at the declared central switching boundary.",
      "restore": "Restore the approved VLAN 40 path on the isolated controller uplink. Verify DHCP exchange, the client subnet, gateway access and policy isolation; do not edit the AP uplink as if this were local switching.",
      "scope": "Catalyst 9800 is the worked IOS XE example; AireOS terminology is compared conceptually, not translated command-for-command."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-12",
    "batch": "25",
    "title": "Cisco Nexus 3000",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-12",
    "definition": "Cisco Nexus 3000 is a data-center Ethernet switch family used for low-latency and leaf connectivity, with port capabilities tied to model and NX-OS release.",
    "purpose": "Specify exact ports and optical compatibility in a rack plan. Never promise a breakout mode from the Nexus 3000 name alone. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. Breakout answers one question: Division of a supported physical port into lanes. Routed port answers another: Interface with Layer 3 forwarding. Port channel adds Logical bundle of compatible links. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "Breakout: Division of a supported physical port into lanes. Boundary: A matching connector does not prove support.",
      "Routed port: Interface with Layer 3 forwarding. Boundary: It is distinct from a switchport.",
      "Port channel: Logical bundle of compatible links. Boundary: One member can limit one flow."
    ],
    "comparison": [
      [
        "Breakout",
        "Division of a supported physical port into lanes",
        "A matching connector does not prove support"
      ],
      [
        "Routed port",
        "Interface with Layer 3 forwarding",
        "It is distinct from a switchport"
      ],
      [
        "Port channel",
        "Logical bundle of compatible links",
        "One member can limit one flow"
      ]
    ],
    "mechanism": [
      "Verify exact port, transceiver, cable and breakout capability.",
      "Match lane speed and logical interface mapping at both ends.",
      "Select Layer 2 or Layer 3 intent and inspect the resulting interface state.",
      "Verify neighbor resolution, routing or VLAN forwarding and the return flow."
    ],
    "flow": [
      [
        "Port capability",
        "Verify exact port, transceiver, cable and breakout capability."
      ],
      [
        "Lane mapping",
        "Match lane speed and logical interface mapping at both ends."
      ],
      [
        "L2 or L3 intent",
        "Select Layer 2 or Layer 3 intent and inspect the resulting interface state."
      ],
      [
        "Traffic validation",
        "Verify neighbor resolution, routing or VLAN forwarding and the return flow."
      ]
    ],
    "example": "Authored case: a server expects four breakout lanes, but the supplied switch plan uses the port as one unbroken interface. Fault: The physical connector is present, but the endpoint lane mapping and switch port mode disagree. Required recovery evidence: Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform. Guided; no Cisco execution claimed.",
        "code": "show version\nshow interface status\nshow interface capabilities\nshow port-channel summary",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The physical connector is present, but the endpoint lane mapping and switch port mode disagree."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Specify exact ports and optical compatibility in a rack plan. Never promise a breakout mode from the Nexus 3000 name alone. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Keep management in its intended VRF and restrict control-plane access. A port-mode repair must preserve the original tenant boundary. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Measure queue drops and flow distribution; low forwarding latency does not eliminate oversubscription or congestion. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a server expects four breakout lanes, but the supplied switch plan uses the port as one unbroken interface."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The physical connector is present, but the endpoint lane mapping and switch port mode disagree. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "A matching connector does not prove support.",
      "It is distinct from a switchport.",
      "One member can limit one flow.",
      "The physical connector is present, but the endpoint lane mapping and switch port mode disagree.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-11"
    ],
    "related": [
      "device-13"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Nexus 3000 case and write a bounded recovery record. Authored case: a server expects four breakout lanes, but the supplied switch plan uses the port as one unbroken interface.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "Breakout → Division of a supported physical port into lanes",
        "Routed port → Interface with Layer 3 forwarding",
        "Port channel → Logical bundle of compatible links"
      ],
      "steps": [
        "Record applicability and topology. Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a server expects four breakout lanes, but the supplied switch plan uses the port as one unbroken interface.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The physical connector is present, but the endpoint lane mapping and switch port mode disagree.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The physical connector is present, but the endpoint lane mapping and switch port mode disagree. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "What must be retained before a port-mode change? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "Breakout": "Division of a supported physical port into lanes. A matching connector does not prove support.",
      "Routed port": "Interface with Layer 3 forwarding. It is distinct from a switchport.",
      "Port channel": "Logical bundle of compatible links. One member can limit one flow."
    },
    "sources": [
      {
        "title": "Nexus 3000 NX-OS 7.x L2 interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/interfaces/7_x/b_Cisco_Nexus_3000_Series_NX-OS_Interfaces_Configuration_Guide_7x/b_Cisco_Nexus_3000_Series_NX-OS_Interfaces_Configuration_Guide_7x_chapter_01.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 3000 NX-OS 9.3(x) L3 interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/interfaces/93x/configuration/guide/b-cisco-nexus-3000-nx-os-interfaces-configuration-guide-93x/b-cisco-nexus-3000-nx-os-interfaces-configuration-guide-93x_chapter_011.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-12-QC1",
        "topicId": "device-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Nexus 3000 play?",
        "answer": "Cisco Nexus 3000 is a data-center Ethernet switch family used for low-latency and leaf connectivity, with port capabilities tied to model and NX-OS release.",
        "explanation": "Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform.",
        "testedConcept": "Breakout"
      },
      {
        "questionId": "device-12-QC2",
        "topicId": "device-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Routed port"
      },
      {
        "questionId": "device-12-QC3",
        "topicId": "device-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Port channel"
      }
    ],
    "exams": [
      {
        "questionId": "device-12-Q1",
        "topicId": "device-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What mismatch explains the authored case?",
        "answer": "One aggregate port mode versus four expected lanes.",
        "explanation": "A connector match is insufficient.",
        "testedConcept": "Breakout"
      },
      {
        "questionId": "device-12-Q2",
        "topicId": "device-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why inspect capabilities before changing speed?",
        "answer": "Not all ports support the intended breakout.",
        "explanation": "Unsupported syntax is not a cabling diagnosis.",
        "testedConcept": "Routed port"
      },
      {
        "questionId": "device-12-Q3",
        "topicId": "device-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can four bundle members quadruple one flow?",
        "answer": "Not necessarily; hashing usually selects a member per flow.",
        "explanation": "Aggregate and single-flow capacity differ.",
        "testedConcept": "Port channel"
      },
      {
        "questionId": "device-12-Q4",
        "topicId": "device-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must be retained before a port-mode change?",
        "answer": "Original configuration, affected interface map and a supported restoration procedure.",
        "explanation": "Mode changes can disrupt adjacent services.",
        "testedConcept": "Breakout"
      },
      {
        "questionId": "device-12-Q5",
        "topicId": "device-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Nexus 3000 incident.",
        "answer": "The physical connector is present, but the endpoint lane mapping and switch port mode disagree.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-12-Q6",
        "topicId": "device-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-12-Q7",
        "topicId": "device-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare Breakout and Routed port in this design.",
        "answer": "Division of a supported physical port into lanes. Interface with Layer 3 forwarding.",
        "explanation": "A matching connector does not prove support. It is distinct from a switchport.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-12-Q8",
        "topicId": "device-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Nexus 3000?",
        "answer": "Specify exact ports and optical compatibility in a rack plan. Never promise a breakout mode from the Nexus 3000 name alone.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-12-Q9",
        "topicId": "device-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Measure queue drops and flow distribution; low forwarding latency does not eliminate oversubscription or congestion.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-12-Q10",
        "topicId": "device-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a server expects four breakout lanes, but the supplied switch plan uses the port as one unbroken interface.",
      "fault": "The physical connector is present, but the endpoint lane mapping and switch port mode disagree.",
      "restore": "Resolve a supported port/media/mode combination in the installed guide; schedule any disruptive mode conversion. Restore the documented baseline if lanes do not appear, then verify each intended lane and traffic path.",
      "scope": "Nexus 3000 NX-OS 7.x Layer 2 and 9.3(x) Layer 3 interface teaching references; breakout is specific to port and platform."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-13",
    "batch": "25",
    "title": "Cisco Nexus 5000",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-13",
    "definition": "Cisco Nexus 5000 is a data-center switching family associated with Ethernet access and, on supported configurations, Fibre Channel over Ethernet and fabric-extender designs.",
    "purpose": "Document Ethernet and storage dependencies separately even when they share a cable. Do not attach ordinary switch topology to a FEX as though it were an independent leaf. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. FEX answers one question: A fabric extender controlled by a parent. vFC answers another: Virtual Fibre Channel interface. NPIV adds Multiple virtual N_Port identities on a physical link. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "FEX: A fabric extender controlled by a parent. Boundary: It is not an independent management switch.",
      "vFC: Virtual Fibre Channel interface. Boundary: Ethernet link-up does not establish FC login.",
      "NPIV: Multiple virtual N_Port identities on a physical link. Boundary: It differs from NPV edge operation."
    ],
    "comparison": [
      [
        "FEX",
        "A fabric extender controlled by a parent",
        "It is not an independent management switch"
      ],
      [
        "vFC",
        "Virtual Fibre Channel interface",
        "Ethernet link-up does not establish FC login"
      ],
      [
        "NPIV",
        "Multiple virtual N_Port identities on a physical link",
        "It differs from NPV edge operation"
      ]
    ],
    "mechanism": [
      "Establish the supported Ethernet or converged physical attachment.",
      "Map FCoE VLAN and VSAN context and the intended virtual FC binding.",
      "Observe fabric login and the correct initiator/target identities.",
      "Apply active zoning and storage masking, then verify host I/O."
    ],
    "flow": [
      [
        "Converged link",
        "Establish the supported Ethernet or converged physical attachment."
      ],
      [
        "vFC and VSAN",
        "Map FCoE VLAN and VSAN context and the intended virtual FC binding."
      ],
      [
        "Fabric login",
        "Observe fabric login and the correct initiator/target identities."
      ],
      [
        "Zoning and I/O",
        "Apply active zoning and storage masking, then verify host I/O."
      ]
    ],
    "example": "Authored case: Ethernet traffic is healthy on the converged link, but the intended virtual FC attachment has no fabric login after a binding edit. Fault: The changed vFC binding no longer matches the intended Ethernet attachment. Required recovery evidence: Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ. Guided; no Cisco execution claimed.",
        "code": "show version\nshow interface brief\nshow flogi database\nshow fex",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The changed vFC binding no longer matches the intended Ethernet attachment."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Document Ethernet and storage dependencies separately even when they share a cable. Do not attach ordinary switch topology to a FEX as though it were an independent leaf. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Preserve initiator isolation and storage masking; restrict administrative changes that cross Ethernet and FC domains. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Inspect the lossless transport design and congestion behavior for the intended storage class. Ethernet ping cannot measure storage latency or integrity. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: Ethernet traffic is healthy on the converged link, but the intended virtual FC attachment has no fabric login after a binding edit."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The changed vFC binding no longer matches the intended Ethernet attachment. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It is not an independent management switch.",
      "Ethernet link-up does not establish FC login.",
      "It differs from NPV edge operation.",
      "The changed vFC binding no longer matches the intended Ethernet attachment.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-12"
    ],
    "related": [
      "device-14"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Nexus 5000 case and write a bounded recovery record. Authored case: Ethernet traffic is healthy on the converged link, but the intended virtual FC attachment has no fabric login after a binding edit.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "FEX → A fabric extender controlled by a parent",
        "vFC → Virtual Fibre Channel interface",
        "NPIV → Multiple virtual N_Port identities on a physical link"
      ],
      "steps": [
        "Record applicability and topology. Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: Ethernet traffic is healthy on the converged link, but the intended virtual FC attachment has no fabric login after a binding edit.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The changed vFC binding no longer matches the intended Ethernet attachment.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The changed vFC binding no longer matches the intended Ethernet attachment. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "What follows restored login? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "FEX": "A fabric extender controlled by a parent. It is not an independent management switch.",
      "vFC": "Virtual Fibre Channel interface. Ethernet link-up does not establish FC login.",
      "NPIV": "Multiple virtual N_Port identities on a physical link. It differs from NPV edge operation."
    },
    "sources": [
      {
        "title": "Nexus 5000 NPIV/FCoE example",
        "url": "https://www.cisco.com/c/en/us/support/docs/switches/nexus-5000-series-switches/116248-configure-fcoe-00.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-13-QC1",
        "topicId": "device-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Nexus 5000 play?",
        "answer": "Cisco Nexus 5000 is a data-center switching family associated with Ethernet access and, on supported configurations, Fibre Channel over Ethernet and fabric-extender designs.",
        "explanation": "Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ.",
        "testedConcept": "FEX"
      },
      {
        "questionId": "device-13-QC2",
        "topicId": "device-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "vFC"
      },
      {
        "questionId": "device-13-QC3",
        "topicId": "device-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "NPIV"
      }
    ],
    "exams": [
      {
        "questionId": "device-13-Q1",
        "topicId": "device-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a working Ethernet flow establish FC login?",
        "answer": "No.",
        "explanation": "They are distinct services on the converged design.",
        "testedConcept": "FEX"
      },
      {
        "questionId": "device-13-Q2",
        "topicId": "device-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does a FEX depend on?",
        "answer": "Its supported parent switch and fabric attachment.",
        "explanation": "It is not a standalone control plane.",
        "testedConcept": "vFC"
      },
      {
        "questionId": "device-13-Q3",
        "topicId": "device-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why compare vFC binding to the physical plan?",
        "answer": "The virtual attachment must represent the intended link.",
        "explanation": "A healthy unrelated interface does not close the incident.",
        "testedConcept": "NPIV"
      },
      {
        "questionId": "device-13-Q4",
        "topicId": "device-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What follows restored login?",
        "answer": "Active zoning, masking, host path and I/O validation.",
        "explanation": "Registration alone is not storage access.",
        "testedConcept": "FEX"
      },
      {
        "questionId": "device-13-Q5",
        "topicId": "device-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Nexus 5000 incident.",
        "answer": "The changed vFC binding no longer matches the intended Ethernet attachment.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-13-Q6",
        "topicId": "device-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-13-Q7",
        "topicId": "device-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare FEX and vFC in this design.",
        "answer": "A fabric extender controlled by a parent. Virtual Fibre Channel interface.",
        "explanation": "It is not an independent management switch. Ethernet link-up does not establish FC login.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-13-Q8",
        "topicId": "device-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Nexus 5000?",
        "answer": "Document Ethernet and storage dependencies separately even when they share a cable. Do not attach ordinary switch topology to a FEX as though it were an independent leaf.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-13-Q9",
        "topicId": "device-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Inspect the lossless transport design and congestion behavior for the intended storage class. Ethernet ping cannot measure storage latency or integrity.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-13-Q10",
        "topicId": "device-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: Ethernet traffic is healthy on the converged link, but the intended virtual FC attachment has no fabric login after a binding edit.",
      "fault": "The changed vFC binding no longer matches the intended Ethernet attachment.",
      "restore": "Restore the approved binding in an isolated supported converged lab. Verify login, correct VSAN, active zoning and host paths, while ensuring Ethernet service remains intact.",
      "scope": "Nexus 5000 FCoE/NPIV teaching reference; Ethernet-only and unified-port variants, licenses and release support differ."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-14",
    "batch": "25",
    "title": "Cisco Nexus 7000",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-14",
    "definition": "Cisco Nexus 7000 is a modular data-center switch family whose supported virtual device contexts partition control and interface resources within shared hardware.",
    "purpose": "Use VDCs for a supported administrative and resource partition, while documenting common chassis failure. Never describe two VDCs as independent physical switches. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. VDC answers one question: Virtual device context with its own control context. Interface allocation answers another: Assignment of ports to a context. Chassis resource adds Power, fabric and module infrastructure. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "VDC: Virtual device context with its own control context. Boundary: It still shares chassis dependencies.",
      "Interface allocation: Assignment of ports to a context. Boundary: A physical port is not simultaneously free in all contexts.",
      "Chassis resource: Power, fabric and module infrastructure. Boundary: Logical separation is not physical independence."
    ],
    "comparison": [
      [
        "VDC",
        "Virtual device context with its own control context",
        "It still shares chassis dependencies"
      ],
      [
        "Interface allocation",
        "Assignment of ports to a context",
        "A physical port is not simultaneously free in all contexts"
      ],
      [
        "Chassis resource",
        "Power, fabric and module infrastructure",
        "Logical separation is not physical independence"
      ]
    ],
    "mechanism": [
      "Identify the current administrative context and chassis resources.",
      "Allocate supported interface resources to the intended VDC.",
      "Configure and inspect networking inside that VDC.",
      "Validate service alongside the shared chassis health and failure plan."
    ],
    "flow": [
      [
        "Current context",
        "Identify the current administrative context and chassis resources."
      ],
      [
        "Port allocation",
        "Allocate supported interface resources to the intended VDC."
      ],
      [
        "VDC service",
        "Configure and inspect networking inside that VDC."
      ],
      [
        "Shared chassis",
        "Validate service alongside the shared chassis health and failure plan."
      ]
    ],
    "example": "Authored case: a port is visible in chassis inventory but missing from tenant VDC B. The supplied allocation record assigns it to VDC A. Fault: The operator is inspecting the wrong resource ownership context. Required recovery evidence: Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release. Guided; no Cisco execution claimed.",
        "code": "show version\nshow vdc\nshow vdc membership\nshow module",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator is inspecting the wrong resource ownership context."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Use VDCs for a supported administrative and resource partition, while documenting common chassis failure. Never describe two VDCs as independent physical switches. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Limit cross-context administration and verify the selected VDC before writes. Resource reassignment can cross tenant boundaries. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Track per-context tables as well as shared module and fabric demand. Spare capacity in one dimension does not prove spare capacity elsewhere. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: a port is visible in chassis inventory but missing from tenant VDC B. The supplied allocation record assigns it to VDC A."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator is inspecting the wrong resource ownership context. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It still shares chassis dependencies.",
      "A physical port is not simultaneously free in all contexts.",
      "Logical separation is not physical independence.",
      "The operator is inspecting the wrong resource ownership context.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-13"
    ],
    "related": [
      "device-15"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Nexus 7000 case and write a bounded recovery record. Authored case: a port is visible in chassis inventory but missing from tenant VDC B. The supplied allocation record assigns it to VDC A.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "VDC → Virtual device context with its own control context",
        "Interface allocation → Assignment of ports to a context",
        "Chassis resource → Power, fabric and module infrastructure"
      ],
      "steps": [
        "Record applicability and topology. Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: a port is visible in chassis inventory but missing from tenant VDC B. The supplied allocation record assigns it to VDC A.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator is inspecting the wrong resource ownership context.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator is inspecting the wrong resource ownership context. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Which identity should a command transcript include? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "VDC": "Virtual device context with its own control context. It still shares chassis dependencies.",
      "Interface allocation": "Assignment of ports to a context. A physical port is not simultaneously free in all contexts.",
      "Chassis resource": "Power, fabric and module infrastructure. Logical separation is not physical independence."
    },
    "sources": [
      {
        "title": "Nexus 7000 VDC overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/sw/nx-os/virtual_device_context/configuration/archive_601/vdc_nx-os_cfg/vdc_overview.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 7000 Layer 2 context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/sw/nx-os/layer2/configuration/guide/b_Cisco_Nexus_7000_Series_NX-OS_Layer_2_Switching_Configuration_Guide/b_Cisco_Nexus_7000_Series_NX-OS_Layer_2_Switching_Configuration_Guide_chapter_010.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-14-QC1",
        "topicId": "device-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Nexus 7000 play?",
        "answer": "Cisco Nexus 7000 is a modular data-center switch family whose supported virtual device contexts partition control and interface resources within shared hardware.",
        "explanation": "Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release.",
        "testedConcept": "VDC"
      },
      {
        "questionId": "device-14-QC2",
        "topicId": "device-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Interface allocation"
      },
      {
        "questionId": "device-14-QC3",
        "topicId": "device-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Chassis resource"
      }
    ],
    "exams": [
      {
        "questionId": "device-14-Q1",
        "topicId": "device-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why is the port missing from VDC B?",
        "answer": "It is assigned to VDC A in the supplied record.",
        "explanation": "Inventory visibility does not establish local ownership.",
        "testedConcept": "VDC"
      },
      {
        "questionId": "device-14-Q2",
        "topicId": "device-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What failure can affect both VDCs?",
        "answer": "A shared chassis dependency such as power or fabric.",
        "explanation": "Logical partitioning is not physical redundancy.",
        "testedConcept": "Interface allocation"
      },
      {
        "questionId": "device-14-Q3",
        "topicId": "device-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why evacuate before reallocation?",
        "answer": "The existing context may actively use the interface.",
        "explanation": "A resource move is a service change.",
        "testedConcept": "Chassis resource"
      },
      {
        "questionId": "device-14-Q4",
        "topicId": "device-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which identity should a command transcript include?",
        "answer": "Chassis and current VDC.",
        "explanation": "A correct command in the wrong context is still wrong.",
        "testedConcept": "VDC"
      },
      {
        "questionId": "device-14-Q5",
        "topicId": "device-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Nexus 7000 incident.",
        "answer": "The operator is inspecting the wrong resource ownership context.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-14-Q6",
        "topicId": "device-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-14-Q7",
        "topicId": "device-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare VDC and Interface allocation in this design.",
        "answer": "Virtual device context with its own control context. Assignment of ports to a context.",
        "explanation": "It still shares chassis dependencies. A physical port is not simultaneously free in all contexts.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-14-Q8",
        "topicId": "device-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Nexus 7000?",
        "answer": "Use VDCs for a supported administrative and resource partition, while documenting common chassis failure. Never describe two VDCs as independent physical switches.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-14-Q9",
        "topicId": "device-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Track per-context tables as well as shared module and fabric demand. Spare capacity in one dimension does not prove spare capacity elsewhere.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-14-Q10",
        "topicId": "device-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: a port is visible in chassis inventory but missing from tenant VDC B. The supplied allocation record assigns it to VDC A.",
      "fault": "The operator is inspecting the wrong resource ownership context.",
      "restore": "Verify the allocation and approved ownership before any reassignment. A planned move must evacuate the old service, preserve its configuration and validate both contexts after restoration or reassignment.",
      "scope": "Nexus 7000 VDC overview and Layer 2 configuration references; VDC count and allocation constraints depend on supervisor, line card, license and release."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-15",
    "batch": "25",
    "title": "Cisco Nexus 9000",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-15",
    "definition": "Cisco Nexus 9000 is a data-center switch family used in supported standalone NX-OS or ACI fabric deployments, with distinct configuration ownership in each mode.",
    "purpose": "Choose mode according to the operational architecture before authoring changes. ACI deployment is not equivalent to configuring independent NX-OS boxes. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. NX-OS mode answers one question: Standalone switch configuration model. ACI mode answers another: Fabric policy managed through APIC. Endpoint policy adds Mapping connectivity to intended groups and contracts. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "NX-OS mode: Standalone switch configuration model. Boundary: Feature support still varies by hardware.",
      "ACI mode: Fabric policy managed through APIC. Boundary: Standalone runbooks are not the policy source.",
      "Endpoint policy: Mapping connectivity to intended groups and contracts. Boundary: A discovered endpoint is not automatically permitted."
    ],
    "comparison": [
      [
        "NX-OS mode",
        "Standalone switch configuration model",
        "Feature support still varies by hardware"
      ],
      [
        "ACI mode",
        "Fabric policy managed through APIC",
        "Standalone runbooks are not the policy source"
      ],
      [
        "Endpoint policy",
        "Mapping connectivity to intended groups and contracts",
        "A discovered endpoint is not automatically permitted"
      ]
    ],
    "mechanism": [
      "Identify hardware, software mode and the authoritative management plane.",
      "In standalone mode inspect explicit switch configuration; in ACI inspect fabric policy and deployment.",
      "Trace the endpoint attachment and the intended network boundary.",
      "Verify permitted traffic and a deliberately excluded flow with the relevant policy evidence."
    ],
    "flow": [
      [
        "Mode and owner",
        "Identify hardware, software mode and the authoritative management plane."
      ],
      [
        "Authoritative policy",
        "In standalone mode inspect explicit switch configuration; in ACI inspect fabric policy and deployment."
      ],
      [
        "Endpoint mapping",
        "Trace the endpoint attachment and the intended network boundary."
      ],
      [
        "Allowed and denied",
        "Verify permitted traffic and a deliberately excluded flow with the relevant policy evidence."
      ]
    ],
    "example": "Authored case: an ACI leaf learns both endpoints, but the supplied policy has no contract permitting the intended inter-EPG HTTPS flow. Fault: The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change. Required recovery evidence: Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion. Guided; no Cisco execution claimed.",
        "code": "show version",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Choose mode according to the operational architecture before authoring changes. ACI deployment is not equivalent to configuring independent NX-OS boxes. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Separate fabric administration from application policy authority. Retain least-privilege contracts and verify the actual endpoint classification. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Inspect endpoint scale, uplink oversubscription and actual traffic path. A leaf-spine drawing does not guarantee nonblocking service. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: an ACI leaf learns both endpoints, but the supplied policy has no contract permitting the intended inter-EPG HTTPS flow."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "Feature support still varies by hardware.",
      "Standalone runbooks are not the policy source.",
      "A discovered endpoint is not automatically permitted.",
      "The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-14"
    ],
    "related": [
      "device-16"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco Nexus 9000 case and write a bounded recovery record. Authored case: an ACI leaf learns both endpoints, but the supplied policy has no contract permitting the intended inter-EPG HTTPS flow.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "NX-OS mode → Standalone switch configuration model",
        "ACI mode → Fabric policy managed through APIC",
        "Endpoint policy → Mapping connectivity to intended groups and contracts"
      ],
      "steps": [
        "Record applicability and topology. Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: an ACI leaf learns both endpoints, but the supplied policy has no contract permitting the intended inter-EPG HTTPS flow.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Is a mode conversion a troubleshooting step here? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "NX-OS mode": "Standalone switch configuration model. Feature support still varies by hardware.",
      "ACI mode": "Fabric policy managed through APIC. Standalone runbooks are not the policy source.",
      "Endpoint policy": "Mapping connectivity to intended groups and contracts. A discovered endpoint is not automatically permitted."
    },
    "sources": [
      {
        "title": "Nexus 9000 mode-specific release notes",
        "url": "https://www.cisco.com/c/en/us/support/switches/nexus-9000-series-switches/products-release-notes-list.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-15-QC1",
        "topicId": "device-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco Nexus 9000 play?",
        "answer": "Cisco Nexus 9000 is a data-center switch family used in supported standalone NX-OS or ACI fabric deployments, with distinct configuration ownership in each mode.",
        "explanation": "Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion.",
        "testedConcept": "NX-OS mode"
      },
      {
        "questionId": "device-15-QC2",
        "topicId": "device-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "ACI mode"
      },
      {
        "questionId": "device-15-QC3",
        "topicId": "device-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "Endpoint policy"
      }
    ],
    "exams": [
      {
        "questionId": "device-15-Q1",
        "topicId": "device-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before selecting the runbook?",
        "answer": "The operating mode and management authority.",
        "explanation": "The same family name can lead to different workflows.",
        "testedConcept": "NX-OS mode"
      },
      {
        "questionId": "device-15-Q2",
        "topicId": "device-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does endpoint learning permit inter-EPG traffic?",
        "answer": "No.",
        "explanation": "The intended policy still must allow it.",
        "testedConcept": "ACI mode"
      },
      {
        "questionId": "device-15-Q3",
        "topicId": "device-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test an excluded service after the contract change?",
        "answer": "To ensure the contract is narrow enough.",
        "explanation": "Connectivity alone is an incomplete acceptance test.",
        "testedConcept": "Endpoint policy"
      },
      {
        "questionId": "device-15-Q4",
        "topicId": "device-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is a mode conversion a troubleshooting step here?",
        "answer": "No.",
        "explanation": "It is a separate disruptive lifecycle project requiring its own plan.",
        "testedConcept": "NX-OS mode"
      },
      {
        "questionId": "device-15-Q5",
        "topicId": "device-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco Nexus 9000 incident.",
        "answer": "The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-15-Q6",
        "topicId": "device-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-15-Q7",
        "topicId": "device-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare NX-OS mode and ACI mode in this design.",
        "answer": "Standalone switch configuration model. Fabric policy managed through APIC.",
        "explanation": "Feature support still varies by hardware. Standalone runbooks are not the policy source.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-15-Q8",
        "topicId": "device-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco Nexus 9000?",
        "answer": "Choose mode according to the operational architecture before authoring changes. ACI deployment is not equivalent to configuring independent NX-OS boxes.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-15-Q9",
        "topicId": "device-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Inspect endpoint scale, uplink oversubscription and actual traffic path. A leaf-spine drawing does not guarantee nonblocking service.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-15-Q10",
        "topicId": "device-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: an ACI leaf learns both endpoints, but the supplied policy has no contract permitting the intended inter-EPG HTTPS flow.",
      "fault": "The operator interprets endpoint discovery as permission and proposes an unrelated standalone NX-OS ACL change.",
      "restore": "Use the authoritative APIC policy to review and deploy the narrow intended contract in the isolated fabric. Validate the endpoint/EPG mapping, HTTPS flow and continued denial of an excluded service.",
      "scope": "Nexus 9000 release portal and ACI fabric overview; hardware/mode compatibility must be verified. The lesson does not propose an in-place mode conversion."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  },
  {
    "id": "device-16",
    "batch": "25",
    "title": "Cisco MDS SAN switches",
    "subtitle": "Identify the platform. Trace its service. Prove the boundary.",
    "level": "Foundation → Device operations",
    "minutes": 45,
    "interactive": "dm-device-16",
    "definition": "Cisco MDS switches build Fibre Channel SAN fabrics in which login, VSAN membership, active zoning and host storage policy are distinct access boundaries.",
    "purpose": "Keep fabrics A and B independently documented and avoid changing both at once. Record WWPNs from authoritative device/array evidence rather than display aliases alone. In this lesson you will identify the authoritative configuration owner, follow one service through the device, and distinguish inventory evidence from functional evidence. The practical objective is a reproducible diagnosis that another operator can review before a change.",
    "mental": "Think of the device as a set of handoffs, not a single green status light. VSAN answers one question: Logical Fibre Channel fabric context. Active zoneset answers another: Currently enforced zone membership. LUN masking adds Array-side volume exposure. The analogy is a parcel crossing checkpoints: passing the first checkpoint does not prove delivery. Its limit is that actual device stages can operate concurrently and their exact order depends on the platform; this drawing is a reasoning sequence, not an internal pipeline specification.",
    "components": [
      "VSAN: Logical Fibre Channel fabric context. Boundary: It is not an Ethernet VLAN.",
      "Active zoneset: Currently enforced zone membership. Boundary: Editing the full database alone does not activate it.",
      "LUN masking: Array-side volume exposure. Boundary: Zoning does not grant a volume by itself."
    ],
    "comparison": [
      [
        "VSAN",
        "Logical Fibre Channel fabric context",
        "It is not an Ethernet VLAN"
      ],
      [
        "Active zoneset",
        "Currently enforced zone membership",
        "Editing the full database alone does not activate it"
      ],
      [
        "LUN masking",
        "Array-side volume exposure",
        "Zoning does not grant a volume by itself"
      ]
    ],
    "mechanism": [
      "Verify physical FC attachment, port role and fabric login.",
      "Confirm initiator and target WWPN identities in the intended VSAN.",
      "Inspect the active zoneset rather than only the editable database.",
      "Verify array masking, host multipath and actual application I/O."
    ],
    "flow": [
      [
        "FC login",
        "Verify physical FC attachment, port role and fabric login."
      ],
      [
        "WWPN and VSAN",
        "Confirm initiator and target WWPN identities in the intended VSAN."
      ],
      [
        "Active zoneset",
        "Inspect the active zoneset rather than only the editable database."
      ],
      [
        "Host I/O",
        "Verify array masking, host multipath and actual application I/O."
      ]
    ],
    "example": "Authored case: an initiator and target are logged into VSAN 10. The desired zone exists in the full database but is absent from the active zoneset. Fault: The operator assumes an edited zone is already enforced and starts changing host multipath settings. Required recovery evidence: Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback. Before revealing the incident reasoning, write an alternative explanation and name an observation that could disprove it. These supplied facts are sufficient for a classroom diagnosis but are not a substitute for collecting evidence from a real target.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific. Guided; no Cisco execution claimed.",
        "code": "show version\nshow flogi database\nshow zoneset active\nshow zone",
        "explanation": "Read-only inspection examples, plus a synthetic packet evaluation where shown. Use the correct CLI context and installed-release command reference. Unsupported commands are an applicability failure, not proof of a hardware fault. Do not paste these into another OS family.",
        "expected": "Record model/release first, then compare the relevant interface, policy, role or registration state to the supplied case. Output format varies. Do not invent a transcript: the specific fault to investigate is The operator assumes an edited zone is already enforced and starts changing host multipath settings."
      },
      {
        "filename": "offline-worksheet.txt",
        "platform": "Python 3.10+; course root; actual local calculation only",
        "code": "python labs/device-preflight.py --run",
        "explanation": "Runs a small three-valued declared-evidence checklist. No target access, file writes or network calls. It uses explicit pass, fail and unknown observations.",
        "expected": "Four JSON checkpoints: baseline eligible, unknown blocks, failure blocks, restored eligible. Eligibility describes the supplied worksheet, not platform compatibility or actual service."
      }
    ],
    "configuration": "Applicability: MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific. First export or record the owned baseline, identify the exact affected interfaces or policy objects and verify an independent management path. The intended narrow repair is: Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback. For a target extension, obtain the supported write and inverse/restore procedure from the matching release guide, review the diff, and use one disposable canary. If the management path, unrelated service or negative test changes, stop and restore the recorded baseline. Preserve the failure evidence before rollback. Never replace a whole configuration merely to correct one missing association.",
    "production": "Keep fabrics A and B independently documented and avoid changing both at once. Record WWPNs from authoritative device/array evidence rather than display aliases alone. Keep an inventory-to-runbook mapping and record the software/hardware support decision date. Schedule disruptive operations against a service owner and an explicit recovery window. Verify the post-change state from both the device and the endpoint; a successful controller job, accepted CLI or management ping is only one observer. Recheck the baseline immediately before applying a change so another operator’s intervening work is not silently overwritten.",
    "security": "Use the smallest intended initiator-target scope and protect zoning administration. A working path must not expose unrelated targets. Use the least privilege needed for observation and keep secrets and identifying production transcripts out of shared notebooks. Separate a denied test flow from a failed infrastructure dependency; they require different repairs.",
    "performance": "Inspect FC errors, credit-related behavior, path distribution and array latency. More visible paths do not automatically mean more throughput. State units, sample interval, offered load and service profile. Compare baseline, fault and recovered intervals under equivalent conditions. This course does not publish a measured throughput or convergence result for this family.",
    "troubleshooting": [
      [
        "Observed incident",
        "Authored case: an initiator and target are logged into VSAN 10. The desired zone exists in the full database but is absent from the active zoneset."
      ],
      [
        "First hypothesis and discriminating evidence",
        "The operator assumes an edited zone is already enforced and starts changing host multipath settings. Compare the relevant observation with the captured baseline before changing anything."
      ],
      [
        "Narrow repair and service verification",
        "Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback."
      ],
      [
        "The reported state looks correct but traffic still fails",
        "Continue along the four handoffs. Verify the intended endpoint, return path and policy at the actual observation point. A passed local boundary does not justify declaring the entire application healthy."
      ]
    ],
    "mistakes": [
      "It is not an Ethernet VLAN.",
      "Editing the full database alone does not activate it.",
      "Zoning does not grant a volume by itself.",
      "The operator assumes an edited zone is already enforced and starts changing host multipath settings.",
      "Treating a guided procedure or authored case as executed device evidence."
    ],
    "ports": "The hardware family has no single TCP/UDP port. Management may use SSH TCP 22 or HTTPS TCP 443 when enabled; permit only the configured service and approved sources. Wireless CAPWAP commonly uses UDP 5246/5247, but forwarding mode changes the data path. Fibre Channel is not TCP/IP; FC zoning is not an IP firewall rule. Derive the actual policy from the specific deployment.",
    "prerequisites": [
      "device-15"
    ],
    "related": [
      "hardware-0",
      "s7-g0-t0"
    ],
    "lab": {
      "objective": "Investigate the supplied Cisco MDS SAN switches case and write a bounded recovery record. Authored case: an initiator and target are logged into VSAN 10. The desired zone exists in the full database but is absent from the active zoneset.",
      "requirements": "Browser and an evidence notebook for the authored exercise; Python 3.10+ for the offline worksheet. Optional Cisco execution requires a separately owned, compatible isolated target, its release guide, console access and an approved baseline.",
      "topology": [
        "VSAN → Logical Fibre Channel fabric context",
        "Active zoneset → Currently enforced zone membership",
        "LUN masking → Array-side volume exposure"
      ],
      "steps": [
        "Record applicability and topology. MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific.",
        "Select Baseline in the incident panel and predict the service outcome without revealing the explanation. Authored case: an initiator and target are logged into VSAN 10. The desired zone exists in the full database but is absent from the active zoneset.",
        "Select Fault. Write the first failed handoff and one alternative diagnosis. The operator assumes an edited zone is already enforced and starts changing host multipath settings.",
        "Name the read-only observation that distinguishes those hypotheses. Consult the exact target reference if doing the optional device extension.",
        "Reveal the reasoning, then select Recovery and compare with your prediction. Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback.",
        "Use the declared checklist: make one gate unknown, then failed. Explain why neither result establishes readiness. Restore it only when the required evidence is supplied.",
        "Run the local Python worksheet and label the output calculated, not captured from a Cisco device.",
        "Optional target extension: review a single reversible change, execute only on the isolated target, retain timestamped observations, test an intended and excluded flow, then restore the original baseline."
      ],
      "verification": "Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback. Submit separate baseline, fault and recovery entries with observer and evidence type. Browser buttons only switch authored records; they do not execute a recovery.",
      "troubleshooting": "The operator assumes an edited zone is already enforced and starts changing host multipath settings. If observed target evidence differs, stop using the scenario as a diagnosis and gather the next handoff observation.",
      "challenge": "Why record WWPNs instead of only aliases? Add one shared dependency or alternate path to the drawing and explain how it changes the acceptance test.",
      "cleanup": "Reset the worksheet and clear your prediction. The Python worksheet has no persistent resources. In the optional target extension restore only the captured owned change, verify management, intended service and isolation, and remove temporary test objects only after recovery is confirmed."
    },
    "glossary": {
      "VSAN": "Logical Fibre Channel fabric context. It is not an Ethernet VLAN.",
      "Active zoneset": "Currently enforced zone membership. Editing the full database alone does not activate it.",
      "LUN masking": "Array-side volume exposure. Zoning does not grant a volume by itself."
    },
    "sources": [
      {
        "title": "MDS 9000 NX-OS 9.x zoning",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/mds9000/sw/9x/configuration/fabric/cisco-mds-9000-nx-os-fabric-configuration-guide-9x/configuring_and_managing_zones.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "device-16-QC1",
        "topicId": "device-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What role does Cisco MDS SAN switches play?",
        "answer": "Cisco MDS switches build Fibre Channel SAN fabrics in which login, VSAN membership, active zoning and host storage policy are distinct access boundaries.",
        "explanation": "MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "device-16-QC2",
        "topicId": "device-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should be checked before choosing its runbook?",
        "answer": "MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific.",
        "explanation": "Model, operating system, mode and release jointly determine applicability.",
        "testedConcept": "Active zoneset"
      },
      {
        "questionId": "device-16-QC3",
        "topicId": "device-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first observation after the stated repair?",
        "answer": "Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback.",
        "explanation": "Retest the original symptom and preserve an isolation or unaffected-service control.",
        "testedConcept": "LUN masking"
      }
    ],
    "exams": [
      {
        "questionId": "device-16-Q1",
        "topicId": "device-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which database governs the stated access?",
        "answer": "The active zoneset.",
        "explanation": "An edit in the full database is not enough.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "device-16-Q2",
        "topicId": "device-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does zoning replace LUN masking?",
        "answer": "No.",
        "explanation": "The array still controls volume exposure.",
        "testedConcept": "Active zoneset"
      },
      {
        "questionId": "device-16-Q3",
        "topicId": "device-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid simultaneous A/B changes?",
        "answer": "A shared mistake can remove both recovery paths.",
        "explanation": "Independence includes operational sequencing.",
        "testedConcept": "LUN masking"
      },
      {
        "questionId": "device-16-Q4",
        "topicId": "device-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why record WWPNs instead of only aliases?",
        "answer": "WWPNs identify actual ports; aliases may be stale or misleading.",
        "explanation": "Validate the physical identities before activation.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "device-16-Q5",
        "topicId": "device-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Locate the first unsupported conclusion in the supplied Cisco MDS SAN switches incident.",
        "answer": "The operator assumes an edited zone is already enforced and starts changing host multipath settings.",
        "explanation": "Distinguish observations from assumptions before proposing a write. Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback.",
        "testedConcept": "Fault inference"
      },
      {
        "questionId": "device-16-Q6",
        "topicId": "device-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Write a recovery acceptance test for this device case.",
        "answer": "Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback.",
        "explanation": "Include a working service and an unchanged or denied control; one green status does not cover all dependencies.",
        "testedConcept": "Recovery criteria"
      },
      {
        "questionId": "device-16-Q7",
        "topicId": "device-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Compare VSAN and Active zoneset in this design.",
        "answer": "Logical Fibre Channel fabric context. Currently enforced zone membership.",
        "explanation": "It is not an Ethernet VLAN. Editing the full database alone does not activate it.",
        "testedConcept": "Concept distinction"
      },
      {
        "questionId": "device-16-Q8",
        "topicId": "device-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What would make a replacement plan incomplete for Cisco MDS SAN switches?",
        "answer": "Keep fabrics A and B independently documented and avoid changing both at once. Record WWPNs from authoritative device/array evidence rather than display aliases alone.",
        "explanation": "Record identity, capability and recovery evidence before assuming compatibility.",
        "testedConcept": "Platform choice"
      },
      {
        "questionId": "device-16-Q9",
        "topicId": "device-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which performance observation is relevant, and which shortcut should be rejected?",
        "answer": "Inspect FC errors, credit-related behavior, path distribution and array latency. More visible paths do not automatically mean more throughput.",
        "explanation": "Use the measurement at the affected boundary over the incident time window.",
        "testedConcept": "Performance evidence"
      },
      {
        "questionId": "device-16-Q10",
        "topicId": "device-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should the lab report distinguish authored recovery from verified target recovery?",
        "answer": "The browser shows an authored case. A real target claim needs exact identity, command/output or controller evidence, timestamps, positive and negative tests, and restored baseline.",
        "explanation": "The worksheet cannot establish device parsing, traffic, convergence, RF behavior or physical recovery.",
        "testedConcept": "Evidence scope"
      }
    ],
    "deviceCase": {
      "baseline": "Authored case: an initiator and target are logged into VSAN 10. The desired zone exists in the full database but is absent from the active zoneset.",
      "fault": "The operator assumes an edited zone is already enforced and starts changing host multipath settings.",
      "restore": "Review and activate the intended zoneset using the matching zoning-mode procedure in the isolated fabric. Verify only intended WWPN access, array masking and host paths; retain the previously active zoneset as rollback.",
      "scope": "MDS 9000 NX-OS Fabric Configuration Guide 9.x zoning scope; switch model, zoning mode and host/array compatibility remain target-specific."
    },
    "artifacts": [
      {
        "title": "Cisco device evidence workbook",
        "path": "labs/device-mastery-workbook.md"
      },
      {
        "title": "Offline declared-evidence worksheet",
        "path": "labs/device-preflight.py"
      }
    ]
  }
];
