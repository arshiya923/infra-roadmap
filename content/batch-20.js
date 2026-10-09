window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["20"] = [
  {
    "id": "s8-g3-t0",
    "batch": "20",
    "title": "Storage arrays",
    "subtitle": "A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g3-t0",
    "definition": "A storage array combines media, controllers, cache, protection and presentation services. Its logical volumes and front-end paths depend on shared allocation, power and software; multiple controllers do not guarantee every failure is survivable.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.",
    "mental": "Treat this lesson as a handoff between Pool, Protected cache, Controller ownership. Media is organized into a supported protection and allocation layout, with usable capacity reduced by redundancy and reserves. A successful earlier handoff cannot stand in for evidence at the next one. Path preference and failover are platform-specific. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Pool: Shared physical allocation domain. Thin logical promises can exceed its free space.",
      "Protected cache: Write buffering protected by a documented mechanism. Its health can change write policy.",
      "Controller ownership: Responsibility for serving a volume. Path preference and failover are platform-specific."
    ],
    "mechanism": [
      "Media is organized into a supported protection and allocation layout, with usable capacity reduced by redundancy and reserves.",
      "Controllers process requests, protect cache according to the write policy and expose logical objects through front-end ports.",
      "Host mappings, path policy and application durability requirements determine whether a nominally healthy array provides correct service."
    ],
    "flow": [
      [
        "Requested operation",
        "A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom."
      ],
      [
        "Pool",
        "Media is organized into a supported protection and allocation layout, with usable capacity reduced by redundancy and reserves."
      ],
      [
        "Protected cache",
        "Controllers process requests, protect cache according to the write policy and expose logical objects through front-end ports."
      ],
      [
        "Controller ownership",
        "Host mappings, path policy and application durability requirements determine whether a nominally healthy array provides correct service."
      ]
    ],
    "comparison": [
      [
        "Pool",
        "Shared physical allocation domain",
        "Thin logical promises can exceed its free space."
      ],
      [
        "Protected cache",
        "Write buffering protected by a documented mechanism",
        "Its health can change write policy."
      ],
      [
        "Controller ownership",
        "Responsibility for serving a volume",
        "Path preference and failover are platform-specific."
      ]
    ],
    "example": "Worked case: A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom. Fault: Hosts report logical free space while the backing pool approaches exhaustion. Diagnosis and recovery: Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes. Boundary check: How much physical headroom remains in the example? 3 TiB before other reserves or unaccounted overhead. Logical promises do not create capacity.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g3-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Hosts report logical free space while the backing pool approaches exhaustion. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes.",
    "production": "Assign ownership at each dependency boundary. Host mappings, path policy and application durability requirements determine whether a nominally healthy array provides correct service. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Thin logical promises can exceed its free space. Path preference and failover are platform-specific. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Controllers process requests, protect cache according to the write policy and expose logical objects through front-end ports. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.",
    "troubleshooting": [
      [
        "Hosts report logical free space while the backing pool approaches exhaustion.",
        "Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes."
      ],
      [
        "Why can cache protection failure change performance?",
        "The supported write policy may become more conservative. Acknowledgement safety and speed interact."
      ],
      [
        "What must a host failover plan include beyond controller count?",
        "Supported paths, mappings, access states, timeouts and an application verification. A parts list is not a recovery test."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Logical promises do not create capacity.",
      "Monitor both current and forecast usage.",
      "Acknowledgement safety and speed interact.",
      "Shared software and data remain failure domains.",
      "A parts list is not a recovery test.",
      "Availability and recoverability differ."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t8"
    ],
    "related": [
      "s8-g3-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Storage arrays. A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Pool → Shared physical allocation domain",
        "Protected cache → Write buffering protected by a documented mechanism",
        "Controller ownership → Responsibility for serving a volume"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Hosts report logical free space while the backing pool approaches exhaustion. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Hosts report logical free space while the backing pool approaches exhaustion. No.",
      "challenge": "Why retain an independent recovery copy? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Pool": "Shared physical allocation domain. Thin logical promises can exceed its free space.",
      "Protected cache": "Write buffering protected by a documented mechanism. Its health can change write policy.",
      "Controller ownership": "Responsibility for serving a volume. Path preference and failover are platform-specific."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      },
      {
        "title": "HPE MSA 1060/2060/2062 management guide",
        "url": "https://support.hpe.com/hpesc/public/api/document/a00128580en_us",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g3-t0-QC1",
        "topicId": "s8-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Storage arrays case?",
        "answer": "A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Pool"
      },
      {
        "questionId": "s8-g3-t0-QC2",
        "topicId": "s8-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Storage arrays.",
        "answer": "Controllers process requests, protect cache according to the write policy and expose logical objects through front-end ports.",
        "explanation": "Its health can change write policy.",
        "testedConcept": "Protected cache"
      },
      {
        "questionId": "s8-g3-t0-QC3",
        "topicId": "s8-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Controller ownership matters here?",
        "answer": "Path preference and failover are platform-specific.",
        "explanation": "Host mappings, path policy and application durability requirements determine whether a nominally healthy array provides correct service.",
        "testedConcept": "Controller ownership"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g3-t0-Q1",
        "topicId": "s8-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How much physical headroom remains in the example?",
        "answer": "3 TiB before other reserves or unaccounted overhead.",
        "explanation": "Logical promises do not create capacity.",
        "testedConcept": "Pool"
      },
      {
        "questionId": "s8-g3-t0-Q2",
        "topicId": "s8-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does 12 TiB promised on 10 TiB usable necessarily mean immediate failure?",
        "answer": "No; risk depends on actual allocation and growth, but commitments exceed physical capacity.",
        "explanation": "Monitor both current and forecast usage.",
        "testedConcept": "Protected cache"
      },
      {
        "questionId": "s8-g3-t0-Q3",
        "topicId": "s8-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can cache protection failure change performance?",
        "answer": "The supported write policy may become more conservative.",
        "explanation": "Acknowledgement safety and speed interact.",
        "testedConcept": "Controller ownership"
      },
      {
        "questionId": "s8-g3-t0-Q4",
        "topicId": "s8-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Do two controllers make array firmware corruption impossible?",
        "answer": "No.",
        "explanation": "Shared software and data remain failure domains.",
        "testedConcept": "Pool"
      },
      {
        "questionId": "s8-g3-t0-Q5",
        "topicId": "s8-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must a host failover plan include beyond controller count?",
        "answer": "Supported paths, mappings, access states, timeouts and an application verification.",
        "explanation": "A parts list is not a recovery test.",
        "testedConcept": "Protected cache"
      },
      {
        "questionId": "s8-g3-t0-Q6",
        "topicId": "s8-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why retain an independent recovery copy?",
        "answer": "Array redundancy can preserve corrupted or deleted data just as faithfully as valid data.",
        "explanation": "Availability and recoverability differ.",
        "testedConcept": "Controller ownership"
      },
      {
        "questionId": "s8-g3-t0-Q7",
        "topicId": "s8-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Storage arrays incident, which assumption failed?",
        "answer": "Hosts report logical free space while the backing pool approaches exhaustion.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g3-t0-Q8",
        "topicId": "s8-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Storage arrays incident?",
        "answer": "Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g3-t0-Q9",
        "topicId": "s8-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Pool and Protected cache.",
        "answer": "Shared physical allocation domain. Write buffering protected by a documented mechanism.",
        "explanation": "Thin logical promises can exceed its free space. Its health can change write policy.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g3-t0-Q10",
        "topicId": "s8-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Storage arrays worksheet leave unverified?",
        "answer": "Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "io",
      "baseline": "A thin pool has 10 TiB usable, 7 TiB allocated and 12 TiB promised across volumes; growth must be monitored against the 3 TiB physical headroom.",
      "fault": "Hosts report logical free space while the backing pool approaches exhaustion.",
      "restore": "Reconcile actual pool allocation, snapshot growth and commitments; apply a supported capacity or retention change and verify original writes without deleting unknown volumes.",
      "scope": "Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g3-t1",
    "batch": "20",
    "title": "HPE MSA",
    "subtitle": "A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g3-t1",
    "definition": "HPE MSA is a storage-array family. This lesson uses the 1060/2060/2062 management concepts: pools and volumes, initiator/host mappings, controller ownership and supported host multipathing; it does not generalize every generation or firmware feature.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.",
    "mental": "Treat this lesson as a handoff between MSA volume, Host object, Optimized path. Create a documented pool/volume design using the exact controller and disk support matrix. A successful earlier handoff cannot stand in for evidence at the next one. A second path is not automatically equivalent performance. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "MSA volume: Logical capacity exposed to hosts. Pool health and allocation remain shared.",
      "Host object: Grouping of initiators for a server. An incorrect member can expose data.",
      "Optimized path: Preferred route relative to ownership. A second path is not automatically equivalent performance."
    ],
    "mechanism": [
      "Create a documented pool/volume design using the exact controller and disk support matrix.",
      "Group the intended initiators into the correct host context and map only the required volume.",
      "Compare controller ownership and optimized path behavior with the supported host configuration before validating application I/O."
    ],
    "flow": [
      [
        "Requested operation",
        "A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric."
      ],
      [
        "MSA volume",
        "Create a documented pool/volume design using the exact controller and disk support matrix."
      ],
      [
        "Host object",
        "Group the intended initiators into the correct host context and map only the required volume."
      ],
      [
        "Optimized path",
        "Compare controller ownership and optimized path behavior with the supported host configuration before validating application I/O."
      ]
    ],
    "comparison": [
      [
        "MSA volume",
        "Logical capacity exposed to hosts",
        "Pool health and allocation remain shared."
      ],
      [
        "Host object",
        "Grouping of initiators for a server",
        "An incorrect member can expose data."
      ],
      [
        "Optimized path",
        "Preferred route relative to ownership",
        "A second path is not automatically equivalent performance."
      ]
    ],
    "example": "Worked case: A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric. Fault: The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling. Diagnosis and recovery: Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B. Boundary check: Which product scope is used here? MSA 1060/2060/2062 management concepts. Check the exact installed firmware for procedures.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g3-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B.",
    "production": "Assign ownership at each dependency boundary. Compare controller ownership and optimized path behavior with the supported host configuration before validating application I/O. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Pool health and allocation remain shared. A second path is not automatically equivalent performance. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Group the intended initiators into the correct host context and map only the required volume. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling.",
        "Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B."
      ],
      [
        "What can a missing B initiator mapping cause?",
        "Access failure when Fabric A is lost. Redundant hardware needs matching policy."
      ],
      [
        "Does adding another pool create an independent array backup?",
        "No. Controllers, enclosure and administration can remain shared."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Check the exact installed firmware for procedures.",
      "Cabling alone does not grant access.",
      "Redundant hardware needs matching policy.",
      "Not every live route has equal preferred status.",
      "Controllers, enclosure and administration can remain shared.",
      "A newly visible disk of the same size is not sufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g3-t0"
    ],
    "related": [
      "s8-g3-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for HPE MSA. A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "MSA volume → Logical capacity exposed to hosts",
        "Host object → Grouping of initiators for a server",
        "Optimized path → Preferred route relative to ownership"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling. Optimized access can depend on volume ownership.",
      "challenge": "What identifies the repaired volume? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "MSA volume": "Logical capacity exposed to hosts. Pool health and allocation remain shared.",
      "Host object": "Grouping of initiators for a server. An incorrect member can expose data.",
      "Optimized path": "Preferred route relative to ownership. A second path is not automatically equivalent performance."
    },
    "sources": [
      {
        "title": "HPE MSA 1060/2060/2062 management guide",
        "url": "https://support.hpe.com/hpesc/public/api/document/a00128580en_us",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g3-t1-QC1",
        "topicId": "s8-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this HPE MSA case?",
        "answer": "A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "MSA volume"
      },
      {
        "questionId": "s8-g3-t1-QC2",
        "topicId": "s8-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for HPE MSA.",
        "answer": "Group the intended initiators into the correct host context and map only the required volume.",
        "explanation": "An incorrect member can expose data.",
        "testedConcept": "Host object"
      },
      {
        "questionId": "s8-g3-t1-QC3",
        "topicId": "s8-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Optimized path matters here?",
        "answer": "A second path is not automatically equivalent performance.",
        "explanation": "Compare controller ownership and optimized path behavior with the supported host configuration before validating application I/O.",
        "testedConcept": "Optimized path"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g3-t1-Q1",
        "topicId": "s8-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which product scope is used here?",
        "answer": "MSA 1060/2060/2062 management concepts.",
        "explanation": "Check the exact installed firmware for procedures.",
        "testedConcept": "MSA volume"
      },
      {
        "questionId": "s8-g3-t1-Q2",
        "topicId": "s8-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why group both intended initiators into the correct host record?",
        "answer": "The mapping must authorize the host over its required paths.",
        "explanation": "Cabling alone does not grant access.",
        "testedConcept": "Host object"
      },
      {
        "questionId": "s8-g3-t1-Q3",
        "topicId": "s8-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can a missing B initiator mapping cause?",
        "answer": "Access failure when Fabric A is lost.",
        "explanation": "Redundant hardware needs matching policy.",
        "testedConcept": "Optimized path"
      },
      {
        "questionId": "s8-g3-t1-Q4",
        "topicId": "s8-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect controller ownership with path state?",
        "answer": "Optimized access can depend on volume ownership.",
        "explanation": "Not every live route has equal preferred status.",
        "testedConcept": "MSA volume"
      },
      {
        "questionId": "s8-g3-t1-Q5",
        "topicId": "s8-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does adding another pool create an independent array backup?",
        "answer": "No.",
        "explanation": "Controllers, enclosure and administration can remain shared.",
        "testedConcept": "Host object"
      },
      {
        "questionId": "s8-g3-t1-Q6",
        "topicId": "s8-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What identifies the repaired volume?",
        "answer": "The original stable device identity and verified owned test data.",
        "explanation": "A newly visible disk of the same size is not sufficient.",
        "testedConcept": "Optimized path"
      },
      {
        "questionId": "s8-g3-t1-Q7",
        "topicId": "s8-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the HPE MSA incident, which assumption failed?",
        "answer": "The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g3-t1-Q8",
        "topicId": "s8-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the HPE MSA incident?",
        "answer": "Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g3-t1-Q9",
        "topicId": "s8-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast MSA volume and Host object.",
        "answer": "Logical capacity exposed to hosts. Grouping of initiators for a server.",
        "explanation": "Pool health and allocation remain shared. An incorrect member can expose data.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g3-t1-Q10",
        "topicId": "s8-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this HPE MSA worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A dual-controller MSA presents one training volume to a host with one initiator in each independent fabric.",
      "fault": "The host object contains only the Fabric A initiator, so losing A removes access despite healthy B cabling.",
      "restore": "Compare actual initiator inventory to the approved MSA host and volume mapping; restore the missing intended identity and verify the same volume through B.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g3-t2",
    "batch": "20",
    "title": "Dell EMC concepts",
    "subtitle": "A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g3-t2",
    "definition": "Dell EMC names a broad storage portfolio, not one interchangeable configuration model. This lesson uses PowerStore block-volume and host-mapping concepts as a concrete example; Unity, PowerMax and other families require their own manuals.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.",
    "mental": "Treat this lesson as a handoff between PowerStore volume, Host group, Protection policy. Identify the exact product and release before selecting its storage object model and supported front-end transport. A successful earlier handoff cannot stand in for evidence at the next one. A configured policy is not proof of a successful restore. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "PowerStore volume: Logical block resource. Supported protocols vary with platform/release.",
      "Host group: Set of hosts used for presentation. Membership changes can broaden access.",
      "Protection policy: Rules associated with a resource. A configured policy is not proof of a successful restore."
    ],
    "mechanism": [
      "Identify the exact product and release before selecting its storage object model and supported front-end transport.",
      "Create or inspect the intended volume and associate it with the correct host/host group.",
      "Track logical allocation, protection policy and host-visible identity; local snapshots and remote recovery have different failure scopes."
    ],
    "flow": [
      [
        "Requested operation",
        "A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group."
      ],
      [
        "PowerStore volume",
        "Identify the exact product and release before selecting its storage object model and supported front-end transport."
      ],
      [
        "Host group",
        "Create or inspect the intended volume and associate it with the correct host/host group."
      ],
      [
        "Protection policy",
        "Track logical allocation, protection policy and host-visible identity; local snapshots and remote recovery have different failure scopes."
      ]
    ],
    "comparison": [
      [
        "PowerStore volume",
        "Logical block resource",
        "Supported protocols vary with platform/release."
      ],
      [
        "Host group",
        "Set of hosts used for presentation",
        "Membership changes can broaden access."
      ],
      [
        "Protection policy",
        "Rules associated with a resource",
        "A configured policy is not proof of a successful restore."
      ]
    ],
    "example": "Worked case: A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group. Fault: The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host. Diagnosis and recovery: Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not. Boundary check: Why is Dell EMC alone insufficient for a command recipe? It covers distinct product families. Use the exact product and release.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g3-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not.",
    "production": "Assign ownership at each dependency boundary. Track logical allocation, protection policy and host-visible identity; local snapshots and remote recovery have different failure scopes. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Supported protocols vary with platform/release. A configured policy is not proof of a successful restore. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Create or inspect the intended volume and associate it with the correct host/host group. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host.",
        "Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not."
      ],
      [
        "Can a healthy array still have a severe access defect?",
        "Yes; incorrect mapping can expose data. Availability is not authorization correctness."
      ],
      [
        "Does assigning a protection policy establish recoverability?",
        "No; executions, retention and restore validation are separate. Configured intent can fail at runtime."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Use the exact product and release.",
      "Other families have different object models and procedures.",
      "Availability is not authorization correctness.",
      "A familiar group name is not proof.",
      "Configured intent can fail at runtime.",
      "Positive and negative tests are both required."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g3-t1"
    ],
    "related": [
      "s8-g3-t3"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Dell EMC concepts. A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "PowerStore volume → Logical block resource",
        "Host group → Set of hosts used for presentation",
        "Protection policy → Rules associated with a resource"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host. Actual initiator identities and approved workload ownership.",
      "challenge": "What verifies the exposure repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "PowerStore volume": "Logical block resource. Supported protocols vary with platform/release.",
      "Host group": "Set of hosts used for presentation. Membership changes can broaden access.",
      "Protection policy": "Rules associated with a resource. A configured policy is not proof of a successful restore."
    },
    "sources": [
      {
        "title": "Dell PowerStore: volumes",
        "url": "https://www.dell.com/support/manuals/en-ie/powerstore-5000/pwrstr-cfg-vols/volumes?guid=guid-27435c56-5a18-491e-9f73-0e09b36541b1&lang=en-us",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g3-t2-QC1",
        "topicId": "s8-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Dell EMC concepts case?",
        "answer": "A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "PowerStore volume"
      },
      {
        "questionId": "s8-g3-t2-QC2",
        "topicId": "s8-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Dell EMC concepts.",
        "answer": "Create or inspect the intended volume and associate it with the correct host/host group.",
        "explanation": "Membership changes can broaden access.",
        "testedConcept": "Host group"
      },
      {
        "questionId": "s8-g3-t2-QC3",
        "topicId": "s8-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Protection policy matters here?",
        "answer": "A configured policy is not proof of a successful restore.",
        "explanation": "Track logical allocation, protection policy and host-visible identity; local snapshots and remote recovery have different failure scopes.",
        "testedConcept": "Protection policy"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g3-t2-Q1",
        "topicId": "s8-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why is Dell EMC alone insufficient for a command recipe?",
        "answer": "It covers distinct product families.",
        "explanation": "Use the exact product and release.",
        "testedConcept": "PowerStore volume"
      },
      {
        "questionId": "s8-g3-t2-Q2",
        "topicId": "s8-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which concrete family anchors this lesson?",
        "answer": "PowerStore.",
        "explanation": "Other families have different object models and procedures.",
        "testedConcept": "Host group"
      },
      {
        "questionId": "s8-g3-t2-Q3",
        "topicId": "s8-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a healthy array still have a severe access defect?",
        "answer": "Yes; incorrect mapping can expose data.",
        "explanation": "Availability is not authorization correctness.",
        "testedConcept": "Protection policy"
      },
      {
        "questionId": "s8-g3-t2-Q4",
        "topicId": "s8-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a host-group membership review compare?",
        "answer": "Actual initiator identities and approved workload ownership.",
        "explanation": "A familiar group name is not proof.",
        "testedConcept": "PowerStore volume"
      },
      {
        "questionId": "s8-g3-t2-Q5",
        "topicId": "s8-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does assigning a protection policy establish recoverability?",
        "answer": "No; executions, retention and restore validation are separate.",
        "explanation": "Configured intent can fail at runtime.",
        "testedConcept": "Host group"
      },
      {
        "questionId": "s8-g3-t2-Q6",
        "topicId": "s8-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What verifies the exposure repair?",
        "answer": "Authorized cluster access continues and the excluded host loses access.",
        "explanation": "Positive and negative tests are both required.",
        "testedConcept": "Protection policy"
      },
      {
        "questionId": "s8-g3-t2-Q7",
        "topicId": "s8-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Dell EMC concepts incident, which assumption failed?",
        "answer": "The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g3-t2-Q8",
        "topicId": "s8-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Dell EMC concepts incident?",
        "answer": "Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g3-t2-Q9",
        "topicId": "s8-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast PowerStore volume and Host group.",
        "answer": "Logical block resource. Set of hosts used for presentation.",
        "explanation": "Supported protocols vary with platform/release. Membership changes can broaden access.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g3-t2-Q10",
        "topicId": "s8-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Dell EMC concepts worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A PowerStore volume intended for a three-host cluster is accidentally mapped to a fourth unrelated host group.",
      "fault": "The array is healthy and all I/O succeeds, but a presentation error exposes protected data to an unrelated host.",
      "restore": "Retain the mapping evidence, remove only the unauthorized association under the approved procedure, and prove the intended cluster retains access while the unrelated host does not.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g3-t3",
    "batch": "20",
    "title": "NetApp concepts",
    "subtitle": "One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g3-t3",
    "definition": "NetApp ONTAP separates storage virtual machines, volumes, logical interfaces and protocol-specific presentation. In a SAN example, an igroup associates initiators with LUN mappings; NAS access uses a different export/share policy layer.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.",
    "mental": "Treat this lesson as a handoff between SVM, LIF, Igroup. An SVM supplies protocol and namespace context while volumes contain data objects. A successful earlier handoff cannot stand in for evidence at the next one. It is not an NFS export rule. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "SVM: Storage virtual machine providing a logical service context. It shares cluster hardware.",
      "LIF: Logical network or storage interface. Its identity and role depend on protocol.",
      "Igroup: Initiator group for LUN mapping. It is not an NFS export rule."
    ],
    "mechanism": [
      "An SVM supplies protocol and namespace context while volumes contain data objects.",
      "FC or iSCSI logical interfaces provide access endpoints; zoning and network reachability establish only the path.",
      "The LUN map and igroup membership authorize SAN presentation, and host multipath behavior must match the supported ONTAP design."
    ],
    "flow": [
      [
        "Requested operation",
        "One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS."
      ],
      [
        "SVM",
        "An SVM supplies protocol and namespace context while volumes contain data objects."
      ],
      [
        "LIF",
        "FC or iSCSI logical interfaces provide access endpoints; zoning and network reachability establish only the path."
      ],
      [
        "Igroup",
        "The LUN map and igroup membership authorize SAN presentation, and host multipath behavior must match the supported ONTAP design."
      ]
    ],
    "comparison": [
      [
        "SVM",
        "Storage virtual machine providing a logical service context",
        "It shares cluster hardware."
      ],
      [
        "LIF",
        "Logical network or storage interface",
        "Its identity and role depend on protocol."
      ],
      [
        "Igroup",
        "Initiator group for LUN mapping",
        "It is not an NFS export rule."
      ]
    ],
    "example": "Worked case: One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS. Fault: A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged. Diagnosis and recovery: Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access. Boundary check: Does an igroup authorize NFS clients? No; it serves SAN initiator mapping. NAS uses protocol-specific access policy.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g3-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access.",
    "production": "Assign ownership at each dependency boundary. The LUN map and igroup membership authorize SAN presentation, and host multipath behavior must match the supported ONTAP design. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It shares cluster hardware. It is not an NFS export rule. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. FC or iSCSI logical interfaces provide access endpoints; zoning and network reachability establish only the path. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged.",
        "Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access."
      ],
      [
        "Is a LIF necessarily a physical Ethernet port?",
        "No; it is a logical interface with a protocol role. Do not confuse logical and physical identity."
      ],
      [
        "Why identify protocol before changing policy?",
        "SAN and NAS authorization objects differ. Repairing the wrong policy cannot fix the boundary."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "NAS uses protocol-specific access policy.",
      "Physical cluster dependencies remain.",
      "Do not confuse logical and physical identity.",
      "Fabric communication alone is insufficient.",
      "Repairing the wrong policy cannot fix the boundary.",
      "Controller status is not application proof."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g3-t2"
    ],
    "related": [
      "s8-g4-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for NetApp concepts. One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "SVM → Storage virtual machine providing a logical service context",
        "LIF → Logical network or storage interface",
        "Igroup → Initiator group for LUN mapping"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged. The intended ONTAP SAN mapping and host discovery.",
      "challenge": "What evidence closes the incident? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "SVM": "Storage virtual machine providing a logical service context. It shares cluster hardware.",
      "LIF": "Logical network or storage interface. Its identity and role depend on protocol.",
      "Igroup": "Initiator group for LUN mapping. It is not an NFS export rule."
    },
    "sources": [
      {
        "title": "ONTAP FC SAN provisioning",
        "url": "https://docs.netapp.com/us-en/ontap/san-admin/san-provisioning-fc-concept.html",
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
        "questionId": "s8-g3-t3-QC1",
        "topicId": "s8-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this NetApp concepts case?",
        "answer": "One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "SVM"
      },
      {
        "questionId": "s8-g3-t3-QC2",
        "topicId": "s8-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for NetApp concepts.",
        "answer": "FC or iSCSI logical interfaces provide access endpoints; zoning and network reachability establish only the path.",
        "explanation": "Its identity and role depend on protocol.",
        "testedConcept": "LIF"
      },
      {
        "questionId": "s8-g3-t3-QC3",
        "topicId": "s8-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Igroup matters here?",
        "answer": "It is not an NFS export rule.",
        "explanation": "The LUN map and igroup membership authorize SAN presentation, and host multipath behavior must match the supported ONTAP design.",
        "testedConcept": "Igroup"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g3-t3-Q1",
        "topicId": "s8-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an igroup authorize NFS clients?",
        "answer": "No; it serves SAN initiator mapping.",
        "explanation": "NAS uses protocol-specific access policy.",
        "testedConcept": "SVM"
      },
      {
        "questionId": "s8-g3-t3-Q2",
        "topicId": "s8-g3-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does an SVM separate?",
        "answer": "Logical storage service context and administration within its supported scope.",
        "explanation": "Physical cluster dependencies remain.",
        "testedConcept": "LIF"
      },
      {
        "questionId": "s8-g3-t3-Q3",
        "topicId": "s8-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is a LIF necessarily a physical Ethernet port?",
        "answer": "No; it is a logical interface with a protocol role.",
        "explanation": "Do not confuse logical and physical identity.",
        "testedConcept": "Igroup"
      },
      {
        "questionId": "s8-g3-t3-Q4",
        "topicId": "s8-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which layer follows successful FC zoning for LUN visibility?",
        "answer": "The intended ONTAP SAN mapping and host discovery.",
        "explanation": "Fabric communication alone is insufficient.",
        "testedConcept": "SVM"
      },
      {
        "questionId": "s8-g3-t3-Q5",
        "topicId": "s8-g3-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why identify protocol before changing policy?",
        "answer": "SAN and NAS authorization objects differ.",
        "explanation": "Repairing the wrong policy cannot fix the boundary.",
        "testedConcept": "LIF"
      },
      {
        "questionId": "s8-g3-t3-Q6",
        "topicId": "s8-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence closes the incident?",
        "answer": "Correct initiator-to-LUN mapping and verified host I/O, with unrelated access preserved.",
        "explanation": "Controller status is not application proof.",
        "testedConcept": "Igroup"
      },
      {
        "questionId": "s8-g3-t3-Q7",
        "topicId": "s8-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the NetApp concepts incident, which assumption failed?",
        "answer": "A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g3-t3-Q8",
        "topicId": "s8-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the NetApp concepts incident?",
        "answer": "Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g3-t3-Q9",
        "topicId": "s8-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast SVM and LIF.",
        "answer": "Storage virtual machine providing a logical service context. Logical network or storage interface.",
        "explanation": "It shares cluster hardware. Its identity and role depend on protocol.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g3-t3-Q10",
        "topicId": "s8-g3-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this NetApp concepts worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "One SVM presents a LUN to a three-host cluster while a different dataset is exported through NFS.",
      "fault": "A SAN access issue is investigated by changing an NFS export policy, leaving the incorrect igroup unchanged.",
      "restore": "Identify the protocol and SVM first, reconcile the actual initiator with the SAN LUN map, and verify the intended device without altering unrelated NAS access.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g4-t0",
    "batch": "20",
    "title": "Hypervisor",
    "subtitle": "Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g4-t0",
    "definition": "A hypervisor virtualizes execution and resource access for guest operating systems. Virtual CPUs, memory and devices are abstractions scheduled or backed by physical resources; isolation and overcommit depend on configuration and workload.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.",
    "mental": "Treat this lesson as a handoff between vCPU, Guest memory, Virtual device. The hypervisor schedules virtual CPUs onto physical execution resources and manages guest address translation. A successful earlier handoff cannot stand in for evidence at the next one. Its path can include shared host queues. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "vCPU: Guest-visible scheduled CPU resource. It is not a dedicated physical core by default.",
      "Guest memory: Memory presented to the VM. Backing and reclamation policy affect performance.",
      "Virtual device: Guest I/O interface. Its path can include shared host queues."
    ],
    "mechanism": [
      "The hypervisor schedules virtual CPUs onto physical execution resources and manages guest address translation.",
      "Virtual device paths use emulation, paravirtualization or supported passthrough to reach host I/O.",
      "Resource limits, contention and shared dependencies shape guest performance and failure behavior."
    ],
    "flow": [
      [
        "Requested operation",
        "Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level."
      ],
      [
        "vCPU",
        "The hypervisor schedules virtual CPUs onto physical execution resources and manages guest address translation."
      ],
      [
        "Guest memory",
        "Virtual device paths use emulation, paravirtualization or supported passthrough to reach host I/O."
      ],
      [
        "Virtual device",
        "Resource limits, contention and shared dependencies shape guest performance and failure behavior."
      ]
    ],
    "comparison": [
      [
        "vCPU",
        "Guest-visible scheduled CPU resource",
        "It is not a dedicated physical core by default."
      ],
      [
        "Guest memory",
        "Memory presented to the VM",
        "Backing and reclamation policy affect performance."
      ],
      [
        "Virtual device",
        "Guest I/O interface",
        "Its path can include shared host queues."
      ]
    ],
    "example": "Worked case: Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level. Fault: An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay. Diagnosis and recovery: Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload. Boundary check: Does one vCPU imply one permanently dedicated core? No. Scheduling policy controls backing.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g4-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload.",
    "production": "Assign ownership at each dependency boundary. Resource limits, contention and shared dependencies shape guest performance and failure behavior. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It is not a dedicated physical core by default. Its path can include shared host queues. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Virtual device paths use emulation, paravirtualization or supported passthrough to reach host I/O. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay.",
        "Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload."
      ],
      [
        "Does aggregate memory fit prove every VM can be placed?",
        "No; individual size and constraints can block placement. Bin packing is stricter than a total sum."
      ],
      [
        "Are guests independent of a shared host failure?",
        "No. Isolation is not failure-domain separation."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Scheduling policy controls backing.",
      "This ignores per-VM placement constraints and other bottlenecks.",
      "Bin packing is stricter than a total sum.",
      "Measure instead of sizing by intuition.",
      "Isolation is not failure-domain separation.",
      "A larger configured number is not evidence of improvement."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g3-t3"
    ],
    "related": [
      "s8-g4-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Hypervisor. Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "vCPU → Guest-visible scheduled CPU resource",
        "Guest memory → Memory presented to the VM",
        "Virtual device → Guest I/O interface"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay. Scheduling and workload parallelism can make extra allocation ineffective or costly.",
      "challenge": "What should accompany a resource tuning change? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "vCPU": "Guest-visible scheduled CPU resource. It is not a dedicated physical core by default.",
      "Guest memory": "Memory presented to the VM. Backing and reclamation policy affect performance.",
      "Virtual device": "Guest I/O interface. Its path can include shared host queues."
    },
    "sources": [
      {
        "title": "RHEL 9 virtualization architecture and operations",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_and_managing_virtualization/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g4-t0-QC1",
        "topicId": "s8-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Hypervisor case?",
        "answer": "Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "vCPU"
      },
      {
        "questionId": "s8-g4-t0-QC2",
        "topicId": "s8-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Hypervisor.",
        "answer": "Virtual device paths use emulation, paravirtualization or supported passthrough to reach host I/O.",
        "explanation": "Backing and reclamation policy affect performance.",
        "testedConcept": "Guest memory"
      },
      {
        "questionId": "s8-g4-t0-QC3",
        "topicId": "s8-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Virtual device matters here?",
        "answer": "Its path can include shared host queues.",
        "explanation": "Resource limits, contention and shared dependencies shape guest performance and failure behavior.",
        "testedConcept": "Virtual device"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g4-t0-Q1",
        "topicId": "s8-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does one vCPU imply one permanently dedicated core?",
        "answer": "No.",
        "explanation": "Scheduling policy controls backing.",
        "testedConcept": "vCPU"
      },
      {
        "questionId": "s8-g4-t0-Q2",
        "topicId": "s8-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How much aggregate memory remains after one host loss in the example?",
        "answer": "224 GiB: two times 112 GiB.",
        "explanation": "This ignores per-VM placement constraints and other bottlenecks.",
        "testedConcept": "Guest memory"
      },
      {
        "questionId": "s8-g4-t0-Q3",
        "topicId": "s8-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does aggregate memory fit prove every VM can be placed?",
        "answer": "No; individual size and constraints can block placement.",
        "explanation": "Bin packing is stricter than a total sum.",
        "testedConcept": "Virtual device"
      },
      {
        "questionId": "s8-g4-t0-Q4",
        "topicId": "s8-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can more vCPUs hurt a workload?",
        "answer": "Scheduling and workload parallelism can make extra allocation ineffective or costly.",
        "explanation": "Measure instead of sizing by intuition.",
        "testedConcept": "vCPU"
      },
      {
        "questionId": "s8-g4-t0-Q5",
        "topicId": "s8-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Are guests independent of a shared host failure?",
        "answer": "No.",
        "explanation": "Isolation is not failure-domain separation.",
        "testedConcept": "Guest memory"
      },
      {
        "questionId": "s8-g4-t0-Q6",
        "topicId": "s8-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What should accompany a resource tuning change?",
        "answer": "Comparable demand, latency and contention measurements before and after.",
        "explanation": "A larger configured number is not evidence of improvement.",
        "testedConcept": "Virtual device"
      },
      {
        "questionId": "s8-g4-t0-Q7",
        "topicId": "s8-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Hypervisor incident, which assumption failed?",
        "answer": "An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g4-t0-Q8",
        "topicId": "s8-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Hypervisor incident?",
        "answer": "Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g4-t0-Q9",
        "topicId": "s8-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast vCPU and Guest memory.",
        "answer": "Guest-visible scheduled CPU resource. Memory presented to the VM.",
        "explanation": "It is not a dedicated physical core by default. Backing and reclamation policy affect performance.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g4-t0-Q10",
        "topicId": "s8-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Hypervisor worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "Three hosts each provide 128 GiB with 16 GiB reserved per available host; 180 GiB aggregate workload demand fits after one host loss at the aggregate level.",
      "fault": "An operator allocates many vCPUs to a stalled VM without checking host contention or CPU scheduling delay.",
      "restore": "Compare guest demand with host scheduling, memory pressure and I/O evidence; adjust only a measured bottleneck and retest the same workload.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g4-t1",
    "batch": "20",
    "title": "Type 1 Hypervisor",
    "subtitle": "A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g4-t1",
    "definition": "A type 1 hypervisor provides virtualization directly at the hardware execution layer rather than as an ordinary application on a general-purpose host OS. Management partitions or appliances can still be present.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.",
    "mental": "Treat this lesson as a handoff between Bare-metal layer, Management partition, Hardware assistance. Hardware virtualization support assists privileged guest execution under the hypervisor. A successful earlier handoff cannot stand in for evidence at the next one. Compatibility and security remain platform-specific. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Bare-metal layer: Hypervisor execution relationship to hardware. It does not mean management components disappear.",
      "Management partition: Privileged management/device service context. Its appearance can resemble a normal OS.",
      "Hardware assistance: Processor virtualization facilities. Compatibility and security remain platform-specific."
    ],
    "mechanism": [
      "Hardware virtualization support assists privileged guest execution under the hypervisor.",
      "Management and device-service components configure guests and mediate supported I/O paths.",
      "A guest depends on the physical host and its resource policy even when guest kernels are isolated from one another."
    ],
    "flow": [
      [
        "Requested operation",
        "A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions."
      ],
      [
        "Bare-metal layer",
        "Hardware virtualization support assists privileged guest execution under the hypervisor."
      ],
      [
        "Management partition",
        "Management and device-service components configure guests and mediate supported I/O paths."
      ],
      [
        "Hardware assistance",
        "A guest depends on the physical host and its resource policy even when guest kernels are isolated from one another."
      ]
    ],
    "comparison": [
      [
        "Bare-metal layer",
        "Hypervisor execution relationship to hardware",
        "It does not mean management components disappear."
      ],
      [
        "Management partition",
        "Privileged management/device service context",
        "Its appearance can resemble a normal OS."
      ],
      [
        "Hardware assistance",
        "Processor virtualization facilities",
        "Compatibility and security remain platform-specific."
      ]
    ],
    "example": "Worked case: A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions. Fault: A design review classifies every system with a visible desktop as a hosted type 2 hypervisor. Diagnosis and recovery: Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims. Boundary check: Does a visible management desktop prove type 2 architecture? No. Classify the execution layer, not the user interface.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g4-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A design review classifies every system with a visible desktop as a hosted type 2 hypervisor. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims.",
    "production": "Assign ownership at each dependency boundary. A guest depends on the physical host and its resource policy even when guest kernels are isolated from one another. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It does not mean management components disappear. Compatibility and security remain platform-specific. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Management and device-service components configure guests and mediate supported I/O paths. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "A design review classifies every system with a visible desktop as a hosted type 2 hypervisor.",
        "Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims."
      ],
      [
        "Does type 1 imply zero management attack surface?",
        "No. Privileged management services still need protection."
      ],
      [
        "Why validate hardware support before installation?",
        "Virtualization features, drivers and devices must form a supported combination. Architectural category alone is insufficient."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Classify the execution layer, not the user interface.",
      "The management OS is a partition above the hypervisor.",
      "Privileged management services still need protection.",
      "Guest isolation does not remove host dependence.",
      "Architectural category alone is insufficient.",
      "A screenshot of the console does not settle it."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g4-t0"
    ],
    "related": [
      "s8-g4-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Type 1 Hypervisor. A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Bare-metal layer → Hypervisor execution relationship to hardware",
        "Management partition → Privileged management/device service context",
        "Hardware assistance → Processor virtualization facilities"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A design review classifies every system with a visible desktop as a hosted type 2 hypervisor. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A design review classifies every system with a visible desktop as a hosted type 2 hypervisor. Shared hardware, power or storage access failure.",
      "challenge": "What evidence supports the architecture classification? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Bare-metal layer": "Hypervisor execution relationship to hardware. It does not mean management components disappear.",
      "Management partition": "Privileged management/device service context. Its appearance can resemble a normal OS.",
      "Hardware assistance": "Processor virtualization facilities. Compatibility and security remain platform-specific."
    },
    "sources": [
      {
        "title": "Microsoft Hyper-V architecture overview",
        "url": "https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/overview",
        "checked": "2026-10-09"
      },
      {
        "title": "RHEL 9 virtualization architecture and operations",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_and_managing_virtualization/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g4-t1-QC1",
        "topicId": "s8-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Type 1 Hypervisor case?",
        "answer": "A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Bare-metal layer"
      },
      {
        "questionId": "s8-g4-t1-QC2",
        "topicId": "s8-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Type 1 Hypervisor.",
        "answer": "Management and device-service components configure guests and mediate supported I/O paths.",
        "explanation": "Its appearance can resemble a normal OS.",
        "testedConcept": "Management partition"
      },
      {
        "questionId": "s8-g4-t1-QC3",
        "topicId": "s8-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Hardware assistance matters here?",
        "answer": "Compatibility and security remain platform-specific.",
        "explanation": "A guest depends on the physical host and its resource policy even when guest kernels are isolated from one another.",
        "testedConcept": "Hardware assistance"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g4-t1-Q1",
        "topicId": "s8-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a visible management desktop prove type 2 architecture?",
        "answer": "No.",
        "explanation": "Classify the execution layer, not the user interface.",
        "testedConcept": "Bare-metal layer"
      },
      {
        "questionId": "s8-g4-t1-Q2",
        "topicId": "s8-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which architecture does Microsoft describe for Hyper-V?",
        "answer": "Type 1.",
        "explanation": "The management OS is a partition above the hypervisor.",
        "testedConcept": "Management partition"
      },
      {
        "questionId": "s8-g4-t1-Q3",
        "topicId": "s8-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does type 1 imply zero management attack surface?",
        "answer": "No.",
        "explanation": "Privileged management services still need protection.",
        "testedConcept": "Hardware assistance"
      },
      {
        "questionId": "s8-g4-t1-Q4",
        "topicId": "s8-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What resource failure can affect every VM on one type 1 host?",
        "answer": "Shared hardware, power or storage access failure.",
        "explanation": "Guest isolation does not remove host dependence.",
        "testedConcept": "Bare-metal layer"
      },
      {
        "questionId": "s8-g4-t1-Q5",
        "topicId": "s8-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why validate hardware support before installation?",
        "answer": "Virtualization features, drivers and devices must form a supported combination.",
        "explanation": "Architectural category alone is insufficient.",
        "testedConcept": "Management partition"
      },
      {
        "questionId": "s8-g4-t1-Q6",
        "topicId": "s8-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence supports the architecture classification?",
        "answer": "The platform execution and partition model in its primary documentation.",
        "explanation": "A screenshot of the console does not settle it.",
        "testedConcept": "Hardware assistance"
      },
      {
        "questionId": "s8-g4-t1-Q7",
        "topicId": "s8-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Type 1 Hypervisor incident, which assumption failed?",
        "answer": "A design review classifies every system with a visible desktop as a hosted type 2 hypervisor.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g4-t1-Q8",
        "topicId": "s8-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Type 1 Hypervisor incident?",
        "answer": "Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g4-t1-Q9",
        "topicId": "s8-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Bare-metal layer and Management partition.",
        "answer": "Hypervisor execution relationship to hardware. Privileged management/device service context.",
        "explanation": "It does not mean management components disappear. Its appearance can resemble a normal OS.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g4-t1-Q10",
        "topicId": "s8-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Type 1 Hypervisor worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "A Windows Hyper-V host has a visible management OS but uses a type 1 hypervisor beneath the partitions.",
      "fault": "A design review classifies every system with a visible desktop as a hosted type 2 hypervisor.",
      "restore": "Trace where privileged execution is mediated and how the management OS relates to the hypervisor; correct the architecture diagram before making isolation claims.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g4-t2",
    "batch": "20",
    "title": "Type 2 Hypervisor",
    "subtitle": "A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g4-t2",
    "definition": "A type 2 or hosted hypervisor runs within a general-purpose host operating environment. It is useful for desktop labs, while host scheduling, updates, sleep behavior and device access add dependencies.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.",
    "mental": "Treat this lesson as a handoff between Hosted process, Virtual network mode, Nested virtualization. The host OS runs the virtualization process and supplies resource and device services. A successful earlier handoff cannot stand in for evidence at the next one. Hardware features and support may be restricted. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Hosted process: Virtualization application in the host environment. The host lifecycle can interrupt guests.",
      "Virtual network mode: NAT, bridged or isolated attachment choice. Names do not prove tenant isolation.",
      "Nested virtualization: Hypervisor operating inside a VM. Hardware features and support may be restricted."
    ],
    "mechanism": [
      "The host OS runs the virtualization process and supplies resource and device services.",
      "The hypervisor presents guest hardware and uses available hardware assistance through supported host interfaces.",
      "Guest workloads contend with host applications and inherit host availability constraints such as sleep or restart."
    ],
    "flow": [
      [
        "Requested operation",
        "A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN."
      ],
      [
        "Hosted process",
        "The host OS runs the virtualization process and supplies resource and device services."
      ],
      [
        "Virtual network mode",
        "The hypervisor presents guest hardware and uses available hardware assistance through supported host interfaces."
      ],
      [
        "Nested virtualization",
        "Guest workloads contend with host applications and inherit host availability constraints such as sleep or restart."
      ]
    ],
    "comparison": [
      [
        "Hosted process",
        "Virtualization application in the host environment",
        "The host lifecycle can interrupt guests."
      ],
      [
        "Virtual network mode",
        "NAT, bridged or isolated attachment choice",
        "Names do not prove tenant isolation."
      ],
      [
        "Nested virtualization",
        "Hypervisor operating inside a VM",
        "Hardware features and support may be restricted."
      ]
    ],
    "example": "Worked case: A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN. Fault: A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN. Diagnosis and recovery: Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram. Boundary check: What additional scheduler dependency exists in a hosted lab? The general-purpose host OS and its other workloads. Guest resource inventory is not a performance guarantee.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g4-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram.",
    "production": "Assign ownership at each dependency boundary. Guest workloads contend with host applications and inherit host availability constraints such as sleep or restart. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. The host lifecycle can interrupt guests. Hardware features and support may be restricted. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The hypervisor presents guest hardware and uses available hardware assistance through supported host interfaces. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN.",
        "Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram."
      ],
      [
        "Does NAT automatically mean no possible inbound exposure?",
        "No; forwarding and other configuration can change reachability. Test the actual network policy."
      ],
      [
        "Does nested virtualization reproduce every physical-host feature?",
        "No. Instruction exposure, drivers and support differ."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Guest resource inventory is not a performance guarantee.",
      "Availability depends on host lifecycle.",
      "Test the actual network policy.",
      "Mode labels still need verification.",
      "Instruction exposure, drivers and support differ.",
      "Changing a dropdown alone is not enough."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g4-t1"
    ],
    "related": [
      "s8-g5-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Type 2 Hypervisor. A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Hosted process → Virtualization application in the host environment",
        "Virtual network mode → NAT, bridged or isolated attachment choice",
        "Nested virtualization → Hypervisor operating inside a VM"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN. Its intended scope excludes physical-LAN exposure.",
      "challenge": "What proves the exposure repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Hosted process": "Virtualization application in the host environment. The host lifecycle can interrupt guests.",
      "Virtual network mode": "NAT, bridged or isolated attachment choice. Names do not prove tenant isolation.",
      "Nested virtualization": "Hypervisor operating inside a VM. Hardware features and support may be restricted."
    },
    "sources": [
      {
        "title": "RHEL 9 virtualization architecture and operations",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_and_managing_virtualization/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g4-t2-QC1",
        "topicId": "s8-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Type 2 Hypervisor case?",
        "answer": "A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Hosted process"
      },
      {
        "questionId": "s8-g4-t2-QC2",
        "topicId": "s8-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Type 2 Hypervisor.",
        "answer": "The hypervisor presents guest hardware and uses available hardware assistance through supported host interfaces.",
        "explanation": "Names do not prove tenant isolation.",
        "testedConcept": "Virtual network mode"
      },
      {
        "questionId": "s8-g4-t2-QC3",
        "topicId": "s8-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Nested virtualization matters here?",
        "answer": "Hardware features and support may be restricted.",
        "explanation": "Guest workloads contend with host applications and inherit host availability constraints such as sleep or restart.",
        "testedConcept": "Nested virtualization"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g4-t2-Q1",
        "topicId": "s8-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What additional scheduler dependency exists in a hosted lab?",
        "answer": "The general-purpose host OS and its other workloads.",
        "explanation": "Guest resource inventory is not a performance guarantee.",
        "testedConcept": "Hosted process"
      },
      {
        "questionId": "s8-g4-t2-Q2",
        "topicId": "s8-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can host sleep interrupt the lab?",
        "answer": "Yes.",
        "explanation": "Availability depends on host lifecycle.",
        "testedConcept": "Virtual network mode"
      },
      {
        "questionId": "s8-g4-t2-Q3",
        "topicId": "s8-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does NAT automatically mean no possible inbound exposure?",
        "answer": "No; forwarding and other configuration can change reachability.",
        "explanation": "Test the actual network policy.",
        "testedConcept": "Nested virtualization"
      },
      {
        "questionId": "s8-g4-t2-Q4",
        "topicId": "s8-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why prefer an explicitly isolated network for this lab?",
        "answer": "Its intended scope excludes physical-LAN exposure.",
        "explanation": "Mode labels still need verification.",
        "testedConcept": "Hosted process"
      },
      {
        "questionId": "s8-g4-t2-Q5",
        "topicId": "s8-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does nested virtualization reproduce every physical-host feature?",
        "answer": "No.",
        "explanation": "Instruction exposure, drivers and support differ.",
        "testedConcept": "Virtual network mode"
      },
      {
        "questionId": "s8-g4-t2-Q6",
        "topicId": "s8-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What proves the exposure repair?",
        "answer": "The intended lab peers communicate while the excluded physical-LAN path cannot reach the service.",
        "explanation": "Changing a dropdown alone is not enough.",
        "testedConcept": "Nested virtualization"
      },
      {
        "questionId": "s8-g4-t2-Q7",
        "topicId": "s8-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Type 2 Hypervisor incident, which assumption failed?",
        "answer": "A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g4-t2-Q8",
        "topicId": "s8-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Type 2 Hypervisor incident?",
        "answer": "Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g4-t2-Q9",
        "topicId": "s8-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Hosted process and Virtual network mode.",
        "answer": "Virtualization application in the host environment. NAT, bridged or isolated attachment choice.",
        "explanation": "The host lifecycle can interrupt guests. Names do not prove tenant isolation.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g4-t2-Q10",
        "topicId": "s8-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Type 2 Hypervisor worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "A laptop runs a disposable two-VM study network on an isolated virtual segment, separate from the home LAN.",
      "fault": "A learner selects bridged networking unintentionally and exposes a lab service to the physical LAN.",
      "restore": "Stop the unintended exposure, choose the intended isolated mode, verify actual guest reachability and retain the host/guest network boundary in the diagram.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t0",
    "batch": "20",
    "title": "VMware ESXi",
    "subtitle": "An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t0",
    "definition": "VMware ESXi is a hypervisor host platform. The VMkernel, host management and virtual machine execution supply different observations; a reachable host UI does not establish datastore or guest-service health.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.",
    "mental": "Treat this lesson as a handoff between VMkernel, Host management, Compatibility. The host discovers supported CPU, memory, network and storage devices using its driver/firmware stack. A successful earlier handoff cannot stand in for evidence at the next one. An apparently working driver is not support evidence. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "VMkernel: Core hypervisor resource and I/O services. It differs from a guest kernel.",
      "Host management: Administrative control of one host. Management availability is narrower than guest health.",
      "Compatibility: Supported hardware/software combination. An apparently working driver is not support evidence."
    ],
    "mechanism": [
      "The host discovers supported CPU, memory, network and storage devices using its driver/firmware stack.",
      "VMkernel resource and I/O services back virtual machines and their configured networks and disks.",
      "Host management exposes configuration and operational state, while the guest application supplies the final acceptance transaction."
    ],
    "flow": [
      [
        "Requested operation",
        "An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable."
      ],
      [
        "VMkernel",
        "The host discovers supported CPU, memory, network and storage devices using its driver/firmware stack."
      ],
      [
        "Host management",
        "VMkernel resource and I/O services back virtual machines and their configured networks and disks."
      ],
      [
        "Compatibility",
        "Host management exposes configuration and operational state, while the guest application supplies the final acceptance transaction."
      ]
    ],
    "comparison": [
      [
        "VMkernel",
        "Core hypervisor resource and I/O services",
        "It differs from a guest kernel."
      ],
      [
        "Host management",
        "Administrative control of one host",
        "Management availability is narrower than guest health."
      ],
      [
        "Compatibility",
        "Supported hardware/software combination",
        "An apparently working driver is not support evidence."
      ]
    ],
    "example": "Worked case: An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable. Fault: The operator restarts management services to fix a storage-path failure that does not affect management access. Diagnosis and recovery: Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation. Boundary check: Does Host Client login prove VM storage is healthy? No. Management and storage paths are separate.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation. These incident statements are expected evidence, not real device output."
      },
      {
        "filename": "guided-esxi-storage.txt",
        "platform": "ESXi 8.x target; guided and unexecuted; match target CLI help",
        "code": "esxcli storage core adapter list\nesxcli storage core path list\nesxcli storage filesystem list",
        "explanation": "Collect adapter, path and mounted-volume views without rescanning or changing devices. Correlate device identifiers across the three views.",
        "expected": "Adapter inventory, path state and datastore identity. These views are separate from guest filesystem integrity or application health."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The operator restarts management services to fix a storage-path failure that does not affect management access. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation.",
    "production": "Assign ownership at each dependency boundary. Host management exposes configuration and operational state, while the guest application supplies the final acceptance transaction. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It differs from a guest kernel. An apparently working driver is not support evidence. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. VMkernel resource and I/O services back virtual machines and their configured networks and disks. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "The operator restarts management services to fix a storage-path failure that does not affect management access.",
        "Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation."
      ],
      [
        "What should hardware validation record?",
        "Server, adapter, firmware, driver and ESXi release compatibility. A product brand alone is not enough."
      ],
      [
        "Can a host continue running some VMs while one datastore fails?",
        "Yes, depending on their dependencies. Do not generalize one failure to every guest."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Management and storage paths are separate.",
      "A guest kernel has a different scope.",
      "A product brand alone is not enough.",
      "Identify the dependency before restarting unrelated services.",
      "Do not generalize one failure to every guest.",
      "A host status icon is insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g4-t2"
    ],
    "related": [
      "s8-g5-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for VMware ESXi. An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "VMkernel → Core hypervisor resource and I/O services",
        "Host management → Administrative control of one host",
        "Compatibility → Supported hardware/software combination"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The operator restarts management services to fix a storage-path failure that does not affect management access. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The operator restarts management services to fix a storage-path failure that does not affect management access. VM disk to datastore to device or remote storage service.",
      "challenge": "What closes the storage repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "VMkernel": "Core hypervisor resource and I/O services. It differs from a guest kernel.",
      "Host management": "Administrative control of one host. Management availability is narrower than guest health.",
      "Compatibility": "Supported hardware/software combination. An apparently working driver is not support evidence."
    },
    "sources": [
      {
        "title": "Broadcom ESXCLI storage inspection reference",
        "url": "https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_storage.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RHEL 9 virtualization architecture and operations",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_and_managing_virtualization/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t0-QC1",
        "topicId": "s8-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this VMware ESXi case?",
        "answer": "An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "VMkernel"
      },
      {
        "questionId": "s8-g5-t0-QC2",
        "topicId": "s8-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for VMware ESXi.",
        "answer": "VMkernel resource and I/O services back virtual machines and their configured networks and disks.",
        "explanation": "Management availability is narrower than guest health.",
        "testedConcept": "Host management"
      },
      {
        "questionId": "s8-g5-t0-QC3",
        "topicId": "s8-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Compatibility matters here?",
        "answer": "An apparently working driver is not support evidence.",
        "explanation": "Host management exposes configuration and operational state, while the guest application supplies the final acceptance transaction.",
        "testedConcept": "Compatibility"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t0-Q1",
        "topicId": "s8-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does Host Client login prove VM storage is healthy?",
        "answer": "No.",
        "explanation": "Management and storage paths are separate.",
        "testedConcept": "VMkernel"
      },
      {
        "questionId": "s8-g5-t0-Q2",
        "topicId": "s8-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which core component supplies hypervisor resource services?",
        "answer": "VMkernel.",
        "explanation": "A guest kernel has a different scope.",
        "testedConcept": "Host management"
      },
      {
        "questionId": "s8-g5-t0-Q3",
        "topicId": "s8-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should hardware validation record?",
        "answer": "Server, adapter, firmware, driver and ESXi release compatibility.",
        "explanation": "A product brand alone is not enough.",
        "testedConcept": "Compatibility"
      },
      {
        "questionId": "s8-g5-t0-Q4",
        "topicId": "s8-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the first mapping for a one-VM disk incident?",
        "answer": "VM disk to datastore to device or remote storage service.",
        "explanation": "Identify the dependency before restarting unrelated services.",
        "testedConcept": "VMkernel"
      },
      {
        "questionId": "s8-g5-t0-Q5",
        "topicId": "s8-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a host continue running some VMs while one datastore fails?",
        "answer": "Yes, depending on their dependencies.",
        "explanation": "Do not generalize one failure to every guest.",
        "testedConcept": "Host management"
      },
      {
        "questionId": "s8-g5-t0-Q6",
        "topicId": "s8-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What closes the storage repair?",
        "answer": "Restored correct device access and the original guest application transaction.",
        "explanation": "A host status icon is insufficient.",
        "testedConcept": "Compatibility"
      },
      {
        "questionId": "s8-g5-t0-Q7",
        "topicId": "s8-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the VMware ESXi incident, which assumption failed?",
        "answer": "The operator restarts management services to fix a storage-path failure that does not affect management access.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t0-Q8",
        "topicId": "s8-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the VMware ESXi incident?",
        "answer": "Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t0-Q9",
        "topicId": "s8-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast VMkernel and Host management.",
        "answer": "Core hypervisor resource and I/O services. Administrative control of one host.",
        "explanation": "It differs from a guest kernel. Management availability is narrower than guest health.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t0-Q10",
        "topicId": "s8-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this VMware ESXi worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "An ESXi 8.x host remains manageable while the datastore path used by one VM is unavailable.",
      "fault": "The operator restarts management services to fix a storage-path failure that does not affect management access.",
      "restore": "Correlate the affected VM disk with datastore and device-path evidence, restore the owned storage fault and verify the guest operation.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t1",
    "batch": "20",
    "title": "vCenter",
    "subtitle": "vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t1",
    "definition": "vCenter provides centralized inventory, authorization and orchestration for managed vSphere hosts. Existing VM execution resides on the hosts; management-plane loss affects operations without necessarily stopping running VMs.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.",
    "mental": "Treat this lesson as a handoff between Inventory, Orchestration, Host execution. vCenter authenticates administrative requests and keeps inventory and desired configuration context. A successful earlier handoff cannot stand in for evidence at the next one. It is not performed inside the vCenter database. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Inventory: Management representation of hosts and VMs. A stale view can differ from current execution.",
      "Orchestration: Coordinated operations across hosts. It requires the relevant control services.",
      "Host execution: Actual VM operation on ESXi. It is not performed inside the vCenter database."
    ],
    "mechanism": [
      "vCenter authenticates administrative requests and keeps inventory and desired configuration context.",
      "Hosts execute assigned work and expose operational state; cluster services have their own dependencies.",
      "Operators distinguish a vCenter communication failure from host, datastore and guest application failures before taking recovery action."
    ],
    "flow": [
      [
        "Requested operation",
        "vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction."
      ],
      [
        "Inventory",
        "vCenter authenticates administrative requests and keeps inventory and desired configuration context."
      ],
      [
        "Orchestration",
        "Hosts execute assigned work and expose operational state; cluster services have their own dependencies."
      ],
      [
        "Host execution",
        "Operators distinguish a vCenter communication failure from host, datastore and guest application failures before taking recovery action."
      ]
    ],
    "comparison": [
      [
        "Inventory",
        "Management representation of hosts and VMs",
        "A stale view can differ from current execution."
      ],
      [
        "Orchestration",
        "Coordinated operations across hosts",
        "It requires the relevant control services."
      ],
      [
        "Host execution",
        "Actual VM operation on ESXi",
        "It is not performed inside the vCenter database."
      ]
    ],
    "example": "Worked case: vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction. Fault: An incident plan powers off healthy hosts because their centralized inventory view is disconnected. Diagnosis and recovery: Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests. Boundary check: Must existing VMs stop immediately when vCenter is unavailable? No. VM execution is on the hosts.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An incident plan powers off healthy hosts because their centralized inventory view is disconnected. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests.",
    "production": "Assign ownership at each dependency boundary. Operators distinguish a vCenter communication failure from host, datastore and guest application failures before taking recovery action. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A stale view can differ from current execution. It is not performed inside the vCenter database. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Hosts execute assigned work and expose operational state; cluster services have their own dependencies. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
    "troubleshooting": [
      [
        "An incident plan powers off healthy hosts because their centralized inventory view is disconnected.",
        "Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests."
      ],
      [
        "Why compare inventory with direct observations?",
        "Management data can be stale or unavailable. Disconnected is not synonymous with powered off."
      ],
      [
        "Why avoid rebooting hosts first?",
        "It can destroy healthy execution while leaving the management cause unresolved. Test the failing boundary."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "VM execution is on the hosts.",
      "Orchestration dependencies differ by operation.",
      "Disconnected is not synonymous with powered off.",
      "A local VM snapshot is not a complete management recovery plan.",
      "Test the failing boundary.",
      "A login screen alone does not verify orchestration."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t0"
    ],
    "related": [
      "s8-g5-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for vCenter. vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Inventory → Management representation of hosts and VMs",
        "Orchestration → Coordinated operations across hosts",
        "Host execution → Actual VM operation on ESXi"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An incident plan powers off healthy hosts because their centralized inventory view is disconnected. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An incident plan powers off healthy hosts because their centralized inventory view is disconnected. Configuration, identity, supported backups and the dependencies needed for restore.",
      "challenge": "What validates management recovery? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Inventory": "Management representation of hosts and VMs. A stale view can differ from current execution.",
      "Orchestration": "Coordinated operations across hosts. It requires the relevant control services.",
      "Host execution": "Actual VM operation on ESXi. It is not performed inside the vCenter database."
    },
    "sources": [
      {
        "title": "Broadcom vSphere: HA/DRS cluster and automation levels",
        "url": "https://knowledge.broadcom.com/external/article/308413/creating-a-vsphere-drs-and-ha-cluster-us.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Broadcom: VMware snapshot practices and backup boundary",
        "url": "https://knowledge.broadcom.com/external/article/318825/best-practices-for-using-vmware-snapshot.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t1-QC1",
        "topicId": "s8-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this vCenter case?",
        "answer": "vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s8-g5-t1-QC2",
        "topicId": "s8-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for vCenter.",
        "answer": "Hosts execute assigned work and expose operational state; cluster services have their own dependencies.",
        "explanation": "It requires the relevant control services.",
        "testedConcept": "Orchestration"
      },
      {
        "questionId": "s8-g5-t1-QC3",
        "topicId": "s8-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Host execution matters here?",
        "answer": "It is not performed inside the vCenter database.",
        "explanation": "Operators distinguish a vCenter communication failure from host, datastore and guest application failures before taking recovery action.",
        "testedConcept": "Host execution"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t1-Q1",
        "topicId": "s8-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Must existing VMs stop immediately when vCenter is unavailable?",
        "answer": "No.",
        "explanation": "VM execution is on the hosts.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s8-g5-t1-Q2",
        "topicId": "s8-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does that mean every cluster operation works without vCenter?",
        "answer": "No.",
        "explanation": "Orchestration dependencies differ by operation.",
        "testedConcept": "Orchestration"
      },
      {
        "questionId": "s8-g5-t1-Q3",
        "topicId": "s8-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why compare inventory with direct observations?",
        "answer": "Management data can be stale or unavailable.",
        "explanation": "Disconnected is not synonymous with powered off.",
        "testedConcept": "Host execution"
      },
      {
        "questionId": "s8-g5-t1-Q4",
        "topicId": "s8-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a vCenter recovery plan protect?",
        "answer": "Configuration, identity, supported backups and the dependencies needed for restore.",
        "explanation": "A local VM snapshot is not a complete management recovery plan.",
        "testedConcept": "Inventory"
      },
      {
        "questionId": "s8-g5-t1-Q5",
        "topicId": "s8-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid rebooting hosts first?",
        "answer": "It can destroy healthy execution while leaving the management cause unresolved.",
        "explanation": "Test the failing boundary.",
        "testedConcept": "Orchestration"
      },
      {
        "questionId": "s8-g5-t1-Q6",
        "topicId": "s8-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates management recovery?",
        "answer": "Authorized inventory/control access reconciles with actual host and guest state.",
        "explanation": "A login screen alone does not verify orchestration.",
        "testedConcept": "Host execution"
      },
      {
        "questionId": "s8-g5-t1-Q7",
        "topicId": "s8-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the vCenter incident, which assumption failed?",
        "answer": "An incident plan powers off healthy hosts because their centralized inventory view is disconnected.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t1-Q8",
        "topicId": "s8-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the vCenter incident?",
        "answer": "Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t1-Q9",
        "topicId": "s8-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Inventory and Orchestration.",
        "answer": "Management representation of hosts and VMs. Coordinated operations across hosts.",
        "explanation": "A stale view can differ from current execution. It requires the relevant control services.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t1-Q10",
        "topicId": "s8-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this vCenter worksheet leave unverified?",
        "answer": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "migration",
      "baseline": "vCenter becomes unreachable, but a directly observed application on a managed ESXi host still answers its health transaction.",
      "fault": "An incident plan powers off healthy hosts because their centralized inventory view is disconnected.",
      "restore": "Verify direct host and guest service evidence, recover the management service through its documented backup/restore procedure, then reconcile inventory without disrupting healthy guests.",
      "scope": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t2",
    "batch": "20",
    "title": "Datastore",
    "subtitle": "Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t2",
    "definition": "A datastore is a vSphere storage container for VM files and related objects. VMFS on block storage, NFS-backed datastores and other supported types have different discovery and coordination mechanisms.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.",
    "mental": "Treat this lesson as a handoff between VMFS, NFS datastore, Datastore UUID. The host establishes the backing storage path and discovers the appropriate device or remote namespace. A successful earlier handoff cannot stand in for evidence at the next one. A display name alone may be duplicated. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "VMFS: VMware clustered filesystem on block storage. Do not substitute an ordinary uncoordinated local filesystem.",
      "NFS datastore: Datastore backed by a file service. Its identity and access path differ from a SCSI LUN.",
      "Datastore UUID: Identity of a datastore. A display name alone may be duplicated."
    ],
    "mechanism": [
      "The host establishes the backing storage path and discovers the appropriate device or remote namespace.",
      "The supported datastore layer presents a namespace and capacity to the host.",
      "VM disks and configuration depend on that namespace; host visibility, datastore accessibility and application integrity require separate checks."
    ],
    "flow": [
      [
        "Requested operation",
        "Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration."
      ],
      [
        "VMFS",
        "The host establishes the backing storage path and discovers the appropriate device or remote namespace."
      ],
      [
        "NFS datastore",
        "The supported datastore layer presents a namespace and capacity to the host."
      ],
      [
        "Datastore UUID",
        "VM disks and configuration depend on that namespace; host visibility, datastore accessibility and application integrity require separate checks."
      ]
    ],
    "comparison": [
      [
        "VMFS",
        "VMware clustered filesystem on block storage",
        "Do not substitute an ordinary uncoordinated local filesystem."
      ],
      [
        "NFS datastore",
        "Datastore backed by a file service",
        "Its identity and access path differ from a SCSI LUN."
      ],
      [
        "Datastore UUID",
        "Identity of a datastore",
        "A display name alone may be duplicated."
      ]
    ],
    "example": "Worked case: Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration. Fault: Two hosts display a datastore called shared01 but actually refer to different backing storage. Diagnosis and recovery: Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data. Boundary check: Does the same datastore display name prove shared backing? No. Compare identity and backing path.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data. These incident statements are expected evidence, not real device output."
      },
      {
        "filename": "guided-esxi-storage.txt",
        "platform": "ESXi 8.x target; guided and unexecuted; match target CLI help",
        "code": "esxcli storage core adapter list\nesxcli storage core path list\nesxcli storage filesystem list",
        "explanation": "Collect adapter, path and mounted-volume views without rescanning or changing devices. Correlate device identifiers across the three views.",
        "expected": "Adapter inventory, path state and datastore identity. These views are separate from guest filesystem integrity or application health."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Two hosts display a datastore called shared01 but actually refer to different backing storage. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data.",
    "production": "Assign ownership at each dependency boundary. VM disks and configuration depend on that namespace; host visibility, datastore accessibility and application integrity require separate checks. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Do not substitute an ordinary uncoordinated local filesystem. A display name alone may be duplicated. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The supported datastore layer presents a namespace and capacity to the host. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "Two hosts display a datastore called shared01 but actually refer to different backing storage.",
        "Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data."
      ],
      [
        "Does NFS datastore discovery necessarily involve a SCSI LUN?",
        "No. It uses a file-service namespace."
      ],
      [
        "What does esxcli storage filesystem list inspect?",
        "Volumes available to the host. It does not prove guest application consistency."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Compare identity and backing path.",
      "Ordinary independent local mounts are not equivalent.",
      "It uses a file-service namespace.",
      "Unknown visibility is not evidence of emptiness.",
      "It does not prove guest application consistency.",
      "Free-space numbers alone are insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t1"
    ],
    "related": [
      "s8-g5-t3"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Datastore. Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "VMFS → VMware clustered filesystem on block storage",
        "NFS datastore → Datastore backed by a file service",
        "Datastore UUID → Identity of a datastore"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Two hosts display a datastore called shared01 but actually refer to different backing storage. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Two hosts display a datastore called shared01 but actually refer to different backing storage. It may contain existing VM data.",
      "challenge": "What validates a corrected datastore presentation? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "VMFS": "VMware clustered filesystem on block storage. Do not substitute an ordinary uncoordinated local filesystem.",
      "NFS datastore": "Datastore backed by a file service. Its identity and access path differ from a SCSI LUN.",
      "Datastore UUID": "Identity of a datastore. A display name alone may be duplicated."
    },
    "sources": [
      {
        "title": "Broadcom ESXCLI storage inspection reference",
        "url": "https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_storage.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t2-QC1",
        "topicId": "s8-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Datastore case?",
        "answer": "Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "VMFS"
      },
      {
        "questionId": "s8-g5-t2-QC2",
        "topicId": "s8-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Datastore.",
        "answer": "The supported datastore layer presents a namespace and capacity to the host.",
        "explanation": "Its identity and access path differ from a SCSI LUN.",
        "testedConcept": "NFS datastore"
      },
      {
        "questionId": "s8-g5-t2-QC3",
        "topicId": "s8-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Datastore UUID matters here?",
        "answer": "A display name alone may be duplicated.",
        "explanation": "VM disks and configuration depend on that namespace; host visibility, datastore accessibility and application integrity require separate checks.",
        "testedConcept": "Datastore UUID"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t2-Q1",
        "topicId": "s8-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does the same datastore display name prove shared backing?",
        "answer": "No.",
        "explanation": "Compare identity and backing path.",
        "testedConcept": "VMFS"
      },
      {
        "questionId": "s8-g5-t2-Q2",
        "topicId": "s8-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which filesystem is designed here for shared vSphere block access?",
        "answer": "VMFS.",
        "explanation": "Ordinary independent local mounts are not equivalent.",
        "testedConcept": "NFS datastore"
      },
      {
        "questionId": "s8-g5-t2-Q3",
        "topicId": "s8-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does NFS datastore discovery necessarily involve a SCSI LUN?",
        "answer": "No.",
        "explanation": "It uses a file-service namespace.",
        "testedConcept": "Datastore UUID"
      },
      {
        "questionId": "s8-g5-t2-Q4",
        "topicId": "s8-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid formatting an unrecognized datastore candidate?",
        "answer": "It may contain existing VM data.",
        "explanation": "Unknown visibility is not evidence of emptiness.",
        "testedConcept": "VMFS"
      },
      {
        "questionId": "s8-g5-t2-Q5",
        "topicId": "s8-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does esxcli storage filesystem list inspect?",
        "answer": "Volumes available to the host.",
        "explanation": "It does not prove guest application consistency.",
        "testedConcept": "NFS datastore"
      },
      {
        "questionId": "s8-g5-t2-Q6",
        "topicId": "s8-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates a corrected datastore presentation?",
        "answer": "All intended hosts identify the same backing and the owned VM files remain intact and usable.",
        "explanation": "Free-space numbers alone are insufficient.",
        "testedConcept": "Datastore UUID"
      },
      {
        "questionId": "s8-g5-t2-Q7",
        "topicId": "s8-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Datastore incident, which assumption failed?",
        "answer": "Two hosts display a datastore called shared01 but actually refer to different backing storage.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t2-Q8",
        "topicId": "s8-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Datastore incident?",
        "answer": "Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t2-Q9",
        "topicId": "s8-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast VMFS and NFS datastore.",
        "answer": "VMware clustered filesystem on block storage. Datastore backed by a file service.",
        "explanation": "Do not substitute an ordinary uncoordinated local filesystem. Its identity and access path differ from a SCSI LUN.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t2-Q10",
        "topicId": "s8-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Datastore worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Hosts h1, h2 and h3 list the same intended shared datastore identity before a VM migration.",
      "fault": "Two hosts display a datastore called shared01 but actually refer to different backing storage.",
      "restore": "Compare datastore identity, backing device/export and intended VM files across hosts; repair the mapping without formatting or resignaturing unknown data.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t3",
    "batch": "20",
    "title": "vSwitch",
    "subtitle": "Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t3",
    "definition": "A standard vSwitch supplies host-local virtual Ethernet switching for VM and VMkernel connections. Port groups, VLAN treatment and physical uplinks connect logical endpoints to the intended network.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.",
    "mental": "Treat this lesson as a handoff between Port group, Uplink, VLAN policy. A VM virtual NIC or VMkernel interface attaches to a configured port group. A successful earlier handoff cannot stand in for evidence at the next one. Both virtual and physical sides must agree. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Port group: Named virtual attachment policy. An identical name across hosts need not mean identical settings.",
      "Uplink: Physical NIC connecting the virtual switch outward. It can share an upstream switch failure.",
      "VLAN policy: Classification of Ethernet traffic. Both virtual and physical sides must agree."
    ],
    "mechanism": [
      "A VM virtual NIC or VMkernel interface attaches to a configured port group.",
      "The virtual switch applies the relevant local switching and VLAN/security policy.",
      "Traffic leaving the host uses eligible physical uplinks and matching physical-network configuration."
    ],
    "flow": [
      [
        "Requested operation",
        "Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121."
      ],
      [
        "Port group",
        "A VM virtual NIC or VMkernel interface attaches to a configured port group."
      ],
      [
        "Uplink",
        "The virtual switch applies the relevant local switching and VLAN/security policy."
      ],
      [
        "VLAN policy",
        "Traffic leaving the host uses eligible physical uplinks and matching physical-network configuration."
      ]
    ],
    "comparison": [
      [
        "Port group",
        "Named virtual attachment policy",
        "An identical name across hosts need not mean identical settings."
      ],
      [
        "Uplink",
        "Physical NIC connecting the virtual switch outward",
        "It can share an upstream switch failure."
      ],
      [
        "VLAN policy",
        "Classification of Ethernet traffic",
        "Both virtual and physical sides must agree."
      ]
    ],
    "example": "Worked case: Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121. Fault: A VM loses external connectivity after migration even though its port group name is unchanged. Diagnosis and recovery: Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction. Boundary check: Is a standard vSwitch configuration automatically shared across all hosts? No; it is host-local. Consistent names need configuration verification.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction. These incident statements are expected evidence, not real device output."
      },
      {
        "filename": "guided-esxi-network.txt",
        "platform": "ESXi 8.x target; guided and unexecuted; match target CLI help",
        "code": "esxcli network nic list\nesxcli network ip interface list",
        "explanation": "Read physical NIC and VMkernel-interface inventory; compare with virtual-switch, VLAN, stack and service settings in the supported host UI.",
        "expected": "Host interface inventory and operational fields. A guest vNIC is not a VMkernel interface; this inventory alone does not test end-to-end migration or guest networking."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A VM loses external connectivity after migration even though its port group name is unchanged. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction.",
    "production": "Assign ownership at each dependency boundary. Traffic leaving the host uses eligible physical uplinks and matching physical-network configuration. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. An identical name across hosts need not mean identical settings. Both virtual and physical sides must agree. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The virtual switch applies the relevant local switching and VLAN/security policy. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
    "troubleshooting": [
      [
        "A VM loses external connectivity after migration even though its port group name is unchanged.",
        "Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction."
      ],
      [
        "Does two-uplink teaming guarantee two physical switch domains?",
        "No. Both cables may reach one switch."
      ],
      [
        "Does a VMkernel interface serve the same role as a VM vNIC?",
        "No; it provides host networking services. Guest and host endpoints differ."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Consistent names need configuration verification.",
      "Trace the actual destination path.",
      "Both cables may reach one switch.",
      "Names are labels, not configuration equality.",
      "Guest and host endpoints differ.",
      "Allowing every VLAN is not a narrow repair."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t2"
    ],
    "related": [
      "s8-g5-t4"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for vSwitch. Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Port group → Named virtual attachment policy",
        "Uplink → Physical NIC connecting the virtual switch outward",
        "VLAN policy → Classification of Ethernet traffic"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A VM loses external connectivity after migration even though its port group name is unchanged. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A VM loses external connectivity after migration even though its port group name is unchanged. Different VLAN policies behind the same port group name.",
      "challenge": "What must the repair preserve? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Port group": "Named virtual attachment policy. An identical name across hosts need not mean identical settings.",
      "Uplink": "Physical NIC connecting the virtual switch outward. It can share an upstream switch failure.",
      "VLAN policy": "Classification of Ethernet traffic. Both virtual and physical sides must agree."
    },
    "sources": [
      {
        "title": "Broadcom ESXCLI network inspection reference",
        "url": "https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_network.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t3-QC1",
        "topicId": "s8-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this vSwitch case?",
        "answer": "Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Port group"
      },
      {
        "questionId": "s8-g5-t3-QC2",
        "topicId": "s8-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for vSwitch.",
        "answer": "The virtual switch applies the relevant local switching and VLAN/security policy.",
        "explanation": "It can share an upstream switch failure.",
        "testedConcept": "Uplink"
      },
      {
        "questionId": "s8-g5-t3-QC3",
        "topicId": "s8-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of VLAN policy matters here?",
        "answer": "Both virtual and physical sides must agree.",
        "explanation": "Traffic leaving the host uses eligible physical uplinks and matching physical-network configuration.",
        "testedConcept": "VLAN policy"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t3-Q1",
        "topicId": "s8-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is a standard vSwitch configuration automatically shared across all hosts?",
        "answer": "No; it is host-local.",
        "explanation": "Consistent names need configuration verification.",
        "testedConcept": "Port group"
      },
      {
        "questionId": "s8-g5-t3-Q2",
        "topicId": "s8-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can same-host VM traffic succeed while external traffic fails?",
        "answer": "The local switch path can work while the physical uplink or trunk fails.",
        "explanation": "Trace the actual destination path.",
        "testedConcept": "Uplink"
      },
      {
        "questionId": "s8-g5-t3-Q3",
        "topicId": "s8-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does two-uplink teaming guarantee two physical switch domains?",
        "answer": "No.",
        "explanation": "Both cables may reach one switch.",
        "testedConcept": "VLAN policy"
      },
      {
        "questionId": "s8-g5-t3-Q4",
        "topicId": "s8-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What mismatch explains the case?",
        "answer": "Different VLAN policies behind the same port group name.",
        "explanation": "Names are labels, not configuration equality.",
        "testedConcept": "Port group"
      },
      {
        "questionId": "s8-g5-t3-Q5",
        "topicId": "s8-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a VMkernel interface serve the same role as a VM vNIC?",
        "answer": "No; it provides host networking services.",
        "explanation": "Guest and host endpoints differ.",
        "testedConcept": "Uplink"
      },
      {
        "questionId": "s8-g5-t3-Q6",
        "topicId": "s8-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What must the repair preserve?",
        "answer": "The intended VLAN isolation as well as guest connectivity.",
        "explanation": "Allowing every VLAN is not a narrow repair.",
        "testedConcept": "VLAN policy"
      },
      {
        "questionId": "s8-g5-t3-Q7",
        "topicId": "s8-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the vSwitch incident, which assumption failed?",
        "answer": "A VM loses external connectivity after migration even though its port group name is unchanged.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t3-Q8",
        "topicId": "s8-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the vSwitch incident?",
        "answer": "Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t3-Q9",
        "topicId": "s8-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Port group and Uplink.",
        "answer": "Named virtual attachment policy. Physical NIC connecting the virtual switch outward.",
        "explanation": "An identical name across hosts need not mean identical settings. It can share an upstream switch failure.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t3-Q10",
        "topicId": "s8-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this vSwitch worksheet leave unverified?",
        "answer": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "migration",
      "baseline": "Two ESXi hosts have a port group called app, but one uses VLAN 120 and the other uses VLAN 121.",
      "fault": "A VM loses external connectivity after migration even though its port group name is unchanged.",
      "restore": "Compare actual VLAN policy, uplink teaming and upstream trunk allowance on both hosts, restore the intended VLAN 120 path and retest the original guest transaction.",
      "scope": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t4",
    "batch": "20",
    "title": "Distributed Switch",
    "subtitle": "A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t4",
    "definition": "A vSphere Distributed Switch centralizes virtual-network configuration across participating hosts while host proxy switching components perform the data-plane work. Central management and current forwarding are distinct dependencies.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.",
    "mental": "Treat this lesson as a handoff between Distributed port group, Host proxy switch, Uplink assignment. Administrators define distributed port group and switch policy through the supported management plane. A successful earlier handoff cannot stand in for evidence at the next one. Wrong assignment can sever management. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Distributed port group: Centrally managed attachment policy. Host realization can still be incomplete.",
      "Host proxy switch: Host-side data-plane representation. Existing forwarding is not performed by vCenter.",
      "Uplink assignment: Physical mapping into the distributed design. Wrong assignment can sever management."
    ],
    "mechanism": [
      "Administrators define distributed port group and switch policy through the supported management plane.",
      "Participating hosts realize that configuration and attach their physical uplinks and endpoints.",
      "Traffic depends on each host realization plus the physical network; staged migration protects the management path."
    ],
    "flow": [
      [
        "Requested operation",
        "A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available."
      ],
      [
        "Distributed port group",
        "Administrators define distributed port group and switch policy through the supported management plane."
      ],
      [
        "Host proxy switch",
        "Participating hosts realize that configuration and attach their physical uplinks and endpoints."
      ],
      [
        "Uplink assignment",
        "Traffic depends on each host realization plus the physical network; staged migration protects the management path."
      ]
    ],
    "comparison": [
      [
        "Distributed port group",
        "Centrally managed attachment policy",
        "Host realization can still be incomplete."
      ],
      [
        "Host proxy switch",
        "Host-side data-plane representation",
        "Existing forwarding is not performed by vCenter."
      ],
      [
        "Uplink assignment",
        "Physical mapping into the distributed design",
        "Wrong assignment can sever management."
      ]
    ],
    "example": "Worked case: A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available. Fault: Both management uplinks are moved together into a port group with the wrong VLAN policy. Diagnosis and recovery: Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second. Boundary check: Does vCenter forward every VM Ethernet frame? No; hosts perform the switching data-plane work. Management and forwarding differ.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t4",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second. These incident statements are expected evidence, not real device output."
      },
      {
        "filename": "guided-esxi-network.txt",
        "platform": "ESXi 8.x target; guided and unexecuted; match target CLI help",
        "code": "esxcli network nic list\nesxcli network ip interface list",
        "explanation": "Read physical NIC and VMkernel-interface inventory; compare with virtual-switch, VLAN, stack and service settings in the supported host UI.",
        "expected": "Host interface inventory and operational fields. A guest vNIC is not a VMkernel interface; this inventory alone does not test end-to-end migration or guest networking."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Both management uplinks are moved together into a port group with the wrong VLAN policy. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second.",
    "production": "Assign ownership at each dependency boundary. Traffic depends on each host realization plus the physical network; staged migration protects the management path. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Host realization can still be incomplete. Wrong assignment can sever management. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Participating hosts realize that configuration and attach their physical uplinks and endpoints. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
    "troubleshooting": [
      [
        "Both management uplinks are moved together into a port group with the wrong VLAN policy.",
        "Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second."
      ],
      [
        "Does centralized policy guarantee every physical trunk matches?",
        "No. Upstream network configuration remains a separate dependency."
      ],
      [
        "Can existing forwarding necessarily be inferred from vCenter reachability?",
        "No. Check host realization and actual transactions."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Management and forwarding differ.",
      "Moving all dependencies together raises lockout risk.",
      "Upstream network configuration remains a separate dependency.",
      "The path being changed cannot be the only recovery method.",
      "Check host realization and actual transactions.",
      "A configured distributed port group is not sufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t3"
    ],
    "related": [
      "s8-g5-t5"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Distributed Switch. A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Distributed port group → Centrally managed attachment policy",
        "Host proxy switch → Host-side data-plane representation",
        "Uplink assignment → Physical mapping into the distributed design"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Both management uplinks are moved together into a port group with the wrong VLAN policy. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Both management uplinks are moved together into a port group with the wrong VLAN policy. Independent console/recovery access and the exact baseline.",
      "challenge": "What validates the repaired migration? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Distributed port group": "Centrally managed attachment policy. Host realization can still be incomplete.",
      "Host proxy switch": "Host-side data-plane representation. Existing forwarding is not performed by vCenter.",
      "Uplink assignment": "Physical mapping into the distributed design. Wrong assignment can sever management."
    },
    "sources": [
      {
        "title": "Broadcom ESXCLI network inspection reference",
        "url": "https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_network.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Broadcom vSphere: HA/DRS cluster and automation levels",
        "url": "https://knowledge.broadcom.com/external/article/308413/creating-a-vsphere-drs-and-ha-cluster-us.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t4-QC1",
        "topicId": "s8-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Distributed Switch case?",
        "answer": "A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Distributed port group"
      },
      {
        "questionId": "s8-g5-t4-QC2",
        "topicId": "s8-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Distributed Switch.",
        "answer": "Participating hosts realize that configuration and attach their physical uplinks and endpoints.",
        "explanation": "Existing forwarding is not performed by vCenter.",
        "testedConcept": "Host proxy switch"
      },
      {
        "questionId": "s8-g5-t4-QC3",
        "topicId": "s8-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Uplink assignment matters here?",
        "answer": "Wrong assignment can sever management.",
        "explanation": "Traffic depends on each host realization plus the physical network; staged migration protects the management path.",
        "testedConcept": "Uplink assignment"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t4-Q1",
        "topicId": "s8-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does vCenter forward every VM Ethernet frame?",
        "answer": "No; hosts perform the switching data-plane work.",
        "explanation": "Management and forwarding differ.",
        "testedConcept": "Distributed port group"
      },
      {
        "questionId": "s8-g5-t4-Q2",
        "topicId": "s8-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why stage uplink migration?",
        "answer": "It retains a verified recovery path while testing the new configuration.",
        "explanation": "Moving all dependencies together raises lockout risk.",
        "testedConcept": "Host proxy switch"
      },
      {
        "questionId": "s8-g5-t4-Q3",
        "topicId": "s8-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does centralized policy guarantee every physical trunk matches?",
        "answer": "No.",
        "explanation": "Upstream network configuration remains a separate dependency.",
        "testedConcept": "Uplink assignment"
      },
      {
        "questionId": "s8-g5-t4-Q4",
        "topicId": "s8-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must be available before moving management networking?",
        "answer": "Independent console/recovery access and the exact baseline.",
        "explanation": "The path being changed cannot be the only recovery method.",
        "testedConcept": "Distributed port group"
      },
      {
        "questionId": "s8-g5-t4-Q5",
        "topicId": "s8-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can existing forwarding necessarily be inferred from vCenter reachability?",
        "answer": "No.",
        "explanation": "Check host realization and actual transactions.",
        "testedConcept": "Host proxy switch"
      },
      {
        "questionId": "s8-g5-t4-Q6",
        "topicId": "s8-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates the repaired migration?",
        "answer": "Both intended management and guest paths work, with VLAN boundaries retained.",
        "explanation": "A configured distributed port group is not sufficient.",
        "testedConcept": "Uplink assignment"
      },
      {
        "questionId": "s8-g5-t4-Q7",
        "topicId": "s8-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Distributed Switch incident, which assumption failed?",
        "answer": "Both management uplinks are moved together into a port group with the wrong VLAN policy.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t4-Q8",
        "topicId": "s8-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Distributed Switch incident?",
        "answer": "Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t4-Q9",
        "topicId": "s8-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Distributed port group and Host proxy switch.",
        "answer": "Centrally managed attachment policy. Host-side data-plane representation.",
        "explanation": "Host realization can still be incomplete. Existing forwarding is not performed by vCenter.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t4-Q10",
        "topicId": "s8-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Distributed Switch worksheet leave unverified?",
        "answer": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "migration",
      "baseline": "A host migrates to a distributed switch one uplink at a time while independent console access and a verified rollback remain available.",
      "fault": "Both management uplinks are moved together into a port group with the wrong VLAN policy.",
      "restore": "Use independent management to restore the captured known-good uplink and management attachment; validate one staged path before moving the second.",
      "scope": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t5",
    "batch": "20",
    "title": "VMkernel",
    "subtitle": "A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t5",
    "definition": "A VMkernel network interface provides an ESXi host IP endpoint for enabled host services such as management, vMotion or IP storage. It is separate from a VM guest virtual NIC.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.",
    "mental": "Treat this lesson as a handoff between VMkernel adapter, Service binding, TCP/IP stack. The interface obtains IP settings and attaches through a port group to a virtual switch and uplinks. A successful earlier handoff cannot stand in for evidence at the next one. A test must use the intended source context. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "VMkernel adapter: Host IP endpoint. It does not give every VM the same IP path.",
      "Service binding: Host function enabled on an adapter. Addressing alone does not enable the function.",
      "TCP/IP stack: Host routing/service context. A test must use the intended source context."
    ],
    "mechanism": [
      "The interface obtains IP settings and attaches through a port group to a virtual switch and uplinks.",
      "A selected TCP/IP stack and enabled service determine how host traffic uses the interface.",
      "End-to-end addressing, routing, VLAN and MTU must match the actual service path, not only a successful guest ping."
    ],
    "flow": [
      [
        "Requested operation",
        "A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks."
      ],
      [
        "VMkernel adapter",
        "The interface obtains IP settings and attaches through a port group to a virtual switch and uplinks."
      ],
      [
        "Service binding",
        "A selected TCP/IP stack and enabled service determine how host traffic uses the interface."
      ],
      [
        "TCP/IP stack",
        "End-to-end addressing, routing, VLAN and MTU must match the actual service path, not only a successful guest ping."
      ]
    ],
    "comparison": [
      [
        "VMkernel adapter",
        "Host IP endpoint",
        "It does not give every VM the same IP path."
      ],
      [
        "Service binding",
        "Host function enabled on an adapter",
        "Addressing alone does not enable the function."
      ],
      [
        "TCP/IP stack",
        "Host routing/service context",
        "A test must use the intended source context."
      ]
    ],
    "example": "Worked case: A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks. Fault: Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding. Diagnosis and recovery: Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration. Boundary check: Is a VMkernel adapter a guest VM NIC? No. It terminates host services.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t5",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration. These incident statements are expected evidence, not real device output."
      },
      {
        "filename": "guided-esxi-network.txt",
        "platform": "ESXi 8.x target; guided and unexecuted; match target CLI help",
        "code": "esxcli network nic list\nesxcli network ip interface list",
        "explanation": "Read physical NIC and VMkernel-interface inventory; compare with virtual-switch, VLAN, stack and service settings in the supported host UI.",
        "expected": "Host interface inventory and operational fields. A guest vNIC is not a VMkernel interface; this inventory alone does not test end-to-end migration or guest networking."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration.",
    "production": "Assign ownership at each dependency boundary. End-to-end addressing, routing, VLAN and MTU must match the actual service path, not only a successful guest ping. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It does not give every VM the same IP path. A test must use the intended source context. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A selected TCP/IP stack and enabled service determine how host traffic uses the interface. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
    "troubleshooting": [
      [
        "Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding.",
        "Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration."
      ],
      [
        "Why can management ping pass while migration fails?",
        "The services can use different interfaces, stacks, VLANs or paths. Test the failing source context."
      ],
      [
        "What should an interface inventory record?",
        "Adapter, IP, stack, service, port group, VLAN and uplinks. A single IP column loses dependencies."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "It terminates host services.",
      "Addressing and service binding differ.",
      "Test the failing source context.",
      "One jumbo-enabled interface is not end-to-end evidence.",
      "A single IP column loses dependencies.",
      "Reachability is necessary but narrower than service success."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t4"
    ],
    "related": [
      "s8-g5-t6"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for VMkernel. A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "VMkernel adapter → Host IP endpoint",
        "Service binding → Host function enabled on an adapter",
        "TCP/IP stack → Host routing/service context"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding. Across the entire selected path.",
      "challenge": "What is the next check after path restoration? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "VMkernel adapter": "Host IP endpoint. It does not give every VM the same IP path.",
      "Service binding": "Host function enabled on an adapter. Addressing alone does not enable the function.",
      "TCP/IP stack": "Host routing/service context. A test must use the intended source context."
    },
    "sources": [
      {
        "title": "Broadcom: vMotion VMkernel network requirements",
        "url": "https://knowledge.broadcom.com/external/article/304952/vmotion-interface-creating-a-vmkernel-p.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Broadcom ESXCLI network inspection reference",
        "url": "https://developer.broadcom.com/xapis/esxcli-command-reference/latest/namespace/esxcli_network.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t5-QC1",
        "topicId": "s8-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this VMkernel case?",
        "answer": "A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "VMkernel adapter"
      },
      {
        "questionId": "s8-g5-t5-QC2",
        "topicId": "s8-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for VMkernel.",
        "answer": "A selected TCP/IP stack and enabled service determine how host traffic uses the interface.",
        "explanation": "Addressing alone does not enable the function.",
        "testedConcept": "Service binding"
      },
      {
        "questionId": "s8-g5-t5-QC3",
        "topicId": "s8-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of TCP/IP stack matters here?",
        "answer": "A test must use the intended source context.",
        "explanation": "End-to-end addressing, routing, VLAN and MTU must match the actual service path, not only a successful guest ping.",
        "testedConcept": "TCP/IP stack"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t5-Q1",
        "topicId": "s8-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is a VMkernel adapter a guest VM NIC?",
        "answer": "No.",
        "explanation": "It terminates host services.",
        "testedConcept": "VMkernel adapter"
      },
      {
        "questionId": "s8-g5-t5-Q2",
        "topicId": "s8-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an IP address alone enable vMotion on that adapter?",
        "answer": "No; the relevant service configuration is required.",
        "explanation": "Addressing and service binding differ.",
        "testedConcept": "Service binding"
      },
      {
        "questionId": "s8-g5-t5-Q3",
        "topicId": "s8-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can management ping pass while migration fails?",
        "answer": "The services can use different interfaces, stacks, VLANs or paths.",
        "explanation": "Test the failing source context.",
        "testedConcept": "TCP/IP stack"
      },
      {
        "questionId": "s8-g5-t5-Q4",
        "topicId": "s8-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Where must an MTU requirement hold?",
        "answer": "Across the entire selected path.",
        "explanation": "One jumbo-enabled interface is not end-to-end evidence.",
        "testedConcept": "VMkernel adapter"
      },
      {
        "questionId": "s8-g5-t5-Q5",
        "topicId": "s8-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should an interface inventory record?",
        "answer": "Adapter, IP, stack, service, port group, VLAN and uplinks.",
        "explanation": "A single IP column loses dependencies.",
        "testedConcept": "Service binding"
      },
      {
        "questionId": "s8-g5-t5-Q6",
        "topicId": "s8-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What is the next check after path restoration?",
        "answer": "The original host service operation, followed by guest-service continuity where relevant.",
        "explanation": "Reachability is necessary but narrower than service success.",
        "testedConcept": "TCP/IP stack"
      },
      {
        "questionId": "s8-g5-t5-Q7",
        "topicId": "s8-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the VMkernel incident, which assumption failed?",
        "answer": "Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t5-Q8",
        "topicId": "s8-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the VMkernel incident?",
        "answer": "Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t5-Q9",
        "topicId": "s8-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast VMkernel adapter and Service binding.",
        "answer": "Host IP endpoint. Host function enabled on an adapter.",
        "explanation": "It does not give every VM the same IP path. Addressing alone does not enable the function.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t5-Q10",
        "topicId": "s8-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this VMkernel worksheet leave unverified?",
        "answer": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "migration",
      "baseline": "A host has separate management and migration VMkernel interfaces on different VLANs, with documented physical uplinks.",
      "fault": "Management ping passes while the migration VMkernel adapter has an incorrect VLAN or missing service binding.",
      "restore": "Inspect the selected host interface, service and routing context; restore the intended migration path and verify its end-to-end reachability before attempting migration.",
      "scope": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t6",
    "batch": "20",
    "title": "vMotion",
    "subtitle": "A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t6",
    "definition": "vMotion moves a running VM between supported hosts while preserving its execution state within the supported migration contract. Compute migration, storage migration and shared-nothing variants have different prerequisites; this lesson models a shared-storage compute move.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.",
    "mental": "Treat this lesson as a handoff between Pre-copy, Switchover, Shared-storage prerequisite. Compatibility and resource checks establish an eligible destination, matching guest network and accessible VM storage. A successful earlier handoff cannot stand in for evidence at the next one. Other migration variants have different rules. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Pre-copy: Transfer of memory while the source still runs. A high dirtying rate can slow progress.",
      "Switchover: Final execution handoff. Brief interruption is not the same as zero latency impact.",
      "Shared-storage prerequisite: Both hosts access the required VM disks in this example. Other migration variants have different rules."
    ],
    "mechanism": [
      "Compatibility and resource checks establish an eligible destination, matching guest network and accessible VM storage.",
      "The migration transfers execution state while tracking changed memory under the supported mechanism.",
      "A final switchover resumes execution at the destination, after which application continuity must be observed rather than assumed."
    ],
    "flow": [
      [
        "Requested operation",
        "A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after."
      ],
      [
        "Pre-copy",
        "Compatibility and resource checks establish an eligible destination, matching guest network and accessible VM storage."
      ],
      [
        "Switchover",
        "The migration transfers execution state while tracking changed memory under the supported mechanism."
      ],
      [
        "Shared-storage prerequisite",
        "A final switchover resumes execution at the destination, after which application continuity must be observed rather than assumed."
      ]
    ],
    "comparison": [
      [
        "Pre-copy",
        "Transfer of memory while the source still runs",
        "A high dirtying rate can slow progress."
      ],
      [
        "Switchover",
        "Final execution handoff",
        "Brief interruption is not the same as zero latency impact."
      ],
      [
        "Shared-storage prerequisite",
        "Both hosts access the required VM disks in this example",
        "Other migration variants have different rules."
      ]
    ],
    "example": "Worked case: A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after. Fault: CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN. Diagnosis and recovery: Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target. Boundary check: Does vMotion restart a failed host VM in the same way as HA? No; this is planned live execution migration. HA restart follows a different failure mechanism.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t6",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target.",
    "production": "Assign ownership at each dependency boundary. A final switchover resumes execution at the destination, after which application continuity must be observed rather than assumed. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A high dirtying rate can slow progress. Other migration variants have different rules. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The migration transfers execution state while tracking changed memory under the supported mechanism. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
    "troubleshooting": [
      [
        "CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN.",
        "Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target."
      ],
      [
        "Why can heavy memory dirtying slow migration?",
        "Changed pages must be transferred under the migration algorithm. Network rate alone is not the whole workload."
      ],
      [
        "Which evidence measures continuity?",
        "A timed client transaction stream with failures and latency retained. An inventory location change does not measure service."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "HA restart follows a different failure mechanism.",
      "Do not generalize one variant.",
      "Network rate alone is not the whole workload.",
      "Task completion and client service differ.",
      "An inventory location change does not measure service.",
      "Actual target execution remains unverified here."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t5"
    ],
    "related": [
      "s8-g5-t7"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for vMotion. A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Pre-copy → Transfer of memory while the source still runs",
        "Switchover → Final execution handoff",
        "Shared-storage prerequisite → Both hosts access the required VM disks in this example"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN. Yes; destination guest networking can be wrong.",
      "challenge": "Do five true worksheet gates prove a real migration? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Pre-copy": "Transfer of memory while the source still runs. A high dirtying rate can slow progress.",
      "Switchover": "Final execution handoff. Brief interruption is not the same as zero latency impact.",
      "Shared-storage prerequisite": "Both hosts access the required VM disks in this example. Other migration variants have different rules."
    },
    "sources": [
      {
        "title": "Broadcom: vMotion VMkernel network requirements",
        "url": "https://knowledge.broadcom.com/external/article/304952/vmotion-interface-creating-a-vmkernel-p.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t6-QC1",
        "topicId": "s8-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this vMotion case?",
        "answer": "A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Pre-copy"
      },
      {
        "questionId": "s8-g5-t6-QC2",
        "topicId": "s8-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for vMotion.",
        "answer": "The migration transfers execution state while tracking changed memory under the supported mechanism.",
        "explanation": "Brief interruption is not the same as zero latency impact.",
        "testedConcept": "Switchover"
      },
      {
        "questionId": "s8-g5-t6-QC3",
        "topicId": "s8-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Shared-storage prerequisite matters here?",
        "answer": "Other migration variants have different rules.",
        "explanation": "A final switchover resumes execution at the destination, after which application continuity must be observed rather than assumed.",
        "testedConcept": "Shared-storage prerequisite"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t6-Q1",
        "topicId": "s8-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does vMotion restart a failed host VM in the same way as HA?",
        "answer": "No; this is planned live execution migration.",
        "explanation": "HA restart follows a different failure mechanism.",
        "testedConcept": "Pre-copy"
      },
      {
        "questionId": "s8-g5-t6-Q2",
        "topicId": "s8-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does this lesson require shared storage for every possible vMotion variant?",
        "answer": "No; only for its declared example.",
        "explanation": "Do not generalize one variant.",
        "testedConcept": "Switchover"
      },
      {
        "questionId": "s8-g5-t6-Q3",
        "topicId": "s8-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can heavy memory dirtying slow migration?",
        "answer": "Changed pages must be transferred under the migration algorithm.",
        "explanation": "Network rate alone is not the whole workload.",
        "testedConcept": "Shared-storage prerequisite"
      },
      {
        "questionId": "s8-g5-t6-Q4",
        "topicId": "s8-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a migration task succeed while the application loses connectivity?",
        "answer": "Yes; destination guest networking can be wrong.",
        "explanation": "Task completion and client service differ.",
        "testedConcept": "Pre-copy"
      },
      {
        "questionId": "s8-g5-t6-Q5",
        "topicId": "s8-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which evidence measures continuity?",
        "answer": "A timed client transaction stream with failures and latency retained.",
        "explanation": "An inventory location change does not measure service.",
        "testedConcept": "Switchover"
      },
      {
        "questionId": "s8-g5-t6-Q6",
        "topicId": "s8-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Do five true worksheet gates prove a real migration?",
        "answer": "No; they are declared prerequisites only.",
        "explanation": "Actual target execution remains unverified here.",
        "testedConcept": "Shared-storage prerequisite"
      },
      {
        "questionId": "s8-g5-t6-Q7",
        "topicId": "s8-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the vMotion incident, which assumption failed?",
        "answer": "CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t6-Q8",
        "topicId": "s8-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the vMotion incident?",
        "answer": "Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t6-Q9",
        "topicId": "s8-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Pre-copy and Switchover.",
        "answer": "Transfer of memory while the source still runs. Final execution handoff.",
        "explanation": "A high dirtying rate can slow progress. Brief interruption is not the same as zero latency impact.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t6-Q10",
        "topicId": "s8-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this vMotion worksheet leave unverified?",
        "answer": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "migration",
      "baseline": "A VM on shared storage moves from h1 to h2 while a client records transaction success and latency before, during and after.",
      "fault": "CPU and storage checks pass, but the destination guest port group reaches the wrong VLAN.",
      "restore": "Restore the destination guest-network equivalence, revalidate migration prerequisites and verify the original client transaction across the move on a disposable target.",
      "scope": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t7",
    "batch": "20",
    "title": "HA",
    "subtitle": "Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t7",
    "definition": "vSphere HA can restart affected VMs on eligible surviving hosts after specified host failures. Restart requires accessible VM state, resources and applicable policy; it does not preserve every in-memory transaction or replace application-level availability.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.",
    "mental": "Treat this lesson as a handoff between Admission control, Restart, Isolation response. Host agents and configured monitoring distinguish failure or isolation conditions under the platform policy. A successful earlier handoff cannot stand in for evidence at the next one. It differs from confirmed power loss. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Admission control: Policy reserving failover capacity. It is not a guarantee against every failure combination.",
      "Restart: VM execution begins again on a survivor. Volatile guest state can be lost.",
      "Isolation response: Policy for a host cut off from relevant peers. It differs from confirmed power loss."
    ],
    "mechanism": [
      "Host agents and configured monitoring distinguish failure or isolation conditions under the platform policy.",
      "Eligible surviving hosts must satisfy storage, network, capacity and placement constraints.",
      "A restarted guest boots and recovers its applications; only application-level tests establish restored service and data consistency."
    ],
    "flow": [
      [
        "Requested operation",
        "Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope."
      ],
      [
        "Admission control",
        "Host agents and configured monitoring distinguish failure or isolation conditions under the platform policy."
      ],
      [
        "Restart",
        "Eligible surviving hosts must satisfy storage, network, capacity and placement constraints."
      ],
      [
        "Isolation response",
        "A restarted guest boots and recovers its applications; only application-level tests establish restored service and data consistency."
      ]
    ],
    "comparison": [
      [
        "Admission control",
        "Policy reserving failover capacity",
        "It is not a guarantee against every failure combination."
      ],
      [
        "Restart",
        "VM execution begins again on a survivor",
        "Volatile guest state can be lost."
      ],
      [
        "Isolation response",
        "Policy for a host cut off from relevant peers",
        "It differs from confirmed power loss."
      ]
    ],
    "example": "Worked case: Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope. Fault: HA is enabled, but all surviving hosts lack access to the failed host VM disk. Diagnosis and recovery: Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately. Boundary check: Does enabling HA make inaccessible VM disks appear on survivors? No. Storage accessibility is a prerequisite.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t7",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: HA is enabled, but all surviving hosts lack access to the failed host VM disk. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately.",
    "production": "Assign ownership at each dependency boundary. A restarted guest boots and recovers its applications; only application-level tests establish restored service and data consistency. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It is not a guarantee against every failure combination. It differs from confirmed power loss. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Eligible surviving hosts must satisfy storage, network, capacity and placement constraints. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "HA is enabled, but all surviving hosts lack access to the failed host VM disk.",
        "Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately."
      ],
      [
        "How does HA differ from planned vMotion?",
        "HA restarts after failure; vMotion transfers running execution in a supported planned move. The mechanisms and outage expectations differ."
      ],
      [
        "Why distinguish network isolation from power failure?",
        "The host may still run and access storage, requiring the configured isolation policy. Failure interpretation affects safe recovery."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Storage accessibility is a prerequisite.",
      "Applications need crash recovery and appropriate persistence.",
      "The mechanisms and outage expectations differ.",
      "The calculator is only an envelope.",
      "Failure interpretation affects safe recovery.",
      "A powered-on VM is not necessarily a recovered application."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t6"
    ],
    "related": [
      "s8-g5-t8"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for HA. Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Admission control → Policy reserving failover capacity",
        "Restart → VM execution begins again on a survivor",
        "Isolation response → Policy for a host cut off from relevant peers"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. HA is enabled, but all surviving hosts lack access to the failed host VM disk. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "HA is enabled, but all surviving hosts lack access to the failed host VM disk. No; individual fit, reservations and rules also matter.",
      "challenge": "What closes an HA test? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Admission control": "Policy reserving failover capacity. It is not a guarantee against every failure combination.",
      "Restart": "VM execution begins again on a survivor. Volatile guest state can be lost.",
      "Isolation response": "Policy for a host cut off from relevant peers. It differs from confirmed power loss."
    },
    "sources": [
      {
        "title": "Broadcom vSphere: HA/DRS cluster and automation levels",
        "url": "https://knowledge.broadcom.com/external/article/308413/creating-a-vsphere-drs-and-ha-cluster-us.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t7-QC1",
        "topicId": "s8-g5-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this HA case?",
        "answer": "Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Admission control"
      },
      {
        "questionId": "s8-g5-t7-QC2",
        "topicId": "s8-g5-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for HA.",
        "answer": "Eligible surviving hosts must satisfy storage, network, capacity and placement constraints.",
        "explanation": "Volatile guest state can be lost.",
        "testedConcept": "Restart"
      },
      {
        "questionId": "s8-g5-t7-QC3",
        "topicId": "s8-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Isolation response matters here?",
        "answer": "It differs from confirmed power loss.",
        "explanation": "A restarted guest boots and recovers its applications; only application-level tests establish restored service and data consistency.",
        "testedConcept": "Isolation response"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t7-Q1",
        "topicId": "s8-g5-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does enabling HA make inaccessible VM disks appear on survivors?",
        "answer": "No.",
        "explanation": "Storage accessibility is a prerequisite.",
        "testedConcept": "Admission control"
      },
      {
        "questionId": "s8-g5-t7-Q2",
        "topicId": "s8-g5-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does VM restart preserve all RAM state?",
        "answer": "No.",
        "explanation": "Applications need crash recovery and appropriate persistence.",
        "testedConcept": "Restart"
      },
      {
        "questionId": "s8-g5-t7-Q3",
        "topicId": "s8-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How does HA differ from planned vMotion?",
        "answer": "HA restarts after failure; vMotion transfers running execution in a supported planned move.",
        "explanation": "The mechanisms and outage expectations differ.",
        "testedConcept": "Isolation response"
      },
      {
        "questionId": "s8-g5-t7-Q4",
        "topicId": "s8-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can aggregate free memory alone guarantee restart placement?",
        "answer": "No; individual fit, reservations and rules also matter.",
        "explanation": "The calculator is only an envelope.",
        "testedConcept": "Admission control"
      },
      {
        "questionId": "s8-g5-t7-Q5",
        "topicId": "s8-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why distinguish network isolation from power failure?",
        "answer": "The host may still run and access storage, requiring the configured isolation policy.",
        "explanation": "Failure interpretation affects safe recovery.",
        "testedConcept": "Restart"
      },
      {
        "questionId": "s8-g5-t7-Q6",
        "topicId": "s8-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What closes an HA test?",
        "answer": "Measured guest restart plus application transaction and data-integrity verification within the objective.",
        "explanation": "A powered-on VM is not necessarily a recovered application.",
        "testedConcept": "Isolation response"
      },
      {
        "questionId": "s8-g5-t7-Q7",
        "topicId": "s8-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the HA incident, which assumption failed?",
        "answer": "HA is enabled, but all surviving hosts lack access to the failed host VM disk.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t7-Q8",
        "topicId": "s8-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the HA incident?",
        "answer": "Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t7-Q9",
        "topicId": "s8-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Admission control and Restart.",
        "answer": "Policy reserving failover capacity. VM execution begins again on a survivor.",
        "explanation": "It is not a guarantee against every failure combination. Volatile guest state can be lost.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t7-Q10",
        "topicId": "s8-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this HA worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "Three hosts reserve 16 GiB of each 128 GiB for overhead and retain 180 GiB total workload demand; two survivors have a 224 GiB aggregate envelope.",
      "fault": "HA is enabled, but all surviving hosts lack access to the failed host VM disk.",
      "restore": "Restore supported shared or replicated storage access and valid capacity/policy, then verify restart, guest boot, application recovery and retained records separately.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t8",
    "batch": "20",
    "title": "DRS",
    "subtitle": "One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t8",
    "definition": "Distributed Resource Scheduler evaluates VM placement and resource demand within a vSphere cluster. Recommendations or automatic actions depend on configured automation and constraints; equal VM counts are not the objective.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.",
    "mental": "Treat this lesson as a handoff between Demand, Automation level, Placement rule. The management service collects host and workload information and evaluates resource demand against constraints. A successful earlier handoff cannot stand in for evidence at the next one. Hard constraints can limit recovery choices. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Demand: Resources a workload would use. It differs from configured vCPU count.",
      "Automation level: Whether recommendations or actions are automatic. Manual mode intentionally waits for an operator.",
      "Placement rule: Constraint on allowed placement. Hard constraints can limit recovery choices."
    ],
    "mechanism": [
      "The management service collects host and workload information and evaluates resource demand against constraints.",
      "DRS recommends or performs permitted placement and migration actions according to its automation level.",
      "Operators validate workload outcomes and rule compliance; placement policy cannot repair missing storage or incompatible migration paths."
    ],
    "flow": [
      [
        "Requested operation",
        "One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target."
      ],
      [
        "Demand",
        "The management service collects host and workload information and evaluates resource demand against constraints."
      ],
      [
        "Automation level",
        "DRS recommends or performs permitted placement and migration actions according to its automation level."
      ],
      [
        "Placement rule",
        "Operators validate workload outcomes and rule compliance; placement policy cannot repair missing storage or incompatible migration paths."
      ]
    ],
    "comparison": [
      [
        "Demand",
        "Resources a workload would use",
        "It differs from configured vCPU count."
      ],
      [
        "Automation level",
        "Whether recommendations or actions are automatic",
        "Manual mode intentionally waits for an operator."
      ],
      [
        "Placement rule",
        "Constraint on allowed placement",
        "Hard constraints can limit recovery choices."
      ]
    ],
    "example": "Worked case: One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target. Fault: An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically. Diagnosis and recovery: Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result. Boundary check: Should DRS always equalize the number of VMs on each host? No; workload demand and constraints matter. Counts are not resource consumption.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t8",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result.",
    "production": "Assign ownership at each dependency boundary. Operators validate workload outcomes and rule compliance; placement policy cannot repair missing storage or incompatible migration paths. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It differs from configured vCPU count. Hard constraints can limit recovery choices. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. DRS recommends or performs permitted placement and migration actions according to its automation level. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically.",
        "Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result."
      ],
      [
        "What does partially automated mode distinguish in the cited cluster guide?",
        "Automatic initial placement versus migration recommendations. Different decisions can have different automation."
      ],
      [
        "Does DRS replace HA restart handling?",
        "No. Resource placement and failure recovery have distinct roles."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Counts are not resource consumption.",
      "No automatic move is expected.",
      "Different decisions can have different automation.",
      "Policy constrains optimization.",
      "Resource placement and failure recovery have distinct roles.",
      "A more even dashboard is not sufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t7"
    ],
    "related": [
      "s8-g5-t9"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for DRS. One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Demand → Resources a workload would use",
        "Automation level → Whether recommendations or actions are automatic",
        "Placement rule → Constraint on allowed placement"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically. Yes.",
      "challenge": "What validates a placement change? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Demand": "Resources a workload would use. It differs from configured vCPU count.",
      "Automation level": "Whether recommendations or actions are automatic. Manual mode intentionally waits for an operator.",
      "Placement rule": "Constraint on allowed placement. Hard constraints can limit recovery choices."
    },
    "sources": [
      {
        "title": "Broadcom vSphere: HA/DRS cluster and automation levels",
        "url": "https://knowledge.broadcom.com/external/article/308413/creating-a-vsphere-drs-and-ha-cluster-us.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t8-QC1",
        "topicId": "s8-g5-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this DRS case?",
        "answer": "One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Demand"
      },
      {
        "questionId": "s8-g5-t8-QC2",
        "topicId": "s8-g5-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for DRS.",
        "answer": "DRS recommends or performs permitted placement and migration actions according to its automation level.",
        "explanation": "Manual mode intentionally waits for an operator.",
        "testedConcept": "Automation level"
      },
      {
        "questionId": "s8-g5-t8-QC3",
        "topicId": "s8-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Placement rule matters here?",
        "answer": "Hard constraints can limit recovery choices.",
        "explanation": "Operators validate workload outcomes and rule compliance; placement policy cannot repair missing storage or incompatible migration paths.",
        "testedConcept": "Placement rule"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t8-Q1",
        "topicId": "s8-g5-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Should DRS always equalize the number of VMs on each host?",
        "answer": "No; workload demand and constraints matter.",
        "explanation": "Counts are not resource consumption.",
        "testedConcept": "Demand"
      },
      {
        "questionId": "s8-g5-t8-Q2",
        "topicId": "s8-g5-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does manual automation do?",
        "answer": "It presents recommendations for operator action.",
        "explanation": "No automatic move is expected.",
        "testedConcept": "Automation level"
      },
      {
        "questionId": "s8-g5-t8-Q3",
        "topicId": "s8-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does partially automated mode distinguish in the cited cluster guide?",
        "answer": "Automatic initial placement versus migration recommendations.",
        "explanation": "Different decisions can have different automation.",
        "testedConcept": "Placement rule"
      },
      {
        "questionId": "s8-g5-t8-Q4",
        "topicId": "s8-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a hard placement rule block an otherwise attractive move?",
        "answer": "Yes.",
        "explanation": "Policy constrains optimization.",
        "testedConcept": "Demand"
      },
      {
        "questionId": "s8-g5-t8-Q5",
        "topicId": "s8-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does DRS replace HA restart handling?",
        "answer": "No.",
        "explanation": "Resource placement and failure recovery have distinct roles.",
        "testedConcept": "Automation level"
      },
      {
        "questionId": "s8-g5-t8-Q6",
        "topicId": "s8-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates a placement change?",
        "answer": "Improved or acceptable workload metrics with policy and migration prerequisites preserved.",
        "explanation": "A more even dashboard is not sufficient.",
        "testedConcept": "Placement rule"
      },
      {
        "questionId": "s8-g5-t8-Q7",
        "topicId": "s8-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the DRS incident, which assumption failed?",
        "answer": "An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t8-Q8",
        "topicId": "s8-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the DRS incident?",
        "answer": "Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t8-Q9",
        "topicId": "s8-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Demand and Automation level.",
        "answer": "Resources a workload would use. Whether recommendations or actions are automatic.",
        "explanation": "It differs from configured vCPU count. Manual mode intentionally waits for an operator.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t8-Q10",
        "topicId": "s8-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this DRS worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "One host runs two busy database VMs while another runs six idle utility VMs; VM count alone is a poor balancing target.",
      "fault": "An operator diagnoses DRS as broken because a manual-mode recommendation was not executed automatically.",
      "restore": "Inspect automation level, recommendation reason and constraints; apply an approved move only after prerequisite validation and compare the actual workload result.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t9",
    "batch": "20",
    "title": "Snapshots",
    "subtitle": "At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t9",
    "definition": "A VM snapshot records a point-in-time relationship to base disks and changed data, optionally including memory. It is a temporary rollback mechanism with dependency and consistency limits, not an independent backup.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.",
    "mental": "Treat this lesson as a handoff between Delta, Quiescing, Consolidation. Snapshot creation establishes a new write target or equivalent supported change-tracking structure while retaining the base relationship. A successful earlier handoff cannot stand in for evidence at the next one. It can require time, I/O and free capacity. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Delta: Changes associated with snapshot state. It depends on the base chain.",
      "Quiescing: Coordination toward a consistent point. Successful guest/application participation must be verified.",
      "Consolidation: Supported processing of snapshot changes. It can require time, I/O and free capacity."
    ],
    "mechanism": [
      "Snapshot creation establishes a new write target or equivalent supported change-tracking structure while retaining the base relationship.",
      "Subsequent writes consume additional allocation; application quiescing, if used, must be verified separately.",
      "Revert changes the active state, while deletion/consolidation commits or removes snapshot relationships through the supported workflow; neither is manual file deletion."
    ],
    "flow": [
      [
        "Requested operation",
        "At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB."
      ],
      [
        "Delta",
        "Snapshot creation establishes a new write target or equivalent supported change-tracking structure while retaining the base relationship."
      ],
      [
        "Quiescing",
        "Subsequent writes consume additional allocation; application quiescing, if used, must be verified separately."
      ],
      [
        "Consolidation",
        "Revert changes the active state, while deletion/consolidation commits or removes snapshot relationships through the supported workflow; neither is manual file deletion."
      ]
    ],
    "comparison": [
      [
        "Delta",
        "Changes associated with snapshot state",
        "It depends on the base chain."
      ],
      [
        "Quiescing",
        "Coordination toward a consistent point",
        "Successful guest/application participation must be verified."
      ],
      [
        "Consolidation",
        "Supported processing of snapshot changes",
        "It can require time, I/O and free capacity."
      ]
    ],
    "example": "Worked case: At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB. Fault: A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk. Diagnosis and recovery: Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity. Boundary check: What is the stated linear six-hour growth? 84.375 GiB. Use 3600 seconds/hour and 1024 MiB/GiB.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t9",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity.",
    "production": "Assign ownership at each dependency boundary. Revert changes the active state, while deletion/consolidation commits or removes snapshot relationships through the supported workflow; neither is manual file deletion. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It depends on the base chain. It can require time, I/O and free capacity. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Subsequent writes consume additional allocation; application quiescing, if used, must be verified separately. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Linear changed-byte budget from supplied MiB/s and hours, plus reserve. Real delta growth, metadata, compression and consolidation workspace differ. This does not create a snapshot or backup.",
    "troubleshooting": [
      [
        "A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk.",
        "Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity."
      ],
      [
        "Can delta files alone recover a deleted base disk?",
        "Not as a complete independent VM backup. The chain depends on its base."
      ],
      [
        "Should snapshot files be manually deleted to reclaim space?",
        "No; use the supported snapshot/consolidation workflow. Manual deletion can break the chain."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Use 3600 seconds/hour and 1024 MiB/GiB.",
      "Actual allocation, metadata and workload behavior differ.",
      "The chain depends on its base.",
      "A checkbox is not a consistency test.",
      "Manual deletion can break the chain.",
      "Confirm the exact supported operation before acting."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t8"
    ],
    "related": [
      "s8-g5-t10"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Snapshots. At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Delta → Changes associated with snapshot state",
        "Quiescing → Coordination toward a consistent point",
        "Consolidation → Supported processing of snapshot changes"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk. No; guest and application support and results must be verified.",
      "challenge": "How do revert and delete/consolidate differ? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Delta": "Changes associated with snapshot state. It depends on the base chain.",
      "Quiescing": "Coordination toward a consistent point. Successful guest/application participation must be verified.",
      "Consolidation": "Supported processing of snapshot changes. It can require time, I/O and free capacity."
    },
    "sources": [
      {
        "title": "Broadcom: VMware snapshot practices and backup boundary",
        "url": "https://knowledge.broadcom.com/external/article/318825/best-practices-for-using-vmware-snapshot.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t9-QC1",
        "topicId": "s8-g5-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Snapshots case?",
        "answer": "At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Delta"
      },
      {
        "questionId": "s8-g5-t9-QC2",
        "topicId": "s8-g5-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Snapshots.",
        "answer": "Subsequent writes consume additional allocation; application quiescing, if used, must be verified separately.",
        "explanation": "Successful guest/application participation must be verified.",
        "testedConcept": "Quiescing"
      },
      {
        "questionId": "s8-g5-t9-QC3",
        "topicId": "s8-g5-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Consolidation matters here?",
        "answer": "It can require time, I/O and free capacity.",
        "explanation": "Revert changes the active state, while deletion/consolidation commits or removes snapshot relationships through the supported workflow; neither is manual file deletion.",
        "testedConcept": "Consolidation"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t9-Q1",
        "topicId": "s8-g5-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the stated linear six-hour growth?",
        "answer": "84.375 GiB.",
        "explanation": "Use 3600 seconds/hour and 1024 MiB/GiB.",
        "testedConcept": "Delta"
      },
      {
        "questionId": "s8-g5-t9-Q2",
        "topicId": "s8-g5-t9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is the growth estimate a guaranteed VMware delta allocation?",
        "answer": "No.",
        "explanation": "Actual allocation, metadata and workload behavior differ.",
        "testedConcept": "Quiescing"
      },
      {
        "questionId": "s8-g5-t9-Q3",
        "topicId": "s8-g5-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can delta files alone recover a deleted base disk?",
        "answer": "Not as a complete independent VM backup.",
        "explanation": "The chain depends on its base.",
        "testedConcept": "Consolidation"
      },
      {
        "questionId": "s8-g5-t9-Q4",
        "topicId": "s8-g5-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does quiescing prove every application is consistent automatically?",
        "answer": "No; guest and application support and results must be verified.",
        "explanation": "A checkbox is not a consistency test.",
        "testedConcept": "Delta"
      },
      {
        "questionId": "s8-g5-t9-Q5",
        "topicId": "s8-g5-t9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should snapshot files be manually deleted to reclaim space?",
        "answer": "No; use the supported snapshot/consolidation workflow.",
        "explanation": "Manual deletion can break the chain.",
        "testedConcept": "Quiescing"
      },
      {
        "questionId": "s8-g5-t9-Q6",
        "topicId": "s8-g5-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How do revert and delete/consolidate differ?",
        "answer": "Revert selects earlier state; deletion/consolidation processes the snapshot relationship rather than simply rolling the VM back.",
        "explanation": "Confirm the exact supported operation before acting.",
        "testedConcept": "Consolidation"
      },
      {
        "questionId": "s8-g5-t9-Q7",
        "topicId": "s8-g5-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Snapshots incident, which assumption failed?",
        "answer": "A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t9-Q8",
        "topicId": "s8-g5-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Snapshots incident?",
        "answer": "Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t9-Q9",
        "topicId": "s8-g5-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Delta and Quiescing.",
        "answer": "Changes associated with snapshot state. Coordination toward a consistent point.",
        "explanation": "It depends on the base chain. Successful guest/application participation must be verified.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t9-Q10",
        "topicId": "s8-g5-t9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Snapshots worksheet leave unverified?",
        "answer": "Linear changed-byte budget from supplied MiB/s and hours, plus reserve. Real delta growth, metadata, compression and consolidation workspace differ. This does not create a snapshot or backup.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "snapshot",
      "baseline": "At a teaching change estimate of 4 MiB/s for six hours, linear growth is 84.375 GiB; with 20 GiB reserve the budget is 104.375 GiB.",
      "fault": "A snapshot is retained as the only backup on the same datastore, which subsequently loses its base disk.",
      "restore": "Restore from an independent verified copy; document why the dependent snapshot cannot replace the missing base, and plan bounded retention and consolidation capacity.",
      "scope": "Linear changed-byte budget from supplied MiB/s and hours, plus reserve. Real delta growth, metadata, compression and consolidation workspace differ. This does not create a snapshot or backup."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t10",
    "batch": "20",
    "title": "Templates",
    "subtitle": "Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t10",
    "definition": "A VM template is a controlled source for provisioning new VMs. It should carry a known build and configuration while instance-specific identity, credentials and application state are customized through a supported deployment process.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.",
    "mental": "Treat this lesson as a handoff between Template version, Customization, Golden image. A source VM is prepared, patched and cleaned of instance-specific secrets and transient state. A successful earlier handoff cannot stand in for evidence at the next one. It still needs maintenance and validation. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Template version: Recorded provisioning source. A name alone does not identify exact contents.",
      "Customization: Assignment of new instance-specific identity/settings. It must cover the operating system and application.",
      "Golden image: Approved reusable baseline. It still needs maintenance and validation."
    ],
    "mechanism": [
      "A source VM is prepared, patched and cleaned of instance-specific secrets and transient state.",
      "The approved template or content-library item is versioned with provenance and validation evidence.",
      "Deployment creates a new instance whose identity, network settings and secrets are customized and tested before use."
    ],
    "flow": [
      [
        "Requested operation",
        "Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials."
      ],
      [
        "Template version",
        "A source VM is prepared, patched and cleaned of instance-specific secrets and transient state."
      ],
      [
        "Customization",
        "The approved template or content-library item is versioned with provenance and validation evidence."
      ],
      [
        "Golden image",
        "Deployment creates a new instance whose identity, network settings and secrets are customized and tested before use."
      ]
    ],
    "comparison": [
      [
        "Template version",
        "Recorded provisioning source",
        "A name alone does not identify exact contents."
      ],
      [
        "Customization",
        "Assignment of new instance-specific identity/settings",
        "It must cover the operating system and application."
      ],
      [
        "Golden image",
        "Approved reusable baseline",
        "It still needs maintenance and validation."
      ]
    ],
    "example": "Worked case: Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials. Fault: A cloned template retains a shared application token and duplicate static IP configuration. Diagnosis and recovery: Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use. Boundary check: Why version a template? To identify and reproduce the exact provisioning source. A mutable display name loses provenance.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t10",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A cloned template retains a shared application token and duplicate static IP configuration. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use.",
    "production": "Assign ownership at each dependency boundary. Deployment creates a new instance whose identity, network settings and secrets are customized and tested before use. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A name alone does not identify exact contents. It still needs maintenance and validation. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The approved template or content-library item is versioned with provenance and validation evidence. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
    "troubleshooting": [
      [
        "A cloned template retains a shared application token and duplicate static IP configuration.",
        "Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use."
      ],
      [
        "Does successful VM power-on prove template quality?",
        "No. Identity, patching, security and application behavior still need tests."
      ],
      [
        "What should a deployment acceptance compare?",
        "Unique identity, intended network, approved build and original service behavior. A clone task result is narrower evidence."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "A mutable display name loses provenance.",
      "Cloning bytes can clone exposure.",
      "Identity, patching, security and application behavior still need tests.",
      "Changing the source does not erase prior copies.",
      "A clone task result is narrower evidence.",
      "Provisioning baseline and state recovery have different purposes."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t9"
    ],
    "related": [
      "s8-g5-t11"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Templates. Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Template version → Recorded provisioning source",
        "Customization → Assignment of new instance-specific identity/settings",
        "Golden image → Approved reusable baseline"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A cloned template retains a shared application token and duplicate static IP configuration. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A cloned template retains a shared application token and duplicate static IP configuration. Already deployed instances may retain it.",
      "challenge": "Is a template a backup of a live application dataset? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Template version": "Recorded provisioning source. A name alone does not identify exact contents.",
      "Customization": "Assignment of new instance-specific identity/settings. It must cover the operating system and application.",
      "Golden image": "Approved reusable baseline. It still needs maintenance and validation."
    },
    "sources": [
      {
        "title": "RHEL 9 virtualization architecture and operations",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_and_managing_virtualization/index",
        "checked": "2026-10-09"
      },
      {
        "title": "Broadcom vSphere: HA/DRS cluster and automation levels",
        "url": "https://knowledge.broadcom.com/external/article/308413/creating-a-vsphere-drs-and-ha-cluster-us.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t10-QC1",
        "topicId": "s8-g5-t10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Templates case?",
        "answer": "Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Template version"
      },
      {
        "questionId": "s8-g5-t10-QC2",
        "topicId": "s8-g5-t10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Templates.",
        "answer": "The approved template or content-library item is versioned with provenance and validation evidence.",
        "explanation": "It must cover the operating system and application.",
        "testedConcept": "Customization"
      },
      {
        "questionId": "s8-g5-t10-QC3",
        "topicId": "s8-g5-t10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Golden image matters here?",
        "answer": "It still needs maintenance and validation.",
        "explanation": "Deployment creates a new instance whose identity, network settings and secrets are customized and tested before use.",
        "testedConcept": "Golden image"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t10-Q1",
        "topicId": "s8-g5-t10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why version a template?",
        "answer": "To identify and reproduce the exact provisioning source.",
        "explanation": "A mutable display name loses provenance.",
        "testedConcept": "Template version"
      },
      {
        "questionId": "s8-g5-t10-Q2",
        "topicId": "s8-g5-t10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must not be copied into every instance?",
        "answer": "Live instance secrets and conflicting identity/network state.",
        "explanation": "Cloning bytes can clone exposure.",
        "testedConcept": "Customization"
      },
      {
        "questionId": "s8-g5-t10-Q3",
        "topicId": "s8-g5-t10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does successful VM power-on prove template quality?",
        "answer": "No.",
        "explanation": "Identity, patching, security and application behavior still need tests.",
        "testedConcept": "Golden image"
      },
      {
        "questionId": "s8-g5-t10-Q4",
        "topicId": "s8-g5-t10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why revoke a copied credential rather than only delete it from the template?",
        "answer": "Already deployed instances may retain it.",
        "explanation": "Changing the source does not erase prior copies.",
        "testedConcept": "Template version"
      },
      {
        "questionId": "s8-g5-t10-Q5",
        "topicId": "s8-g5-t10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a deployment acceptance compare?",
        "answer": "Unique identity, intended network, approved build and original service behavior.",
        "explanation": "A clone task result is narrower evidence.",
        "testedConcept": "Customization"
      },
      {
        "questionId": "s8-g5-t10-Q6",
        "topicId": "s8-g5-t10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Is a template a backup of a live application dataset?",
        "answer": "No.",
        "explanation": "Provisioning baseline and state recovery have different purposes.",
        "testedConcept": "Golden image"
      },
      {
        "questionId": "s8-g5-t10-Q7",
        "topicId": "s8-g5-t10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Templates incident, which assumption failed?",
        "answer": "A cloned template retains a shared application token and duplicate static IP configuration.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t10-Q8",
        "topicId": "s8-g5-t10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Templates incident?",
        "answer": "Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t10-Q9",
        "topicId": "s8-g5-t10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Template version and Customization.",
        "answer": "Recorded provisioning source. Assignment of new instance-specific identity/settings.",
        "explanation": "A name alone does not identify exact contents. It must cover the operating system and application.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t10-Q10",
        "topicId": "s8-g5-t10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Templates worksheet leave unverified?",
        "answer": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "migration",
      "baseline": "Two application servers are deployed from a versioned source with distinct host identities and freshly issued credentials.",
      "fault": "A cloned template retains a shared application token and duplicate static IP configuration.",
      "restore": "Revoke the copied secret, assign intended unique instance settings and verify both instances independently before approving the template for further use.",
      "scope": "Five declared readiness gates for a shared-storage live migration. All true means the supplied checklist is satisfied, not that a migration ran. Shared-nothing variants, CPU details, device exceptions, licensing and live traffic are outside the model."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g5-t11",
    "batch": "20",
    "title": "Clusters",
    "subtitle": "Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g5-t11",
    "definition": "A virtualization cluster groups hosts for shared management and selected resource or availability services. Its usable failure-state capacity and common dependencies determine recovery, not merely its member count.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.",
    "mental": "Treat this lesson as a handoff between Failure domain, N+1 envelope, Placement constraint. Hosts join a compatible management and network context with known storage access and resource inventory. A successful earlier handoff cannot stand in for evidence at the next one. Aggregate spare capacity may be unusable. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Failure domain: Components lost together under one event. Hosts can share a rack or array.",
      "N+1 envelope: Capacity after one specified member loss. It is not protection from arbitrary shared failures.",
      "Placement constraint: Rule limiting eligible hosts. Aggregate spare capacity may be unusable."
    ],
    "mechanism": [
      "Hosts join a compatible management and network context with known storage access and resource inventory.",
      "Cluster services apply admission, placement and monitoring policies within that dependency graph.",
      "Failure or maintenance removes capacity; remaining hosts must satisfy individual workload and service requirements."
    ],
    "flow": [
      [
        "Requested operation",
        "Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance."
      ],
      [
        "Failure domain",
        "Hosts join a compatible management and network context with known storage access and resource inventory."
      ],
      [
        "N+1 envelope",
        "Cluster services apply admission, placement and monitoring policies within that dependency graph."
      ],
      [
        "Placement constraint",
        "Failure or maintenance removes capacity; remaining hosts must satisfy individual workload and service requirements."
      ]
    ],
    "comparison": [
      [
        "Failure domain",
        "Components lost together under one event",
        "Hosts can share a rack or array."
      ],
      [
        "N+1 envelope",
        "Capacity after one specified member loss",
        "It is not protection from arbitrary shared failures."
      ],
      [
        "Placement constraint",
        "Rule limiting eligible hosts",
        "Aggregate spare capacity may be unusable."
      ]
    ],
    "example": "Worked case: Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance. Fault: The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host. Diagnosis and recovery: Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise. Boundary check: What is the two-host aggregate allowance in the example? 224 GiB. Each survivor contributes 112 GiB.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g5-t11",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise.",
    "production": "Assign ownership at each dependency boundary. Failure or maintenance removes capacity; remaining hosts must satisfy individual workload and service requirements. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Hosts can share a rack or array. Aggregate spare capacity may be unusable. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Cluster services apply admission, placement and monitoring policies within that dependency graph. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host.",
        "Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise."
      ],
      [
        "Does N+1 host capacity protect against shared array loss?",
        "No. That is a different failure domain."
      ],
      [
        "Can a cluster member count alone prove high availability?",
        "No. Compatibility, policy and shared dependencies matter."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Each survivor contributes 112 GiB.",
      "Aggregate sum does not solve individual fit.",
      "That is a different failure domain.",
      "Healthy-state counts overstate resilience.",
      "Compatibility, policy and shared dependencies matter.",
      "Management membership is only the starting point."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t10"
    ],
    "related": [
      "s8-g6-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Clusters. Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Failure domain → Components lost together under one event",
        "N+1 envelope → Capacity after one specified member loss",
        "Placement constraint → Rule limiting eligible hosts"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host. A host already drained for maintenance reduces the capacity available for a subsequent fault.",
      "challenge": "What evidence belongs in cluster acceptance? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Failure domain": "Components lost together under one event. Hosts can share a rack or array.",
      "N+1 envelope": "Capacity after one specified member loss. It is not protection from arbitrary shared failures.",
      "Placement constraint": "Rule limiting eligible hosts. Aggregate spare capacity may be unusable."
    },
    "sources": [
      {
        "title": "Broadcom vSphere: HA/DRS cluster and automation levels",
        "url": "https://knowledge.broadcom.com/external/article/308413/creating-a-vsphere-drs-and-ha-cluster-us.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g5-t11-QC1",
        "topicId": "s8-g5-t11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Clusters case?",
        "answer": "Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Failure domain"
      },
      {
        "questionId": "s8-g5-t11-QC2",
        "topicId": "s8-g5-t11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Clusters.",
        "answer": "Cluster services apply admission, placement and monitoring policies within that dependency graph.",
        "explanation": "It is not protection from arbitrary shared failures.",
        "testedConcept": "N+1 envelope"
      },
      {
        "questionId": "s8-g5-t11-QC3",
        "topicId": "s8-g5-t11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Placement constraint matters here?",
        "answer": "Aggregate spare capacity may be unusable.",
        "explanation": "Failure or maintenance removes capacity; remaining hosts must satisfy individual workload and service requirements.",
        "testedConcept": "Placement constraint"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g5-t11-Q1",
        "topicId": "s8-g5-t11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the two-host aggregate allowance in the example?",
        "answer": "224 GiB.",
        "explanation": "Each survivor contributes 112 GiB.",
        "testedConcept": "Failure domain"
      },
      {
        "questionId": "s8-g5-t11-Q2",
        "topicId": "s8-g5-t11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why does a 120 GiB VM fail the stated per-host allowance?",
        "answer": "Each eligible host allows only 112 GiB.",
        "explanation": "Aggregate sum does not solve individual fit.",
        "testedConcept": "N+1 envelope"
      },
      {
        "questionId": "s8-g5-t11-Q3",
        "topicId": "s8-g5-t11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does N+1 host capacity protect against shared array loss?",
        "answer": "No.",
        "explanation": "That is a different failure domain.",
        "testedConcept": "Placement constraint"
      },
      {
        "questionId": "s8-g5-t11-Q4",
        "topicId": "s8-g5-t11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why model maintenance and failure together?",
        "answer": "A host already drained for maintenance reduces the capacity available for a subsequent fault.",
        "explanation": "Healthy-state counts overstate resilience.",
        "testedConcept": "Failure domain"
      },
      {
        "questionId": "s8-g5-t11-Q5",
        "topicId": "s8-g5-t11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a cluster member count alone prove high availability?",
        "answer": "No.",
        "explanation": "Compatibility, policy and shared dependencies matter.",
        "testedConcept": "N+1 envelope"
      },
      {
        "questionId": "s8-g5-t11-Q6",
        "topicId": "s8-g5-t11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence belongs in cluster acceptance?",
        "answer": "A declared failure scope, valid placement, recovered application state and measured objective compliance.",
        "explanation": "Management membership is only the starting point.",
        "testedConcept": "Placement constraint"
      },
      {
        "questionId": "s8-g5-t11-Q7",
        "topicId": "s8-g5-t11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Clusters incident, which assumption failed?",
        "answer": "The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g5-t11-Q8",
        "topicId": "s8-g5-t11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Clusters incident?",
        "answer": "Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g5-t11-Q9",
        "topicId": "s8-g5-t11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Failure domain and N+1 envelope.",
        "answer": "Components lost together under one event. Capacity after one specified member loss.",
        "explanation": "Hosts can share a rack or array. It is not protection from arbitrary shared failures.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g5-t11-Q10",
        "topicId": "s8-g5-t11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Clusters worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "Three 128 GiB hosts, each with 16 GiB reserved, support 180 GiB total demand on two survivors by aggregate memory, but a single 120 GiB VM cannot fit into a 112 GiB host allowance.",
      "fault": "The cluster summary shows enough aggregate memory, yet a large VM cannot restart on any surviving host.",
      "restore": "Compare per-VM demand and eligible-host headroom as well as aggregate capacity; redesign placement or resources and verify a supported failure exercise.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 20 evidence workbook",
        "path": "labs/storage-virtualization-20-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  }
];
