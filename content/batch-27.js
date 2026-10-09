window.INFRA_BATCHES = window.INFRA_BATCHES || {};
window.INFRA_BATCHES["27"] = [
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow physical carrier before logical reachability. Administrative enablement and operational carrier are different states. A powered NIC can still lack a compatible working peer or continuous medium. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Physical medium/transceiver and link partner: cable/fiber, optics and switch port.",
      "Controller/driver: hardware queues, ring buffers and device operation.",
      "OS interface: name, administrative state, link state, addresses and counters.",
      "Protocol stack: Ethernet/IP/transport processing and sockets above the interface."
    ],
    "mechanism": [
      "Administrative enablement and operational carrier are different states. A powered NIC can still lack a compatible working peer or continuous medium.",
      "After carrier is stable, Ethernet membership and IP configuration still govern reachability; follow each boundary independently.",
      "Physical carrier before logical reachability: The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence.",
      "Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link.",
      "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable."
    ],
    "comparison": [
      [
        "Administrative UP",
        "Software has enabled the interface.",
        "Does not establish carrier."
      ],
      [
        "Carrier / link",
        "The relevant link is operational.",
        "Does not establish correct IP addressing or routes."
      ],
      [
        "Service health",
        "A representative application transaction succeeds.",
        "Validates more than link state or ping alone."
      ]
    ],
    "glossary": {
      "NIC": "Network interface controller.",
      "Carrier": "Operational indication of a link signal where the device supports it.",
      "MTU": "Maximum transmission unit: a size limit relevant to a particular link/network layer.",
      "Offload": "Work performed by hardware or another layer instead of the normal software path.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Linux interface statistics",
        "url": "https://docs.kernel.org/networking/statistics.html",
        "checked": "2026-10-03"
      },
      {
        "title": "iproute2: ip link",
        "url": "https://man7.org/linux/man-pages/man8/ip-link.8.html",
        "checked": "2026-10-03"
      },
      {
        "title": "Cisco: switch port and interface problems",
        "url": "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12027-53.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Port and transport depend on the tested service. Physical carrier, frame counters and local evidence inspection have no intrinsic TCP or UDP port; identify the actual protocol before interpreting a filter.",
    "id": "trouble-0",
    "batch": "27",
    "title": "Layer 1 troubleshooting",
    "subtitle": "Physical carrier before logical reachability",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-0",
    "definition": "Layer 1 troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on physical carrier before logical reachability.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds. The incident to explain is: After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds. Observed failure: After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic. Discriminating test: Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link. Interpretation: The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence. Recovery contract: Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.",
    "flow": [
      [
        "Scope and baseline",
        "A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds."
      ],
      [
        "Locate the failed boundary",
        "After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic."
      ],
      [
        "Test a competing explanation",
        "Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link."
      ],
      [
        "Recover and verify",
        "Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-0",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-0, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "ip -br link",
        "explanation": "Show concise interface states; iproute2 is standard on Ubuntu. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "UP and LOWER_UP are different flags. Virtual and loopback devices do not behave like a cable-connected NIC.",
        "platform": "Ubuntu 24.04 / Linux; guided reference, not executed for Batch 27",
        "filename": "terminal"
      },
      {
        "code": "ip -s link",
        "explanation": "Display interface traffic/error/drop counters. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Compare deltas under a known interval. A total since boot alone does not show when a problem occurred.",
        "platform": "Ubuntu 24.04 / Linux; guided reference, not executed for Batch 27",
        "filename": "terminal"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link. The proposed change must address only the demonstrated failed boundary. Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence. A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic."
      ],
      [
        "Competing explanation",
        "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable."
      ],
      [
        "Next discriminating test",
        "Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link."
      ],
      [
        "Supported conclusion and limit",
        "The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence."
      ],
      [
        "Recovery acceptance",
        "Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors."
      ]
    ],
    "mistakes": [
      "Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map.",
      "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable.",
      "Treating a green intermediate status as proof of the original application outcome. Check VLAN membership, addressing and ARP/neighbor resolution; physical recovery does not prove Layer 2 or Layer 3 delivery.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s0-g0-t4"
    ],
    "related": [
      "s0-g0-t4",
      "trouble-1"
    ],
    "incident": {
      "boundary": "Physical carrier before logical reachability",
      "baseline": "A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds.",
      "fault": "After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic.",
      "test": "Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link.",
      "diagnosis": "The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence.",
      "recovery": "Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.",
      "alternative": "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable.",
      "guard": "Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Layer 1 troubleshooting. Physical carrier before logical reachability.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds.",
        "Observation boundary: Physical carrier before logical reachability",
        "Recovery target: Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map.",
        "Select Recovery and explain what each observation establishes: Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.",
        "Run python labs/troubleshooting-lab.py --topic trouble-0 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable."
      ],
      "verification": "Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable. Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map.",
      "challenge": "Carrier returns but the gateway still fails. What comes next?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-0-Q1",
        "topicId": "trouble-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Layer 1 troubleshooting case investigate?",
        "answer": "Physical carrier before logical reachability. The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-0-Q2",
        "topicId": "trouble-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A server NIC and access port report carrier up at the intended speed; gateway traffic succeeds.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-0-Q3",
        "topicId": "trouble-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link.",
        "explanation": "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-0-Q4",
        "topicId": "trouble-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-0-Q5",
        "topicId": "trouble-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic. The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-0-Q6",
        "topicId": "trouble-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-0-Q7",
        "topicId": "trouble-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-0-Q8",
        "topicId": "trouble-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Carrier returns but the gateway still fails. What comes next?",
        "answer": "Check VLAN membership, addressing and ARP/neighbor resolution; physical recovery does not prove Layer 2 or Layer 3 delivery.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-0-Q9",
        "topicId": "trouble-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Layer 1 troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-0-Q10",
        "topicId": "trouble-0",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Layer 1 troubleshooting incident.",
        "answer": "Scope: Physical carrier before logical reachability. Observation: After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic. Next test: Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link. Acceptance: Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-0-QC1",
        "topicId": "trouble-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "After a patch-panel move, both ends report enabled but no carrier. The switch has no recent receive traffic.",
        "explanation": "The failed boundary is physical continuity or transceiver compatibility; enabled is administrative intent, not carrier evidence.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-0-QC2",
        "topicId": "trouble-0",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A disabled peer or err-disabled switch port also prevents useful service. Confirm administrative and protection state before blaming the cable.",
        "explanation": "Trace the labelled cable end to end; compare peer identity, media, supported optics and receive light or link indication. Substitute one known-good compatible patch lead on an owned test link.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-0-QC3",
        "topicId": "trouble-0",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Both partners regain stable carrier at the expected speed; a bounded gateway and application test succeeds without new physical errors.",
        "explanation": "Do not look into fiber or disconnect an unidentified production circuit. Record labels and preserve the original patch map.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow counter deltas and direction. Interface statistics describe different events: receive corruption, receive buffer exhaustion and transmit queue loss need different hypotheses. Read the platform definition before combining counters. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Physical medium/transceiver and link partner: cable/fiber, optics and switch port.",
      "Controller/driver: hardware queues, ring buffers and device operation.",
      "OS interface: name, administrative state, link state, addresses and counters.",
      "Protocol stack: Ethernet/IP/transport processing and sockets above the interface."
    ],
    "mechanism": [
      "Interface statistics describe different events: receive corruption, receive buffer exhaustion and transmit queue loss need different hypotheses. Read the platform definition before combining counters.",
      "Compute a rate only from comparable samples: (new count - old count) / elapsed seconds. Reset or wrap requires a new epoch; counter values are not percentages without a matching traffic denominator.",
      "Counter deltas and direction: There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames.",
      "Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations.",
      "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts."
    ],
    "comparison": [
      [
        "Administrative UP",
        "Software has enabled the interface.",
        "Does not establish carrier."
      ],
      [
        "Carrier / link",
        "The relevant link is operational.",
        "Does not establish correct IP addressing or routes."
      ],
      [
        "Service health",
        "A representative application transaction succeeds.",
        "Validates more than link state or ping alone."
      ]
    ],
    "glossary": {
      "NIC": "Network interface controller.",
      "Carrier": "Operational indication of a link signal where the device supports it.",
      "MTU": "Maximum transmission unit: a size limit relevant to a particular link/network layer.",
      "Offload": "Work performed by hardware or another layer instead of the normal software path.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Linux interface statistics",
        "url": "https://docs.kernel.org/networking/statistics.html",
        "checked": "2026-10-03"
      },
      {
        "title": "iproute2: ip link",
        "url": "https://man7.org/linux/man-pages/man8/ip-link.8.html",
        "checked": "2026-10-03"
      },
      {
        "title": "Cisco: switch port and interface problems",
        "url": "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12027-53.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Port and transport depend on the tested service. Physical carrier, frame counters and local evidence inspection have no intrinsic TCP or UDP port; identify the actual protocol before interpreting a filter.",
    "id": "trouble-1",
    "batch": "27",
    "title": "Interface errors",
    "subtitle": "Counter deltas and direction",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-1",
    "definition": "Interface errors is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on counter deltas and direction.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged. The incident to explain is: During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged. Observed failure: During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero. Discriminating test: Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations. Interpretation: There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames. Recovery contract: After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.",
    "flow": [
      [
        "Scope and baseline",
        "At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged."
      ],
      [
        "Locate the failed boundary",
        "During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero."
      ],
      [
        "Test a competing explanation",
        "Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations."
      ],
      [
        "Recover and verify",
        "After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-1",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-1, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "ip -s link",
        "explanation": "Display interface traffic/error/drop counters. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Compare deltas under a known interval. A total since boot alone does not show when a problem occurred.",
        "platform": "Ubuntu 24.04 / Linux; guided reference, not executed for Batch 27",
        "filename": "terminal"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations. The proposed change must address only the demonstrated failed boundary. Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames. A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero."
      ],
      [
        "Competing explanation",
        "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts."
      ],
      [
        "Next discriminating test",
        "Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations."
      ],
      [
        "Supported conclusion and limit",
        "There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames."
      ],
      [
        "Recovery acceptance",
        "After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline."
      ]
    ],
    "mistakes": [
      "Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair.",
      "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts.",
      "Treating a green intermediate status as proof of the original application outcome. No. Treat reset, wrap or identity change as a discontinuity, collect a new baseline and retain the reason.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s0-g0-t4"
    ],
    "related": [
      "s0-g0-t4",
      "trouble-2"
    ],
    "incident": {
      "boundary": "Counter deltas and direction",
      "baseline": "At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged.",
      "fault": "During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero.",
      "test": "Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations.",
      "diagnosis": "There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames.",
      "recovery": "After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.",
      "alternative": "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts.",
      "guard": "Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Interface errors. Counter deltas and direction.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged.",
        "Observation boundary: Counter deltas and direction",
        "Recovery target: After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair.",
        "Select Recovery and explain what each observation establishes: After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.",
        "Run python labs/troubleshooting-lab.py --topic trouble-1 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts."
      ],
      "verification": "After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts. Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair.",
      "challenge": "The second counter is smaller than the first. May the drop rate be negative?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-1-Q1",
        "topicId": "trouble-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Interface errors case investigate?",
        "answer": "Counter deltas and direction. There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-1-Q2",
        "topicId": "trouble-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "At 12:00 an interface records 100 input errors and 20 output drops; at 12:01 those values remain unchanged.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-1-Q3",
        "topicId": "trouble-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations.",
        "explanation": "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-1-Q4",
        "topicId": "trouble-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-1-Q5",
        "topicId": "trouble-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero. There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-1-Q6",
        "topicId": "trouble-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-1-Q7",
        "topicId": "trouble-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-1-Q8",
        "topicId": "trouble-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "The second counter is smaller than the first. May the drop rate be negative?",
        "answer": "No. Treat reset, wrap or identity change as a discontinuity, collect a new baseline and retain the reason.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-1-Q9",
        "topicId": "trouble-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Interface errors records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-1-Q10",
        "topicId": "trouble-1",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Interface errors incident.",
        "answer": "Scope: Counter deltas and direction. Observation: During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero. Next test: Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations. Acceptance: After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-1-QC1",
        "topicId": "trouble-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "During a slow transfer, output drops rise from 20 to 420 in 60 seconds while input CRC stays at zero.",
        "explanation": "There are 400 new output drops, about 6.67 per second. This supports an egress queue/capacity investigation, not proof of corrupt received frames.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-1-QC2",
        "topicId": "trouble-1",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A counter reset or interface replacement invalidates subtraction. A low minute average can conceal microbursts.",
        "explanation": "Take timestamped samples from the same interface and epoch; compare output queue drops with utilization and offered bursts. Preserve both endpoint observations.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-1-QC3",
        "topicId": "trouble-1",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "After the scoped queue or load correction, comparable traffic meets latency/loss objectives and the output-drop rate returns to its agreed baseline.",
        "explanation": "Do not clear counters before collecting the incident interval. Increasing buffers can trade packet loss for latency and is not a universal repair.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow corrupt reception versus congestion. Ethernet FCS lets a receiver detect many frame errors; a failed check establishes corruption at that observation boundary, not a unique cable or component diagnosis. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Transmitting peer and medium: possible sources along the observed segment.",
      "Receiving interface: where FCS/CRC errors are counted.",
      "Timestamped counter samples: evidence of current growth or historical residue.",
      "Application test: separate evidence that intended delivery is restored."
    ],
    "mechanism": [
      "Ethernet FCS lets a receiver detect many frame errors; a failed check establishes corruption at that observation boundary, not a unique cable or component diagnosis.",
      "Sampling the receiver and upstream path under comparable traffic distinguishes active growth from historical residue. Queue drops and CRC errors are different failure categories.",
      "Corrupt reception versus congestion: The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component.",
      "Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window.",
      "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform."
    ],
    "comparison": [
      [
        "CRC/FCS error",
        "Detected receive-frame corruption",
        "Does not uniquely identify a cable"
      ],
      [
        "Output drop",
        "A transmit packet was discarded",
        "Does not necessarily indicate corruption"
      ],
      [
        "Interval rate",
        "Comparable counter delta divided by elapsed time",
        "Invalid across an unexplained reset"
      ]
    ],
    "glossary": {
      "Duplex": "Whether directions can operate simultaneously.",
      "Full duplex": "Simultaneous transmission and reception.",
      "Half duplex": "Shared/alternating transmission opportunities.",
      "Auto-negotiation": "Exchange of applicable supported link capabilities.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Cisco: Ethernet negotiation and legacy duplex mismatch",
        "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.html",
        "checked": "2026-10-04"
      },
      {
        "title": "ethtool manual",
        "url": "https://man7.org/linux/man-pages/man8/ethtool.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "iproute2: ip link manual",
        "url": "https://man7.org/linux/man-pages/man8/ip-link.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "Cisco: Ethernet troubleshooting, historical platform examples",
        "url": "https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Duplex is a link property and has no TCP/UDP port. The phrase “switch port duplex” refers to a physical/interface setting, not a transport service port.",
    "id": "trouble-2",
    "batch": "27",
    "title": "CRC errors",
    "subtitle": "Corrupt reception versus congestion",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-2",
    "definition": "CRC errors is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on corrupt reception versus congestion.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load. The incident to explain is: The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load. Observed failure: The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged. Discriminating test: Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window. Interpretation: The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component. Recovery contract: Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.",
    "flow": [
      [
        "Scope and baseline",
        "A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load."
      ],
      [
        "Locate the failed boundary",
        "The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged."
      ],
      [
        "Test a competing explanation",
        "Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window."
      ],
      [
        "Recover and verify",
        "Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-2",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-2, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "ethtool eth0",
        "explanation": "Read the operational speed, duplex, auto-negotiation and advertised capabilities where supported. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Use the actual interface name and inspect the partner separately. A virtual NIC may return unknown or synthetic data.",
        "platform": "Linux / ethtool, optional physical NIC; guided reference, not executed for Batch 27",
        "filename": "bash"
      },
      {
        "code": "ip -s link show",
        "explanation": "Read generic error/collision counters for correlation. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Counter availability and semantics depend on the driver. A lifetime collision total without time, duplex and media context is not a diagnosis.",
        "platform": "Ubuntu 24.04 / Bash + iproute2; guided reference, not executed for Batch 27",
        "filename": "bash"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window. The proposed change must address only the demonstrated failed boundary. Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component. Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged."
      ],
      [
        "Competing explanation",
        "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform."
      ],
      [
        "Next discriminating test",
        "Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window."
      ],
      [
        "Supported conclusion and limit",
        "The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component."
      ],
      [
        "Recovery acceptance",
        "Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds."
      ]
    ],
    "mistakes": [
      "Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault.",
      "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform.",
      "Treating a green intermediate status as proof of the original application outcome. No. Compare under representative traffic and confirm application behavior; an idle receiver is weak recovery evidence.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s0-g2-t10"
    ],
    "related": [
      "s0-g2-t10",
      "trouble-3"
    ],
    "incident": {
      "boundary": "Corrupt reception versus congestion",
      "baseline": "A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load.",
      "fault": "The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged.",
      "test": "Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window.",
      "diagnosis": "The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component.",
      "recovery": "Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.",
      "alternative": "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform.",
      "guard": "Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for CRC errors. Corrupt reception versus congestion.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load.",
        "Observation boundary: Corrupt reception versus congestion",
        "Recovery target: Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault.",
        "Select Recovery and explain what each observation establishes: Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.",
        "Run python labs/troubleshooting-lab.py --topic trouble-2 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform."
      ],
      "verification": "Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform. Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault.",
      "challenge": "CRC stops increasing during an idle minute. Has the repair been proved?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-2-Q1",
        "topicId": "trouble-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this CRC errors case investigate?",
        "answer": "Corrupt reception versus congestion. The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-2-Q2",
        "topicId": "trouble-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A receiving port has a stable FCS/CRC count of 7 across two samples under ordinary load.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-2-Q3",
        "topicId": "trouble-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window.",
        "explanation": "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-2-Q4",
        "topicId": "trouble-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-2-Q5",
        "topicId": "trouble-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged. The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-2-Q6",
        "topicId": "trouble-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-2-Q7",
        "topicId": "trouble-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-2-Q8",
        "topicId": "trouble-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "CRC stops increasing during an idle minute. Has the repair been proved?",
        "answer": "No. Compare under representative traffic and confirm application behavior; an idle receiver is weak recovery evidence.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-2-Q9",
        "topicId": "trouble-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored CRC errors records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-2-Q10",
        "topicId": "trouble-2",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the CRC errors incident.",
        "answer": "Scope: Corrupt reception versus congestion. Observation: The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged. Next test: Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window. Acceptance: Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-2-QC1",
        "topicId": "trouble-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "The receiver rises from 7 to 67 CRC errors in 30 seconds. A separate output-drop counter is unchanged.",
        "explanation": "The receiver observed 60 additional corrupt frames, or 2 per second. The count localizes observed corruption but does not alone identify the faulty component.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-2-QC2",
        "topicId": "trouble-2",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "Duplex problems on legacy copper and forwarding of corrupted frames on some switch architectures can complicate localization; inspect the actual platform.",
        "explanation": "Localize the receiving interface and upstream segment, compare the peer and adjacent-hop counters, then change one compatible cable/optic component in a controlled window.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-2-QC3",
        "topicId": "trouble-2",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Repeat the same traffic interval after repair: no new CRC errors at the identified receiver and the original application succeeds.",
        "explanation": "Save original samples and optic identity. Do not equate a lifetime nonzero counter with a continuing fault.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow legacy ethernet negotiation agreement. Full duplex supports simultaneous directions without normal CSMA/CD contention. Half duplex relies on shared-medium collision behavior. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Two link partners: NIC/switch or switch/switch, each with configured and operational state.",
      "Auto-negotiation: supported technologies exchange applicable capabilities; actual rules depend on the PHY.",
      "Legacy collision domain: shared half-duplex Ethernet uses CSMA/CD behavior.",
      "Counters and workload: late collisions, receive errors, throughput and direction help diagnose mismatch.",
      "Technology limits: many modern Ethernet modes are full-duplex-only; legacy fallback examples must be scoped."
    ],
    "mechanism": [
      "Full duplex supports simultaneous directions without normal CSMA/CD contention. Half duplex relies on shared-medium collision behavior.",
      "Legacy 10/100 parallel detection may learn speed without learning the duplex intent of a forced peer. Read both operational endpoints; modern media and rates have different supported modes.",
      "Legacy Ethernet negotiation agreement: The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement.",
      "Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas.",
      "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations."
    ],
    "comparison": [
      [
        "Full duplex",
        "Send and receive simultaneously",
        "Dedicated link directions; no normal CSMA/CD collision operation."
      ],
      [
        "Half duplex",
        "Directions share transmission opportunities",
        "Classic shared Ethernet needs contention handling."
      ],
      [
        "Duplex mismatch",
        "Partners use incompatible directionality",
        "May fail mainly under simultaneous traffic."
      ],
      [
        "WLAN airtime",
        "Radio access contention and scheduling",
        "Do not equate AP PHY rate with dedicated full-duplex Ethernet capacity."
      ]
    ],
    "glossary": {
      "Duplex": "Whether directions can operate simultaneously.",
      "Full duplex": "Simultaneous transmission and reception.",
      "Half duplex": "Shared/alternating transmission opportunities.",
      "Auto-negotiation": "Exchange of applicable supported link capabilities.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Cisco: Ethernet negotiation and legacy duplex mismatch",
        "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.html",
        "checked": "2026-10-04"
      },
      {
        "title": "ethtool manual",
        "url": "https://man7.org/linux/man-pages/man8/ethtool.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "iproute2: ip link manual",
        "url": "https://man7.org/linux/man-pages/man8/ip-link.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "Cisco: Ethernet negotiation, media-specific applicability",
        "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/10561-3.pdf",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Duplex is a link property and has no TCP/UDP port. The phrase “switch port duplex” refers to a physical/interface setting, not a transport service port.",
    "id": "trouble-3",
    "batch": "27",
    "title": "Duplex mismatch",
    "subtitle": "Legacy Ethernet negotiation agreement",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-3",
    "definition": "Duplex mismatch is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on legacy ethernet negotiation agreement.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters. The incident to explain is: One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters. Observed failure: One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side. Discriminating test: Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas. Interpretation: The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement. Recovery contract: Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.",
    "flow": [
      [
        "Scope and baseline",
        "An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters."
      ],
      [
        "Locate the failed boundary",
        "One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side."
      ],
      [
        "Test a competing explanation",
        "Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas."
      ],
      [
        "Recover and verify",
        "Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-3",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-3, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "ethtool eth0",
        "explanation": "Read the operational speed, duplex, auto-negotiation and advertised capabilities where supported. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Use the actual interface name and inspect the partner separately. A virtual NIC may return unknown or synthetic data.",
        "platform": "Linux / ethtool, optional physical NIC; guided reference, not executed for Batch 27",
        "filename": "bash"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas. The proposed change must address only the demonstrated failed boundary. This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement. Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side."
      ],
      [
        "Competing explanation",
        "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations."
      ],
      [
        "Next discriminating test",
        "Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas."
      ],
      [
        "Supported conclusion and limit",
        "The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement."
      ],
      [
        "Recovery acceptance",
        "Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer."
      ]
    ],
    "mistakes": [
      "This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms.",
      "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations.",
      "Treating a green intermediate status as proof of the original application outcome. A low offered load may not expose contention. Confirm negotiated state and representative bidirectional traffic without flooding production.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s0-g2-t10"
    ],
    "related": [
      "s0-g2-t10",
      "trouble-4"
    ],
    "incident": {
      "boundary": "Legacy Ethernet negotiation agreement",
      "baseline": "An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters.",
      "fault": "One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side.",
      "test": "Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas.",
      "diagnosis": "The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement.",
      "recovery": "Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.",
      "alternative": "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations.",
      "guard": "This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Duplex mismatch. Legacy Ethernet negotiation agreement.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters.",
        "Observation boundary: Legacy Ethernet negotiation agreement",
        "Recovery target: Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms.",
        "Select Recovery and explain what each observation establishes: Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.",
        "Run python labs/troubleshooting-lab.py --topic trouble-3 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations."
      ],
      "verification": "Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations. This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms.",
      "challenge": "Why can a one-way ping look healthy?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-3-Q1",
        "topicId": "trouble-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Duplex mismatch case investigate?",
        "answer": "Legacy Ethernet negotiation agreement. The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-3-Q2",
        "topicId": "trouble-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "An owned 100 Mb/s copper test link has both partners negotiating full duplex with stable counters.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-3-Q3",
        "topicId": "trouble-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas.",
        "explanation": "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-3-Q4",
        "topicId": "trouble-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-3-Q5",
        "topicId": "trouble-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side. The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-3-Q6",
        "topicId": "trouble-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-3-Q7",
        "topicId": "trouble-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-3-Q8",
        "topicId": "trouble-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Why can a one-way ping look healthy?",
        "answer": "A low offered load may not expose contention. Confirm negotiated state and representative bidirectional traffic without flooding production.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-3-Q9",
        "topicId": "trouble-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Duplex mismatch records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-3-Q10",
        "topicId": "trouble-3",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Duplex mismatch incident.",
        "answer": "Scope: Legacy Ethernet negotiation agreement. Observation: One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side. Next test: Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas. Acceptance: Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-3-QC1",
        "topicId": "trouble-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "One partner is forced to 100/full; the other reports 100/half. Throughput collapses under bidirectional traffic and late collisions appear on the half-duplex side.",
        "explanation": "The partners disagree on medium access behavior. Carrier and equal speed do not establish duplex agreement.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-3-QC2",
        "topicId": "trouble-3",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "Bad cabling may also cause receive errors, but cannot explain away explicit contradictory duplex observations.",
        "explanation": "Read configured and operational speed/duplex on both ends. Correlate the mismatch with load-sensitive collision and error deltas.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-3-QC3",
        "topicId": "trouble-3",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore a mutually supported negotiation policy on both partners; verify matching full duplex, stable counters and bidirectional application transfer.",
        "explanation": "This fixture is legacy 10/100 copper. Do not generalize half-duplex forcing to modern fiber or all gigabit platforms.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow vlan membership across every hop. A switch classifies incoming frames into a VLAN and forwards within that context. An IP subnet does not override the switch membership decision. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "The VLAN identifier names a forwarding context; supported usable identifiers and scale are platform-dependent within the tag field’s rules.",
      "Ingress classification assigns a frame to a VLAN using its tag and port policy. Untagged traffic commonly uses a configured port VLAN identifier.",
      "Membership/admission rules decide whether that VLAN is permitted on a port. A tag is not permission to enter every domain.",
      "Egress treatment determines whether a VLAN’s frame leaves a port tagged or untagged. This is distinct from ingress classification.",
      "Inter-VLAN routing uses layer-3 interfaces and policy; a pure bridge does not route between VLANs just because their IP addresses are adjacent."
    ],
    "mechanism": [
      "A switch classifies incoming frames into a VLAN and forwards within that context. An IP subnet does not override the switch membership decision.",
      "A VLAN must exist and be admitted across the actual trunk, with a forwarding STP path. Physical carrier alone cannot validate any one VLAN.",
      "VLAN membership across every hop: The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch.",
      "Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends.",
      "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk."
    ],
    "comparison": [
      [
        "VLAN",
        "Link-layer forwarding domain",
        "Membership and tagging govern local delivery."
      ],
      [
        "IP subnet",
        "Layer-3 prefix relationship",
        "Does not override VLAN separation."
      ],
      [
        "Access-style port",
        "Usually one endpoint VLAN with untagged data",
        "Voice and other vendor features can add exceptions."
      ],
      [
        "Routed interface",
        "Layer-3 boundary",
        "Enables selected inter-network communication with policy."
      ]
    ],
    "glossary": {
      "VLAN": "Virtual LAN, a logical forwarding domain.",
      "PVID": "Port VLAN identifier used for applicable ingress classification.",
      "Membership": "Permission for a VLAN context on a port.",
      "Inter-VLAN routing": "Layer-3 forwarding between VLAN-associated networks.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Linux bridge commands and VLAN flags",
        "url": "https://man7.org/linux/man-pages/man8/bridge.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "Linux kernel: Ethernet bridging",
        "url": "https://docs.kernel.org/networking/bridge.html",
        "checked": "2026-10-04"
      },
      {
        "title": "Cisco IOS XE: VLAN trunk configuration (platform-specific)",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan-trunks.html",
        "checked": "2026-10-04"
      }
    ],
    "ports": "A VLAN has no TCP/UDP service port. Switch ports are interfaces, while the VLAN tag is link-layer metadata. Application traffic inside a VLAN retains its own transport ports. Reusing a VLAN number in disconnected fabrics does not automatically join them; context and actual connectivity matter.",
    "id": "trouble-4",
    "batch": "27",
    "title": "VLAN troubleshooting",
    "subtitle": "VLAN membership across every hop",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-4",
    "definition": "VLAN troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on vlan membership across every hop.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable. The incident to explain is: Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable. Observed failure: Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work. Discriminating test: Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends. Interpretation: The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch. Recovery contract: Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.",
    "flow": [
      [
        "Scope and baseline",
        "Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable."
      ],
      [
        "Locate the failed boundary",
        "Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work."
      ],
      [
        "Test a competing explanation",
        "Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends."
      ],
      [
        "Recover and verify",
        "Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-4",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-4, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "bridge vlan show",
        "explanation": "Inspect VLAN membership and PVID/untagged flags in the current Linux namespace. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Shows configured bridge VLAN entries or a header/empty view. It cannot reveal another namespace or physical switch’s configuration.",
        "platform": "Ubuntu 24.04 / Bash + iproute2 (read-only); guided reference, not executed for Batch 27",
        "filename": "bash"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends. The proposed change must address only the demonstrated failed boundary. Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch. Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work."
      ],
      [
        "Competing explanation",
        "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk."
      ],
      [
        "Next discriminating test",
        "Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends."
      ],
      [
        "Supported conclusion and limit",
        "The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch."
      ],
      [
        "Recovery acceptance",
        "Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs."
      ]
    ],
    "mistakes": [
      "Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback.",
      "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk.",
      "Treating a green intermediate status as proof of the original application outcome. Inspect MAC learning, SVI state, IP prefix and ARP from the same VLAN; an allowed list alone does not establish end-to-end forwarding.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s1-g3-t0"
    ],
    "related": [
      "s1-g3-t0",
      "trouble-5"
    ],
    "incident": {
      "boundary": "VLAN membership across every hop",
      "baseline": "Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable.",
      "fault": "Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work.",
      "test": "Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends.",
      "diagnosis": "The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch.",
      "recovery": "Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.",
      "alternative": "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk.",
      "guard": "Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for VLAN troubleshooting. VLAN membership across every hop.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable.",
        "Observation boundary: VLAN membership across every hop",
        "Recovery target: Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback.",
        "Select Recovery and explain what each observation establishes: Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.",
        "Run python labs/troubleshooting-lab.py --topic trouble-4 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk."
      ],
      "verification": "Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk. Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback.",
      "challenge": "VLAN 20 now crosses the trunk but has no gateway reply. What evidence is missing?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-4-Q1",
        "topicId": "trouble-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this VLAN troubleshooting case investigate?",
        "answer": "VLAN membership across every hop. The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-4-Q2",
        "topicId": "trouble-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Client port is access VLAN 20; both trunk endpoints carry VLAN 20; the gateway SVI is reachable.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-4-Q3",
        "topicId": "trouble-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends.",
        "explanation": "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-4-Q4",
        "topicId": "trouble-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-4-Q5",
        "topicId": "trouble-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work. The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-4-Q6",
        "topicId": "trouble-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-4-Q7",
        "topicId": "trouble-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-4-Q8",
        "topicId": "trouble-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "VLAN 20 now crosses the trunk but has no gateway reply. What evidence is missing?",
        "answer": "Inspect MAC learning, SVI state, IP prefix and ARP from the same VLAN; an allowed list alone does not establish end-to-end forwarding.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-4-Q9",
        "topicId": "trouble-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored VLAN troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-4-Q10",
        "topicId": "trouble-4",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the VLAN troubleshooting incident.",
        "answer": "Scope: VLAN membership across every hop. Observation: Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work. Next test: Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends. Acceptance: Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-4-QC1",
        "topicId": "trouble-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "Client carrier remains up, but VLAN 20 is missing from the uplink allowed list. VLAN 10 users on the same uplink work.",
        "explanation": "The failure is selective VLAN admission on the uplink, not proof of a dead physical link or failed entire switch.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-4-QC2",
        "topicId": "trouble-4",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "Wrong access VLAN or non-forwarding STP state produces a similar endpoint symptom; test these boundaries before altering the trunk.",
        "explanation": "Follow VLAN 20 from ingress classification through operational trunk membership and STP forwarding to the gateway; compare both trunk ends.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-4-QC3",
        "topicId": "trouble-4",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore only the intended VLAN membership; verify VLAN 20 gateway/application access and continued isolation from unauthorized VLANs.",
        "explanation": "Do not replace the allowed list with all VLANs. Capture exact existing membership for rollback.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow intentional blocking versus topology instability. STP chooses a root and forwarding tree for the applicable VLAN or instance. Redundant links can intentionally remain non-forwarding to avoid loops. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Bridge identity and root: distinguish the identity advertised by a bridge from the root identity it currently accepts for this instance. An intended root and an observed root can differ.",
      "Root path: a non-root bridge selects its preferred root-facing port from received information and local path cost. Port cost is an input to selection, not measured application latency.",
      "Segment participation: designated ports supply the selected path for their segment; redundant endpoints can remain non-forwarding. Record roles at both ends rather than labelling an entire cable from one local row.",
      "Role versus state: root/designated/alternate describe topology responsibility in the rapid-style model; forwarding/discarding describe its stable data treatment. Traditional STP has separate blocking, listening, learning and forwarding states, plus disabled.",
      "Instance scope: a role observed for one VLAN or instance does not establish the role for another. Logical aggregation, VLAN carriage and spanning-tree state must agree on the path being investigated."
    ],
    "mechanism": [
      "STP chooses a root and forwarding tree for the applicable VLAN or instance. Redundant links can intentionally remain non-forwarding to avoid loops.",
      "Unexpected physical paths, lost control messages and changing links can destabilize learning. Correlate role/root changes with the same VLAN and interval rather than interpreting a total counter alone.",
      "Intentional blocking versus topology instability: The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove.",
      "Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs.",
      "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop."
    ],
    "comparison": [
      [
        "Physical link up",
        "Carrier and interface availability",
        "Does not prove the selected VLAN forwards."
      ],
      [
        "Port role",
        "Position in the selected topology",
        "Interpret it for the actual instance and both endpoints."
      ],
      [
        "Port state",
        "Current forwarding/learning treatment",
        "Traditional and rapid state vocabularies differ."
      ],
      [
        "Root bridge",
        "Elected reference for this tree",
        "Separate it from the routed default gateway."
      ],
      [
        "Stable model result",
        "Eventual selected paths under fixed assumptions",
        "Does not measure BPDU exchange, reconvergence or packet loss."
      ]
    ],
    "glossary": {
      "BPDU": "Bridge Protocol Data Unit carrying spanning-tree control information.",
      "Bridge ID": "Identity used in election, including priority/system-ID context and bridge MAC.",
      "Root bridge": "Elected reference for a tree instance.",
      "Root port": "Selected root-facing port on a non-root bridge.",
      "Designated port": "Selected segment-facing topology responsibility.",
      "Path cost": "Configured or derived selection metric, not measured request latency.",
      "Convergence": "Transition toward a consistent topology; service recovery requires separate verification.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Catalyst 9300 IOS XE 17.15 spanning-tree configuration",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/lyr2/b_1715_lyr2_9300_cg/configuring_spanning_tree_protocol.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 MST and rapid-state context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/lyr2/b_1715_lyr2_9300_cg/configuring_multiple_spanning_tree_protocol.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco: troubleshoot STP issues on Catalyst",
        "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/28943-170.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "BPDUs are Layer 2 control frames rather than a TCP or UDP service. Management access uses its own transport and authorization. Observe the actual protocol/mode and capture point; this browser does not transmit or decode a BPDU.",
    "id": "trouble-5",
    "batch": "27",
    "title": "STP troubleshooting",
    "subtitle": "Intentional blocking versus topology instability",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-5",
    "definition": "STP troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on intentional blocking versus topology instability.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20. The incident to explain is: After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20. Observed failure: After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths. Discriminating test: Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs. Interpretation: The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove. Recovery contract: Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.",
    "flow": [
      [
        "Scope and baseline",
        "A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20."
      ],
      [
        "Locate the failed boundary",
        "After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths."
      ],
      [
        "Test a competing explanation",
        "Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs."
      ],
      [
        "Recover and verify",
        "Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-5",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-5, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "show spanning-tree summary",
        "explanation": "Identify the active spanning-tree mode and summary before interpreting detailed roles. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Record actual mode and enabled scope. Do not infer traditional STP merely from the family name.",
        "filename": "ios",
        "platform": "Isolated Catalyst 9300 IOS XE 17.15 lab · guided, not executed here; guided reference, not executed for Batch 27"
      },
      {
        "code": "show spanning-tree vlan 20",
        "explanation": "Inspect the selected VLAN on each participating lab switch. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Compare root ID, local bridge ID, path cost, interface role/state and link context. No sample device output is fabricated here.",
        "filename": "ios",
        "platform": "Isolated Catalyst 9300 IOS XE 17.15 lab · guided, not executed here; guided reference, not executed for Batch 27"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs. The proposed change must address only the demonstrated failed boundary. Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove. A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths."
      ],
      [
        "Competing explanation",
        "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop."
      ],
      [
        "Next discriminating test",
        "Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs."
      ],
      [
        "Supported conclusion and limit",
        "The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove."
      ],
      [
        "Recovery acceptance",
        "Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection."
      ]
    ],
    "mistakes": [
      "Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path.",
      "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop.",
      "Treating a green intermediate status as proof of the original application outcome. No. Inspect that VLAN or mapped instance and the corresponding priority/path change; constrain remediation to the demonstrated scope.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s2-g4-t0"
    ],
    "related": [
      "s2-g4-t0",
      "trouble-6"
    ],
    "incident": {
      "boundary": "Intentional blocking versus topology instability",
      "baseline": "A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20.",
      "fault": "After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths.",
      "test": "Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs.",
      "diagnosis": "The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove.",
      "recovery": "Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.",
      "alternative": "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop.",
      "guard": "Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for STP troubleshooting. Intentional blocking versus topology instability.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20.",
        "Observation boundary: Intentional blocking versus topology instability",
        "Recovery target: Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path.",
        "Select Recovery and explain what each observation establishes: Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.",
        "Run python labs/troubleshooting-lab.py --topic trouble-5 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop."
      ],
      "verification": "Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop. Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path.",
      "challenge": "Only one VLAN changes root. Should every instance be reset?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-5-Q1",
        "topicId": "trouble-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this STP troubleshooting case investigate?",
        "answer": "Intentional blocking versus topology instability. The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-5-Q2",
        "topicId": "trouble-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A redundant triangle has one expected root and a stable alternate blocked path for VLAN 20.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-5-Q3",
        "topicId": "trouble-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs.",
        "explanation": "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-5-Q4",
        "topicId": "trouble-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-5-Q5",
        "topicId": "trouble-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths. The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-5-Q6",
        "topicId": "trouble-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-5-Q7",
        "topicId": "trouble-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-5-Q8",
        "topicId": "trouble-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Only one VLAN changes root. Should every instance be reset?",
        "answer": "No. Inspect that VLAN or mapped instance and the corresponding priority/path change; constrain remediation to the demonstrated scope.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-5-Q9",
        "topicId": "trouble-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored STP troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-5-Q10",
        "topicId": "trouble-5",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the STP troubleshooting incident.",
        "answer": "Scope: Intentional blocking versus topology instability. Observation: After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths. Next test: Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs. Acceptance: Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-5-QC1",
        "topicId": "trouble-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "After an unmanaged bridge is attached on two unprotected access ports, MAC addresses move repeatedly and broadcast volume rises. The expected forwarding tree no longer explains the observed physical paths.",
        "explanation": "The attachment introduced an unexpected bridging path. A blocked alternate port itself is normal protection, not the cause to remove.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-5-QC2",
        "topicId": "trouble-5",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A flapping legitimate link can also cause topology changes. A change counter alone does not prove a loop.",
        "explanation": "Record root identity, per-VLAN roles, topology-change timestamps and MAC moves; correlate the new physical connection and guard logs.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-5-QC3",
        "topicId": "trouble-5",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Remove or correct the unauthorized lab bridge; confirm expected root/roles, stable MAC learning, traffic recovery and retained edge protection.",
        "explanation": "Never disable STP or clear a guard condition without resolving its trigger. Preserve an independent management path.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow configured members versus operational bundle. Aggregation presents eligible member links as a logical interface. Negotiation and compatibility determine actual membership; configuration text only states intent. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Physical members: identify both ends of each cable, negotiated speed/duplex and actual member state. Do not confuse a configured interface, an UP physical carrier and a bundled participant.",
      "Logical port-channel: inspect its operating Layer 2 or Layer 3 role and configuration. For this selected trunk, inspect VLAN carriage separately from the existence of the bundle.",
      "Formation method: LACP, PAgP or static on have distinct behavior. Protocol lessons follow this one; forcing on does not validate the peer’s grouping and can create serious topology faults.",
      "Consistency: compatible member roles and VLAN/native settings are prerequisites under the exact platform procedure. Compare actual state on both ends rather than trusting a copied template.",
      "Traffic evidence: selected distribution policy, per-member counters over the same interval and original service probes. An interface bandwidth label is not measured payload throughput."
    ],
    "mechanism": [
      "Aggregation presents eligible member links as a logical interface. Negotiation and compatibility determine actual membership; configuration text only states intent.",
      "Typical per-flow distribution selects one eligible member for a conversation. Logical-up state can survive a member loss while capacity and redundancy deteriorate.",
      "Configured members versus operational bundle: The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation.",
      "Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately.",
      "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle."
    ],
    "comparison": [
      [
        "Configured member",
        "A channel-group setting exists",
        "Does not establish operational bundling."
      ],
      [
        "Bundled member",
        "Actual output reports participation",
        "Does not establish every VLAN/service path."
      ],
      [
        "Logical link UP",
        "Selected availability criteria are met",
        "Does not prove equal member utilization."
      ],
      [
        "Observed service after loss",
        "The defined transaction passed under that test",
        "Does not certify zero loss or every future failure."
      ]
    ],
    "glossary": {
      "Port-channel": "Logical interface associated with an aggregate of compatible member links.",
      "Bundled member": "Physical participant reported as included in operational aggregation.",
      "Minimum links": "Supported requirement for a minimum number of active bundled members.",
      "Traffic distribution": "Selected assignment of carried traffic among usable members.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Catalyst 9300 17.15 EtherChannel configuration",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/lyr2/b_1715_lyr2_9300_cg/configuring_etherchannels.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco Catalyst 9000 EtherChannel troubleshooting",
        "url": "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9300-series-switches/220367-troubleshoot-etherchannels-on-catalyst-9.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 17.15 VLAN trunks",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/vlan/b_1715_vlan_9300_cg/configuring_vlan_trunks.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco: LAN switching troubleshooting",
        "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/12006-chapter22.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "EtherChannel is a link aggregation feature, not a TCP or UDP application port. The selected control method and member-level discovery are distinct from user traffic carried by the logical link. VLAN tagging, protocol participation and application delivery answer different questions. This browser sends no LACP/PAgP frames, performs no packet capture and contacts no network device.",
    "id": "trouble-6",
    "batch": "27",
    "title": "EtherChannel troubleshooting",
    "subtitle": "Configured members versus operational bundle",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-6",
    "definition": "EtherChannel troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on configured members versus operational bundle.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer. The incident to explain is: One member is suspended after its VLAN settings diverge; the logical channel stays up with one member. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer. Observed failure: One member is suspended after its VLAN settings diverge; the logical channel stays up with one member. Discriminating test: Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately. Interpretation: The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation. Recovery contract: Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.",
    "flow": [
      [
        "Scope and baseline",
        "Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer."
      ],
      [
        "Locate the failed boundary",
        "One member is suspended after its VLAN settings diverge; the logical channel stays up with one member."
      ],
      [
        "Test a competing explanation",
        "Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately."
      ],
      [
        "Recover and verify",
        "Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-6",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-6, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "show etherchannel summary\nshow etherchannel 1 detail",
        "platform": "Authorized Catalyst 9300 IOS XE 17.15 lab · guided, not executed here; guided reference, not executed for Batch 27",
        "filename": "ios",
        "explanation": "Inspect the actual group, logical interface and member flags on an authorized target. Read its legend; group 1 is a teaching identifier. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Observed bundle/member states when executed, not a browser-generated Cisco transcript."
      },
      {
        "code": "show running-config interface port-channel 1\nshow running-config interface gigabitEthernet 1/0/1\nshow running-config interface gigabitEthernet 1/0/2",
        "platform": "Authorized Catalyst 9300 IOS XE 17.15 lab · guided, not executed here; guided reference, not executed for Batch 27",
        "filename": "ios",
        "explanation": "Compare logical and physical configuration with the intended peer map and exact interface names. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Configuration intent; actual eligibility and forwarding still need their own inspection."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately. The proposed change must address only the demonstrated failed boundary. Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation. One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "One member is suspended after its VLAN settings diverge; the logical channel stays up with one member."
      ],
      [
        "Competing explanation",
        "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle."
      ],
      [
        "Next discriminating test",
        "Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately."
      ],
      [
        "Supported conclusion and limit",
        "The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation."
      ],
      [
        "Recovery acceptance",
        "Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective."
      ]
    ],
    "mistakes": [
      "Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ.",
      "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle.",
      "Treating a green intermediate status as proof of the original application outcome. No. Common per-flow hashing chooses one member; aggregate capacity across flows and failure capacity are separate claims.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s2-g3-t0"
    ],
    "related": [
      "s2-g3-t0",
      "trouble-7"
    ],
    "incident": {
      "boundary": "Configured members versus operational bundle",
      "baseline": "Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer.",
      "fault": "One member is suspended after its VLAN settings diverge; the logical channel stays up with one member.",
      "test": "Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately.",
      "diagnosis": "The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation.",
      "recovery": "Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.",
      "alternative": "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle.",
      "guard": "Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for EtherChannel troubleshooting. Configured members versus operational bundle.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer.",
        "Observation boundary: Configured members versus operational bundle",
        "Recovery target: Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. One member is suspended after its VLAN settings diverge; the logical channel stays up with one member.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ.",
        "Select Recovery and explain what each observation establishes: Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.",
        "Run python labs/troubleshooting-lab.py --topic trouble-6 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle."
      ],
      "verification": "Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle. Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ.",
      "challenge": "Two 1 Gb/s members are healthy. Must one TCP flow reach 2 Gb/s?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-6-Q1",
        "topicId": "trouble-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this EtherChannel troubleshooting case investigate?",
        "answer": "Configured members versus operational bundle. The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-6-Q2",
        "topicId": "trouble-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Two intended links are bundled in one LACP port-channel with matching trunk policy and a common peer.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-6-Q3",
        "topicId": "trouble-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately.",
        "explanation": "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-6-Q4",
        "topicId": "trouble-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-6-Q5",
        "topicId": "trouble-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "One member is suspended after its VLAN settings diverge; the logical channel stays up with one member. The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-6-Q6",
        "topicId": "trouble-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-6-Q7",
        "topicId": "trouble-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-6-Q8",
        "topicId": "trouble-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Two 1 Gb/s members are healthy. Must one TCP flow reach 2 Gb/s?",
        "answer": "No. Common per-flow hashing chooses one member; aggregate capacity across flows and failure capacity are separate claims.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-6-Q9",
        "topicId": "trouble-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored EtherChannel troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-6-Q10",
        "topicId": "trouble-6",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the EtherChannel troubleshooting incident.",
        "answer": "Scope: Configured members versus operational bundle. Observation: One member is suspended after its VLAN settings diverge; the logical channel stays up with one member. Next test: Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately. Acceptance: Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-6-QC1",
        "topicId": "trouble-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "One member is suspended after its VLAN settings diverge; the logical channel stays up with one member.",
        "explanation": "The logical link masks a loss of redundancy and capacity. A configured channel-group is not proof of member participation.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-6-QC2",
        "topicId": "trouble-6",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "One flow remaining on one member is normal hashing behavior and does not itself indicate a failed bundle.",
        "explanation": "Compare operational aggregation state, peer/system identity and member compatibility. Test multiple traffic flows and remaining capacity separately.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-6-QC3",
        "topicId": "trouble-6",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore compatible settings using the supported platform procedure; confirm both members bundle, allowed traffic works and a controlled single-link failure meets the objective.",
        "explanation": "Do not force a static channel to hide LACP mismatch. Preserve the working member and stop if peer identities differ.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow forward and return lookup in the correct table. Destination forwarding uses the selected table and longest matching prefix, followed by a usable next hop and link-layer resolution. Policy routing can alter the lookup context. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Destination prefix and length describe the set of addresses covered by an entry. A /25 is more specific than a containing /24.",
      "Next hop and output interface describe how to attempt the next forwarding leg. Direct routes and special route types may not have a gateway.",
      "Metric/preference influences selection under the platform’s rules. Metrics from unrelated protocols are not automatically comparable.",
      "Routing policy, tables and VRFs can select different contexts for traffic before ordinary destination lookup. Linux rules can depend on source and other attributes.",
      "A return route is a separate decision in the opposite direction. Stateful filtering and translation can further constrain asymmetric paths."
    ],
    "mechanism": [
      "Destination forwarding uses the selected table and longest matching prefix, followed by a usable next hop and link-layer resolution. Policy routing can alter the lookup context.",
      "Replies perform their own lookup from the reverse side. Observing the request at the server does not establish a return route or a generated application reply.",
      "Forward and return lookup in the correct table: The observed request path is intact; the missing return route prevents the response from completing the transaction.",
      "Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence.",
      "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing."
    ],
    "comparison": [
      [
        "Longest prefix",
        "Destination specificity",
        "A matching /25 outranks a matching /24."
      ],
      [
        "Metric",
        "Preference among comparable alternatives",
        "Does not make a less-specific prefix win this model."
      ],
      [
        "Default route",
        "A /0 catch-all candidate",
        "Used only when no more-specific eligible action wins."
      ],
      [
        "Blackhole route",
        "Explicit discard action",
        "Does not mean “try the default instead.”"
      ]
    ],
    "glossary": {
      "Longest-prefix match": "Selection of the most specific matching destination prefix.",
      "Metric": "A route preference value interpreted under platform rules.",
      "VRF": "A separate virtual routing and forwarding context.",
      "Blackhole route": "A route whose selected action discards traffic.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "iproute2: route lookup and management",
        "url": "https://man7.org/linux/man-pages/man8/ip-route.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "iproute2 policy rules",
        "url": "https://man7.org/linux/man-pages/man8/ip-rule.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "RFC 4632: classless routing",
        "url": "https://www.rfc-editor.org/rfc/rfc4632",
        "checked": "2026-10-04"
      }
    ],
    "ports": "Route lookup uses IP forwarding information; it does not itself establish a TCP/UDP listener. Some policy systems can match additional traffic fields, but that is separate from this destination-only model. A route to a server does not imply that its application port is permitted or listening.",
    "id": "trouble-7",
    "batch": "27",
    "title": "Routing troubleshooting",
    "subtitle": "Forward and return lookup in the correct table",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-7",
    "definition": "Routing troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on forward and return lookup in the correct table.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes. The incident to explain is: A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes. Observed failure: A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF. Discriminating test: Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence. Interpretation: The observed request path is intact; the missing return route prevents the response from completing the transaction. Recovery contract: Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.",
    "flow": [
      [
        "Scope and baseline",
        "Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes."
      ],
      [
        "Locate the failed boundary",
        "A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF."
      ],
      [
        "Test a competing explanation",
        "Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence."
      ],
      [
        "Recover and verify",
        "Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-7",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-7, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "ip -4 route show table all",
        "explanation": "Inspect IPv4 route tables without changing them. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Includes local and other table entries; table context matters. A long listing does not itself identify the exact packet decision.",
        "platform": "Ubuntu 24.04 / Bash + iproute2 (read-only); guided reference, not executed for Batch 27",
        "filename": "bash"
      },
      {
        "code": "ip -4 rule show",
        "explanation": "Inspect the IPv4 policy-routing rule order. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Shows rules that can choose tables. Do not assume main is the only possible context.",
        "platform": "Ubuntu 24.04 / Bash + iproute2 (read-only); guided reference, not executed for Batch 27",
        "filename": "bash"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence. The proposed change must address only the demonstrated failed boundary. Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The observed request path is intact; the missing return route prevents the response from completing the transaction. A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF."
      ],
      [
        "Competing explanation",
        "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing."
      ],
      [
        "Next discriminating test",
        "Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence."
      ],
      [
        "Supported conclusion and limit",
        "The observed request path is intact; the missing return route prevents the response from completing the transaction."
      ],
      [
        "Recovery acceptance",
        "Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage."
      ]
    ],
    "mistakes": [
      "Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback.",
      "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing.",
      "Treating a green intermediate status as proof of the original application outcome. Longest-prefix matching selects the more specific route; the usable default does not override that discard.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s1-g4-t0"
    ],
    "related": [
      "s1-g4-t0",
      "trouble-8"
    ],
    "incident": {
      "boundary": "Forward and return lookup in the correct table",
      "baseline": "Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes.",
      "fault": "A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF.",
      "test": "Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence.",
      "diagnosis": "The observed request path is intact; the missing return route prevents the response from completing the transaction.",
      "recovery": "Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.",
      "alternative": "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing.",
      "guard": "Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Routing troubleshooting. Forward and return lookup in the correct table.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes.",
        "Observation boundary: Forward and return lookup in the correct table",
        "Recovery target: Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback.",
        "Select Recovery and explain what each observation establishes: Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.",
        "Run python labs/troubleshooting-lab.py --topic trouble-7 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing."
      ],
      "verification": "Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing. Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback.",
      "challenge": "A more specific route points to a discard while a default is valid. Which wins?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-7-Q1",
        "topicId": "trouble-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Routing troubleshooting case investigate?",
        "answer": "Forward and return lookup in the correct table. The observed request path is intact; the missing return route prevents the response from completing the transaction.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-7-Q2",
        "topicId": "trouble-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Client 192.0.2.10 reaches service 198.51.100.20 through a router; both directions have valid routes.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-7-Q3",
        "topicId": "trouble-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence.",
        "explanation": "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-7-Q4",
        "topicId": "trouble-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-7-Q5",
        "topicId": "trouble-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF. The observed request path is intact; the missing return route prevents the response from completing the transaction.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-7-Q6",
        "topicId": "trouble-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-7-Q7",
        "topicId": "trouble-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-7-Q8",
        "topicId": "trouble-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "A more specific route points to a discard while a default is valid. Which wins?",
        "answer": "Longest-prefix matching selects the more specific route; the usable default does not override that discard.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-7-Q9",
        "topicId": "trouble-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Routing troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-7-Q10",
        "topicId": "trouble-7",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Routing troubleshooting incident.",
        "answer": "Scope: Forward and return lookup in the correct table. Observation: A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF. Next test: Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence. Acceptance: Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-7-QC1",
        "topicId": "trouble-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "A request reaches the service, but the service-side router has no route back to 192.0.2.0/24 in the relevant VRF.",
        "explanation": "The observed request path is intact; the missing return route prevents the response from completing the transaction.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-7-QC2",
        "topicId": "trouble-7",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A host firewall could suppress replies even with a valid return route. Establish whether a reply is generated before assigning all blame to routing.",
        "explanation": "Check destination lookup and recursive next-hop resolution in both directions using the actual source and VRF. Compare endpoint capture with router forwarding evidence.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-7-QC3",
        "topicId": "trouble-7",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore the intended return prefix in the correct table and verify a fresh application exchange from the original client without cross-VRF leakage.",
        "explanation": "Do not add a broad default route to conceal a missing specific path. Record ownership and the exact route to remove on rollback.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow neighbor, database, rib and data plane. OSPF peers must accept each other’s Hellos and satisfy the applicable network-type and adjacency rules. A Full adjacency means synchronized exchange with that neighbor, not delivery of every prefix. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      [
        "Traffic and observation scope",
        "Original endpoints, address family, source address, table/VRF, router/process, interface, area and time. Record whether the incident affects one prefix, one pair, a branch or the whole domain."
      ],
      [
        "Attachment and compatibility",
        "Physical/carrier and IP attachment, enabled versus passive OSPF, unique RID, area/capability, Hello/dead values, supported authentication and intended network type."
      ],
      [
        "Neighbor exchange",
        "Absent/Down, Init, 2-Way, ExStart, Exchange, Loading and Full mean different things. Interpret the intended pair and duration before deciding which next record is needed."
      ],
      [
        "Database and calculated route",
        "Applicable area LSAs, correct prefix/mask, current transit representation, summaries and external dependencies. Retained information is not automatically usable information."
      ],
      [
        "Installation and forwarding",
        "Calculated OSPF path versus selected RIB, competing same-prefix sources, longest-prefix lookup, forwarding enable, next-hop/interface/neighbor resolution and data-plane policy."
      ],
      [
        "Return, service and closure",
        "Endpoint route/gateway, opposite-direction path, bounded original-source exchange, exact reversal, restored baseline and owned cleanup. ICMP success is not a TCP/TLS/application transaction."
      ]
    ],
    "mechanism": [
      "OSPF peers must accept each other’s Hellos and satisfy the applicable network-type and adjacency rules. A Full adjacency means synchronized exchange with that neighbor, not delivery of every prefix.",
      "Trace the destination from origination through LSDB, route selection and installed forwarding state. A route can be absent even when all required neighbors are Full.",
      "Neighbor, database, RIB and data plane: The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure.",
      "Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation.",
      "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause."
    ],
    "comparison": [
      [
        "Absent / Init",
        "No retained valid neighbor relationship / received Hello without completed bidirectional discovery.",
        "Inspect both interface/acceptance directions rather than jumping to one cause."
      ],
      [
        "Expected 2-Way / unexpected incomplete exchange",
        "Healthy DROther pair / required pair not completing the intended adjacency.",
        "Network type and roles determine the interpretation."
      ],
      [
        "ExStart or Exchange / Loading",
        "DBD negotiation/information exchange / missing-LSA request completion.",
        "MTU, sequence, transport and request/retransmission evidence narrow different branches."
      ],
      [
        "Full / service success",
        "Required pair has synchronized / original transaction works.",
        "Installed route, forwarding and endpoint return still need evidence."
      ],
      [
        "Calculated candidate / installed lookup",
        "OSPF reachability result / locally selected RIB and destination forwarding decision.",
        "Competing source/table/prefix and longest-match context remain separate."
      ],
      [
        "Forwarding fault / endpoint return fault",
        "Owned router forwarding mode disabled / endpoint route removed.",
        "Both preserve Full/router paths here; state/endpoint-route/raw-probe controls distinguish them."
      ],
      [
        "Branch mismatch / healthy broadcast 2-Way",
        "Incompatible branch areas lose required adjacency / DROthers intentionally remain neighbors without Full to one another.",
        "Separate actual experiments; same symptom vocabulary is not one combined topology."
      ],
      [
        "Exact verified recovery / universal baseline assertion",
        "Specific restored flag/routes/probes / every application and custom platform setting is restored.",
        "Claim only the conditions actually compared and measured."
      ]
    ],
    "glossary": {
      "Fault domain": "A bounded part of the path to investigate, supported by evidence rather than one symptom.",
      "Control probe": "A scoped comparison exchange that helps separate local attachment from original end-to-end behavior.",
      "Expected adjacency": "The pair relationship required by the configured network type and roles.",
      "DBD": "Database Description packet used in database exchange, including interface MTU context.",
      "Candidate versus installed": "A protocol-calculated possibility versus the locally selected installed route.",
      "Original source": "The actual incident endpoint, whose return and service requirements can differ from a router probe.",
      "Verified reversal": "Restoration of the specific introduced condition plus comparison of the documented baseline observations.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "RFC2328: Hello acceptance, required adjacencies, database exchange and route calculations",
        "url": "https://www.rfc-editor.org/rfc/rfc2328",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco neighbor troubleshooting: absent, Init, expected 2-Way and exchange-state interpretation",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13699-29.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco ExStart/Exchange: MTU investigation and bounded mtu-ignore exception",
        "url": "https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13684-12.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco OSPF operational command syntax and evidence scope",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_ospf/command/iro-cr-book/ospf-s1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 OSPF configuration and operational inspection",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/configuring_ospf.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.15 installation and protocol-independent route context",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/rtng/b_1715_rtng_9300_cg/protocol_independent_features.html",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4: OSPF interface/neighbor/database/route inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/ospfd.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Linux IP sysctl: forwarding switch and host/router-default reset semantics",
        "url": "https://www.kernel.org/doc/html/latest/networking/ip-sysctl.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco show ip route address: selected route inspection syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/iri-cr-book/iri-cr-s1.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco show ip cef network: FIB inspection syntax",
        "url": "https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipswitch/command/isw-cr-book/isw-s1.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": [
      [
        "OSPFv2 control traffic",
        "IP protocol 89, not TCP/UDP port 89. Check actual supported authentication and control-plane admission separately from ordinary ICMP."
      ],
      [
        "Relevant multicast",
        "AllSPFRouters 224.0.0.5 and AllDRouters 224.0.0.6 depend on packet/network role. Capture and retransmission/unicast behavior need actual context; one group is not every OSPF destination."
      ],
      [
        "Hello and database exchange",
        "Hello discovery is distinct from DBD/LSR/LSU/LSAck exchange. Small ICMP success or Hello receipt does not establish completed database synchronization."
      ],
      [
        "Configured lab timing",
        "Owned exercises explicitly use 1-second Hello/4-second dead intervals. They are lab settings, not universal defaults or measured convergence results."
      ],
      [
        "Probe semantics",
        "Actual runner ping is numeric IPv4, one packet with one-second reply wait. Targets, exit/output and connected controls are retained for added faults; no application port is tested."
      ]
    ],
    "id": "trouble-8",
    "batch": "27",
    "title": "OSPF troubleshooting",
    "subtitle": "Neighbor, database, RIB and data plane",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-8",
    "definition": "OSPF troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on neighbor, database, rib and data plane.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix. The incident to explain is: After a timer change, captured Hellos advertise different intervals and the adjacency disappears. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix. Observed failure: After a timer change, captured Hellos advertise different intervals and the adjacency disappears. Discriminating test: Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation. Interpretation: The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure. Recovery contract: Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.",
    "flow": [
      [
        "Scope and baseline",
        "Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix."
      ],
      [
        "Locate the failed boundary",
        "After a timer change, captured Hellos advertise different intervals and the adjacency disappears."
      ],
      [
        "Test a competing explanation",
        "Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation."
      ],
      [
        "Recover and verify",
        "Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-8",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-8, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "show ip protocols\nshow ip ospf\nshow ip ospf interface\nshow ip ospf neighbor",
        "explanation": "Compare intended activation and actual neighbor/interface context on both peers. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "GUIDED, NOT EXECUTED: Record local process, RID, area, enabled/passive state, timers, intended network type and current roles. Local process numbers need not match between routers. Interpret required versus expected 2-Way pairs rather than counting every non-Full as a fault.",
        "filename": "ios",
        "platform": "Prepared isolated Catalyst 9300 IOS XE 17.15 OSPF lab · guided, not executed here; guided reference, not executed for Batch 27"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation. The proposed change must address only the demonstrated failed boundary. Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure. No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "After a timer change, captured Hellos advertise different intervals and the adjacency disappears."
      ],
      [
        "Competing explanation",
        "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause."
      ],
      [
        "Next discriminating test",
        "Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation."
      ],
      [
        "Supported conclusion and limit",
        "The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure."
      ],
      [
        "Recovery acceptance",
        "Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange."
      ]
    ],
    "mistakes": [
      "Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings.",
      "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause.",
      "Treating a green intermediate status as proof of the original application outcome. Check whether the destination is originated into the relevant LSDB, then SPF/RIB selection and next-hop reachability; Full alone proves neither advertisement nor delivery.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s3-g1-t4"
    ],
    "related": [
      "s3-g1-t4",
      "trouble-9"
    ],
    "incident": {
      "boundary": "Neighbor, database, RIB and data plane",
      "baseline": "Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix.",
      "fault": "After a timer change, captured Hellos advertise different intervals and the adjacency disappears.",
      "test": "Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation.",
      "diagnosis": "The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure.",
      "recovery": "Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.",
      "alternative": "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause.",
      "guard": "Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for OSPF troubleshooting. Neighbor, database, RIB and data plane.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix.",
        "Observation boundary: Neighbor, database, RIB and data plane",
        "Recovery target: Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. After a timer change, captured Hellos advertise different intervals and the adjacency disappears.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings.",
        "Select Recovery and explain what each observation establishes: Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.",
        "Run python labs/troubleshooting-lab.py --topic trouble-8 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause."
      ],
      "verification": "Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause. Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings.",
      "challenge": "Full returns but the destination is absent. What should be inspected next?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-8-Q1",
        "topicId": "trouble-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this OSPF troubleshooting case investigate?",
        "answer": "Neighbor, database, RIB and data plane. The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-8-Q2",
        "topicId": "trouble-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Two point-to-point lab routers have matching OSPF area/timers and a Full adjacency with a learned remote prefix.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-8-Q3",
        "topicId": "trouble-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation.",
        "explanation": "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-8-Q4",
        "topicId": "trouble-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-8-Q5",
        "topicId": "trouble-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "After a timer change, captured Hellos advertise different intervals and the adjacency disappears. The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-8-Q6",
        "topicId": "trouble-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-8-Q7",
        "topicId": "trouble-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-8-Q8",
        "topicId": "trouble-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Full returns but the destination is absent. What should be inspected next?",
        "answer": "Check whether the destination is originated into the relevant LSDB, then SPF/RIB selection and next-hop reachability; Full alone proves neither advertisement nor delivery.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-8-Q9",
        "topicId": "trouble-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored OSPF troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-8-Q10",
        "topicId": "trouble-8",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the OSPF troubleshooting incident.",
        "answer": "Scope: Neighbor, database, RIB and data plane. Observation: After a timer change, captured Hellos advertise different intervals and the adjacency disappears. Next test: Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation. Acceptance: Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-8-QC1",
        "topicId": "trouble-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "After a timer change, captured Hellos advertise different intervals and the adjacency disappears.",
        "explanation": "The mismatched Hello timing is an adjacency acceptance fault in this supplied case, not evidence of BGP policy failure.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-8-QC2",
        "topicId": "trouble-8",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "No received Hello could instead mean filtering, carrier, addressing or passive configuration; an absent neighbor alone does not select one cause.",
        "explanation": "Compare received Hello fields and interface settings at both peers within the same process/area. Separate neighbor formation from prefix origination and route installation.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-8-QC3",
        "topicId": "trouble-8",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore the captured compatible timer values; verify Full, the expected LSA, installed prefix/next hop and an endpoint exchange.",
        "explanation": "Do not restart every routing process or disable authentication as a diagnostic shortcut. Save original interface settings.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow session health versus route policy. BGP establishes a session and exchanges routes subject to address-family and policy rules. Established indicates the session state; it is not a certificate for prefix admission. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Speaker context: router identity, local/remote AS, peer address, address family and routing table/VRF. External and internal sessions differ by AS relationship, not physical distance.",
      "Transport and negotiation: BGP uses TCP with service port 179. OPEN exchanges protocol identity and parameters/capabilities; KEEPALIVE maintains protocol liveness, UPDATE carries reachability changes, and NOTIFICATION reports a protocol error before closing. Route refresh is a negotiated extension, not a fifth base RFC 4271 message.",
      "Prefix and attributes: NLRI names reachable prefixes. AS_PATH, NEXT_HOP and ORIGIN describe route context; LOCAL_PREF, MED and communities support later policy decisions. Attribute meaning is distinct from an IP forwarding header.",
      "Admission and dissemination: explicitly scoped import/export policy protects each enabled eBGP family. A permitted prefix still requires an origin and applicable advertisement; a configured session does not create routes automatically.",
      "Conceptual stores: Adj-RIB-In represents received route information, Loc-RIB the BGP decision result, and Adj-RIB-Out selected peer advertisements. Implementations need not maintain three physically separate copies, and an ordinary table dump is not necessarily an unfiltered received-route history.",
      "Independent proof: session state, BGP path eligibility, system route selection, forwarding next hop and original service/return observations answer different questions. Preserve observer and phase on each record."
    ],
    "mechanism": [
      "BGP establishes a session and exchanges routes subject to address-family and policy rules. Established indicates the session state; it is not a certificate for prefix admission.",
      "Follow a prefix through origination, advertisement, acceptance, path selection and installation. Next-hop reachability and competing routes can prevent forwarding after acceptance.",
      "Session health versus route policy: The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix.",
      "Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop.",
      "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears."
    ],
    "comparison": [
      [
        "eBGP / iBGP",
        "Different-AS / same-AS sessions",
        "Not synonymous with physical WAN / LAN location."
      ],
      [
        "Established / eligible prefix",
        "Control session / destination admission",
        "A live session can have no useful admitted destination."
      ],
      [
        "AS_PATH / IP hop count",
        "AS-level propagation / router traversal",
        "An AS can contain many routers; path length is not measured latency."
      ],
      [
        "ORIGIN IGP / learned from OSPF",
        "BGP origin classification / routing source",
        "The local network origin does not prove OSPF learning."
      ],
      [
        "Loc-RIB / system RIB / forwarding",
        "BGP selection / cross-source selection / packet action",
        "A candidate marker cannot certify all layers."
      ],
      [
        "Startup message list / withdrawal wire trace",
        "Preserved frame type fields / absent phase packet detail",
        "Do not infer NLRI or timestamps from the startup list."
      ],
      [
        "Endpoint ping / application success",
        "Bounded ICMP round trip / original application behavior",
        "The latter requires its own source, policy and service test."
      ]
    ],
    "glossary": {
      "BGP": "Policy-controlled prefix reachability exchange with path attributes.",
      "AS": "Autonomous-system identifier in the routing relationship.",
      "NLRI": "Network-layer reachability information naming prefixes.",
      "AS_PATH": "AS-level propagation context, not measured router hops or latency.",
      "NEXT_HOP": "Route next-hop attribute requiring appropriate resolution.",
      "ORIGIN": "BGP origination classification, distinct from current routing source.",
      "Adj-RIB-In": "Conceptual received route information at a peer boundary.",
      "Loc-RIB": "Conceptual routes selected by the local BGP decision process.",
      "Adj-RIB-Out": "Conceptual routes selected for advertisement to a peer.",
      "Established": "Protocol session state permitting route exchange, not destination/service certification.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "RFC 4271: BGP operation, attributes and conceptual RIBs",
        "url": "https://www.rfc-editor.org/rfc/rfc4271",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 8212: explicit external import/export defaults",
        "url": "https://www.rfc-editor.org/rfc/rfc8212",
        "checked": "2026-10-09"
      },
      {
        "title": "FRR stable 8.4: BGP origination, policy and inspection",
        "url": "https://docs.frrouting.org/en/stable-8.4/bgp.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "BGP uses TCP service port 179. One endpoint can use an ephemeral port; both source and destination need not be 179. BGP control transport is distinct from routed endpoint ICMP or application traffic. This companion is IPv4 unicast, not IPv6, VPN or EVPN validation.",
    "id": "trouble-9",
    "batch": "27",
    "title": "BGP troubleshooting",
    "subtitle": "Session health versus route policy",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-9",
    "definition": "BGP troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on session health versus route policy.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed. The incident to explain is: The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed. Observed failure: The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes. Discriminating test: Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop. Interpretation: The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix. Recovery contract: Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.",
    "flow": [
      [
        "Scope and baseline",
        "Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed."
      ],
      [
        "Locate the failed boundary",
        "The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes."
      ],
      [
        "Test a competing explanation",
        "Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop."
      ],
      [
        "Recover and verify",
        "Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-9",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-9, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop. The proposed change must address only the demonstrated failed boundary. Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix. A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes."
      ],
      [
        "Competing explanation",
        "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears."
      ],
      [
        "Next discriminating test",
        "Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop."
      ],
      [
        "Supported conclusion and limit",
        "The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix."
      ],
      [
        "Recovery acceptance",
        "Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability."
      ]
    ],
    "mistakes": [
      "Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets.",
      "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears.",
      "Treating a green intermediate status as proof of the original application outcome. Inspect best-path selection, next-hop resolution and competing RIB routes; acceptance precedes installation.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s3-g3-t0"
    ],
    "related": [
      "s3-g3-t0",
      "trouble-10"
    ],
    "incident": {
      "boundary": "Session health versus route policy",
      "baseline": "Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed.",
      "fault": "The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes.",
      "test": "Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop.",
      "diagnosis": "The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix.",
      "recovery": "Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.",
      "alternative": "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears.",
      "guard": "Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for BGP troubleshooting. Session health versus route policy.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed.",
        "Observation boundary: Session health versus route policy",
        "Recovery target: Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets.",
        "Select Recovery and explain what each observation establishes: Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.",
        "Run python labs/troubleshooting-lab.py --topic trouble-9 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears."
      ],
      "verification": "Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears. Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets.",
      "challenge": "A prefix is accepted but not installed. What separates this from filtering?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-9-Q1",
        "topicId": "trouble-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this BGP troubleshooting case investigate?",
        "answer": "Session health versus route policy. The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-9-Q2",
        "topicId": "trouble-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Two lab BGP speakers are Established; an approved documentation prefix is advertised, accepted and installed.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-9-Q3",
        "topicId": "trouble-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop.",
        "explanation": "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-9-Q4",
        "topicId": "trouble-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-9-Q5",
        "topicId": "trouble-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes. The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-9-Q6",
        "topicId": "trouble-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-9-Q7",
        "topicId": "trouble-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-9-Q8",
        "topicId": "trouble-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "A prefix is accepted but not installed. What separates this from filtering?",
        "answer": "Inspect best-path selection, next-hop resolution and competing RIB routes; acceptance precedes installation.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-9-Q9",
        "topicId": "trouble-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored BGP troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-9-Q10",
        "topicId": "trouble-9",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the BGP troubleshooting incident.",
        "answer": "Scope: Session health versus route policy. Observation: The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes. Next test: Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop. Acceptance: Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-9-QC1",
        "topicId": "trouble-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "The session remains Established after an inbound policy change, but the approved prefix is absent from the accepted routes.",
        "explanation": "The supplied evidence points to route admission policy, not a TCP session failure. Established describes the session rather than acceptance of every prefix.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-9-QC2",
        "topicId": "trouble-9",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A missing origin advertisement or unresolved next hop can also remove an installed route. Determine the first view where the prefix disappears.",
        "explanation": "Compare advertised, received where supported, accepted and best-path/installed views for the exact prefix and address family; inspect the effective policy and next hop.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-9-QC3",
        "topicId": "trouble-9",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Repair the narrow policy clause; verify approved prefix admission and installation, rejection of an unauthorized prefix and endpoint reachability.",
        "explanation": "Never permit every prefix to test policy. Use supported soft refresh only when required; avoid disruptive hard resets.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow dhcp exchange across the relay. An unconfigured client typically broadcasts on its local network. A relay provides subnet context and forwards to the intended server; the server and reply path must both be reachable. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Correct relay subnet context: giaddr maps to the intended client subnet.",
      "Server accepts relay policy: Relay information is accepted under the defined trust policy.",
      "Reply reaches client segment: Server-to-relay and relay-to-client paths are supplied as ready.",
      "Observation point: Inspect helper attachment and the route to the owned server; obtain packet evidence separately.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "An unconfigured client typically broadcasts on its local network. A relay provides subnet context and forwards to the intended server; the server and reply path must both be reachable.",
      "DISCOVER, OFFER, REQUEST and ACK are separate observations. Match transaction identity and validate the resulting lease options, not just the existence of an address.",
      "DHCP exchange across the relay: The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server.",
      "Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope.",
      "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path."
    ],
    "comparison": [
      [
        "Correct relay subnet context",
        "giaddr maps to the intended client subnet.",
        "An incorrect giaddr can select the wrong pool even when the server is reachable."
      ],
      [
        "Server accepts relay policy",
        "Relay information is accepted under the defined trust policy.",
        "A policy rejection is not the same as packet loss or an exhausted pool."
      ],
      [
        "Reply reaches client segment",
        "Server-to-relay and relay-to-client paths are supplied as ready.",
        "Forward delivery does not prove the reply returned to the original client."
      ]
    ],
    "glossary": {
      "Correct relay subnet context": "giaddr maps to the intended client subnet.",
      "Server accepts relay policy": "Relay information is accepted under the defined trust policy.",
      "Reply reaches client segment": "Server-to-relay and relay-to-client paths are supplied as ready.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "RFC 2131",
        "url": "https://www.rfc-editor.org/rfc/rfc2131.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3046 relay information option",
        "url": "https://www.rfc-editor.org/info/rfc3046/",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Conventional DHCPv4 relay/server exchanges use UDP 67; clients use UDP 68. The exact forwarded and return tuples depend on client state and relay processing.",
    "id": "trouble-10",
    "batch": "27",
    "title": "DHCP troubleshooting",
    "subtitle": "DHCP exchange across the relay",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-10",
    "definition": "DHCP troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on dhcp exchange across the relay.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A VLAN 20 client receives a lease from the intended subnet through a relay to the server. The incident to explain is: DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A VLAN 20 client receives a lease from the intended subnet through a relay to the server. Observed failure: DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes. Discriminating test: Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope. Interpretation: The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server. Recovery contract: Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.",
    "flow": [
      [
        "Scope and baseline",
        "A VLAN 20 client receives a lease from the intended subnet through a relay to the server."
      ],
      [
        "Locate the failed boundary",
        "DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes."
      ],
      [
        "Test a competing explanation",
        "Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope."
      ],
      [
        "Recover and verify",
        "Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-10",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-10, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "filename": "guided-observation.txt",
        "code": "show running-config interface Vlan20\nshow ip route 192.0.2.10",
        "platform": "Cisco IOS XE17 lab SVI; addresses are placeholders · GUIDED NOT EXECUTED; guided reference, not executed for Batch 27",
        "explanation": "Inspect helper attachment and the route to the owned server; obtain packet evidence separately. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Configured helper and route establish intent only, not giaddr correctness or a completed lease."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope. The proposed change must address only the demonstrated failed boundary. Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server. A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes."
      ],
      [
        "Competing explanation",
        "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path."
      ],
      [
        "Next discriminating test",
        "Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope."
      ],
      [
        "Supported conclusion and limit",
        "The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server."
      ],
      [
        "Recovery acceptance",
        "Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated."
      ]
    ],
    "mistakes": [
      "Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server.",
      "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path.",
      "Treating a green intermediate status as proof of the original application outcome. No. Validate delivered options as well as address ownership; correct the scoped option and test renewal and name resolution on the test client.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s4-g0-t1"
    ],
    "related": [
      "s4-g0-t1",
      "trouble-11"
    ],
    "incident": {
      "boundary": "DHCP exchange across the relay",
      "baseline": "A VLAN 20 client receives a lease from the intended subnet through a relay to the server.",
      "fault": "DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes.",
      "test": "Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope.",
      "diagnosis": "The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server.",
      "recovery": "Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.",
      "alternative": "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path.",
      "guard": "Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for DHCP troubleshooting. DHCP exchange across the relay.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A VLAN 20 client receives a lease from the intended subnet through a relay to the server.",
        "Observation boundary: DHCP exchange across the relay",
        "Recovery target: Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server.",
        "Select Recovery and explain what each observation establishes: Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.",
        "Run python labs/troubleshooting-lab.py --topic trouble-10 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path."
      ],
      "verification": "Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path. Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server.",
      "challenge": "An address is leased but DNS is wrong. Is DHCP fully accepted?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-10-Q1",
        "topicId": "trouble-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this DHCP troubleshooting case investigate?",
        "answer": "DHCP exchange across the relay. The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-10-Q2",
        "topicId": "trouble-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A VLAN 20 client receives a lease from the intended subnet through a relay to the server.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-10-Q3",
        "topicId": "trouble-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope.",
        "explanation": "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-10-Q4",
        "topicId": "trouble-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-10-Q5",
        "topicId": "trouble-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes. The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-10-Q6",
        "topicId": "trouble-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-10-Q7",
        "topicId": "trouble-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-10-Q8",
        "topicId": "trouble-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "An address is leased but DNS is wrong. Is DHCP fully accepted?",
        "answer": "No. Validate delivered options as well as address ownership; correct the scoped option and test renewal and name resolution on the test client.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-10-Q9",
        "topicId": "trouble-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored DHCP troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-10-Q10",
        "topicId": "trouble-10",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the DHCP troubleshooting incident.",
        "answer": "Scope: DHCP exchange across the relay. Observation: DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes. Next test: Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope. Acceptance: Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-10-QC1",
        "topicId": "trouble-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "DISCOVER reaches the relay but no forwarded request appears at the server after the helper destination changes.",
        "explanation": "The first demonstrated failed handoff is relay-to-server delivery. Pool exhaustion is not supported until the request reaches the server.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-10-QC2",
        "topicId": "trouble-10",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A server receiving DISCOVER without offering a lease warrants scope/availability checks; an OFFER failing to return shifts the investigation to the return path.",
        "explanation": "Correlate transaction identity across client, relay and server observations; verify relay destination, routing and filters before changing the scope.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-10-QC3",
        "topicId": "trouble-10",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore the intended relay target; verify DORA, subnet/mask/gateway/DNS options and a fresh client service test; confirm other scopes remain isolated.",
        "explanation": "Use a disposable client for renew/release testing. Do not interrupt active production leases or introduce an unauthorized DHCP server.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow resolver answer, authority and negative cache. A recursive resolver can answer from cache or consult upstream authority. Compare identical names, types and views before interpreting different responses. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Authority has intended record: The responsible zone contains the intended name/type data.",
      "Resolver can obtain valid answer: The resolver path and applicable validation policy are supplied as ready.",
      "Client cache is current: The supplied client observation is not an old eligible cached result.",
      "Observation point: Ask the declared authority without requesting recursion; compare separately with the intended recursive resolver.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "A recursive resolver can answer from cache or consult upstream authority. Compare identical names, types and views before interpreting different responses.",
      "NXDOMAIN is a negative name answer, whereas an empty requested type, SERVFAIL and timeout describe different conditions. Negative caching can outlive an authoritative correction until its applicable lifetime expires.",
      "Resolver answer, authority and negative cache: The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache.",
      "Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout.",
      "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent."
    ],
    "comparison": [
      [
        "Authority has intended record",
        "The responsible zone contains the intended name/type data.",
        "Flushing a client cache cannot repair incorrect authoritative publication."
      ],
      [
        "Resolver can obtain valid answer",
        "The resolver path and applicable validation policy are supplied as ready.",
        "A working authority does not ensure the client resolver can reach or validate it."
      ],
      [
        "Client cache is current",
        "The supplied client observation is not an old eligible cached result.",
        "TTL and negative caching can explain different answers without an authoritative outage."
      ]
    ],
    "glossary": {
      "Authority has intended record": "The responsible zone contains the intended name/type data.",
      "Resolver can obtain valid answer": "The resolver path and applicable validation policy are supplied as ready.",
      "Client cache is current": "The supplied client observation is not an old eligible cached result.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "RFC 1034",
        "url": "https://www.rfc-editor.org/rfc/rfc1034.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2308",
        "url": "https://www.rfc-editor.org/rfc/rfc2308.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Traditional DNS uses UDP/TCP 53; TCP is also needed in ordinary operation. Encrypted DNS transports have distinct ports and policy; this lesson does not deploy them.",
    "id": "trouble-11",
    "batch": "27",
    "title": "DNS troubleshooting",
    "subtitle": "Resolver answer, authority and negative cache",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-11",
    "definition": "DNS troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on resolver answer, authority and negative cache.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. The intended resolver returns the current A record for app.example.test and the application uses it successfully. The incident to explain is: The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: The intended resolver returns the current A record for app.example.test and the application uses it successfully. Observed failure: The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires. Discriminating test: Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout. Interpretation: The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache. Recovery contract: After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.",
    "flow": [
      [
        "Scope and baseline",
        "The intended resolver returns the current A record for app.example.test and the application uses it successfully."
      ],
      [
        "Locate the failed boundary",
        "The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires."
      ],
      [
        "Test a competing explanation",
        "Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout."
      ],
      [
        "Recover and verify",
        "After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-11",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-11, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "filename": "guided-observation.txt",
        "code": "dig @192.0.2.53 app.example.test A +norecurse",
        "platform": "BIND9 client in an isolated lab · GUIDED NOT EXECUTED; guided reference, not executed for Batch 27",
        "explanation": "Ask the declared authority without requesting recursion; compare separately with the intended recursive resolver. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Inspect AA, status, answer type and TTL; a timeout differs from NXDOMAIN or a cached answer."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout. The proposed change must address only the demonstrated failed boundary. Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache. A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires."
      ],
      [
        "Competing explanation",
        "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent."
      ],
      [
        "Next discriminating test",
        "Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout."
      ],
      [
        "Supported conclusion and limit",
        "The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache."
      ],
      [
        "Recovery acceptance",
        "After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint."
      ]
    ],
    "mistakes": [
      "Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names.",
      "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent.",
      "Treating a green intermediate status as proof of the original application outcome. No. SERVFAIL indicates resolution failure; investigate delegation, upstream availability or validation while retaining the exact response.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s4-g0-t2"
    ],
    "related": [
      "s4-g0-t2",
      "trouble-12"
    ],
    "incident": {
      "boundary": "Resolver answer, authority and negative cache",
      "baseline": "The intended resolver returns the current A record for app.example.test and the application uses it successfully.",
      "fault": "The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires.",
      "test": "Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout.",
      "diagnosis": "The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache.",
      "recovery": "After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.",
      "alternative": "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent.",
      "guard": "Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for DNS troubleshooting. Resolver answer, authority and negative cache.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "The intended resolver returns the current A record for app.example.test and the application uses it successfully.",
        "Observation boundary: Resolver answer, authority and negative cache",
        "Recovery target: After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names.",
        "Select Recovery and explain what each observation establishes: After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.",
        "Run python labs/troubleshooting-lab.py --topic trouble-11 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent."
      ],
      "verification": "After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent. Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names.",
      "challenge": "SERVFAIL appears instead of NXDOMAIN. May you call the name nonexistent?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-11-Q1",
        "topicId": "trouble-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this DNS troubleshooting case investigate?",
        "answer": "Resolver answer, authority and negative cache. The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-11-Q2",
        "topicId": "trouble-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "The intended resolver returns the current A record for app.example.test and the application uses it successfully.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-11-Q3",
        "topicId": "trouble-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout.",
        "explanation": "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-11-Q4",
        "topicId": "trouble-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-11-Q5",
        "topicId": "trouble-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires. The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-11-Q6",
        "topicId": "trouble-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-11-Q7",
        "topicId": "trouble-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-11-Q8",
        "topicId": "trouble-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "SERVFAIL appears instead of NXDOMAIN. May you call the name nonexistent?",
        "answer": "No. SERVFAIL indicates resolution failure; investigate delegation, upstream availability or validation while retaining the exact response.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-11-Q9",
        "topicId": "trouble-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored DNS troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-11-Q10",
        "topicId": "trouble-11",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the DNS troubleshooting incident.",
        "answer": "Scope: Resolver answer, authority and negative cache. Observation: The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires. Next test: Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout. Acceptance: After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-11-QC1",
        "topicId": "trouble-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "The authoritative test zone has the new record, but one recursive resolver continues returning a cached NXDOMAIN before its negative TTL expires.",
        "explanation": "The supplied mismatch is negative-cache state at one resolver; an authoritative record does not instantly invalidate every cache.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-11-QC2",
        "topicId": "trouble-11",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A different search suffix, split DNS view or queried record type can make two apparently similar queries non-equivalent.",
        "explanation": "Compare the exact name, type and resolver with an authoritative query and the cached answer/TTL. Distinguish NXDOMAIN, NOERROR with no requested data, SERVFAIL and timeout.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-11-QC3",
        "topicId": "trouble-11",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "After the scoped expiry or authorized cache action, the intended resolver returns the correct answer and a new application request reaches the intended endpoint.",
        "explanation": "Do not flush every resolver or point clients at public DNS to bypass an internal view. Retain query details without sensitive names.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow translation tuples and reverse state. Translation changes selected address/port fields and maintains the mapping required by the deployed policy. Compare both sides using the original and translated tuples. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "An internal tuple includes protocol, source address/port and destination address/port. Which parts identify a mapping depends on the translator’s implementation and policy.",
      "An external address and translated port distinguish concurrent flows in the simplified PAT example. Port preservation is sometimes possible but not guaranteed.",
      "A translation/state table stores information needed for the return direction and its lifetime. TCP, UDP and other traffic require different handling.",
      "Routing must bring traffic through the appropriate translator; asymmetric paths can bypass required state. High-availability designs must account for state continuity.",
      "Filtering rules decide which traffic is allowed. They can coexist with translation but are a separate policy function."
    ],
    "mechanism": [
      "Translation changes selected address/port fields and maintains the mapping required by the deployed policy. Compare both sides using the original and translated tuples.",
      "Returning traffic must encounter compatible translation state or an applicable static rule. Filtering and translation are separate decisions whose order depends on platform processing.",
      "Translation tuples and reverse state: The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery.",
      "Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately.",
      "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request."
    ],
    "comparison": [
      [
        "Basic address translation",
        "Changes address information",
        "Does not necessarily multiplex using ports."
      ],
      [
        "PAT / NAPT",
        "Also translates transport identifiers",
        "Can share an external address among concurrent endpoints."
      ],
      [
        "Source NAT",
        "Changes the source side in the outgoing example",
        "Return translation restores the corresponding internal destination."
      ],
      [
        "Destination NAT",
        "Changes the destination side for a rule",
        "Often used in service publishing, with separate access policy."
      ],
      [
        "Firewall filtering",
        "Permits or denies traffic",
        "Not equivalent to address rewriting."
      ]
    ],
    "glossary": {
      "NAT": "Network Address Translation.",
      "PAT": "Port Address Translation, commonly called NAPT.",
      "Tuple": "A set of protocol and endpoint fields identifying traffic in a stated context.",
      "State table": "Stored information used to handle an ongoing communication flow.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "RFC 3022: traditional NAT",
        "url": "https://www.rfc-editor.org/rfc/rfc3022.html",
        "checked": "2026-10-04"
      },
      {
        "title": "RFC 4787: UDP NAT mapping/filtering distinctions",
        "url": "https://www.rfc-editor.org/rfc/rfc4787.html",
        "checked": "2026-10-04"
      },
      {
        "title": "iproute2: ss socket inspection",
        "url": "https://man7.org/linux/man-pages/man8/ss.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "iproute2: ip command",
        "url": "https://man7.org/linux/man-pages/man8/ip.8.html",
        "checked": "2026-10-04"
      }
    ],
    "ports": "PAT commonly changes TCP or UDP source ports in outbound sharing, but handling of other protocols uses their relevant identifiers and state. A device’s usable allocation capacity is not simply a promise of 65,536 simultaneous clients: reserved ports, remote tuples, policy, multiple addresses and implementation limits affect capacity.",
    "id": "trouble-12",
    "batch": "27",
    "title": "NAT troubleshooting",
    "subtitle": "Translation tuples and reverse state",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-12",
    "definition": "NAT troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on translation tuples and reverse state.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service. The incident to explain is: The request is observed after translation, but the response returns through a different unsynchronized stateful gateway. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service. Observed failure: The request is observed after translation, but the response returns through a different unsynchronized stateful gateway. Discriminating test: Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately. Interpretation: The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery. Recovery contract: Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.",
    "flow": [
      [
        "Scope and baseline",
        "Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service."
      ],
      [
        "Locate the failed boundary",
        "The request is observed after translation, but the response returns through a different unsynchronized stateful gateway."
      ],
      [
        "Test a competing explanation",
        "Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately."
      ],
      [
        "Recover and verify",
        "Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-12",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-12, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately. The proposed change must address only the demonstrated failed boundary. Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery. Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "The request is observed after translation, but the response returns through a different unsynchronized stateful gateway."
      ],
      [
        "Competing explanation",
        "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request."
      ],
      [
        "Next discriminating test",
        "Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately."
      ],
      [
        "Supported conclusion and limit",
        "The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery."
      ],
      [
        "Recovery acceptance",
        "Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied."
      ]
    ],
    "mistakes": [
      "Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform.",
      "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request.",
      "Treating a green intermediate status as proof of the original application outcome. No. Compare the application protocol, ports, mapping and reverse flow; ICMP behavior does not certify TCP translation or policy.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s1-g2-t3"
    ],
    "related": [
      "s1-g2-t3",
      "trouble-13"
    ],
    "incident": {
      "boundary": "Translation tuples and reverse state",
      "baseline": "Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service.",
      "fault": "The request is observed after translation, but the response returns through a different unsynchronized stateful gateway.",
      "test": "Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately.",
      "diagnosis": "The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery.",
      "recovery": "Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.",
      "alternative": "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request.",
      "guard": "Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for NAT troubleshooting. Translation tuples and reverse state.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service.",
        "Observation boundary: Translation tuples and reverse state",
        "Recovery target: Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. The request is observed after translation, but the response returns through a different unsynchronized stateful gateway.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform.",
        "Select Recovery and explain what each observation establishes: Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.",
        "Run python labs/troubleshooting-lab.py --topic trouble-12 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request."
      ],
      "verification": "Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request. Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform.",
      "challenge": "Ping works but a new TCP application fails. Has NAT been cleared?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-12-Q1",
        "topicId": "trouble-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this NAT troubleshooting case investigate?",
        "answer": "Translation tuples and reverse state. The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-12-Q2",
        "topicId": "trouble-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Inside client 192.0.2.10:53000 maps to documentation address 203.0.113.5:40001 for an approved service.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-12-Q3",
        "topicId": "trouble-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately.",
        "explanation": "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-12-Q4",
        "topicId": "trouble-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-12-Q5",
        "topicId": "trouble-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "The request is observed after translation, but the response returns through a different unsynchronized stateful gateway. The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-12-Q6",
        "topicId": "trouble-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-12-Q7",
        "topicId": "trouble-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-12-Q8",
        "topicId": "trouble-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Ping works but a new TCP application fails. Has NAT been cleared?",
        "answer": "No. Compare the application protocol, ports, mapping and reverse flow; ICMP behavior does not certify TCP translation or policy.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-12-Q9",
        "topicId": "trouble-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored NAT troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-12-Q10",
        "topicId": "trouble-12",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the NAT troubleshooting incident.",
        "answer": "Scope: Translation tuples and reverse state. Observation: The request is observed after translation, but the response returns through a different unsynchronized stateful gateway. Next test: Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately. Acceptance: Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-12-QC1",
        "topicId": "trouble-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "The request is observed after translation, but the response returns through a different unsynchronized stateful gateway.",
        "explanation": "The reply misses the device holding the mapping. A successful outbound translation does not prove reverse delivery.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-12-QC2",
        "topicId": "trouble-12",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "Port exhaustion or a rule that never matches would instead prevent the outbound mapping; neither is proved by this successful translated request.",
        "explanation": "Correlate original and translated five-tuples at ingress/egress and the returning gateway; check mapping lifetime, routing and filtering separately.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-12-QC3",
        "topicId": "trouble-12",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore the intended symmetric/state-compatible path; verify a new connection and its reverse translation, while unsolicited traffic remains denied.",
        "explanation": "Do not clear all NAT state or expose inside addresses to diagnose one flow. Keep the test tuple bounded and document translation order for the platform.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow ordered acl matching at an applied boundary. An ordered ACL evaluates traffic against its matching rules at a particular attachment and direction. A broad earlier rule can prevent a later narrow permit from being reached. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Destination port: Server service number in this forward tuple. Do not confuse client ephemeral ports.",
      "Protocol: TCP and UDP are separate matches. A shared numeric port does not merge transports.",
      "Direction: Tuple as consumed at one attachment. Response traffic requires separate analysis.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "An ordered ACL evaluates traffic against its matching rules at a particular attachment and direction. A broad earlier rule can prevent a later narrow permit from being reached.",
      "A counter delta ties a test flow to a policy decision only if scope and other traffic are controlled. A permit match does not establish application or reverse-path success.",
      "Ordered ACL matching at an applied boundary: First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient.",
      "Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas.",
      "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path."
    ],
    "comparison": [
      [
        "Destination port",
        "Server service number in this forward tuple",
        "Do not confuse client ephemeral ports."
      ],
      [
        "Protocol",
        "TCP and UDP are separate matches",
        "A shared numeric port does not merge transports."
      ],
      [
        "Direction",
        "Tuple as consumed at one attachment",
        "Response traffic requires separate analysis."
      ]
    ],
    "glossary": {
      "Destination port": "Server service number in this forward tuple. Do not confuse client ephemeral ports.",
      "Protocol": "TCP and UDP are separate matches. A shared numeric port does not merge transports.",
      "Direction": "Tuple as consumed at one attachment. Response traffic requires separate analysis.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "The ACL policy has no intrinsic port. The supplied extended example matches TCP destination 443; standard-list matching ignores transport ports.",
    "id": "trouble-13",
    "batch": "27",
    "title": "ACL troubleshooting",
    "subtitle": "Ordered ACL matching at an applied boundary",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-13",
    "definition": "ACL troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on ordered acl matching at an applied boundary.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Policy permits a test client to TCP 443 on a service and denies unrelated access. The incident to explain is: A broader deny appears before the intended permit. The deny counter increases on each fresh test connection. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Policy permits a test client to TCP 443 on a service and denies unrelated access. Observed failure: A broader deny appears before the intended permit. The deny counter increases on each fresh test connection. Discriminating test: Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas. Interpretation: First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient. Recovery contract: Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.",
    "flow": [
      [
        "Scope and baseline",
        "Policy permits a test client to TCP 443 on a service and denies unrelated access."
      ],
      [
        "Locate the failed boundary",
        "A broader deny appears before the intended permit. The deny counter increases on each fresh test connection."
      ],
      [
        "Test a competing explanation",
        "Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas."
      ],
      [
        "Recover and verify",
        "Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-13",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-13, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED; guided reference, not executed for Batch 27",
        "code": "show ip access-lists\nshow ip interface",
        "explanation": "Observe the installed context for Extended ACL. Permit users 192.0.2.0/24 to application 198.51.100.10 TCP 443 in the worksheet. Predict alternate destination, UDP and SSH denials before inspecting the result. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Restore the intended protocol and repeat allowed and denied tuples. Do not broaden every protocol to hide the mismatch. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas. The proposed change must address only the demonstrated failed boundary. Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient. A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "A broader deny appears before the intended permit. The deny counter increases on each fresh test connection."
      ],
      [
        "Competing explanation",
        "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path."
      ],
      [
        "Next discriminating test",
        "Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas."
      ],
      [
        "Supported conclusion and limit",
        "First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient."
      ],
      [
        "Recovery acceptance",
        "Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow."
      ]
    ],
    "mistakes": [
      "Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment.",
      "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path.",
      "Treating a green intermediate status as proof of the original application outcome. Forwarding beyond the ACL, reverse policy, listener health and application exchange; a rule match only identifies that enforcement stage.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g1-t2",
      "trouble-14"
    ],
    "incident": {
      "boundary": "Ordered ACL matching at an applied boundary",
      "baseline": "Policy permits a test client to TCP 443 on a service and denies unrelated access.",
      "fault": "A broader deny appears before the intended permit. The deny counter increases on each fresh test connection.",
      "test": "Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas.",
      "diagnosis": "First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient.",
      "recovery": "Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.",
      "alternative": "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path.",
      "guard": "Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for ACL troubleshooting. Ordered ACL matching at an applied boundary.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Policy permits a test client to TCP 443 on a service and denies unrelated access.",
        "Observation boundary: Ordered ACL matching at an applied boundary",
        "Recovery target: Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. A broader deny appears before the intended permit. The deny counter increases on each fresh test connection.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment.",
        "Select Recovery and explain what each observation establishes: Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.",
        "Run python labs/troubleshooting-lab.py --topic trouble-13 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path."
      ],
      "verification": "Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path. Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment.",
      "challenge": "The permit counter rises but the service fails. What remains unproved?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-13-Q1",
        "topicId": "trouble-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this ACL troubleshooting case investigate?",
        "answer": "Ordered ACL matching at an applied boundary. First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-13-Q2",
        "topicId": "trouble-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Policy permits a test client to TCP 443 on a service and denies unrelated access.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-13-Q3",
        "topicId": "trouble-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas.",
        "explanation": "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-13-Q4",
        "topicId": "trouble-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-13-Q5",
        "topicId": "trouble-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "A broader deny appears before the intended permit. The deny counter increases on each fresh test connection. First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-13-Q6",
        "topicId": "trouble-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-13-Q7",
        "topicId": "trouble-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-13-Q8",
        "topicId": "trouble-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "The permit counter rises but the service fails. What remains unproved?",
        "answer": "Forwarding beyond the ACL, reverse policy, listener health and application exchange; a rule match only identifies that enforcement stage.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-13-Q9",
        "topicId": "trouble-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored ACL troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-13-Q10",
        "topicId": "trouble-13",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the ACL troubleshooting incident.",
        "answer": "Scope: Ordered ACL matching at an applied boundary. Observation: A broader deny appears before the intended permit. The deny counter increases on each fresh test connection. Next test: Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas. Acceptance: Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-13-QC1",
        "topicId": "trouble-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "A broader deny appears before the intended permit. The deny counter increases on each fresh test connection.",
        "explanation": "First matching rule order shadows the later permit for this test. Merely finding a permit in the text is insufficient.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-13-QC2",
        "topicId": "trouble-13",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A correct ACL on the wrong interface or direction will not explain a matching counter there; confirm the real traffic path.",
        "explanation": "Read effective rule order, attachment interface/direction, address family and pre/post-NAT tuple context; correlate a bounded test with counter deltas.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-13-QC3",
        "topicId": "trouble-13",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Apply the reviewed narrow ordering correction and verify both the permitted transaction and a deliberately denied control flow.",
        "explanation": "Keep management access and a rollback path. Do not append an any-any permit as a connectivity experiment.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow stateful session lifecycle. A stateful firewall evaluates new-session policy and subsequent traffic in the context of tracked state. Zone, tuple, direction and session age matter. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Stateless permit: One packet decision. Return permission is separate.",
      "Stateful response: Belongs to an admitted valid flow. New reverse initiation is different.",
      "Application permission: Endpoint access decision. Firewall admission does not override it.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "A stateful firewall evaluates new-session policy and subsequent traffic in the context of tracked state. Zone, tuple, direction and session age matter.",
      "High availability requires the supported traffic and state design. Asymmetric paths are not universally invalid, but in this case the receiving member lacks the state required for the return packet.",
      "Stateful session lifecycle: Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance.",
      "Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy.",
      "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health."
    ],
    "comparison": [
      [
        "Stateless permit",
        "One packet decision",
        "Return permission is separate."
      ],
      [
        "Stateful response",
        "Belongs to an admitted valid flow",
        "New reverse initiation is different."
      ],
      [
        "Application permission",
        "Endpoint access decision",
        "Firewall admission does not override it."
      ]
    ],
    "glossary": {
      "Stateless permit": "One packet decision. Return permission is separate.",
      "Stateful response": "Belongs to an admitted valid flow. New reverse initiation is different.",
      "Application permission": "Endpoint access decision. Firewall admission does not override it.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "NIST SP 800-41 Rev. 1 firewall policy",
        "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 zone-based policy firewall",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-zone-pol-fw-xe.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Firewall policy has no intrinsic port; the classroom example uses HTTPS TCP destination 443 and distinguishes initiation from response. Actual zones/ASA rules use their observed tuple.",
    "id": "trouble-14",
    "batch": "27",
    "title": "Firewall troubleshooting",
    "subtitle": "Stateful session lifecycle",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-14",
    "definition": "Firewall troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on stateful session lifecycle.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A new TCP connection traverses the intended firewall zones and receives an allowed response. The incident to explain is: After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A new TCP connection traverses the intended firewall zones and receives an allowed response. Observed failure: After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state. Discriminating test: Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy. Interpretation: Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance. Recovery contract: Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.",
    "flow": [
      [
        "Scope and baseline",
        "A new TCP connection traverses the intended firewall zones and receives an allowed response."
      ],
      [
        "Locate the failed boundary",
        "After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state."
      ],
      [
        "Test a competing explanation",
        "Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy."
      ],
      [
        "Recover and verify",
        "Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-14",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-14, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy. The proposed change must address only the demonstrated failed boundary. Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance. TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state."
      ],
      [
        "Competing explanation",
        "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health."
      ],
      [
        "Next discriminating test",
        "Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy."
      ],
      [
        "Supported conclusion and limit",
        "Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance."
      ],
      [
        "Recovery acceptance",
        "Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior."
      ]
    ],
    "mistakes": [
      "Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule.",
      "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health.",
      "Treating a green intermediate status as proof of the original application outcome. Compare session creation time and matched rule for old versus new flows; retained state may conceal a new-policy fault.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s5-g5-t0"
    ],
    "related": [
      "s5-g5-t0",
      "trouble-15"
    ],
    "incident": {
      "boundary": "Stateful session lifecycle",
      "baseline": "A new TCP connection traverses the intended firewall zones and receives an allowed response.",
      "fault": "After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state.",
      "test": "Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy.",
      "diagnosis": "Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance.",
      "recovery": "Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.",
      "alternative": "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health.",
      "guard": "Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Firewall troubleshooting. Stateful session lifecycle.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A new TCP connection traverses the intended firewall zones and receives an allowed response.",
        "Observation boundary: Stateful session lifecycle",
        "Recovery target: Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule.",
        "Select Recovery and explain what each observation establishes: Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.",
        "Run python labs/troubleshooting-lab.py --topic trouble-14 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health."
      ],
      "verification": "Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health. Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule.",
      "challenge": "Old connections work but new ones fail after a policy edit. What comparison helps?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-14-Q1",
        "topicId": "trouble-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Firewall troubleshooting case investigate?",
        "answer": "Stateful session lifecycle. Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-14-Q2",
        "topicId": "trouble-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A new TCP connection traverses the intended firewall zones and receives an allowed response.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-14-Q3",
        "topicId": "trouble-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy.",
        "explanation": "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-14-Q4",
        "topicId": "trouble-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-14-Q5",
        "topicId": "trouble-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state. Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-14-Q6",
        "topicId": "trouble-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-14-Q7",
        "topicId": "trouble-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-14-Q8",
        "topicId": "trouble-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Old connections work but new ones fail after a policy edit. What comparison helps?",
        "answer": "Compare session creation time and matched rule for old versus new flows; retained state may conceal a new-policy fault.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-14-Q9",
        "topicId": "trouble-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Firewall troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-14-Q10",
        "topicId": "trouble-14",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Firewall troubleshooting incident.",
        "answer": "Scope: Stateful session lifecycle. Observation: After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state. Next test: Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy. Acceptance: Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-14-QC1",
        "topicId": "trouble-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "After a routing change, SYN enters firewall A while SYN-ACK reaches firewall B without synchronized session state.",
        "explanation": "Asymmetric traversal lacks the required state on B in this case; a permissive-looking static rule alone cannot establish session acceptance.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-14-QC2",
        "topicId": "trouble-14",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "TLS negotiation or an unhealthy listener can fail after a successful handshake. A firewall allow log is not proof of application health.",
        "explanation": "Correlate both directions of a new five-tuple with route, zone, rule and session/drop reason evidence. Distinguish existing sessions from new-session policy.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-14-QC3",
        "topicId": "trouble-14",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore a supported state-compatible traffic path; verify a new handshake and application transaction, denied control traffic and the agreed HA behavior.",
        "explanation": "Do not disable inspection or expose all zones. Sanitize captures and change only the demonstrated path or rule.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Treat wireless access as successive gates: discovering an AP, associating, satisfying the configured security exchange, obtaining Layer 3 settings and reaching a service. Passing one gate is not a receipt for the next. The exact security/roaming sequence depends on WLAN mode and release; signal strength is only one RF observation.",
    "components": [
      "Client radio and supplicant: signal/retry behavior and identity negotiation.",
      "AP and controller: association state, WLAN-to-VLAN mapping and policy enforcement.",
      "Authentication service: accept/reject and method/certificate evidence for the configured security mode.",
      "DHCP, gateway and DNS: address and service dependencies after link admission."
    ],
    "mechanism": [
      "Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence.",
      "Correlate association and authentication state by client identity and time.",
      "Verify the resulting VLAN, address, gateway and DNS before application tests.",
      "For RF complaints, compare retries, channel use and roaming events; RSSI alone is insufficient."
    ],
    "comparison": [
      [
        "Associated",
        "Client has joined the AP at the link layer",
        "Does not prove authentication or a valid address"
      ],
      [
        "Authenticated",
        "Configured security exchange succeeded",
        "Does not prove DHCP or DNS"
      ],
      [
        "Application healthy",
        "A fresh intended transaction succeeds",
        "Still test roaming and denied access separately"
      ]
    ],
    "glossary": {
      "Association": "A link-layer relationship with an AP.",
      "Supplicant": "Client component participating in network authentication.",
      "Roaming": "Moving the client connection between APs; continuity depends on the deployed mobility/security design.",
      "RSSI": "Received signal strength indication, not a complete quality or capacity measure."
    },
    "sources": [
      {
        "title": "RFC 2131: DHCPv4",
        "url": "https://www.rfc-editor.org/rfc/rfc2131.html",
        "checked": "2026-10-04"
      },
      {
        "title": "RFC 2132: DHCP options",
        "url": "https://www.rfc-editor.org/rfc/rfc2132.html",
        "checked": "2026-10-04"
      },
      {
        "title": "RFC 5227: address conflict detection",
        "url": "https://www.rfc-editor.org/rfc/rfc5227",
        "checked": "2026-10-04"
      },
      {
        "title": "iproute2: ip command",
        "url": "https://man7.org/linux/man-pages/man8/ip.8.html",
        "checked": "2026-10-04"
      },
      {
        "title": "Cisco: wireless client state troubleshooting; platform-specific examples",
        "url": "https://www.cisco.com/c/en/us/support/docs/wireless/5508-wireless-controller/200072-Cheat-Sheet-Common-Wireless-issues.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "802.11 association has no TCP/UDP port. Addressing and name services commonly involve DHCP UDP 67/68 and DNS UDP/TCP 53; authentication transports depend on deployment. Verify the actual controller and identity path.",
    "id": "trouble-15",
    "batch": "27",
    "title": "Wireless troubleshooting",
    "subtitle": "Association, authentication, addressing and service",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-15",
    "definition": "Wireless troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on association, authentication, addressing and service.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A test client associates with the intended AP, authenticates, receives an address and opens the service. The incident to explain is: The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A test client associates with the intended AP, authenticates, receives an address and opens the service. Observed failure: The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage. Discriminating test: Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence. Interpretation: The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service. Recovery contract: Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.",
    "flow": [
      [
        "Scope and baseline",
        "A test client associates with the intended AP, authenticates, receives an address and opens the service."
      ],
      [
        "Locate the failed boundary",
        "The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage."
      ],
      [
        "Test a competing explanation",
        "Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence."
      ],
      [
        "Recover and verify",
        "Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-15",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-15, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "code": "ip -4 -brief address show",
        "explanation": "Inspect installed IPv4 interface addresses without renewing or releasing anything. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Lists current addresses in this namespace. It does not prove they came from DHCP or reveal the complete lease transaction.",
        "platform": "Ubuntu 24.04 / Bash + iproute2 (read-only); guided reference, not executed for Batch 27",
        "filename": "bash"
      },
      {
        "code": "ip -4 route show",
        "explanation": "Compare installed routes with the expected configuration. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Read-only route entries; a default route may be static or dynamically installed, so correlate with the actual client configuration and lease record.",
        "platform": "Ubuntu 24.04 / Bash + iproute2 (read-only); guided reference, not executed for Batch 27",
        "filename": "bash"
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence. The proposed change must address only the demonstrated failed boundary. Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service. High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage."
      ],
      [
        "Competing explanation",
        "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address."
      ],
      [
        "Next discriminating test",
        "Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence."
      ],
      [
        "Supported conclusion and limit",
        "The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service."
      ],
      [
        "Recovery acceptance",
        "Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works."
      ]
    ],
    "mistakes": [
      "Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy.",
      "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address.",
      "Treating a green intermediate status as proof of the original application outcome. Roam timestamps, authentication/session continuity, new AP/VLAN mapping and packet loss; lease existence alone does not prove continuity.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s1-g2-t2"
    ],
    "related": [
      "s1-g2-t2",
      "trouble-16"
    ],
    "incident": {
      "boundary": "Association, authentication, addressing and service",
      "baseline": "A test client associates with the intended AP, authenticates, receives an address and opens the service.",
      "fault": "The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage.",
      "test": "Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence.",
      "diagnosis": "The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service.",
      "recovery": "Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.",
      "alternative": "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address.",
      "guard": "Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Wireless troubleshooting. Association, authentication, addressing and service.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A test client associates with the intended AP, authenticates, receives an address and opens the service.",
        "Observation boundary: Association, authentication, addressing and service",
        "Recovery target: Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy.",
        "Select Recovery and explain what each observation establishes: Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.",
        "Run python labs/troubleshooting-lab.py --topic trouble-15 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address."
      ],
      "verification": "Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address. Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy.",
      "challenge": "The client has a lease but stalls after roaming. What should be correlated?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-15-Q1",
        "topicId": "trouble-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Wireless troubleshooting case investigate?",
        "answer": "Association, authentication, addressing and service. The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-15-Q2",
        "topicId": "trouble-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A test client associates with the intended AP, authenticates, receives an address and opens the service.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-15-Q3",
        "topicId": "trouble-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence.",
        "explanation": "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-15-Q4",
        "topicId": "trouble-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-15-Q5",
        "topicId": "trouble-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage. The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-15-Q6",
        "topicId": "trouble-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-15-Q7",
        "topicId": "trouble-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-15-Q8",
        "topicId": "trouble-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "The client has a lease but stalls after roaming. What should be correlated?",
        "answer": "Roam timestamps, authentication/session continuity, new AP/VLAN mapping and packet loss; lease existence alone does not prove continuity.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-15-Q9",
        "topicId": "trouble-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Wireless troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-15-Q10",
        "topicId": "trouble-15",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Wireless troubleshooting incident.",
        "answer": "Scope: Association, authentication, addressing and service. Observation: The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage. Next test: Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence. Acceptance: Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-15-QC1",
        "topicId": "trouble-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "The client is associated and authenticated but remains without a lease. Controller evidence places it at the DHCP stage.",
        "explanation": "The supplied evidence has passed association/authentication but not addressing. Strong signal alone does not establish network service.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-15-QC2",
        "topicId": "trouble-15",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "High retry rates or roaming problems require RF/channel evidence; they cannot be inferred solely from an absent address.",
        "explanation": "Inspect client state and correlate DHCP requests across the WLAN/VLAN mapping and relay. Compare RF retries separately from addressing evidence.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-15-QC3",
        "topicId": "trouble-15",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Correct the intended WLAN-to-VLAN or relay handoff; confirm authentication remains required, a correct lease arrives and a fresh application request works.",
        "explanation": "Use an owned test SSID/client. Never turn off encryption or authentication to make the status look healthy.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow hardware evidence versus guest symptom. A server depends on power, cooling, compute, memory, controllers and attached I/O. The management controller provides a separate observation plane that can remain available when an OS fails. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Inventory: Installed components and attachment map. Discovery does not certify health.",
      "Telemetry: Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test: Original user operation. Checks the assembled dependency path.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "A server depends on power, cooling, compute, memory, controllers and attached I/O. The management controller provides a separate observation plane that can remain available when an OS fails.",
      "A redundant component can lose its peer without an immediate workload outage. Verify current telemetry and upstream independence rather than treating running guests as a redundancy test.",
      "Hardware evidence versus guest symptom: The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection.",
      "Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts.",
      "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color."
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
    "glossary": {
      "Inventory": "Installed components and attachment map. Discovery does not certify health.",
      "Telemetry": "Observed health and resource counters. Correlate timestamp and sensor meaning.",
      "Service test": "Original user operation. Checks the assembled dependency path.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
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
      },
      {
        "title": "Dell PowerEdge troubleshooting guide; match the installed generation",
        "url": "https://dl.dell.com/topicspdf/troubleshootingguide_en-us.pdf",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "id": "trouble-16",
    "batch": "27",
    "title": "Server hardware troubleshooting",
    "subtitle": "Hardware evidence versus guest symptom",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-16",
    "definition": "Server hardware troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on hardware evidence versus guest symptom.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A rack server has redundant power feeds, normal thermal readings and a stable hardware event log. The incident to explain is: Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A rack server has redundant power feeds, normal thermal readings and a stable hardware event log. Observed failure: Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert. Discriminating test: Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts. Interpretation: The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection. Recovery contract: An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.",
    "flow": [
      [
        "Scope and baseline",
        "A rack server has redundant power feeds, normal thermal readings and a stable hardware event log."
      ],
      [
        "Locate the failed boundary",
        "Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert."
      ],
      [
        "Test a competing explanation",
        "Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts."
      ],
      [
        "Recover and verify",
        "An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-16",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-16, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts. The proposed change must address only the demonstrated failed boundary. Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection. An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert."
      ],
      [
        "Competing explanation",
        "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color."
      ],
      [
        "Next discriminating test",
        "Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts."
      ],
      [
        "Supported conclusion and limit",
        "The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection."
      ],
      [
        "Recovery acceptance",
        "An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window."
      ]
    ],
    "mistakes": [
      "Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test.",
      "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color.",
      "Treating a green intermediate status as proof of the original application outcome. No. Trace the upstream circuits and failure domains; two healthy components can share one point of failure.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s6-g0-t0"
    ],
    "related": [
      "s6-g0-t0",
      "trouble-17"
    ],
    "incident": {
      "boundary": "Hardware evidence versus guest symptom",
      "baseline": "A rack server has redundant power feeds, normal thermal readings and a stable hardware event log.",
      "fault": "Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert.",
      "test": "Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts.",
      "diagnosis": "The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection.",
      "recovery": "An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.",
      "alternative": "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color.",
      "guard": "Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Server hardware troubleshooting. Hardware evidence versus guest symptom.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A rack server has redundant power feeds, normal thermal readings and a stable hardware event log.",
        "Observation boundary: Hardware evidence versus guest symptom",
        "Recovery target: An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test.",
        "Select Recovery and explain what each observation establishes: An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.",
        "Run python labs/troubleshooting-lab.py --topic trouble-16 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color."
      ],
      "verification": "An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color. Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test.",
      "challenge": "Both PSUs show green but connect to one PDU. Is feed independence established?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-16-Q1",
        "topicId": "trouble-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Server hardware troubleshooting case investigate?",
        "answer": "Hardware evidence versus guest symptom. The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-16-Q2",
        "topicId": "trouble-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A rack server has redundant power feeds, normal thermal readings and a stable hardware event log.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-16-Q3",
        "topicId": "trouble-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts.",
        "explanation": "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-16-Q4",
        "topicId": "trouble-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-16-Q5",
        "topicId": "trouble-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert. The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-16-Q6",
        "topicId": "trouble-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-16-Q7",
        "topicId": "trouble-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-16-Q8",
        "topicId": "trouble-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Both PSUs show green but connect to one PDU. Is feed independence established?",
        "answer": "No. Trace the upstream circuits and failure domains; two healthy components can share one point of failure.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-16-Q9",
        "topicId": "trouble-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Server hardware troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-16-Q10",
        "topicId": "trouble-16",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Server hardware troubleshooting incident.",
        "answer": "Scope: Hardware evidence versus guest symptom. Observation: Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert. Next test: Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts. Acceptance: An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-16-QC1",
        "topicId": "trouble-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "Guests remain running but the management controller records loss of PSU B input at the same time as a rack power alert.",
        "explanation": "The server has lost power redundancy despite continued service. The shared feed observation makes upstream power a candidate requiring inspection.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-16-QC2",
        "topicId": "trouble-16",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "An old unacknowledged alarm may not be active; correlate current sensor state and incident time rather than only alarm color.",
        "explanation": "Compare PSU identity, input state and PDU/feed map with timestamped events. Distinguish lost input from an internal PSU failure before replacing parts.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-16-QC3",
        "topicId": "trouble-16",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "An authorized operator restores the intended independent input; both supplies report healthy and the original workload remains stable through the observation window.",
        "explanation": "Electrical work is for qualified personnel. Do not pull the surviving feed or power-cycle a running host as a first test.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow array state, member identity and recoverability. RAID combines members according to a specific redundancy layout. Degraded service uses the remaining redundancy and may expose data to additional failures during recovery. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Nominal capacity: Layout-derived usable bytes. Excludes metadata and formatting.",
      "Survivability: Declared member-loss relation. Does not prove integrity.",
      "Backup: Independent recoverable copy. Must be restore-tested.",
      "Shared parent: draw the upstream power, chassis, controller, thermal or fabric dependency that can affect duplicated components together.",
      "Recovery record: retain exact scoped settings and original positive/negative operations with timestamps, ownership and sanitized evidence."
    ],
    "mechanism": [
      "RAID combines members according to a specific redundancy layout. Degraded service uses the remaining redundancy and may expose data to additional failures during recovery.",
      "A rebuild reconstructs the configured redundancy; it does not prove all application data is valid or recover a deleted file. Controller identity, member identity and an independent tested backup remain separate requirements.",
      "Array state, member identity and recoverability: The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector.",
      "Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement.",
      "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures."
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
    "glossary": {
      "Nominal capacity": "Layout-derived usable bytes. Excludes metadata and formatting.",
      "Survivability": "Declared member-loss relation. Does not prove integrity.",
      "Backup": "Independent recoverable copy. Must be restore-tested.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "Linux 6.6 MD array semantics",
        "url": "https://www.kernel.org/doc/html/v6.6/admin-guide/md.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Dell PowerEdge troubleshooting guide; controller-specific recovery",
        "url": "https://dl.dell.com/topicspdf/troubleshootingguide_en-us.pdf",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Hardware, RAID, rack, power and thermal concepts have no intrinsic TCP/UDP port. Fabric calculations use declared Gb/s link envelopes rather than a service port. For BMC management, HTTPS commonly uses TCP 443; Redfish is HTTPS-based. Optional SSH/IPMI/vendor services require explicit supported-version policy and are not automatically granted by this design.",
    "id": "trouble-17",
    "batch": "27",
    "title": "RAID troubleshooting",
    "subtitle": "Array state, member identity and recoverability",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-17",
    "definition": "RAID troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on array state, member identity and recoverability.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A documented four-member RAID 5 virtual disk is optimal with a verified independent backup. The incident to explain is: The virtual disk is degraded after one member is reported failed; applications still read data. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A documented four-member RAID 5 virtual disk is optimal with a verified independent backup. Observed failure: The virtual disk is degraded after one member is reported failed; applications still read data. Discriminating test: Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement. Interpretation: The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector. Recovery contract: Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.",
    "flow": [
      [
        "Scope and baseline",
        "A documented four-member RAID 5 virtual disk is optimal with a verified independent backup."
      ],
      [
        "Locate the failed boundary",
        "The virtual disk is degraded after one member is reported failed; applications still read data."
      ],
      [
        "Test a competing explanation",
        "Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement."
      ],
      [
        "Recover and verify",
        "Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-17",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-17, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement. The proposed change must address only the demonstrated failed boundary. Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector. A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "The virtual disk is degraded after one member is reported failed; applications still read data."
      ],
      [
        "Competing explanation",
        "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures."
      ],
      [
        "Next discriminating test",
        "Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement."
      ],
      [
        "Supported conclusion and limit",
        "The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector."
      ],
      [
        "Recovery acceptance",
        "Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference."
      ]
    ],
    "mistakes": [
      "Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain.",
      "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures.",
      "Treating a green intermediate status as proof of the original application outcome. Redundancy can preserve corrupted or deleted data; a rebuild does not validate an independent recovery point or application consistency.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s6-g1-t0"
    ],
    "related": [
      "s6-g1-t0",
      "trouble-18"
    ],
    "incident": {
      "boundary": "Array state, member identity and recoverability",
      "baseline": "A documented four-member RAID 5 virtual disk is optimal with a verified independent backup.",
      "fault": "The virtual disk is degraded after one member is reported failed; applications still read data.",
      "test": "Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement.",
      "diagnosis": "The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector.",
      "recovery": "Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.",
      "alternative": "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures.",
      "guard": "Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for RAID troubleshooting. Array state, member identity and recoverability.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A documented four-member RAID 5 virtual disk is optimal with a verified independent backup.",
        "Observation boundary: Array state, member identity and recoverability",
        "Recovery target: Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. The virtual disk is degraded after one member is reported failed; applications still read data.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain.",
        "Select Recovery and explain what each observation establishes: Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.",
        "Run python labs/troubleshooting-lab.py --topic trouble-17 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures."
      ],
      "verification": "Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures. Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain.",
      "challenge": "Rebuild is complete. Why test a backup restore separately?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-17-Q1",
        "topicId": "trouble-17",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this RAID troubleshooting case investigate?",
        "answer": "Array state, member identity and recoverability. The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-17-Q2",
        "topicId": "trouble-17",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A documented four-member RAID 5 virtual disk is optimal with a verified independent backup.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-17-Q3",
        "topicId": "trouble-17",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement.",
        "explanation": "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-17-Q4",
        "topicId": "trouble-17",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-17-Q5",
        "topicId": "trouble-17",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "The virtual disk is degraded after one member is reported failed; applications still read data. The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-17-Q6",
        "topicId": "trouble-17",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-17-Q7",
        "topicId": "trouble-17",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-17-Q8",
        "topicId": "trouble-17",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Rebuild is complete. Why test a backup restore separately?",
        "answer": "Redundancy can preserve corrupted or deleted data; a rebuild does not validate an independent recovery point or application consistency.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-17-Q9",
        "topicId": "trouble-17",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored RAID troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-17-Q10",
        "topicId": "trouble-17",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the RAID troubleshooting incident.",
        "answer": "Scope: Array state, member identity and recoverability. Observation: The virtual disk is degraded after one member is reported failed; applications still read data. Next test: Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement. Acceptance: Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-17-QC1",
        "topicId": "trouble-17",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "The virtual disk is degraded after one member is reported failed; applications still read data.",
        "explanation": "The array is serving data with reduced redundancy. Continued reads do not establish safety from a second failure or unreadable sector.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-17-QC2",
        "topicId": "trouble-17",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A cable/backplane/controller fault can make several members disappear together. Do not assume simultaneous disk media failures.",
        "explanation": "Capture controller/virtual-disk/member identifiers, error logs, rebuild state and backup status. Match enclosure/slot and serial number before proposing replacement.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-17-QC3",
        "topicId": "trouble-17",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Use the exact supported controller recovery procedure in an authorized lab; verify the correct member, completed rebuild/consistency status and application data against a known reference.",
        "explanation": "Do not initialize, force online, clear foreign metadata or replace guessed disks. Stop when member identity or recoverable state is uncertain.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow initiator to target through independent fabrics. FC connectivity passes through initiator and target login, effective zoning, LUN presentation and host path handling. Success at an early boundary does not prove the intended volume is accessible. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Initiator: Endpoint issuing storage commands. Its identity must match the intended host.",
      "Target: Endpoint servicing commands. Reachability alone does not expose a LUN.",
      "Shared block device: Blocks visible to multiple hosts. Concurrent access needs coordination."
    ],
    "mechanism": [
      "FC connectivity passes through initiator and target login, effective zoning, LUN presentation and host path handling. Success at an early boundary does not prove the intended volume is accessible.",
      "Multipath software combines paths to the same identified device under a supported policy. Shared fabric, controller or power dependencies can defeat apparent path redundancy.",
      "Initiator to target through independent fabrics: The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired.",
      "Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical.",
      "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence."
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
    "glossary": {
      "Initiator": "Endpoint issuing storage commands. Its identity must match the intended host.",
      "Target": "Endpoint servicing commands. Reachability alone does not expose a LUN.",
      "Shared block device": "Blocks visible to multiple hosts. Concurrent access needs coordination.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
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
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "id": "trouble-18",
    "batch": "27",
    "title": "SAN troubleshooting",
    "subtitle": "Initiator to target through independent fabrics",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-18",
    "definition": "SAN troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on initiator to target through independent fabrics.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. A host has the intended LUN through two independent FC fabrics and supported multipath behavior. The incident to explain is: After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: A host has the intended LUN through two independent FC fabrics and supported multipath behavior. Observed failure: After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears. Discriminating test: Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical. Interpretation: The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired. Recovery contract: Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.",
    "flow": [
      [
        "Scope and baseline",
        "A host has the intended LUN through two independent FC fabrics and supported multipath behavior."
      ],
      [
        "Locate the failed boundary",
        "After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears."
      ],
      [
        "Test a competing explanation",
        "Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical."
      ],
      [
        "Recover and verify",
        "Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-18",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-18, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical. The proposed change must address only the demonstrated failed boundary. Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired. Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears."
      ],
      [
        "Competing explanation",
        "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence."
      ],
      [
        "Next discriminating test",
        "Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical."
      ],
      [
        "Supported conclusion and limit",
        "The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired."
      ],
      [
        "Recovery acceptance",
        "Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy."
      ]
    ],
    "mistakes": [
      "Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity.",
      "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence.",
      "Treating a green intermediate status as proof of the original application outcome. No. Verify stable device/LUN identifiers and ownership; equal capacity does not establish identity or safe simultaneous access.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s8-g0-t3"
    ],
    "related": [
      "s8-g0-t3",
      "trouble-19"
    ],
    "incident": {
      "boundary": "Initiator to target through independent fabrics",
      "baseline": "A host has the intended LUN through two independent FC fabrics and supported multipath behavior.",
      "fault": "After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears.",
      "test": "Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical.",
      "diagnosis": "The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired.",
      "recovery": "Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.",
      "alternative": "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence.",
      "guard": "Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for SAN troubleshooting. Initiator to target through independent fabrics.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "A host has the intended LUN through two independent FC fabrics and supported multipath behavior.",
        "Observation boundary: Initiator to target through independent fabrics",
        "Recovery target: Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity.",
        "Select Recovery and explain what each observation establishes: Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.",
        "Run python labs/troubleshooting-lab.py --topic trouble-18 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence."
      ],
      "verification": "Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence. Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity.",
      "challenge": "A host sees a device with a familiar size. Is it safe to mount?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-18-Q1",
        "topicId": "trouble-18",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this SAN troubleshooting case investigate?",
        "answer": "Initiator to target through independent fabrics. The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-18-Q2",
        "topicId": "trouble-18",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "A host has the intended LUN through two independent FC fabrics and supported multipath behavior.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-18-Q3",
        "topicId": "trouble-18",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical.",
        "explanation": "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-18-Q4",
        "topicId": "trouble-18",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-18-Q5",
        "topicId": "trouble-18",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears. The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-18-Q6",
        "topicId": "trouble-18",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-18-Q7",
        "topicId": "trouble-18",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-18-Q8",
        "topicId": "trouble-18",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "A host sees a device with a familiar size. Is it safe to mount?",
        "answer": "No. Verify stable device/LUN identifiers and ownership; equal capacity does not establish identity or safe simultaneous access.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-18-Q9",
        "topicId": "trouble-18",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored SAN troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-18-Q10",
        "topicId": "trouble-18",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the SAN troubleshooting incident.",
        "answer": "Scope: Initiator to target through independent fabrics. Observation: After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears. Next test: Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical. Acceptance: Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-18-QC1",
        "topicId": "trouble-18",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "After a zoning edit, fabric A remains operational but the expected target login/path on fabric B disappears.",
        "explanation": "The first observed loss follows the changed fabric-B admission boundary. One surviving path explains service continuity while redundancy is impaired.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-18-QC2",
        "topicId": "trouble-18",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "Correct zoning without LUN masking still leaves the host without the intended device; each boundary needs its own evidence.",
        "explanation": "Trace HBA/WWPN login, effective zone membership, target port, LUN masking and host multipath inventory in order. Compare the two fabrics without assuming they are identical.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-18-QC3",
        "topicId": "trouble-18",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore the intended narrowly scoped zone membership; verify target visibility, correct LUN identity, multipath state and controlled failover under the supported policy.",
        "explanation": "Do not merge fabrics, zone every initiator to every target or rescan blindly during uncertain storage state. Preserve WWPN and LUN identity.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow guest, vmkernel, management and storage scope. The hypervisor management plane, guest network and datastore I/O can fail independently or share dependencies. Diagnose using correlated host and guest observations. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "VMkernel: Core hypervisor resource and I/O services. It differs from a guest kernel.",
      "Host management: Administrative control of one host. Management availability is narrower than guest health.",
      "Compatibility: Supported hardware/software combination. An apparently working driver is not support evidence."
    ],
    "mechanism": [
      "The hypervisor management plane, guest network and datastore I/O can fail independently or share dependencies. Diagnose using correlated host and guest observations.",
      "APD describes loss of all paths without the same explicit permanent-loss indication as PDL. The supplied case requires path investigation and supported recovery, not an assumption that data has been destroyed.",
      "Guest, VMkernel, management and storage scope: The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss.",
      "Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report.",
      "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore."
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
    "glossary": {
      "VMkernel": "Core hypervisor resource and I/O services. It differs from a guest kernel.",
      "Host management": "Administrative control of one host. Management availability is narrower than guest health.",
      "Compatibility": "Supported hardware/software combination. An apparently working driver is not support evidence.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
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
      },
      {
        "title": "Broadcom: ESXi all-paths-down conditions",
        "url": "https://knowledge.broadcom.com/external/article/318938/esxi-hosts-in-all-paths-down-apd-conditi.html",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Transport scope matters: native FC and FCoE are not TCP services. Ordinary NFSv4/TCP uses 2049, direct SMB/TCP 445, and iSCSI/TCP 3260. NVMe-oF depends on the selected transport. Hypervisor management, migration and guest traffic require separate documented paths; a feature name does not imply one universal port. Apply only the endpoints needed by the chosen protocol and release.",
    "id": "trouble-19",
    "batch": "27",
    "title": "VMware troubleshooting",
    "subtitle": "Guest, VMkernel, management and storage scope",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-19",
    "definition": "VMware troubleshooting is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on guest, vmkernel, management and storage scope.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. An ESXi host is manageable and a VM can perform an application read from its datastore. The incident to explain is: Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: An ESXi host is manageable and a VM can perform an application read from its datastore. Observed failure: Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable. Discriminating test: Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report. Interpretation: The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss. Recovery contract: Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.",
    "flow": [
      [
        "Scope and baseline",
        "An ESXi host is manageable and a VM can perform an application read from its datastore."
      ],
      [
        "Locate the failed boundary",
        "Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable."
      ],
      [
        "Test a competing explanation",
        "Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report."
      ],
      [
        "Recover and verify",
        "Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-19",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-19, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      },
      {
        "filename": "guided-esxi-storage.txt",
        "platform": "ESXi 8.x target; guided and unexecuted; match target CLI help; guided reference, not executed for Batch 27",
        "code": "esxcli storage core adapter list\nesxcli storage core path list\nesxcli storage filesystem list",
        "explanation": "Collect adapter, path and mounted-volume views without rescanning or changing devices. Correlate device identifiers across the three views. Match observer/interface identity to the case. This inspection establishes only its own boundary; it does not execute the synthetic repair.",
        "expected": "Adapter inventory, path state and datastore identity. These views are separate from guest filesystem integrity or application health."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report. The proposed change must address only the demonstrated failed boundary. Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss. CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable."
      ],
      [
        "Competing explanation",
        "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore."
      ],
      [
        "Next discriminating test",
        "Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report."
      ],
      [
        "Supported conclusion and limit",
        "The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss."
      ],
      [
        "Recovery acceptance",
        "Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure."
      ]
    ],
    "mistakes": [
      "Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance.",
      "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore.",
      "Treating a green intermediate status as proof of the original application outcome. No. Bound the management-plane incident, preserve running workloads and inspect the vCenter dependencies independently.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s8-g5-t0"
    ],
    "related": [
      "s8-g5-t0",
      "trouble-20"
    ],
    "incident": {
      "boundary": "Guest, VMkernel, management and storage scope",
      "baseline": "An ESXi host is manageable and a VM can perform an application read from its datastore.",
      "fault": "Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable.",
      "test": "Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report.",
      "diagnosis": "The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss.",
      "recovery": "Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.",
      "alternative": "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore.",
      "guard": "Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for VMware troubleshooting. Guest, VMkernel, management and storage scope.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "An ESXi host is manageable and a VM can perform an application read from its datastore.",
        "Observation boundary: Guest, VMkernel, management and storage scope",
        "Recovery target: Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance.",
        "Select Recovery and explain what each observation establishes: Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.",
        "Run python labs/troubleshooting-lab.py --topic trouble-19 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore."
      ],
      "verification": "Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore. Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance.",
      "challenge": "vCenter is down but guests work. Should all hosts be restarted?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-19-Q1",
        "topicId": "trouble-19",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this VMware troubleshooting case investigate?",
        "answer": "Guest, VMkernel, management and storage scope. The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-19-Q2",
        "topicId": "trouble-19",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "An ESXi host is manageable and a VM can perform an application read from its datastore.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-19-Q3",
        "topicId": "trouble-19",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report.",
        "explanation": "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-19-Q4",
        "topicId": "trouble-19",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-19-Q5",
        "topicId": "trouble-19",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable. The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-19-Q6",
        "topicId": "trouble-19",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-19-Q7",
        "topicId": "trouble-19",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-19-Q8",
        "topicId": "trouble-19",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "vCenter is down but guests work. Should all hosts be restarted?",
        "answer": "No. Bound the management-plane incident, preserve running workloads and inspect the vCenter dependencies independently.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-19-Q9",
        "topicId": "trouble-19",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored VMware troubleshooting records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-19-Q10",
        "topicId": "trouble-19",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the VMware troubleshooting incident.",
        "answer": "Scope: Guest, VMkernel, management and storage scope. Observation: Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable. Next test: Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report. Acceptance: Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-19-QC1",
        "topicId": "trouble-19",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "Management remains reachable while VM I/O stalls; host evidence shows all paths to that datastore unavailable.",
        "explanation": "The affected dependency is datastore access despite a functioning management plane. The fixture reports all-path unavailability, not proof of permanent data loss.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-19-QC2",
        "topicId": "trouble-19",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "CPU ready time or guest service faults can also cause apparent slowness. Check whether symptoms correlate specifically with the affected datastore.",
        "explanation": "Correlate VM symptoms with host storage/path events, datastore identity and fabric/array observations. Distinguish management health from guest I/O and APD from an explicit permanent-loss report.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-19-QC3",
        "topicId": "trouble-19",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Restore the supported storage path, verify host/datastore accessibility and a fresh application I/O operation; reconcile HA/restart effects and consistency before closure.",
        "explanation": "Do not mass-reboot hosts, detach active devices or delete/recreate a datastore. Capture support evidence and follow release-specific recovery guidance.",
        "testedConcept": "Recovery"
      }
    ]
  },
  {
    "mental": "Think of diagnosis as tracing a delivery receipt through successive boundaries: the last confirmed handoff narrows the next question but does not prove the final delivery. In this case, follow timeline, common dependencies and recovery order. An outage can cross otherwise separate racks through DNS, identity, time, storage or management dependencies. Model the service transaction and common dependencies rather than counting apparently redundant boxes. The analogy only organizes observations; it cannot discover topology, measure a fault or replace the platform evidence.",
    "components": [
      "Recovery point: Usable retained state. A recent copy may be inconsistent.",
      "Recovery sequence: Ordered dependency restoration. Applications can depend on identity and DNS.",
      "Exercise: Observed restoration test. A written plan is not recovery evidence."
    ],
    "mechanism": [
      "An outage can cross otherwise separate racks through DNS, identity, time, storage or management dependencies. Model the service transaction and common dependencies rather than counting apparently redundant boxes.",
      "Mitigation, restoration and root-cause analysis are distinct activities. Assign coordination, preserve a timeline with clock uncertainty, validate user-visible recovery and track corrective actions with owners.",
      "Timeline, common dependencies and recovery order: The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test.",
      "Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner.",
      "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery."
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
    "glossary": {
      "Recovery point": "Usable retained state. A recent copy may be inconsistent.",
      "Recovery sequence": "Ordered dependency restoration. Applications can depend on identity and DNS.",
      "Exercise": "Observed restoration test. A written plan is not recovery evidence.",
      "Discriminating test": "An observation whose possible outcomes separate at least two competing explanations.",
      "Recovery contract": "The original intended operation and its protected boundaries, measured again after a bounded change.",
      "Evidence epoch": "An interval during which observer identity and counter continuity are comparable."
    },
    "sources": [
      {
        "title": "NIST SP 800-34 Rev 1 contingency planning",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "Google SRE: incident response",
        "url": "https://sre.google/workbook/incident-response/",
        "checked": "2026-10-09"
      }
    ],
    "ports": "Transport depends on the selected operation: HTTPS commonly uses TCP 443, SSH TCP 22, NETCONF over SSH has assigned TCP 830, and ordinary SNMP polling uses UDP 161 with notifications commonly on UDP 162. These are protocol conventions, not a blanket firewall policy. Local parsing, Git object inspection and the offline lab need no device connection. Verify the actual listener, transport, management scope and return path before permitting traffic.",
    "id": "trouble-20",
    "batch": "27",
    "title": "Data center outage analysis",
    "subtitle": "Timeline, common dependencies and recovery order",
    "level": "Applied diagnosis → Recovery evidence",
    "minutes": 50,
    "interactive": "tm-trouble-20",
    "definition": "Data center outage analysis is the disciplined isolation of a failed boundary, using observations that distinguish competing explanations. This lesson focuses on timeline, common dependencies and recovery order.",
    "purpose": "Restore the original service without enlarging the fault or weakening its access boundaries. Two application racks have separate compute capacity and an agreed client availability objective. The incident to explain is: At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable. A plausible diagnosis is a starting hypothesis; closure requires a repeatable postcondition.",
    "example": "Synthetic worked incident. Baseline: Two application racks have separate compute capacity and an agreed client availability objective. Observed failure: At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable. Discriminating test: Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner. Interpretation: The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test. Recovery contract: Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.",
    "flow": [
      [
        "Scope and baseline",
        "Two application racks have separate compute capacity and an agreed client availability objective."
      ],
      [
        "Locate the failed boundary",
        "At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable."
      ],
      [
        "Test a competing explanation",
        "Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner."
      ],
      [
        "Recover and verify",
        "Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners."
      ]
    ],
    "commands": [
      {
        "filename": "troubleshooting-lab.txt",
        "platform": "Python 3.10+ standard library; course root",
        "code": "python labs/troubleshooting-lab.py --topic trouble-20",
        "explanation": "Print the labelled authored incident and its required observations. This mode is read-only and makes no network or device calls.",
        "expected": "JSON with scope AUTHORED, topic trouble-20, baseline, fault, test, diagnosis and recovery; these are supplied teaching records."
      }
    ],
    "configuration": "First record target identity, administrative scope and the captured baseline. Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner. The proposed change must address only the demonstrated failed boundary. Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes. Rehearse the change and reversal on an owned compatible lab platform; retain the exact pre-change state rather than inventing vendor syntax. If the postcondition regresses, stop expansion and restore that captured state through the independent management path.",
    "production": "Separate severity from certainty: declare the impact, owner and observation window before investigating. The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test. A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery. Choose the least disruptive observation that discriminates between these explanations. Mitigation may restore service before the full causal story is known; document that distinction and schedule unresolved causes for follow-up.",
    "security": "Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes. Retain only sanitized evidence with target identity and timestamps. Keep captures, configuration exports and logs within the authorized lab scope. Verify that the recovery preserves denied traffic or unauthorized access boundaries as well as the intended successful operation.",
    "performance": "Compare equivalent workload and sampling intervals before and after the change. Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners. Separate a lifetime count from an interval rate, and service reachability from latency, throughput and resilience. These synthetic incident records do not supply measured production performance or convergence timing.",
    "troubleshooting": [
      [
        "Observed incident",
        "At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable."
      ],
      [
        "Competing explanation",
        "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery."
      ],
      [
        "Next discriminating test",
        "Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner."
      ],
      [
        "Supported conclusion and limit",
        "The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test."
      ],
      [
        "Recovery acceptance",
        "Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners."
      ]
    ],
    "mistakes": [
      "Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes.",
      "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery.",
      "Treating a green intermediate status as proof of the original application outcome. No. Twelve minutes is an observed impact duration for this fixture; recovery point/data loss needs independent data evidence.",
      "Changing multiple independent variables before preserving the failing observation; that destroys the ability to attribute recovery."
    ],
    "prerequisites": [
      "s9-g6-t1"
    ],
    "related": [
      "s9-g6-t1",
      "capstone-final"
    ],
    "incident": {
      "boundary": "Timeline, common dependencies and recovery order",
      "baseline": "Two application racks have separate compute capacity and an agreed client availability objective.",
      "fault": "At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable.",
      "test": "Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner.",
      "diagnosis": "The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test.",
      "recovery": "Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.",
      "alternative": "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery.",
      "guard": "Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes.",
      "scope": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair."
    },
    "artifacts": [
      {
        "title": "21-case evidence workbook",
        "path": "labs/troubleshooting-workbook.md"
      },
      {
        "title": "Local fault/recovery rehearsal and read-only case inspector",
        "path": "labs/troubleshooting-lab.py"
      }
    ],
    "lab": {
      "objective": "Produce a defensible incident record for Data center outage analysis. Timeline, common dependencies and recovery order.",
      "requirements": "Browser and notes. Python 3.10+ is optional for the local lab. Hardware and vendor extensions require an owned compatible environment and its release-specific procedure; no platform configuration is executed by the course.",
      "topology": [
        "Two application racks have separate compute capacity and an agreed client availability objective.",
        "Observation boundary: Timeline, common dependencies and recovery order",
        "Recovery target: Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners."
      ],
      "steps": [
        "Read Baseline and write the intended operation and observer.",
        "Select Fault; write two hypotheses before revealing the proposed test. At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable.",
        "Choose the least disruptive next observation. Predict how it separates your hypotheses.",
        "Reveal the diagnostic test and compare your prediction: Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner.",
        "Write the bounded repair, original state to restore, stop condition and independent access path. Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes.",
        "Select Recovery and explain what each observation establishes: Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.",
        "Run python labs/troubleshooting-lab.py --topic trouble-20 to inspect the same authored evidence without a browser.",
        "Run python labs/troubleshooting-lab.py --run for a separate actual local-file fault, detection, restoration and cleanup exercise. Do not call its result a device repair.",
        "Complete the workbook record, including the remaining alternative: A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery."
      ],
      "verification": "Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners. Submit a timestamped baseline/fault/test/recovery record, label all supplied evidence synthetic, and state untested platform behavior.",
      "troubleshooting": "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery. Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes.",
      "challenge": "Service is restored at 09:12 after impact starts at 09:00. Does that prove RPO zero?",
      "cleanup": "Reset the browser case. The read-only inspector changes nothing; the executable lab restores and removes only its own temporary directory even during the supported injected interruption. Optional platform work must restore its captured baseline and verify the original service."
    },
    "exams": [
      {
        "questionId": "trouble-20-Q1",
        "topicId": "trouble-20",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What exact boundary does this Data center outage analysis case investigate?",
        "answer": "Timeline, common dependencies and recovery order. The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test.",
        "explanation": "Name a boundary supported by the observations, not an entire device as a guessed root cause.",
        "testedConcept": "Fault scope"
      },
      {
        "questionId": "trouble-20-Q2",
        "topicId": "trouble-20",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Which baseline observation matters when interpreting this incident?",
        "answer": "Two application racks have separate compute capacity and an agreed client availability objective.",
        "explanation": "A baseline identifies the intended operation and allows comparable recovery checks.",
        "testedConcept": "Baseline"
      },
      {
        "questionId": "trouble-20-Q3",
        "topicId": "trouble-20",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the strongest next test for the supplied failure?",
        "answer": "Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner.",
        "explanation": "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery.",
        "testedConcept": "Discriminating test"
      },
      {
        "questionId": "trouble-20-Q4",
        "topicId": "trouble-20",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What competing explanation must remain open until tested?",
        "answer": "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery.",
        "explanation": "An observed symptom is compatible with more than one cause; preserve uncertainty until the test separates them.",
        "testedConcept": "Alternative hypothesis"
      },
      {
        "questionId": "trouble-20-Q5",
        "topicId": "trouble-20",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "Which observation supports your diagnosis, and what does it not establish?",
        "answer": "At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable. The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test.",
        "explanation": "Intermediate state should be interpreted at its own boundary.",
        "testedConcept": "Evidence interpretation"
      },
      {
        "questionId": "trouble-20-Q6",
        "topicId": "trouble-20",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What change guard and rollback preparation apply to this case?",
        "answer": "Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes. Preserve the exact owned baseline and stop if the original operation worsens.",
        "explanation": "A repair without a known target and reversal can turn a bounded incident into a broader one.",
        "testedConcept": "Safe recovery"
      },
      {
        "questionId": "trouble-20-Q7",
        "topicId": "trouble-20",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What evidence is required to close this specific incident?",
        "answer": "Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.",
        "explanation": "Repeat the original operation and check protected boundaries, not merely the action completion message.",
        "testedConcept": "Acceptance"
      },
      {
        "questionId": "trouble-20-Q8",
        "topicId": "trouble-20",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Service is restored at 09:12 after impact starts at 09:00. Does that prove RPO zero?",
        "answer": "No. Twelve minutes is an observed impact duration for this fixture; recovery point/data loss needs independent data evidence.",
        "explanation": "Use the mechanism and evidence boundary to separate the two claims.",
        "testedConcept": "Transfer"
      },
      {
        "questionId": "trouble-20-Q9",
        "topicId": "trouble-20",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Which claim would exceed the browser exercise evidence?",
        "answer": "Claiming an actual device failure, hardware repair or measured convergence from these authored Data center outage analysis records.",
        "explanation": "Authored tabletop evidence; browser selection does not execute a device change, reproduce timing or prove a physical repair.",
        "testedConcept": "Evidence scope"
      },
      {
        "questionId": "trouble-20-Q10",
        "topicId": "trouble-20",
        "difficulty": "advanced",
        "type": "short-answer",
        "question": "Write a compact handoff for the Data center outage analysis incident.",
        "answer": "Scope: Timeline, common dependencies and recovery order. Observation: At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable. Next test: Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner. Acceptance: Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.",
        "explanation": "Include observer/time, owner, open hypothesis and bounded next action so another operator can reproduce the reasoning.",
        "testedConcept": "Incident handoff"
      }
    ],
    "quick": [
      {
        "questionId": "trouble-20-QC1",
        "topicId": "trouble-20",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "What is the first known failing observation?",
        "answer": "At 09:00 a shared DNS service fails; both racks lose name-based application access while direct addressed test endpoints remain reachable.",
        "explanation": "The evidence favors a shared name-resolution dependency over simultaneous independent compute failures. Correlation narrows the hypothesis but still requires a confirming test.",
        "testedConcept": "Observation"
      },
      {
        "questionId": "trouble-20-QC2",
        "topicId": "trouble-20",
        "difficulty": "foundational",
        "type": "short-answer",
        "question": "Why should the alternative hypothesis be recorded?",
        "answer": "A direct-IP probe may bypass TLS host naming or a load balancer; use it only to isolate a boundary, not to claim application recovery.",
        "explanation": "Build a timestamped impact/dependency map with clock uncertainty; compare DNS queries, direct endpoint tests and recent changes. Assign incident coordination and a separate recovery owner.",
        "testedConcept": "Uncertainty"
      },
      {
        "questionId": "trouble-20-QC3",
        "topicId": "trouble-20",
        "difficulty": "intermediate",
        "type": "short-answer",
        "question": "What is the minimum recovery evidence?",
        "answer": "Recover the scoped DNS dependency, verify name-based transactions from both racks and denied controls, then observe sustained service before closing and record follow-up owners.",
        "explanation": "Preserve the incident timeline and independent communication channel. Prefer reversible mitigation; never perform competing uncoordinated changes.",
        "testedConcept": "Recovery"
      }
    ]
  }
];
