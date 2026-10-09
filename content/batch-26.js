window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["26"] = [
  {
    "id": "hardware-0",
    "batch": "26",
    "title": "HPE ProLiant",
    "subtitle": "ProLiant model, generation and supported option population",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t0",
    "definition": "HPE ProLiant is a server product family. A usable service record identifies the exact model and generation, installed options, firmware, storage controller and management controller. Family branding cannot establish DIMM population, rail compatibility, supported drive replacement or firmware order.",
    "purpose": "Develop an auditable service decision for HPE ProLiant. ProLiant model, generation and supported option population. Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout.",
    "mental": "Trace request → NIC → DMA buffers → CPU → storage completion; a detected adapter does not prove a completed transaction. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Server Hardware foundation worksheet is reused here as a conceptual exercise; it does not emulate HPE ProLiant or verify this incident.",
    "components": [
      "Operational scope: ProLiant model, generation and supported option population. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Inventory: Installed components and attachment map. Discovery does not certify health.",
      "Telemetry: Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test: Original user operation. Checks the assembled dependency path.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "ProLiant model, generation and supported option population: establish exact identity and observer before interpreting state.",
      "Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout.",
      "Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback."
    ],
    "flow": [
      [
        "Identify the asset",
        "ProLiant model, generation and supported option population"
      ],
      [
        "Observe the incident",
        "A ProLiant has an amber health indication after a memory expansion; the OS still boots."
      ],
      [
        "Isolate the boundary",
        "Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout."
      ],
      [
        "Verify restoration",
        "Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A ProLiant has an amber health indication after a memory expansion; the OS still boots.",
        "Evidence must come from the named layer."
      ],
      [
        "Inventory",
        "Installed components and attachment map",
        "Discovery does not certify health."
      ],
      [
        "Telemetry",
        "Observed health and resource counters",
        "Correlate timestamp and sensor meaning."
      ],
      [
        "Service test",
        "Original user operation",
        "Checks the assembled dependency path."
      ]
    ],
    "example": "Authored incident: A ProLiant has an amber health indication after a memory expansion; the OS still boots. Investigation: Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout. Acceptance evidence: Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
        "expected": "Capture observer and timestamp. Health evidence plus the original service and preserved data integrity. A cleared alert alone is incomplete recovery evidence. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Tabletop first: Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout. Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "ProLiant model, generation and supported option population. Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback. Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A ProLiant has an amber health indication after a memory expansion; the OS still boots.",
        "Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout. Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback."
      ],
      [
        "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?",
        "The platform population map and usable local memory per socket. Socket count does not establish balanced memory access."
      ],
      [
        "The host reports thermal throttling while idle temperature looks normal. What evidence helps?",
        "Time-correlated inlet, fan, CPU frequency and workload telemetry. A single later temperature sample misses the triggering condition."
      ],
      [
        "Why preserve serial-to-slot mapping before maintenance?",
        "It prevents replacing a healthy component mistaken for the failed one. Logical device names and physical bays can differ."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Secure the controller and firmware update path as privileged infrastructure. Export inventory without serial-to-customer mappings or credentials; test access through the authorized management boundary.",
    "performance": "Measure the limiting resource under representative work. CPU utilization alone misses queueing, remote memory, PCIe bottlenecks and thermal throttling; nameplate power is not a workload measurement.",
    "mistakes": [
      "Treating the following partial evidence as completion: A ProLiant has an amber health indication after a memory expansion; the OS still boots.",
      "Presence is discovery evidence, not transaction evidence.",
      "A boot change can alter discovery without a disk failure.",
      "Physical fit does not imply a readable array.",
      "Duplicated parts can depend on one shared parent."
    ],
    "prerequisites": [
      "s6-g0-t0"
    ],
    "related": [
      "s6-g0-t0",
      "hardware-1"
    ],
    "lab": {
      "objective": "Investigate the HPE ProLiant incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Server Hardware boundary",
        "Inventory → Telemetry → Service test",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A ProLiant has an amber health indication after a memory expansion; the OS still boots.",
        "Write your diagnosis before using the foundation worksheet: Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout.",
        "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Inventory, Telemetry and Service test. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback."
      ],
      "verification": "Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback. Health evidence plus the original service and preserved data integrity. A cleared alert alone is incomplete recovery evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Inventory → Telemetry → Service test. A single later temperature sample misses the triggering condition. Logical device names and physical bays can differ.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Inventory": "Installed components and attachment map. Discovery does not certify health.",
      "Telemetry": "Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test": "Original user operation. Checks the assembled dependency path."
    },
    "sources": [
      {
        "title": "HPE ProLiant DL380 Gen10 maintenance guide — generation-specific example",
        "url": "https://support.hpe.com/hpesc/public/docDisplay?docId=a00018787en_us&docLocale=en_US",
        "checked": "2026-10-09"
      },
      {
        "title": "Intel S2600WF memory population rules — platform example",
        "url": "https://www.intel.com/content/www/us/en/support/articles/000055509/server-products/server-boards.html",
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
        "questionId": "hardware-0-Q1",
        "topicId": "hardware-0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An inventory lists two PSUs. What observation is still needed for feed resilience?",
        "answer": "Trace each cord through independent upstream capacity and retest the required service after a scoped loss.",
        "explanation": "Two replaceable supplies can share one PDU or UPS.",
        "testedConcept": "An inventory lists two PSUs. What observation is still needed for feed resilience?",
        "options": [
          "Trace each cord through independent upstream capacity and retest the required service after a scoped loss.",
          "Count both PSU modules in the chassis inventory only.",
          "Check only whether both power LEDs are green.",
          "Add the two PSU ratings without tracing either cord."
        ]
      },
      {
        "questionId": "hardware-0-Q2",
        "topicId": "hardware-0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A NIC appears in inventory but requests fail. What is the next evidence boundary?",
        "answer": "Driver, link, addressing, route and application response at the intended client.",
        "explanation": "Presence is discovery evidence, not transaction evidence.",
        "testedConcept": "A NIC appears in inventory but requests fail. What is the next evidence boundary?"
      },
      {
        "questionId": "hardware-0-Q3",
        "topicId": "hardware-0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?",
        "answer": "The platform population map and usable local memory per socket.",
        "explanation": "Socket count does not establish balanced memory access.",
        "testedConcept": "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?"
      },
      {
        "questionId": "hardware-0-Q4",
        "topicId": "hardware-0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "After a firmware update storage disappears. What baseline matters?",
        "answer": "Controller mode, firmware compatibility, device identity and boot configuration.",
        "explanation": "A boot change can alter discovery without a disk failure.",
        "testedConcept": "After a firmware update storage disappears. What baseline matters?"
      },
      {
        "questionId": "hardware-0-Q5",
        "topicId": "hardware-0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?",
        "answer": "Time-correlated inlet, fan, CPU frequency and workload telemetry.",
        "explanation": "A single later temperature sample misses the triggering condition.",
        "testedConcept": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?"
      },
      {
        "questionId": "hardware-0-Q6",
        "topicId": "hardware-0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A spare controller has the same connector. Is replacement compatibility proven?",
        "answer": "No; validate model, firmware, metadata format and cache protection.",
        "explanation": "Physical fit does not imply a readable array.",
        "testedConcept": "A spare controller has the same connector. Is replacement compatibility proven?"
      },
      {
        "questionId": "hardware-0-Q7",
        "topicId": "hardware-0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "The application is slow at 20% CPU. Name another bottleneck to inspect.",
        "answer": "Memory locality, I/O queue latency or network/PCIe capacity.",
        "explanation": "Aggregate CPU use hides stalled work.",
        "testedConcept": "The application is slow at 20% CPU. Name another bottleneck to inspect."
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A ProLiant has an amber health indication after a memory expansion; the OS still boots. What should be checked first?",
        "answer": "Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "ProLiant model, generation and supported option population",
        "topicId": "hardware-0",
        "questionId": "hardware-0-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this HPE ProLiant incident?",
        "answer": "Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "ProLiant model, generation and supported option population",
        "topicId": "hardware-0",
        "questionId": "hardware-0-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this HPE ProLiant case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "ProLiant model, generation and supported option population",
        "topicId": "hardware-0",
        "questionId": "hardware-0-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A ProLiant has an amber health indication after a memory expansion; the OS still boots. What should be checked first?",
        "answer": "Compare the exact server maintenance guide, DIMM slot population and hardware event record. Successful boot does not establish a supported memory layout.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "ProLiant model, generation and supported option population",
        "topicId": "hardware-0",
        "questionId": "hardware-0-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this HPE ProLiant incident?",
        "answer": "Record the supported slot map, resolved hardware event and workload memory observation; retain the original DIMM arrangement for qualified rollback.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "ProLiant model, generation and supported option population",
        "topicId": "hardware-0",
        "questionId": "hardware-0-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this HPE ProLiant case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "ProLiant model, generation and supported option population",
        "topicId": "hardware-0",
        "questionId": "hardware-0-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-1",
    "batch": "26",
    "title": "Dell PowerEdge",
    "subtitle": "PowerEdge Service Tag, controller and physical slot identity",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t0",
    "definition": "Dell PowerEdge is a server product family whose service procedures depend on the exact system and installed options. Tie the Service Tag and model to the correct service manual, and map each reported fault to a physical slot, controller or power path before planning replacement.",
    "purpose": "Develop an auditable service decision for Dell PowerEdge. PowerEdge Service Tag, controller and physical slot identity. Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED.",
    "mental": "Trace request → NIC → DMA buffers → CPU → storage completion; a detected adapter does not prove a completed transaction. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Server Hardware foundation worksheet is reused here as a conceptual exercise; it does not emulate Dell PowerEdge or verify this incident.",
    "components": [
      "Operational scope: PowerEdge Service Tag, controller and physical slot identity. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Inventory: Installed components and attachment map. Discovery does not certify health.",
      "Telemetry: Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test: Original user operation. Checks the assembled dependency path.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "PowerEdge Service Tag, controller and physical slot identity: establish exact identity and observer before interpreting state.",
      "Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED.",
      "Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup."
    ],
    "flow": [
      [
        "Identify the asset",
        "PowerEdge Service Tag, controller and physical slot identity"
      ],
      [
        "Observe the incident",
        "A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded."
      ],
      [
        "Isolate the boundary",
        "Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED."
      ],
      [
        "Verify restoration",
        "Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded.",
        "Evidence must come from the named layer."
      ],
      [
        "Inventory",
        "Installed components and attachment map",
        "Discovery does not certify health."
      ],
      [
        "Telemetry",
        "Observed health and resource counters",
        "Correlate timestamp and sensor meaning."
      ],
      [
        "Service test",
        "Original user operation",
        "Checks the assembled dependency path."
      ]
    ],
    "example": "Authored incident: A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded. Investigation: Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED. Acceptance evidence: Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
        "expected": "Capture observer and timestamp. Health evidence plus the original service and preserved data integrity. A cleared alert alone is incomplete recovery evidence. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Tabletop first: Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED. Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "PowerEdge Service Tag, controller and physical slot identity. Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup. Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded.",
        "Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED. Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup."
      ],
      [
        "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?",
        "The platform population map and usable local memory per socket. Socket count does not establish balanced memory access."
      ],
      [
        "The host reports thermal throttling while idle temperature looks normal. What evidence helps?",
        "Time-correlated inlet, fan, CPU frequency and workload telemetry. A single later temperature sample misses the triggering condition."
      ],
      [
        "Why preserve serial-to-slot mapping before maintenance?",
        "It prevents replacing a healthy component mistaken for the failed one. Logical device names and physical bays can differ."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Secure the controller and firmware update path as privileged infrastructure. Export inventory without serial-to-customer mappings or credentials; test access through the authorized management boundary.",
    "performance": "Measure the limiting resource under representative work. CPU utilization alone misses queueing, remote memory, PCIe bottlenecks and thermal throttling; nameplate power is not a workload measurement.",
    "mistakes": [
      "Treating the following partial evidence as completion: A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded.",
      "Presence is discovery evidence, not transaction evidence.",
      "A boot change can alter discovery without a disk failure.",
      "Physical fit does not imply a readable array.",
      "Duplicated parts can depend on one shared parent."
    ],
    "prerequisites": [
      "s6-g0-t0"
    ],
    "related": [
      "s6-g0-t0",
      "hardware-2"
    ],
    "lab": {
      "objective": "Investigate the Dell PowerEdge incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Server Hardware boundary",
        "Inventory → Telemetry → Service test",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded.",
        "Write your diagnosis before using the foundation worksheet: Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED.",
        "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Inventory, Telemetry and Service test. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup."
      ],
      "verification": "Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup. Health evidence plus the original service and preserved data integrity. A cleared alert alone is incomplete recovery evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Inventory → Telemetry → Service test. A single later temperature sample misses the triggering condition. Logical device names and physical bays can differ.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Inventory": "Installed components and attachment map. Discovery does not certify health.",
      "Telemetry": "Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test": "Original user operation. Checks the assembled dependency path."
    },
    "sources": [
      {
        "title": "Dell PowerEdge T550 service manual — model-specific example",
        "url": "https://www.dell.com/support/manuals/en-us/poweredge-t550/t550_ism/idrac-configuration?guid=guid-7bdd192c-3bf3-4da1-acf4-14684bce2a9b&lang=en-us",
        "checked": "2026-10-09"
      },
      {
        "title": "Intel S2600WF memory population rules — platform example",
        "url": "https://www.intel.com/content/www/us/en/support/articles/000055509/server-products/server-boards.html",
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
        "questionId": "hardware-1-Q1",
        "topicId": "hardware-1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An inventory lists two PSUs. What observation is still needed for feed resilience?",
        "answer": "Trace each cord through independent upstream capacity and retest the required service after a scoped loss.",
        "explanation": "Two replaceable supplies can share one PDU or UPS.",
        "testedConcept": "An inventory lists two PSUs. What observation is still needed for feed resilience?",
        "options": [
          "Trace each cord through independent upstream capacity and retest the required service after a scoped loss.",
          "Count both PSU modules in the chassis inventory only.",
          "Check only whether both power LEDs are green.",
          "Add the two PSU ratings without tracing either cord."
        ]
      },
      {
        "questionId": "hardware-1-Q2",
        "topicId": "hardware-1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A NIC appears in inventory but requests fail. What is the next evidence boundary?",
        "answer": "Driver, link, addressing, route and application response at the intended client.",
        "explanation": "Presence is discovery evidence, not transaction evidence.",
        "testedConcept": "A NIC appears in inventory but requests fail. What is the next evidence boundary?"
      },
      {
        "questionId": "hardware-1-Q3",
        "topicId": "hardware-1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?",
        "answer": "The platform population map and usable local memory per socket.",
        "explanation": "Socket count does not establish balanced memory access.",
        "testedConcept": "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?"
      },
      {
        "questionId": "hardware-1-Q4",
        "topicId": "hardware-1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "After a firmware update storage disappears. What baseline matters?",
        "answer": "Controller mode, firmware compatibility, device identity and boot configuration.",
        "explanation": "A boot change can alter discovery without a disk failure.",
        "testedConcept": "After a firmware update storage disappears. What baseline matters?"
      },
      {
        "questionId": "hardware-1-Q5",
        "topicId": "hardware-1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?",
        "answer": "Time-correlated inlet, fan, CPU frequency and workload telemetry.",
        "explanation": "A single later temperature sample misses the triggering condition.",
        "testedConcept": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?"
      },
      {
        "questionId": "hardware-1-Q6",
        "topicId": "hardware-1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A spare controller has the same connector. Is replacement compatibility proven?",
        "answer": "No; validate model, firmware, metadata format and cache protection.",
        "explanation": "Physical fit does not imply a readable array.",
        "testedConcept": "A spare controller has the same connector. Is replacement compatibility proven?"
      },
      {
        "questionId": "hardware-1-Q7",
        "topicId": "hardware-1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "The application is slow at 20% CPU. Name another bottleneck to inspect.",
        "answer": "Memory locality, I/O queue latency or network/PCIe capacity.",
        "explanation": "Aggregate CPU use hides stalled work.",
        "testedConcept": "The application is slow at 20% CPU. Name another bottleneck to inspect."
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded. What should be checked first?",
        "answer": "Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "PowerEdge Service Tag, controller and physical slot identity",
        "topicId": "hardware-1",
        "questionId": "hardware-1-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Dell PowerEdge incident?",
        "answer": "Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "PowerEdge Service Tag, controller and physical slot identity",
        "topicId": "hardware-1",
        "questionId": "hardware-1-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Dell PowerEdge case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "PowerEdge Service Tag, controller and physical slot identity",
        "topicId": "hardware-1",
        "questionId": "hardware-1-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A PowerEdge replacement drive appears in inventory, but its expected virtual disk is still degraded. What should be checked first?",
        "answer": "Correlate Service Tag, controller, enclosure and bay with the controller event history. Do not initialize a disk or import a foreign configuration based only on a drive LED.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "PowerEdge Service Tag, controller and physical slot identity",
        "topicId": "hardware-1",
        "questionId": "hardware-1-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Dell PowerEdge incident?",
        "answer": "Require the intended virtual disk state, completed supported recovery, application read verification and a separately tested backup.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "PowerEdge Service Tag, controller and physical slot identity",
        "topicId": "hardware-1",
        "questionId": "hardware-1-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Dell PowerEdge case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "PowerEdge Service Tag, controller and physical slot identity",
        "topicId": "hardware-1",
        "questionId": "hardware-1-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-2",
    "batch": "26",
    "title": "Cisco UCS",
    "subtitle": "UCS management ownership and server attachment",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t3",
    "definition": "Cisco UCS combines compute platforms with management and connectivity choices. A rack server may be standalone or integrated into a managed domain. Establish its actual ownership mode before interpreting CIMC, server profiles, fabric attachment or configuration authority.",
    "purpose": "Develop an auditable service decision for Cisco UCS. UCS management ownership and server attachment. Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting.",
    "mental": "The supported controller exposes inventory, health and role-scoped console/power functions with standby and upstream path dependencies. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded CIMC foundation worksheet is reused here as a conceptual exercise; it does not emulate Cisco UCS or verify this incident.",
    "components": [
      "Operational scope: UCS management ownership and server attachment. Exact model, installed release and ownership determine which vendor procedure applies.",
      "CIMC: Compute management controller. Privileged and host-OS independent within support.",
      "Ownership mode: Standalone or integrated context. Determines configuration consumer.",
      "NIC mode: Supported management path choice. Trace shared parents.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "UCS management ownership and server attachment: establish exact identity and observer before interpreting state.",
      "Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting.",
      "Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise."
    ],
    "flow": [
      [
        "Identify the asset",
        "UCS management ownership and server attachment"
      ],
      [
        "Observe the incident",
        "A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting."
      ],
      [
        "Isolate the boundary",
        "Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting."
      ],
      [
        "Verify restoration",
        "Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting. Investigation: Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting. Acceptance evidence: Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise.",
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
    "configuration": "Tabletop first: Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting. Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "UCS management ownership and server attachment. Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise. Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting.",
        "Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting. Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise."
      ],
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
      "Treating the following partial evidence as completion: A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting.",
      "A command in the wrong control plane may not govern the target.",
      "Host independence is not independence from all dependencies.",
      "Controller permissions have privileged impact.",
      "The new mode can remove the current remote path."
    ],
    "prerequisites": [
      "s6-g5-t3"
    ],
    "related": [
      "s6-g5-t3",
      "hardware-3"
    ],
    "lab": {
      "objective": "Investigate the Cisco UCS incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → CIMC boundary",
        "CIMC → Ownership mode → NIC mode",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting.",
        "Write your diagnosis before using the foundation worksheet: Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting.",
        "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using CIMC, Ownership mode and NIC mode. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise."
      ],
      "verification": "Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise. Correct ownership/version/path and original allowed/denied operation results after restore. The worksheet does not execute a Cisco management session. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "CIMC → Ownership mode → NIC mode. A path alone is insufficient. Original application operations require a separate observer.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "CIMC": "Compute management controller. Privileged and host-OS independent within support.",
      "Ownership mode": "Standalone or integrated context. Determines configuration consumer.",
      "NIC mode": "Supported management path choice. Trace shared parents."
    },
    "sources": [
      {
        "title": "Cisco IMC ownership and standalone overview",
        "url": "https://developer.cisco.com/docs/ucs-dev-center/ucs-imc/",
        "checked": "2026-10-09"
      },
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
        "questionId": "hardware-2-Q1",
        "topicId": "hardware-2",
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
        "questionId": "hardware-2-Q2",
        "topicId": "hardware-2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record firmware and ownership mode before a change?",
        "answer": "Supported settings and their actual configuration consumer depend on context.",
        "explanation": "A command in the wrong control plane may not govern the target.",
        "testedConcept": "Why record firmware and ownership mode before a change?"
      },
      {
        "questionId": "hardware-2-Q3",
        "topicId": "hardware-2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dedicated NIC mode prove independent power?",
        "answer": "No.",
        "explanation": "Standby and upstream switch/supply parents remain relevant.",
        "testedConcept": "Does dedicated NIC mode prove independent power?"
      },
      {
        "questionId": "hardware-2-Q4",
        "topicId": "hardware-2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can CIMC access remain possible while the workload OS is stopped?",
        "answer": "On a supported controller-ready powered path, yes.",
        "explanation": "Host independence is not independence from all dependencies.",
        "testedConcept": "Can CIMC access remain possible while the workload OS is stopped?"
      },
      {
        "questionId": "hardware-2-Q5",
        "topicId": "hardware-2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does management reachability fail to establish?",
        "answer": "Identity, operation permission, endpoint trust and original service.",
        "explanation": "A path alone is insufficient.",
        "testedConcept": "What does management reachability fail to establish?"
      },
      {
        "questionId": "hardware-2-Q6",
        "topicId": "hardware-2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why restrict power/virtual-media roles?",
        "answer": "They can disrupt service or bypass the workload OS boundary.",
        "explanation": "Controller permissions have privileged impact.",
        "testedConcept": "Why restrict power/virtual-media roles?"
      },
      {
        "questionId": "hardware-2-Q7",
        "topicId": "hardware-2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should CIMC be treated as identical to Intersight?",
        "answer": "No.",
        "explanation": "They represent different local/central management contexts.",
        "testedConcept": "Should CIMC be treated as identical to Intersight?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting. What should be checked first?",
        "answer": "Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "UCS management ownership and server attachment",
        "topicId": "hardware-2",
        "questionId": "hardware-2-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Cisco UCS incident?",
        "answer": "Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "UCS management ownership and server attachment",
        "topicId": "hardware-2",
        "questionId": "hardware-2-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Cisco UCS case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "UCS management ownership and server attachment",
        "topicId": "hardware-2",
        "questionId": "hardware-2-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A UCS C-Series server is reachable through CIMC but an operator cannot apply the expected standalone network setting. What should be checked first?",
        "answer": "Establish whether the server is standalone or controlled by UCS Manager/Intersight. Controller reachability does not establish which manager owns the setting.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "UCS management ownership and server attachment",
        "topicId": "hardware-2",
        "questionId": "hardware-2-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Cisco UCS incident?",
        "answer": "Retain the documented ownership mode, matching policy source and intended host NIC/HBA attachment. Mode conversion is outside this exercise.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "UCS management ownership and server attachment",
        "topicId": "hardware-2",
        "questionId": "hardware-2-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Cisco UCS case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "UCS management ownership and server attachment",
        "topicId": "hardware-2",
        "questionId": "hardware-2-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-3",
    "batch": "26",
    "title": "Rack Servers",
    "subtitle": "Rack server rail, depth and service envelope",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t1",
    "definition": "A rack server is a self-contained chassis mounted in standardized vertical rack space. Its rack-unit height describes vertical allocation, not depth, rail compatibility, weight, cooling direction or power demand. Rails, service clearance and cord reach are part of the supported installation.",
    "purpose": "Develop an auditable service decision for Rack Servers. Rack server rail, depth and service envelope. U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location.",
    "mental": "Translate chassis height into an inclusive U interval and check occupied intervals before mounting. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Rack Servers foundation worksheet is reused here as a conceptual exercise; it does not emulate Rack Servers or verify this incident.",
    "components": [
      "Operational scope: Rack server rail, depth and service envelope. Exact model, installed release and ownership determine which vendor procedure applies.",
      "U interval: Vertical occupied positions. A 2U device at U5 occupies U5 and U6.",
      "Rail envelope: Supported depth and service travel. Check vendor kit and cabinet compatibility.",
      "Feed path: Cord to upstream supply. Distinct outlets may share the same circuit.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Rack server rail, depth and service envelope: establish exact identity and observer before interpreting state.",
      "U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location.",
      "Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints."
    ],
    "flow": [
      [
        "Identify the asset",
        "Rack server rail, depth and service envelope"
      ],
      [
        "Observe the incident",
        "A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU."
      ],
      [
        "Isolate the boundary",
        "U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location."
      ],
      [
        "Verify restoration",
        "Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU.",
        "Evidence must come from the named layer."
      ],
      [
        "U interval",
        "Vertical occupied positions",
        "A 2U device at U5 occupies U5 and U6."
      ],
      [
        "Rail envelope",
        "Supported depth and service travel",
        "Check vendor kit and cabinet compatibility."
      ],
      [
        "Feed path",
        "Cord to upstream supply",
        "Distinct outlets may share the same circuit."
      ]
    ],
    "example": "Authored incident: A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU. Investigation: U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location. Acceptance evidence: Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "sha256sum labs/data-center-workbook.md",
        "explanation": "Observe only the fields reported by this exact command. Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.",
        "expected": "Capture observer and timestamp. No overlaps, supported dimensions/loading, documented feeds and service clearance. A neat drawing alone is not an installation validation. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Tabletop first: U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location. Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Rack server rail, depth and service envelope. Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints. Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU.",
        "U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location. Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints."
      ],
      [
        "Two devices both include U12. Is the elevation valid?",
        "No; their intervals overlap. Different front labels do not remove physical overlap."
      ],
      [
        "Does a 1U designation prove the server fits a shallow rack?",
        "No; depth, rails and cable clearance require separate checks. Rack-unit height says nothing about depth."
      ],
      [
        "A rack is locked but BMC HTTPS is Internet reachable. Is access controlled?",
        "No; management requires its own network and identity policy. Physical and logical boundaries are independent."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Lock physical and console access and retain asset ownership. A locked rack does not secure an exposed BMC network or a forgotten virtual-media session.",
    "performance": "Density is constrained by power, thermal removal, port counts and access as well as spare U positions. Empty rack space cannot compensate for an overloaded feed.",
    "mistakes": [
      "Treating the following partial evidence as completion: A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU.",
      "Vertical fit uses start plus height minus one.",
      "Available height is only one constraint.",
      "A rail motion can interrupt power or data.",
      "A lit wrong port can still break the service."
    ],
    "prerequisites": [
      "s6-g0-t1"
    ],
    "related": [
      "s6-g0-t1",
      "hardware-4"
    ],
    "lab": {
      "objective": "Investigate the Rack Servers incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Rack Servers boundary",
        "U interval → Rail envelope → Feed path",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU.",
        "Write your diagnosis before using the foundation worksheet: U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location.",
        "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using U interval, Rail envelope and Feed path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace both PSU cords beyond the rack outlets and reserve capacity on the surviving feed for the entire load. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints."
      ],
      "verification": "Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints. No overlaps, supported dimensions/loading, documented feeds and service clearance. A neat drawing alone is not an installation validation. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "U interval → Rail envelope → Feed path. Rack-unit height says nothing about depth. Physical and logical boundaries are independent.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "U interval": "Vertical occupied positions. A 2U device at U5 occupies U5 and U6.",
      "Rail envelope": "Supported depth and service travel. Check vendor kit and cabinet compatibility.",
      "Feed path": "Cord to upstream supply. Distinct outlets may share the same circuit."
    },
    "sources": [
      {
        "title": "DMTF Redfish standard and implementation resources",
        "url": "https://www.dmtf.org/standards/redfish",
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
        "questionId": "hardware-3-Q1",
        "topicId": "hardware-3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A 2U chassis starts at U5. Which positions are occupied?",
        "answer": "U5 and U6.",
        "explanation": "Intervals include both endpoints.",
        "testedConcept": "A 2U chassis starts at U5. Which positions are occupied?",
        "options": [
          "U5 only, because the starting position owns the height.",
          "U5 through U7, because the end is start plus height.",
          "U4 and U5, because a device extends below its starting label.",
          "U5 and U6."
        ]
      },
      {
        "questionId": "hardware-3-Q2",
        "topicId": "hardware-3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A new 3U device starts at U41 in a 42U rack. Does it fit?",
        "answer": "No; its last position would be U43.",
        "explanation": "Vertical fit uses start plus height minus one.",
        "testedConcept": "A new 3U device starts at U41 in a 42U rack. Does it fit?"
      },
      {
        "questionId": "hardware-3-Q3",
        "topicId": "hardware-3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two devices both include U12. Is the elevation valid?",
        "answer": "No; their intervals overlap.",
        "explanation": "Different front labels do not remove physical overlap.",
        "testedConcept": "Two devices both include U12. Is the elevation valid?"
      },
      {
        "questionId": "hardware-3-Q4",
        "topicId": "hardware-3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "There are 20 free U but the B feed cannot carry full rack load. What constrains expansion?",
        "answer": "Surviving-feed power capacity.",
        "explanation": "Available height is only one constraint.",
        "testedConcept": "There are 20 free U but the B feed cannot carry full rack load. What constrains expansion?"
      },
      {
        "questionId": "hardware-3-Q5",
        "topicId": "hardware-3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a 1U designation prove the server fits a shallow rack?",
        "answer": "No; depth, rails and cable clearance require separate checks.",
        "explanation": "Rack-unit height says nothing about depth.",
        "testedConcept": "Does a 1U designation prove the server fits a shallow rack?"
      },
      {
        "questionId": "hardware-3-Q6",
        "topicId": "hardware-3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should be verified before sliding a powered chassis for service?",
        "answer": "Cable-arm movement, cord slack, airflow and supported service procedure.",
        "explanation": "A rail motion can interrupt power or data.",
        "testedConcept": "What should be verified before sliding a powered chassis for service?"
      },
      {
        "questionId": "hardware-3-Q7",
        "topicId": "hardware-3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Where should a heavy chassis generally be considered in planning?",
        "answer": "Low positions subject to the cabinet and installation instructions.",
        "explanation": "Stability and rated loading matter beyond unused U.",
        "testedConcept": "Where should a heavy chassis generally be considered in planning?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU. What should be checked first?",
        "answer": "U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Rack server rail, depth and service envelope",
        "topicId": "hardware-3",
        "questionId": "hardware-3-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Rack Servers incident?",
        "answer": "Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Rack server rail, depth and service envelope",
        "topicId": "hardware-3",
        "questionId": "hardware-3-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Rack Servers case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Rack server rail, depth and service envelope",
        "topicId": "hardware-3",
        "questionId": "hardware-3-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A 2U server fits free rack units, but its rails and rear cable bend radius collide with the installed PDU. What should be checked first?",
        "answer": "U-height is only the vertical constraint. Check rail kit support, usable depth, connector clearance, load and service access before assigning the location.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Rack server rail, depth and service envelope",
        "topicId": "hardware-3",
        "questionId": "hardware-3-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Rack Servers incident?",
        "answer": "Produce an elevation plus measured depth/clearance and qualified mounting approval; move the proposed location on paper and recheck all constraints.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Rack server rail, depth and service envelope",
        "topicId": "hardware-3",
        "questionId": "hardware-3-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Rack Servers case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Rack server rail, depth and service envelope",
        "topicId": "hardware-3",
        "questionId": "hardware-3-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-4",
    "batch": "26",
    "title": "Blade Servers",
    "subtitle": "Blade enclosure shared failure domain",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t2",
    "definition": "Blade servers separate compute modules from a shared enclosure containing power, cooling, interconnects and management. Module redundancy and dense cabling can improve operations while enclosure power, midplane, firmware and interconnect dependencies enlarge the shared failure domain.",
    "purpose": "Develop an auditable service decision for Blade Servers. Blade enclosure shared failure domain. Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents.",
    "mental": "Map each blade CPU/memory to mezzanine adapter → enclosure interconnect → external fabric; slot identity and port mapping determine the actual path. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Blade Servers foundation worksheet is reused here as a conceptual exercise; it does not emulate Blade Servers or verify this incident.",
    "components": [
      "Operational scope: Blade enclosure shared failure domain. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Blade: Compute module. Depends on enclosure services.",
      "Enclosure: Shared power/cooling/management. Creates correlated failures.",
      "Interconnect: Module-to-fabric boundary. Port and mode mapping require validation.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Blade enclosure shared failure domain: establish exact identity and observer before interpreting state.",
      "Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents.",
      "Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted."
    ],
    "flow": [
      [
        "Identify the asset",
        "Blade enclosure shared failure domain"
      ],
      [
        "Observe the incident",
        "Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage."
      ],
      [
        "Isolate the boundary",
        "Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents."
      ],
      [
        "Verify restoration",
        "Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage.",
        "Evidence must come from the named layer."
      ],
      [
        "Blade",
        "Compute module",
        "Depends on enclosure services."
      ],
      [
        "Enclosure",
        "Shared power/cooling/management",
        "Creates correlated failures."
      ],
      [
        "Interconnect",
        "Module-to-fabric boundary",
        "Port and mode mapping require validation."
      ]
    ],
    "example": "Authored incident: Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage. Investigation: Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents. Acceptance evidence: Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.",
        "expected": "Capture observer and timestamp. Timestamped path and original-service evidence with exact restore and scoped cleanup. A management success message alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Tabletop first: Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents. Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Blade enclosure shared failure domain. Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted. Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage.",
        "Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents. Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted."
      ],
      [
        "A mezzanine NIC is detected but external traffic fails. What mapping must be traced?",
        "Blade slot and adapter port through the actual interconnect uplink. Discovery does not validate fabric mapping."
      ],
      [
        "Why record enclosure firmware before replacing a blade?",
        "Supported module, interconnect and management combinations may depend on release. Matching connector shapes do not guarantee compatibility."
      ],
      [
        "Why compare cable density with fault impact rather than only cable count?",
        "Fewer cables can concentrate traffic and failures on shared trunks. Operational convenience may hide correlated risk."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Enclosure management can affect many blades at once. Apply separate privileged roles, firmware provenance and audit retention; avoid treating the management module as a low-impact switch.",
    "performance": "Compare usable compute and uplink capacity after a power/interconnect loss. Shared uplinks and chassis thermal limits can constrain many workloads concurrently even when every blade is healthy.",
    "mistakes": [
      "Treating the following partial evidence as completion: Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage.",
      "Mechanical space does not imply service capacity.",
      "A second path can lack capacity or correct policy.",
      "Management privileges can bypass guest OS controls.",
      "Adapter count does not identify failure domains."
    ],
    "prerequisites": [
      "s6-g0-t2"
    ],
    "related": [
      "s6-g0-t2",
      "hardware-5"
    ],
    "lab": {
      "objective": "Investigate the Blade Servers incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Blade Servers boundary",
        "Blade → Enclosure → Interconnect",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage.",
        "Write your diagnosis before using the foundation worksheet: Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents.",
        "Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Blade, Enclosure and Interconnect. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Firmware and management coordinate module discovery; two blades in one enclosure do not survive every enclosure-level incident. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted."
      ],
      "verification": "Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted. Timestamped path and original-service evidence with exact restore and scoped cleanup. A management success message alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Blade → Enclosure → Interconnect. Matching connector shapes do not guarantee compatibility. Operational convenience may hide correlated risk.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Blade": "Compute module. Depends on enclosure services.",
      "Enclosure": "Shared power/cooling/management. Creates correlated failures.",
      "Interconnect": "Module-to-fabric boundary. Port and mode mapping require validation."
    },
    "sources": [
      {
        "title": "Intel S2600WF memory population rules — platform example",
        "url": "https://www.intel.com/content/www/us/en/support/articles/000055509/server-products/server-boards.html",
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
        "questionId": "hardware-4-Q1",
        "topicId": "hardware-4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Two application replicas occupy blades in the same enclosure. Which risk remains?",
        "answer": "An enclosure power, midplane or shared management failure.",
        "explanation": "Replicas are not independent just because compute modules differ.",
        "testedConcept": "Two application replicas occupy blades in the same enclosure. Which risk remains?",
        "options": [
          "Only a guest OS crash; the enclosure cannot affect both.",
          "Only a single blade DIMM failure, regardless of shared parents.",
          "An enclosure power, midplane or shared management failure.",
          "No common risk remains because the blades are separate servers."
        ]
      },
      {
        "questionId": "hardware-4-Q2",
        "topicId": "hardware-4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Empty blade slots are available. Can additional modules be approved from slot count alone?",
        "answer": "No; check power allocation, cooling, licensing and interconnect capacity.",
        "explanation": "Mechanical space does not imply service capacity.",
        "testedConcept": "Empty blade slots are available. Can additional modules be approved from slot count alone?"
      },
      {
        "questionId": "hardware-4-Q3",
        "topicId": "hardware-4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A mezzanine NIC is detected but external traffic fails. What mapping must be traced?",
        "answer": "Blade slot and adapter port through the actual interconnect uplink.",
        "explanation": "Discovery does not validate fabric mapping.",
        "testedConcept": "A mezzanine NIC is detected but external traffic fails. What mapping must be traced?"
      },
      {
        "questionId": "hardware-4-Q4",
        "topicId": "hardware-4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One interconnect is removed. What distinguishes redundancy from usable resilience?",
        "answer": "Surviving paths must carry the required load and the service must recover.",
        "explanation": "A second path can lack capacity or correct policy.",
        "testedConcept": "One interconnect is removed. What distinguishes redundancy from usable resilience?"
      },
      {
        "questionId": "hardware-4-Q5",
        "topicId": "hardware-4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record enclosure firmware before replacing a blade?",
        "answer": "Supported module, interconnect and management combinations may depend on release.",
        "explanation": "Matching connector shapes do not guarantee compatibility.",
        "testedConcept": "Why record enclosure firmware before replacing a blade?"
      },
      {
        "questionId": "hardware-4-Q6",
        "topicId": "hardware-4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An enclosure administrator can mount remote media on every blade. What security boundary is affected?",
        "answer": "Privileged access to the whole enclosure workload domain.",
        "explanation": "Management privileges can bypass guest OS controls.",
        "testedConcept": "An enclosure administrator can mount remote media on every blade. What security boundary is affected?"
      },
      {
        "questionId": "hardware-4-Q7",
        "topicId": "hardware-4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What placement improves protection from one enclosure outage?",
        "answer": "Replicas across independently powered enclosures with tested dependency paths.",
        "explanation": "Physical distribution needs independent shared parents.",
        "testedConcept": "What placement improves protection from one enclosure outage?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage. What should be checked first?",
        "answer": "Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Blade enclosure shared failure domain",
        "topicId": "hardware-4",
        "questionId": "hardware-4-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Blade Servers incident?",
        "answer": "Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Blade enclosure shared failure domain",
        "topicId": "hardware-4",
        "questionId": "hardware-4-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Blade Servers case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Blade enclosure shared failure domain",
        "topicId": "hardware-4",
        "questionId": "hardware-4-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "Two redundant application blades use different bays in one enclosure and lose service together during an enclosure outage. What should be checked first?",
        "answer": "Different blade bays still share enclosure power, cooling and interconnect dependencies. Trace the service through those parents.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Blade enclosure shared failure domain",
        "topicId": "hardware-4",
        "questionId": "hardware-4-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Blade Servers incident?",
        "answer": "Show an alternative placement across independent enclosures and verify the declared survivor capacity in the plan; real failover remains unexecuted.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Blade enclosure shared failure domain",
        "topicId": "hardware-4",
        "questionId": "hardware-4-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Blade Servers case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Blade enclosure shared failure domain",
        "topicId": "hardware-4",
        "questionId": "hardware-4-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-5",
    "batch": "26",
    "title": "Storage Arrays",
    "subtitle": "Array controller, volume and initiator access",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-5",
    "definition": "Storage arrays present managed storage through controllers and supported host-facing protocols. Media, protection layout, volume, initiator presentation and host multipathing are separate layers. An available controller or fabric login is insufficient evidence that an application can use the intended data.",
    "purpose": "Develop an auditable service decision for Storage Arrays. Array controller, volume and initiator access. Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery.",
    "mental": "Treat this lesson as a handoff between Initiator, Target, Shared block device. An initiator reaches a target over an allowed fabric or IP path and establishes the relevant storage session. A successful earlier handoff cannot stand in for evidence at the next one. Concurrent access needs coordination. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded SAN foundation worksheet is reused here as a conceptual exercise; it does not emulate Storage Arrays or verify this incident.",
    "components": [
      "Operational scope: Array controller, volume and initiator access. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Initiator: Endpoint issuing storage commands. Its identity must match the intended host.",
      "Target: Endpoint servicing commands. Reachability alone does not expose a LUN.",
      "Shared block device: Blocks visible to multiple hosts. Concurrent access needs coordination."
    ],
    "mechanism": [
      "Array controller, volume and initiator access: establish exact identity and observer before interpreting state.",
      "Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery.",
      "Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence."
    ],
    "flow": [
      [
        "Identify the asset",
        "Array controller, volume and initiator access"
      ],
      [
        "Observe the incident",
        "Both host HBAs are logged into the fabric, but the required array volume is absent from the host."
      ],
      [
        "Isolate the boundary",
        "Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery."
      ],
      [
        "Verify restoration",
        "Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "Both host HBAs are logged into the fabric, but the required array volume is absent from the host.",
        "Evidence must come from the named layer."
      ],
      [
        "Initiator",
        "Endpoint issuing storage commands",
        "Its identity must match the intended host."
      ],
      [
        "Target",
        "Endpoint servicing commands",
        "Reachability alone does not expose a LUN."
      ],
      [
        "Shared block device",
        "Blocks visible to multiple hosts",
        "Concurrent access needs coordination."
      ]
    ],
    "example": "Authored incident: Both host HBAs are logged into the fabric, but the required array volume is absent from the host. Investigation: Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery. Acceptance evidence: Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Tabletop first: Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery. Begin with recorded identity and the owned baseline. Configuration objective: Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: All FC links are up, but a newly installed host sees no assigned LUN. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.",
    "production": "Array controller, volume and initiator access. Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence. Assign ownership at each dependency boundary. A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Its identity must match the intended host. Concurrent access needs coordination. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "Both host HBAs are logged into the fabric, but the required array volume is absent from the host.",
        "Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery. Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence."
      ],
      [
        "All FC links are up, but a newly installed host sees no assigned LUN.",
        "Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch."
      ],
      [
        "Why use two independent fabrics?",
        "One fabric outage should leave a separate path. Two ports in one switch still share that switch."
      ],
      [
        "Why identify a LUN by stable identity across paths?",
        "The host must aggregate paths to one device, not mistake them for unrelated disks. Path count and device count differ."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: Both host HBAs are logged into the fabric, but the required array volume is absent from the host.",
      "A storage network is below filesystem semantics.",
      "Both can be necessary.",
      "Two ports in one switch still share that switch.",
      "Observe progressively higher layers.",
      "Path count and device count differ.",
      "Redundancy has a stated failure scope."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t3"
    ],
    "related": [
      "s8-g0-t3",
      "hardware-6"
    ],
    "lab": {
      "objective": "Investigate the Storage Arrays incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Initiator → Endpoint issuing storage commands",
        "Target → Endpoint servicing commands",
        "Shared block device → Blocks visible to multiple hosts"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: Both host HBAs are logged into the fabric, but the required array volume is absent from the host.",
        "Write your diagnosis before using the foundation worksheet: Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery.",
        "Read the case and draw the three labelled mechanism boundaries. Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. All FC links are up, but a newly installed host sees no assigned LUN. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence."
      ],
      "verification": "Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence. Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "All FC links are up, but a newly installed host sees no assigned LUN. A local physical/protocol link state, not LUN visibility or useful I/O.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Initiator": "Endpoint issuing storage commands. Its identity must match the intended host.",
      "Target": "Endpoint servicing commands. Reachability alone does not expose a LUN.",
      "Shared block device": "Blocks visible to multiple hosts. Concurrent access needs coordination."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      },
      {
        "title": "ONTAP FC/FCoE zoning and port identity",
        "url": "https://docs.netapp.com/us-en/ontap/san-config/fibre-channel-fcoe-zoning-concept.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "Both host HBAs are logged into the fabric, but the required array volume is absent from the host. What should be checked first?",
        "answer": "Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Array controller, volume and initiator access",
        "topicId": "hardware-5",
        "questionId": "hardware-5-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Storage Arrays incident?",
        "answer": "Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Array controller, volume and initiator access",
        "topicId": "hardware-5",
        "questionId": "hardware-5-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Storage Arrays case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Array controller, volume and initiator access",
        "topicId": "hardware-5",
        "questionId": "hardware-5-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-5-Q1",
        "topicId": "hardware-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a SAN automatically provide file locking between arbitrary hosts?",
        "answer": "No; block sharing needs a supported coordinating layer.",
        "explanation": "A storage network is below filesystem semantics.",
        "testedConcept": "Initiator"
      },
      {
        "questionId": "hardware-5-Q2",
        "topicId": "hardware-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What separates zoning from LUN masking?",
        "answer": "Zoning limits fabric communication; masking controls array presentation.",
        "explanation": "Both can be necessary.",
        "testedConcept": "Target"
      },
      {
        "questionId": "hardware-5-Q3",
        "topicId": "hardware-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why use two independent fabrics?",
        "answer": "One fabric outage should leave a separate path.",
        "explanation": "Two ports in one switch still share that switch.",
        "testedConcept": "Shared block device"
      },
      {
        "questionId": "hardware-5-Q4",
        "topicId": "hardware-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can link-up establish?",
        "answer": "A local physical/protocol link state, not LUN visibility or useful I/O.",
        "explanation": "Observe progressively higher layers.",
        "testedConcept": "Initiator"
      },
      {
        "questionId": "hardware-5-Q5",
        "topicId": "hardware-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why identify a LUN by stable identity across paths?",
        "answer": "The host must aggregate paths to one device, not mistake them for unrelated disks.",
        "explanation": "Path count and device count differ.",
        "testedConcept": "Target"
      },
      {
        "questionId": "hardware-5-Q6",
        "topicId": "hardware-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the three-host design still share?",
        "answer": "The array and any common power, management or data dependencies.",
        "explanation": "Redundancy has a stated failure scope.",
        "testedConcept": "Shared block device"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating Storage Arrays?",
        "answer": "Array controller, volume and initiator access.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-5",
        "questionId": "hardware-5-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "Both host HBAs are logged into the fabric, but the required array volume is absent from the host. What should be checked first?",
        "answer": "Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Array controller, volume and initiator access",
        "topicId": "hardware-5",
        "questionId": "hardware-5-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Storage Arrays incident?",
        "answer": "Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Array controller, volume and initiator access",
        "topicId": "hardware-5",
        "questionId": "hardware-5-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Storage Arrays case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Array controller, volume and initiator access",
        "topicId": "hardware-5",
        "questionId": "hardware-5-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "Both host HBAs are logged into the fabric, but the required array volume is absent from the host.",
      "restore": "Fabric login and zoning do not establish array-side presentation. Trace initiator identity, volume mapping, controller access and host multipath discovery. Correlate the same volume identity across array and host, verify authorized access and excluded-host isolation, and retain application-level evidence.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-6",
    "batch": "26",
    "title": "HPE MSA",
    "subtitle": "MSA host initiator mapping and supported multipathing",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-6",
    "definition": "HPE MSA is a storage array family with generation-specific controller, host-port and storage configurations. Identify the installed model, firmware and supported host combination before applying an MSA procedure. Follow a volume through its host mapping and supported paths instead of inferring redundancy from controller count.",
    "purpose": "Develop an auditable service decision for HPE MSA. MSA host initiator mapping and supported multipathing. Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths.",
    "mental": "Treat this lesson as a handoff between Path, ALUA, All paths down. Host discovery groups paths by stable device identity rather than transient device name. A successful earlier handoff cannot stand in for evidence at the next one. Queueing and timeout policy affect applications. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded Multipathing foundation worksheet is reused here as a conceptual exercise; it does not emulate HPE MSA or verify this incident.",
    "components": [
      "Operational scope: MSA host initiator mapping and supported multipathing. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Path: Host-to-target access route. Multiple routes can share a switch.",
      "ALUA: Asymmetric logical unit access state. Optimized and nonoptimized paths need distinct interpretation.",
      "All paths down: No usable route to the device. Queueing and timeout policy affect applications."
    ],
    "mechanism": [
      "MSA host initiator mapping and supported multipathing: establish exact identity and observer before interpreting state.",
      "Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths.",
      "Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume."
    ],
    "flow": [
      [
        "Identify the asset",
        "MSA host initiator mapping and supported multipathing"
      ],
      [
        "Observe the incident",
        "An HPE MSA host retains one path after an HBA replacement although both physical links are up."
      ],
      [
        "Isolate the boundary",
        "Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths."
      ],
      [
        "Verify restoration",
        "Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "An HPE MSA host retains one path after an HBA replacement although both physical links are up.",
        "Evidence must come from the named layer."
      ],
      [
        "Path",
        "Host-to-target access route",
        "Multiple routes can share a switch."
      ],
      [
        "ALUA",
        "Asymmetric logical unit access state",
        "Optimized and nonoptimized paths need distinct interpretation."
      ],
      [
        "All paths down",
        "No usable route to the device",
        "Queueing and timeout policy affect applications."
      ]
    ],
    "example": "Authored incident: An HPE MSA host retains one path after an HBA replacement although both physical links are up. Investigation: Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths. Acceptance evidence: Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t5",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Tabletop first: Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths. Begin with recorded identity and the owned baseline. Configuration objective: Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.",
    "production": "MSA host initiator mapping and supported multipathing. Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume. Assign ownership at each dependency boundary. After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Multiple routes can share a switch. Queueing and timeout policy affect applications. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Path states and array access preferences guide selection through the supported multipath implementation. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An HPE MSA host retains one path after an HBA replacement although both physical links are up.",
        "Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths. Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume."
      ],
      [
        "The displayed path count is four, but every route crosses Fabric A, so its loss removes all access.",
        "Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration."
      ],
      [
        "Does a nonoptimized ALUA path necessarily mean unusable?",
        "No; behavior depends on supported access state and policy. Preference is not simply up/down."
      ],
      [
        "Does failover double throughput automatically?",
        "No. Policy, workload and shared bottlenecks limit capacity."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: An HPE MSA host retains one path after an HBA replacement although both physical links are up.",
      "Equal capacity alone is insufficient.",
      "Count independence, not only rows.",
      "Preference is not simply up/down.",
      "An application can stall even before an explicit error.",
      "Policy, workload and shared bottlenecks limit capacity.",
      "A path-status change alone does not prove service."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t5"
    ],
    "related": [
      "s8-g2-t5",
      "hardware-7"
    ],
    "lab": {
      "objective": "Investigate the HPE MSA incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Path → Host-to-target access route",
        "ALUA → Asymmetric logical unit access state",
        "All paths down → No usable route to the device"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: An HPE MSA host retains one path after an HBA replacement although both physical links are up.",
        "Write your diagnosis before using the foundation worksheet: Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths.",
        "Read the case and draw the three labelled mechanism boundaries. Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume."
      ],
      "verification": "Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume. Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. I/O may queue or fail according to policy and timeouts.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Path": "Host-to-target access route. Multiple routes can share a switch.",
      "ALUA": "Asymmetric logical unit access state. Optimized and nonoptimized paths need distinct interpretation.",
      "All paths down": "No usable route to the device. Queueing and timeout policy affect applications."
    },
    "sources": [
      {
        "title": "HPE MSA 2040 configuration — historical platform example, not a universal MSA procedure",
        "url": "https://support.hpe.com/hpesc/public/docDisplay?docId=c05075467&docLocale=en_US",
        "checked": "2026-10-09"
      },
      {
        "title": "RHEL 9 Device Mapper Multipath",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_device_mapper_multipath/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "An HPE MSA host retains one path after an HBA replacement although both physical links are up. What should be checked first?",
        "answer": "Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "MSA host initiator mapping and supported multipathing",
        "topicId": "hardware-6",
        "questionId": "hardware-6-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this HPE MSA incident?",
        "answer": "Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "MSA host initiator mapping and supported multipathing",
        "topicId": "hardware-6",
        "questionId": "hardware-6-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this HPE MSA case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "MSA host initiator mapping and supported multipathing",
        "topicId": "hardware-6",
        "questionId": "hardware-6-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-6-Q1",
        "topicId": "hardware-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should multipathing group together?",
        "answer": "Paths with the same correct stable device identity.",
        "explanation": "Equal capacity alone is insufficient.",
        "testedConcept": "Path"
      },
      {
        "questionId": "hardware-6-Q2",
        "topicId": "hardware-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can four paths still have one switch failure domain?",
        "answer": "Yes.",
        "explanation": "Count independence, not only rows.",
        "testedConcept": "ALUA"
      },
      {
        "questionId": "hardware-6-Q3",
        "topicId": "hardware-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a nonoptimized ALUA path necessarily mean unusable?",
        "answer": "No; behavior depends on supported access state and policy.",
        "explanation": "Preference is not simply up/down.",
        "testedConcept": "All paths down"
      },
      {
        "questionId": "hardware-6-Q4",
        "topicId": "hardware-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can happen when all paths are lost?",
        "answer": "I/O may queue or fail according to policy and timeouts.",
        "explanation": "An application can stall even before an explicit error.",
        "testedConcept": "Path"
      },
      {
        "questionId": "hardware-6-Q5",
        "topicId": "hardware-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does failover double throughput automatically?",
        "answer": "No.",
        "explanation": "Policy, workload and shared bottlenecks limit capacity.",
        "testedConcept": "ALUA"
      },
      {
        "questionId": "hardware-6-Q6",
        "topicId": "hardware-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence demonstrates a useful failover test?",
        "answer": "Original workload I/O and integrity with one owned path domain absent, plus restoration.",
        "explanation": "A path-status change alone does not prove service.",
        "testedConcept": "All paths down"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating HPE MSA?",
        "answer": "MSA host initiator mapping and supported multipathing.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-6",
        "questionId": "hardware-6-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "An HPE MSA host retains one path after an HBA replacement although both physical links are up. What should be checked first?",
        "answer": "Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "MSA host initiator mapping and supported multipathing",
        "topicId": "hardware-6",
        "questionId": "hardware-6-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this HPE MSA incident?",
        "answer": "Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "MSA host initiator mapping and supported multipathing",
        "topicId": "hardware-6",
        "questionId": "hardware-6-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this HPE MSA case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "MSA host initiator mapping and supported multipathing",
        "topicId": "hardware-6",
        "questionId": "hardware-6-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "An HPE MSA host retains one path after an HBA replacement although both physical links are up.",
      "restore": "Compare the replacement initiator identity with the host mapping, both fabrics and supported host multipath configuration. Controller redundancy alone does not create both host paths. Document the exact MSA generation/firmware, supported host combination, correct initiators and expected restored paths to the same volume.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-7",
    "batch": "26",
    "title": "Dell EMC",
    "subtitle": "Dell storage product identity and host presentation",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-7",
    "definition": "Dell EMC is a broad vendor/product label, not one storage architecture or command language. This lesson uses PowerStore host-volume mapping as a bounded example. Identify the actual platform, release and block/file service before selecting documentation; do not apply PowerStore instructions to another Dell array family.",
    "purpose": "Develop an auditable service decision for Dell EMC. Dell storage product identity and host presentation. Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions.",
    "mental": "Treat this lesson as a handoff between LUN number, Device WWID, Masking. The array creates a logical storage object from its backing allocation and protection scheme. A successful earlier handoff cannot stand in for evidence at the next one. Visibility does not establish safe shared writes. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded LUN foundation worksheet is reused here as a conceptual exercise; it does not emulate Dell EMC or verify this incident.",
    "components": [
      "Operational scope: Dell storage product identity and host presentation. Exact model, installed release and ownership determine which vendor procedure applies.",
      "LUN number: Address within the presentation context. It is not globally unique data identity.",
      "Device WWID: Stable identifier used to distinguish a device. Compare it across paths.",
      "Masking: Restriction of presentation to initiators. Visibility does not establish safe shared writes."
    ],
    "mechanism": [
      "Dell storage product identity and host presentation: establish exact identity and observer before interpreting state.",
      "Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions.",
      "For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax."
    ],
    "flow": [
      [
        "Identify the asset",
        "Dell storage product identity and host presentation"
      ],
      [
        "Observe the incident",
        "An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume."
      ],
      [
        "Isolate the boundary",
        "Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions."
      ],
      [
        "Verify restoration",
        "For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume.",
        "Evidence must come from the named layer."
      ],
      [
        "LUN number",
        "Address within the presentation context",
        "It is not globally unique data identity."
      ],
      [
        "Device WWID",
        "Stable identifier used to distinguish a device",
        "Compare it across paths."
      ],
      [
        "Masking",
        "Restriction of presentation to initiators",
        "Visibility does not establish safe shared writes."
      ]
    ],
    "example": "Authored incident: An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume. Investigation: Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions. Acceptance evidence: For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t4",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Tabletop first: Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions. Begin with recorded identity and the owned baseline. Configuration objective: Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.",
    "production": "Dell storage product identity and host presentation. For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax. Assign ownership at each dependency boundary. Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It is not globally unique data identity. Visibility does not establish safe shared writes. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Mapping presents that object to selected initiators using a supported LUN addressing policy. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume.",
        "Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions. For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax."
      ],
      [
        "A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused.",
        "Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation."
      ],
      [
        "Does mapping a LUN create a filesystem?",
        "No. It presents blocks for a consumer."
      ],
      [
        "What protects a LUN from an unintended host at the array?",
        "The intended initiator mapping/masking policy. A fabric zone alone is not object authorization."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume.",
      "Different targets can reuse a number.",
      "Size and LUN number alone are weak evidence.",
      "It presents blocks for a consumer.",
      "Paths are access routes to the same entity.",
      "A fabric zone alone is not object authorization.",
      "This course never formats host devices."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t4"
    ],
    "related": [
      "s8-g2-t4",
      "hardware-8"
    ],
    "lab": {
      "objective": "Investigate the Dell EMC incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "LUN number → Address within the presentation context",
        "Device WWID → Stable identifier used to distinguish a device",
        "Masking → Restriction of presentation to initiators"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume.",
        "Write your diagnosis before using the foundation worksheet: Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions.",
        "Read the case and draw the three labelled mechanism boundaries. Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax."
      ],
      "verification": "For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax. Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Yes.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "LUN number": "Address within the presentation context. It is not globally unique data identity.",
      "Device WWID": "Stable identifier used to distinguish a device. Compare it across paths.",
      "Masking": "Restriction of presentation to initiators. Visibility does not establish safe shared writes."
    },
    "sources": [
      {
        "title": "Dell PowerStore mapping volumes to a host or host group",
        "url": "https://www.dell.com/support/manuals/en-in/powerstore-1000/pwrstr-cfg-vols/map-volumes-to-a-host-or-host-group?guid=guid-1b907834-685e-4bfc-91d1-6490fbd438ac&lang=en-us",
        "checked": "2026-10-09"
      },
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      },
      {
        "title": "ONTAP FC/FCoE zoning and port identity",
        "url": "https://docs.netapp.com/us-en/ontap/san-config/fibre-channel-fcoe-zoning-concept.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume. What should be checked first?",
        "answer": "Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Dell storage product identity and host presentation",
        "topicId": "hardware-7",
        "questionId": "hardware-7-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Dell EMC incident?",
        "answer": "For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Dell storage product identity and host presentation",
        "topicId": "hardware-7",
        "questionId": "hardware-7-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Dell EMC case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Dell storage product identity and host presentation",
        "topicId": "hardware-7",
        "questionId": "hardware-7-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-7-Q1",
        "topicId": "hardware-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is LUN 5 globally unique?",
        "answer": "No; it is scoped to a presentation context.",
        "explanation": "Different targets can reuse a number.",
        "testedConcept": "LUN number"
      },
      {
        "questionId": "hardware-7-Q2",
        "topicId": "hardware-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What distinguishes source and destination volumes reliably?",
        "answer": "Stable device identity and recorded array/ownership context.",
        "explanation": "Size and LUN number alone are weak evidence.",
        "testedConcept": "Device WWID"
      },
      {
        "questionId": "hardware-7-Q3",
        "topicId": "hardware-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does mapping a LUN create a filesystem?",
        "answer": "No.",
        "explanation": "It presents blocks for a consumer.",
        "testedConcept": "Masking"
      },
      {
        "questionId": "hardware-7-Q4",
        "topicId": "hardware-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can one LUN have several paths?",
        "answer": "Yes.",
        "explanation": "Paths are access routes to the same entity.",
        "testedConcept": "LUN number"
      },
      {
        "questionId": "hardware-7-Q5",
        "topicId": "hardware-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What protects a LUN from an unintended host at the array?",
        "answer": "The intended initiator mapping/masking policy.",
        "explanation": "A fabric zone alone is not object authorization.",
        "testedConcept": "Device WWID"
      },
      {
        "questionId": "hardware-7-Q6",
        "topicId": "hardware-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What should precede any destructive initialization?",
        "answer": "Confirmed empty ownership and exact identity under an approved disposable workflow.",
        "explanation": "This course never formats host devices.",
        "testedConcept": "Masking"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating Dell EMC?",
        "answer": "Dell storage product identity and host presentation.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-7",
        "questionId": "hardware-7-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume. What should be checked first?",
        "answer": "Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Dell storage product identity and host presentation",
        "topicId": "hardware-7",
        "questionId": "hardware-7-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Dell EMC incident?",
        "answer": "For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Dell storage product identity and host presentation",
        "topicId": "hardware-7",
        "questionId": "hardware-7-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Dell EMC case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Dell storage product identity and host presentation",
        "topicId": "hardware-7",
        "questionId": "hardware-7-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "An operator receives a Dell EMC runbook without a product name and proposes using it on a PowerStore volume.",
      "restore": "Dell EMC is a broad product label. Identify the installed product and release before choosing management, mapping, replication or recovery instructions. For the PowerStore teaching example, record the intended host or host group and volume mapping; verify host-visible identity and access. Do not transfer this procedure to Unity or PowerMax.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-8",
    "batch": "26",
    "title": "NetApp",
    "subtitle": "ONTAP SVM, igroup and LUN mapping",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-8",
    "definition": "NetApp is a vendor with multiple storage products. This lesson scopes its operational example to ONTAP SAN access: a storage virtual machine serves a LUN, an initiator group identifies hosts, and a mapping relates the LUN to the intended group. Fabric zoning remains a separate access boundary.",
    "purpose": "Develop an auditable service decision for NetApp. ONTAP SVM, igroup and LUN mapping. An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping.",
    "mental": "Treat this lesson as a handoff between Defined zone, Active zone set, LUN masking. The administrator describes the intended initiator and target members using supported identifiers. A successful earlier handoff cannot stand in for evidence at the next one. It is distinct from fabric communication policy. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded Zoning foundation worksheet is reused here as a conceptual exercise; it does not emulate NetApp or verify this incident.",
    "components": [
      "Operational scope: ONTAP SVM, igroup and LUN mapping. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Defined zone: Saved or candidate member set. It may not be active.",
      "Active zone set: Currently enforced membership. Scope includes the correct fabric/VSAN.",
      "LUN masking: Array control of object presentation. It is distinct from fabric communication policy."
    ],
    "mechanism": [
      "ONTAP SVM, igroup and LUN mapping: establish exact identity and observer before interpreting state.",
      "An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping.",
      "Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access."
    ],
    "flow": [
      [
        "Identify the asset",
        "ONTAP SVM, igroup and LUN mapping"
      ],
      [
        "Observe the incident",
        "An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup."
      ],
      [
        "Isolate the boundary",
        "An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping."
      ],
      [
        "Verify restoration",
        "Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup.",
        "Evidence must come from the named layer."
      ],
      [
        "Defined zone",
        "Saved or candidate member set",
        "It may not be active."
      ],
      [
        "Active zone set",
        "Currently enforced membership",
        "Scope includes the correct fabric/VSAN."
      ],
      [
        "LUN masking",
        "Array control of object presentation",
        "It is distinct from fabric communication policy."
      ]
    ],
    "example": "Authored incident: An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup. Investigation: An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping. Acceptance evidence: Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Tabletop first: An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping. Begin with recorded identity and the owned baseline. Configuration objective: Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A correct new zone exists in the configuration database but was omitted from the activated zone set. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.",
    "production": "ONTAP SVM, igroup and LUN mapping. Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access. Assign ownership at each dependency boundary. Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It may not be active. It is distinct from fabric communication policy. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup.",
        "An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping. Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access."
      ],
      [
        "A correct new zone exists in the configuration database but was omitted from the activated zone set.",
        "Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial."
      ],
      [
        "Why prefer a narrowly scoped initiator zone design?",
        "It limits unintended initiator relationships and simplifies diagnosis. Follow the array/fabric interoperability guidance."
      ],
      [
        "Should a recovery enable an allow-all default zone?",
        "No; repair the specific policy mismatch. Broad access defeats isolation."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup.",
      "Inspect enforcement, not just saved intent.",
      "Fabric and object authorization are separate.",
      "Follow the array/fabric interoperability guidance.",
      "Identity and context both matter.",
      "Broad access defeats isolation.",
      "Availability alone does not validate policy."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t3"
    ],
    "related": [
      "s8-g2-t3",
      "hardware-9"
    ],
    "lab": {
      "objective": "Investigate the NetApp incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Defined zone → Saved or candidate member set",
        "Active zone set → Currently enforced membership",
        "LUN masking → Array control of object presentation"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup.",
        "Write your diagnosis before using the foundation worksheet: An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping.",
        "Read the case and draw the three labelled mechanism boundaries. Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A correct new zone exists in the configuration database but was omitted from the activated zone set. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access."
      ],
      "verification": "Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access. Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A correct new zone exists in the configuration database but was omitted from the activated zone set. Activating it in the wrong VSAN.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Defined zone": "Saved or candidate member set. It may not be active.",
      "Active zone set": "Currently enforced membership. Scope includes the correct fabric/VSAN.",
      "LUN masking": "Array control of object presentation. It is distinct from fabric communication policy."
    },
    "sources": [
      {
        "title": "ONTAP igroups and LUN access",
        "url": "https://docs.netapp.com/us-en/ontap/san-admin/igroups-concept.html",
        "checked": "2026-10-09"
      },
      {
        "title": "ONTAP FC/FCoE zoning and port identity",
        "url": "https://docs.netapp.com/us-en/ontap/san-config/fibre-channel-fcoe-zoning-concept.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco MDS 9.x: managing zones and zone sets",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/mds9000/sw/9x/configuration/fabric/cisco-mds-9000-nx-os-fabric-configuration-guide-9x/configuring_and_managing_zones.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup. What should be checked first?",
        "answer": "An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "ONTAP SVM, igroup and LUN mapping",
        "topicId": "hardware-8",
        "questionId": "hardware-8-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this NetApp incident?",
        "answer": "Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "ONTAP SVM, igroup and LUN mapping",
        "topicId": "hardware-8",
        "questionId": "hardware-8-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this NetApp case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "ONTAP SVM, igroup and LUN mapping",
        "topicId": "hardware-8",
        "questionId": "hardware-8-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-8-Q1",
        "topicId": "hardware-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can a correctly defined zone have no effect?",
        "answer": "It may not be part of the active configuration.",
        "explanation": "Inspect enforcement, not just saved intent.",
        "testedConcept": "Defined zone"
      },
      {
        "questionId": "hardware-8-Q2",
        "topicId": "hardware-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does zoning assign a LUN to a host?",
        "answer": "No; array mapping does that.",
        "explanation": "Fabric and object authorization are separate.",
        "testedConcept": "Active zone set"
      },
      {
        "questionId": "hardware-8-Q3",
        "topicId": "hardware-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why prefer a narrowly scoped initiator zone design?",
        "answer": "It limits unintended initiator relationships and simplifies diagnosis.",
        "explanation": "Follow the array/fabric interoperability guidance.",
        "testedConcept": "LUN masking"
      },
      {
        "questionId": "hardware-8-Q4",
        "topicId": "hardware-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What scope error can invalidate an otherwise correct MDS zone?",
        "answer": "Activating it in the wrong VSAN.",
        "explanation": "Identity and context both matter.",
        "testedConcept": "Defined zone"
      },
      {
        "questionId": "hardware-8-Q5",
        "topicId": "hardware-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should a recovery enable an allow-all default zone?",
        "answer": "No; repair the specific policy mismatch.",
        "explanation": "Broad access defeats isolation.",
        "testedConcept": "Active zone set"
      },
      {
        "questionId": "hardware-8-Q6",
        "topicId": "hardware-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What negative test accompanies h1 recovery?",
        "answer": "An excluded initiator still cannot access the protected volume.",
        "explanation": "Availability alone does not validate policy.",
        "testedConcept": "LUN masking"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating NetApp?",
        "answer": "ONTAP SVM, igroup and LUN mapping.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-8",
        "questionId": "hardware-8-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup. What should be checked first?",
        "answer": "An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "ONTAP SVM, igroup and LUN mapping",
        "topicId": "hardware-8",
        "questionId": "hardware-8-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this NetApp incident?",
        "answer": "Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "ONTAP SVM, igroup and LUN mapping",
        "topicId": "hardware-8",
        "questionId": "hardware-8-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this NetApp case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "ONTAP SVM, igroup and LUN mapping",
        "topicId": "hardware-8",
        "questionId": "hardware-8-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "An ONTAP FC host logs into the fabric but sees no intended LUN; its replacement HBA WWPN is absent from the igroup.",
      "restore": "An igroup identifies permitted initiators. Zoning and an existing LUN are insufficient when the correct initiator is not in the group associated with that LUN mapping. Correlate SVM, LUN path, igroup members, mapping and supported reporting paths; verify intended access and that an excluded host still lacks access.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-9",
    "batch": "26",
    "title": "SAN Switches",
    "subtitle": "Fabric A/B separation and endpoint identity",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-9",
    "definition": "A SAN switch forwards storage fabric traffic and provides fabric services such as login, name service and zoning. Its management interface is separate from the host-to-storage data path.",
    "purpose": "Develop an auditable service decision for SAN Switches. Fabric A/B separation and endpoint identity. Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path.",
    "mental": "Treat this lesson as a handoff between F_Port, E_Port, Management plane. Ports establish roles and login relationships with endpoints or inter-switch links. A successful earlier handoff cannot stand in for evidence at the next one. Management success does not prove storage I/O. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded SAN Switch foundation worksheet is reused here as a conceptual exercise; it does not emulate SAN Switches or verify this incident.",
    "components": [
      "Operational scope: Fabric A/B separation and endpoint identity. Exact model, installed release and ownership determine which vendor procedure applies.",
      "F_Port: Fabric port attached to an N_Port. Endpoint login is not an ISL.",
      "E_Port: Inter-switch expansion port. An ISL can connect shared failure domains.",
      "Management plane: Administrative access. Management success does not prove storage I/O."
    ],
    "mechanism": [
      "Fabric A/B separation and endpoint identity: establish exact identity and observer before interpreting state.",
      "Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path.",
      "Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target."
    ],
    "flow": [
      [
        "Identify the asset",
        "Fabric A/B separation and endpoint identity"
      ],
      [
        "Observe the incident",
        "Two SAN switches exist, but both host initiators are cabled into fabric A."
      ],
      [
        "Isolate the boundary",
        "Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path."
      ],
      [
        "Verify restoration",
        "Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "Two SAN switches exist, but both host initiators are cabled into fabric A.",
        "Evidence must come from the named layer."
      ],
      [
        "F_Port",
        "Fabric port attached to an N_Port",
        "Endpoint login is not an ISL."
      ],
      [
        "E_Port",
        "Inter-switch expansion port",
        "An ISL can connect shared failure domains."
      ],
      [
        "Management plane",
        "Administrative access",
        "Management success does not prove storage I/O."
      ]
    ],
    "example": "Authored incident: Two SAN switches exist, but both host initiators are cabled into fabric A. Investigation: Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path. Acceptance evidence: Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t6",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Tabletop first: Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path. Begin with recorded identity and the owned baseline. Configuration objective: Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Both host HBAs were patched to the same switch even though port labels say A and B. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.",
    "production": "Fabric A/B separation and endpoint identity. Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target. Assign ownership at each dependency boundary. Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Endpoint login is not an ISL. Management success does not prove storage I/O. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Fabric services and active policy determine reachable port identities within the correct fabric scope. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "Two SAN switches exist, but both host initiators are cabled into fabric A.",
        "Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path. Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target."
      ],
      [
        "Both host HBAs were patched to the same switch even though port labels say A and B.",
        "Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence."
      ],
      [
        "Does a reachable management IP prove SAN forwarding?",
        "No. Management and data paths differ."
      ],
      [
        "Which observations help diagnose congestion?",
        "Timed error/credit/link utilization evidence correlated with workload latency. A static link-up flag is inadequate."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: Two SAN switches exist, but both host initiators are cabled into fabric A.",
      "It is distinct from an ISL role.",
      "An ISL has its own capacity and dependencies.",
      "Management and data paths differ.",
      "A shortcut can remove independence.",
      "A static link-up flag is inadequate.",
      "Labels are not physical evidence."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t6"
    ],
    "related": [
      "s8-g2-t6",
      "hardware-10"
    ],
    "lab": {
      "objective": "Investigate the SAN Switches incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "F_Port → Fabric port attached to an N_Port",
        "E_Port → Inter-switch expansion port",
        "Management plane → Administrative access"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: Two SAN switches exist, but both host initiators are cabled into fabric A.",
        "Write your diagnosis before using the foundation worksheet: Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path.",
        "Read the case and draw the three labelled mechanism boundaries. Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Both host HBAs were patched to the same switch even though port labels say A and B. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target."
      ],
      "verification": "Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target. Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Both host HBAs were patched to the same switch even though port labels say A and B. The design requires separate fabric failure domains.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "F_Port": "Fabric port attached to an N_Port. Endpoint login is not an ISL.",
      "E_Port": "Inter-switch expansion port. An ISL can connect shared failure domains.",
      "Management plane": "Administrative access. Management success does not prove storage I/O."
    },
    "sources": [
      {
        "title": "Cisco MDS 9.x: managing zones and zone sets",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/mds9000/sw/9x/configuration/fabric/cisco-mds-9000-nx-os-fabric-configuration-guide-9x/configuring_and_managing_zones.html",
        "checked": "2026-10-09"
      },
      {
        "title": "ONTAP FC/FCoE zoning and port identity",
        "url": "https://docs.netapp.com/us-en/ontap/san-config/fibre-channel-fcoe-zoning-concept.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "Two SAN switches exist, but both host initiators are cabled into fabric A. What should be checked first?",
        "answer": "Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Fabric A/B separation and endpoint identity",
        "topicId": "hardware-9",
        "questionId": "hardware-9-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this SAN Switches incident?",
        "answer": "Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Fabric A/B separation and endpoint identity",
        "topicId": "hardware-9",
        "questionId": "hardware-9-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this SAN Switches case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Fabric A/B separation and endpoint identity",
        "topicId": "hardware-9",
        "questionId": "hardware-9-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-9-Q1",
        "topicId": "hardware-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is an F_Port used for in this lesson?",
        "answer": "Connecting an endpoint N_Port to the fabric.",
        "explanation": "It is distinct from an ISL role.",
        "testedConcept": "F_Port"
      },
      {
        "questionId": "hardware-9-Q2",
        "topicId": "hardware-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does an E_Port connect?",
        "answer": "Another fabric switch through an inter-switch link.",
        "explanation": "An ISL has its own capacity and dependencies.",
        "testedConcept": "E_Port"
      },
      {
        "questionId": "hardware-9-Q3",
        "topicId": "hardware-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a reachable management IP prove SAN forwarding?",
        "answer": "No.",
        "explanation": "Management and data paths differ.",
        "testedConcept": "Management plane"
      },
      {
        "questionId": "hardware-9-Q4",
        "topicId": "hardware-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid joining A and B just to make discovery easier?",
        "answer": "The design requires separate fabric failure domains.",
        "explanation": "A shortcut can remove independence.",
        "testedConcept": "F_Port"
      },
      {
        "questionId": "hardware-9-Q5",
        "topicId": "hardware-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observations help diagnose congestion?",
        "answer": "Timed error/credit/link utilization evidence correlated with workload latency.",
        "explanation": "A static link-up flag is inadequate.",
        "testedConcept": "E_Port"
      },
      {
        "questionId": "hardware-9-Q6",
        "topicId": "hardware-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What disproves the claimed redundant cabling?",
        "answer": "Both HBA routes terminate in the same switch or common failed dependency.",
        "explanation": "Labels are not physical evidence.",
        "testedConcept": "Management plane"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating SAN Switches?",
        "answer": "Fabric A/B separation and endpoint identity.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-9",
        "questionId": "hardware-9-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "Two SAN switches exist, but both host initiators are cabled into fabric A. What should be checked first?",
        "answer": "Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Fabric A/B separation and endpoint identity",
        "topicId": "hardware-9",
        "questionId": "hardware-9-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this SAN Switches incident?",
        "answer": "Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Fabric A/B separation and endpoint identity",
        "topicId": "hardware-9",
        "questionId": "hardware-9-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this SAN Switches case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Fabric A/B separation and endpoint identity",
        "topicId": "hardware-9",
        "questionId": "hardware-9-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "Two SAN switches exist, but both host initiators are cabled into fabric A.",
      "restore": "Switch count does not establish independent end-to-end paths. Trace initiator, switch, target port and upstream power for each path. Produce two complete supported paths and a named single-fabric loss expectation; confirm application I/O separately on a real approved target.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-10",
    "batch": "26",
    "title": "Brocade",
    "subtitle": "Brocade defined versus effective zoning",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-10",
    "definition": "Brocade SAN administration uses Fabric OS concepts including switch/fabric identity, port state, aliases and defined versus effective zoning configuration. Procedures must match the installed Fabric OS and hardware release.",
    "purpose": "Develop an auditable service decision for Brocade. Brocade defined versus effective zoning. Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair.",
    "mental": "Treat this lesson as a handoff between Fabric OS, Alias, Effective configuration. Collect product, Fabric OS, switch identity and endpoint login evidence before interpreting names. A successful earlier handoff cannot stand in for evidence at the next one. Defined intent can differ from operational state. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded Brocade fundamentals foundation worksheet is reused here as a conceptual exercise; it does not emulate Brocade or verify this incident.",
    "components": [
      "Operational scope: Brocade defined versus effective zoning. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Fabric OS: Brocade fabric operating software. Commands and support are release-specific.",
      "Alias: Readable zoning member reference. A stale WWPN can hide behind a correct label.",
      "Effective configuration: Currently enforced zoning. Defined intent can differ from operational state."
    ],
    "mechanism": [
      "Brocade defined versus effective zoning: establish exact identity and observer before interpreting state.",
      "Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair.",
      "Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access."
    ],
    "flow": [
      [
        "Identify the asset",
        "Brocade defined versus effective zoning"
      ],
      [
        "Observe the incident",
        "A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target."
      ],
      [
        "Isolate the boundary",
        "Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair."
      ],
      [
        "Verify restoration",
        "Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target.",
        "Evidence must come from the named layer."
      ],
      [
        "Fabric OS",
        "Brocade fabric operating software",
        "Commands and support are release-specific."
      ],
      [
        "Alias",
        "Readable zoning member reference",
        "A stale WWPN can hide behind a correct label."
      ],
      [
        "Effective configuration",
        "Currently enforced zoning",
        "Defined intent can differ from operational state."
      ]
    ],
    "example": "Authored incident: A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target. Investigation: Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair. Acceptance evidence: Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t7",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Tabletop first: Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair. Begin with recorded identity and the owned baseline. Configuration objective: A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The operator adds a new zone to the defined database without verifying the effective fabric configuration. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.",
    "production": "Brocade defined versus effective zoning. Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access. Assign ownership at each dependency boundary. Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Commands and support are release-specific. Defined intent can differ from operational state. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Compare alias and zone definitions with the effective configuration in the intended fabric. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target.",
        "Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair. Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access."
      ],
      [
        "The operator adds a new zone to the defined database without verifying the effective fabric configuration.",
        "Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results."
      ],
      [
        "Does defined zoning always equal effective zoning?",
        "No. Check the active enforcement view."
      ],
      [
        "Can a switch-only review prove correct LUN masking?",
        "No; the array has a separate mapping layer. Follow the chain to the host."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target.",
      "A vendor family name is insufficient.",
      "Inspect the value.",
      "Check the active enforcement view.",
      "Reverting to a default is not exact rollback.",
      "Follow the chain to the host.",
      "The offline model is not Fabric OS emulation."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t7"
    ],
    "related": [
      "s8-g2-t7",
      "hardware-11"
    ],
    "lab": {
      "objective": "Investigate the Brocade incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Fabric OS → Brocade fabric operating software",
        "Alias → Readable zoning member reference",
        "Effective configuration → Currently enforced zoning"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target.",
        "Write your diagnosis before using the foundation worksheet: Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair.",
        "Read the case and draw the three labelled mechanism boundaries. A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The operator adds a new zone to the defined database without verifying the effective fabric configuration. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access."
      ],
      "verification": "Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access. Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The operator adds a new zone to the defined database without verifying the effective fabric configuration. The exact prior effective configuration and the approved member diff.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Fabric OS": "Brocade fabric operating software. Commands and support are release-specific.",
      "Alias": "Readable zoning member reference. A stale WWPN can hide behind a correct label.",
      "Effective configuration": "Currently enforced zoning. Defined intent can differ from operational state."
    },
    "sources": [
      {
        "title": "Brocade Fabric OS 8.2.x: historical defined/effective zoning reference; verify installed release before operation",
        "url": "https://docs.broadcom.com/doc/FOS-82x-Command-RM",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target. What should be checked first?",
        "answer": "Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Brocade defined versus effective zoning",
        "topicId": "hardware-10",
        "questionId": "hardware-10-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Brocade incident?",
        "answer": "Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Brocade defined versus effective zoning",
        "topicId": "hardware-10",
        "questionId": "hardware-10-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Brocade case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Brocade defined versus effective zoning",
        "topicId": "hardware-10",
        "questionId": "hardware-10-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-10-Q1",
        "topicId": "hardware-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why record Fabric OS version first?",
        "answer": "Syntax, support and operational procedures depend on release.",
        "explanation": "A vendor family name is insufficient.",
        "testedConcept": "Fabric OS"
      },
      {
        "questionId": "hardware-10-Q2",
        "topicId": "hardware-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What can a correct alias label conceal?",
        "answer": "A stale or wrong underlying WWPN.",
        "explanation": "Inspect the value.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "hardware-10-Q3",
        "topicId": "hardware-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does defined zoning always equal effective zoning?",
        "answer": "No.",
        "explanation": "Check the active enforcement view.",
        "testedConcept": "Effective configuration"
      },
      {
        "questionId": "hardware-10-Q4",
        "topicId": "hardware-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should be preserved before zoning activation?",
        "answer": "The exact prior effective configuration and the approved member diff.",
        "explanation": "Reverting to a default is not exact rollback.",
        "testedConcept": "Fabric OS"
      },
      {
        "questionId": "hardware-10-Q5",
        "topicId": "hardware-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a switch-only review prove correct LUN masking?",
        "answer": "No; the array has a separate mapping layer.",
        "explanation": "Follow the chain to the host.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "hardware-10-Q6",
        "topicId": "hardware-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How does this course classify Brocade target changes?",
        "answer": "Guided and unexecuted on a real switch.",
        "explanation": "The offline model is not Fabric OS emulation.",
        "testedConcept": "Effective configuration"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating Brocade?",
        "answer": "Brocade defined versus effective zoning.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-10",
        "questionId": "hardware-10-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target. What should be checked first?",
        "answer": "Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Brocade defined versus effective zoning",
        "topicId": "hardware-10",
        "questionId": "hardware-10-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Brocade incident?",
        "answer": "Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Brocade defined versus effective zoning",
        "topicId": "hardware-10",
        "questionId": "hardware-10-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Brocade case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Brocade defined versus effective zoning",
        "topicId": "hardware-10",
        "questionId": "hardware-10-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "A Brocade alias and zone were edited in the defined configuration, but the host still cannot reach the target.",
      "restore": "Compare defined and effective zoning in the correct fabric and logical-switch context. An edited candidate is not proof that the intended active policy permits the WWPN pair. Retain the effective membership and original scoped configuration, verify target and host paths, and separately test allowed and prohibited access.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-11",
    "batch": "26",
    "title": "Cisco MDS",
    "subtitle": "MDS VSAN and active zone-set context",
    "level": "Foundation → Operational reasoning",
    "minutes": 60,
    "interactive": "sv-hardware-11",
    "definition": "Cisco MDS provides Fibre Channel fabric services with VSAN-scoped zoning and operational views. A VSAN separates logical fabrics on shared hardware; it does not create independent power or chassis.",
    "purpose": "Develop an auditable service decision for Cisco MDS. MDS VSAN and active zone-set context. A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN.",
    "mental": "Treat this lesson as a handoff between VSAN, Zoneset, FLOGI database. Identify the switch, software release, physical ports and intended VSAN context. A successful earlier handoff cannot stand in for evidence at the next one. Login does not establish array authorization. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract. The embedded Cisco MDS fundamentals foundation worksheet is reused here as a conceptual exercise; it does not emulate Cisco MDS or verify this incident.",
    "components": [
      "Operational scope: MDS VSAN and active zone-set context. Exact model, installed release and ownership determine which vendor procedure applies.",
      "VSAN: Logical FC fabric partition. It shares underlying hardware resources.",
      "Zoneset: Collection of zones activated in a VSAN. A saved definition can differ from active membership.",
      "FLOGI database: Observed fabric logins. Login does not establish array authorization."
    ],
    "mechanism": [
      "MDS VSAN and active zone-set context: establish exact identity and observer before interpreting state.",
      "A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN.",
      "Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored."
    ],
    "flow": [
      [
        "Identify the asset",
        "MDS VSAN and active zone-set context"
      ],
      [
        "Observe the incident",
        "An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10."
      ],
      [
        "Isolate the boundary",
        "A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN."
      ],
      [
        "Verify restoration",
        "Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10.",
        "Evidence must come from the named layer."
      ],
      [
        "VSAN",
        "Logical FC fabric partition",
        "It shares underlying hardware resources."
      ],
      [
        "Zoneset",
        "Collection of zones activated in a VSAN",
        "A saved definition can differ from active membership."
      ],
      [
        "FLOGI database",
        "Observed fabric logins",
        "Login does not establish array authorization."
      ]
    ],
    "example": "Authored incident: An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10. Investigation: A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN. Acceptance evidence: Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t8",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction. These incident statements are expected evidence, not real device output."
      },
      {
        "filename": "guided-mds.txt",
        "platform": "Cisco MDS 9.x; guided and unexecuted",
        "code": "show zoneset active",
        "explanation": "Read active enforcement in the correct VSAN context; the exact reference is linked below.",
        "expected": "Active zoneset members, compared with the intended initiator/target identities; this does not display array LUN mapping."
      }
    ],
    "configuration": "Tabletop first: A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN. Begin with recorded identity and the owned baseline. Configuration objective: The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.",
    "production": "MDS VSAN and active zone-set context. Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored. Assign ownership at each dependency boundary. Reconcile array presentation and host device paths before accepting useful storage access. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It shares underlying hardware resources. Login does not establish array authorization. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Correlate fabric login and name-service evidence with the active zoneset for that VSAN. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10.",
        "A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN. Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored."
      ],
      [
        "The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it.",
        "Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction."
      ],
      [
        "What does a fabric login establish?",
        "An observed endpoint login in the fabric. It does not prove mapped storage."
      ],
      [
        "Why preserve the full and active configuration separately?",
        "They can differ, and rollback must recover intended enforcement. Saved intent is not always active state."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Treating the following partial evidence as completion: An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10.",
      "A zone name alone is ambiguous.",
      "Logical partitioning is not physical redundancy.",
      "It does not prove mapped storage.",
      "Further VSAN selection must match the target context.",
      "Saved intent is not always active state.",
      "A successful CLI command is not the service result."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t8"
    ],
    "related": [
      "s8-g2-t8",
      "hardware-12"
    ],
    "lab": {
      "objective": "Investigate the Cisco MDS incident and produce the scoped evidence required to close it.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "VSAN → Logical FC fabric partition",
        "Zoneset → Collection of zones activated in a VSAN",
        "FLOGI database → Observed fabric logins"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10.",
        "Write your diagnosis before using the foundation worksheet: A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN.",
        "Read the case and draw the three labelled mechanism boundaries. The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested.",
        "Close this specific incident using: Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored."
      ],
      "verification": "Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored. Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. show zoneset active.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "VSAN": "Logical FC fabric partition. It shares underlying hardware resources.",
      "Zoneset": "Collection of zones activated in a VSAN. A saved definition can differ from active membership.",
      "FLOGI database": "Observed fabric logins. Login does not establish array authorization."
    },
    "sources": [
      {
        "title": "Cisco MDS 9.x: managing zones and zone sets",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/mds9000/sw/9x/configuration/fabric/cisco-mds-9000-nx-os-fabric-configuration-guide-9x/configuring_and_managing_zones.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10. What should be checked first?",
        "answer": "A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "MDS VSAN and active zone-set context",
        "topicId": "hardware-11",
        "questionId": "hardware-11-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Cisco MDS incident?",
        "answer": "Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "MDS VSAN and active zone-set context",
        "topicId": "hardware-11",
        "questionId": "hardware-11-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Cisco MDS case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "MDS VSAN and active zone-set context",
        "topicId": "hardware-11",
        "questionId": "hardware-11-QC3"
      }
    ],
    "exams": [
      {
        "questionId": "hardware-11-Q1",
        "topicId": "hardware-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What scope must accompany MDS zoning evidence?",
        "answer": "The relevant VSAN.",
        "explanation": "A zone name alone is ambiguous.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "hardware-11-Q2",
        "topicId": "hardware-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Do two VSANs in one chassis survive chassis power loss independently?",
        "answer": "No.",
        "explanation": "Logical partitioning is not physical redundancy.",
        "testedConcept": "Zoneset"
      },
      {
        "questionId": "hardware-11-Q3",
        "topicId": "hardware-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does a fabric login establish?",
        "answer": "An observed endpoint login in the fabric.",
        "explanation": "It does not prove mapped storage.",
        "testedConcept": "FLOGI database"
      },
      {
        "questionId": "hardware-11-Q4",
        "topicId": "hardware-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which documented read-only command inspects active zonesets?",
        "answer": "show zoneset active.",
        "explanation": "Further VSAN selection must match the target context.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "hardware-11-Q5",
        "topicId": "hardware-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why preserve the full and active configuration separately?",
        "answer": "They can differ, and rollback must recover intended enforcement.",
        "explanation": "Saved intent is not always active state.",
        "testedConcept": "Zoneset"
      },
      {
        "questionId": "hardware-11-Q6",
        "topicId": "hardware-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What closes the MDS repair investigation?",
        "answer": "Correct active membership, mapped device identity and original host I/O with a denied-host check.",
        "explanation": "A successful CLI command is not the service result.",
        "testedConcept": "FLOGI database"
      },
      {
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What must the evidence record identify before investigating Cisco MDS?",
        "answer": "MDS VSAN and active zone-set context.",
        "explanation": "Product or link labels alone omit the scope needed to interpret the observed state.",
        "testedConcept": "Identity and evidence scope",
        "topicId": "hardware-11",
        "questionId": "hardware-11-Q7"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10. What should be checked first?",
        "answer": "A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "MDS VSAN and active zone-set context",
        "topicId": "hardware-11",
        "questionId": "hardware-11-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Cisco MDS incident?",
        "answer": "Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "MDS VSAN and active zone-set context",
        "topicId": "hardware-11",
        "questionId": "hardware-11-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Cisco MDS case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "MDS VSAN and active zone-set context",
        "topicId": "hardware-11",
        "questionId": "hardware-11-Q10"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Approved plan: retain correct asset identity, intended host access and independently mapped A/B paths. This is a supplied assumption, not a discovered baseline.",
      "fault": "An MDS zone contains the correct WWPNs, but it is in VSAN 20 while the relevant interfaces belong to VSAN 10.",
      "restore": "A zone name alone is insufficient. Compare interface VSAN membership, endpoint login and the active zone set in the same VSAN. Require matching interface/fabric scope, active policy, array mapping and host evidence before declaring service restored.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "hardware-12",
    "batch": "26",
    "title": "UPS",
    "subtitle": "UPS load-dependent runtime and shutdown budget",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t2",
    "definition": "An uninterruptible power supply supports specified load through supported input-loss and power-quality conditions for a limited duration. Watt/VA capacity, battery state, runtime curves, transfer/bypass behavior and upstream/downstream redundancy are different requirements. UPS presence alone does not prove uninterrupted useful service.",
    "purpose": "Develop an auditable service decision for UPS. UPS load-dependent runtime and shutdown budget. The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve.",
    "mental": "The UPS supplies the supported connected load subject to both real/apparent ratings and operating mode. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded UPS foundation worksheet is reused here as a conceptual exercise; it does not emulate UPS or verify this incident.",
    "components": [
      "Operational scope: UPS load-dependent runtime and shutdown budget. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Output rating: Supported instantaneous W/VA load. Different from duration.",
      "Usable energy: Supplied AC Wh. Not nominal battery charge.",
      "Runtime curve: Load-specific duration. Requires actual model/state.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "UPS load-dependent runtime and shutdown budget: establish exact identity and observer before interpreting state.",
      "The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve.",
      "Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here."
    ],
    "flow": [
      [
        "Identify the asset",
        "UPS load-dependent runtime and shutdown budget"
      ],
      [
        "Observe the incident",
        "A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes."
      ],
      [
        "Isolate the boundary",
        "The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve."
      ],
      [
        "Verify restoration",
        "Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes. Investigation: The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve. Acceptance evidence: Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here.",
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
    "configuration": "Tabletop first: The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve. Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "UPS load-dependent runtime and shutdown budget. Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here. Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes.",
        "The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve. Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here."
      ],
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
      "Treating the following partial evidence as completion: A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes.",
      "Check real-power rating and load/power-factor context.",
      "Simple energy arithmetic is not an actual discharge curve.",
      "Protected power paths must include required dependencies.",
      "The baseline cannot be assumed permanent."
    ],
    "prerequisites": [
      "s6-g4-t2"
    ],
    "related": [
      "s6-g4-t2",
      "hardware-13"
    ],
    "lab": {
      "objective": "Investigate the UPS incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → UPS boundary",
        "Output rating → Usable energy → Runtime curve",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes.",
        "Write your diagnosis before using the foundation worksheet: The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve.",
        "Record exact UPS model, supported voltage/frequency, real/apparent ratings, mode, battery health and manufacturer load/runtime curve. Plan graceful shutdown or generator/recovery dependencies within verified duration; no input removal or battery discharge is performed here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Output rating, Usable energy and Runtime curve. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Bypass, battery maintenance, transfer and cooling/network parents can change the failure domain, so protected components and independent management must be mapped. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here."
      ],
      "verification": "Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here. Supported rating/runtime evidence, mapped dependencies and approved original-service recovery/shutdown checks. A UPS icon alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Output rating → Usable energy → Runtime curve. Operating mode is part of the availability contract. Actual work requires approved qualified procedures and isolated targets.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-12-Q1",
        "topicId": "hardware-12",
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
        "questionId": "hardware-12-Q2",
        "topicId": "hardware-12",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a UPS VA rating directly state output watts?",
        "answer": "No.",
        "explanation": "Check real-power rating and load/power-factor context.",
        "testedConcept": "Does a UPS VA rating directly state output watts?"
      },
      {
        "questionId": "hardware-12-Q3",
        "topicId": "hardware-12",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can nominal battery Ah alone predict runtime?",
        "answer": "No.",
        "explanation": "Voltage, usable energy, conversion and load behavior matter.",
        "testedConcept": "Can nominal battery Ah alone predict runtime?"
      },
      {
        "questionId": "hardware-12-Q4",
        "topicId": "hardware-12",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why use the exact manufacturer runtime curve?",
        "answer": "Duration depends on model, load and supported battery conditions.",
        "explanation": "Simple energy arithmetic is not an actual discharge curve.",
        "testedConcept": "Why use the exact manufacturer runtime curve?"
      },
      {
        "questionId": "hardware-12-Q5",
        "topicId": "hardware-12",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can UPS bypass change?",
        "answer": "The load may depend on a different unconditioned/shared supply path.",
        "explanation": "Operating mode is part of the availability contract.",
        "testedConcept": "What can UPS bypass change?"
      },
      {
        "questionId": "hardware-12-Q6",
        "topicId": "hardware-12",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a UPS protect an unconnected cooling controller?",
        "answer": "No.",
        "explanation": "Protected power paths must include required dependencies.",
        "testedConcept": "Does a UPS protect an unconnected cooling controller?"
      },
      {
        "questionId": "hardware-12-Q7",
        "topicId": "hardware-12",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should happen before planned battery maintenance?",
        "answer": "Review supported procedure, current health, independent paths and recovery/shutdown plan.",
        "explanation": "Presence of batteries is not sufficient resilience.",
        "testedConcept": "What should happen before planned battery maintenance?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes. What should be checked first?",
        "answer": "The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "UPS load-dependent runtime and shutdown budget",
        "topicId": "hardware-12",
        "questionId": "hardware-12-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this UPS incident?",
        "answer": "Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "UPS load-dependent runtime and shutdown budget",
        "topicId": "hardware-12",
        "questionId": "hardware-12-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this UPS case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "UPS load-dependent runtime and shutdown budget",
        "topicId": "hardware-12",
        "questionId": "hardware-12-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A supplied runtime curve gives 12 minutes at the declared load; shutdown needs 9 minutes and the plan reserves 4 minutes. What should be checked first?",
        "answer": "The plan is short by 1 minute because 9 + 4 exceeds 12. Name the load and battery assumptions; watt-hour arithmetic alone does not validate a runtime curve.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "UPS load-dependent runtime and shutdown budget",
        "topicId": "hardware-12",
        "questionId": "hardware-12-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this UPS incident?",
        "answer": "Revise the budget or supported capacity plan and retain tested shutdown ordering. Battery transfer, electrical work and actual shutdown are not executed here.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "UPS load-dependent runtime and shutdown budget",
        "topicId": "hardware-12",
        "questionId": "hardware-12-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this UPS case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "UPS load-dependent runtime and shutdown budget",
        "topicId": "hardware-12",
        "questionId": "hardware-12-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-13",
    "batch": "26",
    "title": "PDU",
    "subtitle": "PDU circuit identity and surviving-feed load",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t3",
    "definition": "A power distribution unit delivers power to multiple outlets and may meter, switch or remotely manage them depending on the model. A PDU is not inherently a UPS, redundant supply or independent failure domain. Its inlet, phase, outlet and upstream ratings remain separate constraints.",
    "purpose": "Develop an auditable service decision for PDU. PDU circuit identity and surviving-feed load. The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits.",
    "mental": "Follow device cord → specific outlet → branch/phase/inlet → upstream circuit and supply to identify the real capacity chain. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Full-load capacity on each independent A/B path using a supplied allowed fraction; ideal energy/load duration from supplied usable AC energy, not a UPS runtime curve or electrical certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded PDU foundation worksheet is reused here as a conceptual exercise; it does not emulate PDU or verify this incident.",
    "components": [
      "Operational scope: PDU circuit identity and surviving-feed load. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Basic PDU: Outlet distribution. No implied battery backup.",
      "Metered PDU: Electrical observations. Scope depends on sensors.",
      "Switched PDU: Remote outlet control. Requires stronger permissions.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "PDU circuit identity and surviving-feed load: establish exact identity and observer before interpreting state.",
      "The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits.",
      "Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence."
    ],
    "flow": [
      [
        "Identify the asset",
        "PDU circuit identity and surviving-feed load"
      ],
      [
        "Observe the incident",
        "PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit."
      ],
      [
        "Isolate the boundary",
        "The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits."
      ],
      [
        "Verify restoration",
        "Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit. Investigation: The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits. Acceptance evidence: Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence.",
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
    "configuration": "Tabletop first: The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits. Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "PDU circuit identity and surviving-feed load. Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence. Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit.",
        "The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits. Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence."
      ],
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
      "Treating the following partial evidence as completion: PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit.",
      "Feature capability is model specific.",
      "Different rack boxes can share one parent.",
      "Current, phase, inlet, circuit and survivor capacity still matter.",
      "It reports selected device conditions rather than original service results."
    ],
    "prerequisites": [
      "s6-g4-t3"
    ],
    "related": [
      "s6-g4-t3",
      "hardware-14"
    ],
    "lab": {
      "objective": "Investigate the PDU incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → PDU boundary",
        "Basic PDU → Metered PDU → Switched PDU",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit.",
        "Write your diagnosis before using the foundation worksheet: The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits.",
        "Produce a per-outlet load/phase/circuit map and role-controlled monitoring plan. Retain exact outlet identity and disabled destructive permissions for observers; qualified staff approve the actual electrical installation.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Basic PDU, Metered PDU and Switched PDU. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Two PDUs provide supply diversity only if their relevant upstream parents and full-load survivor capacities are genuinely independent. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence."
      ],
      "verification": "Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence. Supported per-element ratings, independent source map and approved service/recovery evidence. The worksheet is not electrical certification. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Basic PDU → Metered PDU → Switched PDU. Observation need not grant interruption capability. A mistaken outlet can stop unrelated workloads.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-13-Q1",
        "topicId": "hardware-13",
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
        "questionId": "hardware-13-Q2",
        "topicId": "hardware-13",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a metered PDU necessarily allow remote outlet switching?",
        "answer": "No.",
        "explanation": "Feature capability is model specific.",
        "testedConcept": "Does a metered PDU necessarily allow remote outlet switching?"
      },
      {
        "questionId": "hardware-13-Q3",
        "topicId": "hardware-13",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why map individual phase/outlet loads?",
        "answer": "Aggregate kW can hide a narrower overloaded element.",
        "explanation": "Capacity applies at every rated boundary.",
        "testedConcept": "Why map individual phase/outlet loads?"
      },
      {
        "questionId": "hardware-13-Q4",
        "topicId": "hardware-13",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two PDUs terminate on one circuit. What diversity is missing?",
        "answer": "Circuit failure independence.",
        "explanation": "Different rack boxes can share one parent.",
        "testedConcept": "Two PDUs terminate on one circuit. What diversity is missing?"
      },
      {
        "questionId": "hardware-13-Q5",
        "topicId": "hardware-13",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What privilege should an inventory-only operator receive?",
        "answer": "Read-only metering/inventory, not outlet power control.",
        "explanation": "Observation need not grant interruption capability.",
        "testedConcept": "What privilege should an inventory-only operator receive?"
      },
      {
        "questionId": "hardware-13-Q6",
        "topicId": "hardware-13",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an outlet count approve server expansion?",
        "answer": "No.",
        "explanation": "Current, phase, inlet, circuit and survivor capacity still matter.",
        "testedConcept": "Can an outlet count approve server expansion?"
      },
      {
        "questionId": "hardware-13-Q7",
        "topicId": "hardware-13",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why retain cord-to-outlet labels before maintenance?",
        "answer": "Exact restoration must reconnect the intended A/B paths.",
        "explanation": "An arbitrary free outlet may change the domain.",
        "testedConcept": "Why retain cord-to-outlet labels before maintenance?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit. What should be checked first?",
        "answer": "The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "PDU circuit identity and surviving-feed load",
        "topicId": "hardware-13",
        "questionId": "hardware-13-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this PDU incident?",
        "answer": "Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "PDU circuit identity and surviving-feed load",
        "topicId": "hardware-13",
        "questionId": "hardware-13-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this PDU case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "PDU circuit identity and surviving-feed load",
        "topicId": "hardware-13",
        "questionId": "hardware-13-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "PSU A and PSU B use differently colored PDUs, but both PDUs are supplied by the same upstream circuit. What should be checked first?",
        "answer": "The shared circuit remains a single failure domain. Trace both paths to their source and check the full surviving load against approved circuit and outlet limits.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "PDU circuit identity and surviving-feed load",
        "topicId": "hardware-13",
        "questionId": "hardware-13-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this PDU incident?",
        "answer": "Retain source/circuit/outlet records plus a qualified capacity review. Color and dual cords are not proof of independence.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "PDU circuit identity and surviving-feed load",
        "topicId": "hardware-13",
        "questionId": "hardware-13-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this PDU case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "PDU circuit identity and surviving-feed load",
        "topicId": "hardware-13",
        "questionId": "hardware-13-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-14",
    "batch": "26",
    "title": "Rack Management",
    "subtitle": "Rack elevation and change-controlled asset location",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t0",
    "definition": "Rack design coordinates vertical placement, mass, dimensions, rails, power, cooling, cabling and service access. The original lab uses three 42U racks and separate documented capacity paths. Free U is a planning resource rather than permission to install unsupported equipment.",
    "purpose": "Develop an auditable service decision for Rack Management. Rack elevation and change-controlled asset location. Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20.",
    "mental": "Assign inclusive U intervals and detect overlap/out-of-range endpoints, then validate depth, rails, mass and floor/cabinet support separately. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Rack design foundation worksheet is reused here as a conceptual exercise; it does not emulate Rack Management or verify this incident.",
    "components": [
      "Operational scope: Rack elevation and change-controlled asset location. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Elevation: Numbered vertical placement. Check inclusive intervals.",
      "Physical envelope: Depth, rails, mass and access. Not captured by U alone.",
      "Capacity worksheet: Per-rack surviving limits. Includes explicit units.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Rack elevation and change-controlled asset location: establish exact identity and observer before interpreting state.",
      "Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20.",
      "Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap."
    ],
    "flow": [
      [
        "Identify the asset",
        "Rack elevation and change-controlled asset location"
      ],
      [
        "Observe the incident",
        "The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20."
      ],
      [
        "Isolate the boundary",
        "Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20."
      ],
      [
        "Verify restoration",
        "Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20. Investigation: Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20. Acceptance evidence: Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap.",
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
    "configuration": "Tabletop first: Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20. Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Rack elevation and change-controlled asset location. Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap. Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20.",
        "Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20. Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap."
      ],
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
      "Treating the following partial evidence as completion: The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20.",
      "Its end would be U43.",
      "No shared occupied U is allowed in this model.",
      "Mass, cabinet/floor ratings and installation approval are separate.",
      "Color alone is not exact restoration evidence."
    ],
    "prerequisites": [
      "s6-g4-t0"
    ],
    "related": [
      "s6-g4-t0",
      "hardware-15"
    ],
    "lab": {
      "objective": "Investigate the Rack Management incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Rack design boundary",
        "Elevation → Physical envelope → Capacity worksheet",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20.",
        "Write your diagnosis before using the foundation worksheet: Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20.",
        "Produce three named elevations and a per-rack capacity worksheet. Preserve asset-to-slot identity and qualified physical installation checks; the browser checks only declared vertical intervals and a fixed power allowance.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Elevation, Physical envelope and Capacity worksheet. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace every cord and cable with both endpoints, service travel and independent-path intent; additions must fit the surviving power envelope. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap."
      ],
      "verification": "Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap. Valid elevations plus supported physical, full-load power, thermal, cable and recovery records. The browser does not certify installation. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Elevation → Physical envelope → Capacity worksheet. The new 9 kW exceeds the single-path allowance. Mechanical fit is only one requirement.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-14-Q1",
        "topicId": "hardware-14",
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
        "questionId": "hardware-14-Q2",
        "topicId": "hardware-14",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a 2U device start at U42 in a 42U rack?",
        "answer": "No.",
        "explanation": "Its end would be U43.",
        "testedConcept": "Can a 2U device start at U42 in a 42U rack?"
      },
      {
        "questionId": "hardware-14-Q3",
        "topicId": "hardware-14",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why show both front and rear installation context?",
        "answer": "Airflow, rails, cable access and service clearance differ.",
        "explanation": "One flat elevation is not the whole physical envelope.",
        "testedConcept": "Why show both front and rear installation context?"
      },
      {
        "questionId": "hardware-14-Q4",
        "topicId": "hardware-14",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens if a proposed interval intersects an existing device?",
        "answer": "The declared elevation is invalid.",
        "explanation": "No shared occupied U is allowed in this model.",
        "testedConcept": "What happens if a proposed interval intersects an existing device?"
      },
      {
        "questionId": "hardware-14-Q5",
        "topicId": "hardware-14",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?",
        "answer": "No.",
        "explanation": "The new 9 kW exceeds the single-path allowance.",
        "testedConcept": "R1 has 6 kW baseline and an 8 kW surviving allowance. Can a 3 kW addition fit?"
      },
      {
        "questionId": "hardware-14-Q6",
        "topicId": "hardware-14",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a valid U diagram certify floor loading?",
        "answer": "No.",
        "explanation": "Mass, cabinet/floor ratings and installation approval are separate.",
        "testedConcept": "Does a valid U diagram certify floor loading?"
      },
      {
        "questionId": "hardware-14-Q7",
        "topicId": "hardware-14",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why label unused openings and blanking intent?",
        "answer": "Uncontrolled gaps can permit bypass or recirculation.",
        "explanation": "Visual empty space affects airflow.",
        "testedConcept": "Why label unused openings and blanking intent?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20. What should be checked first?",
        "answer": "Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Rack elevation and change-controlled asset location",
        "topicId": "hardware-14",
        "questionId": "hardware-14-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Rack Management incident?",
        "answer": "Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Rack elevation and change-controlled asset location",
        "topicId": "hardware-14",
        "questionId": "hardware-14-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Rack Management case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Rack elevation and change-controlled asset location",
        "topicId": "hardware-14",
        "questionId": "hardware-14-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "The rack drawing shows U20 free, but an unrecorded 2U device occupies U19–20. What should be checked first?",
        "answer": "Reconcile physical asset identity and the elevation before approving an installation. A 2U interval starting at U19 occupies both U19 and U20.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Rack elevation and change-controlled asset location",
        "topicId": "hardware-14",
        "questionId": "hardware-14-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Rack Management incident?",
        "answer": "Correct the controlled elevation, cable/port mapping and power allocation; independently verify the new proposal has no overlap.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Rack elevation and change-controlled asset location",
        "topicId": "hardware-14",
        "questionId": "hardware-14-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Rack Management case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Rack elevation and change-controlled asset location",
        "topicId": "hardware-14",
        "questionId": "hardware-14-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-15",
    "batch": "26",
    "title": "Environmental Monitoring",
    "subtitle": "Environmental sensor location, freshness and alert delivery",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g4-t4",
    "definition": "Environmental monitoring gathers location-specific observations such as inlet temperature, humidity or leak status and delivers actionable alerts. A reading needs a sensor identity, location, unit, timestamp and quality state. Collection and alert-path failures can hide physical problems; an old normal value is not current evidence.",
    "purpose": "Develop an auditable service decision for Environmental Monitoring. Environmental sensor location, freshness and alert delivery. Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal.",
    "mental": "Compare declared sensible heat load with available sensible removal, including the stated failure condition rather than only installed tonnage. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Steady sensible heat balance with air density 1.2 kg/m³ and heat capacity 1.005 kJ/(kg·K); no humidity, recirculation, CFD, thermal transients or compliance certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Cooling foundation worksheet is reused here as a conceptual exercise; it does not emulate Environmental Monitoring or verify this incident.",
    "components": [
      "Operational scope: Environmental sensor location, freshness and alert delivery. Exact model, installed release and ownership determine which vendor procedure applies.",
      "Sensible heat: Temperature-related thermal load. Latent moisture effects excluded.",
      "Inlet condition: Air delivered to equipment. Not room-average temperature.",
      "Removal envelope: Available sensible cooling. Shared failures can reduce it.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Environmental sensor location, freshness and alert delivery: establish exact identity and observer before interpreting state.",
      "Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal.",
      "Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements."
    ],
    "flow": [
      [
        "Identify the asset",
        "Environmental sensor location, freshness and alert delivery"
      ],
      [
        "Observe the incident",
        "A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm."
      ],
      [
        "Isolate the boundary",
        "Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal."
      ],
      [
        "Verify restoration",
        "Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm. Investigation: Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal. Acceptance evidence: Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements.",
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
    "configuration": "Tabletop first: Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal. Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Environmental sensor location, freshness and alert delivery. Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements. Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm.",
        "Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal. Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements."
      ],
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
      "Treating the following partial evidence as completion: A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm.",
      "Air distribution and recirculation can create hot spots.",
      "Steady sensible balance divides heat by mass-flow heat capacity.",
      "Unit count alone is not removal resilience.",
      "Absolute scales differ by offset, differences do not."
    ],
    "prerequisites": [
      "s6-g4-t4"
    ],
    "related": [
      "s6-g4-t4",
      "hardware-16"
    ],
    "lab": {
      "objective": "Investigate the Environmental Monitoring incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Cooling boundary",
        "Sensible heat → Inlet condition → Removal envelope",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm.",
        "Write your diagnosis before using the foundation worksheet: Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal.",
        "Map heat and available removal per rack/room, inlet sensor positions, airflow paths and shared cooling power/control dependencies. Consult supported equipment limits and qualified facility procedures; do not treat a calculated mean as a compliance temperature.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Sensible heat, Inlet condition and Removal envelope. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Measure inlet conditions across heights and racks because mixing and bypass can create hot spots even when a mean thermal budget fits. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements."
      ],
      "verification": "Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements. Supported inlet/humidity and original service evidence after exact approved restoration. The calculated mean alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Sensible heat → Inlet condition → Removal envelope. Humidity and latent effects are excluded. Instant samples are not steady-state evidence.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-15-Q1",
        "topicId": "hardware-15",
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
        "questionId": "hardware-15-Q2",
        "topicId": "hardware-15",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does adequate room cooling capacity prove every inlet is acceptable?",
        "answer": "No.",
        "explanation": "Air distribution and recirculation can create hot spots.",
        "testedConcept": "Does adequate room cooling capacity prove every inlet is acceptable?"
      },
      {
        "questionId": "hardware-15-Q3",
        "topicId": "hardware-15",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Where should a server environmental acceptance observation be taken?",
        "answer": "At its relevant inlets and documented sensor positions.",
        "explanation": "A room-average reading can miss the delivered condition.",
        "testedConcept": "Where should a server environmental acceptance observation be taken?"
      },
      {
        "questionId": "hardware-15-Q4",
        "topicId": "hardware-15",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens to the ideal mean rise if flow doubles at the same heat load?",
        "answer": "It halves.",
        "explanation": "Steady sensible balance divides heat by mass-flow heat capacity.",
        "testedConcept": "What happens to the ideal mean rise if flow doubles at the same heat load?"
      },
      {
        "questionId": "hardware-15-Q5",
        "topicId": "hardware-15",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can the worksheet certify humidity compliance?",
        "answer": "No.",
        "explanation": "Humidity and latent effects are excluded.",
        "testedConcept": "Can the worksheet certify humidity compliance?"
      },
      {
        "questionId": "hardware-15-Q6",
        "topicId": "hardware-15",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review cooling power/control parents?",
        "answer": "Several cooling units can fail with one shared dependency.",
        "explanation": "Unit count alone is not removal resilience.",
        "testedConcept": "Why review cooling power/control parents?"
      },
      {
        "questionId": "hardware-15-Q7",
        "topicId": "hardware-15",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What differentiates installed from available capacity?",
        "answer": "Operating conditions and unavailable units/paths can reduce usable removal.",
        "explanation": "The failure state needs its own envelope.",
        "testedConcept": "What differentiates installed from available capacity?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm. What should be checked first?",
        "answer": "Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Environmental sensor location, freshness and alert delivery",
        "topicId": "hardware-15",
        "questionId": "hardware-15-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Environmental Monitoring incident?",
        "answer": "Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Environmental sensor location, freshness and alert delivery",
        "topicId": "hardware-15",
        "questionId": "hardware-15-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Environmental Monitoring case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Environmental sensor location, freshness and alert delivery",
        "topicId": "hardware-15",
        "questionId": "hardware-15-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "A rack inlet probe reports normal temperature with a timestamp 45 minutes old while a nearby server reports a new inlet alarm. What should be checked first?",
        "answer": "Treat stale telemetry as unknown current state. Compare sensor placement, timestamps, collection health and independent current readings before concluding that cooling is normal.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Environmental sensor location, freshness and alert delivery",
        "topicId": "hardware-15",
        "questionId": "hardware-15-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Environmental Monitoring incident?",
        "answer": "Require fresh inlet observations, supported thresholds and an acknowledged test alert through the monitoring path; room average and rack exhaust are different measurements.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Environmental sensor location, freshness and alert delivery",
        "topicId": "hardware-15",
        "questionId": "hardware-15-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Environmental Monitoring case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Environmental sensor location, freshness and alert delivery",
        "topicId": "hardware-15",
        "questionId": "hardware-15-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-16",
    "batch": "26",
    "title": "Out-of-Band Management",
    "subtitle": "Independent recovery access path",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t0",
    "definition": "Out-of-band management gives administrators a supported management path separate from the workload operating system and intended production traffic dependencies. A BMC can remain usable while the host OS is stopped, but it still needs controller/standby power, a working upstream path, trusted endpoint and authorized operation.",
    "purpose": "Develop an auditable service decision for Out-of-Band Management. Independent recovery access path. The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end.",
    "mental": "BMC hardware/firmware provides inventory, console or power functions independently of the host OS on supported systems. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded Out-of-band management foundation worksheet is reused here as a conceptual exercise; it does not emulate Out-of-Band Management or verify this incident.",
    "components": [
      "Operational scope: Independent recovery access path. Exact model, installed release and ownership determine which vendor procedure applies.",
      "BMC: Privileged management controller. Needs standby power and firmware.",
      "Dedicated path: Separate management attachment. Upstream independence still needs tracing.",
      "Authorized operation: Role-scoped action. Reachability does not grant permission.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Independent recovery access path: establish exact identity and observer before interpreting state.",
      "The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end.",
      "Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target."
    ],
    "flow": [
      [
        "Identify the asset",
        "Independent recovery access path"
      ],
      [
        "Observe the incident",
        "The server OS is down and the management jump host runs as a VM on that same server."
      ],
      [
        "Isolate the boundary",
        "The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end."
      ],
      [
        "Verify restoration",
        "Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "The server OS is down and the management jump host runs as a VM on that same server.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: The server OS is down and the management jump host runs as a VM on that same server. Investigation: The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end. Acceptance evidence: Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target.",
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
    "configuration": "Tabletop first: The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end. Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Independent recovery access path. Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target. Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "The server OS is down and the management jump host runs as a VM on that same server.",
        "The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end. Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target."
      ],
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
      "Treating the following partial evidence as completion: The server OS is down and the management jump host runs as a VM on that same server.",
      "Upstream supply and network parents can remain shared.",
      "Reachability and requested operation permission are separate.",
      "The recovery path should survive the changed boundary.",
      "An encrypted connection to the wrong endpoint is insufficient."
    ],
    "prerequisites": [
      "s6-g5-t0"
    ],
    "related": [
      "s6-g5-t0",
      "hardware-17"
    ],
    "lab": {
      "objective": "Investigate the Out-of-Band Management incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Out-of-band management boundary",
        "BMC → Dedicated path → Authorized operation",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: The server OS is down and the management jump host runs as a VM on that same server.",
        "Write your diagnosis before using the foundation worksheet: The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end.",
        "Draw jump host → protected management ingress → OOB switch → assigned BMC, then document shared parents and permitted read/control operations. Preserve local recovery before any vendor network/role change; no BMC endpoint or privileged action is executed here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using BMC, Dedicated path and Authorized operation. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication, role permission, trusted transport, logging and emergency recovery remain distinct requirements even after management reachability succeeds. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target."
      ],
      "verification": "Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target. Original authorized read/control scope, denied guest operation and exact restored path/roles with redacted audit. A healthy host OS is not that evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "BMC → Dedicated path → Authorized operation. Out-of-band is not independent of all power. Physical mode affects failure domains.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-16-Q1",
        "topicId": "hardware-16",
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
        "questionId": "hardware-16-Q2",
        "topicId": "hardware-16",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a dedicated BMC NIC guarantee an independent UPS?",
        "answer": "No.",
        "explanation": "Upstream supply and network parents can remain shared.",
        "testedConcept": "Does a dedicated BMC NIC guarantee an independent UPS?"
      },
      {
        "questionId": "hardware-16-Q3",
        "topicId": "hardware-16",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why separate read roles from power/virtual-media roles?",
        "answer": "Control operations can disrupt or bypass the workload OS.",
        "explanation": "Inventory access need not grant destructive capability.",
        "testedConcept": "Why separate read roles from power/virtual-media roles?"
      },
      {
        "questionId": "hardware-16-Q4",
        "topicId": "hardware-16",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a ping to a BMC prove administrator authorization?",
        "answer": "No.",
        "explanation": "Reachability and requested operation permission are separate.",
        "testedConcept": "Can a ping to a BMC prove administrator authorization?"
      },
      {
        "questionId": "hardware-16-Q5",
        "topicId": "hardware-16",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What happens if standby power is unavailable?",
        "answer": "The management controller may be unavailable despite host-OS independence.",
        "explanation": "Out-of-band is not independent of all power.",
        "testedConcept": "What happens if standby power is unavailable?"
      },
      {
        "questionId": "hardware-16-Q6",
        "topicId": "hardware-16",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why retain a tested local recovery path?",
        "answer": "A network/role change can lock out remote management.",
        "explanation": "The recovery path should survive the changed boundary.",
        "testedConcept": "Why retain a tested local recovery path?"
      },
      {
        "questionId": "hardware-16-Q7",
        "topicId": "hardware-16",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should BMC management be directly Internet exposed?",
        "answer": "No; use the protected authorized management design.",
        "explanation": "The controller is a highly privileged boundary.",
        "testedConcept": "Should BMC management be directly Internet exposed?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "The server OS is down and the management jump host runs as a VM on that same server. What should be checked first?",
        "answer": "The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Independent recovery access path",
        "topicId": "hardware-16",
        "questionId": "hardware-16-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Out-of-Band Management incident?",
        "answer": "Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Independent recovery access path",
        "topicId": "hardware-16",
        "questionId": "hardware-16-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Out-of-Band Management case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Independent recovery access path",
        "topicId": "hardware-16",
        "questionId": "hardware-16-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "The server OS is down and the management jump host runs as a VM on that same server. What should be checked first?",
        "answer": "The proposed recovery path depends on the failed workload. Trace administrator entry, authentication, network and power dependencies end to end.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "Independent recovery access path",
        "topicId": "hardware-16",
        "questionId": "hardware-16-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this Out-of-Band Management incident?",
        "answer": "Document an independently reachable authorized recovery path; separately verify read access and protected control operations on an approved target.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "Independent recovery access path",
        "topicId": "hardware-16",
        "questionId": "hardware-16-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this Out-of-Band Management case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "Independent recovery access path",
        "topicId": "hardware-16",
        "questionId": "hardware-16-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-17",
    "batch": "26",
    "title": "iLO",
    "subtitle": "iLO generation, role and feature entitlement",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t1",
    "definition": "Integrated Lights-Out is HPE server management implemented by supported controller hardware/firmware. This lesson uses iLO 6 security guidance for architectural orientation; feature availability, dedicated/shared-port support, licenses and exact procedures depend on the server and release.",
    "purpose": "Develop an auditable service decision for iLO. iLO generation, role and feature entitlement. Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation.",
    "mental": "iLO exposes supported inventory/health and privileged console/power functions while retaining controller/standby and upstream network dependencies. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded iLO foundation worksheet is reused here as a conceptual exercise; it does not emulate iLO or verify this incident.",
    "components": [
      "Operational scope: iLO generation, role and feature entitlement. Exact model, installed release and ownership determine which vendor procedure applies.",
      "iLO generation: Controller family. Support varies by server/release.",
      "NIC mode: Dedicated or supported shared attachment. Changes physical dependencies.",
      "Feature entitlement: Supported/license scope. Does not replace role permission.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "iLO generation, role and feature entitlement: establish exact identity and observer before interpreting state.",
      "Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation.",
      "Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut."
    ],
    "flow": [
      [
        "Identify the asset",
        "iLO generation, role and feature entitlement"
      ],
      [
        "Observe the incident",
        "An iLO user can view health but cannot launch a requested remote-console feature."
      ],
      [
        "Isolate the boundary",
        "Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation."
      ],
      [
        "Verify restoration",
        "Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "An iLO user can view health but cannot launch a requested remote-console feature.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: An iLO user can view health but cannot launch a requested remote-console feature. Investigation: Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation. Acceptance evidence: Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut.",
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
    "configuration": "Tabletop first: Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation. Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "iLO generation, role and feature entitlement. Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut. Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "An iLO user can view health but cannot launch a requested remote-console feature.",
        "Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation. Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut."
      ],
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
      "Treating the following partial evidence as completion: An iLO user can view health but cannot launch a requested remote-console feature.",
      "Generational guidance is not a universal hardware assertion.",
      "The product name alone is insufficient.",
      "Trusted endpoint validation is part of the management boundary.",
      "Entitlement and role authorization are separate."
    ],
    "prerequisites": [
      "s6-g5-t1"
    ],
    "related": [
      "s6-g5-t1",
      "hardware-18"
    ],
    "lab": {
      "objective": "Investigate the iLO incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → iLO boundary",
        "iLO generation → NIC mode → Feature entitlement",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: An iLO user can view health but cannot launch a requested remote-console feature.",
        "Write your diagnosis before using the foundation worksheet: Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation.",
        "Inventory exact server, iLO generation, firmware, NIC mode and licensed functions through approved read-only management. Design role-scoped jump access and preserve local recovery before guided network/credential changes; no iLO session is run here.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using iLO generation, NIC mode and Feature entitlement. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Account roles, trusted transport, certificate/time context and audit retention govern the operation; a successful login does not authorize every function. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut."
      ],
      "verification": "Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut. Original authorized operation, denied unprivileged operation and exact restored supported state. No actual vendor session is inferred from the worksheet. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "iLO generation → NIC mode → Feature entitlement. Shared attachment introduces coupling that must be documented. The change can remove the remote path used to administer it.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-17-Q1",
        "topicId": "hardware-17",
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
        "questionId": "hardware-17-Q2",
        "topicId": "hardware-17",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does every HPE server necessarily have a dedicated iLO port?",
        "answer": "No; validate the actual supported hardware.",
        "explanation": "Generational guidance is not a universal hardware assertion.",
        "testedConcept": "Does every HPE server necessarily have a dedicated iLO port?"
      },
      {
        "questionId": "hardware-17-Q3",
        "topicId": "hardware-17",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can iLO remain available when the host OS is stopped?",
        "answer": "On supported powered/controller-ready systems, yes.",
        "explanation": "Host independence still requires standby power and upstream access.",
        "testedConcept": "Can iLO remain available when the host OS is stopped?"
      },
      {
        "questionId": "hardware-17-Q4",
        "topicId": "hardware-17",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the iLO generation with firmware?",
        "answer": "Procedures and security capabilities differ by release/family.",
        "explanation": "The product name alone is insufficient.",
        "testedConcept": "Why record the iLO generation with firmware?"
      },
      {
        "questionId": "hardware-17-Q5",
        "topicId": "hardware-17",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is a shared NIC mode physically independent of the workload NIC?",
        "answer": "Not necessarily.",
        "explanation": "Shared attachment introduces coupling that must be documented.",
        "testedConcept": "Is a shared NIC mode physically independent of the workload NIC?"
      },
      {
        "questionId": "hardware-17-Q6",
        "topicId": "hardware-17",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should certificate checks be disabled to simplify a lab login?",
        "answer": "No.",
        "explanation": "Trusted endpoint validation is part of the management boundary.",
        "testedConcept": "Should certificate checks be disabled to simplify a lab login?"
      },
      {
        "questionId": "hardware-17-Q7",
        "topicId": "hardware-17",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why limit virtual-media privileges?",
        "answer": "They can affect boot and bypass workload OS controls.",
        "explanation": "Management permissions have a wider impact than simple inventory.",
        "testedConcept": "Why limit virtual-media privileges?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "An iLO user can view health but cannot launch a requested remote-console feature. What should be checked first?",
        "answer": "Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "iLO generation, role and feature entitlement",
        "topicId": "hardware-17",
        "questionId": "hardware-17-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this iLO incident?",
        "answer": "Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "iLO generation, role and feature entitlement",
        "topicId": "hardware-17",
        "questionId": "hardware-17-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this iLO case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "iLO generation, role and feature entitlement",
        "topicId": "hardware-17",
        "questionId": "hardware-17-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "An iLO user can view health but cannot launch a requested remote-console feature. What should be checked first?",
        "answer": "Distinguish supported generation/firmware, licensing or entitlement and user privileges from a network failure. Health access proves only the permitted operation.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "iLO generation, role and feature entitlement",
        "topicId": "hardware-17",
        "questionId": "hardware-17-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this iLO incident?",
        "answer": "Record the exact operation and documented feature requirements, then verify with an authorized role; do not grant blanket administrator access as a diagnostic shortcut.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "iLO generation, role and feature entitlement",
        "topicId": "hardware-17",
        "questionId": "hardware-17-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this iLO case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "iLO generation, role and feature entitlement",
        "topicId": "hardware-17",
        "questionId": "hardware-17-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-18",
    "batch": "26",
    "title": "iDRAC",
    "subtitle": "iDRAC dedicated or shared NIC attachment",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t2",
    "definition": "Integrated Dell Remote Access Controller is privileged management on supported PowerEdge servers. This lesson anchors security discussion to the iDRAC9 5.x guide; hardware, firmware, license and NIC-mode support must be checked for the actual server rather than inferred across every generation.",
    "purpose": "Develop an auditable service decision for iDRAC. iDRAC dedicated or shared NIC attachment. Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence.",
    "mental": "iDRAC inventories supported host health and can provide role-scoped console, media and power operations while the OS has a separate lifecycle. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded iDRAC foundation worksheet is reused here as a conceptual exercise; it does not emulate iDRAC or verify this incident.",
    "components": [
      "Operational scope: iDRAC dedicated or shared NIC attachment. Exact model, installed release and ownership determine which vendor procedure applies.",
      "iDRAC version: Supported controller context. Generation/release matters.",
      "Dedicated NIC: Management attachment option. Does not prove upstream diversity.",
      "Read/control roles: Scoped permissions. Power/media are higher-impact than inventory.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "iDRAC dedicated or shared NIC attachment: establish exact identity and observer before interpreting state.",
      "Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence.",
      "Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access."
    ],
    "flow": [
      [
        "Identify the asset",
        "iDRAC dedicated or shared NIC attachment"
      ],
      [
        "Observe the incident",
        "iDRAC becomes unreachable after a host-facing switchport change even though standby power is present."
      ],
      [
        "Isolate the boundary",
        "Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence."
      ],
      [
        "Verify restoration",
        "Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "iDRAC becomes unreachable after a host-facing switchport change even though standby power is present.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: iDRAC becomes unreachable after a host-facing switchport change even though standby power is present. Investigation: Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence. Acceptance evidence: Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access.",
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
    "configuration": "Tabletop first: Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence. Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "iDRAC dedicated or shared NIC attachment. Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access. Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "iDRAC becomes unreachable after a host-facing switchport change even though standby power is present.",
        "Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence. Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access."
      ],
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
      "Treating the following partial evidence as completion: iDRAC becomes unreachable after a host-facing switchport change even though standby power is present.",
      "It can still share switches, power and access services.",
      "Authorization remains operation specific.",
      "Feature availability and role permission differ.",
      "An incorrect attachment can lock out remote administration."
    ],
    "prerequisites": [
      "s6-g5-t2"
    ],
    "related": [
      "s6-g5-t2",
      "hardware-19"
    ],
    "lab": {
      "objective": "Investigate the iDRAC incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → iDRAC boundary",
        "iDRAC version → Dedicated NIC → Read/control roles",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: iDRAC becomes unreachable after a host-facing switchport change even though standby power is present.",
        "Write your diagnosis before using the foundation worksheet: Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence.",
        "Record server model, iDRAC generation/firmware, NIC mode, supported feature/license and role design through approved read-only observation. Retain local recovery before any guided network/account change; no RACADM or iDRAC API command is executed.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using iDRAC version, Dedicated NIC and Read/control roles. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Identity roles, certificate trust, audit and feature entitlement determine permitted operations after a network path is established. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access."
      ],
      "verification": "Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access. Supported version/role/path and original authorized/denied management operations after exact restore. No actual iDRAC execution is claimed here. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "iDRAC version → Dedicated NIC → Read/control roles. Reachable HTTPS alone is weaker evidence. The original user transaction must be verified separately.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-18-Q1",
        "topicId": "hardware-18",
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
        "questionId": "hardware-18-Q2",
        "topicId": "hardware-18",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a dedicated iDRAC NIC prove independent upstream management?",
        "answer": "No.",
        "explanation": "It can still share switches, power and access services.",
        "testedConcept": "Does a dedicated iDRAC NIC prove independent upstream management?"
      },
      {
        "questionId": "hardware-18-Q3",
        "topicId": "hardware-18",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a read-only inventory role be separated from power control?",
        "answer": "Yes in a supported role design; verify the actual role configuration.",
        "explanation": "Monitoring need not grant service-interruption capability.",
        "testedConcept": "Can a read-only inventory role be separated from power control?"
      },
      {
        "questionId": "hardware-18-Q4",
        "topicId": "hardware-18",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does a successful iDRAC login prove?",
        "answer": "Accepted identity for that session, not permission for every action.",
        "explanation": "Authorization remains operation specific.",
        "testedConcept": "What does a successful iDRAC login prove?"
      },
      {
        "questionId": "hardware-18-Q5",
        "topicId": "hardware-18",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why preserve certificate/time context?",
        "answer": "Trust and audit interpretation depend on correct supported endpoint/time behavior.",
        "explanation": "Reachable HTTPS alone is weaker evidence.",
        "testedConcept": "Why preserve certificate/time context?"
      },
      {
        "questionId": "hardware-18-Q6",
        "topicId": "hardware-18",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does license entitlement imply account authorization?",
        "answer": "No.",
        "explanation": "Feature availability and role permission differ.",
        "testedConcept": "Does license entitlement imply account authorization?"
      },
      {
        "questionId": "hardware-18-Q7",
        "topicId": "hardware-18",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why is virtual media security-sensitive?",
        "answer": "It can affect boot and expose a path around workload OS controls.",
        "explanation": "Management has privileged reach.",
        "testedConcept": "Why is virtual media security-sensitive?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "iDRAC becomes unreachable after a host-facing switchport change even though standby power is present. What should be checked first?",
        "answer": "Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "iDRAC dedicated or shared NIC attachment",
        "topicId": "hardware-18",
        "questionId": "hardware-18-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this iDRAC incident?",
        "answer": "Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "iDRAC dedicated or shared NIC attachment",
        "topicId": "hardware-18",
        "questionId": "hardware-18-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this iDRAC case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "iDRAC dedicated or shared NIC attachment",
        "topicId": "hardware-18",
        "questionId": "hardware-18-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "iDRAC becomes unreachable after a host-facing switchport change even though standby power is present. What should be checked first?",
        "answer": "Check whether management uses a dedicated or shared NIC and compare its VLAN, port and routing path. OS independence does not guarantee physical network independence.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "iDRAC dedicated or shared NIC attachment",
        "topicId": "hardware-18",
        "questionId": "hardware-18-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this iDRAC incident?",
        "answer": "Restore only the owned path setting and verify trusted HTTPS plus the intended read operation; preserve alternate recovery access.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "iDRAC dedicated or shared NIC attachment",
        "topicId": "hardware-18",
        "questionId": "hardware-18-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this iDRAC case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "iDRAC dedicated or shared NIC attachment",
        "topicId": "hardware-18",
        "questionId": "hardware-18-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  },
  {
    "id": "hardware-19",
    "batch": "26",
    "title": "CIMC",
    "subtitle": "CIMC authority and management-plane evidence",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g5-t3",
    "definition": "Cisco Integrated Management Controller provides privileged management for supported Cisco compute systems. Standalone CIMC management, UCS Manager and Intersight are distinct operational contexts; support and control ownership depend on the actual server, mode, firmware and integration.",
    "purpose": "Develop an auditable service decision for CIMC. CIMC authority and management-plane evidence. Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies.",
    "mental": "The supported controller exposes inventory, health and role-scoped console/power functions with standby and upstream path dependencies. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared controller standby/path/identity/permission/TLS conditions; host OS is deliberately independent. No actual iLO/iDRAC/CIMC, TLS or management network query. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure. The embedded CIMC foundation worksheet is reused here as a conceptual exercise; it does not emulate CIMC or verify this incident.",
    "components": [
      "Operational scope: CIMC authority and management-plane evidence. Exact model, installed release and ownership determine which vendor procedure applies.",
      "CIMC: Compute management controller. Privileged and host-OS independent within support.",
      "Ownership mode: Standalone or integrated context. Determines configuration consumer.",
      "NIC mode: Supported management path choice. Trace shared parents.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "CIMC authority and management-plane evidence: establish exact identity and observer before interpreting state.",
      "Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies.",
      "Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim."
    ],
    "flow": [
      [
        "Identify the asset",
        "CIMC authority and management-plane evidence"
      ],
      [
        "Observe the incident",
        "CIMC displays healthy hardware while a host application is unavailable."
      ],
      [
        "Isolate the boundary",
        "Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies."
      ],
      [
        "Verify restoration",
        "Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim."
      ]
    ],
    "comparison": [
      [
        "Observed incident",
        "CIMC displays healthy hardware while a host application is unavailable.",
        "Evidence must come from the named layer."
      ],
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
    "example": "Authored incident: CIMC displays healthy hardware while a host application is unavailable. Investigation: Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies. Acceptance evidence: Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim.",
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
    "configuration": "Tabletop first: Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies. Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "CIMC authority and management-plane evidence. Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim. Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "CIMC displays healthy hardware while a host application is unavailable.",
        "Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies. Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim."
      ],
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
      "Treating the following partial evidence as completion: CIMC displays healthy hardware while a host application is unavailable.",
      "A command in the wrong control plane may not govern the target.",
      "Host independence is not independence from all dependencies.",
      "Controller permissions have privileged impact.",
      "The new mode can remove the current remote path."
    ],
    "prerequisites": [
      "s6-g5-t3"
    ],
    "related": [
      "s6-g5-t3"
    ],
    "lab": {
      "objective": "Investigate the CIMC incident and produce the scoped evidence required to close it.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → CIMC boundary",
        "CIMC → Ownership mode → NIC mode",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Read the dedicated hardware workbook incident: CIMC displays healthy hardware while a host application is unavailable.",
        "Write your diagnosis before using the foundation worksheet: Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies.",
        "Record exact server, CIMC firmware, standalone/integrated ownership and supported NIC mode. Use the release-specific guide to preserve an independent local recovery path before any guided management/role change; no CIMC CLI/API is executed.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using CIMC, Ownership mode and NIC mode. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Authentication/roles, trusted endpoint and audit govern each operation, while central integration can change where configuration ownership is consumed. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration.",
        "Close this specific incident using: Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim."
      ],
      "verification": "Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim. Correct ownership/version/path and original allowed/denied operation results after restore. The worksheet does not execute a Cisco management session. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "CIMC → Ownership mode → NIC mode. A path alone is insufficient. Original application operations require a separate observer.",
      "challenge": "Which additional fault could preserve the reported observation while the intended operation still fails? Identify an independent observation that would distinguish it.",
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
        "questionId": "hardware-19-Q1",
        "topicId": "hardware-19",
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
        "questionId": "hardware-19-Q2",
        "topicId": "hardware-19",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record firmware and ownership mode before a change?",
        "answer": "Supported settings and their actual configuration consumer depend on context.",
        "explanation": "A command in the wrong control plane may not govern the target.",
        "testedConcept": "Why record firmware and ownership mode before a change?"
      },
      {
        "questionId": "hardware-19-Q3",
        "topicId": "hardware-19",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dedicated NIC mode prove independent power?",
        "answer": "No.",
        "explanation": "Standby and upstream switch/supply parents remain relevant.",
        "testedConcept": "Does dedicated NIC mode prove independent power?"
      },
      {
        "questionId": "hardware-19-Q4",
        "topicId": "hardware-19",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can CIMC access remain possible while the workload OS is stopped?",
        "answer": "On a supported controller-ready powered path, yes.",
        "explanation": "Host independence is not independence from all dependencies.",
        "testedConcept": "Can CIMC access remain possible while the workload OS is stopped?"
      },
      {
        "questionId": "hardware-19-Q5",
        "topicId": "hardware-19",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does management reachability fail to establish?",
        "answer": "Identity, operation permission, endpoint trust and original service.",
        "explanation": "A path alone is insufficient.",
        "testedConcept": "What does management reachability fail to establish?"
      },
      {
        "questionId": "hardware-19-Q6",
        "topicId": "hardware-19",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why restrict power/virtual-media roles?",
        "answer": "They can disrupt service or bypass the workload OS boundary.",
        "explanation": "Controller permissions have privileged impact.",
        "testedConcept": "Why restrict power/virtual-media roles?"
      },
      {
        "questionId": "hardware-19-Q7",
        "topicId": "hardware-19",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should CIMC be treated as identical to Intersight?",
        "answer": "No.",
        "explanation": "They represent different local/central management contexts.",
        "testedConcept": "Should CIMC be treated as identical to Intersight?"
      },
      {
        "difficulty": "Troubleshooting",
        "question": "CIMC displays healthy hardware while a host application is unavailable. What should be checked first?",
        "answer": "Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "CIMC authority and management-plane evidence",
        "topicId": "hardware-19",
        "questionId": "hardware-19-Q8"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this CIMC incident?",
        "answer": "Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "CIMC authority and management-plane evidence",
        "topicId": "hardware-19",
        "questionId": "hardware-19-Q9"
      },
      {
        "difficulty": "Advanced",
        "question": "For this CIMC case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "CIMC authority and management-plane evidence",
        "topicId": "hardware-19",
        "questionId": "hardware-19-Q10"
      }
    ],
    "quick": [
      {
        "difficulty": "Troubleshooting",
        "question": "CIMC displays healthy hardware while a host application is unavailable. What should be checked first?",
        "answer": "Controller health and application reachability describe different layers. Preserve the hardware evidence and investigate host boot, network, storage and application dependencies.",
        "explanation": "The reported observation is insufficient because the named boundary has not yet been established.",
        "type": "short-answer",
        "testedConcept": "CIMC authority and management-plane evidence",
        "topicId": "hardware-19",
        "questionId": "hardware-19-QC1"
      },
      {
        "difficulty": "Design",
        "question": "What evidence closes this CIMC incident?",
        "answer": "Require a timestamped hardware observation and a separate original application transaction; never turn a CIMC green indicator into an application availability claim.",
        "explanation": "Recovery must establish the intended operation and identity rather than repeat the original partial observation.",
        "type": "short-answer",
        "testedConcept": "CIMC authority and management-plane evidence",
        "topicId": "hardware-19",
        "questionId": "hardware-19-QC2"
      },
      {
        "difficulty": "Advanced",
        "question": "For this CIMC case, why is the foundation worksheet insufficient as proof of physical recovery?",
        "answer": "It operates on supplied teaching inputs and does not execute the vendor or physical procedure.",
        "explanation": "Retain the model result as a prediction and collect actual target evidence separately.",
        "type": "short-answer",
        "testedConcept": "CIMC authority and management-plane evidence",
        "topicId": "hardware-19",
        "questionId": "hardware-19-QC3"
      }
    ],
    "artifacts": [
      {
        "title": "Physical Hardware incident and acceptance workbook",
        "path": "labs/physical-hardware-workbook.md"
      },
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  }
];
