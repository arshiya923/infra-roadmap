window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["19"] = [
  {
    "id": "s8-g0-t0",
    "batch": "19",
    "title": "Storage Fundamentals",
    "subtitle": "A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t0",
    "definition": "Storage is a stack of interfaces and persistence guarantees. An application operation passes through caches, a filesystem or object API, a transport and media; capacity, availability and durability describe different properties.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.",
    "mental": "Treat this lesson as a handoff between IOPS, Latency, Durability. The application defines an operation and its required persistence point; a successful write call may only populate a cache. A successful earlier handoff cannot stand in for evidence at the next one. An acknowledgement needs a documented persistence contract. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "IOPS: Completed operations per second. Always state operation size and read/write mix.",
      "Latency: Time per operation. Tail percentiles reveal delays hidden by a mean.",
      "Durability: Retention after the specified failures. An acknowledgement needs a documented persistence contract."
    ],
    "mechanism": [
      "The application defines an operation and its required persistence point; a successful write call may only populate a cache.",
      "The filesystem and device translate that operation into requests; flush and ordering semantics determine what an acknowledgement promises.",
      "Recovery must reconstruct correct application state after the stated failure, using both surviving storage and an independently restorable copy."
    ],
    "flow": [
      [
        "Requested operation",
        "A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS."
      ],
      [
        "IOPS",
        "The application defines an operation and its required persistence point; a successful write call may only populate a cache."
      ],
      [
        "Latency",
        "The filesystem and device translate that operation into requests; flush and ordering semantics determine what an acknowledgement promises."
      ],
      [
        "Durability",
        "Recovery must reconstruct correct application state after the stated failure, using both surviving storage and an independently restorable copy."
      ]
    ],
    "comparison": [
      [
        "IOPS",
        "Completed operations per second",
        "Always state operation size and read/write mix."
      ],
      [
        "Latency",
        "Time per operation",
        "Tail percentiles reveal delays hidden by a mean."
      ],
      [
        "Durability",
        "Retention after the specified failures",
        "An acknowledgement needs a documented persistence contract."
      ]
    ],
    "example": "Worked case: A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS. Fault: A power-loss recovery plan relies only on a successful buffered write and a second path to the same array. Diagnosis and recovery: Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes. Boundary check: What payload rate follows from 12000 operations/s at 8192 bytes? 98304000 bytes/s, or 98.304 decimal MB/s. Operation count needs an operation size.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A power-loss recovery plan relies only on a successful buffered write and a second path to the same array. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes.",
    "production": "Assign ownership at each dependency boundary. Recovery must reconstruct correct application state after the stated failure, using both surviving storage and an independently restorable copy. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Always state operation size and read/write mix. An acknowledgement needs a documented persistence contract. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The filesystem and device translate that operation into requests; flush and ordering semantics determine what an acknowledgement promises. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.",
    "troubleshooting": [
      [
        "A power-loss recovery plan relies only on a successful buffered write and a second path to the same array.",
        "Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes."
      ],
      [
        "Why retain p99 latency as well as average latency?",
        "A minority of very slow requests can violate the service objective. A mean hides the latency distribution."
      ],
      [
        "Why can free logical capacity coexist with an exhausted array pool?",
        "Thin provisioning can promise more logical space than available physical allocation. Measure allocation and growth at both layers."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Operation count needs an operation size.",
      "Path redundancy addresses access failures.",
      "A mean hides the latency distribution.",
      "Completion at one layer is not the entire contract.",
      "Measure allocation and growth at both layers.",
      "A backup job success flag is insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s0-g0-t2",
      "s0-g0-t5"
    ],
    "related": [
      "s8-g0-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Storage Fundamentals. A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "IOPS → Completed operations per second",
        "Latency → Time per operation",
        "Durability → Retention after the specified failures"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A power-loss recovery plan relies only on a successful buffered write and a second path to the same array. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A power-loss recovery plan relies only on a successful buffered write and a second path to the same array. The relevant caches and persistence contract must survive that failure or flush to durable media.",
      "challenge": "What proves a restore is useful? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "IOPS": "Completed operations per second. Always state operation size and read/write mix.",
      "Latency": "Time per operation. Tail percentiles reveal delays hidden by a mean.",
      "Durability": "Retention after the specified failures. An acknowledgement needs a documented persistence contract."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g0-t0-QC1",
        "topicId": "s8-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Storage Fundamentals case?",
        "answer": "A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "IOPS"
      },
      {
        "questionId": "s8-g0-t0-QC2",
        "topicId": "s8-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Storage Fundamentals.",
        "answer": "The filesystem and device translate that operation into requests; flush and ordering semantics determine what an acknowledgement promises.",
        "explanation": "Tail percentiles reveal delays hidden by a mean.",
        "testedConcept": "Latency"
      },
      {
        "questionId": "s8-g0-t0-QC3",
        "topicId": "s8-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Durability matters here?",
        "answer": "An acknowledgement needs a documented persistence contract.",
        "explanation": "Recovery must reconstruct correct application state after the stated failure, using both surviving storage and an independently restorable copy.",
        "testedConcept": "Durability"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t0-Q1",
        "topicId": "s8-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What payload rate follows from 12000 operations/s at 8192 bytes?",
        "answer": "98304000 bytes/s, or 98.304 decimal MB/s.",
        "explanation": "Operation count needs an operation size.",
        "testedConcept": "IOPS"
      },
      {
        "questionId": "s8-g0-t0-Q2",
        "topicId": "s8-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does two-path access imply an independent backup?",
        "answer": "No; both paths may reach the same damaged data.",
        "explanation": "Path redundancy addresses access failures.",
        "testedConcept": "Latency"
      },
      {
        "questionId": "s8-g0-t0-Q3",
        "topicId": "s8-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why retain p99 latency as well as average latency?",
        "answer": "A minority of very slow requests can violate the service objective.",
        "explanation": "A mean hides the latency distribution.",
        "testedConcept": "Durability"
      },
      {
        "questionId": "s8-g0-t0-Q4",
        "topicId": "s8-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What additional condition connects a write acknowledgement to power-loss durability?",
        "answer": "The relevant caches and persistence contract must survive that failure or flush to durable media.",
        "explanation": "Completion at one layer is not the entire contract.",
        "testedConcept": "IOPS"
      },
      {
        "questionId": "s8-g0-t0-Q5",
        "topicId": "s8-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can free logical capacity coexist with an exhausted array pool?",
        "answer": "Thin provisioning can promise more logical space than available physical allocation.",
        "explanation": "Measure allocation and growth at both layers.",
        "testedConcept": "Latency"
      },
      {
        "questionId": "s8-g0-t0-Q6",
        "topicId": "s8-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What proves a restore is useful?",
        "answer": "An isolated restored application opens and validates the required data within the recovery objective.",
        "explanation": "A backup job success flag is insufficient.",
        "testedConcept": "Durability"
      },
      {
        "questionId": "s8-g0-t0-Q7",
        "topicId": "s8-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Storage Fundamentals incident, which assumption failed?",
        "answer": "A power-loss recovery plan relies only on a successful buffered write and a second path to the same array.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t0-Q8",
        "topicId": "s8-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Storage Fundamentals incident?",
        "answer": "Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t0-Q9",
        "topicId": "s8-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast IOPS and Latency.",
        "answer": "Completed operations per second. Time per operation.",
        "explanation": "Always state operation size and read/write mix. Tail percentiles reveal delays hidden by a mean.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t0-Q10",
        "topicId": "s8-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Storage Fundamentals worksheet leave unverified?",
        "answer": "Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "io",
      "baseline": "A workload completes 12000 operations/s of 8192 bytes each: payload is 98304000 bytes/s, before protocol overhead. Compare this to a 4 KiB random-write workload without assuming equal IOPS.",
      "fault": "A power-loss recovery plan relies only on a successful buffered write and a second path to the same array.",
      "restore": "Retain the actual flush/acknowledgement contract, identify shared failures and restore an independent copy in an isolated target; check application records and hashes.",
      "scope": "Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated."
    },
    "artifacts": [
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
    "id": "s8-g0-t1",
    "batch": "19",
    "title": "DAS",
    "subtitle": "A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t1",
    "definition": "Direct-attached storage connects to a host without a storage network service between them. SATA, SAS and locally attached NVMe are common examples; attachment location does not by itself define redundancy or backup.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.",
    "mental": "Treat this lesson as a handoff between Controller, Device identity, Local failure domain. The host discovers a controller and device, then assigns a stable device identity independent of a transient OS path. A successful earlier handoff cannot stand in for evidence at the next one. Mirrors do not remove host loss. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Controller: Host-side storage interface. Controller failure can hide otherwise intact disks.",
      "Device identity: Persistent identifier of the storage object. A device path can change after reboot.",
      "Local failure domain: Dependencies tied to one host. Mirrors do not remove host loss."
    ],
    "mechanism": [
      "The host discovers a controller and device, then assigns a stable device identity independent of a transient OS path.",
      "A filesystem or volume manager consumes that device and supplies access to applications.",
      "When the host fails, local media may remain intact but unavailable to other hosts unless a supported recovery design exists."
    ],
    "flow": [
      [
        "Requested operation",
        "A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage."
      ],
      [
        "Controller",
        "The host discovers a controller and device, then assigns a stable device identity independent of a transient OS path."
      ],
      [
        "Device identity",
        "A filesystem or volume manager consumes that device and supplies access to applications."
      ],
      [
        "Local failure domain",
        "When the host fails, local media may remain intact but unavailable to other hosts unless a supported recovery design exists."
      ]
    ],
    "comparison": [
      [
        "Controller",
        "Host-side storage interface",
        "Controller failure can hide otherwise intact disks."
      ],
      [
        "Device identity",
        "Persistent identifier of the storage object",
        "A device path can change after reboot."
      ],
      [
        "Local failure domain",
        "Dependencies tied to one host",
        "Mirrors do not remove host loss."
      ]
    ],
    "example": "Worked case: A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage. Fault: A second virtualization host is expected to restart a VM whose only disk resides on the failed first host. Diagnosis and recovery: Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data. Boundary check: Is a locally attached NVMe drive inherently network storage? No; NVMe names a command/interface family, not a mandatory network attachment. NVMe-oF is a separate transport context.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A second virtualization host is expected to restart a VM whose only disk resides on the failed first host. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data.",
    "production": "Assign ownership at each dependency boundary. When the host fails, local media may remain intact but unavailable to other hosts unless a supported recovery design exists. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Controller failure can hide otherwise intact disks. Mirrors do not remove host loss. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A filesystem or volume manager consumes that device and supplies access to applications. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A second virtualization host is expected to restart a VM whose only disk resides on the failed first host.",
        "Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data."
      ],
      [
        "Where should the disposable build cache live in the example?",
        "Local fast storage is reasonable if it is reconstructible. The durable artifact copy has a different role."
      ],
      [
        "Can another host restart a local-disk VM solely because CPU capacity is free?",
        "No; it also needs valid access to the VM state. Compute availability does not supply storage."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "NVMe-oF is a separate transport context.",
      "Count shared dependencies.",
      "The durable artifact copy has a different role.",
      "The wrong device must never be selected by guesswork.",
      "Compute availability does not supply storage.",
      "A mirror preserves accidental deletion too."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t0"
    ],
    "related": [
      "s8-g0-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for DAS. A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Controller → Host-side storage interface",
        "Device identity → Persistent identifier of the storage object",
        "Local failure domain → Dependencies tied to one host"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A second virtualization host is expected to restart a VM whose only disk resides on the failed first host. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A second virtualization host is expected to restart a VM whose only disk resides on the failed first host. OS enumeration names can change.",
      "challenge": "What restore test covers accidental cache/artifact classification error? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Controller": "Host-side storage interface. Controller failure can hide otherwise intact disks.",
      "Device identity": "Persistent identifier of the storage object. A device path can change after reboot.",
      "Local failure domain": "Dependencies tied to one host. Mirrors do not remove host loss."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g0-t1-QC1",
        "topicId": "s8-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this DAS case?",
        "answer": "A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Controller"
      },
      {
        "questionId": "s8-g0-t1-QC2",
        "topicId": "s8-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for DAS.",
        "answer": "A filesystem or volume manager consumes that device and supplies access to applications.",
        "explanation": "A device path can change after reboot.",
        "testedConcept": "Device identity"
      },
      {
        "questionId": "s8-g0-t1-QC3",
        "topicId": "s8-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Local failure domain matters here?",
        "answer": "Mirrors do not remove host loss.",
        "explanation": "When the host fails, local media may remain intact but unavailable to other hosts unless a supported recovery design exists.",
        "testedConcept": "Local failure domain"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t1-Q1",
        "topicId": "s8-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is a locally attached NVMe drive inherently network storage?",
        "answer": "No; NVMe names a command/interface family, not a mandatory network attachment.",
        "explanation": "NVMe-oF is a separate transport context.",
        "testedConcept": "Controller"
      },
      {
        "questionId": "s8-g0-t1-Q2",
        "topicId": "s8-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Two mirrored local disks survive one disk failure. What host failure remains?",
        "answer": "Loss of the host or shared controller can still make both inaccessible.",
        "explanation": "Count shared dependencies.",
        "testedConcept": "Device identity"
      },
      {
        "questionId": "s8-g0-t1-Q3",
        "topicId": "s8-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Where should the disposable build cache live in the example?",
        "answer": "Local fast storage is reasonable if it is reconstructible.",
        "explanation": "The durable artifact copy has a different role.",
        "testedConcept": "Local failure domain"
      },
      {
        "questionId": "s8-g0-t1-Q4",
        "topicId": "s8-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why record a stable disk identifier before service work?",
        "answer": "OS enumeration names can change.",
        "explanation": "The wrong device must never be selected by guesswork.",
        "testedConcept": "Controller"
      },
      {
        "questionId": "s8-g0-t1-Q5",
        "topicId": "s8-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can another host restart a local-disk VM solely because CPU capacity is free?",
        "answer": "No; it also needs valid access to the VM state.",
        "explanation": "Compute availability does not supply storage.",
        "testedConcept": "Device identity"
      },
      {
        "questionId": "s8-g0-t1-Q6",
        "topicId": "s8-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What restore test covers accidental cache/artifact classification error?",
        "answer": "Restore a completed artifact from the independently retained copy.",
        "explanation": "A mirror preserves accidental deletion too.",
        "testedConcept": "Local failure domain"
      },
      {
        "questionId": "s8-g0-t1-Q7",
        "topicId": "s8-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the DAS incident, which assumption failed?",
        "answer": "A second virtualization host is expected to restart a VM whose only disk resides on the failed first host.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t1-Q8",
        "topicId": "s8-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the DAS incident?",
        "answer": "Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t1-Q9",
        "topicId": "s8-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Controller and Device identity.",
        "answer": "Host-side storage interface. Persistent identifier of the storage object.",
        "explanation": "Controller failure can hide otherwise intact disks. A device path can change after reboot.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t1-Q10",
        "topicId": "s8-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this DAS worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A build worker keeps disposable cache on local NVMe and publishes completed artifacts to separate protected storage.",
      "fault": "A second virtualization host is expected to restart a VM whose only disk resides on the failed first host.",
      "restore": "Choose supported replication or shared access before claiming host failover; prove the destination can access the correct disk and independently restore retained data.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g0-t2",
    "batch": "19",
    "title": "NAS",
    "subtitle": "An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t2",
    "definition": "Network-attached storage serves files through a network filesystem protocol. Clients request named files and directories while the server controls filesystem organization and permissions.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.",
    "mental": "Treat this lesson as a handoff between Share or export, File permission, Locking. The client resolves the server and establishes an authenticated protocol session or mount. A successful earlier handoff cannot stand in for evidence at the next one. Application behavior must match server semantics. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Share or export: Published file namespace. Reachability does not authorize a user.",
      "File permission: Policy on a file or directory. Share policy is an additional boundary.",
      "Locking: Coordination of concurrent access. Application behavior must match server semantics."
    ],
    "mechanism": [
      "The client resolves the server and establishes an authenticated protocol session or mount.",
      "Server export/share policy and file permissions decide which named operations are allowed.",
      "The server translates allowed requests into storage I/O; client caching and locking must follow the chosen protocol semantics."
    ],
    "flow": [
      [
        "Requested operation",
        "An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export."
      ],
      [
        "Share or export",
        "The client resolves the server and establishes an authenticated protocol session or mount."
      ],
      [
        "File permission",
        "Server export/share policy and file permissions decide which named operations are allowed."
      ],
      [
        "Locking",
        "The server translates allowed requests into storage I/O; client caching and locking must follow the chosen protocol semantics."
      ]
    ],
    "comparison": [
      [
        "Share or export",
        "Published file namespace",
        "Reachability does not authorize a user."
      ],
      [
        "File permission",
        "Policy on a file or directory",
        "Share policy is an additional boundary."
      ],
      [
        "Locking",
        "Coordination of concurrent access",
        "Application behavior must match server semantics."
      ]
    ],
    "example": "Worked case: An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export. Fault: A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone. Diagnosis and recovery: Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied. Boundary check: Who ordinarily owns the filesystem metadata in NAS? The file server. Clients request files rather than directly owning raw shared blocks.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied.",
    "production": "Assign ownership at each dependency boundary. The server translates allowed requests into storage I/O; client caching and locking must follow the chosen protocol semantics. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Reachability does not authorize a user. Application behavior must match server semantics. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Server export/share policy and file permissions decide which named operations are allowed. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone.",
        "Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied."
      ],
      [
        "What should a write-denied investigation retain?",
        "User identity, target share/path and the exact failed operation. A generic unavailable report loses the authorization boundary."
      ],
      [
        "Should SMB and NFS views of one dataset be assumed to have identical identity semantics?",
        "No; mapping and permission behavior require deliberate configuration. Protocol coexistence does not solve identity mapping."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Clients request files rather than directly owning raw shared blocks.",
      "ICMP does not test a file operation.",
      "A generic unavailable report loses the authorization boundary.",
      "Test each required operation explicitly.",
      "Protocol coexistence does not solve identity mapping.",
      "Availability must not erase isolation."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t1"
    ],
    "related": [
      "s8-g0-t3"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for NAS. An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Share or export → Published file namespace",
        "File permission → Policy on a file or directory",
        "Locking → Coordination of concurrent access"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone. Read/list rights can differ from write/create rights.",
      "challenge": "What negative test follows a permission repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Share or export": "Published file namespace. Reachability does not authorize a user.",
      "File permission": "Policy on a file or directory. Share policy is an additional boundary.",
      "Locking": "Coordination of concurrent access. Application behavior must match server semantics."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      },
      {
        "title": "Microsoft: SMB file-service overview",
        "url": "https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g0-t2-QC1",
        "topicId": "s8-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this NAS case?",
        "answer": "An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Share or export"
      },
      {
        "questionId": "s8-g0-t2-QC2",
        "topicId": "s8-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for NAS.",
        "answer": "Server export/share policy and file permissions decide which named operations are allowed.",
        "explanation": "Share policy is an additional boundary.",
        "testedConcept": "File permission"
      },
      {
        "questionId": "s8-g0-t2-QC3",
        "topicId": "s8-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Locking matters here?",
        "answer": "Application behavior must match server semantics.",
        "explanation": "The server translates allowed requests into storage I/O; client caching and locking must follow the chosen protocol semantics.",
        "testedConcept": "Locking"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t2-Q1",
        "topicId": "s8-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Who ordinarily owns the filesystem metadata in NAS?",
        "answer": "The file server.",
        "explanation": "Clients request files rather than directly owning raw shared blocks.",
        "testedConcept": "Share or export"
      },
      {
        "questionId": "s8-g0-t2-Q2",
        "topicId": "s8-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does successful ping prove a user can write a share?",
        "answer": "No; protocol, identity and authorization remain.",
        "explanation": "ICMP does not test a file operation.",
        "testedConcept": "File permission"
      },
      {
        "questionId": "s8-g0-t2-Q3",
        "topicId": "s8-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a write-denied investigation retain?",
        "answer": "User identity, target share/path and the exact failed operation.",
        "explanation": "A generic unavailable report loses the authorization boundary.",
        "testedConcept": "Locking"
      },
      {
        "questionId": "s8-g0-t2-Q4",
        "topicId": "s8-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can a user list a folder but fail to create a file?",
        "answer": "Read/list rights can differ from write/create rights.",
        "explanation": "Test each required operation explicitly.",
        "testedConcept": "Share or export"
      },
      {
        "questionId": "s8-g0-t2-Q5",
        "topicId": "s8-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should SMB and NFS views of one dataset be assumed to have identical identity semantics?",
        "answer": "No; mapping and permission behavior require deliberate configuration.",
        "explanation": "Protocol coexistence does not solve identity mapping.",
        "testedConcept": "File permission"
      },
      {
        "questionId": "s8-g0-t2-Q6",
        "topicId": "s8-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What negative test follows a permission repair?",
        "answer": "An intentionally excluded identity still cannot access the protected data.",
        "explanation": "Availability must not erase isolation.",
        "testedConcept": "Locking"
      },
      {
        "questionId": "s8-g0-t2-Q7",
        "topicId": "s8-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the NAS incident, which assumption failed?",
        "answer": "A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t2-Q8",
        "topicId": "s8-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the NAS incident?",
        "answer": "Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t2-Q9",
        "topicId": "s8-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Share or export and File permission.",
        "answer": "Published file namespace. Policy on a file or directory.",
        "explanation": "Reachability does not authorize a user. Share policy is an additional boundary.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t2-Q10",
        "topicId": "s8-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this NAS worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "An engineering team shares project files through SMB; a Linux compute group uses a separately scoped NFS export.",
      "fault": "A share is reachable but one user cannot create a file; an operator proposes opening the firewall to everyone.",
      "restore": "Compare that user identity, share/export rights and parent-directory permissions; restore only the intended access and verify a prohibited identity remains denied.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g0-t3",
    "batch": "19",
    "title": "SAN",
    "subtitle": "Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t3",
    "definition": "A storage area network carries storage access between initiators and targets, commonly providing block devices over Fibre Channel or iSCSI. A SAN is not synonymous with a filesystem or a backup system.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
    "mental": "Treat this lesson as a handoff between Initiator, Target, Shared block device. An initiator reaches a target over an allowed fabric or IP path and establishes the relevant storage session. A successful earlier handoff cannot stand in for evidence at the next one. Concurrent access needs coordination. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Initiator: Endpoint issuing storage commands. Its identity must match the intended host.",
      "Target: Endpoint servicing commands. Reachability alone does not expose a LUN.",
      "Shared block device: Blocks visible to multiple hosts. Concurrent access needs coordination."
    ],
    "mechanism": [
      "An initiator reaches a target over an allowed fabric or IP path and establishes the relevant storage session.",
      "Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths.",
      "A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently."
    ],
    "flow": [
      [
        "Requested operation",
        "Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics."
      ],
      [
        "Initiator",
        "An initiator reaches a target over an allowed fabric or IP path and establishes the relevant storage session."
      ],
      [
        "Target",
        "Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths."
      ],
      [
        "Shared block device",
        "A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics. Fault: All FC links are up, but a newly installed host sees no assigned LUN. Diagnosis and recovery: Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch. Boundary check: Does a SAN automatically provide file locking between arbitrary hosts? No; block sharing needs a supported coordinating layer. A storage network is below filesystem semantics.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: All FC links are up, but a newly installed host sees no assigned LUN. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.",
    "production": "Assign ownership at each dependency boundary. A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Its identity must match the intended host. Concurrent access needs coordination. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "A storage network is below filesystem semantics.",
      "Both can be necessary.",
      "Two ports in one switch still share that switch.",
      "Observe progressively higher layers.",
      "Path count and device count differ.",
      "Redundancy has a stated failure scope."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t2"
    ],
    "related": [
      "s8-g0-t4"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for SAN. Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Initiator → Endpoint issuing storage commands",
        "Target → Endpoint servicing commands",
        "Shared block device → Blocks visible to multiple hosts"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. All FC links are up, but a newly installed host sees no assigned LUN. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "All FC links are up, but a newly installed host sees no assigned LUN. A local physical/protocol link state, not LUN visibility or useful I/O.",
      "challenge": "What does the three-host design still share? Extend the design with one shared failure domain and state how you would test it.",
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
        "questionId": "s8-g0-t3-QC1",
        "topicId": "s8-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this SAN case?",
        "answer": "Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Initiator"
      },
      {
        "questionId": "s8-g0-t3-QC2",
        "topicId": "s8-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for SAN.",
        "answer": "Array mapping exposes a particular logical unit to that initiator; the host identifies the same unit across paths.",
        "explanation": "Reachability alone does not expose a LUN.",
        "testedConcept": "Target"
      },
      {
        "questionId": "s8-g0-t3-QC3",
        "topicId": "s8-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Shared block device matters here?",
        "answer": "Concurrent access needs coordination.",
        "explanation": "A supported filesystem, datastore or application coordinates use of the blocks; independent hosts must not mount an ordinary local filesystem read-write concurrently.",
        "testedConcept": "Shared block device"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t3-Q1",
        "topicId": "s8-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a SAN automatically provide file locking between arbitrary hosts?",
        "answer": "No; block sharing needs a supported coordinating layer.",
        "explanation": "A storage network is below filesystem semantics.",
        "testedConcept": "Initiator"
      },
      {
        "questionId": "s8-g0-t3-Q2",
        "topicId": "s8-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What separates zoning from LUN masking?",
        "answer": "Zoning limits fabric communication; masking controls array presentation.",
        "explanation": "Both can be necessary.",
        "testedConcept": "Target"
      },
      {
        "questionId": "s8-g0-t3-Q3",
        "topicId": "s8-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why use two independent fabrics?",
        "answer": "One fabric outage should leave a separate path.",
        "explanation": "Two ports in one switch still share that switch.",
        "testedConcept": "Shared block device"
      },
      {
        "questionId": "s8-g0-t3-Q4",
        "topicId": "s8-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can link-up establish?",
        "answer": "A local physical/protocol link state, not LUN visibility or useful I/O.",
        "explanation": "Observe progressively higher layers.",
        "testedConcept": "Initiator"
      },
      {
        "questionId": "s8-g0-t3-Q5",
        "topicId": "s8-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why identify a LUN by stable identity across paths?",
        "answer": "The host must aggregate paths to one device, not mistake them for unrelated disks.",
        "explanation": "Path count and device count differ.",
        "testedConcept": "Target"
      },
      {
        "questionId": "s8-g0-t3-Q6",
        "topicId": "s8-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the three-host design still share?",
        "answer": "The array and any common power, management or data dependencies.",
        "explanation": "Redundancy has a stated failure scope.",
        "testedConcept": "Shared block device"
      },
      {
        "questionId": "s8-g0-t3-Q7",
        "topicId": "s8-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the SAN incident, which assumption failed?",
        "answer": "All FC links are up, but a newly installed host sees no assigned LUN.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t3-Q8",
        "topicId": "s8-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the SAN incident?",
        "answer": "Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t3-Q9",
        "topicId": "s8-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Initiator and Target.",
        "answer": "Endpoint issuing storage commands. Endpoint servicing commands.",
        "explanation": "Its identity must match the intended host. Reachability alone does not expose a LUN.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t3-Q10",
        "topicId": "s8-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this SAN worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Three hosts each have one HBA connection to Fabric A and one to Fabric B, with array target ports on both fabrics.",
      "fault": "All FC links are up, but a newly installed host sees no assigned LUN.",
      "restore": "Trace initiator WWPN, fabric login, active zoning, target login, array mapping and host discovery in order; stop at the first mismatch.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g0-t4",
    "batch": "19",
    "title": "Block Storage",
    "subtitle": "A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t4",
    "definition": "Block storage exposes addressable logical blocks. It leaves file naming, directory layout and much application consistency work to a layer above the block device.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.",
    "mental": "Treat this lesson as a handoff between LBA, Filesystem, Thin volume. The consumer translates file or database operations into logical block reads and writes. A successful earlier handoff cannot stand in for evidence at the next one. Advertised capacity is not reserved physical space. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "LBA: Logical block address. It is not a physical platter position.",
      "Filesystem: Organization of named files over storage. Formatting creates metadata and can destroy prior data.",
      "Thin volume: Logical allocation backed on demand. Advertised capacity is not reserved physical space."
    ],
    "mechanism": [
      "The consumer translates file or database operations into logical block reads and writes.",
      "The device maps logical addresses to physical allocation; thin allocation can defer physical space consumption.",
      "The consumer uses ordering, flushes and recovery metadata to reconstruct consistent state after interruptions."
    ],
    "flow": [
      [
        "Requested operation",
        "A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity."
      ],
      [
        "LBA",
        "The consumer translates file or database operations into logical block reads and writes."
      ],
      [
        "Filesystem",
        "The device maps logical addresses to physical allocation; thin allocation can defer physical space consumption."
      ],
      [
        "Thin volume",
        "The consumer uses ordering, flushes and recovery metadata to reconstruct consistent state after interruptions."
      ]
    ],
    "comparison": [
      [
        "LBA",
        "Logical block address",
        "It is not a physical platter position."
      ],
      [
        "Filesystem",
        "Organization of named files over storage",
        "Formatting creates metadata and can destroy prior data."
      ],
      [
        "Thin volume",
        "Logical allocation backed on demand",
        "Advertised capacity is not reserved physical space."
      ]
    ],
    "example": "Worked case: A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity. Fault: An operator formats an already shared LUN because a second host reports an unknown filesystem. Diagnosis and recovery: Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices. Boundary check: Which layer gives raw blocks file names? A filesystem or application above the block device. Blocks have addresses rather than directory paths.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t4",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An operator formats an already shared LUN because a second host reports an unknown filesystem. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices.",
    "production": "Assign ownership at each dependency boundary. The consumer uses ordering, flushes and recovery metadata to reconstruct consistent state after interruptions. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It is not a physical platter position. Advertised capacity is not reserved physical space. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The device maps logical addresses to physical allocation; thin allocation can defer physical space consumption. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An operator formats an already shared LUN because a second host reports an unknown filesystem.",
        "Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices."
      ],
      [
        "Why is formatting an unknown shared volume unsafe?",
        "It can replace metadata used by other consumers. Unknown does not mean empty."
      ],
      [
        "Can two ordinary ext4 mounts safely write the same LUN independently?",
        "No; that is not a supported shared-write coordination scheme. Use a suitable clustered filesystem or exclusive owner."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Blocks have addresses rather than directory paths.",
      "Logical addressing abstracts the medium.",
      "Unknown does not mean empty.",
      "Logical and physical allocation are distinct.",
      "Use a suitable clustered filesystem or exclusive owner.",
      "A convenient device name alone is insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t3"
    ],
    "related": [
      "s8-g0-t5"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Block Storage. A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "LBA → Logical block address",
        "Filesystem → Organization of named files over storage",
        "Thin volume → Logical allocation backed on demand"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An operator formats an already shared LUN because a second host reports an unknown filesystem. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An operator formats an already shared LUN because a second host reports an unknown filesystem. Not necessarily.",
      "challenge": "What identifies the correct existing volume during discovery? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "LBA": "Logical block address. It is not a physical platter position.",
      "Filesystem": "Organization of named files over storage. Formatting creates metadata and can destroy prior data.",
      "Thin volume": "Logical allocation backed on demand. Advertised capacity is not reserved physical space."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g0-t4-QC1",
        "topicId": "s8-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Block Storage case?",
        "answer": "A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "LBA"
      },
      {
        "questionId": "s8-g0-t4-QC2",
        "topicId": "s8-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Block Storage.",
        "answer": "The device maps logical addresses to physical allocation; thin allocation can defer physical space consumption.",
        "explanation": "Formatting creates metadata and can destroy prior data.",
        "testedConcept": "Filesystem"
      },
      {
        "questionId": "s8-g0-t4-QC3",
        "topicId": "s8-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Thin volume matters here?",
        "answer": "Advertised capacity is not reserved physical space.",
        "explanation": "The consumer uses ordering, flushes and recovery metadata to reconstruct consistent state after interruptions.",
        "testedConcept": "Thin volume"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t4-Q1",
        "topicId": "s8-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which layer gives raw blocks file names?",
        "answer": "A filesystem or application above the block device.",
        "explanation": "Blocks have addresses rather than directory paths.",
        "testedConcept": "LBA"
      },
      {
        "questionId": "s8-g0-t4-Q2",
        "topicId": "s8-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is LBA 100 necessarily a fixed physical sector?",
        "answer": "No; translation and allocation can change placement.",
        "explanation": "Logical addressing abstracts the medium.",
        "testedConcept": "Filesystem"
      },
      {
        "questionId": "s8-g0-t4-Q3",
        "topicId": "s8-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why is formatting an unknown shared volume unsafe?",
        "answer": "It can replace metadata used by other consumers.",
        "explanation": "Unknown does not mean empty.",
        "testedConcept": "Thin volume"
      },
      {
        "questionId": "s8-g0-t4-Q4",
        "topicId": "s8-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "A thin volume reports 2 TiB. Is 2 TiB physically reserved?",
        "answer": "Not necessarily.",
        "explanation": "Logical and physical allocation are distinct.",
        "testedConcept": "LBA"
      },
      {
        "questionId": "s8-g0-t4-Q5",
        "topicId": "s8-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can two ordinary ext4 mounts safely write the same LUN independently?",
        "answer": "No; that is not a supported shared-write coordination scheme.",
        "explanation": "Use a suitable clustered filesystem or exclusive owner.",
        "testedConcept": "Filesystem"
      },
      {
        "questionId": "s8-g0-t4-Q6",
        "topicId": "s8-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What identifies the correct existing volume during discovery?",
        "answer": "Stable device identity plus documented ownership and filesystem signatures.",
        "explanation": "A convenient device name alone is insufficient.",
        "testedConcept": "Thin volume"
      },
      {
        "questionId": "s8-g0-t4-Q7",
        "topicId": "s8-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Block Storage incident, which assumption failed?",
        "answer": "An operator formats an already shared LUN because a second host reports an unknown filesystem.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t4-Q8",
        "topicId": "s8-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Block Storage incident?",
        "answer": "Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t4-Q9",
        "topicId": "s8-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast LBA and Filesystem.",
        "answer": "Logical block address. Organization of named files over storage.",
        "explanation": "It is not a physical platter position. Formatting creates metadata and can destroy prior data.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t4-Q10",
        "topicId": "s8-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Block Storage worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A 2 TiB logical volume uses 400 GiB in a shared pool; several peers can grow into the remaining physical capacity.",
      "fault": "An operator formats an already shared LUN because a second host reports an unknown filesystem.",
      "restore": "Stop writes, identify the intended shared filesystem and existing signatures, and follow its supported discovery procedure; do not initialize unknown devices.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g0-t5",
    "batch": "19",
    "title": "File Storage",
    "subtitle": "A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t5",
    "definition": "File storage presents named files and hierarchical directories with access and metadata operations. Local filesystems and remote NFS/SMB services share this abstraction while differing in transport and consistency behavior.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.",
    "mental": "Treat this lesson as a handoff between Path, Metadata, Atomic rename. Path traversal resolves directories and requires the relevant search permissions at each parent. A successful earlier handoff cannot stand in for evidence at the next one. Cross-filesystem moves need not have the same semantics. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Path: Route through a directory namespace. Parent permissions can block traversal.",
      "Metadata: Names, ownership, times and attributes. Small metadata operations can dominate workloads.",
      "Atomic rename: Indivisible name update within supported scope. Cross-filesystem moves need not have the same semantics."
    ],
    "mechanism": [
      "Path traversal resolves directories and requires the relevant search permissions at each parent.",
      "Opening a file combines identity, access mode and filesystem policy.",
      "Writes, rename, locks and sync calls have specific semantics; application recovery must use those semantics rather than assume all operations are atomic."
    ],
    "flow": [
      [
        "Requested operation",
        "A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem."
      ],
      [
        "Path",
        "Path traversal resolves directories and requires the relevant search permissions at each parent."
      ],
      [
        "Metadata",
        "Opening a file combines identity, access mode and filesystem policy."
      ],
      [
        "Atomic rename",
        "Writes, rename, locks and sync calls have specific semantics; application recovery must use those semantics rather than assume all operations are atomic."
      ]
    ],
    "comparison": [
      [
        "Path",
        "Route through a directory namespace",
        "Parent permissions can block traversal."
      ],
      [
        "Metadata",
        "Names, ownership, times and attributes",
        "Small metadata operations can dominate workloads."
      ],
      [
        "Atomic rename",
        "Indivisible name update within supported scope",
        "Cross-filesystem moves need not have the same semantics."
      ]
    ],
    "example": "Worked case: A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem. Fault: A remote report exists but is partially updated after the writer crashes. Diagnosis and recovery: Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry. Boundary check: Why can a readable file remain inaccessible? A parent directory may deny traversal. Access includes the path to the file.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t5",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A remote report exists but is partially updated after the writer crashes. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry.",
    "production": "Assign ownership at each dependency boundary. Writes, rename, locks and sync calls have specific semantics; application recovery must use those semantics rather than assume all operations are atomic. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Parent permissions can block traversal. Cross-filesystem moves need not have the same semantics. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Opening a file combines identity, access mode and filesystem policy. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A remote report exists but is partially updated after the writer crashes.",
        "Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry."
      ],
      [
        "Is every move an atomic rename?",
        "No; cross-filesystem behavior differs. State the operation scope."
      ],
      [
        "Does a file lock automatically create a backup?",
        "No; it coordinates access. Recovery copies have a separate purpose."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Access includes the path to the file.",
      "IOPS and namespace operations matter.",
      "State the operation scope.",
      "Metadata and application state differ.",
      "Recovery copies have a separate purpose.",
      "Throughput tuning does not fix permissions."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t4"
    ],
    "related": [
      "s8-g0-t6"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for File Storage. A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Path → Route through a directory namespace",
        "Metadata → Names, ownership, times and attributes",
        "Atomic rename → Indivisible name update within supported scope"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A remote report exists but is partially updated after the writer crashes. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A remote report exists but is partially updated after the writer crashes. Name existence does not establish a complete committed report.",
      "challenge": "What evidence distinguishes server slowness from client path denial? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Path": "Route through a directory namespace. Parent permissions can block traversal.",
      "Metadata": "Names, ownership, times and attributes. Small metadata operations can dominate workloads.",
      "Atomic rename": "Indivisible name update within supported scope. Cross-filesystem moves need not have the same semantics."
    },
    "sources": [
      {
        "title": "RHEL 9 storage layers and device management",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/managing_storage_devices/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g0-t5-QC1",
        "topicId": "s8-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this File Storage case?",
        "answer": "A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Path"
      },
      {
        "questionId": "s8-g0-t5-QC2",
        "topicId": "s8-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for File Storage.",
        "answer": "Opening a file combines identity, access mode and filesystem policy.",
        "explanation": "Small metadata operations can dominate workloads.",
        "testedConcept": "Metadata"
      },
      {
        "questionId": "s8-g0-t5-QC3",
        "topicId": "s8-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Atomic rename matters here?",
        "answer": "Cross-filesystem moves need not have the same semantics.",
        "explanation": "Writes, rename, locks and sync calls have specific semantics; application recovery must use those semantics rather than assume all operations are atomic.",
        "testedConcept": "Atomic rename"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t5-Q1",
        "topicId": "s8-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can a readable file remain inaccessible?",
        "answer": "A parent directory may deny traversal.",
        "explanation": "Access includes the path to the file.",
        "testedConcept": "Path"
      },
      {
        "questionId": "s8-g0-t5-Q2",
        "topicId": "s8-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What workload can bottleneck without high byte throughput?",
        "answer": "Many small metadata operations.",
        "explanation": "IOPS and namespace operations matter.",
        "testedConcept": "Metadata"
      },
      {
        "questionId": "s8-g0-t5-Q3",
        "topicId": "s8-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is every move an atomic rename?",
        "answer": "No; cross-filesystem behavior differs.",
        "explanation": "State the operation scope.",
        "testedConcept": "Atomic rename"
      },
      {
        "questionId": "s8-g0-t5-Q4",
        "topicId": "s8-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why validate file contents after a crash?",
        "answer": "Name existence does not establish a complete committed report.",
        "explanation": "Metadata and application state differ.",
        "testedConcept": "Path"
      },
      {
        "questionId": "s8-g0-t5-Q5",
        "topicId": "s8-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a file lock automatically create a backup?",
        "answer": "No; it coordinates access.",
        "explanation": "Recovery copies have a separate purpose.",
        "testedConcept": "Metadata"
      },
      {
        "questionId": "s8-g0-t5-Q6",
        "topicId": "s8-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence distinguishes server slowness from client path denial?",
        "answer": "Timed operation results and exact identity/path errors.",
        "explanation": "Throughput tuning does not fix permissions.",
        "testedConcept": "Atomic rename"
      },
      {
        "questionId": "s8-g0-t5-Q7",
        "topicId": "s8-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the File Storage incident, which assumption failed?",
        "answer": "A remote report exists but is partially updated after the writer crashes.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t5-Q8",
        "topicId": "s8-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the File Storage incident?",
        "answer": "Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t5-Q9",
        "topicId": "s8-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Path and Metadata.",
        "answer": "Route through a directory namespace. Names, ownership, times and attributes.",
        "explanation": "Parent permissions can block traversal. Small metadata operations can dominate workloads.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t5-Q10",
        "topicId": "s8-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this File Storage worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A report writer creates an owned temporary file, flushes it, and replaces its prior report on the same filesystem.",
      "fault": "A remote report exists but is partially updated after the writer crashes.",
      "restore": "Examine the writer commit protocol, sync requirements and filesystem guarantees; validate the restored report content, not just its directory entry.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g0-t6",
    "batch": "19",
    "title": "Object Storage",
    "subtitle": "An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g0-t6",
    "definition": "Object storage addresses data as objects by keys through an API. Each object combines payload and metadata; bucket policy, versions and lifecycle rules govern access and retention.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.",
    "mental": "Treat this lesson as a handoff between Object key, Version, Conditional request. The client authenticates an API request naming a bucket and object key. A successful earlier handoff cannot stand in for evidence at the next one. It can prevent a stale writer overwriting newer state. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Object key: Identifier within a bucket. A slash may be part of a key rather than a real directory.",
      "Version: Retained object revision when enabled. Retention and deletion rules still matter.",
      "Conditional request: Operation gated by a precondition. It can prevent a stale writer overwriting newer state."
    ],
    "mechanism": [
      "The client authenticates an API request naming a bucket and object key.",
      "The service applies authorization and operation semantics, then stores or returns object data and metadata.",
      "Version and lifecycle settings control retained historical objects; applications must account for the chosen service consistency and conditional-write guarantees."
    ],
    "flow": [
      [
        "Requested operation",
        "An artifact publisher stores immutable build objects by digest and separately updates a small release manifest."
      ],
      [
        "Object key",
        "The client authenticates an API request naming a bucket and object key."
      ],
      [
        "Version",
        "The service applies authorization and operation semantics, then stores or returns object data and metadata."
      ],
      [
        "Conditional request",
        "Version and lifecycle settings control retained historical objects; applications must account for the chosen service consistency and conditional-write guarantees."
      ]
    ],
    "comparison": [
      [
        "Object key",
        "Identifier within a bucket",
        "A slash may be part of a key rather than a real directory."
      ],
      [
        "Version",
        "Retained object revision when enabled",
        "Retention and deletion rules still matter."
      ],
      [
        "Conditional request",
        "Operation gated by a precondition",
        "It can prevent a stale writer overwriting newer state."
      ]
    ],
    "example": "Worked case: An artifact publisher stores immutable build objects by digest and separately updates a small release manifest. Fault: Two publishers overwrite a release manifest from stale reads, losing one update. Diagnosis and recovery: Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects. Boundary check: Does an object key containing slashes guarantee POSIX directories? No; key structure is not a filesystem contract. APIs define the namespace.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g0-t6",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: An artifact publisher stores immutable build objects by digest and separately updates a small release manifest. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Two publishers overwrite a release manifest from stale reads, losing one update. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects.",
    "production": "Assign ownership at each dependency boundary. Version and lifecycle settings control retained historical objects; applications must account for the chosen service consistency and conditional-write guarantees. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A slash may be part of a key rather than a real directory. It can prevent a stale writer overwriting newer state. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The service applies authorization and operation semantics, then stores or returns object data and metadata. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.",
    "troubleshooting": [
      [
        "Two publishers overwrite a release manifest from stale reads, losing one update.",
        "Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects."
      ],
      [
        "What prevents a stale manifest writer from silently overwriting a newer version?",
        "An appropriate conditional update or serialization protocol. Read then unconditional write races."
      ],
      [
        "Does enabling versioning alone guarantee a recoverable backup?",
        "No; permissions, retention and independent recovery remain necessary. Versions can still be deleted or become inaccessible."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "APIs define the namespace.",
      "A mutable name alone cannot identify bytes.",
      "Read then unconditional write races.",
      "Do not carry assumptions between products.",
      "Versions can still be deleted or become inaccessible.",
      "A successful listing does not prove content recovery."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t5"
    ],
    "related": [
      "s8-g1-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Object Storage. An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Object key → Identifier within a bucket",
        "Version → Retained object revision when enabled",
        "Conditional request → Operation gated by a precondition"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Two publishers overwrite a release manifest from stale reads, losing one update. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Two publishers overwrite a release manifest from stale reads, losing one update. No; guarantees depend on service and operation.",
      "challenge": "What belongs in an object restore test? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Object key": "Identifier within a bucket. A slash may be part of a key rather than a real directory.",
      "Version": "Retained object revision when enabled. Retention and deletion rules still matter.",
      "Conditional request": "Operation gated by a precondition. It can prevent a stale writer overwriting newer state."
    },
    "sources": [
      {
        "title": "Amazon S3 object, bucket and version concepts",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g0-t6-QC1",
        "topicId": "s8-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Object Storage case?",
        "answer": "An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Object key"
      },
      {
        "questionId": "s8-g0-t6-QC2",
        "topicId": "s8-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Object Storage.",
        "answer": "The service applies authorization and operation semantics, then stores or returns object data and metadata.",
        "explanation": "Retention and deletion rules still matter.",
        "testedConcept": "Version"
      },
      {
        "questionId": "s8-g0-t6-QC3",
        "topicId": "s8-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Conditional request matters here?",
        "answer": "It can prevent a stale writer overwriting newer state.",
        "explanation": "Version and lifecycle settings control retained historical objects; applications must account for the chosen service consistency and conditional-write guarantees.",
        "testedConcept": "Conditional request"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g0-t6-Q1",
        "topicId": "s8-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an object key containing slashes guarantee POSIX directories?",
        "answer": "No; key structure is not a filesystem contract.",
        "explanation": "APIs define the namespace.",
        "testedConcept": "Object key"
      },
      {
        "questionId": "s8-g0-t6-Q2",
        "topicId": "s8-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why publish artifacts under immutable digest keys?",
        "answer": "Different content obtains a distinct identity that can be verified.",
        "explanation": "A mutable name alone cannot identify bytes.",
        "testedConcept": "Version"
      },
      {
        "questionId": "s8-g0-t6-Q3",
        "topicId": "s8-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What prevents a stale manifest writer from silently overwriting a newer version?",
        "answer": "An appropriate conditional update or serialization protocol.",
        "explanation": "Read then unconditional write races.",
        "testedConcept": "Conditional request"
      },
      {
        "questionId": "s8-g0-t6-Q4",
        "topicId": "s8-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is object storage universally eventually consistent?",
        "answer": "No; guarantees depend on service and operation.",
        "explanation": "Do not carry assumptions between products.",
        "testedConcept": "Object key"
      },
      {
        "questionId": "s8-g0-t6-Q5",
        "topicId": "s8-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does enabling versioning alone guarantee a recoverable backup?",
        "answer": "No; permissions, retention and independent recovery remain necessary.",
        "explanation": "Versions can still be deleted or become inaccessible.",
        "testedConcept": "Version"
      },
      {
        "questionId": "s8-g0-t6-Q6",
        "topicId": "s8-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What belongs in an object restore test?",
        "answer": "Retrieve the intended version and validate its digest and application references.",
        "explanation": "A successful listing does not prove content recovery.",
        "testedConcept": "Conditional request"
      },
      {
        "questionId": "s8-g0-t6-Q7",
        "topicId": "s8-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Object Storage incident, which assumption failed?",
        "answer": "Two publishers overwrite a release manifest from stale reads, losing one update.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g0-t6-Q8",
        "topicId": "s8-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Object Storage incident?",
        "answer": "Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g0-t6-Q9",
        "topicId": "s8-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Object key and Version.",
        "answer": "Identifier within a bucket. Retained object revision when enabled.",
        "explanation": "A slash may be part of a key rather than a real directory. Retention and deletion rules still matter.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g0-t6-Q10",
        "topicId": "s8-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Object Storage worksheet leave unverified?",
        "answer": "Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "io",
      "baseline": "An artifact publisher stores immutable build objects by digest and separately updates a small release manifest.",
      "fault": "Two publishers overwrite a release manifest from stale reads, losing one update.",
      "restore": "Use the service-supported conditional update or serialized publisher policy and verify the final manifest references the intended immutable objects.",
      "scope": "Payload arithmetic only: operations/s multiplied by bytes/operation. A latency-times-rate estimate uses a steady-state average. No workload, queue distribution, protocol overhead or benchmark is simulated."
    },
    "artifacts": [
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
    "id": "s8-g1-t0",
    "batch": "19",
    "title": "NFS",
    "subtitle": "A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g1-t0",
    "definition": "NFS is a network filesystem protocol. NFSv4 integrates stateful operations such as opens and locking; security flavor, identity mapping and server export policy are part of the access contract.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.",
    "mental": "Treat this lesson as a handoff between Export, Security flavor, Root squashing. Client and server agree on protocol version and security flavor before interpreting file operations. A successful earlier handoff cannot stand in for evidence at the next one. Client root is not automatically server root. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Export: Server-published filesystem scope. Allowed client is not an unrestricted user.",
      "Security flavor: Authentication/protection mode. AUTH_SYS and Kerberos are different trust models.",
      "Root squashing: Mapping client root to an unprivileged identity. Client root is not automatically server root."
    ],
    "mechanism": [
      "Client and server agree on protocol version and security flavor before interpreting file operations.",
      "The server combines export policy with mapped identities and filesystem permissions.",
      "State and caches are recovered or revalidated under the protocol; a mounted path does not guarantee every operation succeeds."
    ],
    "flow": [
      [
        "Requested operation",
        "A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files."
      ],
      [
        "Export",
        "Client and server agree on protocol version and security flavor before interpreting file operations."
      ],
      [
        "Security flavor",
        "The server combines export policy with mapped identities and filesystem permissions."
      ],
      [
        "Root squashing",
        "State and caches are recovered or revalidated under the protocol; a mounted path does not guarantee every operation succeeds."
      ]
    ],
    "comparison": [
      [
        "Export",
        "Server-published filesystem scope",
        "Allowed client is not an unrestricted user."
      ],
      [
        "Security flavor",
        "Authentication/protection mode",
        "AUTH_SYS and Kerberos are different trust models."
      ],
      [
        "Root squashing",
        "Mapping client root to an unprivileged identity",
        "Client root is not automatically server root."
      ]
    ],
    "example": "Worked case: A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files. Fault: A client root process receives permission denied and the proposed fix is disabling root squashing globally. Diagnosis and recovery: Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary. Boundary check: Which common transport endpoint serves ordinary NFSv4 over TCP? TCP 2049. Other versions and deployment modes can require additional services.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g1-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A client root process receives permission denied and the proposed fix is disabling root squashing globally. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary.",
    "production": "Assign ownership at each dependency boundary. State and caches are recovered or revalidated under the protocol; a mounted path does not guarantee every operation succeeds. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Allowed client is not an unrestricted user. Client root is not automatically server root. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The server combines export policy with mapped identities and filesystem permissions. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A client root process receives permission denied and the proposed fix is disabling root squashing globally.",
        "Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary."
      ],
      [
        "What should be recorded with an NFS mount?",
        "Version, security flavor, export and mount options. The same pathname can hide different semantics."
      ],
      [
        "Why is AUTH_SYS inappropriate as proof of cryptographic user identity?",
        "It relies on client-supplied identity information within its trust model. Use supported stronger authentication where required."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Other versions and deployment modes can require additional services.",
      "Local privilege is not remote ownership.",
      "The same pathname can hide different semantics.",
      "Read-only exports can mount normally.",
      "Use supported stronger authentication where required.",
      "A broad export change can violate policy."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g0-t6"
    ],
    "related": [
      "s8-g1-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for NFS. A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Export → Server-published filesystem scope",
        "Security flavor → Authentication/protection mode",
        "Root squashing → Mapping client root to an unprivileged identity"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A client root process receives permission denied and the proposed fix is disabling root squashing globally. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A client root process receives permission denied and the proposed fix is disabling root squashing globally. No; test the named user and operation.",
      "challenge": "What validates the narrow repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Export": "Server-published filesystem scope. Allowed client is not an unrestricted user.",
      "Security flavor": "Authentication/protection mode. AUTH_SYS and Kerberos are different trust models.",
      "Root squashing": "Mapping client root to an unprivileged identity. Client root is not automatically server root."
    },
    "sources": [
      {
        "title": "RHEL 9 network file services: NFS and identity",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_and_using_network_file_services/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g1-t0-QC1",
        "topicId": "s8-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this NFS case?",
        "answer": "A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Export"
      },
      {
        "questionId": "s8-g1-t0-QC2",
        "topicId": "s8-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for NFS.",
        "answer": "The server combines export policy with mapped identities and filesystem permissions.",
        "explanation": "AUTH_SYS and Kerberos are different trust models.",
        "testedConcept": "Security flavor"
      },
      {
        "questionId": "s8-g1-t0-QC3",
        "topicId": "s8-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Root squashing matters here?",
        "answer": "Client root is not automatically server root.",
        "explanation": "State and caches are recovered or revalidated under the protocol; a mounted path does not guarantee every operation succeeds.",
        "testedConcept": "Root squashing"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g1-t0-Q1",
        "topicId": "s8-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which common transport endpoint serves ordinary NFSv4 over TCP?",
        "answer": "TCP 2049.",
        "explanation": "Other versions and deployment modes can require additional services.",
        "testedConcept": "Export"
      },
      {
        "questionId": "s8-g1-t0-Q2",
        "topicId": "s8-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can client root be denied by the server?",
        "answer": "Root squashing and server permissions may deliberately restrict it.",
        "explanation": "Local privilege is not remote ownership.",
        "testedConcept": "Security flavor"
      },
      {
        "questionId": "s8-g1-t0-Q3",
        "topicId": "s8-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should be recorded with an NFS mount?",
        "answer": "Version, security flavor, export and mount options.",
        "explanation": "The same pathname can hide different semantics.",
        "testedConcept": "Root squashing"
      },
      {
        "questionId": "s8-g1-t0-Q4",
        "topicId": "s8-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does successful mounting prove writes are permitted?",
        "answer": "No; test the named user and operation.",
        "explanation": "Read-only exports can mount normally.",
        "testedConcept": "Export"
      },
      {
        "questionId": "s8-g1-t0-Q5",
        "topicId": "s8-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why is AUTH_SYS inappropriate as proof of cryptographic user identity?",
        "answer": "It relies on client-supplied identity information within its trust model.",
        "explanation": "Use supported stronger authentication where required.",
        "testedConcept": "Security flavor"
      },
      {
        "questionId": "s8-g1-t0-Q6",
        "topicId": "s8-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates the narrow repair?",
        "answer": "The intended writer succeeds and the read-only client still cannot write.",
        "explanation": "A broad export change can violate policy.",
        "testedConcept": "Root squashing"
      },
      {
        "questionId": "s8-g1-t0-Q7",
        "topicId": "s8-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the NFS incident, which assumption failed?",
        "answer": "A client root process receives permission denied and the proposed fix is disabling root squashing globally.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g1-t0-Q8",
        "topicId": "s8-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the NFS incident?",
        "answer": "Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g1-t0-Q9",
        "topicId": "s8-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Export and Security flavor.",
        "answer": "Server-published filesystem scope. Authentication/protection mode.",
        "explanation": "Allowed client is not an unrestricted user. AUTH_SYS and Kerberos are different trust models.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g1-t0-Q10",
        "topicId": "s8-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this NFS worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A Linux analytics client mounts an authorized NFSv4 dataset read-only; a separate writer identity publishes files.",
      "fault": "A client root process receives permission denied and the proposed fix is disabling root squashing globally.",
      "restore": "Check export scope, security flavor, mapped UID/GID and directory permissions; grant the narrow intended writer instead of removing the root boundary.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g1-t1",
    "batch": "19",
    "title": "SMB",
    "subtitle": "A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g1-t1",
    "definition": "SMB provides remote file and related services. The negotiated dialect, authentication, signing, encryption and authorization determine the actual session properties; the name SMB alone does not specify them.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.",
    "mental": "Treat this lesson as a handoff between Dialect, Signing, Encryption. The client negotiates a dialect and establishes an authenticated session. A successful earlier handoff cannot stand in for evidence at the next one. Verify negotiation and policy rather than assume it. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Dialect: Negotiated protocol version. Do not infer it from the OS brand.",
      "Signing: Message integrity/authenticity protection. It is different from encryption.",
      "Encryption: Protection of message confidentiality. Verify negotiation and policy rather than assume it."
    ],
    "mechanism": [
      "The client negotiates a dialect and establishes an authenticated session.",
      "A tree connection selects the share; share and filesystem policy constrain the requested operation.",
      "The server manages opens, locks and supported caching/reconnection behavior while client operations expose success or failure."
    ],
    "flow": [
      [
        "Requested operation",
        "A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary."
      ],
      [
        "Dialect",
        "The client negotiates a dialect and establishes an authenticated session."
      ],
      [
        "Signing",
        "A tree connection selects the share; share and filesystem policy constrain the requested operation."
      ],
      [
        "Encryption",
        "The server manages opens, locks and supported caching/reconnection behavior while client operations expose success or failure."
      ]
    ],
    "comparison": [
      [
        "Dialect",
        "Negotiated protocol version",
        "Do not infer it from the OS brand."
      ],
      [
        "Signing",
        "Message integrity/authenticity protection",
        "It is different from encryption."
      ],
      [
        "Encryption",
        "Protection of message confidentiality",
        "Verify negotiation and policy rather than assume it."
      ]
    ],
    "example": "Worked case: A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary. Fault: A migrated share grants broad share-level access but NTFS permissions omit the intended writer group. Diagnosis and recovery: Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations. Boundary check: Does successful authentication grant access to every share? No; authorization follows authentication. Identity and rights are separate.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g1-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A migrated share grants broad share-level access but NTFS permissions omit the intended writer group. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations.",
    "production": "Assign ownership at each dependency boundary. The server manages opens, locks and supported caching/reconnection behavior while client operations expose success or failure. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Do not infer it from the OS brand. Verify negotiation and policy rather than assume it. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A tree connection selects the share; share and filesystem policy constrain the requested operation. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A migrated share grants broad share-level access but NTFS permissions omit the intended writer group.",
        "Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations."
      ],
      [
        "Does signing hide file contents from an observer?",
        "No; encryption supplies confidentiality. Integrity and secrecy differ."
      ],
      [
        "What evidence confirms actual dialect/security use?",
        "Negotiated session properties from the real client and server. Configured intent alone is weaker evidence."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Identity and rights are separate.",
      "Legacy and alternate transports require their own scope.",
      "Integrity and secrecy differ.",
      "Changing only one can leave denial intact.",
      "Configured intent alone is weaker evidence.",
      "Protocol downgrade is not a permission repair."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g1-t0"
    ],
    "related": [
      "s8-g1-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for SMB. A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Dialect → Negotiated protocol version",
        "Signing → Message integrity/authenticity protection",
        "Encryption → Protection of message confidentiality"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A migrated share grants broad share-level access but NTFS permissions omit the intended writer group. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A migrated share grants broad share-level access but NTFS permissions omit the intended writer group. Both constrain access in the Windows example.",
      "challenge": "Should SMB1 be enabled to bypass an unexplained access failure? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Dialect": "Negotiated protocol version. Do not infer it from the OS brand.",
      "Signing": "Message integrity/authenticity protection. It is different from encryption.",
      "Encryption": "Protection of message confidentiality. Verify negotiation and policy rather than assume it."
    },
    "sources": [
      {
        "title": "Microsoft: SMB file-service overview",
        "url": "https://learn.microsoft.com/en-us/windows-server/storage/file-server/file-server-smb-overview",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g1-t1-QC1",
        "topicId": "s8-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this SMB case?",
        "answer": "A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Dialect"
      },
      {
        "questionId": "s8-g1-t1-QC2",
        "topicId": "s8-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for SMB.",
        "answer": "A tree connection selects the share; share and filesystem policy constrain the requested operation.",
        "explanation": "It is different from encryption.",
        "testedConcept": "Signing"
      },
      {
        "questionId": "s8-g1-t1-QC3",
        "topicId": "s8-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Encryption matters here?",
        "answer": "Verify negotiation and policy rather than assume it.",
        "explanation": "The server manages opens, locks and supported caching/reconnection behavior while client operations expose success or failure.",
        "testedConcept": "Encryption"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g1-t1-Q1",
        "topicId": "s8-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does successful authentication grant access to every share?",
        "answer": "No; authorization follows authentication.",
        "explanation": "Identity and rights are separate.",
        "testedConcept": "Dialect"
      },
      {
        "questionId": "s8-g1-t1-Q2",
        "topicId": "s8-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the common direct SMB TCP port?",
        "answer": "445.",
        "explanation": "Legacy and alternate transports require their own scope.",
        "testedConcept": "Signing"
      },
      {
        "questionId": "s8-g1-t1-Q3",
        "topicId": "s8-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does signing hide file contents from an observer?",
        "answer": "No; encryption supplies confidentiality.",
        "explanation": "Integrity and secrecy differ.",
        "testedConcept": "Encryption"
      },
      {
        "questionId": "s8-g1-t1-Q4",
        "topicId": "s8-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect both share and filesystem permissions?",
        "answer": "Both constrain access in the Windows example.",
        "explanation": "Changing only one can leave denial intact.",
        "testedConcept": "Dialect"
      },
      {
        "questionId": "s8-g1-t1-Q5",
        "topicId": "s8-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence confirms actual dialect/security use?",
        "answer": "Negotiated session properties from the real client and server.",
        "explanation": "Configured intent alone is weaker evidence.",
        "testedConcept": "Signing"
      },
      {
        "questionId": "s8-g1-t1-Q6",
        "topicId": "s8-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Should SMB1 be enabled to bypass an unexplained access failure?",
        "answer": "No; identify the failure and use a supported protocol configuration.",
        "explanation": "Protocol downgrade is not a permission repair.",
        "testedConcept": "Encryption"
      },
      {
        "questionId": "s8-g1-t1-Q7",
        "topicId": "s8-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the SMB incident, which assumption failed?",
        "answer": "A migrated share grants broad share-level access but NTFS permissions omit the intended writer group.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g1-t1-Q8",
        "topicId": "s8-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the SMB incident?",
        "answer": "Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g1-t1-Q9",
        "topicId": "s8-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Dialect and Signing.",
        "answer": "Negotiated protocol version. Message integrity/authenticity protection.",
        "explanation": "Do not infer it from the OS brand. It is different from encryption.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g1-t1-Q10",
        "topicId": "s8-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this SMB worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A Windows user reads a finance share successfully but is denied modifying payroll; this is an intentional permission boundary.",
      "fault": "A migrated share grants broad share-level access but NTFS permissions omit the intended writer group.",
      "restore": "Compare effective share and filesystem access for the named principal; restore the missing narrow group entry and retest permitted and denied operations.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g1-t2",
    "batch": "19",
    "title": "iSCSI",
    "subtitle": "A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g1-t2",
    "definition": "iSCSI transports SCSI commands over TCP/IP. An initiator identifies itself, logs in to a target portal and accesses authorized logical units; IP connectivity is only the first prerequisite.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.",
    "mental": "Treat this lesson as a handoff between IQN, Portal, CHAP. The initiator reaches a target portal and negotiates a session, with configured authentication where required. A successful earlier handoff cannot stand in for evidence at the next one. It does not encrypt block payloads. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "IQN: An iSCSI qualified name. It identifies an endpoint, not a secret.",
      "Portal: Target IP address and port. Multiple portals may share one physical dependency.",
      "CHAP: Challenge-response authentication. It does not encrypt block payloads."
    ],
    "mechanism": [
      "The initiator reaches a target portal and negotiates a session, with configured authentication where required.",
      "The target authorizes initiator identity and presents mapped LUNs.",
      "Host multipathing associates supported sessions and paths with stable device identity; filesystems consume the resulting device."
    ],
    "flow": [
      [
        "Requested operation",
        "A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN."
      ],
      [
        "IQN",
        "The initiator reaches a target portal and negotiates a session, with configured authentication where required."
      ],
      [
        "Portal",
        "The target authorizes initiator identity and presents mapped LUNs."
      ],
      [
        "CHAP",
        "Host multipathing associates supported sessions and paths with stable device identity; filesystems consume the resulting device."
      ]
    ],
    "comparison": [
      [
        "IQN",
        "An iSCSI qualified name",
        "It identifies an endpoint, not a secret."
      ],
      [
        "Portal",
        "Target IP address and port",
        "Multiple portals may share one physical dependency."
      ],
      [
        "CHAP",
        "Challenge-response authentication",
        "It does not encrypt block payloads."
      ]
    ],
    "example": "Worked case: A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN. Fault: Ping to the target succeeds, but the initiator is absent from the array host mapping. Diagnosis and recovery: Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it. Boundary check: What common TCP destination serves iSCSI? 3260. The management web port is a different service.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g1-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Ping to the target succeeds, but the initiator is absent from the array host mapping. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it.",
    "production": "Assign ownership at each dependency boundary. Host multipathing associates supported sessions and paths with stable device identity; filesystems consume the resulting device. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It identifies an endpoint, not a secret. It does not encrypt block payloads. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The target authorizes initiator identity and presents mapped LUNs. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "Ping to the target succeeds, but the initiator is absent from the array host mapping.",
        "Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it."
      ],
      [
        "Does CHAP encrypt application blocks?",
        "No. Authentication and confidentiality are separate properties."
      ],
      [
        "Do two target IPs guarantee independent paths?",
        "No; they can share NIC, switch, power or controller dependencies. Map the full failure domain."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "The management web port is a different service.",
      "Authentication requires separate material.",
      "Authentication and confidentiality are separate properties.",
      "IP reachability is only one layer.",
      "Map the full failure domain.",
      "Do not initialize a device simply because it is newly visible."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g1-t1"
    ],
    "related": [
      "s8-g1-t3"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for iSCSI. A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "IQN → An iSCSI qualified name",
        "Portal → Target IP address and port",
        "CHAP → Challenge-response authentication"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Ping to the target succeeds, but the initiator is absent from the array host mapping. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Ping to the target succeeds, but the initiator is absent from the array host mapping. Session, authentication or array mapping may fail.",
      "challenge": "What host evidence should follow mapping? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "IQN": "An iSCSI qualified name. It identifies an endpoint, not a secret.",
      "Portal": "Target IP address and port. Multiple portals may share one physical dependency.",
      "CHAP": "Challenge-response authentication. It does not encrypt block payloads."
    },
    "sources": [
      {
        "title": "RFC 7143: iSCSI protocol",
        "url": "https://www.rfc-editor.org/rfc/rfc7143.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g1-t2-QC1",
        "topicId": "s8-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this iSCSI case?",
        "answer": "A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "IQN"
      },
      {
        "questionId": "s8-g1-t2-QC2",
        "topicId": "s8-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for iSCSI.",
        "answer": "The target authorizes initiator identity and presents mapped LUNs.",
        "explanation": "Multiple portals may share one physical dependency.",
        "testedConcept": "Portal"
      },
      {
        "questionId": "s8-g1-t2-QC3",
        "topicId": "s8-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of CHAP matters here?",
        "answer": "It does not encrypt block payloads.",
        "explanation": "Host multipathing associates supported sessions and paths with stable device identity; filesystems consume the resulting device.",
        "testedConcept": "CHAP"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g1-t2-Q1",
        "topicId": "s8-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What common TCP destination serves iSCSI?",
        "answer": "3260.",
        "explanation": "The management web port is a different service.",
        "testedConcept": "IQN"
      },
      {
        "questionId": "s8-g1-t2-Q2",
        "topicId": "s8-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is an IQN a password?",
        "answer": "No; it is an identifier.",
        "explanation": "Authentication requires separate material.",
        "testedConcept": "Portal"
      },
      {
        "questionId": "s8-g1-t2-Q3",
        "topicId": "s8-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does CHAP encrypt application blocks?",
        "answer": "No.",
        "explanation": "Authentication and confidentiality are separate properties.",
        "testedConcept": "CHAP"
      },
      {
        "questionId": "s8-g1-t2-Q4",
        "topicId": "s8-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can ping succeed while no LUN appears?",
        "answer": "Session, authentication or array mapping may fail.",
        "explanation": "IP reachability is only one layer.",
        "testedConcept": "IQN"
      },
      {
        "questionId": "s8-g1-t2-Q5",
        "topicId": "s8-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Do two target IPs guarantee independent paths?",
        "answer": "No; they can share NIC, switch, power or controller dependencies.",
        "explanation": "Map the full failure domain.",
        "testedConcept": "Portal"
      },
      {
        "questionId": "s8-g1-t2-Q6",
        "topicId": "s8-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What host evidence should follow mapping?",
        "answer": "Correct stable device identity and expected usable paths.",
        "explanation": "Do not initialize a device simply because it is newly visible.",
        "testedConcept": "CHAP"
      },
      {
        "questionId": "s8-g1-t2-Q7",
        "topicId": "s8-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the iSCSI incident, which assumption failed?",
        "answer": "Ping to the target succeeds, but the initiator is absent from the array host mapping.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g1-t2-Q8",
        "topicId": "s8-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the iSCSI incident?",
        "answer": "Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g1-t2-Q9",
        "topicId": "s8-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast IQN and Portal.",
        "answer": "An iSCSI qualified name. Target IP address and port.",
        "explanation": "It identifies an endpoint, not a secret. Multiple portals may share one physical dependency.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g1-t2-Q10",
        "topicId": "s8-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this iSCSI worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A host uses separate IP storage networks A and B to reach two supported target portals for one mapped LUN.",
      "fault": "Ping to the target succeeds, but the initiator is absent from the array host mapping.",
      "restore": "Verify the intended IQN, session/authentication state and exact LUN map, then confirm one stable device and supported paths without formatting it.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g1-t3",
    "batch": "19",
    "title": "Fibre Channel",
    "subtitle": "One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g1-t3",
    "definition": "Fibre Channel is a storage networking architecture with fabric addressing, login and frame transport. FCP carries SCSI over FC; NVMe/FC uses the fabric for a different command set.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.",
    "mental": "Treat this lesson as a handoff between FCID, FCP, Buffer credit. A physical port establishes a link and logs in to the fabric, obtaining a fabric address in a switched fabric. A successful earlier handoff cannot stand in for evidence at the next one. Credit starvation can limit throughput without link loss. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "FCID: Fabric-assigned address. It can change and differs from the port WWPN.",
      "FCP: SCSI carried over Fibre Channel. FC also supports other upper layers.",
      "Buffer credit: Receiver buffer flow-control allowance. Credit starvation can limit throughput without link loss."
    ],
    "mechanism": [
      "A physical port establishes a link and logs in to the fabric, obtaining a fabric address in a switched fabric.",
      "Name-service and active zoning state constrain which initiator and target ports can communicate.",
      "Upper-layer login and array authorization allow commands; buffer-credit behavior and error rates affect delivery."
    ],
    "flow": [
      [
        "Requested operation",
        "One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array."
      ],
      [
        "FCID",
        "A physical port establishes a link and logs in to the fabric, obtaining a fabric address in a switched fabric."
      ],
      [
        "FCP",
        "Name-service and active zoning state constrain which initiator and target ports can communicate."
      ],
      [
        "Buffer credit",
        "Upper-layer login and array authorization allow commands; buffer-credit behavior and error rates affect delivery."
      ]
    ],
    "comparison": [
      [
        "FCID",
        "Fabric-assigned address",
        "It can change and differs from the port WWPN."
      ],
      [
        "FCP",
        "SCSI carried over Fibre Channel",
        "FC also supports other upper layers."
      ],
      [
        "Buffer credit",
        "Receiver buffer flow-control allowance",
        "Credit starvation can limit throughput without link loss."
      ]
    ],
    "example": "Worked case: One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array. Fault: An HBA is online but active zoning uses the replaced adapter WWPN. Diagnosis and recovery: Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path. Boundary check: Does native FC require a TCP port? No; it is not TCP/IP transport. Management over IP is separate.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g1-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An HBA is online but active zoning uses the replaced adapter WWPN. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path.",
    "production": "Assign ownership at each dependency boundary. Upper-layer login and array authorization allow commands; buffer-credit behavior and error rates affect delivery. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It can change and differs from the port WWPN. Credit starvation can limit throughput without link loss. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Name-service and active zoning state constrain which initiator and target ports can communicate. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An HBA is online but active zoning uses the replaced adapter WWPN.",
        "Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path."
      ],
      [
        "What does FCP carry?",
        "SCSI commands and data over Fibre Channel. NVMe/FC is distinct."
      ],
      [
        "Can depleted buffer credits affect a healthy link?",
        "Yes; flow control can stall transmission. Link-up does not imply available throughput."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Management over IP is separate.",
      "Do not zone by a transient assumption.",
      "NVMe/FC is distinct.",
      "Local link state is not device presentation.",
      "Link-up does not imply available throughput.",
      "Do not duplicate or broaden access blindly."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g1-t2"
    ],
    "related": [
      "s8-g1-t4"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Fibre Channel. One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "FCID → Fabric-assigned address",
        "FCP → SCSI carried over Fibre Channel",
        "Buffer credit → Receiver buffer flow-control allowance"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An HBA is online but active zoning uses the replaced adapter WWPN. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An HBA is online but active zoning uses the replaced adapter WWPN. Zoning, login or mapping can deny it.",
      "challenge": "What should a replaced HBA procedure update? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "FCID": "Fabric-assigned address. It can change and differs from the port WWPN.",
      "FCP": "SCSI carried over Fibre Channel. FC also supports other upper layers.",
      "Buffer credit": "Receiver buffer flow-control allowance. Credit starvation can limit throughput without link loss."
    },
    "sources": [
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
        "questionId": "s8-g1-t3-QC1",
        "topicId": "s8-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Fibre Channel case?",
        "answer": "One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "FCID"
      },
      {
        "questionId": "s8-g1-t3-QC2",
        "topicId": "s8-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Fibre Channel.",
        "answer": "Name-service and active zoning state constrain which initiator and target ports can communicate.",
        "explanation": "FC also supports other upper layers.",
        "testedConcept": "FCP"
      },
      {
        "questionId": "s8-g1-t3-QC3",
        "topicId": "s8-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Buffer credit matters here?",
        "answer": "Credit starvation can limit throughput without link loss.",
        "explanation": "Upper-layer login and array authorization allow commands; buffer-credit behavior and error rates affect delivery.",
        "testedConcept": "Buffer credit"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g1-t3-Q1",
        "topicId": "s8-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does native FC require a TCP port?",
        "answer": "No; it is not TCP/IP transport.",
        "explanation": "Management over IP is separate.",
        "testedConcept": "FCID"
      },
      {
        "questionId": "s8-g1-t3-Q2",
        "topicId": "s8-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is an FCID the same as a WWPN?",
        "answer": "No; fabric address and persistent port identity have different roles.",
        "explanation": "Do not zone by a transient assumption.",
        "testedConcept": "FCP"
      },
      {
        "questionId": "s8-g1-t3-Q3",
        "topicId": "s8-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does FCP carry?",
        "answer": "SCSI commands and data over Fibre Channel.",
        "explanation": "NVMe/FC is distinct.",
        "testedConcept": "Buffer credit"
      },
      {
        "questionId": "s8-g1-t3-Q4",
        "topicId": "s8-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can an online HBA still see no storage?",
        "answer": "Zoning, login or mapping can deny it.",
        "explanation": "Local link state is not device presentation.",
        "testedConcept": "FCID"
      },
      {
        "questionId": "s8-g1-t3-Q5",
        "topicId": "s8-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can depleted buffer credits affect a healthy link?",
        "answer": "Yes; flow control can stall transmission.",
        "explanation": "Link-up does not imply available throughput.",
        "testedConcept": "FCP"
      },
      {
        "questionId": "s8-g1-t3-Q6",
        "topicId": "s8-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What should a replaced HBA procedure update?",
        "answer": "The validated identity references in zoning and array host mapping as required.",
        "explanation": "Do not duplicate or broaden access blindly.",
        "testedConcept": "Buffer credit"
      },
      {
        "questionId": "s8-g1-t3-Q7",
        "topicId": "s8-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Fibre Channel incident, which assumption failed?",
        "answer": "An HBA is online but active zoning uses the replaced adapter WWPN.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g1-t3-Q8",
        "topicId": "s8-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Fibre Channel incident?",
        "answer": "Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g1-t3-Q9",
        "topicId": "s8-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast FCID and FCP.",
        "answer": "Fabric-assigned address. SCSI carried over Fibre Channel.",
        "explanation": "It can change and differs from the port WWPN. FC also supports other upper layers.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g1-t3-Q10",
        "topicId": "s8-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Fibre Channel worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "One host has FC ports in isolated fabrics A and B; each fabric reaches a supported target port on the shared array.",
      "fault": "An HBA is online but active zoning uses the replaced adapter WWPN.",
      "restore": "Reconcile the replacement identity with active fabric policy and array mapping, restore only the intended members and verify real I/O through the surviving path.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g1-t4",
    "batch": "19",
    "title": "FCoE",
    "subtitle": "A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g1-t4",
    "definition": "FCoE encapsulates Fibre Channel frames over Ethernet within a supported converged design. It retains FC identities and storage authorization while relying on the required Ethernet loss-management and discovery mechanisms.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.",
    "mental": "Treat this lesson as a handoff between CNA, FIP, PFC. The converged adapter and fabric discover an FCoE forwarder through the supported FIP process. A successful earlier handoff cannot stand in for evidence at the next one. A configured priority can have congestion dependencies. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "CNA: Converged network adapter. Ethernet and FC functions have distinct identities.",
      "FIP: FCoE initialization protocol. Discovery is separate from data frames.",
      "PFC: Priority-based flow control. A configured priority can have congestion dependencies."
    ],
    "mechanism": [
      "The converged adapter and fabric discover an FCoE forwarder through the supported FIP process.",
      "The selected Ethernet service carries FC frames with the configured Data Center Bridging treatment.",
      "FC login, zoning and array mapping still determine storage access; ordinary Ethernet connectivity does not complete these layers."
    ],
    "flow": [
      [
        "Requested operation",
        "A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN."
      ],
      [
        "CNA",
        "The converged adapter and fabric discover an FCoE forwarder through the supported FIP process."
      ],
      [
        "FIP",
        "The selected Ethernet service carries FC frames with the configured Data Center Bridging treatment."
      ],
      [
        "PFC",
        "FC login, zoning and array mapping still determine storage access; ordinary Ethernet connectivity does not complete these layers."
      ]
    ],
    "comparison": [
      [
        "CNA",
        "Converged network adapter",
        "Ethernet and FC functions have distinct identities."
      ],
      [
        "FIP",
        "FCoE initialization protocol",
        "Discovery is separate from data frames."
      ],
      [
        "PFC",
        "Priority-based flow control",
        "A configured priority can have congestion dependencies."
      ]
    ],
    "example": "Worked case: A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN. Fault: Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured. Diagnosis and recovery: Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch. Boundary check: Does successful Ethernet ping prove FCoE login? No. FIP, FC and mapping have separate state.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g1-t4",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch.",
    "production": "Assign ownership at each dependency boundary. FC login, zoning and array mapping still determine storage access; ordinary Ethernet connectivity does not complete these layers. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Ethernet and FC functions have distinct identities. A configured priority can have congestion dependencies. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The selected Ethernet service carries FC frames with the configured Data Center Bridging treatment. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured.",
        "Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch."
      ],
      [
        "Is FCoE simply FC carried over TCP?",
        "No; it encapsulates FC directly over Ethernet in its supported design. Do not assign it an iSCSI port."
      ],
      [
        "What component bridges the Ethernet FCoE attachment into FC services?",
        "An FCoE forwarder in the supported topology. An arbitrary IP router is not that role."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "FIP, FC and mapping have separate state.",
      "Encapsulation changes transport, not ownership.",
      "Do not assign it an iSCSI port.",
      "Loss management needs an end-to-end design.",
      "An arbitrary IP router is not that role.",
      "An Ethernet link flag is insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g1-t3"
    ],
    "related": [
      "s8-g1-t5"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for FCoE. A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "CNA → Converged network adapter",
        "FIP → FCoE initialization protocol",
        "PFC → Priority-based flow control"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured. Congestion can propagate and affect unrelated work or cause stalls.",
      "challenge": "What is the acceptance transaction? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "CNA": "Converged network adapter. Ethernet and FC functions have distinct identities.",
      "FIP": "FCoE initialization protocol. Discovery is separate from data frames.",
      "PFC": "Priority-based flow control. A configured priority can have congestion dependencies."
    },
    "sources": [
      {
        "title": "Cisco Nexus 9.3(x): FCoE NPV and FIP",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus9000/sw/93x/fcoe/configuration/guide/b-cisco-nexus-9000-nx-os-fcoe-npv-configuration-guide-933/b-cisco-nexus-9000-nx-os-fcoe-npv-configuration-guide-933-DRAFT_chapter_010.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g1-t4-QC1",
        "topicId": "s8-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this FCoE case?",
        "answer": "A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "CNA"
      },
      {
        "questionId": "s8-g1-t4-QC2",
        "topicId": "s8-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for FCoE.",
        "answer": "The selected Ethernet service carries FC frames with the configured Data Center Bridging treatment.",
        "explanation": "Discovery is separate from data frames.",
        "testedConcept": "FIP"
      },
      {
        "questionId": "s8-g1-t4-QC3",
        "topicId": "s8-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of PFC matters here?",
        "answer": "A configured priority can have congestion dependencies.",
        "explanation": "FC login, zoning and array mapping still determine storage access; ordinary Ethernet connectivity does not complete these layers.",
        "testedConcept": "PFC"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g1-t4-Q1",
        "topicId": "s8-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does successful Ethernet ping prove FCoE login?",
        "answer": "No.",
        "explanation": "FIP, FC and mapping have separate state.",
        "testedConcept": "CNA"
      },
      {
        "questionId": "s8-g1-t4-Q2",
        "topicId": "s8-g1-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does FCoE remove the need for zoning?",
        "answer": "No; FC access policy remains.",
        "explanation": "Encapsulation changes transport, not ownership.",
        "testedConcept": "FIP"
      },
      {
        "questionId": "s8-g1-t4-Q3",
        "topicId": "s8-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is FCoE simply FC carried over TCP?",
        "answer": "No; it encapsulates FC directly over Ethernet in its supported design.",
        "explanation": "Do not assign it an iSCSI port.",
        "testedConcept": "PFC"
      },
      {
        "questionId": "s8-g1-t4-Q4",
        "topicId": "s8-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What risk accompanies indiscriminate pause configuration?",
        "answer": "Congestion can propagate and affect unrelated work or cause stalls.",
        "explanation": "Loss management needs an end-to-end design.",
        "testedConcept": "CNA"
      },
      {
        "questionId": "s8-g1-t4-Q5",
        "topicId": "s8-g1-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What component bridges the Ethernet FCoE attachment into FC services?",
        "answer": "An FCoE forwarder in the supported topology.",
        "explanation": "An arbitrary IP router is not that role.",
        "testedConcept": "FIP"
      },
      {
        "questionId": "s8-g1-t4-Q6",
        "topicId": "s8-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What is the acceptance transaction?",
        "answer": "Correct storage identity plus sustained bounded read/write verification on an owned test volume.",
        "explanation": "An Ethernet link flag is insufficient.",
        "testedConcept": "PFC"
      },
      {
        "questionId": "s8-g1-t4-Q7",
        "topicId": "s8-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the FCoE incident, which assumption failed?",
        "answer": "Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g1-t4-Q8",
        "topicId": "s8-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the FCoE incident?",
        "answer": "Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g1-t4-Q9",
        "topicId": "s8-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast CNA and FIP.",
        "answer": "Converged network adapter. FCoE initialization protocol.",
        "explanation": "Ethernet and FC functions have distinct identities. Discovery is separate from data frames.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g1-t4-Q10",
        "topicId": "s8-g1-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this FCoE worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A supported CNA reaches an FCoE forwarder on a converged access segment that connects to the FC SAN.",
      "fault": "Ethernet traffic works while FCoE discovery or its assigned service priority is misconfigured.",
      "restore": "Compare the validated VLAN, FIP, DCB and virtual FC binding against the exact platform guide; retest storage login and application I/O after restoring the owned mismatch.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g1-t5",
    "batch": "19",
    "title": "NVMe-oF",
    "subtitle": "An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g1-t5",
    "definition": "NVMe over Fabrics extends the NVMe command model across supported transports such as TCP, RDMA and Fibre Channel. Subsystem, controller and namespace identities replace assumptions copied from SCSI LUN terminology.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.",
    "mental": "Treat this lesson as a handoff between NQN, Namespace, ANA. The host locates a subsystem through the chosen transport and establishes an allowed controller connection. A successful earlier handoff cannot stand in for evidence at the next one. Path preference is not an application latency guarantee. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "NQN: NVMe qualified name. Subsystem/host identity is not a credential.",
      "Namespace: Addressable NVMe storage entity. It is analogous to, but not literally, a SCSI LUN.",
      "ANA: Asymmetric namespace access state. Path preference is not an application latency guarantee."
    ],
    "mechanism": [
      "The host locates a subsystem through the chosen transport and establishes an allowed controller connection.",
      "A namespace is exposed to the authorized host; its stable identity connects the namespace to the intended data.",
      "Supported multipath and asymmetric namespace access behavior determine path use; transport and media remain independent bottlenecks."
    ],
    "flow": [
      [
        "Requested operation",
        "An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity."
      ],
      [
        "NQN",
        "The host locates a subsystem through the chosen transport and establishes an allowed controller connection."
      ],
      [
        "Namespace",
        "A namespace is exposed to the authorized host; its stable identity connects the namespace to the intended data."
      ],
      [
        "ANA",
        "Supported multipath and asymmetric namespace access behavior determine path use; transport and media remain independent bottlenecks."
      ]
    ],
    "comparison": [
      [
        "NQN",
        "NVMe qualified name",
        "Subsystem/host identity is not a credential."
      ],
      [
        "Namespace",
        "Addressable NVMe storage entity",
        "It is analogous to, but not literally, a SCSI LUN."
      ],
      [
        "ANA",
        "Asymmetric namespace access state",
        "Path preference is not an application latency guarantee."
      ]
    ],
    "example": "Worked case: An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity. Fault: An operator combines namespaces with similar sizes but different identities as though they were paths to one device. Diagnosis and recovery: Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation. Boundary check: Is NVMe-oF restricted to RDMA? No; TCP and FC are also transports in this family. Name the selected transport.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g1-t5",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An operator combines namespaces with similar sizes but different identities as though they were paths to one device. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation.",
    "production": "Assign ownership at each dependency boundary. Supported multipath and asymmetric namespace access behavior determine path use; transport and media remain independent bottlenecks. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Subsystem/host identity is not a credential. Path preference is not an application latency guarantee. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A namespace is exposed to the authorized host; its stable identity connects the namespace to the intended data. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "An operator combines namespaces with similar sizes but different identities as though they were paths to one device.",
        "Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation."
      ],
      [
        "Does NVMe/TCP inherently require PFC?",
        "No; it uses TCP, while other transports have different network requirements. Do not copy RoCE assumptions blindly."
      ],
      [
        "Can equal namespace sizes prove identical data identity?",
        "No. Compare stable namespace and subsystem identifiers."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Name the selected transport.",
      "SCSI LUN language is not an exact object model.",
      "Do not copy RoCE assumptions blindly.",
      "It helps path selection but is not measured performance.",
      "Compare stable namespace and subsystem identifiers.",
      "The entire request path contributes latency."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g1-t4"
    ],
    "related": [
      "s8-g2-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for NVMe-oF. An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "NQN → NVMe qualified name",
        "Namespace → Addressable NVMe storage entity",
        "ANA → Asymmetric namespace access state"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An operator combines namespaces with similar sizes but different identities as though they were paths to one device. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An operator combines namespaces with similar sizes but different identities as though they were paths to one device. Asymmetric namespace path access state.",
      "challenge": "Does a fast flash array eliminate network queueing? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "NQN": "NVMe qualified name. Subsystem/host identity is not a credential.",
      "Namespace": "Addressable NVMe storage entity. It is analogous to, but not literally, a SCSI LUN.",
      "ANA": "Asymmetric namespace access state. Path preference is not an application latency guarantee."
    },
    "sources": [
      {
        "title": "RHEL 9 NVMe over Fabrics",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/managing_storage_devices/overview-of-nvme-over-fabric-devices_managing-storage-devices",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g1-t5-QC1",
        "topicId": "s8-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this NVMe-oF case?",
        "answer": "An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "NQN"
      },
      {
        "questionId": "s8-g1-t5-QC2",
        "topicId": "s8-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for NVMe-oF.",
        "answer": "A namespace is exposed to the authorized host; its stable identity connects the namespace to the intended data.",
        "explanation": "It is analogous to, but not literally, a SCSI LUN.",
        "testedConcept": "Namespace"
      },
      {
        "questionId": "s8-g1-t5-QC3",
        "topicId": "s8-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of ANA matters here?",
        "answer": "Path preference is not an application latency guarantee.",
        "explanation": "Supported multipath and asymmetric namespace access behavior determine path use; transport and media remain independent bottlenecks.",
        "testedConcept": "ANA"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g1-t5-Q1",
        "topicId": "s8-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is NVMe-oF restricted to RDMA?",
        "answer": "No; TCP and FC are also transports in this family.",
        "explanation": "Name the selected transport.",
        "testedConcept": "NQN"
      },
      {
        "questionId": "s8-g1-t5-Q2",
        "topicId": "s8-g1-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the storage unit exposed by NVMe?",
        "answer": "A namespace.",
        "explanation": "SCSI LUN language is not an exact object model.",
        "testedConcept": "Namespace"
      },
      {
        "questionId": "s8-g1-t5-Q3",
        "topicId": "s8-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does NVMe/TCP inherently require PFC?",
        "answer": "No; it uses TCP, while other transports have different network requirements.",
        "explanation": "Do not copy RoCE assumptions blindly.",
        "testedConcept": "ANA"
      },
      {
        "questionId": "s8-g1-t5-Q4",
        "topicId": "s8-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does ANA communicate?",
        "answer": "Asymmetric namespace path access state.",
        "explanation": "It helps path selection but is not measured performance.",
        "testedConcept": "NQN"
      },
      {
        "questionId": "s8-g1-t5-Q5",
        "topicId": "s8-g1-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can equal namespace sizes prove identical data identity?",
        "answer": "No.",
        "explanation": "Compare stable namespace and subsystem identifiers.",
        "testedConcept": "Namespace"
      },
      {
        "questionId": "s8-g1-t5-Q6",
        "topicId": "s8-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Does a fast flash array eliminate network queueing?",
        "answer": "No.",
        "explanation": "The entire request path contributes latency.",
        "testedConcept": "ANA"
      },
      {
        "questionId": "s8-g1-t5-Q7",
        "topicId": "s8-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the NVMe-oF incident, which assumption failed?",
        "answer": "An operator combines namespaces with similar sizes but different identities as though they were paths to one device.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g1-t5-Q8",
        "topicId": "s8-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the NVMe-oF incident?",
        "answer": "Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g1-t5-Q9",
        "topicId": "s8-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast NQN and Namespace.",
        "answer": "NVMe qualified name. Addressable NVMe storage entity.",
        "explanation": "Subsystem/host identity is not a credential. It is analogous to, but not literally, a SCSI LUN.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g1-t5-Q10",
        "topicId": "s8-g1-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this NVMe-oF worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "An NVMe/TCP client has two supported subsystem connections; both expose the same namespace identity.",
      "fault": "An operator combines namespaces with similar sizes but different identities as though they were paths to one device.",
      "restore": "Compare subsystem and namespace identifiers and supported multipath ownership; restore the intended namespace mapping before any data operation.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t0",
    "batch": "19",
    "title": "HBA",
    "subtitle": "A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t0",
    "definition": "A host bus adapter connects the host storage stack to a storage transport. Firmware, driver, port identity, queueing and fabric state all contribute to usable storage paths.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.",
    "mental": "Treat this lesson as a handoff between Driver, Firmware, Queue depth. The OS binds a supported driver to the adapter and exposes its ports and identifiers. A successful earlier handoff cannot stand in for evidence at the next one. Increasing it can move congestion downstream. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Driver: OS interface to the adapter. A visible PCI device may lack a working driver.",
      "Firmware: Adapter-resident implementation. Compatibility includes host and array versions.",
      "Queue depth: Outstanding-command allowance. Increasing it can move congestion downstream."
    ],
    "mechanism": [
      "The OS binds a supported driver to the adapter and exposes its ports and identifiers.",
      "Each port establishes the supported link and storage login through its assigned fabric.",
      "The host aggregates supported paths by device identity, then issues I/O subject to adapter and downstream queues."
    ],
    "flow": [
      [
        "Requested operation",
        "A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity."
      ],
      [
        "Driver",
        "The OS binds a supported driver to the adapter and exposes its ports and identifiers."
      ],
      [
        "Firmware",
        "Each port establishes the supported link and storage login through its assigned fabric."
      ],
      [
        "Queue depth",
        "The host aggregates supported paths by device identity, then issues I/O subject to adapter and downstream queues."
      ]
    ],
    "comparison": [
      [
        "Driver",
        "OS interface to the adapter",
        "A visible PCI device may lack a working driver."
      ],
      [
        "Firmware",
        "Adapter-resident implementation",
        "Compatibility includes host and array versions."
      ],
      [
        "Queue depth",
        "Outstanding-command allowance",
        "Increasing it can move congestion downstream."
      ]
    ],
    "example": "Worked case: A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity. Fault: A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational. Diagnosis and recovery: Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device. Boundary check: Does PCI presence prove a working storage port? No; driver, firmware and link state remain. Inventory is an early boundary.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device.",
    "production": "Assign ownership at each dependency boundary. The host aggregates supported paths by device identity, then issues I/O subject to adapter and downstream queues. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A visible PCI device may lack a working driver. Increasing it can move congestion downstream. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Each port establishes the supported link and storage login through its assigned fabric. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational.",
        "Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device."
      ],
      [
        "Can two ports on one adapter share a failure?",
        "Yes; the card or its PCIe path can fail. Port count is not complete independence."
      ],
      [
        "Does increasing queue depth always lower latency?",
        "No; more outstanding work can increase downstream contention. Measure the workload."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Inventory is an early boundary.",
      "Check actual identity.",
      "Port count is not complete independence.",
      "Newer in isolation is not automatically compatible.",
      "Measure the workload.",
      "A green adapter LED is narrower evidence."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g1-t5"
    ],
    "related": [
      "s8-g2-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for HBA. A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Driver → OS interface to the adapter",
        "Firmware → Adapter-resident implementation",
        "Queue depth → Outstanding-command allowance"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational. Supported combinations affect correctness and features.",
      "challenge": "What proves restoration after replacement? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Driver": "OS interface to the adapter. A visible PCI device may lack a working driver.",
      "Firmware": "Adapter-resident implementation. Compatibility includes host and array versions.",
      "Queue depth": "Outstanding-command allowance. Increasing it can move congestion downstream."
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
        "questionId": "s8-g2-t0-QC1",
        "topicId": "s8-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this HBA case?",
        "answer": "A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Driver"
      },
      {
        "questionId": "s8-g2-t0-QC2",
        "topicId": "s8-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for HBA.",
        "answer": "Each port establishes the supported link and storage login through its assigned fabric.",
        "explanation": "Compatibility includes host and array versions.",
        "testedConcept": "Firmware"
      },
      {
        "questionId": "s8-g2-t0-QC3",
        "topicId": "s8-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Queue depth matters here?",
        "answer": "Increasing it can move congestion downstream.",
        "explanation": "The host aggregates supported paths by device identity, then issues I/O subject to adapter and downstream queues.",
        "testedConcept": "Queue depth"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t0-Q1",
        "topicId": "s8-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does PCI presence prove a working storage port?",
        "answer": "No; driver, firmware and link state remain.",
        "explanation": "Inventory is an early boundary.",
        "testedConcept": "Driver"
      },
      {
        "questionId": "s8-g2-t0-Q2",
        "topicId": "s8-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What identity often changes with an FC HBA replacement?",
        "answer": "The port WWPN unless an explicitly supported identity abstraction preserves it.",
        "explanation": "Check actual identity.",
        "testedConcept": "Firmware"
      },
      {
        "questionId": "s8-g2-t0-Q3",
        "topicId": "s8-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can two ports on one adapter share a failure?",
        "answer": "Yes; the card or its PCIe path can fail.",
        "explanation": "Port count is not complete independence.",
        "testedConcept": "Queue depth"
      },
      {
        "questionId": "s8-g2-t0-Q4",
        "topicId": "s8-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why validate driver and firmware together?",
        "answer": "Supported combinations affect correctness and features.",
        "explanation": "Newer in isolation is not automatically compatible.",
        "testedConcept": "Driver"
      },
      {
        "questionId": "s8-g2-t0-Q5",
        "topicId": "s8-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does increasing queue depth always lower latency?",
        "answer": "No; more outstanding work can increase downstream contention.",
        "explanation": "Measure the workload.",
        "testedConcept": "Firmware"
      },
      {
        "questionId": "s8-g2-t0-Q6",
        "topicId": "s8-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What proves restoration after replacement?",
        "answer": "The correct mapped device, expected usable paths and an owned application I/O check.",
        "explanation": "A green adapter LED is narrower evidence.",
        "testedConcept": "Queue depth"
      },
      {
        "questionId": "s8-g2-t0-Q7",
        "topicId": "s8-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the HBA incident, which assumption failed?",
        "answer": "A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t0-Q8",
        "topicId": "s8-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the HBA incident?",
        "answer": "Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t0-Q9",
        "topicId": "s8-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Driver and Firmware.",
        "answer": "OS interface to the adapter. Adapter-resident implementation.",
        "explanation": "A visible PCI device may lack a working driver. Compatibility includes host and array versions.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t0-Q10",
        "topicId": "s8-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this HBA worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A server has two single-port HBAs on independently documented fabrics; replacement changes one port identity.",
      "fault": "A new HBA appears in PCI inventory but its driver is missing, so no storage port is operational.",
      "restore": "Compare supported driver/firmware inventory before changing zoning; after binding, reconcile the new WWPN and verify expected paths to the original device.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t1",
    "batch": "19",
    "title": "WWN",
    "subtitle": "A host inventory records one node name and two different port names, each assigned to its own fabric.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t1",
    "definition": "World Wide Name is a general identity term used in Fibre Channel. Node and port names identify different objects; a troubleshooting record must state which form it contains.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A host inventory records one node name and two different port names, each assigned to its own fabric.",
    "mental": "Treat this lesson as a handoff between WWNN, WWPN, Alias. Inventory gathers WWNN and WWPN values with their owning node and physical or virtual port. A successful earlier handoff cannot stand in for evidence at the next one. The label does not prove the underlying value is current. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "WWNN: World Wide Node Name. Node identity is not a port selector.",
      "WWPN: World Wide Port Name. A node can have multiple port identities.",
      "Alias: Readable name for an identifier. The label does not prove the underlying value is current."
    ],
    "mechanism": [
      "Inventory gathers WWNN and WWPN values with their owning node and physical or virtual port.",
      "Fabric observations correlate the port identity to its current location and FCID.",
      "Access policy refers to the supported identity type; an alias is only a readable reference to the recorded value."
    ],
    "flow": [
      [
        "Requested operation",
        "A host inventory records one node name and two different port names, each assigned to its own fabric."
      ],
      [
        "WWNN",
        "Inventory gathers WWNN and WWPN values with their owning node and physical or virtual port."
      ],
      [
        "WWPN",
        "Fabric observations correlate the port identity to its current location and FCID."
      ],
      [
        "Alias",
        "Access policy refers to the supported identity type; an alias is only a readable reference to the recorded value."
      ]
    ],
    "comparison": [
      [
        "WWNN",
        "World Wide Node Name",
        "Node identity is not a port selector."
      ],
      [
        "WWPN",
        "World Wide Port Name",
        "A node can have multiple port identities."
      ],
      [
        "Alias",
        "Readable name for an identifier",
        "The label does not prove the underlying value is current."
      ]
    ],
    "example": "Worked case: A host inventory records one node name and two different port names, each assigned to its own fabric. Fault: A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request. Diagnosis and recovery: Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping. Boundary check: What ambiguity exists in the label WWN? It may refer to a node or a port name. Record the exact identity kind.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A host inventory records one node name and two different port names, each assigned to its own fabric. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping.",
    "production": "Assign ownership at each dependency boundary. Access policy refers to the supported identity type; an alias is only a readable reference to the recorded value. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Node identity is not a port selector. The label does not prove the underlying value is current. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Fabric observations correlate the port identity to its current location and FCID. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request.",
        "Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping."
      ],
      [
        "Can an alias name prove host ownership?",
        "No; compare its referenced value to actual inventory. Labels can be stale."
      ],
      [
        "What should happen when a value cannot be tied to an owner?",
        "Keep access changes pending until identity is reconciled. Guessing can expose another host."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Record the exact identity kind.",
      "Node and port cardinality differ.",
      "Labels can be stale.",
      "The identifier alone is not topology.",
      "Guessing can expose another host.",
      "Structured identity prevents category errors."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t0"
    ],
    "related": [
      "s8-g2-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for WWN. A host inventory records one node name and two different port names, each assigned to its own fabric.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "WWNN → World Wide Node Name",
        "WWPN → World Wide Port Name",
        "Alias → Readable name for an identifier"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A host inventory records one node name and two different port names, each assigned to its own fabric.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request. It locates the path and its failure domain.",
      "challenge": "What replaces the ambiguous spreadsheet column? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "WWNN": "World Wide Node Name. Node identity is not a port selector.",
      "WWPN": "World Wide Port Name. A node can have multiple port identities.",
      "Alias": "Readable name for an identifier. The label does not prove the underlying value is current."
    },
    "sources": [
      {
        "title": "ONTAP FC/FCoE zoning and port identity",
        "url": "https://docs.netapp.com/us-en/ontap/san-config/fibre-channel-fcoe-zoning-concept.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g2-t1-QC1",
        "topicId": "s8-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this WWN case?",
        "answer": "A host inventory records one node name and two different port names, each assigned to its own fabric.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "WWNN"
      },
      {
        "questionId": "s8-g2-t1-QC2",
        "topicId": "s8-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for WWN.",
        "answer": "Fabric observations correlate the port identity to its current location and FCID.",
        "explanation": "A node can have multiple port identities.",
        "testedConcept": "WWPN"
      },
      {
        "questionId": "s8-g2-t1-QC3",
        "topicId": "s8-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Alias matters here?",
        "answer": "The label does not prove the underlying value is current.",
        "explanation": "Access policy refers to the supported identity type; an alias is only a readable reference to the recorded value.",
        "testedConcept": "Alias"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t1-Q1",
        "topicId": "s8-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What ambiguity exists in the label WWN?",
        "answer": "It may refer to a node or a port name.",
        "explanation": "Record the exact identity kind.",
        "testedConcept": "WWNN"
      },
      {
        "questionId": "s8-g2-t1-Q2",
        "topicId": "s8-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does one node necessarily have one WWPN?",
        "answer": "No; it may expose multiple ports.",
        "explanation": "Node and port cardinality differ.",
        "testedConcept": "WWPN"
      },
      {
        "questionId": "s8-g2-t1-Q3",
        "topicId": "s8-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can an alias name prove host ownership?",
        "answer": "No; compare its referenced value to actual inventory.",
        "explanation": "Labels can be stale.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s8-g2-t1-Q4",
        "topicId": "s8-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why record fabric membership with a WWPN?",
        "answer": "It locates the path and its failure domain.",
        "explanation": "The identifier alone is not topology.",
        "testedConcept": "WWNN"
      },
      {
        "questionId": "s8-g2-t1-Q5",
        "topicId": "s8-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should happen when a value cannot be tied to an owner?",
        "answer": "Keep access changes pending until identity is reconciled.",
        "explanation": "Guessing can expose another host.",
        "testedConcept": "WWPN"
      },
      {
        "questionId": "s8-g2-t1-Q6",
        "topicId": "s8-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What replaces the ambiguous spreadsheet column?",
        "answer": "Explicit WWNN, WWPN, host, port and fabric fields.",
        "explanation": "Structured identity prevents category errors.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s8-g2-t1-Q7",
        "topicId": "s8-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the WWN incident, which assumption failed?",
        "answer": "A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t1-Q8",
        "topicId": "s8-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the WWN incident?",
        "answer": "Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t1-Q9",
        "topicId": "s8-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast WWNN and WWPN.",
        "answer": "World Wide Node Name. World Wide Port Name.",
        "explanation": "Node identity is not a port selector. A node can have multiple port identities.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t1-Q10",
        "topicId": "s8-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this WWN worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A host inventory records one node name and two different port names, each assigned to its own fabric.",
      "fault": "A spreadsheet column labelled WWN mixes node names and port names, causing a wrong zoning request.",
      "restore": "Separate node and port columns, reconcile each with the observed owner and active fabric policy, and retain the corrected mapping.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t2",
    "batch": "19",
    "title": "WWPN",
    "subtitle": "A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t2",
    "definition": "A WWPN identifies an FC port, including a supported virtual port. Port identity is used in common zoning and host-mapping designs but does not itself prove a port is logged in or authorized.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.",
    "mental": "Treat this lesson as a handoff between Port identity, NPIV, Host mapping. The port presents its WWPN during fabric participation; virtual ports can create additional identities on one physical attachment. A successful earlier handoff cannot stand in for evidence at the next one. Zoning cannot substitute for it. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Port identity: WWPN of an initiator or target. It differs from FCID.",
      "NPIV: Multiple virtual N_Port identities on one physical port. Virtual identity does not create physical independence.",
      "Host mapping: Array association with initiator identity. Zoning cannot substitute for it."
    ],
    "mechanism": [
      "The port presents its WWPN during fabric participation; virtual ports can create additional identities on one physical attachment.",
      "The fabric associates the identity with current login/location state.",
      "Zoning and array host records must both refer to the intended identity; replacement or virtualization changes require reconciliation."
    ],
    "flow": [
      [
        "Requested operation",
        "A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments."
      ],
      [
        "Port identity",
        "The port presents its WWPN during fabric participation; virtual ports can create additional identities on one physical attachment."
      ],
      [
        "NPIV",
        "The fabric associates the identity with current login/location state."
      ],
      [
        "Host mapping",
        "Zoning and array host records must both refer to the intended identity; replacement or virtualization changes require reconciliation."
      ]
    ],
    "comparison": [
      [
        "Port identity",
        "WWPN of an initiator or target",
        "It differs from FCID."
      ],
      [
        "NPIV",
        "Multiple virtual N_Port identities on one physical port",
        "Virtual identity does not create physical independence."
      ],
      [
        "Host mapping",
        "Array association with initiator identity",
        "Zoning cannot substitute for it."
      ]
    ],
    "example": "Worked case: A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments. Fault: The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN. Diagnosis and recovery: Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded. Boundary check: Can one physical attachment carry multiple WWPN identities? Yes, with supported NPIV. Identity count is not link count.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded.",
    "production": "Assign ownership at each dependency boundary. Zoning and array host records must both refer to the intended identity; replacement or virtualization changes require reconciliation. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It differs from FCID. Zoning cannot substitute for it. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The fabric associates the identity with current login/location state. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
      [
        "The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN.",
        "Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded."
      ],
      [
        "Which identity must array mapping match?",
        "The actual intended initiator identity used by the workload. A nearby physical label can be misleading."
      ],
      [
        "Why distinguish target and initiator WWPNs?",
        "They play different roles in policy and session analysis. A valid format can still identify the wrong endpoint."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Identity count is not link count.",
      "Inventory and operational state differ.",
      "A nearby physical label can be misleading.",
      "Virtual names do not add hardware paths.",
      "A valid format can still identify the wrong endpoint.",
      "Retaining a name alone is insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t1"
    ],
    "related": [
      "s8-g2-t3"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for WWPN. A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Port identity → WWPN of an initiator or target",
        "NPIV → Multiple virtual N_Port identities on one physical port",
        "Host mapping → Array association with initiator identity"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN. Physical port, adapter, switch and power dependencies.",
      "challenge": "What must be verified after identity migration? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Port identity": "WWPN of an initiator or target. It differs from FCID.",
      "NPIV": "Multiple virtual N_Port identities on one physical port. Virtual identity does not create physical independence.",
      "Host mapping": "Array association with initiator identity. Zoning cannot substitute for it."
    },
    "sources": [
      {
        "title": "ONTAP FC/FCoE zoning and port identity",
        "url": "https://docs.netapp.com/us-en/ontap/san-config/fibre-channel-fcoe-zoning-concept.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g2-t2-QC1",
        "topicId": "s8-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this WWPN case?",
        "answer": "A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Port identity"
      },
      {
        "questionId": "s8-g2-t2-QC2",
        "topicId": "s8-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for WWPN.",
        "answer": "The fabric associates the identity with current login/location state.",
        "explanation": "Virtual identity does not create physical independence.",
        "testedConcept": "NPIV"
      },
      {
        "questionId": "s8-g2-t2-QC3",
        "topicId": "s8-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Host mapping matters here?",
        "answer": "Zoning cannot substitute for it.",
        "explanation": "Zoning and array host records must both refer to the intended identity; replacement or virtualization changes require reconciliation.",
        "testedConcept": "Host mapping"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t2-Q1",
        "topicId": "s8-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can one physical attachment carry multiple WWPN identities?",
        "answer": "Yes, with supported NPIV.",
        "explanation": "Identity count is not link count.",
        "testedConcept": "Port identity"
      },
      {
        "questionId": "s8-g2-t2-Q2",
        "topicId": "s8-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a known WWPN prove a live login?",
        "answer": "No.",
        "explanation": "Inventory and operational state differ.",
        "testedConcept": "NPIV"
      },
      {
        "questionId": "s8-g2-t2-Q3",
        "topicId": "s8-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which identity must array mapping match?",
        "answer": "The actual intended initiator identity used by the workload.",
        "explanation": "A nearby physical label can be misleading.",
        "testedConcept": "Host mapping"
      },
      {
        "questionId": "s8-g2-t2-Q4",
        "topicId": "s8-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can remain shared between virtual WWPNs?",
        "answer": "Physical port, adapter, switch and power dependencies.",
        "explanation": "Virtual names do not add hardware paths.",
        "testedConcept": "Port identity"
      },
      {
        "questionId": "s8-g2-t2-Q5",
        "topicId": "s8-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why distinguish target and initiator WWPNs?",
        "answer": "They play different roles in policy and session analysis.",
        "explanation": "A valid format can still identify the wrong endpoint.",
        "testedConcept": "NPIV"
      },
      {
        "questionId": "s8-g2-t2-Q6",
        "topicId": "s8-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What must be verified after identity migration?",
        "answer": "Correct active location, zoning, map and usable device access.",
        "explanation": "Retaining a name alone is insufficient.",
        "testedConcept": "Host mapping"
      },
      {
        "questionId": "s8-g2-t2-Q7",
        "topicId": "s8-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the WWPN incident, which assumption failed?",
        "answer": "The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t2-Q8",
        "topicId": "s8-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the WWPN incident?",
        "answer": "Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t2-Q9",
        "topicId": "s8-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Port identity and NPIV.",
        "answer": "WWPN of an initiator or target. Multiple virtual N_Port identities on one physical port.",
        "explanation": "It differs from FCID. Virtual identity does not create physical independence.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t2-Q10",
        "topicId": "s8-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this WWPN worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A virtualized initiator retains a managed virtual WWPN while moving between supported physical attachments.",
      "fault": "The array map contains an old physical WWPN while the workload now uses a virtual initiator WWPN.",
      "restore": "Identify the actual logged-in initiator and its supported lifecycle, align only the intended zone/map references, and verify unauthorized hosts remain excluded.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t3",
    "batch": "19",
    "title": "Zoning",
    "subtitle": "Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t3",
    "definition": "FC zoning limits communication among fabric members. Defined configuration, active configuration and array LUN mapping are separate layers; a zone definition alone is not evidence of active enforcement.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
    "mental": "Treat this lesson as a handoff between Defined zone, Active zone set, LUN masking. The administrator describes the intended initiator and target members using supported identifiers. A successful earlier handoff cannot stand in for evidence at the next one. It is distinct from fabric communication policy. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Defined zone: Saved or candidate member set. It may not be active.",
      "Active zone set: Currently enforced membership. Scope includes the correct fabric/VSAN.",
      "LUN masking: Array control of object presentation. It is distinct from fabric communication policy."
    ],
    "mechanism": [
      "The administrator describes the intended initiator and target members using supported identifiers.",
      "A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood.",
      "Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary."
    ],
    "flow": [
      [
        "Requested operation",
        "Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy."
      ],
      [
        "Defined zone",
        "The administrator describes the intended initiator and target members using supported identifiers."
      ],
      [
        "Active zone set",
        "A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood."
      ],
      [
        "LUN masking",
        "Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy. Fault: A correct new zone exists in the configuration database but was omitted from the activated zone set. Diagnosis and recovery: Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial. Boundary check: Why can a correctly defined zone have no effect? It may not be part of the active configuration. Inspect enforcement, not just saved intent.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A correct new zone exists in the configuration database but was omitted from the activated zone set. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.",
    "production": "Assign ownership at each dependency boundary. Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It may not be active. It is distinct from fabric communication policy. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "Inspect enforcement, not just saved intent.",
      "Fabric and object authorization are separate.",
      "Follow the array/fabric interoperability guidance.",
      "Identity and context both matter.",
      "Broad access defeats isolation.",
      "Availability alone does not validate policy."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t2"
    ],
    "related": [
      "s8-g2-t4"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Zoning. Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Defined zone → Saved or candidate member set",
        "Active zone set → Currently enforced membership",
        "LUN masking → Array control of object presentation"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A correct new zone exists in the configuration database but was omitted from the activated zone set. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A correct new zone exists in the configuration database but was omitted from the activated zone set. Activating it in the wrong VSAN.",
      "challenge": "What negative test accompanies h1 recovery? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Defined zone": "Saved or candidate member set. It may not be active.",
      "Active zone set": "Currently enforced membership. Scope includes the correct fabric/VSAN.",
      "LUN masking": "Array control of object presentation. It is distinct from fabric communication policy."
    },
    "sources": [
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
        "questionId": "s8-g2-t3-QC1",
        "topicId": "s8-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Zoning case?",
        "answer": "Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Defined zone"
      },
      {
        "questionId": "s8-g2-t3-QC2",
        "topicId": "s8-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Zoning.",
        "answer": "A reviewed zone configuration is activated within the correct fabric or VSAN, with fabric-wide effects understood.",
        "explanation": "Scope includes the correct fabric/VSAN.",
        "testedConcept": "Active zone set"
      },
      {
        "questionId": "s8-g2-t3-QC3",
        "topicId": "s8-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of LUN masking matters here?",
        "answer": "It is distinct from fabric communication policy.",
        "explanation": "Array mapping and host discovery then determine which storage objects appear; positive and negative access checks validate the intended boundary.",
        "testedConcept": "LUN masking"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t3-Q1",
        "topicId": "s8-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can a correctly defined zone have no effect?",
        "answer": "It may not be part of the active configuration.",
        "explanation": "Inspect enforcement, not just saved intent.",
        "testedConcept": "Defined zone"
      },
      {
        "questionId": "s8-g2-t3-Q2",
        "topicId": "s8-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does zoning assign a LUN to a host?",
        "answer": "No; array mapping does that.",
        "explanation": "Fabric and object authorization are separate.",
        "testedConcept": "Active zone set"
      },
      {
        "questionId": "s8-g2-t3-Q3",
        "topicId": "s8-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why prefer a narrowly scoped initiator zone design?",
        "answer": "It limits unintended initiator relationships and simplifies diagnosis.",
        "explanation": "Follow the array/fabric interoperability guidance.",
        "testedConcept": "LUN masking"
      },
      {
        "questionId": "s8-g2-t3-Q4",
        "topicId": "s8-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What scope error can invalidate an otherwise correct MDS zone?",
        "answer": "Activating it in the wrong VSAN.",
        "explanation": "Identity and context both matter.",
        "testedConcept": "Defined zone"
      },
      {
        "questionId": "s8-g2-t3-Q5",
        "topicId": "s8-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should a recovery enable an allow-all default zone?",
        "answer": "No; repair the specific policy mismatch.",
        "explanation": "Broad access defeats isolation.",
        "testedConcept": "Active zone set"
      },
      {
        "questionId": "s8-g2-t3-Q6",
        "topicId": "s8-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What negative test accompanies h1 recovery?",
        "answer": "An excluded initiator still cannot access the protected volume.",
        "explanation": "Availability alone does not validate policy.",
        "testedConcept": "LUN masking"
      },
      {
        "questionId": "s8-g2-t3-Q7",
        "topicId": "s8-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Zoning incident, which assumption failed?",
        "answer": "A correct new zone exists in the configuration database but was omitted from the activated zone set.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t3-Q8",
        "topicId": "s8-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Zoning incident?",
        "answer": "Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t3-Q9",
        "topicId": "s8-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Defined zone and Active zone set.",
        "answer": "Saved or candidate member set. Currently enforced membership.",
        "explanation": "It may not be active. Scope includes the correct fabric/VSAN.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t3-Q10",
        "topicId": "s8-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Zoning worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Host h1 initiator A can reach only its intended array targets in Fabric A; Fabric B has a separately reviewed equivalent policy.",
      "fault": "A correct new zone exists in the configuration database but was omitted from the activated zone set.",
      "restore": "Compare active membership to the approved baseline, activate only the reviewed change under the platform procedure, then verify h1 access and h2 denial.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t4",
    "batch": "19",
    "title": "LUN",
    "subtitle": "Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t4",
    "definition": "A logical unit is a SCSI-addressable storage entity; its LUN number addresses it within a presentation context. The same number on two targets does not by itself identify the same storage data.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
    "mental": "Treat this lesson as a handoff between LUN number, Device WWID, Masking. The array creates a logical storage object from its backing allocation and protection scheme. A successful earlier handoff cannot stand in for evidence at the next one. Visibility does not establish safe shared writes. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "LUN number: Address within the presentation context. It is not globally unique data identity.",
      "Device WWID: Stable identifier used to distinguish a device. Compare it across paths.",
      "Masking: Restriction of presentation to initiators. Visibility does not establish safe shared writes."
    ],
    "mechanism": [
      "The array creates a logical storage object from its backing allocation and protection scheme.",
      "Mapping presents that object to selected initiators using a supported LUN addressing policy.",
      "Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks."
    ],
    "flow": [
      [
        "Requested operation",
        "Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk."
      ],
      [
        "LUN number",
        "The array creates a logical storage object from its backing allocation and protection scheme."
      ],
      [
        "Device WWID",
        "Mapping presents that object to selected initiators using a supported LUN addressing policy."
      ],
      [
        "Masking",
        "Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk. Fault: A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Diagnosis and recovery: Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation. Boundary check: Is LUN 5 globally unique? No; it is scoped to a presentation context. Different targets can reuse a number.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t4",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.",
    "production": "Assign ownership at each dependency boundary. Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It is not globally unique data identity. Visibility does not establish safe shared writes. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Mapping presents that object to selected initiators using a supported LUN addressing policy. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "Different targets can reuse a number.",
      "Size and LUN number alone are weak evidence.",
      "It presents blocks for a consumer.",
      "Paths are access routes to the same entity.",
      "A fabric zone alone is not object authorization.",
      "This course never formats host devices."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t3"
    ],
    "related": [
      "s8-g2-t5"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for LUN. Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "LUN number → Address within the presentation context",
        "Device WWID → Stable identifier used to distinguish a device",
        "Masking → Restriction of presentation to initiators"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused. Yes.",
      "challenge": "What should precede any destructive initialization? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "LUN number": "Address within the presentation context. It is not globally unique data identity.",
      "Device WWID": "Stable identifier used to distinguish a device. Compare it across paths.",
      "Masking": "Restriction of presentation to initiators. Visibility does not establish safe shared writes."
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
        "questionId": "s8-g2-t4-QC1",
        "topicId": "s8-g2-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this LUN case?",
        "answer": "Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "LUN number"
      },
      {
        "questionId": "s8-g2-t4-QC2",
        "topicId": "s8-g2-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for LUN.",
        "answer": "Mapping presents that object to selected initiators using a supported LUN addressing policy.",
        "explanation": "Compare it across paths.",
        "testedConcept": "Device WWID"
      },
      {
        "questionId": "s8-g2-t4-QC3",
        "topicId": "s8-g2-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Masking matters here?",
        "answer": "Visibility does not establish safe shared writes.",
        "explanation": "Host discovery reads stable device identity and combines paths appropriately before an authorized consumer uses the blocks.",
        "testedConcept": "Masking"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t4-Q1",
        "topicId": "s8-g2-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is LUN 5 globally unique?",
        "answer": "No; it is scoped to a presentation context.",
        "explanation": "Different targets can reuse a number.",
        "testedConcept": "LUN number"
      },
      {
        "questionId": "s8-g2-t4-Q2",
        "topicId": "s8-g2-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What distinguishes source and destination volumes reliably?",
        "answer": "Stable device identity and recorded array/ownership context.",
        "explanation": "Size and LUN number alone are weak evidence.",
        "testedConcept": "Device WWID"
      },
      {
        "questionId": "s8-g2-t4-Q3",
        "topicId": "s8-g2-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does mapping a LUN create a filesystem?",
        "answer": "No.",
        "explanation": "It presents blocks for a consumer.",
        "testedConcept": "Masking"
      },
      {
        "questionId": "s8-g2-t4-Q4",
        "topicId": "s8-g2-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can one LUN have several paths?",
        "answer": "Yes.",
        "explanation": "Paths are access routes to the same entity.",
        "testedConcept": "LUN number"
      },
      {
        "questionId": "s8-g2-t4-Q5",
        "topicId": "s8-g2-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What protects a LUN from an unintended host at the array?",
        "answer": "The intended initiator mapping/masking policy.",
        "explanation": "A fabric zone alone is not object authorization.",
        "testedConcept": "Device WWID"
      },
      {
        "questionId": "s8-g2-t4-Q6",
        "topicId": "s8-g2-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What should precede any destructive initialization?",
        "answer": "Confirmed empty ownership and exact identity under an approved disposable workflow.",
        "explanation": "This course never formats host devices.",
        "testedConcept": "Masking"
      },
      {
        "questionId": "s8-g2-t4-Q7",
        "topicId": "s8-g2-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the LUN incident, which assumption failed?",
        "answer": "A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t4-Q8",
        "topicId": "s8-g2-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the LUN incident?",
        "answer": "Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t4-Q9",
        "topicId": "s8-g2-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast LUN number and Device WWID.",
        "answer": "Address within the presentation context. Stable identifier used to distinguish a device.",
        "explanation": "It is not globally unique data identity. Compare it across paths.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t4-Q10",
        "topicId": "s8-g2-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this LUN worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Two unrelated arrays both present LUN 5; their device identifiers differ and they must not be treated as one disk.",
      "fault": "A migration spreadsheet uses only LUN numbers, causing source and destination data to be confused.",
      "restore": "Record array identity, stable device ID, size, owner and mappings; verify the exact expected volume before any migration or filesystem operation.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t5",
    "batch": "19",
    "title": "Multipathing",
    "subtitle": "Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t5",
    "definition": "Multipathing presents multiple supported access paths to one storage device and selects paths according to device and host policy. It can survive specified path losses; it cannot repair corrupt data or unavailable shared media.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
    "mental": "Treat this lesson as a handoff between Path, ALUA, All paths down. Host discovery groups paths by stable device identity rather than transient device name. A successful earlier handoff cannot stand in for evidence at the next one. Queueing and timeout policy affect applications. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Path: Host-to-target access route. Multiple routes can share a switch.",
      "ALUA: Asymmetric logical unit access state. Optimized and nonoptimized paths need distinct interpretation.",
      "All paths down: No usable route to the device. Queueing and timeout policy affect applications."
    ],
    "mechanism": [
      "Host discovery groups paths by stable device identity rather than transient device name.",
      "Path states and array access preferences guide selection through the supported multipath implementation.",
      "After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance."
    ],
    "flow": [
      [
        "Requested operation",
        "Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model."
      ],
      [
        "Path",
        "Host discovery groups paths by stable device identity rather than transient device name."
      ],
      [
        "ALUA",
        "Path states and array access preferences guide selection through the supported multipath implementation."
      ],
      [
        "All paths down",
        "After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model. Fault: The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. Diagnosis and recovery: Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration. Boundary check: What should multipathing group together? Paths with the same correct stable device identity. Equal capacity alone is insufficient.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t5",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.",
    "production": "Assign ownership at each dependency boundary. After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Multiple routes can share a switch. Queueing and timeout policy affect applications. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Path states and array access preferences guide selection through the supported multipath implementation. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "Equal capacity alone is insufficient.",
      "Count independence, not only rows.",
      "Preference is not simply up/down.",
      "An application can stall even before an explicit error.",
      "Policy, workload and shared bottlenecks limit capacity.",
      "A path-status change alone does not prove service."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t4"
    ],
    "related": [
      "s8-g2-t6"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Multipathing. Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Path → Host-to-target access route",
        "ALUA → Asymmetric logical unit access state",
        "All paths down → No usable route to the device"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The displayed path count is four, but every route crosses Fabric A, so its loss removes all access. I/O may queue or fail according to policy and timeouts.",
      "challenge": "What evidence demonstrates a useful failover test? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Path": "Host-to-target access route. Multiple routes can share a switch.",
      "ALUA": "Asymmetric logical unit access state. Optimized and nonoptimized paths need distinct interpretation.",
      "All paths down": "No usable route to the device. Queueing and timeout policy affect applications."
    },
    "sources": [
      {
        "title": "RHEL 9 Device Mapper Multipath",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_device_mapper_multipath/index",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g2-t5-QC1",
        "topicId": "s8-g2-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Multipathing case?",
        "answer": "Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Path"
      },
      {
        "questionId": "s8-g2-t5-QC2",
        "topicId": "s8-g2-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Multipathing.",
        "answer": "Path states and array access preferences guide selection through the supported multipath implementation.",
        "explanation": "Optimized and nonoptimized paths need distinct interpretation.",
        "testedConcept": "ALUA"
      },
      {
        "questionId": "s8-g2-t5-QC3",
        "topicId": "s8-g2-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of All paths down matters here?",
        "answer": "Queueing and timeout policy affect applications.",
        "explanation": "After a path fails, eligible alternatives may carry I/O subject to timeouts, surviving capacity and application tolerance.",
        "testedConcept": "All paths down"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t5-Q1",
        "topicId": "s8-g2-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should multipathing group together?",
        "answer": "Paths with the same correct stable device identity.",
        "explanation": "Equal capacity alone is insufficient.",
        "testedConcept": "Path"
      },
      {
        "questionId": "s8-g2-t5-Q2",
        "topicId": "s8-g2-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can four paths still have one switch failure domain?",
        "answer": "Yes.",
        "explanation": "Count independence, not only rows.",
        "testedConcept": "ALUA"
      },
      {
        "questionId": "s8-g2-t5-Q3",
        "topicId": "s8-g2-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a nonoptimized ALUA path necessarily mean unusable?",
        "answer": "No; behavior depends on supported access state and policy.",
        "explanation": "Preference is not simply up/down.",
        "testedConcept": "All paths down"
      },
      {
        "questionId": "s8-g2-t5-Q4",
        "topicId": "s8-g2-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can happen when all paths are lost?",
        "answer": "I/O may queue or fail according to policy and timeouts.",
        "explanation": "An application can stall even before an explicit error.",
        "testedConcept": "Path"
      },
      {
        "questionId": "s8-g2-t5-Q5",
        "topicId": "s8-g2-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does failover double throughput automatically?",
        "answer": "No.",
        "explanation": "Policy, workload and shared bottlenecks limit capacity.",
        "testedConcept": "ALUA"
      },
      {
        "questionId": "s8-g2-t5-Q6",
        "topicId": "s8-g2-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence demonstrates a useful failover test?",
        "answer": "Original workload I/O and integrity with one owned path domain absent, plus restoration.",
        "explanation": "A path-status change alone does not prove service.",
        "testedConcept": "All paths down"
      },
      {
        "questionId": "s8-g2-t5-Q7",
        "topicId": "s8-g2-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Multipathing incident, which assumption failed?",
        "answer": "The displayed path count is four, but every route crosses Fabric A, so its loss removes all access.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t5-Q8",
        "topicId": "s8-g2-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Multipathing incident?",
        "answer": "Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t5-Q9",
        "topicId": "s8-g2-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Path and ALUA.",
        "answer": "Host-to-target access route. Asymmetric logical unit access state.",
        "explanation": "Multiple routes can share a switch. Optimized and nonoptimized paths need distinct interpretation.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t5-Q10",
        "topicId": "s8-g2-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Multipathing worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Four discovered paths to one LUN cross two fabrics and two target ports; one fabric is removed only in the declared model.",
      "fault": "The displayed path count is four, but every route crosses Fabric A, so its loss removes all access.",
      "restore": "Map each path end to end, establish a usable independent Fabric B route, then verify bounded I/O and integrity while A is absent and after exact restoration.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t6",
    "batch": "19",
    "title": "SAN Switch",
    "subtitle": "Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t6",
    "definition": "A SAN switch forwards storage fabric traffic and provides fabric services such as login, name service and zoning. Its management interface is separate from the host-to-storage data path.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
    "mental": "Treat this lesson as a handoff between F_Port, E_Port, Management plane. Ports establish roles and login relationships with endpoints or inter-switch links. A successful earlier handoff cannot stand in for evidence at the next one. Management success does not prove storage I/O. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "F_Port: Fabric port attached to an N_Port. Endpoint login is not an ISL.",
      "E_Port: Inter-switch expansion port. An ISL can connect shared failure domains.",
      "Management plane: Administrative access. Management success does not prove storage I/O."
    ],
    "mechanism": [
      "Ports establish roles and login relationships with endpoints or inter-switch links.",
      "Fabric services and active policy determine reachable port identities within the correct fabric scope.",
      "Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence."
    ],
    "flow": [
      [
        "Requested operation",
        "Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains."
      ],
      [
        "F_Port",
        "Ports establish roles and login relationships with endpoints or inter-switch links."
      ],
      [
        "E_Port",
        "Fabric services and active policy determine reachable port identities within the correct fabric scope."
      ],
      [
        "Management plane",
        "Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains. Fault: Both host HBAs were patched to the same switch even though port labels say A and B. Diagnosis and recovery: Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence. Boundary check: What is an F_Port used for in this lesson? Connecting an endpoint N_Port to the fabric. It is distinct from an ISL role.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t6",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Both host HBAs were patched to the same switch even though port labels say A and B. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.",
    "production": "Assign ownership at each dependency boundary. Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Endpoint login is not an ISL. Management success does not prove storage I/O. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Fabric services and active policy determine reachable port identities within the correct fabric scope. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "It is distinct from an ISL role.",
      "An ISL has its own capacity and dependencies.",
      "Management and data paths differ.",
      "A shortcut can remove independence.",
      "A static link-up flag is inadequate.",
      "Labels are not physical evidence."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t5"
    ],
    "related": [
      "s8-g2-t7"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for SAN Switch. Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "F_Port → Fabric port attached to an N_Port",
        "E_Port → Inter-switch expansion port",
        "Management plane → Administrative access"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. Both host HBAs were patched to the same switch even though port labels say A and B. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "Both host HBAs were patched to the same switch even though port labels say A and B. The design requires separate fabric failure domains.",
      "challenge": "What disproves the claimed redundant cabling? Extend the design with one shared failure domain and state how you would test it.",
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
        "questionId": "s8-g2-t6-QC1",
        "topicId": "s8-g2-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this SAN Switch case?",
        "answer": "Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "F_Port"
      },
      {
        "questionId": "s8-g2-t6-QC2",
        "topicId": "s8-g2-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for SAN Switch.",
        "answer": "Fabric services and active policy determine reachable port identities within the correct fabric scope.",
        "explanation": "An ISL can connect shared failure domains.",
        "testedConcept": "E_Port"
      },
      {
        "questionId": "s8-g2-t6-QC3",
        "topicId": "s8-g2-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Management plane matters here?",
        "answer": "Management success does not prove storage I/O.",
        "explanation": "Frames traverse available links subject to errors, credits and congestion; endpoint storage commands provide the final service evidence.",
        "testedConcept": "Management plane"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t6-Q1",
        "topicId": "s8-g2-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is an F_Port used for in this lesson?",
        "answer": "Connecting an endpoint N_Port to the fabric.",
        "explanation": "It is distinct from an ISL role.",
        "testedConcept": "F_Port"
      },
      {
        "questionId": "s8-g2-t6-Q2",
        "topicId": "s8-g2-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does an E_Port connect?",
        "answer": "Another fabric switch through an inter-switch link.",
        "explanation": "An ISL has its own capacity and dependencies.",
        "testedConcept": "E_Port"
      },
      {
        "questionId": "s8-g2-t6-Q3",
        "topicId": "s8-g2-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a reachable management IP prove SAN forwarding?",
        "answer": "No.",
        "explanation": "Management and data paths differ.",
        "testedConcept": "Management plane"
      },
      {
        "questionId": "s8-g2-t6-Q4",
        "topicId": "s8-g2-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid joining A and B just to make discovery easier?",
        "answer": "The design requires separate fabric failure domains.",
        "explanation": "A shortcut can remove independence.",
        "testedConcept": "F_Port"
      },
      {
        "questionId": "s8-g2-t6-Q5",
        "topicId": "s8-g2-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observations help diagnose congestion?",
        "answer": "Timed error/credit/link utilization evidence correlated with workload latency.",
        "explanation": "A static link-up flag is inadequate.",
        "testedConcept": "E_Port"
      },
      {
        "questionId": "s8-g2-t6-Q6",
        "topicId": "s8-g2-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What disproves the claimed redundant cabling?",
        "answer": "Both HBA routes terminate in the same switch or common failed dependency.",
        "explanation": "Labels are not physical evidence.",
        "testedConcept": "Management plane"
      },
      {
        "questionId": "s8-g2-t6-Q7",
        "topicId": "s8-g2-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the SAN Switch incident, which assumption failed?",
        "answer": "Both host HBAs were patched to the same switch even though port labels say A and B.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t6-Q8",
        "topicId": "s8-g2-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the SAN Switch incident?",
        "answer": "Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t6-Q9",
        "topicId": "s8-g2-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast F_Port and E_Port.",
        "answer": "Fabric port attached to an N_Port. Inter-switch expansion port.",
        "explanation": "Endpoint login is not an ISL. An ISL can connect shared failure domains.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t6-Q10",
        "topicId": "s8-g2-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this SAN Switch worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "Two isolated SAN switches implement Fabrics A and B, each with host and array connections; no ISL joins the two redundancy domains.",
      "fault": "Both host HBAs were patched to the same switch even though port labels say A and B.",
      "restore": "Trace actual cable endpoints and fabric identities; restore the intended independent fabric connection and verify both path and I/O evidence.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t7",
    "batch": "19",
    "title": "Brocade fundamentals",
    "subtitle": "A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t7",
    "definition": "Brocade SAN administration uses Fabric OS concepts including switch/fabric identity, port state, aliases and defined versus effective zoning configuration. Procedures must match the installed Fabric OS and hardware release.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
    "mental": "Treat this lesson as a handoff between Fabric OS, Alias, Effective configuration. Collect product, Fabric OS, switch identity and endpoint login evidence before interpreting names. A successful earlier handoff cannot stand in for evidence at the next one. Defined intent can differ from operational state. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Fabric OS: Brocade fabric operating software. Commands and support are release-specific.",
      "Alias: Readable zoning member reference. A stale WWPN can hide behind a correct label.",
      "Effective configuration: Currently enforced zoning. Defined intent can differ from operational state."
    ],
    "mechanism": [
      "Collect product, Fabric OS, switch identity and endpoint login evidence before interpreting names.",
      "Compare alias and zone definitions with the effective configuration in the intended fabric.",
      "Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change."
    ],
    "flow": [
      [
        "Requested operation",
        "A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter."
      ],
      [
        "Fabric OS",
        "Collect product, Fabric OS, switch identity and endpoint login evidence before interpreting names."
      ],
      [
        "Alias",
        "Compare alias and zone definitions with the effective configuration in the intended fabric."
      ],
      [
        "Effective configuration",
        "Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter. Fault: The operator adds a new zone to the defined database without verifying the effective fabric configuration. Diagnosis and recovery: Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results. Boundary check: Why record Fabric OS version first? Syntax, support and operational procedures depend on release. A vendor family name is insufficient.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g2-t7",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The operator adds a new zone to the defined database without verifying the effective fabric configuration. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.",
    "production": "Assign ownership at each dependency boundary. Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Commands and support are release-specific. Defined intent can differ from operational state. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Compare alias and zone definitions with the effective configuration in the intended fabric. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "A vendor family name is insufficient.",
      "Inspect the value.",
      "Check the active enforcement view.",
      "Reverting to a default is not exact rollback.",
      "Follow the chain to the host.",
      "The offline model is not Fabric OS emulation."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t6"
    ],
    "related": [
      "s8-g2-t8"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Brocade fundamentals. A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Fabric OS → Brocade fabric operating software",
        "Alias → Readable zoning member reference",
        "Effective configuration → Currently enforced zoning"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The operator adds a new zone to the defined database without verifying the effective fabric configuration. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The operator adds a new zone to the defined database without verifying the effective fabric configuration. The exact prior effective configuration and the approved member diff.",
      "challenge": "How does this course classify Brocade target changes? Extend the design with one shared failure domain and state how you would test it.",
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
        "questionId": "s8-g2-t7-QC1",
        "topicId": "s8-g2-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Brocade fundamentals case?",
        "answer": "A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Fabric OS"
      },
      {
        "questionId": "s8-g2-t7-QC2",
        "topicId": "s8-g2-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Brocade fundamentals.",
        "answer": "Compare alias and zone definitions with the effective configuration in the intended fabric.",
        "explanation": "A stale WWPN can hide behind a correct label.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s8-g2-t7-QC3",
        "topicId": "s8-g2-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Effective configuration matters here?",
        "answer": "Defined intent can differ from operational state.",
        "explanation": "Use a reviewed platform-supported activation and rollback procedure; verify host paths and an owned storage transaction after the change.",
        "testedConcept": "Effective configuration"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t7-Q1",
        "topicId": "s8-g2-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why record Fabric OS version first?",
        "answer": "Syntax, support and operational procedures depend on release.",
        "explanation": "A vendor family name is insufficient.",
        "testedConcept": "Fabric OS"
      },
      {
        "questionId": "s8-g2-t7-Q2",
        "topicId": "s8-g2-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What can a correct alias label conceal?",
        "answer": "A stale or wrong underlying WWPN.",
        "explanation": "Inspect the value.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s8-g2-t7-Q3",
        "topicId": "s8-g2-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does defined zoning always equal effective zoning?",
        "answer": "No.",
        "explanation": "Check the active enforcement view.",
        "testedConcept": "Effective configuration"
      },
      {
        "questionId": "s8-g2-t7-Q4",
        "topicId": "s8-g2-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should be preserved before zoning activation?",
        "answer": "The exact prior effective configuration and the approved member diff.",
        "explanation": "Reverting to a default is not exact rollback.",
        "testedConcept": "Fabric OS"
      },
      {
        "questionId": "s8-g2-t7-Q5",
        "topicId": "s8-g2-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a switch-only review prove correct LUN masking?",
        "answer": "No; the array has a separate mapping layer.",
        "explanation": "Follow the chain to the host.",
        "testedConcept": "Alias"
      },
      {
        "questionId": "s8-g2-t7-Q6",
        "topicId": "s8-g2-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How does this course classify Brocade target changes?",
        "answer": "Guided and unexecuted on a real switch.",
        "explanation": "The offline model is not Fabric OS emulation.",
        "testedConcept": "Effective configuration"
      },
      {
        "questionId": "s8-g2-t7-Q7",
        "topicId": "s8-g2-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Brocade fundamentals incident, which assumption failed?",
        "answer": "The operator adds a new zone to the defined database without verifying the effective fabric configuration.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t7-Q8",
        "topicId": "s8-g2-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Brocade fundamentals incident?",
        "answer": "Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t7-Q9",
        "topicId": "s8-g2-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Fabric OS and Alias.",
        "answer": "Brocade fabric operating software. Readable zoning member reference.",
        "explanation": "Commands and support are release-specific. A stale WWPN can hide behind a correct label.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t7-Q10",
        "topicId": "s8-g2-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Brocade fundamentals worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "A storage ticket references hostA, but the alias still contains the WWPN from its retired adapter.",
      "fault": "The operator adds a new zone to the defined database without verifying the effective fabric configuration.",
      "restore": "Read the installed-release zoning views, reconcile current WWPN ownership and the effective configuration, then retain exact before/after membership and host I/O results.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
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
    "id": "s8-g2-t8",
    "batch": "19",
    "title": "Cisco MDS fundamentals",
    "subtitle": "The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g2-t8",
    "definition": "Cisco MDS provides Fibre Channel fabric services with VSAN-scoped zoning and operational views. A VSAN separates logical fabrics on shared hardware; it does not create independent power or chassis.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
    "mental": "Treat this lesson as a handoff between VSAN, Zoneset, FLOGI database. Identify the switch, software release, physical ports and intended VSAN context. A successful earlier handoff cannot stand in for evidence at the next one. Login does not establish array authorization. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "VSAN: Logical FC fabric partition. It shares underlying hardware resources.",
      "Zoneset: Collection of zones activated in a VSAN. A saved definition can differ from active membership.",
      "FLOGI database: Observed fabric logins. Login does not establish array authorization."
    ],
    "mechanism": [
      "Identify the switch, software release, physical ports and intended VSAN context.",
      "Correlate fabric login and name-service evidence with the active zoneset for that VSAN.",
      "Reconcile array presentation and host device paths before accepting useful storage access."
    ],
    "flow": [
      [
        "Requested operation",
        "The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10."
      ],
      [
        "VSAN",
        "Identify the switch, software release, physical ports and intended VSAN context."
      ],
      [
        "Zoneset",
        "Correlate fabric login and name-service evidence with the active zoneset for that VSAN."
      ],
      [
        "FLOGI database",
        "Reconcile array presentation and host device paths before accepting useful storage access."
      ]
    ],
    "comparison": [
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
    "example": "Worked case: The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10. Fault: The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. Diagnosis and recovery: Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction. Boundary check: What scope must accompany MDS zoning evidence? The relevant VSAN. A zone name alone is ambiguous.",
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
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.",
    "production": "Assign ownership at each dependency boundary. Reconcile array presentation and host device paths before accepting useful storage access. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It shares underlying hardware resources. Login does not establish array authorization. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Correlate fabric login and name-service evidence with the active zoneset for that VSAN. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
    "troubleshooting": [
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
      "A zone name alone is ambiguous.",
      "Logical partitioning is not physical redundancy.",
      "It does not prove mapped storage.",
      "Further VSAN selection must match the target context.",
      "Saved intent is not always active state.",
      "A successful CLI command is not the service result."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g2-t7"
    ],
    "related": [
      "s8-g3-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Cisco MDS fundamentals. The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "VSAN → Logical FC fabric partition",
        "Zoneset → Collection of zones activated in a VSAN",
        "FLOGI database → Observed fabric logins"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it. show zoneset active.",
      "challenge": "What closes the MDS repair investigation? Extend the design with one shared failure domain and state how you would test it.",
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
        "questionId": "s8-g2-t8-QC1",
        "topicId": "s8-g2-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Cisco MDS fundamentals case?",
        "answer": "The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "s8-g2-t8-QC2",
        "topicId": "s8-g2-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Cisco MDS fundamentals.",
        "answer": "Correlate fabric login and name-service evidence with the active zoneset for that VSAN.",
        "explanation": "A saved definition can differ from active membership.",
        "testedConcept": "Zoneset"
      },
      {
        "questionId": "s8-g2-t8-QC3",
        "topicId": "s8-g2-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of FLOGI database matters here?",
        "answer": "Login does not establish array authorization.",
        "explanation": "Reconcile array presentation and host device paths before accepting useful storage access.",
        "testedConcept": "FLOGI database"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g2-t8-Q1",
        "topicId": "s8-g2-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What scope must accompany MDS zoning evidence?",
        "answer": "The relevant VSAN.",
        "explanation": "A zone name alone is ambiguous.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "s8-g2-t8-Q2",
        "topicId": "s8-g2-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Do two VSANs in one chassis survive chassis power loss independently?",
        "answer": "No.",
        "explanation": "Logical partitioning is not physical redundancy.",
        "testedConcept": "Zoneset"
      },
      {
        "questionId": "s8-g2-t8-Q3",
        "topicId": "s8-g2-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does a fabric login establish?",
        "answer": "An observed endpoint login in the fabric.",
        "explanation": "It does not prove mapped storage.",
        "testedConcept": "FLOGI database"
      },
      {
        "questionId": "s8-g2-t8-Q4",
        "topicId": "s8-g2-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which documented read-only command inspects active zonesets?",
        "answer": "show zoneset active.",
        "explanation": "Further VSAN selection must match the target context.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "s8-g2-t8-Q5",
        "topicId": "s8-g2-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why preserve the full and active configuration separately?",
        "answer": "They can differ, and rollback must recover intended enforcement.",
        "explanation": "Saved intent is not always active state.",
        "testedConcept": "Zoneset"
      },
      {
        "questionId": "s8-g2-t8-Q6",
        "topicId": "s8-g2-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What closes the MDS repair investigation?",
        "answer": "Correct active membership, mapped device identity and original host I/O with a denied-host check.",
        "explanation": "A successful CLI command is not the service result.",
        "testedConcept": "FLOGI database"
      },
      {
        "questionId": "s8-g2-t8-Q7",
        "topicId": "s8-g2-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Cisco MDS fundamentals incident, which assumption failed?",
        "answer": "The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g2-t8-Q8",
        "topicId": "s8-g2-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Cisco MDS fundamentals incident?",
        "answer": "Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g2-t8-Q9",
        "topicId": "s8-g2-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast VSAN and Zoneset.",
        "answer": "Logical FC fabric partition. Collection of zones activated in a VSAN.",
        "explanation": "It shares underlying hardware resources. A saved definition can differ from active membership.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g2-t8-Q10",
        "topicId": "s8-g2-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Cisco MDS fundamentals worksheet leave unverified?",
        "answer": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "path",
      "baseline": "The intended initiator is in VSAN 20, while a copied change activated its zone only in VSAN 10.",
      "fault": "The zone appears in a configuration search, but the active zoneset in the host VSAN excludes it.",
      "restore": "Use the correct VSAN-scoped active view and compare it with approved members; repair only the intended scope and verify the array map and host transaction.",
      "scope": "Declared two-fabric access predicate: a path needs its fabric, zone and mapping; both share one array. This does not emulate FC, sessions, ALUA, timeouts or measured I/O. Other storage abstractions use the incident exercise; the SAN companion demonstrates a separate block-path boundary."
    },
    "artifacts": [
      {
        "title": "Batch 19 evidence workbook",
        "path": "labs/storage-virtualization-19-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  }
];
