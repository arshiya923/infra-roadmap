'use strict';
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['17']=[
  {
    "id": "s7-g0-t0",
    "batch": "17",
    "title": "Cisco Nexus",
    "subtitle": "Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t0",
    "definition": "Cisco Nexus is a family of data-center switching platforms. Family identity does not establish a universal feature set. Hardware, operating mode, release, optics, entitlement and scale must fit the intended workload together.",
    "purpose": "Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Identify the product ID and installed modules before assigning port capabilities. The handoff to Operating mode is where a successful first observation can still lead to a failed transaction. Documentation presence is not universal support. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "Product ID: Exact hardware identity. A family name is insufficient.",
      "Operating mode: NX-OS or supported ACI mode. Management workflows differ.",
      "Support matrix: Feature applicability by combination. Documentation presence is not universal support."
    ],
    "mechanism": [
      "Identify the product ID and installed modules before assigning port capabilities.",
      "Separate management access, control computation and ASIC forwarding; one can work while another fails.",
      "Match the intended fabric feature to exact hardware and software documentation, then verify the original service."
    ],
    "flow": [
      [
        "Service boundary",
        "Cisco Nexus is a family of data-center switching platforms. Family identity does not establish a universal feature set. Hardware, operating mode, release, optics, entitlement and scale must fit the intended workload together."
      ],
      [
        "Product ID",
        "Identify the product ID and installed modules before assigning port capabilities."
      ],
      [
        "Operating mode",
        "Separate management access, control computation and ASIC forwarding; one can work while another fails."
      ],
      [
        "Support matrix",
        "Match the intended fabric feature to exact hardware and software documentation, then verify the original service."
      ]
    ],
    "comparison": [
      [
        "Product ID",
        "Exact hardware identity",
        "A family name is insufficient."
      ],
      [
        "Operating mode",
        "NX-OS or supported ACI mode",
        "Management workflows differ."
      ],
      [
        "Support matrix",
        "Feature applicability by combination",
        "Documentation presence is not universal support."
      ]
    ],
    "example": "Baseline task: Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale. Incident: A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven. Recovery requirement: Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan. Worked reasoning: A proposal names only Nexus. What blocks EVPN approval? Exact hardware, mode, release and support evidence are absent. Brand identity cannot settle compatibility. Alternative check: A virtual image accepts a command. What physical ASIC capability is proven? None. Parser behavior does not certify hardware support or scale.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow inventory",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Product ID and Operating mode. Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven. Rollback must restore the exact baseline: Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale. Assign an owner for the first failing boundary and a separate owner for service acceptance. Match the intended fabric feature to exact hardware and software documentation, then verify the original service. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven.",
        "Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan."
      ],
      [
        "The console works but hosts fail. Which planes need separate checks?",
        "Control routes, hardware forwarding and the endpoint path. Management is a different transaction."
      ],
      [
        "What is stronger acceptance than all links green?",
        "A named permitted application exchange and a prohibited-flow check. Carrier state does not validate isolation."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Documentation presence is not universal support. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Operating mode. Separate management access, control computation and ASIC forwarding; one can work while another fails. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Brand identity cannot settle compatibility.",
      "Management is a different transaction.",
      "Speed is only one constraint.",
      "Parser behavior does not certify hardware support or scale.",
      "Carrier state does not validate isolation.",
      "It is not a current procurement recommendation."
    ],
    "prerequisites": [
      "s6-g3-t0"
    ],
    "related": [
      "s7-g0-t1"
    ],
    "lab": {
      "objective": "Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Server NIC → Nexus access port → uplink → destination service",
        "Console/OOB → exact product, mode and release record"
      ],
      "steps": [
        "Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven.",
        "Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven. A named permitted application exchange and a prohibited-flow check. Carrier state does not validate isolation.",
      "challenge": "How should legacy Nexus coverage be used? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Product ID": "Exact hardware identity. A family name is insufficient.",
      "Operating mode": "NX-OS or supported ACI mode. Management workflows differ.",
      "Support matrix": "Feature applicability by combination. Documentation presence is not universal support."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): upgrade and mode conversion",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/upgrade/cisco-nexus-9000-series-nx-os-software-upgrade-and-downgrade-guide-105x.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t0-Q1",
        "topicId": "s7-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "A proposal names only Nexus. What blocks EVPN approval?",
        "answer": "Exact hardware, mode, release and support evidence are absent.",
        "explanation": "Brand identity cannot settle compatibility.",
        "testedConcept": "Product ID"
      },
      {
        "questionId": "s7-g0-t0-Q2",
        "topicId": "s7-g0-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "The console works but hosts fail. Which planes need separate checks?",
        "answer": "Control routes, hardware forwarding and the endpoint path.",
        "explanation": "Management is a different transaction.",
        "testedConcept": "Operating mode"
      },
      {
        "questionId": "s7-g0-t0-Q3",
        "topicId": "s7-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a supported port speed prove an optic works?",
        "answer": "No; check optic, cable, distance and software compatibility.",
        "explanation": "Speed is only one constraint.",
        "testedConcept": "Support matrix"
      },
      {
        "questionId": "s7-g0-t0-Q4",
        "topicId": "s7-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "A virtual image accepts a command. What physical ASIC capability is proven?",
        "answer": "None.",
        "explanation": "Parser behavior does not certify hardware support or scale.",
        "testedConcept": "Product ID"
      },
      {
        "questionId": "s7-g0-t0-Q5",
        "topicId": "s7-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is stronger acceptance than all links green?",
        "answer": "A named permitted application exchange and a prohibited-flow check.",
        "explanation": "Carrier state does not validate isolation.",
        "testedConcept": "Operating mode"
      },
      {
        "questionId": "s7-g0-t0-Q6",
        "topicId": "s7-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How should legacy Nexus coverage be used?",
        "answer": "As architectural context with exact lifecycle checks separately.",
        "explanation": "It is not a current procurement recommendation.",
        "testedConcept": "Support matrix"
      },
      {
        "questionId": "s7-g0-t0-Q7",
        "topicId": "s7-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Cisco Nexus incident, what is the failing evidence boundary?",
        "answer": "A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t0-Q8",
        "topicId": "s7-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Cisco Nexus incident?",
        "answer": "Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t0-Q9",
        "topicId": "s7-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Product ID and Operating mode in this lesson.",
        "answer": "Exact hardware identity. NX-OS or supported ACI mode.",
        "explanation": "A family name is insufficient. Management workflows differ.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t0-Q10",
        "topicId": "s7-g0-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Cisco Nexus would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t0-QC1",
        "topicId": "s7-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t0-QC2",
        "topicId": "s7-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Separate management access, control computation and ASIC forwarding; one can work while another fails.",
        "explanation": "Management workflows differ.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t0-QC3",
        "topicId": "s7-g0-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Support matrix: Feature applicability by combination. Documentation presence is not universal support.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Build a leaf suitability record with product ID, active release, mode, required EVPN features, optics, port rates and scale.",
      "fault": "A procurement sheet says Nexus but omits product ID and release; overlay support remains unproven.",
      "restore": "Add exact compatibility evidence and re-evaluate the workload and recovery requirements before approving the plan.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t1",
    "batch": "17",
    "title": "NX-OS",
    "subtitle": "Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t1",
    "definition": "NX-OS provides data-center switching control, management and feature processes. Similarities with other Cisco CLIs do not establish identical syntax, defaults, persistence or upgrade behavior.",
    "purpose": "Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Enabling a feature exposes functionality but does not create addressing, neighbors or policy. The handoff to Startup configuration is where a successful first observation can still lead to a failed transaction. Additional operational dependencies remain. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "Running configuration: Active intended state. Not a traffic observation.",
      "Startup configuration: Persisted boot intent. Save verified state deliberately.",
      "Feature state: Enabled function. Additional operational dependencies remain."
    ],
    "mechanism": [
      "Enabling a feature exposes functionality but does not create addressing, neighbors or policy.",
      "Running configuration describes active intent; startup state matters at the next boot.",
      "Redundancy and software modularity do not guarantee every upgrade is nondisruptive; verify the exact path."
    ],
    "flow": [
      [
        "Service boundary",
        "NX-OS provides data-center switching control, management and feature processes. Similarities with other Cisco CLIs do not establish identical syntax, defaults, persistence or upgrade behavior."
      ],
      [
        "Running configuration",
        "Enabling a feature exposes functionality but does not create addressing, neighbors or policy."
      ],
      [
        "Startup configuration",
        "Running configuration describes active intent; startup state matters at the next boot."
      ],
      [
        "Feature state",
        "Redundancy and software modularity do not guarantee every upgrade is nondisruptive; verify the exact path."
      ]
    ],
    "comparison": [
      [
        "Running configuration",
        "Active intended state",
        "Not a traffic observation."
      ],
      [
        "Startup configuration",
        "Persisted boot intent",
        "Save verified state deliberately."
      ],
      [
        "Feature state",
        "Enabled function",
        "Additional operational dependencies remain."
      ]
    ],
    "example": "Baseline task: Compare sanitized running/startup baselines, feature state and version before proposing a narrow change. Incident: A neighbor address is documented but the corresponding feature is disabled in the readiness record. Recovery requirement: Restore the intended feature state in the plan and require separate neighbor and forwarding verification. Worked reasoning: BGP is enabled. Is EVPN ready? No; family activation, peers, policy and forwarding remain. Feature activation is only a prerequisite. Alternative check: What must precede saving configuration? A reviewed diff and functional and isolation checks. Saving a fault preserves it.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow feature",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Running configuration and Startup configuration. Restore the intended feature state in the plan and require separate neighbor and forwarding verification. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Compare sanitized running/startup baselines, feature state and version before proposing a narrow change. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A neighbor address is documented but the corresponding feature is disabled in the readiness record. Rollback must restore the exact baseline: Restore the intended feature state in the plan and require separate neighbor and forwarding verification. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Compare sanitized running/startup baselines, feature state and version before proposing a narrow change. Assign an owner for the first failing boundary and a separate owner for service acceptance. Redundancy and software modularity do not guarantee every upgrade is nondisruptive; verify the exact path. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A neighbor address is documented but the corresponding feature is disabled in the readiness record.",
        "Restore the intended feature state in the plan and require separate neighbor and forwarding verification."
      ],
      [
        "A change vanishes after reboot. Which boundary is suspect?",
        "Verified running state was not persisted appropriately. Runtime and startup state can differ."
      ],
      [
        "Why is removing a whole feature a poor rollback for one neighbor edit?",
        "It can affect unrelated users of that feature. Rollback should match the owned change."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Additional operational dependencies remain. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Startup configuration. Running configuration describes active intent; startup state matters at the next boot. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Feature activation is only a prerequisite.",
      "Runtime and startup state can differ.",
      "Redundancy does not remove all disruption modes.",
      "Saving a fault preserves it.",
      "Rollback should match the owned change.",
      "A local checkpoint shares the device failure domain."
    ],
    "prerequisites": [
      "s7-g0-t0"
    ],
    "related": [
      "s7-g0-t2"
    ],
    "lab": {
      "objective": "Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Operator → active feature/configuration → protocol state → hardware forwarding",
        "Verified running intent → deliberate persistence → next-boot intent"
      ],
      "steps": [
        "Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A neighbor address is documented but the corresponding feature is disabled in the readiness record.",
        "Restore the intended feature state in the plan and require separate neighbor and forwarding verification.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the intended feature state in the plan and require separate neighbor and forwarding verification. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A neighbor address is documented but the corresponding feature is disabled in the readiness record. It can affect unrelated users of that feature. Rollback should match the owned change.",
      "challenge": "Why retain an off-device configuration export? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Running configuration": "Active intended state. Not a traffic observation.",
      "Startup configuration": "Persisted boot intent. Save verified state deliberately.",
      "Feature state": "Enabled function. Additional operational dependencies remain."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): upgrade and mode conversion",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/upgrade/cisco-nexus-9000-series-nx-os-software-upgrade-and-downgrade-guide-105x.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t1-Q1",
        "topicId": "s7-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "BGP is enabled. Is EVPN ready?",
        "answer": "No; family activation, peers, policy and forwarding remain.",
        "explanation": "Feature activation is only a prerequisite.",
        "testedConcept": "Running configuration"
      },
      {
        "questionId": "s7-g0-t1-Q2",
        "topicId": "s7-g0-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "A change vanishes after reboot. Which boundary is suspect?",
        "answer": "Verified running state was not persisted appropriately.",
        "explanation": "Runtime and startup state can differ.",
        "testedConcept": "Startup configuration"
      },
      {
        "questionId": "s7-g0-t1-Q3",
        "topicId": "s7-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a redundant supervisor guarantee a hitless upgrade?",
        "answer": "No; consult the exact supported path and limitations.",
        "explanation": "Redundancy does not remove all disruption modes.",
        "testedConcept": "Feature state"
      },
      {
        "questionId": "s7-g0-t1-Q4",
        "topicId": "s7-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must precede saving configuration?",
        "answer": "A reviewed diff and functional and isolation checks.",
        "explanation": "Saving a fault preserves it.",
        "testedConcept": "Running configuration"
      },
      {
        "questionId": "s7-g0-t1-Q5",
        "topicId": "s7-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why is removing a whole feature a poor rollback for one neighbor edit?",
        "answer": "It can affect unrelated users of that feature.",
        "explanation": "Rollback should match the owned change.",
        "testedConcept": "Startup configuration"
      },
      {
        "questionId": "s7-g0-t1-Q6",
        "topicId": "s7-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why retain an off-device configuration export?",
        "answer": "It survives device storage or management failure.",
        "explanation": "A local checkpoint shares the device failure domain.",
        "testedConcept": "Feature state"
      },
      {
        "questionId": "s7-g0-t1-Q7",
        "topicId": "s7-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the NX-OS incident, what is the failing evidence boundary?",
        "answer": "A neighbor address is documented but the corresponding feature is disabled in the readiness record.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t1-Q8",
        "topicId": "s7-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this NX-OS incident?",
        "answer": "Restore the intended feature state in the plan and require separate neighbor and forwarding verification.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t1-Q9",
        "topicId": "s7-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Running configuration and Startup configuration in this lesson.",
        "answer": "Active intended state. Persisted boot intent.",
        "explanation": "Not a traffic observation. Save verified state deliberately.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t1-Q10",
        "topicId": "s7-g0-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about NX-OS would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t1-QC1",
        "topicId": "s7-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t1-QC2",
        "topicId": "s7-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Running configuration describes active intent; startup state matters at the next boot.",
        "explanation": "Save verified state deliberately.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t1-QC3",
        "topicId": "s7-g0-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Feature state: Enabled function. Additional operational dependencies remain.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Compare sanitized running/startup baselines, feature state and version before proposing a narrow change.",
      "fault": "A neighbor address is documented but the corresponding feature is disabled in the readiness record.",
      "restore": "Restore the intended feature state in the plan and require separate neighbor and forwarding verification.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t2",
    "batch": "17",
    "title": "Nexus CLI",
    "subtitle": "Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t2",
    "definition": "Nexus CLI work is performed in a specific device, privilege and configuration context. A useful transcript records target identity, time and evidence boundaries; successful command parsing does not prove service correctness.",
    "purpose": "Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Anchor observations to exact target identity and software before interpreting state. The handoff to Counter delta is where a successful first observation can still lead to a failed transaction. A default can differ from the baseline. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "Context: Target and privilege scope. A prompt does not prove ownership.",
      "Counter delta: Change between timed samples. Old totals do not establish current rate.",
      "Rollback: Exact owned prior state. A default can differ from the baseline."
    ],
    "mechanism": [
      "Anchor observations to exact target identity and software before interpreting state.",
      "Compare timed interface counter deltas with workload symptoms rather than diagnosing from cumulative totals.",
      "Capture the owned baseline and applied diff; restore that baseline rather than assuming command negation recreates it."
    ],
    "flow": [
      [
        "Service boundary",
        "Nexus CLI work is performed in a specific device, privilege and configuration context. A useful transcript records target identity, time and evidence boundaries; successful command parsing does not prove service correctness."
      ],
      [
        "Context",
        "Anchor observations to exact target identity and software before interpreting state."
      ],
      [
        "Counter delta",
        "Compare timed interface counter deltas with workload symptoms rather than diagnosing from cumulative totals."
      ],
      [
        "Rollback",
        "Capture the owned baseline and applied diff; restore that baseline rather than assuming command negation recreates it."
      ]
    ],
    "comparison": [
      [
        "Context",
        "Target and privilege scope",
        "A prompt does not prove ownership."
      ],
      [
        "Counter delta",
        "Change between timed samples",
        "Old totals do not establish current rate."
      ],
      [
        "Rollback",
        "Exact owned prior state",
        "A default can differ from the baseline."
      ]
    ],
    "example": "Baseline task: Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove. Incident: A large error counter without sample time is labelled an active fault. Recovery requirement: Collect two timed samples and correlate the delta with the original service symptom before assigning a cause. Worked reasoning: Does one million cumulative interface errors prove a current fault? No; compare timed deltas and present symptoms. The total has no rate boundary. Alternative check: Why is no followed by a command not always exact rollback? It may restore a default instead of the prior setting. The baseline can be nondefault.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow interface brief\nshow feature",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Context and Counter delta. Collect two timed samples and correlate the delta with the original service symptom before assigning a cause. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A large error counter without sample time is labelled an active fault. Rollback must restore the exact baseline: Collect two timed samples and correlate the delta with the original service symptom before assigning a cause. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove. Assign an owner for the first failing boundary and a separate owner for service acceptance. Capture the owned baseline and applied diff; restore that baseline rather than assuming command negation recreates it. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A large error counter without sample time is labelled an active fault.",
        "Collect two timed samples and correlate the delta with the original service symptom before assigning a cause."
      ],
      [
        "What must be confirmed before pasting a configuration block?",
        "Target, context, privilege, release and ownership. Correct syntax on the wrong target remains harmful."
      ],
      [
        "A paste fails halfway through. What should happen next?",
        "Stop and reconcile the partial applied state. A block is not necessarily atomic."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. A default can differ from the baseline. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Counter delta. Compare timed interface counter deltas with workload symptoms rather than diagnosing from cumulative totals. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "The total has no rate boundary.",
      "Correct syntax on the wrong target remains harmful.",
      "Preserve observations before changing them.",
      "The baseline can be nondefault.",
      "A block is not necessarily atomic.",
      "Offline checks cannot certify the vendor parser."
    ],
    "prerequisites": [
      "s7-g0-t1"
    ],
    "related": [
      "s7-g0-t3"
    ],
    "lab": {
      "objective": "Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Read-only observer → console or management path → identified target",
        "Timed sample A → original workload → timed sample B"
      ],
      "steps": [
        "Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A large error counter without sample time is labelled an active fault.",
        "Collect two timed samples and correlate the delta with the original service symptom before assigning a cause.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Collect two timed samples and correlate the delta with the original service symptom before assigning a cause. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A large error counter without sample time is labelled an active fault. Stop and reconcile the partial applied state. A block is not necessarily atomic.",
      "challenge": "Have the Cisco examples been executed on real hardware here? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Context": "Target and privilege scope. A prompt does not prove ownership.",
      "Counter delta": "Change between timed samples. Old totals do not establish current rate.",
      "Rollback": "Exact owned prior state. A default can differ from the baseline."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): vPC",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): upgrade and mode conversion",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/upgrade/cisco-nexus-9000-series-nx-os-software-upgrade-and-downgrade-guide-105x.pdf",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t2-Q1",
        "topicId": "s7-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does one million cumulative interface errors prove a current fault?",
        "answer": "No; compare timed deltas and present symptoms.",
        "explanation": "The total has no rate boundary.",
        "testedConcept": "Context"
      },
      {
        "questionId": "s7-g0-t2-Q2",
        "topicId": "s7-g0-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What must be confirmed before pasting a configuration block?",
        "answer": "Target, context, privilege, release and ownership.",
        "explanation": "Correct syntax on the wrong target remains harmful.",
        "testedConcept": "Counter delta"
      },
      {
        "questionId": "s7-g0-t2-Q3",
        "topicId": "s7-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid clearing counters first?",
        "answer": "It destroys historical evidence before capture.",
        "explanation": "Preserve observations before changing them.",
        "testedConcept": "Rollback"
      },
      {
        "questionId": "s7-g0-t2-Q4",
        "topicId": "s7-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why is no followed by a command not always exact rollback?",
        "answer": "It may restore a default instead of the prior setting.",
        "explanation": "The baseline can be nondefault.",
        "testedConcept": "Context"
      },
      {
        "questionId": "s7-g0-t2-Q5",
        "topicId": "s7-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "A paste fails halfway through. What should happen next?",
        "answer": "Stop and reconcile the partial applied state.",
        "explanation": "A block is not necessarily atomic.",
        "testedConcept": "Counter delta"
      },
      {
        "questionId": "s7-g0-t2-Q6",
        "topicId": "s7-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Have the Cisco examples been executed on real hardware here?",
        "answer": "No; they are scoped guided commands.",
        "explanation": "Offline checks cannot certify the vendor parser.",
        "testedConcept": "Rollback"
      },
      {
        "questionId": "s7-g0-t2-Q7",
        "topicId": "s7-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Nexus CLI incident, what is the failing evidence boundary?",
        "answer": "A large error counter without sample time is labelled an active fault.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t2-Q8",
        "topicId": "s7-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Nexus CLI incident?",
        "answer": "Collect two timed samples and correlate the delta with the original service symptom before assigning a cause.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t2-Q9",
        "topicId": "s7-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Context and Counter delta in this lesson.",
        "answer": "Target and privilege scope. Change between timed samples.",
        "explanation": "A prompt does not prove ownership. Old totals do not establish current rate.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t2-Q10",
        "topicId": "s7-g0-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Nexus CLI would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t2-QC1",
        "topicId": "s7-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t2-QC2",
        "topicId": "s7-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Compare timed interface counter deltas with workload symptoms rather than diagnosing from cumulative totals.",
        "explanation": "Old totals do not establish current rate.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t2-QC3",
        "topicId": "s7-g0-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Rollback: Exact owned prior state. A default can differ from the baseline.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Prepare a read-only transcript with identity, feature and interface observations; annotate what each line cannot prove.",
      "fault": "A large error counter without sample time is labelled an active fault.",
      "restore": "Collect two timed samples and correlate the delta with the original service symptom before assigning a cause.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t3",
    "batch": "17",
    "title": "Nexus architecture",
    "subtitle": "Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t3",
    "definition": "Nexus architecture separates management, control processes and hardware forwarding. Modular systems add supervisor, line-card and fabric dependencies. Logical isolation and duplicated modules protect selected boundaries but share physical resources.",
    "purpose": "Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Ingress parsing and lookups select policy, adjacency and egress treatment. The handoff to Supervisor is where a successful first observation can still lead to a failed transaction. Failure-state capacity is model-specific. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "ASIC: Packet-processing hardware. Finite tables and queues.",
      "Supervisor: Control and management module. Not a second chassis.",
      "Fabric module: Internal cross-card transport. Failure-state capacity is model-specific."
    ],
    "mechanism": [
      "Ingress parsing and lookups select policy, adjacency and egress treatment.",
      "Control protocols compute state that must be programmed into finite forwarding tables and queues.",
      "Cross-card traffic uses available fabric resources while power and chassis services remain common dependencies."
    ],
    "flow": [
      [
        "Service boundary",
        "Nexus architecture separates management, control processes and hardware forwarding. Modular systems add supervisor, line-card and fabric dependencies. Logical isolation and duplicated modules protect selected boundaries but share physical resources."
      ],
      [
        "ASIC",
        "Ingress parsing and lookups select policy, adjacency and egress treatment."
      ],
      [
        "Supervisor",
        "Control protocols compute state that must be programmed into finite forwarding tables and queues."
      ],
      [
        "Fabric module",
        "Cross-card traffic uses available fabric resources while power and chassis services remain common dependencies."
      ]
    ],
    "comparison": [
      [
        "ASIC",
        "Packet-processing hardware",
        "Finite tables and queues."
      ],
      [
        "Supervisor",
        "Control and management module",
        "Not a second chassis."
      ],
      [
        "Fabric module",
        "Internal cross-card transport",
        "Failure-state capacity is model-specific."
      ]
    ],
    "example": "Baseline task: Draw a packet path with the table, queue, process and physical module responsible at each boundary. Incident: A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved. Recovery requirement: After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing. Worked reasoning: A route is present but delivery fails. What additional state matters? Forwarding programming, adjacency and egress behavior. Computed state is not packet delivery. Alternative check: What limits policy scale beyond port count? Hardware table allocation and feature combinations. Interfaces do not describe TCAM capacity.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show module\nshow interface brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against ASIC and Supervisor. After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Draw a packet path with the table, queue, process and physical module responsible at each boundary. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved. Rollback must restore the exact baseline: After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Draw a packet path with the table, queue, process and physical module responsible at each boundary. Assign an owner for the first failing boundary and a separate owner for service acceptance. Cross-card traffic uses available fabric resources while power and chassis services remain common dependencies. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved.",
        "After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing."
      ],
      [
        "What do two supervisors leave shared?",
        "Chassis, fabric, power and other common dependencies. Control redundancy is not two systems."
      ],
      [
        "Does cut-through remove queue delay?",
        "No; egress contention can still buffer traffic. Forwarding mode is one latency component."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Failure-state capacity is model-specific. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Supervisor. Control protocols compute state that must be programmed into finite forwarding tables and queues. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Computed state is not packet delivery.",
      "Control redundancy is not two systems.",
      "Averages hide transient contention.",
      "Interfaces do not describe TCAM capacity.",
      "Forwarding mode is one latency component.",
      "Healthy totals overstate the failure envelope."
    ],
    "prerequisites": [
      "s7-g0-t0"
    ],
    "related": [
      "s7-g0-t4"
    ],
    "lab": {
      "objective": "Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Ingress port → lookup/policy ASIC → fabric when needed → egress ASIC/queue → destination",
        "Control process → programmed forwarding table"
      ],
      "steps": [
        "Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved.",
        "After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved. No; egress contention can still buffer traffic. Forwarding mode is one latency component.",
      "challenge": "What should a fabric capacity estimate use during maintenance? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "ASIC": "Packet-processing hardware. Finite tables and queues.",
      "Supervisor": "Control and management module. Not a second chassis.",
      "Fabric module": "Internal cross-card transport. Failure-state capacity is model-specific."
    },
    "sources": [
      {
        "title": "Nexus 7000: historical VDC architecture",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/sw/nx-os/virtual_device_context/configuration/guide/b-7k-Cisco-Nexus-7000-Series-NX-OS-Virtual-Device-Context-Configuration-Guide/m-overview-vdcs.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 3000 NX-OS 7.x: historical switching modes",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/layer2/7x/b_Cisco_Nexus_3000_Layer_2_Switching_Config_7x/b_Cisco_Nexus_3000_Layer_2_Switching_Config_7x_chapter_0101.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t3-Q1",
        "topicId": "s7-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "A route is present but delivery fails. What additional state matters?",
        "answer": "Forwarding programming, adjacency and egress behavior.",
        "explanation": "Computed state is not packet delivery.",
        "testedConcept": "ASIC"
      },
      {
        "questionId": "s7-g0-t3-Q2",
        "topicId": "s7-g0-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What do two supervisors leave shared?",
        "answer": "Chassis, fabric, power and other common dependencies.",
        "explanation": "Control redundancy is not two systems.",
        "testedConcept": "Supervisor"
      },
      {
        "questionId": "s7-g0-t3-Q3",
        "topicId": "s7-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can low mean utilization accompany drops?",
        "answer": "Short bursts can exhaust queues.",
        "explanation": "Averages hide transient contention.",
        "testedConcept": "Fabric module"
      },
      {
        "questionId": "s7-g0-t3-Q4",
        "topicId": "s7-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What limits policy scale beyond port count?",
        "answer": "Hardware table allocation and feature combinations.",
        "explanation": "Interfaces do not describe TCAM capacity.",
        "testedConcept": "ASIC"
      },
      {
        "questionId": "s7-g0-t3-Q5",
        "topicId": "s7-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does cut-through remove queue delay?",
        "answer": "No; egress contention can still buffer traffic.",
        "explanation": "Forwarding mode is one latency component.",
        "testedConcept": "Supervisor"
      },
      {
        "questionId": "s7-g0-t3-Q6",
        "topicId": "s7-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What should a fabric capacity estimate use during maintenance?",
        "answer": "The surviving modules and links under the named fault.",
        "explanation": "Healthy totals overstate the failure envelope.",
        "testedConcept": "Fabric module"
      },
      {
        "questionId": "s7-g0-t3-Q7",
        "topicId": "s7-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Nexus architecture incident, what is the failing evidence boundary?",
        "answer": "A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t3-Q8",
        "topicId": "s7-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Nexus architecture incident?",
        "answer": "After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t3-Q9",
        "topicId": "s7-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between ASIC and Supervisor in this lesson.",
        "answer": "Packet-processing hardware. Control and management module.",
        "explanation": "Finite tables and queues. Not a second chassis.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t3-Q10",
        "topicId": "s7-g0-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Nexus architecture would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t3-QC1",
        "topicId": "s7-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t3-QC2",
        "topicId": "s7-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Control protocols compute state that must be programmed into finite forwarding tables and queues.",
        "explanation": "Not a second chassis.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t3-QC3",
        "topicId": "s7-g0-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Fabric module: Internal cross-card transport. Failure-state capacity is model-specific.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Draw a packet path with the table, queue, process and physical module responsible at each boundary.",
      "fault": "A route exists in control state but a forwarding entry is missing; the control/data boundary is unresolved.",
      "restore": "After a supported repair, compare both tables and repeat the original flow rather than closing on a route listing.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t4",
    "batch": "17",
    "title": "Nexus 3000",
    "subtitle": "Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t4",
    "definition": "Nexus 3000 models commonly appear in fixed-form and latency-sensitive data-center roles. Exact models differ in buffers, port rates and features. A quoted unloaded forwarding latency is not an application tail-latency guarantee.",
    "purpose": "Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Identify the exact switch and release before comparing workload requirements. The handoff to Serialization is where a successful first observation can still lead to a failed transaction. Needs workload and sample context. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "Cut-through: Early forwarding when supported. Does not prevent congestion.",
      "Serialization: Time to transmit bits. Depends on packet size and link rate.",
      "Tail latency: High-percentile delay. Needs workload and sample context."
    ],
    "mechanism": [
      "Identify the exact switch and release before comparing workload requirements.",
      "Separate serialization, lookup and queueing; speed conversion can change forwarding behavior.",
      "Measure a latency distribution under realistic offered load and packet sizes rather than treating an unloaded figure as a bound."
    ],
    "flow": [
      [
        "Service boundary",
        "Nexus 3000 models commonly appear in fixed-form and latency-sensitive data-center roles. Exact models differ in buffers, port rates and features. A quoted unloaded forwarding latency is not an application tail-latency guarantee."
      ],
      [
        "Cut-through",
        "Identify the exact switch and release before comparing workload requirements."
      ],
      [
        "Serialization",
        "Separate serialization, lookup and queueing; speed conversion can change forwarding behavior."
      ],
      [
        "Tail latency",
        "Measure a latency distribution under realistic offered load and packet sizes rather than treating an unloaded figure as a bound."
      ]
    ],
    "comparison": [
      [
        "Cut-through",
        "Early forwarding when supported",
        "Does not prevent congestion."
      ],
      [
        "Serialization",
        "Time to transmit bits",
        "Depends on packet size and link rate."
      ],
      [
        "Tail latency",
        "High-percentile delay",
        "Needs workload and sample context."
      ]
    ],
    "example": "Baseline task: Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays. Incident: A specification latency is substituted for peak-load application p99. Recovery requirement: Retain the specification separately and add workload, contention and measured latency-distribution evidence. Worked reasoning: Does a low data-sheet latency bound application p99? No; host, queues and application delays remain. The measurement scope is narrower. Alternative check: Does cut-through check the full frame before any transmission? Not necessarily. Early forwarding can precede the final integrity check.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow interface brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Cut-through and Serialization. Retain the specification separately and add workload, contention and measured latency-distribution evidence. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A specification latency is substituted for peak-load application p99. Rollback must restore the exact baseline: Retain the specification separately and add workload, contention and measured latency-distribution evidence. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays. Assign an owner for the first failing boundary and a separate owner for service acceptance. Measure a latency distribution under realistic offered load and packet sizes rather than treating an unloaded figure as a bound. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A specification latency is substituted for peak-load application p99.",
        "Retain the specification separately and add workload, contention and measured latency-distribution evidence."
      ],
      [
        "Why can many senders overwhelm a fast switch?",
        "Their sum can exceed one egress capacity and buffer budget. Ingress aggregate does not enlarge one output."
      ],
      [
        "Why test multiple packet sizes?",
        "Packet rate and serialization stress different limits. Equal bit rates are not equal packet workloads."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Needs workload and sample context. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Serialization. Separate serialization, lookup and queueing; speed conversion can change forwarding behavior. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "The measurement scope is narrower.",
      "Ingress aggregate does not enlarge one output.",
      "Rate conversion affects the path.",
      "Early forwarding can precede the final integrity check.",
      "Equal bit rates are not equal packet workloads.",
      "The worksheet examines evidence, not silicon performance."
    ],
    "prerequisites": [
      "s7-g0-t3"
    ],
    "related": [
      "s7-g0-t5"
    ],
    "lab": {
      "objective": "Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Many test senders → ingress ports → shared egress queue → one receiver",
        "Unloaded specification → separate loaded latency distribution"
      ],
      "steps": [
        "Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A specification latency is substituted for peak-load application p99.",
        "Retain the specification separately and add workload, contention and measured latency-distribution evidence.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Retain the specification separately and add workload, contention and measured latency-distribution evidence. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A specification latency is substituted for peak-load application p99. Packet rate and serialization stress different limits. Equal bit rates are not equal packet workloads.",
      "challenge": "What physical benchmark was performed for this lesson? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Cut-through": "Early forwarding when supported. Does not prevent congestion.",
      "Serialization": "Time to transmit bits. Depends on packet size and link rate.",
      "Tail latency": "High-percentile delay. Needs workload and sample context."
    },
    "sources": [
      {
        "title": "Nexus 3000 NX-OS 7.x: historical switching modes",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/layer2/7x/b_Cisco_Nexus_3000_Layer_2_Switching_Config_7x/b_Cisco_Nexus_3000_Layer_2_Switching_Config_7x_chapter_0101.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t4-Q1",
        "topicId": "s7-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does a low data-sheet latency bound application p99?",
        "answer": "No; host, queues and application delays remain.",
        "explanation": "The measurement scope is narrower.",
        "testedConcept": "Cut-through"
      },
      {
        "questionId": "s7-g0-t4-Q2",
        "topicId": "s7-g0-t4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can many senders overwhelm a fast switch?",
        "answer": "Their sum can exceed one egress capacity and buffer budget.",
        "explanation": "Ingress aggregate does not enlarge one output.",
        "testedConcept": "Serialization"
      },
      {
        "questionId": "s7-g0-t4-Q3",
        "topicId": "s7-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What happens to serialization when the output port is slower?",
        "answer": "It takes longer and buffering may be needed.",
        "explanation": "Rate conversion affects the path.",
        "testedConcept": "Tail latency"
      },
      {
        "questionId": "s7-g0-t4-Q4",
        "topicId": "s7-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does cut-through check the full frame before any transmission?",
        "answer": "Not necessarily.",
        "explanation": "Early forwarding can precede the final integrity check.",
        "testedConcept": "Cut-through"
      },
      {
        "questionId": "s7-g0-t4-Q5",
        "topicId": "s7-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test multiple packet sizes?",
        "answer": "Packet rate and serialization stress different limits.",
        "explanation": "Equal bit rates are not equal packet workloads.",
        "testedConcept": "Serialization"
      },
      {
        "questionId": "s7-g0-t4-Q6",
        "topicId": "s7-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What physical benchmark was performed for this lesson?",
        "answer": "None.",
        "explanation": "The worksheet examines evidence, not silicon performance.",
        "testedConcept": "Tail latency"
      },
      {
        "questionId": "s7-g0-t4-Q7",
        "topicId": "s7-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Nexus 3000 incident, what is the failing evidence boundary?",
        "answer": "A specification latency is substituted for peak-load application p99.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t4-Q8",
        "topicId": "s7-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Nexus 3000 incident?",
        "answer": "Retain the specification separately and add workload, contention and measured latency-distribution evidence.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t4-Q9",
        "topicId": "s7-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Cut-through and Serialization in this lesson.",
        "answer": "Early forwarding when supported. Time to transmit bits.",
        "explanation": "Does not prevent congestion. Depends on packet size and link rate.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t4-Q10",
        "topicId": "s7-g0-t4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Nexus 3000 would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t4-QC1",
        "topicId": "s7-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t4-QC2",
        "topicId": "s7-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Separate serialization, lookup and queueing; speed conversion can change forwarding behavior.",
        "explanation": "Depends on packet size and link rate.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t4-QC3",
        "topicId": "s7-g0-t4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Tail latency: High-percentile delay. Needs workload and sample context.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Compare an unloaded switching claim with a bursty many-to-one workload and identify unmeasured delays.",
      "fault": "A specification latency is substituted for peak-load application p99.",
      "restore": "Retain the specification separately and add workload, contention and measured latency-distribution evidence.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t5",
    "batch": "17",
    "title": "Nexus 5000",
    "subtitle": "Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t5",
    "definition": "Nexus 5000/5500 platforms illustrate historical unified-fabric designs using Ethernet and supported Fibre Channel over Ethernet functions. Ethernet carrier, storage login and completed storage I/O are separate evidence boundaries.",
    "purpose": "Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. A supported converged adapter carries Fibre Channel frames inside Ethernet on the FCoE path. The handoff to VSAN is where a successful first observation can still lead to a failed transaction. Needs compatible host and fabric support. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "FCoE: Fibre Channel in Ethernet. Not iSCSI.",
      "VSAN: Logical Fibre Channel fabric. Distinct from Ethernet VLAN.",
      "CNA: Converged network adapter. Needs compatible host and fabric support."
    ],
    "mechanism": [
      "A supported converged adapter carries Fibre Channel frames inside Ethernet on the FCoE path.",
      "Map physical attachment, FCoE VLAN and VSAN explicitly rather than treating storage as ordinary IP routing.",
      "Verify the supported lossless-class and fabric design along with storage login and I/O, not just Ethernet reachability."
    ],
    "flow": [
      [
        "Service boundary",
        "Nexus 5000/5500 platforms illustrate historical unified-fabric designs using Ethernet and supported Fibre Channel over Ethernet functions. Ethernet carrier, storage login and completed storage I/O are separate evidence boundaries."
      ],
      [
        "FCoE",
        "A supported converged adapter carries Fibre Channel frames inside Ethernet on the FCoE path."
      ],
      [
        "VSAN",
        "Map physical attachment, FCoE VLAN and VSAN explicitly rather than treating storage as ordinary IP routing."
      ],
      [
        "CNA",
        "Verify the supported lossless-class and fabric design along with storage login and I/O, not just Ethernet reachability."
      ]
    ],
    "comparison": [
      [
        "FCoE",
        "Fibre Channel in Ethernet",
        "Not iSCSI."
      ],
      [
        "VSAN",
        "Logical Fibre Channel fabric",
        "Distinct from Ethernet VLAN."
      ],
      [
        "CNA",
        "Converged network adapter",
        "Needs compatible host and fabric support."
      ]
    ],
    "example": "Baseline task: Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints. Incident: Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success. Recovery requirement: Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence. Worked reasoning: Does Ethernet up prove FCoE storage access? No; fabric login, zoning and I/O remain. Carrier is only one boundary. Alternative check: Can an ordinary IP router forward FCoE as IP? No. FCoE is Ethernet encapsulation, not an IP overlay.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow feature",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against FCoE and VSAN. Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success. Rollback must restore the exact baseline: Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints. Assign an owner for the first failing boundary and a separate owner for service acceptance. Verify the supported lossless-class and fabric design along with storage login and I/O, not just Ethernet reachability. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success.",
        "Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence."
      ],
      [
        "Does FCoE use TCP 3260?",
        "No; that is associated with iSCSI. FCoE is a different transport."
      ],
      [
        "What makes migration acceptance stronger than ping?",
        "Controlled storage I/O with integrity evidence. IP reachability does not exercise the storage protocol."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Needs compatible host and fabric support. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: VSAN. Map physical attachment, FCoE VLAN and VSAN explicitly rather than treating storage as ordinary IP routing. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Carrier is only one boundary.",
      "FCoE is a different transport.",
      "Equal numbers do not make them equivalent.",
      "FCoE is Ethernet encapsulation, not an IP overlay.",
      "IP reachability does not exercise the storage protocol.",
      "Family identity is not universal support."
    ],
    "prerequisites": [
      "s7-g0-t3"
    ],
    "related": [
      "s7-g0-t6"
    ],
    "lab": {
      "objective": "Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "CNA → supported FCoE Ethernet attachment → Nexus storage function → FC fabric/storage",
        "Ethernet carrier → storage login → controlled I/O and integrity"
      ],
      "steps": [
        "Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success.",
        "Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success. Controlled storage I/O with integrity evidence. IP reachability does not exercise the storage protocol.",
      "challenge": "Does every 5000 model support every unified-fabric feature? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "FCoE": "Fibre Channel in Ethernet. Not iSCSI.",
      "VSAN": "Logical Fibre Channel fabric. Distinct from Ethernet VLAN.",
      "CNA": "Converged network adapter. Needs compatible host and fabric support."
    },
    "sources": [
      {
        "title": "Nexus 5500 NX-OS 7.x: historical fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus5500/sw/fundamentals/7x/b_5500_Fund_Config_7x/b_5500_Fund_Config_7x_chapter_010.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t5-Q1",
        "topicId": "s7-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does Ethernet up prove FCoE storage access?",
        "answer": "No; fabric login, zoning and I/O remain.",
        "explanation": "Carrier is only one boundary.",
        "testedConcept": "FCoE"
      },
      {
        "questionId": "s7-g0-t5-Q2",
        "topicId": "s7-g0-t5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does FCoE use TCP 3260?",
        "answer": "No; that is associated with iSCSI.",
        "explanation": "FCoE is a different transport.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "s7-g0-t5-Q3",
        "topicId": "s7-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why record VLAN and VSAN separately?",
        "answer": "They name different protocol scopes.",
        "explanation": "Equal numbers do not make them equivalent.",
        "testedConcept": "CNA"
      },
      {
        "questionId": "s7-g0-t5-Q4",
        "topicId": "s7-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can an ordinary IP router forward FCoE as IP?",
        "answer": "No.",
        "explanation": "FCoE is Ethernet encapsulation, not an IP overlay.",
        "testedConcept": "FCoE"
      },
      {
        "questionId": "s7-g0-t5-Q5",
        "topicId": "s7-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What makes migration acceptance stronger than ping?",
        "answer": "Controlled storage I/O with integrity evidence.",
        "explanation": "IP reachability does not exercise the storage protocol.",
        "testedConcept": "VSAN"
      },
      {
        "questionId": "s7-g0-t5-Q6",
        "topicId": "s7-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Does every 5000 model support every unified-fabric feature?",
        "answer": "No; check model, module, release and topology.",
        "explanation": "Family identity is not universal support.",
        "testedConcept": "CNA"
      },
      {
        "questionId": "s7-g0-t5-Q7",
        "topicId": "s7-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Nexus 5000 incident, what is the failing evidence boundary?",
        "answer": "Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t5-Q8",
        "topicId": "s7-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Nexus 5000 incident?",
        "answer": "Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t5-Q9",
        "topicId": "s7-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between FCoE and VSAN in this lesson.",
        "answer": "Fibre Channel in Ethernet. Logical Fibre Channel fabric.",
        "explanation": "Not iSCSI. Distinct from Ethernet VLAN.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t5-Q10",
        "topicId": "s7-g0-t5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Nexus 5000 would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t5-QC1",
        "topicId": "s7-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t5-QC2",
        "topicId": "s7-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Map physical attachment, FCoE VLAN and VSAN explicitly rather than treating storage as ordinary IP routing.",
        "explanation": "Distinct from Ethernet VLAN.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t5-QC3",
        "topicId": "s7-g0-t5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "CNA: Converged network adapter. Needs compatible host and fabric support.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Build a historical network/storage dependency map with separate Ethernet, fabric-login and I/O checkpoints.",
      "fault": "Ethernet is up but no storage login exists; a green link is incorrectly treated as storage success.",
      "restore": "Reconcile adapter, VLAN/VSAN and QoS intent, then require login and controlled test-I/O evidence.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t6",
    "batch": "17",
    "title": "Nexus 7000",
    "subtitle": "Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t6",
    "definition": "Nexus 7000 is a modular family associated with supervisor, line-card, fabric and supported Virtual Device Context designs. A VDC is a logical device boundary inside a chassis, not an independent physical failure domain.",
    "purpose": "Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Allocate supported interfaces and resources to contexts according to supervisor and software restrictions. The handoff to Line card is where a successful first observation can still lead to a failed transaction. Logical partitions do not remove it. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "VDC: Virtual Device Context. Broader than one routing table.",
      "Line card: Ports and forwarding resources. Support varies by card.",
      "Chassis domain: Shared physical dependency. Logical partitions do not remove it."
    ],
    "mechanism": [
      "Allocate supported interfaces and resources to contexts according to supervisor and software restrictions.",
      "Contexts maintain logical configuration and protocol state while sharing chassis dependencies.",
      "Trace cross-module forwarding and surviving fabric capacity before attributing resilience to duplicated control modules."
    ],
    "flow": [
      [
        "Service boundary",
        "Nexus 7000 is a modular family associated with supervisor, line-card, fabric and supported Virtual Device Context designs. A VDC is a logical device boundary inside a chassis, not an independent physical failure domain."
      ],
      [
        "VDC",
        "Allocate supported interfaces and resources to contexts according to supervisor and software restrictions."
      ],
      [
        "Line card",
        "Contexts maintain logical configuration and protocol state while sharing chassis dependencies."
      ],
      [
        "Chassis domain",
        "Trace cross-module forwarding and surviving fabric capacity before attributing resilience to duplicated control modules."
      ]
    ],
    "comparison": [
      [
        "VDC",
        "Virtual Device Context",
        "Broader than one routing table."
      ],
      [
        "Line card",
        "Ports and forwarding resources",
        "Support varies by card."
      ],
      [
        "Chassis domain",
        "Shared physical dependency",
        "Logical partitions do not remove it."
      ]
    ],
    "example": "Baseline task: Map two tenant contexts onto their shared physical resources and identify failures that affect both. Incident: Replicas in separate VDCs on one chassis are claimed to survive chassis loss. Recovery requirement: Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective. Worked reasoning: Are VDCs physically independent switches? No; they share the chassis. Logical separation is not physical duplication. Alternative check: Does a second supervisor double forwarding throughput? Not generally. Control redundancy is distinct from forwarding capacity.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show module\nshow version",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against VDC and Line card. Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Map two tenant contexts onto their shared physical resources and identify failures that affect both. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Replicas in separate VDCs on one chassis are claimed to survive chassis loss. Rollback must restore the exact baseline: Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Map two tenant contexts onto their shared physical resources and identify failures that affect both. Assign an owner for the first failing boundary and a separate owner for service acceptance. Trace cross-module forwarding and surviving fabric capacity before attributing resilience to duplicated control modules. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Replicas in separate VDCs on one chassis are claimed to survive chassis loss.",
        "Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective."
      ],
      [
        "Why inspect the supervisor before planning contexts?",
        "Supported limits depend on the platform combination. A generic guide is insufficient."
      ],
      [
        "Can every line card be assumed feature-compatible?",
        "No; inspect exact card and release support. Chassis membership does not imply parity."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Logical partitions do not remove it. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Line card. Contexts maintain logical configuration and protocol state while sharing chassis dependencies. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Logical separation is not physical duplication.",
      "A generic guide is insufficient.",
      "A VRF separates routing tables.",
      "Control redundancy is distinct from forwarding capacity.",
      "Chassis membership does not imply parity.",
      "One chassis summary can miss a tenant outage."
    ],
    "prerequisites": [
      "s7-g0-t3"
    ],
    "related": [
      "s7-g0-t7"
    ],
    "lab": {
      "objective": "Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Tenant A → VDC A → allocated interfaces",
        "Tenant B → VDC B → allocated interfaces",
        "Both VDCs → shared chassis, power and fabric"
      ],
      "steps": [
        "Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Replicas in separate VDCs on one chassis are claimed to survive chassis loss.",
        "Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Replicas in separate VDCs on one chassis are claimed to survive chassis loss. No; inspect exact card and release support. Chassis membership does not imply parity.",
      "challenge": "What verifies recovery after a module fault? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "VDC": "Virtual Device Context. Broader than one routing table.",
      "Line card": "Ports and forwarding resources. Support varies by card.",
      "Chassis domain": "Shared physical dependency. Logical partitions do not remove it."
    },
    "sources": [
      {
        "title": "Nexus 7000: historical VDC architecture",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/sw/nx-os/virtual_device_context/configuration/guide/b-7k-Cisco-Nexus-7000-Series-NX-OS-Virtual-Device-Context-Configuration-Guide/m-overview-vdcs.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g0-t6-Q1",
        "topicId": "s7-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Are VDCs physically independent switches?",
        "answer": "No; they share the chassis.",
        "explanation": "Logical separation is not physical duplication.",
        "testedConcept": "VDC"
      },
      {
        "questionId": "s7-g0-t6-Q2",
        "topicId": "s7-g0-t6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why inspect the supervisor before planning contexts?",
        "answer": "Supported limits depend on the platform combination.",
        "explanation": "A generic guide is insufficient.",
        "testedConcept": "Line card"
      },
      {
        "questionId": "s7-g0-t6-Q3",
        "topicId": "s7-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is a VDC equivalent to a VRF?",
        "answer": "No; a VDC has broader logical-device scope.",
        "explanation": "A VRF separates routing tables.",
        "testedConcept": "Chassis domain"
      },
      {
        "questionId": "s7-g0-t6-Q4",
        "topicId": "s7-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a second supervisor double forwarding throughput?",
        "answer": "Not generally.",
        "explanation": "Control redundancy is distinct from forwarding capacity.",
        "testedConcept": "VDC"
      },
      {
        "questionId": "s7-g0-t6-Q5",
        "topicId": "s7-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can every line card be assumed feature-compatible?",
        "answer": "No; inspect exact card and release support.",
        "explanation": "Chassis membership does not imply parity.",
        "testedConcept": "Line card"
      },
      {
        "questionId": "s7-g0-t6-Q6",
        "topicId": "s7-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What verifies recovery after a module fault?",
        "answer": "All affected context services and module/path checks.",
        "explanation": "One chassis summary can miss a tenant outage.",
        "testedConcept": "Chassis domain"
      },
      {
        "questionId": "s7-g0-t6-Q7",
        "topicId": "s7-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Nexus 7000 incident, what is the failing evidence boundary?",
        "answer": "Replicas in separate VDCs on one chassis are claimed to survive chassis loss.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t6-Q8",
        "topicId": "s7-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Nexus 7000 incident?",
        "answer": "Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t6-Q9",
        "topicId": "s7-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between VDC and Line card in this lesson.",
        "answer": "Virtual Device Context. Ports and forwarding resources.",
        "explanation": "Broader than one routing table. Support varies by card.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t6-Q10",
        "topicId": "s7-g0-t6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Nexus 7000 would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t6-QC1",
        "topicId": "s7-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t6-QC2",
        "topicId": "s7-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Contexts maintain logical configuration and protocol state while sharing chassis dependencies.",
        "explanation": "Support varies by card.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t6-QC3",
        "topicId": "s7-g0-t6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Chassis domain: Shared physical dependency. Logical partitions do not remove it.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Map two tenant contexts onto their shared physical resources and identify failures that affect both.",
      "fault": "Replicas in separate VDCs on one chassis are claimed to survive chassis loss.",
      "restore": "Correct the failure-domain record and require separate physical systems if chassis-loss survival is an objective.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g0-t7",
    "batch": "17",
    "title": "Nexus 9000",
    "subtitle": "Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g0-t7",
    "definition": "Nexus 9000 spans fixed and modular hardware used in NX-OS fabrics and supported ACI deployments. Operating mode, ASIC generation and release determine management workflow, feature availability and resource limits.",
    "purpose": "Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Establish hardware and mode before selecting standalone NX-OS configuration or APIC policy management. The handoff to ACI mode is where a successful first observation can still lead to a failed transaction. Changes scale and capabilities. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "NX-OS mode: Device-oriented fabric configuration. Uses matching release guides.",
      "ACI mode: APIC policy-managed fabric role. Requires supported hardware.",
      "ASIC generation: Forwarding implementation. Changes scale and capabilities."
    ],
    "mechanism": [
      "Establish hardware and mode before selecting standalone NX-OS configuration or APIC policy management.",
      "For NX-OS EVPN, check underlay transport separately from overlay distribution and forwarding.",
      "Treat mode conversion as a supported migration with disruption and configuration-impact planning, not a live feature toggle."
    ],
    "flow": [
      [
        "Service boundary",
        "Nexus 9000 spans fixed and modular hardware used in NX-OS fabrics and supported ACI deployments. Operating mode, ASIC generation and release determine management workflow, feature availability and resource limits."
      ],
      [
        "NX-OS mode",
        "Establish hardware and mode before selecting standalone NX-OS configuration or APIC policy management."
      ],
      [
        "ACI mode",
        "For NX-OS EVPN, check underlay transport separately from overlay distribution and forwarding."
      ],
      [
        "ASIC generation",
        "Treat mode conversion as a supported migration with disruption and configuration-impact planning, not a live feature toggle."
      ]
    ],
    "comparison": [
      [
        "NX-OS mode",
        "Device-oriented fabric configuration",
        "Uses matching release guides."
      ],
      [
        "ACI mode",
        "APIC policy-managed fabric role",
        "Requires supported hardware."
      ],
      [
        "ASIC generation",
        "Forwarding implementation",
        "Changes scale and capabilities."
      ]
    ],
    "example": "Baseline task: Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery. Incident: An ACI-mode leaf is assigned a standalone NX-OS change procedure. Recovery requirement: Select the matching supported workflow and retain the mode-specific baseline and recovery requirements. Worked reasoning: Is NX-OS to ACI conversion a harmless live toggle? No; follow the exact migration and account for disruption. Operating models differ. Alternative check: Who normally defines ACI tenant policy? APIC through its policy model. Standalone CLI is a different workflow.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow inventory",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against NX-OS mode and ACI mode. Select the matching supported workflow and retain the mode-specific baseline and recovery requirements. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: An ACI-mode leaf is assigned a standalone NX-OS change procedure. Rollback must restore the exact baseline: Select the matching supported workflow and retain the mode-specific baseline and recovery requirements. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery. Assign an owner for the first failing boundary and a separate owner for service acceptance. Treat mode conversion as a supported migration with disruption and configuration-impact planning, not a live feature toggle. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "An ACI-mode leaf is assigned a standalone NX-OS change procedure.",
        "Select the matching supported workflow and retain the mode-specific baseline and recovery requirements."
      ],
      [
        "Do all 9000 ASICs have identical EVPN scale?",
        "No. Hardware and software limits are specific."
      ],
      [
        "Does a virtual image boot prove physical deployment support?",
        "No. Hardware and feature qualification remain."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Changes scale and capabilities. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: ACI mode. For NX-OS EVPN, check underlay transport separately from overlay distribution and forwarding. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Operating models differ.",
      "Hardware and software limits are specific.",
      "The overlay depends on transport.",
      "Standalone CLI is a different workflow.",
      "Hardware and feature qualification remain.",
      "Console access is insufficient."
    ],
    "prerequisites": [
      "s7-g0-t1",
      "s7-g0-t3"
    ],
    "related": [
      "s7-g1-t0"
    ],
    "lab": {
      "objective": "Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "NX-OS alternative: device configuration → EVPN control → VXLAN forwarding",
        "ACI alternative: APIC policy → leaf enforcement → endpoint service"
      ],
      "steps": [
        "Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "An ACI-mode leaf is assigned a standalone NX-OS change procedure.",
        "Select the matching supported workflow and retain the mode-specific baseline and recovery requirements.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Select the matching supported workflow and retain the mode-specific baseline and recovery requirements. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "An ACI-mode leaf is assigned a standalone NX-OS change procedure. No. Hardware and feature qualification remain.",
      "challenge": "What validates a mode migration beyond a prompt? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "NX-OS mode": "Device-oriented fabric configuration. Uses matching release guides.",
      "ACI mode": "APIC policy-managed fabric role. Requires supported hardware.",
      "ASIC generation": "Forwarding implementation. Changes scale and capabilities."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): upgrade and mode conversion",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/upgrade/cisco-nexus-9000-series-nx-os-software-upgrade-and-downgrade-guide-105x.pdf",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
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
        "questionId": "s7-g0-t7-Q1",
        "topicId": "s7-g0-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is NX-OS to ACI conversion a harmless live toggle?",
        "answer": "No; follow the exact migration and account for disruption.",
        "explanation": "Operating models differ.",
        "testedConcept": "NX-OS mode"
      },
      {
        "questionId": "s7-g0-t7-Q2",
        "topicId": "s7-g0-t7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Do all 9000 ASICs have identical EVPN scale?",
        "answer": "No.",
        "explanation": "Hardware and software limits are specific.",
        "testedConcept": "ACI mode"
      },
      {
        "questionId": "s7-g0-t7-Q3",
        "topicId": "s7-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What must precede blaming EVPN for unreachable peers?",
        "answer": "Underlay reachability to tunnel endpoints.",
        "explanation": "The overlay depends on transport.",
        "testedConcept": "ASIC generation"
      },
      {
        "questionId": "s7-g0-t7-Q4",
        "topicId": "s7-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Who normally defines ACI tenant policy?",
        "answer": "APIC through its policy model.",
        "explanation": "Standalone CLI is a different workflow.",
        "testedConcept": "NX-OS mode"
      },
      {
        "questionId": "s7-g0-t7-Q5",
        "topicId": "s7-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a virtual image boot prove physical deployment support?",
        "answer": "No.",
        "explanation": "Hardware and feature qualification remain.",
        "testedConcept": "ACI mode"
      },
      {
        "questionId": "s7-g0-t7-Q6",
        "topicId": "s7-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What validates a mode migration beyond a prompt?",
        "answer": "Required services, denied paths, management recovery and health.",
        "explanation": "Console access is insufficient.",
        "testedConcept": "ASIC generation"
      },
      {
        "questionId": "s7-g0-t7-Q7",
        "topicId": "s7-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Nexus 9000 incident, what is the failing evidence boundary?",
        "answer": "An ACI-mode leaf is assigned a standalone NX-OS change procedure.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g0-t7-Q8",
        "topicId": "s7-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Nexus 9000 incident?",
        "answer": "Select the matching supported workflow and retain the mode-specific baseline and recovery requirements.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g0-t7-Q9",
        "topicId": "s7-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between NX-OS mode and ACI mode in this lesson.",
        "answer": "Device-oriented fabric configuration. APIC policy-managed fabric role.",
        "explanation": "Uses matching release guides. Requires supported hardware.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g0-t7-Q10",
        "topicId": "s7-g0-t7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Nexus 9000 would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g0-t7-QC1",
        "topicId": "s7-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g0-t7-QC2",
        "topicId": "s7-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "For NX-OS EVPN, check underlay transport separately from overlay distribution and forwarding.",
        "explanation": "Requires supported hardware.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g0-t7-QC3",
        "topicId": "s7-g0-t7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "ASIC generation: Forwarding implementation. Changes scale and capabilities.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Compare NX-OS EVPN and ACI as alternative operating designs, including policy ownership and recovery.",
      "fault": "An ACI-mode leaf is assigned a standalone NX-OS change procedure.",
      "restore": "Select the matching supported workflow and retain the mode-specific baseline and recovery requirements.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g1-t0",
    "batch": "17",
    "title": "vPC",
    "subtitle": "Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g1-t0",
    "definition": "A virtual PortChannel lets a downstream device form one logical port channel to two cooperating Nexus peers. The peers retain separate control planes and coordinate the attachment; they do not become one chassis.",
    "purpose": "Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. The downstream LACP participant sees a coordinated channel across two peers. The handoff to Peer link is where a successful first observation can still lead to a failed transaction. Some mismatches suspend forwarding. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "components": [
      "vPC member: Downstream channel attachment. Needs consistent peer configuration.",
      "Peer link: Coordination and applicable data. Not the keepalive path.",
      "Consistency check: Comparison of peer parameters. Some mismatches suspend forwarding."
    ],
    "mechanism": [
      "The downstream LACP participant sees a coordinated channel across two peers.",
      "The peer link carries coordination and applicable traffic; keepalive supplies separate liveness evidence.",
      "Peer-link loss with the other peer alive normally suspends secondary vPC members; dual-path loss needs failure history and recovery settings."
    ],
    "flow": [
      [
        "Service boundary",
        "A virtual PortChannel lets a downstream device form one logical port channel to two cooperating Nexus peers. The peers retain separate control planes and coordinate the attachment; they do not become one chassis."
      ],
      [
        "vPC member",
        "The downstream LACP participant sees a coordinated channel across two peers."
      ],
      [
        "Peer link",
        "The peer link carries coordination and applicable traffic; keepalive supplies separate liveness evidence."
      ],
      [
        "Consistency check",
        "Peer-link loss with the other peer alive normally suspends secondary vPC members; dual-path loss needs failure history and recovery settings."
      ]
    ],
    "comparison": [
      [
        "vPC member",
        "Downstream channel attachment",
        "Needs consistent peer configuration."
      ],
      [
        "Peer link",
        "Coordination and applicable data",
        "Not the keepalive path."
      ],
      [
        "Consistency check",
        "Comparison of peer parameters",
        "Some mismatches suspend forwarding."
      ]
    ],
    "example": "Baseline task: Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss. Incident: Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome. Recovery requirement: Restore the peer link and consistent parameters, then retest downstream service through the intended paths. Worked reasoning: Does vPC merge control planes? No; peers remain separate devices. Inspect both peers. Alternative check: Does keepalive-only loss force immediate suspension? Not normally while the peer link remains healthy. Detection redundancy is degraded.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show vpc brief\nshow port-channel summary",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against vPC member and Peer link. Restore the peer link and consistent parameters, then retest downstream service through the intended paths. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome. Rollback must restore the exact baseline: Restore the peer link and consistent parameters, then retest downstream service through the intended paths. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss. Assign an owner for the first failing boundary and a separate owner for service acceptance. Peer-link loss with the other peer alive normally suspends secondary vPC members; dual-path loss needs failure history and recovery settings. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome.",
        "Restore the peer link and consistent parameters, then retest downstream service through the intended paths."
      ],
      [
        "Can keepalive replace peer-link traffic?",
        "No; keepalive carries liveness only. It does not synchronize or transport user traffic."
      ],
      [
        "Can two down-state booleans predict dual-loss behavior exactly?",
        "No; sequence, health, timers and recovery settings are needed. A static snapshot omits essential context."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Some mismatches suspend forwarding. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Peer link. The peer link carries coordination and applicable traffic; keepalive supplies separate liveness evidence. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "mistakes": [
      "Inspect both peers.",
      "It does not synchronize or transport user traffic.",
      "This limits unsafe isolated forwarding.",
      "Detection redundancy is degraded.",
      "A static snapshot omits essential context.",
      "Aggregate and per-flow capacity differ."
    ],
    "prerequisites": [
      "s7-g0-t2",
      "s1-g3-t3"
    ],
    "related": [
      "s7-g1-t1"
    ],
    "lab": {
      "objective": "Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Downstream LACP system → member to peer A and member to peer B",
        "Peer A ↔ peer-link port channel ↔ peer B",
        "Peer A ↔ independent keepalive path ↔ peer B",
        "Optional orphan endpoint → one peer; analyze its remote path separately"
      ],
      "steps": [
        "Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome.",
        "Restore the peer link and consistent parameters, then retest downstream service through the intended paths.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the peer link and consistent parameters, then retest downstream service through the intended paths. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome. No; sequence, health, timers and recovery settings are needed. A static snapshot omits essential context.",
      "challenge": "Does two-member LACP double every single flow? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "vPC member": "Downstream channel attachment. Needs consistent peer configuration.",
      "Peer link": "Coordination and applicable data. Not the keepalive path.",
      "Consistency check": "Comparison of peer parameters. Some mismatches suspend forwarding."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): vPC",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g1-t0-Q1",
        "topicId": "s7-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does vPC merge control planes?",
        "answer": "No; peers remain separate devices.",
        "explanation": "Inspect both peers.",
        "testedConcept": "vPC member"
      },
      {
        "questionId": "s7-g1-t0-Q2",
        "topicId": "s7-g1-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can keepalive replace peer-link traffic?",
        "answer": "No; keepalive carries liveness only.",
        "explanation": "It does not synchronize or transport user traffic.",
        "testedConcept": "Peer link"
      },
      {
        "questionId": "s7-g1-t0-Q3",
        "topicId": "s7-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Peer link fails with keepalive up. What normally happens on the secondary?",
        "answer": "Its vPC members suspend after the applicable detection process.",
        "explanation": "This limits unsafe isolated forwarding.",
        "testedConcept": "Consistency check"
      },
      {
        "questionId": "s7-g1-t0-Q4",
        "topicId": "s7-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does keepalive-only loss force immediate suspension?",
        "answer": "Not normally while the peer link remains healthy.",
        "explanation": "Detection redundancy is degraded.",
        "testedConcept": "vPC member"
      },
      {
        "questionId": "s7-g1-t0-Q5",
        "topicId": "s7-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can two down-state booleans predict dual-loss behavior exactly?",
        "answer": "No; sequence, health, timers and recovery settings are needed.",
        "explanation": "A static snapshot omits essential context.",
        "testedConcept": "Peer link"
      },
      {
        "questionId": "s7-g1-t0-Q6",
        "topicId": "s7-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Does two-member LACP double every single flow?",
        "answer": "No; typical hashing selects one member per flow.",
        "explanation": "Aggregate and per-flow capacity differ.",
        "testedConcept": "Consistency check"
      },
      {
        "questionId": "s7-g1-t0-Q7",
        "topicId": "s7-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the vPC incident, what is the failing evidence boundary?",
        "answer": "Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g1-t0-Q8",
        "topicId": "s7-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this vPC incident?",
        "answer": "Restore the peer link and consistent parameters, then retest downstream service through the intended paths.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g1-t0-Q9",
        "topicId": "s7-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between vPC member and Peer link in this lesson.",
        "answer": "Downstream channel attachment. Coordination and applicable data.",
        "explanation": "Needs consistent peer configuration. Not the keepalive path.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g1-t0-Q10",
        "topicId": "s7-g1-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about vPC would exceed the exercise evidence?",
        "answer": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g1-t0-QC1",
        "topicId": "s7-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g1-t0-QC2",
        "topicId": "s7-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "The peer link carries coordination and applicable traffic; keepalive supplies separate liveness evidence.",
        "explanation": "Not the keepalive path.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g1-t0-QC3",
        "topicId": "s7-g1-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Consistency check: Comparison of peer parameters. Some mismatches suspend forwarding.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vpc",
      "baseline": "Inspect both peers and the downstream channel; distinguish healthy, keepalive-only loss, peer-link loss and ambiguous dual loss.",
      "fault": "Peer link is down while keepalive shows the primary alive; secondary member suspension is the expected bounded steady-state outcome.",
      "restore": "Restore the peer link and consistent parameters, then retest downstream service through the intended paths.",
      "scope": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g1-t1",
    "batch": "17",
    "title": "vPC Peer Link",
    "subtitle": "Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g1-t1",
    "definition": "The vPC peer link is a supported port channel between peers for coordination and required data handling. VLAN scope, capacity and physical diversity matter when normal local attachments fail.",
    "purpose": "Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Build the interconnect from supported members and matching peer intent. The handoff to VLAN admission is where a successful first observation can still lead to a failed transaction. Can exceed normal load. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "components": [
      "Peer channel: Bundled interconnect. Members can share a failed module.",
      "VLAN admission: Allowed service scope. An up channel may omit a VLAN.",
      "Failure load: Redirected traffic after a fault. Can exceed normal load."
    ],
    "mechanism": [
      "Build the interconnect from supported members and matching peer intent.",
      "Check required VLAN admission independently from physical channel state.",
      "Size for declared failure traffic and orphan paths rather than only healthy utilization."
    ],
    "flow": [
      [
        "Service boundary",
        "The vPC peer link is a supported port channel between peers for coordination and required data handling. VLAN scope, capacity and physical diversity matter when normal local attachments fail."
      ],
      [
        "Peer channel",
        "Build the interconnect from supported members and matching peer intent."
      ],
      [
        "VLAN admission",
        "Check required VLAN admission independently from physical channel state."
      ],
      [
        "Failure load",
        "Size for declared failure traffic and orphan paths rather than only healthy utilization."
      ]
    ],
    "comparison": [
      [
        "Peer channel",
        "Bundled interconnect",
        "Members can share a failed module."
      ],
      [
        "VLAN admission",
        "Allowed service scope",
        "An up channel may omit a VLAN."
      ],
      [
        "Failure load",
        "Redirected traffic after a fault",
        "Can exceed normal load."
      ]
    ],
    "example": "Baseline task: Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand. Incident: One required VLAN is absent while both member links are up. Recovery requirement: Restore the exact VLAN scope and verify consistency plus the affected service in both directions. Worked reasoning: Does an up peer channel prove every VLAN passes? No; inspect allowed and active membership. Aggregation and classification differ. Alternative check: One member fails. Is the whole peer link necessarily down? No; remaining members may carry it with less capacity. Availability and bandwidth differ.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show vpc brief\nshow interface trunk",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Peer channel and VLAN admission. Restore the exact VLAN scope and verify consistency plus the affected service in both directions. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: One required VLAN is absent while both member links are up. Rollback must restore the exact baseline: Restore the exact VLAN scope and verify consistency plus the affected service in both directions. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand. Assign an owner for the first failing boundary and a separate owner for service acceptance. Size for declared failure traffic and orphan paths rather than only healthy utilization. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "One required VLAN is absent while both member links are up.",
        "Restore the exact VLAN scope and verify consistency plus the affected service in both directions."
      ],
      [
        "Why use diverse member modules where supported?",
        "To reduce shared failure exposure. Two cables can share one failed parent."
      ],
      [
        "Why is allowing all VLANs a poor generic rollback?",
        "It changes isolation beyond the owned edit. Restore the recorded list."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Can exceed normal load. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: VLAN admission. Check required VLAN admission independently from physical channel state. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "mistakes": [
      "Aggregation and classification differ.",
      "Two cables can share one failed parent.",
      "Healthy utilization can understate demand.",
      "Availability and bandwidth differ.",
      "Restore the recorded list.",
      "Carrier restoration alone is incomplete."
    ],
    "prerequisites": [
      "s7-g1-t0"
    ],
    "related": [
      "s7-g1-t2"
    ],
    "lab": {
      "objective": "Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Downstream LACP system → member to peer A and member to peer B",
        "Peer A ↔ peer-link port channel ↔ peer B",
        "Peer A ↔ independent keepalive path ↔ peer B",
        "Optional orphan endpoint → one peer; analyze its remote path separately"
      ],
      "steps": [
        "Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "One required VLAN is absent while both member links are up.",
        "Restore the exact VLAN scope and verify consistency plus the affected service in both directions.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the exact VLAN scope and verify consistency plus the affected service in both directions. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "One required VLAN is absent while both member links are up. It changes isolation beyond the owned edit. Restore the recorded list.",
      "challenge": "What closes a peer-link incident? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Peer channel": "Bundled interconnect. Members can share a failed module.",
      "VLAN admission": "Allowed service scope. An up channel may omit a VLAN.",
      "Failure load": "Redirected traffic after a fault. Can exceed normal load."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): vPC",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g1-t1-Q1",
        "topicId": "s7-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does an up peer channel prove every VLAN passes?",
        "answer": "No; inspect allowed and active membership.",
        "explanation": "Aggregation and classification differ.",
        "testedConcept": "Peer channel"
      },
      {
        "questionId": "s7-g1-t1-Q2",
        "topicId": "s7-g1-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why use diverse member modules where supported?",
        "answer": "To reduce shared failure exposure.",
        "explanation": "Two cables can share one failed parent.",
        "testedConcept": "VLAN admission"
      },
      {
        "questionId": "s7-g1-t1-Q3",
        "topicId": "s7-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What traffic must sizing include?",
        "answer": "Supported fault-redirected and orphan traffic.",
        "explanation": "Healthy utilization can understate demand.",
        "testedConcept": "Failure load"
      },
      {
        "questionId": "s7-g1-t1-Q4",
        "topicId": "s7-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "One member fails. Is the whole peer link necessarily down?",
        "answer": "No; remaining members may carry it with less capacity.",
        "explanation": "Availability and bandwidth differ.",
        "testedConcept": "Peer channel"
      },
      {
        "questionId": "s7-g1-t1-Q5",
        "topicId": "s7-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why is allowing all VLANs a poor generic rollback?",
        "answer": "It changes isolation beyond the owned edit.",
        "explanation": "Restore the recorded list.",
        "testedConcept": "VLAN admission"
      },
      {
        "questionId": "s7-g1-t1-Q6",
        "topicId": "s7-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What closes a peer-link incident?",
        "answer": "Consistency, membership and original service checks.",
        "explanation": "Carrier restoration alone is incomplete.",
        "testedConcept": "Failure load"
      },
      {
        "questionId": "s7-g1-t1-Q7",
        "topicId": "s7-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the vPC Peer Link incident, what is the failing evidence boundary?",
        "answer": "One required VLAN is absent while both member links are up.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g1-t1-Q8",
        "topicId": "s7-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this vPC Peer Link incident?",
        "answer": "Restore the exact VLAN scope and verify consistency plus the affected service in both directions.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g1-t1-Q9",
        "topicId": "s7-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Peer channel and VLAN admission in this lesson.",
        "answer": "Bundled interconnect. Allowed service scope.",
        "explanation": "Members can share a failed module. An up channel may omit a VLAN.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g1-t1-Q10",
        "topicId": "s7-g1-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about vPC Peer Link would exceed the exercise evidence?",
        "answer": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g1-t1-QC1",
        "topicId": "s7-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g1-t1-QC2",
        "topicId": "s7-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Check required VLAN admission independently from physical channel state.",
        "explanation": "An up channel may omit a VLAN.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g1-t1-QC3",
        "topicId": "s7-g1-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Failure load: Redirected traffic after a fault. Can exceed normal load.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vpc",
      "baseline": "Map peer-link ports to modules and required VLANs, then compare surviving capacity with redirected demand.",
      "fault": "One required VLAN is absent while both member links are up.",
      "restore": "Restore the exact VLAN scope and verify consistency plus the affected service in both directions.",
      "scope": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g1-t2",
    "batch": "17",
    "title": "Keepalive",
    "subtitle": "Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g1-t2",
    "definition": "Peer keepalive is a Layer 3 liveness exchange that helps distinguish peer-link loss from peer loss. It carries neither user data nor configuration synchronization, and its route should avoid the failure domain it helps diagnose.",
    "purpose": "Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Trace the configured source, destination and VRF to the actual transport path. The handoff to Liveness is where a successful first observation can still lead to a failed transaction. Different addresses alone do not prove it. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "components": [
      "VRF: Routing context. Default-table reachability can be irrelevant.",
      "Liveness: Peer response evidence. Not complete forwarding health.",
      "Independent path: Different relevant failure domain. Different addresses alone do not prove it."
    ],
    "mechanism": [
      "Trace the configured source, destination and VRF to the actual transport path.",
      "Combine keepalive and peer-link observations instead of treating either as complete device health.",
      "A missing response can reflect filtering or routing rather than power loss; preserve timestamps and independent evidence."
    ],
    "flow": [
      [
        "Service boundary",
        "Peer keepalive is a Layer 3 liveness exchange that helps distinguish peer-link loss from peer loss. It carries neither user data nor configuration synchronization, and its route should avoid the failure domain it helps diagnose."
      ],
      [
        "VRF",
        "Trace the configured source, destination and VRF to the actual transport path."
      ],
      [
        "Liveness",
        "Combine keepalive and peer-link observations instead of treating either as complete device health."
      ],
      [
        "Independent path",
        "A missing response can reflect filtering or routing rather than power loss; preserve timestamps and independent evidence."
      ]
    ],
    "comparison": [
      [
        "VRF",
        "Routing context",
        "Default-table reachability can be irrelevant."
      ],
      [
        "Liveness",
        "Peer response evidence",
        "Not complete forwarding health."
      ],
      [
        "Independent path",
        "Different relevant failure domain",
        "Different addresses alone do not prove it."
      ]
    ],
    "example": "Baseline task: Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport. Incident: Keepalive is down while the peer link is up; identify degraded detection without claiming total outage. Recovery requirement: Restore the original VRF/path policy and verify liveness, vPC state and the original service separately. Worked reasoning: Why can default-VRF ping miss a keepalive fault? Keepalive can use another VRF and source. Use the actual context. Alternative check: Does missing keepalive prove a powered-off peer? No; path or ACL loss can look the same. Absence of reply is ambiguous.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show vpc peer-keepalive\nshow vpc brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against VRF and Liveness. Restore the original VRF/path policy and verify liveness, vPC state and the original service separately. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Keepalive is down while the peer link is up; identify degraded detection without claiming total outage. Rollback must restore the exact baseline: Restore the original VRF/path policy and verify liveness, vPC state and the original service separately. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport. Assign an owner for the first failing boundary and a separate owner for service acceptance. A missing response can reflect filtering or routing rather than power loss; preserve timestamps and independent evidence. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Keepalive is down while the peer link is up; identify degraded detection without claiming total outage.",
        "Restore the original VRF/path policy and verify liveness, vPC state and the original service separately."
      ],
      [
        "Does keepalive synchronize MAC state?",
        "No. Its scope is liveness."
      ],
      [
        "Do two IP addresses prove physical diversity?",
        "No; their paths may share one link or switch. Logical identity is not failure independence."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Different addresses alone do not prove it. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Liveness. Combine keepalive and peer-link observations instead of treating either as complete device health. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "mistakes": [
      "Use the actual context.",
      "Its scope is liveness.",
      "Independence supports diagnosis.",
      "Absence of reply is ambiguous.",
      "Logical identity is not failure independence.",
      "A snapshot cannot settle dual-active risk."
    ],
    "prerequisites": [
      "s7-g1-t0"
    ],
    "related": [
      "s7-g1-t3"
    ],
    "lab": {
      "objective": "Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Downstream LACP system → member to peer A and member to peer B",
        "Peer A ↔ peer-link port channel ↔ peer B",
        "Peer A ↔ independent keepalive path ↔ peer B",
        "Optional orphan endpoint → one peer; analyze its remote path separately"
      ],
      "steps": [
        "Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Keepalive is down while the peer link is up; identify degraded detection without claiming total outage.",
        "Restore the original VRF/path policy and verify liveness, vPC state and the original service separately.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the original VRF/path policy and verify liveness, vPC state and the original service separately. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Keepalive is down while the peer link is up; identify degraded detection without claiming total outage. No; their paths may share one link or switch. Logical identity is not failure independence.",
      "challenge": "What extra evidence is needed when both links are down? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "VRF": "Routing context. Default-table reachability can be irrelevant.",
      "Liveness": "Peer response evidence. Not complete forwarding health.",
      "Independent path": "Different relevant failure domain. Different addresses alone do not prove it."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): vPC",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g1-t2-Q1",
        "topicId": "s7-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can default-VRF ping miss a keepalive fault?",
        "answer": "Keepalive can use another VRF and source.",
        "explanation": "Use the actual context.",
        "testedConcept": "VRF"
      },
      {
        "questionId": "s7-g1-t2-Q2",
        "topicId": "s7-g1-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does keepalive synchronize MAC state?",
        "answer": "No.",
        "explanation": "Its scope is liveness.",
        "testedConcept": "Liveness"
      },
      {
        "questionId": "s7-g1-t2-Q3",
        "topicId": "s7-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why avoid a keepalive route over only the peer link?",
        "answer": "One fault would remove both observations.",
        "explanation": "Independence supports diagnosis.",
        "testedConcept": "Independent path"
      },
      {
        "questionId": "s7-g1-t2-Q4",
        "topicId": "s7-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does missing keepalive prove a powered-off peer?",
        "answer": "No; path or ACL loss can look the same.",
        "explanation": "Absence of reply is ambiguous.",
        "testedConcept": "VRF"
      },
      {
        "questionId": "s7-g1-t2-Q5",
        "topicId": "s7-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Do two IP addresses prove physical diversity?",
        "answer": "No; their paths may share one link or switch.",
        "explanation": "Logical identity is not failure independence.",
        "testedConcept": "Liveness"
      },
      {
        "questionId": "s7-g1-t2-Q6",
        "topicId": "s7-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What extra evidence is needed when both links are down?",
        "answer": "Sequence, peer health and recovery configuration.",
        "explanation": "A snapshot cannot settle dual-active risk.",
        "testedConcept": "Independent path"
      },
      {
        "questionId": "s7-g1-t2-Q7",
        "topicId": "s7-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Keepalive incident, what is the failing evidence boundary?",
        "answer": "Keepalive is down while the peer link is up; identify degraded detection without claiming total outage.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g1-t2-Q8",
        "topicId": "s7-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Keepalive incident?",
        "answer": "Restore the original VRF/path policy and verify liveness, vPC state and the original service separately.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g1-t2-Q9",
        "topicId": "s7-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between VRF and Liveness in this lesson.",
        "answer": "Routing context. Peer response evidence.",
        "explanation": "Default-table reachability can be irrelevant. Not complete forwarding health.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g1-t2-Q10",
        "topicId": "s7-g1-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Keepalive would exceed the exercise evidence?",
        "answer": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g1-t2-QC1",
        "topicId": "s7-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g1-t2-QC2",
        "topicId": "s7-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Combine keepalive and peer-link observations instead of treating either as complete device health.",
        "explanation": "Not complete forwarding health.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g1-t2-QC3",
        "topicId": "s7-g1-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Independent path: Different relevant failure domain. Different addresses alone do not prove it.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vpc",
      "baseline": "Trace the keepalive VRF, filtering and physical route without relying on the peer link as its sole transport.",
      "fault": "Keepalive is down while the peer link is up; identify degraded detection without claiming total outage.",
      "restore": "Restore the original VRF/path policy and verify liveness, vPC state and the original service separately.",
      "scope": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g1-t3",
    "batch": "17",
    "title": "Orphan ports",
    "subtitle": "Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g1-t3",
    "definition": "An orphan port is an attachment on a vPC peer that is not itself a vPC member. Its connectivity can depend on the peer link or another supported path. Peer membership does not automatically dual-home every endpoint.",
    "purpose": "Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Trace the single-attached endpoint to local and remote destinations separately. The handoff to Alternate path is where a successful first observation can still lead to a failed transaction. Not a universal default. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "components": [
      "Orphan attachment: Non-vPC endpoint link. May remain up while isolated.",
      "Alternate path: Endpoint recovery attachment. Must be operationally tested.",
      "Suspend policy: Supported per-port treatment. Not a universal default."
    ],
    "mechanism": [
      "Trace the single-attached endpoint to local and remote destinations separately.",
      "A physically up orphan on an isolated secondary can lose remote service when the peer link fails.",
      "Supported selected orphan suspension can trigger an alternate attachment, but only if endpoint failover is actually configured."
    ],
    "flow": [
      [
        "Service boundary",
        "An orphan port is an attachment on a vPC peer that is not itself a vPC member. Its connectivity can depend on the peer link or another supported path. Peer membership does not automatically dual-home every endpoint."
      ],
      [
        "Orphan attachment",
        "Trace the single-attached endpoint to local and remote destinations separately."
      ],
      [
        "Alternate path",
        "A physically up orphan on an isolated secondary can lose remote service when the peer link fails."
      ],
      [
        "Suspend policy",
        "Supported selected orphan suspension can trigger an alternate attachment, but only if endpoint failover is actually configured."
      ]
    ],
    "comparison": [
      [
        "Orphan attachment",
        "Non-vPC endpoint link",
        "May remain up while isolated."
      ],
      [
        "Alternate path",
        "Endpoint recovery attachment",
        "Must be operationally tested."
      ],
      [
        "Suspend policy",
        "Supported per-port treatment",
        "Not a universal default."
      ]
    ],
    "example": "Baseline task: Compare a secondary orphan server with a vPC-attached server and identify their different failure paths. Incident: The peer link fails and the orphan remains locally up but loses its required remote path. Recovery requirement: Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation. Worked reasoning: Is every port on a vPC peer redundant? No; each attachment needs its own path analysis. A peer relationship does not duplicate host links. Alternative check: Are all secondary orphan ports suspended by default? Do not assume so; inspect actual supported policy. Configured examples are not universal defaults.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show vpc brief\nshow interface brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Orphan attachment and Alternate path. Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Compare a secondary orphan server with a vPC-attached server and identify their different failure paths. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The peer link fails and the orphan remains locally up but loses its required remote path. Rollback must restore the exact baseline: Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Compare a secondary orphan server with a vPC-attached server and identify their different failure paths. Assign an owner for the first failing boundary and a separate owner for service acceptance. Supported selected orphan suspension can trigger an alternate attachment, but only if endpoint failover is actually configured. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The peer link fails and the orphan remains locally up but loses its required remote path.",
        "Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation."
      ],
      [
        "Why can an orphan stay link-up during service loss?",
        "Its local carrier survives while a remote dependency fails. Link state is local evidence."
      ],
      [
        "Why test both local and remote destinations?",
        "Their paths can have different dependencies. One local success can conceal remote isolation."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Not a universal default. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Alternate path. A physically up orphan on an isolated secondary can lose remote service when the peer link fails. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
    "mistakes": [
      "A peer relationship does not duplicate host links.",
      "Link state is local evidence.",
      "Without an alternate it can only disconnect the host.",
      "Configured examples are not universal defaults.",
      "One local success can conceal remote isolation.",
      "Use the guided path analysis for those details."
    ],
    "prerequisites": [
      "s7-g1-t1",
      "s7-g1-t2"
    ],
    "related": [
      "s7-g2-t0"
    ],
    "lab": {
      "objective": "Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Downstream LACP system → member to peer A and member to peer B",
        "Peer A ↔ peer-link port channel ↔ peer B",
        "Peer A ↔ independent keepalive path ↔ peer B",
        "Optional orphan endpoint → one peer; analyze its remote path separately"
      ],
      "steps": [
        "Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The peer link fails and the orphan remains locally up but loses its required remote path.",
        "Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The peer link fails and the orphan remains locally up but loses its required remote path. Their paths can have different dependencies. One local success can conceal remote isolation.",
      "challenge": "Does the generic vPC member model predict all orphan behavior? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Orphan attachment": "Non-vPC endpoint link. May remain up while isolated.",
      "Alternate path": "Endpoint recovery attachment. Must be operationally tested.",
      "Suspend policy": "Supported per-port treatment. Not a universal default."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): vPC",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/interfaces/cisco-nexus-9000-series-nx-os-interfaces-configuration-guide-release-105x/m_configuring_vpcs_9x.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g1-t3-Q1",
        "topicId": "s7-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is every port on a vPC peer redundant?",
        "answer": "No; each attachment needs its own path analysis.",
        "explanation": "A peer relationship does not duplicate host links.",
        "testedConcept": "Orphan attachment"
      },
      {
        "questionId": "s7-g1-t3-Q2",
        "topicId": "s7-g1-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why can an orphan stay link-up during service loss?",
        "answer": "Its local carrier survives while a remote dependency fails.",
        "explanation": "Link state is local evidence.",
        "testedConcept": "Alternate path"
      },
      {
        "questionId": "s7-g1-t3-Q3",
        "topicId": "s7-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What precedes orphan suspension configuration?",
        "answer": "Platform support and a verified endpoint alternate path.",
        "explanation": "Without an alternate it can only disconnect the host.",
        "testedConcept": "Suspend policy"
      },
      {
        "questionId": "s7-g1-t3-Q4",
        "topicId": "s7-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Are all secondary orphan ports suspended by default?",
        "answer": "Do not assume so; inspect actual supported policy.",
        "explanation": "Configured examples are not universal defaults.",
        "testedConcept": "Orphan attachment"
      },
      {
        "questionId": "s7-g1-t3-Q5",
        "topicId": "s7-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test both local and remote destinations?",
        "answer": "Their paths can have different dependencies.",
        "explanation": "One local success can conceal remote isolation.",
        "testedConcept": "Alternate path"
      },
      {
        "questionId": "s7-g1-t3-Q6",
        "topicId": "s7-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Does the generic vPC member model predict all orphan behavior?",
        "answer": "No; it omits per-orphan policy and endpoint failover.",
        "explanation": "Use the guided path analysis for those details.",
        "testedConcept": "Suspend policy"
      },
      {
        "questionId": "s7-g1-t3-Q7",
        "topicId": "s7-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Orphan ports incident, what is the failing evidence boundary?",
        "answer": "The peer link fails and the orphan remains locally up but loses its required remote path.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g1-t3-Q8",
        "topicId": "s7-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Orphan ports incident?",
        "answer": "Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g1-t3-Q9",
        "topicId": "s7-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Orphan attachment and Alternate path in this lesson.",
        "answer": "Non-vPC endpoint link. Endpoint recovery attachment.",
        "explanation": "May remain up while isolated. Must be operationally tested.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g1-t3-Q10",
        "topicId": "s7-g1-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Orphan ports would exceed the exercise evidence?",
        "answer": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g1-t3-QC1",
        "topicId": "s7-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g1-t3-QC2",
        "topicId": "s7-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "A physically up orphan on an isolated secondary can lose remote service when the peer link fails.",
        "explanation": "Must be operationally tested.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g1-t3-QC3",
        "topicId": "s7-g1-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Suspend policy: Supported per-port treatment. Not a universal default.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vpc",
      "baseline": "Compare a secondary orphan server with a vPC-attached server and identify their different failure paths.",
      "fault": "The peer link fails and the orphan remains locally up but loses its required remote path.",
      "restore": "Restore the recorded peer path or reviewed alternate attachment, then test orphan service and isolation.",
      "scope": "Steady-state two-peer teaching relation with both devices assumed powered and configuration consistent. It distinguishes peer-link and keepalive loss; dual loss is deliberately indeterminate. Timers, boot sequence, auto-recovery, peer-switch, per-VLAN consistency and orphan policy are not simulated."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g2-t0",
    "batch": "17",
    "title": "FabricPath concepts",
    "subtitle": "Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g2-t0",
    "definition": "FabricPath is a Cisco Layer 2 multipath technology used on supported historical Nexus platforms. It differs from an ordinary STP tree and from a VXLAN/EVPN IP overlay.",
    "purpose": "Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. IS-IS topology information supports FabricPath switch identities and fabric forwarding. The handoff to Fabric interface is where a successful first observation can still lead to a failed transaction. Loop prevention still matters. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "Switch ID: Fabric forwarding identity. Not a VNI.",
      "Fabric interface: FabricPath transport port. Requires supported hardware.",
      "Classic edge: Ordinary Ethernet boundary. Loop prevention still matters."
    ],
    "mechanism": [
      "IS-IS topology information supports FabricPath switch identities and fabric forwarding.",
      "Encapsulated Ethernet crosses supported fabric interfaces rather than following a conventional STP tree inside the fabric.",
      "Classic Ethernet boundaries still need supported loop prevention; interior multipath does not make arbitrary edge loops safe."
    ],
    "flow": [
      [
        "Service boundary",
        "FabricPath is a Cisco Layer 2 multipath technology used on supported historical Nexus platforms. It differs from an ordinary STP tree and from a VXLAN/EVPN IP overlay."
      ],
      [
        "Switch ID",
        "IS-IS topology information supports FabricPath switch identities and fabric forwarding."
      ],
      [
        "Fabric interface",
        "Encapsulated Ethernet crosses supported fabric interfaces rather than following a conventional STP tree inside the fabric."
      ],
      [
        "Classic edge",
        "Classic Ethernet boundaries still need supported loop prevention; interior multipath does not make arbitrary edge loops safe."
      ]
    ],
    "comparison": [
      [
        "Switch ID",
        "Fabric forwarding identity",
        "Not a VNI."
      ],
      [
        "Fabric interface",
        "FabricPath transport port",
        "Requires supported hardware."
      ],
      [
        "Classic edge",
        "Ordinary Ethernet boundary",
        "Loop prevention still matters."
      ]
    ],
    "example": "Baseline task: Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay. Incident: A classic Ethernet loop is ignored because the core uses FabricPath. Recovery requirement: Restore the explicit boundary and the supported edge loop-prevention design. Worked reasoning: Is FabricPath the same encapsulation as VXLAN? No. Shared multipath goals do not imply identical formats. Alternative check: Why inspect line-card support? Support depends on module and release. Family naming is insufficient.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show version\nshow module",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Switch ID and Fabric interface. Restore the explicit boundary and the supported edge loop-prevention design. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A classic Ethernet loop is ignored because the core uses FabricPath. Rollback must restore the exact baseline: Restore the explicit boundary and the supported edge loop-prevention design. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay. Assign an owner for the first failing boundary and a separate owner for service acceptance. Classic Ethernet boundaries still need supported loop prevention; interior multipath does not make arbitrary edge loops safe. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A classic Ethernet loop is ignored because the core uses FabricPath.",
        "Restore the explicit boundary and the supported edge loop-prevention design."
      ],
      [
        "Which control protocol supports FabricPath topology?",
        "IS-IS. It is not MP-BGP EVPN."
      ],
      [
        "Does a native FabricPath design require an EVPN RT?",
        "No. EVPN policy belongs to a different control model."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Loop prevention still matters. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Fabric interface. Encapsulated Ethernet crosses supported fabric interfaces rather than following a conventional STP tree inside the fabric. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Shared multipath goals do not imply identical formats.",
      "It is not MP-BGP EVPN.",
      "Classic boundaries still need loop control.",
      "Family naming is insufficient.",
      "EVPN policy belongs to a different control model.",
      "Architecture knowledge is not a support guarantee."
    ],
    "prerequisites": [
      "s7-g0-t6",
      "s1-g3-t3"
    ],
    "related": [
      "s7-g2-t1"
    ],
    "lab": {
      "objective": "Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Classic Ethernet edge → FabricPath boundary → FabricPath interior → classic edge",
        "Boundary loop prevention and interior topology are separate checks"
      ],
      "steps": [
        "Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A classic Ethernet loop is ignored because the core uses FabricPath.",
        "Restore the explicit boundary and the supported edge loop-prevention design.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the explicit boundary and the supported edge loop-prevention design. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A classic Ethernet loop is ignored because the core uses FabricPath. No. EVPN policy belongs to a different control model.",
      "challenge": "What does historical coverage establish about current procurement? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Switch ID": "Fabric forwarding identity. Not a VNI.",
      "Fabric interface": "FabricPath transport port. Requires supported hardware.",
      "Classic edge": "Ordinary Ethernet boundary. Loop prevention still matters."
    },
    "sources": [
      {
        "title": "Nexus 7000 NX-OS 8.x: historical FabricPath interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus7000/sw/fabricpath/config/cisco_nexus7000_fabricpath_config_guide_8x/configuring-fabricpath-interfaces.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g2-t0-Q1",
        "topicId": "s7-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is FabricPath the same encapsulation as VXLAN?",
        "answer": "No.",
        "explanation": "Shared multipath goals do not imply identical formats.",
        "testedConcept": "Switch ID"
      },
      {
        "questionId": "s7-g2-t0-Q2",
        "topicId": "s7-g2-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which control protocol supports FabricPath topology?",
        "answer": "IS-IS.",
        "explanation": "It is not MP-BGP EVPN.",
        "testedConcept": "Fabric interface"
      },
      {
        "questionId": "s7-g2-t0-Q3",
        "topicId": "s7-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does ordinary STP span the fabric interior?",
        "answer": "No; fabric forwarding uses its own topology.",
        "explanation": "Classic boundaries still need loop control.",
        "testedConcept": "Classic edge"
      },
      {
        "questionId": "s7-g2-t0-Q4",
        "topicId": "s7-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect line-card support?",
        "answer": "Support depends on module and release.",
        "explanation": "Family naming is insufficient.",
        "testedConcept": "Switch ID"
      },
      {
        "questionId": "s7-g2-t0-Q5",
        "topicId": "s7-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does a native FabricPath design require an EVPN RT?",
        "answer": "No.",
        "explanation": "EVPN policy belongs to a different control model.",
        "testedConcept": "Fabric interface"
      },
      {
        "questionId": "s7-g2-t0-Q6",
        "topicId": "s7-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does historical coverage establish about current procurement?",
        "answer": "Nothing without exact lifecycle and support evidence.",
        "explanation": "Architecture knowledge is not a support guarantee.",
        "testedConcept": "Classic edge"
      },
      {
        "questionId": "s7-g2-t0-Q7",
        "topicId": "s7-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the FabricPath concepts incident, what is the failing evidence boundary?",
        "answer": "A classic Ethernet loop is ignored because the core uses FabricPath.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g2-t0-Q8",
        "topicId": "s7-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this FabricPath concepts incident?",
        "answer": "Restore the explicit boundary and the supported edge loop-prevention design.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g2-t0-Q9",
        "topicId": "s7-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Switch ID and Fabric interface in this lesson.",
        "answer": "Fabric forwarding identity. FabricPath transport port.",
        "explanation": "Not a VNI. Requires supported hardware.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g2-t0-Q10",
        "topicId": "s7-g2-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about FabricPath concepts would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g2-t0-QC1",
        "topicId": "s7-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g2-t0-QC2",
        "topicId": "s7-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Encapsulated Ethernet crosses supported fabric interfaces rather than following a conventional STP tree inside the fabric.",
        "explanation": "Requires supported hardware.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g2-t0-QC3",
        "topicId": "s7-g2-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Classic edge: Ordinary Ethernet boundary. Loop prevention still matters.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Label historical FabricPath interior and classic Ethernet edges, then compare them with an IP-underlay overlay.",
      "fault": "A classic Ethernet loop is ignored because the core uses FabricPath.",
      "restore": "Restore the explicit boundary and the supported edge loop-prevention design.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g2-t1",
    "batch": "17",
    "title": "FEX",
    "subtitle": "Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g2-t1",
    "definition": "A Fabric Extender expands a supported parent Nexus with remote host-facing interfaces. The conventional architecture behaves like a remote line card, not an independent access switch with its own local switching control plane.",
    "purpose": "Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Host traffic travels from the extender to its parent for switching decisions. The handoff to Fabric uplink is where a successful first observation can still lead to a failed transaction. Common control and forwarding dependency. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "Host interface: Endpoint-facing FEX port. Not a generic inter-switch link.",
      "Fabric uplink: Transport to parent. Shared host capacity.",
      "Parent: Controlling switch. Common control and forwarding dependency."
    ],
    "mechanism": [
      "Host traffic travels from the extender to its parent for switching decisions.",
      "The parent owns configuration and supported software coordination.",
      "Many host interfaces share fabric uplinks; same-FEX proximity does not eliminate parent dependence."
    ],
    "flow": [
      [
        "Service boundary",
        "A Fabric Extender expands a supported parent Nexus with remote host-facing interfaces. The conventional architecture behaves like a remote line card, not an independent access switch with its own local switching control plane."
      ],
      [
        "Host interface",
        "Host traffic travels from the extender to its parent for switching decisions."
      ],
      [
        "Fabric uplink",
        "The parent owns configuration and supported software coordination."
      ],
      [
        "Parent",
        "Many host interfaces share fabric uplinks; same-FEX proximity does not eliminate parent dependence."
      ]
    ],
    "comparison": [
      [
        "Host interface",
        "Endpoint-facing FEX port",
        "Not a generic inter-switch link."
      ],
      [
        "Fabric uplink",
        "Transport to parent",
        "Shared host capacity."
      ],
      [
        "Parent",
        "Controlling switch",
        "Common control and forwarding dependency."
      ]
    ],
    "example": "Baseline task: Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss. Incident: The plan assumes same-FEX hosts keep switching after their only parent fails. Recovery requirement: Correct the parent-dependent path and record supported redundancy or the expected outage. Worked reasoning: Can a conventional FEX operate as an independent switch without its parent? No. It is a remote extension architecture. Alternative check: Why calculate uplink oversubscription? Host-port sum can exceed shared transport capacity. Line rates are not simultaneous guarantees.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show fex\nshow interface brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Host interface and Fabric uplink. Correct the parent-dependent path and record supported redundancy or the expected outage. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The plan assumes same-FEX hosts keep switching after their only parent fails. Rollback must restore the exact baseline: Correct the parent-dependent path and record supported redundancy or the expected outage. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss. Assign an owner for the first failing boundary and a separate owner for service acceptance. Many host interfaces share fabric uplinks; same-FEX proximity does not eliminate parent dependence. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The plan assumes same-FEX hosts keep switching after their only parent fails.",
        "Correct the parent-dependent path and record supported redundancy or the expected outage."
      ],
      [
        "Do same-FEX hosts necessarily switch locally?",
        "No; the conventional path uses the parent. Physical proximity is not forwarding locality."
      ],
      [
        "Can any network switch be attached to a host interface?",
        "Do not assume so; follow supported restrictions. Host interfaces are not generic aggregation ports."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Common control and forwarding dependency. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Fabric uplink. The parent owns configuration and supported software coordination. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "It is a remote extension architecture.",
      "Physical proximity is not forwarding locality.",
      "Connectors alone are insufficient.",
      "Line rates are not simultaneous guarantees.",
      "Host interfaces are not generic aggregation ports.",
      "Discovery is a narrower boundary."
    ],
    "prerequisites": [
      "s7-g0-t3"
    ],
    "related": [
      "s7-g2-t2"
    ],
    "lab": {
      "objective": "Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Server A → FEX host port → fabric uplink → parent switching",
        "Parent → fabric uplink → FEX host port → server B"
      ],
      "steps": [
        "Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The plan assumes same-FEX hosts keep switching after their only parent fails.",
        "Correct the parent-dependent path and record supported redundancy or the expected outage.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Correct the parent-dependent path and record supported redundancy or the expected outage. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The plan assumes same-FEX hosts keep switching after their only parent fails. Do not assume so; follow supported restrictions. Host interfaces are not generic aggregation ports.",
      "challenge": "Does online status prove application recovery? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Host interface": "Endpoint-facing FEX port. Not a generic inter-switch link.",
      "Fabric uplink": "Transport to parent. Shared host capacity.",
      "Parent": "Controlling switch. Common control and forwarding dependency."
    },
    "sources": [
      {
        "title": "Nexus FEX compatibility matrix",
        "url": "https://www.cisco.com/c/dam/en/us/td/docs/Website/datacenter/fexmatrix/fexmatrix.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 5500 NX-OS 7.x: historical fundamentals",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus5500/sw/fundamentals/7x/b_5500_Fund_Config_7x/b_5500_Fund_Config_7x_chapter_010.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g2-t1-Q1",
        "topicId": "s7-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Can a conventional FEX operate as an independent switch without its parent?",
        "answer": "No.",
        "explanation": "It is a remote extension architecture.",
        "testedConcept": "Host interface"
      },
      {
        "questionId": "s7-g2-t1-Q2",
        "topicId": "s7-g2-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Do same-FEX hosts necessarily switch locally?",
        "answer": "No; the conventional path uses the parent.",
        "explanation": "Physical proximity is not forwarding locality.",
        "testedConcept": "Fabric uplink"
      },
      {
        "questionId": "s7-g2-t1-Q3",
        "topicId": "s7-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What determines parent compatibility?",
        "answer": "Exact FEX, parent, release and topology support.",
        "explanation": "Connectors alone are insufficient.",
        "testedConcept": "Parent"
      },
      {
        "questionId": "s7-g2-t1-Q4",
        "topicId": "s7-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why calculate uplink oversubscription?",
        "answer": "Host-port sum can exceed shared transport capacity.",
        "explanation": "Line rates are not simultaneous guarantees.",
        "testedConcept": "Host interface"
      },
      {
        "questionId": "s7-g2-t1-Q5",
        "topicId": "s7-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can any network switch be attached to a host interface?",
        "answer": "Do not assume so; follow supported restrictions.",
        "explanation": "Host interfaces are not generic aggregation ports.",
        "testedConcept": "Fabric uplink"
      },
      {
        "questionId": "s7-g2-t1-Q6",
        "topicId": "s7-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Does online status prove application recovery?",
        "answer": "No; mapping, policy and host traffic still need checks.",
        "explanation": "Discovery is a narrower boundary.",
        "testedConcept": "Parent"
      },
      {
        "questionId": "s7-g2-t1-Q7",
        "topicId": "s7-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the FEX incident, what is the failing evidence boundary?",
        "answer": "The plan assumes same-FEX hosts keep switching after their only parent fails.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g2-t1-Q8",
        "topicId": "s7-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this FEX incident?",
        "answer": "Correct the parent-dependent path and record supported redundancy or the expected outage.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g2-t1-Q9",
        "topicId": "s7-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Host interface and Fabric uplink in this lesson.",
        "answer": "Endpoint-facing FEX port. Transport to parent.",
        "explanation": "Not a generic inter-switch link. Shared host capacity.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g2-t1-Q10",
        "topicId": "s7-g2-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about FEX would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g2-t1-QC1",
        "topicId": "s7-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g2-t1-QC2",
        "topicId": "s7-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "The parent owns configuration and supported software coordination.",
        "explanation": "Shared host capacity.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g2-t1-QC3",
        "topicId": "s7-g2-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Parent: Controlling switch. Common control and forwarding dependency.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Trace two same-FEX hosts through the parent and calculate the surviving uplink envelope after one member loss.",
      "fault": "The plan assumes same-FEX hosts keep switching after their only parent fails.",
      "restore": "Correct the parent-dependent path and record supported redundancy or the expected outage.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g2-t2",
    "batch": "17",
    "title": "Cisco Fabric Extender",
    "subtitle": "Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g2-t2",
    "definition": "Cisco Fabric Extender operations require stable identity and port mapping during discovery, replacement and recovery. This lesson deepens the earlier FEX architecture with a replacement evidence workflow rather than duplicating its purpose.",
    "purpose": "Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Correlate parent inventory, FEX number and physical identity before changing cables. The handoff to Online state is where a successful first observation can still lead to a failed transaction. Retain before replacement. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "FEX identity: Logical number plus physical identity. Either alone can be confused.",
      "Online state: Parent relationship established. Not an application result.",
      "Host mapping: Endpoint to parent interface. Retain before replacement."
    ],
    "mechanism": [
      "Correlate parent inventory, FEX number and physical identity before changing cables.",
      "Separate discovery, online state and original endpoint delivery.",
      "Preserve physical host-to-port mapping during replacement so the intended policy reaches the intended endpoint."
    ],
    "flow": [
      [
        "Service boundary",
        "Cisco Fabric Extender operations require stable identity and port mapping during discovery, replacement and recovery. This lesson deepens the earlier FEX architecture with a replacement evidence workflow rather than duplicating its purpose."
      ],
      [
        "FEX identity",
        "Correlate parent inventory, FEX number and physical identity before changing cables."
      ],
      [
        "Online state",
        "Separate discovery, online state and original endpoint delivery."
      ],
      [
        "Host mapping",
        "Preserve physical host-to-port mapping during replacement so the intended policy reaches the intended endpoint."
      ]
    ],
    "comparison": [
      [
        "FEX identity",
        "Logical number plus physical identity",
        "Either alone can be confused."
      ],
      [
        "Online state",
        "Parent relationship established",
        "Not an application result."
      ],
      [
        "Host mapping",
        "Endpoint to parent interface",
        "Retain before replacement."
      ]
    ],
    "example": "Baseline task: Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session. Incident: The replacement is online but a server cable lands on a port assigned to another VLAN. Recovery requirement: Restore the recorded mapping and repeat both permitted and prohibited endpoint operations. Worked reasoning: A replacement is online but one server fails. What next? Inspect that server cable, mapped interface and policy. Online does not mean correctly attached. Alternative check: Why test every affected host after replacement? Other ports can remain mispatched despite one successful host. Acceptance covers the changed scope.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show fex\nshow inventory",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against FEX identity and Online state. Restore the recorded mapping and repeat both permitted and prohibited endpoint operations. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The replacement is online but a server cable lands on a port assigned to another VLAN. Rollback must restore the exact baseline: Restore the recorded mapping and repeat both permitted and prohibited endpoint operations. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session. Assign an owner for the first failing boundary and a separate owner for service acceptance. Preserve physical host-to-port mapping during replacement so the intended policy reaches the intended endpoint. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The replacement is online but a server cable lands on a port assigned to another VLAN.",
        "Restore the recorded mapping and repeat both permitted and prohibited endpoint operations."
      ],
      [
        "Why record serial identity as well as FEX number?",
        "To bind the logical name to the physical extender. Numbers can be reused."
      ],
      [
        "What risk comes from stale host-port policy?",
        "An endpoint may enter an unintended VLAN or access domain. Mispatching can be a security failure."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Retain before replacement. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Online state. Separate discovery, online state and original endpoint delivery. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Online does not mean correctly attached.",
      "Numbers can be reused.",
      "Identity does not add compatibility.",
      "Acceptance covers the changed scope.",
      "Mispatching can be a security failure.",
      "Offline evidence is not hardware recovery evidence."
    ],
    "prerequisites": [
      "s7-g2-t1"
    ],
    "related": [
      "s7-g2-t3"
    ],
    "lab": {
      "objective": "Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Physical server label → extender serial/FEX ID → host port → parent interface policy",
        "Replacement identity → restored mapping → original server operation"
      ],
      "steps": [
        "Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The replacement is online but a server cable lands on a port assigned to another VLAN.",
        "Restore the recorded mapping and repeat both permitted and prohibited endpoint operations.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the recorded mapping and repeat both permitted and prohibited endpoint operations. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The replacement is online but a server cable lands on a port assigned to another VLAN. An endpoint may enter an unintended VLAN or access domain. Mispatching can be a security failure.",
      "challenge": "What physical operation was performed in this lesson? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "FEX identity": "Logical number plus physical identity. Either alone can be confused.",
      "Online state": "Parent relationship established. Not an application result.",
      "Host mapping": "Endpoint to parent interface. Retain before replacement."
    },
    "sources": [
      {
        "title": "Nexus FEX compatibility matrix",
        "url": "https://www.cisco.com/c/dam/en/us/td/docs/Website/datacenter/fexmatrix/fexmatrix.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g2-t2-Q1",
        "topicId": "s7-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "A replacement is online but one server fails. What next?",
        "answer": "Inspect that server cable, mapped interface and policy.",
        "explanation": "Online does not mean correctly attached.",
        "testedConcept": "FEX identity"
      },
      {
        "questionId": "s7-g2-t2-Q2",
        "topicId": "s7-g2-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why record serial identity as well as FEX number?",
        "answer": "To bind the logical name to the physical extender.",
        "explanation": "Numbers can be reused.",
        "testedConcept": "Online state"
      },
      {
        "questionId": "s7-g2-t2-Q3",
        "topicId": "s7-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can matching the logical ID fix unsupported hardware?",
        "answer": "No.",
        "explanation": "Identity does not add compatibility.",
        "testedConcept": "Host mapping"
      },
      {
        "questionId": "s7-g2-t2-Q4",
        "topicId": "s7-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why test every affected host after replacement?",
        "answer": "Other ports can remain mispatched despite one successful host.",
        "explanation": "Acceptance covers the changed scope.",
        "testedConcept": "FEX identity"
      },
      {
        "questionId": "s7-g2-t2-Q5",
        "topicId": "s7-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What risk comes from stale host-port policy?",
        "answer": "An endpoint may enter an unintended VLAN or access domain.",
        "explanation": "Mispatching can be a security failure.",
        "testedConcept": "Online state"
      },
      {
        "questionId": "s7-g2-t2-Q6",
        "topicId": "s7-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What physical operation was performed in this lesson?",
        "answer": "None; replacement is a guided rehearsal.",
        "explanation": "Offline evidence is not hardware recovery evidence.",
        "testedConcept": "Host mapping"
      },
      {
        "questionId": "s7-g2-t2-Q7",
        "topicId": "s7-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Cisco Fabric Extender incident, what is the failing evidence boundary?",
        "answer": "The replacement is online but a server cable lands on a port assigned to another VLAN.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g2-t2-Q8",
        "topicId": "s7-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Cisco Fabric Extender incident?",
        "answer": "Restore the recorded mapping and repeat both permitted and prohibited endpoint operations.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g2-t2-Q9",
        "topicId": "s7-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between FEX identity and Online state in this lesson.",
        "answer": "Logical number plus physical identity. Parent relationship established.",
        "explanation": "Either alone can be confused. Not an application result.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g2-t2-Q10",
        "topicId": "s7-g2-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Cisco Fabric Extender would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g2-t2-QC1",
        "topicId": "s7-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g2-t2-QC2",
        "topicId": "s7-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Separate discovery, online state and original endpoint delivery.",
        "explanation": "Not an application result.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g2-t2-QC3",
        "topicId": "s7-g2-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Host mapping: Endpoint to parent interface. Retain before replacement.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Prepare a replacement worksheet with server labels, FEX ports, parent interfaces and an independent recovery session.",
      "fault": "The replacement is online but a server cable lands on a port assigned to another VLAN.",
      "restore": "Restore the recorded mapping and repeat both permitted and prohibited endpoint operations.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g2-t3",
    "batch": "17",
    "title": "Data Center Interconnect",
    "subtitle": "Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g2-t3",
    "definition": "Data Center Interconnect joins services across sites using an explicitly chosen Layer 2 or Layer 3 boundary. Extending connectivity also extends selected failure dependencies; a network path does not provide application consistency or storage recovery.",
    "purpose": "Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Prefer a documented service requirement when choosing routed exchange versus Layer 2 extension. The handoff to Stretch domain is where a successful first observation can still lead to a failed transaction. Requires application observations. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "components": [
      "DCI: Inter-site connectivity. Not application recovery itself.",
      "Stretch domain: Layer 2 scope across sites. Expands selected fault domains.",
      "Recovery objective: Service and data target. Requires application observations."
    ],
    "mechanism": [
      "Prefer a documented service requirement when choosing routed exchange versus Layer 2 extension.",
      "For stretch designs, identify broadcast scope, gateway location, MTU and failure containment.",
      "Measure application recovery and data age separately from tunnel state, including stateful return-path behavior."
    ],
    "flow": [
      [
        "Service boundary",
        "Data Center Interconnect joins services across sites using an explicitly chosen Layer 2 or Layer 3 boundary. Extending connectivity also extends selected failure dependencies; a network path does not provide application consistency or storage recovery."
      ],
      [
        "DCI",
        "Prefer a documented service requirement when choosing routed exchange versus Layer 2 extension."
      ],
      [
        "Stretch domain",
        "For stretch designs, identify broadcast scope, gateway location, MTU and failure containment."
      ],
      [
        "Recovery objective",
        "Measure application recovery and data age separately from tunnel state, including stateful return-path behavior."
      ]
    ],
    "comparison": [
      [
        "DCI",
        "Inter-site connectivity",
        "Not application recovery itself."
      ],
      [
        "Stretch domain",
        "Layer 2 scope across sites",
        "Expands selected fault domains."
      ],
      [
        "Recovery objective",
        "Service and data target",
        "Requires application observations."
      ]
    ],
    "example": "Baseline task: Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions. Incident: The network link returns but the replica remains stale; full recovery is falsely declared. Recovery requirement: Retest client operation and recoverable data age with separate infrastructure and application timestamps. Worked reasoning: Does Layer 2 stretch guarantee disruption-free application mobility? No; sessions, storage and policy remain. Address continuity is only one dependency. Alternative check: What can asymmetric firewall paths break? Stateful session acceptance. Routes alone do not align firewall state.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show ip route\nshow interface brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against DCI and Stretch domain. Retest client operation and recoverable data age with separate infrastructure and application timestamps. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The network link returns but the replica remains stale; full recovery is falsely declared. Rollback must restore the exact baseline: Retest client operation and recoverable data age with separate infrastructure and application timestamps. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions. Assign an owner for the first failing boundary and a separate owner for service acceptance. Measure application recovery and data age separately from tunnel state, including stateful return-path behavior. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The network link returns but the replica remains stale; full recovery is falsely declared.",
        "Retest client operation and recoverable data age with separate infrastructure and application timestamps."
      ],
      [
        "What can a routed boundary reduce?",
        "Layer 2 broadcast and fault scope. Benefits depend on actual design."
      ],
      [
        "Does restored connectivity prove the RPO?",
        "No; recoverable data age must be measured. RPO is a data objective."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Requires application observations. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Stretch domain. For stretch designs, identify broadcast scope, gateway location, MTU and failure containment. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
    "mistakes": [
      "Address continuity is only one dependency.",
      "Benefits depend on actual design.",
      "Tunnel state does not prove packet fit.",
      "Routes alone do not align firewall state.",
      "RPO is a data objective.",
      "Network-only ping misses service consistency."
    ],
    "prerequisites": [
      "s6-g3-t2",
      "s1-g4-t0"
    ],
    "related": [
      "s7-g3-t0"
    ],
    "lab": {
      "objective": "Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Site A client → local gateway/policy → inter-site path → Site B service",
        "Separate replication/data-age observation → application recovery verdict"
      ],
      "steps": [
        "Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The network link returns but the replica remains stale; full recovery is falsely declared.",
        "Retest client operation and recoverable data age with separate infrastructure and application timestamps.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Retest client operation and recoverable data age with separate infrastructure and application timestamps. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The network link returns but the replica remains stale; full recovery is falsely declared. No; recoverable data age must be measured. RPO is a data objective.",
      "challenge": "What belongs in site-partition testing? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "DCI": "Inter-site connectivity. Not application recovery itself.",
      "Stretch domain": "Layer 2 scope across sites. Expands selected fault domains.",
      "Recovery objective": "Service and data target. Requires application observations."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
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
        "questionId": "s7-g2-t3-Q1",
        "topicId": "s7-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does Layer 2 stretch guarantee disruption-free application mobility?",
        "answer": "No; sessions, storage and policy remain.",
        "explanation": "Address continuity is only one dependency.",
        "testedConcept": "DCI"
      },
      {
        "questionId": "s7-g2-t3-Q2",
        "topicId": "s7-g2-t3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What can a routed boundary reduce?",
        "answer": "Layer 2 broadcast and fault scope.",
        "explanation": "Benefits depend on actual design.",
        "testedConcept": "Stretch domain"
      },
      {
        "questionId": "s7-g2-t3-Q3",
        "topicId": "s7-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why check encapsulated MTU across all site paths?",
        "answer": "One smaller intermediate path can break large packets.",
        "explanation": "Tunnel state does not prove packet fit.",
        "testedConcept": "Recovery objective"
      },
      {
        "questionId": "s7-g2-t3-Q4",
        "topicId": "s7-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What can asymmetric firewall paths break?",
        "answer": "Stateful session acceptance.",
        "explanation": "Routes alone do not align firewall state.",
        "testedConcept": "DCI"
      },
      {
        "questionId": "s7-g2-t3-Q5",
        "topicId": "s7-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does restored connectivity prove the RPO?",
        "answer": "No; recoverable data age must be measured.",
        "explanation": "RPO is a data objective.",
        "testedConcept": "Stretch domain"
      },
      {
        "questionId": "s7-g2-t3-Q6",
        "topicId": "s7-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What belongs in site-partition testing?",
        "answer": "Application ownership, split-brain handling and policy behavior.",
        "explanation": "Network-only ping misses service consistency.",
        "testedConcept": "Recovery objective"
      },
      {
        "questionId": "s7-g2-t3-Q7",
        "topicId": "s7-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Data Center Interconnect incident, what is the failing evidence boundary?",
        "answer": "The network link returns but the replica remains stale; full recovery is falsely declared.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g2-t3-Q8",
        "topicId": "s7-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Data Center Interconnect incident?",
        "answer": "Retest client operation and recoverable data age with separate infrastructure and application timestamps.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g2-t3-Q9",
        "topicId": "s7-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between DCI and Stretch domain in this lesson.",
        "answer": "Inter-site connectivity. Layer 2 scope across sites.",
        "explanation": "Not application recovery itself. Expands selected fault domains.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g2-t3-Q10",
        "topicId": "s7-g2-t3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Data Center Interconnect would exceed the exercise evidence?",
        "answer": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g2-t3-QC1",
        "topicId": "s7-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g2-t3-QC2",
        "topicId": "s7-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "For stretch designs, identify broadcast scope, gateway location, MTU and failure containment.",
        "explanation": "Expands selected fault domains.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g2-t3-QC3",
        "topicId": "s7-g2-t3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Recovery objective: Service and data target. Requires application observations.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evidence",
      "baseline": "Compare routed and stretched alternatives with latency, bandwidth, gateway and recovery assumptions.",
      "fault": "The network link returns but the replica remains stale; full recovery is falsely declared.",
      "restore": "Retest client operation and recoverable data age with separate infrastructure and application timestamps.",
      "scope": "This is a guided evidence review. The three incident stages are authored scenarios, not captured device output. Choosing a stage does not run a command, discover hardware or change any network."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g3-t0",
    "batch": "17",
    "title": "VXLAN",
    "subtitle": "Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g3-t0",
    "definition": "VXLAN carries an inner Ethernet frame in UDP/IP between tunnel endpoints. Its 24-bit VNI identifies the overlay segment. The underlay routes the outer packet; VXLAN itself provides neither encryption nor the EVPN control plane.",
    "purpose": "Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Ingress classification selects a VNI and remote endpoint or replication treatment. The handoff to Outer packet is where a successful first observation can still lead to a failed transaction. Not encryption. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.",
    "components": [
      "Inner frame: Tenant Ethernet without original FCS. Includes inner Ethernet header.",
      "Outer packet: Routed underlay IP object. Compare IP MTU to this boundary.",
      "VNI: 24-bit overlay identifier. Not encryption."
    ],
    "mechanism": [
      "Ingress classification selects a VNI and remote endpoint or replication treatment.",
      "Encapsulation adds VXLAN, UDP and outer IP headers around inner Ethernet without the original FCS.",
      "The remote VTEP decapsulates and forwards in the mapped local segment after required policy checks."
    ],
    "flow": [
      [
        "Service boundary",
        "VXLAN carries an inner Ethernet frame in UDP/IP between tunnel endpoints. Its 24-bit VNI identifies the overlay segment. The underlay routes the outer packet; VXLAN itself provides neither encryption nor the EVPN control plane."
      ],
      [
        "Inner frame",
        "Ingress classification selects a VNI and remote endpoint or replication treatment."
      ],
      [
        "Outer packet",
        "Encapsulation adds VXLAN, UDP and outer IP headers around inner Ethernet without the original FCS."
      ],
      [
        "VNI",
        "The remote VTEP decapsulates and forwards in the mapped local segment after required policy checks."
      ]
    ],
    "comparison": [
      [
        "Inner frame",
        "Tenant Ethernet without original FCS",
        "Includes inner Ethernet header."
      ],
      [
        "Outer packet",
        "Routed underlay IP object",
        "Compare IP MTU to this boundary."
      ],
      [
        "VNI",
        "24-bit overlay identifier",
        "Not encryption."
      ]
    ],
    "example": "Baseline task: Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay. Incident: A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions. Recovery requirement: Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately. Worked reasoning: What does the underlay route? The outer IP packet between VTEPs. Tenant MACs are inside the encapsulation. Alternative check: Does VXLAN encrypt traffic? No. Encapsulation is not confidentiality.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show nve peers\nshow nve vni",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Inner frame and Outer packet. Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions. Rollback must restore the exact baseline: Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay. Assign an owner for the first failing boundary and a separate owner for service acceptance. The remote VTEP decapsulates and forwards in the mapped local segment after required policy checks. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions.",
        "Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately."
      ],
      [
        "What outer IP size carries 1500-byte inner IP over untagged inner Ethernet and base outer IPv4?",
        "1550 bytes. Add 14 Ethernet, 8 VXLAN, 8 UDP and 20 outer IP bytes; no FCS."
      ],
      [
        "Which UDP destination port is assigned to VXLAN?",
        "4789. BGP transport is separate."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Not encryption. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Outer packet. Encapsulation adds VXLAN, UDP and outer IP headers around inner Ethernet without the original FCS. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.",
    "mistakes": [
      "Tenant MACs are inside the encapsulation.",
      "Add 14 Ethernet, 8 VXLAN, 8 UDP and 20 outer IP bytes; no FCS.",
      "Its base header adds 20 more bytes than IPv4.",
      "Encapsulation is not confidentiality.",
      "BGP transport is separate.",
      "Probe size matters."
    ],
    "prerequisites": [
      "s1-g3-t0",
      "s1-g4-t0"
    ],
    "related": [
      "s7-g3-t1"
    ],
    "lab": {
      "objective": "Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Host A / local VLAN → ingress VTEP and VNI mapping",
        "Outer VTEP IP → routed spine underlay → remote VTEP IP",
        "Remote VNI mapping → local attachment → Host B"
      ],
      "steps": [
        "Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions.",
        "Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions. 4789. BGP transport is separate.",
      "challenge": "Why can small pings pass during an MTU fault? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Inner frame": "Tenant Ethernet without original FCS. Includes inner Ethernet header.",
      "Outer packet": "Routed underlay IP object. Compare IP MTU to this boundary.",
      "VNI": "24-bit overlay identifier. Not encryption."
    },
    "sources": [
      {
        "title": "RFC 7348: VXLAN, Informational",
        "url": "https://www.rfc-editor.org/rfc/rfc7348",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g3-t0-Q1",
        "topicId": "s7-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What does the underlay route?",
        "answer": "The outer IP packet between VTEPs.",
        "explanation": "Tenant MACs are inside the encapsulation.",
        "testedConcept": "Inner frame"
      },
      {
        "questionId": "s7-g3-t0-Q2",
        "topicId": "s7-g3-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What outer IP size carries 1500-byte inner IP over untagged inner Ethernet and base outer IPv4?",
        "answer": "1550 bytes.",
        "explanation": "Add 14 Ethernet, 8 VXLAN, 8 UDP and 20 outer IP bytes; no FCS.",
        "testedConcept": "Outer packet"
      },
      {
        "questionId": "s7-g3-t0-Q3",
        "topicId": "s7-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What changes with base outer IPv6?",
        "answer": "The outer IP packet becomes 1570 bytes.",
        "explanation": "Its base header adds 20 more bytes than IPv4.",
        "testedConcept": "VNI"
      },
      {
        "questionId": "s7-g3-t0-Q4",
        "topicId": "s7-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does VXLAN encrypt traffic?",
        "answer": "No.",
        "explanation": "Encapsulation is not confidentiality.",
        "testedConcept": "Inner frame"
      },
      {
        "questionId": "s7-g3-t0-Q5",
        "topicId": "s7-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which UDP destination port is assigned to VXLAN?",
        "answer": "4789.",
        "explanation": "BGP transport is separate.",
        "testedConcept": "Outer packet"
      },
      {
        "questionId": "s7-g3-t0-Q6",
        "topicId": "s7-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why can small pings pass during an MTU fault?",
        "answer": "They may fit while larger encapsulated packets do not.",
        "explanation": "Probe size matters.",
        "testedConcept": "VNI"
      },
      {
        "questionId": "s7-g3-t0-Q7",
        "topicId": "s7-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the VXLAN incident, what is the failing evidence boundary?",
        "answer": "A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g3-t0-Q8",
        "topicId": "s7-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this VXLAN incident?",
        "answer": "Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g3-t0-Q9",
        "topicId": "s7-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Inner frame and Outer packet in this lesson.",
        "answer": "Tenant Ethernet without original FCS. Routed underlay IP object.",
        "explanation": "Includes inner Ethernet header. Compare IP MTU to this boundary.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g3-t0-Q10",
        "topicId": "s7-g3-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about VXLAN would exceed the exercise evidence?",
        "answer": "Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g3-t0-QC1",
        "topicId": "s7-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g3-t0-QC2",
        "topicId": "s7-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Encapsulation adds VXLAN, UDP and outer IP headers around inner Ethernet without the original FCS.",
        "explanation": "Compare IP MTU to this boundary.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g3-t0-QC3",
        "topicId": "s7-g3-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "VNI: 24-bit overlay identifier. Not encryption.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vxlan",
      "baseline": "Calculate the outer IP budget for a 1500-byte inner IP packet and trace both sets of addresses across the underlay.",
      "fault": "A 1500-byte underlay IP MTU cannot carry a 1550-byte outer IPv4 packet for the stated untagged-inner assumptions.",
      "restore": "Restore a supported end-to-end MTU or reduce the inner budget, then require actual large-packet service testing separately.",
      "scope": "Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g3-t1",
    "batch": "17",
    "title": "VXLAN VNI",
    "subtitle": "Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g3-t1",
    "definition": "A VXLAN Network Identifier is a 24-bit segment identifier. In common symmetric EVPN designs, an L2 VNI identifies a bridging context and an L3 VNI associates a tenant routing context. Local VLAN and VNI namespaces are distinct.",
    "purpose": "Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Map the local attachment to the intended L2 VNI at each VTEP. The handoff to L3 VNI is where a successful first observation can still lead to a failed transaction. Need not numerically equal VNI. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Compare two supplied local VLAN-to-L2-VNI mappings. Different VLAN numbers can map to the same VNI. Matching VNI numbers establish identifier consistency only; routing, EVPN policy, platform reserved values and device scale remain outside this arithmetic worksheet.",
    "components": [
      "L2 VNI: Overlay bridging context. Mapped from local attachment.",
      "L3 VNI: Tenant routing association. Distinct from endpoint VLAN.",
      "Local VLAN: Local classification number. Need not numerically equal VNI."
    ],
    "mechanism": [
      "Map the local attachment to the intended L2 VNI at each VTEP.",
      "Associate tenant routing with a separate L3 VNI where the supported design requires it.",
      "Check import/export policy together with VNI mapping; matching numbers alone do not prove reachability or authorization."
    ],
    "flow": [
      [
        "Service boundary",
        "A VXLAN Network Identifier is a 24-bit segment identifier. In common symmetric EVPN designs, an L2 VNI identifies a bridging context and an L3 VNI associates a tenant routing context. Local VLAN and VNI namespaces are distinct."
      ],
      [
        "L2 VNI",
        "Map the local attachment to the intended L2 VNI at each VTEP."
      ],
      [
        "L3 VNI",
        "Associate tenant routing with a separate L3 VNI where the supported design requires it."
      ],
      [
        "Local VLAN",
        "Check import/export policy together with VNI mapping; matching numbers alone do not prove reachability or authorization."
      ]
    ],
    "comparison": [
      [
        "L2 VNI",
        "Overlay bridging context",
        "Mapped from local attachment."
      ],
      [
        "L3 VNI",
        "Tenant routing association",
        "Distinct from endpoint VLAN."
      ],
      [
        "Local VLAN",
        "Local classification number",
        "Need not numerically equal VNI."
      ]
    ],
    "example": "Baseline task: Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies. Incident: The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy. Recovery requirement: Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic. Worked reasoning: Must VLAN 10 use VNI 10? No. A configured mapping relates different namespaces. Alternative check: What does an L3 VNI associate with? A tenant routing context in the taught symmetric design. Its role differs from endpoint L2 segments.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show nve vni\nshow vlan brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against L2 VNI and L3 VNI. Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy. Rollback must restore the exact baseline: Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies. Assign an owner for the first failing boundary and a separate owner for service acceptance. Check import/export policy together with VNI mapping; matching numbers alone do not prove reachability or authorization. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy.",
        "Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic."
      ],
      [
        "Does 24-bit encoding imply every value is supported concurrently?",
        "No; implementation scale is specific. Field size is not hardware capacity."
      ],
      [
        "Can different local VLANs map into one overlay segment?",
        "Yes, with supported consistent mappings. Local numbers have local significance."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Need not numerically equal VNI. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: L3 VNI. Associate tenant routing with a separate L3 VNI where the supported design requires it. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Compare two supplied local VLAN-to-L2-VNI mappings. Different VLAN numbers can map to the same VNI. Matching VNI numbers establish identifier consistency only; routing, EVPN policy, platform reserved values and device scale remain outside this arithmetic worksheet.",
    "mistakes": [
      "A configured mapping relates different namespaces.",
      "Field size is not hardware capacity.",
      "It is not automatically the tenant VRF.",
      "Its role differs from endpoint L2 segments.",
      "Local numbers have local significance.",
      "Availability alone is insufficient."
    ],
    "prerequisites": [
      "s7-g3-t0"
    ],
    "related": [
      "s7-g3-t2"
    ],
    "lab": {
      "objective": "Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Host A / local VLAN → ingress VTEP and VNI mapping",
        "Outer VTEP IP → routed spine underlay → remote VTEP IP",
        "Remote VNI mapping → local attachment → Host B"
      ],
      "steps": [
        "Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy.",
        "Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy. Yes, with supported consistent mappings. Local numbers have local significance.",
      "challenge": "Why test a denied path after mapping repair? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "L2 VNI": "Overlay bridging context. Mapped from local attachment.",
      "L3 VNI": "Tenant routing association. Distinct from endpoint VLAN.",
      "Local VLAN": "Local classification number. Need not numerically equal VNI."
    },
    "sources": [
      {
        "title": "RFC 7348: VXLAN, Informational",
        "url": "https://www.rfc-editor.org/rfc/rfc7348",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g3-t1-Q1",
        "topicId": "s7-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Must VLAN 10 use VNI 10?",
        "answer": "No.",
        "explanation": "A configured mapping relates different namespaces.",
        "testedConcept": "L2 VNI"
      },
      {
        "questionId": "s7-g3-t1-Q2",
        "topicId": "s7-g3-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does 24-bit encoding imply every value is supported concurrently?",
        "answer": "No; implementation scale is specific.",
        "explanation": "Field size is not hardware capacity.",
        "testedConcept": "L3 VNI"
      },
      {
        "questionId": "s7-g3-t1-Q3",
        "topicId": "s7-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does an L2 VNI represent here?",
        "answer": "A bridging segment.",
        "explanation": "It is not automatically the tenant VRF.",
        "testedConcept": "Local VLAN"
      },
      {
        "questionId": "s7-g3-t1-Q4",
        "topicId": "s7-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does an L3 VNI associate with?",
        "answer": "A tenant routing context in the taught symmetric design.",
        "explanation": "Its role differs from endpoint L2 segments.",
        "testedConcept": "L2 VNI"
      },
      {
        "questionId": "s7-g3-t1-Q5",
        "topicId": "s7-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Can different local VLANs map into one overlay segment?",
        "answer": "Yes, with supported consistent mappings.",
        "explanation": "Local numbers have local significance.",
        "testedConcept": "L3 VNI"
      },
      {
        "questionId": "s7-g3-t1-Q6",
        "topicId": "s7-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why test a denied path after mapping repair?",
        "answer": "A wrong mapping can restore connectivity by leaking isolation.",
        "explanation": "Availability alone is insufficient.",
        "testedConcept": "Local VLAN"
      },
      {
        "questionId": "s7-g3-t1-Q7",
        "topicId": "s7-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the VXLAN VNI incident, what is the failing evidence boundary?",
        "answer": "The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g3-t1-Q8",
        "topicId": "s7-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this VXLAN VNI incident?",
        "answer": "Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g3-t1-Q9",
        "topicId": "s7-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between L2 VNI and L3 VNI in this lesson.",
        "answer": "Overlay bridging context. Tenant routing association.",
        "explanation": "Mapped from local attachment. Distinct from endpoint VLAN.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g3-t1-Q10",
        "topicId": "s7-g3-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about VXLAN VNI would exceed the exercise evidence?",
        "answer": "Compare two supplied local VLAN-to-L2-VNI mappings. Different VLAN numbers can map to the same VNI. Matching VNI numbers establish identifier consistency only; routing, EVPN policy, platform reserved values and device scale remain outside this arithmetic worksheet.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g3-t1-QC1",
        "topicId": "s7-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g3-t1-QC2",
        "topicId": "s7-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Associate tenant routing with a separate L3 VNI where the supported design requires it.",
        "explanation": "Distinct from endpoint VLAN.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g3-t1-QC3",
        "topicId": "s7-g3-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Local VLAN: Local classification number. Need not numerically equal VNI.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vni",
      "baseline": "Map Blue VLAN 10 to VNI 10100 and Red VLAN 20 to 10200 with explicit VRFs and import policies.",
      "fault": "The remote Blue attachment is incorrectly mapped to VNI 10200 while transport stays healthy.",
      "restore": "Restore the exact mapping and verify same-tenant delivery and denied cross-tenant traffic.",
      "scope": "Compare two supplied local VLAN-to-L2-VNI mappings. Different VLAN numbers can map to the same VNI. Matching VNI numbers establish identifier consistency only; routing, EVPN policy, platform reserved values and device scale remain outside this arithmetic worksheet."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g3-t2",
    "batch": "17",
    "title": "VTEP",
    "subtitle": "Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g3-t2",
    "definition": "A VTEP originates and terminates VXLAN between a local attachment and an IP underlay. Source identity, remote reachability, VNI membership and endpoint state must agree. The management address need not be the tunnel source.",
    "purpose": "Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Local classification and endpoint information select a remote forwarding destination. The handoff to NVE is where a successful first observation can still lead to a failed transaction. Reachability is necessary, not sufficient. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.",
    "components": [
      "Tunnel source: Outer endpoint identity. Often a designated loopback.",
      "NVE: NX-OS overlay abstraction. State is not complete tenant delivery.",
      "Remote peer: Destination tunnel endpoint. Reachability is necessary, not sufficient."
    ],
    "mechanism": [
      "Local classification and endpoint information select a remote forwarding destination.",
      "The outer source and destination must be reachable through the actual underlay context.",
      "Remote decapsulation resolves the VNI and local endpoint path; transport readiness alone does not authorize tenant traffic."
    ],
    "flow": [
      [
        "Service boundary",
        "A VTEP originates and terminates VXLAN between a local attachment and an IP underlay. Source identity, remote reachability, VNI membership and endpoint state must agree. The management address need not be the tunnel source."
      ],
      [
        "Tunnel source",
        "Local classification and endpoint information select a remote forwarding destination."
      ],
      [
        "NVE",
        "The outer source and destination must be reachable through the actual underlay context."
      ],
      [
        "Remote peer",
        "Remote decapsulation resolves the VNI and local endpoint path; transport readiness alone does not authorize tenant traffic."
      ]
    ],
    "comparison": [
      [
        "Tunnel source",
        "Outer endpoint identity",
        "Often a designated loopback."
      ],
      [
        "NVE",
        "NX-OS overlay abstraction",
        "State is not complete tenant delivery."
      ],
      [
        "Remote peer",
        "Destination tunnel endpoint",
        "Reachability is necessary, not sufficient."
      ]
    ],
    "example": "Baseline task: Trace a frame through access port, local NVE, remote tunnel source and destination attachment. Incident: Management is reachable but the route to the remote tunnel source is absent. Recovery requirement: Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state. Worked reasoning: Does management ping prove VTEP reachability? No; addresses and contexts may differ. Check the actual tunnel endpoint. Alternative check: Why inspect peer and VNI state separately? A reachable peer can lack the required segment. Transport and membership differ.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show nve peers\nshow nve interface",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Tunnel source and NVE. Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Trace a frame through access port, local NVE, remote tunnel source and destination attachment. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Management is reachable but the route to the remote tunnel source is absent. Rollback must restore the exact baseline: Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Trace a frame through access port, local NVE, remote tunnel source and destination attachment. Assign an owner for the first failing boundary and a separate owner for service acceptance. Remote decapsulation resolves the VNI and local endpoint path; transport readiness alone does not authorize tenant traffic. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Management is reachable but the route to the remote tunnel source is absent.",
        "Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state."
      ],
      [
        "Where are VXLAN headers added?",
        "At the ingress VTEP. Transit routers normally forward outer IP."
      ],
      [
        "Must underlay spines learn every tenant MAC in this basic design?",
        "No. They can route outer VTEP addresses."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Reachability is necessary, not sufficient. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: NVE. The outer source and destination must be reachable through the actual underlay context. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.",
    "mistakes": [
      "Check the actual tunnel endpoint.",
      "Transit routers normally forward outer IP.",
      "Local mapping then controls delivery.",
      "Transport and membership differ.",
      "They can route outer VTEP addresses.",
      "Healthy transport can carry a misdirected packet."
    ],
    "prerequisites": [
      "s7-g3-t1"
    ],
    "related": [
      "s7-g4-t0"
    ],
    "lab": {
      "objective": "Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Host A / local VLAN → ingress VTEP and VNI mapping",
        "Outer VTEP IP → routed spine underlay → remote VTEP IP",
        "Remote VNI mapping → local attachment → Host B"
      ],
      "steps": [
        "Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Management is reachable but the route to the remote tunnel source is absent.",
        "Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Management is reachable but the route to the remote tunnel source is absent. No. They can route outer VTEP addresses.",
      "challenge": "What can stale remote endpoint state cause? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Tunnel source": "Outer endpoint identity. Often a designated loopback.",
      "NVE": "NX-OS overlay abstraction. State is not complete tenant delivery.",
      "Remote peer": "Destination tunnel endpoint. Reachability is necessary, not sufficient."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 7348: VXLAN, Informational",
        "url": "https://www.rfc-editor.org/rfc/rfc7348",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g3-t2-Q1",
        "topicId": "s7-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does management ping prove VTEP reachability?",
        "answer": "No; addresses and contexts may differ.",
        "explanation": "Check the actual tunnel endpoint.",
        "testedConcept": "Tunnel source"
      },
      {
        "questionId": "s7-g3-t2-Q2",
        "topicId": "s7-g3-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Where are VXLAN headers added?",
        "answer": "At the ingress VTEP.",
        "explanation": "Transit routers normally forward outer IP.",
        "testedConcept": "NVE"
      },
      {
        "questionId": "s7-g3-t2-Q3",
        "topicId": "s7-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Where is the inner frame recovered?",
        "answer": "At the destination VTEP.",
        "explanation": "Local mapping then controls delivery.",
        "testedConcept": "Remote peer"
      },
      {
        "questionId": "s7-g3-t2-Q4",
        "topicId": "s7-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why inspect peer and VNI state separately?",
        "answer": "A reachable peer can lack the required segment.",
        "explanation": "Transport and membership differ.",
        "testedConcept": "Tunnel source"
      },
      {
        "questionId": "s7-g3-t2-Q5",
        "topicId": "s7-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Must underlay spines learn every tenant MAC in this basic design?",
        "answer": "No.",
        "explanation": "They can route outer VTEP addresses.",
        "testedConcept": "NVE"
      },
      {
        "questionId": "s7-g3-t2-Q6",
        "topicId": "s7-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What can stale remote endpoint state cause?",
        "answer": "Forwarding toward the wrong location.",
        "explanation": "Healthy transport can carry a misdirected packet.",
        "testedConcept": "Remote peer"
      },
      {
        "questionId": "s7-g3-t2-Q7",
        "topicId": "s7-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the VTEP incident, what is the failing evidence boundary?",
        "answer": "Management is reachable but the route to the remote tunnel source is absent.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g3-t2-Q8",
        "topicId": "s7-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this VTEP incident?",
        "answer": "Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g3-t2-Q9",
        "topicId": "s7-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Tunnel source and NVE in this lesson.",
        "answer": "Outer endpoint identity. NX-OS overlay abstraction.",
        "explanation": "Often a designated loopback. State is not complete tenant delivery.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g3-t2-Q10",
        "topicId": "s7-g3-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about VTEP would exceed the exercise evidence?",
        "answer": "Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g3-t2-QC1",
        "topicId": "s7-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g3-t2-QC2",
        "topicId": "s7-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "The outer source and destination must be reachable through the actual underlay context.",
        "explanation": "State is not complete tenant delivery.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g3-t2-QC3",
        "topicId": "s7-g3-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Remote peer: Destination tunnel endpoint. Reachability is necessary, not sufficient.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "vxlan",
      "baseline": "Trace a frame through access port, local NVE, remote tunnel source and destination attachment.",
      "fault": "Management is reachable but the route to the remote tunnel source is absent.",
      "restore": "Restore the intended underlay reachability and verify peer, VNI and original tenant-flow state.",
      "scope": "Outer IP byte budget = inner IP + inner Ethernet 14 + optional inner tag 4 + VXLAN 8 + UDP 8 + base outer IP 20 or 40. No FCS, outer Ethernet, IP options/extensions, encryption or measured path MTU. A retained inner tag is an explicit arithmetic input, not a claim of default platform behavior."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g4-t0",
    "batch": "17",
    "title": "EVPN",
    "subtitle": "Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g4-t0",
    "definition": "EVPN distributes Ethernet/IP reachability with BGP extensions and can pair with VXLAN. Route types, tenant import policy and next-hop resolution explain why a received route may not become usable forwarding.",
    "purpose": "Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Local endpoints and prefixes originate appropriate EVPN reachability records. The handoff to RT is where a successful first observation can still lead to a failed transaction. Different from type 3 membership. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.",
    "components": [
      "RD: Route distinguisher. Uniqueness, not import permission.",
      "RT: Route target. Import/export policy community.",
      "Type 2: MAC and optional IP route. Different from type 3 membership."
    ],
    "mechanism": [
      "Local endpoints and prefixes originate appropriate EVPN reachability records.",
      "An RD provides uniqueness while RTs select intended import scope.",
      "A receiver evaluates policy and transport resolution before forwarding; route visibility alone is not delivery."
    ],
    "flow": [
      [
        "Service boundary",
        "EVPN distributes Ethernet/IP reachability with BGP extensions and can pair with VXLAN. Route types, tenant import policy and next-hop resolution explain why a received route may not become usable forwarding."
      ],
      [
        "RD",
        "Local endpoints and prefixes originate appropriate EVPN reachability records."
      ],
      [
        "RT",
        "An RD provides uniqueness while RTs select intended import scope."
      ],
      [
        "Type 2",
        "A receiver evaluates policy and transport resolution before forwarding; route visibility alone is not delivery."
      ]
    ],
    "comparison": [
      [
        "RD",
        "Route distinguisher",
        "Uniqueness, not import permission."
      ],
      [
        "RT",
        "Route target",
        "Import/export policy community."
      ],
      [
        "Type 2",
        "MAC and optional IP route",
        "Different from type 3 membership."
      ]
    ],
    "example": "Baseline task: Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant. Incident: The BGP session stays up while local import RT changes; the received route no longer qualifies. Recovery requirement: Restore exact import scope, resolve the next hop and test delivery without broad route leakage. Worked reasoning: Is EVPN the packet encapsulation replacing VXLAN? No; it distributes reachability. Control and data planes differ. Alternative check: What is type 3 used for here? Inclusive multicast membership for BUM handling. It is not an ordinary host-unicast route.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show bgp l2vpn evpn\nshow nve peers",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against RD and RT. Restore exact import scope, resolve the next hop and test delivery without broad route leakage. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: The BGP session stays up while local import RT changes; the received route no longer qualifies. Rollback must restore the exact baseline: Restore exact import scope, resolve the next hop and test delivery without broad route leakage. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant. Assign an owner for the first failing boundary and a separate owner for service acceptance. A receiver evaluates policy and transport resolution before forwarding; route visibility alone is not delivery. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "The BGP session stays up while local import RT changes; the received route no longer qualifies.",
        "Restore exact import scope, resolve the next hop and test delivery without broad route leakage."
      ],
      [
        "Does matching RD authorize import?",
        "No; route-target policy controls intended import. RD serves uniqueness."
      ],
      [
        "Is a received route with unreachable next hop ready to forward?",
        "No. Transport resolution remains missing."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Different from type 3 membership. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: RT. An RD provides uniqueness while RTs select intended import scope. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.",
    "mistakes": [
      "Control and data planes differ.",
      "RD serves uniqueness.",
      "It represents endpoint information.",
      "It is not an ordinary host-unicast route.",
      "Transport resolution remains missing.",
      "Its baseline data plane is MPLS."
    ],
    "prerequisites": [
      "s7-g3-t2"
    ],
    "related": [
      "s7-g4-t1"
    ],
    "lab": {
      "objective": "Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Local endpoint → EVPN originator → BGP distribution → receiving VTEP",
        "Received route → RT import → next-hop resolution → forwarding eligibility"
      ],
      "steps": [
        "Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "The BGP session stays up while local import RT changes; the received route no longer qualifies.",
        "Restore exact import scope, resolve the next hop and test delivery without broad route leakage.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore exact import scope, resolve the next hop and test delivery without broad route leakage. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "The BGP session stays up while local import RT changes; the received route no longer qualifies. No. Transport resolution remains missing.",
      "challenge": "How is RFC 7432 used for VXLAN? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "RD": "Route distinguisher. Uniqueness, not import permission.",
      "RT": "Route target. Import/export policy community.",
      "Type 2": "MAC and optional IP route. Different from type 3 membership."
    },
    "sources": [
      {
        "title": "RFC 7432: EVPN foundations; MPLS baseline",
        "url": "https://www.rfc-editor.org/rfc/rfc7432",
        "checked": "2026-10-09"
      },
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g4-t0-Q1",
        "topicId": "s7-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Is EVPN the packet encapsulation replacing VXLAN?",
        "answer": "No; it distributes reachability.",
        "explanation": "Control and data planes differ.",
        "testedConcept": "RD"
      },
      {
        "questionId": "s7-g4-t0-Q2",
        "topicId": "s7-g4-t0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does matching RD authorize import?",
        "answer": "No; route-target policy controls intended import.",
        "explanation": "RD serves uniqueness.",
        "testedConcept": "RT"
      },
      {
        "questionId": "s7-g4-t0-Q3",
        "topicId": "s7-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What does type 2 commonly carry?",
        "answer": "MAC and optional IP reachability.",
        "explanation": "It represents endpoint information.",
        "testedConcept": "Type 2"
      },
      {
        "questionId": "s7-g4-t0-Q4",
        "topicId": "s7-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is type 3 used for here?",
        "answer": "Inclusive multicast membership for BUM handling.",
        "explanation": "It is not an ordinary host-unicast route.",
        "testedConcept": "RD"
      },
      {
        "questionId": "s7-g4-t0-Q5",
        "topicId": "s7-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Is a received route with unreachable next hop ready to forward?",
        "answer": "No.",
        "explanation": "Transport resolution remains missing.",
        "testedConcept": "RT"
      },
      {
        "questionId": "s7-g4-t0-Q6",
        "topicId": "s7-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "How is RFC 7432 used for VXLAN?",
        "answer": "As control-plane foundations supplemented by VXLAN guidance.",
        "explanation": "Its baseline data plane is MPLS.",
        "testedConcept": "Type 2"
      },
      {
        "questionId": "s7-g4-t0-Q7",
        "topicId": "s7-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the EVPN incident, what is the failing evidence boundary?",
        "answer": "The BGP session stays up while local import RT changes; the received route no longer qualifies.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g4-t0-Q8",
        "topicId": "s7-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this EVPN incident?",
        "answer": "Restore exact import scope, resolve the next hop and test delivery without broad route leakage.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g4-t0-Q9",
        "topicId": "s7-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between RD and RT in this lesson.",
        "answer": "Route distinguisher. Route target.",
        "explanation": "Uniqueness, not import permission. Import/export policy community.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g4-t0-Q10",
        "topicId": "s7-g4-t0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about EVPN would exceed the exercise evidence?",
        "answer": "Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g4-t0-QC1",
        "topicId": "s7-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g4-t0-QC2",
        "topicId": "s7-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "An RD provides uniqueness while RTs select intended import scope.",
        "explanation": "Import/export policy community.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g4-t0-QC3",
        "topicId": "s7-g4-t0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Type 2: MAC and optional IP route. Different from type 3 membership.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evpn",
      "baseline": "Compare a matching-RT reachable route with a visible route whose RT is not imported by the local tenant.",
      "fault": "The BGP session stays up while local import RT changes; the received route no longer qualifies.",
      "restore": "Restore exact import scope, resolve the next hop and test delivery without broad route leakage.",
      "scope": "Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g4-t1",
    "batch": "17",
    "title": "MP-BGP EVPN",
    "subtitle": "Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g4-t1",
    "definition": "MP-BGP EVPN exchanges EVPN routes in a specific address family. A transport session being Established does not establish EVPN negotiation, origination, extended-community propagation, import policy or usable tenant forwarding.",
    "purpose": "Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Underlay reachability supports BGP transport and capability negotiation. The handoff to Extended community is where a successful first observation can still lead to a failed transaction. Not necessarily a VXLAN hop. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.",
    "components": [
      "Address family: Negotiated information class. EVPN differs from IPv4 unicast.",
      "Extended community: Carries policy attributes such as RT. Propagation matters.",
      "Route reflector: iBGP distribution role. Not necessarily a VXLAN hop."
    ],
    "mechanism": [
      "Underlay reachability supports BGP transport and capability negotiation.",
      "The EVPN family distributes route types and attributes through the chosen iBGP/eBGP design.",
      "A route reflector can distribute control information without carrying the tenant data path; forwarding resolves toward the advertised endpoint."
    ],
    "flow": [
      [
        "Service boundary",
        "MP-BGP EVPN exchanges EVPN routes in a specific address family. A transport session being Established does not establish EVPN negotiation, origination, extended-community propagation, import policy or usable tenant forwarding."
      ],
      [
        "Address family",
        "Underlay reachability supports BGP transport and capability negotiation."
      ],
      [
        "Extended community",
        "The EVPN family distributes route types and attributes through the chosen iBGP/eBGP design."
      ],
      [
        "Route reflector",
        "A route reflector can distribute control information without carrying the tenant data path; forwarding resolves toward the advertised endpoint."
      ]
    ],
    "comparison": [
      [
        "Address family",
        "Negotiated information class",
        "EVPN differs from IPv4 unicast."
      ],
      [
        "Extended community",
        "Carries policy attributes such as RT",
        "Propagation matters."
      ],
      [
        "Route reflector",
        "iBGP distribution role",
        "Not necessarily a VXLAN hop."
      ]
    ],
    "example": "Baseline task: Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order. Incident: Transport is Established but the EVPN family is disabled in the fixture. Recovery requirement: Restore family and policy intent and verify a specific usable route plus the original transaction. Worked reasoning: Does IPv4-unicast Established prove EVPN exchange? No; inspect the EVPN family. Transport can support distinct families. Alternative check: Must a route reflector carry tenant packets? No. Control distribution and forwarding paths differ.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show bgp l2vpn evpn summary\nshow bgp l2vpn evpn",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Address family and Extended community. Restore family and policy intent and verify a specific usable route plus the original transaction. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: Transport is Established but the EVPN family is disabled in the fixture. Rollback must restore the exact baseline: Restore family and policy intent and verify a specific usable route plus the original transaction. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order. Assign an owner for the first failing boundary and a separate owner for service acceptance. A route reflector can distribute control information without carrying the tenant data path; forwarding resolves toward the advertised endpoint. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "Transport is Established but the EVPN family is disabled in the fixture.",
        "Restore family and policy intent and verify a specific usable route plus the original transaction."
      ],
      [
        "Which TCP port supports ordinary BGP establishment?",
        "179. It is distinct from VXLAN UDP."
      ],
      [
        "A session has no EVPN routes. What next?",
        "Check origination, family activation and export policy. There may be no eligible advertisement."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Not necessarily a VXLAN hop. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Extended community. The EVPN family distributes route types and attributes through the chosen iBGP/eBGP design. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.",
    "mistakes": [
      "Transport can support distinct families.",
      "It is distinct from VXLAN UDP.",
      "A received route can lack needed policy attributes.",
      "Control distribution and forwarding paths differ.",
      "There may be no eligible advertisement.",
      "Restore exact policy, not just prefix count."
    ],
    "prerequisites": [
      "s7-g4-t0"
    ],
    "related": [
      "s7-g4-t2"
    ],
    "lab": {
      "objective": "Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Local endpoint → EVPN originator → BGP distribution → receiving VTEP",
        "Received route → RT import → next-hop resolution → forwarding eligibility"
      ],
      "steps": [
        "Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "Transport is Established but the EVPN family is disabled in the fixture.",
        "Restore family and policy intent and verify a specific usable route plus the original transaction.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore family and policy intent and verify a specific usable route plus the original transaction. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "Transport is Established but the EVPN family is disabled in the fixture. Check origination, family activation and export policy. There may be no eligible advertisement.",
      "challenge": "Why is importing all RTs a poor recovery shortcut? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Address family": "Negotiated information class. EVPN differs from IPv4 unicast.",
      "Extended community": "Carries policy attributes such as RT. Propagation matters.",
      "Route reflector": "iBGP distribution role. Not necessarily a VXLAN hop."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 7432: EVPN foundations; MPLS baseline",
        "url": "https://www.rfc-editor.org/rfc/rfc7432",
        "checked": "2026-10-09"
      }
    ],
    "exams": [
      {
        "questionId": "s7-g4-t1-Q1",
        "topicId": "s7-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Does IPv4-unicast Established prove EVPN exchange?",
        "answer": "No; inspect the EVPN family.",
        "explanation": "Transport can support distinct families.",
        "testedConcept": "Address family"
      },
      {
        "questionId": "s7-g4-t1-Q2",
        "topicId": "s7-g4-t1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which TCP port supports ordinary BGP establishment?",
        "answer": "179.",
        "explanation": "It is distinct from VXLAN UDP.",
        "testedConcept": "Extended community"
      },
      {
        "questionId": "s7-g4-t1-Q3",
        "topicId": "s7-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Why can stripping extended communities break tenant import?",
        "answer": "RT information may be removed.",
        "explanation": "A received route can lack needed policy attributes.",
        "testedConcept": "Route reflector"
      },
      {
        "questionId": "s7-g4-t1-Q4",
        "topicId": "s7-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Must a route reflector carry tenant packets?",
        "answer": "No.",
        "explanation": "Control distribution and forwarding paths differ.",
        "testedConcept": "Address family"
      },
      {
        "questionId": "s7-g4-t1-Q5",
        "topicId": "s7-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "A session has no EVPN routes. What next?",
        "answer": "Check origination, family activation and export policy.",
        "explanation": "There may be no eligible advertisement.",
        "testedConcept": "Extended community"
      },
      {
        "questionId": "s7-g4-t1-Q6",
        "topicId": "s7-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why is importing all RTs a poor recovery shortcut?",
        "answer": "It can leak tenants.",
        "explanation": "Restore exact policy, not just prefix count.",
        "testedConcept": "Route reflector"
      },
      {
        "questionId": "s7-g4-t1-Q7",
        "topicId": "s7-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the MP-BGP EVPN incident, what is the failing evidence boundary?",
        "answer": "Transport is Established but the EVPN family is disabled in the fixture.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g4-t1-Q8",
        "topicId": "s7-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this MP-BGP EVPN incident?",
        "answer": "Restore family and policy intent and verify a specific usable route plus the original transaction.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g4-t1-Q9",
        "topicId": "s7-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Address family and Extended community in this lesson.",
        "answer": "Negotiated information class. Carries policy attributes such as RT.",
        "explanation": "EVPN differs from IPv4 unicast. Propagation matters.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g4-t1-Q10",
        "topicId": "s7-g4-t1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about MP-BGP EVPN would exceed the exercise evidence?",
        "answer": "Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g4-t1-QC1",
        "topicId": "s7-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g4-t1-QC2",
        "topicId": "s7-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "The EVPN family distributes route types and attributes through the chosen iBGP/eBGP design.",
        "explanation": "Propagation matters.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g4-t1-QC3",
        "topicId": "s7-g4-t1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Route reflector: iBGP distribution role. Not necessarily a VXLAN hop.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "evpn",
      "baseline": "Check transport, EVPN family, advertised/received records, RT policy and next-hop resolution in order.",
      "fault": "Transport is Established but the EVPN family is disabled in the fixture.",
      "restore": "Restore family and policy intent and verify a specific usable route plus the original transaction.",
      "scope": "Single synthetic type-2 route eligibility: BGP session, EVPN family, route presence, exact RT membership and reachable next hop. RD is deliberately not an import gate. No full BGP selection, hardware programming, MAC mobility, multihoming or measured forwarding."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  },
  {
    "id": "s7-g4-t2",
    "batch": "17",
    "title": "Leaf-Spine Architecture",
    "subtitle": "Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
    "level": "Intermediate → Advanced",
    "minutes": 55,
    "interactive": "cdc-s7-g4-t2",
    "definition": "A basic two-tier leaf-spine fabric attaches endpoints to leaves and each leaf to every spine. Inter-leaf paths have predictable structure, but resilience depends on surviving capacity, routing and traffic locality rather than link count alone.",
    "purpose": "Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
    "mental": "Think of the service as a sequence of independently verifiable boundaries. Same-leaf traffic can remain local without using a spine. The handoff to Spine is where a successful first observation can still lead to a failed transaction. Not actual utilization. This model is useful for selecting the next observation, not for predicting undocumented vendor behavior. Symmetric per-leaf uplink envelope: remaining links times rate, compared to supplied inter-leaf demand. Two spines and four leaves are the reference topology. No per-flow hashing, queues, convergence or actual traffic.",
    "components": [
      "Leaf: Endpoint and overlay edge. Local attachment context.",
      "Spine: Inter-leaf transit. Not necessarily tenant gateway.",
      "Oversubscription: Downlink divided by uplink envelope. Not actual utilization."
    ],
    "mechanism": [
      "Same-leaf traffic can remain local without using a spine.",
      "Inter-leaf traffic crosses a selected eligible spine toward the destination leaf.",
      "ECMP normally hashes flows; removing a spine reduces aggregate capacity and may change selection without splitting every flow over all links."
    ],
    "flow": [
      [
        "Service boundary",
        "A basic two-tier leaf-spine fabric attaches endpoints to leaves and each leaf to every spine. Inter-leaf paths have predictable structure, but resilience depends on surviving capacity, routing and traffic locality rather than link count alone."
      ],
      [
        "Leaf",
        "Same-leaf traffic can remain local without using a spine."
      ],
      [
        "Spine",
        "Inter-leaf traffic crosses a selected eligible spine toward the destination leaf."
      ],
      [
        "Oversubscription",
        "ECMP normally hashes flows; removing a spine reduces aggregate capacity and may change selection without splitting every flow over all links."
      ]
    ],
    "comparison": [
      [
        "Leaf",
        "Endpoint and overlay edge",
        "Local attachment context."
      ],
      [
        "Spine",
        "Inter-leaf transit",
        "Not necessarily tenant gateway."
      ],
      [
        "Oversubscription",
        "Downlink divided by uplink envelope",
        "Not actual utilization."
      ]
    ],
    "example": "Baseline task: Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf. Incident: One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient. Recovery requirement: Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately. Worked reasoning: How many links join four leaves to both spines? Eight. Each leaf has two spine attachments. Alternative check: What remains after one of those links fails? 100 Gb/s of uplink envelope. Redundancy does not preserve the sum.",
    "ports": "NX-OS SSH commonly uses TCP 22 and APIC HTTPS TCP 443. BGP session transport uses TCP 179; VXLAN uses assigned UDP destination 4789. These are distinct paths. FabricPath, vPC port channels, FEX host links and VNI identifiers do not acquire an application TCP port merely from their names. Permit only the actual supported management/control/data paths required by the design.",
    "commands": [
      {
        "filename": "guided-cisco-observation.txt",
        "platform": "Guided Cisco observation; exact source scope applies; not executed on a target",
        "code": "show ip route\nshow interface brief",
        "explanation": "Collect these only on the intended supported device, with read-only privilege. Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
        "expected": "Retain product ID, active release/mode and timestamp with the relevant operational fields. Interpret the result against Leaf and Spine. Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately. This text describes the expected evidence, not captured output."
      }
    ],
    "configuration": "Configuration intent: Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf. Follow the linked release-specific procedure on an exclusively owned disposable target. Keep the original value and affected object/interface scope, not just the proposed command. Stage one change, inspect its diff and stop on partial application or unexpected dependencies. The deliberately introduced scenario is: One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient. Rollback must restore the exact baseline: Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately. Persist only verified state. Do not remove an entire shared feature, reset a fabric, convert operating mode or broaden tenant policy merely to undo one local edit.",
    "production": "Operational decision: Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf. Assign an owner for the first failing boundary and a separate owner for service acceptance. ECMP normally hashes flows; removing a spine reduces aggregate capacity and may change selection without splitting every flow over all links. Include the surviving failure-state envelope, compatibility evidence, independent recovery and rollback time in the change record. A documented source establishes capability only within its stated release/hardware scope. Evidence from a model, a controller and an endpoint must retain those different observer labels.",
    "troubleshooting": [
      [
        "One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient.",
        "Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately."
      ],
      [
        "Must same-leaf traffic cross a spine?",
        "No. Locality changes resource use."
      ],
      [
        "What is 48x25 divided by 2x100 oversubscription?",
        "6 to 1. 1200/200 equals 6; offered load may be lower."
      ],
      [
        "Status and service disagree",
        "Trace identity → local classification → control/policy → resolved path → original endpoint operation. Capture the first disagreement and restore only the owned scope."
      ]
    ],
    "security": "Preserve the tenant and management boundaries while investigating. Not actual utilization. Restrict administrative access and exports; redact endpoint identities and credentials. A shortcut that restores connectivity by admitting every VLAN, route target or contract can create a larger isolation failure. Keep a negative test for the intentionally excluded tenant or service.",
    "performance": "Evaluate the workload at the relevant boundary: Spine. Inter-leaf traffic crosses a selected eligible spine toward the destination leaf. Record rates, packet sizes and the named failure condition before comparing capacity. Healthy port sums, control sessions and controller health do not establish application throughput, loss or tail latency. The workbench scope is explicit: Symmetric per-leaf uplink envelope: remaining links times rate, compared to supplied inter-leaf demand. Two spines and four leaves are the reference topology. No per-flow hashing, queues, convergence or actual traffic.",
    "mistakes": [
      "Each leaf has two spine attachments.",
      "Locality changes resource use.",
      "Aggregate is not single-flow bandwidth.",
      "Redundancy does not preserve the sum.",
      "1200/200 equals 6; offered load may be lower.",
      "It is an envelope model, not a traffic simulator."
    ],
    "prerequisites": [
      "s6-g3-t2",
      "s7-g4-t1"
    ],
    "related": [
      "s7-g5-t0"
    ],
    "lab": {
      "objective": "Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
      "requirements": "Browser for the authored incident and bounded model. Optional Cisco observations require an authorized compatible target, matching release documentation and read-only access; no vendor execution is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Spine S1 ↔ L1, L2, L3, L4",
        "Spine S2 ↔ L1, L2, L3, L4",
        "Endpoint A → L1 → selected spine → L3 → endpoint B"
      ],
      "steps": [
        "Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
        "Create an evidence table with target identity, release/mode, observer, time, expected result and actual result. Use the documented topology and distinguish configuration intent from operational evidence.",
        "Use the baseline, fault and recovery buttons in the workbench. Predict the consequence before revealing the analyst note. Record which observation would disprove your diagnosis.",
        "One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient.",
        "Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately.",
        "If a supported disposable Cisco target is available, collect the listed read-only commands first. Any configuration exercise requires the exact release guide, an owned baseline, a reviewed diff and an independently tested recovery session. This course does not execute those target changes.",
        "Retest the original permitted operation and an explicitly prohibited operation after restoration. Keep service outcomes separate from routing, interface and controller status. Archive sanitized before/fault/after evidence and the exact scope of what was not tested."
      ],
      "verification": "Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately. Record the original positive and negative service results with observer and timestamp. Distinguish expected behavior from actual captured evidence.",
      "troubleshooting": "One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient. 6 to 1. 1200/200 equals 6; offered load may be lower.",
      "challenge": "What does this calculator omit? Explain a counterexample that would invalidate your first diagnosis.",
      "cleanup": "Reset the browser worksheet. On an optional target restore only owned settings to the recorded values, retest the original service and retain sanitized evidence before removing owned fixtures. No host networking, production switch or storage changes are part of the offline exercise."
    },
    "glossary": {
      "Leaf": "Endpoint and overlay edge. Local attachment context.",
      "Spine": "Inter-leaf transit. Not necessarily tenant gateway.",
      "Oversubscription": "Downlink divided by uplink envelope. Not actual utilization."
    },
    "sources": [
      {
        "title": "Nexus 9000 NX-OS 10.5(x): VXLAN BGP EVPN",
        "url": "https://www.cisco.com/c/en/us/td/docs/dcn/nx-os/nexus9000/105x/configuration/vxlan/cisco-nexus-9000-series-nx-os-vxlan-configuration-guide-release-105x/m_configuring_vxlan_bgp_evpn.html",
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
        "questionId": "s7-g4-t2-Q1",
        "topicId": "s7-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "How many links join four leaves to both spines?",
        "answer": "Eight.",
        "explanation": "Each leaf has two spine attachments.",
        "testedConcept": "Leaf"
      },
      {
        "questionId": "s7-g4-t2-Q2",
        "topicId": "s7-g4-t2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Must same-leaf traffic cross a spine?",
        "answer": "No.",
        "explanation": "Locality changes resource use.",
        "testedConcept": "Spine"
      },
      {
        "questionId": "s7-g4-t2-Q3",
        "topicId": "s7-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Does one flow necessarily use both 100-Gb/s uplinks at once?",
        "answer": "No; typical hashing selects one.",
        "explanation": "Aggregate is not single-flow bandwidth.",
        "testedConcept": "Oversubscription"
      },
      {
        "questionId": "s7-g4-t2-Q4",
        "topicId": "s7-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What remains after one of those links fails?",
        "answer": "100 Gb/s of uplink envelope.",
        "explanation": "Redundancy does not preserve the sum.",
        "testedConcept": "Leaf"
      },
      {
        "questionId": "s7-g4-t2-Q5",
        "topicId": "s7-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is 48x25 divided by 2x100 oversubscription?",
        "answer": "6 to 1.",
        "explanation": "1200/200 equals 6; offered load may be lower.",
        "testedConcept": "Spine"
      },
      {
        "questionId": "s7-g4-t2-Q6",
        "topicId": "s7-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What does this calculator omit?",
        "answer": "Queues, flow hashing and convergence time.",
        "explanation": "It is an envelope model, not a traffic simulator.",
        "testedConcept": "Oversubscription"
      },
      {
        "questionId": "s7-g4-t2-Q7",
        "topicId": "s7-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "In the Leaf-Spine Architecture incident, what is the failing evidence boundary?",
        "answer": "One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient.",
        "explanation": "Compare the stated observation with the mechanism, then separate a demonstrated fault from an unsupported inference.",
        "testedConcept": "Incident diagnosis"
      },
      {
        "questionId": "s7-g4-t2-Q8",
        "topicId": "s7-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "What exact recovery evidence is required for this Leaf-Spine Architecture incident?",
        "answer": "Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately.",
        "explanation": "A repaired configuration or status flag is narrower than restoration of the original intended operation.",
        "testedConcept": "Exact restoration"
      },
      {
        "questionId": "s7-g4-t2-Q9",
        "topicId": "s7-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Explain the difference between Leaf and Spine in this lesson.",
        "answer": "Endpoint and overlay edge. Inter-leaf transit.",
        "explanation": "Local attachment context. Not necessarily tenant gateway.",
        "testedConcept": "Terminology boundary"
      },
      {
        "questionId": "s7-g4-t2-Q10",
        "topicId": "s7-g4-t2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which conclusion about Leaf-Spine Architecture would exceed the exercise evidence?",
        "answer": "Symmetric per-leaf uplink envelope: remaining links times rate, compared to supplied inter-leaf demand. Two spines and four leaves are the reference topology. No per-flow hashing, queues, convergence or actual traffic.",
        "explanation": "The exercise evaluates only its declared inputs. Actual target behavior requires a supported environment and retained observations.",
        "testedConcept": "Evidence scope"
      }
    ],
    "quick": [
      {
        "questionId": "s7-g4-t2-QC1",
        "topicId": "s7-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Name the first observation you would retain before this exercise.",
        "answer": "Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
        "explanation": "Bind evidence to an observer, target and time rather than relying on an unlabeled screenshot.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "s7-g4-t2-QC2",
        "topicId": "s7-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Trace the second mechanism boundary in your own words.",
        "answer": "Inter-leaf traffic crosses a selected eligible spine toward the destination leaf.",
        "explanation": "Not necessarily tenant gateway.",
        "testedConcept": "Mechanism"
      },
      {
        "questionId": "s7-g4-t2-QC3",
        "topicId": "s7-g4-t2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which term in this lesson is easiest to overinterpret, and what is its limit?",
        "answer": "Oversubscription: Downlink divided by uplink envelope. Not actual utilization.",
        "explanation": "Use the stated limitation to prevent a stronger claim than the evidence supports.",
        "testedConcept": "Scope"
      }
    ],
    "ciscoDC": {
      "kind": "fabric",
      "baseline": "Draw two spines and four leaves with eight leaf-spine links and calculate one-spine-loss capacity per leaf.",
      "fault": "One of two 100-Gb/s uplinks is lost while inter-leaf demand is 150 Gb/s; surviving capacity is insufficient.",
      "restore": "Restore the owned path or reduce admitted load in the worksheet, then require measured target behavior separately.",
      "scope": "Symmetric per-leaf uplink envelope: remaining links times rate, compared to supplied inter-leaf demand. Two spines and four leaves are the reference topology. No per-flow hashing, queues, convergence or actual traffic."
    },
    "artifacts": [
      {
        "title": "Cisco Data Center Batch 17 workbook",
        "path": "labs/cisco-dc-17-workbook.md"
      }
    ]
  }
];
