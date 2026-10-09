window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["21"] = [
  {
    "id": "s8-g6-t0",
    "batch": "21",
    "title": "Microsoft Hyper-V",
    "subtitle": "A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g6-t0",
    "definition": "Microsoft Hyper-V uses a type 1 hypervisor with a privileged management partition and child partitions for VMs. Virtual switches, virtual disks and integration components supply distinct dependencies; Failover Clustering is an additional availability layer.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.",
    "mental": "Treat this lesson as a handoff between Management partition, VHDX, Checkpoint. The hypervisor partitions processor and memory execution while the management partition provides management and supported device services. A successful earlier handoff cannot stand in for evidence at the next one. It is not an independent backup. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Management partition: Privileged host management and device context. A familiar Windows UI does not make Hyper-V type 2.",
      "VHDX: Virtual disk file format. Its backing storage still needs protection.",
      "Checkpoint: Point-in-time VM state mechanism. It is not an independent backup."
    ],
    "mechanism": [
      "The hypervisor partitions processor and memory execution while the management partition provides management and supported device services.",
      "A VM uses virtual storage and networking whose backing paths must be documented and authorized.",
      "Migration, checkpoints, replication and clustered restart have different requirements and recovery semantics; each needs its own validation."
    ],
    "flow": [
      [
        "Requested operation",
        "A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints."
      ],
      [
        "Management partition",
        "The hypervisor partitions processor and memory execution while the management partition provides management and supported device services."
      ],
      [
        "VHDX",
        "A VM uses virtual storage and networking whose backing paths must be documented and authorized."
      ],
      [
        "Checkpoint",
        "Migration, checkpoints, replication and clustered restart have different requirements and recovery semantics; each needs its own validation."
      ]
    ],
    "comparison": [
      [
        "Management partition",
        "Privileged host management and device context",
        "A familiar Windows UI does not make Hyper-V type 2."
      ],
      [
        "VHDX",
        "Virtual disk file format",
        "Its backing storage still needs protection."
      ],
      [
        "Checkpoint",
        "Point-in-time VM state mechanism",
        "It is not an independent backup."
      ]
    ],
    "example": "Worked case: A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints. Fault: The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance. Diagnosis and recovery: Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation. Boundary check: What hypervisor category applies to Hyper-V? Type 1. The management partition runs above the hypervisor.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g6-t0",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation.",
    "production": "Assign ownership at each dependency boundary. Migration, checkpoints, replication and clustered restart have different requirements and recovery semantics; each needs its own validation. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A familiar Windows UI does not make Hyper-V type 2. It is not an independent backup. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. A VM uses virtual storage and networking whose backing paths must be documented and authorized. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance.",
        "Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation."
      ],
      [
        "What does a VHDX file provide?",
        "Virtual disk backing for a VM. The file needs a valid protected storage path."
      ],
      [
        "Why check switch type as well as name?",
        "External, internal and private attachment designs have different reachability. Names can be misleading."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "The management partition runs above the hypervisor.",
      "Cluster configuration and shared dependencies are additional work.",
      "The file needs a valid protected storage path.",
      "It has dependencies and consistency scope.",
      "Names can be misleading.",
      "VM running state is insufficient."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g5-t11"
    ],
    "related": [
      "s8-g6-t1"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Microsoft Hyper-V. A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Management partition → Privileged host management and device context",
        "VHDX → Virtual disk file format",
        "Checkpoint → Point-in-time VM state mechanism"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance. No.",
      "challenge": "What validates the network repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Management partition": "Privileged host management and device context. A familiar Windows UI does not make Hyper-V type 2.",
      "VHDX": "Virtual disk file format. Its backing storage still needs protection.",
      "Checkpoint": "Point-in-time VM state mechanism. It is not an independent backup."
    },
    "sources": [
      {
        "title": "Microsoft Hyper-V architecture overview",
        "url": "https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/overview",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g6-t0-QC1",
        "topicId": "s8-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Microsoft Hyper-V case?",
        "answer": "A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Management partition"
      },
      {
        "questionId": "s8-g6-t0-QC2",
        "topicId": "s8-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Microsoft Hyper-V.",
        "answer": "A VM uses virtual storage and networking whose backing paths must be documented and authorized.",
        "explanation": "Its backing storage still needs protection.",
        "testedConcept": "VHDX"
      },
      {
        "questionId": "s8-g6-t0-QC3",
        "topicId": "s8-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Checkpoint matters here?",
        "answer": "It is not an independent backup.",
        "explanation": "Migration, checkpoints, replication and clustered restart have different requirements and recovery semantics; each needs its own validation.",
        "testedConcept": "Checkpoint"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g6-t0-Q1",
        "topicId": "s8-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What hypervisor category applies to Hyper-V?",
        "answer": "Type 1.",
        "explanation": "The management partition runs above the hypervisor.",
        "testedConcept": "Management partition"
      },
      {
        "questionId": "s8-g6-t0-Q2",
        "topicId": "s8-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does Hyper-V installation alone create a failover cluster?",
        "answer": "No.",
        "explanation": "Cluster configuration and shared dependencies are additional work.",
        "testedConcept": "VHDX"
      },
      {
        "questionId": "s8-g6-t0-Q3",
        "topicId": "s8-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does a VHDX file provide?",
        "answer": "Virtual disk backing for a VM.",
        "explanation": "The file needs a valid protected storage path.",
        "testedConcept": "Checkpoint"
      },
      {
        "questionId": "s8-g6-t0-Q4",
        "topicId": "s8-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is a checkpoint an independent backup?",
        "answer": "No.",
        "explanation": "It has dependencies and consistency scope.",
        "testedConcept": "Management partition"
      },
      {
        "questionId": "s8-g6-t0-Q5",
        "topicId": "s8-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why check switch type as well as name?",
        "answer": "External, internal and private attachment designs have different reachability.",
        "explanation": "Names can be misleading.",
        "testedConcept": "VHDX"
      },
      {
        "questionId": "s8-g6-t0-Q6",
        "topicId": "s8-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates the network repair?",
        "answer": "The intended guest operation succeeds and excluded network access remains denied.",
        "explanation": "VM running state is insufficient.",
        "testedConcept": "Checkpoint"
      },
      {
        "questionId": "s8-g6-t0-Q7",
        "topicId": "s8-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Microsoft Hyper-V incident, which assumption failed?",
        "answer": "The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g6-t0-Q8",
        "topicId": "s8-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Microsoft Hyper-V incident?",
        "answer": "Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g6-t0-Q9",
        "topicId": "s8-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Management partition and VHDX.",
        "answer": "Privileged host management and device context. Virtual disk file format.",
        "explanation": "A familiar Windows UI does not make Hyper-V type 2. Its backing storage still needs protection.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g6-t0-Q10",
        "topicId": "s8-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Microsoft Hyper-V worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "A Hyper-V VM uses an owned VHDX on supported storage and an isolated training virtual switch; its intended recovery is documented separately from checkpoints.",
      "fault": "The VM is running, but its virtual switch is bound to the wrong physical network after host maintenance.",
      "restore": "Compare the VM adapter, switch type and actual uplink mapping; restore the recorded attachment and verify guest connectivity and isolation.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 21 evidence workbook",
        "path": "labs/storage-virtualization-21-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g6-t1",
    "batch": "21",
    "title": "KVM",
    "subtitle": "An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g6-t1",
    "definition": "KVM supplies Linux kernel virtualization facilities. A typical supported stack combines KVM with QEMU for the VM machine/device model and libvirt for lifecycle management; these are related components, not synonyms.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.",
    "mental": "Treat this lesson as a handoff between KVM, QEMU, Libvirt. KVM exposes kernel virtualization interfaces using available processor assistance. A successful earlier handoff cannot stand in for evidence at the next one. Its configured state must be compared with actual execution. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "KVM: Kernel virtualization subsystem. It is not the complete management UI.",
      "QEMU: Userspace machine/device implementation. Acceleration and device behavior must be specified.",
      "Libvirt: Management interface and service layer. Its configured state must be compared with actual execution."
    ],
    "mechanism": [
      "KVM exposes kernel virtualization interfaces using available processor assistance.",
      "QEMU supplies a userspace machine and device model, optionally using virtio interfaces for efficient guest I/O.",
      "Libvirt manages VM definitions and lifecycle according to host policy; host permissions, networking and storage remain separate dependencies."
    ],
    "flow": [
      [
        "Requested operation",
        "An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network."
      ],
      [
        "KVM",
        "KVM exposes kernel virtualization interfaces using available processor assistance."
      ],
      [
        "QEMU",
        "QEMU supplies a userspace machine and device model, optionally using virtio interfaces for efficient guest I/O."
      ],
      [
        "Libvirt",
        "Libvirt manages VM definitions and lifecycle according to host policy; host permissions, networking and storage remain separate dependencies."
      ]
    ],
    "comparison": [
      [
        "KVM",
        "Kernel virtualization subsystem",
        "It is not the complete management UI."
      ],
      [
        "QEMU",
        "Userspace machine/device implementation",
        "Acceleration and device behavior must be specified."
      ],
      [
        "Libvirt",
        "Management interface and service layer",
        "Its configured state must be compared with actual execution."
      ]
    ],
    "example": "Worked case: An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network. Fault: A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy. Diagnosis and recovery: Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest. Boundary check: Are KVM, QEMU and libvirt the same component? No; kernel acceleration, machine/device implementation and management have different roles. Distinguish the failing layer.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g6-t1",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest.",
    "production": "Assign ownership at each dependency boundary. Libvirt manages VM definitions and lifecycle according to host policy; host permissions, networking and storage remain separate dependencies. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. It is not the complete management UI. Its configured state must be compared with actual execution. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. QEMU supplies a userspace machine and device model, optionally using virtio interfaces for efficient guest I/O. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy.",
        "Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest."
      ],
      [
        "Why can an existing disk file fail to open?",
        "Service permissions, parent traversal or host security policy may deny it. Existence is not authorization."
      ],
      [
        "What guest I/O family is commonly associated with paravirtualized interfaces?",
        "Virtio. It still requires compatible guest drivers and host support."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Distinguish the failing layer.",
      "Drivers, device model and supported configuration also matter.",
      "Existence is not authorization.",
      "Restore the precise supported label or permission boundary.",
      "It still requires compatible guest drivers and host support.",
      "Lifecycle state is narrower than service health."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g6-t0"
    ],
    "related": [
      "s8-g6-t2"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for KVM. An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "KVM → Kernel virtualization subsystem",
        "QEMU → Userspace machine/device implementation",
        "Libvirt → Management interface and service layer"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy. No.",
      "challenge": "What validates the restored guest? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "KVM": "Kernel virtualization subsystem. It is not the complete management UI.",
      "QEMU": "Userspace machine/device implementation. Acceleration and device behavior must be specified.",
      "Libvirt": "Management interface and service layer. Its configured state must be compared with actual execution."
    },
    "sources": [
      {
        "title": "Linux kernel KVM documentation",
        "url": "https://docs.kernel.org/virt/kvm/index.html",
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
        "questionId": "s8-g6-t1-QC1",
        "topicId": "s8-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this KVM case?",
        "answer": "An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "KVM"
      },
      {
        "questionId": "s8-g6-t1-QC2",
        "topicId": "s8-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for KVM.",
        "answer": "QEMU supplies a userspace machine and device model, optionally using virtio interfaces for efficient guest I/O.",
        "explanation": "Acceleration and device behavior must be specified.",
        "testedConcept": "QEMU"
      },
      {
        "questionId": "s8-g6-t1-QC3",
        "topicId": "s8-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Libvirt matters here?",
        "answer": "Its configured state must be compared with actual execution.",
        "explanation": "Libvirt manages VM definitions and lifecycle according to host policy; host permissions, networking and storage remain separate dependencies.",
        "testedConcept": "Libvirt"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g6-t1-Q1",
        "topicId": "s8-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Are KVM, QEMU and libvirt the same component?",
        "answer": "No; kernel acceleration, machine/device implementation and management have different roles.",
        "explanation": "Distinguish the failing layer.",
        "testedConcept": "KVM"
      },
      {
        "questionId": "s8-g6-t1-Q2",
        "topicId": "s8-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does hardware virtualization exposure guarantee every guest device works?",
        "answer": "No.",
        "explanation": "Drivers, device model and supported configuration also matter.",
        "testedConcept": "QEMU"
      },
      {
        "questionId": "s8-g6-t1-Q3",
        "topicId": "s8-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can an existing disk file fail to open?",
        "answer": "Service permissions, parent traversal or host security policy may deny it.",
        "explanation": "Existence is not authorization.",
        "testedConcept": "Libvirt"
      },
      {
        "questionId": "s8-g6-t1-Q4",
        "topicId": "s8-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Should an access repair disable the host security framework globally?",
        "answer": "No.",
        "explanation": "Restore the precise supported label or permission boundary.",
        "testedConcept": "KVM"
      },
      {
        "questionId": "s8-g6-t1-Q5",
        "topicId": "s8-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What guest I/O family is commonly associated with paravirtualized interfaces?",
        "answer": "Virtio.",
        "explanation": "It still requires compatible guest drivers and host support.",
        "testedConcept": "QEMU"
      },
      {
        "questionId": "s8-g6-t1-Q6",
        "topicId": "s8-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates the restored guest?",
        "answer": "Correct disk/network identity and the original guest transaction, not only a running process.",
        "explanation": "Lifecycle state is narrower than service health.",
        "testedConcept": "Libvirt"
      },
      {
        "questionId": "s8-g6-t1-Q7",
        "topicId": "s8-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the KVM incident, which assumption failed?",
        "answer": "A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g6-t1-Q8",
        "topicId": "s8-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the KVM incident?",
        "answer": "Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g6-t1-Q9",
        "topicId": "s8-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast KVM and QEMU.",
        "answer": "Kernel virtualization subsystem. Userspace machine/device implementation.",
        "explanation": "It is not the complete management UI. Acceleration and device behavior must be specified.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g6-t1-Q10",
        "topicId": "s8-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this KVM worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "An owned Linux host runs a QEMU/KVM guest managed by libvirt, with a documented disk path and isolated virtual network.",
      "fault": "A VM definition points to a disk path that exists but is inaccessible to the configured service identity or security policy.",
      "restore": "Verify the exact disk identity, path traversal, ownership and host security policy; restore narrow intended access and start only the owned disposable guest.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 21 evidence workbook",
        "path": "labs/storage-virtualization-21-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g6-t2",
    "batch": "21",
    "title": "Containers fundamentals",
    "subtitle": "A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g6-t2",
    "definition": "A container packages and runs processes with isolation and resource controls while sharing a kernel in the ordinary Linux container model. An image is a reusable filesystem/configuration source; persistent application data requires an explicit lifecycle outside the disposable writable layer.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.",
    "mental": "Treat this lesson as a handoff between Image, Container, Volume. A runtime constructs the process environment from an image and configured mounts, identity and network settings. A successful earlier handoff cannot stand in for evidence at the next one. Persistence alone does not create a backup. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Image: Reusable filesystem/configuration source. A tag can be mutable.",
      "Container: Running or stopped process instance with configuration. It is not a separate guest kernel by default.",
      "Volume: Storage managed outside the disposable container layer. Persistence alone does not create a backup."
    ],
    "mechanism": [
      "A runtime constructs the process environment from an image and configured mounts, identity and network settings.",
      "Namespaces and control groups provide selected isolation and resource boundaries around processes sharing a kernel.",
      "The application writes either to its disposable layer or a deliberately managed volume; restart and rescheduling must preserve the intended data contract."
    ],
    "flow": [
      [
        "Requested operation",
        "A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest."
      ],
      [
        "Image",
        "A runtime constructs the process environment from an image and configured mounts, identity and network settings."
      ],
      [
        "Container",
        "Namespaces and control groups provide selected isolation and resource boundaries around processes sharing a kernel."
      ],
      [
        "Volume",
        "The application writes either to its disposable layer or a deliberately managed volume; restart and rescheduling must preserve the intended data contract."
      ]
    ],
    "comparison": [
      [
        "Image",
        "Reusable filesystem/configuration source",
        "A tag can be mutable."
      ],
      [
        "Container",
        "Running or stopped process instance with configuration",
        "It is not a separate guest kernel by default."
      ],
      [
        "Volume",
        "Storage managed outside the disposable container layer",
        "Persistence alone does not create a backup."
      ]
    ],
    "example": "Worked case: A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest. Fault: The application writes its database into the container writable layer and loses it when that instance is replaced. Diagnosis and recovery: Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification. Boundary check: Does each ordinary Linux container boot its own kernel? No; containers share the host kernel. VMs have a different execution boundary.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g6-t2",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: The application writes its database into the container writable layer and loses it when that instance is replaced. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification.",
    "production": "Assign ownership at each dependency boundary. The application writes either to its disposable layer or a deliberately managed volume; restart and rescheduling must preserve the intended data contract. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A tag can be mutable. Persistence alone does not create a backup. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Namespaces and control groups provide selected isolation and resource boundaries around processes sharing a kernel. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.",
    "troubleshooting": [
      [
        "The application writes its database into the container writable layer and loses it when that instance is replaced.",
        "Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification."
      ],
      [
        "What is lost when a disposable writable layer is removed?",
        "Data stored only in that layer. Application state needs a deliberate lifecycle."
      ],
      [
        "Why restrict privileged containers and host mounts?",
        "They can weaken intended host isolation. Packaging is not automatic least privilege."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "VMs have a different execution boundary.",
      "Use a content digest where reproducible identity matters.",
      "Application state needs a deliberate lifecycle.",
      "Persistence and independent recovery differ.",
      "Packaging is not automatic least privilege.",
      "A process restart alone is a weaker test."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g6-t1"
    ],
    "related": [
      "s8-g6-t3"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Containers fundamentals. A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Image → Reusable filesystem/configuration source",
        "Container → Running or stopped process instance with configuration",
        "Volume → Storage managed outside the disposable container layer"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. The application writes its database into the container writable layer and loses it when that instance is replaced. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "The application writes its database into the container writable layer and loses it when that instance is replaced. No.",
      "challenge": "What tests the persistence repair? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Image": "Reusable filesystem/configuration source. A tag can be mutable.",
      "Container": "Running or stopped process instance with configuration. It is not a separate guest kernel by default.",
      "Volume": "Storage managed outside the disposable container layer. Persistence alone does not create a backup."
    },
    "sources": [
      {
        "title": "Docker engine, image and container concepts",
        "url": "https://docs.docker.com/get-started/docker-overview/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g6-t2-QC1",
        "topicId": "s8-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Containers fundamentals case?",
        "answer": "A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Image"
      },
      {
        "questionId": "s8-g6-t2-QC2",
        "topicId": "s8-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Containers fundamentals.",
        "answer": "Namespaces and control groups provide selected isolation and resource boundaries around processes sharing a kernel.",
        "explanation": "It is not a separate guest kernel by default.",
        "testedConcept": "Container"
      },
      {
        "questionId": "s8-g6-t2-QC3",
        "topicId": "s8-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Volume matters here?",
        "answer": "Persistence alone does not create a backup.",
        "explanation": "The application writes either to its disposable layer or a deliberately managed volume; restart and rescheduling must preserve the intended data contract.",
        "testedConcept": "Volume"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g6-t2-Q1",
        "topicId": "s8-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does each ordinary Linux container boot its own kernel?",
        "answer": "No; containers share the host kernel.",
        "explanation": "VMs have a different execution boundary.",
        "testedConcept": "Image"
      },
      {
        "questionId": "s8-g6-t2-Q2",
        "topicId": "s8-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is an image tag always immutable?",
        "answer": "No.",
        "explanation": "Use a content digest where reproducible identity matters.",
        "testedConcept": "Container"
      },
      {
        "questionId": "s8-g6-t2-Q3",
        "topicId": "s8-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is lost when a disposable writable layer is removed?",
        "answer": "Data stored only in that layer.",
        "explanation": "Application state needs a deliberate lifecycle.",
        "testedConcept": "Volume"
      },
      {
        "questionId": "s8-g6-t2-Q4",
        "topicId": "s8-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does mounting a volume make data backed up?",
        "answer": "No.",
        "explanation": "Persistence and independent recovery differ.",
        "testedConcept": "Image"
      },
      {
        "questionId": "s8-g6-t2-Q5",
        "topicId": "s8-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why restrict privileged containers and host mounts?",
        "answer": "They can weaken intended host isolation.",
        "explanation": "Packaging is not automatic least privilege.",
        "testedConcept": "Container"
      },
      {
        "questionId": "s8-g6-t2-Q6",
        "topicId": "s8-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What tests the persistence repair?",
        "answer": "Replace the owned instance while preserving and validating the intended records, then separately test restore.",
        "explanation": "A process restart alone is a weaker test.",
        "testedConcept": "Volume"
      },
      {
        "questionId": "s8-g6-t2-Q7",
        "topicId": "s8-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Containers fundamentals incident, which assumption failed?",
        "answer": "The application writes its database into the container writable layer and loses it when that instance is replaced.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g6-t2-Q8",
        "topicId": "s8-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Containers fundamentals incident?",
        "answer": "Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g6-t2-Q9",
        "topicId": "s8-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Image and Container.",
        "answer": "Reusable filesystem/configuration source. Running or stopped process instance with configuration.",
        "explanation": "A tag can be mutable. It is not a separate guest kernel by default.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g6-t2-Q10",
        "topicId": "s8-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Containers fundamentals worksheet leave unverified?",
        "answer": "Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "reconcile",
      "baseline": "A stateful service stores records on an explicitly owned volume; its container image is pinned to a reviewed digest.",
      "fault": "The application writes its database into the container writable layer and loses it when that instance is replaced.",
      "restore": "Restore the dataset from a verified retained copy, mount the intended persistent storage and test replacement without losing records; retain separate backup verification.",
      "scope": "Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed."
    },
    "artifacts": [
      {
        "title": "Batch 21 evidence workbook",
        "path": "labs/storage-virtualization-21-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g6-t3",
    "batch": "21",
    "title": "Docker basics",
    "subtitle": "A disposable app container exposes a test service only on loopback and mounts a named owned data volume.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g6-t3",
    "definition": "Docker supplies tooling and a runtime workflow for building images and managing containers. The CLI talks to a daemon or configured context; that target identity matters before creating, stopping or removing anything.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A disposable app container exposes a test service only on loopback and mounts a named owned data volume.",
    "mental": "Treat this lesson as a handoff between Docker context, Published port, Build context. A build definition and context produce an image whose provenance and included files should be reviewed. A successful earlier handoff cannot stand in for evidence at the next one. Secrets can be included accidentally. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Docker context: Selected daemon endpoint and credentials. A local command can target a remote host.",
      "Published port: Host-to-container exposure mapping. It can expose a service beyond the intended interface.",
      "Build context: Files available to a build. Secrets can be included accidentally."
    ],
    "mechanism": [
      "A build definition and context produce an image whose provenance and included files should be reviewed.",
      "The client asks the selected daemon to create a container with explicit ports, mounts, identity and resource settings.",
      "Runtime logs and inspection show the process and configuration; an application transaction and persistence test establish useful operation."
    ],
    "flow": [
      [
        "Requested operation",
        "A disposable app container exposes a test service only on loopback and mounts a named owned data volume."
      ],
      [
        "Docker context",
        "A build definition and context produce an image whose provenance and included files should be reviewed."
      ],
      [
        "Published port",
        "The client asks the selected daemon to create a container with explicit ports, mounts, identity and resource settings."
      ],
      [
        "Build context",
        "Runtime logs and inspection show the process and configuration; an application transaction and persistence test establish useful operation."
      ]
    ],
    "comparison": [
      [
        "Docker context",
        "Selected daemon endpoint and credentials",
        "A local command can target a remote host."
      ],
      [
        "Published port",
        "Host-to-container exposure mapping",
        "It can expose a service beyond the intended interface."
      ],
      [
        "Build context",
        "Files available to a build",
        "Secrets can be included accidentally."
      ]
    ],
    "example": "Worked case: A disposable app container exposes a test service only on loopback and mounts a named owned data volume. Fault: A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon. Diagnosis and recovery: Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data. Boundary check: Why inspect Docker context before cleanup? The CLI may target a remote or shared daemon. Command location does not prove target ownership.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g6-t3",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A disposable app container exposes a test service only on loopback and mounts a named owned data volume. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data.",
    "production": "Assign ownership at each dependency boundary. Runtime logs and inspection show the process and configuration; an application transaction and persistence test establish useful operation. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. A local command can target a remote host. Secrets can be included accidentally. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The client asks the selected daemon to create a container with explicit ports, mounts, identity and resource settings. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.",
    "troubleshooting": [
      [
        "A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon.",
        "Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data."
      ],
      [
        "What risk comes from publishing a test port on every host address?",
        "The service may become reachable outside the intended local scope. Exposure depends on binding and network policy."
      ],
      [
        "Is docker system prune an appropriate default cleanup for this exercise?",
        "No; it can affect unrelated resources. Remove exact owned objects only."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Command location does not prove target ownership.",
      "List semantics affect inventory.",
      "Exposure depends on binding and network policy.",
      "The Dockerfile alone does not show all input bytes.",
      "Remove exact owned objects only.",
      "A running container row is not enough."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g6-t2"
    ],
    "related": [
      "s8-g6-t4"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Docker basics. A disposable app container exposes a test service only on loopback and mounts a named owned data volume.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Docker context → Selected daemon endpoint and credentials",
        "Published port → Host-to-container exposure mapping",
        "Build context → Files available to a build"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A disposable app container exposes a test service only on loopback and mounts a named owned data volume.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon. Unneeded files or secrets can enter the image build.",
      "challenge": "What evidence proves the app works? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Docker context": "Selected daemon endpoint and credentials. A local command can target a remote host.",
      "Published port": "Host-to-container exposure mapping. It can expose a service beyond the intended interface.",
      "Build context": "Files available to a build. Secrets can be included accidentally."
    },
    "sources": [
      {
        "title": "Docker engine, image and container concepts",
        "url": "https://docs.docker.com/get-started/docker-overview/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g6-t3-QC1",
        "topicId": "s8-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Docker basics case?",
        "answer": "A disposable app container exposes a test service only on loopback and mounts a named owned data volume.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Docker context"
      },
      {
        "questionId": "s8-g6-t3-QC2",
        "topicId": "s8-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Docker basics.",
        "answer": "The client asks the selected daemon to create a container with explicit ports, mounts, identity and resource settings.",
        "explanation": "It can expose a service beyond the intended interface.",
        "testedConcept": "Published port"
      },
      {
        "questionId": "s8-g6-t3-QC3",
        "topicId": "s8-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of Build context matters here?",
        "answer": "Secrets can be included accidentally.",
        "explanation": "Runtime logs and inspection show the process and configuration; an application transaction and persistence test establish useful operation.",
        "testedConcept": "Build context"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g6-t3-Q1",
        "topicId": "s8-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why inspect Docker context before cleanup?",
        "answer": "The CLI may target a remote or shared daemon.",
        "explanation": "Command location does not prove target ownership.",
        "testedConcept": "Docker context"
      },
      {
        "questionId": "s8-g6-t3-Q2",
        "topicId": "s8-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does docker ps list stopped containers by default?",
        "answer": "No; docker ps -a includes them.",
        "explanation": "List semantics affect inventory.",
        "testedConcept": "Published port"
      },
      {
        "questionId": "s8-g6-t3-Q3",
        "topicId": "s8-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What risk comes from publishing a test port on every host address?",
        "answer": "The service may become reachable outside the intended local scope.",
        "explanation": "Exposure depends on binding and network policy.",
        "testedConcept": "Build context"
      },
      {
        "questionId": "s8-g6-t3-Q4",
        "topicId": "s8-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why use an exclusion file and review build context?",
        "answer": "Unneeded files or secrets can enter the image build.",
        "explanation": "The Dockerfile alone does not show all input bytes.",
        "testedConcept": "Docker context"
      },
      {
        "questionId": "s8-g6-t3-Q5",
        "topicId": "s8-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is docker system prune an appropriate default cleanup for this exercise?",
        "answer": "No; it can affect unrelated resources.",
        "explanation": "Remove exact owned objects only.",
        "testedConcept": "Published port"
      },
      {
        "questionId": "s8-g6-t3-Q6",
        "topicId": "s8-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence proves the app works?",
        "answer": "A bounded application transaction plus correct volume behavior and intended exposure.",
        "explanation": "A running container row is not enough.",
        "testedConcept": "Build context"
      },
      {
        "questionId": "s8-g6-t3-Q7",
        "topicId": "s8-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Docker basics incident, which assumption failed?",
        "answer": "A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g6-t3-Q8",
        "topicId": "s8-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Docker basics incident?",
        "answer": "Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g6-t3-Q9",
        "topicId": "s8-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Docker context and Published port.",
        "answer": "Selected daemon endpoint and credentials. Host-to-container exposure mapping.",
        "explanation": "A local command can target a remote host. It can expose a service beyond the intended interface.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g6-t3-Q10",
        "topicId": "s8-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Docker basics worksheet leave unverified?",
        "answer": "Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "reconcile",
      "baseline": "A disposable app container exposes a test service only on loopback and mounts a named owned data volume.",
      "fault": "A learner uses the wrong Docker context and prepares a cleanup command for a shared daemon.",
      "restore": "Verify context and object ownership before any mutation; select the intended disposable daemon and remove only exact owned objects after retaining required data.",
      "scope": "Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed."
    },
    "artifacts": [
      {
        "title": "Batch 21 evidence workbook",
        "path": "labs/storage-virtualization-21-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "s8-g6-t4",
    "batch": "21",
    "title": "Kubernetes overview",
    "subtitle": "A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.",
    "level": "Foundation → Operational reasoning",
    "minutes": 45,
    "interactive": "sv-s8-g6-t4",
    "definition": "Kubernetes reconciles declared workload state through API, controller, scheduler and node components. A desired replica count is an intention; scheduled, running and ready instances are different observations, especially when storage or resources are constrained.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.",
    "mental": "Treat this lesson as a handoff between Pod, Controller, PVC. The API accepts authorized desired-state objects and stores cluster state; controllers observe and reconcile differences. A successful earlier handoff cannot stand in for evidence at the next one. Binding and attachment can block readiness. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Pod: Scheduling unit containing related containers. Replacement creates a new instance identity.",
      "Controller: Reconciles desired and observed state. It does not guarantee immediately available capacity.",
      "PVC: PersistentVolumeClaim requesting storage. Binding and attachment can block readiness."
    ],
    "mechanism": [
      "The API accepts authorized desired-state objects and stores cluster state; controllers observe and reconcile differences.",
      "The scheduler assigns eligible pending Pods to nodes according to resource and policy constraints.",
      "Kubelet and the runtime start containers; readiness, networking and persistent-storage attachment determine whether the service can use them."
    ],
    "flow": [
      [
        "Requested operation",
        "A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready."
      ],
      [
        "Pod",
        "The API accepts authorized desired-state objects and stores cluster state; controllers observe and reconcile differences."
      ],
      [
        "Controller",
        "The scheduler assigns eligible pending Pods to nodes according to resource and policy constraints."
      ],
      [
        "PVC",
        "Kubelet and the runtime start containers; readiness, networking and persistent-storage attachment determine whether the service can use them."
      ]
    ],
    "comparison": [
      [
        "Pod",
        "Scheduling unit containing related containers",
        "Replacement creates a new instance identity."
      ],
      [
        "Controller",
        "Reconciles desired and observed state",
        "It does not guarantee immediately available capacity."
      ],
      [
        "PVC",
        "PersistentVolumeClaim requesting storage",
        "Binding and attachment can block readiness."
      ]
    ],
    "example": "Worked case: A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready. Fault: An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology. Diagnosis and recovery: Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation. Boundary check: How many replicas are pending in the example? One. Desired minus schedulable count is one in this bounded model.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline authored evidence inspector",
        "code": "python labs/storage-evidence.py --topic s8-g6-t4",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation.",
    "production": "Assign ownership at each dependency boundary. Kubelet and the runtime start containers; readiness, networking and persistent-storage attachment determine whether the service can use them. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. Replacement creates a new instance identity. Binding and attachment can block readiness. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. The scheduler assigns eligible pending Pods to nodes according to resource and policy constraints. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.",
    "troubleshooting": [
      [
        "An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology.",
        "Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation."
      ],
      [
        "Does a desired count of three prove three healthy processes?",
        "No. Intent, placement and readiness are separate."
      ],
      [
        "Does repeatedly deleting a controller-managed Pod fix an unsatisfied storage policy?",
        "No; the controller can recreate the same blocked intent. Repair the underlying constraint."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "Desired minus schedulable count is one in this bounded model.",
      "Scheduled count two minus ready count one.",
      "Intent, placement and readiness are separate.",
      "Compute capacity alone is insufficient.",
      "Repair the underlying constraint.",
      "An API object exists before service is available."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g6-t3"
    ],
    "related": [
      "lab-8"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Kubernetes overview. A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.",
      "requirements": "Browser and notebook for the authored incident. Python 3.10+ for the offline inspector. Optional vendor observations require an authorized supported disposable target and its exact manual; vendor operations are not executed by the inspector.",
      "topology": [
        "Pod → Scheduling unit containing related containers",
        "Controller → Reconciles desired and observed state",
        "PVC → PersistentVolumeClaim requesting storage"
      ],
      "steps": [
        "Read the case and draw the three labelled mechanism boundaries. A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.",
        "Record identity, expected operation, failure scope and the source version before interpreting a result. Use synthetic labels for the browser exercise; do not invent observed hardware.",
        "Select Baseline in the incident panel. Write your prediction, then reveal the reasoning. Retain the expected evidence for each boundary.",
        "Select Fault. An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology. Identify one observation that would disprove your first hypothesis.",
        "Select Recovery. Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation.",
        "Change one input in the explicitly labelled companion model. Explain whether it changes access, capacity or only a necessary prerequisite. Restore defaults and retain the model limit.",
        "On an optional disposable platform, collect the corresponding inventory and operational views from the cited manual. Compare the exact stable identity and scope before attempting a change. No platform execution is claimed by this browser exercise.",
        "Write an evidence table: baseline operation, injected condition, first failed boundary, exact restoration, original positive test and negative test. Mark unavailable evidence as not tested."
      ],
      "verification": "Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation. Record which results are authored, computed or actually observed. Keep application integrity separate from device discovery.",
      "troubleshooting": "An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology. Provisioning, binding or attachment/topology requirements can be unsatisfied.",
      "challenge": "What verifies recovered service? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume."
    },
    "glossary": {
      "Pod": "Scheduling unit containing related containers. Replacement creates a new instance identity.",
      "Controller": "Reconciles desired and observed state. It does not guarantee immediately available capacity.",
      "PVC": "PersistentVolumeClaim requesting storage. Binding and attachment can block readiness."
    },
    "sources": [
      {
        "title": "Kubernetes components and reconciliation roles",
        "url": "https://kubernetes.io/docs/concepts/overview/components/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s8-g6-t4-QC1",
        "topicId": "s8-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Kubernetes overview case?",
        "answer": "A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Pod"
      },
      {
        "questionId": "s8-g6-t4-QC2",
        "topicId": "s8-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Kubernetes overview.",
        "answer": "The scheduler assigns eligible pending Pods to nodes according to resource and policy constraints.",
        "explanation": "It does not guarantee immediately available capacity.",
        "testedConcept": "Controller"
      },
      {
        "questionId": "s8-g6-t4-QC3",
        "topicId": "s8-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of PVC matters here?",
        "answer": "Binding and attachment can block readiness.",
        "explanation": "Kubelet and the runtime start containers; readiness, networking and persistent-storage attachment determine whether the service can use them.",
        "testedConcept": "PVC"
      }
    ],
    "exams": [
      {
        "questionId": "s8-g6-t4-Q1",
        "topicId": "s8-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many replicas are pending in the example?",
        "answer": "One.",
        "explanation": "Desired minus schedulable count is one in this bounded model.",
        "testedConcept": "Pod"
      },
      {
        "questionId": "s8-g6-t4-Q2",
        "topicId": "s8-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many scheduled replicas are unready in the example?",
        "answer": "One.",
        "explanation": "Scheduled count two minus ready count one.",
        "testedConcept": "Controller"
      },
      {
        "questionId": "s8-g6-t4-Q3",
        "topicId": "s8-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a desired count of three prove three healthy processes?",
        "answer": "No.",
        "explanation": "Intent, placement and readiness are separate.",
        "testedConcept": "PVC"
      },
      {
        "questionId": "s8-g6-t4-Q4",
        "topicId": "s8-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can a PVC block a workload?",
        "answer": "Provisioning, binding or attachment/topology requirements can be unsatisfied.",
        "explanation": "Compute capacity alone is insufficient.",
        "testedConcept": "Pod"
      },
      {
        "questionId": "s8-g6-t4-Q5",
        "topicId": "s8-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does repeatedly deleting a controller-managed Pod fix an unsatisfied storage policy?",
        "answer": "No; the controller can recreate the same blocked intent.",
        "explanation": "Repair the underlying constraint.",
        "testedConcept": "Controller"
      },
      {
        "questionId": "s8-g6-t4-Q6",
        "topicId": "s8-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What verifies recovered service?",
        "answer": "Ready eligible endpoints, correct persistent data and the original client transaction.",
        "explanation": "An API object exists before service is available.",
        "testedConcept": "PVC"
      },
      {
        "questionId": "s8-g6-t4-Q7",
        "topicId": "s8-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Kubernetes overview incident, which assumption failed?",
        "answer": "An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "s8-g6-t4-Q8",
        "topicId": "s8-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Kubernetes overview incident?",
        "answer": "Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "s8-g6-t4-Q9",
        "topicId": "s8-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Pod and Controller.",
        "answer": "Scheduling unit containing related containers. Reconciles desired and observed state.",
        "explanation": "Replacement creates a new instance identity. It does not guarantee immediately available capacity.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "s8-g6-t4-Q10",
        "topicId": "s8-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Kubernetes overview worksheet leave unverified?",
        "answer": "Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "reconcile",
      "baseline": "A deployment desires three replicas, has only two eligible declared slots, and one of the scheduled replicas is ready: one is pending and one is scheduled but unready.",
      "fault": "An operator repeatedly deletes a pending Pod whose PVC cannot be bound in the eligible topology.",
      "restore": "Inspect scheduling and storage events, reconcile the storage class/claim/topology under the supported design and verify ready endpoints plus the original client operation.",
      "scope": "Declared desired replicas, available slots and ready replicas. Scheduled and ready counts are different. No container runtime, scheduler, persistent-volume controller or application is executed."
    },
    "artifacts": [
      {
        "title": "Batch 21 evidence workbook",
        "path": "labs/storage-virtualization-21-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      }
    ]
  },
  {
    "id": "lab-8",
    "batch": "21",
    "title": "Storage & Virtualization Lab",
    "subtitle": "The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.",
    "level": "Foundation → Operational reasoning",
    "minutes": 100,
    "interactive": "sv-lab-8",
    "definition": "The integrated Storage & Virtualization Lab joins two SAN fabrics, three hosts, redundant guest networking and shared storage into an explicit recovery plan. The downloadable Python lab evaluates synthetic path/placement states and separately performs real file corruption detection and restore inside an owned temporary directory.",
    "purpose": "Use this concept to diagnose the next failed boundary without damaging data or widening access. The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.",
    "mental": "Treat this lesson as a handoff between Path recovery, Placement recovery, File restore. Inventory h1, h2 and h3 with two fabric attachments each; Fabrics A and B reach controllers cA and cB on one shared array. Guest networking uses independent declared switches nA and nB. A successful earlier handoff cannot stand in for evidence at the next one. Same-host fixture is not an independent backup system. The analogy helps select an observation; the actual implementation and recovery guarantee come from the supported platform and application contract.",
    "components": [
      "Path recovery: Remaining eligible declared route after a failure. This lab does not send FC or iSCSI traffic.",
      "Placement recovery: Feasible assignment of workload records to survivors. No VM is booted or migrated.",
      "File restore: Actual replacement and hash verification of owned data. Same-host fixture is not an independent backup system."
    ],
    "mechanism": [
      "Inventory h1, h2 and h3 with two fabric attachments each; Fabrics A and B reach controllers cA and cB on one shared array. Guest networking uses independent declared switches nA and nB.",
      "Evaluate baseline, one-fabric loss, host loss, all-path loss, missing mapping and network loss separately; place six 30 GiB workload records on eligible hosts with 112 GiB usable each.",
      "Restore exact plan bytes, verify file content against a retained SHA-256 and clean owned artifacts after normal and interrupted runs; actual VM failover remains a separate guided target exercise."
    ],
    "flow": [
      [
        "Requested operation",
        "The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads."
      ],
      [
        "Path recovery",
        "Inventory h1, h2 and h3 with two fabric attachments each; Fabrics A and B reach controllers cA and cB on one shared array. Guest networking uses independent declared switches nA and nB."
      ],
      [
        "Placement recovery",
        "Evaluate baseline, one-fabric loss, host loss, all-path loss, missing mapping and network loss separately; place six 30 GiB workload records on eligible hosts with 112 GiB usable each."
      ],
      [
        "File restore",
        "Restore exact plan bytes, verify file content against a retained SHA-256 and clean owned artifacts after normal and interrupted runs; actual VM failover remains a separate guided target exercise."
      ]
    ],
    "comparison": [
      [
        "Path recovery",
        "Remaining eligible declared route after a failure",
        "This lab does not send FC or iSCSI traffic."
      ],
      [
        "Placement recovery",
        "Feasible assignment of workload records to survivors",
        "No VM is booted or migrated."
      ],
      [
        "File restore",
        "Actual replacement and hash verification of owned data",
        "Same-host fixture is not an independent backup system."
      ]
    ],
    "example": "Worked case: The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads. Fault: Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data. Diagnosis and recovery: Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup. Boundary check: How many storage paths exist at baseline in this topology? Twelve: three hosts times two fabrics times two controllers. These are declared routes, not discovered hardware paths.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+; offline topology model and owned file restore exercise",
        "code": "python labs/storage-virtualization.py --run",
        "explanation": "Run from the course root with Python available. The command reads authored local lesson records and labels expected observations; it does not contact an array, hypervisor or fabric. The integrated lab separately uses owned temporary files.",
        "expected": "A JSON record labelled with its scope. Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup. These incident statements are expected evidence, not real device output."
      }
    ],
    "configuration": "Begin with recorded identity and the owned baseline. Configuration objective: The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads. Consult the matching product/release source and draft the smallest object-level change; do not translate a conceptual label directly into a destructive shell command. The deliberate fault is: Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data. Before applying a real change, preserve the prior values and independent management access. Stop if the observed device or partial applied state differs from the plan. Rollback and retest: Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup.",
    "production": "Assign ownership at each dependency boundary. Restore exact plan bytes, verify file content against a retained SHA-256 and clean owned artifacts after normal and interrupted runs; actual VM failover remains a separate guided target exercise. Plan for the failed state as well as the healthy state, including surviving capacity, timeouts, identity changes and a separate restore path. Keep a baseline workload and record the exact operation size, concurrency and permitted outage. A vendor feature name alone does not certify interoperability, licensing or an application recovery objective.",
    "security": "Bind access to the intended identity and least required scope. This lab does not send FC or iSCSI traffic. Same-host fixture is not an independent backup system. Preserve an intentionally denied operation in the acceptance record. Restrict administrative exports and backup access; do not include credentials or real customer data in a lab. Availability repairs must retain isolation and recoverability.",
    "performance": "Measure the layer that can explain the symptom. Evaluate baseline, one-fabric loss, host loss, all-path loss, missing mapping and network loss separately; place six 30 GiB workload records on eligible hosts with 112 GiB usable each. Compare comparable workload intervals and both average and tail latency. Queue depth, cache behavior, protocol overhead and shared resources can invalidate conclusions from capacity or link speed alone. The included calculation has a narrower boundary: Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
    "troubleshooting": [
      [
        "Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data.",
        "Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup."
      ],
      [
        "Can six 30 GiB records fit across two 112 GiB hosts?",
        "Yes; three per host use 90 GiB each. This homogeneous memory-only example is narrower than real placement."
      ],
      [
        "Which lab result is actual file execution rather than topology simulation?",
        "Writing, detecting changed bytes, restoring retained bytes and checking SHA-256 inside an owned temporary directory. It does not establish array durability or VM HA."
      ],
      [
        "Status appears healthy but the requested operation fails",
        "Return to the named operation, identity and timestamp; find the first boundary whose actual result differs from the expected result. Do not repeatedly rescan, restart or broaden permissions without a hypothesis."
      ]
    ],
    "mistakes": [
      "These are declared routes, not discovered hardware paths.",
      "Each failure removes a different dependency.",
      "This homogeneous memory-only example is narrower than real placement.",
      "Compute availability cannot replace the missing dependency.",
      "It does not establish array durability or VM HA.",
      "An interrupted run is not a normal successful exercise."
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "prerequisites": [
      "s8-g6-t4"
    ],
    "related": [
      "s9-g0-t0"
    ],
    "lab": {
      "objective": "Explain and verify the recovery boundary for Storage & Virtualization Lab. The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.",
      "requirements": "Python 3.10+ standard library and permission to create a temporary directory for the executable offline path. Browser and notebook for the design. Actual vendor extension requires an exclusively owned compatible lab, independent management, tested backup and an explicit platform procedure; it is not executed here.",
      "topology": [
        "h1 / h2 / h3: HBA A → SAN switch A → array controllers cA and cB",
        "h1 / h2 / h3: HBA B → SAN switch B → array controllers cA and cB",
        "Guest network: each host → nA and nB → intended client service",
        "Shared array volume → same stable device identity → six VM disk records",
        "Separate recovery design: retained data + host/platform configuration + independently tested restore target"
      ],
      "steps": [
        "Draw the original design: two independent SAN switches, three virtualization hosts, redundant guest-network switches and one dual-controller shared array. Label shared power, chassis, software and administrative dependencies that this logical model cannot prove independent.",
        "Record twelve planned paths: each of h1/h2/h3 reaches cA and cB through both Fabric A and Fabric B. Record one intended stable volume identity and restrict mapping to the three hosts; an excluded fourth host has no access.",
        "Set the planning workload to six 30 GiB VM records. Each 128 GiB host reserves 16 GiB, leaving 112 GiB in this memory-only plan. Explain why two survivors can each hold three records while one 120 GiB record cannot fit on any host.",
        "Run python labs/storage-virtualization.py to inspect help, then python labs/storage-virtualization.py --run. The script opens no device and creates no VM. Retain the JSON evidence with its simulation/actual labels.",
        "Compare baseline twelve paths, Fabric A loss six paths and subsequent h1 loss four paths. Inspect the declared placement after each phase. Contrast the both-fabric, missing-map and guest-network failure states.",
        "Read the corruption event separately: the script changes bytes in an owned temporary file, detects the different SHA-256 and restores retained bytes. This actual local operation is not a storage-array power-loss test or an independent physical backup.",
        "Confirm planRestored, dataRestored and cleaned are true. Run python labs/storage-virtualization.py --run --inject-failure host-fault; expect INTERRUPTED and exit code 2 with the same restoration/cleanup evidence. Repeat other documented phases only within this owned fixture.",
        "For a real disposable platform extension, establish an independent management session and verified restore point. Capture host/array/fabric identities and mappings first. Isolate one owned path domain, measure original I/O and integrity, restore it, then perform a separately approved host-loss/restart exercise. Record restart, guest boot and application recovery separately. Do not disable production fabrics using this offline example.",
        "Submit the topology, per-host paths, identity/mapping sheet, one-failure capacity and individual-fit calculations, baseline/fault/recovery table, integrity evidence and cleanup record. Mark real FC, VM migration, HA restart, failure timing and application recovery as not executed unless independently observed on the optional target."
      ],
      "verification": "The normal JSON reports PASS, twelve baseline paths, six after Fabric A loss, four after h1 loss, blocked placement on both-fabric loss, actual corruption detection and planRestored/dataRestored/cleaned true. Injected runs report INTERRUPTED with exit code 2 and restored/cleaned true. No VM boot, live SAN I/O or real HA timing is claimed.",
      "troubleshooting": "Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data. No eligible host can reach the shared storage.",
      "challenge": "What must every interrupted run report? Extend the design with one shared failure domain and state how you would test it.",
      "cleanup": "Reset worksheet inputs and retain your evidence notes. The inspector performs no writes. The integrated offline lab removes only its own temporary directory, including on injected interruption. Restore any optional target only to its captured owned baseline; never format or delete an unknown volume.",
      "topologyKind": "shared"
    },
    "glossary": {
      "Path recovery": "Remaining eligible declared route after a failure. This lab does not send FC or iSCSI traffic.",
      "Placement recovery": "Feasible assignment of workload records to survivors. No VM is booted or migrated.",
      "File restore": "Actual replacement and hash verification of owned data. Same-host fixture is not an independent backup system."
    },
    "sources": [
      {
        "title": "RHEL 9 Device Mapper Multipath",
        "url": "https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html-single/configuring_device_mapper_multipath/index",
        "checked": "2026-10-09"
      },
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
        "questionId": "lab-8-QC1",
        "topicId": "lab-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be identified before investigating this Storage & Virtualization Lab case?",
        "answer": "The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.",
        "explanation": "Name the intended operation and its owner before interpreting a status flag.",
        "testedConcept": "Path recovery"
      },
      {
        "questionId": "lab-8-QC2",
        "topicId": "lab-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Trace the second mechanism step for Storage & Virtualization Lab.",
        "answer": "Evaluate baseline, one-fabric loss, host loss, all-path loss, missing mapping and network loss separately; place six 30 GiB workload records on eligible hosts with 112 GiB usable each.",
        "explanation": "No VM is booted or migrated.",
        "testedConcept": "Placement recovery"
      },
      {
        "questionId": "lab-8-QC3",
        "topicId": "lab-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which limitation of File restore matters here?",
        "answer": "Same-host fixture is not an independent backup system.",
        "explanation": "Restore exact plan bytes, verify file content against a retained SHA-256 and clean owned artifacts after normal and interrupted runs; actual VM failover remains a separate guided target exercise.",
        "testedConcept": "File restore"
      }
    ],
    "exams": [
      {
        "questionId": "lab-8-Q1",
        "topicId": "lab-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many storage paths exist at baseline in this topology?",
        "answer": "Twelve: three hosts times two fabrics times two controllers.",
        "explanation": "These are declared routes, not discovered hardware paths.",
        "testedConcept": "Path recovery"
      },
      {
        "questionId": "lab-8-Q2",
        "topicId": "lab-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many paths survive Fabric A loss followed by h1 loss?",
        "answer": "Four: two hosts times one fabric times two controllers.",
        "explanation": "Each failure removes a different dependency.",
        "testedConcept": "Placement recovery"
      },
      {
        "questionId": "lab-8-Q3",
        "topicId": "lab-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can six 30 GiB records fit across two 112 GiB hosts?",
        "answer": "Yes; three per host use 90 GiB each.",
        "explanation": "This homogeneous memory-only example is narrower than real placement.",
        "testedConcept": "File restore"
      },
      {
        "questionId": "lab-8-Q4",
        "topicId": "lab-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why does both-fabric loss defeat workload restart in the model?",
        "answer": "No eligible host can reach the shared storage.",
        "explanation": "Compute availability cannot replace the missing dependency.",
        "testedConcept": "Path recovery"
      },
      {
        "questionId": "lab-8-Q5",
        "topicId": "lab-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which lab result is actual file execution rather than topology simulation?",
        "answer": "Writing, detecting changed bytes, restoring retained bytes and checking SHA-256 inside an owned temporary directory.",
        "explanation": "It does not establish array durability or VM HA.",
        "testedConcept": "Placement recovery"
      },
      {
        "questionId": "lab-8-Q6",
        "topicId": "lab-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What must every interrupted run report?",
        "answer": "Its interruption, byte-identical plan/data restoration and owned-directory cleanup.",
        "explanation": "An interrupted run is not a normal successful exercise.",
        "testedConcept": "File restore"
      },
      {
        "questionId": "lab-8-Q7",
        "topicId": "lab-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Storage & Virtualization Lab incident, which assumption failed?",
        "answer": "Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data.",
        "explanation": "Tie the diagnosis to the stated observation; a plausible theory is not a captured target fact.",
        "testedConcept": "Incident cause"
      },
      {
        "questionId": "lab-8-Q8",
        "topicId": "lab-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence would close the Storage & Virtualization Lab incident?",
        "answer": "Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup.",
        "explanation": "The original operation and its protection boundary must both survive the repair.",
        "testedConcept": "Recovery acceptance"
      },
      {
        "questionId": "lab-8-Q9",
        "topicId": "lab-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Path recovery and Placement recovery.",
        "answer": "Remaining eligible declared route after a failure. Feasible assignment of workload records to survivors.",
        "explanation": "This lab does not send FC or iSCSI traffic. No VM is booted or migrated.",
        "testedConcept": "Terminology"
      },
      {
        "questionId": "lab-8-Q10",
        "topicId": "lab-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this Storage & Virtualization Lab worksheet leave unverified?",
        "answer": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction.",
        "explanation": "Keep declared input, calculated consequence and actual runtime evidence separate.",
        "testedConcept": "Model limits"
      }
    ],
    "storageVirtualization": {
      "kind": "capacity",
      "baseline": "The baseline has twelve declared storage paths and six 30 GiB workloads. Losing Fabric A leaves six paths; losing h1 afterward leaves four paths and two hosts that can each fit three workloads.",
      "fault": "Both fabrics fail while hosts remain alive; restarting workload records cannot recreate the absent storage path. A separate byte-corruption exercise also shows that redundant paths do not repair bad data.",
      "restore": "Restore the exact failed fabric flags and baseline plan bytes, validate all twelve paths and workload assignments, then restore the intentionally corrupted owned file and compare its content hash before cleanup.",
      "scope": "Three homogeneous hosts, integer GiB capacity and aggregate demand with explicit reserve per surviving host. This is a necessary capacity envelope, not a placement solver, vSphere admission-control implementation or performance prediction."
    },
    "artifacts": [
      {
        "title": "Batch 21 evidence workbook",
        "path": "labs/storage-virtualization-21-workbook.md"
      },
      {
        "title": "Offline incident inspector",
        "path": "labs/storage-evidence.py"
      },
      {
        "title": "Offline topology and file recovery lab",
        "path": "labs/storage-virtualization.py"
      }
    ]
  }
];
