'use strict';
(() => {
const lessons = [
  {
    "id": "s4-g0-t0",
    "batch": "11",
    "title": "DHCP Server",
    "subtitle": "Allocate a lease from the intended scope without confusing allocation with connectivity.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-dhcp-server",
    "definition": "A DHCPv4 server maintains address bindings and delivers configuration options to clients. A scope represents the intended subnet and allocatable range; exclusions protect infrastructure addresses, while reservations bind a chosen address to an identified client. The binding database is operational state, not merely a list of configured pools. This advanced lesson follows allocation, renewal, exhaustion and address-conflict evidence separately from the introductory DHCP exchange.",
    "purpose": "Allocate a lease from the intended scope without confusing allocation with connectivity. Define nonoverlapping subnet scopes, gateway/DNS options, exclusions, lease duration and intended client identifiers. Preserve binding state and conflict records before changing reservations. Use a supported redundancy design rather than assuming two independently overlapping pools form failover.",
    "mental": "Use a three-column evidence notebook for DHCP Server: prerequisite, observation and conclusion. A selecting client broadcasts Discover, receives Offer, broadcasts Request identifying its choice and receives Ack if allocation is accepted. An Offer alone is not a committed lease. Record the client identifier, transaction and selected server; a MAC-only assumption can miss clients using a different identifier. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Scope matches client subnet: The allocatable pool corresponds to this client segment.",
      "Usable capacity remains: At least one nonexcluded usable address is available.",
      "Options match intended services: Supplied gateway and DNS options match the lab design.",
      "Observation point: Compare committed client bindings and pool capacity; inspect scoped configuration separately.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "A selecting client broadcasts Discover, receives Offer, broadcasts Request identifying its choice and receives Ack if allocation is accepted. An Offer alone is not a committed lease. Record the client identifier, transaction and selected server; a MAC-only assumption can miss clients using a different identifier.",
      "In the usual default timer case, T1 is half the lease and T2 is seven eighths. The bound client first renews toward its server, then rebinding can contact other servers. Explicit server timer options can override defaults. At lease expiry the client must stop using the address unless it obtained a valid extension.",
      "A correctly selected pool can still be exhausted or administratively disabled. A valid lease can deliver incorrect gateway or DNS options. Inspect offered options and client bindings before diagnosing routing. Restore a deliberately exhausted disposable pool without deleting unrelated leases or starting a rogue server on an uplink.",
      "The first decisive boundary in this worksheet is Scope matches client subnet. A wrong scope must be repaired at subnet selection; increasing its size does not fix selection.",
      "The later evidence boundaries are Usable capacity remains and Options match intended services. Exhaustion can suppress allocation despite a healthy server process. A valid address with a wrong gateway or DNS still breaks the intended client experience."
    ],
    "flow": [
      [
        "DHCP Server context",
        "Allocate a lease from the intended scope without confusing allocation with connectivity. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Scope matches client subnet",
        "The allocatable pool corresponds to this client segment. A wrong scope must be repaired at subnet selection; increasing its size does not fix selection."
      ],
      [
        "Usable capacity remains",
        "At least one nonexcluded usable address is available. Exhaustion can suppress allocation despite a healthy server process."
      ],
      [
        "Options match intended services",
        "Supplied gateway and DNS options match the lab design. A valid address with a wrong gateway or DNS still breaks the intended client experience."
      ]
    ],
    "comparison": [
      [
        "Scope matches client subnet",
        "The allocatable pool corresponds to this client segment.",
        "A wrong scope must be repaired at subnet selection; increasing its size does not fix selection."
      ],
      [
        "Usable capacity remains",
        "At least one nonexcluded usable address is available.",
        "Exhaustion can suppress allocation despite a healthy server process."
      ],
      [
        "Options match intended services",
        "Supplied gateway and DNS options match the lab design.",
        "A valid address with a wrong gateway or DNS still breaks the intended client experience."
      ]
    ],
    "example": "An operator investigating DHCP Server has an apparently healthy management path. Client has a lease but names fail; what evidence comes next? Inspect the delivered DNS option and query that resolver. Address allocation and usable naming are separate; pool capacity does not establish correct resolver configuration. Compare that observation with the separate recovery question: Expired lease, no extension; may the address remain in use? No; stop using that lease address. An expired dynamic lease is no longer a valid permission to use the address. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "DHCPv4 uses UDP server67/client68. DHCPv6 uses UDP 547/546 and has different message and relay behavior; this worksheet is DHCPv4.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show ip dhcp binding\nshow ip dhcp pool",
        "platform": "Cisco IOS XE17 supported lab router · GUIDED NOT EXECUTED",
        "explanation": "Compare committed client bindings and pool capacity; inspect scoped configuration separately.",
        "expected": "A binding and available capacity must be correlated with actual client options and a valid lease."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior DHCP Server settings, version and consuming attachment before any change. Define nonoverlapping subnet scopes, gateway/DNS options, exclusions, lease duration and intended client identifiers. Preserve binding state and conflict records before changing reservations. Use a supported redundancy design rather than assuming two independently overlapping pools form failover. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define nonoverlapping subnet scopes, gateway/DNS options, exclusions, lease duration and intended client identifiers. Preserve binding state and conflict records before changing reservations. Use a supported redundancy design rather than assuming two independently overlapping pools form failover.",
    "troubleshooting": [
      [
        "Scope matches client subnet boundary fails",
        "A wrong scope must be repaired at subnet selection; increasing its size does not fix selection. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Usable capacity remains boundary fails",
        "Exhaustion can suppress allocation despite a healthy server process. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Options match intended services boundary fails",
        "A valid address with a wrong gateway or DNS still breaks the intended client experience. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "DHCPv4 provides no general client/server identity protection by itself. Limit trusted server/relay attachment, review snooping policy where supported and protect configuration backups containing reservations. A reserved address is not access authorization.",
    "performance": "What tradeoff comes with a shorter lease? Faster reclamation with more renewal work and outage sensitivity. Lease time affects allocation churn; it does not automatically make DNS or routing converge faster. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "T1 commonly defaults to half the lease; explicitly supplied timer values take precedence.",
      "Address allocation and usable naming are separate; pool capacity does not establish correct resolver configuration.",
      "Infrastructure addresses must be protected from dynamic allocation; an address conflict can exist before exhaustion.",
      "Lease time affects allocation churn; it does not automatically make DNS or routing converge faster."
    ],
    "prerequisites": [
      "s1-g2-t0",
      "s0-g1-t3"
    ],
    "related": [
      "s4-g0-t1"
    ],
    "lab": {
      "objective": "Allocate a lease from the intended scope without confusing allocation with connectivity. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → DHCP Server endpoint",
        "Boundary: Scope matches client subnet → Usable capacity remains → Options match intended services",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On a disconnected lab segment192.0.2.0/24, reserve/exclude gateway192.0.2.1 and server192.0.2.10. Define owned pool LAB with network192.0.2.0/24, gateway192.0.2.1 and intended resolver192.0.2.53; choose an explicit lease and record actual client identifier. Validate syntax on the target before applying.",
        "In the disposable pool, deliberately remove usable dynamic capacity without touching other scopes. Record server capacity and the client exchange; restore the original range/exclusions rather than deleting unrelated bindings.",
        "Obtain a fresh client Ack, inspect address/prefix/gateway/DNS and binding lifetime, then test the intended resolver and gateway separately.",
        "Open the DHCP Server evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A wrong scope must be repaired at subnet selection; increasing its size does not fix selection. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Exhaustion can suppress allocation despite a healthy server process. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A valid address with a wrong gateway or DNS still breaks the intended client experience. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define nonoverlapping subnet scopes, gateway/DNS options, exclusions, lease duration and intended client identifiers. Preserve binding state and conflict records before changing reservations. Use a supported redundancy design rather than assuming two independently overlapping pools form failover."
      ],
      "verification": "A binding and available capacity must be correlated with actual client options and a valid lease. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A wrong scope must be repaired at subnet selection; increasing its size does not fix selection. Exhaustion can suppress allocation despite a healthy server process. A valid address with a wrong gateway or DNS still breaks the intended client experience. Separate invalid inputs from a valid negative service result.",
      "challenge": "How do you demonstrate recovery from exhaustion? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Scope matches client subnet": "The allocatable pool corresponds to this client segment.",
      "Usable capacity remains": "At least one nonexcluded usable address is available.",
      "Options match intended services": "Supplied gateway and DNS options match the lab design."
    },
    "sources": [
      {
        "title": "RFC 2131",
        "url": "https://www.rfc-editor.org/rfc/rfc2131.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Offer observed; may the client assume a committed lease?",
        "answer": "No; complete the selecting exchange and obtain Ack.",
        "explanation": "An Offer advertises a proposed allocation; it is not the final acknowledgement of the chosen binding.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Offer observed; may the client assume a committed lease?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-QC1"
      },
      {
        "question": "A default eight-hour lease reaches T1; which action is expected?",
        "answer": "Renew toward the allocating server at four hours.",
        "explanation": "T1 commonly defaults to half the lease; explicitly supplied timer values take precedence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A default eight-hour lease reaches T1; which action is expected?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-QC2"
      },
      {
        "question": "What is the default T2 for an eight-hour lease?",
        "answer": "Seven hours.",
        "explanation": "Rebinding usually starts at seven eighths of the lease so another reachable server may extend it.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What is the default T2 for an eight-hour lease?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "DHCP Server — Offer observed; may the client assume a committed lease?",
        "answer": "No; complete the selecting exchange and obtain Ack.",
        "explanation": "An Offer advertises a proposed allocation; it is not the final acknowledgement of the chosen binding.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Offer observed; may the client assume a committed lease?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q01",
        "options": [
          "No; complete the selecting exchange and obtain Ack.",
          "Yes, Offer is a permanent allocation.",
          "Yes, any broadcast commits every server.",
          "Only the gateway commits leases."
        ]
      },
      {
        "question": "DHCP Server — A default eight-hour lease reaches T1; which action is expected?",
        "answer": "Renew toward the allocating server at four hours.",
        "explanation": "T1 commonly defaults to half the lease; explicitly supplied timer values take precedence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A default eight-hour lease reaches T1; which action is expected?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q02"
      },
      {
        "question": "DHCP Server — What is the default T2 for an eight-hour lease?",
        "answer": "Seven hours.",
        "explanation": "Rebinding usually starts at seven eighths of the lease so another reachable server may extend it.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What is the default T2 for an eight-hour lease?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q03"
      },
      {
        "question": "DHCP Server — Client has a lease but names fail; what evidence comes next?",
        "answer": "Inspect the delivered DNS option and query that resolver.",
        "explanation": "Address allocation and usable naming are separate; pool capacity does not establish correct resolver configuration.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Client has a lease but names fail; what evidence comes next?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q04"
      },
      {
        "question": "DHCP Server — Does a reservation authenticate the client?",
        "answer": "No.",
        "explanation": "Client identifiers guide address selection; they do not establish a protected identity or authorization policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does a reservation authenticate the client?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q05"
      },
      {
        "question": "DHCP Server — Pool is free but a gateway address is leased; what is missing?",
        "answer": "An appropriate exclusion or controlled allocation policy.",
        "explanation": "Infrastructure addresses must be protected from dynamic allocation; an address conflict can exist before exhaustion.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Pool is free but a gateway address is leased; what is missing?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q06"
      },
      {
        "question": "DHCP Server — Two overlapping independent servers are configured; is failover established?",
        "answer": "No; use an explicit supported coordination design.",
        "explanation": "Independent overlapping allocation can create conflicts; redundancy needs binding coordination or a designed split scope.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Two overlapping independent servers are configured; is failover established?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q07"
      },
      {
        "question": "DHCP Server — Expired lease, no extension; may the address remain in use?",
        "answer": "No; stop using that lease address.",
        "explanation": "An expired dynamic lease is no longer a valid permission to use the address.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Expired lease, no extension; may the address remain in use?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q08"
      },
      {
        "question": "DHCP Server — What tradeoff comes with a shorter lease?",
        "answer": "Faster reclamation with more renewal work and outage sensitivity.",
        "explanation": "Lease time affects allocation churn; it does not automatically make DNS or routing converge faster.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What tradeoff comes with a shorter lease?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q09"
      },
      {
        "question": "DHCP Server — How do you demonstrate recovery from exhaustion?",
        "answer": "Restore owned capacity, obtain a new valid lease and verify its options from the original client.",
        "explanation": "A pool display alone proves neither a completed exchange nor the delivered configuration.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you demonstrate recovery from exhaustion?",
        "topicId": "s4-g0-t0",
        "questionId": "s4-g0-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g0-t1",
    "batch": "11",
    "title": "DHCP Relay",
    "subtitle": "Carry DHCP across a router while preserving the client-subnet selection evidence.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-dhcp-relay",
    "definition": "A DHCPv4 relay forwards client messages between a broadcast domain and a remote server. It supplies relay context so the server can select the client subnet rather than the relay-to-server transit subnet. The giaddr field is central to conventional subnet selection and reply routing; Option82 can add attachment information under an explicitly defined trust policy. A relay is neither an address allocator nor a generic broadcast flood across the network.",
    "purpose": "Carry DHCP across a router while preserving the client-subnet selection evidence. Attach the relay to the actual client L3 interface, identify the intended server and client subnet, and inspect helper forwarding behavior for the chosen release. Preserve helper addresses and option policies before one isolated change; restore exact interface attachment after testing.",
    "mental": "Use a three-column evidence notebook for DHCP Relay: prerequisite, observation and conclusion. A client broadcast reaches the relay on its client-facing interface. The relay supplies the appropriate giaddr and forwards toward a configured server. The server selects a pool using relay context rather than the IP source of the original unconfigured client. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Correct relay subnet context: giaddr maps to the intended client subnet.",
      "Server accepts relay policy: Relay information is accepted under the defined trust policy.",
      "Reply reaches client segment: Server-to-relay and relay-to-client paths are supplied as ready.",
      "Observation point: Inspect helper attachment and the route to the owned server; obtain packet evidence separately.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "A client broadcast reaches the relay on its client-facing interface. The relay supplies the appropriate giaddr and forwards toward a configured server. The server selects a pool using relay context rather than the IP source of the original unconfigured client.",
      "The return must reach the relay and then the client using applicable message flags and client state. A working forward path is insufficient if ACLs, routing or relay handling break replies. Record server-side and client-side observations for the same transaction.",
      "Option82 circuit/remote identifiers can refine server policy. Decide where they are inserted, whether untrusted received options are rejected or replaced, and where they are removed. Test incorrect giaddr separately from a missing return path; do not solve either by enlarging an unrelated scope.",
      "The first decisive boundary in this worksheet is Correct relay subnet context. An incorrect giaddr can select the wrong pool even when the server is reachable.",
      "The later evidence boundaries are Server accepts relay policy and Reply reaches client segment. A policy rejection is not the same as packet loss or an exhausted pool. Forward delivery does not prove the reply returned to the original client."
    ],
    "flow": [
      [
        "DHCP Relay context",
        "Carry DHCP across a router while preserving the client-subnet selection evidence. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Correct relay subnet context",
        "giaddr maps to the intended client subnet. An incorrect giaddr can select the wrong pool even when the server is reachable."
      ],
      [
        "Server accepts relay policy",
        "Relay information is accepted under the defined trust policy. A policy rejection is not the same as packet loss or an exhausted pool."
      ],
      [
        "Reply reaches client segment",
        "Server-to-relay and relay-to-client paths are supplied as ready. Forward delivery does not prove the reply returned to the original client."
      ]
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
    "example": "An operator investigating DHCP Relay has an apparently healthy management path. Discover reaches server but no reply reaches client; where next? Inspect server reply routing and relay-to-client handling. A forward packet observation proves only that direction of the exchange. Compare that observation with the separate recovery question: What confirms a restored relay? The original client completes an exchange and receives intended subnet options. Restored configuration should be corroborated by both transaction and client state. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Conventional DHCPv4 relay/server exchanges use UDP 67; clients use UDP 68. The exact forwarded and return tuples depend on client state and relay processing.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show running-config interface Vlan20\nshow ip route 192.0.2.10",
        "platform": "Cisco IOS XE17 lab SVI; addresses are placeholders · GUIDED NOT EXECUTED",
        "explanation": "Inspect helper attachment and the route to the owned server; obtain packet evidence separately.",
        "expected": "Configured helper and route establish intent only, not giaddr correctness or a completed lease."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior DHCP Relay settings, version and consuming attachment before any change. Attach the relay to the actual client L3 interface, identify the intended server and client subnet, and inspect helper forwarding behavior for the chosen release. Preserve helper addresses and option policies before one isolated change; restore exact interface attachment after testing. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Attach the relay to the actual client L3 interface, identify the intended server and client subnet, and inspect helper forwarding behavior for the chosen release. Preserve helper addresses and option policies before one isolated change; restore exact interface attachment after testing.",
    "troubleshooting": [
      [
        "Correct relay subnet context boundary fails",
        "An incorrect giaddr can select the wrong pool even when the server is reachable. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Server accepts relay policy boundary fails",
        "A policy rejection is not the same as packet loss or an exhausted pool. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Reply reaches client segment boundary fails",
        "Forward delivery does not prove the reply returned to the original client. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Treat relay information as trusted only from controlled attachment points. Forged Option82 or unintended helper destinations can redirect allocation or disclose client metadata. Restrict forwarding to intended services and preserve a management recovery path.",
    "performance": "Does relaying eliminate server capacity limits? No. A relay extends reach; allocation capacity and binding-state consistency remain server responsibilities. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "A configured destination is ineffective if the client broadcast never reaches that consuming interface.",
      "A forward packet observation proves only that direction of the exchange.",
      "Attachment metadata can be forged; policy at the relay boundary determines what the server may trust.",
      "A relay extends reach; allocation capacity and binding-state consistency remain server responsibilities."
    ],
    "prerequisites": [
      "s4-g0-t0"
    ],
    "related": [
      "s4-g0-t2"
    ],
    "lab": {
      "objective": "Carry DHCP across a router while preserving the client-subnet selection evidence. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → DHCP Relay endpoint",
        "Boundary: Correct relay subnet context → Server accepts relay policy → Reply reaches client segment",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On the owned client SVI192.0.2.1/24, attach a helper to an isolated server198.51.100.10. Ensure the server has the client-subnet pool and return route; define the Option82 trust policy before testing.",
        "Change only the owned helper destination or relay-subnet mapping, not both. Record client and server transaction/giaddr observations, then restore exact original attachment.",
        "Verify Discover/Request context at the server and Offer/Ack return at the relay/client, ending with intended client subnet options.",
        "Open the DHCP Relay evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: An incorrect giaddr can select the wrong pool even when the server is reachable. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A policy rejection is not the same as packet loss or an exhausted pool. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Forward delivery does not prove the reply returned to the original client. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Attach the relay to the actual client L3 interface, identify the intended server and client subnet, and inspect helper forwarding behavior for the chosen release. Preserve helper addresses and option policies before one isolated change; restore exact interface attachment after testing."
      ],
      "verification": "Configured helper and route establish intent only, not giaddr correctness or a completed lease. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "An incorrect giaddr can select the wrong pool even when the server is reachable. A policy rejection is not the same as packet loss or an exhausted pool. Forward delivery does not prove the reply returned to the original client. Separate invalid inputs from a valid negative service result.",
      "challenge": "What should a fault notebook identify? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Correct relay subnet context": "giaddr maps to the intended client subnet.",
      "Server accepts relay policy": "Relay information is accepted under the defined trust policy.",
      "Reply reaches client segment": "Server-to-relay and relay-to-client paths are supplied as ready."
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
    "quick": [
      {
        "question": "Why does a remote server need giaddr?",
        "answer": "To identify the relayed client subnet and return relay context.",
        "explanation": "The unconfigured client cannot supply a routable source address that uniquely selects its pool.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why does a remote server need giaddr?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-QC1"
      },
      {
        "question": "Helper exists on the transit interface only; what is suspect?",
        "answer": "The helper may be attached to the wrong client-facing L3 interface.",
        "explanation": "A configured destination is ineffective if the client broadcast never reaches that consuming interface.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Helper exists on the transit interface only; what is suspect?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-QC2"
      },
      {
        "question": "Is Option82 itself a lease allocator?",
        "answer": "No; it supplies relay information used by policy.",
        "explanation": "Allocation remains a server function, and the information must be trusted at the intended boundary.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is Option82 itself a lease allocator?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "DHCP Relay — Why does a remote server need giaddr?",
        "answer": "To identify the relayed client subnet and return relay context.",
        "explanation": "The unconfigured client cannot supply a routable source address that uniquely selects its pool.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Why does a remote server need giaddr?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q01",
        "options": [
          "To authenticate every client using its MAC.",
          "To enlarge every server pool automatically.",
          "To replace the server binding database.",
          "To identify the relayed client subnet and return relay context."
        ]
      },
      {
        "question": "DHCP Relay — Helper exists on the transit interface only; what is suspect?",
        "answer": "The helper may be attached to the wrong client-facing L3 interface.",
        "explanation": "A configured destination is ineffective if the client broadcast never reaches that consuming interface.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Helper exists on the transit interface only; what is suspect?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q02"
      },
      {
        "question": "DHCP Relay — Is Option82 itself a lease allocator?",
        "answer": "No; it supplies relay information used by policy.",
        "explanation": "Allocation remains a server function, and the information must be trusted at the intended boundary.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is Option82 itself a lease allocator?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q03"
      },
      {
        "question": "DHCP Relay — Discover reaches server but no reply reaches client; where next?",
        "answer": "Inspect server reply routing and relay-to-client handling.",
        "explanation": "A forward packet observation proves only that direction of the exchange.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Discover reaches server but no reply reaches client; where next?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q04"
      },
      {
        "question": "DHCP Relay — Can the server choose the transit subnet pool from packet source?",
        "answer": "That would ignore the required client-subnet relay context.",
        "explanation": "Use giaddr and supported relay selection policy rather than confusing transport source with client location.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Can the server choose the transit subnet pool from packet source?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q05"
      },
      {
        "question": "DHCP Relay — Untrusted client supplies Option82; automatically accept it?",
        "answer": "No; apply the designed reject/replace trust policy.",
        "explanation": "Attachment metadata can be forged; policy at the relay boundary determines what the server may trust.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Untrusted client supplies Option82; automatically accept it?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q06"
      },
      {
        "question": "DHCP Relay — Will larger wrong-subnet pools fix relay selection?",
        "answer": "No; repair the subnet context.",
        "explanation": "Capacity and selection are independent; enlarging the wrong pool can hide a dangerous allocation error.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Will larger wrong-subnet pools fix relay selection?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q07"
      },
      {
        "question": "DHCP Relay — What confirms a restored relay?",
        "answer": "The original client completes an exchange and receives intended subnet options.",
        "explanation": "Restored configuration should be corroborated by both transaction and client state.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What confirms a restored relay?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q08"
      },
      {
        "question": "DHCP Relay — Does relaying eliminate server capacity limits?",
        "answer": "No.",
        "explanation": "A relay extends reach; allocation capacity and binding-state consistency remain server responsibilities.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does relaying eliminate server capacity limits?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q09"
      },
      {
        "question": "DHCP Relay — What should a fault notebook identify?",
        "answer": "Client interface, giaddr, transaction, server policy and both reply paths.",
        "explanation": "Observer and transaction identity prevent combining unrelated packets into a false success record.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What should a fault notebook identify?",
        "topicId": "s4-g0-t1",
        "questionId": "s4-g0-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g0-t2",
    "batch": "11",
    "title": "DNS architecture",
    "subtitle": "Separate authoritative truth, recursive lookup and cached answers.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-dns-architecture",
    "definition": "DNS distributes naming data through delegated zones. Authoritative servers publish a zone; recursive resolvers pursue answers for clients and retain eligible results under TTL rules. A client stub usually asks a resolver rather than walking the hierarchy itself. A valid-looking cached answer can differ temporarily from newly changed authority, and a negative result can also be cached. DNS reachability, answer correctness and application delivery are different tests.",
    "purpose": "Separate authoritative truth, recursive lookup and cached answers. Keep authoritative publication and recursion exposure distinct. Plan delegation, redundancy, change ownership, zone serial/transfer policy and split-view behavior. Validate names and record types from intended client networks before shortening TTLs or editing forwarding.",
    "mental": "Use a three-column evidence notebook for DNS architecture: prerequisite, observation and conclusion. A recursive resolver checks applicable cache entries, then follows delegation or configured forwarding policy when it must resolve. Referral data points toward authority; an authoritative answer belongs to the responsible zone. Record query name, type, flags and responding server. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Authority has intended record: The responsible zone contains the intended name/type data.",
      "Resolver can obtain valid answer: The resolver path and applicable validation policy are supplied as ready.",
      "Client cache is current: The supplied client observation is not an old eligible cached result.",
      "Observation point: Ask the declared authority without requesting recursion; compare separately with the intended recursive resolver.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "A recursive resolver checks applicable cache entries, then follows delegation or configured forwarding policy when it must resolve. Referral data points toward authority; an authoritative answer belongs to the responsible zone. Record query name, type, flags and responding server.",
      "Positive TTL governs ordinary cache lifetime. Negative caching uses SOA information under RFC 2308; NXDOMAIN means the queried name does not exist, while NOERROR with no relevant answer can mean the requested type is absent. Neither response is a silent timeout.",
      "A changed zone record may coexist with an old cached answer until policy permits refresh. Compare authority and recursive views before clearing a local cache. DNSSEC validation checks signed-data authenticity under trust policy; it does not encrypt queries or guarantee the returned host runs the intended application.",
      "The first decisive boundary in this worksheet is Authority has intended record. Flushing a client cache cannot repair incorrect authoritative publication.",
      "The later evidence boundaries are Resolver can obtain valid answer and Client cache is current. A working authority does not ensure the client resolver can reach or validate it. TTL and negative caching can explain different answers without an authoritative outage."
    ],
    "flow": [
      [
        "DNS architecture context",
        "Separate authoritative truth, recursive lookup and cached answers. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Authority has intended record",
        "The responsible zone contains the intended name/type data. Flushing a client cache cannot repair incorrect authoritative publication."
      ],
      [
        "Resolver can obtain valid answer",
        "The resolver path and applicable validation policy are supplied as ready. A working authority does not ensure the client resolver can reach or validate it."
      ],
      [
        "Client cache is current",
        "The supplied client observation is not an old eligible cached result. TTL and negative caching can explain different answers without an authoritative outage."
      ]
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
    "example": "An operator investigating DNS architecture has an apparently healthy management path. Authority changed but resolver still returns old address; what next? Compare cache TTL and authoritative answer at the same name/type. Do not edit a correct zone merely because an eligible old cache result is still visible. Compare that observation with the separate recovery question: How do you verify a negative-cache recovery? Compare intended authority and recursive/client views after applicable expiry or controlled refresh. Preserve the earlier negative response and SOA/TTL evidence rather than assuming immediate global visibility. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Traditional DNS uses UDP/TCP 53; TCP is also needed in ordinary operation. Encrypted DNS transports have distinct ports and policy; this lesson does not deploy them.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "dig @192.0.2.53 app.example.test A +norecurse",
        "platform": "BIND9 client in an isolated lab · GUIDED NOT EXECUTED",
        "explanation": "Ask the declared authority without requesting recursion; compare separately with the intended recursive resolver.",
        "expected": "Inspect AA, status, answer type and TTL; a timeout differs from NXDOMAIN or a cached answer."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior DNS architecture settings, version and consuming attachment before any change. Keep authoritative publication and recursion exposure distinct. Plan delegation, redundancy, change ownership, zone serial/transfer policy and split-view behavior. Validate names and record types from intended client networks before shortening TTLs or editing forwarding. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Keep authoritative publication and recursion exposure distinct. Plan delegation, redundancy, change ownership, zone serial/transfer policy and split-view behavior. Validate names and record types from intended client networks before shortening TTLs or editing forwarding.",
    "troubleshooting": [
      [
        "Authority has intended record boundary fails",
        "Flushing a client cache cannot repair incorrect authoritative publication. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Resolver can obtain valid answer boundary fails",
        "A working authority does not ensure the client resolver can reach or validate it. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Client cache is current boundary fails",
        "TTL and negative caching can explain different answers without an authoritative outage. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Restrict open recursion, secure update/transfer permissions and protect resolver management. DNSSEC and encrypted resolver transport solve different problems. A DNS answer remains insufficient evidence of TLS identity or application authorization.",
    "performance": "Why not set every TTL extremely low? It increases query load and upstream dependency. TTL changes trade cache reuse and change visibility; they do not supply redundant authority or better application health. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "An answer code is protocol evidence; absence of any response requires a separate path investigation.",
      "Do not edit a correct zone merely because an eligible old cache result is still visible.",
      "Treating DNS as UDP-only can create failures for larger or otherwise TCP-dependent responses.",
      "TTL changes trade cache reuse and change visibility; they do not supply redundant authority or better application health."
    ],
    "prerequisites": [
      "s1-g2-t1"
    ],
    "related": [
      "s4-g0-t3"
    ],
    "lab": {
      "objective": "Separate authoritative truth, recursive lookup and cached answers. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → DNS architecture endpoint",
        "Boundary: Authority has intended record → Resolver can obtain valid answer → Client cache is current",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare an authoritative example.test zone and a separate recursive lab resolver. Publish app.example.test A192.0.2.20 with TTL60; query authority with recursion disabled and query the recursive endpoint normally.",
        "Warm the cache, change the owned A record to192.0.2.21 and compare authority/cache TTL before expiry. Separately create an NXDOMAIN case and record SOA negative-cache context. Restore the original record/serial through the supported zone workflow.",
        "Compare exact name/type/AA/status/TTL at authority, recursive resolver and original client after controlled expiry; do not interpret a cache flush as repaired publication.",
        "Open the DNS architecture evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Flushing a client cache cannot repair incorrect authoritative publication. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A working authority does not ensure the client resolver can reach or validate it. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: TTL and negative caching can explain different answers without an authoritative outage. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Keep authoritative publication and recursion exposure distinct. Plan delegation, redundancy, change ownership, zone serial/transfer policy and split-view behavior. Validate names and record types from intended client networks before shortening TTLs or editing forwarding."
      ],
      "verification": "Inspect AA, status, answer type and TTL; a timeout differs from NXDOMAIN or a cached answer. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Flushing a client cache cannot repair incorrect authoritative publication. A working authority does not ensure the client resolver can reach or validate it. TTL and negative caching can explain different answers without an authoritative outage. Separate invalid inputs from a valid negative service result.",
      "challenge": "DNS resolves; what remains for HTTPS? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Authority has intended record": "The responsible zone contains the intended name/type data.",
      "Resolver can obtain valid answer": "The resolver path and applicable validation policy are supplied as ready.",
      "Client cache is current": "The supplied client observation is not an old eligible cached result."
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
    "quick": [
      {
        "question": "Who owns published zone data?",
        "answer": "The authoritative zone operator.",
        "explanation": "A recursive resolver retrieves or caches data; its cache is not the source of zone ownership.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Who owns published zone data?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-QC1"
      },
      {
        "question": "NXDOMAIN observed; is this the same as timeout?",
        "answer": "No; it is an explicit negative DNS response.",
        "explanation": "An answer code is protocol evidence; absence of any response requires a separate path investigation.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "NXDOMAIN observed; is this the same as timeout?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-QC2"
      },
      {
        "question": "NOERROR but no AAAA answer necessarily means name absent?",
        "answer": "No; the name can exist without that record type.",
        "explanation": "Record type and response code must be interpreted together, including negative authority information.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "NOERROR but no AAAA answer necessarily means name absent?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-QC3"
      }
    ],
    "exams": [
      {
        "question": "DNS architecture — Who owns published zone data?",
        "answer": "The authoritative zone operator.",
        "explanation": "A recursive resolver retrieves or caches data; its cache is not the source of zone ownership.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Who owns published zone data?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q01",
        "options": [
          "The recursive cache owns all published data.",
          "The local gateway is always authoritative.",
          "The authoritative zone operator.",
          "Every client stub owns the authoritative zone."
        ]
      },
      {
        "question": "DNS architecture — NXDOMAIN observed; is this the same as timeout?",
        "answer": "No; it is an explicit negative DNS response.",
        "explanation": "An answer code is protocol evidence; absence of any response requires a separate path investigation.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "NXDOMAIN observed; is this the same as timeout?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q02"
      },
      {
        "question": "DNS architecture — NOERROR but no AAAA answer necessarily means name absent?",
        "answer": "No; the name can exist without that record type.",
        "explanation": "Record type and response code must be interpreted together, including negative authority information.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "NOERROR but no AAAA answer necessarily means name absent?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q03"
      },
      {
        "question": "DNS architecture — Authority changed but resolver still returns old address; what next?",
        "answer": "Compare cache TTL and authoritative answer at the same name/type.",
        "explanation": "Do not edit a correct zone merely because an eligible old cache result is still visible.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Authority changed but resolver still returns old address; what next?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q04"
      },
      {
        "question": "DNS architecture — Does DNSSEC encrypt the query?",
        "answer": "No.",
        "explanation": "DNSSEC validates signed data under a trust chain; confidentiality requires a separate transport mechanism.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does DNSSEC encrypt the query?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q05"
      },
      {
        "question": "DNS architecture — Why permit TCP 53 as well as UDP 53?",
        "answer": "Some DNS exchanges require or fall back to TCP.",
        "explanation": "Treating DNS as UDP-only can create failures for larger or otherwise TCP-dependent responses.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why permit TCP 53 as well as UDP 53?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q06"
      },
      {
        "question": "DNS architecture — Can clearing local cache repair wrong authority?",
        "answer": "No.",
        "explanation": "The next lookup can retrieve the same wrong source data; publication must be repaired at its owner.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Can clearing local cache repair wrong authority?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q07"
      },
      {
        "question": "DNS architecture — How do you verify a negative-cache recovery?",
        "answer": "Compare intended authority and recursive/client views after applicable expiry or controlled refresh.",
        "explanation": "Preserve the earlier negative response and SOA/TTL evidence rather than assuming immediate global visibility.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you verify a negative-cache recovery?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q08"
      },
      {
        "question": "DNS architecture — Why not set every TTL extremely low?",
        "answer": "It increases query load and upstream dependency.",
        "explanation": "TTL changes trade cache reuse and change visibility; they do not supply redundant authority or better application health.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why not set every TTL extremely low?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q09"
      },
      {
        "question": "DNS architecture — DNS resolves; what remains for HTTPS?",
        "answer": "Connect to the intended service and validate TLS identity and response.",
        "explanation": "Naming is one dependency, not an end-to-end application transaction.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "DNS resolves; what remains for HTTPS?",
        "topicId": "s4-g0-t2",
        "questionId": "s4-g0-t2-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g0-t3",
    "batch": "11",
    "title": "NTP",
    "subtitle": "Estimate offset from four timestamps without mistaking stratum for accuracy.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-ntp",
    "definition": "NTP coordinates clocks using timestamp exchanges, sample filtering and source selection. In a simplified exchange T1 is client transmit, T2 server receive, T3 server transmit and T4 client receive. The ideal offset estimate is ((T2−T1)+(T3−T4))/2 and network delay is (T4−T1)−(T3−T2). These equations assume sufficiently symmetric path delay for an accurate offset estimate; a reachable low-stratum server is not automatically accurate or selected.",
    "purpose": "Estimate offset from four timestamps without mistaking stratum for accuracy. Define approved diverse sources, access policy, monitoring and time-dependent service requirements. Preserve source configuration before changing one owned peer. Validate synchronization and timestamp correlation over a suitable interval; do not force manual time changes on a production authentication system.",
    "mental": "Use a three-column evidence notebook for NTP: prerequisite, observation and conclusion. Identify the actual time source, synchronization status and observer clock before correlating events. Stratum describes hierarchy distance from a reference, not a measured accuracy guarantee. An unsynchronized server or unsuitable sample may be rejected despite a successful packet reply. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Source is synchronized: The declared source provides usable synchronized time.",
      "Sample passes acceptance policy: The declared sample meets configured clock-selection bounds.",
      "Observer confirms synchronization: The actual client synchronization observation is supplied.",
      "Observation point: Read synchronization and source-selection state without altering time.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the actual time source, synchronization status and observer clock before correlating events. Stratum describes hierarchy distance from a reference, not a measured accuracy guarantee. An unsynchronized server or unsuitable sample may be rejected despite a successful packet reply.",
      "Compute offset and round-trip network delay from the four timestamps in common units. For T1=0,T2=12,T3=14,T4=10 milliseconds, offset is8 ms and delay8 ms. Unequal directional delay biases the offset; subtracting server processing time does not eliminate asymmetry.",
      "A daemon filters samples and disciplines a clock; it does not simply assign every received timestamp. Observe selected source, offset trends and dispersion/root-distance evidence. Restore source policy in the isolated target rather than stepping a production clock to match one browser calculation.",
      "The first decisive boundary in this worksheet is Source is synchronized. A replying unsynchronized source must not be treated as a valid reference.",
      "The later evidence boundaries are Sample passes acceptance policy and Observer confirms synchronization. Low stratum alone does not override unsuitable delay or uncertainty. Configured source intent is not evidence that the client selected or synchronized to it."
    ],
    "flow": [
      [
        "NTP context",
        "Estimate offset from four timestamps without mistaking stratum for accuracy. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Source is synchronized",
        "The declared source provides usable synchronized time. A replying unsynchronized source must not be treated as a valid reference."
      ],
      [
        "Sample passes acceptance policy",
        "The declared sample meets configured clock-selection bounds. Low stratum alone does not override unsuitable delay or uncertainty."
      ],
      [
        "Observer confirms synchronization",
        "The actual client synchronization observation is supplied. Configured source intent is not evidence that the client selected or synchronized to it."
      ]
    ],
    "comparison": [
      [
        "Source is synchronized",
        "The declared source provides usable synchronized time.",
        "A replying unsynchronized source must not be treated as a valid reference."
      ],
      [
        "Sample passes acceptance policy",
        "The declared sample meets configured clock-selection bounds.",
        "Low stratum alone does not override unsuitable delay or uncertainty."
      ],
      [
        "Observer confirms synchronization",
        "The actual client synchronization observation is supplied.",
        "Configured source intent is not evidence that the client selected or synchronized to it."
      ]
    ],
    "example": "An operator investigating NTP has an apparently healthy management path. UDP reply received but client unsynchronized; is time verified? No; inspect selection and synchronization state. Protocol reachability is not the daemon decision to use a source. Compare that observation with the separate recovery question: What demonstrates source-policy recovery? Restored policy plus selected-source and client synchronization evidence. A configured peer list alone does not show the discipline loop selected it. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "NTP commonly uses UDP 123. Authenticated time designs can add other transports; no clock is changed by this lesson.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "chronyc tracking\nchronyc sources -v",
        "platform": "Ubuntu24.04 with an already configured chrony lab daemon · GUIDED NOT EXECUTED",
        "explanation": "Read synchronization and source-selection state without altering time.",
        "expected": "Selected source, offset and synchronization evidence are distinct from merely seeing a reachable address."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior NTP settings, version and consuming attachment before any change. Define approved diverse sources, access policy, monitoring and time-dependent service requirements. Preserve source configuration before changing one owned peer. Validate synchronization and timestamp correlation over a suitable interval; do not force manual time changes on a production authentication system. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define approved diverse sources, access policy, monitoring and time-dependent service requirements. Preserve source configuration before changing one owned peer. Validate synchronization and timestamp correlation over a suitable interval; do not force manual time changes on a production authentication system.",
    "troubleshooting": [
      [
        "Source is synchronized boundary fails",
        "A replying unsynchronized source must not be treated as a valid reference. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Sample passes acceptance policy boundary fails",
        "Low stratum alone does not override unsuitable delay or uncertainty. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Observer confirms synchronization boundary fails",
        "Configured source intent is not evidence that the client selected or synchronized to it. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Unauthenticated time can be manipulated. Apply supported authenticated time mechanisms and management restrictions; confirm source identity and trust policy separately from reachability. Wrong time can break certificates, accounting correlation and replay-related checks.",
    "performance": "Does a shorter poll interval guarantee better accuracy? No. Polling work, source quality, jitter and network asymmetry affect results; measure the actual clock behavior. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Average the two directional differences: (12+4)/2; this remains an ideal symmetry-dependent estimate.",
      "Protocol reachability is not the daemon decision to use a source.",
      "A time jump can affect authentication, logs and applications even when the arithmetic is correct.",
      "Polling work, source quality, jitter and network asymmetry affect results; measure the actual clock behavior."
    ],
    "prerequisites": [
      "s4-g0-t2"
    ],
    "related": [
      "s4-g1-t0"
    ],
    "lab": {
      "objective": "Estimate offset from four timestamps without mistaking stratum for accuracy. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → NTP endpoint",
        "Boundary: Source is synchronized → Sample passes acceptance policy → Observer confirms synchronization",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Configure an already prepared disposable chrony client to approved isolated time sources. Preserve its source file and service policy; record chronyc tracking and sources before making a single source-selection change.",
        "Make only the owned source unavailable through the isolated lab path. Observe selection/synchronization evidence, then restore the saved source/path; never step the host production clock.",
        "Record selected source, synchronization status, offset/uncertainty trends and event timestamps over the chosen observation interval.",
        "Open the NTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A replying unsynchronized source must not be treated as a valid reference. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Low stratum alone does not override unsuitable delay or uncertainty. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Configured source intent is not evidence that the client selected or synchronized to it. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define approved diverse sources, access policy, monitoring and time-dependent service requirements. Preserve source configuration before changing one owned peer. Validate synchronization and timestamp correlation over a suitable interval; do not force manual time changes on a production authentication system."
      ],
      "verification": "Selected source, offset and synchronization evidence are distinct from merely seeing a reachable address. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A replying unsynchronized source must not be treated as a valid reference. Low stratum alone does not override unsuitable delay or uncertainty. Configured source intent is not evidence that the client selected or synchronized to it. Separate invalid inputs from a valid negative service result.",
      "challenge": "How should this arithmetic be reported? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Source is synchronized": "The declared source provides usable synchronized time.",
      "Sample passes acceptance policy": "The declared sample meets configured clock-selection bounds.",
      "Observer confirms synchronization": "The actual client synchronization observation is supplied."
    },
    "sources": [
      {
        "title": "RFC 5905",
        "url": "https://www.rfc-editor.org/rfc/rfc5905.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "What does stratum measure?",
        "answer": "Hierarchy distance from the reference clock.",
        "explanation": "Stratum does not directly certify accuracy, network symmetry or a trustworthy source.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What does stratum measure?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-QC1"
      },
      {
        "question": "Timestamps0,12,14,10 ms: estimated offset?",
        "answer": "8 ms.",
        "explanation": "Average the two directional differences: (12+4)/2; this remains an ideal symmetry-dependent estimate.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Timestamps0,12,14,10 ms: estimated offset?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-QC2"
      },
      {
        "question": "Same timestamps: estimated network delay?",
        "answer": "8 ms.",
        "explanation": "Client elapsed10 minus server processing2 gives8; timestamp units and ordering must be consistent.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Same timestamps: estimated network delay?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-QC3"
      }
    ],
    "exams": [
      {
        "question": "NTP — What does stratum measure?",
        "answer": "Hierarchy distance from the reference clock.",
        "explanation": "Stratum does not directly certify accuracy, network symmetry or a trustworthy source.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "What does stratum measure?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q01",
        "options": [
          "Required certificate trust depth.",
          "Hierarchy distance from the reference clock.",
          "Guaranteed offset accuracy in microseconds.",
          "Number of packets lost during polling."
        ]
      },
      {
        "question": "NTP — Timestamps0,12,14,10 ms: estimated offset?",
        "answer": "8 ms.",
        "explanation": "Average the two directional differences: (12+4)/2; this remains an ideal symmetry-dependent estimate.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Timestamps0,12,14,10 ms: estimated offset?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q02"
      },
      {
        "question": "NTP — Same timestamps: estimated network delay?",
        "answer": "8 ms.",
        "explanation": "Client elapsed10 minus server processing2 gives8; timestamp units and ordering must be consistent.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Same timestamps: estimated network delay?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q03"
      },
      {
        "question": "NTP — UDP reply received but client unsynchronized; is time verified?",
        "answer": "No; inspect selection and synchronization state.",
        "explanation": "Protocol reachability is not the daemon decision to use a source.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "UDP reply received but client unsynchronized; is time verified?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q04"
      },
      {
        "question": "NTP — Can path asymmetry bias estimated offset?",
        "answer": "Yes.",
        "explanation": "The four-timestamp formula cannot independently identify unequal one-way delays from a single exchange.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Can path asymmetry bias estimated offset?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q05"
      },
      {
        "question": "NTP — Is manual clock stepping a harmless production diagnostic?",
        "answer": "No; use a disposable clock target or read-only observations.",
        "explanation": "A time jump can affect authentication, logs and applications even when the arithmetic is correct.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is manual clock stepping a harmless production diagnostic?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q06"
      },
      {
        "question": "NTP — Two logs disagree; what must be preserved?",
        "answer": "Observer clock state, timezone and event/receive timestamps.",
        "explanation": "Correlation needs provenance rather than assuming every formatted timestamp shares one synchronized clock.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Two logs disagree; what must be preserved?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q07"
      },
      {
        "question": "NTP — What demonstrates source-policy recovery?",
        "answer": "Restored policy plus selected-source and client synchronization evidence.",
        "explanation": "A configured peer list alone does not show the discipline loop selected it.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What demonstrates source-policy recovery?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q08"
      },
      {
        "question": "NTP — Does a shorter poll interval guarantee better accuracy?",
        "answer": "No.",
        "explanation": "Polling work, source quality, jitter and network asymmetry affect results; measure the actual clock behavior.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does a shorter poll interval guarantee better accuracy?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q09"
      },
      {
        "question": "NTP — How should this arithmetic be reported?",
        "answer": "An ideal timestamp estimate, separate from measured clock accuracy.",
        "explanation": "Browser calculations do not discipline a clock or execute the full NTP selection algorithm.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How should this arithmetic be reported?",
        "topicId": "s4-g0-t3",
        "questionId": "s4-g0-t3-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g1-t0",
    "batch": "11",
    "title": "SNMP",
    "subtitle": "Read a scoped management object and distinguish polling from notifications.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-snmp",
    "definition": "SNMP exposes managed objects identified by OIDs through an agent and management framework. A successful request depends on endpoint reachability, security processing and access to the requested object/view. SNMPv3 security level authPriv adds authentication and privacy when correctly configured; an ordinary v1/v2c community does not offer equivalent protection. Polling counters and receiving notifications are distinct paths with different evidence.",
    "purpose": "Read a scoped management object and distinguish polling from notifications. Prefer restricted read access under supported SNMPv3 authPriv configuration, dedicated management sources and narrowly selected objects. Use high-capacity counters where suitable, preserve instance mapping, and record poll interval and discontinuity evidence before computing utilization.",
    "mental": "Use a three-column evidence notebook for SNMP: prerequisite, observation and conclusion. Identify the engine, version, identity, security level and requested OID. SNMPv3 user security and view-based authorization are separate concerns: successful message authentication does not authorize every subtree. Capture errors without publishing credentials. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Security processing succeeds: The declared version/identity/security level is accepted.",
      "Requested OID is permitted: The exact object and instance are allowed by the supplied view.",
      "Observation has continuity: Counter interval, instance and discontinuity context are valid.",
      "Observation point: Inspect configured user security and group/view bindings without displaying a secret-bearing client command.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the engine, version, identity, security level and requested OID. SNMPv3 user security and view-based authorization are separate concerns: successful message authentication does not authorize every subtree. Capture errors without publishing credentials.",
      "For counter observations, compare the same object and instance across a measured interval. A counter increment can estimate rate only when wrap/reset/discontinuity and units are understood.6000 new octets over 60 seconds represents800 bits/s, not6000 bits/s.",
      "A trap is normally an unacknowledged notification, while an inform includes acknowledgement behavior. Poll success does not prove notifications reach the receiver. Change one test OID view or one owned notification path and restore it before testing another condition.",
      "The first decisive boundary in this worksheet is Security processing succeeds. An authentication failure is not resolved by widening an object view.",
      "The later evidence boundaries are Requested OID is permitted and Observation has continuity. A valid identity does not automatically authorize every OID. A reset or changed instance invalidates a naive counter-difference rate."
    ],
    "flow": [
      [
        "SNMP context",
        "Read a scoped management object and distinguish polling from notifications. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Security processing succeeds",
        "The declared version/identity/security level is accepted. An authentication failure is not resolved by widening an object view."
      ],
      [
        "Requested OID is permitted",
        "The exact object and instance are allowed by the supplied view. A valid identity does not automatically authorize every OID."
      ],
      [
        "Observation has continuity",
        "Counter interval, instance and discontinuity context are valid. A reset or changed instance invalidates a naive counter-difference rate."
      ]
    ],
    "comparison": [
      [
        "Security processing succeeds",
        "The declared version/identity/security level is accepted.",
        "An authentication failure is not resolved by widening an object view."
      ],
      [
        "Requested OID is permitted",
        "The exact object and instance are allowed by the supplied view.",
        "A valid identity does not automatically authorize every OID."
      ],
      [
        "Observation has continuity",
        "Counter interval, instance and discontinuity context are valid.",
        "A reset or changed instance invalidates a naive counter-difference rate."
      ]
    ],
    "example": "An operator investigating SNMP has an apparently healthy management path. Poll succeeds, collector sees no traps; what is missing? Independent notification-path evidence. Polling and notifications use different direction and receiver processing; one cannot establish the other. Compare that observation with the separate recovery question: How do you test a restored view? Query the exact intended OID and verify intended denial outside the view. A positive result alone does not prove least-privilege boundaries remained intact. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Conventional polling uses UDP 161 and notifications commonly UDP 162. Other transports exist; the worksheet does not send SNMP messages.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show snmp user\nshow snmp group",
        "platform": "Cisco IOS XE17 supported isolated device · GUIDED NOT EXECUTED",
        "explanation": "Inspect configured user security and group/view bindings without displaying a secret-bearing client command.",
        "expected": "A configured user/group is intent; verify a scoped OID query separately on the prepared target."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior SNMP settings, version and consuming attachment before any change. Prefer restricted read access under supported SNMPv3 authPriv configuration, dedicated management sources and narrowly selected objects. Use high-capacity counters where suitable, preserve instance mapping, and record poll interval and discontinuity evidence before computing utilization. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Prefer restricted read access under supported SNMPv3 authPriv configuration, dedicated management sources and narrowly selected objects. Use high-capacity counters where suitable, preserve instance mapping, and record poll interval and discontinuity evidence before computing utilization.",
    "troubleshooting": [
      [
        "Security processing succeeds boundary fails",
        "An authentication failure is not resolved by widening an object view. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Requested OID is permitted boundary fails",
        "A valid identity does not automatically authorize every OID. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Observation has continuity boundary fails",
        "A reset or changed instance invalidates a naive counter-difference rate. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Protect authentication/privacy keys and management access; avoid putting secrets in saved shell history. Limit write access. Encryption on one management hop does not establish the trustworthiness or availability of a device itself.",
    "performance": "Will polling every millisecond always improve monitoring? No; it can overload agent and collector resources. Sampling needs an interval matched to useful detection and device capacity, with actual observed latency. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Community-based access lacks the same message authentication/privacy protections offered by a properly configured v3 security model.",
      "Polling and notifications use different direction and receiver processing; one cannot establish the other.",
      "Acknowledgement semantics improve notification feedback but still require a separately working receiver path.",
      "Sampling needs an interval matched to useful detection and device capacity, with actual observed latency."
    ],
    "prerequisites": [
      "s4-g0-t3"
    ],
    "related": [
      "s4-g1-t1"
    ],
    "lab": {
      "objective": "Read a scoped management object and distinguish polling from notifications. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → SNMP endpoint",
        "Boundary: Security processing succeeds → Requested OID is permitted → Observation has continuity",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Create an owned read-only SNMPv3 authPriv identity with a narrow view on the prepared agent; obtain its exact version/algorithm support first. Query one permitted interface counter and one deliberately excluded OID from the owned manager using protected credential handling.",
        "Change only the owned view to exclude the test object. Preserve actual authorization error, then restore the prior view; do not widen access to the whole tree as a shortcut.",
        "Verify permitted and denied objects, instance mapping and two counter samples with measured interval and discontinuity evidence. Test notifications separately if they are in scope.",
        "Open the SNMP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: An authentication failure is not resolved by widening an object view. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A valid identity does not automatically authorize every OID. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A reset or changed instance invalidates a naive counter-difference rate. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Prefer restricted read access under supported SNMPv3 authPriv configuration, dedicated management sources and narrowly selected objects. Use high-capacity counters where suitable, preserve instance mapping, and record poll interval and discontinuity evidence before computing utilization."
      ],
      "verification": "A configured user/group is intent; verify a scoped OID query separately on the prepared target. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "An authentication failure is not resolved by widening an object view. A valid identity does not automatically authorize every OID. A reset or changed instance invalidates a naive counter-difference rate. Separate invalid inputs from a valid negative service result.",
      "challenge": "How do you demonstrate a notification recovery? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Security processing succeeds": "The declared version/identity/security level is accepted.",
      "Requested OID is permitted": "The exact object and instance are allowed by the supplied view.",
      "Observation has continuity": "Counter interval, instance and discontinuity context are valid."
    },
    "sources": [
      {
        "title": "RFC 3411",
        "url": "https://www.rfc-editor.org/rfc/rfc3411.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3414",
        "url": "https://www.rfc-editor.org/rfc/rfc3414.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Does an accepted SNMPv3 identity authorize every OID?",
        "answer": "No; the configured view still governs access.",
        "explanation": "Security authentication and object authorization are separate processing decisions.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does an accepted SNMPv3 identity authorize every OID?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-QC1"
      },
      {
        "question": "Is community-string SNMP equivalent to authPriv?",
        "answer": "No.",
        "explanation": "Community-based access lacks the same message authentication/privacy protections offered by a properly configured v3 security model.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is community-string SNMP equivalent to authPriv?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-QC2"
      },
      {
        "question": "6000 octets over 60s, stable counter: rate?",
        "answer": "800 bits/s.",
        "explanation": "Convert octets to bits and divide by elapsed seconds; continuity and interval must first be established.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "6000 octets over 60s, stable counter: rate?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "SNMP — Does an accepted SNMPv3 identity authorize every OID?",
        "answer": "No; the configured view still governs access.",
        "explanation": "Security authentication and object authorization are separate processing decisions.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Does an accepted SNMPv3 identity authorize every OID?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q01",
        "options": [
          "No; the configured view still governs access.",
          "Yes; accepted identity bypasses every view.",
          "Yes; v3 automatically enables write to all OIDs.",
          "Only the community string decides every v3 view."
        ]
      },
      {
        "question": "SNMP — Is community-string SNMP equivalent to authPriv?",
        "answer": "No.",
        "explanation": "Community-based access lacks the same message authentication/privacy protections offered by a properly configured v3 security model.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is community-string SNMP equivalent to authPriv?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q02"
      },
      {
        "question": "SNMP — 6000 octets over 60s, stable counter: rate?",
        "answer": "800 bits/s.",
        "explanation": "Convert octets to bits and divide by elapsed seconds; continuity and interval must first be established.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "6000 octets over 60s, stable counter: rate?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q03"
      },
      {
        "question": "SNMP — Poll succeeds, collector sees no traps; what is missing?",
        "answer": "Independent notification-path evidence.",
        "explanation": "Polling and notifications use different direction and receiver processing; one cannot establish the other.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Poll succeeds, collector sees no traps; what is missing?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q04"
      },
      {
        "question": "SNMP — Counter falls after reboot; use negative rate?",
        "answer": "No; inspect reset/discontinuity before computing rate.",
        "explanation": "A counter discontinuity is not reverse traffic and cannot be treated as a normal monotonic difference.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Counter falls after reboot; use negative rate?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q05"
      },
      {
        "question": "SNMP — What distinguishes an inform from a trap?",
        "answer": "An inform uses acknowledgement behavior.",
        "explanation": "Acknowledgement semantics improve notification feedback but still require a separately working receiver path.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What distinguishes an inform from a trap?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q06"
      },
      {
        "question": "SNMP — What does an OID instance identify?",
        "answer": "A particular managed-object occurrence.",
        "explanation": "Comparing different interface instances can produce a meaningless rate even with valid authentication.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What does an OID instance identify?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q07"
      },
      {
        "question": "SNMP — How do you test a restored view?",
        "answer": "Query the exact intended OID and verify intended denial outside the view.",
        "explanation": "A positive result alone does not prove least-privilege boundaries remained intact.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you test a restored view?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q08"
      },
      {
        "question": "SNMP — Will polling every millisecond always improve monitoring?",
        "answer": "No; it can overload agent and collector resources.",
        "explanation": "Sampling needs an interval matched to useful detection and device capacity, with actual observed latency.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Will polling every millisecond always improve monitoring?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q09"
      },
      {
        "question": "SNMP — How do you demonstrate a notification recovery?",
        "answer": "Generate an owned test event and correlate agent and receiver observations.",
        "explanation": "Configured destination and poll results are not notification delivery evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you demonstrate a notification recovery?",
        "topicId": "s4-g1-t0",
        "questionId": "s4-g1-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g1-t1",
    "batch": "11",
    "title": "Syslog",
    "subtitle": "Preserve event provenance and verify collector delivery separately from local logging.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-syslog",
    "definition": "Syslog transports event messages from originators through optional relays to collectors. RFC 5424 defines a structured message format including priority, timestamp, host/application identity and structured data; transport and framing are additional choices. The priority integer is facility times8 plus severity. Lower numerical severity is more urgent. A local log record, sender configuration and searchable collector record are separate observations.",
    "purpose": "Preserve event provenance and verify collector delivery separately from local logging. Choose facility/severity filters, secure collector paths, framing, retention and access controls. Save the exact sender and collector configuration before one test filter change. Verify redacted marker delivery and searchability after restoring; local logger success alone is insufficient.",
    "mental": "Use a three-column evidence notebook for Syslog: prerequisite, observation and conclusion. Decode PRI into facility=floor(PRI/8) and severity=PRI modulo8. For local4 facility 20 and warning severity 4, PRI is164. Facility is classification, not a second urgency scale, and invalid priority values must not be silently accepted. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Sender filter admits marker: The test facility/severity is admitted by sender policy.",
      "Transport and framing match: The supplied collector transport/framing agrees with the sender.",
      "Collector stores correlated marker: The intended owned marker is observed in searchable storage.",
      "Observation point: Inspect buffer, severity filters and declared destinations; preserve sensitive output privately.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Decode PRI into facility=floor(PRI/8) and severity=PRI modulo8. For local4 facility 20 and warning severity 4, PRI is164. Facility is classification, not a second urgency scale, and invalid priority values must not be silently accepted.",
      "Preserve event time and receive time with timezone and clock status. A collector can receive a delayed record whose event timestamp is old. Legacy message variants can have incomplete provenance; never invent a year, timezone or authenticated sender from a displayed hostname.",
      "UDP provides no transport delivery guarantee. TCP requires agreed framing; TLS can protect a connection under certificate-validation policy. Correlate an owned test marker at originator and collector, then verify filtering, forwarding, storage and retention separately.",
      "The first decisive boundary in this worksheet is Sender filter admits marker. A dropped-by-filter event need never leave the originator.",
      "The later evidence boundaries are Transport and framing match and Collector stores correlated marker. A TCP connection alone does not establish correctly framed or accepted messages. Received bytes without retained searchable evidence do not complete this logging objective."
    ],
    "flow": [
      [
        "Syslog context",
        "Preserve event provenance and verify collector delivery separately from local logging. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Sender filter admits marker",
        "The test facility/severity is admitted by sender policy. A dropped-by-filter event need never leave the originator."
      ],
      [
        "Transport and framing match",
        "The supplied collector transport/framing agrees with the sender. A TCP connection alone does not establish correctly framed or accepted messages."
      ],
      [
        "Collector stores correlated marker",
        "The intended owned marker is observed in searchable storage. Received bytes without retained searchable evidence do not complete this logging objective."
      ]
    ],
    "comparison": [
      [
        "Sender filter admits marker",
        "The test facility/severity is admitted by sender policy.",
        "A dropped-by-filter event need never leave the originator."
      ],
      [
        "Transport and framing match",
        "The supplied collector transport/framing agrees with the sender.",
        "A TCP connection alone does not establish correctly framed or accepted messages."
      ],
      [
        "Collector stores correlated marker",
        "The intended owned marker is observed in searchable storage.",
        "Received bytes without retained searchable evidence do not complete this logging objective."
      ]
    ],
    "example": "An operator investigating Syslog has an apparently healthy management path. TLS connected but records unparsable; what next? Check message format and agreed framing. A protected byte stream still needs application framing and parser agreement. Compare that observation with the separate recovery question: How do you verify filter recovery? Send a uniquely correlated owned marker and find it at the intended collector. An empty error list or restored configuration is weaker than observed end-to-end log evidence. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "UDP 514 is conventional Syslog; TLS transport conventionally TCP 6514. TCP 514 is implementation-dependent; framing must match the receiver.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show logging",
        "platform": "Cisco IOS XE17 owned device · GUIDED NOT EXECUTED",
        "explanation": "Inspect buffer, severity filters and declared destinations; preserve sensitive output privately.",
        "expected": "A buffered local event does not prove network delivery, collector ingestion or retained search results."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Syslog settings, version and consuming attachment before any change. Choose facility/severity filters, secure collector paths, framing, retention and access controls. Save the exact sender and collector configuration before one test filter change. Verify redacted marker delivery and searchability after restoring; local logger success alone is insufficient. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Choose facility/severity filters, secure collector paths, framing, retention and access controls. Save the exact sender and collector configuration before one test filter change. Verify redacted marker delivery and searchability after restoring; local logger success alone is insufficient.",
    "troubleshooting": [
      [
        "Sender filter admits marker boundary fails",
        "A dropped-by-filter event need never leave the originator. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Transport and framing match boundary fails",
        "A TCP connection alone does not establish correctly framed or accepted messages. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Collector stores correlated marker boundary fails",
        "Received bytes without retained searchable evidence do not complete this logging objective. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Logs can contain secrets and untrusted fields. Apply transport authentication where supported, restrict query access and redact credential-bearing data. A sender-provided hostname or timestamp is not cryptographic identity or proof of correct time.",
    "performance": "Why control severity volume and retention? To balance diagnostic value, resource cost and exposure. High-volume logging can exhaust buffers or storage and expose sensitive information without improving detection. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Syslog numerical severity decreases as urgency increases; facility does not reverse that scale.",
      "A protected byte stream still needs application framing and parser agreement.",
      "UDP transport provides no inherent acknowledgement of ingestion or storage.",
      "High-volume logging can exhaust buffers or storage and expose sensitive information without improving detection."
    ],
    "prerequisites": [
      "s4-g0-t3"
    ],
    "related": [
      "s4-g2-t0"
    ],
    "lab": {
      "objective": "Preserve event provenance and verify collector delivery separately from local logging. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Syslog endpoint",
        "Boundary: Sender filter admits marker → Transport and framing match → Collector stores correlated marker",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Configure an owned sender and collector with matching transport/framing and a documented facility/severity filter. Where TLS is used, install only the intended lab trust and validate receiver identity.",
        "Emit a unique marker such as NSLAB-owned-001, then alter only the owned severity filter to suppress it. Restore the filter and send a new unique marker, retaining event and receive times.",
        "Correlate originator record, collector ingestion and searchable retained result. Record TLS/framing evidence separately from local buffer content.",
        "Open the Syslog evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A dropped-by-filter event need never leave the originator. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A TCP connection alone does not establish correctly framed or accepted messages. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Received bytes without retained searchable evidence do not complete this logging objective. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Choose facility/severity filters, secure collector paths, framing, retention and access controls. Save the exact sender and collector configuration before one test filter change. Verify redacted marker delivery and searchability after restoring; local logger success alone is insufficient."
      ],
      "verification": "A buffered local event does not prove network delivery, collector ingestion or retained search results. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A dropped-by-filter event need never leave the originator. A TCP connection alone does not establish correctly framed or accepted messages. Received bytes without retained searchable evidence do not complete this logging objective. Separate invalid inputs from a valid negative service result.",
      "challenge": "What must be preserved for incident ordering? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Sender filter admits marker": "The test facility/severity is admitted by sender policy.",
      "Transport and framing match": "The supplied collector transport/framing agrees with the sender.",
      "Collector stores correlated marker": "The intended owned marker is observed in searchable storage."
    },
    "sources": [
      {
        "title": "RFC 5424",
        "url": "https://www.rfc-editor.org/rfc/rfc5424.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Facility20,severity 4: PRI?",
        "answer": "164.",
        "explanation": "Compute20×8+4; the priority encodes both classification and urgency.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Facility20,severity 4: PRI?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-QC1"
      },
      {
        "question": "Severity2 versus6: which is more urgent?",
        "answer": "Severity2.",
        "explanation": "Syslog numerical severity decreases as urgency increases; facility does not reverse that scale.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Severity2 versus6: which is more urgent?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-QC2"
      },
      {
        "question": "Does a local buffer record prove collector delivery?",
        "answer": "No.",
        "explanation": "Originator generation and remote transport/ingestion/storage are distinct evidence points.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does a local buffer record prove collector delivery?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "Syslog — Facility20,severity 4: PRI?",
        "answer": "164.",
        "explanation": "Compute20×8+4; the priority encodes both classification and urgency.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Facility20,severity 4: PRI?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q01",
        "options": [
          "24",
          "160",
          "204",
          "164."
        ]
      },
      {
        "question": "Syslog — Severity2 versus6: which is more urgent?",
        "answer": "Severity2.",
        "explanation": "Syslog numerical severity decreases as urgency increases; facility does not reverse that scale.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Severity2 versus6: which is more urgent?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q02"
      },
      {
        "question": "Syslog — Does a local buffer record prove collector delivery?",
        "answer": "No.",
        "explanation": "Originator generation and remote transport/ingestion/storage are distinct evidence points.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does a local buffer record prove collector delivery?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q03"
      },
      {
        "question": "Syslog — TLS connected but records unparsable; what next?",
        "answer": "Check message format and agreed framing.",
        "explanation": "A protected byte stream still needs application framing and parser agreement.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "TLS connected but records unparsable; what next?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q04"
      },
      {
        "question": "Syslog — Old event time but current receive time; necessarily clock wrong?",
        "answer": "No; delayed forwarding is another hypothesis.",
        "explanation": "Keep both timestamps and clock provenance rather than collapsing transport delay into one cause.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Old event time but current receive time; necessarily clock wrong?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q05"
      },
      {
        "question": "Syslog — UDP send returned; does it confirm collector receipt?",
        "answer": "No.",
        "explanation": "UDP transport provides no inherent acknowledgement of ingestion or storage.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "UDP send returned; does it confirm collector receipt?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q06"
      },
      {
        "question": "Syslog — Hostname in the message authenticates its author?",
        "answer": "No.",
        "explanation": "A message field can be forged; trust requires separate origin and transport controls.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Hostname in the message authenticates its author?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q07"
      },
      {
        "question": "Syslog — How do you verify filter recovery?",
        "answer": "Send a uniquely correlated owned marker and find it at the intended collector.",
        "explanation": "An empty error list or restored configuration is weaker than observed end-to-end log evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you verify filter recovery?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q08"
      },
      {
        "question": "Syslog — Why control severity volume and retention?",
        "answer": "To balance diagnostic value, resource cost and exposure.",
        "explanation": "High-volume logging can exhaust buffers or storage and expose sensitive information without improving detection.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why control severity volume and retention?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q09"
      },
      {
        "question": "Syslog — What must be preserved for incident ordering?",
        "answer": "Event/receive times, timezone, clock state and origin identity evidence.",
        "explanation": "Timestamp text alone cannot establish a universal order across unsynchronized or delayed observers.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What must be preserved for incident ordering?",
        "topicId": "s4-g1-t1",
        "questionId": "s4-g1-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g2-t0",
    "batch": "11",
    "title": "AAA",
    "subtitle": "Treat authentication, authorization and accounting as distinct decisions.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-aaa",
    "definition": "AAA separates proving an identity, deciding which actions that identity may perform, and recording what occurred. A successful login does not automatically grant configuration permission, and a permitted command does not prove an accounting record was retained. Method lists and their attachments determine which policy applies to a console, virtual terminal or command path. Reject and unreachable are different outcomes that must not be collapsed into a permissive fallback.",
    "purpose": "Treat authentication, authorization and accounting as distinct decisions. Define method list, consumer attachment, privilege scope, accounting destination and failure policy. Preserve the exact original console/VTY configuration and a tested independent local account. Attach experimental policy only to a disposable target or separately controlled session while console access remains.",
    "mental": "Use a three-column evidence notebook for AAA: prerequisite, observation and conclusion. Authentication checks the presented identity or credential using an attached method list. Record the entry point and service; configuring a server object without attaching the relevant policy may change nothing for that session. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Authentication accepted: The supplied identity is authenticated for this service.",
      "Requested action authorized: The supplied command or service is permitted for this identity.",
      "Accounting record observed: A correlated record is retained at the intended observer.",
      "Observation point: Inspect server status alongside the exact consuming method list and session evidence.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Authentication checks the presented identity or credential using an attached method list. Record the entry point and service; configuring a server object without attaching the relevant policy may change nothing for that session.",
      "Authorization evaluates the requested service, role or command independently. An explicit denial should remain a denial under the intended policy; local fallback on server error/timeout is a separately designed platform behavior, not permission to ignore rejection.",
      "Accounting records starts, stops or command events according to policy. Maintain a tested console-local recovery account before changing central policy. Verify an approved identity, an intended denial and an unreachable-server recovery scenario separately; never destroy the recovery path to prove a lab fault.",
      "The first decisive boundary in this worksheet is Authentication accepted. Explicit authentication rejection must not be relabelled as a server outage.",
      "The later evidence boundaries are Requested action authorized and Accounting record observed. Login success does not confer every administrative action. Authorization success alone does not establish an audit trail."
    ],
    "flow": [
      [
        "AAA context",
        "Treat authentication, authorization and accounting as distinct decisions. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Authentication accepted",
        "The supplied identity is authenticated for this service. Explicit authentication rejection must not be relabelled as a server outage."
      ],
      [
        "Requested action authorized",
        "The supplied command or service is permitted for this identity. Login success does not confer every administrative action."
      ],
      [
        "Accounting record observed",
        "A correlated record is retained at the intended observer. Authorization success alone does not establish an audit trail."
      ]
    ],
    "comparison": [
      [
        "Authentication accepted",
        "The supplied identity is authenticated for this service.",
        "Explicit authentication rejection must not be relabelled as a server outage."
      ],
      [
        "Requested action authorized",
        "The supplied command or service is permitted for this identity.",
        "Login success does not confer every administrative action."
      ],
      [
        "Accounting record observed",
        "A correlated record is retained at the intended observer.",
        "Authorization success alone does not establish an audit trail."
      ]
    ],
    "example": "An operator investigating AAA has an apparently healthy management path. AAA server object exists but VTY uses local policy; what matters? The actual method-list attachment. A defined object is not necessarily consumed by the selected entry point or command service. Compare that observation with the separate recovery question: How do you validate restored AAA? Test approved action, intended denial, accounting and independent recovery. Positive login alone misses authorization leakage and unavailable audit evidence. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "AAA is a framework with no intrinsic port. Its RADIUS and TACACS+ transports have their own conventions.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show aaa servers",
        "platform": "Cisco IOS XE17 target where supported · GUIDED NOT EXECUTED",
        "explanation": "Inspect server status alongside the exact consuming method list and session evidence.",
        "expected": "A reachable server display does not prove authentication, command authorization or accounting success."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior AAA settings, version and consuming attachment before any change. Define method list, consumer attachment, privilege scope, accounting destination and failure policy. Preserve the exact original console/VTY configuration and a tested independent local account. Attach experimental policy only to a disposable target or separately controlled session while console access remains. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define method list, consumer attachment, privilege scope, accounting destination and failure policy. Preserve the exact original console/VTY configuration and a tested independent local account. Attach experimental policy only to a disposable target or separately controlled session while console access remains.",
    "troubleshooting": [
      [
        "Authentication accepted boundary fails",
        "Explicit authentication rejection must not be relabelled as a server outage. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Requested action authorized boundary fails",
        "Login success does not confer every administrative action. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Accounting record observed boundary fails",
        "Authorization success alone does not establish an audit trail. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Use least-privilege administration, secure credential storage, protected AAA transport and restricted management reachability. Prevent accidental fail-open behavior; accounting is detective evidence and does not replace authorization.",
    "performance": "What causes latency under an unreachable server? Configured timeout/retry sequencing and fallback behavior. Method order and server responsiveness can affect access delay; measure the intended session rather than guessing. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Rejection is an explicit policy outcome; timeout is missing service evidence and may invoke a separately designed recovery method.",
      "A defined object is not necessarily consumed by the selected entry point or command service.",
      "Intended denial and unreachable-server recovery are separate acceptance cases.",
      "Method order and server responsiveness can affect access delay; measure the intended session rather than guessing."
    ],
    "prerequisites": [
      "s4-g1-t1"
    ],
    "related": [
      "s4-g2-t1"
    ],
    "lab": {
      "objective": "Treat authentication, authorization and accounting as distinct decisions. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → AAA endpoint",
        "Boundary: Authentication accepted → Requested action authorized → Accounting record observed",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare independent console-local recovery first. On a disposable target, define an owned AAA server group and method list attached only to the intended test VTY/service. Create approved read role and intended denied configuration action, plus accounting destination.",
        "Test explicit server rejection before any outage case. In a separate controlled case make only the central endpoint unavailable while retaining console access. Record method-list behavior and restore exact attachment.",
        "Demonstrate approved login/action, forbidden action denial, correlated accounting and console-local access before, during outage and after restoration.",
        "Open the AAA evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Explicit authentication rejection must not be relabelled as a server outage. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Login success does not confer every administrative action. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Authorization success alone does not establish an audit trail. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define method list, consumer attachment, privilege scope, accounting destination and failure policy. Preserve the exact original console/VTY configuration and a tested independent local account. Attach experimental policy only to a disposable target or separately controlled session while console access remains."
      ],
      "verification": "A reachable server display does not prove authentication, command authorization or accounting success. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Explicit authentication rejection must not be relabelled as a server outage. Login success does not confer every administrative action. Authorization success alone does not establish an audit trail. Separate invalid inputs from a valid negative service result.",
      "challenge": "What is the minimum change record? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Authentication accepted": "The supplied identity is authenticated for this service.",
      "Requested action authorized": "The supplied command or service is permitted for this identity.",
      "Accounting record observed": "A correlated record is retained at the intended observer."
    },
    "sources": [
      {
        "title": "RFC 8907",
        "url": "https://www.rfc-editor.org/rfc/rfc8907.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 2865",
        "url": "https://www.rfc-editor.org/rfc/rfc2865.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Successful login means all configuration commands allowed?",
        "answer": "No; authorization is separate.",
        "explanation": "A proved identity can still lack the role or privilege required for a requested action.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Successful login means all configuration commands allowed?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-QC1"
      },
      {
        "question": "Reject and timeout interchangeable for fallback?",
        "answer": "No.",
        "explanation": "Rejection is an explicit policy outcome; timeout is missing service evidence and may invoke a separately designed recovery method.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Reject and timeout interchangeable for fallback?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-QC2"
      },
      {
        "question": "A permitted command proves an accounting record exists?",
        "answer": "No.",
        "explanation": "Accounting generation, transport and retained storage must be verified independently of permission.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A permitted command proves an accounting record exists?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "AAA — Successful login means all configuration commands allowed?",
        "answer": "No; authorization is separate.",
        "explanation": "A proved identity can still lack the role or privilege required for a requested action.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Successful login means all configuration commands allowed?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q01",
        "options": [
          "Yes; accounting records replace authorization.",
          "Only if the server uses UDP.",
          "No; authorization is separate.",
          "Yes; login success grants every command."
        ]
      },
      {
        "question": "AAA — Reject and timeout interchangeable for fallback?",
        "answer": "No.",
        "explanation": "Rejection is an explicit policy outcome; timeout is missing service evidence and may invoke a separately designed recovery method.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Reject and timeout interchangeable for fallback?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q02"
      },
      {
        "question": "AAA — A permitted command proves an accounting record exists?",
        "answer": "No.",
        "explanation": "Accounting generation, transport and retained storage must be verified independently of permission.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A permitted command proves an accounting record exists?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q03"
      },
      {
        "question": "AAA — AAA server object exists but VTY uses local policy; what matters?",
        "answer": "The actual method-list attachment.",
        "explanation": "A defined object is not necessarily consumed by the selected entry point or command service.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "AAA server object exists but VTY uses local policy; what matters?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q04"
      },
      {
        "question": "AAA — Should recovery be tested only after losing management access?",
        "answer": "No; test the independent console-local path first.",
        "explanation": "A safe experiment establishes recovery before applying a central policy that can lock out administrators.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Should recovery be tested only after losing management access?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q05"
      },
      {
        "question": "AAA — Denied user succeeds through fallback; desirable recovery?",
        "answer": "No; investigate unintended fail-open policy.",
        "explanation": "Intended denial and unreachable-server recovery are separate acceptance cases.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Denied user succeeds through fallback; desirable recovery?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q06"
      },
      {
        "question": "AAA — What identity belongs in an accounting record?",
        "answer": "The correlated authenticated identity and actual session/action context.",
        "explanation": "Uncorrelated records cannot reliably connect a command to its responsible administration session.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What identity belongs in an accounting record?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q07"
      },
      {
        "question": "AAA — How do you validate restored AAA?",
        "answer": "Test approved action, intended denial, accounting and independent recovery.",
        "explanation": "Positive login alone misses authorization leakage and unavailable audit evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you validate restored AAA?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q08"
      },
      {
        "question": "AAA — What causes latency under an unreachable server?",
        "answer": "Configured timeout/retry sequencing and fallback behavior.",
        "explanation": "Method order and server responsiveness can affect access delay; measure the intended session rather than guessing.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What causes latency under an unreachable server?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q09"
      },
      {
        "question": "AAA — What is the minimum change record?",
        "answer": "Entry point, exact method list, server policy, original settings and tested rollback.",
        "explanation": "Consumer scope makes configuration changes reviewable without assuming every session follows the same policy.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What is the minimum change record?",
        "topicId": "s4-g2-t0",
        "questionId": "s4-g2-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g2-t1",
    "batch": "11",
    "title": "RADIUS",
    "subtitle": "Interpret access policy and accounting without assuming classic RADIUS protects every field.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-radius",
    "definition": "RADIUS carries network-access authentication/authorization information between a network access server and a policy server, with accounting defined separately. The NAS is the RADIUS client; the user endpoint is usually not the direct RADIUS peer. Access-Accept, Access-Reject and challenge processing are explicit responses. Classic UDP/shared-secret protection is not equivalent to modern full-channel encryption; current security and transport applicability must be checked for the chosen deployment.",
    "purpose": "Interpret access policy and accounting without assuming classic RADIUS protects every field. Configure owned NAS clients, source addresses, service policies and accounting endpoints. Preserve secret references privately and verify returned attributes at the consuming NAS. Use product-supported secure transport and current vulnerability guidance; no access server is configured here.",
    "mental": "Use a three-column evidence notebook for RADIUS: prerequisite, observation and conclusion. The NAS sends an Access-Request for a defined service and identity context. Match source client configuration and secret securely, validate authenticators under the chosen protocol and apply identity policy. A response from an arbitrary address is not trustworthy evidence of an authorized server. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "NAS peer and response trusted: Declared client/server context and response validation are correct.",
      "Access policy accepts identity: The supplied access decision is Accept for the intended service.",
      "Returned policy is applied: The NAS applies the intended authorized policy attributes.",
      "Observation point: Inspect the intended RADIUS peer status and correlate it with actual owned access/accounting transactions.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "The NAS sends an Access-Request for a defined service and identity context. Match source client configuration and secret securely, validate authenticators under the chosen protocol and apply identity policy. A response from an arbitrary address is not trustworthy evidence of an authorized server.",
      "An Access-Accept can include policy attributes such as VLAN or role; the NAS must support and actually apply them. Acceptance does not establish that the resulting data-plane access matches intent. A reject remains distinct from timeout or challenge.",
      "Accounting-Request/Response provides a separate event path with correlation identifiers. Test accept, explicit reject, malformed/untrusted response and accounting delivery separately. Use protected supported transport where appropriate; do not assume a classic shared secret encrypts all attributes.",
      "The first decisive boundary in this worksheet is NAS peer and response trusted. An untrusted response must not be treated as an authorized Access-Accept.",
      "The later evidence boundaries are Access policy accepts identity and Returned policy is applied. Reject is explicit denial; timeout cannot be silently substituted for it. Server acceptance alone does not prove the desired access VLAN or role took effect."
    ],
    "flow": [
      [
        "RADIUS context",
        "Interpret access policy and accounting without assuming classic RADIUS protects every field. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "NAS peer and response trusted",
        "Declared client/server context and response validation are correct. An untrusted response must not be treated as an authorized Access-Accept."
      ],
      [
        "Access policy accepts identity",
        "The supplied access decision is Accept for the intended service. Reject is explicit denial; timeout cannot be silently substituted for it."
      ],
      [
        "Returned policy is applied",
        "The NAS applies the intended authorized policy attributes. Server acceptance alone does not prove the desired access VLAN or role took effect."
      ]
    ],
    "comparison": [
      [
        "NAS peer and response trusted",
        "Declared client/server context and response validation are correct.",
        "An untrusted response must not be treated as an authorized Access-Accept."
      ],
      [
        "Access policy accepts identity",
        "The supplied access decision is Accept for the intended service.",
        "Reject is explicit denial; timeout cannot be silently substituted for it."
      ],
      [
        "Returned policy is applied",
        "The NAS applies the intended authorized policy attributes.",
        "Server acceptance alone does not prove the desired access VLAN or role took effect."
      ]
    ],
    "example": "An operator investigating RADIUS has an apparently healthy management path. Access-Reject received; should it be called timeout? No. A validated reject is a server policy decision, not absence of server response. Compare that observation with the separate recovery question: How do you test restoration after an attribute fault? Restore policy, repeat owned access and inspect the resulting NAS role/VLAN. A policy-server configuration display is not proof of applied client access. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Conventional RADIUS authentication UDP 1812 and accounting UDP 1813; legacy deployments may differ. TLS-based transport has distinct port and configuration requirements.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show aaa servers",
        "platform": "Cisco IOS XE17 lab NAS · GUIDED NOT EXECUTED",
        "explanation": "Inspect the intended RADIUS peer status and correlate it with actual owned access/accounting transactions.",
        "expected": "Access-Accept, installed policy and retained accounting are separate observations."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior RADIUS settings, version and consuming attachment before any change. Configure owned NAS clients, source addresses, service policies and accounting endpoints. Preserve secret references privately and verify returned attributes at the consuming NAS. Use product-supported secure transport and current vulnerability guidance; no access server is configured here. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Configure owned NAS clients, source addresses, service policies and accounting endpoints. Preserve secret references privately and verify returned attributes at the consuming NAS. Use product-supported secure transport and current vulnerability guidance; no access server is configured here.",
    "troubleshooting": [
      [
        "NAS peer and response trusted boundary fails",
        "An untrusted response must not be treated as an authorized Access-Accept. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Access policy accepts identity boundary fails",
        "Reject is explicit denial; timeout cannot be silently substituted for it. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Returned policy is applied boundary fails",
        "Server acceptance alone does not prove the desired access VLAN or role took effect. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Classic RADIUS has important legacy cryptographic limits; validate authenticators and supported mitigations and prefer protected modern deployment options. Shared secrets must be unique and protected. Never interpret UDP reachability as trustworthy identity policy. RFC 9765 defines an Experimental RADIUS/1.1 profile that negotiates a TLS/DTLS-based variant without the legacy MD5 mechanisms. This does not change classic UDP deployments or prove product support; verify the negotiated profile and implementation before relying on it.",
    "performance": "Why bound timeout and retry settings? To balance failover detection and access delay. Excessive retries can prolong unavailable service; overly aggressive limits can misclassify transient delay. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Legacy attribute protection and authenticator mechanisms do not provide general modern encrypted-channel semantics.",
      "A validated reject is a server policy decision, not absence of server response.",
      "Transport arrival does not establish authenticity of an access-policy decision.",
      "Excessive retries can prolong unavailable service; overly aggressive limits can misclassify transient delay."
    ],
    "prerequisites": [
      "s4-g2-t0"
    ],
    "related": [
      "s4-g2-t2"
    ],
    "lab": {
      "objective": "Interpret access policy and accounting without assuming classic RADIUS protects every field. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → RADIUS endpoint",
        "Boundary: NAS peer and response trusted → Access policy accepts identity → Returned policy is applied",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Register only the owned NAS/source as a policy-server client. Set protected secret references and an access policy for a disposable identity; define intended role/VLAN and a separate accounting endpoint. Follow current supported response-authenticator and transport protections.",
        "Use an owned identity that policy explicitly rejects; then separately test server unavailability. Restore source/peer/policy configuration and never count a rejection bypass as recovery.",
        "Record validated Accept/Reject, actual NAS-applied role/VLAN and correlated accounting. Verify intended permitted/denied traffic rather than only response codes.",
        "Open the RADIUS evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: An untrusted response must not be treated as an authorized Access-Accept. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Reject is explicit denial; timeout cannot be silently substituted for it. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Server acceptance alone does not prove the desired access VLAN or role took effect. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Configure owned NAS clients, source addresses, service policies and accounting endpoints. Preserve secret references privately and verify returned attributes at the consuming NAS. Use product-supported secure transport and current vulnerability guidance; no access server is configured here."
      ],
      "verification": "Access-Accept, installed policy and retained accounting are separate observations. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "An untrusted response must not be treated as an authorized Access-Accept. Reject is explicit denial; timeout cannot be silently substituted for it. Server acceptance alone does not prove the desired access VLAN or role took effect. Separate invalid inputs from a valid negative service result.",
      "challenge": "What separates access success from usable service? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "NAS peer and response trusted": "Declared client/server context and response validation are correct.",
      "Access policy accepts identity": "The supplied access decision is Accept for the intended service.",
      "Returned policy is applied": "The NAS applies the intended authorized policy attributes."
    },
    "sources": [
      {
        "title": "RFC 2865",
        "url": "https://www.rfc-editor.org/rfc/rfc2865.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 9765",
        "url": "https://www.rfc-editor.org/rfc/rfc9765.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Who normally acts as the RADIUS client?",
        "answer": "The NAS or authenticator.",
        "explanation": "The user endpoint usually interacts with the access device rather than being the direct policy-server peer.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Who normally acts as the RADIUS client?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-QC1"
      },
      {
        "question": "Classic shared secret encrypts every RADIUS attribute?",
        "answer": "No.",
        "explanation": "Legacy attribute protection and authenticator mechanisms do not provide general modern encrypted-channel semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Classic shared secret encrypts every RADIUS attribute?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-QC2"
      },
      {
        "question": "Access-Accept guarantees intended VLAN installed?",
        "answer": "No; inspect the consuming NAS policy.",
        "explanation": "A returned attribute needs supported interpretation and actual attachment on the access device.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Access-Accept guarantees intended VLAN installed?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "RADIUS — Who normally acts as the RADIUS client?",
        "answer": "The NAS or authenticator.",
        "explanation": "The user endpoint usually interacts with the access device rather than being the direct policy-server peer.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Who normally acts as the RADIUS client?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q01",
        "options": [
          "The passive flow collector.",
          "The NAS or authenticator.",
          "The end-user web browser in every deployment.",
          "The authoritative DNS server."
        ]
      },
      {
        "question": "RADIUS — Classic shared secret encrypts every RADIUS attribute?",
        "answer": "No.",
        "explanation": "Legacy attribute protection and authenticator mechanisms do not provide general modern encrypted-channel semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Classic shared secret encrypts every RADIUS attribute?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q02"
      },
      {
        "question": "RADIUS — Access-Accept guarantees intended VLAN installed?",
        "answer": "No; inspect the consuming NAS policy.",
        "explanation": "A returned attribute needs supported interpretation and actual attachment on the access device.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Access-Accept guarantees intended VLAN installed?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q03"
      },
      {
        "question": "RADIUS — Access-Reject received; should it be called timeout?",
        "answer": "No.",
        "explanation": "A validated reject is a server policy decision, not absence of server response.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Access-Reject received; should it be called timeout?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q04"
      },
      {
        "question": "RADIUS — Which conventional port handles accounting?",
        "answer": "UDP 1813.",
        "explanation": "Authentication commonly uses1812; the accounting exchange is a separately configured function.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Which conventional port handles accounting?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q05"
      },
      {
        "question": "RADIUS — Response arrives from wrong peer; permit access?",
        "answer": "No; validate trusted server context and authenticator.",
        "explanation": "Transport arrival does not establish authenticity of an access-policy decision.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Response arrives from wrong peer; permit access?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q06"
      },
      {
        "question": "RADIUS — Can successful authentication replace accounting verification?",
        "answer": "No.",
        "explanation": "Accounting generation, delivery and retention require their own correlated evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Can successful authentication replace accounting verification?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q07"
      },
      {
        "question": "RADIUS — How do you test restoration after an attribute fault?",
        "answer": "Restore policy, repeat owned access and inspect the resulting NAS role/VLAN.",
        "explanation": "A policy-server configuration display is not proof of applied client access.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you test restoration after an attribute fault?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q08"
      },
      {
        "question": "RADIUS — Why bound timeout and retry settings?",
        "answer": "To balance failover detection and access delay.",
        "explanation": "Excessive retries can prolong unavailable service; overly aggressive limits can misclassify transient delay.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why bound timeout and retry settings?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q09"
      },
      {
        "question": "RADIUS — What separates access success from usable service?",
        "answer": "Applied policy and the original allowed/denied application tests.",
        "explanation": "Even correct authentication can coexist with wrong authorization or a separate network path failure.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What separates access success from usable service?",
        "topicId": "s4-g2-t1",
        "questionId": "s4-g2-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g2-t2",
    "batch": "11",
    "title": "TACACS+",
    "subtitle": "Follow device administration authentication and command authorization separately.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-tacacs",
    "definition": "TACACS+ supports device-administration authentication, authorization and accounting using separate protocol exchanges over TCP. A device can authenticate an administrator and later request authorization for a command and arguments. The legacy shared-secret packet-body mechanism is obfuscation based on an older construction; it does not provide modern full-channel encryption, and the protocol header remains visible. Its transport reliability does not prove the requested command is permitted or audited.",
    "purpose": "Follow device administration authentication and command authorization separately. Choose administration roles, command/argument policy, intended line attachments and accounting events. Preserve the current privilege and recovery design before adding a policy to a controlled lab session. Validate approved command, denied command and unavailable-server recovery separately.",
    "mental": "Use a three-column evidence notebook for TACACS+: prerequisite, observation and conclusion. Identify the actual administrative entry point and attached policy. Authentication proves the presented identity for a session; subsequent authorization may carry service, command and arguments. Read the explicit authorization result without replacing denial with a guessed server error. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Administration session authenticated: The declared administrator identity has been accepted.",
      "Command authorization permits action: The actual command/argument request is permitted.",
      "Accounting corroborates action: A correlated action record is observed at the accounting receiver.",
      "Observation point: Inspect server statistics and separately preserve command authorization/accounting outcomes.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the actual administrative entry point and attached policy. Authentication proves the presented identity for a session; subsequent authorization may carry service, command and arguments. Read the explicit authorization result without replacing denial with a guessed server error.",
      "TCP delivery and a shared secret are transport prerequisites. Secret mismatch or server unreachability differs from an authenticated explicit denial. A configured server group can be bypassed by a different method-list attachment on another line.",
      "Accounting records must be correlated with the actual action and retained receiver evidence. Keep console-local recovery independent and test it before changing command authorization. Restrict legacy TACACS+ to a protected management path under supported security controls.",
      "The first decisive boundary in this worksheet is Administration session authenticated. A TCP connection is not an authenticated administrator session.",
      "The later evidence boundaries are Command authorization permits action and Accounting corroborates action. An authenticated session may correctly be denied a configuration command. A permitted command without a retained record leaves this audit objective incomplete."
    ],
    "flow": [
      [
        "TACACS+ context",
        "Follow device administration authentication and command authorization separately. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Administration session authenticated",
        "The declared administrator identity has been accepted. A TCP connection is not an authenticated administrator session."
      ],
      [
        "Command authorization permits action",
        "The actual command/argument request is permitted. An authenticated session may correctly be denied a configuration command."
      ],
      [
        "Accounting corroborates action",
        "A correlated action record is observed at the accounting receiver. A permitted command without a retained record leaves this audit objective incomplete."
      ]
    ],
    "comparison": [
      [
        "Administration session authenticated",
        "The declared administrator identity has been accepted.",
        "A TCP connection is not an authenticated administrator session."
      ],
      [
        "Command authorization permits action",
        "The actual command/argument request is permitted.",
        "An authenticated session may correctly be denied a configuration command."
      ],
      [
        "Accounting corroborates action",
        "A correlated action record is observed at the accounting receiver.",
        "A permitted command without a retained record leaves this audit objective incomplete."
      ]
    ],
    "example": "An operator investigating TACACS+ has an apparently healthy management path. Server reachable but command bypasses policy; inspect what? The consuming command-authorization method list and line attachment. Defined server objects do not govern an action unless the selected service consumes them. Compare that observation with the separate recovery question: What recovery path must be tested first? Independent console-local administration. The recovery mechanism must remain usable before attaching a policy that could deny remote management. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "TACACS+ conventionally uses TCP 49. Legacy protocol body protection does not hide its header or replace modern channel security.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show tacacs",
        "platform": "Cisco IOS XE17 lab device where this observation is supported · GUIDED NOT EXECUTED",
        "explanation": "Inspect server statistics and separately preserve command authorization/accounting outcomes.",
        "expected": "Transport counters and server status do not prove a command was allowed or its record retained."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior TACACS+ settings, version and consuming attachment before any change. Choose administration roles, command/argument policy, intended line attachments and accounting events. Preserve the current privilege and recovery design before adding a policy to a controlled lab session. Validate approved command, denied command and unavailable-server recovery separately. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Choose administration roles, command/argument policy, intended line attachments and accounting events. Preserve the current privilege and recovery design before adding a policy to a controlled lab session. Validate approved command, denied command and unavailable-server recovery separately.",
    "troubleshooting": [
      [
        "Administration session authenticated boundary fails",
        "A TCP connection is not an authenticated administrator session. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Command authorization permits action boundary fails",
        "An authenticated session may correctly be denied a configuration command. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Accounting corroborates action boundary fails",
        "A permitted command without a retained record leaves this audit objective incomplete. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Do not describe legacy body obfuscation as TLS-equivalent protection. Protect the management network and secrets, prefer supported stronger channel options where available, and constrain local recovery to an explicitly tested administrative path.",
    "performance": "What affects login delay under an unreachable server? Retry/timeout and method-list order. TCP behavior and policy failover together affect latency; no browser preset measures those delays. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "The legacy body mechanism is obfuscation; visible headers and outdated protection must be acknowledged.",
      "Defined server objects do not govern an action unless the selected service consumes them.",
      "Authorizing a command name without relevant context may differ from the intended privilege boundary.",
      "TCP behavior and policy failover together affect latency; no browser preset measures those delays."
    ],
    "prerequisites": [
      "s4-g2-t0"
    ],
    "related": [
      "s4-g3-t0"
    ],
    "lab": {
      "objective": "Follow device administration authentication and command authorization separately. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → TACACS+ endpoint",
        "Boundary: Administration session authenticated → Command authorization permits action → Accounting corroborates action",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On the isolated administration target, define owned TACACS+ peer/group and attach authn/authz/accounting lists to the intended session. Use a protected management network and a tested console-local recovery account.",
        "Authenticate an approved user, request a specifically denied configuration command, and retain the authorization result. In a separate outage test observe timeout behavior without treating Reject as timeout; restore exact policies.",
        "Correlate session identity, command and arguments, permit/deny, retained accounting and independent console recovery.",
        "Open the TACACS+ evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A TCP connection is not an authenticated administrator session. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: An authenticated session may correctly be denied a configuration command. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A permitted command without a retained record leaves this audit objective incomplete. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Choose administration roles, command/argument policy, intended line attachments and accounting events. Preserve the current privilege and recovery design before adding a policy to a controlled lab session. Validate approved command, denied command and unavailable-server recovery separately."
      ],
      "verification": "Transport counters and server status do not prove a command was allowed or its record retained. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A TCP connection is not an authenticated administrator session. An authenticated session may correctly be denied a configuration command. A permitted command without a retained record leaves this audit objective incomplete. Separate invalid inputs from a valid negative service result.",
      "challenge": "How do you demonstrate complete restored administration? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Administration session authenticated": "The declared administrator identity has been accepted.",
      "Command authorization permits action": "The actual command/argument request is permitted.",
      "Accounting corroborates action": "A correlated action record is observed at the accounting receiver."
    },
    "sources": [
      {
        "title": "RFC 8907",
        "url": "https://www.rfc-editor.org/rfc/rfc8907.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Conventional TACACS+ transport?",
        "answer": "TCP 49.",
        "explanation": "A reliable byte stream does not by itself establish identity, permission or retained accounting.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Conventional TACACS+ transport?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-QC1"
      },
      {
        "question": "Does legacy TACACS+ encrypt the entire packet like TLS?",
        "answer": "No.",
        "explanation": "The legacy body mechanism is obfuscation; visible headers and outdated protection must be acknowledged.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does legacy TACACS+ encrypt the entire packet like TLS?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-QC2"
      },
      {
        "question": "Authenticated user denied command; is authentication broken?",
        "answer": "No; authorization is a separate result.",
        "explanation": "Successful identity validation can coexist with the intended denial of a requested administrative action.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Authenticated user denied command; is authentication broken?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-QC3"
      }
    ],
    "exams": [
      {
        "question": "TACACS+ — Conventional TACACS+ transport?",
        "answer": "TCP 49.",
        "explanation": "A reliable byte stream does not by itself establish identity, permission or retained accounting.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Conventional TACACS+ transport?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q01",
        "options": [
          "TCP 49.",
          "UDP 1812",
          "TCP 22",
          "UDP 162"
        ]
      },
      {
        "question": "TACACS+ — Does legacy TACACS+ encrypt the entire packet like TLS?",
        "answer": "No.",
        "explanation": "The legacy body mechanism is obfuscation; visible headers and outdated protection must be acknowledged.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does legacy TACACS+ encrypt the entire packet like TLS?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q02"
      },
      {
        "question": "TACACS+ — Authenticated user denied command; is authentication broken?",
        "answer": "No; authorization is a separate result.",
        "explanation": "Successful identity validation can coexist with the intended denial of a requested administrative action.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Authenticated user denied command; is authentication broken?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q03"
      },
      {
        "question": "TACACS+ — Server reachable but command bypasses policy; inspect what?",
        "answer": "The consuming command-authorization method list and line attachment.",
        "explanation": "Defined server objects do not govern an action unless the selected service consumes them.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Server reachable but command bypasses policy; inspect what?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q04"
      },
      {
        "question": "TACACS+ — Explicit denial should trigger unrestricted local permit?",
        "answer": "No.",
        "explanation": "Failover for server error is a separate design and must not erase a valid policy denial.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Explicit denial should trigger unrestricted local permit?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q05"
      },
      {
        "question": "TACACS+ — What context matters in command authorization?",
        "answer": "Command, arguments, service and authenticated identity.",
        "explanation": "Authorizing a command name without relevant context may differ from the intended privilege boundary.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What context matters in command authorization?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q06"
      },
      {
        "question": "TACACS+ — Does a transport counter prove accounting retention?",
        "answer": "No.",
        "explanation": "Records require correlation and receiver-side storage evidence rather than only transmitted-message counts.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does a transport counter prove accounting retention?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q07"
      },
      {
        "question": "TACACS+ — What recovery path must be tested first?",
        "answer": "Independent console-local administration.",
        "explanation": "The recovery mechanism must remain usable before attaching a policy that could deny remote management.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What recovery path must be tested first?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q08"
      },
      {
        "question": "TACACS+ — What affects login delay under an unreachable server?",
        "answer": "Retry/timeout and method-list order.",
        "explanation": "TCP behavior and policy failover together affect latency; no browser preset measures those delays.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What affects login delay under an unreachable server?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q09"
      },
      {
        "question": "TACACS+ — How do you demonstrate complete restored administration?",
        "answer": "Approved action, intended denial, accounting and console recovery all tested.",
        "explanation": "A login-only positive check overlooks command permission and audit-path failures.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you demonstrate complete restored administration?",
        "topicId": "s4-g2-t2",
        "questionId": "s4-g2-t2-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g3-t0",
    "batch": "11",
    "title": "NetFlow",
    "subtitle": "Decode exported flow records with the matching template and observation context.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-netflow",
    "definition": "NetFlow exports summaries of observed traffic, not a packet capture. In version9, templates describe data-record fields and must be known to the collector for the relevant exporter/source context. Cache timeouts determine when active or inactive flows are exported; sampling changes what the counts represent. Export traffic can arrive at a collector that still cannot decode it because its template or context is missing.",
    "purpose": "Decode exported flow records with the matching template and observation context. Specify exporter source, collector address/port, version, interface direction, cache timeouts and sampling. Record collector receipt and decoded fields with source/template identity. Protect template refresh and monitoring continuity during upgrades or collector restart.",
    "mental": "Use a three-column evidence notebook for NetFlow: prerequisite, observation and conclusion. Define flow keys and observation point, direction and cache behavior. A bidirectional application may appear as separate directional flow records. Flow records omit packet payload and cannot substitute for a capture when diagnosing exact retransmissions or content. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Observation covers intended traffic: The selected interface/direction actually observes the traffic.",
      "Matching template available: The collector has the record schema for this exporter/source context.",
      "Sampling context recorded: The supplied counters have known sampling and interval semantics.",
      "Observation point: Read cache summaries at the declared observation point; this command is not a portable FNF cache substitute.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Define flow keys and observation point, direction and cache behavior. A bidirectional application may appear as separate directional flow records. Flow records omit packet payload and cannot substitute for a capture when diagnosing exact retransmissions or content.",
      "A version9 template identifies the record schema in the exporter/source context. Refresh and collector restart behavior matter; template IDs cannot be assumed globally unique across exporters. A data record without its matching template is not safely interpretable by guessing field positions.",
      "Interpret timestamps, byte/packet units, sampling and active/inactive export boundaries. A sampled count needs its documented sampling semantics before population estimation. Test collector restart/template refresh and restore the same observation point without interpreting missing export as zero traffic.",
      "The first decisive boundary in this worksheet is Observation covers intended traffic. No matching observation can result from wrong attachment rather than absent application traffic.",
      "The later evidence boundaries are Matching template available and Sampling context recorded. Received data cannot be reliably decoded using another exporter template with the same numeric ID. Unknown sampling prevents a defensible total-traffic estimate."
    ],
    "flow": [
      [
        "NetFlow context",
        "Decode exported flow records with the matching template and observation context. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Observation covers intended traffic",
        "The selected interface/direction actually observes the traffic. No matching observation can result from wrong attachment rather than absent application traffic."
      ],
      [
        "Matching template available",
        "The collector has the record schema for this exporter/source context. Received data cannot be reliably decoded using another exporter template with the same numeric ID."
      ],
      [
        "Sampling context recorded",
        "The supplied counters have known sampling and interval semantics. Unknown sampling prevents a defensible total-traffic estimate."
      ]
    ],
    "comparison": [
      [
        "Observation covers intended traffic",
        "The selected interface/direction actually observes the traffic.",
        "No matching observation can result from wrong attachment rather than absent application traffic."
      ],
      [
        "Matching template available",
        "The collector has the record schema for this exporter/source context.",
        "Received data cannot be reliably decoded using another exporter template with the same numeric ID."
      ],
      [
        "Sampling context recorded",
        "The supplied counters have known sampling and interval semantics.",
        "Unknown sampling prevents a defensible total-traffic estimate."
      ]
    ],
    "example": "An operator investigating NetFlow has an apparently healthy management path. Collector restarts and loses schema; what should be checked? Template refresh and collector state for that exporter. Data reception alone cannot recover a missing schema by safely guessing field positions. Compare that observation with the separate recovery question: What demonstrates restored collector decoding? Matching template and correlated decoded records at the original observation point. A UDP listener alone cannot prove fields were interpreted correctly. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "NetFlow export destination UDP port is configured by deployment, not universally fixed. NetFlowv9 is distinct from IPFIX; this lesson uses v9 template semantics.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show ip cache flow",
        "platform": "Cisco IOS XE17 platform supporting the selected traditional NetFlow feature · GUIDED NOT EXECUTED",
        "explanation": "Read cache summaries at the declared observation point; this command is not a portable FNF cache substitute.",
        "expected": "A local flow cache is distinct from correctly decoded collector records."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior NetFlow settings, version and consuming attachment before any change. Specify exporter source, collector address/port, version, interface direction, cache timeouts and sampling. Record collector receipt and decoded fields with source/template identity. Protect template refresh and monitoring continuity during upgrades or collector restart. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Specify exporter source, collector address/port, version, interface direction, cache timeouts and sampling. Record collector receipt and decoded fields with source/template identity. Protect template refresh and monitoring continuity during upgrades or collector restart.",
    "troubleshooting": [
      [
        "Observation covers intended traffic boundary fails",
        "No matching observation can result from wrong attachment rather than absent application traffic. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Matching template available boundary fails",
        "Received data cannot be reliably decoded using another exporter template with the same numeric ID. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Sampling context recorded boundary fails",
        "Unknown sampling prevents a defensible total-traffic estimate. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Flow metadata exposes communication patterns and may include sensitive identities. Restrict exporters/collector access, retain data under policy and do not treat observed source addresses as authenticated endpoint identities.",
    "performance": "What changes with short active timeouts? More frequent records and collector/export overhead. Time granularity trades resource cost; it does not create packet-level visibility. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Record bytes require the appropriate schema and exporter/source context.",
      "Data reception alone cannot recover a missing schema by safely guessing field positions.",
      "Counts need documented sampling semantics and observation intervals before total estimation.",
      "Time granularity trades resource cost; it does not create packet-level visibility."
    ],
    "prerequisites": [
      "s4-g1-t0"
    ],
    "related": [
      "s4-g3-t1"
    ],
    "lab": {
      "objective": "Decode exported flow records with the matching template and observation context. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → NetFlow endpoint",
        "Boundary: Observation covers intended traffic → Matching template available → Sampling context recorded",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On a supported lab platform, define exporter source, version9 collector and configured UDP destination. Attach the chosen traditional observation feature to the owned ingress or egress interface and record sampling/timeouts.",
        "Restart only an owned disposable collector to lose its template state; observe undecodable data before appropriate template refresh, then restore original collector policy. Do not clear unrelated router caches.",
        "Record exporter/source/template context and correctly decoded directional records, counter units and sampling. Compare with an independently observed owned traffic exchange.",
        "Open the NetFlow evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: No matching observation can result from wrong attachment rather than absent application traffic. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Received data cannot be reliably decoded using another exporter template with the same numeric ID. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Unknown sampling prevents a defensible total-traffic estimate. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Specify exporter source, collector address/port, version, interface direction, cache timeouts and sampling. Record collector receipt and decoded fields with source/template identity. Protect template refresh and monitoring continuity during upgrades or collector restart."
      ],
      "verification": "A local flow cache is distinct from correctly decoded collector records. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "No matching observation can result from wrong attachment rather than absent application traffic. Received data cannot be reliably decoded using another exporter template with the same numeric ID. Unknown sampling prevents a defensible total-traffic estimate. Separate invalid inputs from a valid negative service result.",
      "challenge": "How do you distinguish no traffic from lost telemetry? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Observation covers intended traffic": "The selected interface/direction actually observes the traffic.",
      "Matching template available": "The collector has the record schema for this exporter/source context.",
      "Sampling context recorded": "The supplied counters have known sampling and interval semantics."
    },
    "sources": [
      {
        "title": "RFC 3954",
        "url": "https://www.rfc-editor.org/rfc/rfc3954.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Are exported flows a full packet capture?",
        "answer": "No; they summarize selected traffic properties.",
        "explanation": "Payload and individual packet timing may be absent even when flow counters are correct.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Are exported flows a full packet capture?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-QC1"
      },
      {
        "question": "Why can received version9 data remain undecodable?",
        "answer": "Its matching template may be missing.",
        "explanation": "Record bytes require the appropriate schema and exporter/source context.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why can received version9 data remain undecodable?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-QC2"
      },
      {
        "question": "Template ID256 from two exporters necessarily same schema?",
        "answer": "No.",
        "explanation": "Template identity includes exporter/source context rather than only a global numeric ID.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Template ID256 from two exporters necessarily same schema?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "NetFlow — Are exported flows a full packet capture?",
        "answer": "No; they summarize selected traffic properties.",
        "explanation": "Payload and individual packet timing may be absent even when flow counters are correct.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Are exported flows a full packet capture?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q01",
        "options": [
          "Yes; every flow contains every payload byte.",
          "Yes; templates are entire packet captures.",
          "Only when export uses UDP 69.",
          "No; they summarize selected traffic properties."
        ]
      },
      {
        "question": "NetFlow — Why can received version9 data remain undecodable?",
        "answer": "Its matching template may be missing.",
        "explanation": "Record bytes require the appropriate schema and exporter/source context.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why can received version9 data remain undecodable?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q02"
      },
      {
        "question": "NetFlow — Template ID256 from two exporters necessarily same schema?",
        "answer": "No.",
        "explanation": "Template identity includes exporter/source context rather than only a global numeric ID.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Template ID256 from two exporters necessarily same schema?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q03"
      },
      {
        "question": "NetFlow — Collector restarts and loses schema; what should be checked?",
        "answer": "Template refresh and collector state for that exporter.",
        "explanation": "Data reception alone cannot recover a missing schema by safely guessing field positions.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Collector restarts and loses schema; what should be checked?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q04"
      },
      {
        "question": "NetFlow — One directional flow proves replies exist?",
        "answer": "No.",
        "explanation": "Flow direction and observation point must be compared with opposite-direction evidence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "One directional flow proves replies exist?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q05"
      },
      {
        "question": "NetFlow — Unknown sampling; can count be called total packets?",
        "answer": "No.",
        "explanation": "Counts need documented sampling semantics and observation intervals before total estimation.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Unknown sampling; can count be called total packets?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q06"
      },
      {
        "question": "NetFlow — Why might active flows export before they end?",
        "answer": "An active cache timeout can export periodic records.",
        "explanation": "Export boundaries are cache-policy artifacts, not necessarily application transaction boundaries.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why might active flows export before they end?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q07"
      },
      {
        "question": "NetFlow — What demonstrates restored collector decoding?",
        "answer": "Matching template and correlated decoded records at the original observation point.",
        "explanation": "A UDP listener alone cannot prove fields were interpreted correctly.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What demonstrates restored collector decoding?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q08"
      },
      {
        "question": "NetFlow — What changes with short active timeouts?",
        "answer": "More frequent records and collector/export overhead.",
        "explanation": "Time granularity trades resource cost; it does not create packet-level visibility.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What changes with short active timeouts?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q09"
      },
      {
        "question": "NetFlow — How do you distinguish no traffic from lost telemetry?",
        "answer": "Use independent observation plus exporter/collector/template evidence.",
        "explanation": "Missing records alone cannot distinguish inactivity, wrong attachment, export loss and decoding failure.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you distinguish no traffic from lost telemetry?",
        "topicId": "s4-g3-t0",
        "questionId": "s4-g3-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g3-t1",
    "batch": "11",
    "title": "Flexible NetFlow",
    "subtitle": "Distinguish flow keys, collected fields, monitor attachment and export.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-fnf",
    "definition": "Flexible NetFlow separates a flow record definition, a cache monitor and an exporter. Match fields identify distinct flows; collect fields add measurements or metadata without necessarily splitting the key. The monitor attaches the record and cache behavior to an observation point, and an exporter sends records to a collector. Hardware and software support for fields, directions and combinations vary by platform and release.",
    "purpose": "Distinguish flow keys, collected fields, monitor attachment and export. Preserve record/monitor/exporter definitions and exact attachment. Plan cardinality, supported fields and timeouts. Change only an owned monitor on a disposable target; verify key changes through correlated cache entries and collector records, then restore the prior attachment.",
    "mental": "Use a three-column evidence notebook for Flexible NetFlow: prerequisite, observation and conclusion. Select match fields to define the aggregation identity. Adding source port as a match field can split a previous aggregate into more entries. Adding a supported collected counter changes recorded values rather than inherently creating a new key. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Record supported and appropriate: Selected match/collect fields are supported and reflect intended aggregation.",
      "Monitor attached at observer: The monitor is applied to the intended supported interface/direction.",
      "Exporter and decoder ready: Supplied export and matching collector schema are ready.",
      "Observation point: Inspect record keys/collect fields, monitor cache and exporter independently.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Select match fields to define the aggregation identity. Adding source port as a match field can split a previous aggregate into more entries. Adding a supported collected counter changes recorded values rather than inherently creating a new key.",
      "Attach the record to a monitor and the monitor to a supported interface/direction. An unattached monitor does not observe the intended traffic. Confirm platform limitations before assuming a configuration accepted elsewhere works on this device.",
      "Associate an exporter, then correlate cache records, template availability and collector decoding. Successful local aggregation does not demonstrate export; successful export receipt does not demonstrate schema or interval interpretation.",
      "The first decisive boundary in this worksheet is Record supported and appropriate. Unsupported fields or unintended keys invalidate the planned aggregation.",
      "The later evidence boundaries are Monitor attached at observer and Exporter and decoder ready. Configured monitor objects do not observe traffic before attachment. A populated local cache alone does not prove decoded collector visibility."
    ],
    "flow": [
      [
        "Flexible NetFlow context",
        "Distinguish flow keys, collected fields, monitor attachment and export. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Record supported and appropriate",
        "Selected match/collect fields are supported and reflect intended aggregation. Unsupported fields or unintended keys invalidate the planned aggregation."
      ],
      [
        "Monitor attached at observer",
        "The monitor is applied to the intended supported interface/direction. Configured monitor objects do not observe traffic before attachment."
      ],
      [
        "Exporter and decoder ready",
        "Supplied export and matching collector schema are ready. A populated local cache alone does not prove decoded collector visibility."
      ]
    ],
    "comparison": [
      [
        "Record supported and appropriate",
        "Selected match/collect fields are supported and reflect intended aggregation.",
        "Unsupported fields or unintended keys invalidate the planned aggregation."
      ],
      [
        "Monitor attached at observer",
        "The monitor is applied to the intended supported interface/direction.",
        "Configured monitor objects do not observe traffic before attachment."
      ],
      [
        "Exporter and decoder ready",
        "Supplied export and matching collector schema are ready.",
        "A populated local cache alone does not prove decoded collector visibility."
      ]
    ],
    "example": "An operator investigating Flexible NetFlow has an apparently healthy management path. Cache populated but collector blank; where next? Exporter path, template and collector decoding. Observation and local caching precede distinct export/ingestion stages. Compare that observation with the separate recovery question: What verifies a restored record key? Equivalent traffic produces intended cache aggregation and correctly decoded fields. Configuration text alone does not prove the changed key is being consumed. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Exporter destination port and transport depend on configuration; NetFlowv9/IPFIX formats are not interchangeable merely because they carry flow data.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show flow record\nshow flow monitor\nshow flow exporter",
        "platform": "Cisco IOS XE17 FNF-supported lab platform · GUIDED NOT EXECUTED",
        "explanation": "Inspect record keys/collect fields, monitor cache and exporter independently.",
        "expected": "Each display answers a different question; correlate actual interface attachment and collector decoding."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Flexible NetFlow settings, version and consuming attachment before any change. Preserve record/monitor/exporter definitions and exact attachment. Plan cardinality, supported fields and timeouts. Change only an owned monitor on a disposable target; verify key changes through correlated cache entries and collector records, then restore the prior attachment. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Preserve record/monitor/exporter definitions and exact attachment. Plan cardinality, supported fields and timeouts. Change only an owned monitor on a disposable target; verify key changes through correlated cache entries and collector records, then restore the prior attachment.",
    "troubleshooting": [
      [
        "Record supported and appropriate boundary fails",
        "Unsupported fields or unintended keys invalidate the planned aggregation. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Monitor attached at observer boundary fails",
        "Configured monitor objects do not observe traffic before attachment. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Exporter and decoder ready boundary fails",
        "A populated local cache alone does not prove decoded collector visibility. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Limit collector access and sensitive flow fields. A record definition is a visibility policy, not a traffic firewall or endpoint authentication mechanism.",
    "performance": "Why avoid unnecessary match fields? They can increase cache cardinality and resource work. More detailed keys trade aggregation and capacity; they do not automatically improve detection quality. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Traffic previously combined under one key can be divided into several entries.",
      "Observation and local caching precede distinct export/ingestion stages.",
      "Observation summarizes traffic; it does not inherently enforce a permit/deny policy.",
      "More detailed keys trade aggregation and capacity; they do not automatically improve detection quality."
    ],
    "prerequisites": [
      "s4-g3-t0"
    ],
    "related": [
      "s4-g3-t2"
    ],
    "lab": {
      "objective": "Distinguish flow keys, collected fields, monitor attachment and export. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Flexible NetFlow endpoint",
        "Boundary: Record supported and appropriate → Monitor attached at observer → Exporter and decoder ready",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Define owned flow record with intended match source/destination/protocol keys and supported collected byte/packet counters. Associate an owned monitor and exporter, then attach the monitor to one supported lab interface/direction.",
        "Change one key, such as source port, and compare aggregate cardinality for equivalent owned traffic. Restore exact record/monitor/attachment rather than deleting another feature's exporter.",
        "Correlate supported record fields, monitor cache entries and collector decoding/template. Preserve sampling and interval context.",
        "Open the Flexible NetFlow evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Unsupported fields or unintended keys invalidate the planned aggregation. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Configured monitor objects do not observe traffic before attachment. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A populated local cache alone does not prove decoded collector visibility. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Preserve record/monitor/exporter definitions and exact attachment. Plan cardinality, supported fields and timeouts. Change only an owned monitor on a disposable target; verify key changes through correlated cache entries and collector records, then restore the prior attachment."
      ],
      "verification": "Each display answers a different question; correlate actual interface attachment and collector decoding. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Unsupported fields or unintended keys invalidate the planned aggregation. Configured monitor objects do not observe traffic before attachment. A populated local cache alone does not prove decoded collector visibility. Separate invalid inputs from a valid negative service result.",
      "challenge": "What rollback is precise? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Record supported and appropriate": "Selected match/collect fields are supported and reflect intended aggregation.",
      "Monitor attached at observer": "The monitor is applied to the intended supported interface/direction.",
      "Exporter and decoder ready": "Supplied export and matching collector schema are ready."
    },
    "sources": [
      {
        "title": "Cisco IOS XE17 Flexible NetFlow",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fnf-fnetflow.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Does a collect field always split the flow key?",
        "answer": "No.",
        "explanation": "Match fields define identity; collect fields record additional values under the selected record semantics.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does a collect field always split the flow key?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-QC1"
      },
      {
        "question": "Adding source port as match can change what?",
        "answer": "Flow cardinality and aggregation boundaries.",
        "explanation": "Traffic previously combined under one key can be divided into several entries.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Adding source port as match can change what?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-QC2"
      },
      {
        "question": "Record exists but cache empty; next attachment check?",
        "answer": "Monitor on the intended interface and direction.",
        "explanation": "A defined record without an active consumer sees no packets at that observation point.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Record exists but cache empty; next attachment check?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "Flexible NetFlow — Does a collect field always split the flow key?",
        "answer": "No.",
        "explanation": "Match fields define identity; collect fields record additional values under the selected record semantics.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Does a collect field always split the flow key?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q01",
        "options": [
          "Yes; collecting any field disables aggregation.",
          "Only if the collector is reachable.",
          "No.",
          "Yes; every collected counter creates a unique key."
        ]
      },
      {
        "question": "Flexible NetFlow — Adding source port as match can change what?",
        "answer": "Flow cardinality and aggregation boundaries.",
        "explanation": "Traffic previously combined under one key can be divided into several entries.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Adding source port as match can change what?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q02"
      },
      {
        "question": "Flexible NetFlow — Record exists but cache empty; next attachment check?",
        "answer": "Monitor on the intended interface and direction.",
        "explanation": "A defined record without an active consumer sees no packets at that observation point.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Record exists but cache empty; next attachment check?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q03"
      },
      {
        "question": "Flexible NetFlow — Cache populated but collector blank; where next?",
        "answer": "Exporter path, template and collector decoding.",
        "explanation": "Observation and local caching precede distinct export/ingestion stages.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Cache populated but collector blank; where next?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q04"
      },
      {
        "question": "Flexible NetFlow — Are FNF fields universally supported on all IOS XE devices?",
        "answer": "No.",
        "explanation": "Hardware, release, license and observation feature combinations constrain support.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Are FNF fields universally supported on all IOS XE devices?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q05"
      },
      {
        "question": "Flexible NetFlow — Can a flow monitor replace an ACL?",
        "answer": "No.",
        "explanation": "Observation summarizes traffic; it does not inherently enforce a permit/deny policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Can a flow monitor replace an ACL?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q06"
      },
      {
        "question": "Flexible NetFlow — Exporter configured means records received?",
        "answer": "No.",
        "explanation": "Sender intent must be corroborated at the collector and with matching record schema.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Exporter configured means records received?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q07"
      },
      {
        "question": "Flexible NetFlow — What verifies a restored record key?",
        "answer": "Equivalent traffic produces intended cache aggregation and correctly decoded fields.",
        "explanation": "Configuration text alone does not prove the changed key is being consumed.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What verifies a restored record key?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q08"
      },
      {
        "question": "Flexible NetFlow — Why avoid unnecessary match fields?",
        "answer": "They can increase cache cardinality and resource work.",
        "explanation": "More detailed keys trade aggregation and capacity; they do not automatically improve detection quality.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why avoid unnecessary match fields?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q09"
      },
      {
        "question": "Flexible NetFlow — What rollback is precise?",
        "answer": "Restore the prior record/monitor/exporter associations and consuming attachment.",
        "explanation": "Removing a named object without restoring its consumer can leave monitoring absent.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What rollback is precise?",
        "topicId": "s4-g3-t1",
        "questionId": "s4-g3-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g3-t2",
    "batch": "11",
    "title": "IP SLA",
    "subtitle": "Read an active probe result in its actual source and operation context.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-ip-sla",
    "definition": "Cisco IP SLA performs configured active measurements such as ICMP echo or protocol-specific transactions on supported platforms. Each operation has a source, destination, timing and success interpretation. A probe measures that operation from that observer; a successful ping is not proof of an authenticated application workflow. Probe scheduling and return-code evidence are separate from merely defining an operation.",
    "purpose": "Read an active probe result in its actual source and operation context. Document operation type, source context, target, schedule, expected outcome and dependent consumer. Preserve probe reachability and management access. Verify baseline/fault/recovery from the same operation rather than switching to an easier target after failure.",
    "mental": "Use a three-column evidence notebook for IP SLA: prerequisite, observation and conclusion. Choose an operation that measures the intended dependency. ICMP echo observes an echo exchange; application operations have different semantics and support. Pin source/interface/VRF where relevant so the observation represents the intended path. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Operation represents intended path: Type, source and routing context match the desired measurement.",
      "Schedule and sample current: The operation runs and the supplied result is current.",
      "Measured operation succeeds: The supplied result code indicates this operation succeeded.",
      "Observation point: Compare operation source/schedule and current result code.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Choose an operation that measures the intended dependency. ICMP echo observes an echo exchange; application operations have different semantics and support. Pin source/interface/VRF where relevant so the observation represents the intended path.",
      "Confirm the operation is scheduled, record timeout/frequency and inspect return code and latency at a known time. A stale successful sample should not be treated as current service evidence. Missing schedule and failed transaction are different diagnoses.",
      "Tracking can consume selected SLA outcomes, but the probe itself changes no route merely by existing. Preserve measurement reachability when a dependent route withdraws so recovery remains observable; avoid a circular path dependency.",
      "The first decisive boundary in this worksheet is Operation represents intended path. A probe from another source or VRF may observe a different path.",
      "The later evidence boundaries are Schedule and sample current and Measured operation succeeds. A defined but unscheduled operation has no fresh measurement. This failure is scoped to the probe; this success is not general application proof."
    ],
    "flow": [
      [
        "IP SLA context",
        "Read an active probe result in its actual source and operation context. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Operation represents intended path",
        "Type, source and routing context match the desired measurement. A probe from another source or VRF may observe a different path."
      ],
      [
        "Schedule and sample current",
        "The operation runs and the supplied result is current. A defined but unscheduled operation has no fresh measurement."
      ],
      [
        "Measured operation succeeds",
        "The supplied result code indicates this operation succeeded. This failure is scoped to the probe; this success is not general application proof."
      ]
    ],
    "comparison": [
      [
        "Operation represents intended path",
        "Type, source and routing context match the desired measurement.",
        "A probe from another source or VRF may observe a different path."
      ],
      [
        "Schedule and sample current",
        "The operation runs and the supplied result is current.",
        "A defined but unscheduled operation has no fresh measurement."
      ],
      [
        "Measured operation succeeds",
        "The supplied result code indicates this operation succeeded.",
        "This failure is scoped to the probe; this success is not general application proof."
      ]
    ],
    "example": "An operator investigating IP SLA has an apparently healthy management path. Old success display while schedule stopped; conclusion? Insufficient current evidence. A timestamped historical sample is not a current measurement of availability. Compare that observation with the separate recovery question: How do you verify restored probe behavior? Restore the owned cause and observe fresh success from the original operation/source. Changing the source or target can make a different probe pass without repairing the original path. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Ports/protocol depend on the chosen operation: ICMP has no TCP/UDP port; TCP or UDP operations use their configured target service.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show ip sla configuration\nshow ip sla statistics",
        "platform": "Cisco IOS XE17 IP SLA-supported lab target · GUIDED NOT EXECUTED",
        "explanation": "Compare operation source/schedule and current result code.",
        "expected": "A successful ICMP operation is evidence of that echo exchange, not application health."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior IP SLA settings, version and consuming attachment before any change. Document operation type, source context, target, schedule, expected outcome and dependent consumer. Preserve probe reachability and management access. Verify baseline/fault/recovery from the same operation rather than switching to an easier target after failure. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Document operation type, source context, target, schedule, expected outcome and dependent consumer. Preserve probe reachability and management access. Verify baseline/fault/recovery from the same operation rather than switching to an easier target after failure.",
    "troubleshooting": [
      [
        "Operation represents intended path boundary fails",
        "A probe from another source or VRF may observe a different path. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Schedule and sample current boundary fails",
        "A defined but unscheduled operation has no fresh measurement. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Measured operation succeeds boundary fails",
        "This failure is scoped to the probe; this success is not general application proof. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Bound probe rates and use owned targets. Active probes can be filtered or manipulated; they do not authenticate the whole service or authorize routing changes without an explicit consumer.",
    "performance": "What tradeoff does higher probe frequency create? Faster sampling with more traffic and processing. Frequency is not convergence time; timeout and consumer delays also matter. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Definition and execution schedule are independent configuration requirements.",
      "A timestamped historical sample is not a current measurement of availability.",
      "Maintain an independently valid measurement path or an explicitly designed recovery mechanism.",
      "Frequency is not convergence time; timeout and consumer delays also matter."
    ],
    "prerequisites": [
      "s4-g0-t3"
    ],
    "related": [
      "s4-g3-t3"
    ],
    "lab": {
      "objective": "Read an active probe result in its actual source and operation context. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → IP SLA endpoint",
        "Boundary: Operation represents intended path → Schedule and sample current → Measured operation succeeds",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On a supported disposable router, prepare one ICMP echo operation to an owned address with explicit source interface/VRF, frequency and timeout; schedule it under the supported release syntax. Preserve a path for the measurement independent of any route consumer.",
        "Block only the owned echo path and record a fresh return code; restore that path and observe a fresh original-source success. Avoid substituting a different destination.",
        "Record configuration, schedule, sample time/latency and result. If an application operation is intended, test that exact operation separately.",
        "Open the IP SLA evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A probe from another source or VRF may observe a different path. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A defined but unscheduled operation has no fresh measurement. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: This failure is scoped to the probe; this success is not general application proof. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Document operation type, source context, target, schedule, expected outcome and dependent consumer. Preserve probe reachability and management access. Verify baseline/fault/recovery from the same operation rather than switching to an easier target after failure."
      ],
      "verification": "A successful ICMP operation is evidence of that echo exchange, not application health. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A probe from another source or VRF may observe a different path. A defined but unscheduled operation has no fresh measurement. This failure is scoped to the probe; this success is not general application proof. Separate invalid inputs from a valid negative service result.",
      "challenge": "What belongs in an incident record? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Operation represents intended path": "Type, source and routing context match the desired measurement.",
      "Schedule and sample current": "The operation runs and the supplied result is current.",
      "Measured operation succeeds": "The supplied result code indicates this operation succeeded."
    },
    "sources": [
      {
        "title": "Cisco IOS XE IP SLA guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_sla_overview.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "ICMP SLA succeeds; authenticated web workflow verified?",
        "answer": "No.",
        "explanation": "Echo reply and a protected application transaction test different dependencies.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "ICMP SLA succeeds; authenticated web workflow verified?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-QC1"
      },
      {
        "question": "Operation defined but never scheduled; result expected?",
        "answer": "No fresh measurement.",
        "explanation": "Definition and execution schedule are independent configuration requirements.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Operation defined but never scheduled; result expected?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-QC2"
      },
      {
        "question": "Why specify source or VRF?",
        "answer": "To measure the intended observer and path.",
        "explanation": "A different source may follow another route and policy, hiding the original failure.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why specify source or VRF?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-QC3"
      }
    ],
    "exams": [
      {
        "question": "IP SLA — ICMP SLA succeeds; authenticated web workflow verified?",
        "answer": "No.",
        "explanation": "Echo reply and a protected application transaction test different dependencies.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "ICMP SLA succeeds; authenticated web workflow verified?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q01",
        "options": [
          "Only if the target is the default gateway.",
          "No.",
          "Yes; ICMP verifies all authenticated workflows.",
          "Yes; an echo reply validates server certificates."
        ]
      },
      {
        "question": "IP SLA — Operation defined but never scheduled; result expected?",
        "answer": "No fresh measurement.",
        "explanation": "Definition and execution schedule are independent configuration requirements.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Operation defined but never scheduled; result expected?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q02"
      },
      {
        "question": "IP SLA — Why specify source or VRF?",
        "answer": "To measure the intended observer and path.",
        "explanation": "A different source may follow another route and policy, hiding the original failure.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why specify source or VRF?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q03"
      },
      {
        "question": "IP SLA — Old success display while schedule stopped; conclusion?",
        "answer": "Insufficient current evidence.",
        "explanation": "A timestamped historical sample is not a current measurement of availability.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Old success display while schedule stopped; conclusion?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q04"
      },
      {
        "question": "IP SLA — Does creating an SLA operation change routes automatically?",
        "answer": "No.",
        "explanation": "An explicit tracking/routing consumer is required to act on its results.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does creating an SLA operation change routes automatically?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q05"
      },
      {
        "question": "IP SLA — What can prevent recovery detection after route withdrawal?",
        "answer": "The probe depends on the very route its failure removes.",
        "explanation": "Maintain an independently valid measurement path or an explicitly designed recovery mechanism.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What can prevent recovery detection after route withdrawal?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q06"
      },
      {
        "question": "IP SLA — Is every operation supported on every platform?",
        "answer": "No.",
        "explanation": "Release, hardware and feature support must be verified before applying the reference procedure.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Is every operation supported on every platform?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q07"
      },
      {
        "question": "IP SLA — How do you verify restored probe behavior?",
        "answer": "Restore the owned cause and observe fresh success from the original operation/source.",
        "explanation": "Changing the source or target can make a different probe pass without repairing the original path.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How do you verify restored probe behavior?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q08"
      },
      {
        "question": "IP SLA — What tradeoff does higher probe frequency create?",
        "answer": "Faster sampling with more traffic and processing.",
        "explanation": "Frequency is not convergence time; timeout and consumer delays also matter.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What tradeoff does higher probe frequency create?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q09"
      },
      {
        "question": "IP SLA — What belongs in an incident record?",
        "answer": "Operation, source/VRF, target, sample time, return code and consumer state.",
        "explanation": "That scope prevents a narrow probe result being promoted to a universal service claim.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What belongs in an incident record?",
        "topicId": "s4-g3-t2",
        "questionId": "s4-g3-t2-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g3-t3",
    "batch": "11",
    "title": "Object Tracking",
    "subtitle": "Convert scoped observations into delayed state without losing the recovery path.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-tracking",
    "definition": "Object tracking exposes a state derived from an interface, route, IP SLA result or supported logical combination to a consuming feature. Tracking does not itself create a route, elect a gateway or test an application; those effects depend on the consumer. Delay-up and delay-down can hold a state transition to reduce flapping. A configuration and a current accepted state are separate observations.",
    "purpose": "Convert scoped observations into delayed state without losing the recovery path. Record object identity, type, delay policy and every consumer. Preserve exact tracked-route attachment and ensure probe/management reachability. Verify the timeline of measurement, accepted state and consumer action rather than relying on one instantaneous display.",
    "mental": "Use a three-column evidence notebook for Object Tracking: prerequisite, observation and conclusion. Define the tracked object and its underlying measurement. The meaning of up/down follows that object type; interface line protocol, prefix reachability and an SLA return code are not interchangeable application tests. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Underlying observation valid: The supplied measurement belongs to the intended object and context.",
      "Delay policy satisfied: The new condition has persisted through the configured transition delay.",
      "Consumer and recovery path valid: The consumer is attached and measurement can still detect recovery.",
      "Observation point: Read object type, state/delay and the actual consuming route separately.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Define the tracked object and its underlying measurement. The meaning of up/down follows that object type; interface line protocol, prefix reachability and an SLA return code are not interchangeable application tests.",
      "A delay policy can keep the accepted state unchanged until the new condition persists sufficiently. Up delay and down delay are independent. Check sample timing and pending state before assuming one failed probe immediately withdrew a route.",
      "Identify the routing or redundancy consumer and keep measurement reachability independent where necessary. If withdrawal removes the probe path, restoring the remote service may not produce a new success. Restore the actual owned path before claiming recovery.",
      "The first decisive boundary in this worksheet is Underlying observation valid. A mismatched probe cannot safely govern the intended route.",
      "The later evidence boundaries are Delay policy satisfied and Consumer and recovery path valid. One changed sample may not immediately change the accepted track state. A route withdrawn by its own dependent probe can prevent later recovery observations."
    ],
    "flow": [
      [
        "Object Tracking context",
        "Convert scoped observations into delayed state without losing the recovery path. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Underlying observation valid",
        "The supplied measurement belongs to the intended object and context. A mismatched probe cannot safely govern the intended route."
      ],
      [
        "Delay policy satisfied",
        "The new condition has persisted through the configured transition delay. One changed sample may not immediately change the accepted track state."
      ],
      [
        "Consumer and recovery path valid",
        "The consumer is attached and measurement can still detect recovery. A route withdrawn by its own dependent probe can prevent later recovery observations."
      ]
    ],
    "comparison": [
      [
        "Underlying observation valid",
        "The supplied measurement belongs to the intended object and context.",
        "A mismatched probe cannot safely govern the intended route."
      ],
      [
        "Delay policy satisfied",
        "The new condition has persisted through the configured transition delay.",
        "One changed sample may not immediately change the accepted track state."
      ],
      [
        "Consumer and recovery path valid",
        "The consumer is attached and measurement can still detect recovery.",
        "A route withdrawn by its own dependent probe can prevent later recovery observations."
      ]
    ],
    "example": "An operator investigating Object Tracking has an apparently healthy management path. Track up but route absent; inspect what? The actual consumer attachment and route eligibility. A valid object state is only an input to the consuming feature. Compare that observation with the separate recovery question: How verify restoration? Observe fresh measurement, accepted track state, consumer state and original transaction. A restored checkbox or configuration does not establish all downstream effects. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Tracking has no intrinsic transport port. Its underlying IP SLA or service measurement determines network traffic.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show track\nshow ip route 198.51.100.0/24",
        "platform": "Cisco IOS XE17 enhanced tracking lab; prefix placeholder · GUIDED NOT EXECUTED",
        "explanation": "Read object type, state/delay and the actual consuming route separately.",
        "expected": "Object up does not prove consumer installation, forwarding or the original application transaction."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Object Tracking settings, version and consuming attachment before any change. Record object identity, type, delay policy and every consumer. Preserve exact tracked-route attachment and ensure probe/management reachability. Verify the timeline of measurement, accepted state and consumer action rather than relying on one instantaneous display. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Record object identity, type, delay policy and every consumer. Preserve exact tracked-route attachment and ensure probe/management reachability. Verify the timeline of measurement, accepted state and consumer action rather than relying on one instantaneous display.",
    "troubleshooting": [
      [
        "Underlying observation valid boundary fails",
        "A mismatched probe cannot safely govern the intended route. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Delay policy satisfied boundary fails",
        "One changed sample may not immediately change the accepted track state. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Consumer and recovery path valid boundary fails",
        "A route withdrawn by its own dependent probe can prevent later recovery observations. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Restrict configuration changes and protect management during intentional down states. A spoofable measurement can influence an availability decision; match the tracked condition to a justified dependency.",
    "performance": "Does a longer delay always increase availability? No; it can prolong use of a failed dependency. Stability and detection time trade off; use actual workload and recovery evidence. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "The accepted state can remain unchanged until transition timing satisfies policy.",
      "A valid object state is only an input to the consuming feature.",
      "The measurement needs a path that remains valid or an explicit recovery design.",
      "Stability and detection time trade off; use actual workload and recovery evidence."
    ],
    "prerequisites": [
      "s4-g3-t2"
    ],
    "related": [
      "s4-g4-t0"
    ],
    "lab": {
      "objective": "Convert scoped observations into delayed state without losing the recovery path. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Object Tracking endpoint",
        "Boundary: Underlying observation valid → Delay policy satisfied → Consumer and recovery path valid",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Define an owned track object consuming the previously prepared SLA result and explicit delay-down10s/delay-up20s, then attach only the intended lab route or redundancy consumer. Preserve independent probe and console paths.",
        "Induce a down result for less than10s, then a longer sustained failure; record accepted state and consumer action. Restore underlying path and observe20s recovery behavior without removing the measurement route.",
        "Keep the sample/pending/accepted/consumer timeline and verify the original transaction after precise restore.",
        "Open the Object Tracking evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A mismatched probe cannot safely govern the intended route. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: One changed sample may not immediately change the accepted track state. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A route withdrawn by its own dependent probe can prevent later recovery observations. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Record object identity, type, delay policy and every consumer. Preserve exact tracked-route attachment and ensure probe/management reachability. Verify the timeline of measurement, accepted state and consumer action rather than relying on one instantaneous display."
      ],
      "verification": "Object up does not prove consumer installation, forwarding or the original application transaction. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A mismatched probe cannot safely govern the intended route. One changed sample may not immediately change the accepted track state. A route withdrawn by its own dependent probe can prevent later recovery observations. Separate invalid inputs from a valid negative service result.",
      "challenge": "What timeline should be recorded? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Underlying observation valid": "The supplied measurement belongs to the intended object and context.",
      "Delay policy satisfied": "The new condition has persisted through the configured transition delay.",
      "Consumer and recovery path valid": "The consumer is attached and measurement can still detect recovery."
    },
    "sources": [
      {
        "title": "Cisco IOS XE17 enhanced object tracking",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/ip/b_1715_ip_9300_cg/configuring_enhanced___object_tracking.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Does a tracking object install a route by itself?",
        "answer": "No.",
        "explanation": "A consuming routing or redundancy feature must be explicitly attached.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does a tracking object install a route by itself?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-QC1"
      },
      {
        "question": "Down sample during delay-down guarantees immediate withdrawal?",
        "answer": "No.",
        "explanation": "The accepted state can remain unchanged until transition timing satisfies policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Down sample during delay-down guarantees immediate withdrawal?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-QC2"
      },
      {
        "question": "Is interface-up proof of application health?",
        "answer": "No.",
        "explanation": "Line protocol state has a narrower meaning than a verified application transaction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is interface-up proof of application health?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-QC3"
      }
    ],
    "exams": [
      {
        "question": "Object Tracking — Does a tracking object install a route by itself?",
        "answer": "No.",
        "explanation": "A consuming routing or redundancy feature must be explicitly attached.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Does a tracking object install a route by itself?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q01",
        "options": [
          "No.",
          "Yes; defining a track object installs all routes.",
          "Yes; an object replaces every routing consumer.",
          "Only if the underlying probe uses TCP."
        ]
      },
      {
        "question": "Object Tracking — Down sample during delay-down guarantees immediate withdrawal?",
        "answer": "No.",
        "explanation": "The accepted state can remain unchanged until transition timing satisfies policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Down sample during delay-down guarantees immediate withdrawal?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q02"
      },
      {
        "question": "Object Tracking — Is interface-up proof of application health?",
        "answer": "No.",
        "explanation": "Line protocol state has a narrower meaning than a verified application transaction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Is interface-up proof of application health?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q03"
      },
      {
        "question": "Object Tracking — Track up but route absent; inspect what?",
        "answer": "The actual consumer attachment and route eligibility.",
        "explanation": "A valid object state is only an input to the consuming feature.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Track up but route absent; inspect what?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q04"
      },
      {
        "question": "Object Tracking — Why separate up and down delays?",
        "answer": "Recovery and failure stabilization may need different durations.",
        "explanation": "Delay choices affect state timing, not the semantic meaning of the underlying observation.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Why separate up and down delays?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q05"
      },
      {
        "question": "Object Tracking — Probe route removed by its own tracking failure; danger?",
        "answer": "Recovery can become unobservable.",
        "explanation": "The measurement needs a path that remains valid or an explicit recovery design.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Probe route removed by its own tracking failure; danger?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q06"
      },
      {
        "question": "Object Tracking — Can logical object combinations be assumed universal?",
        "answer": "No; inspect the supported type and exact boolean policy.",
        "explanation": "AND/OR or threshold semantics depend on configured feature support and consumer intent.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Can logical object combinations be assumed universal?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q07"
      },
      {
        "question": "Object Tracking — How verify restoration?",
        "answer": "Observe fresh measurement, accepted track state, consumer state and original transaction.",
        "explanation": "A restored checkbox or configuration does not establish all downstream effects.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restoration?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q08"
      },
      {
        "question": "Object Tracking — Does a longer delay always increase availability?",
        "answer": "No; it can prolong use of a failed dependency.",
        "explanation": "Stability and detection time trade off; use actual workload and recovery evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does a longer delay always increase availability?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q09"
      },
      {
        "question": "Object Tracking — What timeline should be recorded?",
        "answer": "Sample time, pending transition, accepted state and consumer action.",
        "explanation": "A single display can miss the delay between observation and operational effect.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What timeline should be recorded?",
        "topicId": "s4-g3-t3",
        "questionId": "s4-g3-t3-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t0",
    "batch": "11",
    "title": "Cisco Discovery Protocol",
    "subtitle": "Use neighbor advertisements as local attachment clues, with explicit trust limits.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-cdp",
    "definition": "Cisco Discovery Protocol advertises device and interface information to directly connected participating neighbors at Layer 2. A neighbor table supplies topology clues such as device identity, port and capabilities. It does not prove IP routing, endpoint authentication or an application reply. Information may remain until its holdtime expires, and a lack of advertisements can reflect disabled discovery rather than a broken link.",
    "purpose": "Use neighbor advertisements as local attachment clues, with explicit trust limits. Enable discovery only where its operational value fits the exposure policy. Preserve interface-level and global state before a lab disable/restore. Correlate local port, remote advertised port and actual patch/virtual-link mapping.",
    "mental": "Use a three-column evidence notebook for Cisco Discovery Protocol: prerequisite, observation and conclusion. Identify the local receiving interface and remote advertised device/port. CDP information is scoped to a local adjacency and should be compared with physical or virtual attachment evidence. Devices that do not implement or enable CDP need not appear. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Local discovery enabled: The receiving lab interface participates in CDP.",
      "Advertisement is current: The supplied entry remains valid in its holdtime context.",
      "Attachment corroborated independently: Port mapping is compared with separate owned topology evidence.",
      "Observation point: Read neighbor metadata and local advertisement status.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the local receiving interface and remote advertised device/port. CDP information is scoped to a local adjacency and should be compared with physical or virtual attachment evidence. Devices that do not implement or enable CDP need not appear.",
      "Interpret advertised management addresses and capabilities as supplied metadata. They do not establish a reachable management service or authorized endpoint. A stale entry can outlive a failed or changed attachment until aging removes it.",
      "Change discovery only on an owned lab interface, compare before/fault/after neighbor evidence and restore it. Verify the original service separately; do not bounce links just to refresh a topology hypothesis.",
      "The first decisive boundary in this worksheet is Local discovery enabled. No entry with discovery disabled does not establish physical link failure.",
      "The later evidence boundaries are Advertisement is current and Attachment corroborated independently. A stale cached advertisement can survive a failed attachment temporarily. Advertised identity alone is not authenticated physical or service evidence."
    ],
    "flow": [
      [
        "Cisco Discovery Protocol context",
        "Use neighbor advertisements as local attachment clues, with explicit trust limits. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Local discovery enabled",
        "The receiving lab interface participates in CDP. No entry with discovery disabled does not establish physical link failure."
      ],
      [
        "Advertisement is current",
        "The supplied entry remains valid in its holdtime context. A stale cached advertisement can survive a failed attachment temporarily."
      ],
      [
        "Attachment corroborated independently",
        "Port mapping is compared with separate owned topology evidence. Advertised identity alone is not authenticated physical or service evidence."
      ]
    ],
    "comparison": [
      [
        "Local discovery enabled",
        "The receiving lab interface participates in CDP.",
        "No entry with discovery disabled does not establish physical link failure."
      ],
      [
        "Advertisement is current",
        "The supplied entry remains valid in its holdtime context.",
        "A stale cached advertisement can survive a failed attachment temporarily."
      ],
      [
        "Attachment corroborated independently",
        "Port mapping is compared with separate owned topology evidence.",
        "Advertised identity alone is not authenticated physical or service evidence."
      ]
    ],
    "example": "An operator investigating Cisco Discovery Protocol has an apparently healthy management path. Link changed but old neighbor remains; why possible? Holdtime aging can retain prior information temporarily. Neighbor state must be interpreted with observation time and refresh/expiry context. Compare that observation with the separate recovery question: How verify restored discovery? Observe fresh intended neighbor on the same local interface after restore. A global enable flag alone does not establish interface participation or a received advertisement. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "CDP is a Layer 2 discovery protocol with no TCP/UDP service port; it does not route across ordinary L3 boundaries.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show cdp neighbors detail\nshow cdp interface",
        "platform": "Cisco IOS XE17 CDP-supported lab device · GUIDED NOT EXECUTED",
        "explanation": "Read neighbor metadata and local advertisement status.",
        "expected": "A neighbor entry is an advertised local attachment clue, not verified routed management access."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior Cisco Discovery Protocol settings, version and consuming attachment before any change. Enable discovery only where its operational value fits the exposure policy. Preserve interface-level and global state before a lab disable/restore. Correlate local port, remote advertised port and actual patch/virtual-link mapping. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Enable discovery only where its operational value fits the exposure policy. Preserve interface-level and global state before a lab disable/restore. Correlate local port, remote advertised port and actual patch/virtual-link mapping.",
    "troubleshooting": [
      [
        "Local discovery enabled boundary fails",
        "No entry with discovery disabled does not establish physical link failure. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Advertisement is current boundary fails",
        "A stale cached advertisement can survive a failed attachment temporarily. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Attachment corroborated independently boundary fails",
        "Advertised identity alone is not authenticated physical or service evidence. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "CDP reveals infrastructure metadata and its advertisements are not endpoint authentication. Restrict untrusted-edge exposure and treat received names/addresses as untrusted input.",
    "performance": "Why not infer throughput from neighbor capability? Capabilities are advertisements rather than traffic measurements. Operational bandwidth and application performance require separate observations. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "An advertised address is metadata, not an observed routed transaction.",
      "Neighbor state must be interpreted with observation time and refresh/expiry context.",
      "Topology assistance should be balanced with identity/address disclosure policy.",
      "Operational bandwidth and application performance require separate observations."
    ],
    "prerequisites": [
      "s2-g0-t0"
    ],
    "related": [
      "s4-g4-t1"
    ],
    "lab": {
      "objective": "Use neighbor advertisements as local attachment clues, with explicit trust limits. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → Cisco Discovery Protocol endpoint",
        "Boundary: Local discovery enabled → Advertisement is current → Attachment corroborated independently",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On one owned directly connected lab pair, inspect local/global CDP participation and capture device ID, local/remote port and holdtime. Compare against a separate cable or virtual-link mapping.",
        "Disable only the owned interface advertisement, retain the last entry and observe holdtime aging. Restore exact participation and wait for a fresh advertisement.",
        "Verify the expected neighbor at the same local observer; test routed management separately and do not authenticate identity from the advertised name.",
        "Open the Cisco Discovery Protocol evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: No entry with discovery disabled does not establish physical link failure. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A stale cached advertisement can survive a failed attachment temporarily. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Advertised identity alone is not authenticated physical or service evidence. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Enable discovery only where its operational value fits the exposure policy. Preserve interface-level and global state before a lab disable/restore. Correlate local port, remote advertised port and actual patch/virtual-link mapping."
      ],
      "verification": "A neighbor entry is an advertised local attachment clue, not verified routed management access. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "No entry with discovery disabled does not establish physical link failure. A stale cached advertisement can survive a failed attachment temporarily. Advertised identity alone is not authenticated physical or service evidence. Separate invalid inputs from a valid negative service result.",
      "challenge": "What is the useful topology record? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Local discovery enabled": "The receiving lab interface participates in CDP.",
      "Advertisement is current": "The supplied entry remains valid in its holdtime context.",
      "Attachment corroborated independently": "Port mapping is compared with separate owned topology evidence."
    },
    "sources": [
      {
        "title": "Cisco IOS XE CDP configuration",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/syst-mgmt/b-system-management/m_nm-cdp-discover-xe.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "CDP uses TCP or UDP?",
        "answer": "Neither; it operates at Layer 2.",
        "explanation": "A TCP/UDP port list cannot describe local CDP neighbor discovery.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "CDP uses TCP or UDP?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-QC1"
      },
      {
        "question": "Neighbor advertises an IP; routing verified?",
        "answer": "No.",
        "explanation": "An advertised address is metadata, not an observed routed transaction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Neighbor advertises an IP; routing verified?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-QC2"
      },
      {
        "question": "No neighbor with CDP disabled means cable broken?",
        "answer": "No.",
        "explanation": "Discovery participation is a prerequisite separate from carrier and cabling evidence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "No neighbor with CDP disabled means cable broken?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-QC3"
      }
    ],
    "exams": [
      {
        "question": "Cisco Discovery Protocol — CDP uses TCP or UDP?",
        "answer": "Neither; it operates at Layer 2.",
        "explanation": "A TCP/UDP port list cannot describe local CDP neighbor discovery.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "CDP uses TCP or UDP?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q01",
        "options": [
          "TCP 179",
          "UDP 161",
          "TCP 22",
          "Neither; it operates at Layer 2."
        ]
      },
      {
        "question": "Cisco Discovery Protocol — Neighbor advertises an IP; routing verified?",
        "answer": "No.",
        "explanation": "An advertised address is metadata, not an observed routed transaction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Neighbor advertises an IP; routing verified?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q02"
      },
      {
        "question": "Cisco Discovery Protocol — No neighbor with CDP disabled means cable broken?",
        "answer": "No.",
        "explanation": "Discovery participation is a prerequisite separate from carrier and cabling evidence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "No neighbor with CDP disabled means cable broken?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q03"
      },
      {
        "question": "Cisco Discovery Protocol — Link changed but old neighbor remains; why possible?",
        "answer": "Holdtime aging can retain prior information temporarily.",
        "explanation": "Neighbor state must be interpreted with observation time and refresh/expiry context.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Link changed but old neighbor remains; why possible?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q04"
      },
      {
        "question": "Cisco Discovery Protocol — Does an advertised name authenticate the device?",
        "answer": "No.",
        "explanation": "Received metadata can be forged or misleading and needs an independent trust mechanism.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does an advertised name authenticate the device?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q05"
      },
      {
        "question": "Cisco Discovery Protocol — Where should discovery exposure be restricted?",
        "answer": "Untrusted attachment points where metadata disclosure is unnecessary.",
        "explanation": "Topology assistance should be balanced with identity/address disclosure policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Where should discovery exposure be restricted?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q06"
      },
      {
        "question": "Cisco Discovery Protocol — Does CDP traverse an ordinary router hop?",
        "answer": "No.",
        "explanation": "Its local link scope differs from routed management protocols.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does CDP traverse an ordinary router hop?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q07"
      },
      {
        "question": "Cisco Discovery Protocol — How verify restored discovery?",
        "answer": "Observe fresh intended neighbor on the same local interface after restore.",
        "explanation": "A global enable flag alone does not establish interface participation or a received advertisement.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored discovery?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q08"
      },
      {
        "question": "Cisco Discovery Protocol — Why not infer throughput from neighbor capability?",
        "answer": "Capabilities are advertisements rather than traffic measurements.",
        "explanation": "Operational bandwidth and application performance require separate observations.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why not infer throughput from neighbor capability?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q09"
      },
      {
        "question": "Cisco Discovery Protocol — What is the useful topology record?",
        "answer": "Local port, remote advertised port, observation time and corroborated attachment.",
        "explanation": "Combining names without observer context can connect unrelated interfaces incorrectly.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What is the useful topology record?",
        "topicId": "s4-g4-t0",
        "questionId": "s4-g4-t0-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t1",
    "batch": "11",
    "title": "LLDP",
    "subtitle": "Read standardized local-link discovery without treating a neighbor table as authorization.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-lldp",
    "definition": "LLDP is standardized local-link discovery using advertisements containing chassis and port identifiers and additional optional TLVs. It helps map adjacent interfaces across participating vendors, while optional extensions can convey endpoint-specific information. Advertising and receiving can be independently controlled by implementations. A management-address TLV is not proof of a reachable host, and discovery does not grant network access.",
    "purpose": "Read standardized local-link discovery without treating a neighbor table as authorization. Plan per-interface transmit/receive participation and metadata exposure. Save chassis/port/TTL evidence before one controlled change. Validate cross-vendor field interpretation and corroborate any management or endpoint policy claims independently.",
    "mental": "Use a three-column evidence notebook for LLDP: prerequisite, observation and conclusion. Interpret chassis ID subtype and port ID subtype rather than assuming both are friendly names or MAC addresses. Preserve the receiving interface and TTL with the advertised values; optional system or management fields may be absent. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Participation matches direction: The relevant transmitter and receiver participate.",
      "Neighbor TTL is current: The advertised state is valid at this observation time.",
      "Identifier context understood: Chassis/port subtype and separate topology evidence are supplied.",
      "Observation point: Compare per-interface participation, TTL and neighbor TLVs.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Interpret chassis ID subtype and port ID subtype rather than assuming both are friendly names or MAC addresses. Preserve the receiving interface and TTL with the advertised values; optional system or management fields may be absent.",
      "A neighbor record remains subject to advertisement refresh and TTL expiry. Missing records can indicate disabled transmission/reception, unsupported participation or a link problem. Compare local LLDP status and independent attachment evidence before choosing a cause.",
      "Inspect extension applicability and trust separately from base LLDP. A phone-related TLV does not prove voice VLAN/QoS configuration was accepted. Restore only the owned participation settings and verify fresh advertisements at the same observer.",
      "The first decisive boundary in this worksheet is Participation matches direction. A disabled receive path can hide a healthy link advertisement.",
      "The later evidence boundaries are Neighbor TTL is current and Identifier context understood. An aged or stale entry is not a fresh attachment observation. Assuming every ID is a MAC address can misidentify the neighbor."
    ],
    "flow": [
      [
        "LLDP context",
        "Read standardized local-link discovery without treating a neighbor table as authorization. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Participation matches direction",
        "The relevant transmitter and receiver participate. A disabled receive path can hide a healthy link advertisement."
      ],
      [
        "Neighbor TTL is current",
        "The advertised state is valid at this observation time. An aged or stale entry is not a fresh attachment observation."
      ],
      [
        "Identifier context understood",
        "Chassis/port subtype and separate topology evidence are supplied. Assuming every ID is a MAC address can misidentify the neighbor."
      ]
    ],
    "comparison": [
      [
        "Participation matches direction",
        "The relevant transmitter and receiver participate.",
        "A disabled receive path can hide a healthy link advertisement."
      ],
      [
        "Neighbor TTL is current",
        "The advertised state is valid at this observation time.",
        "An aged or stale entry is not a fresh attachment observation."
      ],
      [
        "Identifier context understood",
        "Chassis/port subtype and separate topology evidence are supplied.",
        "Assuming every ID is a MAC address can misidentify the neighbor."
      ]
    ],
    "example": "An operator investigating LLDP has an apparently healthy management path. No LLDP neighbor; first evidence before link reset? Participation, refresh/TTL and independent link/attachment state. Discovery absence has several causes beyond physical failure. Compare that observation with the separate recovery question: How verify restore? Fresh intended TLVs received on the original local interface. Configuration intent should be corroborated by current observer data. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "LLDP uses local Layer 2 frames rather than a TCP/UDP service port. It does not prove routed reachability.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "show lldp neighbors detail\nshow lldp interface",
        "platform": "Cisco IOS XE17 LLDP-supported target · GUIDED NOT EXECUTED",
        "explanation": "Compare per-interface participation, TTL and neighbor TLVs.",
        "expected": "Neighbor fields identify advertised context; validate actual attachment and service separately."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior LLDP settings, version and consuming attachment before any change. Plan per-interface transmit/receive participation and metadata exposure. Save chassis/port/TTL evidence before one controlled change. Validate cross-vendor field interpretation and corroborate any management or endpoint policy claims independently. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Plan per-interface transmit/receive participation and metadata exposure. Save chassis/port/TTL evidence before one controlled change. Validate cross-vendor field interpretation and corroborate any management or endpoint policy claims independently.",
    "troubleshooting": [
      [
        "Participation matches direction boundary fails",
        "A disabled receive path can hide a healthy link advertisement. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Neighbor TTL is current boundary fails",
        "An aged or stale entry is not a fresh attachment observation. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Identifier context understood boundary fails",
        "Assuming every ID is a MAC address can misidentify the neighbor. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Advertisements expose topology and may contain untrusted identifiers. Limit unnecessary edge exposure and do not use neighbor presence as authentication or a replacement for 802.1X.",
    "performance": "Does LLDP measure application bandwidth? No. Local discovery describes attachment metadata rather than actual traffic performance. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "The field is advertised metadata rather than a protected routed transaction.",
      "Discovery absence has several causes beyond physical failure.",
      "Advertised information and actual endpoint/port behavior need separate verification.",
      "Local discovery describes attachment metadata rather than actual traffic performance."
    ],
    "prerequisites": [
      "s4-g4-t0"
    ],
    "related": [
      "s4-g4-t2"
    ],
    "lab": {
      "objective": "Read standardized local-link discovery without treating a neighbor table as authorization. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → LLDP endpoint",
        "Boundary: Participation matches direction → Neighbor TTL is current → Identifier context understood",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "On an owned two-device link, record transmit/receive policy, chassis/port ID subtypes, TTL and optional management fields. Verify support and separate physical/virtual attachment evidence.",
        "Disable only one lab direction of LLDP participation and observe its effect on the two receivers separately. Restore policy and compare fresh TLVs.",
        "Record receiving interface, ID subtype, TTL/time and intended attachment. Optional phone policy requires independent endpoint/VLAN/QoS evidence.",
        "Open the LLDP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A disabled receive path can hide a healthy link advertisement. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: An aged or stale entry is not a fresh attachment observation. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Assuming every ID is a MAC address can misidentify the neighbor. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Plan per-interface transmit/receive participation and metadata exposure. Save chassis/port/TTL evidence before one controlled change. Validate cross-vendor field interpretation and corroborate any management or endpoint policy claims independently."
      ],
      "verification": "Neighbor fields identify advertised context; validate actual attachment and service separately. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A disabled receive path can hide a healthy link advertisement. An aged or stale entry is not a fresh attachment observation. Assuming every ID is a MAC address can misidentify the neighbor. Separate invalid inputs from a valid negative service result.",
      "challenge": "What makes a defensible neighbor record? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Participation matches direction": "The relevant transmitter and receiver participate.",
      "Neighbor TTL is current": "The advertised state is valid at this observation time.",
      "Identifier context understood": "Chassis/port subtype and separate topology evidence are supplied."
    },
    "sources": [
      {
        "title": "IEEE802.1AB standard overview",
        "url": "https://standards.ieee.org/standard/802_1AB-2016.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Are chassis and port IDs always MAC addresses?",
        "answer": "No; interpret identifier subtypes.",
        "explanation": "LLDP identifiers support multiple forms, so subtype is part of the observation.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Are chassis and port IDs always MAC addresses?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-QC1"
      },
      {
        "question": "A management-address TLV proves SSH works?",
        "answer": "No.",
        "explanation": "The field is advertised metadata rather than a protected routed transaction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A management-address TLV proves SSH works?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-QC2"
      },
      {
        "question": "Transmit enabled, receive disabled; local table guaranteed?",
        "answer": "No.",
        "explanation": "Sending and receiving participation can be independently configured.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Transmit enabled, receive disabled; local table guaranteed?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-QC3"
      }
    ],
    "exams": [
      {
        "question": "LLDP — Are chassis and port IDs always MAC addresses?",
        "answer": "No; interpret identifier subtypes.",
        "explanation": "LLDP identifiers support multiple forms, so subtype is part of the observation.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Are chassis and port IDs always MAC addresses?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q01",
        "options": [
          "Yes; each port identifier is an IPv4 address.",
          "Only system names are permitted identifiers.",
          "No; interpret identifier subtypes.",
          "Yes; all identifiers have MAC subtype."
        ]
      },
      {
        "question": "LLDP — A management-address TLV proves SSH works?",
        "answer": "No.",
        "explanation": "The field is advertised metadata rather than a protected routed transaction.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "A management-address TLV proves SSH works?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q02"
      },
      {
        "question": "LLDP — Transmit enabled, receive disabled; local table guaranteed?",
        "answer": "No.",
        "explanation": "Sending and receiving participation can be independently configured.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Transmit enabled, receive disabled; local table guaranteed?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q03"
      },
      {
        "question": "LLDP — No LLDP neighbor; first evidence before link reset?",
        "answer": "Participation, refresh/TTL and independent link/attachment state.",
        "explanation": "Discovery absence has several causes beyond physical failure.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "No LLDP neighbor; first evidence before link reset?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q04"
      },
      {
        "question": "LLDP — Does LLDP grant network authorization?",
        "answer": "No.",
        "explanation": "Topology advertisement is separate from identity-based access control.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does LLDP grant network authorization?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q05"
      },
      {
        "question": "LLDP — Can a phone TLV prove voice QoS applied?",
        "answer": "No.",
        "explanation": "Advertised information and actual endpoint/port behavior need separate verification.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Can a phone TLV prove voice QoS applied?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q06"
      },
      {
        "question": "LLDP — What does TTL govern?",
        "answer": "Lifetime of advertised neighbor information.",
        "explanation": "Expiry relates to table freshness, not a universal service timeout.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What does TTL govern?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q07"
      },
      {
        "question": "LLDP — How verify restore?",
        "answer": "Fresh intended TLVs received on the original local interface.",
        "explanation": "Configuration intent should be corroborated by current observer data.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restore?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q08"
      },
      {
        "question": "LLDP — Does LLDP measure application bandwidth?",
        "answer": "No.",
        "explanation": "Local discovery describes attachment metadata rather than actual traffic performance.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does LLDP measure application bandwidth?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q09"
      },
      {
        "question": "LLDP — What makes a defensible neighbor record?",
        "answer": "Receiver port, ID subtypes, TTL/time and independent attachment evidence.",
        "explanation": "Names alone can be ambiguous across interfaces and reused devices.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What makes a defensible neighbor record?",
        "topicId": "s4-g4-t1",
        "questionId": "s4-g4-t1-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t2",
    "batch": "11",
    "title": "SSH",
    "subtitle": "Verify the server host before authenticating the administrative user.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-ssh",
    "definition": "SSH establishes a protected remote-session transport, authenticates server host identity and supports user authentication and channels. Host identity and user identity answer different questions. A changed host key can indicate a legitimate rebuild or an interception problem; verify it through a trusted independent channel before accepting replacement. A successful encrypted connection does not authorize every remote command or prove the intended server was verified.",
    "purpose": "Verify the server host before authenticating the administrative user. Preserve known host trust and server access policy, use dedicated administrative identities and restrict unnecessary forwarding. Confirm host fingerprints through an independent trusted path; restore precise trust records only after identity verification.",
    "mental": "Use a three-column evidence notebook for SSH: prerequisite, observation and conclusion. The transport negotiates algorithms and proves possession of the server host key. Client trust policy compares that key with a known or certified identity. Encryption to an unverified endpoint does not establish that it is the intended device. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Host identity verified: The expected host key or host certificate passes trusted policy.",
      "User authentication accepted: The supplied administrative user proves an accepted credential.",
      "Requested channel permitted: The server policy permits the intended shell/action/subsystem.",
      "Observation point: Inspect effective client settings without connecting to a host.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "The transport negotiates algorithms and proves possession of the server host key. Client trust policy compares that key with a known or certified identity. Encryption to an unverified endpoint does not establish that it is the intended device.",
      "User authentication occurs within the protected transport using supported credentials. Public-key authentication proves possession of an authorized private key; it does not mean the private key should be copied to the server. Authorization remains a server/session policy.",
      "Channels carry shell, execution, forwarding or subsystem traffic according to policy. Bound management access and forwarding features. Test an intended host, an intentional wrong-key case and an approved/denied user without disabling host verification.",
      "The first decisive boundary in this worksheet is Host identity verified. An encrypted channel to an unverified key does not identify the intended server.",
      "The later evidence boundaries are User authentication accepted and Requested channel permitted. Trusted server identity does not automatically authenticate a user. A successful login need not permit forwarding or every command."
    ],
    "flow": [
      [
        "SSH context",
        "Verify the server host before authenticating the administrative user. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Host identity verified",
        "The expected host key or host certificate passes trusted policy. An encrypted channel to an unverified key does not identify the intended server."
      ],
      [
        "User authentication accepted",
        "The supplied administrative user proves an accepted credential. Trusted server identity does not automatically authenticate a user."
      ],
      [
        "Requested channel permitted",
        "The server policy permits the intended shell/action/subsystem. A successful login need not permit forwarding or every command."
      ]
    ],
    "comparison": [
      [
        "Host identity verified",
        "The expected host key or host certificate passes trusted policy.",
        "An encrypted channel to an unverified key does not identify the intended server."
      ],
      [
        "User authentication accepted",
        "The supplied administrative user proves an accepted credential.",
        "Trusted server identity does not automatically authenticate a user."
      ],
      [
        "Requested channel permitted",
        "The server policy permits the intended shell/action/subsystem.",
        "A successful login need not permit forwarding or every command."
      ]
    ],
    "example": "An operator investigating SSH has an apparently healthy management path. ssh -G succeeded; remote session verified? No; it expands local configuration. No network authentication or remote command takes place in this read-only inspection. Compare that observation with the separate recovery question: How verify access recovery? Trusted host identity, approved user action and intended denial verified. A reconnect with disabled host checking would hide the original identity problem. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "SSH conventionally uses TCP 22; configured nondefault ports are possible. Host verification remains required regardless of the port.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "ssh -G admin@lab.example.test",
        "platform": "OpenSSH client; configuration expansion only · GUIDED NOT EXECUTED",
        "explanation": "Inspect effective client settings without connecting to a host.",
        "expected": "Expanded settings show intent, not a verified server, accepted credential or executed session."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior SSH settings, version and consuming attachment before any change. Preserve known host trust and server access policy, use dedicated administrative identities and restrict unnecessary forwarding. Confirm host fingerprints through an independent trusted path; restore precise trust records only after identity verification. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Preserve known host trust and server access policy, use dedicated administrative identities and restrict unnecessary forwarding. Confirm host fingerprints through an independent trusted path; restore precise trust records only after identity verification.",
    "troubleshooting": [
      [
        "Host identity verified boundary fails",
        "An encrypted channel to an unverified key does not identify the intended server. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "User authentication accepted boundary fails",
        "Trusted server identity does not automatically authenticate a user. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Requested channel permitted boundary fails",
        "A successful login need not permit forwarding or every command. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Do not use StrictHostKeyChecking=no as a recovery shortcut. Protect private keys, use supported modern algorithms and limit session privileges. A copied fingerprint from the same untrusted connection is not independent verification.",
    "performance": "What limits concurrent session impact? Server capacity and policy, measured under the intended workload. An open port does not establish session responsiveness or a sustainable administrative workload. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "The server can verify authorized public-key possession without receiving the private key.",
      "No network authentication or remote command takes place in this read-only inspection.",
      "Changing a port does not replace host trust, authentication or least privilege.",
      "An open port does not establish session responsiveness or a sustainable administrative workload."
    ],
    "prerequisites": [
      "s4-g2-t0"
    ],
    "related": [
      "s4-g4-t3"
    ],
    "lab": {
      "objective": "Verify the server host before authenticating the administrative user. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → SSH endpoint",
        "Boundary: Host identity verified → User authentication accepted → Requested channel permitted",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare a disposable SSH server and independently obtain its expected host fingerprint. Configure the owned client known-host trust, a limited user key and intended allowed channel; keep private keys with their owner.",
        "Present an intentionally wrong trusted fingerprint in a disposable client trust file. Confirm rejection, then restore the independently verified key; never disable host checking. Separately test a denied user/channel.",
        "Verify host identity, approved user/action and intended denied action, preserving the exact hostname/port and redacted outputs.",
        "Open the SSH evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: An encrypted channel to an unverified key does not identify the intended server. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Trusted server identity does not automatically authenticate a user. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: A successful login need not permit forwarding or every command. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Preserve known host trust and server access policy, use dedicated administrative identities and restrict unnecessary forwarding. Confirm host fingerprints through an independent trusted path; restore precise trust records only after identity verification."
      ],
      "verification": "Expanded settings show intent, not a verified server, accepted credential or executed session. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "An encrypted channel to an unverified key does not identify the intended server. Trusted server identity does not automatically authenticate a user. A successful login need not permit forwarding or every command. Separate invalid inputs from a valid negative service result.",
      "challenge": "What does a safe key-change record include? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Host identity verified": "The expected host key or host certificate passes trusted policy.",
      "User authentication accepted": "The supplied administrative user proves an accepted credential.",
      "Requested channel permitted": "The server policy permits the intended shell/action/subsystem."
    },
    "sources": [
      {
        "title": "OpenSSH manual pages",
        "url": "https://www.openssh.org/manual.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 4253",
        "url": "https://www.rfc-editor.org/rfc/rfc4253.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Does encryption alone verify the intended SSH server?",
        "answer": "No; host identity must be verified.",
        "explanation": "A protected connection can still terminate at an unintended endpoint under permissive trust policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does encryption alone verify the intended SSH server?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-QC1"
      },
      {
        "question": "Where should a private authentication key normally remain?",
        "answer": "With its protected owner, not copied to the server.",
        "explanation": "The server can verify authorized public-key possession without receiving the private key.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Where should a private authentication key normally remain?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-QC2"
      },
      {
        "question": "Changed host key; immediate trust deletion appropriate?",
        "answer": "No; verify the change independently first.",
        "explanation": "A rebuild and interception can present similar symptoms, so the trusted identity evidence decides the response.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Changed host key; immediate trust deletion appropriate?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-QC3"
      }
    ],
    "exams": [
      {
        "question": "SSH — Does encryption alone verify the intended SSH server?",
        "answer": "No; host identity must be verified.",
        "explanation": "A protected connection can still terminate at an unintended endpoint under permissive trust policy.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Does encryption alone verify the intended SSH server?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q01",
        "options": [
          "Only if host checking is disabled.",
          "No; host identity must be verified.",
          "Yes; encryption authenticates any advertised hostname.",
          "Yes; a listening TCP 22 socket is trusted."
        ]
      },
      {
        "question": "SSH — Where should a private authentication key normally remain?",
        "answer": "With its protected owner, not copied to the server.",
        "explanation": "The server can verify authorized public-key possession without receiving the private key.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Where should a private authentication key normally remain?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q02"
      },
      {
        "question": "SSH — Changed host key; immediate trust deletion appropriate?",
        "answer": "No; verify the change independently first.",
        "explanation": "A rebuild and interception can present similar symptoms, so the trusted identity evidence decides the response.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Changed host key; immediate trust deletion appropriate?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q03"
      },
      {
        "question": "SSH — ssh -G succeeded; remote session verified?",
        "answer": "No; it expands local configuration.",
        "explanation": "No network authentication or remote command takes place in this read-only inspection.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "ssh -G succeeded; remote session verified?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q04"
      },
      {
        "question": "SSH — User authenticated; forwarding automatically allowed?",
        "answer": "No.",
        "explanation": "Channel authorization and restrictions remain separate from identity authentication.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "User authenticated; forwarding automatically allowed?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q05"
      },
      {
        "question": "SSH — What is the conventional SSH port?",
        "answer": "TCP 22.",
        "explanation": "Changing a port does not replace host trust, authentication or least privilege.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What is the conventional SSH port?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q06"
      },
      {
        "question": "SSH — Fingerprint learned only from suspect session is independent?",
        "answer": "No.",
        "explanation": "Trust must come from a separate authenticated source rather than the same possible interception path.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Fingerprint learned only from suspect session is independent?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q07"
      },
      {
        "question": "SSH — How verify access recovery?",
        "answer": "Trusted host identity, approved user action and intended denial verified.",
        "explanation": "A reconnect with disabled host checking would hide the original identity problem.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify access recovery?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q08"
      },
      {
        "question": "SSH — What limits concurrent session impact?",
        "answer": "Server capacity and policy, measured under the intended workload.",
        "explanation": "An open port does not establish session responsiveness or a sustainable administrative workload.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What limits concurrent session impact?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q09"
      },
      {
        "question": "SSH — What does a safe key-change record include?",
        "answer": "Trusted change evidence, expected fingerprint and exact affected host entry.",
        "explanation": "Broad known-host deletion removes unrelated trust and weakens later verification.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What does a safe key-change record include?",
        "topicId": "s4-g4-t2",
        "questionId": "s4-g4-t2-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t3",
    "batch": "11",
    "title": "SFTP",
    "subtitle": "Verify the SSH subsystem and remote file permissions rather than assuming shell access is enough.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-sftp",
    "definition": "SFTP is a file-transfer protocol commonly carried as an SSH subsystem. It is distinct from FTP over TLS and inherits SSH transport/host/user security while applying server subsystem and filesystem authorization. A working interactive shell is not proof that the SFTP subsystem is enabled or that the user may read or write the intended path. File completion requires integrity and location evidence beyond login success.",
    "purpose": "Verify the SSH subsystem and remote file permissions rather than assuming shell access is enough. Use a bounded transfer account and owned lab directory. Preserve subsystem/chroot/permissions before one negative path test. Verify approved read/write operations, intended denial and independent file integrity before declaring recovery.",
    "mental": "Use a three-column evidence notebook for SFTP: prerequisite, observation and conclusion. Verify the expected SSH host identity and authenticate the intended user. The SFTP subsystem may be restricted independently of shell access. A subsystem-only account can transfer allowed files without an interactive shell. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "SSH identity path accepted: Host verification and user authentication succeed under intended policy.",
      "Subsystem and path authorized: The SFTP subsystem and exact remote operation/path are allowed.",
      "Transferred artifact verified: Destination path, length and independent content hash match.",
      "Observation point: Display supported syntax; this does not connect or transfer a file.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Verify the expected SSH host identity and authenticate the intended user. The SFTP subsystem may be restricted independently of shell access. A subsystem-only account can transfer allowed files without an interactive shell.",
      "Resolve the remote path under applicable chroot and filesystem permission policy. Client-visible paths can differ from host absolute paths. Check owner/group/ACL and allowed operations rather than granting broad write access to fix a single failure.",
      "Transfer an owned disposable file, verify its length and independent hash at both ends, then remove only that file. A session opening or directory listing is not evidence that write, rename or final placement completed.",
      "The first decisive boundary in this worksheet is SSH identity path accepted. Do not bypass host trust merely to obtain a transfer connection.",
      "The later evidence boundaries are Subsystem and path authorized and Transferred artifact verified. Shell access or directory listing does not establish write permission to the intended destination. Successful login or partial upload is not verified final file delivery."
    ],
    "flow": [
      [
        "SFTP context",
        "Verify the SSH subsystem and remote file permissions rather than assuming shell access is enough. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "SSH identity path accepted",
        "Host verification and user authentication succeed under intended policy. Do not bypass host trust merely to obtain a transfer connection."
      ],
      [
        "Subsystem and path authorized",
        "The SFTP subsystem and exact remote operation/path are allowed. Shell access or directory listing does not establish write permission to the intended destination."
      ],
      [
        "Transferred artifact verified",
        "Destination path, length and independent content hash match. Successful login or partial upload is not verified final file delivery."
      ]
    ],
    "comparison": [
      [
        "SSH identity path accepted",
        "Host verification and user authentication succeed under intended policy.",
        "Do not bypass host trust merely to obtain a transfer connection."
      ],
      [
        "Subsystem and path authorized",
        "The SFTP subsystem and exact remote operation/path are allowed.",
        "Shell access or directory listing does not establish write permission to the intended destination."
      ],
      [
        "Transferred artifact verified",
        "Destination path, length and independent content hash match.",
        "Successful login or partial upload is not verified final file delivery."
      ]
    ],
    "example": "An operator investigating SFTP has an apparently healthy management path. Remote path seems absent under chroot; what context matters? The client-visible filesystem root and permitted path. Host absolute paths can differ from the namespace exposed to the transfer account. Compare that observation with the separate recovery question: How verify permission recovery? Restore intended permission and test owned artifact plus an intended denied path. A broad chmod that makes everything writable would erase the security boundary. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "SFTP commonly runs inside SSH on TCP 22. It is not FTPS and does not use FTP control/data connections.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "sftp -h",
        "platform": "OpenSSH client; usage inspection only · GUIDED NOT EXECUTED",
        "explanation": "Display supported syntax; this does not connect or transfer a file.",
        "expected": "A usage display confirms local client availability only, not a working remote subsystem."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior SFTP settings, version and consuming attachment before any change. Use a bounded transfer account and owned lab directory. Preserve subsystem/chroot/permissions before one negative path test. Verify approved read/write operations, intended denial and independent file integrity before declaring recovery. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Use a bounded transfer account and owned lab directory. Preserve subsystem/chroot/permissions before one negative path test. Verify approved read/write operations, intended denial and independent file integrity before declaring recovery.",
    "troubleshooting": [
      [
        "SSH identity path accepted boundary fails",
        "Do not bypass host trust merely to obtain a transfer connection. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Subsystem and path authorized boundary fails",
        "Shell access or directory listing does not establish write permission to the intended destination. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Transferred artifact verified boundary fails",
        "Successful login or partial upload is not verified final file delivery. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Keep host verification enabled and private keys protected. Restrict paths and operations to intended scope; do not use an unrestricted administrative shell account merely to bypass a subsystem permission error.",
    "performance": "What influences transfer time? Storage, encryption, network and request behavior. A negotiated SSH session does not measure sustained file throughput or endpoint storage capacity. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Remote shell and subsystem channels can have different policy and installation support.",
      "Host absolute paths can differ from the namespace exposed to the transfer account.",
      "A created destination entry is weaker evidence than independent content integrity.",
      "A negotiated SSH session does not measure sustained file throughput or endpoint storage capacity."
    ],
    "prerequisites": [
      "s4-g4-t2"
    ],
    "related": [
      "s4-g4-t4"
    ],
    "lab": {
      "objective": "Verify the SSH subsystem and remote file permissions rather than assuming shell access is enough. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → SFTP endpoint",
        "Boundary: SSH identity path accepted → Subsystem and path authorized → Transferred artifact verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare an owned SSH SFTP subsystem-only account and bounded disposable directory. Verify host trust and client-visible chroot paths. Record intended read/create/rename permissions before transfer.",
        "Remove only the test account's intended write permission on the owned directory, observe failure and restore the saved permission. Transfer only a disposable file rather than changing broad access rights.",
        "Compare independent source/destination length/hash and final path; verify a denied outside path and delete only the owned test artifact.",
        "Open the SFTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Do not bypass host trust merely to obtain a transfer connection. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: Shell access or directory listing does not establish write permission to the intended destination. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Successful login or partial upload is not verified final file delivery. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Use a bounded transfer account and owned lab directory. Preserve subsystem/chroot/permissions before one negative path test. Verify approved read/write operations, intended denial and independent file integrity before declaring recovery."
      ],
      "verification": "A usage display confirms local client availability only, not a working remote subsystem. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Do not bypass host trust merely to obtain a transfer connection. Shell access or directory listing does not establish write permission to the intended destination. Successful login or partial upload is not verified final file delivery. Separate invalid inputs from a valid negative service result.",
      "challenge": "What cleanup is appropriate? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "SSH identity path accepted": "Host verification and user authentication succeed under intended policy.",
      "Subsystem and path authorized": "The SFTP subsystem and exact remote operation/path are allowed.",
      "Transferred artifact verified": "Destination path, length and independent content hash match."
    },
    "sources": [
      {
        "title": "OpenSSH manual pages",
        "url": "https://www.openssh.org/manual.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "SFTP and FTP over TLS the same protocol?",
        "answer": "No.",
        "explanation": "SFTP commonly uses an SSH subsystem; FTPS retains FTP with TLS transport protections.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "SFTP and FTP over TLS the same protocol?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-QC1"
      },
      {
        "question": "Shell works but SFTP fails; likely separate boundary?",
        "answer": "Subsystem availability or authorization.",
        "explanation": "Remote shell and subsystem channels can have different policy and installation support.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Shell works but SFTP fails; likely separate boundary?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-QC2"
      },
      {
        "question": "Directory listing succeeds; destination write guaranteed?",
        "answer": "No.",
        "explanation": "List, create, rename and write permissions are distinct filesystem operations.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Directory listing succeeds; destination write guaranteed?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-QC3"
      }
    ],
    "exams": [
      {
        "question": "SFTP — SFTP and FTP over TLS the same protocol?",
        "answer": "No.",
        "explanation": "SFTP commonly uses an SSH subsystem; FTPS retains FTP with TLS transport protections.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "SFTP and FTP over TLS the same protocol?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q01",
        "options": [
          "No.",
          "Yes; both are passive FTP with encryption.",
          "Yes; SFTP means FTP control over TLS.",
          "Only when SFTP uses TCP 21."
        ]
      },
      {
        "question": "SFTP — Shell works but SFTP fails; likely separate boundary?",
        "answer": "Subsystem availability or authorization.",
        "explanation": "Remote shell and subsystem channels can have different policy and installation support.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Shell works but SFTP fails; likely separate boundary?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q02"
      },
      {
        "question": "SFTP — Directory listing succeeds; destination write guaranteed?",
        "answer": "No.",
        "explanation": "List, create, rename and write permissions are distinct filesystem operations.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Directory listing succeeds; destination write guaranteed?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q03"
      },
      {
        "question": "SFTP — Remote path seems absent under chroot; what context matters?",
        "answer": "The client-visible filesystem root and permitted path.",
        "explanation": "Host absolute paths can differ from the namespace exposed to the transfer account.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Remote path seems absent under chroot; what context matters?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q04"
      },
      {
        "question": "SFTP — Does SFTP require FTP passive data ports?",
        "answer": "No.",
        "explanation": "Its file operations run through the SSH connection rather than FTP separate data sessions.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does SFTP require FTP passive data ports?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q05"
      },
      {
        "question": "SFTP — Partial file exists; complete transfer verified?",
        "answer": "No; verify final length/hash and placement.",
        "explanation": "A created destination entry is weaker evidence than independent content integrity.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Partial file exists; complete transfer verified?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q06"
      },
      {
        "question": "SFTP — Must SFTP accounts have unrestricted shells?",
        "answer": "No.",
        "explanation": "Subsystem-only restrictions can provide narrower transfer access where supported.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Must SFTP accounts have unrestricted shells?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q07"
      },
      {
        "question": "SFTP — How verify permission recovery?",
        "answer": "Restore intended permission and test owned artifact plus an intended denied path.",
        "explanation": "A broad chmod that makes everything writable would erase the security boundary.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify permission recovery?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q08"
      },
      {
        "question": "SFTP — What influences transfer time?",
        "answer": "Storage, encryption, network and request behavior.",
        "explanation": "A negotiated SSH session does not measure sustained file throughput or endpoint storage capacity.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What influences transfer time?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q09"
      },
      {
        "question": "SFTP — What cleanup is appropriate?",
        "answer": "Remove only owned disposable files and restore precise path/account settings.",
        "explanation": "Broad directory deletion can remove unrelated data and is not a valid lab cleanup.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What cleanup is appropriate?",
        "topicId": "s4-g4-t3",
        "questionId": "s4-g4-t3-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t4",
    "batch": "11",
    "title": "TFTP",
    "subtitle": "Track the initial request and negotiated transfer identifiers separately.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-tftp",
    "definition": "TFTP is a simple datagram file-transfer protocol with small operation semantics and no built-in user authentication or transport confidentiality. A client sends its initial request toward server UDP 69; transfer messages then use the selected transfer identifiers, commonly UDP ports chosen for that exchange. Allowing only destination69 for every packet can break the actual data/acknowledgement flow. Simplicity does not make an image trustworthy.",
    "purpose": "Track the initial request and negotiated transfer identifiers separately. Limit TFTP to a tightly scoped disposable or otherwise controlled network need. Record negotiated tuple, filename, server root and expected artifact hash. Validate supported options and bootloader/device constraints before using a reference procedure for firmware.",
    "mental": "Use a three-column evidence notebook for TFTP: prerequisite, observation and conclusion. Identify the owned filename and read or write operation. Server root and access policy constrain usable paths; directory listing and remote shell functions are not ordinary base TFTP capabilities. Never expose a permissive write root to untrusted networks. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Initial request reaches intended root: The owned operation/filename maps to the allowed server root.",
      "Transfer identifiers accepted: The negotiated data/acknowledgement tuples are permitted and correlated.",
      "Artifact independently verified: Final content matches a trusted expected length/hash or signature.",
      "Observation point: Inspect the local client syntax without contacting a server.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Identify the owned filename and read or write operation. Server root and access policy constrain usable paths; directory listing and remote shell functions are not ordinary base TFTP capabilities. Never expose a permissive write root to untrusted networks.",
      "Record the initial server port and selected client/server transfer identifiers. Data blocks and acknowledgements follow transfer context; packets from an unexpected TID must not be silently merged into the existing transfer.",
      "Base block/acknowledgement progression and retries do not provide artifact authenticity. Verify expected size/hash from an independently trusted source after a lab transfer. Restore exact server-root/access settings and remove only owned test files.",
      "The first decisive boundary in this worksheet is Initial request reaches intended root. Reachability to UDP 69 alone does not establish allowed file access.",
      "The later evidence boundaries are Transfer identifiers accepted and Artifact independently verified. A UDP 69-only rule can admit requests but break later data packets. Completed transport alone does not authenticate the transferred image."
    ],
    "flow": [
      [
        "TFTP context",
        "Track the initial request and negotiated transfer identifiers separately. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Initial request reaches intended root",
        "The owned operation/filename maps to the allowed server root. Reachability to UDP 69 alone does not establish allowed file access."
      ],
      [
        "Transfer identifiers accepted",
        "The negotiated data/acknowledgement tuples are permitted and correlated. A UDP 69-only rule can admit requests but break later data packets."
      ],
      [
        "Artifact independently verified",
        "Final content matches a trusted expected length/hash or signature. Completed transport alone does not authenticate the transferred image."
      ]
    ],
    "comparison": [
      [
        "Initial request reaches intended root",
        "The owned operation/filename maps to the allowed server root.",
        "Reachability to UDP 69 alone does not establish allowed file access."
      ],
      [
        "Transfer identifiers accepted",
        "The negotiated data/acknowledgement tuples are permitted and correlated.",
        "A UDP 69-only rule can admit requests but break later data packets."
      ],
      [
        "Artifact independently verified",
        "Final content matches a trusted expected length/hash or signature.",
        "Completed transport alone does not authenticate the transferred image."
      ]
    ],
    "example": "An operator investigating TFTP has an apparently healthy management path. File downloaded; firmware authenticity proved? No. Obtain trusted signature/hash evidence rather than trusting the unprotected transfer alone. Compare that observation with the separate recovery question: How verify restored transfer access? Repeat the owned operation and independently verify the resulting artifact. Listener availability alone misses negotiated data-path and content failures. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "Initial requests commonly use UDP 69; the actual transfer uses selected TIDs. It is incorrect to describe all TFTP traffic as a fixed69-to69 exchange.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "tftp --help",
        "platform": "Installed compatible lab client; availability/usage inspection only · GUIDED NOT EXECUTED",
        "explanation": "Inspect the local client syntax without contacting a server.",
        "expected": "Client presence and help output do not verify transfer tuple, server access or artifact authenticity."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior TFTP settings, version and consuming attachment before any change. Limit TFTP to a tightly scoped disposable or otherwise controlled network need. Record negotiated tuple, filename, server root and expected artifact hash. Validate supported options and bootloader/device constraints before using a reference procedure for firmware. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Limit TFTP to a tightly scoped disposable or otherwise controlled network need. Record negotiated tuple, filename, server root and expected artifact hash. Validate supported options and bootloader/device constraints before using a reference procedure for firmware.",
    "troubleshooting": [
      [
        "Initial request reaches intended root boundary fails",
        "Reachability to UDP 69 alone does not establish allowed file access. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Transfer identifiers accepted boundary fails",
        "A UDP 69-only rule can admit requests but break later data packets. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Artifact independently verified boundary fails",
        "Completed transport alone does not authenticate the transferred image. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "TFTP lacks built-in identity and confidentiality. Use isolated access controls and independently trusted image signatures/hashes; do not place sensitive credentials or general writable storage behind it.",
    "performance": "What limits simple block/ack progression? Round-trip delay and supported block/window options affect transfer behavior. No worksheet estimates actual bootloader throughput; feature support must be verified. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Access control and artifact authenticity require protections outside the base protocol.",
      "Obtain trusted signature/hash evidence rather than trusting the unprotected transfer alone.",
      "Its simple read/write transfer semantics differ from an administrative session protocol.",
      "No worksheet estimates actual bootloader throughput; feature support must be verified."
    ],
    "prerequisites": [
      "s4-g4-t3"
    ],
    "related": [
      "s4-g4-t5"
    ],
    "lab": {
      "objective": "Track the initial request and negotiated transfer identifiers separately. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → TFTP endpoint",
        "Boundary: Initial request reaches intended root → Transfer identifiers accepted → Artifact independently verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare a disconnected TFTP server root containing one owned nonsecret file and a trusted expected hash. Permit only intended test peers and record the initial request plus negotiated transfer TIDs.",
        "In the isolated lab path, admit initiation but deny the negotiated data path; observe the incomplete transfer, restore exact tuple policy and repeat. Do not expose a broad writable root.",
        "Verify same filename, data/ack progression and independent destination hash, then remove owned files and restore server-root/access settings.",
        "Open the TFTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: Reachability to UDP 69 alone does not establish allowed file access. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A UDP 69-only rule can admit requests but break later data packets. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: Completed transport alone does not authenticate the transferred image. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Limit TFTP to a tightly scoped disposable or otherwise controlled network need. Record negotiated tuple, filename, server root and expected artifact hash. Validate supported options and bootloader/device constraints before using a reference procedure for firmware."
      ],
      "verification": "Client presence and help output do not verify transfer tuple, server access or artifact authenticity. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "Reachability to UDP 69 alone does not establish allowed file access. A UDP 69-only rule can admit requests but break later data packets. Completed transport alone does not authenticate the transferred image. Separate invalid inputs from a valid negative service result.",
      "challenge": "What is safe cleanup? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Initial request reaches intended root": "The owned operation/filename maps to the allowed server root.",
      "Transfer identifiers accepted": "The negotiated data/acknowledgement tuples are permitted and correlated.",
      "Artifact independently verified": "Final content matches a trusted expected length/hash or signature."
    },
    "sources": [
      {
        "title": "RFC 1350",
        "url": "https://www.rfc-editor.org/rfc/rfc1350.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Are all TFTP packets addressed to UDP 69?",
        "answer": "No; only initiation conventionally targets69.",
        "explanation": "The exchange uses selected transfer identifiers for its subsequent data and acknowledgements.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Are all TFTP packets addressed to UDP 69?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-QC1"
      },
      {
        "question": "Does base TFTP authenticate a user?",
        "answer": "No.",
        "explanation": "Access control and artifact authenticity require protections outside the base protocol.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does base TFTP authenticate a user?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-QC2"
      },
      {
        "question": "Request permitted but data blocked; first tuple check?",
        "answer": "Negotiated client/server TIDs and direction.",
        "explanation": "A rule allowing only the initial server port can fail after a valid request.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Request permitted but data blocked; first tuple check?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-QC3"
      }
    ],
    "exams": [
      {
        "question": "TFTP — Are all TFTP packets addressed to UDP 69?",
        "answer": "No; only initiation conventionally targets69.",
        "explanation": "The exchange uses selected transfer identifiers for its subsequent data and acknowledgements.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Are all TFTP packets addressed to UDP 69?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q01",
        "options": [
          "Yes; all data and acknowledgements always target69.",
          "Yes; clients and servers both remain on UDP 69.",
          "Only acknowledgements always target TCP 69.",
          "No; only initiation conventionally targets69."
        ]
      },
      {
        "question": "TFTP — Does base TFTP authenticate a user?",
        "answer": "No.",
        "explanation": "Access control and artifact authenticity require protections outside the base protocol.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does base TFTP authenticate a user?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q02"
      },
      {
        "question": "TFTP — Request permitted but data blocked; first tuple check?",
        "answer": "Negotiated client/server TIDs and direction.",
        "explanation": "A rule allowing only the initial server port can fail after a valid request.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Request permitted but data blocked; first tuple check?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q03"
      },
      {
        "question": "TFTP — File downloaded; firmware authenticity proved?",
        "answer": "No.",
        "explanation": "Obtain trusted signature/hash evidence rather than trusting the unprotected transfer alone.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "File downloaded; firmware authenticity proved?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q04"
      },
      {
        "question": "TFTP — Can a packet from a different TID be assumed same transfer?",
        "answer": "No.",
        "explanation": "Transfer identifier context prevents mixing unrelated datagrams into an existing exchange.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Can a packet from a different TID be assumed same transfer?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q05"
      },
      {
        "question": "TFTP — Does base TFTP offer a remote interactive shell?",
        "answer": "No.",
        "explanation": "Its simple read/write transfer semantics differ from an administrative session protocol.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does base TFTP offer a remote interactive shell?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q06"
      },
      {
        "question": "TFTP — Should a writable root be exposed to an untrusted uplink?",
        "answer": "No.",
        "explanation": "Unprotected file operations can permit tampering or data exposure without identity checks.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Should a writable root be exposed to an untrusted uplink?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q07"
      },
      {
        "question": "TFTP — How verify restored transfer access?",
        "answer": "Repeat the owned operation and independently verify the resulting artifact.",
        "explanation": "Listener availability alone misses negotiated data-path and content failures.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored transfer access?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q08"
      },
      {
        "question": "TFTP — What limits simple block/ack progression?",
        "answer": "Round-trip delay and supported block/window options affect transfer behavior.",
        "explanation": "No worksheet estimates actual bootloader throughput; feature support must be verified.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What limits simple block/ack progression?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q09"
      },
      {
        "question": "TFTP — What is safe cleanup?",
        "answer": "Delete only the owned test artifact and restore precise root/access policy.",
        "explanation": "Do not remove firmware or unrelated root files to clear a transfer error.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What is safe cleanup?",
        "topicId": "s4-g4-t4",
        "questionId": "s4-g4-t4-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t5",
    "batch": "11",
    "title": "FTP",
    "subtitle": "Separate FTP control login, data connection and transport protection.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-ftp",
    "definition": "FTP uses a control session and separate data connections. Conventional control is TCP 21. In classic active mode the server initiates a data connection, conventionally from port 20; passive mode lets the client connect to a server-advertised negotiated endpoint. A control login can succeed while listing or file transfer fails because the data path is blocked. Ordinary FTP exposes credentials and data; FTPS and SFTP are different protection designs.",
    "purpose": "Separate FTP control login, data connection and transport protection. Prefer an appropriate protected transfer design over plain FTP for sensitive data. Preserve passive range, advertised address, TLS and filesystem settings before a lab fault. Correlate control reply, data tuple and final artifact from the same transaction.",
    "mental": "Use a three-column evidence notebook for FTP: prerequisite, observation and conclusion. Establish the intended control endpoint and authentication policy, then identify active/passive behavior and any negotiated address/port. Commands and reply codes on the control connection describe requested actions; they are not data delivery themselves. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Control identity accepted: The intended control server/user policy is supplied as accepted.",
      "Negotiated data path ready: The active/passive tuple and firewall/NAT context are correct.",
      "Intended transfer verified: Owned destination content and transport-protection policy are verified.",
      "Observation point: Inspect advertised protocol/TLS features without performing a transfer.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Establish the intended control endpoint and authentication policy, then identify active/passive behavior and any negotiated address/port. Commands and reply codes on the control connection describe requested actions; they are not data delivery themselves.",
      "In passive mode inspect the actual advertised endpoint, including NAT/address translation and allowed passive range. In active mode inspect the server-initiated data path to the client. Avoid opening broad unrelated port ranges as a troubleshooting shortcut.",
      "For explicit FTPS, TLS negotiation and applicable data-channel protection are separate policy checks. SFTP is not the TLS form of FTP. Transfer an owned file, independently verify destination/hash and restore exact data-port and access policy.",
      "The first decisive boundary in this worksheet is Control identity accepted. A working control connection is not a completed data transfer.",
      "The later evidence boundaries are Negotiated data path ready and Intended transfer verified. A blocked data connection can prevent listings despite successful login. An FTP completion reply alone does not replace independent integrity or channel-policy checks."
    ],
    "flow": [
      [
        "FTP context",
        "Separate FTP control login, data connection and transport protection. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Control identity accepted",
        "The intended control server/user policy is supplied as accepted. A working control connection is not a completed data transfer."
      ],
      [
        "Negotiated data path ready",
        "The active/passive tuple and firewall/NAT context are correct. A blocked data connection can prevent listings despite successful login."
      ],
      [
        "Intended transfer verified",
        "Owned destination content and transport-protection policy are verified. An FTP completion reply alone does not replace independent integrity or channel-policy checks."
      ]
    ],
    "comparison": [
      [
        "Control identity accepted",
        "The intended control server/user policy is supplied as accepted.",
        "A working control connection is not a completed data transfer."
      ],
      [
        "Negotiated data path ready",
        "The active/passive tuple and firewall/NAT context are correct.",
        "A blocked data connection can prevent listings despite successful login."
      ],
      [
        "Intended transfer verified",
        "Owned destination content and transport-protection policy are verified.",
        "An FTP completion reply alone does not replace independent integrity or channel-policy checks."
      ]
    ],
    "example": "An operator investigating FTP has an apparently healthy management path. Passive reply advertises unreachable private address; inspect what? Advertised endpoint and NAT/passive configuration. A valid login does not make an unusable negotiated data address reachable. Compare that observation with the separate recovery question: How verify restored data path? Repeat the original owned transfer and verify destination length/hash. A successful control reconnect can leave the data-path problem unresolved. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "FTP control conventionally TCP 21; active data conventionally sourceTCP20 and passive data negotiated ports. FTPS can use explicit TLS on21 or deployment-specific implicit conventions.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "curl --version",
        "platform": "curl client; read-only feature inspection · GUIDED NOT EXECUTED",
        "explanation": "Inspect advertised protocol/TLS features without performing a transfer.",
        "expected": "Client features do not prove server TLS policy, data-channel connectivity or artifact delivery."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior FTP settings, version and consuming attachment before any change. Prefer an appropriate protected transfer design over plain FTP for sensitive data. Preserve passive range, advertised address, TLS and filesystem settings before a lab fault. Correlate control reply, data tuple and final artifact from the same transaction. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Prefer an appropriate protected transfer design over plain FTP for sensitive data. Preserve passive range, advertised address, TLS and filesystem settings before a lab fault. Correlate control reply, data tuple and final artifact from the same transaction.",
    "troubleshooting": [
      [
        "Control identity accepted boundary fails",
        "A working control connection is not a completed data transfer. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Negotiated data path ready boundary fails",
        "A blocked data connection can prevent listings despite successful login. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Intended transfer verified boundary fails",
        "An FTP completion reply alone does not replace independent integrity or channel-policy checks. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Plain FTP credentials/content lack modern confidentiality. TLS support does not automatically mean the intended data channel is protected or server identity verified. Restrict accounts and do not expose broad anonymous write access.",
    "performance": "Why bound passive port ranges? To constrain operational policy and firewall exposure. A documented range is easier to authorize and verify than indiscriminately opening all ports. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "Passive mode advertises a negotiated server endpoint for the client to connect to.",
      "A valid login does not make an unusable negotiated data address reachable.",
      "Control and data protection choices must be verified under the intended FTPS configuration.",
      "A documented range is easier to authorize and verify than indiscriminately opening all ports."
    ],
    "prerequisites": [
      "s4-g4-t3"
    ],
    "related": [
      "s4-g4-t6"
    ],
    "lab": {
      "objective": "Separate FTP control login, data connection and transport protection. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → FTP endpoint",
        "Boundary: Control identity accepted → Negotiated data path ready → Intended transfer verified",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare an isolated FTP/FTPS test account and owned directory with documented passive range and advertised address. For sensitive content require validated TLS and intended control/data protection; use only nonsecret fixtures for plain FTP demonstrations.",
        "Change only the owned passive advertised address/range to an unusable value and compare successful control login with failed data listing. Restore the precise endpoint/range.",
        "Record active/passive tuple, protection policy, control/data outcomes and independent artifact hash; restore account/files and remove only owned test data.",
        "Open the FTP evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A working control connection is not a completed data transfer. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: A blocked data connection can prevent listings despite successful login. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: An FTP completion reply alone does not replace independent integrity or channel-policy checks. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Prefer an appropriate protected transfer design over plain FTP for sensitive data. Preserve passive range, advertised address, TLS and filesystem settings before a lab fault. Correlate control reply, data tuple and final artifact from the same transaction."
      ],
      "verification": "Client features do not prove server TLS policy, data-channel connectivity or artifact delivery. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A working control connection is not a completed data transfer. A blocked data connection can prevent listings despite successful login. An FTP completion reply alone does not replace independent integrity or channel-policy checks. Separate invalid inputs from a valid negative service result.",
      "challenge": "What records distinguish control from delivery? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Control identity accepted": "The intended control server/user policy is supplied as accepted.",
      "Negotiated data path ready": "The active/passive tuple and firewall/NAT context are correct.",
      "Intended transfer verified": "Owned destination content and transport-protection policy are verified."
    },
    "sources": [
      {
        "title": "RFC 959",
        "url": "https://www.rfc-editor.org/rfc/rfc959.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Control login works, listing hangs; which path next?",
        "answer": "The separately negotiated data connection.",
        "explanation": "FTP control and data sessions can encounter different firewall/NAT policy.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Control login works, listing hangs; which path next?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-QC1"
      },
      {
        "question": "Passive data always uses server port 20?",
        "answer": "No.",
        "explanation": "Passive mode advertises a negotiated server endpoint for the client to connect to.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Passive data always uses server port 20?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-QC2"
      },
      {
        "question": "SFTP simply means FTP with TLS?",
        "answer": "No.",
        "explanation": "SFTP commonly uses SSH; FTPS protects the distinct FTP control/data design.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "SFTP simply means FTP with TLS?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-QC3"
      }
    ],
    "exams": [
      {
        "question": "FTP — Control login works, listing hangs; which path next?",
        "answer": "The separately negotiated data connection.",
        "explanation": "FTP control and data sessions can encounter different firewall/NAT policy.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Control login works, listing hangs; which path next?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q01",
        "options": [
          "Only DNS recursion.",
          "Only ICMP to the default gateway.",
          "The separately negotiated data connection.",
          "The same control connection only."
        ]
      },
      {
        "question": "FTP — Passive data always uses server port 20?",
        "answer": "No.",
        "explanation": "Passive mode advertises a negotiated server endpoint for the client to connect to.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Passive data always uses server port 20?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q02"
      },
      {
        "question": "FTP — SFTP simply means FTP with TLS?",
        "answer": "No.",
        "explanation": "SFTP commonly uses SSH; FTPS protects the distinct FTP control/data design.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "SFTP simply means FTP with TLS?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q03"
      },
      {
        "question": "FTP — Passive reply advertises unreachable private address; inspect what?",
        "answer": "Advertised endpoint and NAT/passive configuration.",
        "explanation": "A valid login does not make an unusable negotiated data address reachable.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Passive reply advertises unreachable private address; inspect what?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q04"
      },
      {
        "question": "FTP — Plain FTP protects credentials in transit?",
        "answer": "No.",
        "explanation": "Ordinary FTP provides no modern encryption for credentials or content.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Plain FTP protects credentials in transit?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q05"
      },
      {
        "question": "FTP — Explicit control TLS proves data confidentiality?",
        "answer": "No; inspect the data-protection policy too.",
        "explanation": "Control and data protection choices must be verified under the intended FTPS configuration.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Explicit control TLS proves data confidentiality?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q06"
      },
      {
        "question": "FTP — Classic active data direction?",
        "answer": "The server initiates toward the client endpoint.",
        "explanation": "That direction differs from passive mode and can interact differently with client-side filtering.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Classic active data direction?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q07"
      },
      {
        "question": "FTP — How verify restored data path?",
        "answer": "Repeat the original owned transfer and verify destination length/hash.",
        "explanation": "A successful control reconnect can leave the data-path problem unresolved.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "How verify restored data path?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q08"
      },
      {
        "question": "FTP — Why bound passive port ranges?",
        "answer": "To constrain operational policy and firewall exposure.",
        "explanation": "A documented range is easier to authorize and verify than indiscriminately opening all ports.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Why bound passive port ranges?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q09"
      },
      {
        "question": "FTP — What records distinguish control from delivery?",
        "answer": "Control replies, negotiated tuple, data result and independently verified artifact.",
        "explanation": "These separate observers avoid calling successful authentication a completed transfer.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What records distinguish control from delivery?",
        "topicId": "s4-g4-t5",
        "questionId": "s4-g4-t5-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  },
  {
    "id": "s4-g4-t6",
    "batch": "11",
    "title": "HTTP / HTTPS",
    "subtitle": "Verify HTTP semantics and HTTPS identity in the original application request.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "ns-http",
    "definition": "HTTP defines request/response semantics, methods, status codes and representation metadata. HTTPS protects HTTP using TLS and requires a client trust policy for server identity. DNS resolution, TCP/QUIC transport, certificate validation, HTTP status and application correctness are separate stages. HTTP/1.1 and HTTP/2 commonly use TCP; HTTP/3 uses QUIC over UDP. A200 response can still contain an application error or unintended content.",
    "purpose": "Verify HTTP semantics and HTTPS identity in the original application request. Define expected URL/method/result, server identity and authenticated user scope. Preserve proxy/cache/TLS settings before a disposable fault. Verify the original transaction and an intended denial after restore, including final endpoint and expected content.",
    "mental": "Use a three-column evidence notebook for HTTP / HTTPS: prerequisite, observation and conclusion. Preserve the intended URL scheme, hostname, method, headers and observer. Name-based routing and certificate identity depend on the hostname, so replacing it with an IP can test a different service. Redirects may change the final endpoint and trust context. The worksheet consumes three supplied declarations rather than running a protocol. A satisfied row is a necessary condition in this exercise, not proof of an actual end-to-end transaction. Keep measured output, assumptions and policy decisions in separate columns.",
    "components": [
      "Intended origin and route: URL hostname/method and observer represent the original request.",
      "TLS identity validation accepted: The actual policy accepts chain, hostname, time and usage where applicable.",
      "Expected application result observed: The specific status/content/action matches the test objective.",
      "Observation point: Inspect supported protocols and TLS implementation without contacting an external service.",
      "Recovery evidence: preserve the before/fault/after record at the same observer and do not discard negative results."
    ],
    "mechanism": [
      "Preserve the intended URL scheme, hostname, method, headers and observer. Name-based routing and certificate identity depend on the hostname, so replacing it with an IP can test a different service. Redirects may change the final endpoint and trust context.",
      "Validate certificate chain, reference identity, validity time and applicable usage under the actual client policy. Do not disable verification to make a connection pass. A TLS handshake identifies a protected peer under policy; it does not authorize an application action.",
      "Inspect status, headers, body and expected application result.401/403 are explicit authentication/authorization responses; a timeout is missing transaction evidence. Cache behavior, redirects and reverse proxies can affect which content a client sees.",
      "The first decisive boundary in this worksheet is Intended origin and route. A changed hostname or proxy path can test a different application.",
      "The later evidence boundaries are TLS identity validation accepted and Expected application result observed. An open port or disabled verification is not authenticated HTTPS identity. HTTP200 alone does not guarantee correct application behavior."
    ],
    "flow": [
      [
        "HTTP / HTTPS context",
        "Verify HTTP semantics and HTTPS identity in the original application request. Record the actual endpoint, interface and time before interpreting a result."
      ],
      [
        "Intended origin and route",
        "URL hostname/method and observer represent the original request. A changed hostname or proxy path can test a different application."
      ],
      [
        "TLS identity validation accepted",
        "The actual policy accepts chain, hostname, time and usage where applicable. An open port or disabled verification is not authenticated HTTPS identity."
      ],
      [
        "Expected application result observed",
        "The specific status/content/action matches the test objective. HTTP200 alone does not guarantee correct application behavior."
      ]
    ],
    "comparison": [
      [
        "Intended origin and route",
        "URL hostname/method and observer represent the original request.",
        "A changed hostname or proxy path can test a different application."
      ],
      [
        "TLS identity validation accepted",
        "The actual policy accepts chain, hostname, time and usage where applicable.",
        "An open port or disabled verification is not authenticated HTTPS identity."
      ],
      [
        "Expected application result observed",
        "The specific status/content/action matches the test objective.",
        "HTTP200 alone does not guarantee correct application behavior."
      ]
    ],
    "example": "An operator investigating HTTP / HTTPS has an apparently healthy management path. Certificate mismatch fixed by disabling verification? No. That bypasses the intended identity check instead of repairing the certificate or requested name. Compare that observation with the separate recovery question: What demonstrates recovery? Original URL/method/user gets expected content with identity validation enabled. Testing another URL or disabling security can hide the original failure. Record the reason for the changed conclusion rather than declaring the whole infrastructure healthy.",
    "ports": "HTTP conventionally TCP 80; HTTPS TCP 443 for HTTP1.1/2 and commonly UDP 443 for HTTP3/QUIC. Ports alone do not identify application correctness.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "code": "curl --version",
        "platform": "curl client; read-only capability inspection · GUIDED NOT EXECUTED",
        "explanation": "Inspect supported protocols and TLS implementation without contacting an external service.",
        "expected": "Local features are not proof of server identity, HTTP response or application success."
      }
    ],
    "configuration": "For the optional disposable-target exercise, preserve the exact prior HTTP / HTTPS settings, version and consuming attachment before any change. Define expected URL/method/result, server identity and authenticated user scope. Preserve proxy/cache/TLS settings before a disposable fault. Verify the original transaction and an intended denial after restore, including final endpoint and expected content. The displayed command is an observation reference, not an installation or deployment script. Confirm feature support and parser syntax in the product documentation for your actual release; the browser does not verify either. Make a single owned change while console access remains available. Verify the expected negative observation, restore the saved setting and repeat the original transaction from the same client. Remove only exclusively owned unused lab objects after recovery; do not reload devices, clear unrelated state or save an experimental configuration over a production baseline.",
    "production": "Define expected URL/method/result, server identity and authenticated user scope. Preserve proxy/cache/TLS settings before a disposable fault. Verify the original transaction and an intended denial after restore, including final endpoint and expected content.",
    "troubleshooting": [
      [
        "Intended origin and route boundary fails",
        "A changed hostname or proxy path can test a different application. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "TLS identity validation accepted boundary fails",
        "An open port or disabled verification is not authenticated HTTPS identity. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Expected application result observed boundary fails",
        "HTTP200 alone does not guarantee correct application behavior. Inspect the relevant endpoint and preserve actual output before changing that setting."
      ],
      [
        "Worksheet differs from the target",
        "Check version, observer, configured policy and timestamps. Supplied checkboxes do not emulate packet loss, retries, caches or client validation policies."
      ]
    ],
    "security": "Keep server certificate validation enabled, restrict credentials and avoid recording sensitive headers in shared evidence. Transport confidentiality does not prevent unsafe application input, authorization bugs or unexpected redirects.",
    "performance": "Does shorter cache lifetime always improve delivery? No; it increases origin dependency and request work. Cache policy trades freshness and resource use and needs workload-specific evidence. Measure overhead and user impact independently at the selected observer. A browser declaration changes no queue, clock, packet stream or storage system; this worksheet gives no throughput, convergence or capacity estimate. Choose a bounded observation interval and compare equivalent workloads before generalizing a local result.",
    "mistakes": [
      "HTTP version and negotiated transport are part of the observation, not just the URL scheme.",
      "That bypasses the intended identity check instead of repairing the certificate or requested name.",
      "A redirect can move the transaction to a different endpoint and change security assumptions.",
      "Cache policy trades freshness and resource use and needs workload-specific evidence."
    ],
    "prerequisites": [
      "s4-g0-t2",
      "s4-g4-t2"
    ],
    "related": [
      "s4-g5-t0"
    ],
    "lab": {
      "objective": "Verify HTTP semantics and HTTPS identity in the original application request. Distinguish the supplied worksheet outcome from measured service evidence.",
      "requirements": "Browser only for the declaration exercise. Optional guided procedures require disposable supported targets, independent console access, an approved test identity and a securely recorded baseline. No actual service configuration is claimed.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / observer → HTTP / HTTPS endpoint",
        "Boundary: Intended origin and route → TLS identity validation accepted → Expected application result observed",
        "Evidence notebook → one owned fault → exact restore → original transaction"
      ],
      "steps": [
        "Prepare a disposable HTTPS endpoint for app.example.test with a lab certificate and independently trusted lab CA, plus known expected response content. Record actual hostname, scheme, method, proxy and client clock.",
        "Use a deliberately wrong hostname or certificate on the owned fixture and verify rejection with checks enabled. Separately return a200 error body to demonstrate status versus expected content. Restore original binding/content.",
        "Verify original name/method and user policy, TLS identity, final redirect origin and explicit expected content; retain an intended access-denial response.",
        "Open the HTTP / HTTPS evidence worksheet. Start with the baseline and copy the three named declarations into an evidence notebook; the browser does not query an actual service.",
        "Choose the first fault: A changed hostname or proxy path can test a different application. Record which prerequisite changed and explain why the other declarations alone cannot override it.",
        "Restore that prerequisite, then choose the second fault: An open port or disabled verification is not authenticated HTTPS identity. Predict the output before revealing it and compare the explanation with the mechanism sequence.",
        "Compare the third boundary: HTTP200 alone does not guarantee correct application behavior. State which observation would independently confirm a real transaction and which evidence is still missing.",
        "Use keyboard controls to change a declaration, reset the baseline and step through the complete static flow. Do not copy a synthetic status into an operational incident record as a measured result.",
        "On an optional separately prepared target, use the guided observation below in the correct version and context. Reproduce only the owned fault, restore the exact original setting and collect both baseline and restored evidence. Define expected URL/method/result, server identity and authenticated user scope. Preserve proxy/cache/TLS settings before a disposable fault. Verify the original transaction and an intended denial after restore, including final endpoint and expected content."
      ],
      "verification": "Local features are not proof of server identity, HTTP response or application success. Compare the original observer, source, destination and time across baseline, fault and recovery. An explicitly rejected action is useful negative evidence; a silent timeout requires separate path and service investigation. The worksheet reports supplied prerequisite agreement, not executed configuration or packet delivery.",
      "troubleshooting": "A changed hostname or proxy path can test a different application. An open port or disabled verification is not authenticated HTTPS identity. HTTP200 alone does not guarantee correct application behavior. Separate invalid inputs from a valid negative service result.",
      "challenge": "What belongs in a safe evidence record? Explain the observation needed to support your answer without assuming that a configured object was consumed.",
      "cleanup": "Reset the browser declarations. On an optional owned target restore the exact saved configuration and test the original transaction and local recovery path before removing owned fixtures. Retain redacted evidence, remove test credentials and close only processes you started."
    },
    "glossary": {
      "Intended origin and route": "URL hostname/method and observer represent the original request.",
      "TLS identity validation accepted": "The actual policy accepts chain, hostname, time and usage where applicable.",
      "Expected application result observed": "The specific status/content/action matches the test objective."
    },
    "sources": [
      {
        "title": "RFC 9110",
        "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 9525",
        "url": "https://www.rfc-editor.org/rfc/rfc9525.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 9114",
        "url": "https://www.rfc-editor.org/rfc/rfc9114.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "question": "Does HTTP200 guarantee the expected application content?",
        "answer": "No.",
        "explanation": "An error page or incorrect representation can be returned with a successful HTTP status.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Does HTTP200 guarantee the expected application content?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-QC1"
      },
      {
        "question": "HTTPS always uses TCP only?",
        "answer": "No; HTTP3 uses QUIC over UDP.",
        "explanation": "HTTP version and negotiated transport are part of the observation, not just the URL scheme.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "HTTPS always uses TCP only?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-QC2"
      },
      {
        "question": "IP substituted for hostname; equivalent identity test?",
        "answer": "Not necessarily.",
        "explanation": "Reference identity, SNI and virtual-host routing can change when the hostname changes.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "IP substituted for hostname; equivalent identity test?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-QC3"
      }
    ],
    "exams": [
      {
        "question": "HTTP / HTTPS — Does HTTP200 guarantee the expected application content?",
        "answer": "No.",
        "explanation": "An error page or incorrect representation can be returned with a successful HTTP status.",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "testedConcept": "Does HTTP200 guarantee the expected application content?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q01",
        "options": [
          "Only when TLS hostname checking is disabled.",
          "No.",
          "Yes; 200 validates the expected body automatically.",
          "Yes; 200 authenticates the end user."
        ]
      },
      {
        "question": "HTTP / HTTPS — HTTPS always uses TCP only?",
        "answer": "No; HTTP3 uses QUIC over UDP.",
        "explanation": "HTTP version and negotiated transport are part of the observation, not just the URL scheme.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "HTTPS always uses TCP only?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q02"
      },
      {
        "question": "HTTP / HTTPS — IP substituted for hostname; equivalent identity test?",
        "answer": "Not necessarily.",
        "explanation": "Reference identity, SNI and virtual-host routing can change when the hostname changes.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "IP substituted for hostname; equivalent identity test?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q03"
      },
      {
        "question": "HTTP / HTTPS — Certificate mismatch fixed by disabling verification?",
        "answer": "No.",
        "explanation": "That bypasses the intended identity check instead of repairing the certificate or requested name.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "Certificate mismatch fixed by disabling verification?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q04"
      },
      {
        "question": "HTTP / HTTPS — 401 or403 same as a network timeout?",
        "answer": "No.",
        "explanation": "They are explicit HTTP access responses; timeout lacks that application response evidence.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "401 or403 same as a network timeout?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q05"
      },
      {
        "question": "HTTP / HTTPS — What must be tracked across redirects?",
        "answer": "Final origin and identity/credential policy.",
        "explanation": "A redirect can move the transaction to a different endpoint and change security assumptions.",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "testedConcept": "What must be tracked across redirects?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q06"
      },
      {
        "question": "HTTP / HTTPS — TLS authenticated server guarantees user authorized?",
        "answer": "No.",
        "explanation": "Server identity and application user/action authorization are separate decisions.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "TLS authenticated server guarantees user authorized?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q07"
      },
      {
        "question": "HTTP / HTTPS — What demonstrates recovery?",
        "answer": "Original URL/method/user gets expected content with identity validation enabled.",
        "explanation": "Testing another URL or disabling security can hide the original failure.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What demonstrates recovery?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q08"
      },
      {
        "question": "HTTP / HTTPS — Does shorter cache lifetime always improve delivery?",
        "answer": "No; it increases origin dependency and request work.",
        "explanation": "Cache policy trades freshness and resource use and needs workload-specific evidence.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "Does shorter cache lifetime always improve delivery?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q09"
      },
      {
        "question": "HTTP / HTTPS — What belongs in a safe evidence record?",
        "answer": "Redacted request context, TLS identity, final origin and expected response assertions.",
        "explanation": "Credentials and sensitive payloads should not be copied into a shared troubleshooting notebook.",
        "type": "short-answer",
        "difficulty": "Advanced",
        "testedConcept": "What belongs in a safe evidence record?",
        "topicId": "s4-g4-t6",
        "questionId": "s4-g4-t6-Q10"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Services evidence workbook",
        "path": "labs/network-services-workbook.md"
      }
    ]
  }
];
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['11']=lessons;
})();
