window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["24"] = [
  {
    "id": "s9-g6-t0",
    "batch": "24",
    "title": "High Availability",
    "subtitle": "Two service nodes each support 100 requests/s and normal demand is 140.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t0",
    "definition": "High availability keeps a service usable through specified component failures using redundancy, detection and controlled failover; shared dependencies bound its protection.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two service nodes each support 100 requests/s and normal demand is 140. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Failure domain, Detection, Failover. Define the protected service and failure set. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Two instances can share one domain. False positives can trigger disruption. Capacity and state must be available. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Failure domain: Components lost together. Two instances can share one domain.",
      "Detection: Decision that a component is unhealthy. False positives can trigger disruption.",
      "Failover: Move work to a survivor. Capacity and state must be available."
    ],
    "mechanism": [
      "Define the protected service and failure set.",
      "Provide independent required dependencies and surviving capacity.",
      "Inject one bounded failure and measure client-visible recovery and integrity."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two service nodes each support 100 requests/s and normal demand is 140."
      ],
      [
        "Failure domain",
        "Define the protected service and failure set."
      ],
      [
        "Detection",
        "Provide independent required dependencies and surviving capacity."
      ],
      [
        "Failover",
        "Inject one bounded failure and measure client-visible recovery and integrity."
      ]
    ],
    "comparison": [
      [
        "Failure domain",
        "Components lost together",
        "Two instances can share one domain"
      ],
      [
        "Detection",
        "Decision that a component is unhealthy",
        "False positives can trigger disruption"
      ],
      [
        "Failover",
        "Move work to a survivor",
        "Capacity and state must be available"
      ]
    ],
    "example": "Worked incident: Two service nodes each support 100 requests/s and normal demand is 140. Failure: One node fails and the survivor is overloaded despite redundancy. Recovery: Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault. The key distinction is illustrated by this question: Does two nodes imply N+1 capacity? No; the survivor must carry required demand. Count usable capacity after failure. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define the protected service and failure set. Provide independent required dependencies and surviving capacity. Preserve a baseline and review the smallest concrete diff. In this case the failure is: One node fails and the survivor is overloaded despite redundancy. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Inject one bounded failure and measure client-visible recovery and integrity. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Two instances can share one domain. Capacity and state must be available. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Provide independent required dependencies and surviving capacity. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
    "troubleshooting": [
      [
        "One node fails and the survivor is overloaded despite redundancy.",
        "Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault."
      ],
      [
        "Can HA replace backups?",
        "No. Replicated corruption can affect both nodes."
      ],
      [
        "Why use client-visible checks?",
        "A process can be running while the service is unusable. Measure the real operation."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Count usable capacity after failure.",
      "Replicated corruption can affect both nodes.",
      "Measure the real operation.",
      "List the common dependencies.",
      "Two instances can share one domain.",
      "Capacity and state must be available."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g5-t6"
    ],
    "related": [
      "s9-g6-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated High Availability failure with an explicit evidence boundary. Two service nodes each support 100 requests/s and normal demand is 140.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Failure domain → Components lost together",
        "Detection → Decision that a component is unhealthy",
        "Failover → Move work to a survivor"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two service nodes each support 100 requests/s and normal demand is 140.",
        "Write a prediction before revealing the baseline explanation. Define the protected service and failure set.",
        "Select Fault and locate the first broken handoff. One node fails and the survivor is overloaded despite redundancy.",
        "Propose one observation that could disprove your diagnosis. Can HA replace backups?",
        "Select Recovery and compare with the required result. Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "One node fails and the survivor is overloaded despite redundancy. Shared power, storage, network, credentials or software faults.",
      "challenge": "What weakens independent failure assumptions? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Failure domain": "Components lost together. Two instances can share one domain.",
      "Detection": "Decision that a component is unhealthy. False positives can trigger disruption.",
      "Failover": "Move work to a survivor. Capacity and state must be available."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t0-QC1",
        "topicId": "s9-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of High Availability.",
        "answer": "High availability keeps a service usable through specified component failures using redundancy, detection and controlled failover; shared dependencies bound its protection.",
        "explanation": "Define the protected service and failure set.",
        "testedConcept": "Failure domain"
      },
      {
        "questionId": "s9-g6-t0-QC2",
        "topicId": "s9-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Provide independent required dependencies and surviving capacity.",
        "explanation": "False positives can trigger disruption.",
        "testedConcept": "Detection"
      },
      {
        "questionId": "s9-g6-t0-QC3",
        "topicId": "s9-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault.",
        "explanation": "Inject one bounded failure and measure client-visible recovery and integrity.",
        "testedConcept": "Failover"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t0-Q1",
        "topicId": "s9-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does two nodes imply N+1 capacity?",
        "answer": "No; the survivor must carry required demand.",
        "explanation": "Count usable capacity after failure.",
        "testedConcept": "Failure domain"
      },
      {
        "questionId": "s9-g6-t0-Q2",
        "topicId": "s9-g6-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can HA replace backups?",
        "answer": "No.",
        "explanation": "Replicated corruption can affect both nodes.",
        "testedConcept": "Detection"
      },
      {
        "questionId": "s9-g6-t0-Q3",
        "topicId": "s9-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why use client-visible checks?",
        "answer": "A process can be running while the service is unusable.",
        "explanation": "Measure the real operation.",
        "testedConcept": "Failover"
      },
      {
        "questionId": "s9-g6-t0-Q4",
        "topicId": "s9-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What weakens independent failure assumptions?",
        "answer": "Shared power, storage, network, credentials or software faults.",
        "explanation": "List the common dependencies.",
        "testedConcept": "Failure domain"
      },
      {
        "questionId": "s9-g6-t0-Q5",
        "topicId": "s9-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this High Availability case.",
        "answer": "One node fails and the survivor is overloaded despite redundancy.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t0-Q6",
        "topicId": "s9-g6-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the High Availability incident?",
        "answer": "Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t0-Q7",
        "topicId": "s9-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Failure domain with Detection.",
        "answer": "Components lost together. Decision that a component is unhealthy.",
        "explanation": "Two instances can share one domain. False positives can trigger disruption.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t0-Q8",
        "topicId": "s9-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Failover not establish the entire outcome?",
        "answer": "Capacity and state must be available.",
        "explanation": "Inject one bounded failure and measure client-visible recovery and integrity.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t0-Q9",
        "topicId": "s9-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two service nodes each support 100 requests/s and normal demand is 140. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t0-Q10",
        "topicId": "s9-g6-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion capacity model leave unverified?",
        "answer": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "capacity",
      "baseline": "Two service nodes each support 100 requests/s and normal demand is 140.",
      "fault": "One node fails and the survivor is overloaded despite redundancy.",
      "restore": "Add capacity or reduce demand so the specified failure is supportable; measure service health after the fault.",
      "scope": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t1",
    "batch": "24",
    "title": "Disaster Recovery",
    "subtitle": "Database backups exist but encryption keys are absent at the recovery site.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t1",
    "definition": "Disaster recovery restores an accepted service state after a major disruption using protected data, configuration, dependencies and a tested recovery procedure.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Database backups exist but encryption keys are absent at the recovery site. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Recovery point, Recovery sequence, Exercise. Define loss and outage objectives for the service. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A recent copy may be inconsistent. Applications can depend on identity and DNS. A written plan is not recovery evidence. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Recovery point: Usable retained state. A recent copy may be inconsistent.",
      "Recovery sequence: Ordered dependency restoration. Applications can depend on identity and DNS.",
      "Exercise: Observed restoration test. A written plan is not recovery evidence."
    ],
    "mechanism": [
      "Define loss and outage objectives for the service.",
      "Retain recoverable data and the configuration needed to use it.",
      "Restore into an isolated target and verify application consistency and access before cutover."
    ],
    "flow": [
      [
        "Operation and scope",
        "Database backups exist but encryption keys are absent at the recovery site."
      ],
      [
        "Recovery point",
        "Define loss and outage objectives for the service."
      ],
      [
        "Recovery sequence",
        "Retain recoverable data and the configuration needed to use it."
      ],
      [
        "Exercise",
        "Restore into an isolated target and verify application consistency and access before cutover."
      ]
    ],
    "comparison": [
      [
        "Recovery point",
        "Usable retained state",
        "A recent copy may be inconsistent"
      ],
      [
        "Recovery sequence",
        "Ordered dependency restoration",
        "Applications can depend on identity and DNS"
      ],
      [
        "Exercise",
        "Observed restoration test",
        "A written plan is not recovery evidence"
      ]
    ],
    "example": "Worked incident: Database backups exist but encryption keys are absent at the recovery site. Failure: Restore cannot produce usable application data. Recovery: Include protected key recovery and dependency ownership, then repeat an isolated full service restore. The key distinction is illustrated by this question: Is a backup job success enough? No; restore and application validation are required. Unreadable or incomplete copies can still exist. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define loss and outage objectives for the service. Retain recoverable data and the configuration needed to use it. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Restore cannot produce usable application data. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Include protected key recovery and dependency ownership, then repeat an isolated full service restore.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Restore into an isolated target and verify application consistency and access before cutover. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A recent copy may be inconsistent. A written plan is not recovery evidence. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Retain recoverable data and the configuration needed to use it. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
    "troubleshooting": [
      [
        "Restore cannot produce usable application data.",
        "Include protected key recovery and dependency ownership, then repeat an isolated full service restore."
      ],
      [
        "Why isolate a recovery exercise?",
        "To prevent duplicate identities or writes affecting production. Recovery targets need controlled connectivity."
      ],
      [
        "What belongs beyond application data?",
        "Configuration, keys, identity, DNS and operational procedures. Dependencies determine usability."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Unreadable or incomplete copies can still exist.",
      "Recovery targets need controlled connectivity.",
      "Dependencies determine usability.",
      "A report without remediation leaves the gap.",
      "A recent copy may be inconsistent.",
      "A written plan is not recovery evidence."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t0"
    ],
    "related": [
      "s9-g6-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Disaster Recovery failure with an explicit evidence boundary. Database backups exist but encryption keys are absent at the recovery site.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Recovery point → Usable retained state",
        "Recovery sequence → Ordered dependency restoration",
        "Exercise → Observed restoration test"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Database backups exist but encryption keys are absent at the recovery site.",
        "Write a prediction before revealing the baseline explanation. Define loss and outage objectives for the service.",
        "Select Fault and locate the first broken handoff. Restore cannot produce usable application data.",
        "Propose one observation that could disprove your diagnosis. Why isolate a recovery exercise?",
        "Select Recovery and compare with the required result. Include protected key recovery and dependency ownership, then repeat an isolated full service restore.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Include protected key recovery and dependency ownership, then repeat an isolated full service restore. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Restore cannot produce usable application data. The plan, retention or architecture and a repeated test.",
      "challenge": "What should a failed exercise change? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Recovery point": "Usable retained state. A recent copy may be inconsistent.",
      "Recovery sequence": "Ordered dependency restoration. Applications can depend on identity and DNS.",
      "Exercise": "Observed restoration test. A written plan is not recovery evidence."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t1-QC1",
        "topicId": "s9-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Disaster Recovery.",
        "answer": "Disaster recovery restores an accepted service state after a major disruption using protected data, configuration, dependencies and a tested recovery procedure.",
        "explanation": "Define loss and outage objectives for the service.",
        "testedConcept": "Recovery point"
      },
      {
        "questionId": "s9-g6-t1-QC2",
        "topicId": "s9-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Retain recoverable data and the configuration needed to use it.",
        "explanation": "Applications can depend on identity and DNS.",
        "testedConcept": "Recovery sequence"
      },
      {
        "questionId": "s9-g6-t1-QC3",
        "topicId": "s9-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Include protected key recovery and dependency ownership, then repeat an isolated full service restore.",
        "explanation": "Restore into an isolated target and verify application consistency and access before cutover.",
        "testedConcept": "Exercise"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t1-Q1",
        "topicId": "s9-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is a backup job success enough?",
        "answer": "No; restore and application validation are required.",
        "explanation": "Unreadable or incomplete copies can still exist.",
        "testedConcept": "Recovery point"
      },
      {
        "questionId": "s9-g6-t1-Q2",
        "topicId": "s9-g6-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why isolate a recovery exercise?",
        "answer": "To prevent duplicate identities or writes affecting production.",
        "explanation": "Recovery targets need controlled connectivity.",
        "testedConcept": "Recovery sequence"
      },
      {
        "questionId": "s9-g6-t1-Q3",
        "topicId": "s9-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What belongs beyond application data?",
        "answer": "Configuration, keys, identity, DNS and operational procedures.",
        "explanation": "Dependencies determine usability.",
        "testedConcept": "Exercise"
      },
      {
        "questionId": "s9-g6-t1-Q4",
        "topicId": "s9-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a failed exercise change?",
        "answer": "The plan, retention or architecture and a repeated test.",
        "explanation": "A report without remediation leaves the gap.",
        "testedConcept": "Recovery point"
      },
      {
        "questionId": "s9-g6-t1-Q5",
        "topicId": "s9-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Disaster Recovery case.",
        "answer": "Restore cannot produce usable application data.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t1-Q6",
        "topicId": "s9-g6-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Disaster Recovery incident?",
        "answer": "Include protected key recovery and dependency ownership, then repeat an isolated full service restore.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t1-Q7",
        "topicId": "s9-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Recovery point with Recovery sequence.",
        "answer": "Usable retained state. Ordered dependency restoration.",
        "explanation": "A recent copy may be inconsistent. Applications can depend on identity and DNS.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t1-Q8",
        "topicId": "s9-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Exercise not establish the entire outcome?",
        "answer": "A written plan is not recovery evidence.",
        "explanation": "Restore into an isolated target and verify application consistency and access before cutover.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t1-Q9",
        "topicId": "s9-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Database backups exist but encryption keys are absent at the recovery site. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t1-Q10",
        "topicId": "s9-g6-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion recovery model leave unverified?",
        "answer": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "recovery",
      "baseline": "Database backups exist but encryption keys are absent at the recovery site.",
      "fault": "Restore cannot produce usable application data.",
      "restore": "Include protected key recovery and dependency ownership, then repeat an isolated full service restore.",
      "scope": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t2",
    "batch": "24",
    "title": "Business Continuity",
    "subtitle": "A restored order system is inaccessible because staff cannot reach the site.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t2",
    "definition": "Business continuity sustains prioritized business activities through disruption, including people, facilities, suppliers and temporary manual workarounds.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A restored order system is inaccessible because staff cannot reach the site. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Business impact, Critical activity, Workaround. Identify activities, owners and tolerable disruption. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Technical uptime is only one input. Not every system has equal urgency. Needs staffing, limits and reconciliation. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Business impact: Consequence of interrupted activity. Technical uptime is only one input.",
      "Critical activity: Prioritized business function. Not every system has equal urgency.",
      "Workaround: Temporary operating method. Needs staffing, limits and reconciliation."
    ],
    "mechanism": [
      "Identify activities, owners and tolerable disruption.",
      "Map technical and nontechnical dependencies.",
      "Exercise the workaround and the return to normal, including data reconciliation."
    ],
    "flow": [
      [
        "Operation and scope",
        "A restored order system is inaccessible because staff cannot reach the site."
      ],
      [
        "Business impact",
        "Identify activities, owners and tolerable disruption."
      ],
      [
        "Critical activity",
        "Map technical and nontechnical dependencies."
      ],
      [
        "Workaround",
        "Exercise the workaround and the return to normal, including data reconciliation."
      ]
    ],
    "comparison": [
      [
        "Business impact",
        "Consequence of interrupted activity",
        "Technical uptime is only one input"
      ],
      [
        "Critical activity",
        "Prioritized business function",
        "Not every system has equal urgency"
      ],
      [
        "Workaround",
        "Temporary operating method",
        "Needs staffing, limits and reconciliation"
      ]
    ],
    "example": "Worked incident: A restored order system is inaccessible because staff cannot reach the site. Failure: Technical recovery is reported as full business recovery. Recovery: Validate staffed access, communications and the manual-order reconciliation path with the business owner. The key distinction is illustrated by this question: How differs continuity from DR? Continuity addresses sustained business activity; DR focuses on restoration of systems and services. Their scopes overlap but are not identical. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Identify activities, owners and tolerable disruption. Map technical and nontechnical dependencies. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Technical recovery is reported as full business recovery. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Validate staffed access, communications and the manual-order reconciliation path with the business owner.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Exercise the workaround and the return to normal, including data reconciliation. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Technical uptime is only one input. Needs staffing, limits and reconciliation. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Map technical and nontechnical dependencies. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
    "troubleshooting": [
      [
        "Technical recovery is reported as full business recovery.",
        "Validate staffed access, communications and the manual-order reconciliation path with the business owner."
      ],
      [
        "Who sets business priorities?",
        "Accountable business owners with technical input. Infrastructure staff cannot infer all impacts."
      ],
      [
        "Why test manual processes?",
        "They can fail through missing access or staffing. A form alone is not a workable process."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Their scopes overlap but are not identical.",
      "Infrastructure staff cannot infer all impacts.",
      "A form alone is not a workable process.",
      "Recovery is not complete at system boot.",
      "Technical uptime is only one input.",
      "Needs staffing, limits and reconciliation."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t1"
    ],
    "related": [
      "s9-g6-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Business Continuity failure with an explicit evidence boundary. A restored order system is inaccessible because staff cannot reach the site.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Business impact → Consequence of interrupted activity",
        "Critical activity → Prioritized business function",
        "Workaround → Temporary operating method"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A restored order system is inaccessible because staff cannot reach the site.",
        "Write a prediction before revealing the baseline explanation. Identify activities, owners and tolerable disruption.",
        "Select Fault and locate the first broken handoff. Technical recovery is reported as full business recovery.",
        "Propose one observation that could disprove your diagnosis. Who sets business priorities?",
        "Select Recovery and compare with the required result. Validate staffed access, communications and the manual-order reconciliation path with the business owner.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Validate staffed access, communications and the manual-order reconciliation path with the business owner. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Technical recovery is reported as full business recovery. Temporary records must be reconciled without duplicate or lost work.",
      "challenge": "Why plan the return to normal? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Business impact": "Consequence of interrupted activity. Technical uptime is only one input.",
      "Critical activity": "Prioritized business function. Not every system has equal urgency.",
      "Workaround": "Temporary operating method. Needs staffing, limits and reconciliation."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t2-QC1",
        "topicId": "s9-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Business Continuity.",
        "answer": "Business continuity sustains prioritized business activities through disruption, including people, facilities, suppliers and temporary manual workarounds.",
        "explanation": "Identify activities, owners and tolerable disruption.",
        "testedConcept": "Business impact"
      },
      {
        "questionId": "s9-g6-t2-QC2",
        "topicId": "s9-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Map technical and nontechnical dependencies.",
        "explanation": "Not every system has equal urgency.",
        "testedConcept": "Critical activity"
      },
      {
        "questionId": "s9-g6-t2-QC3",
        "topicId": "s9-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Validate staffed access, communications and the manual-order reconciliation path with the business owner.",
        "explanation": "Exercise the workaround and the return to normal, including data reconciliation.",
        "testedConcept": "Workaround"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t2-Q1",
        "topicId": "s9-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differs continuity from DR?",
        "answer": "Continuity addresses sustained business activity; DR focuses on restoration of systems and services.",
        "explanation": "Their scopes overlap but are not identical.",
        "testedConcept": "Business impact"
      },
      {
        "questionId": "s9-g6-t2-Q2",
        "topicId": "s9-g6-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Who sets business priorities?",
        "answer": "Accountable business owners with technical input.",
        "explanation": "Infrastructure staff cannot infer all impacts.",
        "testedConcept": "Critical activity"
      },
      {
        "questionId": "s9-g6-t2-Q3",
        "topicId": "s9-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test manual processes?",
        "answer": "They can fail through missing access or staffing.",
        "explanation": "A form alone is not a workable process.",
        "testedConcept": "Workaround"
      },
      {
        "questionId": "s9-g6-t2-Q4",
        "topicId": "s9-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why plan the return to normal?",
        "answer": "Temporary records must be reconciled without duplicate or lost work.",
        "explanation": "Recovery is not complete at system boot.",
        "testedConcept": "Business impact"
      },
      {
        "questionId": "s9-g6-t2-Q5",
        "topicId": "s9-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Business Continuity case.",
        "answer": "Technical recovery is reported as full business recovery.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t2-Q6",
        "topicId": "s9-g6-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Business Continuity incident?",
        "answer": "Validate staffed access, communications and the manual-order reconciliation path with the business owner.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t2-Q7",
        "topicId": "s9-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Business impact with Critical activity.",
        "answer": "Consequence of interrupted activity. Prioritized business function.",
        "explanation": "Technical uptime is only one input. Not every system has equal urgency.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t2-Q8",
        "topicId": "s9-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Workaround not establish the entire outcome?",
        "answer": "Needs staffing, limits and reconciliation.",
        "explanation": "Exercise the workaround and the return to normal, including data reconciliation.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t2-Q9",
        "topicId": "s9-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A restored order system is inaccessible because staff cannot reach the site. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t2-Q10",
        "topicId": "s9-g6-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion recovery model leave unverified?",
        "answer": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "recovery",
      "baseline": "A restored order system is inaccessible because staff cannot reach the site.",
      "fault": "Technical recovery is reported as full business recovery.",
      "restore": "Validate staffed access, communications and the manual-order reconciliation path with the business owner.",
      "scope": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t3",
    "batch": "24",
    "title": "RTO",
    "subtitle": "A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t3",
    "definition": "Recovery Time Objective is the target maximum interruption for a defined service and acceptance criterion; measured recovery time must include the agreed start and finish boundaries.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between RTO, Detection interval, Acceptance time. Define when the outage clock starts and the required service test. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A target is not a measured guarantee. May consume the outage budget. Boot completion may be earlier. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "RTO: Target restoration duration. A target is not a measured guarantee.",
      "Detection interval: Time before declaring failure. May consume the outage budget.",
      "Acceptance time: When required service works. Boot completion may be earlier."
    ],
    "mechanism": [
      "Define when the outage clock starts and the required service test.",
      "Budget detection, decision, restore and validation time.",
      "Measure an exercise end-to-end and compare with the objective."
    ],
    "flow": [
      [
        "Operation and scope",
        "A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation."
      ],
      [
        "RTO",
        "Define when the outage clock starts and the required service test."
      ],
      [
        "Detection interval",
        "Budget detection, decision, restore and validation time."
      ],
      [
        "Acceptance time",
        "Measure an exercise end-to-end and compare with the objective."
      ]
    ],
    "comparison": [
      [
        "RTO",
        "Target restoration duration",
        "A target is not a measured guarantee"
      ],
      [
        "Detection interval",
        "Time before declaring failure",
        "May consume the outage budget"
      ],
      [
        "Acceptance time",
        "When required service works",
        "Boot completion may be earlier"
      ]
    ],
    "example": "Worked incident: A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation. Failure: Only the 30-minute restore is reported against the objective. Recovery: Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest. The key distinction is illustrated by this question: Is RTO the same as restore-tool runtime? No. It covers the agreed service interruption boundary. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define when the outage clock starts and the required service test. Budget detection, decision, restore and validation time. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Only the 30-minute restore is reported against the objective. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Measure an exercise end-to-end and compare with the objective. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A target is not a measured guarantee. Boot completion may be earlier. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Budget detection, decision, restore and validation time. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
    "troubleshooting": [
      [
        "Only the 30-minute restore is reported against the objective.",
        "Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest."
      ],
      [
        "What is the serial total in this example?",
        "70 minutes. Do not omit detection or acceptance."
      ],
      [
        "Can parallel work simply be summed?",
        "No; use the dependency critical path. The companion model deliberately assumes serial phases."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "It covers the agreed service interruption boundary.",
      "Do not omit detection or acceptance.",
      "The companion model deliberately assumes serial phases.",
      "One exercise is evidence, not a universal guarantee.",
      "A target is not a measured guarantee.",
      "Boot completion may be earlier."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t2"
    ],
    "related": [
      "s9-g6-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated RTO failure with an explicit evidence boundary. A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "RTO → Target restoration duration",
        "Detection interval → Time before declaring failure",
        "Acceptance time → When required service works"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation.",
        "Write a prediction before revealing the baseline explanation. Define when the outage clock starts and the required service test.",
        "Select Fault and locate the first broken handoff. Only the 30-minute restore is reported against the objective.",
        "Propose one observation that could disprove your diagnosis. What is the serial total in this example?",
        "Select Recovery and compare with the required result. Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Only the 30-minute restore is reported against the objective. A measured representative recovery that meets the defined acceptance scope.",
      "challenge": "What establishes compliance with the target? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "RTO": "Target restoration duration. A target is not a measured guarantee.",
      "Detection interval": "Time before declaring failure. May consume the outage budget.",
      "Acceptance time": "When required service works. Boot completion may be earlier."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t3-QC1",
        "topicId": "s9-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of RTO.",
        "answer": "Recovery Time Objective is the target maximum interruption for a defined service and acceptance criterion; measured recovery time must include the agreed start and finish boundaries.",
        "explanation": "Define when the outage clock starts and the required service test.",
        "testedConcept": "RTO"
      },
      {
        "questionId": "s9-g6-t3-QC2",
        "topicId": "s9-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Budget detection, decision, restore and validation time.",
        "explanation": "May consume the outage budget.",
        "testedConcept": "Detection interval"
      },
      {
        "questionId": "s9-g6-t3-QC3",
        "topicId": "s9-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest.",
        "explanation": "Measure an exercise end-to-end and compare with the objective.",
        "testedConcept": "Acceptance time"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t3-Q1",
        "topicId": "s9-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is RTO the same as restore-tool runtime?",
        "answer": "No.",
        "explanation": "It covers the agreed service interruption boundary.",
        "testedConcept": "RTO"
      },
      {
        "questionId": "s9-g6-t3-Q2",
        "topicId": "s9-g6-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the serial total in this example?",
        "answer": "70 minutes.",
        "explanation": "Do not omit detection or acceptance.",
        "testedConcept": "Detection interval"
      },
      {
        "questionId": "s9-g6-t3-Q3",
        "topicId": "s9-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can parallel work simply be summed?",
        "answer": "No; use the dependency critical path.",
        "explanation": "The companion model deliberately assumes serial phases.",
        "testedConcept": "Acceptance time"
      },
      {
        "questionId": "s9-g6-t3-Q4",
        "topicId": "s9-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What establishes compliance with the target?",
        "answer": "A measured representative recovery that meets the defined acceptance scope.",
        "explanation": "One exercise is evidence, not a universal guarantee.",
        "testedConcept": "RTO"
      },
      {
        "questionId": "s9-g6-t3-Q5",
        "topicId": "s9-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this RTO case.",
        "answer": "Only the 30-minute restore is reported against the objective.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t3-Q6",
        "topicId": "s9-g6-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the RTO incident?",
        "answer": "Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t3-Q7",
        "topicId": "s9-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast RTO with Detection interval.",
        "answer": "Target restoration duration. Time before declaring failure.",
        "explanation": "A target is not a measured guarantee. May consume the outage budget.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t3-Q8",
        "topicId": "s9-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Acceptance time not establish the entire outcome?",
        "answer": "Boot completion may be earlier.",
        "explanation": "Measure an exercise end-to-end and compare with the objective.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t3-Q9",
        "topicId": "s9-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t3-Q10",
        "topicId": "s9-g6-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion recovery model leave unverified?",
        "answer": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "recovery",
      "baseline": "A 60-minute RTO has 10 minutes detection, 10 decision, 30 restore and 20 validation.",
      "fault": "Only the 30-minute restore is reported against the objective.",
      "restore": "Count the agreed 70-minute interruption and report a 10-minute gap; reduce the critical path and retest.",
      "scope": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t4",
    "batch": "24",
    "title": "RPO",
    "subtitle": "Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t4",
    "definition": "Recovery Point Objective is the target tolerance for loss of recent data, measured relative to an accepted recoverable point and the incident reference time.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between RPO, Recovery point age, Consistency. Define which transactions and reference time matter. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Not a promise that every copy is usable. Schedule alone may understate it. Newest bytes can still be inconsistent. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "RPO: Target data-loss interval. Not a promise that every copy is usable.",
      "Recovery point age: Time between incident and recoverable state. Schedule alone may understate it.",
      "Consistency: Usable related data state. Newest bytes can still be inconsistent."
    ],
    "mechanism": [
      "Define which transactions and reference time matter.",
      "Verify the most recent consistent recoverable point.",
      "Measure its age and reconcile missing acknowledged work."
    ],
    "flow": [
      [
        "Operation and scope",
        "Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old."
      ],
      [
        "RPO",
        "Define which transactions and reference time matter."
      ],
      [
        "Recovery point age",
        "Verify the most recent consistent recoverable point."
      ],
      [
        "Consistency",
        "Measure its age and reconcile missing acknowledged work."
      ]
    ],
    "comparison": [
      [
        "RPO",
        "Target data-loss interval",
        "Not a promise that every copy is usable"
      ],
      [
        "Recovery point age",
        "Time between incident and recoverable state",
        "Schedule alone may understate it"
      ],
      [
        "Consistency",
        "Usable related data state",
        "Newest bytes can still be inconsistent"
      ]
    ],
    "example": "Worked incident: Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old. Failure: The team reports a 15-minute RPO as achieved from the schedule alone. Recovery: Use the actual usable point age, report the 25-minute gap and repair the failed protection process. The key distinction is illustrated by this question: Does a 15-minute schedule guarantee 15-minute loss? No. Failures and copy lag can age the usable point. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define which transactions and reference time matter. Verify the most recent consistent recoverable point. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The team reports a 15-minute RPO as achieved from the schedule alone. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use the actual usable point age, report the 25-minute gap and repair the failed protection process.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Measure its age and reconcile missing acknowledged work. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Not a promise that every copy is usable. Newest bytes can still be inconsistent. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Verify the most recent consistent recoverable point. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
    "troubleshooting": [
      [
        "The team reports a 15-minute RPO as achieved from the schedule alone.",
        "Use the actual usable point age, report the 25-minute gap and repair the failed protection process."
      ],
      [
        "How differs RPO from RTO?",
        "RPO limits data-loss age; RTO targets restoration duration. Units may match but meanings differ."
      ],
      [
        "Is the newest replica always recoverable?",
        "No. Logical corruption can replicate too."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Failures and copy lag can age the usable point.",
      "Units may match but meanings differ.",
      "Logical corruption can replicate too.",
      "A filesystem timestamp alone may not express business loss.",
      "Not a promise that every copy is usable.",
      "Newest bytes can still be inconsistent."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t3"
    ],
    "related": [
      "s9-g6-t5"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated RPO failure with an explicit evidence boundary. Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "RPO → Target data-loss interval",
        "Recovery point age → Time between incident and recoverable state",
        "Consistency → Usable related data state"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old.",
        "Write a prediction before revealing the baseline explanation. Define which transactions and reference time matter.",
        "Select Fault and locate the first broken handoff. The team reports a 15-minute RPO as achieved from the schedule alone.",
        "Propose one observation that could disprove your diagnosis. How differs RPO from RTO?",
        "Select Recovery and compare with the required result. Use the actual usable point age, report the 25-minute gap and repair the failed protection process.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use the actual usable point age, report the 25-minute gap and repair the failed protection process. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The team reports a 15-minute RPO as achieved from the schedule alone. Acknowledged transactions after the recovered point.",
      "challenge": "What data matters for reconciliation? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "RPO": "Target data-loss interval. Not a promise that every copy is usable.",
      "Recovery point age": "Time between incident and recoverable state. Schedule alone may understate it.",
      "Consistency": "Usable related data state. Newest bytes can still be inconsistent."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t4-QC1",
        "topicId": "s9-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of RPO.",
        "answer": "Recovery Point Objective is the target tolerance for loss of recent data, measured relative to an accepted recoverable point and the incident reference time.",
        "explanation": "Define which transactions and reference time matter.",
        "testedConcept": "RPO"
      },
      {
        "questionId": "s9-g6-t4-QC2",
        "topicId": "s9-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Verify the most recent consistent recoverable point.",
        "explanation": "Schedule alone may understate it.",
        "testedConcept": "Recovery point age"
      },
      {
        "questionId": "s9-g6-t4-QC3",
        "topicId": "s9-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use the actual usable point age, report the 25-minute gap and repair the failed protection process.",
        "explanation": "Measure its age and reconcile missing acknowledged work.",
        "testedConcept": "Consistency"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t4-Q1",
        "topicId": "s9-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a 15-minute schedule guarantee 15-minute loss?",
        "answer": "No.",
        "explanation": "Failures and copy lag can age the usable point.",
        "testedConcept": "RPO"
      },
      {
        "questionId": "s9-g6-t4-Q2",
        "topicId": "s9-g6-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differs RPO from RTO?",
        "answer": "RPO limits data-loss age; RTO targets restoration duration.",
        "explanation": "Units may match but meanings differ.",
        "testedConcept": "Recovery point age"
      },
      {
        "questionId": "s9-g6-t4-Q3",
        "topicId": "s9-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is the newest replica always recoverable?",
        "answer": "No.",
        "explanation": "Logical corruption can replicate too.",
        "testedConcept": "Consistency"
      },
      {
        "questionId": "s9-g6-t4-Q4",
        "topicId": "s9-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What data matters for reconciliation?",
        "answer": "Acknowledged transactions after the recovered point.",
        "explanation": "A filesystem timestamp alone may not express business loss.",
        "testedConcept": "RPO"
      },
      {
        "questionId": "s9-g6-t4-Q5",
        "topicId": "s9-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this RPO case.",
        "answer": "The team reports a 15-minute RPO as achieved from the schedule alone.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t4-Q6",
        "topicId": "s9-g6-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the RPO incident?",
        "answer": "Use the actual usable point age, report the 25-minute gap and repair the failed protection process.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t4-Q7",
        "topicId": "s9-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast RPO with Recovery point age.",
        "answer": "Target data-loss interval. Time between incident and recoverable state.",
        "explanation": "Not a promise that every copy is usable. Schedule alone may understate it.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t4-Q8",
        "topicId": "s9-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Consistency not establish the entire outcome?",
        "answer": "Newest bytes can still be inconsistent.",
        "explanation": "Measure its age and reconcile missing acknowledged work.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t4-Q9",
        "topicId": "s9-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t4-Q10",
        "topicId": "s9-g6-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion recovery model leave unverified?",
        "answer": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "recovery",
      "baseline": "Backups are scheduled every 15 minutes but the latest successful recoverable point is 40 minutes old.",
      "fault": "The team reports a 15-minute RPO as achieved from the schedule alone.",
      "restore": "Use the actual usable point age, report the 25-minute gap and repair the failed protection process.",
      "scope": "Serial recovery budget: detection plus decision plus restoration plus validation compared with RTO, and supplied recoverable-point age compared with RPO. Durations are minutes. No actual recovery timing or data loss is measured."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t5",
    "batch": "24",
    "title": "Redundant Data Centers",
    "subtitle": "Two sites share one identity service hosted only at site A.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t5",
    "definition": "Redundant data centers protect against specified site failures only when capacity, data, connectivity and operational dependencies remain usable at the survivor.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two sites share one identity service hosted only at site A. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Site domain, Replication path, Survivor capacity. Map which dependencies survive a site loss. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Separate buildings can share utilities. Latency and bandwidth affect lag. Normal distributed load can conceal a deficit. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Site domain: Shared location dependencies. Separate buildings can share utilities.",
      "Replication path: Movement of protected state. Latency and bandwidth affect lag.",
      "Survivor capacity: Usable resources after loss. Normal distributed load can conceal a deficit."
    ],
    "mechanism": [
      "Map which dependencies survive a site loss.",
      "Budget replication behavior and remaining service capacity.",
      "Exercise site isolation with fencing, traffic control and application validation."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two sites share one identity service hosted only at site A."
      ],
      [
        "Site domain",
        "Map which dependencies survive a site loss."
      ],
      [
        "Replication path",
        "Budget replication behavior and remaining service capacity."
      ],
      [
        "Survivor capacity",
        "Exercise site isolation with fencing, traffic control and application validation."
      ]
    ],
    "comparison": [
      [
        "Site domain",
        "Shared location dependencies",
        "Separate buildings can share utilities"
      ],
      [
        "Replication path",
        "Movement of protected state",
        "Latency and bandwidth affect lag"
      ],
      [
        "Survivor capacity",
        "Usable resources after loss",
        "Normal distributed load can conceal a deficit"
      ]
    ],
    "example": "Worked incident: Two sites share one identity service hosted only at site A. Failure: Site B has compute and data but users cannot authenticate after A fails. Recovery: Provide a supported identity recovery or redundancy design and include it in the site-loss test. The key distinction is illustrated by this question: Does geographic separation prove independence? No. Carriers, power and control systems can still be shared. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t5",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Map which dependencies survive a site loss. Budget replication behavior and remaining service capacity. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Site B has compute and data but users cannot authenticate after A fails. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Provide a supported identity recovery or redundancy design and include it in the site-loss test.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Exercise site isolation with fencing, traffic control and application validation. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Separate buildings can share utilities. Normal distributed load can conceal a deficit. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Budget replication behavior and remaining service capacity. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
    "troubleshooting": [
      [
        "Site B has compute and data but users cannot authenticate after A fails.",
        "Provide a supported identity recovery or redundancy design and include it in the site-loss test."
      ],
      [
        "Why plan fencing?",
        "To prevent conflicting writers when communication is lost. Isolation and failure are not identical."
      ],
      [
        "What constrains synchronous replication?",
        "Round-trip behavior and application write requirements. Distance is not just a map detail."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Carriers, power and control systems can still be shared.",
      "Isolation and failure are not identical.",
      "Distance is not just a map detail.",
      "A powered-on standby is insufficient.",
      "Separate buildings can share utilities.",
      "Normal distributed load can conceal a deficit."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t4"
    ],
    "related": [
      "s9-g6-t6"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Redundant Data Centers failure with an explicit evidence boundary. Two sites share one identity service hosted only at site A.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Site domain → Shared location dependencies",
        "Replication path → Movement of protected state",
        "Survivor capacity → Usable resources after loss"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two sites share one identity service hosted only at site A.",
        "Write a prediction before revealing the baseline explanation. Map which dependencies survive a site loss.",
        "Select Fault and locate the first broken handoff. Site B has compute and data but users cannot authenticate after A fails.",
        "Propose one observation that could disprove your diagnosis. Why plan fencing?",
        "Select Recovery and compare with the required result. Provide a supported identity recovery or redundancy design and include it in the site-loss test.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Provide a supported identity recovery or redundancy design and include it in the site-loss test. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Site B has compute and data but users cannot authenticate after A fails. Client operations, data consistency and survivor capacity.",
      "challenge": "What must a site-loss test measure? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Site domain": "Shared location dependencies. Separate buildings can share utilities.",
      "Replication path": "Movement of protected state. Latency and bandwidth affect lag.",
      "Survivor capacity": "Usable resources after loss. Normal distributed load can conceal a deficit."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t5-QC1",
        "topicId": "s9-g6-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Redundant Data Centers.",
        "answer": "Redundant data centers protect against specified site failures only when capacity, data, connectivity and operational dependencies remain usable at the survivor.",
        "explanation": "Map which dependencies survive a site loss.",
        "testedConcept": "Site domain"
      },
      {
        "questionId": "s9-g6-t5-QC2",
        "topicId": "s9-g6-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Budget replication behavior and remaining service capacity.",
        "explanation": "Latency and bandwidth affect lag.",
        "testedConcept": "Replication path"
      },
      {
        "questionId": "s9-g6-t5-QC3",
        "topicId": "s9-g6-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Provide a supported identity recovery or redundancy design and include it in the site-loss test.",
        "explanation": "Exercise site isolation with fencing, traffic control and application validation.",
        "testedConcept": "Survivor capacity"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t5-Q1",
        "topicId": "s9-g6-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does geographic separation prove independence?",
        "answer": "No.",
        "explanation": "Carriers, power and control systems can still be shared.",
        "testedConcept": "Site domain"
      },
      {
        "questionId": "s9-g6-t5-Q2",
        "topicId": "s9-g6-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why plan fencing?",
        "answer": "To prevent conflicting writers when communication is lost.",
        "explanation": "Isolation and failure are not identical.",
        "testedConcept": "Replication path"
      },
      {
        "questionId": "s9-g6-t5-Q3",
        "topicId": "s9-g6-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What constrains synchronous replication?",
        "answer": "Round-trip behavior and application write requirements.",
        "explanation": "Distance is not just a map detail.",
        "testedConcept": "Survivor capacity"
      },
      {
        "questionId": "s9-g6-t5-Q4",
        "topicId": "s9-g6-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must a site-loss test measure?",
        "answer": "Client operations, data consistency and survivor capacity.",
        "explanation": "A powered-on standby is insufficient.",
        "testedConcept": "Site domain"
      },
      {
        "questionId": "s9-g6-t5-Q5",
        "topicId": "s9-g6-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Redundant Data Centers case.",
        "answer": "Site B has compute and data but users cannot authenticate after A fails.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t5-Q6",
        "topicId": "s9-g6-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Redundant Data Centers incident?",
        "answer": "Provide a supported identity recovery or redundancy design and include it in the site-loss test.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t5-Q7",
        "topicId": "s9-g6-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Site domain with Replication path.",
        "answer": "Shared location dependencies. Movement of protected state.",
        "explanation": "Separate buildings can share utilities. Latency and bandwidth affect lag.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t5-Q8",
        "topicId": "s9-g6-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Survivor capacity not establish the entire outcome?",
        "answer": "Normal distributed load can conceal a deficit.",
        "explanation": "Exercise site isolation with fencing, traffic control and application validation.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t5-Q9",
        "topicId": "s9-g6-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two sites share one identity service hosted only at site A. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t5-Q10",
        "topicId": "s9-g6-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion capacity model leave unverified?",
        "answer": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "capacity",
      "baseline": "Two sites share one identity service hosted only at site A.",
      "fault": "Site B has compute and data but users cannot authenticate after A fails.",
      "restore": "Provide a supported identity recovery or redundancy design and include it in the site-loss test.",
      "scope": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t6",
    "batch": "24",
    "title": "Active/Active",
    "subtitle": "Two sites accept updates to the same customer record during a link partition.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t6",
    "definition": "Active/active architecture serves work from multiple instances or sites at once; write coordination, session behavior and failure routing determine correctness.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Two sites accept updates to the same customer record during a link partition. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Concurrent service, Conflict policy, Traffic steering. Partition or coordinate mutable state explicitly. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Shared mutable state needs coordination. Silent last-writer rules may lose work. Health and capacity must influence it. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Concurrent service: Multiple active serving locations. Shared mutable state needs coordination.",
      "Conflict policy: How competing writes resolve. Silent last-writer rules may lose work.",
      "Traffic steering: Selection of serving endpoint. Health and capacity must influence it."
    ],
    "mechanism": [
      "Partition or coordinate mutable state explicitly.",
      "Route work using health and application constraints.",
      "Remove one active domain and verify both consistency and surviving capacity."
    ],
    "flow": [
      [
        "Operation and scope",
        "Two sites accept updates to the same customer record during a link partition."
      ],
      [
        "Concurrent service",
        "Partition or coordinate mutable state explicitly."
      ],
      [
        "Conflict policy",
        "Route work using health and application constraints."
      ],
      [
        "Traffic steering",
        "Remove one active domain and verify both consistency and surviving capacity."
      ]
    ],
    "comparison": [
      [
        "Concurrent service",
        "Multiple active serving locations",
        "Shared mutable state needs coordination"
      ],
      [
        "Conflict policy",
        "How competing writes resolve",
        "Silent last-writer rules may lose work"
      ],
      [
        "Traffic steering",
        "Selection of serving endpoint",
        "Health and capacity must influence it"
      ]
    ],
    "example": "Worked incident: Two sites accept updates to the same customer record during a link partition. Failure: Both acknowledge incompatible writes without a conflict policy. Recovery: Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics. The key distinction is illustrated by this question: Does active/active eliminate failover? No; traffic and workload still move after failure. Remaining capacity matters. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t6",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Partition or coordinate mutable state explicitly. Route work using health and application constraints. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Both acknowledge incompatible writes without a conflict policy. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Remove one active domain and verify both consistency and surviving capacity. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Shared mutable state needs coordination. Health and capacity must influence it. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Route work using health and application constraints. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
    "troubleshooting": [
      [
        "Both acknowledge incompatible writes without a conflict policy.",
        "Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics."
      ],
      [
        "Why are stateless frontends easier?",
        "They reduce local mutable session dependencies. Their backing data can still be stateful."
      ],
      [
        "Can a load balancer solve write conflicts?",
        "Not by itself. State coordination belongs in the application or data system."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Remaining capacity matters.",
      "Their backing data can still be stateful.",
      "State coordination belongs in the application or data system.",
      "Availability without correctness is not success.",
      "Shared mutable state needs coordination.",
      "Health and capacity must influence it."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t5"
    ],
    "related": [
      "s9-g6-t7"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Active/Active failure with an explicit evidence boundary. Two sites accept updates to the same customer record during a link partition.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Concurrent service → Multiple active serving locations",
        "Conflict policy → How competing writes resolve",
        "Traffic steering → Selection of serving endpoint"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Two sites accept updates to the same customer record during a link partition.",
        "Write a prediction before revealing the baseline explanation. Partition or coordinate mutable state explicitly.",
        "Select Fault and locate the first broken handoff. Both acknowledge incompatible writes without a conflict policy.",
        "Propose one observation that could disprove your diagnosis. Why are stateless frontends easier?",
        "Select Recovery and compare with the required result. Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Both acknowledge incompatible writes without a conflict policy. Which writes are accepted, denied or reconciled.",
      "challenge": "What must partition testing include? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Concurrent service": "Multiple active serving locations. Shared mutable state needs coordination.",
      "Conflict policy": "How competing writes resolve. Silent last-writer rules may lose work.",
      "Traffic steering": "Selection of serving endpoint. Health and capacity must influence it."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t6-QC1",
        "topicId": "s9-g6-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Active/Active.",
        "answer": "Active/active architecture serves work from multiple instances or sites at once; write coordination, session behavior and failure routing determine correctness.",
        "explanation": "Partition or coordinate mutable state explicitly.",
        "testedConcept": "Concurrent service"
      },
      {
        "questionId": "s9-g6-t6-QC2",
        "topicId": "s9-g6-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Route work using health and application constraints.",
        "explanation": "Silent last-writer rules may lose work.",
        "testedConcept": "Conflict policy"
      },
      {
        "questionId": "s9-g6-t6-QC3",
        "topicId": "s9-g6-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics.",
        "explanation": "Remove one active domain and verify both consistency and surviving capacity.",
        "testedConcept": "Traffic steering"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t6-Q1",
        "topicId": "s9-g6-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does active/active eliminate failover?",
        "answer": "No; traffic and workload still move after failure.",
        "explanation": "Remaining capacity matters.",
        "testedConcept": "Concurrent service"
      },
      {
        "questionId": "s9-g6-t6-Q2",
        "topicId": "s9-g6-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why are stateless frontends easier?",
        "answer": "They reduce local mutable session dependencies.",
        "explanation": "Their backing data can still be stateful.",
        "testedConcept": "Conflict policy"
      },
      {
        "questionId": "s9-g6-t6-Q3",
        "topicId": "s9-g6-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can a load balancer solve write conflicts?",
        "answer": "Not by itself.",
        "explanation": "State coordination belongs in the application or data system.",
        "testedConcept": "Traffic steering"
      },
      {
        "questionId": "s9-g6-t6-Q4",
        "topicId": "s9-g6-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must partition testing include?",
        "answer": "Which writes are accepted, denied or reconciled.",
        "explanation": "Availability without correctness is not success.",
        "testedConcept": "Concurrent service"
      },
      {
        "questionId": "s9-g6-t6-Q5",
        "topicId": "s9-g6-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Active/Active case.",
        "answer": "Both acknowledge incompatible writes without a conflict policy.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t6-Q6",
        "topicId": "s9-g6-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Active/Active incident?",
        "answer": "Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t6-Q7",
        "topicId": "s9-g6-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Concurrent service with Conflict policy.",
        "answer": "Multiple active serving locations. How competing writes resolve.",
        "explanation": "Shared mutable state needs coordination. Silent last-writer rules may lose work.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t6-Q8",
        "topicId": "s9-g6-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Traffic steering not establish the entire outcome?",
        "answer": "Health and capacity must influence it.",
        "explanation": "Remove one active domain and verify both consistency and surviving capacity.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t6-Q9",
        "topicId": "s9-g6-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Two sites accept updates to the same customer record during a link partition. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t6-Q10",
        "topicId": "s9-g6-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion capacity model leave unverified?",
        "answer": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "capacity",
      "baseline": "Two sites accept updates to the same customer record during a link partition.",
      "fault": "Both acknowledge incompatible writes without a conflict policy.",
      "restore": "Use a supported consistency and ownership design; test partition outcomes and reconcile according to business semantics.",
      "scope": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t7",
    "batch": "24",
    "title": "Active/Passive",
    "subtitle": "The primary loses its heartbeat network but continues writing.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t7",
    "definition": "Active/passive architecture keeps a standby ready to take over from a primary; promotion requires usable state, sufficient capacity and prevention of competing primaries.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. The primary loses its heartbeat network but continues writing. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Primary, Standby, Fencing. Maintain standby state and verify readiness. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Ownership needs a reliable rule. Readiness can drift while idle. A missed heartbeat alone is not proof it is stopped. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Primary: Current owner of service work. Ownership needs a reliable rule.",
      "Standby: Prepared recovery instance. Readiness can drift while idle.",
      "Fencing: Prevent old owner from acting. A missed heartbeat alone is not proof it is stopped."
    ],
    "mechanism": [
      "Maintain standby state and verify readiness.",
      "Establish that the old owner cannot conflict before promotion.",
      "Promote, validate client operations and plan controlled failback."
    ],
    "flow": [
      [
        "Operation and scope",
        "The primary loses its heartbeat network but continues writing."
      ],
      [
        "Primary",
        "Maintain standby state and verify readiness."
      ],
      [
        "Standby",
        "Establish that the old owner cannot conflict before promotion."
      ],
      [
        "Fencing",
        "Promote, validate client operations and plan controlled failback."
      ]
    ],
    "comparison": [
      [
        "Primary",
        "Current owner of service work",
        "Ownership needs a reliable rule"
      ],
      [
        "Standby",
        "Prepared recovery instance",
        "Readiness can drift while idle"
      ],
      [
        "Fencing",
        "Prevent old owner from acting",
        "A missed heartbeat alone is not proof it is stopped"
      ]
    ],
    "example": "Worked incident: The primary loses its heartbeat network but continues writing. Failure: The standby promotes without fencing and both write. Recovery: Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic. The key distinction is illustrated by this question: Is heartbeat loss proof of node death? No. It can be a network partition. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t7",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Maintain standby state and verify readiness. Establish that the old owner cannot conflict before promotion. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The standby promotes without fencing and both write. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Promote, validate client operations and plan controlled failback. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Ownership needs a reliable rule. A missed heartbeat alone is not proof it is stopped. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Establish that the old owner cannot conflict before promotion. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "The standby promotes without fencing and both write.",
        "Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic."
      ],
      [
        "Why exercise standby regularly?",
        "Dependencies and configuration can drift. Idle capacity is not verified readiness."
      ],
      [
        "Does failback automatically follow recovery?",
        "No; it needs a controlled plan. Rushing can cause another outage."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "It can be a network partition.",
      "Idle capacity is not verified readiness.",
      "Rushing can cause another outage.",
      "A role flag alone is insufficient.",
      "Ownership needs a reliable rule.",
      "A missed heartbeat alone is not proof it is stopped."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t6"
    ],
    "related": [
      "s9-g6-t8"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Active/Passive failure with an explicit evidence boundary. The primary loses its heartbeat network but continues writing.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Primary → Current owner of service work",
        "Standby → Prepared recovery instance",
        "Fencing → Prevent old owner from acting"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. The primary loses its heartbeat network but continues writing.",
        "Write a prediction before revealing the baseline explanation. Maintain standby state and verify readiness.",
        "Select Fault and locate the first broken handoff. The standby promotes without fencing and both write.",
        "Propose one observation that could disprove your diagnosis. Why exercise standby regularly?",
        "Select Recovery and compare with the required result. Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The standby promotes without fencing and both write. Correct ownership plus usable application state and client success.",
      "challenge": "What is promotion acceptance? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Primary": "Current owner of service work. Ownership needs a reliable rule.",
      "Standby": "Prepared recovery instance. Readiness can drift while idle.",
      "Fencing": "Prevent old owner from acting. A missed heartbeat alone is not proof it is stopped."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t7-QC1",
        "topicId": "s9-g6-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Active/Passive.",
        "answer": "Active/passive architecture keeps a standby ready to take over from a primary; promotion requires usable state, sufficient capacity and prevention of competing primaries.",
        "explanation": "Maintain standby state and verify readiness.",
        "testedConcept": "Primary"
      },
      {
        "questionId": "s9-g6-t7-QC2",
        "topicId": "s9-g6-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Establish that the old owner cannot conflict before promotion.",
        "explanation": "Readiness can drift while idle.",
        "testedConcept": "Standby"
      },
      {
        "questionId": "s9-g6-t7-QC3",
        "topicId": "s9-g6-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic.",
        "explanation": "Promote, validate client operations and plan controlled failback.",
        "testedConcept": "Fencing"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t7-Q1",
        "topicId": "s9-g6-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is heartbeat loss proof of node death?",
        "answer": "No.",
        "explanation": "It can be a network partition.",
        "testedConcept": "Primary"
      },
      {
        "questionId": "s9-g6-t7-Q2",
        "topicId": "s9-g6-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why exercise standby regularly?",
        "answer": "Dependencies and configuration can drift.",
        "explanation": "Idle capacity is not verified readiness.",
        "testedConcept": "Standby"
      },
      {
        "questionId": "s9-g6-t7-Q3",
        "topicId": "s9-g6-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does failback automatically follow recovery?",
        "answer": "No; it needs a controlled plan.",
        "explanation": "Rushing can cause another outage.",
        "testedConcept": "Fencing"
      },
      {
        "questionId": "s9-g6-t7-Q4",
        "topicId": "s9-g6-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is promotion acceptance?",
        "answer": "Correct ownership plus usable application state and client success.",
        "explanation": "A role flag alone is insufficient.",
        "testedConcept": "Primary"
      },
      {
        "questionId": "s9-g6-t7-Q5",
        "topicId": "s9-g6-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Active/Passive case.",
        "answer": "The standby promotes without fencing and both write.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t7-Q6",
        "topicId": "s9-g6-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Active/Passive incident?",
        "answer": "Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t7-Q7",
        "topicId": "s9-g6-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Primary with Standby.",
        "answer": "Current owner of service work. Prepared recovery instance.",
        "explanation": "Ownership needs a reliable rule. Readiness can drift while idle.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t7-Q8",
        "topicId": "s9-g6-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Fencing not establish the entire outcome?",
        "answer": "A missed heartbeat alone is not proof it is stopped.",
        "explanation": "Promote, validate client operations and plan controlled failback.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t7-Q9",
        "topicId": "s9-g6-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "The primary loses its heartbeat network but continues writing. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t7-Q10",
        "topicId": "s9-g6-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "The primary loses its heartbeat network but continues writing.",
      "fault": "The standby promotes without fencing and both write.",
      "restore": "Use the supported quorum or fencing mechanism; verify single-writer ownership before admitting traffic.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g6-t8",
    "batch": "24",
    "title": "Load Balancing",
    "subtitle": "A backend accepts TCP but cannot query its database.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g6-t8",
    "definition": "Load balancing distributes requests or connections among eligible backends; health checks, persistence and draining determine how safely membership changes.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A backend accepts TCP but cannot query its database. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Health check, Persistence, Drain. Define a health test representative of the service. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A shallow check can miss dependency failure. Can skew load or retain a bad target. Needs a timeout and connection policy. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Health check: Eligibility signal. A shallow check can miss dependency failure.",
      "Persistence: Keeping related traffic on a backend. Can skew load or retain a bad target.",
      "Drain: Stop new work while existing work finishes. Needs a timeout and connection policy."
    ],
    "mechanism": [
      "Define a health test representative of the service.",
      "Select among healthy backends with an appropriate algorithm.",
      "Drain a backend for change and verify client errors and remaining load."
    ],
    "flow": [
      [
        "Operation and scope",
        "A backend accepts TCP but cannot query its database."
      ],
      [
        "Health check",
        "Define a health test representative of the service."
      ],
      [
        "Persistence",
        "Select among healthy backends with an appropriate algorithm."
      ],
      [
        "Drain",
        "Drain a backend for change and verify client errors and remaining load."
      ]
    ],
    "comparison": [
      [
        "Health check",
        "Eligibility signal",
        "A shallow check can miss dependency failure"
      ],
      [
        "Persistence",
        "Keeping related traffic on a backend",
        "Can skew load or retain a bad target"
      ],
      [
        "Drain",
        "Stop new work while existing work finishes",
        "Needs a timeout and connection policy"
      ]
    ],
    "example": "Worked incident: A backend accepts TCP but cannot query its database. Failure: A port-only check keeps routing failing requests to it. Recovery: Use an appropriate application readiness check and validate actual client behavior after removal. The key distinction is illustrated by this question: Does round robin guarantee equal work? No; requests have different costs. Measure workload rather than connection count alone. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g6-t8",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define a health test representative of the service. Select among healthy backends with an appropriate algorithm. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A port-only check keeps routing failing requests to it. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use an appropriate application readiness check and validate actual client behavior after removal.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Drain a backend for change and verify client errors and remaining load. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A shallow check can miss dependency failure. Needs a timeout and connection policy. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Select among healthy backends with an appropriate algorithm. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
    "troubleshooting": [
      [
        "A port-only check keeps routing failing requests to it.",
        "Use an appropriate application readiness check and validate actual client behavior after removal."
      ],
      [
        "How differs liveness from readiness?",
        "Liveness concerns process viability; readiness concerns serving work. Checks must match their purpose."
      ],
      [
        "Why drain before maintenance?",
        "To reduce interruption to active work. Immediate removal can break connections."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Measure workload rather than connection count alone.",
      "Checks must match their purpose.",
      "Immediate removal can break connections.",
      "Healthy membership alone does not establish performance.",
      "A shallow check can miss dependency failure.",
      "Needs a timeout and connection policy."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t7"
    ],
    "related": [
      "s9-g7-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Load Balancing failure with an explicit evidence boundary. A backend accepts TCP but cannot query its database.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Health check → Eligibility signal",
        "Persistence → Keeping related traffic on a backend",
        "Drain → Stop new work while existing work finishes"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A backend accepts TCP but cannot query its database.",
        "Write a prediction before revealing the baseline explanation. Define a health test representative of the service.",
        "Select Fault and locate the first broken handoff. A port-only check keeps routing failing requests to it.",
        "Propose one observation that could disprove your diagnosis. How differs liveness from readiness?",
        "Select Recovery and compare with the required result. Use an appropriate application readiness check and validate actual client behavior after removal.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use an appropriate application readiness check and validate actual client behavior after removal. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A port-only check keeps routing failing requests to it. Check survivor capacity and client error rate.",
      "challenge": "What follows backend removal? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Health check": "Eligibility signal. A shallow check can miss dependency failure.",
      "Persistence": "Keeping related traffic on a backend. Can skew load or retain a bad target.",
      "Drain": "Stop new work while existing work finishes. Needs a timeout and connection policy."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g6-t8-QC1",
        "topicId": "s9-g6-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Load Balancing.",
        "answer": "Load balancing distributes requests or connections among eligible backends; health checks, persistence and draining determine how safely membership changes.",
        "explanation": "Define a health test representative of the service.",
        "testedConcept": "Health check"
      },
      {
        "questionId": "s9-g6-t8-QC2",
        "topicId": "s9-g6-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Select among healthy backends with an appropriate algorithm.",
        "explanation": "Can skew load or retain a bad target.",
        "testedConcept": "Persistence"
      },
      {
        "questionId": "s9-g6-t8-QC3",
        "topicId": "s9-g6-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use an appropriate application readiness check and validate actual client behavior after removal.",
        "explanation": "Drain a backend for change and verify client errors and remaining load.",
        "testedConcept": "Drain"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g6-t8-Q1",
        "topicId": "s9-g6-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does round robin guarantee equal work?",
        "answer": "No; requests have different costs.",
        "explanation": "Measure workload rather than connection count alone.",
        "testedConcept": "Health check"
      },
      {
        "questionId": "s9-g6-t8-Q2",
        "topicId": "s9-g6-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differs liveness from readiness?",
        "answer": "Liveness concerns process viability; readiness concerns serving work.",
        "explanation": "Checks must match their purpose.",
        "testedConcept": "Persistence"
      },
      {
        "questionId": "s9-g6-t8-Q3",
        "topicId": "s9-g6-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why drain before maintenance?",
        "answer": "To reduce interruption to active work.",
        "explanation": "Immediate removal can break connections.",
        "testedConcept": "Drain"
      },
      {
        "questionId": "s9-g6-t8-Q4",
        "topicId": "s9-g6-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What follows backend removal?",
        "answer": "Check survivor capacity and client error rate.",
        "explanation": "Healthy membership alone does not establish performance.",
        "testedConcept": "Health check"
      },
      {
        "questionId": "s9-g6-t8-Q5",
        "topicId": "s9-g6-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Load Balancing case.",
        "answer": "A port-only check keeps routing failing requests to it.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g6-t8-Q6",
        "topicId": "s9-g6-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Load Balancing incident?",
        "answer": "Use an appropriate application readiness check and validate actual client behavior after removal.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g6-t8-Q7",
        "topicId": "s9-g6-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Health check with Persistence.",
        "answer": "Eligibility signal. Keeping related traffic on a backend.",
        "explanation": "A shallow check can miss dependency failure. Can skew load or retain a bad target.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g6-t8-Q8",
        "topicId": "s9-g6-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Drain not establish the entire outcome?",
        "answer": "Needs a timeout and connection policy.",
        "explanation": "Drain a backend for change and verify client errors and remaining load.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g6-t8-Q9",
        "topicId": "s9-g6-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A backend accepts TCP but cannot query its database. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g6-t8-Q10",
        "topicId": "s9-g6-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion capacity model leave unverified?",
        "answer": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "capacity",
      "baseline": "A backend accepts TCP but cannot query its database.",
      "fault": "A port-only check keeps routing failing requests to it.",
      "restore": "Use an appropriate application readiness check and validate actual client behavior after removal.",
      "scope": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g7-t0",
    "batch": "24",
    "title": "Network segmentation",
    "subtitle": "Guest clients must reach a public service but never device administration.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g7-t0",
    "definition": "Network segmentation defines separate communication scopes and explicit permitted paths; a VLAN or subnet boundary alone is not a complete security policy.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Guest clients must reach a public service but never device administration. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Zone, Policy edge, Enforcement point. Map required service flows and prohibited flows. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Membership needs identity controls. Direction and return traffic matter. Uncontrolled alternate paths bypass it. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Zone: Group with a defined trust purpose. Membership needs identity controls.",
      "Policy edge: Allowed source destination and service. Direction and return traffic matter.",
      "Enforcement point: Where policy is applied. Uncontrolled alternate paths bypass it."
    ],
    "mechanism": [
      "Map required service flows and prohibited flows.",
      "Place enforcement on every relevant path.",
      "Test one allowed and one denied flow from the actual source context."
    ],
    "flow": [
      [
        "Operation and scope",
        "Guest clients must reach a public service but never device administration."
      ],
      [
        "Zone",
        "Map required service flows and prohibited flows."
      ],
      [
        "Policy edge",
        "Place enforcement on every relevant path."
      ],
      [
        "Enforcement point",
        "Test one allowed and one denied flow from the actual source context."
      ]
    ],
    "comparison": [
      [
        "Zone",
        "Group with a defined trust purpose",
        "Membership needs identity controls"
      ],
      [
        "Policy edge",
        "Allowed source destination and service",
        "Direction and return traffic matter"
      ],
      [
        "Enforcement point",
        "Where policy is applied",
        "Uncontrolled alternate paths bypass it"
      ]
    ],
    "example": "Worked incident: Guest clients must reach a public service but never device administration. Failure: Routing between VLANs is enabled without a filtering policy. Recovery: Apply explicit least-required policy at the intended boundary and verify guest administration remains denied. The key distinction is illustrated by this question: Does a different subnet imply isolation? No; routing may connect it. Enforcement must implement the policy. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g7-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Map required service flows and prohibited flows. Place enforcement on every relevant path. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Routing between VLANs is enabled without a filtering policy. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Apply explicit least-required policy at the intended boundary and verify guest administration remains denied.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Test one allowed and one denied flow from the actual source context. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Membership needs identity controls. Uncontrolled alternate paths bypass it. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Place enforcement on every relevant path. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
    "troubleshooting": [
      [
        "Routing between VLANs is enabled without a filtering policy.",
        "Apply explicit least-required policy at the intended boundary and verify guest administration remains denied."
      ],
      [
        "Why test from the real source zone?",
        "The path and applied rules can differ. An administrator test is not a guest test."
      ],
      [
        "What can bypass a firewall rule?",
        "An alternate path, tunnel or misplaced interface. Trace the whole route."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Enforcement must implement the policy.",
      "An administrator test is not a guest test.",
      "Trace the whole route.",
      "Any-to-any entries hide requirements.",
      "Membership needs identity controls.",
      "Uncontrolled alternate paths bypass it."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g6-t8"
    ],
    "related": [
      "s9-g7-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Network segmentation failure with an explicit evidence boundary. Guest clients must reach a public service but never device administration.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Zone → Group with a defined trust purpose",
        "Policy edge → Allowed source destination and service",
        "Enforcement point → Where policy is applied"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Guest clients must reach a public service but never device administration.",
        "Write a prediction before revealing the baseline explanation. Map required service flows and prohibited flows.",
        "Select Fault and locate the first broken handoff. Routing between VLANs is enabled without a filtering policy.",
        "Propose one observation that could disprove your diagnosis. Why test from the real source zone?",
        "Select Recovery and compare with the required result. Apply explicit least-required policy at the intended boundary and verify guest administration remains denied.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Apply explicit least-required policy at the intended boundary and verify guest administration remains denied. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Routing between VLANs is enabled without a filtering policy. Source, destination, service, direction, owner and justification.",
      "challenge": "What belongs in the policy matrix? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Zone": "Group with a defined trust purpose. Membership needs identity controls.",
      "Policy edge": "Allowed source destination and service. Direction and return traffic matter.",
      "Enforcement point": "Where policy is applied. Uncontrolled alternate paths bypass it."
    },
    "sources": [
      {
        "title": "Cisco IOS XE hardening: management, control and data planes",
        "url": "https://sec.cloudapps.cisco.com/security/center/resources/IOS_XE_hardening",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g7-t0-QC1",
        "topicId": "s9-g7-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Network segmentation.",
        "answer": "Network segmentation defines separate communication scopes and explicit permitted paths; a VLAN or subnet boundary alone is not a complete security policy.",
        "explanation": "Map required service flows and prohibited flows.",
        "testedConcept": "Zone"
      },
      {
        "questionId": "s9-g7-t0-QC2",
        "topicId": "s9-g7-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Place enforcement on every relevant path.",
        "explanation": "Direction and return traffic matter.",
        "testedConcept": "Policy edge"
      },
      {
        "questionId": "s9-g7-t0-QC3",
        "topicId": "s9-g7-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Apply explicit least-required policy at the intended boundary and verify guest administration remains denied.",
        "explanation": "Test one allowed and one denied flow from the actual source context.",
        "testedConcept": "Enforcement point"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g7-t0-Q1",
        "topicId": "s9-g7-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a different subnet imply isolation?",
        "answer": "No; routing may connect it.",
        "explanation": "Enforcement must implement the policy.",
        "testedConcept": "Zone"
      },
      {
        "questionId": "s9-g7-t0-Q2",
        "topicId": "s9-g7-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why test from the real source zone?",
        "answer": "The path and applied rules can differ.",
        "explanation": "An administrator test is not a guest test.",
        "testedConcept": "Policy edge"
      },
      {
        "questionId": "s9-g7-t0-Q3",
        "topicId": "s9-g7-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can bypass a firewall rule?",
        "answer": "An alternate path, tunnel or misplaced interface.",
        "explanation": "Trace the whole route.",
        "testedConcept": "Enforcement point"
      },
      {
        "questionId": "s9-g7-t0-Q4",
        "topicId": "s9-g7-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What belongs in the policy matrix?",
        "answer": "Source, destination, service, direction, owner and justification.",
        "explanation": "Any-to-any entries hide requirements.",
        "testedConcept": "Zone"
      },
      {
        "questionId": "s9-g7-t0-Q5",
        "topicId": "s9-g7-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Network segmentation case.",
        "answer": "Routing between VLANs is enabled without a filtering policy.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g7-t0-Q6",
        "topicId": "s9-g7-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Network segmentation incident?",
        "answer": "Apply explicit least-required policy at the intended boundary and verify guest administration remains denied.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g7-t0-Q7",
        "topicId": "s9-g7-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Zone with Policy edge.",
        "answer": "Group with a defined trust purpose. Allowed source destination and service.",
        "explanation": "Membership needs identity controls. Direction and return traffic matter.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g7-t0-Q8",
        "topicId": "s9-g7-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Enforcement point not establish the entire outcome?",
        "answer": "Uncontrolled alternate paths bypass it.",
        "explanation": "Test one allowed and one denied flow from the actual source context.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g7-t0-Q9",
        "topicId": "s9-g7-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Guest clients must reach a public service but never device administration. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g7-t0-Q10",
        "topicId": "s9-g7-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion policy model leave unverified?",
        "answer": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "policy",
      "baseline": "Guest clients must reach a public service but never device administration.",
      "fault": "Routing between VLANs is enabled without a filtering policy.",
      "restore": "Apply explicit least-required policy at the intended boundary and verify guest administration remains denied.",
      "scope": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g7-t1",
    "batch": "24",
    "title": "Management Plane",
    "subtitle": "A routing mistake removes the only path to the management interface.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g7-t1",
    "definition": "The management plane provides administrative access to infrastructure; it needs constrained identities, protected paths and recovery access independent of the service being repaired.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A routing mistake removes the only path to the management interface. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Administrative endpoint, Out-of-band path, AAA. Inventory management endpoints and permitted operators. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Exposure widens attack surface. Independence must be tested. Login success is not command authorization. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Administrative endpoint: Configuration and inspection entry. Exposure widens attack surface.",
      "Out-of-band path: Separate recovery access. Independence must be tested.",
      "AAA: Authentication authorization accounting. Login success is not command authorization."
    ],
    "mechanism": [
      "Inventory management endpoints and permitted operators.",
      "Restrict paths and privileges while retaining a tested recovery method.",
      "Audit administrative actions and exercise loss of the normal in-band path."
    ],
    "flow": [
      [
        "Operation and scope",
        "A routing mistake removes the only path to the management interface."
      ],
      [
        "Administrative endpoint",
        "Inventory management endpoints and permitted operators."
      ],
      [
        "Out-of-band path",
        "Restrict paths and privileges while retaining a tested recovery method."
      ],
      [
        "AAA",
        "Audit administrative actions and exercise loss of the normal in-band path."
      ]
    ],
    "comparison": [
      [
        "Administrative endpoint",
        "Configuration and inspection entry",
        "Exposure widens attack surface"
      ],
      [
        "Out-of-band path",
        "Separate recovery access",
        "Independence must be tested"
      ],
      [
        "AAA",
        "Authentication authorization accounting",
        "Login success is not command authorization"
      ]
    ],
    "example": "Worked incident: A routing mistake removes the only path to the management interface. Failure: The team cannot reach the device to restore the route. Recovery: Use the pretested independent console or management path and restore the captured route without exposing administration to guests. The key distinction is illustrated by this question: Why separate management from guest access? To reduce untrusted access to administrative capabilities. Logical naming alone does not enforce this. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g7-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Inventory management endpoints and permitted operators. Restrict paths and privileges while retaining a tested recovery method. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The team cannot reach the device to restore the route. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Use the pretested independent console or management path and restore the captured route without exposing administration to guests.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Audit administrative actions and exercise loss of the normal in-band path. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Exposure widens attack surface. Login success is not command authorization. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Restrict paths and privileges while retaining a tested recovery method. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
    "troubleshooting": [
      [
        "The team cannot reach the device to restore the route.",
        "Use the pretested independent console or management path and restore the captured route without exposing administration to guests."
      ],
      [
        "Does out-of-band always mean independent?",
        "No. It can still share power or authentication dependencies."
      ],
      [
        "What should command accounting record?",
        "Identity, time and action with sensitive values protected. Audit detail must not leak credentials."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Logical naming alone does not enforce this.",
      "It can still share power or authentication dependencies.",
      "Audit detail must not leak credentials.",
      "A successful login is incomplete evidence.",
      "Exposure widens attack surface.",
      "Login success is not command authorization."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g7-t0"
    ],
    "related": [
      "s9-g7-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Management Plane failure with an explicit evidence boundary. A routing mistake removes the only path to the management interface.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Administrative endpoint → Configuration and inspection entry",
        "Out-of-band path → Separate recovery access",
        "AAA → Authentication authorization accounting"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A routing mistake removes the only path to the management interface.",
        "Write a prediction before revealing the baseline explanation. Inventory management endpoints and permitted operators.",
        "Select Fault and locate the first broken handoff. The team cannot reach the device to restore the route.",
        "Propose one observation that could disprove your diagnosis. Does out-of-band always mean independent?",
        "Select Recovery and compare with the required result. Use the pretested independent console or management path and restore the captured route without exposing administration to guests.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Use the pretested independent console or management path and restore the captured route without exposing administration to guests. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The team cannot reach the device to restore the route. Verify permitted reads and denied unauthorized changes.",
      "challenge": "How test least privilege? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Administrative endpoint": "Configuration and inspection entry. Exposure widens attack surface.",
      "Out-of-band path": "Separate recovery access. Independence must be tested.",
      "AAA": "Authentication authorization accounting. Login success is not command authorization."
    },
    "sources": [
      {
        "title": "Cisco IOS XE hardening: management, control and data planes",
        "url": "https://sec.cloudapps.cisco.com/security/center/resources/IOS_XE_hardening",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g7-t1-QC1",
        "topicId": "s9-g7-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Management Plane.",
        "answer": "The management plane provides administrative access to infrastructure; it needs constrained identities, protected paths and recovery access independent of the service being repaired.",
        "explanation": "Inventory management endpoints and permitted operators.",
        "testedConcept": "Administrative endpoint"
      },
      {
        "questionId": "s9-g7-t1-QC2",
        "topicId": "s9-g7-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Restrict paths and privileges while retaining a tested recovery method.",
        "explanation": "Independence must be tested.",
        "testedConcept": "Out-of-band path"
      },
      {
        "questionId": "s9-g7-t1-QC3",
        "topicId": "s9-g7-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Use the pretested independent console or management path and restore the captured route without exposing administration to guests.",
        "explanation": "Audit administrative actions and exercise loss of the normal in-band path.",
        "testedConcept": "AAA"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g7-t1-Q1",
        "topicId": "s9-g7-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why separate management from guest access?",
        "answer": "To reduce untrusted access to administrative capabilities.",
        "explanation": "Logical naming alone does not enforce this.",
        "testedConcept": "Administrative endpoint"
      },
      {
        "questionId": "s9-g7-t1-Q2",
        "topicId": "s9-g7-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does out-of-band always mean independent?",
        "answer": "No.",
        "explanation": "It can still share power or authentication dependencies.",
        "testedConcept": "Out-of-band path"
      },
      {
        "questionId": "s9-g7-t1-Q3",
        "topicId": "s9-g7-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should command accounting record?",
        "answer": "Identity, time and action with sensitive values protected.",
        "explanation": "Audit detail must not leak credentials.",
        "testedConcept": "AAA"
      },
      {
        "questionId": "s9-g7-t1-Q4",
        "topicId": "s9-g7-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How test least privilege?",
        "answer": "Verify permitted reads and denied unauthorized changes.",
        "explanation": "A successful login is incomplete evidence.",
        "testedConcept": "Administrative endpoint"
      },
      {
        "questionId": "s9-g7-t1-Q5",
        "topicId": "s9-g7-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Management Plane case.",
        "answer": "The team cannot reach the device to restore the route.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g7-t1-Q6",
        "topicId": "s9-g7-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Management Plane incident?",
        "answer": "Use the pretested independent console or management path and restore the captured route without exposing administration to guests.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g7-t1-Q7",
        "topicId": "s9-g7-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Administrative endpoint with Out-of-band path.",
        "answer": "Configuration and inspection entry. Separate recovery access.",
        "explanation": "Exposure widens attack surface. Independence must be tested.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g7-t1-Q8",
        "topicId": "s9-g7-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does AAA not establish the entire outcome?",
        "answer": "Login success is not command authorization.",
        "explanation": "Audit administrative actions and exercise loss of the normal in-band path.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g7-t1-Q9",
        "topicId": "s9-g7-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A routing mistake removes the only path to the management interface. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g7-t1-Q10",
        "topicId": "s9-g7-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion policy model leave unverified?",
        "answer": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "policy",
      "baseline": "A routing mistake removes the only path to the management interface.",
      "fault": "The team cannot reach the device to restore the route.",
      "restore": "Use the pretested independent console or management path and restore the captured route without exposing administration to guests.",
      "scope": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g7-t2",
    "batch": "24",
    "title": "Control Plane",
    "subtitle": "OSPF adjacency is healthy but a route loses selection to another source.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g7-t2",
    "definition": "The control plane learns and computes forwarding state through protocols and local logic; protecting it preserves convergence and device stability.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. OSPF adjacency is healthy but a route loses selection to another source. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Adjacency, RIB, Control-plane protection. Identify required protocol peers and expected state. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A neighbor does not imply a selected route. Not identical to installed forwarding entries. Overly strict limits can break legitimate protocols. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Adjacency: Protocol relationship. A neighbor does not imply a selected route.",
      "RIB: Routing information used for selection. Not identical to installed forwarding entries.",
      "Control-plane protection: Limits and policy for control traffic. Overly strict limits can break legitimate protocols."
    ],
    "mechanism": [
      "Identify required protocol peers and expected state.",
      "Inspect adjacency and route selection before assuming forwarding behavior.",
      "Verify installed state and protect control traffic within measured requirements."
    ],
    "flow": [
      [
        "Operation and scope",
        "OSPF adjacency is healthy but a route loses selection to another source."
      ],
      [
        "Adjacency",
        "Identify required protocol peers and expected state."
      ],
      [
        "RIB",
        "Inspect adjacency and route selection before assuming forwarding behavior."
      ],
      [
        "Control-plane protection",
        "Verify installed state and protect control traffic within measured requirements."
      ]
    ],
    "comparison": [
      [
        "Adjacency",
        "Protocol relationship",
        "A neighbor does not imply a selected route"
      ],
      [
        "RIB",
        "Routing information used for selection",
        "Not identical to installed forwarding entries"
      ],
      [
        "Control-plane protection",
        "Limits and policy for control traffic",
        "Overly strict limits can break legitimate protocols"
      ]
    ],
    "example": "Worked incident: OSPF adjacency is healthy but a route loses selection to another source. Failure: Troubleshooting restarts the neighbor instead of examining route preference. Recovery: Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary. The key distinction is illustrated by this question: Is adjacency enough to prove forwarding? No. Selection and installation remain separate. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g7-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Identify required protocol peers and expected state. Inspect adjacency and route selection before assuming forwarding behavior. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Troubleshooting restarts the neighbor instead of examining route preference. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Verify installed state and protect control traffic within measured requirements. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A neighbor does not imply a selected route. Overly strict limits can break legitimate protocols. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Inspect adjacency and route selection before assuming forwarding behavior. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
    "troubleshooting": [
      [
        "Troubleshooting restarts the neighbor instead of examining route preference.",
        "Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary."
      ],
      [
        "Why protect control-plane CPU?",
        "Excess traffic can disrupt protocol processing. Policy must preserve legitimate bursts."
      ],
      [
        "Does control traffic always follow the data path?",
        "Not necessarily. Local termination and handling can differ."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Selection and installation remain separate.",
      "Policy must preserve legitimate bursts.",
      "Local termination and handling can differ.",
      "A final stable table omits the outage.",
      "A neighbor does not imply a selected route.",
      "Overly strict limits can break legitimate protocols."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g7-t1"
    ],
    "related": [
      "s9-g7-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Control Plane failure with an explicit evidence boundary. OSPF adjacency is healthy but a route loses selection to another source.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Adjacency → Protocol relationship",
        "RIB → Routing information used for selection",
        "Control-plane protection → Limits and policy for control traffic"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. OSPF adjacency is healthy but a route loses selection to another source.",
        "Write a prediction before revealing the baseline explanation. Identify required protocol peers and expected state.",
        "Select Fault and locate the first broken handoff. Troubleshooting restarts the neighbor instead of examining route preference.",
        "Propose one observation that could disprove your diagnosis. Why protect control-plane CPU?",
        "Select Recovery and compare with the required result. Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Troubleshooting restarts the neighbor instead of examining route preference. Route changes and client-visible loss over time.",
      "challenge": "What should a convergence test measure? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Adjacency": "Protocol relationship. A neighbor does not imply a selected route.",
      "RIB": "Routing information used for selection. Not identical to installed forwarding entries.",
      "Control-plane protection": "Limits and policy for control traffic. Overly strict limits can break legitimate protocols."
    },
    "sources": [
      {
        "title": "Cisco IOS XE hardening: management, control and data planes",
        "url": "https://sec.cloudapps.cisco.com/security/center/resources/IOS_XE_hardening",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g7-t2-QC1",
        "topicId": "s9-g7-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Control Plane.",
        "answer": "The control plane learns and computes forwarding state through protocols and local logic; protecting it preserves convergence and device stability.",
        "explanation": "Identify required protocol peers and expected state.",
        "testedConcept": "Adjacency"
      },
      {
        "questionId": "s9-g7-t2-QC2",
        "topicId": "s9-g7-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Inspect adjacency and route selection before assuming forwarding behavior.",
        "explanation": "Not identical to installed forwarding entries.",
        "testedConcept": "RIB"
      },
      {
        "questionId": "s9-g7-t2-QC3",
        "topicId": "s9-g7-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary.",
        "explanation": "Verify installed state and protect control traffic within measured requirements.",
        "testedConcept": "Control-plane protection"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g7-t2-Q1",
        "topicId": "s9-g7-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is adjacency enough to prove forwarding?",
        "answer": "No.",
        "explanation": "Selection and installation remain separate.",
        "testedConcept": "Adjacency"
      },
      {
        "questionId": "s9-g7-t2-Q2",
        "topicId": "s9-g7-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why protect control-plane CPU?",
        "answer": "Excess traffic can disrupt protocol processing.",
        "explanation": "Policy must preserve legitimate bursts.",
        "testedConcept": "RIB"
      },
      {
        "questionId": "s9-g7-t2-Q3",
        "topicId": "s9-g7-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does control traffic always follow the data path?",
        "answer": "Not necessarily.",
        "explanation": "Local termination and handling can differ.",
        "testedConcept": "Control-plane protection"
      },
      {
        "questionId": "s9-g7-t2-Q4",
        "topicId": "s9-g7-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a convergence test measure?",
        "answer": "Route changes and client-visible loss over time.",
        "explanation": "A final stable table omits the outage.",
        "testedConcept": "Adjacency"
      },
      {
        "questionId": "s9-g7-t2-Q5",
        "topicId": "s9-g7-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Control Plane case.",
        "answer": "Troubleshooting restarts the neighbor instead of examining route preference.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g7-t2-Q6",
        "topicId": "s9-g7-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Control Plane incident?",
        "answer": "Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g7-t2-Q7",
        "topicId": "s9-g7-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Adjacency with RIB.",
        "answer": "Protocol relationship. Routing information used for selection.",
        "explanation": "A neighbor does not imply a selected route. Not identical to installed forwarding entries.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g7-t2-Q8",
        "topicId": "s9-g7-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Control-plane protection not establish the entire outcome?",
        "answer": "Overly strict limits can break legitimate protocols.",
        "explanation": "Verify installed state and protect control traffic within measured requirements.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g7-t2-Q9",
        "topicId": "s9-g7-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "OSPF adjacency is healthy but a route loses selection to another source. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g7-t2-Q10",
        "topicId": "s9-g7-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion policy model leave unverified?",
        "answer": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "policy",
      "baseline": "OSPF adjacency is healthy but a route loses selection to another source.",
      "fault": "Troubleshooting restarts the neighbor instead of examining route preference.",
      "restore": "Inspect protocol routes, RIB selection and forwarding installation; change only the actual failing boundary.",
      "scope": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g7-t3",
    "batch": "24",
    "title": "Data Plane",
    "subtitle": "A route is present but an egress policy drops the required flow.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g7-t3",
    "definition": "The data plane forwards or drops traffic using installed state and policy; end-to-end observations must match the packet, direction and actual path.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A route is present but an egress policy drops the required flow. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between FIB, ACL match, Counter. Define the source, destination, protocol and packet properties. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. May differ from control-plane intent. Order and context affect the result. Aggregate increments may include unrelated traffic. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "FIB: Installed forwarding information. May differ from control-plane intent.",
      "ACL match: Packet-policy decision. Order and context affect the result.",
      "Counter: Recorded event count. Aggregate increments may include unrelated traffic."
    ],
    "mechanism": [
      "Define the source, destination, protocol and packet properties.",
      "Trace ingress policy, lookup and egress handling.",
      "Correlate counters or captures with a controlled positive and negative test."
    ],
    "flow": [
      [
        "Operation and scope",
        "A route is present but an egress policy drops the required flow."
      ],
      [
        "FIB",
        "Define the source, destination, protocol and packet properties."
      ],
      [
        "ACL match",
        "Trace ingress policy, lookup and egress handling."
      ],
      [
        "Counter",
        "Correlate counters or captures with a controlled positive and negative test."
      ]
    ],
    "comparison": [
      [
        "FIB",
        "Installed forwarding information",
        "May differ from control-plane intent"
      ],
      [
        "ACL match",
        "Packet-policy decision",
        "Order and context affect the result"
      ],
      [
        "Counter",
        "Recorded event count",
        "Aggregate increments may include unrelated traffic"
      ]
    ],
    "example": "Worked incident: A route is present but an egress policy drops the required flow. Failure: The operator treats a valid route as proof the application should work. Recovery: Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow. The key distinction is illustrated by this question: Does a route prove packet delivery? No. Policy, MTU, adjacency and the return path can fail. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g7-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define the source, destination, protocol and packet properties. Trace ingress policy, lookup and egress handling. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The operator treats a valid route as proof the application should work. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Correlate counters or captures with a controlled positive and negative test. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. May differ from control-plane intent. Aggregate increments may include unrelated traffic. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Trace ingress policy, lookup and egress handling. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
    "troubleshooting": [
      [
        "The operator treats a valid route as proof the application should work.",
        "Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow."
      ],
      [
        "Why inspect return traffic?",
        "Many operations require bidirectional exchange. One-way forwarding is incomplete."
      ],
      [
        "Can aggregate counters identify one test?",
        "Not alone. Use timing and narrowly scoped observations."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Policy, MTU, adjacency and the return path can fail.",
      "One-way forwarding is incomplete.",
      "Use timing and narrowly scoped observations.",
      "A protocol name alone may not describe every context.",
      "May differ from control-plane intent.",
      "Aggregate increments may include unrelated traffic."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g7-t2"
    ],
    "related": [
      "s9-g8-t0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Data Plane failure with an explicit evidence boundary. A route is present but an egress policy drops the required flow.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "FIB → Installed forwarding information",
        "ACL match → Packet-policy decision",
        "Counter → Recorded event count"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A route is present but an egress policy drops the required flow.",
        "Write a prediction before revealing the baseline explanation. Define the source, destination, protocol and packet properties.",
        "Select Fault and locate the first broken handoff. The operator treats a valid route as proof the application should work.",
        "Propose one observation that could disprove your diagnosis. Why inspect return traffic?",
        "Select Recovery and compare with the required result. Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The operator treats a valid route as proof the application should work. The role of the traffic and processing path.",
      "challenge": "What separates data from management traffic? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "FIB": "Installed forwarding information. May differ from control-plane intent.",
      "ACL match": "Packet-policy decision. Order and context affect the result.",
      "Counter": "Recorded event count. Aggregate increments may include unrelated traffic."
    },
    "sources": [
      {
        "title": "Cisco IOS XE hardening: management, control and data planes",
        "url": "https://sec.cloudapps.cisco.com/security/center/resources/IOS_XE_hardening",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g7-t3-QC1",
        "topicId": "s9-g7-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Data Plane.",
        "answer": "The data plane forwards or drops traffic using installed state and policy; end-to-end observations must match the packet, direction and actual path.",
        "explanation": "Define the source, destination, protocol and packet properties.",
        "testedConcept": "FIB"
      },
      {
        "questionId": "s9-g7-t3-QC2",
        "topicId": "s9-g7-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Trace ingress policy, lookup and egress handling.",
        "explanation": "Order and context affect the result.",
        "testedConcept": "ACL match"
      },
      {
        "questionId": "s9-g7-t3-QC3",
        "topicId": "s9-g7-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow.",
        "explanation": "Correlate counters or captures with a controlled positive and negative test.",
        "testedConcept": "Counter"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g7-t3-Q1",
        "topicId": "s9-g7-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a route prove packet delivery?",
        "answer": "No.",
        "explanation": "Policy, MTU, adjacency and the return path can fail.",
        "testedConcept": "FIB"
      },
      {
        "questionId": "s9-g7-t3-Q2",
        "topicId": "s9-g7-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why inspect return traffic?",
        "answer": "Many operations require bidirectional exchange.",
        "explanation": "One-way forwarding is incomplete.",
        "testedConcept": "ACL match"
      },
      {
        "questionId": "s9-g7-t3-Q3",
        "topicId": "s9-g7-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can aggregate counters identify one test?",
        "answer": "Not alone.",
        "explanation": "Use timing and narrowly scoped observations.",
        "testedConcept": "Counter"
      },
      {
        "questionId": "s9-g7-t3-Q4",
        "topicId": "s9-g7-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What separates data from management traffic?",
        "answer": "The role of the traffic and processing path.",
        "explanation": "A protocol name alone may not describe every context.",
        "testedConcept": "FIB"
      },
      {
        "questionId": "s9-g7-t3-Q5",
        "topicId": "s9-g7-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Data Plane case.",
        "answer": "The operator treats a valid route as proof the application should work.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g7-t3-Q6",
        "topicId": "s9-g7-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Data Plane incident?",
        "answer": "Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g7-t3-Q7",
        "topicId": "s9-g7-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast FIB with ACL match.",
        "answer": "Installed forwarding information. Packet-policy decision.",
        "explanation": "May differ from control-plane intent. Order and context affect the result.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g7-t3-Q8",
        "topicId": "s9-g7-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Counter not establish the entire outcome?",
        "answer": "Aggregate increments may include unrelated traffic.",
        "explanation": "Correlate counters or captures with a controlled positive and negative test.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g7-t3-Q9",
        "topicId": "s9-g7-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A route is present but an egress policy drops the required flow. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g7-t3-Q10",
        "topicId": "s9-g7-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion policy model leave unverified?",
        "answer": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "policy",
      "baseline": "A route is present but an egress policy drops the required flow.",
      "fault": "The operator treats a valid route as proof the application should work.",
      "restore": "Inspect the actual packet path and policy match; restore the required flow while retaining the denied flow.",
      "scope": "A declared source-role, destination-role and service relation with explicit allowed flows and default deny. It does not implement a firewall, TCP state, routing, identity verification or packet forwarding."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t0",
    "batch": "24",
    "title": "Observability",
    "subtitle": "Latency rises after a dependency change while CPU remains normal.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t0",
    "definition": "Observability is the ability to investigate system behavior from emitted evidence; metrics, logs and traces answer complementary questions with known coverage limits.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. Latency rises after a dependency change while CPU remains normal. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Signal, Correlation, Hypothesis. Start from a user-visible symptom and time window. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Missing signal is not proof of health. Time and identity must align. A graph correlation is not causation. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Signal: Recorded observation. Missing signal is not proof of health.",
      "Correlation: Link across observations. Time and identity must align.",
      "Hypothesis: Testable explanation. A graph correlation is not causation."
    ],
    "mechanism": [
      "Start from a user-visible symptom and time window.",
      "Correlate metrics, logs and traces by service and request context.",
      "Test a causal hypothesis and record remaining blind spots."
    ],
    "flow": [
      [
        "Operation and scope",
        "Latency rises after a dependency change while CPU remains normal."
      ],
      [
        "Signal",
        "Start from a user-visible symptom and time window."
      ],
      [
        "Correlation",
        "Correlate metrics, logs and traces by service and request context."
      ],
      [
        "Hypothesis",
        "Test a causal hypothesis and record remaining blind spots."
      ]
    ],
    "comparison": [
      [
        "Signal",
        "Recorded observation",
        "Missing signal is not proof of health"
      ],
      [
        "Correlation",
        "Link across observations",
        "Time and identity must align"
      ],
      [
        "Hypothesis",
        "Testable explanation",
        "A graph correlation is not causation"
      ]
    ],
    "example": "Worked incident: Latency rises after a dependency change while CPU remains normal. Failure: Investigation stops because the infrastructure dashboard is green. Recovery: Trace slow requests to the dependency and compare latency and error signals with the change window. The key distinction is illustrated by this question: How differs monitoring from observability? Monitoring checks selected known conditions; observability supports investigating behavior from evidence. The practices overlap. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t0",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Start from a user-visible symptom and time window. Correlate metrics, logs and traces by service and request context. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Investigation stops because the infrastructure dashboard is green. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Trace slow requests to the dependency and compare latency and error signals with the change window.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Test a causal hypothesis and record remaining blind spots. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Missing signal is not proof of health. A graph correlation is not causation. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Correlate metrics, logs and traces by service and request context. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "Investigation stops because the infrastructure dashboard is green.",
        "Trace slow requests to the dependency and compare latency and error signals with the change window."
      ],
      [
        "Why align clocks?",
        "Misordered events can produce a false causal story. Retain timestamp provenance."
      ],
      [
        "Does no trace mean no failure?",
        "No; sampling or instrumentation may omit it. Coverage is part of interpretation."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "The practices overlap.",
      "Retain timestamp provenance.",
      "Coverage is part of interpretation.",
      "A vague suspicion cannot guide a decisive check.",
      "Missing signal is not proof of health.",
      "A graph correlation is not causation."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g7-t3"
    ],
    "related": [
      "s9-g8-t1"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Observability failure with an explicit evidence boundary. Latency rises after a dependency change while CPU remains normal.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Signal → Recorded observation",
        "Correlation → Link across observations",
        "Hypothesis → Testable explanation"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. Latency rises after a dependency change while CPU remains normal.",
        "Write a prediction before revealing the baseline explanation. Start from a user-visible symptom and time window.",
        "Select Fault and locate the first broken handoff. Investigation stops because the infrastructure dashboard is green.",
        "Propose one observation that could disprove your diagnosis. Why align clocks?",
        "Select Recovery and compare with the required result. Trace slow requests to the dependency and compare latency and error signals with the change window.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Trace slow requests to the dependency and compare latency and error signals with the change window. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Investigation stops because the infrastructure dashboard is green. A predicted observation that could disprove it.",
      "challenge": "What makes a hypothesis useful? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Signal": "Recorded observation. Missing signal is not proof of health.",
      "Correlation": "Link across observations. Time and identity must align.",
      "Hypothesis": "Testable explanation. A graph correlation is not causation."
    },
    "sources": [
      {
        "title": "OpenTelemetry signal concepts",
        "url": "https://opentelemetry.io/docs/concepts/signals/",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t0-QC1",
        "topicId": "s9-g8-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Observability.",
        "answer": "Observability is the ability to investigate system behavior from emitted evidence; metrics, logs and traces answer complementary questions with known coverage limits.",
        "explanation": "Start from a user-visible symptom and time window.",
        "testedConcept": "Signal"
      },
      {
        "questionId": "s9-g8-t0-QC2",
        "topicId": "s9-g8-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Correlate metrics, logs and traces by service and request context.",
        "explanation": "Time and identity must align.",
        "testedConcept": "Correlation"
      },
      {
        "questionId": "s9-g8-t0-QC3",
        "topicId": "s9-g8-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Trace slow requests to the dependency and compare latency and error signals with the change window.",
        "explanation": "Test a causal hypothesis and record remaining blind spots.",
        "testedConcept": "Hypothesis"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t0-Q1",
        "topicId": "s9-g8-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How differs monitoring from observability?",
        "answer": "Monitoring checks selected known conditions; observability supports investigating behavior from evidence.",
        "explanation": "The practices overlap.",
        "testedConcept": "Signal"
      },
      {
        "questionId": "s9-g8-t0-Q2",
        "topicId": "s9-g8-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why align clocks?",
        "answer": "Misordered events can produce a false causal story.",
        "explanation": "Retain timestamp provenance.",
        "testedConcept": "Correlation"
      },
      {
        "questionId": "s9-g8-t0-Q3",
        "topicId": "s9-g8-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does no trace mean no failure?",
        "answer": "No; sampling or instrumentation may omit it.",
        "explanation": "Coverage is part of interpretation.",
        "testedConcept": "Hypothesis"
      },
      {
        "questionId": "s9-g8-t0-Q4",
        "topicId": "s9-g8-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What makes a hypothesis useful?",
        "answer": "A predicted observation that could disprove it.",
        "explanation": "A vague suspicion cannot guide a decisive check.",
        "testedConcept": "Signal"
      },
      {
        "questionId": "s9-g8-t0-Q5",
        "topicId": "s9-g8-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Observability case.",
        "answer": "Investigation stops because the infrastructure dashboard is green.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t0-Q6",
        "topicId": "s9-g8-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Observability incident?",
        "answer": "Trace slow requests to the dependency and compare latency and error signals with the change window.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t0-Q7",
        "topicId": "s9-g8-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Signal with Correlation.",
        "answer": "Recorded observation. Link across observations.",
        "explanation": "Missing signal is not proof of health. Time and identity must align.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t0-Q8",
        "topicId": "s9-g8-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Hypothesis not establish the entire outcome?",
        "answer": "A graph correlation is not causation.",
        "explanation": "Test a causal hypothesis and record remaining blind spots.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t0-Q9",
        "topicId": "s9-g8-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "Latency rises after a dependency change while CPU remains normal. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t0-Q10",
        "topicId": "s9-g8-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "Latency rises after a dependency change while CPU remains normal.",
      "fault": "Investigation stops because the infrastructure dashboard is green.",
      "restore": "Trace slow requests to the dependency and compare latency and error signals with the change window.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t1",
    "batch": "24",
    "title": "Monitoring",
    "subtitle": "A probe stops reporting and the dashboard shows its last green value.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t1",
    "definition": "Monitoring evaluates selected signals against operational expectations and routes actionable alerts to owners; alert quality depends on user impact and response design.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A probe stops reporting and the dashboard shows its last green value. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between SLI, Threshold, Alert route. Define a meaningful service signal and evaluation window. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Definition controls what is counted. Static limits can miss context. An unowned alert is not an operational control. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "SLI: Measured service behavior. Definition controls what is counted.",
      "Threshold: Condition for attention. Static limits can miss context.",
      "Alert route: Owner and escalation path. An unowned alert is not an operational control."
    ],
    "mechanism": [
      "Define a meaningful service signal and evaluation window.",
      "Set actionable conditions and test missing-data behavior.",
      "Exercise notification, diagnosis and recovery before relying on the alert."
    ],
    "flow": [
      [
        "Operation and scope",
        "A probe stops reporting and the dashboard shows its last green value."
      ],
      [
        "SLI",
        "Define a meaningful service signal and evaluation window."
      ],
      [
        "Threshold",
        "Set actionable conditions and test missing-data behavior."
      ],
      [
        "Alert route",
        "Exercise notification, diagnosis and recovery before relying on the alert."
      ]
    ],
    "comparison": [
      [
        "SLI",
        "Measured service behavior",
        "Definition controls what is counted"
      ],
      [
        "Threshold",
        "Condition for attention",
        "Static limits can miss context"
      ],
      [
        "Alert route",
        "Owner and escalation path",
        "An unowned alert is not an operational control"
      ]
    ],
    "example": "Worked incident: A probe stops reporting and the dashboard shows its last green value. Failure: The absence of new samples is treated as continued health. Recovery: Add freshness detection, mark unknown state explicitly and test the notification path. The key distinction is illustrated by this question: Why alert on symptoms? They indicate user impact and urgency. Internal causes can aid diagnosis without every one paging. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t1",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define a meaningful service signal and evaluation window. Set actionable conditions and test missing-data behavior. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The absence of new samples is treated as continued health. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Add freshness detection, mark unknown state explicitly and test the notification path.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Exercise notification, diagnosis and recovery before relying on the alert. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Definition controls what is counted. An unowned alert is not an operational control. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Set actionable conditions and test missing-data behavior. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "The absence of new samples is treated as continued health.",
        "Add freshness detection, mark unknown state explicitly and test the notification path."
      ],
      [
        "What does stale green mean?",
        "Only that a prior observation was healthy. Freshness must be visible."
      ],
      [
        "What should an alert contain?",
        "Affected service, time, impact, owner and a usable runbook. A metric name alone slows response."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Internal causes can aid diagnosis without every one paging.",
      "Freshness must be visible.",
      "A metric name alone slows response.",
      "Delivery is a separate dependency.",
      "Definition controls what is counted.",
      "An unowned alert is not an operational control."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t0"
    ],
    "related": [
      "s9-g8-t2"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Monitoring failure with an explicit evidence boundary. A probe stops reporting and the dashboard shows its last green value.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "SLI → Measured service behavior",
        "Threshold → Condition for attention",
        "Alert route → Owner and escalation path"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A probe stops reporting and the dashboard shows its last green value.",
        "Write a prediction before revealing the baseline explanation. Define a meaningful service signal and evaluation window.",
        "Select Fault and locate the first broken handoff. The absence of new samples is treated as continued health.",
        "Propose one observation that could disprove your diagnosis. What does stale green mean?",
        "Select Recovery and compare with the required result. Add freshness detection, mark unknown state explicitly and test the notification path.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Add freshness detection, mark unknown state explicitly and test the notification path. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The absence of new samples is treated as continued health. A correct rule can still fail to reach an operator.",
      "challenge": "Why test the notification route? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "SLI": "Measured service behavior. Definition controls what is counted.",
      "Threshold": "Condition for attention. Static limits can miss context.",
      "Alert route": "Owner and escalation path. An unowned alert is not an operational control."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t1-QC1",
        "topicId": "s9-g8-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Monitoring.",
        "answer": "Monitoring evaluates selected signals against operational expectations and routes actionable alerts to owners; alert quality depends on user impact and response design.",
        "explanation": "Define a meaningful service signal and evaluation window.",
        "testedConcept": "SLI"
      },
      {
        "questionId": "s9-g8-t1-QC2",
        "topicId": "s9-g8-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Set actionable conditions and test missing-data behavior.",
        "explanation": "Static limits can miss context.",
        "testedConcept": "Threshold"
      },
      {
        "questionId": "s9-g8-t1-QC3",
        "topicId": "s9-g8-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Add freshness detection, mark unknown state explicitly and test the notification path.",
        "explanation": "Exercise notification, diagnosis and recovery before relying on the alert.",
        "testedConcept": "Alert route"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t1-Q1",
        "topicId": "s9-g8-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why alert on symptoms?",
        "answer": "They indicate user impact and urgency.",
        "explanation": "Internal causes can aid diagnosis without every one paging.",
        "testedConcept": "SLI"
      },
      {
        "questionId": "s9-g8-t1-Q2",
        "topicId": "s9-g8-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does stale green mean?",
        "answer": "Only that a prior observation was healthy.",
        "explanation": "Freshness must be visible.",
        "testedConcept": "Threshold"
      },
      {
        "questionId": "s9-g8-t1-Q3",
        "topicId": "s9-g8-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should an alert contain?",
        "answer": "Affected service, time, impact, owner and a usable runbook.",
        "explanation": "A metric name alone slows response.",
        "testedConcept": "Alert route"
      },
      {
        "questionId": "s9-g8-t1-Q4",
        "topicId": "s9-g8-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test the notification route?",
        "answer": "A correct rule can still fail to reach an operator.",
        "explanation": "Delivery is a separate dependency.",
        "testedConcept": "SLI"
      },
      {
        "questionId": "s9-g8-t1-Q5",
        "topicId": "s9-g8-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Monitoring case.",
        "answer": "The absence of new samples is treated as continued health.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t1-Q6",
        "topicId": "s9-g8-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Monitoring incident?",
        "answer": "Add freshness detection, mark unknown state explicitly and test the notification path.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t1-Q7",
        "topicId": "s9-g8-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast SLI with Threshold.",
        "answer": "Measured service behavior. Condition for attention.",
        "explanation": "Definition controls what is counted. Static limits can miss context.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t1-Q8",
        "topicId": "s9-g8-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Alert route not establish the entire outcome?",
        "answer": "An unowned alert is not an operational control.",
        "explanation": "Exercise notification, diagnosis and recovery before relying on the alert.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t1-Q9",
        "topicId": "s9-g8-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A probe stops reporting and the dashboard shows its last green value. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t1-Q10",
        "topicId": "s9-g8-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "A probe stops reporting and the dashboard shows its last green value.",
      "fault": "The absence of new samples is treated as continued health.",
      "restore": "Add freshness detection, mark unknown state explicitly and test the notification path.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t2",
    "batch": "24",
    "title": "Logging",
    "subtitle": "An API failure log includes the entire Authorization header.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t2",
    "definition": "Logs are timestamped event records that support investigation and audit; structure, correlation, retention and redaction determine their usefulness.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An API failure log includes the entire Authorization header. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Event, Structured field, Retention. Emit events with severity, identity and sanitized context. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. A missing event may reflect collection loss. Stable names aid queries. Access and deletion rules still apply. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Event: Recorded occurrence. A missing event may reflect collection loss.",
      "Structured field: Machine-readable attribute. Stable names aid queries.",
      "Retention: How long evidence remains available. Access and deletion rules still apply."
    ],
    "mechanism": [
      "Emit events with severity, identity and sanitized context.",
      "Transport and store them with loss and freshness monitoring.",
      "Query a bounded incident window and correlate with other evidence."
    ],
    "flow": [
      [
        "Operation and scope",
        "An API failure log includes the entire Authorization header."
      ],
      [
        "Event",
        "Emit events with severity, identity and sanitized context."
      ],
      [
        "Structured field",
        "Transport and store them with loss and freshness monitoring."
      ],
      [
        "Retention",
        "Query a bounded incident window and correlate with other evidence."
      ]
    ],
    "comparison": [
      [
        "Event",
        "Recorded occurrence",
        "A missing event may reflect collection loss"
      ],
      [
        "Structured field",
        "Machine-readable attribute",
        "Stable names aid queries"
      ],
      [
        "Retention",
        "How long evidence remains available",
        "Access and deletion rules still apply"
      ]
    ],
    "example": "Worked incident: An API failure log includes the entire Authorization header. Failure: An operational log becomes a credential exposure. Recovery: Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain. The key distinction is illustrated by this question: Why prefer structured fields? They avoid brittle parsing of free text. Message wording can evolve independently. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t2",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Emit events with severity, identity and sanitized context. Transport and store them with loss and freshness monitoring. Preserve a baseline and review the smallest concrete diff. In this case the failure is: An operational log becomes a credential exposure. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Query a bounded incident window and correlate with other evidence. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. A missing event may reflect collection loss. Access and deletion rules still apply. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Transport and store them with loss and freshness monitoring. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "An operational log becomes a credential exposure.",
        "Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain."
      ],
      [
        "Does debug logging always help?",
        "No; volume and secrets can create new problems. Use bounded targeted detail."
      ],
      [
        "Why preserve both event and ingestion time?",
        "Transport delay can reorder arrival. Incident ordering needs the original timestamp context."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Message wording can evolve independently.",
      "Use bounded targeted detail.",
      "Incident ordering needs the original timestamp context.",
      "Removing every field prevents investigation.",
      "A missing event may reflect collection loss.",
      "Access and deletion rules still apply."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t1"
    ],
    "related": [
      "s9-g8-t3"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Logging failure with an explicit evidence boundary. An API failure log includes the entire Authorization header.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Event → Recorded occurrence",
        "Structured field → Machine-readable attribute",
        "Retention → How long evidence remains available"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An API failure log includes the entire Authorization header.",
        "Write a prediction before revealing the baseline explanation. Emit events with severity, identity and sanitized context.",
        "Select Fault and locate the first broken handoff. An operational log becomes a credential exposure.",
        "Propose one observation that could disprove your diagnosis. Does debug logging always help?",
        "Select Recovery and compare with the required result. Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "An operational log becomes a credential exposure. Both secret absence and diagnostic usefulness.",
      "challenge": "What should be tested after redaction? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Event": "Recorded occurrence. A missing event may reflect collection loss.",
      "Structured field": "Machine-readable attribute. Stable names aid queries.",
      "Retention": "How long evidence remains available. Access and deletion rules still apply."
    },
    "sources": [
      {
        "title": "OpenTelemetry signal concepts",
        "url": "https://opentelemetry.io/docs/concepts/signals/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t2-QC1",
        "topicId": "s9-g8-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Logging.",
        "answer": "Logs are timestamped event records that support investigation and audit; structure, correlation, retention and redaction determine their usefulness.",
        "explanation": "Emit events with severity, identity and sanitized context.",
        "testedConcept": "Event"
      },
      {
        "questionId": "s9-g8-t2-QC2",
        "topicId": "s9-g8-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Transport and store them with loss and freshness monitoring.",
        "explanation": "Stable names aid queries.",
        "testedConcept": "Structured field"
      },
      {
        "questionId": "s9-g8-t2-QC3",
        "topicId": "s9-g8-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain.",
        "explanation": "Query a bounded incident window and correlate with other evidence.",
        "testedConcept": "Retention"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t2-Q1",
        "topicId": "s9-g8-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why prefer structured fields?",
        "answer": "They avoid brittle parsing of free text.",
        "explanation": "Message wording can evolve independently.",
        "testedConcept": "Event"
      },
      {
        "questionId": "s9-g8-t2-Q2",
        "topicId": "s9-g8-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does debug logging always help?",
        "answer": "No; volume and secrets can create new problems.",
        "explanation": "Use bounded targeted detail.",
        "testedConcept": "Structured field"
      },
      {
        "questionId": "s9-g8-t2-Q3",
        "topicId": "s9-g8-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why preserve both event and ingestion time?",
        "answer": "Transport delay can reorder arrival.",
        "explanation": "Incident ordering needs the original timestamp context.",
        "testedConcept": "Retention"
      },
      {
        "questionId": "s9-g8-t2-Q4",
        "topicId": "s9-g8-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should be tested after redaction?",
        "answer": "Both secret absence and diagnostic usefulness.",
        "explanation": "Removing every field prevents investigation.",
        "testedConcept": "Event"
      },
      {
        "questionId": "s9-g8-t2-Q5",
        "topicId": "s9-g8-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Logging case.",
        "answer": "An operational log becomes a credential exposure.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t2-Q6",
        "topicId": "s9-g8-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Logging incident?",
        "answer": "Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t2-Q7",
        "topicId": "s9-g8-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Event with Structured field.",
        "answer": "Recorded occurrence. Machine-readable attribute.",
        "explanation": "A missing event may reflect collection loss. Stable names aid queries.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t2-Q8",
        "topicId": "s9-g8-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Retention not establish the entire outcome?",
        "answer": "Access and deletion rules still apply.",
        "explanation": "Query a bounded incident window and correlate with other evidence.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t2-Q9",
        "topicId": "s9-g8-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An API failure log includes the entire Authorization header. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t2-Q10",
        "topicId": "s9-g8-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "An API failure log includes the entire Authorization header.",
      "fault": "An operational log becomes a credential exposure.",
      "restore": "Redact secrets at emission, revoke the exposed credential and verify that useful correlation fields remain.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t3",
    "batch": "24",
    "title": "Metrics",
    "subtitle": "A service labels every metric with a unique request ID.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t3",
    "definition": "Metrics summarize measured quantities over time; type, units, aggregation and label cardinality determine whether the resulting calculations are meaningful.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A service labels every metric with a unique request ID. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Counter, Gauge, Histogram. Define units, labels and the measurement population. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Use reset-aware rates. Averages can conceal peaks. Quantile accuracy depends on bucket design. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Counter: Cumulative quantity. Use reset-aware rates.",
      "Gauge: Instantaneous value. Averages can conceal peaks.",
      "Histogram: Distribution by buckets. Quantile accuracy depends on bucket design."
    ],
    "mechanism": [
      "Define units, labels and the measurement population.",
      "Collect with explicit intervals and reset behavior.",
      "Aggregate compatible series and compare distributions as well as averages."
    ],
    "flow": [
      [
        "Operation and scope",
        "A service labels every metric with a unique request ID."
      ],
      [
        "Counter",
        "Define units, labels and the measurement population."
      ],
      [
        "Gauge",
        "Collect with explicit intervals and reset behavior."
      ],
      [
        "Histogram",
        "Aggregate compatible series and compare distributions as well as averages."
      ]
    ],
    "comparison": [
      [
        "Counter",
        "Cumulative quantity",
        "Use reset-aware rates"
      ],
      [
        "Gauge",
        "Instantaneous value",
        "Averages can conceal peaks"
      ],
      [
        "Histogram",
        "Distribution by buckets",
        "Quantile accuracy depends on bucket design"
      ]
    ],
    "example": "Worked incident: A service labels every metric with a unique request ID. Failure: Series count grows with each request and exhausts the monitoring budget. Recovery: Keep bounded dimensions on metrics and use logs or traces for per-request identity. The key distinction is illustrated by this question: Why not average per-host percentiles? Percentiles are not generally composable that way. Use compatible distributions for aggregate estimates. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t3",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Define units, labels and the measurement population. Collect with explicit intervals and reset behavior. Preserve a baseline and review the smallest concrete diff. In this case the failure is: Series count grows with each request and exhausts the monitoring budget. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Keep bounded dimensions on metrics and use logs or traces for per-request identity.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Aggregate compatible series and compare distributions as well as averages. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Use reset-aware rates. Quantile accuracy depends on bucket design. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Collect with explicit intervals and reset behavior. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "Series count grows with each request and exhausts the monitoring budget.",
        "Keep bounded dimensions on metrics and use logs or traces for per-request identity."
      ],
      [
        "How should counter resets be handled?",
        "By reset-aware rate logic. Naive subtraction can create negative rates."
      ],
      [
        "What is cardinality?",
        "The number of distinct label combinations producing series. Unbounded labels can be expensive."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Use compatible distributions for aggregate estimates.",
      "Naive subtraction can create negative rates.",
      "Unbounded labels can be expensive.",
      "A correct calculation with wrong units misleads.",
      "Use reset-aware rates.",
      "Quantile accuracy depends on bucket design."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t2"
    ],
    "related": [
      "s9-g8-t4"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Metrics failure with an explicit evidence boundary. A service labels every metric with a unique request ID.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Counter → Cumulative quantity",
        "Gauge → Instantaneous value",
        "Histogram → Distribution by buckets"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A service labels every metric with a unique request ID.",
        "Write a prediction before revealing the baseline explanation. Define units, labels and the measurement population.",
        "Select Fault and locate the first broken handoff. Series count grows with each request and exhausts the monitoring budget.",
        "Propose one observation that could disprove your diagnosis. How should counter resets be handled?",
        "Select Recovery and compare with the required result. Keep bounded dimensions on metrics and use logs or traces for per-request identity.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Keep bounded dimensions on metrics and use logs or traces for per-request identity. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "Series count grows with each request and exhausts the monitoring budget. Bytes, bits and durations are not interchangeable.",
      "challenge": "Why state units? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Counter": "Cumulative quantity. Use reset-aware rates.",
      "Gauge": "Instantaneous value. Averages can conceal peaks.",
      "Histogram": "Distribution by buckets. Quantile accuracy depends on bucket design."
    },
    "sources": [
      {
        "title": "OpenTelemetry signal concepts",
        "url": "https://opentelemetry.io/docs/concepts/signals/",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t3-QC1",
        "topicId": "s9-g8-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Metrics.",
        "answer": "Metrics summarize measured quantities over time; type, units, aggregation and label cardinality determine whether the resulting calculations are meaningful.",
        "explanation": "Define units, labels and the measurement population.",
        "testedConcept": "Counter"
      },
      {
        "questionId": "s9-g8-t3-QC2",
        "topicId": "s9-g8-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Collect with explicit intervals and reset behavior.",
        "explanation": "Averages can conceal peaks.",
        "testedConcept": "Gauge"
      },
      {
        "questionId": "s9-g8-t3-QC3",
        "topicId": "s9-g8-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Keep bounded dimensions on metrics and use logs or traces for per-request identity.",
        "explanation": "Aggregate compatible series and compare distributions as well as averages.",
        "testedConcept": "Histogram"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t3-Q1",
        "topicId": "s9-g8-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why not average per-host percentiles?",
        "answer": "Percentiles are not generally composable that way.",
        "explanation": "Use compatible distributions for aggregate estimates.",
        "testedConcept": "Counter"
      },
      {
        "questionId": "s9-g8-t3-Q2",
        "topicId": "s9-g8-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How should counter resets be handled?",
        "answer": "By reset-aware rate logic.",
        "explanation": "Naive subtraction can create negative rates.",
        "testedConcept": "Gauge"
      },
      {
        "questionId": "s9-g8-t3-Q3",
        "topicId": "s9-g8-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is cardinality?",
        "answer": "The number of distinct label combinations producing series.",
        "explanation": "Unbounded labels can be expensive.",
        "testedConcept": "Histogram"
      },
      {
        "questionId": "s9-g8-t3-Q4",
        "topicId": "s9-g8-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why state units?",
        "answer": "Bytes, bits and durations are not interchangeable.",
        "explanation": "A correct calculation with wrong units misleads.",
        "testedConcept": "Counter"
      },
      {
        "questionId": "s9-g8-t3-Q5",
        "topicId": "s9-g8-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Metrics case.",
        "answer": "Series count grows with each request and exhausts the monitoring budget.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t3-Q6",
        "topicId": "s9-g8-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Metrics incident?",
        "answer": "Keep bounded dimensions on metrics and use logs or traces for per-request identity.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t3-Q7",
        "topicId": "s9-g8-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Counter with Gauge.",
        "answer": "Cumulative quantity. Instantaneous value.",
        "explanation": "Use reset-aware rates. Averages can conceal peaks.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t3-Q8",
        "topicId": "s9-g8-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Histogram not establish the entire outcome?",
        "answer": "Quantile accuracy depends on bucket design.",
        "explanation": "Aggregate compatible series and compare distributions as well as averages.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t3-Q9",
        "topicId": "s9-g8-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A service labels every metric with a unique request ID. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t3-Q10",
        "topicId": "s9-g8-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "A service labels every metric with a unique request ID.",
      "fault": "Series count grows with each request and exhausts the monitoring budget.",
      "restore": "Keep bounded dimensions on metrics and use logs or traces for per-request identity.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t4",
    "batch": "24",
    "title": "Tracing",
    "subtitle": "An inbound request calls a database through an uninstrumented client.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t4",
    "definition": "Distributed tracing records spans of work linked by propagated context, allowing a request’s path and dependency timing to be investigated.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An inbound request calls a database through an uninstrumented client. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Trace, Span, Context propagation. Create spans around meaningful operations. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Sampling may omit requests. Timing does not automatically establish causation. Missing propagation breaks the chain. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Trace: Related spans for one execution. Sampling may omit requests.",
      "Span: Timed unit of work. Timing does not automatically establish causation.",
      "Context propagation: Carry trace identity across boundaries. Missing propagation breaks the chain."
    ],
    "mechanism": [
      "Create spans around meaningful operations.",
      "Propagate context through supported service boundaries.",
      "Inspect slow and failed traces while accounting for sampling and clock limits."
    ],
    "flow": [
      [
        "Operation and scope",
        "An inbound request calls a database through an uninstrumented client."
      ],
      [
        "Trace",
        "Create spans around meaningful operations."
      ],
      [
        "Span",
        "Propagate context through supported service boundaries."
      ],
      [
        "Context propagation",
        "Inspect slow and failed traces while accounting for sampling and clock limits."
      ]
    ],
    "comparison": [
      [
        "Trace",
        "Related spans for one execution",
        "Sampling may omit requests"
      ],
      [
        "Span",
        "Timed unit of work",
        "Timing does not automatically establish causation"
      ],
      [
        "Context propagation",
        "Carry trace identity across boundaries",
        "Missing propagation breaks the chain"
      ]
    ],
    "example": "Worked incident: An inbound request calls a database through an uninstrumented client. Failure: The trace shows unexplained parent time without a dependency span. Recovery: Instrument the boundary and propagate context; verify the resulting relationship with a controlled request. The key distinction is illustrated by this question: Does a trace contain every request? Not necessarily. Sampling policy determines coverage. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t4",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Create spans around meaningful operations. Propagate context through supported service boundaries. Preserve a baseline and review the smallest concrete diff. In this case the failure is: The trace shows unexplained parent time without a dependency span. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Instrument the boundary and propagate context; verify the resulting relationship with a controlled request.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Inspect slow and failed traces while accounting for sampling and clock limits. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Sampling may omit requests. Missing propagation breaks the chain. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Propagate context through supported service boundaries. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
    "troubleshooting": [
      [
        "The trace shows unexplained parent time without a dependency span.",
        "Instrument the boundary and propagate context; verify the resulting relationship with a controlled request."
      ],
      [
        "Can trace IDs be metric labels?",
        "Usually avoid this unbounded dimension. Use dedicated trace correlation."
      ],
      [
        "Why distinguish parent time from child sums?",
        "Work can overlap or remain uninstrumented. Simple subtraction can mislead."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Sampling policy determines coverage.",
      "Use dedicated trace correlation.",
      "Simple subtraction can mislead.",
      "Document blind spots rather than assuming completeness.",
      "Sampling may omit requests.",
      "Missing propagation breaks the chain."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t3"
    ],
    "related": [
      "s9-g8-t5"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Tracing failure with an explicit evidence boundary. An inbound request calls a database through an uninstrumented client.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Trace → Related spans for one execution",
        "Span → Timed unit of work",
        "Context propagation → Carry trace identity across boundaries"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An inbound request calls a database through an uninstrumented client.",
        "Write a prediction before revealing the baseline explanation. Create spans around meaningful operations.",
        "Select Fault and locate the first broken handoff. The trace shows unexplained parent time without a dependency span.",
        "Propose one observation that could disprove your diagnosis. Can trace IDs be metric labels?",
        "Select Recovery and compare with the required result. Instrument the boundary and propagate context; verify the resulting relationship with a controlled request.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Instrument the boundary and propagate context; verify the resulting relationship with a controlled request. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "The trace shows unexplained parent time without a dependency span. The evidence required for the investigation within resource limits.",
      "challenge": "What should sampling preserve? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Trace": "Related spans for one execution. Sampling may omit requests.",
      "Span": "Timed unit of work. Timing does not automatically establish causation.",
      "Context propagation": "Carry trace identity across boundaries. Missing propagation breaks the chain."
    },
    "sources": [
      {
        "title": "OpenTelemetry signal concepts",
        "url": "https://opentelemetry.io/docs/concepts/signals/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t4-QC1",
        "topicId": "s9-g8-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Tracing.",
        "answer": "Distributed tracing records spans of work linked by propagated context, allowing a request’s path and dependency timing to be investigated.",
        "explanation": "Create spans around meaningful operations.",
        "testedConcept": "Trace"
      },
      {
        "questionId": "s9-g8-t4-QC2",
        "topicId": "s9-g8-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Propagate context through supported service boundaries.",
        "explanation": "Timing does not automatically establish causation.",
        "testedConcept": "Span"
      },
      {
        "questionId": "s9-g8-t4-QC3",
        "topicId": "s9-g8-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Instrument the boundary and propagate context; verify the resulting relationship with a controlled request.",
        "explanation": "Inspect slow and failed traces while accounting for sampling and clock limits.",
        "testedConcept": "Context propagation"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t4-Q1",
        "topicId": "s9-g8-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a trace contain every request?",
        "answer": "Not necessarily.",
        "explanation": "Sampling policy determines coverage.",
        "testedConcept": "Trace"
      },
      {
        "questionId": "s9-g8-t4-Q2",
        "topicId": "s9-g8-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can trace IDs be metric labels?",
        "answer": "Usually avoid this unbounded dimension.",
        "explanation": "Use dedicated trace correlation.",
        "testedConcept": "Span"
      },
      {
        "questionId": "s9-g8-t4-Q3",
        "topicId": "s9-g8-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why distinguish parent time from child sums?",
        "answer": "Work can overlap or remain uninstrumented.",
        "explanation": "Simple subtraction can mislead.",
        "testedConcept": "Context propagation"
      },
      {
        "questionId": "s9-g8-t4-Q4",
        "topicId": "s9-g8-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should sampling preserve?",
        "answer": "The evidence required for the investigation within resource limits.",
        "explanation": "Document blind spots rather than assuming completeness.",
        "testedConcept": "Trace"
      },
      {
        "questionId": "s9-g8-t4-Q5",
        "topicId": "s9-g8-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Tracing case.",
        "answer": "The trace shows unexplained parent time without a dependency span.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t4-Q6",
        "topicId": "s9-g8-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Tracing incident?",
        "answer": "Instrument the boundary and propagate context; verify the resulting relationship with a controlled request.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t4-Q7",
        "topicId": "s9-g8-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Trace with Span.",
        "answer": "Related spans for one execution. Timed unit of work.",
        "explanation": "Sampling may omit requests. Timing does not automatically establish causation.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t4-Q8",
        "topicId": "s9-g8-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Context propagation not establish the entire outcome?",
        "answer": "Missing propagation breaks the chain.",
        "explanation": "Inspect slow and failed traces while accounting for sampling and clock limits.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t4-Q9",
        "topicId": "s9-g8-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An inbound request calls a database through an uninstrumented client. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t4-Q10",
        "topicId": "s9-g8-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion budget model leave unverified?",
        "answer": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "budget",
      "baseline": "An inbound request calls a database through an uninstrumented client.",
      "fault": "The trace shows unexplained parent time without a dependency span.",
      "restore": "Instrument the boundary and propagate context; verify the resulting relationship with a controlled request.",
      "scope": "A bounded work estimate: target count multiplied by maximum attempts gives calls; dividing by supplied calls/second gives an ideal lower-bound duration. It omits latency, backoff, concurrency overhead and server behavior. No requests are sent."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t5",
    "batch": "24",
    "title": "Capacity Planning",
    "subtitle": "A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t5",
    "definition": "Capacity planning forecasts required resources under growth and failure scenarios using measured workload behavior, headroom and provisioning lead time.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Demand, Headroom, Lead time. Measure the bottleneck resource and representative peaks. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Average utilization can hide bursts. It must be quantified for the chosen constraint. Procurement completion is not service readiness. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Demand: Required service work. Average utilization can hide bursts.",
      "Headroom: Reserved usable capacity. It must be quantified for the chosen constraint.",
      "Lead time: Time to add usable capacity. Procurement completion is not service readiness."
    ],
    "mechanism": [
      "Measure the bottleneck resource and representative peaks.",
      "Project demand under an explicit growth assumption and failure state.",
      "Trigger expansion early enough to test capacity before the limit is reached."
    ],
    "flow": [
      [
        "Operation and scope",
        "A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure."
      ],
      [
        "Demand",
        "Measure the bottleneck resource and representative peaks."
      ],
      [
        "Headroom",
        "Project demand under an explicit growth assumption and failure state."
      ],
      [
        "Lead time",
        "Trigger expansion early enough to test capacity before the limit is reached."
      ]
    ],
    "comparison": [
      [
        "Demand",
        "Required service work",
        "Average utilization can hide bursts"
      ],
      [
        "Headroom",
        "Reserved usable capacity",
        "It must be quantified for the chosen constraint"
      ],
      [
        "Lead time",
        "Time to add usable capacity",
        "Procurement completion is not service readiness"
      ]
    ],
    "example": "Worked incident: A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure. Failure: A six-month procurement starts only when utilization reaches the limit. Recovery: Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty. The key distinction is illustrated by this question: Is CPU the only capacity constraint? No; memory, IOPS, bandwidth, licenses or staff can constrain service. Measure the limiting resource. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t5",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Measure the bottleneck resource and representative peaks. Project demand under an explicit growth assumption and failure state. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A six-month procurement starts only when utilization reaches the limit. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Trigger expansion early enough to test capacity before the limit is reached. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Average utilization can hide bursts. Procurement completion is not service readiness. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Project demand under an explicit growth assumption and failure state. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
    "troubleshooting": [
      [
        "A six-month procurement starts only when utilization reaches the limit.",
        "Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty."
      ],
      [
        "What is the linear runway here?",
        "Six months before 100 units at five additional units per month. This assumes unchanged linear growth."
      ],
      [
        "Why model a failed state?",
        "Normal aggregate capacity can disappear during an outage. Resilience needs survivor capacity."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Measure the limiting resource.",
      "This assumes unchanged linear growth.",
      "Resilience needs survivor capacity.",
      "Track error and update assumptions with measurements.",
      "Average utilization can hide bursts.",
      "Procurement completion is not service readiness."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t4"
    ],
    "related": [
      "s9-g8-t6"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Capacity Planning failure with an explicit evidence boundary. A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Demand → Required service work",
        "Headroom → Reserved usable capacity",
        "Lead time → Time to add usable capacity"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure.",
        "Write a prediction before revealing the baseline explanation. Measure the bottleneck resource and representative peaks.",
        "Select Fault and locate the first broken handoff. A six-month procurement starts only when utilization reaches the limit.",
        "Propose one observation that could disprove your diagnosis. What is the linear runway here?",
        "Select Recovery and compare with the required result. Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A six-month procurement starts only when utilization reaches the limit. No.",
      "challenge": "Does a forecast guarantee demand? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Demand": "Required service work. Average utilization can hide bursts.",
      "Headroom": "Reserved usable capacity. It must be quantified for the chosen constraint.",
      "Lead time": "Time to add usable capacity. Procurement completion is not service readiness."
    },
    "sources": [
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t5-QC1",
        "topicId": "s9-g8-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Capacity Planning.",
        "answer": "Capacity planning forecasts required resources under growth and failure scenarios using measured workload behavior, headroom and provisioning lead time.",
        "explanation": "Measure the bottleneck resource and representative peaks.",
        "testedConcept": "Demand"
      },
      {
        "questionId": "s9-g8-t5-QC2",
        "topicId": "s9-g8-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Project demand under an explicit growth assumption and failure state.",
        "explanation": "It must be quantified for the chosen constraint.",
        "testedConcept": "Headroom"
      },
      {
        "questionId": "s9-g8-t5-QC3",
        "topicId": "s9-g8-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty.",
        "explanation": "Trigger expansion early enough to test capacity before the limit is reached.",
        "testedConcept": "Lead time"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t5-Q1",
        "topicId": "s9-g8-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is CPU the only capacity constraint?",
        "answer": "No; memory, IOPS, bandwidth, licenses or staff can constrain service.",
        "explanation": "Measure the limiting resource.",
        "testedConcept": "Demand"
      },
      {
        "questionId": "s9-g8-t5-Q2",
        "topicId": "s9-g8-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the linear runway here?",
        "answer": "Six months before 100 units at five additional units per month.",
        "explanation": "This assumes unchanged linear growth.",
        "testedConcept": "Headroom"
      },
      {
        "questionId": "s9-g8-t5-Q3",
        "topicId": "s9-g8-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why model a failed state?",
        "answer": "Normal aggregate capacity can disappear during an outage.",
        "explanation": "Resilience needs survivor capacity.",
        "testedConcept": "Lead time"
      },
      {
        "questionId": "s9-g8-t5-Q4",
        "topicId": "s9-g8-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a forecast guarantee demand?",
        "answer": "No.",
        "explanation": "Track error and update assumptions with measurements.",
        "testedConcept": "Demand"
      },
      {
        "questionId": "s9-g8-t5-Q5",
        "topicId": "s9-g8-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Capacity Planning case.",
        "answer": "A six-month procurement starts only when utilization reaches the limit.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t5-Q6",
        "topicId": "s9-g8-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Capacity Planning incident?",
        "answer": "Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t5-Q7",
        "topicId": "s9-g8-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Demand with Headroom.",
        "answer": "Required service work. Reserved usable capacity.",
        "explanation": "Average utilization can hide bursts. It must be quantified for the chosen constraint.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t5-Q8",
        "topicId": "s9-g8-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Lead time not establish the entire outcome?",
        "answer": "Procurement completion is not service readiness.",
        "explanation": "Trigger expansion early enough to test capacity before the limit is reached.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t5-Q9",
        "topicId": "s9-g8-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t5-Q10",
        "topicId": "s9-g8-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion capacity model leave unverified?",
        "answer": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "capacity",
      "baseline": "A cluster uses 70 units now, grows 5 units per month and has 100 usable units after one failure.",
      "fault": "A six-month procurement starts only when utilization reaches the limit.",
      "restore": "Recognize the six-month linear runway and start earlier with a margin for validation and forecast uncertainty.",
      "scope": "Homogeneous survivor-capacity envelope: (nodes minus failed nodes) times (capacity minus reserve) compared with aggregate demand in common abstract units. It does not model placement, quorum, replication or latency."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "s9-g8-t6",
    "batch": "24",
    "title": "Infrastructure Lifecycle Management",
    "subtitle": "An old appliance is powered off but its credentials and DNS remain active.",
    "level": "Foundation → Controlled operations",
    "minutes": 45,
    "interactive": "aa-s9-g8-t6",
    "definition": "Infrastructure lifecycle management plans acquisition, operation, upgrades and retirement with support, security, dependency and data-handling responsibilities.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. An old appliance is powered off but its credentials and DNS remain active. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Support window, Upgrade plan, Retirement. Inventory versions, owners and dependencies with support evidence. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. Dates and entitlements require verification. Compatibility includes dependent systems. Power-off alone leaves records and credentials. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Support window: Period of available maintenance. Dates and entitlements require verification.",
      "Upgrade plan: Controlled transition to a tested version. Compatibility includes dependent systems.",
      "Retirement: Removal of service and residual access. Power-off alone leaves records and credentials."
    ],
    "mechanism": [
      "Inventory versions, owners and dependencies with support evidence.",
      "Test an upgrade and its recovery path before a staged rollout.",
      "Retire data, access, addresses and records under the approved retention policy."
    ],
    "flow": [
      [
        "Operation and scope",
        "An old appliance is powered off but its credentials and DNS remain active."
      ],
      [
        "Support window",
        "Inventory versions, owners and dependencies with support evidence."
      ],
      [
        "Upgrade plan",
        "Test an upgrade and its recovery path before a staged rollout."
      ],
      [
        "Retirement",
        "Retire data, access, addresses and records under the approved retention policy."
      ]
    ],
    "comparison": [
      [
        "Support window",
        "Period of available maintenance",
        "Dates and entitlements require verification"
      ],
      [
        "Upgrade plan",
        "Controlled transition to a tested version",
        "Compatibility includes dependent systems"
      ],
      [
        "Retirement",
        "Removal of service and residual access",
        "Power-off alone leaves records and credentials"
      ]
    ],
    "example": "Worked incident: An old appliance is powered off but its credentials and DNS remain active. Failure: A replacement or reused address inherits stale access assumptions. Recovery: Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record. The key distinction is illustrated by this question: Why verify support dates rather than assume age? Vendor policy and entitlement vary. An old or new release is not automatically supported. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-evidence.py --topic s9-g8-t6",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Inventory versions, owners and dependencies with support evidence. Test an upgrade and its recovery path before a staged rollout. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A replacement or reused address inherits stale access assumptions. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Retire data, access, addresses and records under the approved retention policy. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. Dates and entitlements require verification. Power-off alone leaves records and credentials. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Test an upgrade and its recovery path before a staged rollout. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A replacement or reused address inherits stale access assumptions.",
        "Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record."
      ],
      [
        "What should an upgrade test cover?",
        "Dependencies, data compatibility, service behavior and recovery. Boot success is too narrow."
      ],
      [
        "Can rollback always downgrade a data format?",
        "No. Migration compatibility must be tested or a restore path retained."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "An old or new release is not automatically supported.",
      "Boot success is too narrow.",
      "Migration compatibility must be tested or a restore path retained.",
      "Disposal needs an auditable owner.",
      "Dates and entitlements require verification.",
      "Power-off alone leaves records and credentials."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t5"
    ],
    "related": [
      "lab-9"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Infrastructure Lifecycle Management failure with an explicit evidence boundary. An old appliance is powered off but its credentials and DNS remain active.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Support window → Period of available maintenance",
        "Upgrade plan → Controlled transition to a tested version",
        "Retirement → Removal of service and residual access"
      ],
      "steps": [
        "Read the case and identify intent, owner, observer and target scope. An old appliance is powered off but its credentials and DNS remain active.",
        "Write a prediction before revealing the baseline explanation. Inventory versions, owners and dependencies with support evidence.",
        "Select Fault and locate the first broken handoff. A replacement or reused address inherits stale access assumptions.",
        "Propose one observation that could disprove your diagnosis. What should an upgrade test cover?",
        "Select Recovery and compare with the required result. Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record.",
        "Change one input in the companion model and explain exactly what it computes. Reset it and retain its stated limitation.",
        "Run the local evidence command and label the output authored; for lab-9 retain actual local execution evidence separately.",
        "For an optional platform extension, use the cited installed-version contract, a canary and an independently tested recovery path. Record positive and negative postconditions; stop if identity, scope or partial state differs from the approved plan."
      ],
      "verification": "Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record. Record baseline, fault and recovery separately with revision, observer and timestamp; do not infer remote execution from a browser control.",
      "troubleshooting": "A replacement or reused address inherits stale access assumptions. Verified removal of service, residual data, access and authoritative records.",
      "challenge": "What completes retirement? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Support window": "Period of available maintenance. Dates and entitlements require verification.",
      "Upgrade plan": "Controlled transition to a tested version. Compatibility includes dependent systems.",
      "Retirement": "Removal of service and residual access. Power-off alone leaves records and credentials."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE monitoring distributed systems",
        "url": "https://sre.google/sre-book/monitoring-distributed-systems/",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s9-g8-t6-QC1",
        "topicId": "s9-g8-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Infrastructure Lifecycle Management.",
        "answer": "Infrastructure lifecycle management plans acquisition, operation, upgrades and retirement with support, security, dependency and data-handling responsibilities.",
        "explanation": "Inventory versions, owners and dependencies with support evidence.",
        "testedConcept": "Support window"
      },
      {
        "questionId": "s9-g8-t6-QC2",
        "topicId": "s9-g8-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Test an upgrade and its recovery path before a staged rollout.",
        "explanation": "Compatibility includes dependent systems.",
        "testedConcept": "Upgrade plan"
      },
      {
        "questionId": "s9-g8-t6-QC3",
        "topicId": "s9-g8-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record.",
        "explanation": "Retire data, access, addresses and records under the approved retention policy.",
        "testedConcept": "Retirement"
      }
    ],
    "exams": [
      {
        "questionId": "s9-g8-t6-Q1",
        "topicId": "s9-g8-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why verify support dates rather than assume age?",
        "answer": "Vendor policy and entitlement vary.",
        "explanation": "An old or new release is not automatically supported.",
        "testedConcept": "Support window"
      },
      {
        "questionId": "s9-g8-t6-Q2",
        "topicId": "s9-g8-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What should an upgrade test cover?",
        "answer": "Dependencies, data compatibility, service behavior and recovery.",
        "explanation": "Boot success is too narrow.",
        "testedConcept": "Upgrade plan"
      },
      {
        "questionId": "s9-g8-t6-Q3",
        "topicId": "s9-g8-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can rollback always downgrade a data format?",
        "answer": "No.",
        "explanation": "Migration compatibility must be tested or a restore path retained.",
        "testedConcept": "Retirement"
      },
      {
        "questionId": "s9-g8-t6-Q4",
        "topicId": "s9-g8-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What completes retirement?",
        "answer": "Verified removal of service, residual data, access and authoritative records.",
        "explanation": "Disposal needs an auditable owner.",
        "testedConcept": "Support window"
      },
      {
        "questionId": "s9-g8-t6-Q5",
        "topicId": "s9-g8-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Infrastructure Lifecycle Management case.",
        "answer": "A replacement or reused address inherits stale access assumptions.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "s9-g8-t6-Q6",
        "topicId": "s9-g8-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Infrastructure Lifecycle Management incident?",
        "answer": "Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "s9-g8-t6-Q7",
        "topicId": "s9-g8-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Support window with Upgrade plan.",
        "answer": "Period of available maintenance. Controlled transition to a tested version.",
        "explanation": "Dates and entitlements require verification. Compatibility includes dependent systems.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "s9-g8-t6-Q8",
        "topicId": "s9-g8-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Retirement not establish the entire outcome?",
        "answer": "Power-off alone leaves records and credentials.",
        "explanation": "Retire data, access, addresses and records under the approved retention policy.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "s9-g8-t6-Q9",
        "topicId": "s9-g8-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "An old appliance is powered off but its credentials and DNS remain active. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "s9-g8-t6-Q10",
        "topicId": "s9-g8-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "An old appliance is powered off but its credentials and DNS remain active.",
      "fault": "A replacement or reused address inherits stale access assumptions.",
      "restore": "Revoke retired identities, reconcile DNS and IPAM, sanitize data and retain the retirement record.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      }
    ]
  },
  {
    "id": "lab-9",
    "batch": "24",
    "title": "Architecture design rehearsal",
    "subtitle": "A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO.",
    "level": "Foundation → Controlled operations",
    "minutes": 100,
    "interactive": "aa-lab-9",
    "definition": "An architecture rehearsal connects approved intent, generated configuration, policy, capacity and recovery evidence into one reproducible service design.",
    "purpose": "Apply this concept to a bounded infrastructure operation whose result another operator can reproduce. A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO. The outcome is correct state with preserved access boundaries and recoverability, not merely a completed script.",
    "mental": "Follow the handoff between Intent revision, Validation gate, Recovery record. Design two sites with management, application and data zones and explicit owners. Then ask which evidence is produced at each boundary and who is responsible for interpreting it. It must match the executed artifact. A passing gate has a specific scope. Local file restoration is not enterprise failover. A helpful analogy is a reviewed work order: the order describes intent, the executor performs an action, and a separate inspection checks the result. None of these stages can substitute for the others.",
    "components": [
      "Intent revision: Identified approved design input. It must match the executed artifact.",
      "Validation gate: Condition required before change. A passing gate has a specific scope.",
      "Recovery record: Evidence of restoration and cleanup. Local file restoration is not enterprise failover."
    ],
    "mechanism": [
      "Design two sites with management, application and data zones and explicit owners.",
      "Validate intent, render a deterministic plan and rehearse a guarded change in owned local files.",
      "Inject drift and interruption, restore exact bytes and submit the remaining real-platform test plan."
    ],
    "flow": [
      [
        "Operation and scope",
        "A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO."
      ],
      [
        "Intent revision",
        "Design two sites with management, application and data zones and explicit owners."
      ],
      [
        "Validation gate",
        "Validate intent, render a deterministic plan and rehearse a guarded change in owned local files."
      ],
      [
        "Recovery record",
        "Inject drift and interruption, restore exact bytes and submit the remaining real-platform test plan."
      ]
    ],
    "comparison": [
      [
        "Intent revision",
        "Identified approved design input",
        "It must match the executed artifact"
      ],
      [
        "Validation gate",
        "Condition required before change",
        "A passing gate has a specific scope"
      ],
      [
        "Recovery record",
        "Evidence of restoration and cleanup",
        "Local file restoration is not enterprise failover"
      ]
    ],
    "example": "Worked incident: A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO. Failure: A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step. Recovery: Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims. The key distinction is illustrated by this question: Which evidence is actually executed here? Python validation, local rendering, guarded file changes, hashing and cleanup. Remote devices and enterprise services are not deployed. Record which values are supplied assumptions and which would need observation on a real target.",
    "commands": [
      {
        "filename": "offline-evidence.txt",
        "platform": "Python 3.10+ standard library; run from course root",
        "code": "python labs/automation-lab.py --run",
        "explanation": "The topic inspector reads authored cases without network calls or writes. The integrated lab instead executes validation, deterministic rendering and guarded file changes inside a fresh owned temporary directory.",
        "expected": "Topic inspector: JSON marked AUTHORED, with the topic identity, mechanism and incident. Integrated lab: PASS with actual local-file evidence, idempotent second apply, stale-write rejection, byte restoration and cleanup."
      }
    ],
    "configuration": "Identify the authoritative input and the affected resource before proposing a change. Design two sites with management, application and data zones and explicit owners. Validate intent, render a deterministic plan and rehearse a guarded change in owned local files. Preserve a baseline and review the smallest concrete diff. In this case the failure is: A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step. Do not deploy a guessed platform command from a conceptual description. Pin external library and platform versions, use the linked exact contract and test the operation in an owned disposable environment. Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims.",
    "production": "Define an owner, change scope, acceptance test and recovery budget. Inject drift and interruption, restore exact bytes and submit the remaining real-platform test plan. Retain per-target outcomes and distinguish failed, unreachable, rejected and unknown-completion states. Stage changes through a canary and stop expansion when the observed result differs from the plan. Record the input revision and rendered artifact identity so a later operator can determine exactly what was attempted. Parallel execution does not remove dependency ordering or partial failure.",
    "security": "Restrict automation identities to required actions and verify the peer before sending credentials. It must match the executed artifact. Local file restoration is not enterprise failover. Keep secrets out of inventories, examples, diffs and evidence logs; store only references or sanitized metadata. Test an intentionally denied action as well as the intended positive action. A recovery that broadens access beyond the approved policy is not accepted. Review untrusted data before it reaches a template, shell or privileged deployment runner.",
    "performance": "Measure the relevant operation and its time window instead of assuming faster execution is better. Validate intent, render a deterministic plan and rehearse a guarded change in owned local files. Bound concurrency, retries and resource consumption; separate queueing, processing and dependency delays where observable. Tail latency and missing data may matter more than a healthy average. This lesson’s separate companion has a deliberately narrower scope: Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
    "troubleshooting": [
      [
        "A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step.",
        "Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims."
      ],
      [
        "What binds design to execution?",
        "The validated intent revision and artifact digest. A mutable filename is insufficient."
      ],
      [
        "What must the architecture submission include?",
        "Topology, authority map, policy matrix, failure domains, recovery budget, runbook and observed local evidence. The original enterprise objective remains a design and guided extension."
      ],
      [
        "A tool reports success but the service does not meet intent",
        "Check target identity, revision and postcondition first. A successful transport, render or process exit is evidence only for that stage. Preserve unknown completion rather than retrying a possibly applied write blindly."
      ]
    ],
    "mistakes": [
      "Remote devices and enterprise services are not deployed.",
      "A mutable filename is insufficient.",
      "The original enterprise objective remains a design and guided extension.",
      "An interruption must not become an unexplained success.",
      "It must match the executed artifact.",
      "Local file restoration is not enterprise failover."
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "prerequisites": [
      "s9-g8-t6"
    ],
    "related": [
      "device-0"
    ],
    "lab": {
      "objective": "Diagnose and recover the stated Architecture design rehearsal failure with an explicit evidence boundary. A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO.",
      "requirements": "Browser and notes for the authored worksheet; Python 3.10+ for the inspector and integrated local lab. External tool or vendor execution is optional guided work requiring a separately supported owned target, pinned dependencies and a captured baseline.",
      "topology": [
        "Git revision → schema validation → deterministic render → reviewed plan → canary → verification",
        "Site A: edge / management / application / data zones",
        "Site B: edge / management / application / data zones",
        "Shared dependencies: identity, DNS, time, observability, backup keys and operator access",
        "Recovery path: independent management → restore data and configuration → validate client operation"
      ],
      "steps": [
        "Read labs/automation-architecture.md and complete its original enterprise design deliverables.",
        "Run python labs/automation-lab.py --run. It creates no server, VM or network device.",
        "Inspect actual schema rejection, rendered hash, first change, second no-op and stale-write rejection.",
        "Inspect the synthetic policy, survivor capacity and serial recovery budgets separately from actual file operations.",
        "Run python labs/automation-lab.py --run --inject-failure applied. Expect INTERRUPTED, exit 2, restored true and cleaned true.",
        "Repeat with validated, drifted and restored interruption phases. Each run owns a fresh temporary directory.",
        "Use the guided extension to version intent in an owned repository and reproduce the design on a compatible disposable platform. Pin tools, retain diffs, validate allowed and denied flows and exercise recovery.",
        "Submit the topology, policy and authority matrices, capacity/RTO/RPO assumptions, executable evidence, rollback runbook and a list of remote operations not executed."
      ],
      "verification": "Normal run returns PASS with changed true, secondChanged false, staleRejected true, restored true and cleaned true. Intentional interruptions return INTERRUPTED and exit 2 while still restoring and cleaning. The synthetic design budgets are calculations; real routing, HA, service recovery and platform deployment remain unexecuted.",
      "troubleshooting": "A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step. Restored baseline, verified bytes, removed owned temporary files and an explicit incomplete status.",
      "challenge": "What closes an interrupted run? Add a concurrent actor or shared dependency and explain how acceptance changes.",
      "cleanup": "Reset browser inputs. The inspector performs no writes. The integrated local lab restores and removes only its own temporary directory, including intentional interruption. Optional platform work must restore the captured owned baseline and confirm service state before removing temporary artifacts."
    },
    "glossary": {
      "Intent revision": "Identified approved design input. It must match the executed artifact.",
      "Validation gate": "Condition required before change. A passing gate has a specific scope.",
      "Recovery record": "Evidence of restoration and cleanup. Local file restoration is not enterprise failover."
    },
    "sources": [
      {
        "title": "Python 3.12 tutorial and standard library",
        "url": "https://docs.python.org/3.12/tutorial/",
        "checked": "2026-10-09"
      },
      {
        "title": "Pro Git 2nd edition",
        "url": "https://git-scm.com/book/en/v2",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "lab-9-QC1",
        "topicId": "lab-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "State the purpose of Architecture design rehearsal.",
        "answer": "An architecture rehearsal connects approved intent, generated configuration, policy, capacity and recovery evidence into one reproducible service design.",
        "explanation": "Design two sites with management, application and data zones and explicit owners.",
        "testedConcept": "Intent revision"
      },
      {
        "questionId": "lab-9-QC2",
        "topicId": "lab-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the second handoff in this mechanism?",
        "answer": "Validate intent, render a deterministic plan and rehearse a guarded change in owned local files.",
        "explanation": "A passing gate has a specific scope.",
        "testedConcept": "Validation gate"
      },
      {
        "questionId": "lab-9-QC3",
        "topicId": "lab-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation would you require after recovery?",
        "answer": "Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims.",
        "explanation": "Inject drift and interruption, restore exact bytes and submit the remaining real-platform test plan.",
        "testedConcept": "Recovery record"
      }
    ],
    "exams": [
      {
        "questionId": "lab-9-Q1",
        "topicId": "lab-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which evidence is actually executed here?",
        "answer": "Python validation, local rendering, guarded file changes, hashing and cleanup.",
        "explanation": "Remote devices and enterprise services are not deployed.",
        "testedConcept": "Intent revision"
      },
      {
        "questionId": "lab-9-Q2",
        "topicId": "lab-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What binds design to execution?",
        "answer": "The validated intent revision and artifact digest.",
        "explanation": "A mutable filename is insufficient.",
        "testedConcept": "Validation gate"
      },
      {
        "questionId": "lab-9-Q3",
        "topicId": "lab-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must the architecture submission include?",
        "answer": "Topology, authority map, policy matrix, failure domains, recovery budget, runbook and observed local evidence.",
        "explanation": "The original enterprise objective remains a design and guided extension.",
        "testedConcept": "Recovery record"
      },
      {
        "questionId": "lab-9-Q4",
        "topicId": "lab-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What closes an interrupted run?",
        "answer": "Restored baseline, verified bytes, removed owned temporary files and an explicit incomplete status.",
        "explanation": "An interruption must not become an unexplained success.",
        "testedConcept": "Intent revision"
      },
      {
        "questionId": "lab-9-Q5",
        "topicId": "lab-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Identify the first failed boundary in this Architecture design rehearsal case.",
        "answer": "A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step.",
        "explanation": "Use the supplied observation to choose a testable hypothesis rather than repeating an entire deployment.",
        "testedConcept": "Fault localization"
      },
      {
        "questionId": "lab-9-Q6",
        "topicId": "lab-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence closes the Architecture design rehearsal incident?",
        "answer": "Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims.",
        "explanation": "Verify the original intended operation and an excluded operation; retain the result and its observer.",
        "testedConcept": "Recovery evidence"
      },
      {
        "questionId": "lab-9-Q7",
        "topicId": "lab-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Contrast Intent revision with Validation gate.",
        "answer": "Identified approved design input. Condition required before change.",
        "explanation": "It must match the executed artifact. A passing gate has a specific scope.",
        "testedConcept": "Concept comparison"
      },
      {
        "questionId": "lab-9-Q8",
        "topicId": "lab-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why does Recovery record not establish the entire outcome?",
        "answer": "Local file restoration is not enterprise failover.",
        "explanation": "Inject drift and interruption, restore exact bytes and submit the remaining real-platform test plan.",
        "testedConcept": "Boundary limit"
      },
      {
        "questionId": "lab-9-Q9",
        "topicId": "lab-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What evidence should be retained before changing this case?",
        "answer": "A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO. Record the exact input revision, observed baseline, target identity and tested recovery path.",
        "explanation": "A reproducible change requires a concrete starting state and an identified artifact, not only a narrative description.",
        "testedConcept": "Change provenance"
      },
      {
        "questionId": "lab-9-Q10",
        "topicId": "lab-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does the companion change model leave unverified?",
        "answer": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe.",
        "explanation": "Supplied-input calculations and declared gates cannot establish external execution or measured service behavior.",
        "testedConcept": "Model scope"
      }
    ],
    "automationArchitecture": {
      "kind": "change",
      "baseline": "A two-site enterprise design uses versioned intent, explicit allowed flows, surviving capacity and a 60-minute RTO with 15-minute RPO.",
      "fault": "A stale revision, invalid VLAN or under-capacity survivor is allowed past an unchecked deployment step.",
      "restore": "Reject invalid intent and stale revisions, verify a second apply is a no-op, restore the owned baseline and document unexecuted network and recovery claims.",
      "scope": "Four declared gates (valid input, approved revision, current baseline, recovery ready) permit a simulated change. The result is a checklist predicate, not authentication, a distributed lock, or proof that an external action is safe."
    },
    "artifacts": [
      {
        "title": "Batch 24 evidence workbook",
        "path": "labs/automation-24-workbook.md"
      },
      {
        "title": "Read-only incident inspector",
        "path": "labs/automation-evidence.py"
      },
      {
        "title": "Executable local architecture rehearsal",
        "path": "labs/automation-lab.py"
      },
      {
        "title": "Enterprise architecture design and guided extension",
        "path": "labs/automation-architecture.md"
      }
    ]
  }
];
