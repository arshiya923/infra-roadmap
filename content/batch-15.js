'use strict';
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['15']=[
  {
    "id": "s6-g0-t0",
    "batch": "15",
    "title": "Server Hardware",
    "subtitle": "Map one workload to its physical and logical dependencies.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t0",
    "definition": "Server hardware is a service dependency chain: processors execute work, local memory holds working state, adapters move data, storage persists it, and firmware, power and cooling make those components usable. Inventory includes replaceable units, attachment paths and shared chassis risks rather than only total cores and disk terabytes.",
    "purpose": "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
    "mental": "Trace request → NIC → DMA buffers → CPU → storage completion; a detected adapter does not prove a completed transaction. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Inventory: Installed components and attachment map. Discovery does not certify health.",
      "Telemetry: Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test: Original user operation. Checks the assembled dependency path.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Trace request → NIC → DMA buffers → CPU → storage completion; a detected adapter does not prove a completed transaction.",
      "Firmware discovers devices and exposes topology; the OS driver and application must consume the correct interface and supported firmware combination.",
      "Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure."
    ],
    "flow": [
      [
        "Map the original operation",
        "Server hardware is a service dependency chain: processors execute work, local memory holds working state, adapters move data, storage persists it, and firmware, power and cooling make those components usable. Inventory includes replaceable units, attachment paths and shared chassis risks rather than only total cores and disk terabytes."
      ],
      [
        "Trace the first boundary",
        "Trace request → NIC → DMA buffers → CPU → storage completion; a detected adapter does not prove a completed transaction."
      ],
      [
        "Evaluate installed conditions",
        "Firmware discovers devices and exposes topology; the OS driver and application must consume the correct interface and supported firmware combination."
      ],
      [
        "Verify capacity and recovery",
        "Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure."
      ]
    ],
    "comparison": [
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
    "example": "Case: An inventory lists two PSUs. What observation is still needed for feed resilience? Answer: Trace each cord through independent upstream capacity and retest the required service after a scoped loss. Reason: Two replaceable supplies can share one PDU or UPS. Case: After a firmware update storage disappears. What baseline matters? Answer: Controller mode, firmware compatibility, device identity and boot configuration. Reason: A boot change can alter discovery without a disk failure. Case: What is the smallest useful hardware failure-domain diagram? Answer: Workload dependencies with shared power, chassis, controller and fabric parents. Reason: Duplicated parts can depend on one shared parent.",
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
    "configuration": "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
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
      "Presence is discovery evidence, not transaction evidence.",
      "A boot change can alter discovery without a disk failure.",
      "Physical fit does not imply a readable array.",
      "Duplicated parts can depend on one shared parent."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g0-t1"
    ],
    "lab": {
      "objective": "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Server Hardware boundary",
        "Inventory → Telemetry → Service test",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Map one workload to its physical and logical dependencies. Record chassis identity, firmware release, processor sockets, populated memory, adapter location, disk-to-slot mapping and observed load before deciding which spare or maintenance window is appropriate.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Inventory, Telemetry and Service test. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Redundant PSUs survive only within their ratings and upstream failure domains; fan and memory health can reduce usable capacity before complete failure. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Health evidence plus the original service and preserved data integrity. A cleared alert alone is incomplete recovery evidence. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Inventory → Telemetry → Service test. A single later temperature sample misses the triggering condition. Logical device names and physical bays can differ.",
      "challenge": "What is the smallest useful hardware failure-domain diagram? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Inventory": "Installed components and attachment map. Discovery does not certify health.",
      "Telemetry": "Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test": "Original user operation. Checks the assembled dependency path."
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
        "questionId": "s6-g0-t0-Q01",
        "topicId": "s6-g0-t0",
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
        "questionId": "s6-g0-t0-Q02",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A NIC appears in inventory but requests fail. What is the next evidence boundary?",
        "answer": "Driver, link, addressing, route and application response at the intended client.",
        "explanation": "Presence is discovery evidence, not transaction evidence.",
        "testedConcept": "A NIC appears in inventory but requests fail. What is the next evidence boundary?"
      },
      {
        "questionId": "s6-g0-t0-Q03",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?",
        "answer": "The platform population map and usable local memory per socket.",
        "explanation": "Socket count does not establish balanced memory access.",
        "testedConcept": "Both CPU sockets exist but one lacks supported DIMMs. What should be checked?"
      },
      {
        "questionId": "s6-g0-t0-Q04",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "After a firmware update storage disappears. What baseline matters?",
        "answer": "Controller mode, firmware compatibility, device identity and boot configuration.",
        "explanation": "A boot change can alter discovery without a disk failure.",
        "testedConcept": "After a firmware update storage disappears. What baseline matters?"
      },
      {
        "questionId": "s6-g0-t0-Q05",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?",
        "answer": "Time-correlated inlet, fan, CPU frequency and workload telemetry.",
        "explanation": "A single later temperature sample misses the triggering condition.",
        "testedConcept": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?"
      },
      {
        "questionId": "s6-g0-t0-Q06",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A spare controller has the same connector. Is replacement compatibility proven?",
        "answer": "No; validate model, firmware, metadata format and cache protection.",
        "explanation": "Physical fit does not imply a readable array.",
        "testedConcept": "A spare controller has the same connector. Is replacement compatibility proven?"
      },
      {
        "questionId": "s6-g0-t0-Q07",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "The application is slow at 20% CPU. Name another bottleneck to inspect.",
        "answer": "Memory locality, I/O queue latency or network/PCIe capacity.",
        "explanation": "Aggregate CPU use hides stalled work.",
        "testedConcept": "The application is slow at 20% CPU. Name another bottleneck to inspect."
      },
      {
        "questionId": "s6-g0-t0-Q08",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is the smallest useful hardware failure-domain diagram?",
        "answer": "Workload dependencies with shared power, chassis, controller and fabric parents.",
        "explanation": "Duplicated parts can depend on one shared parent.",
        "testedConcept": "What is the smallest useful hardware failure-domain diagram?"
      },
      {
        "questionId": "s6-g0-t0-Q09",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why preserve serial-to-slot mapping before maintenance?",
        "answer": "It prevents replacing a healthy component mistaken for the failed one.",
        "explanation": "Logical device names and physical bays can differ.",
        "testedConcept": "Why preserve serial-to-slot mapping before maintenance?"
      },
      {
        "questionId": "s6-g0-t0-Q10",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies recovery after replacing an owned component?",
        "answer": "Health evidence plus the original service and preserved data integrity.",
        "explanation": "A cleared alert alone is incomplete recovery evidence.",
        "testedConcept": "What verifies recovery after replacing an owned component?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t0-QC1",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A NIC appears in inventory but requests fail. What is the next evidence boundary?",
        "answer": "Driver, link, addressing, route and application response at the intended client.",
        "explanation": "Presence is discovery evidence, not transaction evidence.",
        "testedConcept": "A NIC appears in inventory but requests fail. What is the next evidence boundary?"
      },
      {
        "questionId": "s6-g0-t0-QC2",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?",
        "answer": "Time-correlated inlet, fan, CPU frequency and workload telemetry.",
        "explanation": "A single later temperature sample misses the triggering condition.",
        "testedConcept": "The host reports thermal throttling while idle temperature looks normal. What evidence helps?"
      },
      {
        "questionId": "s6-g0-t0-QC3",
        "topicId": "s6-g0-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why preserve serial-to-slot mapping before maintenance?",
        "answer": "It prevents replacing a healthy component mistaken for the failed one.",
        "explanation": "Logical device names and physical bays can differ.",
        "testedConcept": "Why preserve serial-to-slot mapping before maintenance?"
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
    "id": "s6-g0-t1",
    "batch": "15",
    "title": "Rack Servers",
    "subtitle": "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t1",
    "definition": "A rack server is a self-contained chassis mounted in standardized vertical rack space. Its rack-unit height describes vertical allocation, not depth, rail compatibility, weight, cooling direction or power demand. Rails, service clearance and cord reach are part of the supported installation.",
    "purpose": "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.",
    "mental": "Translate chassis height into an inclusive U interval and check occupied intervals before mounting. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Check one proposed vertical interval against a fixed three-rack teaching elevation and 8 kW per surviving feed; excludes physical dimensions, mass, circuits and installation certification. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "U interval: Vertical occupied positions. A 2U device at U5 occupies U5 and U6.",
      "Rail envelope: Supported depth and service travel. Check vendor kit and cabinet compatibility.",
      "Feed path: Cord to upstream supply. Distinct outlets may share the same circuit.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Translate chassis height into an inclusive U interval and check occupied intervals before mounting.",
      "Follow front inlet to rear exhaust and preserve cable-arm travel so maintenance does not block airflow or pull connectors.",
      "Trace both PSU cords beyond the rack outlets and reserve capacity on the surviving feed for the entire load."
    ],
    "flow": [
      [
        "Map the original operation",
        "A rack server is a self-contained chassis mounted in standardized vertical rack space. Its rack-unit height describes vertical allocation, not depth, rail compatibility, weight, cooling direction or power demand. Rails, service clearance and cord reach are part of the supported installation."
      ],
      [
        "Trace the first boundary",
        "Translate chassis height into an inclusive U interval and check occupied intervals before mounting."
      ],
      [
        "Evaluate installed conditions",
        "Follow front inlet to rear exhaust and preserve cable-arm travel so maintenance does not block airflow or pull connectors."
      ],
      [
        "Verify capacity and recovery",
        "Trace both PSU cords beyond the rack outlets and reserve capacity on the surviving feed for the entire load."
      ]
    ],
    "comparison": [
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
    "example": "Case: A 2U chassis starts at U5. Which positions are occupied? Answer: U5 and U6. Reason: Intervals include both endpoints. Case: There are 20 free U but the B feed cannot carry full rack load. What constrains expansion? Answer: Surviving-feed power capacity. Reason: Available height is only one constraint. Case: Why label both ends of an uplink before a server replacement? Answer: To restore the exact attachment without guessing from link LEDs. Reason: A lit wrong port can still break the service.",
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
    "configuration": "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
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
      "Vertical fit uses start plus height minus one.",
      "Available height is only one constraint.",
      "A rail motion can interrupt power or data.",
      "A lit wrong port can still break the service."
    ],
    "prerequisites": [
      "s6-g0-t0"
    ],
    "related": [
      "s6-g0-t2"
    ],
    "lab": {
      "objective": "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Rack Servers boundary",
        "U interval → Rail envelope → Feed path",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Produce an elevation with numbered U positions, asset identity, front/rear orientation, depth, mass and service clearances. Use manufacturer rails and lifting procedures; the classroom elevation calculation does not authorize physical installation.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using U interval, Rail envelope and Feed path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Trace both PSU cords beyond the rack outlets and reserve capacity on the surviving feed for the entire load. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "No overlaps, supported dimensions/loading, documented feeds and service clearance. A neat drawing alone is not an installation validation. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "U interval → Rail envelope → Feed path. Rack-unit height says nothing about depth. Physical and logical boundaries are independent.",
      "challenge": "Why label both ends of an uplink before a server replacement? Explain the needed observer and why capability or inventory alone cannot settle it.",
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
        "questionId": "s6-g0-t1-Q01",
        "topicId": "s6-g0-t1",
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
        "questionId": "s6-g0-t1-Q02",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A new 3U device starts at U41 in a 42U rack. Does it fit?",
        "answer": "No; its last position would be U43.",
        "explanation": "Vertical fit uses start plus height minus one.",
        "testedConcept": "A new 3U device starts at U41 in a 42U rack. Does it fit?"
      },
      {
        "questionId": "s6-g0-t1-Q03",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two devices both include U12. Is the elevation valid?",
        "answer": "No; their intervals overlap.",
        "explanation": "Different front labels do not remove physical overlap.",
        "testedConcept": "Two devices both include U12. Is the elevation valid?"
      },
      {
        "questionId": "s6-g0-t1-Q04",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "There are 20 free U but the B feed cannot carry full rack load. What constrains expansion?",
        "answer": "Surviving-feed power capacity.",
        "explanation": "Available height is only one constraint.",
        "testedConcept": "There are 20 free U but the B feed cannot carry full rack load. What constrains expansion?"
      },
      {
        "questionId": "s6-g0-t1-Q05",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a 1U designation prove the server fits a shallow rack?",
        "answer": "No; depth, rails and cable clearance require separate checks.",
        "explanation": "Rack-unit height says nothing about depth.",
        "testedConcept": "Does a 1U designation prove the server fits a shallow rack?"
      },
      {
        "questionId": "s6-g0-t1-Q06",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should be verified before sliding a powered chassis for service?",
        "answer": "Cable-arm movement, cord slack, airflow and supported service procedure.",
        "explanation": "A rail motion can interrupt power or data.",
        "testedConcept": "What should be verified before sliding a powered chassis for service?"
      },
      {
        "questionId": "s6-g0-t1-Q07",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Where should a heavy chassis generally be considered in planning?",
        "answer": "Low positions subject to the cabinet and installation instructions.",
        "explanation": "Stability and rated loading matter beyond unused U.",
        "testedConcept": "Where should a heavy chassis generally be considered in planning?"
      },
      {
        "questionId": "s6-g0-t1-Q08",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why label both ends of an uplink before a server replacement?",
        "answer": "To restore the exact attachment without guessing from link LEDs.",
        "explanation": "A lit wrong port can still break the service.",
        "testedConcept": "Why label both ends of an uplink before a server replacement?"
      },
      {
        "questionId": "s6-g0-t1-Q09",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "A rack is locked but BMC HTTPS is Internet reachable. Is access controlled?",
        "answer": "No; management requires its own network and identity policy.",
        "explanation": "Physical and logical boundaries are independent.",
        "testedConcept": "A rack is locked but BMC HTTPS is Internet reachable. Is access controlled?"
      },
      {
        "questionId": "s6-g0-t1-Q10",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What evidence should complete an elevation review?",
        "answer": "No overlaps, supported dimensions/loading, documented feeds and service clearance.",
        "explanation": "A neat drawing alone is not an installation validation.",
        "testedConcept": "What evidence should complete an elevation review?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t1-QC1",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A new 3U device starts at U41 in a 42U rack. Does it fit?",
        "answer": "No; its last position would be U43.",
        "explanation": "Vertical fit uses start plus height minus one.",
        "testedConcept": "A new 3U device starts at U41 in a 42U rack. Does it fit?"
      },
      {
        "questionId": "s6-g0-t1-QC2",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a 1U designation prove the server fits a shallow rack?",
        "answer": "No; depth, rails and cable clearance require separate checks.",
        "explanation": "Rack-unit height says nothing about depth.",
        "testedConcept": "Does a 1U designation prove the server fits a shallow rack?"
      },
      {
        "questionId": "s6-g0-t1-QC3",
        "topicId": "s6-g0-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "A rack is locked but BMC HTTPS is Internet reachable. Is access controlled?",
        "answer": "No; management requires its own network and identity policy.",
        "explanation": "Physical and logical boundaries are independent.",
        "testedConcept": "A rack is locked but BMC HTTPS is Internet reachable. Is access controlled?"
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
    "id": "s6-g0-t2",
    "batch": "15",
    "title": "Blade Servers",
    "subtitle": "Draw module and enclosure dependencies before placing replicas.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t2",
    "definition": "Blade servers separate compute modules from a shared enclosure containing power, cooling, interconnects and management. Module redundancy and dense cabling can improve operations while enclosure power, midplane, firmware and interconnect dependencies enlarge the shared failure domain.",
    "purpose": "Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.",
    "mental": "Map each blade CPU/memory to mezzanine adapter → enclosure interconnect → external fabric; slot identity and port mapping determine the actual path. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Blade: Compute module. Depends on enclosure services.",
      "Enclosure: Shared power/cooling/management. Creates correlated failures.",
      "Interconnect: Module-to-fabric boundary. Port and mode mapping require validation.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Map each blade CPU/memory to mezzanine adapter → enclosure interconnect → external fabric; slot identity and port mapping determine the actual path.",
      "Enclosure power allocation and fan policy decide whether inserted hardware can operate at full capacity; spare slots do not establish available watts.",
      "Firmware and management coordinate module discovery; two blades in one enclosure do not survive every enclosure-level incident."
    ],
    "flow": [
      [
        "Map the original operation",
        "Blade servers separate compute modules from a shared enclosure containing power, cooling, interconnects and management. Module redundancy and dense cabling can improve operations while enclosure power, midplane, firmware and interconnect dependencies enlarge the shared failure domain."
      ],
      [
        "Trace the first boundary",
        "Map each blade CPU/memory to mezzanine adapter → enclosure interconnect → external fabric; slot identity and port mapping determine the actual path."
      ],
      [
        "Evaluate installed conditions",
        "Enclosure power allocation and fan policy decide whether inserted hardware can operate at full capacity; spare slots do not establish available watts."
      ],
      [
        "Verify capacity and recovery",
        "Firmware and management coordinate module discovery; two blades in one enclosure do not survive every enclosure-level incident."
      ]
    ],
    "comparison": [
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
    "example": "Case: Two application replicas occupy blades in the same enclosure. Which risk remains? Answer: An enclosure power, midplane or shared management failure. Reason: Replicas are not independent just because compute modules differ. Case: One interconnect is removed. What distinguishes redundancy from usable resilience? Answer: Surviving paths must carry the required load and the service must recover. Reason: A second path can lack capacity or correct policy. Case: A blade has two NICs mapped to one interconnect. Is interconnect diversity present? Answer: No; both adapters share that parent. Reason: Adapter count does not identify failure domains.",
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
    "configuration": "Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
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
      "Mechanical space does not imply service capacity.",
      "A second path can lack capacity or correct policy.",
      "Management privileges can bypass guest OS controls.",
      "Adapter count does not identify failure domains."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g0-t3"
    ],
    "lab": {
      "objective": "Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Blade Servers boundary",
        "Blade → Enclosure → Interconnect",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Draw module and enclosure dependencies before placing replicas. Validate supported interconnect, adapter, firmware and power combinations and retain a tested independent management path before any chassis maintenance.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Blade, Enclosure and Interconnect. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Firmware and management coordinate module discovery; two blades in one enclosure do not survive every enclosure-level incident. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Timestamped path and original-service evidence with exact restore and scoped cleanup. A management success message alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Blade → Enclosure → Interconnect. Matching connector shapes do not guarantee compatibility. Operational convenience may hide correlated risk.",
      "challenge": "A blade has two NICs mapped to one interconnect. Is interconnect diversity present? Explain the needed observer and why capability or inventory alone cannot settle it.",
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
        "questionId": "s6-g0-t2-Q01",
        "topicId": "s6-g0-t2",
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
        "questionId": "s6-g0-t2-Q02",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Empty blade slots are available. Can additional modules be approved from slot count alone?",
        "answer": "No; check power allocation, cooling, licensing and interconnect capacity.",
        "explanation": "Mechanical space does not imply service capacity.",
        "testedConcept": "Empty blade slots are available. Can additional modules be approved from slot count alone?"
      },
      {
        "questionId": "s6-g0-t2-Q03",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A mezzanine NIC is detected but external traffic fails. What mapping must be traced?",
        "answer": "Blade slot and adapter port through the actual interconnect uplink.",
        "explanation": "Discovery does not validate fabric mapping.",
        "testedConcept": "A mezzanine NIC is detected but external traffic fails. What mapping must be traced?"
      },
      {
        "questionId": "s6-g0-t2-Q04",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One interconnect is removed. What distinguishes redundancy from usable resilience?",
        "answer": "Surviving paths must carry the required load and the service must recover.",
        "explanation": "A second path can lack capacity or correct policy.",
        "testedConcept": "One interconnect is removed. What distinguishes redundancy from usable resilience?"
      },
      {
        "questionId": "s6-g0-t2-Q05",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record enclosure firmware before replacing a blade?",
        "answer": "Supported module, interconnect and management combinations may depend on release.",
        "explanation": "Matching connector shapes do not guarantee compatibility.",
        "testedConcept": "Why record enclosure firmware before replacing a blade?"
      },
      {
        "questionId": "s6-g0-t2-Q06",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An enclosure administrator can mount remote media on every blade. What security boundary is affected?",
        "answer": "Privileged access to the whole enclosure workload domain.",
        "explanation": "Management privileges can bypass guest OS controls.",
        "testedConcept": "An enclosure administrator can mount remote media on every blade. What security boundary is affected?"
      },
      {
        "questionId": "s6-g0-t2-Q07",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What placement improves protection from one enclosure outage?",
        "answer": "Replicas across independently powered enclosures with tested dependency paths.",
        "explanation": "Physical distribution needs independent shared parents.",
        "testedConcept": "What placement improves protection from one enclosure outage?"
      },
      {
        "questionId": "s6-g0-t2-Q08",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "A blade has two NICs mapped to one interconnect. Is interconnect diversity present?",
        "answer": "No; both adapters share that parent.",
        "explanation": "Adapter count does not identify failure domains.",
        "testedConcept": "A blade has two NICs mapped to one interconnect. Is interconnect diversity present?"
      },
      {
        "questionId": "s6-g0-t2-Q09",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why compare cable density with fault impact rather than only cable count?",
        "answer": "Fewer cables can concentrate traffic and failures on shared trunks.",
        "explanation": "Operational convenience may hide correlated risk.",
        "testedConcept": "Why compare cable density with fault impact rather than only cable count?"
      },
      {
        "questionId": "s6-g0-t2-Q10",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes a blade failover rehearsal?",
        "answer": "Timestamped path and original-service evidence with exact restore and scoped cleanup.",
        "explanation": "A management success message alone is insufficient.",
        "testedConcept": "What completes a blade failover rehearsal?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t2-QC1",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Empty blade slots are available. Can additional modules be approved from slot count alone?",
        "answer": "No; check power allocation, cooling, licensing and interconnect capacity.",
        "explanation": "Mechanical space does not imply service capacity.",
        "testedConcept": "Empty blade slots are available. Can additional modules be approved from slot count alone?"
      },
      {
        "questionId": "s6-g0-t2-QC2",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record enclosure firmware before replacing a blade?",
        "answer": "Supported module, interconnect and management combinations may depend on release.",
        "explanation": "Matching connector shapes do not guarantee compatibility.",
        "testedConcept": "Why record enclosure firmware before replacing a blade?"
      },
      {
        "questionId": "s6-g0-t2-QC3",
        "topicId": "s6-g0-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why compare cable density with fault impact rather than only cable count?",
        "answer": "Fewer cables can concentrate traffic and failures on shared trunks.",
        "explanation": "Operational convenience may hide correlated risk.",
        "testedConcept": "Why compare cable density with fault impact rather than only cable count?"
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
    "id": "s6-g0-t3",
    "batch": "15",
    "title": "CPU architecture",
    "subtitle": "Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t3",
    "definition": "Server CPU architecture includes instruction-set compatibility, cores, simultaneous multithreading, caches, memory controllers and socket interconnects. A logical processor is a scheduling context; it does not automatically provide a second core worth of execution resources.",
    "purpose": "Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing.",
    "mental": "Instructions pass through caches and execution resources shared to different degrees; stalls can leave runnable work without useful throughput. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Core: Execution resources. Can host multiple logical threads.",
      "Logical CPU: OS scheduling context. May share a core.",
      "Socket: Processor attachment and locality. Can contain several NUMA domains.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Instructions pass through caches and execution resources shared to different degrees; stalls can leave runnable work without useful throughput.",
      "Firmware topology becomes OS sockets, cores and logical processors; virtualization may expose a topology different from the physical host.",
      "Socket-local memory and I/O attachments shape access latency, so placement and frequency under sustained load matter alongside core count."
    ],
    "flow": [
      [
        "Map the original operation",
        "Server CPU architecture includes instruction-set compatibility, cores, simultaneous multithreading, caches, memory controllers and socket interconnects. A logical processor is a scheduling context; it does not automatically provide a second core worth of execution resources."
      ],
      [
        "Trace the first boundary",
        "Instructions pass through caches and execution resources shared to different degrees; stalls can leave runnable work without useful throughput."
      ],
      [
        "Evaluate installed conditions",
        "Firmware topology becomes OS sockets, cores and logical processors; virtualization may expose a topology different from the physical host."
      ],
      [
        "Verify capacity and recovery",
        "Socket-local memory and I/O attachments shape access latency, so placement and frequency under sustained load matter alongside core count."
      ]
    ],
    "comparison": [
      [
        "Core",
        "Execution resources",
        "Can host multiple logical threads."
      ],
      [
        "Logical CPU",
        "OS scheduling context",
        "May share a core."
      ],
      [
        "Socket",
        "Processor attachment and locality",
        "Can contain several NUMA domains."
      ]
    ],
    "example": "Case: A server has 2 sockets, 8 cores per socket and 2 threads per core. How many logical CPUs are exposed if all are enabled? Answer: 32 logical CPUs. Reason: Multiply sockets, physical cores and enabled threads. Case: A VM reports one socket. Does that prove the host has one socket? Answer: No; the hypervisor can present virtual topology. Reason: Observer identity matters for hardware conclusions. Case: What evidence separates CPU saturation from I/O wait? Answer: Runnable queues, scheduling time and transaction/I/O latency. Reason: A utilization aggregate loses stall context.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing.",
        "expected": "Capture observer and timestamp. Same-workload latency/throughput comparison plus regression and exact rollback evidence. A changed CPU mask is intent rather than benefit. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why might a newer 2.5 GHz CPU outperform an older 3 GHz CPU?",
        "Instruction work per cycle, caches, vector support and workload behavior differ. Frequency alone is not a throughput comparison."
      ],
      [
        "What should be checked when a binary faults on an unsupported instruction?",
        "Exposed ISA features and the binary target requirements. A nominal CPU family label may omit feature masking."
      ],
      [
        "Can one processor socket contain multiple NUMA nodes?",
        "Yes on supported architectures and firmware modes. Socket and NUMA node are different abstractions."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Microcode and firmware support, workload isolation and privileged performance tooling require controlled ownership. Masking a CPU feature for compatibility can affect both security controls and application behavior.",
    "performance": "Use throughput and latency with workload concurrency and sustained frequency. GHz, advertised boost and logical-thread count are poor substitutes for measured work per unit time.",
    "mistakes": [
      "SMT contexts share execution resources.",
      "Observer identity matters for hardware conclusions.",
      "More runnable contexts do not guarantee more completed work.",
      "A utilization aggregate loses stall context."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g0-t4"
    ],
    "lab": {
      "objective": "Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → CPU architecture boundary",
        "Core → Logical CPU → Socket",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record architecture, sockets, cores, threads, supported instruction features and topology from the actual observer. Compare a representative workload before changing affinity, power policy or virtual CPU sizing.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Core, Logical CPU and Socket. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Socket-local memory and I/O attachments shape access latency, so placement and frequency under sustained load matter alongside core count. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Same-workload latency/throughput comparison plus regression and exact rollback evidence. A changed CPU mask is intent rather than benefit. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Core → Logical CPU → Socket. A nominal CPU family label may omit feature masking. Socket and NUMA node are different abstractions.",
      "challenge": "What evidence separates CPU saturation from I/O wait? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Core": "Execution resources. Can host multiple logical threads.",
      "Logical CPU": "OS scheduling context. May share a core.",
      "Socket": "Processor attachment and locality. Can contain several NUMA domains."
    },
    "sources": [
      {
        "title": "Linux 6.6 NUMA memory policy",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/mm/numa_memory_policy.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Intel S2600WF memory population rules — platform example",
        "url": "https://www.intel.com/content/www/us/en/support/articles/000055509/server-products/server-boards.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g0-t3-Q01",
        "topicId": "s6-g0-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A server has 2 sockets, 8 cores per socket and 2 threads per core. How many logical CPUs are exposed if all are enabled?",
        "answer": "32 logical CPUs.",
        "explanation": "Multiply sockets, physical cores and enabled threads.",
        "testedConcept": "A server has 2 sockets, 8 cores per socket and 2 threads per core. How many logical CPUs are exposed if all are enabled?",
        "options": [
          "64 logical CPUs, counting two SMT contexts twice.",
          "32 logical CPUs.",
          "16 logical CPUs, counting physical cores only.",
          "8 logical CPUs, ignoring the second socket and SMT."
        ]
      },
      {
        "questionId": "s6-g0-t3-Q02",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 32 logical CPUs mean 32 independent physical cores?",
        "answer": "No; this example has 16 cores.",
        "explanation": "SMT contexts share execution resources.",
        "testedConcept": "Does 32 logical CPUs mean 32 independent physical cores?"
      },
      {
        "questionId": "s6-g0-t3-Q03",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why might a newer 2.5 GHz CPU outperform an older 3 GHz CPU?",
        "answer": "Instruction work per cycle, caches, vector support and workload behavior differ.",
        "explanation": "Frequency alone is not a throughput comparison.",
        "testedConcept": "Why might a newer 2.5 GHz CPU outperform an older 3 GHz CPU?"
      },
      {
        "questionId": "s6-g0-t3-Q04",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A VM reports one socket. Does that prove the host has one socket?",
        "answer": "No; the hypervisor can present virtual topology.",
        "explanation": "Observer identity matters for hardware conclusions.",
        "testedConcept": "A VM reports one socket. Does that prove the host has one socket?"
      },
      {
        "questionId": "s6-g0-t3-Q05",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should be checked when a binary faults on an unsupported instruction?",
        "answer": "Exposed ISA features and the binary target requirements.",
        "explanation": "A nominal CPU family label may omit feature masking.",
        "testedConcept": "What should be checked when a binary faults on an unsupported instruction?"
      },
      {
        "questionId": "s6-g0-t3-Q06",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why can oversized vCPU allocation hurt a latency-sensitive workload?",
        "answer": "Scheduling contention and cross-locality access can increase delay.",
        "explanation": "More runnable contexts do not guarantee more completed work.",
        "testedConcept": "Why can oversized vCPU allocation hurt a latency-sensitive workload?"
      },
      {
        "questionId": "s6-g0-t3-Q07",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "An all-core workload runs below advertised single-core boost. Is failure established?",
        "answer": "No; compare sustained frequency, power and thermal limits under that workload.",
        "explanation": "Boost conditions vary with concurrency.",
        "testedConcept": "An all-core workload runs below advertised single-core boost. Is failure established?"
      },
      {
        "questionId": "s6-g0-t3-Q08",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What evidence separates CPU saturation from I/O wait?",
        "answer": "Runnable queues, scheduling time and transaction/I/O latency.",
        "explanation": "A utilization aggregate loses stall context.",
        "testedConcept": "What evidence separates CPU saturation from I/O wait?"
      },
      {
        "questionId": "s6-g0-t3-Q09",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can one processor socket contain multiple NUMA nodes?",
        "answer": "Yes on supported architectures and firmware modes.",
        "explanation": "Socket and NUMA node are different abstractions.",
        "testedConcept": "Can one processor socket contain multiple NUMA nodes?"
      },
      {
        "questionId": "s6-g0-t3-Q10",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies an affinity change helped?",
        "answer": "Same-workload latency/throughput comparison plus regression and exact rollback evidence.",
        "explanation": "A changed CPU mask is intent rather than benefit.",
        "testedConcept": "What verifies an affinity change helped?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t3-QC1",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does 32 logical CPUs mean 32 independent physical cores?",
        "answer": "No; this example has 16 cores.",
        "explanation": "SMT contexts share execution resources.",
        "testedConcept": "Does 32 logical CPUs mean 32 independent physical cores?"
      },
      {
        "questionId": "s6-g0-t3-QC2",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What should be checked when a binary faults on an unsupported instruction?",
        "answer": "Exposed ISA features and the binary target requirements.",
        "explanation": "A nominal CPU family label may omit feature masking.",
        "testedConcept": "What should be checked when a binary faults on an unsupported instruction?"
      },
      {
        "questionId": "s6-g0-t3-QC3",
        "topicId": "s6-g0-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can one processor socket contain multiple NUMA nodes?",
        "answer": "Yes on supported architectures and firmware modes.",
        "explanation": "Socket and NUMA node are different abstractions.",
        "testedConcept": "Can one processor socket contain multiple NUMA nodes?"
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
    "id": "s6-g0-t4",
    "batch": "15",
    "title": "Memory channels",
    "subtitle": "Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t4",
    "definition": "Memory channels are independent data paths from a processor memory controller to DIMMs. Capacity, populated channels, DIMMs per channel, supported transfer rate and reliability mode are separate dimensions. The slot order and allowed combinations are platform specific.",
    "purpose": "Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence.",
    "mental": "Populate the documented primary slots across channels before assuming a balanced arrangement; channels with no DIMMs contribute no bandwidth. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? 64 useful data bits per transfer; active channels × MT/s × 8 bytes; decimal GB/s theoretical envelope, no ECC payload, controller efficiency or benchmark. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Capacity: Bytes addressable. Not the same as bandwidth.",
      "Channel: Independent data path. Needs supported population.",
      "MT/s: Transfers per second. Not a CPU clock frequency.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Populate the documented primary slots across channels before assuming a balanced arrangement; channels with no DIMMs contribute no bandwidth.",
      "Compute a theoretical data envelope from active channels × transfers per second × data bytes per transfer; exclude ECC bits from useful data width.",
      "More ranks or DIMMs can change supported transfer rate and contention; ECC and spare/mirror modes change capacity or reliability without proving workload speed."
    ],
    "flow": [
      [
        "Map the original operation",
        "Memory channels are independent data paths from a processor memory controller to DIMMs. Capacity, populated channels, DIMMs per channel, supported transfer rate and reliability mode are separate dimensions. The slot order and allowed combinations are platform specific."
      ],
      [
        "Trace the first boundary",
        "Populate the documented primary slots across channels before assuming a balanced arrangement; channels with no DIMMs contribute no bandwidth."
      ],
      [
        "Evaluate installed conditions",
        "Compute a theoretical data envelope from active channels × transfers per second × data bytes per transfer; exclude ECC bits from useful data width."
      ],
      [
        "Verify capacity and recovery",
        "More ranks or DIMMs can change supported transfer rate and contention; ECC and spare/mirror modes change capacity or reliability without proving workload speed."
      ]
    ],
    "comparison": [
      [
        "Capacity",
        "Bytes addressable",
        "Not the same as bandwidth."
      ],
      [
        "Channel",
        "Independent data path",
        "Needs supported population."
      ],
      [
        "MT/s",
        "Transfers per second",
        "Not a CPU clock frequency."
      ]
    ],
    "example": "Case: Four populated 64-bit channels run at 3200 MT/s. What is the theoretical data envelope? Answer: 102.4 decimal GB/s. Reason: Four times 3200 million transfers times eight useful bytes. Case: Does ECC make the worksheet data width 72 useful bits? Answer: No; the worksheet counts 64 data bits and excludes protection bits. Reason: ECC bits are not application payload. Case: Why might twice the DIMMs not double application throughput? Answer: Shared channels, lower transfer rate, access pattern and locality. Reason: Capacity expansion is not a guaranteed bandwidth expansion.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence.",
        "expected": "Capture observer and timestamp. A theoretical useful-data envelope, not a benchmark. Protocol/controller/workload effects are excluded. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why use negotiated rather than label transfer rate?",
        "Population and controller rules may reduce the actual supported rate. A faster DIMM label does not determine the bus rate."
      ],
      [
        "Can an empty channel contribute to the calculated envelope?",
        "No. Only populated supported active channels carry the declared data."
      ],
      [
        "What table should accompany a memory upgrade?",
        "Socket, channel, slot, DIMM attributes and negotiated rate. An aggregate GB total hides imbalance."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Treat memory error telemetry and firmware reliability settings as integrity evidence. Sanitize retired DIMMs through an approved lifecycle process and protect crash dumps that can contain application secrets.",
    "performance": "The worksheet uses 64 data bits per transfer and decimal GB/s. It excludes controller efficiency, rank timing, refresh and application locality; measure sustained performance rather than advertising the sum as an achieved rate.",
    "mistakes": [
      "DIMM count and channel count differ.",
      "ECC bits are not application payload.",
      "Consult the exact hardware guide.",
      "Capacity expansion is not a guaranteed bandwidth expansion."
    ],
    "prerequisites": [
      "s0-g0-t1",
      "s6-g0-t3"
    ],
    "related": [
      "s6-g0-t5"
    ],
    "lab": {
      "objective": "Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Memory channels boundary",
        "Capacity → Channel → MT/s",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Build a per-socket channel/slot table with DIMM type, size, rank, rated and negotiated transfer rate. Use the exact server population guide; the Intel example demonstrates specificity, not a universal slot sequence.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Capacity, Channel and MT/s. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. More ranks or DIMMs can change supported transfer rate and contention; ECC and spare/mirror modes change capacity or reliability without proving workload speed. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "A theoretical useful-data envelope, not a benchmark. Protocol/controller/workload effects are excluded. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Capacity → Channel → MT/s. Only populated supported active channels carry the declared data. An aggregate GB total hides imbalance.",
      "challenge": "Why might twice the DIMMs not double application throughput? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Capacity": "Bytes addressable. Not the same as bandwidth.",
      "Channel": "Independent data path. Needs supported population.",
      "MT/s": "Transfers per second. Not a CPU clock frequency."
    },
    "sources": [
      {
        "title": "Intel S2600WF memory population rules — platform example",
        "url": "https://www.intel.com/content/www/us/en/support/articles/000055509/server-products/server-boards.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux 6.6 NUMA memory policy",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/mm/numa_memory_policy.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g0-t4-Q01",
        "topicId": "s6-g0-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Four populated 64-bit channels run at 3200 MT/s. What is the theoretical data envelope?",
        "answer": "102.4 decimal GB/s.",
        "explanation": "Four times 3200 million transfers times eight useful bytes.",
        "testedConcept": "Four populated 64-bit channels run at 3200 MT/s. What is the theoretical data envelope?",
        "options": [
          "102.4 decimal GB/s.",
          "12.8 decimal GB/s, treating each transfer as one bit.",
          "25.6 decimal GB/s, counting only one channel.",
          "115.2 decimal GB/s, treating ECC bits as useful payload."
        ]
      },
      {
        "questionId": "s6-g0-t4-Q02",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two 32 GB DIMMs populate one channel. Does that create two channels?",
        "answer": "No; they share the one channel data path.",
        "explanation": "DIMM count and channel count differ.",
        "testedConcept": "Two 32 GB DIMMs populate one channel. Does that create two channels?"
      },
      {
        "questionId": "s6-g0-t4-Q03",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why use negotiated rather than label transfer rate?",
        "answer": "Population and controller rules may reduce the actual supported rate.",
        "explanation": "A faster DIMM label does not determine the bus rate.",
        "testedConcept": "Why use negotiated rather than label transfer rate?"
      },
      {
        "questionId": "s6-g0-t4-Q04",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does ECC make the worksheet data width 72 useful bits?",
        "answer": "No; the worksheet counts 64 data bits and excludes protection bits.",
        "explanation": "ECC bits are not application payload.",
        "testedConcept": "Does ECC make the worksheet data width 72 useful bits?"
      },
      {
        "questionId": "s6-g0-t4-Q05",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an empty channel contribute to the calculated envelope?",
        "answer": "No.",
        "explanation": "Only populated supported active channels carry the declared data.",
        "testedConcept": "Can an empty channel contribute to the calculated envelope?"
      },
      {
        "questionId": "s6-g0-t4-Q06",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is wrong with a universal rule to fill slot A1 first on every server?",
        "answer": "Slot identifiers and population orders are model specific.",
        "explanation": "Consult the exact hardware guide.",
        "testedConcept": "What is wrong with a universal rule to fill slot A1 first on every server?"
      },
      {
        "questionId": "s6-g0-t4-Q07",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What changes when a reliability mode reserves or mirrors memory?",
        "answer": "Usable capacity and sometimes performance behavior.",
        "explanation": "Installed bytes do not necessarily equal usable bytes.",
        "testedConcept": "What changes when a reliability mode reserves or mirrors memory?"
      },
      {
        "questionId": "s6-g0-t4-Q08",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why might twice the DIMMs not double application throughput?",
        "answer": "Shared channels, lower transfer rate, access pattern and locality.",
        "explanation": "Capacity expansion is not a guaranteed bandwidth expansion.",
        "testedConcept": "Why might twice the DIMMs not double application throughput?"
      },
      {
        "questionId": "s6-g0-t4-Q09",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What table should accompany a memory upgrade?",
        "answer": "Socket, channel, slot, DIMM attributes and negotiated rate.",
        "explanation": "An aggregate GB total hides imbalance.",
        "testedConcept": "What table should accompany a memory upgrade?"
      },
      {
        "questionId": "s6-g0-t4-Q10",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How should the 102.4 GB/s result be described?",
        "answer": "A theoretical useful-data envelope, not a benchmark.",
        "explanation": "Protocol/controller/workload effects are excluded.",
        "testedConcept": "How should the 102.4 GB/s result be described?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t4-QC1",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two 32 GB DIMMs populate one channel. Does that create two channels?",
        "answer": "No; they share the one channel data path.",
        "explanation": "DIMM count and channel count differ.",
        "testedConcept": "Two 32 GB DIMMs populate one channel. Does that create two channels?"
      },
      {
        "questionId": "s6-g0-t4-QC2",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an empty channel contribute to the calculated envelope?",
        "answer": "No.",
        "explanation": "Only populated supported active channels carry the declared data.",
        "testedConcept": "Can an empty channel contribute to the calculated envelope?"
      },
      {
        "questionId": "s6-g0-t4-QC3",
        "topicId": "s6-g0-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What table should accompany a memory upgrade?",
        "answer": "Socket, channel, slot, DIMM attributes and negotiated rate.",
        "explanation": "An aggregate GB total hides imbalance.",
        "testedConcept": "What table should accompany a memory upgrade?"
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
    "id": "s6-g0-t5",
    "batch": "15",
    "title": "NUMA",
    "subtitle": "Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t5",
    "definition": "Non-uniform memory access describes systems where access cost depends on the relationship between an executing CPU and the memory node holding data. Local allocation, CPU placement, allowed-node policy and device locality must be considered together; NUMA node identity is not necessarily socket identity.",
    "purpose": "Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery.",
    "mental": "The scheduler selects an execution CPU while allocation policy and first touch influence page placement; moving a thread does not automatically move its pages. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Weighted mean of supplied local/remote access costs and fraction; no page placement, migration, caches, queueing or workload simulation. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Execution node: CPU locality. Thread placement can change.",
      "Memory node: Page locality. May differ from execution.",
      "Allocation policy: Allowed/preferred placement. Subject to availability and OS semantics.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The scheduler selects an execution CPU while allocation policy and first touch influence page placement; moving a thread does not automatically move its pages.",
      "Remote access traverses an interconnect and can add latency and consume shared bandwidth; local capacity shortages or policies can cause fallback.",
      "Device interrupts and DMA buffers also have locality, so a workload may pay for remote memory even when its CPU utilization looks balanced."
    ],
    "flow": [
      [
        "Map the original operation",
        "Non-uniform memory access describes systems where access cost depends on the relationship between an executing CPU and the memory node holding data. Local allocation, CPU placement, allowed-node policy and device locality must be considered together; NUMA node identity is not necessarily socket identity."
      ],
      [
        "Trace the first boundary",
        "The scheduler selects an execution CPU while allocation policy and first touch influence page placement; moving a thread does not automatically move its pages."
      ],
      [
        "Evaluate installed conditions",
        "Remote access traverses an interconnect and can add latency and consume shared bandwidth; local capacity shortages or policies can cause fallback."
      ],
      [
        "Verify capacity and recovery",
        "Device interrupts and DMA buffers also have locality, so a workload may pay for remote memory even when its CPU utilization looks balanced."
      ]
    ],
    "comparison": [
      [
        "Execution node",
        "CPU locality",
        "Thread placement can change."
      ],
      [
        "Memory node",
        "Page locality",
        "May differ from execution."
      ],
      [
        "Allocation policy",
        "Allowed/preferred placement",
        "Subject to availability and OS semantics."
      ]
    ],
    "example": "Case: Local latency is 80 ns, remote is 140 ns and 25% of declared accesses are remote. What is the weighted mean? Answer: 95 ns. Reason: 0.75 times 80 plus 0.25 times 140. Case: Why record cpuset restrictions alongside NUMA policy? Answer: Administrative allowed-node boundaries can constrain allocation. Reason: Policy operates within permitted resources. Case: Why can strict placement hurt a workload? Answer: Capacity pressure or reduced scheduling flexibility can offset locality benefits. Reason: Locality tuning needs workload evidence.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery.",
        "expected": "Capture observer and timestamp. Original policy/affinity plus the original workload and allocation observations. A mask restored in configuration may not move existing pages. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Can a process with local preference allocate remotely?",
        "Yes when policy semantics and local availability allow fallback. Preference is not an unconditional reservation."
      ],
      [
        "A NIC attaches near node 0 but workers run on node 1. What cost should be investigated?",
        "Remote DMA-buffer and interrupt/processing locality. Device paths participate in NUMA behavior."
      ],
      [
        "Can the weighted mean establish application p99 latency?",
        "No. Averages exclude distributions, queueing and overlap."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Avoid granting unrestricted affinity or memory policy tooling to untrusted users. Core/node placement is not a complete isolation control; review shared caches, memory ownership and virtualization boundaries.",
    "performance": "The arithmetic worksheet uses supplied local/remote latencies and access fraction. Its weighted mean is not a measured response time: queueing, caches, parallel accesses and migration are excluded.",
    "mistakes": [
      "Scheduling placement and page allocation are separate mechanisms.",
      "Policy operates within permitted resources.",
      "Firmware and processor designs can expose several nodes per socket.",
      "Locality tuning needs workload evidence."
    ],
    "prerequisites": [
      "s6-g0-t4"
    ],
    "related": [
      "s6-g0-t6"
    ],
    "lab": {
      "objective": "Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → NUMA boundary",
        "Execution node → Memory node → Allocation policy",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record CPU-to-node topology and the workload allowed/allocated nodes from the actual OS or hypervisor. Compare representative latency before changing placement and retain the old affinity/policy for exact recovery.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Execution node, Memory node and Allocation policy. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Device interrupts and DMA buffers also have locality, so a workload may pay for remote memory even when its CPU utilization looks balanced. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Original policy/affinity plus the original workload and allocation observations. A mask restored in configuration may not move existing pages. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Execution node → Memory node → Allocation policy. Device paths participate in NUMA behavior. Averages exclude distributions, queueing and overlap.",
      "challenge": "Why can strict placement hurt a workload? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Execution node": "CPU locality. Thread placement can change.",
      "Memory node": "Page locality. May differ from execution.",
      "Allocation policy": "Allowed/preferred placement. Subject to availability and OS semantics."
    },
    "sources": [
      {
        "title": "Linux 6.6 NUMA memory policy",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/mm/numa_memory_policy.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g0-t5-Q01",
        "topicId": "s6-g0-t5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Local latency is 80 ns, remote is 140 ns and 25% of declared accesses are remote. What is the weighted mean?",
        "answer": "95 ns.",
        "explanation": "0.75 times 80 plus 0.25 times 140.",
        "testedConcept": "Local latency is 80 ns, remote is 140 ns and 25% of declared accesses are remote. What is the weighted mean?",
        "options": [
          "80 ns, because execution is local.",
          "110 ns, taking an unweighted mean.",
          "140 ns, because any remote access makes every access remote.",
          "95 ns."
        ]
      },
      {
        "questionId": "s6-g0-t5-Q02",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does moving a thread to another CPU necessarily move its existing memory pages?",
        "answer": "No.",
        "explanation": "Scheduling placement and page allocation are separate mechanisms.",
        "testedConcept": "Does moving a thread to another CPU necessarily move its existing memory pages?"
      },
      {
        "questionId": "s6-g0-t5-Q03",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a process with local preference allocate remotely?",
        "answer": "Yes when policy semantics and local availability allow fallback.",
        "explanation": "Preference is not an unconditional reservation.",
        "testedConcept": "Can a process with local preference allocate remotely?"
      },
      {
        "questionId": "s6-g0-t5-Q04",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record cpuset restrictions alongside NUMA policy?",
        "answer": "Administrative allowed-node boundaries can constrain allocation.",
        "explanation": "Policy operates within permitted resources.",
        "testedConcept": "Why record cpuset restrictions alongside NUMA policy?"
      },
      {
        "questionId": "s6-g0-t5-Q05",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A NIC attaches near node 0 but workers run on node 1. What cost should be investigated?",
        "answer": "Remote DMA-buffer and interrupt/processing locality.",
        "explanation": "Device paths participate in NUMA behavior.",
        "testedConcept": "A NIC attaches near node 0 but workers run on node 1. What cost should be investigated?"
      },
      {
        "questionId": "s6-g0-t5-Q06",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a NUMA node always equal a processor socket?",
        "answer": "No.",
        "explanation": "Firmware and processor designs can expose several nodes per socket.",
        "testedConcept": "Does a NUMA node always equal a processor socket?"
      },
      {
        "questionId": "s6-g0-t5-Q07",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does first touch help explain?",
        "answer": "Page allocation may follow the node of the task that first faults a page under the applicable policy.",
        "explanation": "Later worker placement may differ from initialization placement.",
        "testedConcept": "What does first touch help explain?"
      },
      {
        "questionId": "s6-g0-t5-Q08",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why can strict placement hurt a workload?",
        "answer": "Capacity pressure or reduced scheduling flexibility can offset locality benefits.",
        "explanation": "Locality tuning needs workload evidence.",
        "testedConcept": "Why can strict placement hurt a workload?"
      },
      {
        "questionId": "s6-g0-t5-Q09",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can the weighted mean establish application p99 latency?",
        "answer": "No.",
        "explanation": "Averages exclude distributions, queueing and overlap.",
        "testedConcept": "Can the weighted mean establish application p99 latency?"
      },
      {
        "questionId": "s6-g0-t5-Q10",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a NUMA policy rollback?",
        "answer": "Original policy/affinity plus the original workload and allocation observations.",
        "explanation": "A mask restored in configuration may not move existing pages.",
        "testedConcept": "What verifies a NUMA policy rollback?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t5-QC1",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does moving a thread to another CPU necessarily move its existing memory pages?",
        "answer": "No.",
        "explanation": "Scheduling placement and page allocation are separate mechanisms.",
        "testedConcept": "Does moving a thread to another CPU necessarily move its existing memory pages?"
      },
      {
        "questionId": "s6-g0-t5-QC2",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A NIC attaches near node 0 but workers run on node 1. What cost should be investigated?",
        "answer": "Remote DMA-buffer and interrupt/processing locality.",
        "explanation": "Device paths participate in NUMA behavior.",
        "testedConcept": "A NIC attaches near node 0 but workers run on node 1. What cost should be investigated?"
      },
      {
        "questionId": "s6-g0-t5-QC3",
        "topicId": "s6-g0-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can the weighted mean establish application p99 latency?",
        "answer": "No.",
        "explanation": "Averages exclude distributions, queueing and overlap.",
        "testedConcept": "Can the weighted mean establish application p99 latency?"
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
    "id": "s6-g0-t6",
    "batch": "15",
    "title": "NIC",
    "subtitle": "Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t6",
    "definition": "A server NIC bridges host memory/driver queues and a network link. Port speed, PCIe attachment, queue distribution, DMA locality and actual protocol overhead jointly constrain service. Multiple ports do not inherently provide path diversity or one-flow aggregation.",
    "purpose": "Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service.",
    "mental": "The driver posts descriptors and buffers; the adapter exchanges data using DMA and signals completion through interrupts or polling. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Ethernet rate: Network link envelope. Not host-side capacity.",
      "PCIe width: Negotiated lane count. May be lower than slot size.",
      "Queue locality: Processing placement. Can affect CPU and memory costs.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The driver posts descriptors and buffers; the adapter exchanges data using DMA and signals completion through interrupts or polling.",
      "A negotiated PCIe generation and lane width bound host-side transfers independently of Ethernet link rate.",
      "Queue placement, RSS and offloads influence CPU cost and locality; bonding behavior and switch attachment determine failure and traffic distribution."
    ],
    "flow": [
      [
        "Map the original operation",
        "A server NIC bridges host memory/driver queues and a network link. Port speed, PCIe attachment, queue distribution, DMA locality and actual protocol overhead jointly constrain service. Multiple ports do not inherently provide path diversity or one-flow aggregation."
      ],
      [
        "Trace the first boundary",
        "The driver posts descriptors and buffers; the adapter exchanges data using DMA and signals completion through interrupts or polling."
      ],
      [
        "Evaluate installed conditions",
        "A negotiated PCIe generation and lane width bound host-side transfers independently of Ethernet link rate."
      ],
      [
        "Verify capacity and recovery",
        "Queue placement, RSS and offloads influence CPU cost and locality; bonding behavior and switch attachment determine failure and traffic distribution."
      ]
    ],
    "comparison": [
      [
        "Ethernet rate",
        "Network link envelope",
        "Not host-side capacity."
      ],
      [
        "PCIe width",
        "Negotiated lane count",
        "May be lower than slot size."
      ],
      [
        "Queue locality",
        "Processing placement",
        "Can affect CPU and memory costs."
      ]
    ],
    "example": "Case: A Gen3 x4 NIC carries two nominal 25 Gb/s ports. Is its host-side encoded envelope 50 Gb/s? Answer: No; it is about 31.51 Gb/s per direction before transaction overhead. Reason: Network labels can exceed host attachment capacity. Case: Two NIC ports connect to one switch. What failure domain remains? Answer: That shared switch and its upstream power/control dependencies. Reason: Port duplication does not diversify parents. Case: Why compare driver and firmware versions together? Answer: Supported combinations and defects affect behavior. Reason: An installed version alone does not certify compatibility.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service.",
        "expected": "Capture observer and timestamp. Restored attachment/settings and original service plus prohibited-path checks. A link LED alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why might a single flow use only one bonded member?",
        "Hash-based distribution often selects one member per flow. Aggregate link rate is not a one-flow promise."
      ],
      [
        "What does an interrupt counter prove?",
        "Interrupt events at that observer, not completed application work. Offloads or polling can change the relationship."
      ],
      [
        "What remains unmeasured after the PCIe calculation?",
        "Transaction overhead, queues, CPU cost and end-to-end throughput. The result is an upper envelope."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Protect firmware provenance and DMA isolation where supported. Do not assume an offload or virtual function inherits every host policy; document ownership and attachment constraints.",
    "performance": "The worksheet uses PCIe Gen3/4/5 encoded-bit envelope per direction and supplied demand. It excludes PCIe transaction and Ethernet overhead, queue limits, CPU work and actual traffic throughput.",
    "mistakes": [
      "Slot size and negotiated lanes differ.",
      "Port duplication does not diversify parents.",
      "The host path includes memory placement.",
      "An installed version alone does not certify compatibility."
    ],
    "prerequisites": [
      "s0-g0-t3"
    ],
    "related": [
      "s6-g0-t7"
    ],
    "lab": {
      "objective": "Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → NIC boundary",
        "Ethernet rate → PCIe width → Queue locality",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Map each NIC port to PCIe slot, negotiated width, driver, firmware, switch port and failure domain. Compare intended host-to-network demand with both link and PCIe envelopes, then verify a representative original service.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Ethernet rate, PCIe width and Queue locality. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Queue placement, RSS and offloads influence CPU cost and locality; bonding behavior and switch attachment determine failure and traffic distribution. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Restored attachment/settings and original service plus prohibited-path checks. A link LED alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Ethernet rate → PCIe width → Queue locality. Offloads or polling can change the relationship. The result is an upper envelope.",
      "challenge": "Why compare driver and firmware versions together? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Ethernet rate": "Network link envelope. Not host-side capacity.",
      "PCIe width": "Negotiated lane count. May be lower than slot size.",
      "Queue locality": "Processing placement. Can affect CPU and memory costs."
    },
    "sources": [
      {
        "title": "PCI-SIG PCIe 3.0 encoding FAQ",
        "url": "https://pcisig.com/faq?field_category_value%5B%5D=pci_express_3.0",
        "checked": "2026-10-09"
      },
      {
        "title": "PCI-SIG Gen4/5 lane signaling rates",
        "url": "https://pcisig.com/blog/pushing-limits-understanding-lane-margining-pcie%C2%AE",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux 6.6 NUMA memory policy",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/mm/numa_memory_policy.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g0-t6-Q01",
        "topicId": "s6-g0-t6",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A Gen3 x4 NIC carries two nominal 25 Gb/s ports. Is its host-side encoded envelope 50 Gb/s?",
        "answer": "No; it is about 31.51 Gb/s per direction before transaction overhead.",
        "explanation": "Network labels can exceed host attachment capacity.",
        "testedConcept": "A Gen3 x4 NIC carries two nominal 25 Gb/s ports. Is its host-side encoded envelope 50 Gb/s?",
        "options": [
          "No; PCIe x4 means exactly 4 Gb/s.",
          "Yes; add PCIe transmit and receive to serve one direction.",
          "No; it is about 31.51 Gb/s per direction before transaction overhead.",
          "Yes; the two 25 Gb/s port labels prove the host envelope."
        ]
      },
      {
        "questionId": "s6-g0-t6-Q02",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a physical x16 slot prove x16 electrical attachment?",
        "answer": "No.",
        "explanation": "Slot size and negotiated lanes differ.",
        "testedConcept": "Does a physical x16 slot prove x16 electrical attachment?"
      },
      {
        "questionId": "s6-g0-t6-Q03",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why might a single flow use only one bonded member?",
        "answer": "Hash-based distribution often selects one member per flow.",
        "explanation": "Aggregate link rate is not a one-flow promise.",
        "testedConcept": "Why might a single flow use only one bonded member?"
      },
      {
        "questionId": "s6-g0-t6-Q04",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two NIC ports connect to one switch. What failure domain remains?",
        "answer": "That shared switch and its upstream power/control dependencies.",
        "explanation": "Port duplication does not diversify parents.",
        "testedConcept": "Two NIC ports connect to one switch. What failure domain remains?"
      },
      {
        "questionId": "s6-g0-t6-Q05",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does an interrupt counter prove?",
        "answer": "Interrupt events at that observer, not completed application work.",
        "explanation": "Offloads or polling can change the relationship.",
        "testedConcept": "What does an interrupt counter prove?"
      },
      {
        "questionId": "s6-g0-t6-Q06",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why inspect NUMA locality for a high-rate NIC?",
        "answer": "Remote buffer and worker access can constrain processing.",
        "explanation": "The host path includes memory placement.",
        "testedConcept": "Why inspect NUMA locality for a high-rate NIC?"
      },
      {
        "questionId": "s6-g0-t6-Q07",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "A virtual function bypasses a host bridge policy. What should be reviewed?",
        "answer": "Actual enforcement location and the VF attachment security contract.",
        "explanation": "A host policy name does not prove consumption.",
        "testedConcept": "A virtual function bypasses a host bridge policy. What should be reviewed?"
      },
      {
        "questionId": "s6-g0-t6-Q08",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why compare driver and firmware versions together?",
        "answer": "Supported combinations and defects affect behavior.",
        "explanation": "An installed version alone does not certify compatibility.",
        "testedConcept": "Why compare driver and firmware versions together?"
      },
      {
        "questionId": "s6-g0-t6-Q09",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What remains unmeasured after the PCIe calculation?",
        "answer": "Transaction overhead, queues, CPU cost and end-to-end throughput.",
        "explanation": "The result is an upper envelope.",
        "testedConcept": "What remains unmeasured after the PCIe calculation?"
      },
      {
        "questionId": "s6-g0-t6-Q10",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes a NIC recovery rehearsal?",
        "answer": "Restored attachment/settings and original service plus prohibited-path checks.",
        "explanation": "A link LED alone is insufficient.",
        "testedConcept": "What completes a NIC recovery rehearsal?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t6-QC1",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a physical x16 slot prove x16 electrical attachment?",
        "answer": "No.",
        "explanation": "Slot size and negotiated lanes differ.",
        "testedConcept": "Does a physical x16 slot prove x16 electrical attachment?"
      },
      {
        "questionId": "s6-g0-t6-QC2",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does an interrupt counter prove?",
        "answer": "Interrupt events at that observer, not completed application work.",
        "explanation": "Offloads or polling can change the relationship.",
        "testedConcept": "What does an interrupt counter prove?"
      },
      {
        "questionId": "s6-g0-t6-QC3",
        "topicId": "s6-g0-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What remains unmeasured after the PCIe calculation?",
        "answer": "Transaction overhead, queues, CPU cost and end-to-end throughput.",
        "explanation": "The result is an upper envelope.",
        "testedConcept": "What remains unmeasured after the PCIe calculation?"
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
    "id": "s6-g0-t7",
    "batch": "15",
    "title": "HBA",
    "subtitle": "Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t7",
    "definition": "A host bus adapter connects host I/O to a storage transport such as SAS or Fibre Channel. HBA identity and topology differ from a RAID controller exposing virtual disks. An adapter, an available target and authorized storage access are distinct boundaries.",
    "purpose": "Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller.",
    "mental": "Host driver submits I/O through queues and DMA; the adapter maps requests to its transport and attached targets. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "HBA: Transport adapter. May expose individual devices.",
      "RAID controller: Array mapping engine. Can expose logical volumes.",
      "Multipath: Multiple paths to one target. Needs path identity and policy.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Host driver submits I/O through queues and DMA; the adapter maps requests to its transport and attached targets.",
      "Target discovery follows actual cabling and transport rules; SAS addressing and FC WWPN/zoning are not interchangeable concepts.",
      "Pass-through or RAID mode changes which identity and metadata the OS sees, while multipath requires distinct end-to-end usable paths."
    ],
    "flow": [
      [
        "Map the original operation",
        "A host bus adapter connects host I/O to a storage transport such as SAS or Fibre Channel. HBA identity and topology differ from a RAID controller exposing virtual disks. An adapter, an available target and authorized storage access are distinct boundaries."
      ],
      [
        "Trace the first boundary",
        "Host driver submits I/O through queues and DMA; the adapter maps requests to its transport and attached targets."
      ],
      [
        "Evaluate installed conditions",
        "Target discovery follows actual cabling and transport rules; SAS addressing and FC WWPN/zoning are not interchangeable concepts."
      ],
      [
        "Verify capacity and recovery",
        "Pass-through or RAID mode changes which identity and metadata the OS sees, while multipath requires distinct end-to-end usable paths."
      ]
    ],
    "comparison": [
      [
        "HBA",
        "Transport adapter",
        "May expose individual devices."
      ],
      [
        "RAID controller",
        "Array mapping engine",
        "Can expose logical volumes."
      ],
      [
        "Multipath",
        "Multiple paths to one target",
        "Needs path identity and policy."
      ]
    ],
    "example": "Case: An HBA discovers a target. Does that establish application read permission? Answer: No. Reason: Transport discovery is separate from storage and application authorization. Case: What identifies a Fibre Channel adapter port for zoning? Answer: Its WWPN in the intended fabric context. Reason: SAS addressing is a different transport mechanism. Case: Can multipathing guarantee twice the target throughput? Answer: No. Reason: Path policy and shared target resources may limit throughput.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lsblk -o NAME,TYPE,SIZE",
        "explanation": "Observe only the fields reported by this exact command. Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller.",
        "expected": "Capture observer and timestamp. The original target identity, usable paths and original application I/O. An adapter health flag alone is not enough. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Do two cables through one expander remove expander risk?",
        "No. The expander remains a shared parent."
      ],
      [
        "Does an HBA always perform hardware RAID?",
        "No. Transport adaptation and array mapping are different roles."
      ],
      [
        "What additional link can constrain a fast HBA?",
        "The negotiated host PCIe attachment. Transport speed alone misses host-side constraints."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Storage authorization belongs at actual target/fabric boundaries and management roles. Discovery of a disk does not grant permission to overwrite it; avoid exporting WWPN-to-tenant mappings casually.",
    "performance": "Queue depth, negotiated transport, PCIe width and shared expanders bound work. More paths can improve resilience without doubling performance, and a target can remain the common bottleneck.",
    "mistakes": [
      "A matching adapter can still change the OS view.",
      "SAS addressing is a different transport mechanism.",
      "Wrong-slot removal can turn a degraded array into data loss.",
      "Path policy and shared target resources may limit throughput."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g0-t8"
    ],
    "lab": {
      "objective": "Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → HBA boundary",
        "HBA → RAID controller → Multipath",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record HBA mode, firmware, target identity, slot/cable path and logical-to-physical mapping without creating or importing arrays. Preserve data ownership and the supported recovery method before changing a controller.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using HBA, RAID controller and Multipath. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Pass-through or RAID mode changes which identity and metadata the OS sees, while multipath requires distinct end-to-end usable paths. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "The original target identity, usable paths and original application I/O. An adapter health flag alone is not enough. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "HBA → RAID controller → Multipath. Transport adaptation and array mapping are different roles. Transport speed alone misses host-side constraints.",
      "challenge": "Can multipathing guarantee twice the target throughput? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "HBA": "Transport adapter. May expose individual devices.",
      "RAID controller": "Array mapping engine. Can expose logical volumes.",
      "Multipath": "Multiple paths to one target. Needs path identity and policy."
    },
    "sources": [
      {
        "title": "Seagate SAS interface manual — historical protocol reference",
        "url": "https://www.seagate.com/staticfiles/support/disc/manuals/Interface%20manuals/100293071c.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g0-t7-Q01",
        "topicId": "s6-g0-t7",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An HBA discovers a target. Does that establish application read permission?",
        "answer": "No.",
        "explanation": "Transport discovery is separate from storage and application authorization.",
        "testedConcept": "An HBA discovers a target. Does that establish application read permission?",
        "options": [
          "Yes if the target identifier is visible in inventory.",
          "No.",
          "Yes; target discovery grants application access automatically.",
          "Yes if the adapter has two ports, regardless of policy."
        ]
      },
      {
        "questionId": "s6-g0-t7-Q02",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record controller mode before replacing an adapter?",
        "answer": "RAID and pass-through modes expose different device identities and metadata paths.",
        "explanation": "A matching adapter can still change the OS view.",
        "testedConcept": "Why record controller mode before replacing an adapter?"
      },
      {
        "questionId": "s6-g0-t7-Q03",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Do two cables through one expander remove expander risk?",
        "answer": "No.",
        "explanation": "The expander remains a shared parent.",
        "testedConcept": "Do two cables through one expander remove expander risk?"
      },
      {
        "questionId": "s6-g0-t7-Q04",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What identifies a Fibre Channel adapter port for zoning?",
        "answer": "Its WWPN in the intended fabric context.",
        "explanation": "SAS addressing is a different transport mechanism.",
        "testedConcept": "What identifies a Fibre Channel adapter port for zoning?"
      },
      {
        "questionId": "s6-g0-t7-Q05",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an HBA always perform hardware RAID?",
        "answer": "No.",
        "explanation": "Transport adaptation and array mapping are different roles.",
        "testedConcept": "Does an HBA always perform hardware RAID?"
      },
      {
        "questionId": "s6-g0-t7-Q06",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why map a logical disk to physical slot before maintenance?",
        "answer": "OS names can change and do not reliably name the bay.",
        "explanation": "Wrong-slot removal can turn a degraded array into data loss.",
        "testedConcept": "Why map a logical disk to physical slot before maintenance?"
      },
      {
        "questionId": "s6-g0-t7-Q07",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be checked before exposing a disk directly to an OS?",
        "answer": "Ownership, supported mode, metadata and intended read-only discovery procedure.",
        "explanation": "Visibility does not authorize initialization.",
        "testedConcept": "What should be checked before exposing a disk directly to an OS?"
      },
      {
        "questionId": "s6-g0-t7-Q08",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can multipathing guarantee twice the target throughput?",
        "answer": "No.",
        "explanation": "Path policy and shared target resources may limit throughput.",
        "testedConcept": "Can multipathing guarantee twice the target throughput?"
      },
      {
        "questionId": "s6-g0-t7-Q09",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What additional link can constrain a fast HBA?",
        "answer": "The negotiated host PCIe attachment.",
        "explanation": "Transport speed alone misses host-side constraints.",
        "testedConcept": "What additional link can constrain a fast HBA?"
      },
      {
        "questionId": "s6-g0-t7-Q10",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is sufficient recovery evidence after a path repair?",
        "answer": "The original target identity, usable paths and original application I/O.",
        "explanation": "An adapter health flag alone is not enough.",
        "testedConcept": "What is sufficient recovery evidence after a path repair?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t7-QC1",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record controller mode before replacing an adapter?",
        "answer": "RAID and pass-through modes expose different device identities and metadata paths.",
        "explanation": "A matching adapter can still change the OS view.",
        "testedConcept": "Why record controller mode before replacing an adapter?"
      },
      {
        "questionId": "s6-g0-t7-QC2",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an HBA always perform hardware RAID?",
        "answer": "No.",
        "explanation": "Transport adaptation and array mapping are different roles.",
        "testedConcept": "Does an HBA always perform hardware RAID?"
      },
      {
        "questionId": "s6-g0-t7-QC3",
        "topicId": "s6-g0-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What additional link can constrain a fast HBA?",
        "answer": "The negotiated host PCIe attachment.",
        "explanation": "Transport speed alone misses host-side constraints.",
        "testedConcept": "What additional link can constrain a fast HBA?"
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
    "id": "s6-g0-t8",
    "batch": "15",
    "title": "PCIe",
    "subtitle": "Record the negotiated endpoint and every shared upstream attachment.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g0-t8",
    "definition": "PCI Express is a point-to-point host interconnect negotiated by generation and lane width. Each lane supports simultaneous directions, but a one-direction workload must be compared to the one-direction envelope rather than a marketing total that sums both directions.",
    "purpose": "Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings.",
    "mental": "Root complex and device train a link at a mutually supported generation and electrical width; a larger mechanical connector can carry fewer lanes. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "GT/s: Lane transfers per second. Different from useful bytes per second.",
      "Lanes: Negotiated parallel links. Electrical width matters.",
      "Payload throughput: Completed useful data. Lower than raw encoding envelope.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Root complex and device train a link at a mutually supported generation and electrical width; a larger mechanical connector can carry fewer lanes.",
      "For Gen3/4/5 the worksheet applies 128b/130b encoding to 8/16/32 GT/s per lane; transaction, flow-control and software overhead remain excluded.",
      "Switches, shared upstream lanes, bifurcation and CPU attachment create additional capacity and locality boundaries beyond the endpoint slot."
    ],
    "flow": [
      [
        "Map the original operation",
        "PCI Express is a point-to-point host interconnect negotiated by generation and lane width. Each lane supports simultaneous directions, but a one-direction workload must be compared to the one-direction envelope rather than a marketing total that sums both directions."
      ],
      [
        "Trace the first boundary",
        "Root complex and device train a link at a mutually supported generation and electrical width; a larger mechanical connector can carry fewer lanes."
      ],
      [
        "Evaluate installed conditions",
        "For Gen3/4/5 the worksheet applies 128b/130b encoding to 8/16/32 GT/s per lane; transaction, flow-control and software overhead remain excluded."
      ],
      [
        "Verify capacity and recovery",
        "Switches, shared upstream lanes, bifurcation and CPU attachment create additional capacity and locality boundaries beyond the endpoint slot."
      ]
    ],
    "comparison": [
      [
        "GT/s",
        "Lane transfers per second",
        "Different from useful bytes per second."
      ],
      [
        "Lanes",
        "Negotiated parallel links",
        "Electrical width matters."
      ],
      [
        "Payload throughput",
        "Completed useful data",
        "Lower than raw encoding envelope."
      ]
    ],
    "example": "Case: What is the Gen3 x4 encoded envelope per direction? Answer: About 31.51 Gb/s or 3.94 decimal GB/s. Reason: Four times 8 times 128 divided by 130; bytes divide by eight. Case: Does x16 printed beside a connector guarantee sixteen active lanes? Answer: No. Reason: Mechanical and electrical dimensions can differ. Case: What does bifurcation change? Answer: How a supported lane group is split among endpoints. Reason: It requires platform and device support.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lscpu",
        "explanation": "Observe only the fields reported by this exact command. Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings.",
        "expected": "Capture observer and timestamp. Negotiated topology plus same-workload measurements and exact recovery record. An increased width does not alone prove application benefit. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A Gen4 card negotiates Gen3 x8. Which parameters belong in the calculation?",
        "Gen3 and eight lanes. Negotiated attachment governs the envelope."
      ],
      [
        "What bounds several devices behind a PCIe switch?",
        "Their shared upstream link as well as each endpoint link. Independent endpoint calculations miss aggregation."
      ],
      [
        "Why inspect attachment locality after moving a card?",
        "CPU/NUMA proximity and isolation grouping may change. An empty slot is not necessarily an equivalent path."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Use supported firmware and DMA protection policy. Moving an adapter can change isolation groups and device identity; treat the new attachment as a reviewed boundary rather than an equivalent empty slot.",
    "performance": "The worksheet intentionally excludes Gen6 FLIT/PAM4/FEC semantics. Its Gen3/4/5 arithmetic is neither a transaction payload benchmark nor a promise that a switch upstream link can carry all downstream endpoints at once.",
    "mistakes": [
      "Full duplex directions are independent.",
      "Mechanical and electrical dimensions can differ.",
      "Gen6 uses different signaling and FLIT/FEC behavior.",
      "It requires platform and device support."
    ],
    "prerequisites": [
      "s0-g0-t3"
    ],
    "related": [
      "s6-g1-t0"
    ],
    "lab": {
      "objective": "Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → PCIe boundary",
        "GT/s → Lanes → Payload throughput",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record the negotiated endpoint and every shared upstream attachment. Compare one-direction demand with a correctly unit-labelled encoding envelope; validate actual device support before changing slot or bifurcation settings.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using GT/s, Lanes and Payload throughput. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Switches, shared upstream lanes, bifurcation and CPU attachment create additional capacity and locality boundaries beyond the endpoint slot. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Negotiated topology plus same-workload measurements and exact recovery record. An increased width does not alone prove application benefit. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "GT/s → Lanes → Payload throughput. Independent endpoint calculations miss aggregation. An empty slot is not necessarily an equivalent path.",
      "challenge": "What does bifurcation change? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "GT/s": "Lane transfers per second. Different from useful bytes per second.",
      "Lanes": "Negotiated parallel links. Electrical width matters.",
      "Payload throughput": "Completed useful data. Lower than raw encoding envelope."
    },
    "sources": [
      {
        "title": "PCI-SIG PCIe 3.0 encoding FAQ",
        "url": "https://pcisig.com/faq?field_category_value%5B%5D=pci_express_3.0",
        "checked": "2026-10-09"
      },
      {
        "title": "PCI-SIG Gen4/5 lane signaling rates",
        "url": "https://pcisig.com/blog/pushing-limits-understanding-lane-margining-pcie%C2%AE",
        "checked": "2026-10-09"
      },
      {
        "title": "NVM Express PCIe transport specification index",
        "url": "https://nvmexpress.org/specification/nvme-over-pcie-transport-specification/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g0-t8-Q01",
        "topicId": "s6-g0-t8",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "What is the Gen3 x4 encoded envelope per direction?",
        "answer": "About 31.51 Gb/s or 3.94 decimal GB/s.",
        "explanation": "Four times 8 times 128 divided by 130; bytes divide by eight.",
        "testedConcept": "What is the Gen3 x4 encoded envelope per direction?",
        "options": [
          "About 31.51 Gb/s or 3.94 decimal GB/s.",
          "32 decimal GB/s per direction, equating transfers with bytes.",
          "63.02 Gb/s per direction, adding transmit and receive.",
          "8 Gb/s per direction, ignoring three of the four lanes."
        ]
      },
      {
        "questionId": "s6-g0-t8-Q02",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should both directions be added when checking a one-way stream?",
        "answer": "No.",
        "explanation": "Full duplex directions are independent.",
        "testedConcept": "Should both directions be added when checking a one-way stream?"
      },
      {
        "questionId": "s6-g0-t8-Q03",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A Gen4 card negotiates Gen3 x8. Which parameters belong in the calculation?",
        "answer": "Gen3 and eight lanes.",
        "explanation": "Negotiated attachment governs the envelope.",
        "testedConcept": "A Gen4 card negotiates Gen3 x8. Which parameters belong in the calculation?"
      },
      {
        "questionId": "s6-g0-t8-Q04",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does x16 printed beside a connector guarantee sixteen active lanes?",
        "answer": "No.",
        "explanation": "Mechanical and electrical dimensions can differ.",
        "testedConcept": "Does x16 printed beside a connector guarantee sixteen active lanes?"
      },
      {
        "questionId": "s6-g0-t8-Q05",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What bounds several devices behind a PCIe switch?",
        "answer": "Their shared upstream link as well as each endpoint link.",
        "explanation": "Independent endpoint calculations miss aggregation.",
        "testedConcept": "What bounds several devices behind a PCIe switch?"
      },
      {
        "questionId": "s6-g0-t8-Q06",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can Gen5 encoding arithmetic be copied directly to Gen6?",
        "answer": "No.",
        "explanation": "Gen6 uses different signaling and FLIT/FEC behavior.",
        "testedConcept": "Can Gen5 encoding arithmetic be copied directly to Gen6?"
      },
      {
        "questionId": "s6-g0-t8-Q07",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why do payload benchmarks fall below the encoding result?",
        "answer": "Transaction/control overhead and device/software limitations consume capacity.",
        "explanation": "Encoding is only one overhead layer.",
        "testedConcept": "Why do payload benchmarks fall below the encoding result?"
      },
      {
        "questionId": "s6-g0-t8-Q08",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does bifurcation change?",
        "answer": "How a supported lane group is split among endpoints.",
        "explanation": "It requires platform and device support.",
        "testedConcept": "What does bifurcation change?"
      },
      {
        "questionId": "s6-g0-t8-Q09",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect attachment locality after moving a card?",
        "answer": "CPU/NUMA proximity and isolation grouping may change.",
        "explanation": "An empty slot is not necessarily an equivalent path.",
        "testedConcept": "Why inspect attachment locality after moving a card?"
      },
      {
        "questionId": "s6-g0-t8-Q10",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What evidence verifies a slot change helped?",
        "answer": "Negotiated topology plus same-workload measurements and exact recovery record.",
        "explanation": "An increased width does not alone prove application benefit.",
        "testedConcept": "What evidence verifies a slot change helped?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g0-t8-QC1",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should both directions be added when checking a one-way stream?",
        "answer": "No.",
        "explanation": "Full duplex directions are independent.",
        "testedConcept": "Should both directions be added when checking a one-way stream?"
      },
      {
        "questionId": "s6-g0-t8-QC2",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What bounds several devices behind a PCIe switch?",
        "answer": "Their shared upstream link as well as each endpoint link.",
        "explanation": "Independent endpoint calculations miss aggregation.",
        "testedConcept": "What bounds several devices behind a PCIe switch?"
      },
      {
        "questionId": "s6-g0-t8-QC3",
        "topicId": "s6-g0-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect attachment locality after moving a card?",
        "answer": "CPU/NUMA proximity and isolation grouping may change.",
        "explanation": "An empty slot is not necessarily an equivalent path.",
        "testedConcept": "Why inspect attachment locality after moving a card?"
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
    "id": "s6-g1-t0",
    "batch": "15",
    "title": "RAID",
    "subtitle": "Document level, layout, active members, smallest usable member size, failure domains and restore method.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t0",
    "definition": "RAID combines members into a logical storage layout with explicit capacity and failure-pattern semantics. Redundancy protects against selected member losses, while backups and tested restore protect from deletion, corruption and broader failure domains. A survivable layout is not proof of readable application data.",
    "purpose": "Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks.",
    "mental": "Striping places logical ranges across members; mirroring copies them and parity stores reconstruction information. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Nominal capacity: Layout-derived usable bytes. Excludes metadata and formatting.",
      "Survivability: Declared member-loss relation. Does not prove integrity.",
      "Backup: Independent recoverable copy. Must be restore-tested.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Striping places logical ranges across members; mirroring copies them and parity stores reconstruction information.",
      "Count failed members and, for pair-based RAID10, locate each failed member in its mirror pair before deciding survivability.",
      "The array metadata, controller, cache state, filesystem and application remain separate dependencies; rebuilding consumes resources and does not restore an independent backup."
    ],
    "flow": [
      [
        "Map the original operation",
        "RAID combines members into a logical storage layout with explicit capacity and failure-pattern semantics. Redundancy protects against selected member losses, while backups and tested restore protect from deletion, corruption and broader failure domains. A survivable layout is not proof of readable application data."
      ],
      [
        "Trace the first boundary",
        "Striping places logical ranges across members; mirroring copies them and parity stores reconstruction information."
      ],
      [
        "Evaluate installed conditions",
        "Count failed members and, for pair-based RAID10, locate each failed member in its mirror pair before deciding survivability."
      ],
      [
        "Verify capacity and recovery",
        "The array metadata, controller, cache state, filesystem and application remain separate dependencies; rebuilding consumes resources and does not restore an independent backup."
      ]
    ],
    "comparison": [
      [
        "Nominal capacity",
        "Layout-derived usable bytes",
        "Excludes metadata and formatting."
      ],
      [
        "Survivability",
        "Declared member-loss relation",
        "Does not prove integrity."
      ],
      [
        "Backup",
        "Independent recoverable copy",
        "Must be restore-tested."
      ]
    ],
    "example": "Case: Six equal 2 TB members use RAID6. What is nominal capacity? Answer: 8 decimal TB. Reason: Two member-equivalents are reserved for dual parity. Case: An array is online after a fault. What still requires verification? Answer: Original data integrity and application operations. Reason: Online metadata is weaker than end-to-end recovery evidence. Case: Why is forced assembly excluded from the introductory lab? Answer: It can expose stale or inconsistent data and affect owned storage. Reason: A command that bypasses safeguards is not a harmless observation.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks.",
        "expected": "Capture observer and timestamp. Member mapping, supported replacement, integrity checks and independent restore test. Capacity and healthy flags alone are insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Two members fail in pair-based RAID10. What information is essential?",
        "Whether both belong to the same mirror pair. Count alone does not establish survivability."
      ],
      [
        "Why use the smallest usable member size in equal-member arithmetic?",
        "Each stripe/copy requires a supported common component capacity. Larger-member excess may be unused."
      ],
      [
        "Does redundancy in one enclosure protect from enclosure destruction?",
        "No. The layout shares that physical domain."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Do not substitute RAID for immutable/offline recovery or encryption. Preserve metadata and disk identities securely; destructive create/import/force commands are outside these classroom labs.",
    "performance": "Capacity arithmetic excludes metadata and filesystem reservations. Random write behavior, stripe alignment, cache protection, rebuild load and workload shape matter more than a universal fastest-level ranking.",
    "mistakes": [
      "The deletion is propagated through the layout.",
      "Online metadata is weaker than end-to-end recovery evidence.",
      "It is a replacement resource, not an extra completed parity copy.",
      "A command that bypasses safeguards is not a harmless observation."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t1"
    ],
    "lab": {
      "objective": "Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → RAID boundary",
        "Nominal capacity → Survivability → Backup",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Document level, layout, active members, smallest usable member size, failure domains and restore method. Compare nominal capacity and every relevant failure pattern without creating arrays or forcing assembly on host disks.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Nominal capacity, Survivability and Backup. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. The array metadata, controller, cache state, filesystem and application remain separate dependencies; rebuilding consumes resources and does not restore an independent backup. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Member mapping, supported replacement, integrity checks and independent restore test. Capacity and healthy flags alone are insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Nominal capacity → Survivability → Backup. Larger-member excess may be unused. The layout shares that physical domain.",
      "challenge": "Why is forced assembly excluded from the introductory lab? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Nominal capacity": "Layout-derived usable bytes. Excludes metadata and formatting.",
      "Survivability": "Declared member-loss relation. Does not prove integrity.",
      "Backup": "Independent recoverable copy. Must be restore-tested."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t0-Q01",
        "topicId": "s6-g1-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Six equal 2 TB members use RAID6. What is nominal capacity?",
        "answer": "8 decimal TB.",
        "explanation": "Two member-equivalents are reserved for dual parity.",
        "testedConcept": "Six equal 2 TB members use RAID6. What is nominal capacity?",
        "options": [
          "12 decimal TB, counting every member as useful data.",
          "10 decimal TB, reserving only one member-equivalent.",
          "6 decimal TB, treating dual parity as two-way mirroring.",
          "8 decimal TB."
        ]
      },
      {
        "questionId": "s6-g1-t0-Q02",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can RAID protect a file deleted by an authorized application?",
        "answer": "No independent prior copy is guaranteed.",
        "explanation": "The deletion is propagated through the layout.",
        "testedConcept": "Can RAID protect a file deleted by an authorized application?"
      },
      {
        "questionId": "s6-g1-t0-Q03",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two members fail in pair-based RAID10. What information is essential?",
        "answer": "Whether both belong to the same mirror pair.",
        "explanation": "Count alone does not establish survivability.",
        "testedConcept": "Two members fail in pair-based RAID10. What information is essential?"
      },
      {
        "questionId": "s6-g1-t0-Q04",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "An array is online after a fault. What still requires verification?",
        "answer": "Original data integrity and application operations.",
        "explanation": "Online metadata is weaker than end-to-end recovery evidence.",
        "testedConcept": "An array is online after a fault. What still requires verification?"
      },
      {
        "questionId": "s6-g1-t0-Q05",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why use the smallest usable member size in equal-member arithmetic?",
        "answer": "Each stripe/copy requires a supported common component capacity.",
        "explanation": "Larger-member excess may be unused.",
        "testedConcept": "Why use the smallest usable member size in equal-member arithmetic?"
      },
      {
        "questionId": "s6-g1-t0-Q06",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a hot spare increase current parity tolerance?",
        "answer": "No.",
        "explanation": "It is a replacement resource, not an extra completed parity copy.",
        "testedConcept": "Can a hot spare increase current parity tolerance?"
      },
      {
        "questionId": "s6-g1-t0-Q07",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be recorded before replacing a disk?",
        "answer": "Array UUID, member identity, physical slot and supported recovery procedure.",
        "explanation": "Device names can change across boots.",
        "testedConcept": "What should be recorded before replacing a disk?"
      },
      {
        "questionId": "s6-g1-t0-Q08",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why is forced assembly excluded from the introductory lab?",
        "answer": "It can expose stale or inconsistent data and affect owned storage.",
        "explanation": "A command that bypasses safeguards is not a harmless observation.",
        "testedConcept": "Why is forced assembly excluded from the introductory lab?"
      },
      {
        "questionId": "s6-g1-t0-Q09",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does redundancy in one enclosure protect from enclosure destruction?",
        "answer": "No.",
        "explanation": "The layout shares that physical domain.",
        "testedConcept": "Does redundancy in one enclosure protect from enclosure destruction?"
      },
      {
        "questionId": "s6-g1-t0-Q10",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What constitutes a complete RAID recovery plan?",
        "answer": "Member mapping, supported replacement, integrity checks and independent restore test.",
        "explanation": "Capacity and healthy flags alone are insufficient.",
        "testedConcept": "What constitutes a complete RAID recovery plan?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t0-QC1",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can RAID protect a file deleted by an authorized application?",
        "answer": "No independent prior copy is guaranteed.",
        "explanation": "The deletion is propagated through the layout.",
        "testedConcept": "Can RAID protect a file deleted by an authorized application?"
      },
      {
        "questionId": "s6-g1-t0-QC2",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why use the smallest usable member size in equal-member arithmetic?",
        "answer": "Each stripe/copy requires a supported common component capacity.",
        "explanation": "Larger-member excess may be unused.",
        "testedConcept": "Why use the smallest usable member size in equal-member arithmetic?"
      },
      {
        "questionId": "s6-g1-t0-QC3",
        "topicId": "s6-g1-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does redundancy in one enclosure protect from enclosure destruction?",
        "answer": "No.",
        "explanation": "The layout shares that physical domain.",
        "testedConcept": "Does redundancy in one enclosure protect from enclosure destruction?"
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
    "id": "s6-g1-t1",
    "batch": "15",
    "title": "Hardware RAID",
    "subtitle": "Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t1",
    "definition": "Hardware RAID presents controller-managed logical volumes while hiding some member details from ordinary OS enumeration. Array metadata compatibility, controller firmware, cache protection and supported import/replacement procedures determine whether an acknowledged write survives failure.",
    "purpose": "Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance.",
    "mental": "The controller maps logical requests to its declared layout and may acknowledge writes using a cache; durability depends on protected cache and flush semantics. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Virtual volume: Controller logical device. May hide physical members.",
      "Protected cache: Retained acknowledged writes. Depends on supported hardware health.",
      "Import: Metadata interpretation. Requires exact compatibility.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The controller maps logical requests to its declared layout and may acknowledge writes using a cache; durability depends on protected cache and flush semantics.",
      "Controller-specific tools expose members, virtual volumes and cache health; OS disk count may represent logical volumes rather than physical members.",
      "A replacement must interpret the metadata and preserved cache state correctly; matching RAID level names do not certify controller interchangeability."
    ],
    "flow": [
      [
        "Map the original operation",
        "Hardware RAID presents controller-managed logical volumes while hiding some member details from ordinary OS enumeration. Array metadata compatibility, controller firmware, cache protection and supported import/replacement procedures determine whether an acknowledged write survives failure."
      ],
      [
        "Trace the first boundary",
        "The controller maps logical requests to its declared layout and may acknowledge writes using a cache; durability depends on protected cache and flush semantics."
      ],
      [
        "Evaluate installed conditions",
        "Controller-specific tools expose members, virtual volumes and cache health; OS disk count may represent logical volumes rather than physical members."
      ],
      [
        "Verify capacity and recovery",
        "A replacement must interpret the metadata and preserved cache state correctly; matching RAID level names do not certify controller interchangeability."
      ]
    ],
    "comparison": [
      [
        "Virtual volume",
        "Controller logical device",
        "May hide physical members."
      ],
      [
        "Protected cache",
        "Retained acknowledged writes",
        "Depends on supported hardware health."
      ],
      [
        "Import",
        "Metadata interpretation",
        "Requires exact compatibility."
      ]
    ],
    "example": "Case: The OS lists one disk backed by eight members. What is likely being enumerated? Answer: A controller logical volume. Reason: OS device count need not equal physical disk count. Case: What must survive for cached acknowledged writes to be recoverable? Answer: The supported protected-cache data and its recovery path. Reason: A healthy disk set does not recover lost volatile cache. Case: Why retain firmware release with array evidence? Answer: Supported tools and recovery semantics can be release specific. Reason: Generic product names are not enough.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lsblk -o NAME,TYPE,SIZE",
        "explanation": "Observe only the fields reported by this exact command. Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance.",
        "expected": "Capture observer and timestamp. Supported volume/member health plus integrity and original application tests. A green controller icon is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Is a same-level RAID controller automatically a compatible replacement?",
        "No. Metadata formats, firmware and cache state may differ."
      ],
      [
        "Why should routine inventory scripts avoid import and initialize commands?",
        "They can mutate metadata or destroy data. Observation and configuration are different scopes."
      ],
      [
        "Should cache protection be bypassed to regain benchmark speed?",
        "No; restore supported protection and assess risk first. Fast acknowledgment without durability is a different contract."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Controller administration can initialize or delete many disks at once. Apply privileged access and firmware provenance and keep destructive operations out of routine monitoring scripts.",
    "performance": "Protected write-back can change latency; loss of protection may trigger write-through and a deliberate performance reduction. Do not disable that safety behavior to make a dashboard look faster.",
    "mistakes": [
      "Protection failure can intentionally alter acknowledgment behavior.",
      "A healthy disk set does not recover lost volatile cache.",
      "Corruption and deletion can reach every member.",
      "Generic product names are not enough."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t2"
    ],
    "lab": {
      "objective": "Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Hardware RAID boundary",
        "Virtual volume → Protected cache → Import",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Build a read-only controller/member/volume inventory and verify cache-protection health through the supported management tool. Preserve a known restore path before any adapter, firmware or battery/capacitor maintenance.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Virtual volume, Protected cache and Import. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. A replacement must interpret the metadata and preserved cache state correctly; matching RAID level names do not certify controller interchangeability. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported volume/member health plus integrity and original application tests. A green controller icon is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Virtual volume → Protected cache → Import. Observation and configuration are different scopes. Fast acknowledgment without durability is a different contract.",
      "challenge": "Why retain firmware release with array evidence? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Virtual volume": "Controller logical device. May hide physical members.",
      "Protected cache": "Retained acknowledged writes. Depends on supported hardware health.",
      "Import": "Metadata interpretation. Requires exact compatibility."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
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
        "questionId": "s6-g1-t1-Q01",
        "topicId": "s6-g1-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "The OS lists one disk backed by eight members. What is likely being enumerated?",
        "answer": "A controller logical volume.",
        "explanation": "OS device count need not equal physical disk count.",
        "testedConcept": "The OS lists one disk backed by eight members. What is likely being enumerated?",
        "options": [
          "Eight independent OS block devices hidden only by filenames.",
          "A backup copy unrelated to the controller data path.",
          "A controller logical volume.",
          "One physical disk with seven empty bays."
        ]
      },
      {
        "questionId": "s6-g1-t1-Q02",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Write latency rises after cache-protection failure. What safe hypothesis should be checked?",
        "answer": "The controller may have switched to write-through.",
        "explanation": "Protection failure can intentionally alter acknowledgment behavior.",
        "testedConcept": "Write latency rises after cache-protection failure. What safe hypothesis should be checked?"
      },
      {
        "questionId": "s6-g1-t1-Q03",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is a same-level RAID controller automatically a compatible replacement?",
        "answer": "No.",
        "explanation": "Metadata formats, firmware and cache state may differ.",
        "testedConcept": "Is a same-level RAID controller automatically a compatible replacement?"
      },
      {
        "questionId": "s6-g1-t1-Q04",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What must survive for cached acknowledged writes to be recoverable?",
        "answer": "The supported protected-cache data and its recovery path.",
        "explanation": "A healthy disk set does not recover lost volatile cache.",
        "testedConcept": "What must survive for cached acknowledged writes to be recoverable?"
      },
      {
        "questionId": "s6-g1-t1-Q05",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why should routine inventory scripts avoid import and initialize commands?",
        "answer": "They can mutate metadata or destroy data.",
        "explanation": "Observation and configuration are different scopes.",
        "testedConcept": "Why should routine inventory scripts avoid import and initialize commands?"
      },
      {
        "questionId": "s6-g1-t1-Q06",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can hardware RAID replace a tested backup?",
        "answer": "No.",
        "explanation": "Corruption and deletion can reach every member.",
        "testedConcept": "Can hardware RAID replace a tested backup?"
      },
      {
        "questionId": "s6-g1-t1-Q07",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What maps a failed controller member to the replaceable disk?",
        "answer": "Controller member identity and physical slot record.",
        "explanation": "Logical volume names do not identify bays.",
        "testedConcept": "What maps a failed controller member to the replaceable disk?"
      },
      {
        "questionId": "s6-g1-t1-Q08",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why retain firmware release with array evidence?",
        "answer": "Supported tools and recovery semantics can be release specific.",
        "explanation": "Generic product names are not enough.",
        "testedConcept": "Why retain firmware release with array evidence?"
      },
      {
        "questionId": "s6-g1-t1-Q09",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should cache protection be bypassed to regain benchmark speed?",
        "answer": "No; restore supported protection and assess risk first.",
        "explanation": "Fast acknowledgment without durability is a different contract.",
        "testedConcept": "Should cache protection be bypassed to regain benchmark speed?"
      },
      {
        "questionId": "s6-g1-t1-Q10",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What validates hardware RAID recovery?",
        "answer": "Supported volume/member health plus integrity and original application tests.",
        "explanation": "A green controller icon is insufficient.",
        "testedConcept": "What validates hardware RAID recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t1-QC1",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Write latency rises after cache-protection failure. What safe hypothesis should be checked?",
        "answer": "The controller may have switched to write-through.",
        "explanation": "Protection failure can intentionally alter acknowledgment behavior.",
        "testedConcept": "Write latency rises after cache-protection failure. What safe hypothesis should be checked?"
      },
      {
        "questionId": "s6-g1-t1-QC2",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why should routine inventory scripts avoid import and initialize commands?",
        "answer": "They can mutate metadata or destroy data.",
        "explanation": "Observation and configuration are different scopes.",
        "testedConcept": "Why should routine inventory scripts avoid import and initialize commands?"
      },
      {
        "questionId": "s6-g1-t1-QC3",
        "topicId": "s6-g1-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should cache protection be bypassed to regain benchmark speed?",
        "answer": "No; restore supported protection and assess risk first.",
        "explanation": "Fast acknowledgment without durability is a different contract.",
        "testedConcept": "Should cache protection be bypassed to regain benchmark speed?"
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
    "id": "s6-g1-t2",
    "batch": "15",
    "title": "Software RAID",
    "subtitle": "Observe /proc/mdstat and block-device topology only.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t2",
    "definition": "Software RAID implements an array in the host storage stack, such as Linux MD. Host CPU and memory participate, while persistent metadata and the boot/initramfs configuration allow the correct members to be assembled. Software RAID is not synonymous with an unprotected or automatically portable array.",
    "purpose": "Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk.",
    "mental": "The host array driver maps logical blocks to members according to level and layout; the filesystem remains above that logical device. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "MD device: Host-managed logical array. Separate from its filesystem.",
      "Metadata: Member and layout identity. Needed for correct assembly.",
      "Resync: Consistency/reconstruction work. Consumes shared I/O resources.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The host array driver maps logical blocks to members according to level and layout; the filesystem remains above that logical device.",
      "Metadata associates member identities and roles, and degraded/dirty conditions affect safe assembly behavior.",
      "Boot dependencies must discover and assemble the correct array before required filesystems or services start; monitoring must retain member and resync state."
    ],
    "flow": [
      [
        "Map the original operation",
        "Software RAID implements an array in the host storage stack, such as Linux MD. Host CPU and memory participate, while persistent metadata and the boot/initramfs configuration allow the correct members to be assembled. Software RAID is not synonymous with an unprotected or automatically portable array."
      ],
      [
        "Trace the first boundary",
        "The host array driver maps logical blocks to members according to level and layout; the filesystem remains above that logical device."
      ],
      [
        "Evaluate installed conditions",
        "Metadata associates member identities and roles, and degraded/dirty conditions affect safe assembly behavior."
      ],
      [
        "Verify capacity and recovery",
        "Boot dependencies must discover and assemble the correct array before required filesystems or services start; monitoring must retain member and resync state."
      ]
    ],
    "comparison": [
      [
        "MD device",
        "Host-managed logical array",
        "Separate from its filesystem."
      ],
      [
        "Metadata",
        "Member and layout identity",
        "Needed for correct assembly."
      ],
      [
        "Resync",
        "Consistency/reconstruction work",
        "Consumes shared I/O resources."
      ]
    ],
    "example": "Case: Does a software RAID array depend on the host storage stack? Answer: Yes. Reason: Array mapping executes in that stack. Case: Can an unknown member be safely force-assembled from its device name alone? Answer: No. Reason: Identity, metadata and consistency must be established. Case: Does a resync progress percentage predict exact completion time? Answer: No. Reason: Workload and device rates can change.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk.",
        "expected": "Capture observer and timestamp. Correct assembly/layout, original integrity and service tests plus independent restore evidence. A completed resync alone is incomplete. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Why include array assembly in boot planning?",
        "A required filesystem may depend on the array being available before services start. Runtime health alone misses boot dependencies."
      ],
      [
        "Does software RAID eliminate cache durability concerns?",
        "No. Drive/controller caches and flush semantics still matter."
      ],
      [
        "What limits claims of universal CPU overhead?",
        "Parity/layout, hardware, queueing and workload differences. No fixed percentage covers every system."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Restrict administration of raw block devices and avoid auto-assembling unknown members. Force options that override degraded/dirty safeguards require a separate recovery decision and are not included here.",
    "performance": "Parity work, resync, device latency, cache/flush behavior and CPU resources jointly affect service. A modern CPU can handle substantial work, but no universal overhead percentage is asserted.",
    "mistakes": [
      "It does not inspect a remote hardware controller or certify file integrity.",
      "Identity, metadata and consistency must be established.",
      "Enumeration can change.",
      "Workload and device rates can change."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t3"
    ],
    "lab": {
      "objective": "Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Software RAID boundary",
        "MD device → Metadata → Resync",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Observe /proc/mdstat and block-device topology only. Document UUID, metadata version, layout, boot dependencies and independent backup; use disposable owned images for any later array creation rather than a host disk.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using MD device, Metadata and Resync. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Boot dependencies must discover and assemble the correct array before required filesystems or services start; monitoring must retain member and resync state. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct assembly/layout, original integrity and service tests plus independent restore evidence. A completed resync alone is incomplete. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "MD device → Metadata → Resync. Drive/controller caches and flush semantics still matter. No fixed percentage covers every system.",
      "challenge": "Does a resync progress percentage predict exact completion time? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "MD device": "Host-managed logical array. Separate from its filesystem.",
      "Metadata": "Member and layout identity. Needed for correct assembly.",
      "Resync": "Consistency/reconstruction work. Consumes shared I/O resources."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t2-Q01",
        "topicId": "s6-g1-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Does a software RAID array depend on the host storage stack?",
        "answer": "Yes.",
        "explanation": "Array mapping executes in that stack.",
        "testedConcept": "Does a software RAID array depend on the host storage stack?",
        "options": [
          "Only at installation; runtime I/O bypasses the host storage stack.",
          "Yes.",
          "No; every software array maps requests inside a hardware RAID controller.",
          "No; the filesystem directly reconstructs every member without an array layer."
        ]
      },
      {
        "questionId": "s6-g1-t2-Q02",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does /proc/mdstat establish?",
        "answer": "The local kernel reported array/member and activity state at that time.",
        "explanation": "It does not inspect a remote hardware controller or certify file integrity.",
        "testedConcept": "What does /proc/mdstat establish?"
      },
      {
        "questionId": "s6-g1-t2-Q03",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why include array assembly in boot planning?",
        "answer": "A required filesystem may depend on the array being available before services start.",
        "explanation": "Runtime health alone misses boot dependencies.",
        "testedConcept": "Why include array assembly in boot planning?"
      },
      {
        "questionId": "s6-g1-t2-Q04",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an unknown member be safely force-assembled from its device name alone?",
        "answer": "No.",
        "explanation": "Identity, metadata and consistency must be established.",
        "testedConcept": "Can an unknown member be safely force-assembled from its device name alone?"
      },
      {
        "questionId": "s6-g1-t2-Q05",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does software RAID eliminate cache durability concerns?",
        "answer": "No.",
        "explanation": "Drive/controller caches and flush semantics still matter.",
        "testedConcept": "Does software RAID eliminate cache durability concerns?"
      },
      {
        "questionId": "s6-g1-t2-Q06",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What identifies an array more reliably than a transient md device number?",
        "answer": "Its recorded metadata UUID and member identities.",
        "explanation": "Enumeration can change.",
        "testedConcept": "What identifies an array more reliably than a transient md device number?"
      },
      {
        "questionId": "s6-g1-t2-Q07",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why distinguish filesystem errors from array-member health?",
        "answer": "The filesystem can be corrupt on a mechanically healthy layout.",
        "explanation": "Layer-specific evidence prevents inappropriate disk replacement.",
        "testedConcept": "Why distinguish filesystem errors from array-member health?"
      },
      {
        "questionId": "s6-g1-t2-Q08",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a resync progress percentage predict exact completion time?",
        "answer": "No.",
        "explanation": "Workload and device rates can change.",
        "testedConcept": "Does a resync progress percentage predict exact completion time?"
      },
      {
        "questionId": "s6-g1-t2-Q09",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What limits claims of universal CPU overhead?",
        "answer": "Parity/layout, hardware, queueing and workload differences.",
        "explanation": "No fixed percentage covers every system.",
        "testedConcept": "What limits claims of universal CPU overhead?"
      },
      {
        "questionId": "s6-g1-t2-Q10",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies software RAID recovery?",
        "answer": "Correct assembly/layout, original integrity and service tests plus independent restore evidence.",
        "explanation": "A completed resync alone is incomplete.",
        "testedConcept": "What verifies software RAID recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t2-QC1",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does /proc/mdstat establish?",
        "answer": "The local kernel reported array/member and activity state at that time.",
        "explanation": "It does not inspect a remote hardware controller or certify file integrity.",
        "testedConcept": "What does /proc/mdstat establish?"
      },
      {
        "questionId": "s6-g1-t2-QC2",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does software RAID eliminate cache durability concerns?",
        "answer": "No.",
        "explanation": "Drive/controller caches and flush semantics still matter.",
        "testedConcept": "Does software RAID eliminate cache durability concerns?"
      },
      {
        "questionId": "s6-g1-t2-QC3",
        "topicId": "s6-g1-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What limits claims of universal CPU overhead?",
        "answer": "Parity/layout, hardware, queueing and workload differences.",
        "explanation": "No fixed percentage covers every system.",
        "testedConcept": "What limits claims of universal CPU overhead?"
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
    "id": "s6-g1-t3",
    "batch": "15",
    "title": "RAID 0",
    "subtitle": "Use the worksheet to compare capacity and a single-member loss.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t3",
    "definition": "RAID0 stripes data over members without redundant copies or reconstruction parity. It can aggregate nominal capacity and distribute work, but any missing member breaks the complete logical dataset. A recoverable workload on RAID0 needs an independent durable source.",
    "purpose": "Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk.",
    "mental": "Logical stripes alternate among members; each member owns data ranges unavailable elsewhere in the layout. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Stripe: Distributed logical range. No duplicate in RAID0.",
      "Member loss: Missing data ranges. Breaks the complete array.",
      "Scratch data: Reproducible working data. Needs a retained source.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Logical stripes alternate among members; each member owns data ranges unavailable elsewhere in the layout.",
      "The nominal equal-member capacity is N times S before metadata/filesystem costs.",
      "One missing member makes the modeled complete array unavailable; an empty spare contains no copy of that missing data."
    ],
    "flow": [
      [
        "Map the original operation",
        "RAID0 stripes data over members without redundant copies or reconstruction parity. It can aggregate nominal capacity and distribute work, but any missing member breaks the complete logical dataset. A recoverable workload on RAID0 needs an independent durable source."
      ],
      [
        "Trace the first boundary",
        "Logical stripes alternate among members; each member owns data ranges unavailable elsewhere in the layout."
      ],
      [
        "Evaluate installed conditions",
        "The nominal equal-member capacity is N times S before metadata/filesystem costs."
      ],
      [
        "Verify capacity and recovery",
        "One missing member makes the modeled complete array unavailable; an empty spare contains no copy of that missing data."
      ]
    ],
    "comparison": [
      [
        "Stripe",
        "Distributed logical range",
        "No duplicate in RAID0."
      ],
      [
        "Member loss",
        "Missing data ranges",
        "Breaks the complete array."
      ],
      [
        "Scratch data",
        "Reproducible working data",
        "Needs a retained source."
      ]
    ],
    "example": "Case: Four equal 2 TB members use RAID0. What is nominal capacity? Answer: 8 decimal TB. Reason: All four member capacities contribute without redundancy. Case: Why might RAID0 be acceptable for some scratch workloads? Answer: The data can be reproduced from a retained durable source and downtime is acceptable. Reason: That is a workload recovery decision, not RAID protection. Case: Is RAID0 suitable as the only copy of an irreplaceable dataset? Answer: No. Reason: Any member loss can destroy the logical dataset.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk.",
        "expected": "Capture observer and timestamp. Reproduction from the source and original integrity/application tests. A newly empty healthy array is not recovered data. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Can an empty spare repair the missing member data?",
        "No. A spare is not a previously written copy."
      ],
      [
        "Does doubling members guarantee twice the application rate?",
        "No. Shared paths and workload behavior can limit scaling."
      ],
      [
        "What changes if one member is larger in the simplified equal-component model?",
        "Only the common usable size is counted. The worksheet does not allocate unequal extras."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "RAID0 offers no member-loss integrity protection and is not a backup. Apply storage access controls and data classification even when contents are described as temporary.",
    "performance": "Striping can increase aggregate sequential work if independent members and upstream paths allow it; one bottleneck and random workload behavior can prevent linear scaling.",
    "mistakes": [
      "Missing stripes have no duplicate or parity.",
      "That is a workload recovery decision, not RAID protection.",
      "Filesystem metadata and file extents may span members.",
      "Any member loss can destroy the logical dataset."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t4"
    ],
    "lab": {
      "objective": "Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → RAID 0 boundary",
        "Stripe → Member loss → Scratch data",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Use the worksheet to compare capacity and a single-member loss. Limit any target exercise to disposable images containing reproducible scratch data and never initialize a discovered host disk.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Stripe, Member loss and Scratch data. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. One missing member makes the modeled complete array unavailable; an empty spare contains no copy of that missing data. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Reproduction from the source and original integrity/application tests. A newly empty healthy array is not recovered data. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Stripe → Member loss → Scratch data. Shared paths and workload behavior can limit scaling. The worksheet does not allocate unequal extras.",
      "challenge": "Is RAID0 suitable as the only copy of an irreplaceable dataset? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Stripe": "Distributed logical range. No duplicate in RAID0.",
      "Member loss": "Missing data ranges. Breaks the complete array.",
      "Scratch data": "Reproducible working data. Needs a retained source."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t3-Q01",
        "topicId": "s6-g1-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Four equal 2 TB members use RAID0. What is nominal capacity?",
        "answer": "8 decimal TB.",
        "explanation": "All four member capacities contribute without redundancy.",
        "testedConcept": "Four equal 2 TB members use RAID0. What is nominal capacity?",
        "options": [
          "8 decimal TB.",
          "6 decimal TB, reserving single parity.",
          "4 decimal TB, reserving mirror copies.",
          "2 decimal TB, treating the layout as an N-way mirror."
        ]
      },
      {
        "questionId": "s6-g1-t3-Q02",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One member fails. Can the complete dataset be reconstructed from the layout?",
        "answer": "No.",
        "explanation": "Missing stripes have no duplicate or parity.",
        "testedConcept": "One member fails. Can the complete dataset be reconstructed from the layout?"
      },
      {
        "questionId": "s6-g1-t3-Q03",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an empty spare repair the missing member data?",
        "answer": "No.",
        "explanation": "A spare is not a previously written copy.",
        "testedConcept": "Can an empty spare repair the missing member data?"
      },
      {
        "questionId": "s6-g1-t3-Q04",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why might RAID0 be acceptable for some scratch workloads?",
        "answer": "The data can be reproduced from a retained durable source and downtime is acceptable.",
        "explanation": "That is a workload recovery decision, not RAID protection.",
        "testedConcept": "Why might RAID0 be acceptable for some scratch workloads?"
      },
      {
        "questionId": "s6-g1-t3-Q05",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does doubling members guarantee twice the application rate?",
        "answer": "No.",
        "explanation": "Shared paths and workload behavior can limit scaling.",
        "testedConcept": "Does doubling members guarantee twice the application rate?"
      },
      {
        "questionId": "s6-g1-t3-Q06",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can files unaffected by a failure be assumed safe without checking the filesystem?",
        "answer": "No.",
        "explanation": "Filesystem metadata and file extents may span members.",
        "testedConcept": "Can files unaffected by a failure be assumed safe without checking the filesystem?"
      },
      {
        "questionId": "s6-g1-t3-Q07",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be preserved before a disposable stripe experiment?",
        "answer": "The reproducible data source and exact owned-image identities.",
        "explanation": "Do not rely on the array itself for recovery.",
        "testedConcept": "What should be preserved before a disposable stripe experiment?"
      },
      {
        "questionId": "s6-g1-t3-Q08",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is RAID0 suitable as the only copy of an irreplaceable dataset?",
        "answer": "No.",
        "explanation": "Any member loss can destroy the logical dataset.",
        "testedConcept": "Is RAID0 suitable as the only copy of an irreplaceable dataset?"
      },
      {
        "questionId": "s6-g1-t3-Q09",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What changes if one member is larger in the simplified equal-component model?",
        "answer": "Only the common usable size is counted.",
        "explanation": "The worksheet does not allocate unequal extras.",
        "testedConcept": "What changes if one member is larger in the simplified equal-component model?"
      },
      {
        "questionId": "s6-g1-t3-Q10",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies recovery after rebuilding scratch storage?",
        "answer": "Reproduction from the source and original integrity/application tests.",
        "explanation": "A newly empty healthy array is not recovered data.",
        "testedConcept": "What verifies recovery after rebuilding scratch storage?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t3-QC1",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "One member fails. Can the complete dataset be reconstructed from the layout?",
        "answer": "No.",
        "explanation": "Missing stripes have no duplicate or parity.",
        "testedConcept": "One member fails. Can the complete dataset be reconstructed from the layout?"
      },
      {
        "questionId": "s6-g1-t3-QC2",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does doubling members guarantee twice the application rate?",
        "answer": "No.",
        "explanation": "Shared paths and workload behavior can limit scaling.",
        "testedConcept": "Does doubling members guarantee twice the application rate?"
      },
      {
        "questionId": "s6-g1-t3-QC3",
        "topicId": "s6-g1-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What changes if one member is larger in the simplified equal-component model?",
        "answer": "Only the common usable size is counted.",
        "explanation": "The worksheet does not allocate unequal extras.",
        "testedConcept": "What changes if one member is larger in the simplified equal-component model?"
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
    "id": "s6-g1-t4",
    "batch": "15",
    "title": "RAID 1",
    "subtitle": "Record mirror membership and the actual copy layout.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t4",
    "definition": "RAID1 mirrors logical data across members. In the worksheet it is explicitly an N-way mirror: nominal capacity equals one common member and the complete data remains reconstructible while at least one member survives. Two separate mirrored pairs would instead be a different nested layout.",
    "purpose": "Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs.",
    "mental": "Each logical block has a copy on every member in this N-way teaching model; writes and acknowledgment follow the actual implementation contract. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Mirror copy: Same logical blocks. Not historical versioning.",
      "N-way mirror: All members hold the dataset. Capacity is one common member.",
      "Synchronization: Build a complete new copy. Not instantaneous on insertion.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Each logical block has a copy on every member in this N-way teaching model; writes and acknowledgment follow the actual implementation contract.",
      "Failure removes copies rather than unique stripes, but surviving media errors or propagated corruption can still defeat recovery.",
      "Replacing a member requires a completed synchronization before that new member is counted as a complete independent copy."
    ],
    "flow": [
      [
        "Map the original operation",
        "RAID1 mirrors logical data across members. In the worksheet it is explicitly an N-way mirror: nominal capacity equals one common member and the complete data remains reconstructible while at least one member survives. Two separate mirrored pairs would instead be a different nested layout."
      ],
      [
        "Trace the first boundary",
        "Each logical block has a copy on every member in this N-way teaching model; writes and acknowledgment follow the actual implementation contract."
      ],
      [
        "Evaluate installed conditions",
        "Failure removes copies rather than unique stripes, but surviving media errors or propagated corruption can still defeat recovery."
      ],
      [
        "Verify capacity and recovery",
        "Replacing a member requires a completed synchronization before that new member is counted as a complete independent copy."
      ]
    ],
    "comparison": [
      [
        "Mirror copy",
        "Same logical blocks",
        "Not historical versioning."
      ],
      [
        "N-way mirror",
        "All members hold the dataset",
        "Capacity is one common member."
      ],
      [
        "Synchronization",
        "Build a complete new copy",
        "Not instantaneous on insertion."
      ]
    ],
    "example": "Case: Four 2 TB members form the declared N-way RAID1. What is nominal capacity? Answer: 2 decimal TB. Reason: Every member duplicates the same logical data. Case: Does deleting a file leave an old version on other mirror members? Answer: Not as a RAID guarantee. Reason: The write/deletion is propagated. Case: Does N-way mirroring guarantee N times read throughput? Answer: No. Reason: Read scheduling and other bottlenecks are implementation dependent.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs.",
        "expected": "Capture observer and timestamp. Complete synchronization, integrity and original service, with backup restore evidence separate. A detected new disk is not a recovered copy. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Is four-way RAID1 the same as two striped mirror pairs?",
        "No. Striped pairs are the worksheet RAID10 arrangement."
      ],
      [
        "Can an inserted blank replacement count immediately as a complete copy?",
        "No. It requires supported completed synchronization."
      ],
      [
        "Why monitor synchronization alongside healthy-member count?",
        "A present replacement may not yet contain complete data. Presence and redundancy completion differ."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Deletion, ransomware and application corruption can be mirrored consistently. Isolation and restore-tested independent versions remain necessary; redundancy is not a history of correct data.",
    "performance": "Read distribution and write acknowledgment are implementation specific. The usable-capacity calculation does not assert that N copies yield N times read throughput.",
    "mistakes": [
      "The model assumes that surviving member data is intact.",
      "The write/deletion is propagated.",
      "Count-based arithmetic excludes corruption.",
      "Read scheduling and other bottlenecks are implementation dependent."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t5"
    ],
    "lab": {
      "objective": "Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → RAID 1 boundary",
        "Mirror copy → N-way mirror → Synchronization",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record mirror membership and the actual copy layout. Compare all-member versus partial-member loss and preserve an independent backup; do not describe four-way mirroring as two pairs.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Mirror copy, N-way mirror and Synchronization. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Replacing a member requires a completed synchronization before that new member is counted as a complete independent copy. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Complete synchronization, integrity and original service, with backup restore evidence separate. A detected new disk is not a recovered copy. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Mirror copy → N-way mirror → Synchronization. It requires supported completed synchronization. Presence and redundancy completion differ.",
      "challenge": "Does N-way mirroring guarantee N times read throughput? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Mirror copy": "Same logical blocks. Not historical versioning.",
      "N-way mirror": "All members hold the dataset. Capacity is one common member.",
      "Synchronization": "Build a complete new copy. Not instantaneous on insertion."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t4-Q01",
        "topicId": "s6-g1-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Four 2 TB members form the declared N-way RAID1. What is nominal capacity?",
        "answer": "2 decimal TB.",
        "explanation": "Every member duplicates the same logical data.",
        "testedConcept": "Four 2 TB members form the declared N-way RAID1. What is nominal capacity?",
        "options": [
          "8 decimal TB, adding all duplicate copies as useful space.",
          "4 decimal TB, assuming two striped mirror pairs.",
          "6 decimal TB, assuming distributed single parity.",
          "2 decimal TB."
        ]
      },
      {
        "questionId": "s6-g1-t4-Q02",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Three of those four members fail. What is the idealized layout outcome?",
        "answer": "Reconstructible from the remaining complete member.",
        "explanation": "The model assumes that surviving member data is intact.",
        "testedConcept": "Three of those four members fail. What is the idealized layout outcome?"
      },
      {
        "questionId": "s6-g1-t4-Q03",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is four-way RAID1 the same as two striped mirror pairs?",
        "answer": "No.",
        "explanation": "Striped pairs are the worksheet RAID10 arrangement.",
        "testedConcept": "Is four-way RAID1 the same as two striped mirror pairs?"
      },
      {
        "questionId": "s6-g1-t4-Q04",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does deleting a file leave an old version on other mirror members?",
        "answer": "Not as a RAID guarantee.",
        "explanation": "The write/deletion is propagated.",
        "testedConcept": "Does deleting a file leave an old version on other mirror members?"
      },
      {
        "questionId": "s6-g1-t4-Q05",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an inserted blank replacement count immediately as a complete copy?",
        "answer": "No.",
        "explanation": "It requires supported completed synchronization.",
        "testedConcept": "Can an inserted blank replacement count immediately as a complete copy?"
      },
      {
        "questionId": "s6-g1-t4-Q06",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What hidden assumption underlies the member-loss result?",
        "answer": "Surviving data and metadata remain usable and consistent.",
        "explanation": "Count-based arithmetic excludes corruption.",
        "testedConcept": "What hidden assumption underlies the member-loss result?"
      },
      {
        "questionId": "s6-g1-t4-Q07",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can mirroring protect against loss of the entire shared enclosure?",
        "answer": "No.",
        "explanation": "All copies can share that failure domain.",
        "testedConcept": "Can mirroring protect against loss of the entire shared enclosure?"
      },
      {
        "questionId": "s6-g1-t4-Q08",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does N-way mirroring guarantee N times read throughput?",
        "answer": "No.",
        "explanation": "Read scheduling and other bottlenecks are implementation dependent.",
        "testedConcept": "Does N-way mirroring guarantee N times read throughput?"
      },
      {
        "questionId": "s6-g1-t4-Q09",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why monitor synchronization alongside healthy-member count?",
        "answer": "A present replacement may not yet contain complete data.",
        "explanation": "Presence and redundancy completion differ.",
        "testedConcept": "Why monitor synchronization alongside healthy-member count?"
      },
      {
        "questionId": "s6-g1-t4-Q10",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a mirror replacement recovery?",
        "answer": "Complete synchronization, integrity and original service, with backup restore evidence separate.",
        "explanation": "A detected new disk is not a recovered copy.",
        "testedConcept": "What verifies a mirror replacement recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t4-QC1",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Three of those four members fail. What is the idealized layout outcome?",
        "answer": "Reconstructible from the remaining complete member.",
        "explanation": "The model assumes that surviving member data is intact.",
        "testedConcept": "Three of those four members fail. What is the idealized layout outcome?"
      },
      {
        "questionId": "s6-g1-t4-QC2",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can an inserted blank replacement count immediately as a complete copy?",
        "answer": "No.",
        "explanation": "It requires supported completed synchronization.",
        "testedConcept": "Can an inserted blank replacement count immediately as a complete copy?"
      },
      {
        "questionId": "s6-g1-t4-QC3",
        "topicId": "s6-g1-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why monitor synchronization alongside healthy-member count?",
        "answer": "A present replacement may not yet contain complete data.",
        "explanation": "Presence and redundancy completion differ.",
        "testedConcept": "Why monitor synchronization alongside healthy-member count?"
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
    "id": "s6-g1-t5",
    "batch": "15",
    "title": "RAID 5",
    "subtitle": "Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t5",
    "definition": "RAID5 distributes data and single parity across at least three active members. Equal-member nominal capacity is (N−1)S, and the idealized layout tolerates one missing member. Reconstruction relies on the other members and consistent parity; a spare does not add another parity equation.",
    "purpose": "Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies.",
    "mental": "Full stripes retain one parity-equivalent per stripe, distributed among members rather than a universally dedicated parity disk. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Single parity: One reconstruction equation. Tolerates one declared member loss.",
      "Degraded: Redundancy consumed. Additional losses are dangerous.",
      "Rebuild: Read survivors to restore a member. Adds workload and exposure.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Full stripes retain one parity-equivalent per stripe, distributed among members rather than a universally dedicated parity disk.",
      "A missing block can be reconstructed from surviving stripe blocks and parity; a second missing member exceeds the modeled information budget.",
      "Small partial-stripe writes and rebuild activity can require extra I/O and consistency protection, so cache and workload conditions shape actual behavior."
    ],
    "flow": [
      [
        "Map the original operation",
        "RAID5 distributes data and single parity across at least three active members. Equal-member nominal capacity is (N−1)S, and the idealized layout tolerates one missing member. Reconstruction relies on the other members and consistent parity; a spare does not add another parity equation."
      ],
      [
        "Trace the first boundary",
        "Full stripes retain one parity-equivalent per stripe, distributed among members rather than a universally dedicated parity disk."
      ],
      [
        "Evaluate installed conditions",
        "A missing block can be reconstructed from surviving stripe blocks and parity; a second missing member exceeds the modeled information budget."
      ],
      [
        "Verify capacity and recovery",
        "Small partial-stripe writes and rebuild activity can require extra I/O and consistency protection, so cache and workload conditions shape actual behavior."
      ]
    ],
    "comparison": [
      [
        "Single parity",
        "One reconstruction equation",
        "Tolerates one declared member loss."
      ],
      [
        "Degraded",
        "Redundancy consumed",
        "Additional losses are dangerous."
      ],
      [
        "Rebuild",
        "Read survivors to restore a member",
        "Adds workload and exposure."
      ]
    ],
    "example": "Case: Five equal 2 TB active members use RAID5. What is nominal capacity? Answer: 8 decimal TB. Reason: One member-equivalent is reserved for parity. Case: Does adding an idle spare change tolerance from one loss to two? Answer: No. Reason: No second parity equation has been added. Case: Why is a dirty degraded array a separate recovery concern? Answer: Parity and missing data may be inconsistent. Reason: The simple loss model assumes usable consistent survivors.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies.",
        "expected": "Capture observer and timestamp. Supported rebuild completion plus data integrity and original service tests. A replacement disk appearing is not sufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Is parity always stored on one dedicated disk in RAID5?",
        "No; it is distributed. A dedicated parity arrangement would be a different level."
      ],
      [
        "What does degraded state imply for another member loss?",
        "The redundancy budget is already consumed. A healthy spare must finish reconstruction before redundancy returns."
      ],
      [
        "Can capacity arithmetic predict small-write throughput?",
        "No. Write shape, cache and implementation change I/O work."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "RAID5 does not protect against malicious logical writes or corruption on surviving data. Protect raw-device access, monitoring and backup isolation rather than treating parity as authentication.",
    "performance": "Avoid fixed write-penalty claims as a universal benchmark. Full-stripe versus small writes, cache, queue depth, media errors and rebuild load change observed service latency.",
    "mistakes": [
      "Single parity cannot reconstruct two missing member contributions.",
      "No second parity equation has been added.",
      "Reconstruction is not free background work.",
      "The simple loss model assumes usable consistent survivors."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t6"
    ],
    "lab": {
      "objective": "Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → RAID 5 boundary",
        "Single parity → Degraded → Rebuild",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Use a disposable capacity/failure worksheet and record protected-cache and consistency assumptions. Never force a dirty degraded host array to demonstrate reconstruction; retain independent restore-tested copies.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Single parity, Degraded and Rebuild. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Small partial-stripe writes and rebuild activity can require extra I/O and consistency protection, so cache and workload conditions shape actual behavior. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Supported rebuild completion plus data integrity and original service tests. A replacement disk appearing is not sufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Single parity → Degraded → Rebuild. A healthy spare must finish reconstruction before redundancy returns. Write shape, cache and implementation change I/O work.",
      "challenge": "Why is a dirty degraded array a separate recovery concern? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Single parity": "One reconstruction equation. Tolerates one declared member loss.",
      "Degraded": "Redundancy consumed. Additional losses are dangerous.",
      "Rebuild": "Read survivors to restore a member. Adds workload and exposure."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t5-Q01",
        "topicId": "s6-g1-t5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Five equal 2 TB active members use RAID5. What is nominal capacity?",
        "answer": "8 decimal TB.",
        "explanation": "One member-equivalent is reserved for parity.",
        "testedConcept": "Five equal 2 TB active members use RAID5. What is nominal capacity?",
        "options": [
          "6 decimal TB, reserving two parity-equivalents.",
          "2 decimal TB, assuming every member is a full mirror.",
          "8 decimal TB.",
          "10 decimal TB, including parity as useful space."
        ]
      },
      {
        "questionId": "s6-g1-t5-Q02",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two active members are missing. What is the model outcome?",
        "answer": "Unavailable.",
        "explanation": "Single parity cannot reconstruct two missing member contributions.",
        "testedConcept": "Two active members are missing. What is the model outcome?"
      },
      {
        "questionId": "s6-g1-t5-Q03",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is parity always stored on one dedicated disk in RAID5?",
        "answer": "No; it is distributed.",
        "explanation": "A dedicated parity arrangement would be a different level.",
        "testedConcept": "Is parity always stored on one dedicated disk in RAID5?"
      },
      {
        "questionId": "s6-g1-t5-Q04",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does adding an idle spare change tolerance from one loss to two?",
        "answer": "No.",
        "explanation": "No second parity equation has been added.",
        "testedConcept": "Does adding an idle spare change tolerance from one loss to two?"
      },
      {
        "questionId": "s6-g1-t5-Q05",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does degraded state imply for another member loss?",
        "answer": "The redundancy budget is already consumed.",
        "explanation": "A healthy spare must finish reconstruction before redundancy returns.",
        "testedConcept": "What does degraded state imply for another member loss?"
      },
      {
        "questionId": "s6-g1-t5-Q06",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why can a rebuild increase application latency?",
        "answer": "It shares survivor I/O and controller/CPU resources.",
        "explanation": "Reconstruction is not free background work.",
        "testedConcept": "Why can a rebuild increase application latency?"
      },
      {
        "questionId": "s6-g1-t5-Q07",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can single parity authenticate a maliciously rewritten file?",
        "answer": "No.",
        "explanation": "Logical corruption can be stored consistently.",
        "testedConcept": "Can single parity authenticate a maliciously rewritten file?"
      },
      {
        "questionId": "s6-g1-t5-Q08",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why is a dirty degraded array a separate recovery concern?",
        "answer": "Parity and missing data may be inconsistent.",
        "explanation": "The simple loss model assumes usable consistent survivors.",
        "testedConcept": "Why is a dirty degraded array a separate recovery concern?"
      },
      {
        "questionId": "s6-g1-t5-Q09",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can capacity arithmetic predict small-write throughput?",
        "answer": "No.",
        "explanation": "Write shape, cache and implementation change I/O work.",
        "testedConcept": "Can capacity arithmetic predict small-write throughput?"
      },
      {
        "questionId": "s6-g1-t5-Q10",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies RAID5 recovery?",
        "answer": "Supported rebuild completion plus data integrity and original service tests.",
        "explanation": "A replacement disk appearing is not sufficient.",
        "testedConcept": "What verifies RAID5 recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t5-QC1",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two active members are missing. What is the model outcome?",
        "answer": "Unavailable.",
        "explanation": "Single parity cannot reconstruct two missing member contributions.",
        "testedConcept": "Two active members are missing. What is the model outcome?"
      },
      {
        "questionId": "s6-g1-t5-QC2",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does degraded state imply for another member loss?",
        "answer": "The redundancy budget is already consumed.",
        "explanation": "A healthy spare must finish reconstruction before redundancy returns.",
        "testedConcept": "What does degraded state imply for another member loss?"
      },
      {
        "questionId": "s6-g1-t5-QC3",
        "topicId": "s6-g1-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can capacity arithmetic predict small-write throughput?",
        "answer": "No.",
        "explanation": "Write shape, cache and implementation change I/O work.",
        "testedConcept": "Can capacity arithmetic predict small-write throughput?"
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
    "id": "s6-g1-t6",
    "batch": "15",
    "title": "RAID 6",
    "subtitle": "Compare one, two and three losses and explicitly separate the current failure state from a planned replacement.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t6",
    "definition": "RAID6 distributes two independent parity-equivalents across at least four active members. Equal-member capacity is (N−2)S and the idealized layout tolerates any two missing members. That stronger loss relation still excludes corruption, failed controllers and unavailable independent backups.",
    "purpose": "Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise.",
    "mental": "Each stripe retains two reconstruction relations, enabling recovery of two missing member contributions when surviving data and metadata remain consistent. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Dual parity: Two independent equations. Protects two declared member losses.",
      "Active members: Data/parity participants. Excludes idle spares.",
      "Recovery budget: Remaining redundancy. Changes while degraded.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Each stripe retains two reconstruction relations, enabling recovery of two missing member contributions when surviving data and metadata remain consistent.",
      "Three missing members exceed the teaching model regardless of how many empty replacements are available.",
      "Partial-stripe writes and reconstruction use additional resources; supported consistency and cache protection remain part of the durability contract."
    ],
    "flow": [
      [
        "Map the original operation",
        "RAID6 distributes two independent parity-equivalents across at least four active members. Equal-member capacity is (N−2)S and the idealized layout tolerates any two missing members. That stronger loss relation still excludes corruption, failed controllers and unavailable independent backups."
      ],
      [
        "Trace the first boundary",
        "Each stripe retains two reconstruction relations, enabling recovery of two missing member contributions when surviving data and metadata remain consistent."
      ],
      [
        "Evaluate installed conditions",
        "Three missing members exceed the teaching model regardless of how many empty replacements are available."
      ],
      [
        "Verify capacity and recovery",
        "Partial-stripe writes and reconstruction use additional resources; supported consistency and cache protection remain part of the durability contract."
      ]
    ],
    "comparison": [
      [
        "Dual parity",
        "Two independent equations",
        "Protects two declared member losses."
      ],
      [
        "Active members",
        "Data/parity participants",
        "Excludes idle spares."
      ],
      [
        "Recovery budget",
        "Remaining redundancy",
        "Changes while degraded."
      ]
    ],
    "example": "Case: Six 2 TB active members use RAID6. What is nominal capacity? Answer: 8 decimal TB. Reason: Four member-equivalents contribute useful data. Case: What minimum active-member count does this worksheet require for RAID6? Answer: Four. Reason: The model reserves two parity-equivalents and useful data members. Case: What remains outside the two-loss result? Answer: Survivor corruption, metadata inconsistency, controller failure and service dependencies. Reason: The arithmetic has explicit assumptions.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise.",
        "expected": "Capture observer and timestamp. Completed supported rebuild, correct membership and integrity/service evidence. A purchased replacement is not restored redundancy. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Three members fail and one spare exists. Is current reconstruction possible in this model?",
        "No. An empty spare provides no missing information."
      ],
      [
        "Does dual parity protect from deletion by the application?",
        "No independent version is retained as a RAID guarantee. Logical writes propagate across the layout."
      ],
      [
        "Why identify active versus spare members in capacity records?",
        "Idle spare capacity is not part of the current useful layout. Counting all installed disks overstates capacity."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Dual parity is neither encryption nor immutable history. Restrict array administration and keep backup credentials and copies outside the same compromised failure domain.",
    "performance": "RAID6 trades more parity capacity and work for stronger member-loss tolerance. No universal throughput ordering relative to RAID10 is asserted without workload and implementation evidence.",
    "mistakes": [
      "Dual parity supports two declared missing members.",
      "The model reserves two parity-equivalents and useful data members.",
      "A further loss exceeds tolerance.",
      "The arithmetic has explicit assumptions."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t7"
    ],
    "lab": {
      "objective": "Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → RAID 6 boundary",
        "Dual parity → Active members → Recovery budget",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Compare one, two and three losses and explicitly separate the current failure state from a planned replacement. Document member identity, rebuild procedure and independent recovery copies before any optional target exercise.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Dual parity, Active members and Recovery budget. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Partial-stripe writes and reconstruction use additional resources; supported consistency and cache protection remain part of the durability contract. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Completed supported rebuild, correct membership and integrity/service evidence. A purchased replacement is not restored redundancy. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Dual parity → Active members → Recovery budget. Logical writes propagate across the layout. Counting all installed disks overstates capacity.",
      "challenge": "What remains outside the two-loss result? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Dual parity": "Two independent equations. Protects two declared member losses.",
      "Active members": "Data/parity participants. Excludes idle spares.",
      "Recovery budget": "Remaining redundancy. Changes while degraded."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t6-Q01",
        "topicId": "s6-g1-t6",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Six 2 TB active members use RAID6. What is nominal capacity?",
        "answer": "8 decimal TB.",
        "explanation": "Four member-equivalents contribute useful data.",
        "testedConcept": "Six 2 TB active members use RAID6. What is nominal capacity?",
        "options": [
          "6 decimal TB, assuming striped mirror pairs.",
          "8 decimal TB.",
          "12 decimal TB, counting parity as useful data.",
          "10 decimal TB, reserving single parity only."
        ]
      },
      {
        "questionId": "s6-g1-t6-Q02",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two arbitrary active members fail. What is the idealized layout outcome?",
        "answer": "Reconstructible.",
        "explanation": "Dual parity supports two declared missing members.",
        "testedConcept": "Two arbitrary active members fail. What is the idealized layout outcome?"
      },
      {
        "questionId": "s6-g1-t6-Q03",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Three members fail and one spare exists. Is current reconstruction possible in this model?",
        "answer": "No.",
        "explanation": "An empty spare provides no missing information.",
        "testedConcept": "Three members fail and one spare exists. Is current reconstruction possible in this model?"
      },
      {
        "questionId": "s6-g1-t6-Q04",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What minimum active-member count does this worksheet require for RAID6?",
        "answer": "Four.",
        "explanation": "The model reserves two parity-equivalents and useful data members.",
        "testedConcept": "What minimum active-member count does this worksheet require for RAID6?"
      },
      {
        "questionId": "s6-g1-t6-Q05",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dual parity protect from deletion by the application?",
        "answer": "No independent version is retained as a RAID guarantee.",
        "explanation": "Logical writes propagate across the layout.",
        "testedConcept": "Does dual parity protect from deletion by the application?"
      },
      {
        "questionId": "s6-g1-t6-Q06",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why should a second failed member change maintenance urgency?",
        "answer": "The modeled redundancy budget is exhausted.",
        "explanation": "A further loss exceeds tolerance.",
        "testedConcept": "Why should a second failed member change maintenance urgency?"
      },
      {
        "questionId": "s6-g1-t6-Q07",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can RAID6 always be called slower than RAID10?",
        "answer": "No without the actual workload and implementation evidence.",
        "explanation": "A universal ranking hides cache and access-shape effects.",
        "testedConcept": "Can RAID6 always be called slower than RAID10?"
      },
      {
        "questionId": "s6-g1-t6-Q08",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What remains outside the two-loss result?",
        "answer": "Survivor corruption, metadata inconsistency, controller failure and service dependencies.",
        "explanation": "The arithmetic has explicit assumptions.",
        "testedConcept": "What remains outside the two-loss result?"
      },
      {
        "questionId": "s6-g1-t6-Q09",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why identify active versus spare members in capacity records?",
        "answer": "Idle spare capacity is not part of the current useful layout.",
        "explanation": "Counting all installed disks overstates capacity.",
        "testedConcept": "Why identify active versus spare members in capacity records?"
      },
      {
        "questionId": "s6-g1-t6-Q10",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies restored dual-parity resilience?",
        "answer": "Completed supported rebuild, correct membership and integrity/service evidence.",
        "explanation": "A purchased replacement is not restored redundancy.",
        "testedConcept": "What verifies restored dual-parity resilience?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t6-QC1",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two arbitrary active members fail. What is the idealized layout outcome?",
        "answer": "Reconstructible.",
        "explanation": "Dual parity supports two declared missing members.",
        "testedConcept": "Two arbitrary active members fail. What is the idealized layout outcome?"
      },
      {
        "questionId": "s6-g1-t6-QC2",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dual parity protect from deletion by the application?",
        "answer": "No independent version is retained as a RAID guarantee.",
        "explanation": "Logical writes propagate across the layout.",
        "testedConcept": "Does dual parity protect from deletion by the application?"
      },
      {
        "questionId": "s6-g1-t6-QC3",
        "topicId": "s6-g1-t6",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why identify active versus spare members in capacity records?",
        "answer": "Idle spare capacity is not part of the current useful layout.",
        "explanation": "Counting all installed disks overstates capacity.",
        "testedConcept": "Why identify active versus spare members in capacity records?"
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
    "id": "s6-g1-t7",
    "batch": "15",
    "title": "RAID 10",
    "subtitle": "Draw the exact pair mapping and test every member-loss mask in the worksheet.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t7",
    "definition": "RAID10 in this course is explicitly a stripe across adjacent two-member mirror pairs: members 0/1, 2/3 and so on. It requires an even active-member count of at least four, uses NS/2 nominal capacity and survives losses only when every pair retains a complete member. Linux MD also supports layouts beyond this narrow pair model.",
    "purpose": "Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation.",
    "mental": "Mirroring supplies two copies within each pair while striping distributes different logical ranges across pairs. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Mirror pair: Two copies of one range. One survivor required.",
      "Stripe of pairs: Different ranges per pair. Each pair must remain usable.",
      "Failure mask: Exact missing-member set. Count alone is insufficient.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Mirroring supplies two copies within each pair while striping distributes different logical ranges across pairs.",
      "Losing both members of one pair removes unique logical ranges even if other pairs are intact.",
      "Several failures in different pairs can be survivable, so count-only tolerance rules misdescribe the layout."
    ],
    "flow": [
      [
        "Map the original operation",
        "RAID10 in this course is explicitly a stripe across adjacent two-member mirror pairs: members 0/1, 2/3 and so on. It requires an even active-member count of at least four, uses NS/2 nominal capacity and survives losses only when every pair retains a complete member. Linux MD also supports layouts beyond this narrow pair model."
      ],
      [
        "Trace the first boundary",
        "Mirroring supplies two copies within each pair while striping distributes different logical ranges across pairs."
      ],
      [
        "Evaluate installed conditions",
        "Losing both members of one pair removes unique logical ranges even if other pairs are intact."
      ],
      [
        "Verify capacity and recovery",
        "Several failures in different pairs can be survivable, so count-only tolerance rules misdescribe the layout."
      ]
    ],
    "comparison": [
      [
        "Mirror pair",
        "Two copies of one range",
        "One survivor required."
      ],
      [
        "Stripe of pairs",
        "Different ranges per pair",
        "Each pair must remain usable."
      ],
      [
        "Failure mask",
        "Exact missing-member set",
        "Count alone is insufficient."
      ]
    ],
    "example": "Case: Six equal 2 TB members use this paired RAID10. What is nominal capacity? Answer: 6 decimal TB. Reason: Three mirror pairs each contribute 2 TB. Case: Can all two-member failures be assumed survivable? Answer: No. Reason: Two losses in one pair break the layout. Case: Can a mirror pair preserve a previous uncorrupted file version after overwrite? Answer: Not as a RAID guarantee. Reason: Both copies can receive the same bad write.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation.",
        "expected": "Capture observer and timestamp. Correct pair/layout, rebuilt copy, integrity and original application evidence. A healthy total-member count can hide the wrong layout. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Members 0, 2 and 4 fail. What is the model outcome?",
        "Reconstructible. One member survives in every pair."
      ],
      [
        "Why is an odd member count rejected here?",
        "This teaching layout requires adjacent two-member pairs. Other RAID10 layouts are outside its contract."
      ],
      [
        "Why enumerate masks rather than only failed-member counts?",
        "Position within pairs controls survivability. Equal counts can produce different outcomes."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Mirrored writes can preserve malicious changes on both members. Keep independent versions and avoid replacing a healthy paired survivor based on ambiguous bay labels.",
    "performance": "Write distribution and reconstruction differ from parity layouts, but pair locality, device rates, shared controllers and workload still govern latency. Half-capacity arithmetic is not a throughput guarantee.",
    "mistakes": [
      "The first pair has no surviving copy.",
      "Two losses in one pair break the layout.",
      "Actual near/far/offset and copy layouts require metadata-specific interpretation.",
      "Both copies can receive the same bad write."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g1-t8"
    ],
    "lab": {
      "objective": "Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → RAID 10 boundary",
        "Mirror pair → Stripe of pairs → Failure mask",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Draw the exact pair mapping and test every member-loss mask in the worksheet. Record actual target layout metadata before transferring this result to hardware or Linux MD; pair semantics are not claimed for every RAID10 implementation.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Mirror pair, Stripe of pairs and Failure mask. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Several failures in different pairs can be survivable, so count-only tolerance rules misdescribe the layout. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct pair/layout, rebuilt copy, integrity and original application evidence. A healthy total-member count can hide the wrong layout. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Mirror pair → Stripe of pairs → Failure mask. Other RAID10 layouts are outside its contract. Equal counts can produce different outcomes.",
      "challenge": "Can a mirror pair preserve a previous uncorrupted file version after overwrite? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Mirror pair": "Two copies of one range. One survivor required.",
      "Stripe of pairs": "Different ranges per pair. Each pair must remain usable.",
      "Failure mask": "Exact missing-member set. Count alone is insufficient."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t7-Q01",
        "topicId": "s6-g1-t7",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Six equal 2 TB members use this paired RAID10. What is nominal capacity?",
        "answer": "6 decimal TB.",
        "explanation": "Three mirror pairs each contribute 2 TB.",
        "testedConcept": "Six equal 2 TB members use this paired RAID10. What is nominal capacity?",
        "options": [
          "6 decimal TB.",
          "12 decimal TB, counting both mirror copies as useful.",
          "8 decimal TB, treating the layout as RAID6.",
          "2 decimal TB, treating all six members as one mirror."
        ]
      },
      {
        "questionId": "s6-g1-t7-Q02",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Members 0 and 1 fail. What is the model outcome?",
        "answer": "Unavailable.",
        "explanation": "The first pair has no surviving copy.",
        "testedConcept": "Members 0 and 1 fail. What is the model outcome?"
      },
      {
        "questionId": "s6-g1-t7-Q03",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Members 0, 2 and 4 fail. What is the model outcome?",
        "answer": "Reconstructible.",
        "explanation": "One member survives in every pair.",
        "testedConcept": "Members 0, 2 and 4 fail. What is the model outcome?"
      },
      {
        "questionId": "s6-g1-t7-Q04",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can all two-member failures be assumed survivable?",
        "answer": "No.",
        "explanation": "Two losses in one pair break the layout.",
        "testedConcept": "Can all two-member failures be assumed survivable?"
      },
      {
        "questionId": "s6-g1-t7-Q05",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is an odd member count rejected here?",
        "answer": "This teaching layout requires adjacent two-member pairs.",
        "explanation": "Other RAID10 layouts are outside its contract.",
        "testedConcept": "Why is an odd member count rejected here?"
      },
      {
        "questionId": "s6-g1-t7-Q06",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does this pair map describe every Linux MD RAID10 layout?",
        "answer": "No.",
        "explanation": "Actual near/far/offset and copy layouts require metadata-specific interpretation.",
        "testedConcept": "Does this pair map describe every Linux MD RAID10 layout?"
      },
      {
        "questionId": "s6-g1-t7-Q07",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should be checked before replacing a degraded pair member?",
        "answer": "Exact member-to-pair and physical bay mapping.",
        "explanation": "Removing its healthy partner destroys that range.",
        "testedConcept": "What should be checked before replacing a degraded pair member?"
      },
      {
        "questionId": "s6-g1-t7-Q08",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a mirror pair preserve a previous uncorrupted file version after overwrite?",
        "answer": "Not as a RAID guarantee.",
        "explanation": "Both copies can receive the same bad write.",
        "testedConcept": "Can a mirror pair preserve a previous uncorrupted file version after overwrite?"
      },
      {
        "questionId": "s6-g1-t7-Q09",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why enumerate masks rather than only failed-member counts?",
        "answer": "Position within pairs controls survivability.",
        "explanation": "Equal counts can produce different outcomes.",
        "testedConcept": "Why enumerate masks rather than only failed-member counts?"
      },
      {
        "questionId": "s6-g1-t7-Q10",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes a RAID10 recovery record?",
        "answer": "Correct pair/layout, rebuilt copy, integrity and original application evidence.",
        "explanation": "A healthy total-member count can hide the wrong layout.",
        "testedConcept": "What completes a RAID10 recovery record?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t7-QC1",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Members 0 and 1 fail. What is the model outcome?",
        "answer": "Unavailable.",
        "explanation": "The first pair has no surviving copy.",
        "testedConcept": "Members 0 and 1 fail. What is the model outcome?"
      },
      {
        "questionId": "s6-g1-t7-QC2",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is an odd member count rejected here?",
        "answer": "This teaching layout requires adjacent two-member pairs.",
        "explanation": "Other RAID10 layouts are outside its contract.",
        "testedConcept": "Why is an odd member count rejected here?"
      },
      {
        "questionId": "s6-g1-t7-QC3",
        "topicId": "s6-g1-t7",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why enumerate masks rather than only failed-member counts?",
        "answer": "Position within pairs controls survivability.",
        "explanation": "Equal counts can produce different outcomes.",
        "testedConcept": "Why enumerate masks rather than only failed-member counts?"
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
    "id": "s6-g1-t8",
    "batch": "15",
    "title": "Hot Spare",
    "subtitle": "Record global/dedicated assignment, common component size, sector format, controller policy and spare health.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g1-t8",
    "definition": "A hot spare is a compatible reserved replacement member available for a supported rebuild policy. It does not hold a guaranteed current copy before reconstruction and therefore adds neither current useful capacity nor instantaneous parity tolerance. Eligibility, assignment scope and successful rebuild are separate conditions.",
    "purpose": "Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout.",
    "mental": "A supported failure/rebuild policy selects an eligible spare with sufficient usable size, interface and format; a visible spare can still be unsuitable. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Equal common member size; RAID1 is an N-way mirror; RAID10 is adjacent two-member pairs. Pure member-loss relation, no metadata/corruption/rebuild/device operations. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Spare eligibility: Supported replacement match. Size alone is not enough.",
      "Current tolerance: Existing reconstruction information. Unchanged by an idle spare.",
      "Rebuild completion: New member fully populated. Must be observed.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "A supported failure/rebuild policy selects an eligible spare with sufficient usable size, interface and format; a visible spare can still be unsuitable.",
      "Reconstruction uses surviving layout information to populate the replacement; current loss tolerance is not repaired until supported completion.",
      "After the spare becomes active, the reserved replacement pool can be empty and needs lifecycle attention even if the array reports healthy."
    ],
    "flow": [
      [
        "Map the original operation",
        "A hot spare is a compatible reserved replacement member available for a supported rebuild policy. It does not hold a guaranteed current copy before reconstruction and therefore adds neither current useful capacity nor instantaneous parity tolerance. Eligibility, assignment scope and successful rebuild are separate conditions."
      ],
      [
        "Trace the first boundary",
        "A supported failure/rebuild policy selects an eligible spare with sufficient usable size, interface and format; a visible spare can still be unsuitable."
      ],
      [
        "Evaluate installed conditions",
        "Reconstruction uses surviving layout information to populate the replacement; current loss tolerance is not repaired until supported completion."
      ],
      [
        "Verify capacity and recovery",
        "After the spare becomes active, the reserved replacement pool can be empty and needs lifecycle attention even if the array reports healthy."
      ]
    ],
    "comparison": [
      [
        "Spare eligibility",
        "Supported replacement match",
        "Size alone is not enough."
      ],
      [
        "Current tolerance",
        "Existing reconstruction information",
        "Unchanged by an idle spare."
      ],
      [
        "Rebuild completion",
        "New member fully populated",
        "Must be observed."
      ]
    ],
    "example": "Case: A five-member RAID5 has an idle 2 TB spare. What is nominal useful capacity if active members are 2 TB? Answer: 8 decimal TB. Reason: The spare is excluded from active capacity. Case: Does a matching capacity label prove spare eligibility? Answer: No. Reason: Interface, sector format, controller support and assignment also matter. Case: Does a hot spare act as an independent backup? Answer: No. Reason: It becomes part of the same live array and failure domain.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "if test -r /proc/mdstat; then cat /proc/mdstat; else echo 'MD status unavailable in this kernel'; fi",
        "explanation": "Observe only the fields reported by this exact command. Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout.",
        "expected": "Capture observer and timestamp. Eligibility, selected array, rebuild completion, integrity and replenishment ownership. A spare inventory count alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "A spare is smaller than the common component size. What must be checked?",
        "It cannot serve the required replacement capacity in this model. A smaller disk cannot store the complete reconstructed member."
      ],
      [
        "When can restored redundancy be claimed?",
        "After supported reconstruction completion and integrity/service verification. Selection or insertion alone is not completion."
      ],
      [
        "Why does spare readiness reduce only part of recovery delay?",
        "Detection/selection may accelerate but reconstruction still requires survivor work. Exposure does not disappear on insertion."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Spare provisioning and retirement can expose tenant data or mutate arrays. Use exact disk ownership, approved sanitization and least-privilege storage administration.",
    "performance": "Rebuild time and foreground impact depend on survivor rates, contention and implementation. A spare reduces response delay for some failures but does not eliminate the rebuild exposure window.",
    "mistakes": [
      "Single parity lacks enough information for two missing members.",
      "Interface, sector format, controller support and assignment also matter.",
      "A healthy array can still lack the next spare.",
      "It becomes part of the same live array and failure domain."
    ],
    "prerequisites": [
      "s0-g0-t5"
    ],
    "related": [
      "s6-g2-t0"
    ],
    "lab": {
      "objective": "Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Hot Spare boundary",
        "Spare eligibility → Current tolerance → Rebuild completion",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record global/dedicated assignment, common component size, sector format, controller policy and spare health. Compare current array survivability first, then possible reconstruction; never assume an idle spare rescues an already unreconstructible layout.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Spare eligibility, Current tolerance and Rebuild completion. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. After the spare becomes active, the reserved replacement pool can be empty and needs lifecycle attention even if the array reports healthy. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Eligibility, selected array, rebuild completion, integrity and replenishment ownership. A spare inventory count alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Spare eligibility → Current tolerance → Rebuild completion. Selection or insertion alone is not completion. Exposure does not disappear on insertion.",
      "challenge": "Does a hot spare act as an independent backup? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Spare eligibility": "Supported replacement match. Size alone is not enough.",
      "Current tolerance": "Existing reconstruction information. Unchanged by an idle spare.",
      "Rebuild completion": "New member fully populated. Must be observed."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g1-t8-Q01",
        "topicId": "s6-g1-t8",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A five-member RAID5 has an idle 2 TB spare. What is nominal useful capacity if active members are 2 TB?",
        "answer": "8 decimal TB.",
        "explanation": "The spare is excluded from active capacity.",
        "testedConcept": "A five-member RAID5 has an idle 2 TB spare. What is nominal useful capacity if active members are 2 TB?",
        "options": [
          "10 decimal TB, treating the idle spare as active useful capacity.",
          "12 decimal TB, counting spare and parity as useful data.",
          "6 decimal TB, treating the spare as extra parity.",
          "8 decimal TB."
        ]
      },
      {
        "questionId": "s6-g1-t8-Q02",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two RAID5 members fail before reconstruction. Can the empty spare recover the array?",
        "answer": "No.",
        "explanation": "Single parity lacks enough information for two missing members.",
        "testedConcept": "Two RAID5 members fail before reconstruction. Can the empty spare recover the array?"
      },
      {
        "questionId": "s6-g1-t8-Q03",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A spare is smaller than the common component size. What must be checked?",
        "answer": "It cannot serve the required replacement capacity in this model.",
        "explanation": "A smaller disk cannot store the complete reconstructed member.",
        "testedConcept": "A spare is smaller than the common component size. What must be checked?"
      },
      {
        "questionId": "s6-g1-t8-Q04",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a matching capacity label prove spare eligibility?",
        "answer": "No.",
        "explanation": "Interface, sector format, controller support and assignment also matter.",
        "testedConcept": "Does a matching capacity label prove spare eligibility?"
      },
      {
        "questionId": "s6-g1-t8-Q05",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "When can restored redundancy be claimed?",
        "answer": "After supported reconstruction completion and integrity/service verification.",
        "explanation": "Selection or insertion alone is not completion.",
        "testedConcept": "When can restored redundancy be claimed?"
      },
      {
        "questionId": "s6-g1-t8-Q06",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is the operational consequence after a spare becomes active?",
        "answer": "The replacement pool may be empty.",
        "explanation": "A healthy array can still lack the next spare.",
        "testedConcept": "What is the operational consequence after a spare becomes active?"
      },
      {
        "questionId": "s6-g1-t8-Q07",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why distinguish dedicated and global spare policy?",
        "answer": "They determine which arrays may consume the replacement.",
        "explanation": "A visible spare may be assigned elsewhere.",
        "testedConcept": "Why distinguish dedicated and global spare policy?"
      },
      {
        "questionId": "s6-g1-t8-Q08",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a hot spare act as an independent backup?",
        "answer": "No.",
        "explanation": "It becomes part of the same live array and failure domain.",
        "testedConcept": "Does a hot spare act as an independent backup?"
      },
      {
        "questionId": "s6-g1-t8-Q09",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why does spare readiness reduce only part of recovery delay?",
        "answer": "Detection/selection may accelerate but reconstruction still requires survivor work.",
        "explanation": "Exposure does not disappear on insertion.",
        "testedConcept": "Why does spare readiness reduce only part of recovery delay?"
      },
      {
        "questionId": "s6-g1-t8-Q10",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a spare recovery record retain?",
        "answer": "Eligibility, selected array, rebuild completion, integrity and replenishment ownership.",
        "explanation": "A spare inventory count alone is insufficient.",
        "testedConcept": "What should a spare recovery record retain?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g1-t8-QC1",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two RAID5 members fail before reconstruction. Can the empty spare recover the array?",
        "answer": "No.",
        "explanation": "Single parity lacks enough information for two missing members.",
        "testedConcept": "Two RAID5 members fail before reconstruction. Can the empty spare recover the array?"
      },
      {
        "questionId": "s6-g1-t8-QC2",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "When can restored redundancy be claimed?",
        "answer": "After supported reconstruction completion and integrity/service verification.",
        "explanation": "Selection or insertion alone is not completion.",
        "testedConcept": "When can restored redundancy be claimed?"
      },
      {
        "questionId": "s6-g1-t8-QC3",
        "topicId": "s6-g1-t8",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why does spare readiness reduce only part of recovery delay?",
        "answer": "Detection/selection may accelerate but reconstruction still requires survivor work.",
        "explanation": "Exposure does not disappear on insertion.",
        "testedConcept": "Why does spare readiness reduce only part of recovery delay?"
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
    "id": "s6-g2-t0",
    "batch": "15",
    "title": "Disk Backplane",
    "subtitle": "Build a bay-to-device-to-controller table from supported documentation and read-only inventory.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g2-t0",
    "definition": "A disk backplane connects bays to power and data paths through direct wiring, expanders or protocol-specific switching. Similar-looking carriers can terminate SAS, SATA or PCIe/NVMe paths with different firmware and hot-plug support. Bay identity is a physical topology contract.",
    "purpose": "Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit.",
    "mental": "Trace each bay connector through backplane revision, cable and controller/CPU attachment; front labels do not identify the protocol alone. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Bay: Physical replaceable position. Must map to logical identity.",
      "Backplane: Bay connection assembly. Protocol and revision matter.",
      "Expander/switch: Shared aggregation. Can concentrate bottlenecks and faults.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Trace each bay connector through backplane revision, cable and controller/CPU attachment; front labels do not identify the protocol alone.",
      "Expanders or switches can aggregate paths and introduce a shared power/data failure domain.",
      "Hot replacement requires the chassis, backplane, controller, OS and redundancy policy all to support the specific operation; connector accessibility is not authorization."
    ],
    "flow": [
      [
        "Map the original operation",
        "A disk backplane connects bays to power and data paths through direct wiring, expanders or protocol-specific switching. Similar-looking carriers can terminate SAS, SATA or PCIe/NVMe paths with different firmware and hot-plug support. Bay identity is a physical topology contract."
      ],
      [
        "Trace the first boundary",
        "Trace each bay connector through backplane revision, cable and controller/CPU attachment; front labels do not identify the protocol alone."
      ],
      [
        "Evaluate installed conditions",
        "Expanders or switches can aggregate paths and introduce a shared power/data failure domain."
      ],
      [
        "Verify capacity and recovery",
        "Hot replacement requires the chassis, backplane, controller, OS and redundancy policy all to support the specific operation; connector accessibility is not authorization."
      ]
    ],
    "comparison": [
      [
        "Bay",
        "Physical replaceable position",
        "Must map to logical identity."
      ],
      [
        "Backplane",
        "Bay connection assembly",
        "Protocol and revision matter."
      ],
      [
        "Expander/switch",
        "Shared aggregation",
        "Can concentrate bottlenecks and faults."
      ]
    ],
    "example": "Case: A carrier fits a bay. Does this prove NVMe support? Answer: No. Reason: Backplane wiring, firmware and host attachment must support PCIe/NVMe. Case: Does an accessible front carrier authorize hot removal? Answer: No. Reason: Supported hot-plug and array recovery conditions must be verified. Case: What is the security concern in retiring a failed disk? Answer: Residual tenant data and custody even if the disk is currently unreadable. Reason: Failure is not sanitization.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lsblk -o NAME,TYPE,SIZE",
        "explanation": "Observe only the fields reported by this exact command. Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit.",
        "expected": "Capture observer and timestamp. Correct identities and redundancy plus original integrity/application tests. Presence after rescan alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Eight drives share one expander uplink. What constraint remains?",
        "The shared uplink capacity and expander failure domain. Drive counts do not imply independent paths."
      ],
      [
        "All disks vanish together. Which common boundary should be investigated?",
        "Backplane power, shared cable, expander/controller or discovery state. Simultaneous individual disk failure is only one hypothesis."
      ],
      [
        "Why inspect per-path negotiated link rates?",
        "Common aggregation and downtraining can reduce the expected envelope. Drive advertising is not installed-path evidence."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Physical replacement can bypass operating-system access controls. Control asset custody and sanitize retired media; keep serial and tenant mappings in the appropriate protected inventory.",
    "performance": "Shared uplinks and backplane paths can constrain aggregate I/O. A fast individual drive label does not establish per-bay negotiated speed or full-rack throughput.",
    "mistakes": [
      "Wrong-member removal can destroy a degraded layout.",
      "Supported hot-plug and array recovery conditions must be verified.",
      "Chassis family names may hide variants.",
      "Failure is not sanitization."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g2-t1"
    ],
    "lab": {
      "objective": "Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → Disk Backplane boundary",
        "Bay → Backplane → Expander/switch",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Build a bay-to-device-to-controller table from supported documentation and read-only inventory. Photograph or label owned paths before maintenance, and retain an exact compatible spare rather than inferring compatibility from carrier fit.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Bay, Backplane and Expander/switch. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Hot replacement requires the chassis, backplane, controller, OS and redundancy policy all to support the specific operation; connector accessibility is not authorization. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct identities and redundancy plus original integrity/application tests. Presence after rescan alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Bay → Backplane → Expander/switch. Simultaneous individual disk failure is only one hypothesis. Drive advertising is not installed-path evidence.",
      "challenge": "What is the security concern in retiring a failed disk? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Bay": "Physical replaceable position. Must map to logical identity.",
      "Backplane": "Bay connection assembly. Protocol and revision matter.",
      "Expander/switch": "Shared aggregation. Can concentrate bottlenecks and faults."
    },
    "sources": [
      {
        "title": "Seagate SAS interface manual — historical protocol reference",
        "url": "https://www.seagate.com/staticfiles/support/disc/manuals/Interface%20manuals/100293071c.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "NVM Express PCIe transport specification index",
        "url": "https://nvmexpress.org/specification/nvme-over-pcie-transport-specification/",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g2-t0-Q01",
        "topicId": "s6-g2-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A carrier fits a bay. Does this prove NVMe support?",
        "answer": "No.",
        "explanation": "Backplane wiring, firmware and host attachment must support PCIe/NVMe.",
        "testedConcept": "A carrier fits a bay. Does this prove NVMe support?",
        "options": [
          "Yes if the drive is an SSD, regardless of wiring.",
          "Yes if the chassis supports any SAS disk.",
          "No.",
          "Yes; a fitting carrier proves every bay supports PCIe."
        ]
      },
      {
        "questionId": "s6-g2-t0-Q02",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why map OS device to bay before removing a member?",
        "answer": "Enumeration names may not match physical positions.",
        "explanation": "Wrong-member removal can destroy a degraded layout.",
        "testedConcept": "Why map OS device to bay before removing a member?"
      },
      {
        "questionId": "s6-g2-t0-Q03",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Eight drives share one expander uplink. What constraint remains?",
        "answer": "The shared uplink capacity and expander failure domain.",
        "explanation": "Drive counts do not imply independent paths.",
        "testedConcept": "Eight drives share one expander uplink. What constraint remains?"
      },
      {
        "questionId": "s6-g2-t0-Q04",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an accessible front carrier authorize hot removal?",
        "answer": "No.",
        "explanation": "Supported hot-plug and array recovery conditions must be verified.",
        "testedConcept": "Does an accessible front carrier authorize hot removal?"
      },
      {
        "questionId": "s6-g2-t0-Q05",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "All disks vanish together. Which common boundary should be investigated?",
        "answer": "Backplane power, shared cable, expander/controller or discovery state.",
        "explanation": "Simultaneous individual disk failure is only one hypothesis.",
        "testedConcept": "All disks vanish together. Which common boundary should be investigated?"
      },
      {
        "questionId": "s6-g2-t0-Q06",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record backplane revision?",
        "answer": "Protocol support and cabling can change by hardware revision.",
        "explanation": "Chassis family names may hide variants.",
        "testedConcept": "Why record backplane revision?"
      },
      {
        "questionId": "s6-g2-t0-Q07",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a SAS/SATA bay be assumed to carry PCIe lanes?",
        "answer": "No.",
        "explanation": "NVMe local transport requires the intended PCIe path.",
        "testedConcept": "Can a SAS/SATA bay be assumed to carry PCIe lanes?"
      },
      {
        "questionId": "s6-g2-t0-Q08",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is the security concern in retiring a failed disk?",
        "answer": "Residual tenant data and custody even if the disk is currently unreadable.",
        "explanation": "Failure is not sanitization.",
        "testedConcept": "What is the security concern in retiring a failed disk?"
      },
      {
        "questionId": "s6-g2-t0-Q09",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect per-path negotiated link rates?",
        "answer": "Common aggregation and downtraining can reduce the expected envelope.",
        "explanation": "Drive advertising is not installed-path evidence.",
        "testedConcept": "Why inspect per-path negotiated link rates?"
      },
      {
        "questionId": "s6-g2-t0-Q10",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a repaired backplane path?",
        "answer": "Correct identities and redundancy plus original integrity/application tests.",
        "explanation": "Presence after rescan alone is insufficient.",
        "testedConcept": "What verifies a repaired backplane path?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g2-t0-QC1",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why map OS device to bay before removing a member?",
        "answer": "Enumeration names may not match physical positions.",
        "explanation": "Wrong-member removal can destroy a degraded layout.",
        "testedConcept": "Why map OS device to bay before removing a member?"
      },
      {
        "questionId": "s6-g2-t0-QC2",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "All disks vanish together. Which common boundary should be investigated?",
        "answer": "Backplane power, shared cable, expander/controller or discovery state.",
        "explanation": "Simultaneous individual disk failure is only one hypothesis.",
        "testedConcept": "All disks vanish together. Which common boundary should be investigated?"
      },
      {
        "questionId": "s6-g2-t0-QC3",
        "topicId": "s6-g2-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect per-path negotiated link rates?",
        "answer": "Common aggregation and downtraining can reduce the expected envelope.",
        "explanation": "Drive advertising is not installed-path evidence.",
        "testedConcept": "Why inspect per-path negotiated link rates?"
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
    "id": "s6-g2-t1",
    "batch": "15",
    "title": "SAS",
    "subtitle": "Record initiator, expander, target, negotiated rate and each path parent.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g2-t1",
    "definition": "Serial Attached SCSI is a storage transport using SCSI commands over serial links, commonly with enterprise multi-path/dual-port capabilities on supported drives and enclosures. Protocol capability, installed path diversity and active multipath policy must be separately established.",
    "purpose": "Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability.",
    "mental": "An initiator discovers targets through direct links or expanders and identifies the actual SAS topology. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Initiator: Requesting adapter. Creates transport operations.",
      "Target: Storage endpoint. Has supported protocol/ports.",
      "Expander: SAS aggregation. Shared path and capacity boundary.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "An initiator discovers targets through direct links or expanders and identifies the actual SAS topology.",
      "A supported dual-port device can connect through distinct paths, but two ports sharing an expander/controller still share that parent.",
      "SAS controllers may support SATA targets in documented combinations; a SATA controller does not thereby gain SAS-target support."
    ],
    "flow": [
      [
        "Map the original operation",
        "Serial Attached SCSI is a storage transport using SCSI commands over serial links, commonly with enterprise multi-path/dual-port capabilities on supported drives and enclosures. Protocol capability, installed path diversity and active multipath policy must be separately established."
      ],
      [
        "Trace the first boundary",
        "An initiator discovers targets through direct links or expanders and identifies the actual SAS topology."
      ],
      [
        "Evaluate installed conditions",
        "A supported dual-port device can connect through distinct paths, but two ports sharing an expander/controller still share that parent."
      ],
      [
        "Verify capacity and recovery",
        "SAS controllers may support SATA targets in documented combinations; a SATA controller does not thereby gain SAS-target support."
      ]
    ],
    "comparison": [
      [
        "Initiator",
        "Requesting adapter",
        "Creates transport operations."
      ],
      [
        "Target",
        "Storage endpoint",
        "Has supported protocol/ports."
      ],
      [
        "Expander",
        "SAS aggregation",
        "Shared path and capacity boundary."
      ]
    ],
    "example": "Case: A supported SAS controller accepts a SATA drive. Does the reverse follow? Answer: No; a SATA controller does not support SAS drives merely by connector similarity. Reason: Protocol compatibility is directional and documented. Case: What identifies the actual path for a SAS target? Answer: Initiator, expander/port, target identity and negotiated attachment. Reason: A drive model label is incomplete topology evidence. Case: Can a surviving path still fail the original application? Answer: Yes if target, policy, return path or host configuration is unusable. Reason: Path presence is not a completed I/O transaction.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lsblk -o NAME,TYPE,SIZE",
        "explanation": "Observe only the fields reported by this exact command. Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability.",
        "expected": "Capture observer and timestamp. Correct target identity, usable intended paths and original I/O integrity. A link counter alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Two target paths share one expander. What risk persists?",
        "That common expander and its power path. Port diversity is weaker than failure-domain diversity."
      ],
      [
        "Does discovering a SAS target establish data encryption?",
        "No. Transport presence says nothing about encryption policy."
      ],
      [
        "What does an expander introduce into capacity planning?",
        "A possible shared uplink bottleneck. Summing device links can overstate aggregate bandwidth."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Limit storage management and physical media custody. Transport discovery and a second path do not grant application permission or encrypt stored data.",
    "performance": "Media latency, command queueing, expanders, PCIe attachment and workload govern achieved I/O. Link generation or RPM alone does not predict end-to-end throughput.",
    "mistakes": [
      "Installed parents and multipath configuration still matter.",
      "A drive model label is incomplete topology evidence.",
      "Fast links do not remove media limits.",
      "Path presence is not a completed I/O transaction."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g2-t2"
    ],
    "lab": {
      "objective": "Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → SAS boundary",
        "Initiator → Target → Expander",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record initiator, expander, target, negotiated rate and each path parent. Validate the exact controller/backplane/drive combination and path policy before treating a dual-port label as availability.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Initiator, Target and Expander. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. SAS controllers may support SATA targets in documented combinations; a SATA controller does not thereby gain SAS-target support. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct target identity, usable intended paths and original I/O integrity. A link counter alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Initiator → Target → Expander. Transport presence says nothing about encryption policy. Summing device links can overstate aggregate bandwidth.",
      "challenge": "Can a surviving path still fail the original application? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Initiator": "Requesting adapter. Creates transport operations.",
      "Target": "Storage endpoint. Has supported protocol/ports.",
      "Expander": "SAS aggregation. Shared path and capacity boundary."
    },
    "sources": [
      {
        "title": "Seagate SAS interface manual — historical protocol reference",
        "url": "https://www.seagate.com/staticfiles/support/disc/manuals/Interface%20manuals/100293071c.pdf",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g2-t1-Q01",
        "topicId": "s6-g2-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A supported SAS controller accepts a SATA drive. Does the reverse follow?",
        "answer": "No; a SATA controller does not support SAS drives merely by connector similarity.",
        "explanation": "Protocol compatibility is directional and documented.",
        "testedConcept": "A supported SAS controller accepts a SATA drive. Does the reverse follow?",
        "options": [
          "Yes if the SATA controller supports a sufficiently high link rate.",
          "No; a SATA controller does not support SAS drives merely by connector similarity.",
          "Yes; SAS and SATA protocol support is fully symmetric.",
          "Yes if the SAS drive is installed in a fitting carrier."
        ]
      },
      {
        "questionId": "s6-g2-t1-Q02",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dual-port SAS guarantee independent storage paths?",
        "answer": "No.",
        "explanation": "Installed parents and multipath configuration still matter.",
        "testedConcept": "Does dual-port SAS guarantee independent storage paths?"
      },
      {
        "questionId": "s6-g2-t1-Q03",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Two target paths share one expander. What risk persists?",
        "answer": "That common expander and its power path.",
        "explanation": "Port diversity is weaker than failure-domain diversity.",
        "testedConcept": "Two target paths share one expander. What risk persists?"
      },
      {
        "questionId": "s6-g2-t1-Q04",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What identifies the actual path for a SAS target?",
        "answer": "Initiator, expander/port, target identity and negotiated attachment.",
        "explanation": "A drive model label is incomplete topology evidence.",
        "testedConcept": "What identifies the actual path for a SAS target?"
      },
      {
        "questionId": "s6-g2-t1-Q05",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does discovering a SAS target establish data encryption?",
        "answer": "No.",
        "explanation": "Transport presence says nothing about encryption policy.",
        "testedConcept": "Does discovering a SAS target establish data encryption?"
      },
      {
        "questionId": "s6-g2-t1-Q06",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What distinguishes media performance from transport capacity?",
        "answer": "The drive workload rate and latency can be below the link envelope.",
        "explanation": "Fast links do not remove media limits.",
        "testedConcept": "What distinguishes media performance from transport capacity?"
      },
      {
        "questionId": "s6-g2-t1-Q07",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why retain enclosure support with drive choice?",
        "answer": "Backplane, firmware, format and supported combinations determine use.",
        "explanation": "Protocol family alone is insufficient compatibility evidence.",
        "testedConcept": "Why retain enclosure support with drive choice?"
      },
      {
        "questionId": "s6-g2-t1-Q08",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can a surviving path still fail the original application?",
        "answer": "Yes if target, policy, return path or host configuration is unusable.",
        "explanation": "Path presence is not a completed I/O transaction.",
        "testedConcept": "Can a surviving path still fail the original application?"
      },
      {
        "questionId": "s6-g2-t1-Q09",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does an expander introduce into capacity planning?",
        "answer": "A possible shared uplink bottleneck.",
        "explanation": "Summing device links can overstate aggregate bandwidth.",
        "testedConcept": "What does an expander introduce into capacity planning?"
      },
      {
        "questionId": "s6-g2-t1-Q10",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a SAS path recovery?",
        "answer": "Correct target identity, usable intended paths and original I/O integrity.",
        "explanation": "A link counter alone is insufficient.",
        "testedConcept": "What verifies a SAS path recovery?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g2-t1-QC1",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does dual-port SAS guarantee independent storage paths?",
        "answer": "No.",
        "explanation": "Installed parents and multipath configuration still matter.",
        "testedConcept": "Does dual-port SAS guarantee independent storage paths?"
      },
      {
        "questionId": "s6-g2-t1-QC2",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does discovering a SAS target establish data encryption?",
        "answer": "No.",
        "explanation": "Transport presence says nothing about encryption policy.",
        "testedConcept": "Does discovering a SAS target establish data encryption?"
      },
      {
        "questionId": "s6-g2-t1-QC3",
        "topicId": "s6-g2-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does an expander introduce into capacity planning?",
        "answer": "A possible shared uplink bottleneck.",
        "explanation": "Summing device links can overstate aggregate bandwidth.",
        "testedConcept": "What does an expander introduce into capacity planning?"
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
    "id": "s6-g2-t2",
    "batch": "15",
    "title": "SATA",
    "subtitle": "Identify drive protocol, media type, negotiated link and controller/backplane support.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g2-t2",
    "definition": "Serial ATA is a storage interface and command path commonly used for individual drives. Interface rate, connector form, flash or rotating media and failure-domain design are separate choices. A SATA SSD can be faster than a rotating SAS disk for some work without changing the protocol compatibility rules.",
    "purpose": "Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label.",
    "mental": "The host controller exchanges commands and data with a supported SATA target through the actual bay/controller path. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Declared power/cooling/mapping/software prerequisites plus a separately supplied service observation; no discovery, hardware or transaction is executed by this worksheet. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Interface: Host-to-drive protocol. Separate from media.",
      "Media: Flash or rotating storage. Changes latency/wear behavior.",
      "Installed path: Controller and bay. Needs negotiated support.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "The host controller exchanges commands and data with a supported SATA target through the actual bay/controller path.",
      "Queueing and drive behavior shape latency; the media can bottleneck well below the advertised interface rate.",
      "Conventional SATA drives do not inherently provide SAS-style native dual-port paths; supported enclosure/interposer designs require their own validation."
    ],
    "flow": [
      [
        "Map the original operation",
        "Serial ATA is a storage interface and command path commonly used for individual drives. Interface rate, connector form, flash or rotating media and failure-domain design are separate choices. A SATA SSD can be faster than a rotating SAS disk for some work without changing the protocol compatibility rules."
      ],
      [
        "Trace the first boundary",
        "The host controller exchanges commands and data with a supported SATA target through the actual bay/controller path."
      ],
      [
        "Evaluate installed conditions",
        "Queueing and drive behavior shape latency; the media can bottleneck well below the advertised interface rate."
      ],
      [
        "Verify capacity and recovery",
        "Conventional SATA drives do not inherently provide SAS-style native dual-port paths; supported enclosure/interposer designs require their own validation."
      ]
    ],
    "comparison": [
      [
        "Interface",
        "Host-to-drive protocol",
        "Separate from media."
      ],
      [
        "Media",
        "Flash or rotating storage",
        "Changes latency/wear behavior."
      ],
      [
        "Installed path",
        "Controller and bay",
        "Needs negotiated support."
      ]
    ],
    "example": "Case: Is 6 Gb/s SATA the same as 6 GB/s payload? Answer: No. Reason: Bytes differ by eight and protocol overhead remains. Case: Why is a SATA drive on a supported SAS controller not proof of reverse compatibility? Answer: The SAS controller may implement SATA support; a SATA controller lacks SAS protocol support. Reason: Compatibility is not symmetric. Case: Does a worn-out SSD prove tenant data is erased? Answer: No. Reason: Unreadability is not sanitization.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lsblk -o NAME,TYPE,SIZE",
        "explanation": "Observe only the fields reported by this exact command. Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label.",
        "expected": "Capture observer and timestamp. Correct path/member identity, redundancy state and original integrity/service tests. Drive discovery alone does not establish data recovery. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Can media type be inferred from SATA versus SAS alone?",
        "No. Both protocol families can attach different media types."
      ],
      [
        "Do conventional SATA drives inherently provide native SAS dual-port behavior?",
        "No. Special enclosure/interposer support must be validated separately."
      ],
      [
        "What is required before replacing a SATA array member?",
        "Exact physical identity, supported replacement attributes and recovery procedure. A same-size label is insufficient."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Apply data-at-rest policy, custody and approved sanitization. SSD wear and a failed read path do not prove erased secrets or an intact independent backup.",
    "performance": "Conventional SATA 6 Gb/s is a signaling label, not 6 GB/s useful throughput. Encoding, commands, media, queues and shared upstream paths reduce achieved payload rates.",
    "mistakes": [
      "The drive still speaks its supported protocol.",
      "Compatibility is not symmetric.",
      "Signaling rate is not a benchmark.",
      "Unreadability is not sanitization."
    ],
    "prerequisites": [
      "s0-g0-t6"
    ],
    "related": [
      "s6-g2-t3"
    ],
    "lab": {
      "objective": "Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → SATA boundary",
        "Interface → Media → Installed path",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Identify drive protocol, media type, negotiated link and controller/backplane support. Keep physical identity and backup/restore planning explicit; do not infer enterprise availability from a capacity or SSD label.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Interface, Media and Installed path. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. Conventional SATA drives do not inherently provide SAS-style native dual-port paths; supported enclosure/interposer designs require their own validation. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct path/member identity, redundancy state and original integrity/service tests. Drive discovery alone does not establish data recovery. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Interface → Media → Installed path. Special enclosure/interposer support must be validated separately. A same-size label is insufficient.",
      "challenge": "Does a worn-out SSD prove tenant data is erased? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Interface": "Host-to-drive protocol. Separate from media.",
      "Media": "Flash or rotating storage. Changes latency/wear behavior.",
      "Installed path": "Controller and bay. Needs negotiated support."
    },
    "sources": [
      {
        "title": "Seagate SAS interface manual — historical protocol reference",
        "url": "https://www.seagate.com/staticfiles/support/disc/manuals/Interface%20manuals/100293071c.pdf",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g2-t2-Q01",
        "topicId": "s6-g2-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Is 6 Gb/s SATA the same as 6 GB/s payload?",
        "answer": "No.",
        "explanation": "Bytes differ by eight and protocol overhead remains.",
        "testedConcept": "Is 6 Gb/s SATA the same as 6 GB/s payload?",
        "options": [
          "No.",
          "Yes; Gb/s and GB/s are interchangeable labels.",
          "Yes if the drive uses flash rather than rotating media.",
          "Yes after ignoring encoding, because no byte conversion is needed."
        ]
      },
      {
        "questionId": "s6-g2-t2-Q02",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a SATA SSD become SAS because it occupies a SAS-compatible bay?",
        "answer": "No.",
        "explanation": "The drive still speaks its supported protocol.",
        "testedConcept": "Does a SATA SSD become SAS because it occupies a SAS-compatible bay?"
      },
      {
        "questionId": "s6-g2-t2-Q03",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can media type be inferred from SATA versus SAS alone?",
        "answer": "No.",
        "explanation": "Both protocol families can attach different media types.",
        "testedConcept": "Can media type be inferred from SATA versus SAS alone?"
      },
      {
        "questionId": "s6-g2-t2-Q04",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why is a SATA drive on a supported SAS controller not proof of reverse compatibility?",
        "answer": "The SAS controller may implement SATA support; a SATA controller lacks SAS protocol support.",
        "explanation": "Compatibility is not symmetric.",
        "testedConcept": "Why is a SATA drive on a supported SAS controller not proof of reverse compatibility?"
      },
      {
        "questionId": "s6-g2-t2-Q05",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Do conventional SATA drives inherently provide native SAS dual-port behavior?",
        "answer": "No.",
        "explanation": "Special enclosure/interposer support must be validated separately.",
        "testedConcept": "Do conventional SATA drives inherently provide native SAS dual-port behavior?"
      },
      {
        "questionId": "s6-g2-t2-Q06",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What constrains throughput below an interface label?",
        "answer": "Media latency, queue behavior, encoding and shared upstream resources.",
        "explanation": "Signaling rate is not a benchmark.",
        "testedConcept": "What constrains throughput below an interface label?"
      },
      {
        "questionId": "s6-g2-t2-Q07",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why record negotiated link instead of only drive specification?",
        "answer": "The installed controller/cable path can operate at a lower rate.",
        "explanation": "Capability and actual attachment differ.",
        "testedConcept": "Why record negotiated link instead of only drive specification?"
      },
      {
        "questionId": "s6-g2-t2-Q08",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a worn-out SSD prove tenant data is erased?",
        "answer": "No.",
        "explanation": "Unreadability is not sanitization.",
        "testedConcept": "Does a worn-out SSD prove tenant data is erased?"
      },
      {
        "questionId": "s6-g2-t2-Q09",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is required before replacing a SATA array member?",
        "answer": "Exact physical identity, supported replacement attributes and recovery procedure.",
        "explanation": "A same-size label is insufficient.",
        "testedConcept": "What is required before replacing a SATA array member?"
      },
      {
        "questionId": "s6-g2-t2-Q10",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What completes recovery evidence?",
        "answer": "Correct path/member identity, redundancy state and original integrity/service tests.",
        "explanation": "Drive discovery alone does not establish data recovery.",
        "testedConcept": "What completes recovery evidence?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g2-t2-QC1",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a SATA SSD become SAS because it occupies a SAS-compatible bay?",
        "answer": "No.",
        "explanation": "The drive still speaks its supported protocol.",
        "testedConcept": "Does a SATA SSD become SAS because it occupies a SAS-compatible bay?"
      },
      {
        "questionId": "s6-g2-t2-QC2",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Do conventional SATA drives inherently provide native SAS dual-port behavior?",
        "answer": "No.",
        "explanation": "Special enclosure/interposer support must be validated separately.",
        "testedConcept": "Do conventional SATA drives inherently provide native SAS dual-port behavior?"
      },
      {
        "questionId": "s6-g2-t2-QC3",
        "topicId": "s6-g2-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is required before replacing a SATA array member?",
        "answer": "Exact physical identity, supported replacement attributes and recovery procedure.",
        "explanation": "A same-size label is insufficient.",
        "testedConcept": "What is required before replacing a SATA array member?"
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
    "id": "s6-g2-t3",
    "batch": "15",
    "title": "NVMe",
    "subtitle": "Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "dc-s6-g2-t3",
    "definition": "NVMe is a command/interface architecture for nonvolatile storage with queues designed for concurrent host operation. Local NVMe commonly uses PCIe transport; NVMe is neither a synonym for an M.2 shape nor limited to flash in one connector. NVMe over Fabrics is a different transport topic.",
    "purpose": "Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson.",
    "mental": "Host software discovers controllers and namespaces, then uses submission/completion queue pairs and supported interrupts/polling. Follow three separate questions: what does the component support, what is actually attached, and what did the original operation observe? Gen3/4/5 only, per direction, 128b/130b encoding; transaction overhead and endpoint/shared upstream limits excluded; Gen6 excluded. Name units, observer and assumptions before comparing a result to a target. A planning worksheet is a conditional calculation rather than a discovered device, physical measurement or supported installation procedure.",
    "components": [
      "Controller: NVMe command endpoint. Can expose namespaces.",
      "Namespace: Addressable storage object. Not a form factor.",
      "Transport: Command carriage. Local PCIe differs from NVMe-oF.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "Host software discovers controllers and namespaces, then uses submission/completion queue pairs and supported interrupts/polling.",
      "The controller exposes namespace storage independently of physical package shape; namespace identity is not simply a SATA-style bay number.",
      "PCIe negotiated width, shared switches, locality and media/controller behavior jointly limit local I/O; form-factor fit does not establish hot-plug or firmware support."
    ],
    "flow": [
      [
        "Map the original operation",
        "NVMe is a command/interface architecture for nonvolatile storage with queues designed for concurrent host operation. Local NVMe commonly uses PCIe transport; NVMe is neither a synonym for an M.2 shape nor limited to flash in one connector. NVMe over Fabrics is a different transport topic."
      ],
      [
        "Trace the first boundary",
        "Host software discovers controllers and namespaces, then uses submission/completion queue pairs and supported interrupts/polling."
      ],
      [
        "Evaluate installed conditions",
        "The controller exposes namespace storage independently of physical package shape; namespace identity is not simply a SATA-style bay number."
      ],
      [
        "Verify capacity and recovery",
        "PCIe negotiated width, shared switches, locality and media/controller behavior jointly limit local I/O; form-factor fit does not establish hot-plug or firmware support."
      ]
    ],
    "comparison": [
      [
        "Controller",
        "NVMe command endpoint",
        "Can expose namespaces."
      ],
      [
        "Namespace",
        "Addressable storage object",
        "Not a form factor."
      ],
      [
        "Transport",
        "Command carriage",
        "Local PCIe differs from NVMe-oF."
      ]
    ],
    "example": "Case: Does M.2 automatically mean NVMe? Answer: No. Reason: M.2 is a form factor and may carry other supported interfaces. Case: What bounds a local Gen3 x4 attachment before transaction overhead? Answer: About 31.51 Gb/s per direction. Reason: Apply the negotiated lane and encoding envelope. Case: Why map namespace identity to physical controller and bay? Answer: Logical namespace enumeration is not a reliable replaceable-unit label. Reason: Recovery needs the actual topology.",
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "commands": [
      {
        "filename": "read-only-observation.txt",
        "platform": "Ubuntu 24.04 read-only inspection",
        "code": "lsblk -o NAME,TYPE,SIZE",
        "explanation": "Observe only the fields reported by this exact command. Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson.",
        "expected": "Capture observer and timestamp. Correct controller/namespace identity and original integrity/application evidence. A controller appearing alone is insufficient. An inventory listing or workbook hash is not physical fault, throughput or vendor-session evidence."
      }
    ],
    "configuration": "Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson. Keep configuration intent, supported attachment and observed operation in separate columns. For any optional target, consult the exact chassis/firmware/controller or facility procedure, preserve a scoped baseline and prove independent recovery before changing exclusively owned state. Physical installation, energized electrical work, hardware removal, destructive storage creation/import and BMC configuration are guided and not executed here. Change only one supported boundary, inspect its expected failure, restore the exact prior state, and repeat the original service before closing recovery access.",
    "production": "Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson. Assign capacity and recovery ownership. Plan the surviving failure-state envelope rather than only healthy utilization; review dependencies on identity, name resolution, time, logging, power, cooling and upstream paths. Include service clearance, version support, monitored thresholds, replacement lead time and independent restore requirements. Reserve growth only within explicitly documented capacity and supported operations.",
    "troubleshooting": [
      [
        "Does NVMe always mean local PCIe transport?",
        "No; NVMe over Fabrics uses other transport arrangements. Command architecture and transport are separate."
      ],
      [
        "Can a physically fitting NVMe carrier be hot removed safely from any server?",
        "No. Chassis, firmware, OS and workload recovery support must be validated."
      ],
      [
        "Does a PCIe envelope prove achievable NVMe payload rate?",
        "No. Media, controller, transaction and software costs are excluded."
      ],
      [
        "Calculation and target disagree",
        "Check inputs, units, observer identity, exact supported topology and excluded mechanisms before modifying a target. Reproduce the original workload and retain both the failed and restored evidence."
      ]
    ],
    "security": "Namespace administration and firmware update are privileged destructive-capable boundaries. Protect identifiers and tenant mapping, validate supported sanitization and preserve independent recoverable copies.",
    "performance": "Multiple queues enable concurrency without guaranteeing low latency under every queue depth. The worksheet encoding envelope excludes transaction overhead, controller limits, media behavior and software scheduling.",
    "mistakes": [
      "It is not necessarily an entire physical package.",
      "Apply the negotiated lane and encoding envelope.",
      "Concurrency is not an unconditional latency benefit.",
      "Recovery needs the actual topology."
    ],
    "prerequisites": [
      "s0-g0-t3"
    ],
    "related": [
      "s6-g3-t0"
    ],
    "lab": {
      "objective": "Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson.",
      "requirements": "Browser for supplied-input calculations; read-only WSL inspection for the displayed observation. Guided hardware/vendor/facility work requires an isolated supported target, approved qualified procedure, exact owned baseline and independent recovery. No physical or vendor execution is inferred.",
      "topologyKind": "shared",
      "topology": [
        "Workload / observer → NVMe boundary",
        "Controller → Namespace → Transport",
        "Independent recovery → baseline / one-fault / exact restore"
      ],
      "steps": [
        "Record controller/namespace identity, transport, slot/bay mapping, negotiated PCIe path and supported firmware. Compare a Gen3/4/5 host envelope with demand and use read-only discovery; namespace creation/deletion is outside this lesson.",
        "Read the worksheet scope and predict the baseline result with units. Compare the fault case and name exactly which declared boundary changed. Keep source capability, installed topology and original service evidence separate.",
        "Create a topology/evidence table using Controller, Namespace and Transport. Record shared parents and observer identity; a guest inventory or management report may describe a different layer from physical hardware.",
        "Change one bounded input with the keyboard and reset it. Compare a different operating condition and explain why a model result can differ from an actual target. Invalid inputs must remove stale output.",
        "For a guided supported target, establish an independent recovery session and save the exact owned baseline before a change. PCIe negotiated width, shared switches, locality and media/controller behavior jointly limit local I/O; form-factor fit does not establish hot-plug or firmware support. No physical or vendor configuration is executed by selecting a browser case.",
        "Retain baseline, one-fault and exact-restore observations from the same operation and observer. Separate explicit rejection from timeout and separate discovery from completed work. A missing result can reflect a path, dependency, capacity, permission or service failure.",
        "Verify the original required operation and prohibited operation after restoration. Preserve redacted evidence and remove only owned fixtures; never overwrite a production baseline with an experimental configuration."
      ],
      "verification": "Correct controller/namespace identity and original integrity/application evidence. A controller appearing alone is insufficient. Verify original required and prohibited operations, correct unit-labelled capacity and retained scope. A timestamped calculation remains separate from a measured physical or original-service result.",
      "troubleshooting": "Controller → Namespace → Transport. Chassis, firmware, OS and workload recovery support must be validated. Media, controller, transaction and software costs are excluded.",
      "challenge": "Why map namespace identity to physical controller and bay? Explain the needed observer and why capability or inventory alone cannot settle it.",
      "cleanup": "Reset the worksheet. Restore exact owned configuration and verify the original required/prohibited operations before removing owned artifacts. Retain redacted evidence and an independent recoverable copy; do not alter host disks, energized power paths or unrelated services."
    },
    "glossary": {
      "Controller": "NVMe command endpoint. Can expose namespaces.",
      "Namespace": "Addressable storage object. Not a form factor.",
      "Transport": "Command carriage. Local PCIe differs from NVMe-oF."
    },
    "sources": [
      {
        "title": "NVM Express PCIe transport specification index",
        "url": "https://nvmexpress.org/specification/nvme-over-pcie-transport-specification/",
        "checked": "2026-10-09"
      },
      {
        "title": "PCI-SIG PCIe 3.0 encoding FAQ",
        "url": "https://pcisig.com/faq?field_category_value%5B%5D=pci_express_3.0",
        "checked": "2026-10-09"
      },
      {
        "title": "PCI-SIG Gen4/5 lane signaling rates",
        "url": "https://pcisig.com/blog/pushing-limits-understanding-lane-margining-pcie%C2%AE",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s6-g2-t3-Q01",
        "topicId": "s6-g2-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Does M.2 automatically mean NVMe?",
        "answer": "No.",
        "explanation": "M.2 is a form factor and may carry other supported interfaces.",
        "testedConcept": "Does M.2 automatically mean NVMe?",
        "options": [
          "Yes; every M.2 device necessarily speaks NVMe.",
          "Yes if the device stores data, regardless of host interface.",
          "No; M.2 storage can only use SATA and never PCIe.",
          "No."
        ]
      },
      {
        "questionId": "s6-g2-t3-Q02",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is an NVMe namespace?",
        "answer": "An addressable storage object exposed by a controller.",
        "explanation": "It is not necessarily an entire physical package.",
        "testedConcept": "What is an NVMe namespace?"
      },
      {
        "questionId": "s6-g2-t3-Q03",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does NVMe always mean local PCIe transport?",
        "answer": "No; NVMe over Fabrics uses other transport arrangements.",
        "explanation": "Command architecture and transport are separate.",
        "testedConcept": "Does NVMe always mean local PCIe transport?"
      },
      {
        "questionId": "s6-g2-t3-Q04",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What bounds a local Gen3 x4 attachment before transaction overhead?",
        "answer": "About 31.51 Gb/s per direction.",
        "explanation": "Apply the negotiated lane and encoding envelope.",
        "testedConcept": "What bounds a local Gen3 x4 attachment before transaction overhead?"
      },
      {
        "questionId": "s6-g2-t3-Q05",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a physically fitting NVMe carrier be hot removed safely from any server?",
        "answer": "No.",
        "explanation": "Chassis, firmware, OS and workload recovery support must be validated.",
        "testedConcept": "Can a physically fitting NVMe carrier be hot removed safely from any server?"
      },
      {
        "questionId": "s6-g2-t3-Q06",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why can increased queue depth raise latency?",
        "answer": "More outstanding work can wait behind device/controller service.",
        "explanation": "Concurrency is not an unconditional latency benefit.",
        "testedConcept": "Why can increased queue depth raise latency?"
      },
      {
        "questionId": "s6-g2-t3-Q07",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is dangerous about namespace administration?",
        "answer": "Creation/deletion can change or destroy storage ownership and data.",
        "explanation": "Observation does not authorize mutation.",
        "testedConcept": "What is dangerous about namespace administration?"
      },
      {
        "questionId": "s6-g2-t3-Q08",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why map namespace identity to physical controller and bay?",
        "answer": "Logical namespace enumeration is not a reliable replaceable-unit label.",
        "explanation": "Recovery needs the actual topology.",
        "testedConcept": "Why map namespace identity to physical controller and bay?"
      },
      {
        "questionId": "s6-g2-t3-Q09",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a PCIe envelope prove achievable NVMe payload rate?",
        "answer": "No.",
        "explanation": "Media, controller, transaction and software costs are excluded.",
        "testedConcept": "Does a PCIe envelope prove achievable NVMe payload rate?"
      },
      {
        "questionId": "s6-g2-t3-Q10",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies a local NVMe path repair?",
        "answer": "Correct controller/namespace identity and original integrity/application evidence.",
        "explanation": "A controller appearing alone is insufficient.",
        "testedConcept": "What verifies a local NVMe path repair?"
      }
    ],
    "quick": [
      {
        "questionId": "s6-g2-t3-QC1",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is an NVMe namespace?",
        "answer": "An addressable storage object exposed by a controller.",
        "explanation": "It is not necessarily an entire physical package.",
        "testedConcept": "What is an NVMe namespace?"
      },
      {
        "questionId": "s6-g2-t3-QC2",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a physically fitting NVMe carrier be hot removed safely from any server?",
        "answer": "No.",
        "explanation": "Chassis, firmware, OS and workload recovery support must be validated.",
        "testedConcept": "Can a physically fitting NVMe carrier be hot removed safely from any server?"
      },
      {
        "questionId": "s6-g2-t3-QC3",
        "topicId": "s6-g2-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a PCIe envelope prove achievable NVMe payload rate?",
        "answer": "No.",
        "explanation": "Media, controller, transaction and software costs are excluded.",
        "testedConcept": "Does a PCIe envelope prove achievable NVMe payload rate?"
      }
    ],
    "artifacts": [
      {
        "title": "Data Center Foundations design and evidence workbook",
        "path": "labs/data-center-workbook.md"
      }
    ]
  }
];
