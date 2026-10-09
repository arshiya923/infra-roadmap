'use strict';
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['18']=[
  {
    "id": "s7-g5-t0",
    "batch": "18",
    "title": "Cisco ACI fundamentals",
    "subtitle": "Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t0",
    "definition": "Cisco Application Centric Infrastructure expresses connectivity through a policy model managed by APIC and realized by fabric switches. It is an alternative operating model to a standalone NX-OS EVPN fabric, not merely a new name for a VLAN configuration.",
    "purpose": "Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Define tenant context, endpoint groups and intended relationships in policy objects. The handoff to EPG is where a successful first observation can still lead to a failed transaction. Requires operational verification. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Policy intent: Declared desired relationships. Not proof of deployment.",
      "EPG: Endpoint group for common policy. Distinct from a subnet.",
      "Fabric realization: Switch state implementing intent. Requires operational verification."
    ],
    "mechanism": [
      "Define tenant context, endpoint groups and intended relationships in policy objects.",
      "APIC distributes the applicable intent and the switches realize supported forwarding and policy state.",
      "Packets traverse leaves and spines rather than APIC; verify deployed state and actual endpoint traffic separately from controller health."
    ],
    "flow": [
      [
        "Service boundary",
        "Cisco Application Centric Infrastructure expresses connectivity through a policy model managed by APIC and realized by fabric switches. It is an alternative operating model to a standalone NX-OS EVPN fabric, not merely a new name for a VLAN configuration."
      ],
      [
        "Policy intent",
        "Define tenant context, endpoint groups and intended relationships in policy objects."
      ],
      [
        "EPG",
        "APIC distributes the applicable intent and the switches realize supported forwarding and policy state."
      ],
      [
        "Fabric realization",
        "Packets traverse leaves and spines rather than APIC; verify deployed state and actual endpoint traffic separately from controller health."
      ]
    ],
    "comparison": [
      [
        "Policy intent",
        "Declared desired relationships",
        "Not proof of deployment."
      ],
      [
        "EPG",
        "Endpoint group for common policy",
        "Distinct from a subnet."
      ],
      [
        "Fabric realization",
        "Switch state implementing intent",
        "Requires operational verification."
      ]
    ],
    "example": "Baseline task: Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test. Incident: A contract object exists but no consumer/provider relationship connects the intended EPGs. Recovery requirement: Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH. Worked reasoning: Does every ACI packet pass through APIC? No; switches forward the traffic. Controller and packet paths are separate. Alternative check: What does an absent relationship between two EPGs mean in the enforced example? The proposed contract does not permit the flow. An unused contract object grants nothing.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Application Profiles\nAPIC GUI: Tenants > selected tenant > Contracts",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Policy intent and EPG. Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A contract object exists but no consumer/provider relationship connects the intended EPGs. Rollback must restore the exact baseline: Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test. Assign an owner for the first failing boundary and a separate owner for service acceptance. Packets traverse leaves and spines rather than APIC; verify deployed state and actual endpoint traffic separately from controller health. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A contract object exists but no consumer/provider relationship connects the intended EPGs.",
        "Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH."
      ],
      [
        "Is an EPG simply another name for an IP subnet?",
        "No. Policy grouping and addressing are distinct."
      ],
      [
        "Why keep denied SSH alongside allowed HTTPS?",
        "It checks that the policy is narrow. Connectivity alone can conceal over-permission."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Requires operational verification. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: EPG. APIC distributes the applicable intent and the switches realize supported forwarding and policy state. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Controller and packet paths are separate.",
      "Policy grouping and addressing are distinct.",
      "Intent is not realization.",
      "An unused contract object grants nothing.",
      "Connectivity alone can conceal over-permission.",
      "The operating model differs."
    ],
    "prerequisites": [
      "s7-g4-t2"
    ],
    "related": [
      "s7-g5-t1"
    ],
    "lab": {
      "objective": "Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A contract object exists but no consumer/provider relationship connects the intended EPGs.",
        "Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A contract object exists but no consumer/provider relationship connects the intended EPGs. It checks that the policy is narrow. Connectivity alone can conceal over-permission.",
      "challenge": "Can standalone NX-OS CLI recipes be applied unchanged to ACI? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Policy intent": "Declared desired relationships. Not proof of deployment.",
      "EPG": "Endpoint group for common policy. Distinct from a subnet.",
      "Fabric realization": "Switch state implementing intent. Requires operational verification."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t0-Q1",
        "topicId": "s7-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does every ACI packet pass through APIC?",
        "answer": "No; switches forward the traffic.",
        "explanation": "Controller and packet paths are separate.",
        "testedConcept": "Policy intent"
      },
      {
        "questionId": "s7-g5-t0-Q2",
        "topicId": "s7-g5-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is an EPG simply another name for an IP subnet?",
        "answer": "No.",
        "explanation": "Policy grouping and addressing are distinct.",
        "testedConcept": "EPG"
      },
      {
        "questionId": "s7-g5-t0-Q3",
        "topicId": "s7-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does an APIC object prove leaf enforcement is installed?",
        "answer": "No; deployment and endpoint tests remain.",
        "explanation": "Intent is not realization.",
        "testedConcept": "Fabric realization"
      },
      {
        "questionId": "s7-g5-t0-Q4",
        "topicId": "s7-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does an absent relationship between two EPGs mean in the enforced example?",
        "answer": "The proposed contract does not permit the flow.",
        "explanation": "An unused contract object grants nothing.",
        "testedConcept": "Policy intent"
      },
      {
        "questionId": "s7-g5-t0-Q5",
        "topicId": "s7-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why keep denied SSH alongside allowed HTTPS?",
        "answer": "It checks that the policy is narrow.",
        "explanation": "Connectivity alone can conceal over-permission.",
        "testedConcept": "EPG"
      },
      {
        "questionId": "s7-g5-t0-Q6",
        "topicId": "s7-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Can standalone NX-OS CLI recipes be applied unchanged to ACI?",
        "answer": "No; use the supported policy workflow.",
        "explanation": "The operating model differs.",
        "testedConcept": "Fabric realization"
      },
      {
        "questionId": "s7-g5-t0-Q7",
        "topicId": "s7-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Cisco ACI fundamentals incident, what is the failing evidence boundary?",
        "answer": "A contract object exists but no consumer/provider relationship connects the intended EPGs.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t0-Q8",
        "topicId": "s7-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Cisco ACI fundamentals incident?",
        "answer": "Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t0-Q9",
        "topicId": "s7-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Policy intent and EPG in this lesson.",
        "answer": "Declared desired relationships. Endpoint group for common policy.",
        "explanation": "Not proof of deployment. Distinct from a subnet.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t0-Q10",
        "topicId": "s7-g5-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Cisco ACI fundamentals would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t0-QC1",
        "topicId": "s7-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t0-QC2",
        "topicId": "s7-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "APIC distributes the applicable intent and the switches realize supported forwarding and policy state.",
        "explanation": "Distinct from a subnet.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t0-QC3",
        "topicId": "s7-g5-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Fabric realization: Switch state implementing intent. Requires operational verification.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Translate Web-to-App TCP 443 into endpoint classification, routing context and a scoped contract while retaining a denied SSH test.",
      "fault": "A contract object exists but no consumer/provider relationship connects the intended EPGs.",
      "restore": "Restore the intended relationship and validate leaf deployment plus allowed HTTPS and denied SSH.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t1",
    "batch": "18",
    "title": "APIC",
    "subtitle": "Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t1",
    "definition": "The Application Policy Infrastructure Controller manages ACI policy, configuration and operational visibility. An APIC cluster is important to management availability, but controllers are not ordinary packet-forwarding hops. Existing deployed state must be distinguished from future policy changes during a controller outage.",
    "purpose": "Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. The cluster maintains the policy model and coordinates supported configuration workflows. The handoff to Deployed state is where a successful first observation can still lead to a failed transaction. Separate from original traffic continuity. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "APIC cluster: Policy and management system. Not in the packet transit path.",
      "Deployed state: Policy realized on switches. Independent evidence from object existence.",
      "Management recovery: Restored policy control. Separate from original traffic continuity."
    ],
    "mechanism": [
      "The cluster maintains the policy model and coordinates supported configuration workflows.",
      "Fabric nodes receive applicable policy and retain operational forwarding state.",
      "Controller unavailability affects management and new changes; it does not by itself prove immediate loss of every already-established data path."
    ],
    "flow": [
      [
        "Service boundary",
        "The Application Policy Infrastructure Controller manages ACI policy, configuration and operational visibility. An APIC cluster is important to management availability, but controllers are not ordinary packet-forwarding hops. Existing deployed state must be distinguished from future policy changes during a controller outage."
      ],
      [
        "APIC cluster",
        "The cluster maintains the policy model and coordinates supported configuration workflows."
      ],
      [
        "Deployed state",
        "Fabric nodes receive applicable policy and retain operational forwarding state."
      ],
      [
        "Management recovery",
        "Controller unavailability affects management and new changes; it does not by itself prove immediate loss of every already-established data path."
      ]
    ],
    "comparison": [
      [
        "APIC cluster",
        "Policy and management system",
        "Not in the packet transit path."
      ],
      [
        "Deployed state",
        "Policy realized on switches",
        "Independent evidence from object existence."
      ],
      [
        "Management recovery",
        "Restored policy control",
        "Separate from original traffic continuity."
      ]
    ],
    "example": "Baseline task: Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario. Incident: APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost. Recovery requirement: Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow. Worked reasoning: Does APIC unreachability mean every existing flow stops immediately? No; existing deployed forwarding can continue. Management and forwarding dependencies differ. Alternative check: Why inspect leaf deployment separately from controller objects? The intended object may not be realized where endpoints attach. Intent can exist without usable enforcement.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: System > Controllers\nAPIC GUI: Tenants > selected tenant > Faults",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against APIC cluster and Deployed state. Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost. Rollback must restore the exact baseline: Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario. Assign an owner for the first failing boundary and a separate owner for service acceptance. Controller unavailability affects management and new changes; it does not by itself prove immediate loss of every already-established data path. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost.",
        "Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow."
      ],
      [
        "Can successful existing traffic prove new policy changes can be applied?",
        "No. The controller workflow may still be unavailable."
      ],
      [
        "Is the browser APIC checkbox a cluster simulator?",
        "No; it illustrates one management/data distinction. Quorum, shard health and recovery are excluded."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Separate from original traffic continuity. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Deployed state. Fabric nodes receive applicable policy and retain operational forwarding state. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Management and forwarding dependencies differ.",
      "The controller workflow may still be unavailable.",
      "A generic VM snapshot is not a universal supported recovery plan.",
      "Intent can exist without usable enforcement.",
      "Quorum, shard health and recovery are excluded.",
      "A login page alone is insufficient."
    ],
    "prerequisites": [
      "s7-g5-t0"
    ],
    "related": [
      "s7-g5-t2"
    ],
    "lab": {
      "objective": "Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost.",
        "Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost. No; it illustrates one management/data distinction. Quorum, shard health and recovery are excluded.",
      "challenge": "What completes controller recovery verification? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "APIC cluster": "Policy and management system. Not in the packet transit path.",
      "Deployed state": "Policy realized on switches. Independent evidence from object existence.",
      "Management recovery": "Restored policy control. Separate from original traffic continuity."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t1-Q1",
        "topicId": "s7-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does APIC unreachability mean every existing flow stops immediately?",
        "answer": "No; existing deployed forwarding can continue.",
        "explanation": "Management and forwarding dependencies differ.",
        "testedConcept": "APIC cluster"
      },
      {
        "questionId": "s7-g5-t1-Q2",
        "topicId": "s7-g5-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can successful existing traffic prove new policy changes can be applied?",
        "answer": "No.",
        "explanation": "The controller workflow may still be unavailable.",
        "testedConcept": "Deployed state"
      },
      {
        "questionId": "s7-g5-t1-Q3",
        "topicId": "s7-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should be checked before a controller maintenance action?",
        "answer": "Supported cluster health, backup and recovery requirements.",
        "explanation": "A generic VM snapshot is not a universal supported recovery plan.",
        "testedConcept": "Management recovery"
      },
      {
        "questionId": "s7-g5-t1-Q4",
        "topicId": "s7-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect leaf deployment separately from controller objects?",
        "answer": "The intended object may not be realized where endpoints attach.",
        "explanation": "Intent can exist without usable enforcement.",
        "testedConcept": "APIC cluster"
      },
      {
        "questionId": "s7-g5-t1-Q5",
        "topicId": "s7-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is the browser APIC checkbox a cluster simulator?",
        "answer": "No; it illustrates one management/data distinction.",
        "explanation": "Quorum, shard health and recovery are excluded.",
        "testedConcept": "Deployed state"
      },
      {
        "questionId": "s7-g5-t1-Q6",
        "topicId": "s7-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What completes controller recovery verification?",
        "answer": "Supported management operations and preserved endpoint policy behavior.",
        "explanation": "A login page alone is insufficient.",
        "testedConcept": "Management recovery"
      },
      {
        "questionId": "s7-g5-t1-Q7",
        "topicId": "s7-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the APIC incident, what is the failing evidence boundary?",
        "answer": "APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t1-Q8",
        "topicId": "s7-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this APIC incident?",
        "answer": "Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t1-Q9",
        "topicId": "s7-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between APIC cluster and Deployed state in this lesson.",
        "answer": "Policy and management system. Policy realized on switches.",
        "explanation": "Not in the packet transit path. Independent evidence from object existence.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t1-Q10",
        "topicId": "s7-g5-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about APIC would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t1-QC1",
        "topicId": "s7-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t1-QC2",
        "topicId": "s7-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Fabric nodes receive applicable policy and retain operational forwarding state.",
        "explanation": "Independent evidence from object existence.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t1-QC3",
        "topicId": "s7-g5-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Management recovery: Restored policy control. Separate from original traffic continuity.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Record controller health, deployed policy and an existing endpoint flow as three separate observations before a maintenance scenario.",
      "fault": "APIC reachability is lost while policy is already deployed; the worksheet must not automatically declare all traffic lost.",
      "restore": "Restore management reachability and supported cluster health, then validate both policy operations and the original endpoint flow.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t2",
    "batch": "18",
    "title": "Spine",
    "subtitle": "Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t2",
    "definition": "An ACI spine provides fabric transit between leaves and participates in the fabric control architecture. It is not interchangeable with an endpoint-facing leaf, and its role should not be confused with the APIC policy-management role.",
    "purpose": "Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Leaves connect to spines to obtain the intended two-tier fabric paths. The handoff to COOP is where a successful first observation can still lead to a failed transaction. Capacity is a separate constraint. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Spine: Fabric transit role. Ordinary endpoints attach to leaves.",
      "COOP: ACI endpoint-location distribution mechanism. Different from standalone EVPN RT policy.",
      "Surviving path: Available leaf-to-leaf route. Capacity is a separate constraint."
    ],
    "mechanism": [
      "Leaves connect to spines to obtain the intended two-tier fabric paths.",
      "Spines provide transit and participate in endpoint-location distribution through the supported fabric mechanisms, including COOP.",
      "A spine loss changes available paths and capacity; the remaining topology and original service must still be verified."
    ],
    "flow": [
      [
        "Service boundary",
        "An ACI spine provides fabric transit between leaves and participates in the fabric control architecture. It is not interchangeable with an endpoint-facing leaf, and its role should not be confused with the APIC policy-management role."
      ],
      [
        "Spine",
        "Leaves connect to spines to obtain the intended two-tier fabric paths."
      ],
      [
        "COOP",
        "Spines provide transit and participate in endpoint-location distribution through the supported fabric mechanisms, including COOP."
      ],
      [
        "Surviving path",
        "A spine loss changes available paths and capacity; the remaining topology and original service must still be verified."
      ]
    ],
    "comparison": [
      [
        "Spine",
        "Fabric transit role",
        "Ordinary endpoints attach to leaves."
      ],
      [
        "COOP",
        "ACI endpoint-location distribution mechanism",
        "Different from standalone EVPN RT policy."
      ],
      [
        "Surviving path",
        "Available leaf-to-leaf route",
        "Capacity is a separate constraint."
      ]
    ],
    "example": "Baseline task: Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable. Incident: One spine is unavailable and the remaining uplink cannot carry the declared offered load. Recovery requirement: Restore the supported path or reduce demand, then check fabric health and the original endpoint operation. Worked reasoning: Where do ordinary workload endpoints attach in this ACI design? To leaves. Spines provide fabric transit. Alternative check: Does APIC act as a spare spine when one fails? No. Its role is policy management.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Fabric > Inventory > selected spine",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Spine and COOP. Restore the supported path or reduce demand, then check fabric health and the original endpoint operation. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: One spine is unavailable and the remaining uplink cannot carry the declared offered load. Rollback must restore the exact baseline: Restore the supported path or reduce demand, then check fabric health and the original endpoint operation. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable. Assign an owner for the first failing boundary and a separate owner for service acceptance. A spine loss changes available paths and capacity; the remaining topology and original service must still be verified. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "One spine is unavailable and the remaining uplink cannot carry the declared offered load.",
        "Restore the supported path or reduce demand, then check fabric health and the original endpoint operation."
      ],
      [
        "Does a surviving spine guarantee the workload fits?",
        "No; capacity and service evidence still matter. Topology availability is not capacity assurance."
      ],
      [
        "Why inspect every affected leaf after a spine fault?",
        "A leaf may have a missing or unhealthy remaining attachment. One successful pair does not cover the fabric."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Capacity is a separate constraint. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: COOP. Spines provide transit and participate in endpoint-location distribution through the supported fabric mechanisms, including COOP. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Spines provide fabric transit.",
      "Topology availability is not capacity assurance.",
      "They belong to different fabric control designs.",
      "Its role is policy management.",
      "One successful pair does not cover the fabric.",
      "It only illustrates a narrow inter-EPG relation."
    ],
    "prerequisites": [
      "s7-g5-t0"
    ],
    "related": [
      "s7-g5-t3"
    ],
    "lab": {
      "objective": "Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "One spine is unavailable and the remaining uplink cannot carry the declared offered load.",
        "Restore the supported path or reduce demand, then check fabric health and the original endpoint operation.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the supported path or reduce demand, then check fabric health and the original endpoint operation. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "One spine is unavailable and the remaining uplink cannot carry the declared offered load. A leaf may have a missing or unhealthy remaining attachment. One successful pair does not cover the fabric.",
      "challenge": "What is excluded from the policy worksheet for this lesson? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Spine": "Fabric transit role. Ordinary endpoints attach to leaves.",
      "COOP": "ACI endpoint-location distribution mechanism. Different from standalone EVPN RT policy.",
      "Surviving path": "Available leaf-to-leaf route. Capacity is a separate constraint."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t2-Q1",
        "topicId": "s7-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Where do ordinary workload endpoints attach in this ACI design?",
        "answer": "To leaves.",
        "explanation": "Spines provide fabric transit.",
        "testedConcept": "Spine"
      },
      {
        "questionId": "s7-g5-t2-Q2",
        "topicId": "s7-g5-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a surviving spine guarantee the workload fits?",
        "answer": "No; capacity and service evidence still matter.",
        "explanation": "Topology availability is not capacity assurance.",
        "testedConcept": "COOP"
      },
      {
        "questionId": "s7-g5-t2-Q3",
        "topicId": "s7-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is COOP identical to standalone MP-BGP EVPN route import?",
        "answer": "No.",
        "explanation": "They belong to different fabric control designs.",
        "testedConcept": "Surviving path"
      },
      {
        "questionId": "s7-g5-t2-Q4",
        "topicId": "s7-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does APIC act as a spare spine when one fails?",
        "answer": "No.",
        "explanation": "Its role is policy management.",
        "testedConcept": "Spine"
      },
      {
        "questionId": "s7-g5-t2-Q5",
        "topicId": "s7-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect every affected leaf after a spine fault?",
        "answer": "A leaf may have a missing or unhealthy remaining attachment.",
        "explanation": "One successful pair does not cover the fabric.",
        "testedConcept": "COOP"
      },
      {
        "questionId": "s7-g5-t2-Q6",
        "topicId": "s7-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What is excluded from the policy worksheet for this lesson?",
        "answer": "Actual spine routing, endpoint database and convergence behavior.",
        "explanation": "It only illustrates a narrow inter-EPG relation.",
        "testedConcept": "Surviving path"
      },
      {
        "questionId": "s7-g5-t2-Q7",
        "topicId": "s7-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Spine incident, what is the failing evidence boundary?",
        "answer": "One spine is unavailable and the remaining uplink cannot carry the declared offered load.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t2-Q8",
        "topicId": "s7-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Spine incident?",
        "answer": "Restore the supported path or reduce demand, then check fabric health and the original endpoint operation.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t2-Q9",
        "topicId": "s7-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Spine and COOP in this lesson.",
        "answer": "Fabric transit role. ACI endpoint-location distribution mechanism.",
        "explanation": "Ordinary endpoints attach to leaves. Different from standalone EVPN RT policy.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t2-Q10",
        "topicId": "s7-g5-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Spine would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t2-QC1",
        "topicId": "s7-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t2-QC2",
        "topicId": "s7-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Spines provide transit and participate in endpoint-location distribution through the supported fabric mechanisms, including COOP.",
        "explanation": "Different from standalone EVPN RT policy.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t2-QC3",
        "topicId": "s7-g5-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Surviving path: Available leaf-to-leaf route. Capacity is a separate constraint.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Trace a Web-to-App flow across two leaves and identify what is lost when one of the two spines becomes unavailable.",
      "fault": "One spine is unavailable and the remaining uplink cannot carry the declared offered load.",
      "restore": "Restore the supported path or reduce demand, then check fabric health and the original endpoint operation.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t3",
    "batch": "18",
    "title": "Leaf",
    "subtitle": "Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t3",
    "definition": "An ACI leaf attaches endpoints or supported external connectivity and realizes policy in the data path. Endpoint classification, forwarding context and deployed policy must agree before an application can communicate as intended.",
    "purpose": "Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. An access attachment associates an arriving endpoint with the configured policy context. The handoff to Endpoint learning is where a successful first observation can still lead to a failed transaction. Not equivalent to an APIC object. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Attachment: Port/domain/encapsulation association. Physical link alone does not classify correctly.",
      "Endpoint learning: Observed endpoint location. Can be stale or mapped incorrectly.",
      "Leaf policy: Realized forwarding permission. Not equivalent to an APIC object."
    ],
    "mechanism": [
      "An access attachment associates an arriving endpoint with the configured policy context.",
      "The leaf uses local/fabric endpoint information and bridge/routing context to select forwarding treatment.",
      "Switch hardware applies the relevant policy; endpoint delivery and a negative policy test validate more than discovery alone."
    ],
    "flow": [
      [
        "Service boundary",
        "An ACI leaf attaches endpoints or supported external connectivity and realizes policy in the data path. Endpoint classification, forwarding context and deployed policy must agree before an application can communicate as intended."
      ],
      [
        "Attachment",
        "An access attachment associates an arriving endpoint with the configured policy context."
      ],
      [
        "Endpoint learning",
        "The leaf uses local/fabric endpoint information and bridge/routing context to select forwarding treatment."
      ],
      [
        "Leaf policy",
        "Switch hardware applies the relevant policy; endpoint delivery and a negative policy test validate more than discovery alone."
      ]
    ],
    "comparison": [
      [
        "Attachment",
        "Port/domain/encapsulation association",
        "Physical link alone does not classify correctly."
      ],
      [
        "Endpoint learning",
        "Observed endpoint location",
        "Can be stale or mapped incorrectly."
      ],
      [
        "Leaf policy",
        "Realized forwarding permission",
        "Not equivalent to an APIC object."
      ]
    ],
    "example": "Baseline task: Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract. Incident: A host is learned on the expected leaf but classified into the wrong EPG. Recovery requirement: Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior. Worked reasoning: Does learning a MAC prove the correct EPG classification? No. The endpoint can be learned in the wrong context. Alternative check: What does an endpoint move require the operator to reconcile? Old/new location, identity and intended policy context. A move can be legitimate or a fault.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Application Profiles > selected EPG > Operational",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Attachment and Endpoint learning. Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A host is learned on the expected leaf but classified into the wrong EPG. Rollback must restore the exact baseline: Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract. Assign an owner for the first failing boundary and a separate owner for service acceptance. Switch hardware applies the relevant policy; endpoint delivery and a negative policy test validate more than discovery alone. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A host is learned on the expected leaf but classified into the wrong EPG.",
        "Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior."
      ],
      [
        "Why check attachment before changing contracts?",
        "Wrong classification changes which policy applies. A broad contract can hide the root cause."
      ],
      [
        "Where is normal workload policy realized?",
        "On fabric switch hardware, particularly leaf data paths. APIC is not a packet filter in transit."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Not equivalent to an APIC object. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Endpoint learning. The leaf uses local/fabric endpoint information and bridge/routing context to select forwarding treatment. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "The endpoint can be learned in the wrong context.",
      "A broad contract can hide the root cause.",
      "Carrier is local evidence.",
      "A move can be legitimate or a fault.",
      "APIC is not a packet filter in transit.",
      "Restored reachability alone can mask a leak."
    ],
    "prerequisites": [
      "s7-g5-t0"
    ],
    "related": [
      "s7-g5-t4"
    ],
    "lab": {
      "objective": "Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A host is learned on the expected leaf but classified into the wrong EPG.",
        "Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A host is learned on the expected leaf but classified into the wrong EPG. On fabric switch hardware, particularly leaf data paths. APIC is not a packet filter in transit.",
      "challenge": "What should a corrected mapping retain? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Attachment": "Port/domain/encapsulation association. Physical link alone does not classify correctly.",
      "Endpoint learning": "Observed endpoint location. Can be stale or mapped incorrectly.",
      "Leaf policy": "Realized forwarding permission. Not equivalent to an APIC object."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "APIC 6.0(x): bridging",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/l2-configuration/cisco-apic-layer-2-networking-configuration-guide-60x/bridging-60x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t3-Q1",
        "topicId": "s7-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does learning a MAC prove the correct EPG classification?",
        "answer": "No.",
        "explanation": "The endpoint can be learned in the wrong context.",
        "testedConcept": "Attachment"
      },
      {
        "questionId": "s7-g5-t3-Q2",
        "topicId": "s7-g5-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why check attachment before changing contracts?",
        "answer": "Wrong classification changes which policy applies.",
        "explanation": "A broad contract can hide the root cause.",
        "testedConcept": "Endpoint learning"
      },
      {
        "questionId": "s7-g5-t3-Q3",
        "topicId": "s7-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is a green physical port enough for endpoint delivery?",
        "answer": "No; classification, forwarding and policy remain.",
        "explanation": "Carrier is local evidence.",
        "testedConcept": "Leaf policy"
      },
      {
        "questionId": "s7-g5-t3-Q4",
        "topicId": "s7-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does an endpoint move require the operator to reconcile?",
        "answer": "Old/new location, identity and intended policy context.",
        "explanation": "A move can be legitimate or a fault.",
        "testedConcept": "Attachment"
      },
      {
        "questionId": "s7-g5-t3-Q5",
        "topicId": "s7-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Where is normal workload policy realized?",
        "answer": "On fabric switch hardware, particularly leaf data paths.",
        "explanation": "APIC is not a packet filter in transit.",
        "testedConcept": "Endpoint learning"
      },
      {
        "questionId": "s7-g5-t3-Q6",
        "topicId": "s7-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What should a corrected mapping retain?",
        "answer": "The original tenant boundary and a denied-path test.",
        "explanation": "Restored reachability alone can mask a leak.",
        "testedConcept": "Leaf policy"
      },
      {
        "questionId": "s7-g5-t3-Q7",
        "topicId": "s7-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Leaf incident, what is the failing evidence boundary?",
        "answer": "A host is learned on the expected leaf but classified into the wrong EPG.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t3-Q8",
        "topicId": "s7-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Leaf incident?",
        "answer": "Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t3-Q9",
        "topicId": "s7-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Attachment and Endpoint learning in this lesson.",
        "answer": "Port/domain/encapsulation association. Observed endpoint location.",
        "explanation": "Physical link alone does not classify correctly. Can be stale or mapped incorrectly.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t3-Q10",
        "topicId": "s7-g5-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Leaf would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t3-QC1",
        "topicId": "s7-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t3-QC2",
        "topicId": "s7-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "The leaf uses local/fabric endpoint information and bridge/routing context to select forwarding treatment.",
        "explanation": "Can be stale or mapped incorrectly.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t3-QC3",
        "topicId": "s7-g5-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Leaf policy: Realized forwarding permission. Not equivalent to an APIC object.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Map a Web host from physical port and encapsulation to its EPG, BD and VRF before checking its App contract.",
      "fault": "A host is learned on the expected leaf but classified into the wrong EPG.",
      "restore": "Restore the intended attachment mapping and verify endpoint location, deployed policy and allowed/denied service behavior.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t4",
    "batch": "18",
    "title": "Endpoint Groups",
    "subtitle": "Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t4",
    "definition": "An Endpoint Group collects endpoints that share policy treatment. An application EPG relates to a bridge domain and obtains endpoint membership through supported attachment/classification. EPG, VLAN and subnet are related but distinct abstractions.",
    "purpose": "Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. A domain and attachment mapping classify traffic into the intended EPG. The handoff to BD relationship is where a successful first observation can still lead to a failed transaction. Needs attachment evidence. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "EPG: Common endpoint policy group. Not inherently one subnet.",
      "BD relationship: Forwarding-context association. One BD may serve multiple EPGs.",
      "Membership: Endpoint classification. Needs attachment evidence."
    ],
    "mechanism": [
      "A domain and attachment mapping classify traffic into the intended EPG.",
      "The EPG references a BD for forwarding context and participates in consumer/provider contract relationships.",
      "In the ordinary baseline, intra-EPG communication is permitted; isolation features and other exceptions require explicit policy analysis."
    ],
    "flow": [
      [
        "Service boundary",
        "An Endpoint Group collects endpoints that share policy treatment. An application EPG relates to a bridge domain and obtains endpoint membership through supported attachment/classification. EPG, VLAN and subnet are related but distinct abstractions."
      ],
      [
        "EPG",
        "A domain and attachment mapping classify traffic into the intended EPG."
      ],
      [
        "BD relationship",
        "The EPG references a BD for forwarding context and participates in consumer/provider contract relationships."
      ],
      [
        "Membership",
        "In the ordinary baseline, intra-EPG communication is permitted; isolation features and other exceptions require explicit policy analysis."
      ]
    ],
    "comparison": [
      [
        "EPG",
        "Common endpoint policy group",
        "Not inherently one subnet."
      ],
      [
        "BD relationship",
        "Forwarding-context association",
        "One BD may serve multiple EPGs."
      ],
      [
        "Membership",
        "Endpoint classification",
        "Needs attachment evidence."
      ]
    ],
    "example": "Baseline task: Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS. Incident: Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary. Recovery requirement: Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately. Worked reasoning: Is one EPG necessarily one IP subnet? No. Policy membership and addressing differ. Alternative check: Why can putting Web and App in one EPG weaken the intended design? It can remove the expected inter-EPG contract boundary. Membership is part of security intent.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Application Profiles > selected application > Application EPGs",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against EPG and BD relationship. Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary. Rollback must restore the exact baseline: Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS. Assign an owner for the first failing boundary and a separate owner for service acceptance. In the ordinary baseline, intra-EPG communication is permitted; isolation features and other exceptions require explicit policy analysis. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary.",
        "Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately."
      ],
      [
        "Can multiple EPGs use one BD?",
        "Yes, in supported designs. The BD and policy boundaries are distinct."
      ],
      [
        "Does a static attachment guarantee that the endpoint is present?",
        "No; operational learning and traffic still need observation. Configuration is not discovery."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Needs attachment evidence. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: BD relationship. The EPG references a BD for forwarding context and participates in consumer/provider contract relationships. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Policy membership and addressing differ.",
      "The BD and policy boundaries are distinct.",
      "Do not apply inter-EPG default assumptions inside one EPG.",
      "Membership is part of security intent.",
      "Configuration is not discovery.",
      "A correct name alone is insufficient."
    ],
    "prerequisites": [
      "s7-g5-t3"
    ],
    "related": [
      "s7-g5-t5"
    ],
    "lab": {
      "objective": "Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary.",
        "Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary. No; operational learning and traffic still need observation. Configuration is not discovery.",
      "challenge": "What must a membership repair test? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "EPG": "Common endpoint policy group. Not inherently one subnet.",
      "BD relationship": "Forwarding-context association. One BD may serve multiple EPGs.",
      "Membership": "Endpoint classification. Needs attachment evidence."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "APIC 6.0(x): bridging",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/l2-configuration/cisco-apic-layer-2-networking-configuration-guide-60x/bridging-60x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t4-Q1",
        "topicId": "s7-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is one EPG necessarily one IP subnet?",
        "answer": "No.",
        "explanation": "Policy membership and addressing differ.",
        "testedConcept": "EPG"
      },
      {
        "questionId": "s7-g5-t4-Q2",
        "topicId": "s7-g5-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can multiple EPGs use one BD?",
        "answer": "Yes, in supported designs.",
        "explanation": "The BD and policy boundaries are distinct.",
        "testedConcept": "BD relationship"
      },
      {
        "questionId": "s7-g5-t4-Q3",
        "topicId": "s7-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the ordinary intra-EPG baseline?",
        "answer": "Communication is normally permitted unless configured isolation or exceptions change it.",
        "explanation": "Do not apply inter-EPG default assumptions inside one EPG.",
        "testedConcept": "Membership"
      },
      {
        "questionId": "s7-g5-t4-Q4",
        "topicId": "s7-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can putting Web and App in one EPG weaken the intended design?",
        "answer": "It can remove the expected inter-EPG contract boundary.",
        "explanation": "Membership is part of security intent.",
        "testedConcept": "EPG"
      },
      {
        "questionId": "s7-g5-t4-Q5",
        "topicId": "s7-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a static attachment guarantee that the endpoint is present?",
        "answer": "No; operational learning and traffic still need observation.",
        "explanation": "Configuration is not discovery.",
        "testedConcept": "BD relationship"
      },
      {
        "questionId": "s7-g5-t4-Q6",
        "topicId": "s7-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What must a membership repair test?",
        "answer": "Both intended communication and prohibited service behavior.",
        "explanation": "A correct name alone is insufficient.",
        "testedConcept": "Membership"
      },
      {
        "questionId": "s7-g5-t4-Q7",
        "topicId": "s7-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Endpoint Groups incident, what is the failing evidence boundary?",
        "answer": "Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t4-Q8",
        "topicId": "s7-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Endpoint Groups incident?",
        "answer": "Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t4-Q9",
        "topicId": "s7-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between EPG and BD relationship in this lesson.",
        "answer": "Common endpoint policy group. Forwarding-context association.",
        "explanation": "Not inherently one subnet. One BD may serve multiple EPGs.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t4-Q10",
        "topicId": "s7-g5-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Endpoint Groups would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t4-QC1",
        "topicId": "s7-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t4-QC2",
        "topicId": "s7-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "The EPG references a BD for forwarding context and participates in consumer/provider contract relationships.",
        "explanation": "One BD may serve multiple EPGs.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t4-QC3",
        "topicId": "s7-g5-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Membership: Endpoint classification. Needs attachment evidence.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Model Web and App as separate EPGs and classify two endpoints before permitting only Web-to-App HTTPS.",
      "fault": "Web and App are accidentally placed in one ordinary EPG, bypassing the intended inter-EPG boundary.",
      "restore": "Restore separate membership and verify the intended contract as well as denied SSH; inspect any explicit intra-EPG policy separately.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t5",
    "batch": "18",
    "title": "Bridge Domains",
    "subtitle": "Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t5",
    "definition": "A bridge domain defines an ACI Layer 2 forwarding scope and relates to a VRF for routing context. A BD can serve multiple EPGs and supported multiple subnets; it is not simply a one-to-one translation of a traditional VLAN.",
    "purpose": "Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. EPGs relate to the BD while the BD associates with its VRF and configured subnets. The handoff to VRF relation is where a successful first observation can still lead to a failed transaction. Proxy and flooding have different implications. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "BD: Layer 2 forwarding scope. Not necessarily one VLAN or one subnet.",
      "VRF relation: Routing context for the BD. Keep tenant isolation explicit.",
      "Unknown-unicast policy: Treatment of unresolved destinations. Proxy and flooding have different implications."
    ],
    "mechanism": [
      "EPGs relate to the BD while the BD associates with its VRF and configured subnets.",
      "Unicast routing, endpoint learning and unknown-unicast/ARP treatment follow the chosen BD policies.",
      "Changing flooding or learning policy affects discovery and delivery; neither a subnet object nor a healthy controller proves endpoint resolution."
    ],
    "flow": [
      [
        "Service boundary",
        "A bridge domain defines an ACI Layer 2 forwarding scope and relates to a VRF for routing context. A BD can serve multiple EPGs and supported multiple subnets; it is not simply a one-to-one translation of a traditional VLAN."
      ],
      [
        "BD",
        "EPGs relate to the BD while the BD associates with its VRF and configured subnets."
      ],
      [
        "VRF relation",
        "Unicast routing, endpoint learning and unknown-unicast/ARP treatment follow the chosen BD policies."
      ],
      [
        "Unknown-unicast policy",
        "Changing flooding or learning policy affects discovery and delivery; neither a subnet object nor a healthy controller proves endpoint resolution."
      ]
    ],
    "comparison": [
      [
        "BD",
        "Layer 2 forwarding scope",
        "Not necessarily one VLAN or one subnet."
      ],
      [
        "VRF relation",
        "Routing context for the BD",
        "Keep tenant isolation explicit."
      ],
      [
        "Unknown-unicast policy",
        "Treatment of unresolved destinations",
        "Proxy and flooding have different implications."
      ]
    ],
    "example": "Baseline task: Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies. Incident: The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context. Recovery requirement: Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts. Worked reasoning: Must each BD equal exactly one VLAN and subnet? No. The ACI abstraction supports different mappings. Alternative check: Can correct host IPs compensate for the wrong BD/VRF association? No. Forwarding context must also be correct.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Networking > Bridge Domains",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against BD and VRF relation. Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context. Rollback must restore the exact baseline: Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies. Assign an owner for the first failing boundary and a separate owner for service acceptance. Changing flooding or learning policy affects discovery and delivery; neither a subnet object nor a healthy controller proves endpoint resolution. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context.",
        "Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts."
      ],
      [
        "Where does a BD obtain its routing context?",
        "Its VRF relationship. The EPG name alone does not identify that context."
      ],
      [
        "Why avoid changing flooding policy as an unexplained fix?",
        "It can hide learning or attachment errors and enlarge traffic scope. Diagnose the first failing boundary."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Proxy and flooding have different implications. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: VRF relation. Unicast routing, endpoint learning and unknown-unicast/ARP treatment follow the chosen BD policies. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "The ACI abstraction supports different mappings.",
      "The EPG name alone does not identify that context.",
      "Unknown-unicast treatment is not every flooding behavior.",
      "Forwarding context must also be correct.",
      "Diagnose the first failing boundary.",
      "Configuration objects are insufficient."
    ],
    "prerequisites": [
      "s7-g5-t4"
    ],
    "related": [
      "s7-g5-t6"
    ],
    "lab": {
      "objective": "Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context.",
        "Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context. It can hide learning or attachment errors and enlarge traffic scope. Diagnose the first failing boundary.",
      "challenge": "What verifies restoration after a BD change? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "BD": "Layer 2 forwarding scope. Not necessarily one VLAN or one subnet.",
      "VRF relation": "Routing context for the BD. Keep tenant isolation explicit.",
      "Unknown-unicast policy": "Treatment of unresolved destinations. Proxy and flooding have different implications."
    },
    "sources": [
      {
        "title": "APIC 6.0(x): bridging",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/l2-configuration/cisco-apic-layer-2-networking-configuration-guide-60x/bridging-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t5-Q1",
        "topicId": "s7-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Must each BD equal exactly one VLAN and subnet?",
        "answer": "No.",
        "explanation": "The ACI abstraction supports different mappings.",
        "testedConcept": "BD"
      },
      {
        "questionId": "s7-g5-t5-Q2",
        "topicId": "s7-g5-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Where does a BD obtain its routing context?",
        "answer": "Its VRF relationship.",
        "explanation": "The EPG name alone does not identify that context.",
        "testedConcept": "VRF relation"
      },
      {
        "questionId": "s7-g5-t5-Q3",
        "topicId": "s7-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does enabling hardware proxy mean no broadcast ever occurs?",
        "answer": "No; traffic classes and other settings differ.",
        "explanation": "Unknown-unicast treatment is not every flooding behavior.",
        "testedConcept": "Unknown-unicast policy"
      },
      {
        "questionId": "s7-g5-t5-Q4",
        "topicId": "s7-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can correct host IPs compensate for the wrong BD/VRF association?",
        "answer": "No.",
        "explanation": "Forwarding context must also be correct.",
        "testedConcept": "BD"
      },
      {
        "questionId": "s7-g5-t5-Q5",
        "topicId": "s7-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid changing flooding policy as an unexplained fix?",
        "answer": "It can hide learning or attachment errors and enlarge traffic scope.",
        "explanation": "Diagnose the first failing boundary.",
        "testedConcept": "VRF relation"
      },
      {
        "questionId": "s7-g5-t5-Q6",
        "topicId": "s7-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What verifies restoration after a BD change?",
        "answer": "Endpoint resolution, gateway behavior and original allowed/denied traffic.",
        "explanation": "Configuration objects are insufficient.",
        "testedConcept": "Unknown-unicast policy"
      },
      {
        "questionId": "s7-g5-t5-Q7",
        "topicId": "s7-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Bridge Domains incident, what is the failing evidence boundary?",
        "answer": "The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t5-Q8",
        "topicId": "s7-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Bridge Domains incident?",
        "answer": "Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t5-Q9",
        "topicId": "s7-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between BD and VRF relation in this lesson.",
        "answer": "Layer 2 forwarding scope. Routing context for the BD.",
        "explanation": "Not necessarily one VLAN or one subnet. Keep tenant isolation explicit.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t5-Q10",
        "topicId": "s7-g5-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Bridge Domains would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t5-QC1",
        "topicId": "s7-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t5-QC2",
        "topicId": "s7-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Unicast routing, endpoint learning and unknown-unicast/ARP treatment follow the chosen BD policies.",
        "explanation": "Keep tenant isolation explicit.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t5-QC3",
        "topicId": "s7-g5-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Unknown-unicast policy: Treatment of unresolved destinations. Proxy and flooding have different implications.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Draw Web/App EPG relationships to their BDs and one VRF, then state the intended routing and discovery policies.",
      "fault": "The EPG points to a BD associated with the wrong VRF; correct IP addressing alone cannot repair the context.",
      "restore": "Restore the intended BD/VRF relationship and validate gateway, resolution and cross-EPG policy without broad flooding shortcuts.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t6",
    "batch": "18",
    "title": "Contracts",
    "subtitle": "Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t6",
    "definition": "An ACI contract expresses permitted relationships between policy groups using subjects and filters. A contract must be attached with the intended roles and realized on the relevant switches. It is not automatically a stateful application firewall.",
    "purpose": "Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. The consuming EPG requests the service provided by another EPG through the contract relationship. The handoff to Provider is where a successful first observation can still lead to a failed transaction. Not full application authentication. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Consumer: EPG using a service. A role in the relationship.",
      "Provider: EPG offering the service. Must attach the intended contract.",
      "Filter: Protocol and port match. Not full application authentication."
    ],
    "mechanism": [
      "The consuming EPG requests the service provided by another EPG through the contract relationship.",
      "Subjects and filters constrain relevant protocol/port attributes within the policy scope.",
      "Direction, reverse-port treatment, exceptions and service graphs affect actual behavior; verify both directions and avoid assuming a simple port match models every case."
    ],
    "flow": [
      [
        "Service boundary",
        "An ACI contract expresses permitted relationships between policy groups using subjects and filters. A contract must be attached with the intended roles and realized on the relevant switches. It is not automatically a stateful application firewall."
      ],
      [
        "Consumer",
        "The consuming EPG requests the service provided by another EPG through the contract relationship."
      ],
      [
        "Provider",
        "Subjects and filters constrain relevant protocol/port attributes within the policy scope."
      ],
      [
        "Filter",
        "Direction, reverse-port treatment, exceptions and service graphs affect actual behavior; verify both directions and avoid assuming a simple port match models every case."
      ]
    ],
    "comparison": [
      [
        "Consumer",
        "EPG using a service",
        "A role in the relationship."
      ],
      [
        "Provider",
        "EPG offering the service",
        "Must attach the intended contract."
      ],
      [
        "Filter",
        "Protocol and port match",
        "Not full application authentication."
      ]
    ],
    "example": "Baseline task: Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test. Incident: A broad filter admits SSH while the intended application requirement was HTTPS only. Recovery requirement: Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection. Worked reasoning: Does creating a contract object alone permit traffic? No; relationships, scope and deployment must agree. Unused intent grants no path. Alternative check: Is every ACI contract a stateful firewall session policy? No. Direction and matching semantics require explicit analysis.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Contracts\nAPIC GUI: Tenants > selected tenant > Filters",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Consumer and Provider. Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A broad filter admits SSH while the intended application requirement was HTTPS only. Rollback must restore the exact baseline: Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test. Assign an owner for the first failing boundary and a separate owner for service acceptance. Direction, reverse-port treatment, exceptions and service graphs affect actual behavior; verify both directions and avoid assuming a simple port match models every case. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A broad filter admits SSH while the intended application requirement was HTTPS only.",
        "Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection."
      ],
      [
        "Which role normally requests the provided service?",
        "The consumer EPG. Consumer/provider roles explain the policy relationship."
      ],
      [
        "Why test SSH after restoring HTTPS?",
        "It reveals an overbroad filter. Positive tests alone miss excess access."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Not full application authentication. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Provider. Subjects and filters constrain relevant protocol/port attributes within the policy scope. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Unused intent grants no path.",
      "Consumer/provider roles explain the policy relationship.",
      "Network port policy is not application identity verification.",
      "Direction and matching semantics require explicit analysis.",
      "Positive tests alone miss excess access.",
      "The narrow predicate must not be treated as a full APIC simulator."
    ],
    "prerequisites": [
      "s7-g5-t4",
      "s7-g5-t5"
    ],
    "related": [
      "s7-g5-t7"
    ],
    "lab": {
      "objective": "Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A broad filter admits SSH while the intended application requirement was HTTPS only.",
        "Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A broad filter admits SSH while the intended application requirement was HTTPS only. It reveals an overbroad filter. Positive tests alone miss excess access.",
      "challenge": "What contract details are excluded from this browser relation? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Consumer": "EPG using a service. A role in the relationship.",
      "Provider": "EPG offering the service. Must attach the intended contract.",
      "Filter": "Protocol and port match. Not full application authentication."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t6-Q1",
        "topicId": "s7-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does creating a contract object alone permit traffic?",
        "answer": "No; relationships, scope and deployment must agree.",
        "explanation": "Unused intent grants no path.",
        "testedConcept": "Consumer"
      },
      {
        "questionId": "s7-g5-t6-Q2",
        "topicId": "s7-g5-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which role normally requests the provided service?",
        "answer": "The consumer EPG.",
        "explanation": "Consumer/provider roles explain the policy relationship.",
        "testedConcept": "Provider"
      },
      {
        "questionId": "s7-g5-t6-Q3",
        "topicId": "s7-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does TCP 443 permission authenticate the application user?",
        "answer": "No.",
        "explanation": "Network port policy is not application identity verification.",
        "testedConcept": "Filter"
      },
      {
        "questionId": "s7-g5-t6-Q4",
        "topicId": "s7-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is every ACI contract a stateful firewall session policy?",
        "answer": "No.",
        "explanation": "Direction and matching semantics require explicit analysis.",
        "testedConcept": "Consumer"
      },
      {
        "questionId": "s7-g5-t6-Q5",
        "topicId": "s7-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test SSH after restoring HTTPS?",
        "answer": "It reveals an overbroad filter.",
        "explanation": "Positive tests alone miss excess access.",
        "testedConcept": "Provider"
      },
      {
        "questionId": "s7-g5-t6-Q6",
        "topicId": "s7-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What contract details are excluded from this browser relation?",
        "answer": "Return-filter semantics, policy exceptions and service graphs.",
        "explanation": "The narrow predicate must not be treated as a full APIC simulator.",
        "testedConcept": "Filter"
      },
      {
        "questionId": "s7-g5-t6-Q7",
        "topicId": "s7-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Contracts incident, what is the failing evidence boundary?",
        "answer": "A broad filter admits SSH while the intended application requirement was HTTPS only.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t6-Q8",
        "topicId": "s7-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Contracts incident?",
        "answer": "Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t6-Q9",
        "topicId": "s7-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Consumer and Provider in this lesson.",
        "answer": "EPG using a service. EPG offering the service.",
        "explanation": "A role in the relationship. Must attach the intended contract.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t6-Q10",
        "topicId": "s7-g5-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Contracts would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t6-QC1",
        "topicId": "s7-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t6-QC2",
        "topicId": "s7-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Subjects and filters constrain relevant protocol/port attributes within the policy scope.",
        "explanation": "Must attach the intended contract.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t6-QC3",
        "topicId": "s7-g5-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Filter: Protocol and port match. Not full application authentication.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Define a TCP destination-443 Web consumer/App provider rule and retain an explicit destination-22 denial test.",
      "fault": "A broad filter admits SSH while the intended application requirement was HTTPS only.",
      "restore": "Restore the scoped filter and verify forward and return behavior plus denied SSH without claiming stateful inspection.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t7",
    "batch": "18",
    "title": "Application Profiles",
    "subtitle": "Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t7",
    "definition": "An application profile organizes related EPGs within a tenant so an application policy structure can be managed coherently. It is an organizational policy container, not an independent forwarding or security boundary by its name alone.",
    "purpose": "Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Group application EPGs such as Web, App and Database beneath a named profile. The handoff to EPG relationship is where a successful first observation can still lead to a failed transaction. Names alone do not describe impact. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Application profile: Container for related EPGs. Does not replace contracts.",
      "EPG relationship: Policy component linkage. Preserve BD and attachment bindings.",
      "Dependency review: References affected by a change. Names alone do not describe impact."
    ],
    "mechanism": [
      "Group application EPGs such as Web, App and Database beneath a named profile.",
      "Each EPG keeps its BD and attachment relationships while contracts express permitted interactions.",
      "Moving or renaming an object requires dependency review; membership in one profile does not automatically authorize all communication."
    ],
    "flow": [
      [
        "Service boundary",
        "An application profile organizes related EPGs within a tenant so an application policy structure can be managed coherently. It is an organizational policy container, not an independent forwarding or security boundary by its name alone."
      ],
      [
        "Application profile",
        "Group application EPGs such as Web, App and Database beneath a named profile."
      ],
      [
        "EPG relationship",
        "Each EPG keeps its BD and attachment relationships while contracts express permitted interactions."
      ],
      [
        "Dependency review",
        "Moving or renaming an object requires dependency review; membership in one profile does not automatically authorize all communication."
      ]
    ],
    "comparison": [
      [
        "Application profile",
        "Container for related EPGs",
        "Does not replace contracts."
      ],
      [
        "EPG relationship",
        "Policy component linkage",
        "Preserve BD and attachment bindings."
      ],
      [
        "Dependency review",
        "References affected by a change",
        "Names alone do not describe impact."
      ]
    ],
    "example": "Baseline task: Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships. Incident: The operator assumes all EPGs in one application profile can communicate because the profile exists. Recovery requirement: Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow. Worked reasoning: Does sharing an application profile permit all EPG traffic? No. Contracts and other policy still apply. Alternative check: Why inspect references before deleting a profile? Its EPGs and associated application intent may be affected. An organizational object can still have operational dependencies.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Application Profiles",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Application profile and EPG relationship. Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The operator assumes all EPGs in one application profile can communicate because the profile exists. Rollback must restore the exact baseline: Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships. Assign an owner for the first failing boundary and a separate owner for service acceptance. Moving or renaming an object requires dependency review; membership in one profile does not automatically authorize all communication. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The operator assumes all EPGs in one application profile can communicate because the profile exists.",
        "Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow."
      ],
      [
        "What belongs beneath an application profile in this example?",
        "The Web, App and Database EPGs. It organizes application policy components."
      ],
      [
        "What is a useful three-tier acceptance matrix?",
        "Each intended service and explicitly denied lateral path. One successful tier does not validate the whole application."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Names alone do not describe impact. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: EPG relationship. Each EPG keeps its BD and attachment relationships while contracts express permitted interactions. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Contracts and other policy still apply.",
      "It organizes application policy components.",
      "Forwarding context remains separately defined.",
      "An organizational object can still have operational dependencies.",
      "One successful tier does not validate the whole application.",
      "Labels are not enforcement evidence."
    ],
    "prerequisites": [
      "s7-g5-t4",
      "s7-g5-t6"
    ],
    "related": [
      "s7-g5-t8"
    ],
    "lab": {
      "objective": "Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The operator assumes all EPGs in one application profile can communicate because the profile exists.",
        "Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The operator assumes all EPGs in one application profile can communicate because the profile exists. Each intended service and explicitly denied lateral path. One successful tier does not validate the whole application.",
      "challenge": "What does renaming a profile alone prove about security? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Application profile": "Container for related EPGs. Does not replace contracts.",
      "EPG relationship": "Policy component linkage. Preserve BD and attachment bindings.",
      "Dependency review": "References affected by a change. Names alone do not describe impact."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t7-Q1",
        "topicId": "s7-g5-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does sharing an application profile permit all EPG traffic?",
        "answer": "No.",
        "explanation": "Contracts and other policy still apply.",
        "testedConcept": "Application profile"
      },
      {
        "questionId": "s7-g5-t7-Q2",
        "topicId": "s7-g5-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What belongs beneath an application profile in this example?",
        "answer": "The Web, App and Database EPGs.",
        "explanation": "It organizes application policy components.",
        "testedConcept": "EPG relationship"
      },
      {
        "questionId": "s7-g5-t7-Q3",
        "topicId": "s7-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does the profile replace BD/VRF relationships?",
        "answer": "No.",
        "explanation": "Forwarding context remains separately defined.",
        "testedConcept": "Dependency review"
      },
      {
        "questionId": "s7-g5-t7-Q4",
        "topicId": "s7-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect references before deleting a profile?",
        "answer": "Its EPGs and associated application intent may be affected.",
        "explanation": "An organizational object can still have operational dependencies.",
        "testedConcept": "Application profile"
      },
      {
        "questionId": "s7-g5-t7-Q5",
        "topicId": "s7-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is a useful three-tier acceptance matrix?",
        "answer": "Each intended service and explicitly denied lateral path.",
        "explanation": "One successful tier does not validate the whole application.",
        "testedConcept": "EPG relationship"
      },
      {
        "questionId": "s7-g5-t7-Q6",
        "topicId": "s7-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does renaming a profile alone prove about security?",
        "answer": "Nothing.",
        "explanation": "Labels are not enforcement evidence.",
        "testedConcept": "Dependency review"
      },
      {
        "questionId": "s7-g5-t7-Q7",
        "topicId": "s7-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Application Profiles incident, what is the failing evidence boundary?",
        "answer": "The operator assumes all EPGs in one application profile can communicate because the profile exists.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t7-Q8",
        "topicId": "s7-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Application Profiles incident?",
        "answer": "Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t7-Q9",
        "topicId": "s7-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Application profile and EPG relationship in this lesson.",
        "answer": "Container for related EPGs. Policy component linkage.",
        "explanation": "Does not replace contracts. Preserve BD and attachment bindings.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t7-Q10",
        "topicId": "s7-g5-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Application Profiles would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t7-QC1",
        "topicId": "s7-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t7-QC2",
        "topicId": "s7-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Each EPG keeps its BD and attachment relationships while contracts express permitted interactions.",
        "explanation": "Preserve BD and attachment bindings.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t7-QC3",
        "topicId": "s7-g5-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Dependency review: References affected by a change. Names alone do not describe impact.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Build a three-tier profile and document the exact Web-to-App and App-to-Database service relationships.",
      "fault": "The operator assumes all EPGs in one application profile can communicate because the profile exists.",
      "restore": "Retain the organization but restore explicit scoped relationships and verify each permitted and prohibited tier flow.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g5-t8",
    "batch": "18",
    "title": "Tenants",
    "subtitle": "Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g5-t8",
    "definition": "An ACI tenant is a policy-administration container for application and networking objects. Effective isolation depends on VRF, BD, EPG and contract relationships plus any deliberate shared services; tenant names alone do not prove impermeable network separation.",
    "purpose": "Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Create application profiles and networking objects within the intended administrative scope. The handoff to VRF is where a successful first observation can still lead to a failed transaction. Needs narrow policy and testing. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Tenant: Administrative policy container. Not proof of every isolation boundary.",
      "VRF: Routing-table context. Explicit mapping matters.",
      "Shared service: Deliberate cross-scope dependency. Needs narrow policy and testing."
    ],
    "mechanism": [
      "Create application profiles and networking objects within the intended administrative scope.",
      "Map BDs to the correct VRFs and endpoint policies rather than inferring routing isolation from a display name.",
      "Review common/shared-service references and deliberate cross-tenant relationships, with negative tests for everything not authorized."
    ],
    "flow": [
      [
        "Service boundary",
        "An ACI tenant is a policy-administration container for application and networking objects. Effective isolation depends on VRF, BD, EPG and contract relationships plus any deliberate shared services; tenant names alone do not prove impermeable network separation."
      ],
      [
        "Tenant",
        "Create application profiles and networking objects within the intended administrative scope."
      ],
      [
        "VRF",
        "Map BDs to the correct VRFs and endpoint policies rather than inferring routing isolation from a display name."
      ],
      [
        "Shared service",
        "Review common/shared-service references and deliberate cross-tenant relationships, with negative tests for everything not authorized."
      ]
    ],
    "comparison": [
      [
        "Tenant",
        "Administrative policy container",
        "Not proof of every isolation boundary."
      ],
      [
        "VRF",
        "Routing-table context",
        "Explicit mapping matters."
      ],
      [
        "Shared service",
        "Deliberate cross-scope dependency",
        "Needs narrow policy and testing."
      ]
    ],
    "example": "Baseline task: Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted. Incident: A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names. Recovery requirement: Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows. Worked reasoning: Do different tenant names prove network isolation? No. Actual VRF and policy relationships determine it. Alternative check: What should a shared-service rule specify? Exact consumers, provider, service and permitted scope. Broad trust defeats narrow isolation.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "APIC GUI: Tenants > selected tenant > Networking > VRFs\nAPIC GUI: Tenants > selected tenant > Contracts",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Tenant and VRF. Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names. Rollback must restore the exact baseline: Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted. Assign an owner for the first failing boundary and a separate owner for service acceptance. Review common/shared-service references and deliberate cross-tenant relationships, with negative tests for everything not authorized. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names.",
        "Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows."
      ],
      [
        "Why inventory common/shared references?",
        "They can create deliberate cross-scope dependencies. Administrative separation may coexist with connectivity."
      ],
      [
        "What is a safe rollback of an unintended relation?",
        "Restore the exact prior owned relationship and retest required services. Deleting every shared object can break legitimate users."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Needs narrow policy and testing. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: VRF. Map BDs to the correct VRFs and endpoint policies rather than inferring routing isolation from a display name. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Actual VRF and policy relationships determine it.",
      "Administrative separation may coexist with connectivity.",
      "Names do not resolve address collisions.",
      "Broad trust defeats narrow isolation.",
      "Deleting every shared object can break legitimate users.",
      "A tidy object tree is not enforcement proof."
    ],
    "prerequisites": [
      "s7-g5-t5",
      "s7-g5-t7"
    ],
    "related": [
      "lab-7"
    ],
    "lab": {
      "objective": "Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "APIC policy intent → leaf policy deployment (management path)",
        "Consumer endpoint → ingress leaf classification → fabric path → provider endpoint",
        "Tenant → VRF → BD; application profile → EPG → BD; contract joins EPG roles"
      ],
      "steps": [
        "Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names.",
        "Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names. Restore the exact prior owned relationship and retest required services. Deleting every shared object can break legitimate users.",
      "challenge": "What completes the tenant review? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Tenant": "Administrative policy container. Not proof of every isolation boundary.",
      "VRF": "Routing-table context. Explicit mapping matters.",
      "Shared service": "Deliberate cross-scope dependency. Needs narrow policy and testing."
    },
    "sources": [
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g5-t8-Q1",
        "topicId": "s7-g5-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Do different tenant names prove network isolation?",
        "answer": "No.",
        "explanation": "Actual VRF and policy relationships determine it.",
        "testedConcept": "Tenant"
      },
      {
        "questionId": "s7-g5-t8-Q2",
        "topicId": "s7-g5-t8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why inventory common/shared references?",
        "answer": "They can create deliberate cross-scope dependencies.",
        "explanation": "Administrative separation may coexist with connectivity.",
        "testedConcept": "VRF"
      },
      {
        "questionId": "s7-g5-t8-Q3",
        "topicId": "s7-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can separate tenants use overlapping addresses safely by name alone?",
        "answer": "No; routing contexts and shared-service design must support it.",
        "explanation": "Names do not resolve address collisions.",
        "testedConcept": "Shared service"
      },
      {
        "questionId": "s7-g5-t8-Q4",
        "topicId": "s7-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What should a shared-service rule specify?",
        "answer": "Exact consumers, provider, service and permitted scope.",
        "explanation": "Broad trust defeats narrow isolation.",
        "testedConcept": "Tenant"
      },
      {
        "questionId": "s7-g5-t8-Q5",
        "topicId": "s7-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is a safe rollback of an unintended relation?",
        "answer": "Restore the exact prior owned relationship and retest required services.",
        "explanation": "Deleting every shared object can break legitimate users.",
        "testedConcept": "VRF"
      },
      {
        "questionId": "s7-g5-t8-Q6",
        "topicId": "s7-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What completes the tenant review?",
        "answer": "A mapping inventory plus permitted and prohibited traffic evidence.",
        "explanation": "A tidy object tree is not enforcement proof.",
        "testedConcept": "Shared service"
      },
      {
        "questionId": "s7-g5-t8-Q7",
        "topicId": "s7-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Tenants incident, what is the failing evidence boundary?",
        "answer": "A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g5-t8-Q8",
        "topicId": "s7-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Tenants incident?",
        "answer": "Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g5-t8-Q9",
        "topicId": "s7-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Tenant and VRF in this lesson.",
        "answer": "Administrative policy container. Routing-table context.",
        "explanation": "Not proof of every isolation boundary. Explicit mapping matters.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g5-t8-Q10",
        "topicId": "s7-g5-t8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Tenants would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g5-t8-QC1",
        "topicId": "s7-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g5-t8-QC2",
        "topicId": "s7-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Map BDs to the correct VRFs and endpoint policies rather than inferring routing isolation from a display name.",
        "explanation": "Explicit mapping matters.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g5-t8-QC3",
        "topicId": "s7-g5-t8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Shared service: Deliberate cross-scope dependency. Needs narrow policy and testing.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Design Blue and Red tenants with separate VRFs and a written decision on whether any shared service is permitted.",
      "fault": "A broad shared-service relationship permits an unintended Red-to-Blue operation despite different tenant names.",
      "restore": "Remove only the unintended owned relationship and verify required shared services plus denied cross-tenant flows.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      }
    ]
  },
  {
    "id": "lab-7",
    "batch": "18",
    "title": "Cisco Data Center Lab",
    "subtitle": "Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.",
    "level": "Intermediate → Advanced",
    "minutes": 110,
    "interactive": "cdc-lab-7",
    "definition": "The Cisco Data Center lab integrates a declared two-spine/four-leaf topology, server/storage/firewall attachments, VXLAN byte budgeting, EVPN reachability and tenant isolation. A separate ACI policy design expresses similar service intent without mixing NX-OS and APIC configurations.",
    "purpose": "Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Trace Blue Web on L1/L2 toward Blue App on L3/L4 through either S1 or S2, with an explicit same-tenant VNI and imported route. The handoff to EVPN fixture is where a successful first observation can still lead to a failed transaction. Separate operating design. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "components": [
      "Fabric plan: Two spines, four leaves and attachments. Offline intent, not discovered devices.",
      "EVPN fixture: Synthetic route and import policy. No BGP session is executed.",
      "ACI alternative: EPG/BD/VRF and contract mapping. Separate operating design."
    ],
    "mechanism": [
      "Trace Blue Web on L1/L2 toward Blue App on L3/L4 through either S1 or S2, with an explicit same-tenant VNI and imported route.",
      "Withdraw the synthetic Blue App route while keeping the underlay intact, then distinguish control reachability loss from transport failure.",
      "Restore the exact serialized plan and validate both permitted Blue traffic and denied Red traffic; compare an ACI Web-consumer/App-provider HTTPS policy separately."
    ],
    "flow": [
      [
        "Service boundary",
        "The Cisco Data Center lab integrates a declared two-spine/four-leaf topology, server/storage/firewall attachments, VXLAN byte budgeting, EVPN reachability and tenant isolation. A separate ACI policy design expresses similar service intent without mixing NX-OS and APIC configurations."
      ],
      [
        "Fabric plan",
        "Trace Blue Web on L1/L2 toward Blue App on L3/L4 through either S1 or S2, with an explicit same-tenant VNI and imported route."
      ],
      [
        "EVPN fixture",
        "Withdraw the synthetic Blue App route while keeping the underlay intact, then distinguish control reachability loss from transport failure."
      ],
      [
        "ACI alternative",
        "Restore the exact serialized plan and validate both permitted Blue traffic and denied Red traffic; compare an ACI Web-consumer/App-provider HTTPS policy separately."
      ]
    ],
    "comparison": [
      [
        "Fabric plan",
        "Two spines, four leaves and attachments",
        "Offline intent, not discovered devices."
      ],
      [
        "EVPN fixture",
        "Synthetic route and import policy",
        "No BGP session is executed."
      ],
      [
        "ACI alternative",
        "EPG/BD/VRF and contract mapping",
        "Separate operating design."
      ]
    ],
    "example": "Baseline task: Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design. Incident: The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available. Recovery requirement: Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory. Worked reasoning: How many leaf-spine links does the reference plan contain? Eight. Each of four leaves connects to both spines. Alternative check: Does the offline runner exchange BGP or VXLAN packets? No. It validates declared records and an owned temporary file.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "offline-fabric-rehearsal.txt",
        "platform": "Python 3 standard library; actual offline execution, not Cisco execution",
        "code": "python labs/cisco-dc-fabric.py --run",
        "explanation": "Create only an owned temporary directory; read the baseline plan, withdraw the synthetic App route, restore identical bytes and verify cleanup.",
        "expected": "JSON result PASS, restored true and cleaned true, with separate baseline/fault/restore events. This proves only the declared-plan and owned-file behavior."
      }
    ],
    "configuration": "Configuration intent: Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available. Rollback must restore the exact baseline: Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design. Assign an owner for the first failing boundary and a separate owner for service acceptance. Restore the exact serialized plan and validate both permitted Blue traffic and denied Red traffic; compare an ACI Web-consumer/App-provider HTTPS policy separately. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available.",
        "Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory."
      ],
      [
        "What does route withdrawal with intact underlay demonstrate?",
        "Transport reachability alone does not provide overlay destination knowledge. Control and data dependencies are separate."
      ],
      [
        "How is ACI compared with the NX-OS design?",
        "As a separate policy mapping for the same service intent. The two operating workflows are not combined."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Separate operating design. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: EVPN fixture. Withdraw the synthetic Blue App route while keeping the underlay intact, then distinguish control reachability loss from transport failure. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
    "mistakes": [
      "Each of four leaves connects to both spines.",
      "Control and data dependencies are separate.",
      "A broad import can restore connectivity while leaking routes.",
      "It validates declared records and an owned temporary file.",
      "The two operating workflows are not combined.",
      "Exact state and behavior both matter."
    ],
    "prerequisites": [
      "s7-g1-t3",
      "s7-g4-t2",
      "s7-g5-t8"
    ],
    "related": [
      "s8-g0-t0"
    ],
    "lab": {
      "objective": "Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "S1 ↔ L1, L2, L3, L4; S2 ↔ L1, L2, L3, L4 (8 underlay links)",
        "Blue Web → L1/L2; Blue App and IP storage → L3/L4",
        "Firewall A → L3; Firewall B → L4; Red Audit → L2",
        "NX-OS: L2 VNI 10100 / RT 65000:10100 for Blue; 10200 / 65000:10200 for Red",
        "ACI alternative: Blue-VRF/Blue-BD → Web, App, Storage EPGs; Red-VRF/Red-BD → Audit EPG"
      ],
      "steps": [
        "Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available.",
        "Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested.",
        "Run python labs/cisco-dc-fabric.py --run. It evaluates synthetic topology, route, MTU and policy records in memory and an owned temporary directory; it sends no traffic and modifies no device."
      ],
      "verification": "Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available. As a separate policy mapping for the same service intent. The two operating workflows are not combined.",
      "challenge": "What is stronger than resetting a fault flag? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Fabric plan": "Two spines, four leaves and attachments. Offline intent, not discovered devices.",
      "EVPN fixture": "Synthetic route and import policy. No BGP session is executed.",
      "ACI alternative": "EPG/BD/VRF and contract mapping. Separate operating design."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): vPC",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "ACI 6.0(x): forwarding and policy fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/aci/apic/6x/aci-fundamentals/cisco-aci-fundamentals-60x/fundamentals-60x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ACI design guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/whitepapers/cisco-application-centric-infrastructure-design-guide.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "lab-7-Q1",
        "topicId": "lab-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many leaf-spine links does the reference plan contain?",
        "answer": "Eight.",
        "explanation": "Each of four leaves connects to both spines.",
        "testedConcept": "Fabric plan"
      },
      {
        "questionId": "lab-7-Q2",
        "topicId": "lab-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does route withdrawal with intact underlay demonstrate?",
        "answer": "Transport reachability alone does not provide overlay destination knowledge.",
        "explanation": "Control and data dependencies are separate.",
        "testedConcept": "EVPN fixture"
      },
      {
        "questionId": "lab-7-Q3",
        "topicId": "lab-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test Red-to-Blue denial after restoration?",
        "answer": "Recovery must preserve tenant isolation.",
        "explanation": "A broad import can restore connectivity while leaking routes.",
        "testedConcept": "ACI alternative"
      },
      {
        "questionId": "lab-7-Q4",
        "topicId": "lab-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does the offline runner exchange BGP or VXLAN packets?",
        "answer": "No.",
        "explanation": "It validates declared records and an owned temporary file.",
        "testedConcept": "Fabric plan"
      },
      {
        "questionId": "lab-7-Q5",
        "topicId": "lab-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "How is ACI compared with the NX-OS design?",
        "answer": "As a separate policy mapping for the same service intent.",
        "explanation": "The two operating workflows are not combined.",
        "testedConcept": "EVPN fixture"
      },
      {
        "questionId": "lab-7-Q6",
        "topicId": "lab-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What is stronger than resetting a fault flag?",
        "answer": "Byte-identical baseline restoration plus repeated positive/negative checks and cleanup.",
        "explanation": "Exact state and behavior both matter.",
        "testedConcept": "ACI alternative"
      },
      {
        "questionId": "lab-7-Q7",
        "topicId": "lab-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Cisco Data Center Lab incident, what is the failing evidence boundary?",
        "answer": "The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "lab-7-Q8",
        "topicId": "lab-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Cisco Data Center Lab incident?",
        "answer": "Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "lab-7-Q9",
        "topicId": "lab-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Fabric plan and EVPN fixture in this lesson.",
        "answer": "Two spines, four leaves and attachments. Synthetic route and import policy.",
        "explanation": "Offline intent, not discovered devices. No BGP session is executed.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "lab-7-Q10",
        "topicId": "lab-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Cisco Data Center Lab would exceed the exercise evidence?",
        "answer": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "lab-7-QC1",
        "topicId": "lab-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "lab-7-QC2",
        "topicId": "lab-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Withdraw the synthetic Blue App route while keeping the underlay intact, then distinguish control reachability loss from transport failure.",
        "explanation": "No BGP session is executed.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "lab-7-QC3",
        "topicId": "lab-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "ACI alternative: EPG/BD/VRF and contract mapping. Separate operating design.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "aci",
      "baseline": "Run the downloadable offline rehearsal and retain baseline, one-fault, exact-restore and cleanup evidence for the integrated design.",
      "fault": "The Blue App type-2 route is withdrawn in the owned JSON fixture while every underlay link remains available.",
      "restore": "Restore byte-identical baseline JSON, re-evaluate Blue delivery eligibility and Red isolation, and confirm removal of the owned temporary directory.",
      "scope": "Narrow inter-EPG policy relation within one enforced VRF, with no preferred groups, vzAny, unenforced mode, intra-EPG exceptions or service graphs. Attachment, route, deployed policy, matching consumer/provider contract and destination port must all agree. APIC availability is shown separately and does not erase existing policy in this bounded exercise."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 18 workbook",
        "path": "labs/cisco-dc-18-workbook.md"
      },
      {
        "title": "Offline two-spine/four-leaf fabric rehearsal",
        "path": "labs/cisco-dc-fabric.py"
      }
    ]
  }
];
