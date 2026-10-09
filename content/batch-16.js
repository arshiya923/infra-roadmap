'use strict';
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['16']=[
  {
    "id": "s6-g3-t0",
    "batch": "16",
    "title": "Top of Rack",
    "subtitle": "Map each server NIC to an access port and every access uplink to a named spine/aggregation port.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t0",
    "definition": "Top-of-rack switching places access switches near server attachments within a rack. It reduces long server cable runs and makes rack expansion modular, while concentrating rack traffic and exposing port utilization, uplink capacity and rack-local shared power as design constraints. ToR describes placement, not a particular overlay or routing protocol.",
    "purpose": "Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row.",
    "mental": "Server ports connect to rack switches and selected uplinks carry off-rack traffic; same-switch traffic need not cross a spine. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "ToR: Rack-local access placement. Not automatically leaf-spine.",
      "Uplink: Off-rack attachment. Shared by many downlinks.",
      "Rack domain: Shared local dependencies. Trace power and switch parents.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Server ports connect to rack switches and selected uplinks carry off-rack traffic; same-switch traffic need not cross a spine.",
      "Two rack switches provide useful diversity only with supported server attachment, independent paths and enough surviving capacity.",
      "Port speed, optic/cable support, length and airflow orientation must match the actual installation rather than a location label."
    ],
    "flow": [
      [
        "Map the original operation",
        "Top-of-rack switching places access switches near server attachments within a rack. It reduces long server cable runs and makes rack expansion modular, while concentrating rack traffic and exposing port utilization, uplink capacity and rack-local shared power as design constraints. ToR describes placement, not a particular overlay or routing protocol."
      ],
      [
        "Trace the first boundary",
        "Server ports connect to rack switches and selected uplinks carry off-rack traffic; same-switch traffic need not cross a spine."
      ],
      [
        "Evaluate installed conditions",
        "Two rack switches provide useful diversity only with supported server attachment, independent paths and enough surviving capacity."
      ],
      [
        "Verify capacity and recovery",
        "Port speed, optic/cable support, length and airflow orientation must match the actual installation rather than a location label."
      ]
    ],
    "comparison": [
      [
        "ToR",
        "Rack-local access placement",
        "Not automatically leaf-spine."
      ],
      [
        "Uplink",
        "Off-rack attachment",
        "Shared by many downlinks."
      ],
      [
        "Rack domain",
        "Shared local dependencies",
        "Trace power and switch parents."
      ]
    ],
    "example": "Case: A leaf has 48×25 Gb/s downlinks and 2×100 Gb/s uplinks. What is port-sum oversubscription? Answer: 6:1. Reason: 1200 Gb/s potential downlinks divided by 200 Gb/s uplinks. Case: One of two uplinks is unavailable. What is the new port-sum ratio? Answer: 12:1 for the stated 48×25 design. Reason: Surviving uplink capacity is 100 Gb/s. Case: Can free switch ports approve more servers without other checks? Answer: No. Reason: Power, cooling, uplinks and server attachment also constrain growth.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row.",
        "expected": "Capture observer and timestamp. Restored attachment, surviving capacity and original permitted/prohibited transactions. Link LEDs do not prove service or policy recovery. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Two server NICs attach to one ToR. What failure remains?",
        "Loss of that shared ToR and its parents. NIC count does not establish switch diversity."
      ],
      [
        "Does 200 Gb/s aggregate uplink imply one flow gets 200 Gb/s?",
        "No. Hashing and endpoint/path limits govern individual flows."
      ],
      [
        "Why retain switch power-parent mapping?",
        "Two switches can share one circuit or UPS. Duplicated equipment can fail together."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Access segmentation and protected switch management remain necessary inside a rack. A short cable does not imply trusted workloads or protect a management interface from unauthorized access.",
    "performance": "Compare potential port sums with measured rack demand, one-flow behavior and failure-state capacity. Idle ports, optic count and power/cooling overhead can matter even when an aggregate envelope is adequate.",
    "mistakes": [
      "Placement does not choose an overlay/control plane.",
      "Surviving uplink capacity is 100 Gb/s.",
      "Switch placement can conflict with server airflow.",
      "Power, cooling, uplinks and server attachment also constrain growth."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s6-g3-t1"
    ],
    "lab": {
      "objective": "Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Top of Rack boundary",
        "ToR → Uplink → Rack domain",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Map each server NIC to an access port and every access uplink to a named spine/aggregation port. Count usable downlinks and surviving uplinks, and retain rack switch/power dependencies before comparing a design with end-of-row.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using ToR, Uplink and Rack domain. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Port speed, optic/cable support, length and airflow orientation must match the actual installation rather than a location label. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Restored attachment, surviving capacity and original permitted/prohibited transactions. Link LEDs do not prove service or policy recovery. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "ToR → Uplink → Rack domain. Hashing and endpoint/path limits govern individual flows. Duplicated equipment can fail together.",
      "challenge": "Can free switch ports approve more servers without other checks? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "ToR": "Rack-local access placement. Not automatically leaf-spine.",
      "Uplink": "Off-rack attachment. Shared by many downlinks.",
      "Rack domain": "Shared local dependencies. Trace power and switch parents."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t0-Q01",
        "topicId": "s6-g3-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A leaf has 48×25 Gb/s downlinks and 2×100 Gb/s uplinks. What is port-sum oversubscription?",
        "answer": "6:1.",
        "explanation": "1200 Gb/s potential downlinks divided by 200 Gb/s uplinks.",
        "testedConcept": "A leaf has 48×25 Gb/s downlinks and 2×100 Gb/s uplinks. What is port-sum oversubscription?",
        "options": [
          "3:1, adding both duplex directions to the denominator.",
          "1:6, reversing potential and shared capacity.",
          "6:1.",
          "12:1, counting only one healthy uplink."
        ]
      },
      {
        "questionId": "s6-g3-t0-Q02",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does top-of-rack automatically mean VXLAN EVPN?",
        "answer": "No.",
        "explanation": "Placement does not choose an overlay/control plane.",
        "testedConcept": "Does top-of-rack automatically mean VXLAN EVPN?"
      },
      {
        "questionId": "s6-g3-t0-Q03",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two server NICs attach to one ToR. What failure remains?",
        "answer": "Loss of that shared ToR and its parents.",
        "explanation": "NIC count does not establish switch diversity.",
        "testedConcept": "Two server NICs attach to one ToR. What failure remains?"
      },
      {
        "questionId": "s6-g3-t0-Q04",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One of two uplinks is unavailable. What is the new port-sum ratio?",
        "answer": "12:1 for the stated 48×25 design.",
        "explanation": "Surviving uplink capacity is 100 Gb/s.",
        "testedConcept": "One of two uplinks is unavailable. What is the new port-sum ratio?"
      },
      {
        "questionId": "s6-g3-t0-Q05",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 200 Gb/s aggregate uplink imply one flow gets 200 Gb/s?",
        "answer": "No.",
        "explanation": "Hashing and endpoint/path limits govern individual flows.",
        "testedConcept": "Does 200 Gb/s aggregate uplink imply one flow gets 200 Gb/s?"
      },
      {
        "questionId": "s6-g3-t0-Q06",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inspect switch fan/PSU airflow before mounting?",
        "answer": "Its inlet/exhaust orientation must fit the aisle plan.",
        "explanation": "Switch placement can conflict with server airflow.",
        "testedConcept": "Why inspect switch fan/PSU airflow before mounting?"
      },
      {
        "questionId": "s6-g3-t0-Q07",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What cable record makes a rack replacement recoverable?",
        "answer": "Both endpoint ports, media/optic, length and path label.",
        "explanation": "A cable color alone is ambiguous.",
        "testedConcept": "What cable record makes a rack replacement recoverable?"
      },
      {
        "questionId": "s6-g3-t0-Q08",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can free switch ports approve more servers without other checks?",
        "answer": "No.",
        "explanation": "Power, cooling, uplinks and server attachment also constrain growth.",
        "testedConcept": "Can free switch ports approve more servers without other checks?"
      },
      {
        "questionId": "s6-g3-t0-Q09",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why retain switch power-parent mapping?",
        "answer": "Two switches can share one circuit or UPS.",
        "explanation": "Duplicated equipment can fail together.",
        "testedConcept": "Why retain switch power-parent mapping?"
      },
      {
        "questionId": "s6-g3-t0-Q10",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a ToR recovery?",
        "answer": "Restored attachment, surviving capacity and original permitted/prohibited transactions.",
        "explanation": "Link LEDs do not prove service or policy recovery.",
        "testedConcept": "What verifies a ToR recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t0-QC1",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does top-of-rack automatically mean VXLAN EVPN?",
        "answer": "No.",
        "explanation": "Placement does not choose an overlay/control plane.",
        "testedConcept": "Does top-of-rack automatically mean VXLAN EVPN?"
      },
      {
        "questionId": "s6-g3-t0-QC2",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 200 Gb/s aggregate uplink imply one flow gets 200 Gb/s?",
        "answer": "No.",
        "explanation": "Hashing and endpoint/path limits govern individual flows.",
        "testedConcept": "Does 200 Gb/s aggregate uplink imply one flow gets 200 Gb/s?"
      },
      {
        "questionId": "s6-g3-t0-QC3",
        "topicId": "s6-g3-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why retain switch power-parent mapping?",
        "answer": "Two switches can share one circuit or UPS.",
        "explanation": "Duplicated equipment can fail together.",
        "testedConcept": "Why retain switch power-parent mapping?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t1",
    "batch": "16",
    "title": "End of Row",
    "subtitle": "Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t1",
    "definition": "End-of-row switching concentrates access near the row rather than in every rack. It can improve port pooling and centralize operations, while requiring longer rack-to-row cable paths and exposing many racks to shared switching, patching and power dependencies.",
    "purpose": "Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient.",
    "mental": "Server or rack aggregation cables traverse structured pathways to row access ports; port/patch identity and supported distance define the attachment. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "EoR: Row-centralized access. Longer server/rack paths.",
      "Patch path: Structured cable segments. Needs endpoint and length records.",
      "Row domain: Shared multi-rack parents. Evaluate failure impact.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Server or rack aggregation cables traverse structured pathways to row access ports; port/patch identity and supported distance define the attachment.",
      "A row switch failure can affect multiple racks, so redundant row paths must be evaluated by shared parents and surviving capacity.",
      "Row placement does not dictate Layer 2 versus routed access; forwarding and failure behavior depend on the implemented topology."
    ],
    "flow": [
      [
        "Map the original operation",
        "End-of-row switching concentrates access near the row rather than in every rack. It can improve port pooling and centralize operations, while requiring longer rack-to-row cable paths and exposing many racks to shared switching, patching and power dependencies."
      ],
      [
        "Trace the first boundary",
        "Server or rack aggregation cables traverse structured pathways to row access ports; port/patch identity and supported distance define the attachment."
      ],
      [
        "Evaluate installed conditions",
        "A row switch failure can affect multiple racks, so redundant row paths must be evaluated by shared parents and surviving capacity."
      ],
      [
        "Verify capacity and recovery",
        "Row placement does not dictate Layer 2 versus routed access; forwarding and failure behavior depend on the implemented topology."
      ]
    ],
    "comparison": [
      [
        "EoR",
        "Row-centralized access",
        "Longer server/rack paths."
      ],
      [
        "Patch path",
        "Structured cable segments",
        "Needs endpoint and length records."
      ],
      [
        "Row domain",
        "Shared multi-rack parents",
        "Evaluate failure impact."
      ]
    ],
    "example": "Case: An EoR design centralizes ports for six racks. What failure-domain observation matters most? Answer: Which racks share its switch, power and cable parents. Reason: Centralization can correlate several racks. Case: What should be counted in a long copper/fiber attachment? Answer: Total supported channel length, patches, media and optics. Reason: Straight-line rack distance is incomplete. Case: Can one EoR failure affect more workloads than one ToR failure? Answer: Yes depending on attachment scope. Reason: Draw actual rack-to-switch dependencies.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient.",
        "expected": "Capture observer and timestamp. Correct endpoint/patch mapping and original workload/policy observations. A replaced cable and link light are not sufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why can port pooling reduce idle capacity?",
        "Several racks can consume one shared access-port pool. That benefit must be weighed against shared failure impact."
      ],
      [
        "Two EoR switches use the same tray. What risk remains?",
        "A common tray incident can interrupt both paths. Switch diversity can share a cable failure domain."
      ],
      [
        "Why protect row patch records?",
        "They reveal physical tenant connectivity and support exact restoration. Operational maps can also be sensitive infrastructure data."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "A row patch area can expose many tenant attachments. Control physical access and maintain explicit logical segmentation and management policy independently of the cable route.",
    "performance": "Central pooling can reduce idle access ports but length, optics, shared uplinks and operational blast radius affect cost and latency. Do not select placement from nominal switch capacity alone.",
    "mistakes": [
      "Placement and forwarding design are separate.",
      "Straight-line rack distance is incomplete.",
      "Attachment, control/forwarding state and recovery behavior require validation.",
      "Draw actual rack-to-switch dependencies."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s6-g3-t2"
    ],
    "lab": {
      "objective": "Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → End of Row boundary",
        "EoR → Patch path → Row domain",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Compare a row design with ToR using measured attachment counts, cable length/patch budgets, optics, port utilization, maintenance impact and failure-state demand. Preserve a named alternate path rather than assuming centralized access is inherently resilient.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using EoR, Patch path and Row domain. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Row placement does not dictate Layer 2 versus routed access; forwarding and failure behavior depend on the implemented topology. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct endpoint/patch mapping and original workload/policy observations. A replaced cable and link light are not sufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "EoR → Patch path → Row domain. Switch diversity can share a cable failure domain. Operational maps can also be sensitive infrastructure data.",
      "challenge": "Can one EoR failure affect more workloads than one ToR failure? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "EoR": "Row-centralized access. Longer server/rack paths.",
      "Patch path": "Structured cable segments. Needs endpoint and length records.",
      "Row domain": "Shared multi-rack parents. Evaluate failure impact."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t1-Q01",
        "topicId": "s6-g3-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An EoR design centralizes ports for six racks. What failure-domain observation matters most?",
        "answer": "Which racks share its switch, power and cable parents.",
        "explanation": "Centralization can correlate several racks.",
        "testedConcept": "An EoR design centralizes ports for six racks. What failure-domain observation matters most?",
        "options": [
          "Only the switch name, assuming central placement guarantees diversity.",
          "Which racks share its switch, power and cable parents.",
          "Only the number of free access ports, ignoring shared parents.",
          "Only the physical distance between the six racks."
        ]
      },
      {
        "questionId": "s6-g3-t1-Q02",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does end-of-row require Layer 2 access?",
        "answer": "No.",
        "explanation": "Placement and forwarding design are separate.",
        "testedConcept": "Does end-of-row require Layer 2 access?"
      },
      {
        "questionId": "s6-g3-t1-Q03",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why can port pooling reduce idle capacity?",
        "answer": "Several racks can consume one shared access-port pool.",
        "explanation": "That benefit must be weighed against shared failure impact.",
        "testedConcept": "Why can port pooling reduce idle capacity?"
      },
      {
        "questionId": "s6-g3-t1-Q04",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should be counted in a long copper/fiber attachment?",
        "answer": "Total supported channel length, patches, media and optics.",
        "explanation": "Straight-line rack distance is incomplete.",
        "testedConcept": "What should be counted in a long copper/fiber attachment?"
      },
      {
        "questionId": "s6-g3-t1-Q05",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two EoR switches use the same tray. What risk remains?",
        "answer": "A common tray incident can interrupt both paths.",
        "explanation": "Switch diversity can share a cable failure domain.",
        "testedConcept": "Two EoR switches use the same tray. What risk remains?"
      },
      {
        "questionId": "s6-g3-t1-Q06",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a spare row switch instantly preserve active sessions?",
        "answer": "No.",
        "explanation": "Attachment, control/forwarding state and recovery behavior require validation.",
        "testedConcept": "Does a spare row switch instantly preserve active sessions?"
      },
      {
        "questionId": "s6-g3-t1-Q07",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What distinguishes capacity from failure resilience?",
        "answer": "The surviving path must carry required traffic after the stated fault.",
        "explanation": "Healthy port totals are insufficient.",
        "testedConcept": "What distinguishes capacity from failure resilience?"
      },
      {
        "questionId": "s6-g3-t1-Q08",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can one EoR failure affect more workloads than one ToR failure?",
        "answer": "Yes depending on attachment scope.",
        "explanation": "Draw actual rack-to-switch dependencies.",
        "testedConcept": "Can one EoR failure affect more workloads than one ToR failure?"
      },
      {
        "questionId": "s6-g3-t1-Q09",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect row patch records?",
        "answer": "They reveal physical tenant connectivity and support exact restoration.",
        "explanation": "Operational maps can also be sensitive infrastructure data.",
        "testedConcept": "Why protect row patch records?"
      },
      {
        "questionId": "s6-g3-t1-Q10",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies row-path restoration?",
        "answer": "Correct endpoint/patch mapping and original workload/policy observations.",
        "explanation": "A replaced cable and link light are not sufficient.",
        "testedConcept": "What verifies row-path restoration?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t1-QC1",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does end-of-row require Layer 2 access?",
        "answer": "No.",
        "explanation": "Placement and forwarding design are separate.",
        "testedConcept": "Does end-of-row require Layer 2 access?"
      },
      {
        "questionId": "s6-g3-t1-QC2",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two EoR switches use the same tray. What risk remains?",
        "answer": "A common tray incident can interrupt both paths.",
        "explanation": "Switch diversity can share a cable failure domain.",
        "testedConcept": "Two EoR switches use the same tray. What risk remains?"
      },
      {
        "questionId": "s6-g3-t1-QC3",
        "topicId": "s6-g3-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect row patch records?",
        "answer": "They reveal physical tenant connectivity and support exact restoration.",
        "explanation": "Operational maps can also be sensitive infrastructure data.",
        "testedConcept": "Why protect row patch records?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t2",
    "batch": "16",
    "title": "Leaf-Spine",
    "subtitle": "Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t2",
    "definition": "A conventional two-tier leaf-spine fabric connects every leaf to every spine within the fabric, without using leaf-to-leaf or spine-to-spine links for those modeled inter-leaf paths. Endpoints attach at leaves; spines provide transit. The uniform pattern simplifies path counting but does not alone ensure nonblocking traffic or operational convergence.",
    "purpose": "Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet.",
    "mental": "A packet between leaves follows source leaf → selected available spine → destination leaf; same-leaf forwarding need not use a spine. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Leaf: Endpoint access boundary. May handle same-leaf traffic locally.",
      "Spine: Inter-leaf transit. Connects the modeled leaves.",
      "ECMP: Multiple equal paths. Distribution is not per-flow aggregation.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "A packet between leaves follows source leaf → selected available spine → destination leaf; same-leaf forwarding need not use a spine.",
      "Multiple equal paths can distribute flows by implementation-specific hashing; one flow does not automatically combine all uplinks.",
      "A spine or uplink loss reduces the source/destination leaf envelope and may require routing/forwarding convergence before useful traffic resumes."
    ],
    "flow": [
      [
        "Map the original operation",
        "A conventional two-tier leaf-spine fabric connects every leaf to every spine within the fabric, without using leaf-to-leaf or spine-to-spine links for those modeled inter-leaf paths. Endpoints attach at leaves; spines provide transit. The uniform pattern simplifies path counting but does not alone ensure nonblocking traffic or operational convergence."
      ],
      [
        "Trace the first boundary",
        "A packet between leaves follows source leaf → selected available spine → destination leaf; same-leaf forwarding need not use a spine."
      ],
      [
        "Evaluate installed conditions",
        "Multiple equal paths can distribute flows by implementation-specific hashing; one flow does not automatically combine all uplinks."
      ],
      [
        "Verify capacity and recovery",
        "A spine or uplink loss reduces the source/destination leaf envelope and may require routing/forwarding convergence before useful traffic resumes."
      ]
    ],
    "comparison": [
      [
        "Leaf",
        "Endpoint access boundary",
        "May handle same-leaf traffic locally."
      ],
      [
        "Spine",
        "Inter-leaf transit",
        "Connects the modeled leaves."
      ],
      [
        "ECMP",
        "Multiple equal paths",
        "Distribution is not per-flow aggregation."
      ]
    ],
    "example": "Case: Four leaves connect to two spines with one link per leaf-spine pair. How many such links exist? Answer: Eight links. Reason: Every leaf has two spine attachments. Case: Does two-tier connectivity alone prove a nonblocking network? Answer: No. Reason: Link/port capacity and traffic matrix still matter. Case: Are VXLAN and EVPN required to define leaf-spine placement? Answer: No. Reason: An overlay/control plane is a separate design choice.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet.",
        "expected": "Capture observer and timestamp. Actual usable route/forwarding paths and original service within requirements. A topology drawing alone is not convergence evidence. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Must same-leaf traffic cross a spine?",
        "No in this scoped forwarding case. Endpoint locality changes which envelope is relevant."
      ],
      [
        "What changes when one spine becomes unavailable?",
        "Paths and aggregate uplink capacity per leaf can shrink. Routing convergence and service recovery are additional observations."
      ],
      [
        "What assumption limits this worksheet failure calculation?",
        "Both involved leaves have the same supplied surviving uplink count/rate. Asymmetric paths need their own bottleneck analysis."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Physical connectivity does not establish tenant or management policy. Apply the relevant segmentation/enforcement boundaries and protect routing and switch administration.",
    "performance": "The worksheet assumes symmetric installed links and supplied loss per involved leaf. It does not model ECMP collisions, internal switching, shared endpoint limits or measured single-flow bandwidth.",
    "mistakes": [
      "The two-tier pattern supplies transit through spines.",
      "Link/port capacity and traffic matrix still matter.",
      "Many designs hash a flow onto one path.",
      "An overlay/control plane is a separate design choice."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s6-g3-t3"
    ],
    "lab": {
      "objective": "Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Leaf-Spine boundary",
        "Leaf → Spine → ECMP",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Draw each leaf-to-spine edge with rate and port identity, count required spine ports for all leaves, and compare demanded traffic under a stated failure. Keep routing/ECMP configuration and observed convergence separate from this topology worksheet.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Leaf, Spine and ECMP. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. A spine or uplink loss reduces the source/destination leaf envelope and may require routing/forwarding convergence before useful traffic resumes. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Actual usable route/forwarding paths and original service within requirements. A topology drawing alone is not convergence evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Leaf → Spine → ECMP. Routing convergence and service recovery are additional observations. Asymmetric paths need their own bottleneck analysis.",
      "challenge": "Are VXLAN and EVPN required to define leaf-spine placement? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Leaf": "Endpoint access boundary. May handle same-leaf traffic locally.",
      "Spine": "Inter-leaf transit. Connects the modeled leaves.",
      "ECMP": "Multiple equal paths. Distribution is not per-flow aggregation."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t2-Q01",
        "topicId": "s6-g3-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Four leaves connect to two spines with one link per leaf-spine pair. How many such links exist?",
        "answer": "Eight links.",
        "explanation": "Every leaf has two spine attachments.",
        "testedConcept": "Four leaves connect to two spines with one link per leaf-spine pair. How many such links exist?",
        "options": [
          "Eight links.",
          "Six links, adding the leaf and spine counts.",
          "Four links, giving every leaf only one spine.",
          "Twelve links, adding a modeled leaf-to-leaf full mesh."
        ]
      },
      {
        "questionId": "s6-g3-t2-Q02",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which modeled path carries traffic between two different leaves?",
        "answer": "Source leaf, an available spine, then destination leaf.",
        "explanation": "The two-tier pattern supplies transit through spines.",
        "testedConcept": "Which modeled path carries traffic between two different leaves?"
      },
      {
        "questionId": "s6-g3-t2-Q03",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Must same-leaf traffic cross a spine?",
        "answer": "No in this scoped forwarding case.",
        "explanation": "Endpoint locality changes which envelope is relevant.",
        "testedConcept": "Must same-leaf traffic cross a spine?"
      },
      {
        "questionId": "s6-g3-t2-Q04",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does two-tier connectivity alone prove a nonblocking network?",
        "answer": "No.",
        "explanation": "Link/port capacity and traffic matrix still matter.",
        "testedConcept": "Does two-tier connectivity alone prove a nonblocking network?"
      },
      {
        "questionId": "s6-g3-t2-Q05",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What changes when one spine becomes unavailable?",
        "answer": "Paths and aggregate uplink capacity per leaf can shrink.",
        "explanation": "Routing convergence and service recovery are additional observations.",
        "testedConcept": "What changes when one spine becomes unavailable?"
      },
      {
        "questionId": "s6-g3-t2-Q06",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does ECMP necessarily split one flow equally over all paths?",
        "answer": "No.",
        "explanation": "Many designs hash a flow onto one path.",
        "testedConcept": "Does ECMP necessarily split one flow equally over all paths?"
      },
      {
        "questionId": "s6-g3-t2-Q07",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why count spine ports before adding leaves?",
        "answer": "Each spine needs an attachment for each added leaf in this topology.",
        "explanation": "Leaf port availability alone misses spine constraints.",
        "testedConcept": "Why count spine ports before adding leaves?"
      },
      {
        "questionId": "s6-g3-t2-Q08",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Are VXLAN and EVPN required to define leaf-spine placement?",
        "answer": "No.",
        "explanation": "An overlay/control plane is a separate design choice.",
        "testedConcept": "Are VXLAN and EVPN required to define leaf-spine placement?"
      },
      {
        "questionId": "s6-g3-t2-Q09",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What assumption limits this worksheet failure calculation?",
        "answer": "Both involved leaves have the same supplied surviving uplink count/rate.",
        "explanation": "Asymmetric paths need their own bottleneck analysis.",
        "testedConcept": "What assumption limits this worksheet failure calculation?"
      },
      {
        "questionId": "s6-g3-t2-Q10",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a fabric failover?",
        "answer": "Actual usable route/forwarding paths and original service within requirements.",
        "explanation": "A topology drawing alone is not convergence evidence.",
        "testedConcept": "What verifies a fabric failover?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t2-QC1",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which modeled path carries traffic between two different leaves?",
        "answer": "Source leaf, an available spine, then destination leaf.",
        "explanation": "The two-tier pattern supplies transit through spines.",
        "testedConcept": "Which modeled path carries traffic between two different leaves?"
      },
      {
        "questionId": "s6-g3-t2-QC2",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What changes when one spine becomes unavailable?",
        "answer": "Paths and aggregate uplink capacity per leaf can shrink.",
        "explanation": "Routing convergence and service recovery are additional observations.",
        "testedConcept": "What changes when one spine becomes unavailable?"
      },
      {
        "questionId": "s6-g3-t2-QC3",
        "topicId": "s6-g3-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What assumption limits this worksheet failure calculation?",
        "answer": "Both involved leaves have the same supplied surviving uplink count/rate.",
        "explanation": "Asymmetric paths need their own bottleneck analysis.",
        "testedConcept": "What assumption limits this worksheet failure calculation?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t3",
    "batch": "16",
    "title": "East-West Traffic",
    "subtitle": "Build an east-west demand matrix from representative original operations and placements.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t3",
    "definition": "East-west traffic is workload communication across peers within the data-center context, such as application-to-database or storage/replication exchanges. The label describes the communication relationship rather than a particular port or guaranteed physical path.",
    "purpose": "Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload.",
    "mental": "Identify source and destination roles and actual placement; peers on one leaf can use a different path from peers on different leaves. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Peer relationship: Workloads within the DC context. Not a trust designation.",
      "Locality: Actual attachment placement. Selects the physical path.",
      "Demand matrix: Source/destination offered work. Not port capacity.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Identify source and destination roles and actual placement; peers on one leaf can use a different path from peers on different leaves.",
      "Replication, storage and application calls create different concurrency, latency and directionality needs; averages can hide synchronized bursts.",
      "Policy enforcement and return traffic must be located on the actual path, including virtual switches or host boundaries where relevant."
    ],
    "flow": [
      [
        "Map the original operation",
        "East-west traffic is workload communication across peers within the data-center context, such as application-to-database or storage/replication exchanges. The label describes the communication relationship rather than a particular port or guaranteed physical path."
      ],
      [
        "Trace the first boundary",
        "Identify source and destination roles and actual placement; peers on one leaf can use a different path from peers on different leaves."
      ],
      [
        "Evaluate installed conditions",
        "Replication, storage and application calls create different concurrency, latency and directionality needs; averages can hide synchronized bursts."
      ],
      [
        "Verify capacity and recovery",
        "Policy enforcement and return traffic must be located on the actual path, including virtual switches or host boundaries where relevant."
      ]
    ],
    "comparison": [
      [
        "Peer relationship",
        "Workloads within the DC context",
        "Not a trust designation."
      ],
      [
        "Locality",
        "Actual attachment placement",
        "Selects the physical path."
      ],
      [
        "Demand matrix",
        "Source/destination offered work",
        "Not port capacity."
      ]
    ],
    "example": "Case: An application calls a database on another leaf. What traffic class and modeled path apply? Answer: East-west through source leaf, spine and destination leaf. Reason: Logical peers can still cross fabric transit. Case: Why is average daily replication bandwidth insufficient for capacity planning? Answer: Synchronized bursts and failure-state demand can exceed the average. Reason: Time distribution affects queueing and recovery. Case: How can replica placement affect recovery traffic? Answer: Rebuild or resynchronization can concentrate additional inter-leaf work. Reason: Failure-state workload may differ from normal operation.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload.",
        "expected": "Capture observer and timestamp. Original peer transactions and required policy behavior after exact restoration. Route or link presence alone is incomplete. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "What changes if both peers move to the same leaf?",
        "The scoped path can bypass the spine envelope. The logical application relationship can remain the same."
      ],
      [
        "Can the sum of all server port rates be called measured east-west demand?",
        "No. It is potential attachment capacity."
      ],
      [
        "Does classifying a flow as east-west identify its TCP port?",
        "No. The actual application tuple must be inventoried."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Internal peer traffic still needs least privilege and protected identity/data handling. East-west classification does not authorize database, storage or management operations.",
    "performance": "Measure per-operation latency, burst and aggregate offered rates. Server placement can change locality while preserving the same logical workload; flow hashing and endpoint limits remain independent.",
    "mistakes": [
      "Traffic relationship does not grant authorization.",
      "Time distribution affects queueing and recovery.",
      "A link-speed label omits queueing and processing.",
      "Failure-state workload may differ from normal operation."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s6-g3-t4"
    ],
    "lab": {
      "objective": "Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → East-West Traffic boundary",
        "Peer relationship → Locality → Demand matrix",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Build an east-west demand matrix from representative original operations and placements. Compare healthy and failure-state inter-leaf envelopes without converting downlink port sums into an asserted measured workload.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Peer relationship, Locality and Demand matrix. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Policy enforcement and return traffic must be located on the actual path, including virtual switches or host boundaries where relevant. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Original peer transactions and required policy behavior after exact restoration. Route or link presence alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Peer relationship → Locality → Demand matrix. It is potential attachment capacity. The actual application tuple must be inventoried.",
      "challenge": "How can replica placement affect recovery traffic? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Peer relationship": "Workloads within the DC context. Not a trust designation.",
      "Locality": "Actual attachment placement. Selects the physical path.",
      "Demand matrix": "Source/destination offered work. Not port capacity."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t3-Q01",
        "topicId": "s6-g3-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An application calls a database on another leaf. What traffic class and modeled path apply?",
        "answer": "East-west through source leaf, spine and destination leaf.",
        "explanation": "Logical peers can still cross fabric transit.",
        "testedConcept": "An application calls a database on another leaf. What traffic class and modeled path apply?",
        "options": [
          "North-south directly through the Internet edge by definition.",
          "East-west staying entirely on the source leaf despite remote attachment.",
          "Management traffic because all database calls are OOB operations.",
          "East-west through source leaf, spine and destination leaf."
        ]
      },
      {
        "questionId": "s6-g3-t3-Q02",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does east-west mean packets are trusted?",
        "answer": "No.",
        "explanation": "Traffic relationship does not grant authorization.",
        "testedConcept": "Does east-west mean packets are trusted?"
      },
      {
        "questionId": "s6-g3-t3-Q03",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What changes if both peers move to the same leaf?",
        "answer": "The scoped path can bypass the spine envelope.",
        "explanation": "The logical application relationship can remain the same.",
        "testedConcept": "What changes if both peers move to the same leaf?"
      },
      {
        "questionId": "s6-g3-t3-Q04",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is average daily replication bandwidth insufficient for capacity planning?",
        "answer": "Synchronized bursts and failure-state demand can exceed the average.",
        "explanation": "Time distribution affects queueing and recovery.",
        "testedConcept": "Why is average daily replication bandwidth insufficient for capacity planning?"
      },
      {
        "questionId": "s6-g3-t3-Q05",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can the sum of all server port rates be called measured east-west demand?",
        "answer": "No.",
        "explanation": "It is potential attachment capacity.",
        "testedConcept": "Can the sum of all server port rates be called measured east-west demand?"
      },
      {
        "questionId": "s6-g3-t3-Q06",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which latency matters to an application-to-database call?",
        "answer": "The original transaction latency and its path/dependency context.",
        "explanation": "A link-speed label omits queueing and processing.",
        "testedConcept": "Which latency matters to an application-to-database call?"
      },
      {
        "questionId": "s6-g3-t3-Q07",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why locate enforcement along the actual peer path?",
        "answer": "A policy on a bypassed boundary is not consumed.",
        "explanation": "Placement determines the effective consumer.",
        "testedConcept": "Why locate enforcement along the actual peer path?"
      },
      {
        "questionId": "s6-g3-t3-Q08",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How can replica placement affect recovery traffic?",
        "answer": "Rebuild or resynchronization can concentrate additional inter-leaf work.",
        "explanation": "Failure-state workload may differ from normal operation.",
        "testedConcept": "How can replica placement affect recovery traffic?"
      },
      {
        "questionId": "s6-g3-t3-Q09",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does classifying a flow as east-west identify its TCP port?",
        "answer": "No.",
        "explanation": "The actual application tuple must be inventoried.",
        "testedConcept": "Does classifying a flow as east-west identify its TCP port?"
      },
      {
        "questionId": "s6-g3-t3-Q10",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies an east-west recovery?",
        "answer": "Original peer transactions and required policy behavior after exact restoration.",
        "explanation": "Route or link presence alone is incomplete.",
        "testedConcept": "What verifies an east-west recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t3-QC1",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does east-west mean packets are trusted?",
        "answer": "No.",
        "explanation": "Traffic relationship does not grant authorization.",
        "testedConcept": "Does east-west mean packets are trusted?"
      },
      {
        "questionId": "s6-g3-t3-QC2",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can the sum of all server port rates be called measured east-west demand?",
        "answer": "No.",
        "explanation": "It is potential attachment capacity.",
        "testedConcept": "Can the sum of all server port rates be called measured east-west demand?"
      },
      {
        "questionId": "s6-g3-t3-QC3",
        "topicId": "s6-g3-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does classifying a flow as east-west identify its TCP port?",
        "answer": "No.",
        "explanation": "The actual application tuple must be inventoried.",
        "testedConcept": "Does classifying a flow as east-west identify its TCP port?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t4",
    "batch": "16",
    "title": "North-South Traffic",
    "subtitle": "Record actual ingress/egress, service tuple, publication, return path and policy consumers.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t4",
    "definition": "North-south traffic crosses the data-center context boundary, such as external clients accessing a published service. It may traverse edge routing, firewalls and load-balancing/service dependencies before reaching the endpoint fabric. The classification does not prove any particular Internet or security topology.",
    "purpose": "Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity.",
    "mental": "Trace external source → intended edge/service boundary → endpoint attachment, then trace the response separately. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Boundary crossing: External-to-DC relationship. Not a specific device chain.",
      "Publication: Exposed service mapping. Requires policy and return path.",
      "Edge envelope: External path capacity. Separate from fabric sums.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Trace external source → intended edge/service boundary → endpoint attachment, then trace the response separately.",
      "Published identity, route, translation and service policy can make configured reachability differ from authorized original use.",
      "Edge failure or path asymmetry can change capacity and stateful inspection outcomes even when leaf-spine links remain healthy."
    ],
    "flow": [
      [
        "Map the original operation",
        "North-south traffic crosses the data-center context boundary, such as external clients accessing a published service. It may traverse edge routing, firewalls and load-balancing/service dependencies before reaching the endpoint fabric. The classification does not prove any particular Internet or security topology."
      ],
      [
        "Trace the first boundary",
        "Trace external source → intended edge/service boundary → endpoint attachment, then trace the response separately."
      ],
      [
        "Evaluate installed conditions",
        "Published identity, route, translation and service policy can make configured reachability differ from authorized original use."
      ],
      [
        "Verify capacity and recovery",
        "Edge failure or path asymmetry can change capacity and stateful inspection outcomes even when leaf-spine links remain healthy."
      ]
    ],
    "comparison": [
      [
        "Boundary crossing",
        "External-to-DC relationship",
        "Not a specific device chain."
      ],
      [
        "Publication",
        "Exposed service mapping",
        "Requires policy and return path."
      ],
      [
        "Edge envelope",
        "External path capacity",
        "Separate from fabric sums."
      ]
    ],
    "example": "Case: An external client requests a published HTTPS application. Which traffic relationship applies? Answer: North-south. Reason: The operation crosses the data-center context boundary. Case: What must be traced besides the forward publication? Answer: The actual response route and stateful policy context. Reason: One-way reachability is incomplete. Case: Should BMC access be published with the user application? Answer: No; preserve a separately protected management boundary. Reason: Privileged management is a different operation.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity.",
        "expected": "Capture observer and timestamp. The original external authorized transaction and intended prohibited operations. An internal link test alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why is an inter-leaf capacity calculation insufficient for the whole published service?",
        "Edge links, inspection, translation and service processing can constrain it. The end-to-end chain contains other envelopes."
      ],
      [
        "Does an edge permit authenticate the application user?",
        "No. Network permission and application identity are separate."
      ],
      [
        "What rate belongs in an external demand record?",
        "Observed offered workload at the stated external/service observer. Internal port sums are not that demand."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Restrict publication to named operations and protect management separately. An edge firewall permit is not application authorization, and a returned response needs its actual identity/trust context.",
    "performance": "Edge links, translation/inspection, service processing and endpoint queues may bottleneck before the fabric. Track original external transaction percentiles and offered rate rather than only internal switch counters.",
    "mistakes": [
      "The actual implemented path must be traced.",
      "One-way reachability is incomplete.",
      "Internal health does not settle external service success.",
      "Privileged management is a different operation."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s6-g3-t5"
    ],
    "lab": {
      "objective": "Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → North-South Traffic boundary",
        "Boundary crossing → Publication → Edge envelope",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record actual ingress/egress, service tuple, publication, return path and policy consumers. Compare external demand with both edge and fabric failure envelopes rather than applying an inter-leaf number as the entire service capacity.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Boundary crossing, Publication and Edge envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Edge failure or path asymmetry can change capacity and stateful inspection outcomes even when leaf-spine links remain healthy. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "The original external authorized transaction and intended prohibited operations. An internal link test alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Boundary crossing → Publication → Edge envelope. Network permission and application identity are separate. Internal port sums are not that demand.",
      "challenge": "Should BMC access be published with the user application? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Boundary crossing": "External-to-DC relationship. Not a specific device chain.",
      "Publication": "Exposed service mapping. Requires policy and return path.",
      "Edge envelope": "External path capacity. Separate from fabric sums."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t4-Q01",
        "topicId": "s6-g3-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An external client requests a published HTTPS application. Which traffic relationship applies?",
        "answer": "North-south.",
        "explanation": "The operation crosses the data-center context boundary.",
        "testedConcept": "An external client requests a published HTTPS application. Which traffic relationship applies?",
        "options": [
          "Out-of-band management because HTTPS is used.",
          "Same-leaf local traffic regardless of the external source.",
          "North-south.",
          "East-west because the destination is a server."
        ]
      },
      {
        "questionId": "s6-g3-t4-Q02",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does the north-south label prove the flow crossed a firewall?",
        "answer": "No.",
        "explanation": "The actual implemented path must be traced.",
        "testedConcept": "Does the north-south label prove the flow crossed a firewall?"
      },
      {
        "questionId": "s6-g3-t4-Q03",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is an inter-leaf capacity calculation insufficient for the whole published service?",
        "answer": "Edge links, inspection, translation and service processing can constrain it.",
        "explanation": "The end-to-end chain contains other envelopes.",
        "testedConcept": "Why is an inter-leaf capacity calculation insufficient for the whole published service?"
      },
      {
        "questionId": "s6-g3-t4-Q04",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What must be traced besides the forward publication?",
        "answer": "The actual response route and stateful policy context.",
        "explanation": "One-way reachability is incomplete.",
        "testedConcept": "What must be traced besides the forward publication?"
      },
      {
        "questionId": "s6-g3-t4-Q05",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an edge permit authenticate the application user?",
        "answer": "No.",
        "explanation": "Network permission and application identity are separate.",
        "testedConcept": "Does an edge permit authenticate the application user?"
      },
      {
        "questionId": "s6-g3-t4-Q06",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "The fabric is healthy but external users fail. Where should evidence expand?",
        "answer": "Edge path, publication, DNS, policy and original application response.",
        "explanation": "Internal health does not settle external service success.",
        "testedConcept": "The fabric is healthy but external users fail. Where should evidence expand?"
      },
      {
        "questionId": "s6-g3-t4-Q07",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why can path asymmetry affect a stateful service?",
        "answer": "The response may miss the device holding required connection state.",
        "explanation": "Topology and policy consumption interact.",
        "testedConcept": "Why can path asymmetry affect a stateful service?"
      },
      {
        "questionId": "s6-g3-t4-Q08",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should BMC access be published with the user application?",
        "answer": "No; preserve a separately protected management boundary.",
        "explanation": "Privileged management is a different operation.",
        "testedConcept": "Should BMC access be published with the user application?"
      },
      {
        "questionId": "s6-g3-t4-Q09",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What rate belongs in an external demand record?",
        "answer": "Observed offered workload at the stated external/service observer.",
        "explanation": "Internal port sums are not that demand.",
        "testedConcept": "What rate belongs in an external demand record?"
      },
      {
        "questionId": "s6-g3-t4-Q10",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies north-south recovery?",
        "answer": "The original external authorized transaction and intended prohibited operations.",
        "explanation": "An internal link test alone is insufficient.",
        "testedConcept": "What verifies north-south recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t4-QC1",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does the north-south label prove the flow crossed a firewall?",
        "answer": "No.",
        "explanation": "The actual implemented path must be traced.",
        "testedConcept": "Does the north-south label prove the flow crossed a firewall?"
      },
      {
        "questionId": "s6-g3-t4-QC2",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an edge permit authenticate the application user?",
        "answer": "No.",
        "explanation": "Network permission and application identity are separate.",
        "testedConcept": "Does an edge permit authenticate the application user?"
      },
      {
        "questionId": "s6-g3-t4-QC3",
        "topicId": "s6-g3-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What rate belongs in an external demand record?",
        "answer": "Observed offered workload at the stated external/service observer.",
        "explanation": "Internal port sums are not that demand.",
        "testedConcept": "What rate belongs in an external demand record?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t5",
    "batch": "16",
    "title": "Oversubscription",
    "subtitle": "Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t5",
    "definition": "Oversubscription compares declared potential offered capacity with the shared forwarding envelope. A port-sum ratio is a design indicator, not measured traffic, packet loss, utilization or per-flow throughput. The numerator, denominator, direction and failure state must be named.",
    "purpose": "Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here.",
    "mental": "Sum declared downlink count × rate and divide by available uplink count × rate in the symmetric worksheet. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Symmetric per-leaf downlink/uplink envelope with supplied lost links; same-leaf path bypasses spine budget. No routing, ECMP per-flow prediction, queueing or measured traffic. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Port sum: Potential attachment rate. Not offered workload.",
      "Shared envelope: Surviving uplink sum. Direction and failure state matter.",
      "Ratio: Potential/shared capacity. Not a loss percentage.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Sum declared downlink count × rate and divide by available uplink count × rate in the symmetric worksheet.",
      "A lost uplink changes the denominator; a design acceptable under healthy demand may fail its recovery envelope.",
      "Same-leaf traffic can bypass the inter-leaf denominator, while bursts, hashing and asymmetric demand can constrain particular paths before average aggregate capacity is exhausted."
    ],
    "flow": [
      [
        "Map the original operation",
        "Oversubscription compares declared potential offered capacity with the shared forwarding envelope. A port-sum ratio is a design indicator, not measured traffic, packet loss, utilization or per-flow throughput. The numerator, denominator, direction and failure state must be named."
      ],
      [
        "Trace the first boundary",
        "Sum declared downlink count × rate and divide by available uplink count × rate in the symmetric worksheet."
      ],
      [
        "Evaluate installed conditions",
        "A lost uplink changes the denominator; a design acceptable under healthy demand may fail its recovery envelope."
      ],
      [
        "Verify capacity and recovery",
        "Same-leaf traffic can bypass the inter-leaf denominator, while bursts, hashing and asymmetric demand can constrain particular paths before average aggregate capacity is exhausted."
      ]
    ],
    "comparison": [
      [
        "Port sum",
        "Potential attachment rate",
        "Not offered workload."
      ],
      [
        "Shared envelope",
        "Surviving uplink sum",
        "Direction and failure state matter."
      ],
      [
        "Ratio",
        "Potential/shared capacity",
        "Not a loss percentage."
      ]
    ],
    "example": "Case: What is the ratio for 48×25 Gb/s downlinks and 2×100 Gb/s uplinks? Answer: 6:1. Reason: 1200 divided by 200. Case: Can 150 Gb/s inter-leaf demand fit the healthy stated envelope? Answer: Yes at the aggregate-envelope level only. Reason: 150 is below 200; hashing and other costs remain unproven. Case: Does same-leaf traffic necessarily consume the spine envelope? Answer: No in this worksheet scope. Reason: Locality changes the shared boundary.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here.",
        "expected": "Capture observer and timestamp. Representative offered-demand/latency evidence in healthy and stated-loss conditions. A computed ratio alone is incomplete. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Does 6:1 mean five out of six packets are dropped?",
        "No. The ratio compares potential capacity, not observed traffic or loss."
      ],
      [
        "Can that 150 Gb/s demand fit after one 100 Gb/s uplink loss?",
        "No in this declared envelope. 150 exceeds the surviving 100."
      ],
      [
        "Can one universal acceptable ratio serve every workload?",
        "No. Burst, replication, latency and failure requirements differ."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Congestion can impair authorized availability and monitoring. Protect required management/control paths through an explicit design rather than assuming spare nominal bandwidth guarantees them.",
    "performance": "A 6:1 potential ratio can be acceptable for a measured sparse workload and unsuitable for synchronized replication. No universal safe ratio is asserted; evaluate traffic and surviving-path requirements.",
    "mistakes": [
      "The numerator remains 1200 while the denominator falls to 100.",
      "150 is below 200; hashing and other costs remain unproven.",
      "Adding opposite directions overstates the relevant budget.",
      "Locality changes the shared boundary."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s6-g3-t6"
    ],
    "lab": {
      "objective": "Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Oversubscription boundary",
        "Port sum → Shared envelope → Ratio",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Calculate ratios with decimal Gb/s and document both healthy and stated-loss conditions. Compare actual representative offered traffic and latency with those envelopes; no traffic generator or live congestion test is run here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Port sum, Shared envelope and Ratio. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Same-leaf traffic can bypass the inter-leaf denominator, while bursts, hashing and asymmetric demand can constrain particular paths before average aggregate capacity is exhausted. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Representative offered-demand/latency evidence in healthy and stated-loss conditions. A computed ratio alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Port sum → Shared envelope → Ratio. 150 exceeds the surviving 100. Burst, replication, latency and failure requirements differ.",
      "challenge": "Does same-leaf traffic necessarily consume the spine envelope? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Port sum": "Potential attachment rate. Not offered workload.",
      "Shared envelope": "Surviving uplink sum. Direction and failure state matter.",
      "Ratio": "Potential/shared capacity. Not a loss percentage."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t5-Q01",
        "topicId": "s6-g3-t5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "What is the ratio for 48×25 Gb/s downlinks and 2×100 Gb/s uplinks?",
        "answer": "6:1.",
        "explanation": "1200 divided by 200.",
        "testedConcept": "What is the ratio for 48×25 Gb/s downlinks and 2×100 Gb/s uplinks?",
        "options": [
          "1:6, dividing the shared envelope by the port sum.",
          "6:1.",
          "12:1, counting only one of the healthy uplinks.",
          "3:1, adding opposite duplex directions to the budget."
        ]
      },
      {
        "questionId": "s6-g3-t5-Q02",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One of those uplinks is unavailable. What is the ratio?",
        "answer": "12:1.",
        "explanation": "The numerator remains 1200 while the denominator falls to 100.",
        "testedConcept": "One of those uplinks is unavailable. What is the ratio?"
      },
      {
        "questionId": "s6-g3-t5-Q03",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 6:1 mean five out of six packets are dropped?",
        "answer": "No.",
        "explanation": "The ratio compares potential capacity, not observed traffic or loss.",
        "testedConcept": "Does 6:1 mean five out of six packets are dropped?"
      },
      {
        "questionId": "s6-g3-t5-Q04",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can 150 Gb/s inter-leaf demand fit the healthy stated envelope?",
        "answer": "Yes at the aggregate-envelope level only.",
        "explanation": "150 is below 200; hashing and other costs remain unproven.",
        "testedConcept": "Can 150 Gb/s inter-leaf demand fit the healthy stated envelope?"
      },
      {
        "questionId": "s6-g3-t5-Q05",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can that 150 Gb/s demand fit after one 100 Gb/s uplink loss?",
        "answer": "No in this declared envelope.",
        "explanation": "150 exceeds the surviving 100.",
        "testedConcept": "Can that 150 Gb/s demand fit after one 100 Gb/s uplink loss?"
      },
      {
        "questionId": "s6-g3-t5-Q06",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why state direction when comparing duplex rates?",
        "answer": "One-direction demand must use one-direction capacity.",
        "explanation": "Adding opposite directions overstates the relevant budget.",
        "testedConcept": "Why state direction when comparing duplex rates?"
      },
      {
        "questionId": "s6-g3-t5-Q07",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What happens to the ratio with no surviving uplinks?",
        "answer": "No finite uplink ratio or usable inter-leaf uplink path exists.",
        "explanation": "Do not divide by zero or call the path healthy.",
        "testedConcept": "What happens to the ratio with no surviving uplinks?"
      },
      {
        "questionId": "s6-g3-t5-Q08",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does same-leaf traffic necessarily consume the spine envelope?",
        "answer": "No in this worksheet scope.",
        "explanation": "Locality changes the shared boundary.",
        "testedConcept": "Does same-leaf traffic necessarily consume the spine envelope?"
      },
      {
        "questionId": "s6-g3-t5-Q09",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can one universal acceptable ratio serve every workload?",
        "answer": "No.",
        "explanation": "Burst, replication, latency and failure requirements differ.",
        "testedConcept": "Can one universal acceptable ratio serve every workload?"
      },
      {
        "questionId": "s6-g3-t5-Q10",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a capacity design?",
        "answer": "Representative offered-demand/latency evidence in healthy and stated-loss conditions.",
        "explanation": "A computed ratio alone is incomplete.",
        "testedConcept": "What verifies a capacity design?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t5-QC1",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One of those uplinks is unavailable. What is the ratio?",
        "answer": "12:1.",
        "explanation": "The numerator remains 1200 while the denominator falls to 100.",
        "testedConcept": "One of those uplinks is unavailable. What is the ratio?"
      },
      {
        "questionId": "s6-g3-t5-QC2",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can that 150 Gb/s demand fit after one 100 Gb/s uplink loss?",
        "answer": "No in this declared envelope.",
        "explanation": "150 exceeds the surviving 100.",
        "testedConcept": "Can that 150 Gb/s demand fit after one 100 Gb/s uplink loss?"
      },
      {
        "questionId": "s6-g3-t5-QC3",
        "topicId": "s6-g3-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can one universal acceptable ratio serve every workload?",
        "answer": "No.",
        "explanation": "Burst, replication, latency and failure requirements differ.",
        "testedConcept": "Can one universal acceptable ratio serve every workload?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t6",
    "batch": "16",
    "title": "Redundancy",
    "subtitle": "Create a failure-domain table for power, network, storage, cooling and management.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t6",
    "definition": "Redundancy duplicates resources so a specified fault can leave sufficient usable service dependencies. The claim must identify the failed component, independent remaining parents, capacity and recovery behavior. Two labels or parts do not establish independence or successful application continuity.",
    "purpose": "Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented.",
    "mental": "Draw each resource path to its upstream power, chassis, controller and network parents to expose common failures. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Duplicate: Additional resource. May share every parent.",
      "Independent path: Distinct relevant failure domain. Must be traced.",
      "Surviving capacity: Required load after fault. Cannot sum the failed path.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Draw each resource path to its upstream power, chassis, controller and network parents to expose common failures.",
      "Remove the named dependency in a declared design and compare required full load with the surviving envelope.",
      "Restore the exact prior state and retest original service/policy behavior; spare resources and documented failover are hypotheses until the relevant observation exists."
    ],
    "flow": [
      [
        "Map the original operation",
        "Redundancy duplicates resources so a specified fault can leave sufficient usable service dependencies. The claim must identify the failed component, independent remaining parents, capacity and recovery behavior. Two labels or parts do not establish independence or successful application continuity."
      ],
      [
        "Trace the first boundary",
        "Draw each resource path to its upstream power, chassis, controller and network parents to expose common failures."
      ],
      [
        "Evaluate installed conditions",
        "Remove the named dependency in a declared design and compare required full load with the surviving envelope."
      ],
      [
        "Verify capacity and recovery",
        "Restore the exact prior state and retest original service/policy behavior; spare resources and documented failover are hypotheses until the relevant observation exists."
      ]
    ],
    "comparison": [
      [
        "Duplicate",
        "Additional resource",
        "May share every parent."
      ],
      [
        "Independent path",
        "Distinct relevant failure domain",
        "Must be traced."
      ],
      [
        "Surviving capacity",
        "Required load after fault",
        "Cannot sum the failed path."
      ]
    ],
    "example": "Case: Two PSUs connect to the same UPS. Is UPS failure diversity present? Answer: No. Reason: The UPS is a shared upstream parent. Case: Why distinguish a spare from an active independent path? Answer: A spare may require replacement/rebuild before service returns. Reason: Availability and recovery timing differ. Case: Why include maintenance in failure analysis? Answer: A planned removal can combine with an unrelated fault. Reason: The design must state which simultaneous conditions it supports.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented.",
        "expected": "Capture observer and timestamp. Original allowed/prohibited operations under the named fault and after exact restore. Component presence is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Does normal 4.5 kW load on each feed settle the previous question?",
        "No. Loss moves the full 9 kW onto one path."
      ],
      [
        "Two switches have separate cords in one tray. What common domain remains?",
        "The shared cable route and possibly upstream supplies. Multiple parts can share physical parents."
      ],
      [
        "Does cooling unit count alone prove required resilience?",
        "No. Available removal, airflow and control/power parents matter."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Duplicate controls can share credentials or management failures. Preserve independent recovery and backup ownership rather than assuming identical components are security diversity.",
    "performance": "Healthy load sharing can hide an overloaded survivor. Reserve the specified loss-state capacity, not merely average spare percentage; every common parent and maintenance scenario changes the requirement.",
    "mistakes": [
      "Either survivor must carry all 9 kW.",
      "Availability and recovery timing differ.",
      "Credential compromise remains correlated.",
      "The design must state which simultaneous conditions it supports."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g3-t7"
    ],
    "lab": {
      "objective": "Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Redundancy boundary",
        "Duplicate → Independent path → Surviving capacity",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Create a failure-domain table for power, network, storage, cooling and management. Use the A/B power worksheet for one explicit full-load case and keep other domains and service recovery separately documented.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Duplicate, Independent path and Surviving capacity. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Restore the exact prior state and retest original service/policy behavior; spare resources and documented failover are hypotheses until the relevant observation exists. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Original allowed/prohibited operations under the named fault and after exact restore. Component presence is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Duplicate → Independent path → Surviving capacity. Multiple parts can share physical parents. Available removal, airflow and control/power parents matter.",
      "challenge": "Why include maintenance in failure analysis? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Duplicate": "Additional resource. May share every parent.",
      "Independent path": "Distinct relevant failure domain. Must be traced.",
      "Surviving capacity": "Required load after fault. Cannot sum the failed path."
    },
    "sources": [
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t6-Q01",
        "topicId": "s6-g3-t6",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two PSUs connect to the same UPS. Is UPS failure diversity present?",
        "answer": "No.",
        "explanation": "The UPS is a shared upstream parent.",
        "testedConcept": "Two PSUs connect to the same UPS. Is UPS failure diversity present?",
        "options": [
          "No.",
          "Yes; two PSU labels establish UPS diversity.",
          "Yes if the two cords use different colors.",
          "Yes if normal load is divided equally between the supplies."
        ]
      },
      {
        "questionId": "s6-g3-t6-Q02",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Each path allows 8 kW and rack load is 9 kW. Is A/B full-load resilience satisfied?",
        "answer": "No.",
        "explanation": "Either survivor must carry all 9 kW.",
        "testedConcept": "Each path allows 8 kW and rack load is 9 kW. Is A/B full-load resilience satisfied?"
      },
      {
        "questionId": "s6-g3-t6-Q03",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does normal 4.5 kW load on each feed settle the previous question?",
        "answer": "No.",
        "explanation": "Loss moves the full 9 kW onto one path.",
        "testedConcept": "Does normal 4.5 kW load on each feed settle the previous question?"
      },
      {
        "questionId": "s6-g3-t6-Q04",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why distinguish a spare from an active independent path?",
        "answer": "A spare may require replacement/rebuild before service returns.",
        "explanation": "Availability and recovery timing differ.",
        "testedConcept": "Why distinguish a spare from an active independent path?"
      },
      {
        "questionId": "s6-g3-t6-Q05",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two switches have separate cords in one tray. What common domain remains?",
        "answer": "The shared cable route and possibly upstream supplies.",
        "explanation": "Multiple parts can share physical parents.",
        "testedConcept": "Two switches have separate cords in one tray. What common domain remains?"
      },
      {
        "questionId": "s6-g3-t6-Q06",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can duplicate administrators with one shared credential improve identity isolation?",
        "answer": "No.",
        "explanation": "Credential compromise remains correlated.",
        "testedConcept": "Can duplicate administrators with one shared credential improve identity isolation?"
      },
      {
        "questionId": "s6-g3-t6-Q07",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a redundancy claim name?",
        "answer": "The fault, surviving parents, required capacity and service recovery requirement.",
        "explanation": "Unqualified redundant is too broad.",
        "testedConcept": "What should a redundancy claim name?"
      },
      {
        "questionId": "s6-g3-t6-Q08",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why include maintenance in failure analysis?",
        "answer": "A planned removal can combine with an unrelated fault.",
        "explanation": "The design must state which simultaneous conditions it supports.",
        "testedConcept": "Why include maintenance in failure analysis?"
      },
      {
        "questionId": "s6-g3-t6-Q09",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does cooling unit count alone prove required resilience?",
        "answer": "No.",
        "explanation": "Available removal, airflow and control/power parents matter.",
        "testedConcept": "Does cooling unit count alone prove required resilience?"
      },
      {
        "questionId": "s6-g3-t6-Q10",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a redundancy rehearsal?",
        "answer": "Original allowed/prohibited operations under the named fault and after exact restore.",
        "explanation": "Component presence is insufficient.",
        "testedConcept": "What verifies a redundancy rehearsal?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t6-QC1",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Each path allows 8 kW and rack load is 9 kW. Is A/B full-load resilience satisfied?",
        "answer": "No.",
        "explanation": "Either survivor must carry all 9 kW.",
        "testedConcept": "Each path allows 8 kW and rack load is 9 kW. Is A/B full-load resilience satisfied?"
      },
      {
        "questionId": "s6-g3-t6-QC2",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two switches have separate cords in one tray. What common domain remains?",
        "answer": "The shared cable route and possibly upstream supplies.",
        "explanation": "Multiple parts can share physical parents.",
        "testedConcept": "Two switches have separate cords in one tray. What common domain remains?"
      },
      {
        "questionId": "s6-g3-t6-QC3",
        "topicId": "s6-g3-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does cooling unit count alone prove required resilience?",
        "answer": "No.",
        "explanation": "Available removal, airflow and control/power parents matter.",
        "testedConcept": "Does cooling unit count alone prove required resilience?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g3-t7",
    "batch": "16",
    "title": "High Availability",
    "subtitle": "Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g3-t7",
    "definition": "High availability is an operational service outcome under specified faults and recovery requirements. It combines independent capacity, detection, failover, state/data handling and original-user observations. Redundant components support the design but do not by themselves prove acceptable recovery time or data loss.",
    "purpose": "Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately.",
    "mental": "Detection and failover must leave an eligible usable dependency path; surviving capacity and control/state behavior must support the original operation. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Supplied named-fault eligibility, capacity, original service/policy observation and recovery/data-age intervals compared with declared targets. No live failover, replication or availability percentage. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "RTO: Required recovery-time objective. Specify start and verified finish.",
      "RPO: Required recoverable-data age. Different from downtime.",
      "Service observation: Original completed operation. Stronger than component health.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Detection and failover must leave an eligible usable dependency path; surviving capacity and control/state behavior must support the original operation.",
      "Measure recovery interval from the agreed event/start to verified original success, and compare it with the stated recovery-time requirement.",
      "Compare the newest recoverable data with the stated recovery-point requirement; component uptime and service/data recovery are distinct measurements."
    ],
    "flow": [
      [
        "Map the original operation",
        "High availability is an operational service outcome under specified faults and recovery requirements. It combines independent capacity, detection, failover, state/data handling and original-user observations. Redundant components support the design but do not by themselves prove acceptable recovery time or data loss."
      ],
      [
        "Trace the first boundary",
        "Detection and failover must leave an eligible usable dependency path; surviving capacity and control/state behavior must support the original operation."
      ],
      [
        "Evaluate installed conditions",
        "Measure recovery interval from the agreed event/start to verified original success, and compare it with the stated recovery-time requirement."
      ],
      [
        "Verify capacity and recovery",
        "Compare the newest recoverable data with the stated recovery-point requirement; component uptime and service/data recovery are distinct measurements."
      ]
    ],
    "comparison": [
      [
        "RTO",
        "Required recovery-time objective",
        "Specify start and verified finish."
      ],
      [
        "RPO",
        "Required recoverable-data age",
        "Different from downtime."
      ],
      [
        "Service observation",
        "Original completed operation",
        "Stronger than component health."
      ]
    ],
    "example": "Case: Failover takes 25 s with a 30 s recovery target. Is the timing requirement met for that recorded interval? Answer: Yes for the supplied observation. Reason: 25 is within 30; other eligibility/data/service conditions remain separate. Case: What timestamp ends a useful recovery measurement? Answer: Verified completion of the agreed original service operation. Reason: A link or process becoming healthy can occur earlier. Case: Why preserve client retry behavior in the rehearsal? Answer: It can affect when useful service resumes. Reason: Control-plane convergence alone is not user recovery time.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately.",
        "expected": "Capture observer and timestamp. Named fault/observer, surviving capacity, recovery and data intervals, original service/policy checks and exact restore. A redundant label or health icon is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Recoverable data is 12 min old but the RPO is 10 min. Is the data requirement met?",
        "No. Recovery timing success does not repair excessive data age."
      ],
      [
        "Why state the tested fault set?",
        "Different shared or simultaneous failures can exceed the design. An observed single-fault result is not universal availability."
      ],
      [
        "What is excluded from the worksheet?",
        "Live failover, data replication and statistically measured availability. Inputs are supplied observations, not generated events."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Failover must retain authorization and data integrity, not merely make an endpoint answer. Protect recovery credentials and replicated state, and test the independently scoped management path.",
    "performance": "Capacity, convergence, retry behavior and repair work can raise latency during faults. The worksheet compares supplied intervals to targets and never derives an availability percentage from unsupported component probabilities.",
    "mistakes": [
      "State, capacity, failover and original service must work.",
      "A link or process becoming healthy can occur earlier.",
      "Service continuity must preserve policy.",
      "Control-plane convergence alone is not user recovery time."
    ],
    "prerequisites": [
      "s6-g3-t6"
    ],
    "related": [
      "s6-g4-t0"
    ],
    "lab": {
      "objective": "Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → High Availability boundary",
        "RTO → RPO → Service observation",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Define the service, fault set, observer, recovery timing boundary and allowable data age before a rehearsal. Enter declared recovery/data observations into the worksheet and retain the original permitted/prohibited service results separately.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using RTO, RPO and Service observation. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Compare the newest recoverable data with the stated recovery-point requirement; component uptime and service/data recovery are distinct measurements. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Named fault/observer, surviving capacity, recovery and data intervals, original service/policy checks and exact restore. A redundant label or health icon is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "RTO → RPO → Service observation. An observed single-fault result is not universal availability. Inputs are supplied observations, not generated events.",
      "challenge": "Why preserve client retry behavior in the rehearsal? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "RTO": "Required recovery-time objective. Specify start and verified finish.",
      "RPO": "Required recoverable-data age. Different from downtime.",
      "Service observation": "Original completed operation. Stronger than component health."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      },
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g3-t7-Q01",
        "topicId": "s6-g3-t7",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Failover takes 25 s with a 30 s recovery target. Is the timing requirement met for that recorded interval?",
        "answer": "Yes for the supplied observation.",
        "explanation": "25 is within 30; other eligibility/data/service conditions remain separate.",
        "testedConcept": "Failover takes 25 s with a 30 s recovery target. Is the timing requirement met for that recorded interval?",
        "options": [
          "No; any nonzero recovery interval violates a 30 s target.",
          "No; the target must be exceeded to count as recovery.",
          "Yes, and the timing automatically proves every data-age and permission requirement.",
          "Yes for the supplied observation."
        ]
      },
      {
        "questionId": "s6-g3-t7-Q02",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an available second server prove high availability?",
        "answer": "No.",
        "explanation": "State, capacity, failover and original service must work.",
        "testedConcept": "Does an available second server prove high availability?"
      },
      {
        "questionId": "s6-g3-t7-Q03",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Recoverable data is 12 min old but the RPO is 10 min. Is the data requirement met?",
        "answer": "No.",
        "explanation": "Recovery timing success does not repair excessive data age.",
        "testedConcept": "Recoverable data is 12 min old but the RPO is 10 min. Is the data requirement met?"
      },
      {
        "questionId": "s6-g3-t7-Q04",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What timestamp ends a useful recovery measurement?",
        "answer": "Verified completion of the agreed original service operation.",
        "explanation": "A link or process becoming healthy can occur earlier.",
        "testedConcept": "What timestamp ends a useful recovery measurement?"
      },
      {
        "questionId": "s6-g3-t7-Q05",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why state the tested fault set?",
        "answer": "Different shared or simultaneous failures can exceed the design.",
        "explanation": "An observed single-fault result is not universal availability.",
        "testedConcept": "Why state the tested fault set?"
      },
      {
        "questionId": "s6-g3-t7-Q06",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a recovery that opens unauthorized operations be accepted?",
        "answer": "No.",
        "explanation": "Service continuity must preserve policy.",
        "testedConcept": "Can a recovery that opens unauthorized operations be accepted?"
      },
      {
        "questionId": "s6-g3-t7-Q07",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does component uptime directly determine application availability?",
        "answer": "No.",
        "explanation": "Dependencies and original transaction outcomes matter.",
        "testedConcept": "Does component uptime directly determine application availability?"
      },
      {
        "questionId": "s6-g3-t7-Q08",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why preserve client retry behavior in the rehearsal?",
        "answer": "It can affect when useful service resumes.",
        "explanation": "Control-plane convergence alone is not user recovery time.",
        "testedConcept": "Why preserve client retry behavior in the rehearsal?"
      },
      {
        "questionId": "s6-g3-t7-Q09",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is excluded from the worksheet?",
        "answer": "Live failover, data replication and statistically measured availability.",
        "explanation": "Inputs are supplied observations, not generated events.",
        "testedConcept": "What is excluded from the worksheet?"
      },
      {
        "questionId": "s6-g3-t7-Q10",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes an HA acceptance record?",
        "answer": "Named fault/observer, surviving capacity, recovery and data intervals, original service/policy checks and exact restore.",
        "explanation": "A redundant label or health icon is insufficient.",
        "testedConcept": "What completes an HA acceptance record?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g3-t7-QC1",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an available second server prove high availability?",
        "answer": "No.",
        "explanation": "State, capacity, failover and original service must work.",
        "testedConcept": "Does an available second server prove high availability?"
      },
      {
        "questionId": "s6-g3-t7-QC2",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why state the tested fault set?",
        "answer": "Different shared or simultaneous failures can exceed the design.",
        "explanation": "An observed single-fault result is not universal availability.",
        "testedConcept": "Why state the tested fault set?"
      },
      {
        "questionId": "s6-g3-t7-QC3",
        "topicId": "s6-g3-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is excluded from the worksheet?",
        "answer": "Live failover, data replication and statistically measured availability.",
        "explanation": "Inputs are supplied observations, not generated events.",
        "testedConcept": "What is excluded from the worksheet?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t0",
    "batch": "16",
    "title": "Rack design",
    "subtitle": "Produce three named elevations and a per-rack capacity worksheet.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t0",
    "definition": "Rack design coordinates vertical placement, mass, dimensions, rails, power, cooling, cabling and service access. The original lab uses three 42U racks and separate documented capacity paths. Free U is a planning resource rather than permission to install unsupported equipment.",
    "purpose": "Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.",
    "mental": "Assign inclusive U intervals and detect overlap/out-of-range endpoints, then validate depth, rails, mass and floor/cabinet support separately. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Elevation: Numbered vertical placement. Check inclusive intervals.",
      "Physical envelope: Depth, rails, mass and access. Not captured by U alone.",
      "Capacity worksheet: Per-rack surviving limits. Includes explicit units.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Assign inclusive U intervals and detect overlap/out-of-range endpoints, then validate depth, rails, mass and floor/cabinet support separately.",
      "Align installed equipment airflow with cold-front/hot-rear layout and blank unused openings using supported materials.",
      "Trace every cord and cable with both endpoints, service travel and independent-path intent; additions must fit the surviving power envelope."
    ],
    "flow": [
      [
        "Map the original operation",
        "Rack design coordinates vertical placement, mass, dimensions, rails, power, cooling, cabling and service access. The original lab uses three 42U racks and separate documented capacity paths. Free U is a planning resource rather than permission to install unsupported equipment."
      ],
      [
        "Trace the first boundary",
        "Assign inclusive U intervals and detect overlap/out-of-range endpoints, then validate depth, rails, mass and floor/cabinet support separately."
      ],
      [
        "Evaluate installed conditions",
        "Align installed equipment airflow with cold-front/hot-rear layout and blank unused openings using supported materials."
      ],
      [
        "Verify capacity and recovery",
        "Trace every cord and cable with both endpoints, service travel and independent-path intent; additions must fit the surviving power envelope."
      ]
    ],
    "comparison": [
      [
        "Elevation",
        "Numbered vertical placement",
        "Check inclusive intervals."
      ],
      [
        "Physical envelope",
        "Depth, rails, mass and access",
        "Not captured by U alone."
      ],
      [
        "Capacity worksheet",
        "Per-rack surviving limits",
        "Includes explicit units."
      ]
    ],
    "example": "Case: A 2U device starts at U15. What interval should be marked? Answer: U15–U16. Reason: Height counts occupied units including the start. Case: What happens if a proposed interval intersects an existing device? Answer: The declared elevation is invalid. Reason: No shared occupied U is allowed in this model. Case: What should a cable plan retain besides its color? Answer: Endpoint ports, medium/optic, length, route and service slack. Reason: Color alone is not exact restoration evidence.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.",
        "expected": "Capture observer and timestamp. Valid elevations plus supported physical, full-load power, thermal, cable and recovery records. The browser does not certify installation. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why show both front and rear installation context?",
        "Airflow, rails, cable access and service clearance differ. One flat elevation is not the whole physical envelope."
      ],
      [
        "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?",
        "No. The new 9 kW exceeds the single-path allowance."
      ],
      [
        "Why place capacity and failure domains on the elevation record?",
        "A rack-local drawing can otherwise hide upstream shared constraints. Mechanical fit is only one requirement."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Control rack/console access and media custody. Hide real serial-to-tenant relationships from public diagrams while retaining authorized recovery mapping.",
    "performance": "Dense racks can run out of heat removal, circuit/phase/outlet capacity or port/cable access before U positions. Reserve the binding resource explicitly rather than a universal density target.",
    "mistakes": [
      "Its end would be U43.",
      "No shared occupied U is allowed in this model.",
      "Mass, cabinet/floor ratings and installation approval are separate.",
      "Color alone is not exact restoration evidence."
    ],
    "prerequisites": [
      "s6-g0-t0"
    ],
    "related": [
      "s6-g4-t1"
    ],
    "lab": {
      "objective": "Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Rack design boundary",
        "Elevation → Physical envelope → Capacity worksheet",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Elevation, Physical envelope and Capacity worksheet. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace every cord and cable with both endpoints, service travel and independent-path intent; additions must fit the surviving power envelope. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Valid elevations plus supported physical, full-load power, thermal, cable and recovery records. The browser does not certify installation. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Elevation → Physical envelope → Capacity worksheet. The new 9 kW exceeds the single-path allowance. Mechanical fit is only one requirement.",
      "challenge": "What should a cable plan retain besides its color? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Elevation": "Numbered vertical placement. Check inclusive intervals.",
      "Physical envelope": "Depth, rails, mass and access. Not captured by U alone.",
      "Capacity worksheet": "Per-rack surviving limits. Includes explicit units."
    },
    "sources": [
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      },
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t0-Q01",
        "topicId": "s6-g4-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A 2U device starts at U15. What interval should be marked?",
        "answer": "U15–U16.",
        "explanation": "Height counts occupied units including the start.",
        "testedConcept": "A 2U device starts at U15. What interval should be marked?",
        "options": [
          "U15–U17, using start plus height as the inclusive end.",
          "U14–U15, extending below the starting label.",
          "U15–U16.",
          "U15 only, because U labels already include the device height."
        ]
      },
      {
        "questionId": "s6-g4-t0-Q02",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a 2U device start at U42 in a 42U rack?",
        "answer": "No.",
        "explanation": "Its end would be U43.",
        "testedConcept": "Can a 2U device start at U42 in a 42U rack?"
      },
      {
        "questionId": "s6-g4-t0-Q03",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why show both front and rear installation context?",
        "answer": "Airflow, rails, cable access and service clearance differ.",
        "explanation": "One flat elevation is not the whole physical envelope.",
        "testedConcept": "Why show both front and rear installation context?"
      },
      {
        "questionId": "s6-g4-t0-Q04",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens if a proposed interval intersects an existing device?",
        "answer": "The declared elevation is invalid.",
        "explanation": "No shared occupied U is allowed in this model.",
        "testedConcept": "What happens if a proposed interval intersects an existing device?"
      },
      {
        "questionId": "s6-g4-t0-Q05",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?",
        "answer": "No.",
        "explanation": "The new 9 kW exceeds the single-path allowance.",
        "testedConcept": "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?"
      },
      {
        "questionId": "s6-g4-t0-Q06",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a valid U diagram certify floor loading?",
        "answer": "No.",
        "explanation": "Mass, cabinet/floor ratings and installation approval are separate.",
        "testedConcept": "Does a valid U diagram certify floor loading?"
      },
      {
        "questionId": "s6-g4-t0-Q07",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why label unused openings and blanking intent?",
        "answer": "Uncontrolled gaps can permit bypass or recirculation.",
        "explanation": "Visual empty space affects airflow.",
        "testedConcept": "Why label unused openings and blanking intent?"
      },
      {
        "questionId": "s6-g4-t0-Q08",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a cable plan retain besides its color?",
        "answer": "Endpoint ports, medium/optic, length, route and service slack.",
        "explanation": "Color alone is not exact restoration evidence.",
        "testedConcept": "What should a cable plan retain besides its color?"
      },
      {
        "questionId": "s6-g4-t0-Q09",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why place capacity and failure domains on the elevation record?",
        "answer": "A rack-local drawing can otherwise hide upstream shared constraints.",
        "explanation": "Mechanical fit is only one requirement.",
        "testedConcept": "Why place capacity and failure domains on the elevation record?"
      },
      {
        "questionId": "s6-g4-t0-Q10",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes a rack-design review?",
        "answer": "Valid elevations plus supported physical, full-load power, thermal, cable and recovery records.",
        "explanation": "The browser does not certify installation.",
        "testedConcept": "What completes a rack-design review?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t0-QC1",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a 2U device start at U42 in a 42U rack?",
        "answer": "No.",
        "explanation": "Its end would be U43.",
        "testedConcept": "Can a 2U device start at U42 in a 42U rack?"
      },
      {
        "questionId": "s6-g4-t0-QC2",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?",
        "answer": "No.",
        "explanation": "The new 9 kW exceeds the single-path allowance.",
        "testedConcept": "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?"
      },
      {
        "questionId": "s6-g4-t0-QC3",
        "topicId": "s6-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why place capacity and failure domains on the elevation record?",
        "answer": "A rack-local drawing can otherwise hide upstream shared constraints.",
        "explanation": "Mechanical fit is only one requirement.",
        "testedConcept": "Why place capacity and failure domains on the elevation record?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t1",
    "batch": "16",
    "title": "Power distribution",
    "subtitle": "Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t1",
    "definition": "Power distribution delivers electricity through utility/generation, UPS/transfer arrangements, circuits, PDUs, cords and device supplies. A/B diversity requires independent relevant upstream paths and adequate full-load capacity on each survivor. Real installation also depends on voltage, current, phase balance, connectors and applicable professional/code requirements.",
    "purpose": "Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work.",
    "mental": "Trace each PSU cord through rack outlet, branch circuit, UPS and source domain; distinct colors can terminate at one common parent. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "W/kW: Real power demand. Distinct from apparent VA.",
      "A/B path: Cord through upstream domains. Names do not prove independence.",
      "Surviving envelope: Each path carries full required load. Includes explicit allowance.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Trace each PSU cord through rack outlet, branch circuit, UPS and source domain; distinct colors can terminate at one common parent.",
      "Use explicit W/kW real load and the supported ratings/allowances for every upstream element; healthy split load is not the loss-state load.",
      "Check single-cord devices and shared switch/management/cooling supply dependencies rather than assuming every required service has dual inputs."
    ],
    "flow": [
      [
        "Map the original operation",
        "Power distribution delivers electricity through utility/generation, UPS/transfer arrangements, circuits, PDUs, cords and device supplies. A/B diversity requires independent relevant upstream paths and adequate full-load capacity on each survivor. Real installation also depends on voltage, current, phase balance, connectors and applicable professional/code requirements."
      ],
      [
        "Trace the first boundary",
        "Trace each PSU cord through rack outlet, branch circuit, UPS and source domain; distinct colors can terminate at one common parent."
      ],
      [
        "Evaluate installed conditions",
        "Use explicit W/kW real load and the supported ratings/allowances for every upstream element; healthy split load is not the loss-state load."
      ],
      [
        "Verify capacity and recovery",
        "Check single-cord devices and shared switch/management/cooling supply dependencies rather than assuming every required service has dual inputs."
      ]
    ],
    "comparison": [
      [
        "W/kW",
        "Real power demand",
        "Distinct from apparent VA."
      ],
      [
        "A/B path",
        "Cord through upstream domains",
        "Names do not prove independence."
      ],
      [
        "Surviving envelope",
        "Each path carries full required load",
        "Includes explicit allowance."
      ]
    ],
    "example": "Case: Each path is rated 10 kW with an 80% declared allowance. What full-load envelope applies to each path? Answer: 8 kW. Reason: Rating times the supplied allowance. Case: Does 80% in this worksheet assert every local code rule? Answer: No. Reason: It is an invented planning input. Case: Can total kW certify safe three-phase loading? Answer: No. Reason: Phase, current, voltage, connectors and circuit ratings require separate checks.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work.",
        "expected": "Capture observer and timestamp. Complete supported cord/source mapping and full-load survivor capacity, followed by approved qualified testing where appropriate. No electrical test is executed by this worksheet. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Should A and B allowances be summed to approve a 12 kW resilient load?",
        "No. The survivor must carry the full load alone."
      ],
      [
        "Why distinguish W from VA?",
        "Real and apparent power differ and equipment has both kinds of ratings. A VA label is not guaranteed usable watts."
      ],
      [
        "Why protect switched PDU administration?",
        "It can interrupt the entire affected workload path. Outlet control is privileged infrastructure access."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Power controls can stop many services. Restrict switched-outlet and transfer permissions and protect independent recovery; never turn a design worksheet into an authorized energized-panel operation.",
    "performance": "Nameplate input, measured real power and failure-state demand differ. Use phase/outlet/circuit and UPS ratings separately; total kW alone cannot certify the physical system.",
    "mistakes": [
      "Other electrical and independence checks remain required.",
      "It is an invented planning input.",
      "Rack outlet labels hide upstream coupling.",
      "Phase, current, voltage, connectors and circuit ratings require separate checks."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t2"
    ],
    "lab": {
      "objective": "Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Power distribution boundary",
        "W/kW → A/B path → Surviving envelope",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Produce a cord-to-source schedule and per-rack/site capacity sheet from supported ratings and measured/planned load. The 80% allowance is a classroom input, not a universal electrical rule; qualified staff must approve actual circuit work.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using W/kW, A/B path and Surviving envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Check single-cord devices and shared switch/management/cooling supply dependencies rather than assuming every required service has dual inputs. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Complete supported cord/source mapping and full-load survivor capacity, followed by approved qualified testing where appropriate. No electrical test is executed by this worksheet. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "W/kW → A/B path → Surviving envelope. A VA label is not guaranteed usable watts. Outlet control is privileged infrastructure access.",
      "challenge": "Can total kW certify safe three-phase loading? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "W/kW": "Real power demand. Distinct from apparent VA.",
      "A/B path": "Cord through upstream domains. Names do not prove independence.",
      "Surviving envelope": "Each path carries full required load. Includes explicit allowance."
    },
    "sources": [
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t1-Q01",
        "topicId": "s6-g4-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Each path is rated 10 kW with an 80% declared allowance. What full-load envelope applies to each path?",
        "answer": "8 kW.",
        "explanation": "Rating times the supplied allowance.",
        "testedConcept": "Each path is rated 10 kW with an 80% declared allowance. What full-load envelope applies to each path?",
        "options": [
          "10 kW per path, ignoring the declared allowance.",
          "8 kW.",
          "20 kW per path, summing both raw ratings.",
          "16 kW per path, summing both allowed paths."
        ]
      },
      {
        "questionId": "s6-g4-t1-Q02",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Rack load is 6 kW. Can it fit either 8 kW path alone?",
        "answer": "Yes at this declared capacity level.",
        "explanation": "Other electrical and independence checks remain required.",
        "testedConcept": "Rack load is 6 kW. Can it fit either 8 kW path alone?"
      },
      {
        "questionId": "s6-g4-t1-Q03",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should A and B allowances be summed to approve a 12 kW resilient load?",
        "answer": "No.",
        "explanation": "The survivor must carry the full load alone.",
        "testedConcept": "Should A and B allowances be summed to approve a 12 kW resilient load?"
      },
      {
        "questionId": "s6-g4-t1-Q04",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 80% in this worksheet assert every local code rule?",
        "answer": "No.",
        "explanation": "It is an invented planning input.",
        "testedConcept": "Does 80% in this worksheet assert every local code rule?"
      },
      {
        "questionId": "s6-g4-t1-Q05",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why distinguish W from VA?",
        "answer": "Real and apparent power differ and equipment has both kinds of ratings.",
        "explanation": "A VA label is not guaranteed usable watts.",
        "testedConcept": "Why distinguish W from VA?"
      },
      {
        "questionId": "s6-g4-t1-Q06",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What parent should be traced beyond the rack PDU?",
        "answer": "Branch circuit, UPS/transfer and source domain.",
        "explanation": "Rack outlet labels hide upstream coupling.",
        "testedConcept": "What parent should be traced beyond the rack PDU?"
      },
      {
        "questionId": "s6-g4-t1-Q07",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What complication do single-cord required devices introduce?",
        "answer": "They need a supported transfer/redundancy design or an explicit single-path limitation.",
        "explanation": "Dual-PSU assumptions cannot be applied to them.",
        "testedConcept": "What complication do single-cord required devices introduce?"
      },
      {
        "questionId": "s6-g4-t1-Q08",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can total kW certify safe three-phase loading?",
        "answer": "No.",
        "explanation": "Phase, current, voltage, connectors and circuit ratings require separate checks.",
        "testedConcept": "Can total kW certify safe three-phase loading?"
      },
      {
        "questionId": "s6-g4-t1-Q09",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect switched PDU administration?",
        "answer": "It can interrupt the entire affected workload path.",
        "explanation": "Outlet control is privileged infrastructure access.",
        "testedConcept": "Why protect switched PDU administration?"
      },
      {
        "questionId": "s6-g4-t1-Q10",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies power-path planning?",
        "answer": "Complete supported cord/source mapping and full-load survivor capacity, followed by approved qualified testing where appropriate.",
        "explanation": "No electrical test is executed by this worksheet.",
        "testedConcept": "What verifies power-path planning?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t1-QC1",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Rack load is 6 kW. Can it fit either 8 kW path alone?",
        "answer": "Yes at this declared capacity level.",
        "explanation": "Other electrical and independence checks remain required.",
        "testedConcept": "Rack load is 6 kW. Can it fit either 8 kW path alone?"
      },
      {
        "questionId": "s6-g4-t1-QC2",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why distinguish W from VA?",
        "answer": "Real and apparent power differ and equipment has both kinds of ratings.",
        "explanation": "A VA label is not guaranteed usable watts.",
        "testedConcept": "Why distinguish W from VA?"
      },
      {
        "questionId": "s6-g4-t1-QC3",
        "topicId": "s6-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect switched PDU administration?",
        "answer": "It can interrupt the entire affected workload path.",
        "explanation": "Outlet control is privileged infrastructure access.",
        "testedConcept": "Why protect switched PDU administration?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t2",
    "batch": "16",
    "title": "UPS",
    "subtitle": "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t2",
    "definition": "An uninterruptible power supply supports specified load through supported input-loss and power-quality conditions for a limited duration. Watt/VA capacity, battery state, runtime curves, transfer/bypass behavior and upstream/downstream redundancy are different requirements. UPS presence alone does not prove uninterrupted useful service.",
    "purpose": "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.",
    "mental": "The UPS supplies the supported connected load subject to both real/apparent ratings and operating mode. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Output rating: Supported instantaneous W/VA load. Different from duration.",
      "Usable energy: Supplied AC Wh. Not nominal battery charge.",
      "Runtime curve: Load-specific duration. Requires actual model/state.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The UPS supplies the supported connected load subject to both real/apparent ratings and operating mode.",
      "Stored energy and conversion/load conditions bound duration; supplied usable AC Wh divided by W gives only an ideal planning estimate.",
      "Bypass, battery maintenance, transfer and cooling/network parents can change the failure domain, so protected components and independent management must be mapped."
    ],
    "flow": [
      [
        "Map the original operation",
        "An uninterruptible power supply supports specified load through supported input-loss and power-quality conditions for a limited duration. Watt/VA capacity, battery state, runtime curves, transfer/bypass behavior and upstream/downstream redundancy are different requirements. UPS presence alone does not prove uninterrupted useful service."
      ],
      [
        "Trace the first boundary",
        "The UPS supplies the supported connected load subject to both real/apparent ratings and operating mode."
      ],
      [
        "Evaluate installed conditions",
        "Stored energy and conversion/load conditions bound duration; supplied usable AC Wh divided by W gives only an ideal planning estimate."
      ],
      [
        "Verify capacity and recovery",
        "Bypass, battery maintenance, transfer and cooling/network parents can change the failure domain, so protected components and independent management must be mapped."
      ]
    ],
    "comparison": [
      [
        "Output rating",
        "Supported instantaneous W/VA load",
        "Different from duration."
      ],
      [
        "Usable energy",
        "Supplied AC Wh",
        "Not nominal battery charge."
      ],
      [
        "Runtime curve",
        "Load-specific duration",
        "Requires actual model/state."
      ]
    ],
    "example": "Case: Supplied usable AC energy is 1500 Wh and load is 6000 W. What ideal duration results? Answer: 15 minutes. Reason: 1500 divided by 6000 hours, then times sixty. Case: Why use the exact manufacturer runtime curve? Answer: Duration depends on model, load and supported battery conditions. Reason: Simple energy arithmetic is not an actual discharge curve. Case: Why may runtime shrink over lifecycle? Answer: Age, temperature and battery condition can reduce usable energy. Reason: The baseline cannot be assumed permanent.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.",
        "expected": "Capture observer and timestamp. Supported rating/runtime evidence, mapped dependencies and approved original-service recovery/shutdown checks. A UPS icon alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Can nominal battery Ah alone predict runtime?",
        "No. Voltage, usable energy, conversion and load behavior matter."
      ],
      [
        "What can UPS bypass change?",
        "The load may depend on a different unconditioned/shared supply path. Operating mode is part of the availability contract."
      ],
      [
        "Is this lesson authorizing a live power-disconnect rehearsal?",
        "No. Actual work requires approved qualified procedures and isolated targets."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "UPS network administration and bypass/outlet operations are privileged. Keep monitored alarms and protected management independently reachable where possible and avoid exposing UPS controls with public services.",
    "performance": "The worksheet assumes already usable AC energy, not nameplate battery Ah or ideal voltage times Ah. Actual age, temperature, load and conversion behavior require the manufacturer curve and approved testing.",
    "mistakes": [
      "Check real-power rating and load/power-factor context.",
      "Simple energy arithmetic is not an actual discharge curve.",
      "Protected power paths must include required dependencies.",
      "The baseline cannot be assumed permanent."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t3"
    ],
    "lab": {
      "objective": "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → UPS boundary",
        "Output rating → Usable energy → Runtime curve",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Output rating, Usable energy and Runtime curve. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Bypass, battery maintenance, transfer and cooling/network parents can change the failure domain, so protected components and independent management must be mapped. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported rating/runtime evidence, mapped dependencies and approved original-service recovery/shutdown checks. A UPS icon alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Output rating → Usable energy → Runtime curve. Operating mode is part of the availability contract. Actual work requires approved qualified procedures and isolated targets.",
      "challenge": "Why may runtime shrink over lifecycle? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Output rating": "Supported instantaneous W/VA load. Different from duration.",
      "Usable energy": "Supplied AC Wh. Not nominal battery charge.",
      "Runtime curve": "Load-specific duration. Requires actual model/state."
    },
    "sources": [
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t2-Q01",
        "topicId": "s6-g4-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Supplied usable AC energy is 1500 Wh and load is 6000 W. What ideal duration results?",
        "answer": "15 minutes.",
        "explanation": "1500 divided by 6000 hours, then times sixty.",
        "testedConcept": "Supplied usable AC energy is 1500 Wh and load is 6000 W. What ideal duration results?",
        "options": [
          "15 minutes.",
          "0.25 minutes, failing to convert hours.",
          "90 minutes, treating the 6 kW load as 1 kW.",
          "1500 minutes, interpreting energy Wh as a duration."
        ]
      },
      {
        "questionId": "s6-g4-t2-Q02",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a UPS VA rating directly state output watts?",
        "answer": "No.",
        "explanation": "Check real-power rating and load/power-factor context.",
        "testedConcept": "Does a UPS VA rating directly state output watts?"
      },
      {
        "questionId": "s6-g4-t2-Q03",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can nominal battery Ah alone predict runtime?",
        "answer": "No.",
        "explanation": "Voltage, usable energy, conversion and load behavior matter.",
        "testedConcept": "Can nominal battery Ah alone predict runtime?"
      },
      {
        "questionId": "s6-g4-t2-Q04",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why use the exact manufacturer runtime curve?",
        "answer": "Duration depends on model, load and supported battery conditions.",
        "explanation": "Simple energy arithmetic is not an actual discharge curve.",
        "testedConcept": "Why use the exact manufacturer runtime curve?"
      },
      {
        "questionId": "s6-g4-t2-Q05",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can UPS bypass change?",
        "answer": "The load may depend on a different unconditioned/shared supply path.",
        "explanation": "Operating mode is part of the availability contract.",
        "testedConcept": "What can UPS bypass change?"
      },
      {
        "questionId": "s6-g4-t2-Q06",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a UPS protect an unconnected cooling controller?",
        "answer": "No.",
        "explanation": "Protected power paths must include required dependencies.",
        "testedConcept": "Does a UPS protect an unconnected cooling controller?"
      },
      {
        "questionId": "s6-g4-t2-Q07",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should happen before planned battery maintenance?",
        "answer": "Review supported procedure, current health, independent paths and recovery/shutdown plan.",
        "explanation": "Presence of batteries is not sufficient resilience.",
        "testedConcept": "What should happen before planned battery maintenance?"
      },
      {
        "questionId": "s6-g4-t2-Q08",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why may runtime shrink over lifecycle?",
        "answer": "Age, temperature and battery condition can reduce usable energy.",
        "explanation": "The baseline cannot be assumed permanent.",
        "testedConcept": "Why may runtime shrink over lifecycle?"
      },
      {
        "questionId": "s6-g4-t2-Q09",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is this lesson authorizing a live power-disconnect rehearsal?",
        "answer": "No.",
        "explanation": "Actual work requires approved qualified procedures and isolated targets.",
        "testedConcept": "Is this lesson authorizing a live power-disconnect rehearsal?"
      },
      {
        "questionId": "s6-g4-t2-Q10",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a UPS plan?",
        "answer": "Supported rating/runtime evidence, mapped dependencies and approved original-service recovery/shutdown checks.",
        "explanation": "A UPS icon alone is insufficient.",
        "testedConcept": "What verifies a UPS plan?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t2-QC1",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a UPS VA rating directly state output watts?",
        "answer": "No.",
        "explanation": "Check real-power rating and load/power-factor context.",
        "testedConcept": "Does a UPS VA rating directly state output watts?"
      },
      {
        "questionId": "s6-g4-t2-QC2",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can UPS bypass change?",
        "answer": "The load may depend on a different unconditioned/shared supply path.",
        "explanation": "Operating mode is part of the availability contract.",
        "testedConcept": "What can UPS bypass change?"
      },
      {
        "questionId": "s6-g4-t2-QC3",
        "topicId": "s6-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is this lesson authorizing a live power-disconnect rehearsal?",
        "answer": "No.",
        "explanation": "Actual work requires approved qualified procedures and isolated targets.",
        "testedConcept": "Is this lesson authorizing a live power-disconnect rehearsal?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t3",
    "batch": "16",
    "title": "PDU",
    "subtitle": "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t3",
    "definition": "A power distribution unit delivers power to multiple outlets and may meter, switch or remotely manage them depending on the model. A PDU is not inherently a UPS, redundant supply or independent failure domain. Its inlet, phase, outlet and upstream ratings remain separate constraints.",
    "purpose": "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.",
    "mental": "Follow device cord → specific outlet → branch/phase/inlet → upstream circuit and supply to identify the real capacity chain. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Basic PDU: Outlet distribution. No implied battery backup.",
      "Metered PDU: Electrical observations. Scope depends on sensors.",
      "Switched PDU: Remote outlet control. Requires stronger permissions.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Follow device cord → specific outlet → branch/phase/inlet → upstream circuit and supply to identify the real capacity chain.",
      "Metered readings establish selected electrical observations while switched control can change service availability; these functions depend on exact model/support.",
      "Two PDUs provide supply diversity only if their relevant upstream parents and full-load survivor capacities are genuinely independent."
    ],
    "flow": [
      [
        "Map the original operation",
        "A power distribution unit delivers power to multiple outlets and may meter, switch or remotely manage them depending on the model. A PDU is not inherently a UPS, redundant supply or independent failure domain. Its inlet, phase, outlet and upstream ratings remain separate constraints."
      ],
      [
        "Trace the first boundary",
        "Follow device cord → specific outlet → branch/phase/inlet → upstream circuit and supply to identify the real capacity chain."
      ],
      [
        "Evaluate installed conditions",
        "Metered readings establish selected electrical observations while switched control can change service availability; these functions depend on exact model/support."
      ],
      [
        "Verify capacity and recovery",
        "Two PDUs provide supply diversity only if their relevant upstream parents and full-load survivor capacities are genuinely independent."
      ]
    ],
    "comparison": [
      [
        "Basic PDU",
        "Outlet distribution",
        "No implied battery backup."
      ],
      [
        "Metered PDU",
        "Electrical observations",
        "Scope depends on sensors."
      ],
      [
        "Switched PDU",
        "Remote outlet control",
        "Requires stronger permissions."
      ]
    ],
    "example": "Case: A PDU has many outlets but no battery. Does it provide UPS runtime? Answer: No. Reason: Distribution is different from stored-energy backup. Case: Two PDUs terminate on one circuit. What diversity is missing? Answer: Circuit failure independence. Reason: Different rack boxes can share one parent. Case: Does a green PDU status establish application continuity? Answer: No. Reason: It reports selected device conditions rather than original service results.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.",
        "expected": "Capture observer and timestamp. Supported per-element ratings, independent source map and approved service/recovery evidence. The worksheet is not electrical certification. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why map individual phase/outlet loads?",
        "Aggregate kW can hide a narrower overloaded element. Capacity applies at every rated boundary."
      ],
      [
        "What privilege should an inventory-only operator receive?",
        "Read-only metering/inventory, not outlet power control. Observation need not grant interruption capability."
      ],
      [
        "What should be checked before a remote outlet action?",
        "Exact asset mapping, ownership, supported procedure and independent recovery. A mistaken outlet can stop unrelated workloads."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Switched outlets are destructive-capable infrastructure controls. Assign read versus power-control roles separately, use trusted management access and preserve an independent emergency recovery path.",
    "performance": "An acceptable aggregate rack kW can still overload one outlet, phase or branch. Use supported ratings and real metering rather than treating PDU socket count as usable power capacity.",
    "mistakes": [
      "Feature capability is model specific.",
      "Different rack boxes can share one parent.",
      "Current, phase, inlet, circuit and survivor capacity still matter.",
      "It reports selected device conditions rather than original service results."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t4"
    ],
    "lab": {
      "objective": "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → PDU boundary",
        "Basic PDU → Metered PDU → Switched PDU",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Basic PDU, Metered PDU and Switched PDU. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Two PDUs provide supply diversity only if their relevant upstream parents and full-load survivor capacities are genuinely independent. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported per-element ratings, independent source map and approved service/recovery evidence. The worksheet is not electrical certification. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Basic PDU → Metered PDU → Switched PDU. Observation need not grant interruption capability. A mistaken outlet can stop unrelated workloads.",
      "challenge": "Does a green PDU status establish application continuity? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Basic PDU": "Outlet distribution. No implied battery backup.",
      "Metered PDU": "Electrical observations. Scope depends on sensors.",
      "Switched PDU": "Remote outlet control. Requires stronger permissions."
    },
    "sources": [
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      },
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t3-Q01",
        "topicId": "s6-g4-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A PDU has many outlets but no battery. Does it provide UPS runtime?",
        "answer": "No.",
        "explanation": "Distribution is different from stored-energy backup.",
        "testedConcept": "A PDU has many outlets but no battery. Does it provide UPS runtime?",
        "options": [
          "Yes; any multi-outlet distributor stores backup energy.",
          "Yes if the PDU is remotely metered.",
          "Yes if it is connected to two servers rather than one.",
          "No."
        ]
      },
      {
        "questionId": "s6-g4-t3-Q02",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a metered PDU necessarily allow remote outlet switching?",
        "answer": "No.",
        "explanation": "Feature capability is model specific.",
        "testedConcept": "Does a metered PDU necessarily allow remote outlet switching?"
      },
      {
        "questionId": "s6-g4-t3-Q03",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why map individual phase/outlet loads?",
        "answer": "Aggregate kW can hide a narrower overloaded element.",
        "explanation": "Capacity applies at every rated boundary.",
        "testedConcept": "Why map individual phase/outlet loads?"
      },
      {
        "questionId": "s6-g4-t3-Q04",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two PDUs terminate on one circuit. What diversity is missing?",
        "answer": "Circuit failure independence.",
        "explanation": "Different rack boxes can share one parent.",
        "testedConcept": "Two PDUs terminate on one circuit. What diversity is missing?"
      },
      {
        "questionId": "s6-g4-t3-Q05",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What privilege should an inventory-only operator receive?",
        "answer": "Read-only metering/inventory, not outlet power control.",
        "explanation": "Observation need not grant interruption capability.",
        "testedConcept": "What privilege should an inventory-only operator receive?"
      },
      {
        "questionId": "s6-g4-t3-Q06",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an outlet count approve server expansion?",
        "answer": "No.",
        "explanation": "Current, phase, inlet, circuit and survivor capacity still matter.",
        "testedConcept": "Can an outlet count approve server expansion?"
      },
      {
        "questionId": "s6-g4-t3-Q07",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why retain cord-to-outlet labels before maintenance?",
        "answer": "Exact restoration must reconnect the intended A/B paths.",
        "explanation": "An arbitrary free outlet may change the domain.",
        "testedConcept": "Why retain cord-to-outlet labels before maintenance?"
      },
      {
        "questionId": "s6-g4-t3-Q08",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a green PDU status establish application continuity?",
        "answer": "No.",
        "explanation": "It reports selected device conditions rather than original service results.",
        "testedConcept": "Does a green PDU status establish application continuity?"
      },
      {
        "questionId": "s6-g4-t3-Q09",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be checked before a remote outlet action?",
        "answer": "Exact asset mapping, ownership, supported procedure and independent recovery.",
        "explanation": "A mistaken outlet can stop unrelated workloads.",
        "testedConcept": "What should be checked before a remote outlet action?"
      },
      {
        "questionId": "s6-g4-t3-Q10",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies the distribution plan?",
        "answer": "Supported per-element ratings, independent source map and approved service/recovery evidence.",
        "explanation": "The worksheet is not electrical certification.",
        "testedConcept": "What verifies the distribution plan?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t3-QC1",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a metered PDU necessarily allow remote outlet switching?",
        "answer": "No.",
        "explanation": "Feature capability is model specific.",
        "testedConcept": "Does a metered PDU necessarily allow remote outlet switching?"
      },
      {
        "questionId": "s6-g4-t3-QC2",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What privilege should an inventory-only operator receive?",
        "answer": "Read-only metering/inventory, not outlet power control.",
        "explanation": "Observation need not grant interruption capability.",
        "testedConcept": "What privilege should an inventory-only operator receive?"
      },
      {
        "questionId": "s6-g4-t3-QC3",
        "topicId": "s6-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be checked before a remote outlet action?",
        "answer": "Exact asset mapping, ownership, supported procedure and independent recovery.",
        "explanation": "A mistaken outlet can stop unrelated workloads.",
        "testedConcept": "What should be checked before a remote outlet action?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t4",
    "batch": "16",
    "title": "Cooling",
    "subtitle": "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t4",
    "definition": "Cooling removes heat while delivering supported environmental conditions at equipment inlets. IT electrical work largely becomes heat in the room, but total removal capacity and actual inlet conditions are different boundaries. Humidity, airflow distribution, recirculation and failure-state removal must be separately evaluated.",
    "purpose": "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.",
    "mental": "Compare declared sensible heat load with available sensible removal, including the stated failure condition rather than only installed tonnage. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Sensible heat: Temperature-related thermal load. Latent moisture effects excluded.",
      "Inlet condition: Air delivered to equipment. Not room-average temperature.",
      "Removal envelope: Available sensible cooling. Shared failures can reduce it.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Compare declared sensible heat load with available sensible removal, including the stated failure condition rather than only installed tonnage.",
      "For a steady ideal air stream, heat equals density × volume flow × heat capacity × temperature rise; the worksheet names every coefficient and unit.",
      "Measure inlet conditions across heights and racks because mixing and bypass can create hot spots even when a mean thermal budget fits."
    ],
    "flow": [
      [
        "Map the original operation",
        "Cooling removes heat while delivering supported environmental conditions at equipment inlets. IT electrical work largely becomes heat in the room, but total removal capacity and actual inlet conditions are different boundaries. Humidity, airflow distribution, recirculation and failure-state removal must be separately evaluated."
      ],
      [
        "Trace the first boundary",
        "Compare declared sensible heat load with available sensible removal, including the stated failure condition rather than only installed tonnage."
      ],
      [
        "Evaluate installed conditions",
        "For a steady ideal air stream, heat equals density × volume flow × heat capacity × temperature rise; the worksheet names every coefficient and unit."
      ],
      [
        "Verify capacity and recovery",
        "Measure inlet conditions across heights and racks because mixing and bypass can create hot spots even when a mean thermal budget fits."
      ]
    ],
    "comparison": [
      [
        "Sensible heat",
        "Temperature-related thermal load",
        "Latent moisture effects excluded."
      ],
      [
        "Inlet condition",
        "Air delivered to equipment",
        "Not room-average temperature."
      ],
      [
        "Removal envelope",
        "Available sensible cooling",
        "Shared failures can reduce it."
      ]
    ],
    "example": "Case: At 6 kW, 1 m³/s, density 1.2 and heat capacity 1.005, what is mean air rise? Answer: About 4.98 K. Reason: Six divided by 1.2 times 1.005 times one. Case: What happens to the ideal mean rise if flow doubles at the same heat load? Answer: It halves. Reason: Steady sensible balance divides heat by mass-flow heat capacity. Case: Does a Celsius temperature rise differ numerically from a Kelvin rise? Answer: No for a temperature difference. Reason: Absolute scales differ by offset, differences do not.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.",
        "expected": "Capture observer and timestamp. Supported inlet/humidity and original service evidence after exact approved restoration. The calculated mean alone is incomplete. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Where should a server environmental acceptance observation be taken?",
        "At its relevant inlets and documented sensor positions. A room-average reading can miss the delivered condition."
      ],
      [
        "Can the worksheet certify humidity compliance?",
        "No. Humidity and latent effects are excluded."
      ],
      [
        "Why wait for an approved stable measurement when comparing a change?",
        "Thermal transients can hide or exaggerate the final condition. Instant samples are not steady-state evidence."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Protect cooling controls and sensor integrity because wrong settings can affect many workloads. Monitor loss of telemetry distinctly from a real safe environment.",
    "performance": "The worksheet excludes humidity, latent heat, transients, equipment fan curves and CFD. Capacity and mean rise are planning calculations; actual measured maximum inlet and failure-state behavior remain external evidence.",
    "mistakes": [
      "Air distribution and recirculation can create hot spots.",
      "Steady sensible balance divides heat by mass-flow heat capacity.",
      "Unit count alone is not removal resilience.",
      "Absolute scales differ by offset, differences do not."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t5"
    ],
    "lab": {
      "objective": "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Cooling boundary",
        "Sensible heat → Inlet condition → Removal envelope",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Sensible heat, Inlet condition and Removal envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Measure inlet conditions across heights and racks because mixing and bypass can create hot spots even when a mean thermal budget fits. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported inlet/humidity and original service evidence after exact approved restoration. The calculated mean alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Sensible heat → Inlet condition → Removal envelope. Humidity and latent effects are excluded. Instant samples are not steady-state evidence.",
      "challenge": "Does a Celsius temperature rise differ numerically from a Kelvin rise? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Sensible heat": "Temperature-related thermal load. Latent moisture effects excluded.",
      "Inlet condition": "Air delivered to equipment. Not room-average temperature.",
      "Removal envelope": "Available sensible cooling. Shared failures can reduce it."
    },
    "sources": [
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t4-Q01",
        "topicId": "s6-g4-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "At 6 kW, 1 m³/s, density 1.2 and heat capacity 1.005, what is mean air rise?",
        "answer": "About 4.98 K.",
        "explanation": "Six divided by 1.2 times 1.005 times one.",
        "testedConcept": "At 6 kW, 1 m³/s, density 1.2 and heat capacity 1.005, what is mean air rise?",
        "options": [
          "About 2.49 K, accidentally doubling the declared flow.",
          "About 0.00498 K, mixing kW with kJ/s by an extra factor of 1000.",
          "About 4.98 K.",
          "About 7.24 K, multiplying by mass-flow heat capacity."
        ]
      },
      {
        "questionId": "s6-g4-t4-Q02",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does adequate room cooling capacity prove every inlet is acceptable?",
        "answer": "No.",
        "explanation": "Air distribution and recirculation can create hot spots.",
        "testedConcept": "Does adequate room cooling capacity prove every inlet is acceptable?"
      },
      {
        "questionId": "s6-g4-t4-Q03",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Where should a server environmental acceptance observation be taken?",
        "answer": "At its relevant inlets and documented sensor positions.",
        "explanation": "A room-average reading can miss the delivered condition.",
        "testedConcept": "Where should a server environmental acceptance observation be taken?"
      },
      {
        "questionId": "s6-g4-t4-Q04",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens to the ideal mean rise if flow doubles at the same heat load?",
        "answer": "It halves.",
        "explanation": "Steady sensible balance divides heat by mass-flow heat capacity.",
        "testedConcept": "What happens to the ideal mean rise if flow doubles at the same heat load?"
      },
      {
        "questionId": "s6-g4-t4-Q05",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can the worksheet certify humidity compliance?",
        "answer": "No.",
        "explanation": "Humidity and latent effects are excluded.",
        "testedConcept": "Can the worksheet certify humidity compliance?"
      },
      {
        "questionId": "s6-g4-t4-Q06",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review cooling power/control parents?",
        "answer": "Several cooling units can fail with one shared dependency.",
        "explanation": "Unit count alone is not removal resilience.",
        "testedConcept": "Why review cooling power/control parents?"
      },
      {
        "questionId": "s6-g4-t4-Q07",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What differentiates installed from available capacity?",
        "answer": "Operating conditions and unavailable units/paths can reduce usable removal.",
        "explanation": "The failure state needs its own envelope.",
        "testedConcept": "What differentiates installed from available capacity?"
      },
      {
        "questionId": "s6-g4-t4-Q08",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a Celsius temperature rise differ numerically from a Kelvin rise?",
        "answer": "No for a temperature difference.",
        "explanation": "Absolute scales differ by offset, differences do not.",
        "testedConcept": "Does a Celsius temperature rise differ numerically from a Kelvin rise?"
      },
      {
        "questionId": "s6-g4-t4-Q09",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why wait for an approved stable measurement when comparing a change?",
        "answer": "Thermal transients can hide or exaggerate the final condition.",
        "explanation": "Instant samples are not steady-state evidence.",
        "testedConcept": "Why wait for an approved stable measurement when comparing a change?"
      },
      {
        "questionId": "s6-g4-t4-Q10",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies cooling recovery?",
        "answer": "Supported inlet/humidity and original service evidence after exact approved restoration.",
        "explanation": "The calculated mean alone is incomplete.",
        "testedConcept": "What verifies cooling recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t4-QC1",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does adequate room cooling capacity prove every inlet is acceptable?",
        "answer": "No.",
        "explanation": "Air distribution and recirculation can create hot spots.",
        "testedConcept": "Does adequate room cooling capacity prove every inlet is acceptable?"
      },
      {
        "questionId": "s6-g4-t4-QC2",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can the worksheet certify humidity compliance?",
        "answer": "No.",
        "explanation": "Humidity and latent effects are excluded.",
        "testedConcept": "Can the worksheet certify humidity compliance?"
      },
      {
        "questionId": "s6-g4-t4-QC3",
        "topicId": "s6-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why wait for an approved stable measurement when comparing a change?",
        "answer": "Thermal transients can hide or exaggerate the final condition.",
        "explanation": "Instant samples are not steady-state evidence.",
        "testedConcept": "Why wait for an approved stable measurement when comparing a change?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t5",
    "batch": "16",
    "title": "Airflow",
    "subtitle": "Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t5",
    "definition": "Airflow design routes conditioned air through required equipment and returns exhaust without harmful mixing or bypass. Flow quantity, pressure, equipment fan behavior and physical obstructions interact. Server and switch orientation must be confirmed from actual installed airflow variants.",
    "purpose": "Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes.",
    "mental": "Trace cold supply → intended equipment inlet → internal heat transfer → exhaust → cooling return. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Bypass: Supply air avoids equipment. Can waste usable flow.",
      "Recirculation: Exhaust returns to inlet. Can create hot spots.",
      "Flow balance: Supply and equipment demand. Needs observed conditions.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Trace cold supply → intended equipment inlet → internal heat transfer → exhaust → cooling return.",
      "Unblanked openings, cable penetrations and blocked passages can redirect air around equipment or return hot air to inlets.",
      "Match supply and IT flow behavior through approved measurement; increasing fan speed does not guarantee improved delivery at every inlet."
    ],
    "flow": [
      [
        "Map the original operation",
        "Airflow design routes conditioned air through required equipment and returns exhaust without harmful mixing or bypass. Flow quantity, pressure, equipment fan behavior and physical obstructions interact. Server and switch orientation must be confirmed from actual installed airflow variants."
      ],
      [
        "Trace the first boundary",
        "Trace cold supply → intended equipment inlet → internal heat transfer → exhaust → cooling return."
      ],
      [
        "Evaluate installed conditions",
        "Unblanked openings, cable penetrations and blocked passages can redirect air around equipment or return hot air to inlets."
      ],
      [
        "Verify capacity and recovery",
        "Match supply and IT flow behavior through approved measurement; increasing fan speed does not guarantee improved delivery at every inlet."
      ]
    ],
    "comparison": [
      [
        "Bypass",
        "Supply air avoids equipment",
        "Can waste usable flow."
      ],
      [
        "Recirculation",
        "Exhaust returns to inlet",
        "Can create hot spots."
      ],
      [
        "Flow balance",
        "Supply and equipment demand",
        "Needs observed conditions."
      ]
    ],
    "example": "Case: A rack opening lets hot rear air reach a front inlet. Which mechanism is present? Answer: Recirculation. Reason: Exhaust returns to the equipment supply boundary. Case: Why inspect the switch airflow variant? Answer: Some models support different inlet/exhaust directions. Reason: Front-panel position alone may not identify flow. Case: What should a sensor failure produce operationally? Answer: A visible missing-observation condition and investigation. Reason: Absent telemetry is not evidence of safe temperature.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes.",
        "expected": "Capture observer and timestamp. Supported stable inlet distribution and original service after exact restoration. An ideal flow calculation alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Does doubling declared flow halve actual maximum inlet temperature?",
        "No. The ideal mean rise changes, while mixing and inlet conditions differ."
      ],
      [
        "What can dense rear cabling cause?",
        "Obstruction of exhaust or service airflow paths. Cable layout affects the thermal boundary."
      ],
      [
        "Why draw separate supply and return paths?",
        "It exposes where hot/cold streams can mix or short-circuit. A single airflow arrow hides useful boundaries."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Protect fan/cooling configuration and telemetry integrity. Loss of a sensor or control path should be visible as uncertainty rather than silently interpreted as a safe inlet.",
    "performance": "More airflow can change mean rise in the ideal worksheet but power use, pressure and recirculation remain unmodeled. Compare actual inlet distributions and supported fan operating conditions.",
    "mistakes": [
      "Total fan flow can overstate useful delivery.",
      "Front-panel position alone may not identify flow.",
      "Unused U is not thermally neutral.",
      "Absent telemetry is not evidence of safe temperature."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t6"
    ],
    "lab": {
      "objective": "Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Airflow boundary",
        "Bypass → Recirculation → Flow balance",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Create front/rear flow arrows, blanking and penetration records and inlet sensor positions for each rack. Check cable-arm and switch airflow variants; use only supported installation materials and qualified facility changes.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Bypass, Recirculation and Flow balance. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Match supply and IT flow behavior through approved measurement; increasing fan speed does not guarantee improved delivery at every inlet. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported stable inlet distribution and original service after exact restoration. An ideal flow calculation alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Bypass → Recirculation → Flow balance. Cable layout affects the thermal boundary. A single airflow arrow hides useful boundaries.",
      "challenge": "What should a sensor failure produce operationally? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Bypass": "Supply air avoids equipment. Can waste usable flow.",
      "Recirculation": "Exhaust returns to inlet. Can create hot spots.",
      "Flow balance": "Supply and equipment demand. Needs observed conditions."
    },
    "sources": [
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t5-Q01",
        "topicId": "s6-g4-t5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A rack opening lets hot rear air reach a front inlet. Which mechanism is present?",
        "answer": "Recirculation.",
        "explanation": "Exhaust returns to the equipment supply boundary.",
        "testedConcept": "A rack opening lets hot rear air reach a front inlet. Which mechanism is present?",
        "options": [
          "Latent cooling, because every opening controls moisture.",
          "Recirculation.",
          "Bypass only; exhaust returning to an inlet is not recirculation.",
          "Normal cold supply, because the opening is at the front."
        ]
      },
      {
        "questionId": "s6-g4-t5-Q02",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is bypass airflow?",
        "answer": "Conditioned air that avoids the intended heat-producing equipment.",
        "explanation": "Total fan flow can overstate useful delivery.",
        "testedConcept": "What is bypass airflow?"
      },
      {
        "questionId": "s6-g4-t5-Q03",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does doubling declared flow halve actual maximum inlet temperature?",
        "answer": "No.",
        "explanation": "The ideal mean rise changes, while mixing and inlet conditions differ.",
        "testedConcept": "Does doubling declared flow halve actual maximum inlet temperature?"
      },
      {
        "questionId": "s6-g4-t5-Q04",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inspect the switch airflow variant?",
        "answer": "Some models support different inlet/exhaust directions.",
        "explanation": "Front-panel position alone may not identify flow.",
        "testedConcept": "Why inspect the switch airflow variant?"
      },
      {
        "questionId": "s6-g4-t5-Q05",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can dense rear cabling cause?",
        "answer": "Obstruction of exhaust or service airflow paths.",
        "explanation": "Cable layout affects the thermal boundary.",
        "testedConcept": "What can dense rear cabling cause?"
      },
      {
        "questionId": "s6-g4-t5-Q06",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why blank unused openings with supported panels?",
        "answer": "To limit unintended mixing/bypass paths.",
        "explanation": "Unused U is not thermally neutral.",
        "testedConcept": "Why blank unused openings with supported panels?"
      },
      {
        "questionId": "s6-g4-t5-Q07",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does increasing supply fan speed always solve recirculation?",
        "answer": "No.",
        "explanation": "Pressure, containment, distribution and equipment response matter.",
        "testedConcept": "Does increasing supply fan speed always solve recirculation?"
      },
      {
        "questionId": "s6-g4-t5-Q08",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a sensor failure produce operationally?",
        "answer": "A visible missing-observation condition and investigation.",
        "explanation": "Absent telemetry is not evidence of safe temperature.",
        "testedConcept": "What should a sensor failure produce operationally?"
      },
      {
        "questionId": "s6-g4-t5-Q09",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why draw separate supply and return paths?",
        "answer": "It exposes where hot/cold streams can mix or short-circuit.",
        "explanation": "A single airflow arrow hides useful boundaries.",
        "testedConcept": "Why draw separate supply and return paths?"
      },
      {
        "questionId": "s6-g4-t5-Q10",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies an airflow change?",
        "answer": "Supported stable inlet distribution and original service after exact restoration.",
        "explanation": "An ideal flow calculation alone is insufficient.",
        "testedConcept": "What verifies an airflow change?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t5-QC1",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is bypass airflow?",
        "answer": "Conditioned air that avoids the intended heat-producing equipment.",
        "explanation": "Total fan flow can overstate useful delivery.",
        "testedConcept": "What is bypass airflow?"
      },
      {
        "questionId": "s6-g4-t5-QC2",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can dense rear cabling cause?",
        "answer": "Obstruction of exhaust or service airflow paths.",
        "explanation": "Cable layout affects the thermal boundary.",
        "testedConcept": "What can dense rear cabling cause?"
      },
      {
        "questionId": "s6-g4-t5-QC3",
        "topicId": "s6-g4-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why draw separate supply and return paths?",
        "answer": "It exposes where hot/cold streams can mix or short-circuit.",
        "explanation": "A single airflow arrow hides useful boundaries.",
        "testedConcept": "Why draw separate supply and return paths?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t6",
    "batch": "16",
    "title": "Hot aisle",
    "subtitle": "Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t6",
    "definition": "A hot aisle groups equipment exhaust sides so warm return air can be separated from inlet supply. Containment can reduce mixing when supported by the room/cooling design, but it also changes return paths, work conditions and interactions with fire detection, suppression and access requirements.",
    "purpose": "Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here.",
    "mental": "Orient supported exhaust paths toward the hot aisle and trace its return to the cooling boundary. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Hot aisle: Grouped exhaust-side space. Not an inlet temperature criterion.",
      "Containment: Stream-separation boundary. Must fit approved safety design.",
      "Return path: Exhaust to cooling. Requires actual flow mapping.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Orient supported exhaust paths toward the hot aisle and trace its return to the cooling boundary.",
      "Containment, doors, blanking and penetrations influence separation; incomplete barriers can leave hot-air leakage and recirculation.",
      "Validate inlet conditions and approved safety/access requirements rather than interpreting high contained-return temperature as an automatic server failure."
    ],
    "flow": [
      [
        "Map the original operation",
        "A hot aisle groups equipment exhaust sides so warm return air can be separated from inlet supply. Containment can reduce mixing when supported by the room/cooling design, but it also changes return paths, work conditions and interactions with fire detection, suppression and access requirements."
      ],
      [
        "Trace the first boundary",
        "Orient supported exhaust paths toward the hot aisle and trace its return to the cooling boundary."
      ],
      [
        "Evaluate installed conditions",
        "Containment, doors, blanking and penetrations influence separation; incomplete barriers can leave hot-air leakage and recirculation."
      ],
      [
        "Verify capacity and recovery",
        "Validate inlet conditions and approved safety/access requirements rather than interpreting high contained-return temperature as an automatic server failure."
      ]
    ],
    "comparison": [
      [
        "Hot aisle",
        "Grouped exhaust-side space",
        "Not an inlet temperature criterion."
      ],
      [
        "Containment",
        "Stream-separation boundary",
        "Must fit approved safety design."
      ],
      [
        "Return path",
        "Exhaust to cooling",
        "Requires actual flow mapping."
      ]
    ],
    "example": "Case: Which equipment sides face a conventional hot aisle? Answer: Exhaust sides. Reason: The layout groups warm return air. Case: Can an open door change containment performance? Answer: Yes. Reason: It changes the stream-separation boundary. Case: Does this worksheet measure containment efficiency? Answer: No. Reason: Mixing and actual flow distribution are excluded.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here.",
        "expected": "Capture observer and timestamp. Supported orientation, return/separation, safety/access and measured inlet requirements. A colored aisle diagram alone is incomplete. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why review fire/access requirements before containment?",
        "Barriers and flow changes can affect approved detection, suppression and access. Thermal planning is not the only installation constraint."
      ],
      [
        "What should the hot return connect toward?",
        "The designed cooling return path. Warm exhaust should not be assumed to disappear in the room."
      ],
      [
        "Where should thermal recovery be checked?",
        "At supported equipment inlet positions and the original service. Return mean alone is insufficient."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Restrict cooling-control changes and preserve service access. A physically contained aisle still contains cable, media and management assets requiring ordinary access controls.",
    "performance": "A warmer well-separated return can coexist with acceptable inlets, while poor separation can create local hot spots. Do not transfer a manufacturer test efficiency result to this classroom design.",
    "mistakes": [
      "Acceptance concerns supported inlet conditions and equipment observations.",
      "It changes the stream-separation boundary.",
      "A nominal containment label is insufficient.",
      "Mixing and actual flow distribution are excluded."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t7"
    ],
    "lab": {
      "objective": "Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Hot aisle boundary",
        "Hot aisle → Containment → Return path",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Mark exhaust-facing rack rears, approved containment/return routes and inlet measurement points. Coordinate modifications with qualified facilities and safety staff; no containment or live cooling change is executed here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Hot aisle, Containment and Return path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Validate inlet conditions and approved safety/access requirements rather than interpreting high contained-return temperature as an automatic server failure. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported orientation, return/separation, safety/access and measured inlet requirements. A colored aisle diagram alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Hot aisle → Containment → Return path. Warm exhaust should not be assumed to disappear in the room. Return mean alone is insufficient.",
      "challenge": "Does this worksheet measure containment efficiency? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Hot aisle": "Grouped exhaust-side space. Not an inlet temperature criterion.",
      "Containment": "Stream-separation boundary. Must fit approved safety design.",
      "Return path": "Exhaust to cooling. Requires actual flow mapping."
    },
    "sources": [
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t6-Q01",
        "topicId": "s6-g4-t6",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Which equipment sides face a conventional hot aisle?",
        "answer": "Exhaust sides.",
        "explanation": "The layout groups warm return air.",
        "testedConcept": "Which equipment sides face a conventional hot aisle?",
        "options": [
          "Exhaust sides.",
          "Equipment inlet sides.",
          "Any front panel, regardless of supported airflow variant.",
          "Power cords only; exhaust orientation is irrelevant."
        ]
      },
      {
        "questionId": "s6-g4-t6-Q02",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does hot-aisle temperature alone certify server inlet failure?",
        "answer": "No.",
        "explanation": "Acceptance concerns supported inlet conditions and equipment observations.",
        "testedConcept": "Does hot-aisle temperature alone certify server inlet failure?"
      },
      {
        "questionId": "s6-g4-t6-Q03",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review fire/access requirements before containment?",
        "answer": "Barriers and flow changes can affect approved detection, suppression and access.",
        "explanation": "Thermal planning is not the only installation constraint.",
        "testedConcept": "Why review fire/access requirements before containment?"
      },
      {
        "questionId": "s6-g4-t6-Q04",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an open door change containment performance?",
        "answer": "Yes.",
        "explanation": "It changes the stream-separation boundary.",
        "testedConcept": "Can an open door change containment performance?"
      },
      {
        "questionId": "s6-g4-t6-Q05",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should the hot return connect toward?",
        "answer": "The designed cooling return path.",
        "explanation": "Warm exhaust should not be assumed to disappear in the room.",
        "testedConcept": "What should the hot return connect toward?"
      },
      {
        "questionId": "s6-g4-t6-Q06",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why keep blanking and penetration records?",
        "answer": "Leakage paths can route exhaust back to inlets.",
        "explanation": "A nominal containment label is insufficient.",
        "testedConcept": "Why keep blanking and penetration records?"
      },
      {
        "questionId": "s6-g4-t6-Q07",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a higher return temperature coexist with acceptable inlets?",
        "answer": "Yes.",
        "explanation": "Good separation can preserve inlet conditions while concentrating return heat.",
        "testedConcept": "Can a higher return temperature coexist with acceptable inlets?"
      },
      {
        "questionId": "s6-g4-t6-Q08",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this worksheet measure containment efficiency?",
        "answer": "No.",
        "explanation": "Mixing and actual flow distribution are excluded.",
        "testedConcept": "Does this worksheet measure containment efficiency?"
      },
      {
        "questionId": "s6-g4-t6-Q09",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Where should thermal recovery be checked?",
        "answer": "At supported equipment inlet positions and the original service.",
        "explanation": "Return mean alone is insufficient.",
        "testedConcept": "Where should thermal recovery be checked?"
      },
      {
        "questionId": "s6-g4-t6-Q10",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes a hot-aisle plan review?",
        "answer": "Supported orientation, return/separation, safety/access and measured inlet requirements.",
        "explanation": "A colored aisle diagram alone is incomplete.",
        "testedConcept": "What completes a hot-aisle plan review?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t6-QC1",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does hot-aisle temperature alone certify server inlet failure?",
        "answer": "No.",
        "explanation": "Acceptance concerns supported inlet conditions and equipment observations.",
        "testedConcept": "Does hot-aisle temperature alone certify server inlet failure?"
      },
      {
        "questionId": "s6-g4-t6-QC2",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should the hot return connect toward?",
        "answer": "The designed cooling return path.",
        "explanation": "Warm exhaust should not be assumed to disappear in the room.",
        "testedConcept": "What should the hot return connect toward?"
      },
      {
        "questionId": "s6-g4-t6-QC3",
        "topicId": "s6-g4-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Where should thermal recovery be checked?",
        "answer": "At supported equipment inlet positions and the original service.",
        "explanation": "Return mean alone is insufficient.",
        "testedConcept": "Where should thermal recovery be checked?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t7",
    "batch": "16",
    "title": "Cold aisle",
    "subtitle": "Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t7",
    "definition": "A cold aisle groups equipment inlet sides so conditioned supply can reach the intended heat-producing devices. It does not require a raised floor, and an aisle name or low room average does not prove every device receives a supported environment.",
    "purpose": "Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range.",
    "mental": "Orient supported inlet paths toward the cold aisle and trace the actual supply source and delivery openings. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Cold aisle: Grouped inlet-side space. Not necessarily raised-floor supply.",
      "Supply path: Cooling to equipment. Needs distribution evidence.",
      "Inlet distribution: Observed values across positions. Mean alone hides maxima.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Orient supported inlet paths toward the cold aisle and trace the actual supply source and delivery openings.",
      "Containment and blanking can limit mixing while inadequate supply distribution can still leave top-of-rack or high-density inlets hot.",
      "Measure across rack heights and loads and preserve approved work/access/fire requirements when altering the aisle."
    ],
    "flow": [
      [
        "Map the original operation",
        "A cold aisle groups equipment inlet sides so conditioned supply can reach the intended heat-producing devices. It does not require a raised floor, and an aisle name or low room average does not prove every device receives a supported environment."
      ],
      [
        "Trace the first boundary",
        "Orient supported inlet paths toward the cold aisle and trace the actual supply source and delivery openings."
      ],
      [
        "Evaluate installed conditions",
        "Containment and blanking can limit mixing while inadequate supply distribution can still leave top-of-rack or high-density inlets hot."
      ],
      [
        "Verify capacity and recovery",
        "Measure across rack heights and loads and preserve approved work/access/fire requirements when altering the aisle."
      ]
    ],
    "comparison": [
      [
        "Cold aisle",
        "Grouped inlet-side space",
        "Not necessarily raised-floor supply."
      ],
      [
        "Supply path",
        "Cooling to equipment",
        "Needs distribution evidence."
      ],
      [
        "Inlet distribution",
        "Observed values across positions",
        "Mean alone hides maxima."
      ]
    ],
    "example": "Case: Which equipment sides face a conventional cold aisle? Answer: Inlet sides. Reason: The layout groups conditioned supply delivery. Case: Can a cool room coexist with a hot server inlet? Answer: Yes. Reason: Recirculation or poor delivery can create local hot spots. Case: Should one temperature range be assumed safe for all equipment? Answer: No. Reason: Use exact supported environmental requirements.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range.",
        "expected": "Capture observer and timestamp. Supported inlet distribution and original service after approved exact restoration. A room-average dashboard alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why sample several rack heights?",
        "Top or locally starved inlets can differ from the average. Distribution determines local conditions."
      ],
      [
        "Does a missing temperature sensor establish a safe condition?",
        "No. It is missing evidence, not a low measurement."
      ],
      [
        "What is the relationship between cold and hot paths?",
        "Supply must reach inlets and exhaust must return without harmful mixing. Both sides belong in the same plan."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Protect sensors and cooling-control access, and keep physical service paths available. A low displayed temperature with missing or misplaced sensors is not trustworthy operational evidence.",
    "performance": "Cold-air quantity must be delivered usefully rather than bypassing equipment. Supply pressure, placement and fan behavior matter beyond the ideal mean heat/flow calculation.",
    "mistakes": [
      "Other supported supply/return architectures exist.",
      "Recirculation or poor delivery can create local hot spots.",
      "Air quantity alone misses delivery.",
      "Use exact supported environmental requirements."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g4-t8"
    ],
    "lab": {
      "objective": "Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Cold aisle boundary",
        "Cold aisle → Supply path → Inlet distribution",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Draw inlet-facing rack fronts, supply/return paths, approved containment and sensor positions. Specify exact equipment environmental limits separately; this course provides no universal safe temperature range.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Cold aisle, Supply path and Inlet distribution. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Measure across rack heights and loads and preserve approved work/access/fire requirements when altering the aisle. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported inlet distribution and original service after approved exact restoration. A room-average dashboard alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Cold aisle → Supply path → Inlet distribution. It is missing evidence, not a low measurement. Both sides belong in the same plan.",
      "challenge": "Should one temperature range be assumed safe for all equipment? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Cold aisle": "Grouped inlet-side space. Not necessarily raised-floor supply.",
      "Supply path": "Cooling to equipment. Needs distribution evidence.",
      "Inlet distribution": "Observed values across positions. Mean alone hides maxima."
    },
    "sources": [
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t7-Q01",
        "topicId": "s6-g4-t7",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Which equipment sides face a conventional cold aisle?",
        "answer": "Inlet sides.",
        "explanation": "The layout groups conditioned supply delivery.",
        "testedConcept": "Which equipment sides face a conventional cold aisle?",
        "options": [
          "Equipment exhaust sides.",
          "Any rear panel, regardless of supported airflow variant.",
          "Storage cable connectors only.",
          "Inlet sides."
        ]
      },
      {
        "questionId": "s6-g4-t7-Q02",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does cold-aisle design require a raised floor?",
        "answer": "No.",
        "explanation": "Other supported supply/return architectures exist.",
        "testedConcept": "Does cold-aisle design require a raised floor?"
      },
      {
        "questionId": "s6-g4-t7-Q03",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why sample several rack heights?",
        "answer": "Top or locally starved inlets can differ from the average.",
        "explanation": "Distribution determines local conditions.",
        "testedConcept": "Why sample several rack heights?"
      },
      {
        "questionId": "s6-g4-t7-Q04",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a cool room coexist with a hot server inlet?",
        "answer": "Yes.",
        "explanation": "Recirculation or poor delivery can create local hot spots.",
        "testedConcept": "Can a cool room coexist with a hot server inlet?"
      },
      {
        "questionId": "s6-g4-t7-Q05",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a missing temperature sensor establish a safe condition?",
        "answer": "No.",
        "explanation": "It is missing evidence, not a low measurement.",
        "testedConcept": "Does a missing temperature sensor establish a safe condition?"
      },
      {
        "questionId": "s6-g4-t7-Q06",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can happen if conditioned air bypasses equipment?",
        "answer": "Useful heat removal may be lower than total supplied flow suggests.",
        "explanation": "Air quantity alone misses delivery.",
        "testedConcept": "What can happen if conditioned air bypasses equipment?"
      },
      {
        "questionId": "s6-g4-t7-Q07",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why review doors/penetrations in containment?",
        "answer": "They alter mixing and pressure boundaries.",
        "explanation": "A containment name does not define actual separation.",
        "testedConcept": "Why review doors/penetrations in containment?"
      },
      {
        "questionId": "s6-g4-t7-Q08",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should one temperature range be assumed safe for all equipment?",
        "answer": "No.",
        "explanation": "Use exact supported environmental requirements.",
        "testedConcept": "Should one temperature range be assumed safe for all equipment?"
      },
      {
        "questionId": "s6-g4-t7-Q09",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is the relationship between cold and hot paths?",
        "answer": "Supply must reach inlets and exhaust must return without harmful mixing.",
        "explanation": "Both sides belong in the same plan.",
        "testedConcept": "What is the relationship between cold and hot paths?"
      },
      {
        "questionId": "s6-g4-t7-Q10",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies cold-aisle recovery?",
        "answer": "Supported inlet distribution and original service after approved exact restoration.",
        "explanation": "A room-average dashboard alone is insufficient.",
        "testedConcept": "What verifies cold-aisle recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t7-QC1",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does cold-aisle design require a raised floor?",
        "answer": "No.",
        "explanation": "Other supported supply/return architectures exist.",
        "testedConcept": "Does cold-aisle design require a raised floor?"
      },
      {
        "questionId": "s6-g4-t7-QC2",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a missing temperature sensor establish a safe condition?",
        "answer": "No.",
        "explanation": "It is missing evidence, not a low measurement.",
        "testedConcept": "Does a missing temperature sensor establish a safe condition?"
      },
      {
        "questionId": "s6-g4-t7-QC3",
        "topicId": "s6-g4-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is the relationship between cold and hot paths?",
        "answer": "Supply must reach inlets and exhaust must return without harmful mixing.",
        "explanation": "Both sides belong in the same plan.",
        "testedConcept": "What is the relationship between cold and hot paths?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g4-t8",
    "batch": "16",
    "title": "Cable management",
    "subtitle": "Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t8",
    "definition": "Cable management records and supports physical paths so connectivity, airflow and maintenance remain reproducible. Length/media/optic support, bend radius, strain relief, separation, endpoint identity and service movement all matter. A neat bundle can still combine both redundant paths into one failure domain.",
    "purpose": "Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification.",
    "mental": "Map every cable from exact endpoint port through patching and route to its remote port with supported media, optic and total length. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Endpoint record: Both port identities. Enables exact restoration.",
      "Route domain: Tray/patch/penetration path. Can correlate redundant links.",
      "Service allowance: Supported movement/strain. Must preserve airflow and connectors.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Map every cable from exact endpoint port through patching and route to its remote port with supported media, optic and total length.",
      "Provide supported bend/strain/service allowance without obstructing inlets, exhaust or replaceable units.",
      "Trace redundant routes to shared trays/penetrations and preserve labeling at both ends so recovery restores intent rather than a merely lit link."
    ],
    "flow": [
      [
        "Map the original operation",
        "Cable management records and supports physical paths so connectivity, airflow and maintenance remain reproducible. Length/media/optic support, bend radius, strain relief, separation, endpoint identity and service movement all matter. A neat bundle can still combine both redundant paths into one failure domain."
      ],
      [
        "Trace the first boundary",
        "Map every cable from exact endpoint port through patching and route to its remote port with supported media, optic and total length."
      ],
      [
        "Evaluate installed conditions",
        "Provide supported bend/strain/service allowance without obstructing inlets, exhaust or replaceable units."
      ],
      [
        "Verify capacity and recovery",
        "Trace redundant routes to shared trays/penetrations and preserve labeling at both ends so recovery restores intent rather than a merely lit link."
      ]
    ],
    "comparison": [
      [
        "Endpoint record",
        "Both port identities",
        "Enables exact restoration."
      ],
      [
        "Route domain",
        "Tray/patch/penetration path",
        "Can correlate redundant links."
      ],
      [
        "Service allowance",
        "Supported movement/strain",
        "Must preserve airflow and connectors."
      ]
    ],
    "example": "Case: Two redundant uplinks occupy one tray. What shared risk remains? Answer: A tray/route incident can interrupt both. Reason: Logical link diversity can share a physical domain. Case: Why preserve bend and strain requirements? Answer: Unsupported bends or tension can degrade or damage the link. Reason: A neatly tied bundle can still violate support. Case: What should be checked before changing a patch? Answer: Exact asset/port identity, ownership, supported path and recovery. Reason: A lit alternative port may be the wrong attachment.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification.",
        "expected": "Capture observer and timestamp. Correct endpoints/path and original service/policy results, with airflow restored. Link light alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "What length matters for supported channel planning?",
        "The complete installed channel including relevant patch segments. Straight-line rack distance is incomplete."
      ],
      [
        "How can rear cabling affect server performance?",
        "It can obstruct exhaust and contribute to thermal throttling. Physical cable layout interacts with cooling."
      ],
      [
        "Why keep tenant mapping protected while retaining labels?",
        "Operators need recovery identity but public topology may expose sensitive relationships. Availability and confidentiality both matter."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Control access to patching and expose sensitive tenant mappings only to authorized operators. OOB separation requires its actual path and policy, not just a different cable color.",
    "performance": "Incorrect media/length, bends or optical budget can impair links, and blocked airflow can reduce compute capacity. Serviceability and recovery accuracy are performance/availability constraints too.",
    "mistakes": [
      "Record both exact endpoints and route/context.",
      "A neatly tied bundle can still violate support.",
      "Normal maintenance can become a connectivity fault.",
      "A lit alternative port may be the wrong attachment."
    ],
    "prerequisites": [
      "s6-g0-t0"
    ],
    "related": [
      "s6-g5-t0"
    ],
    "lab": {
      "objective": "Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Cable management boundary",
        "Endpoint record → Route domain → Service allowance",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Produce a cable schedule and route diagram for the three-rack plan with A/B power, fabric and OOB paths separated by documented intent. Follow vendor and qualified facility separation/fire rules; the worksheet checks placement/capacity rather than physical cable certification.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Endpoint record, Route domain and Service allowance. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace redundant routes to shared trays/penetrations and preserve labeling at both ends so recovery restores intent rather than a merely lit link. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct endpoints/path and original service/policy results, with airflow restored. Link light alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Endpoint record → Route domain → Service allowance. Physical cable layout interacts with cooling. Availability and confidentiality both matter.",
      "challenge": "What should be checked before changing a patch? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Endpoint record": "Both port identities. Enables exact restoration.",
      "Route domain": "Tray/patch/penetration path. Can correlate redundant links.",
      "Service allowance": "Supported movement/strain. Must preserve airflow and connectors."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g4-t8-Q01",
        "topicId": "s6-g4-t8",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two redundant uplinks occupy one tray. What shared risk remains?",
        "answer": "A tray/route incident can interrupt both.",
        "explanation": "Logical link diversity can share a physical domain.",
        "testedConcept": "Two redundant uplinks occupy one tray. What shared risk remains?",
        "options": [
          "Only software hashing risk; cable routes cannot correlate failures.",
          "No common risk if the two cables have different colors.",
          "A tray/route incident can interrupt both.",
          "No common physical risk because the switches are different."
        ]
      },
      {
        "questionId": "s6-g4-t8-Q02",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does cable color alone identify a recoverable attachment?",
        "answer": "No.",
        "explanation": "Record both exact endpoints and route/context.",
        "testedConcept": "Does cable color alone identify a recoverable attachment?"
      },
      {
        "questionId": "s6-g4-t8-Q03",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What length matters for supported channel planning?",
        "answer": "The complete installed channel including relevant patch segments.",
        "explanation": "Straight-line rack distance is incomplete.",
        "testedConcept": "What length matters for supported channel planning?"
      },
      {
        "questionId": "s6-g4-t8-Q04",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve bend and strain requirements?",
        "answer": "Unsupported bends or tension can degrade or damage the link.",
        "explanation": "A neatly tied bundle can still violate support.",
        "testedConcept": "Why preserve bend and strain requirements?"
      },
      {
        "questionId": "s6-g4-t8-Q05",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "How can rear cabling affect server performance?",
        "answer": "It can obstruct exhaust and contribute to thermal throttling.",
        "explanation": "Physical cable layout interacts with cooling.",
        "testedConcept": "How can rear cabling affect server performance?"
      },
      {
        "questionId": "s6-g4-t8-Q06",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why include service-arm travel in the plan?",
        "answer": "Moving a supported chassis must not pull cords or data links.",
        "explanation": "Normal maintenance can become a connectivity fault.",
        "testedConcept": "Why include service-arm travel in the plan?"
      },
      {
        "questionId": "s6-g4-t8-Q07",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a separate OOB cable color establish isolation?",
        "answer": "No.",
        "explanation": "Actual route, attachment and enforcement must be traced.",
        "testedConcept": "Does a separate OOB cable color establish isolation?"
      },
      {
        "questionId": "s6-g4-t8-Q08",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be checked before changing a patch?",
        "answer": "Exact asset/port identity, ownership, supported path and recovery.",
        "explanation": "A lit alternative port may be the wrong attachment.",
        "testedConcept": "What should be checked before changing a patch?"
      },
      {
        "questionId": "s6-g4-t8-Q09",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why keep tenant mapping protected while retaining labels?",
        "answer": "Operators need recovery identity but public topology may expose sensitive relationships.",
        "explanation": "Availability and confidentiality both matter.",
        "testedConcept": "Why keep tenant mapping protected while retaining labels?"
      },
      {
        "questionId": "s6-g4-t8-Q10",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies cable recovery?",
        "answer": "Correct endpoints/path and original service/policy results, with airflow restored.",
        "explanation": "Link light alone is insufficient.",
        "testedConcept": "What verifies cable recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g4-t8-QC1",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does cable color alone identify a recoverable attachment?",
        "answer": "No.",
        "explanation": "Record both exact endpoints and route/context.",
        "testedConcept": "Does cable color alone identify a recoverable attachment?"
      },
      {
        "questionId": "s6-g4-t8-QC2",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "How can rear cabling affect server performance?",
        "answer": "It can obstruct exhaust and contribute to thermal throttling.",
        "explanation": "Physical cable layout interacts with cooling.",
        "testedConcept": "How can rear cabling affect server performance?"
      },
      {
        "questionId": "s6-g4-t8-QC3",
        "topicId": "s6-g4-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why keep tenant mapping protected while retaining labels?",
        "answer": "Operators need recovery identity but public topology may expose sensitive relationships.",
        "explanation": "Availability and confidentiality both matter.",
        "testedConcept": "Why keep tenant mapping protected while retaining labels?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g5-t0",
    "batch": "16",
    "title": "Out-of-band management",
    "subtitle": "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t0",
    "definition": "Out-of-band management gives administrators a supported management path separate from the workload operating system and intended production traffic dependencies. A BMC can remain usable while the host OS is stopped, but it still needs controller/standby power, a working upstream path, trusted endpoint and authorized operation.",
    "purpose": "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.",
    "mental": "BMC hardware/firmware provides inventory, console or power functions independently of the host OS on supported systems. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "BMC: Privileged management controller. Needs standby power and firmware.",
      "Dedicated path: Separate management attachment. Upstream independence still needs tracing.",
      "Authorized operation: Role-scoped action. Reachability does not grant permission.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "BMC hardware/firmware provides inventory, console or power functions independently of the host OS on supported systems.",
      "Dedicated versus shared NIC mode changes physical coupling; a dedicated port can still depend on the same switch, UPS or upstream access service.",
      "Authentication, role permission, trusted transport, logging and emergency recovery remain distinct requirements even after management reachability succeeds."
    ],
    "flow": [
      [
        "Map the original operation",
        "Out-of-band management gives administrators a supported management path separate from the workload operating system and intended production traffic dependencies. A BMC can remain usable while the host OS is stopped, but it still needs controller/standby power, a working upstream path, trusted endpoint and authorized operation."
      ],
      [
        "Trace the first boundary",
        "BMC hardware/firmware provides inventory, console or power functions independently of the host OS on supported systems."
      ],
      [
        "Evaluate installed conditions",
        "Dedicated versus shared NIC mode changes physical coupling; a dedicated port can still depend on the same switch, UPS or upstream access service."
      ],
      [
        "Verify capacity and recovery",
        "Authentication, role permission, trusted transport, logging and emergency recovery remain distinct requirements even after management reachability succeeds."
      ]
    ],
    "comparison": [
      [
        "BMC",
        "Privileged management controller",
        "Needs standby power and firmware."
      ],
      [
        "Dedicated path",
        "Separate management attachment",
        "Upstream independence still needs tracing."
      ],
      [
        "Authorized operation",
        "Role-scoped action",
        "Reachability does not grant permission."
      ]
    ],
    "example": "Case: Host OS is stopped, but standby power, protected path and read-role trust conditions are ready. Can a supported BMC read operation remain possible? Answer: Yes independently of host OS health. Reason: The controller has its own dependencies; actual session still needs verification. Case: Can a ping to a BMC prove administrator authorization? Answer: No. Reason: Reachability and requested operation permission are separate. Case: What should be verified for HTTPS management trust? Answer: The intended endpoint and valid trusted certificate/transport policy. Reason: An encrypted connection to the wrong endpoint is insufficient.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.",
        "expected": "Capture observer and timestamp. Original authorized read/control scope, denied guest operation and exact restored path/roles with redacted audit. A healthy host OS is not that evidence. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why separate read roles from power/virtual-media roles?",
        "Control operations can disrupt or bypass the workload OS. Inventory access need not grant destructive capability."
      ],
      [
        "What happens if standby power is unavailable?",
        "The management controller may be unavailable despite host-OS independence. Out-of-band is not independent of all power."
      ],
      [
        "What coupling can shared-NIC mode introduce?",
        "Management may depend on workload NIC/port attachment and policy. Physical mode affects failure domains."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "BMC privileges can bypass guest OS boundaries through power, console and virtual media. Isolate ingress, remove default/shared credentials, use trusted endpoint validation, minimal roles and redacted audit evidence.",
    "performance": "OOB is an availability path, not a high-throughput workload network. Console/media and firmware actions can consume controller/path capacity and disrupt service; monitor and rate-limit according to exact support.",
    "mistakes": [
      "Upstream supply and network parents can remain shared.",
      "Reachability and requested operation permission are separate.",
      "The recovery path should survive the changed boundary.",
      "An encrypted connection to the wrong endpoint is insufficient."
    ],
    "prerequisites": [
      "s5-g0-t3",
      "s5-g2-t5"
    ],
    "related": [
      "s6-g5-t1"
    ],
    "lab": {
      "objective": "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Out-of-band management boundary",
        "BMC → Dedicated path → Authorized operation",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using BMC, Dedicated path and Authorized operation. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication, role permission, trusted transport, logging and emergency recovery remain distinct requirements even after management reachability succeeds. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Original authorized read/control scope, denied guest operation and exact restored path/roles with redacted audit. A healthy host OS is not that evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "BMC → Dedicated path → Authorized operation. Out-of-band is not independent of all power. Physical mode affects failure domains.",
      "challenge": "What should be verified for HTTPS management trust? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "BMC": "Privileged management controller. Needs standby power and firmware.",
      "Dedicated path": "Separate management attachment. Upstream independence still needs tracing.",
      "Authorized operation": "Role-scoped action. Reachability does not grant permission."
    },
    "sources": [
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
        "checked": "2026-10-09"
      },
      {
        "title": "HPE iLO 6 security guidelines",
        "url": "https://support.hpe.com/hpesc/public/docDisplay?docId=sd00002198en_us&docLocale=en_US&page=GUID-C93876C5-7709-41CF-A9E8-0FD8438255A9.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Dell iDRAC9 5.x security configuration guide",
        "url": "https://www.dell.com/support/manuals/en-uk/idrac9-lifecycle-controller-v5.x-series/idrac9_security_configuration_guide/overview?guid=guid-a509a6da-8e73-419b-afc9-897e4122fc00&lang=en-us",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco standalone compute hardening guide",
        "url": "https://www.cisco.com/c/en/us/products/collateral/servers-unified-computing/compute-security-hardening-guide-standalone-wp.pdf",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g5-t0-Q01",
        "topicId": "s6-g5-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Host OS is stopped, but standby power, protected path and read-role trust conditions are ready. Can a supported BMC read operation remain possible?",
        "answer": "Yes independently of host OS health.",
        "explanation": "The controller has its own dependencies; actual session still needs verification.",
        "testedConcept": "Host OS is stopped, but standby power, protected path and read-role trust conditions are ready. Can a supported BMC read operation remain possible?",
        "options": [
          "Yes, and readiness grants every console/power operation automatically.",
          "Yes independently of host OS health.",
          "No; every BMC read requires a running host OS.",
          "Yes without standby power because OOB means no power dependency."
        ]
      },
      {
        "questionId": "s6-g5-t0-Q02",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a dedicated BMC NIC guarantee an independent UPS?",
        "answer": "No.",
        "explanation": "Upstream supply and network parents can remain shared.",
        "testedConcept": "Does a dedicated BMC NIC guarantee an independent UPS?"
      },
      {
        "questionId": "s6-g5-t0-Q03",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why separate read roles from power/virtual-media roles?",
        "answer": "Control operations can disrupt or bypass the workload OS.",
        "explanation": "Inventory access need not grant destructive capability.",
        "testedConcept": "Why separate read roles from power/virtual-media roles?"
      },
      {
        "questionId": "s6-g5-t0-Q04",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a ping to a BMC prove administrator authorization?",
        "answer": "No.",
        "explanation": "Reachability and requested operation permission are separate.",
        "testedConcept": "Can a ping to a BMC prove administrator authorization?"
      },
      {
        "questionId": "s6-g5-t0-Q05",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens if standby power is unavailable?",
        "answer": "The management controller may be unavailable despite host-OS independence.",
        "explanation": "Out-of-band is not independent of all power.",
        "testedConcept": "What happens if standby power is unavailable?"
      },
      {
        "questionId": "s6-g5-t0-Q06",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why retain a tested local recovery path?",
        "answer": "A network/role change can lock out remote management.",
        "explanation": "The recovery path should survive the changed boundary.",
        "testedConcept": "Why retain a tested local recovery path?"
      },
      {
        "questionId": "s6-g5-t0-Q07",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should BMC management be directly Internet exposed?",
        "answer": "No; use the protected authorized management design.",
        "explanation": "The controller is a highly privileged boundary.",
        "testedConcept": "Should BMC management be directly Internet exposed?"
      },
      {
        "questionId": "s6-g5-t0-Q08",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be verified for HTTPS management trust?",
        "answer": "The intended endpoint and valid trusted certificate/transport policy.",
        "explanation": "An encrypted connection to the wrong endpoint is insufficient.",
        "testedConcept": "What should be verified for HTTPS management trust?"
      },
      {
        "questionId": "s6-g5-t0-Q09",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What coupling can shared-NIC mode introduce?",
        "answer": "Management may depend on workload NIC/port attachment and policy.",
        "explanation": "Physical mode affects failure domains.",
        "testedConcept": "What coupling can shared-NIC mode introduce?"
      },
      {
        "questionId": "s6-g5-t0-Q10",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes OOB recovery evidence?",
        "answer": "Original authorized read/control scope, denied guest operation and exact restored path/roles with redacted audit.",
        "explanation": "A healthy host OS is not that evidence.",
        "testedConcept": "What completes OOB recovery evidence?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g5-t0-QC1",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a dedicated BMC NIC guarantee an independent UPS?",
        "answer": "No.",
        "explanation": "Upstream supply and network parents can remain shared.",
        "testedConcept": "Does a dedicated BMC NIC guarantee an independent UPS?"
      },
      {
        "questionId": "s6-g5-t0-QC2",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens if standby power is unavailable?",
        "answer": "The management controller may be unavailable despite host-OS independence.",
        "explanation": "Out-of-band is not independent of all power.",
        "testedConcept": "What happens if standby power is unavailable?"
      },
      {
        "questionId": "s6-g5-t0-QC3",
        "topicId": "s6-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What coupling can shared-NIC mode introduce?",
        "answer": "Management may depend on workload NIC/port attachment and policy.",
        "explanation": "Physical mode affects failure domains.",
        "testedConcept": "What coupling can shared-NIC mode introduce?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g5-t1",
    "batch": "16",
    "title": "iLO",
    "subtitle": "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t1",
    "definition": "Integrated Lights-Out is HPE server management implemented by supported controller hardware/firmware. This lesson uses iLO 6 security guidance for architectural orientation; feature availability, dedicated/shared-port support, licenses and exact procedures depend on the server and release.",
    "purpose": "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.",
    "mental": "iLO exposes supported inventory/health and privileged console/power functions while retaining controller/standby and upstream network dependencies. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "iLO generation: Controller family. Support varies by server/release.",
      "NIC mode: Dedicated or supported shared attachment. Changes physical dependencies.",
      "Feature entitlement: Supported/license scope. Does not replace role permission.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "iLO exposes supported inventory/health and privileged console/power functions while retaining controller/standby and upstream network dependencies.",
      "Supported dedicated or shared network mode changes attachment coupling, so verify the actual server capability and intended management boundary.",
      "Account roles, trusted transport, certificate/time context and audit retention govern the operation; a successful login does not authorize every function."
    ],
    "flow": [
      [
        "Map the original operation",
        "Integrated Lights-Out is HPE server management implemented by supported controller hardware/firmware. This lesson uses iLO 6 security guidance for architectural orientation; feature availability, dedicated/shared-port support, licenses and exact procedures depend on the server and release."
      ],
      [
        "Trace the first boundary",
        "iLO exposes supported inventory/health and privileged console/power functions while retaining controller/standby and upstream network dependencies."
      ],
      [
        "Evaluate installed conditions",
        "Supported dedicated or shared network mode changes attachment coupling, so verify the actual server capability and intended management boundary."
      ],
      [
        "Verify capacity and recovery",
        "Account roles, trusted transport, certificate/time context and audit retention govern the operation; a successful login does not authorize every function."
      ]
    ],
    "comparison": [
      [
        "iLO generation",
        "Controller family",
        "Support varies by server/release."
      ],
      [
        "NIC mode",
        "Dedicated or supported shared attachment",
        "Changes physical dependencies."
      ],
      [
        "Feature entitlement",
        "Supported/license scope",
        "Does not replace role permission."
      ]
    ],
    "example": "Case: An iLO page opens but the operator cannot start remote console. What should be checked beyond reachability? Answer: Exact supported feature/license, role permission and release requirements. Reason: A web login does not grant every function. Case: Why record the iLO generation with firmware? Answer: Procedures and security capabilities differ by release/family. Reason: The product name alone is insufficient. Case: Does a licensed feature automatically grant an account permission? Answer: No. Reason: Entitlement and role authorization are separate.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.",
        "expected": "Capture observer and timestamp. Original authorized operation, denied unprivileged operation and exact restored supported state. No actual vendor session is inferred from the worksheet. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Can iLO remain available when the host OS is stopped?",
        "On supported powered/controller-ready systems, yes. Host independence still requires standby power and upstream access."
      ],
      [
        "Is a shared NIC mode physically independent of the workload NIC?",
        "Not necessarily. Shared attachment introduces coupling that must be documented."
      ],
      [
        "What should be retained before changing iLO network settings?",
        "Exact supported baseline and independent local recovery. The change can remove the remote path used to administer it."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Apply the official generation-specific security guide and protect console/media/power roles. Keep credentials out of workbook commands and screenshots and do not disable certificate validation to make a demonstration connect.",
    "performance": "Controller functions have supported resource/connection limits and may depend on license or firmware. A responsive web page does not establish complete remote-console or virtual-media capacity.",
    "mistakes": [
      "Generational guidance is not a universal hardware assertion.",
      "The product name alone is insufficient.",
      "Trusted endpoint validation is part of the management boundary.",
      "Entitlement and role authorization are separate."
    ],
    "prerequisites": [
      "s5-g0-t3",
      "s5-g2-t5"
    ],
    "related": [
      "s6-g5-t2"
    ],
    "lab": {
      "objective": "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → iLO boundary",
        "iLO generation → NIC mode → Feature entitlement",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using iLO generation, NIC mode and Feature entitlement. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Account roles, trusted transport, certificate/time context and audit retention govern the operation; a successful login does not authorize every function. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Original authorized operation, denied unprivileged operation and exact restored supported state. No actual vendor session is inferred from the worksheet. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "iLO generation → NIC mode → Feature entitlement. Shared attachment introduces coupling that must be documented. The change can remove the remote path used to administer it.",
      "challenge": "Does a licensed feature automatically grant an account permission? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "iLO generation": "Controller family. Support varies by server/release.",
      "NIC mode": "Dedicated or supported shared attachment. Changes physical dependencies.",
      "Feature entitlement": "Supported/license scope. Does not replace role permission."
    },
    "sources": [
      {
        "title": "HPE iLO 6 security guidelines",
        "url": "https://support.hpe.com/hpesc/public/docDisplay?docId=sd00002198en_us&docLocale=en_US&page=GUID-C93876C5-7709-41CF-A9E8-0FD8438255A9.html",
        "checked": "2026-10-09"
      },
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g5-t1-Q01",
        "topicId": "s6-g5-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An iLO page opens but the operator cannot start remote console. What should be checked beyond reachability?",
        "answer": "Exact supported feature/license, role permission and release requirements.",
        "explanation": "A web login does not grant every function.",
        "testedConcept": "An iLO page opens but the operator cannot start remote console. What should be checked beyond reachability?",
        "options": [
          "Exact supported feature/license, role permission and release requirements.",
          "Only whether the host OS is running.",
          "Only whether the login page has the expected logo.",
          "Nothing else; a successful web login grants all features."
        ]
      },
      {
        "questionId": "s6-g5-t1-Q02",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does every HPE server necessarily have a dedicated iLO port?",
        "answer": "No; validate the actual supported hardware.",
        "explanation": "Generational guidance is not a universal hardware assertion.",
        "testedConcept": "Does every HPE server necessarily have a dedicated iLO port?"
      },
      {
        "questionId": "s6-g5-t1-Q03",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can iLO remain available when the host OS is stopped?",
        "answer": "On supported powered/controller-ready systems, yes.",
        "explanation": "Host independence still requires standby power and upstream access.",
        "testedConcept": "Can iLO remain available when the host OS is stopped?"
      },
      {
        "questionId": "s6-g5-t1-Q04",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the iLO generation with firmware?",
        "answer": "Procedures and security capabilities differ by release/family.",
        "explanation": "The product name alone is insufficient.",
        "testedConcept": "Why record the iLO generation with firmware?"
      },
      {
        "questionId": "s6-g5-t1-Q05",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is a shared NIC mode physically independent of the workload NIC?",
        "answer": "Not necessarily.",
        "explanation": "Shared attachment introduces coupling that must be documented.",
        "testedConcept": "Is a shared NIC mode physically independent of the workload NIC?"
      },
      {
        "questionId": "s6-g5-t1-Q06",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should certificate checks be disabled to simplify a lab login?",
        "answer": "No.",
        "explanation": "Trusted endpoint validation is part of the management boundary.",
        "testedConcept": "Should certificate checks be disabled to simplify a lab login?"
      },
      {
        "questionId": "s6-g5-t1-Q07",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why limit virtual-media privileges?",
        "answer": "They can affect boot and bypass workload OS controls.",
        "explanation": "Management permissions have a wider impact than simple inventory.",
        "testedConcept": "Why limit virtual-media privileges?"
      },
      {
        "questionId": "s6-g5-t1-Q08",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a licensed feature automatically grant an account permission?",
        "answer": "No.",
        "explanation": "Entitlement and role authorization are separate.",
        "testedConcept": "Does a licensed feature automatically grant an account permission?"
      },
      {
        "questionId": "s6-g5-t1-Q09",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be retained before changing iLO network settings?",
        "answer": "Exact supported baseline and independent local recovery.",
        "explanation": "The change can remove the remote path used to administer it.",
        "testedConcept": "What should be retained before changing iLO network settings?"
      },
      {
        "questionId": "s6-g5-t1-Q10",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies an iLO recovery?",
        "answer": "Original authorized operation, denied unprivileged operation and exact restored supported state.",
        "explanation": "No actual vendor session is inferred from the worksheet.",
        "testedConcept": "What verifies an iLO recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g5-t1-QC1",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does every HPE server necessarily have a dedicated iLO port?",
        "answer": "No; validate the actual supported hardware.",
        "explanation": "Generational guidance is not a universal hardware assertion.",
        "testedConcept": "Does every HPE server necessarily have a dedicated iLO port?"
      },
      {
        "questionId": "s6-g5-t1-QC2",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is a shared NIC mode physically independent of the workload NIC?",
        "answer": "Not necessarily.",
        "explanation": "Shared attachment introduces coupling that must be documented.",
        "testedConcept": "Is a shared NIC mode physically independent of the workload NIC?"
      },
      {
        "questionId": "s6-g5-t1-QC3",
        "topicId": "s6-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be retained before changing iLO network settings?",
        "answer": "Exact supported baseline and independent local recovery.",
        "explanation": "The change can remove the remote path used to administer it.",
        "testedConcept": "What should be retained before changing iLO network settings?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g5-t2",
    "batch": "16",
    "title": "iDRAC",
    "subtitle": "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t2",
    "definition": "Integrated Dell Remote Access Controller is privileged management on supported PowerEdge servers. This lesson anchors security discussion to the iDRAC9 5.x guide; hardware, firmware, license and NIC-mode support must be checked for the actual server rather than inferred across every generation.",
    "purpose": "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.",
    "mental": "iDRAC inventories supported host health and can provide role-scoped console, media and power operations while the OS has a separate lifecycle. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "iDRAC version: Supported controller context. Generation/release matters.",
      "Dedicated NIC: Management attachment option. Does not prove upstream diversity.",
      "Read/control roles: Scoped permissions. Power/media are higher-impact than inventory.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "iDRAC inventories supported host health and can provide role-scoped console, media and power operations while the OS has a separate lifecycle.",
      "Dedicated/shared network and failover modes affect actual management attachment and its common parents.",
      "Identity roles, certificate trust, audit and feature entitlement determine permitted operations after a network path is established."
    ],
    "flow": [
      [
        "Map the original operation",
        "Integrated Dell Remote Access Controller is privileged management on supported PowerEdge servers. This lesson anchors security discussion to the iDRAC9 5.x guide; hardware, firmware, license and NIC-mode support must be checked for the actual server rather than inferred across every generation."
      ],
      [
        "Trace the first boundary",
        "iDRAC inventories supported host health and can provide role-scoped console, media and power operations while the OS has a separate lifecycle."
      ],
      [
        "Evaluate installed conditions",
        "Dedicated/shared network and failover modes affect actual management attachment and its common parents."
      ],
      [
        "Verify capacity and recovery",
        "Identity roles, certificate trust, audit and feature entitlement determine permitted operations after a network path is established."
      ]
    ],
    "comparison": [
      [
        "iDRAC version",
        "Supported controller context",
        "Generation/release matters."
      ],
      [
        "Dedicated NIC",
        "Management attachment option",
        "Does not prove upstream diversity."
      ],
      [
        "Read/control roles",
        "Scoped permissions",
        "Power/media are higher-impact than inventory."
      ]
    ],
    "example": "Case: Two servers say iDRAC but use different generations. Can one procedure be assumed identical? Answer: No; validate exact generation/firmware/model guidance. Reason: A product family label does not establish support. Case: What does a successful iDRAC login prove? Answer: Accepted identity for that session, not permission for every action. Reason: Authorization remains operation specific. Case: What should a management NIC-mode change preserve? Answer: Exact prior mode/address/policy and independent recovery. Reason: An incorrect attachment can lock out remote administration.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.",
        "expected": "Capture observer and timestamp. Supported version/role/path and original authorized/denied management operations after exact restore. No actual iDRAC execution is claimed here. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Can a read-only inventory role be separated from power control?",
        "Yes in a supported role design; verify the actual role configuration. Monitoring need not grant service-interruption capability."
      ],
      [
        "Why preserve certificate/time context?",
        "Trust and audit interpretation depend on correct supported endpoint/time behavior. Reachable HTTPS alone is weaker evidence."
      ],
      [
        "Does iDRAC health alone certify application recovery?",
        "No. The original user transaction must be verified separately."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Treat remote console, virtual media and power as privileged. Use protected management ingress, trusted endpoint validation, minimal roles and sanitized audit; avoid public/default credential deployments.",
    "performance": "Management readiness and original workload health are independent observations. Firmware tasks, console/media and connection limits have model/release constraints and do not make iDRAC a workload-performance sensor for every layer.",
    "mistakes": [
      "It can still share switches, power and access services.",
      "Authorization remains operation specific.",
      "Feature availability and role permission differ.",
      "An incorrect attachment can lock out remote administration."
    ],
    "prerequisites": [
      "s5-g0-t3",
      "s5-g2-t5"
    ],
    "related": [
      "s6-g5-t3"
    ],
    "lab": {
      "objective": "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → iDRAC boundary",
        "iDRAC version → Dedicated NIC → Read/control roles",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using iDRAC version, Dedicated NIC and Read/control roles. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Identity roles, certificate trust, audit and feature entitlement determine permitted operations after a network path is established. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported version/role/path and original authorized/denied management operations after exact restore. No actual iDRAC execution is claimed here. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "iDRAC version → Dedicated NIC → Read/control roles. Reachable HTTPS alone is weaker evidence. The original user transaction must be verified separately.",
      "challenge": "What should a management NIC-mode change preserve? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "iDRAC version": "Supported controller context. Generation/release matters.",
      "Dedicated NIC": "Management attachment option. Does not prove upstream diversity.",
      "Read/control roles": "Scoped permissions. Power/media are higher-impact than inventory."
    },
    "sources": [
      {
        "title": "Dell iDRAC9 5.x security configuration guide",
        "url": "https://www.dell.com/support/manuals/en-uk/idrac9-lifecycle-controller-v5.x-series/idrac9_security_configuration_guide/overview?guid=guid-a509a6da-8e73-419b-afc9-897e4122fc00&lang=en-us",
        "checked": "2026-10-09"
      },
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g5-t2-Q01",
        "topicId": "s6-g5-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two servers say iDRAC but use different generations. Can one procedure be assumed identical?",
        "answer": "No; validate exact generation/firmware/model guidance.",
        "explanation": "A product family label does not establish support.",
        "testedConcept": "Two servers say iDRAC but use different generations. Can one procedure be assumed identical?",
        "options": [
          "Yes; every iDRAC generation has identical procedures.",
          "Yes if both servers are PowerEdge, regardless of release.",
          "Yes if both controller pages answer HTTPS.",
          "No; validate exact generation/firmware/model guidance."
        ]
      },
      {
        "questionId": "s6-g5-t2-Q02",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a dedicated iDRAC NIC prove independent upstream management?",
        "answer": "No.",
        "explanation": "It can still share switches, power and access services.",
        "testedConcept": "Does a dedicated iDRAC NIC prove independent upstream management?"
      },
      {
        "questionId": "s6-g5-t2-Q03",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a read-only inventory role be separated from power control?",
        "answer": "Yes in a supported role design; verify the actual role configuration.",
        "explanation": "Monitoring need not grant service-interruption capability.",
        "testedConcept": "Can a read-only inventory role be separated from power control?"
      },
      {
        "questionId": "s6-g5-t2-Q04",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does a successful iDRAC login prove?",
        "answer": "Accepted identity for that session, not permission for every action.",
        "explanation": "Authorization remains operation specific.",
        "testedConcept": "What does a successful iDRAC login prove?"
      },
      {
        "questionId": "s6-g5-t2-Q05",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve certificate/time context?",
        "answer": "Trust and audit interpretation depend on correct supported endpoint/time behavior.",
        "explanation": "Reachable HTTPS alone is weaker evidence.",
        "testedConcept": "Why preserve certificate/time context?"
      },
      {
        "questionId": "s6-g5-t2-Q06",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does license entitlement imply account authorization?",
        "answer": "No.",
        "explanation": "Feature availability and role permission differ.",
        "testedConcept": "Does license entitlement imply account authorization?"
      },
      {
        "questionId": "s6-g5-t2-Q07",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why is virtual media security-sensitive?",
        "answer": "It can affect boot and expose a path around workload OS controls.",
        "explanation": "Management has privileged reach.",
        "testedConcept": "Why is virtual media security-sensitive?"
      },
      {
        "questionId": "s6-g5-t2-Q08",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a management NIC-mode change preserve?",
        "answer": "Exact prior mode/address/policy and independent recovery.",
        "explanation": "An incorrect attachment can lock out remote administration.",
        "testedConcept": "What should a management NIC-mode change preserve?"
      },
      {
        "questionId": "s6-g5-t2-Q09",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does iDRAC health alone certify application recovery?",
        "answer": "No.",
        "explanation": "The original user transaction must be verified separately.",
        "testedConcept": "Does iDRAC health alone certify application recovery?"
      },
      {
        "questionId": "s6-g5-t2-Q10",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes an iDRAC recovery record?",
        "answer": "Supported version/role/path and original authorized/denied management operations after exact restore.",
        "explanation": "No actual iDRAC execution is claimed here.",
        "testedConcept": "What completes an iDRAC recovery record?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g5-t2-QC1",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a dedicated iDRAC NIC prove independent upstream management?",
        "answer": "No.",
        "explanation": "It can still share switches, power and access services.",
        "testedConcept": "Does a dedicated iDRAC NIC prove independent upstream management?"
      },
      {
        "questionId": "s6-g5-t2-QC2",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve certificate/time context?",
        "answer": "Trust and audit interpretation depend on correct supported endpoint/time behavior.",
        "explanation": "Reachable HTTPS alone is weaker evidence.",
        "testedConcept": "Why preserve certificate/time context?"
      },
      {
        "questionId": "s6-g5-t2-QC3",
        "topicId": "s6-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does iDRAC health alone certify application recovery?",
        "answer": "No.",
        "explanation": "The original user transaction must be verified separately.",
        "testedConcept": "Does iDRAC health alone certify application recovery?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "s6-g5-t3",
    "batch": "16",
    "title": "CIMC",
    "subtitle": "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t3",
    "definition": "Cisco Integrated Management Controller provides privileged management for supported Cisco compute systems. Standalone CIMC management, UCS Manager and Intersight are distinct operational contexts; support and control ownership depend on the actual server, mode, firmware and integration.",
    "purpose": "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.",
    "mental": "The supported controller exposes inventory, health and role-scoped console/power functions with standby and upstream path dependencies. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "CIMC: Compute management controller. Privileged and host-OS independent within support.",
      "Ownership mode: Standalone or integrated context. Determines configuration consumer.",
      "NIC mode: Supported management path choice. Trace shared parents.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The supported controller exposes inventory, health and role-scoped console/power functions with standby and upstream path dependencies.",
      "NIC mode and redundancy settings select a supported management attachment; dedicated mode alone does not establish all upstream failure diversity.",
      "Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed."
    ],
    "flow": [
      [
        "Map the original operation",
        "Cisco Integrated Management Controller provides privileged management for supported Cisco compute systems. Standalone CIMC management, UCS Manager and Intersight are distinct operational contexts; support and control ownership depend on the actual server, mode, firmware and integration."
      ],
      [
        "Trace the first boundary",
        "The supported controller exposes inventory, health and role-scoped console/power functions with standby and upstream path dependencies."
      ],
      [
        "Evaluate installed conditions",
        "NIC mode and redundancy settings select a supported management attachment; dedicated mode alone does not establish all upstream failure diversity."
      ],
      [
        "Verify capacity and recovery",
        "Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed."
      ]
    ],
    "comparison": [
      [
        "CIMC",
        "Compute management controller",
        "Privileged and host-OS independent within support."
      ],
      [
        "Ownership mode",
        "Standalone or integrated context",
        "Determines configuration consumer."
      ],
      [
        "NIC mode",
        "Supported management path choice",
        "Trace shared parents."
      ]
    ],
    "example": "Case: A server has CIMC. Does that automatically mean UCS Manager controls it? Answer: No. Reason: Standalone and integrated ownership contexts differ. Case: Can CIMC access remain possible while the workload OS is stopped? Answer: On a supported controller-ready powered path, yes. Reason: Host independence is not independence from all dependencies. Case: What recovery must precede a NIC-mode change? Answer: Supported exact baseline and tested independent local access. Reason: The new mode can remove the current remote path.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.",
        "expected": "Capture observer and timestamp. Correct ownership/version/path and original allowed/denied operation results after restore. The worksheet does not execute a Cisco management session. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Does dedicated NIC mode prove independent power?",
        "No. Standby and upstream switch/supply parents remain relevant."
      ],
      [
        "What does management reachability fail to establish?",
        "Identity, operation permission, endpoint trust and original service. A path alone is insufficient."
      ],
      [
        "Can a controller health page verify workload recovery?",
        "No. Original application operations require a separate observer."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Follow the Cisco hardening context for management access, roles and supported transport. Protect console/media/power and avoid publishing credentials or assuming workload OS controls govern the controller.",
    "performance": "A reachable CIMC and a healthy host are different observations. Controller connection/function support and update effects need exact release evidence, not a generic expectation of unlimited remote management.",
    "mistakes": [
      "A command in the wrong control plane may not govern the target.",
      "Host independence is not independence from all dependencies.",
      "Controller permissions have privileged impact.",
      "The new mode can remove the current remote path."
    ],
    "prerequisites": [
      "s5-g0-t3",
      "s5-g2-t5"
    ],
    "related": [
      "lab-6"
    ],
    "lab": {
      "objective": "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → CIMC boundary",
        "CIMC → Ownership mode → NIC mode",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using CIMC, Ownership mode and NIC mode. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct ownership/version/path and original allowed/denied operation results after restore. The worksheet does not execute a Cisco management session. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "CIMC → Ownership mode → NIC mode. A path alone is insufficient. Original application operations require a separate observer.",
      "challenge": "What recovery must precede a NIC-mode change? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "CIMC": "Compute management controller. Privileged and host-OS independent within support.",
      "Ownership mode": "Standalone or integrated context. Determines configuration consumer.",
      "NIC mode": "Supported management path choice. Trace shared parents."
    },
    "sources": [
      {
        "title": "Cisco standalone compute hardening guide",
        "url": "https://www.cisco.com/c/en/us/products/collateral/servers-unified-computing/compute-security-hardening-guide-standalone-wp.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g5-t3-Q01",
        "topicId": "s6-g5-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A server has CIMC. Does that automatically mean UCS Manager controls it?",
        "answer": "No.",
        "explanation": "Standalone and integrated ownership contexts differ.",
        "testedConcept": "A server has CIMC. Does that automatically mean UCS Manager controls it?",
        "options": [
          "Yes if the management NIC is dedicated.",
          "Yes if the server also has a healthy workload OS.",
          "No.",
          "Yes; CIMC always means UCS Manager owns every setting."
        ]
      },
      {
        "questionId": "s6-g5-t3-Q02",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record firmware and ownership mode before a change?",
        "answer": "Supported settings and their actual configuration consumer depend on context.",
        "explanation": "A command in the wrong control plane may not govern the target.",
        "testedConcept": "Why record firmware and ownership mode before a change?"
      },
      {
        "questionId": "s6-g5-t3-Q03",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dedicated NIC mode prove independent power?",
        "answer": "No.",
        "explanation": "Standby and upstream switch/supply parents remain relevant.",
        "testedConcept": "Does dedicated NIC mode prove independent power?"
      },
      {
        "questionId": "s6-g5-t3-Q04",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can CIMC access remain possible while the workload OS is stopped?",
        "answer": "On a supported controller-ready powered path, yes.",
        "explanation": "Host independence is not independence from all dependencies.",
        "testedConcept": "Can CIMC access remain possible while the workload OS is stopped?"
      },
      {
        "questionId": "s6-g5-t3-Q05",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does management reachability fail to establish?",
        "answer": "Identity, operation permission, endpoint trust and original service.",
        "explanation": "A path alone is insufficient.",
        "testedConcept": "What does management reachability fail to establish?"
      },
      {
        "questionId": "s6-g5-t3-Q06",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why restrict power/virtual-media roles?",
        "answer": "They can disrupt service or bypass the workload OS boundary.",
        "explanation": "Controller permissions have privileged impact.",
        "testedConcept": "Why restrict power/virtual-media roles?"
      },
      {
        "questionId": "s6-g5-t3-Q07",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should CIMC be treated as identical to Intersight?",
        "answer": "No.",
        "explanation": "They represent different local/central management contexts.",
        "testedConcept": "Should CIMC be treated as identical to Intersight?"
      },
      {
        "questionId": "s6-g5-t3-Q08",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What recovery must precede a NIC-mode change?",
        "answer": "Supported exact baseline and tested independent local access.",
        "explanation": "The new mode can remove the current remote path.",
        "testedConcept": "What recovery must precede a NIC-mode change?"
      },
      {
        "questionId": "s6-g5-t3-Q09",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a controller health page verify workload recovery?",
        "answer": "No.",
        "explanation": "Original application operations require a separate observer.",
        "testedConcept": "Can a controller health page verify workload recovery?"
      },
      {
        "questionId": "s6-g5-t3-Q10",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes CIMC recovery evidence?",
        "answer": "Correct ownership/version/path and original allowed/denied operation results after restore.",
        "explanation": "The worksheet does not execute a Cisco management session.",
        "testedConcept": "What completes CIMC recovery evidence?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g5-t3-QC1",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record firmware and ownership mode before a change?",
        "answer": "Supported settings and their actual configuration consumer depend on context.",
        "explanation": "A command in the wrong control plane may not govern the target.",
        "testedConcept": "Why record firmware and ownership mode before a change?"
      },
      {
        "questionId": "s6-g5-t3-QC2",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does management reachability fail to establish?",
        "answer": "Identity, operation permission, endpoint trust and original service.",
        "explanation": "A path alone is insufficient.",
        "testedConcept": "What does management reachability fail to establish?"
      },
      {
        "questionId": "s6-g5-t3-QC3",
        "topicId": "s6-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a controller health page verify workload recovery?",
        "answer": "No.",
        "explanation": "Original application operations require a separate observer.",
        "testedConcept": "Can a controller health page verify workload recovery?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "lab-6",
    "batch": "16",
    "title": "Data Center Foundations Lab",
    "subtitle": "Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map.",
    "level": "Intermediate → Advanced",
    "minutes": 120,
    "interactive": "dc-lab-6",
    "definition": "The Data Center Foundations Lab designs three racks as one dependency system: elevations, independent full-load power paths, cooling/airflow, fabric/cable schedules, capacity and protected OOB access. Its deliverables are explicit classroom artifacts, while physical installation, power loss, cooling and vendor sessions remain guided external exercises.",
    "purpose": "Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations.",
    "mental": "Map assets to R1/R2/R3 occupied U intervals and workload dependencies; validate no overlap while retaining dimensions, rails/mass and service-clearance requirements separately. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Elevation artifact: Three named rack maps. Inclusive intervals and remaining physical checks.",
      "Capacity artifact: Rack/site survivor and cooling budgets. Inputs are declarations.",
      "Recovery artifact: Owned fault and exact baseline restore. Offline predicates, not live failover.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Map assets to R1/R2/R3 occupied U intervals and workload dependencies; validate no overlap while retaining dimensions, rails/mass and service-clearance requirements separately.",
      "Trace every PSU and fabric/OOB cable to its upstream parent; compare each surviving rack/site feed and cooling envelope with the complete stated load.",
      "Preserve allowed administrator read and denied guest access in the offline plan, introduce one owned feed-capacity fault, restore exact serialized baseline and verify declared design predicates again."
    ],
    "flow": [
      [
        "Map the original operation",
        "The Data Center Foundations Lab designs three racks as one dependency system: elevations, independent full-load power paths, cooling/airflow, fabric/cable schedules, capacity and protected OOB access. Its deliverables are explicit classroom artifacts, while physical installation, power loss, cooling and vendor sessions remain guided external exercises."
      ],
      [
        "Trace the first boundary",
        "Map assets to R1/R2/R3 occupied U intervals and workload dependencies; validate no overlap while retaining dimensions, rails/mass and service-clearance requirements separately."
      ],
      [
        "Evaluate installed conditions",
        "Trace every PSU and fabric/OOB cable to its upstream parent; compare each surviving rack/site feed and cooling envelope with the complete stated load."
      ],
      [
        "Verify capacity and recovery",
        "Preserve allowed administrator read and denied guest access in the offline plan, introduce one owned feed-capacity fault, restore exact serialized baseline and verify declared design predicates again."
      ]
    ],
    "comparison": [
      [
        "Elevation artifact",
        "Three named rack maps",
        "Inclusive intervals and remaining physical checks."
      ],
      [
        "Capacity artifact",
        "Rack/site survivor and cooling budgets",
        "Inputs are declarations."
      ],
      [
        "Recovery artifact",
        "Owned fault and exact baseline restore",
        "Offline predicates, not live failover."
      ]
    ],
    "example": "Case: R1/R2/R3 loads are 6, 6 and 4 kW. What site IT load belongs in the capacity sheet? Answer: 16 kW. Reason: Sum all declared rack loads without averaging them. Case: Why preserve exactly three original racks? Answer: The original lab objective requires their elevations and coordinated dependencies. Reason: Do not replace it with a one-server demonstration. Case: What establishes exact plan restoration? Answer: Restored serialized bytes/hash plus repeated baseline design checks. Reason: A visually similar diagram can differ in policy or capacity.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations.",
        "expected": "Capture observer and timestamp. All six design deliverables, reviewed calculations, offline fault/restore and explicit guided physical/vendor limits. No actual three-rack installation or live failover is claimed. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "R1 feed B allowance becomes 4 kW while R1 load remains 6 kW. What design requirement fails?",
        "R1 full-load survival after A loss. Healthy sharing does not repair inadequate B capacity."
      ],
      [
        "At 16 kW and 2 m³/s with the declared coefficients, what mean air rise results?",
        "About 6.63 K. Sixteen divided by 1.2 times 1.005 times two."
      ],
      [
        "Why keep fabric and OOB cable paths separately documented?",
        "Management recovery should expose coupling to workload and upstream domains. Different colors alone do not prove independence."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Use documentation-only addresses and no credentials in the plan. Separate management identity/operation from workload access; facility and hardware execution requires exact supported ownership, approved qualified procedures and independent recovery.",
    "performance": "The baseline declares R1/R2/R3 loads 6/6/4 kW, each rack survivor allowance 8 kW, each site survivor allowance 20 kW and 20 kW sensible cooling. These invented inputs pass only the stated arithmetic and design predicates, not physical capacity or compliance certification.",
    "mistakes": [
      "The complete 16 kW load must fit each independently.",
      "Do not replace it with a one-server demonstration.",
      "Distribution, humidity and supported inlet conditions remain unmeasured.",
      "A visually similar diagram can differ in policy or capacity."
    ],
    "prerequisites": [
      "s6-g3-t5",
      "s6-g4-t0",
      "s6-g4-t1",
      "s6-g4-t4",
      "s6-g5-t0"
    ],
    "related": [
      "s7-g0-t0"
    ],
    "lab": {
      "objective": "Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "R1: storage U1–4 / compute U5–12 / leaves U40–41",
        "R2: compute U1–12 / leaves U40–41",
        "R3: backup U1–4 / leaves U36–37 / spines U38–39 / OOB switch U40",
        "Each PSU A → PDU A → UPS A → source domain A",
        "Each PSU B → PDU B → UPS B → source domain B",
        "Cold fronts → server airflow → hot rears → sensible cooling",
        "Authorized jump host → isolated OOB policy → BMC; guest denied"
      ],
      "steps": [
        "Produce the workbook three-rack elevations, A/B cord-to-source schedule, sensible cooling sheet, leaf-spine cable endpoints and protected OOB address/policy map. Run the optional offline owned plan rehearsal and keep its JSON validation distinct from actual service or physical observations.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Elevation artifact, Capacity artifact and Recovery artifact. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Preserve allowed administrator read and denied guest access in the offline plan, introduce one owned feed-capacity fault, restore exact serialized baseline and verify declared design predicates again. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Run python labs/data-center-plan.py --run for the offline JSON design validation and one-fault/exact-restore rehearsal. It creates only an owned temporary file directory, never actual racks, circuits, disks, VLANs or controllers."
      ],
      "verification": "All six design deliverables, reviewed calculations, offline fault/restore and explicit guided physical/vendor limits. No actual three-rack installation or live failover is claimed. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Elevation artifact → Capacity artifact → Recovery artifact. Sixteen divided by 1.2 times 1.005 times two. Different colors alone do not prove independence.",
      "challenge": "What establishes exact plan restoration? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Elevation artifact": "Three named rack maps. Inclusive intervals and remaining physical checks.",
      "Capacity artifact": "Rack/site survivor and cooling budgets. Inputs are declarations.",
      "Recovery artifact": "Owned fault and exact baseline restore. Offline predicates, not live failover."
    },
    "sources": [
      {
        "title": "Cisco scalable leaf-spine design",
        "url": "https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/white-paper-c11-743245.html",
        "checked": "2026-10-09"
      },
      {
        "title": "APC UPS selection — W versus VA and runtime",
        "url": "https://www.apc.com/us/en/support/product-support/ups-buying-guide-for-selecting-a-battery-backup-system.jsp",
        "checked": "2026-10-09"
      },
      {
        "title": "Schneider Electric containment measurements — historical study",
        "url": "https://blog.se.com/datacenter/2019/04/25/results-are-in-our-study-measuring-the-different-levels-of-data-center-air-containment/",
        "checked": "2026-10-09"
      },
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "lab-6-Q01",
        "topicId": "lab-6",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "R1/R2/R3 loads are 6, 6 and 4 kW. What site IT load belongs in the capacity sheet?",
        "answer": "16 kW.",
        "explanation": "Sum all declared rack loads without averaging them.",
        "testedConcept": "R1/R2/R3 loads are 6, 6 and 4 kW. What site IT load belongs in the capacity sheet?",
        "options": [
          "32 kW, double-counting A/B feeds as additional IT load.",
          "16 kW.",
          "6 kW, using only the highest-load rack.",
          "5.33 kW, using the average as the site total."
        ]
      },
      {
        "questionId": "lab-6-Q02",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Each site path has 25 kW rating at an 80% allowance. What survivor envelope applies?",
        "answer": "20 kW per path.",
        "explanation": "The complete 16 kW load must fit each independently.",
        "testedConcept": "Each site path has 25 kW rating at an 80% allowance. What survivor envelope applies?"
      },
      {
        "questionId": "lab-6-Q03",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "R1 feed B allowance becomes 4 kW while R1 load remains 6 kW. What design requirement fails?",
        "answer": "R1 full-load survival after A loss.",
        "explanation": "Healthy sharing does not repair inadequate B capacity.",
        "testedConcept": "R1 feed B allowance becomes 4 kW while R1 load remains 6 kW. What design requirement fails?"
      },
      {
        "questionId": "lab-6-Q04",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve exactly three original racks?",
        "answer": "The original lab objective requires their elevations and coordinated dependencies.",
        "explanation": "Do not replace it with a one-server demonstration.",
        "testedConcept": "Why preserve exactly three original racks?"
      },
      {
        "questionId": "lab-6-Q05",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "At 16 kW and 2 m³/s with the declared coefficients, what mean air rise results?",
        "answer": "About 6.63 K.",
        "explanation": "Sixteen divided by 1.2 times 1.005 times two.",
        "testedConcept": "At 16 kW and 2 m³/s with the declared coefficients, what mean air rise results?"
      },
      {
        "questionId": "lab-6-Q06",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 20 kW sensible cooling prove maximum inlet compliance?",
        "answer": "No.",
        "explanation": "Distribution, humidity and supported inlet conditions remain unmeasured.",
        "testedConcept": "Does 20 kW sensible cooling prove maximum inlet compliance?"
      },
      {
        "questionId": "lab-6-Q07",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does the offline guest denial test prove?",
        "answer": "The supplied design policy rejects that declared read operation.",
        "explanation": "It does not deploy a firewall, identity provider or BMC.",
        "testedConcept": "What does the offline guest denial test prove?"
      },
      {
        "questionId": "lab-6-Q08",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What establishes exact plan restoration?",
        "answer": "Restored serialized bytes/hash plus repeated baseline design checks.",
        "explanation": "A visually similar diagram can differ in policy or capacity.",
        "testedConcept": "What establishes exact plan restoration?"
      },
      {
        "questionId": "lab-6-Q09",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why keep fabric and OOB cable paths separately documented?",
        "answer": "Management recovery should expose coupling to workload and upstream domains.",
        "explanation": "Different colors alone do not prove independence.",
        "testedConcept": "Why keep fabric and OOB cable paths separately documented?"
      },
      {
        "questionId": "lab-6-Q10",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes lab acceptance within this course scope?",
        "answer": "All six design deliverables, reviewed calculations, offline fault/restore and explicit guided physical/vendor limits.",
        "explanation": "No actual three-rack installation or live failover is claimed.",
        "testedConcept": "What completes lab acceptance within this course scope?"
      }
    ],
    "quick": [
      {
        "questionId": "lab-6-QC1",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Each site path has 25 kW rating at an 80% allowance. What survivor envelope applies?",
        "answer": "20 kW per path.",
        "explanation": "The complete 16 kW load must fit each independently.",
        "testedConcept": "Each site path has 25 kW rating at an 80% allowance. What survivor envelope applies?"
      },
      {
        "questionId": "lab-6-QC2",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "At 16 kW and 2 m³/s with the declared coefficients, what mean air rise results?",
        "answer": "About 6.63 K.",
        "explanation": "Sixteen divided by 1.2 times 1.005 times two.",
        "testedConcept": "At 16 kW and 2 m³/s with the declared coefficients, what mean air rise results?"
      },
      {
        "questionId": "lab-6-QC3",
        "topicId": "lab-6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why keep fabric and OOB cable paths separately documented?",
        "answer": "Management recovery should expose coupling to workload and upstream domains.",
        "explanation": "Different colors alone do not prove independence.",
        "testedConcept": "Why keep fabric and OOB cable paths separately documented?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      },
      {
        "title": "Offline owned design fault and exact-restore rehearsal",
        "path": "labs/data-center-plan.py"
      }
    ]
  }
];
