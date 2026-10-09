'use strict';
window.INFRA_BATCHES=window.INFRA_BATCHES||{};window.INFRA_BATCHES['14']=[
  {
    "id": "s5-g4-t0",
    "batch": "14",
    "title": "VPN concepts",
    "subtitle": "Use two isolated gateway/client endpoints and a documented application objective.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-vpn",
    "definition": "A virtual private network carries selected private communication over another network under an explicitly chosen tunnel and security design. A tunnel is an overlay relationship; its underlay must still reach the peer. Private addressing or encapsulation alone does not establish confidentiality, authenticated identity or least-privilege access. VPN acceptance follows the original protected application transaction rather than stopping at a tunnel-up icon.",
    "purpose": "Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration.",
    "mental": "Define which sources, destinations and operations enter the protected overlay and which stay outside it. Record endpoints, identity policy, routing and the observation point before selecting a technology. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Underlay: Network carrying the outer packet. Must reach the peer independently.",
      "Overlay: Selected protected communication. Routing and selection determine scope.",
      "Application permission: Original allowed operation. A tunnel does not grant every privilege.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Define which sources, destinations and operations enter the protected overlay and which stay outside it. Record endpoints, identity policy, routing and the observation point before selecting a technology.",
      "Establish underlay reachability independently, then validate the protected endpoint relationship and intended traffic selection. The outer packet serves the underlay while inner addressing serves the protected path.",
      "Correlate selected traffic, protected-path evidence, return route and original application behavior. A reachable peer without a matching protected path is not a functioning private service; a working tunnel can still authorize too much."
    ],
    "flow": [
      [
        "Define the protected operation",
        "A virtual private network carries selected private communication over another network under an explicitly chosen tunnel and security design. A tunnel is an overlay relationship; its underlay must still reach the peer. Private addressing or encapsulation alone does not establish confidentiality, authenticated identity or least-privilege access. VPN acceptance follows the original protected application transaction rather than stopping at a tunnel-up icon."
      ],
      [
        "Identify the consuming boundary",
        "Define which sources, destinations and operations enter the protected overlay and which stay outside it. Record endpoints, identity policy, routing and the observation point before selecting a technology."
      ],
      [
        "Follow the actual decision",
        "Establish underlay reachability independently, then validate the protected endpoint relationship and intended traffic selection. The outer packet serves the underlay while inner addressing serves the protected path."
      ],
      [
        "Verify limits and recovery",
        "Correlate selected traffic, protected-path evidence, return route and original application behavior. A reachable peer without a matching protected path is not a functioning private service; a working tunnel can still authorize too much."
      ]
    ],
    "comparison": [
      [
        "Underlay",
        "Network carrying the outer packet",
        "Must reach the peer independently."
      ],
      [
        "Overlay",
        "Selected protected communication",
        "Routing and selection determine scope."
      ],
      [
        "Application permission",
        "Original allowed operation",
        "A tunnel does not grant every privilege."
      ]
    ],
    "example": "The peer is reachable; is the protected service proven? No. Underlay reachability is separate from tunnel selection and application behavior. Compare this with a different operational question: VPN login succeeds; is server administration automatically permitted? No. Application authorization remains independent. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "For the IPsec/IKEv2 design, IKE commonly uses UDP 500/4500 and native ESP is IP protocol 50, not TCP port 50. NAT traversal and other remote-access products have different transport policies.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show crypto ikev2 sa\nshow crypto ipsec sa",
        "explanation": "Observe the installed context for VPN concepts. Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Restore exact selection and verify protected request, return and application permission. Do not broaden all traffic merely to make an icon green. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "VPN login succeeds; is server administration automatically permitted?",
        "No. Application authorization remains independent."
      ],
      [
        "Why test the return route?",
        "The original transaction needs bidirectional delivery. Outbound protected counters alone are incomplete."
      ],
      [
        "What should a tunnel-up icon be correlated with?",
        "The original selected protected transaction. Control state alone cannot establish usable service."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect endpoint identity and keys and restrict the resources exposed after tunnel entry. Do not equate being inside a VPN with authorization to administer every server.",
    "performance": "Encapsulation reduces effective MTU and encryption adds processing. Measure target throughput, path MTU and recovery rather than borrowing a nominal interface rate.",
    "mistakes": [
      "Underlay reachability is separate from tunnel selection and application behavior.",
      "Outer delivery does not prove the inner protected flow.",
      "The gateway may have a tunnel that this source never uses.",
      "The exception must match the documented policy and disclosure risk."
    ],
    "prerequisites": [
      "s4-g5-t0",
      "s5-g1-t2"
    ],
    "related": [
      "s5-g4-t1"
    ],
    "lab": {
      "objective": "Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "VPN concepts boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record outer peers and inner application source/destination in separate columns.",
        "Fault: clear only the worksheet child-path declaration while retaining underlay reachability.",
        "Restore it and list matching protected-path, return-route and application evidence needed on a target.",
        "Predict the baseline VPN concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use two isolated gateway/client endpoints and a documented application objective. Preserve management access and baseline routes before changing one owned traffic-selection declaration. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Restore exact selection and verify protected request, return and application permission. Do not broaden all traffic merely to make an icon green. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Underlay → Overlay → Application permission. Application authorization remains independent. Outbound protected counters alone are incomplete.",
      "challenge": "What should a tunnel-up icon be correlated with? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Underlay": "Network carrying the outer packet. Must reach the peer independently.",
      "Overlay": "Selected protected communication. Routing and selection determine scope.",
      "Application permission": "Original allowed operation. A tunnel does not grant every privilege."
    },
    "sources": [
      {
        "title": "RFC 4301 IPsec architecture",
        "url": "https://www.rfc-editor.org/rfc/rfc4301.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 IPsec virtual tunnel interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-ipsec-virt-tunnl-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g4-t0-QC2",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does encapsulation alone encrypt content?",
        "answer": "No.",
        "explanation": "Protection depends on the selected protocol and negotiated policy.",
        "testedConcept": "Does encapsulation alone encrypt content?"
      },
      {
        "questionId": "s5-g4-t0-QC4",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "VPN login succeeds; is server administration automatically permitted?",
        "answer": "No.",
        "explanation": "Application authorization remains independent.",
        "testedConcept": "VPN login succeeds; is server administration automatically permitted?"
      },
      {
        "questionId": "s5-g4-t0-QC8",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a tunnel-up icon be correlated with?",
        "answer": "The original selected protected transaction.",
        "explanation": "Control state alone cannot establish usable service.",
        "testedConcept": "What should a tunnel-up icon be correlated with?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g4-t0-Q01",
        "topicId": "s5-g4-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "The peer is reachable; is the protected service proven?",
        "answer": "No.",
        "explanation": "Underlay reachability is separate from tunnel selection and application behavior.",
        "testedConcept": "The peer is reachable; is the protected service proven?",
        "options": [
          "Yes; an outer packet authenticates every inner user.",
          "Only if the peer is a gateway.",
          "No.",
          "Yes; peer reachability proves protected application success."
        ]
      },
      {
        "questionId": "s5-g4-t0-Q02",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does encapsulation alone encrypt content?",
        "answer": "No.",
        "explanation": "Protection depends on the selected protocol and negotiated policy.",
        "testedConcept": "Does encapsulation alone encrypt content?"
      },
      {
        "questionId": "s5-g4-t0-Q03",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record inner and outer addresses separately?",
        "answer": "They identify different routing/observation scopes.",
        "explanation": "Outer delivery does not prove the inner protected flow.",
        "testedConcept": "Why record inner and outer addresses separately?"
      },
      {
        "questionId": "s5-g4-t0-Q04",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "VPN login succeeds; is server administration automatically permitted?",
        "answer": "No.",
        "explanation": "Application authorization remains independent.",
        "testedConcept": "VPN login succeeds; is server administration automatically permitted?"
      },
      {
        "questionId": "s5-g4-t0-Q05",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which route must be checked for the protected request?",
        "answer": "The original source route selecting the intended overlay.",
        "explanation": "The gateway may have a tunnel that this source never uses.",
        "testedConcept": "Which route must be checked for the protected request?"
      },
      {
        "questionId": "s5-g4-t0-Q06",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why test the return route?",
        "answer": "The original transaction needs bidirectional delivery.",
        "explanation": "Outbound protected counters alone are incomplete.",
        "testedConcept": "Why test the return route?"
      },
      {
        "questionId": "s5-g4-t0-Q07",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can split routing intentionally leave some traffic outside the VPN?",
        "answer": "Yes.",
        "explanation": "The exception must match the documented policy and disclosure risk.",
        "testedConcept": "Can split routing intentionally leave some traffic outside the VPN?"
      },
      {
        "questionId": "s5-g4-t0-Q08",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should a tunnel-up icon be correlated with?",
        "answer": "The original selected protected transaction.",
        "explanation": "Control state alone cannot establish usable service.",
        "testedConcept": "What should a tunnel-up icon be correlated with?"
      },
      {
        "questionId": "s5-g4-t0-Q09",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How does encapsulation affect MTU?",
        "answer": "It reduces the available inner packet budget.",
        "explanation": "Actual overhead and path behavior depend on the design.",
        "testedConcept": "How does encapsulation affect MTU?"
      },
      {
        "questionId": "s5-g4-t0-Q10",
        "topicId": "s5-g4-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept recovery after a selection fault?",
        "answer": "Restore exact selection and verify protected request, return and application permission.",
        "explanation": "Do not broaden all traffic merely to make an icon green.",
        "testedConcept": "How do you accept recovery after a selection fault?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g4-t1",
    "batch": "14",
    "title": "IPsec",
    "subtitle": "Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-ipsec",
    "definition": "IPsec applies policy to IP traffic using security associations and packet protection. The security policy database describes whether traffic is bypassed, discarded or protected; the security association database holds the negotiated/installed state for protection. ESP can provide confidentiality and integrity under the chosen transform; AH does not encrypt content. Algorithm choice, mode and actual endpoint support remain deployment-specific.",
    "purpose": "Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe.",
    "mental": "Match the observed traffic to the policy and selectors. Tunnel mode carries an inner IP packet within an outer IP packet; transport mode protects applicable upper-layer content without the same full inner-packet encapsulation. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "SPD: Policy for bypass/discard/protect. Match the intended traffic at the chosen observer.",
      "SAD: Installed association state. Direction and selectors must match.",
      "ESP versus AH: Different protection capabilities. AH is not a confidentiality mechanism.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Match the observed traffic to the policy and selectors. Tunnel mode carries an inner IP packet within an outer IP packet; transport mode protects applicable upper-layer content without the same full inner-packet encapsulation.",
      "Use the selected security association with its direction, SPI, endpoints and transform. IPsec SAs are unidirectional, so usable request/response protection requires the appropriate state for both directions.",
      "Review protected counters, selector agreement, anti-replay behavior and the original application observation. Counter increments can belong to unrelated traffic; an IKE SA without a matching child/data SA is insufficient."
    ],
    "flow": [
      [
        "Define the protected operation",
        "IPsec applies policy to IP traffic using security associations and packet protection. The security policy database describes whether traffic is bypassed, discarded or protected; the security association database holds the negotiated/installed state for protection. ESP can provide confidentiality and integrity under the chosen transform; AH does not encrypt content. Algorithm choice, mode and actual endpoint support remain deployment-specific."
      ],
      [
        "Identify the consuming boundary",
        "Match the observed traffic to the policy and selectors. Tunnel mode carries an inner IP packet within an outer IP packet; transport mode protects applicable upper-layer content without the same full inner-packet encapsulation."
      ],
      [
        "Follow the actual decision",
        "Use the selected security association with its direction, SPI, endpoints and transform. IPsec SAs are unidirectional, so usable request/response protection requires the appropriate state for both directions."
      ],
      [
        "Verify limits and recovery",
        "Review protected counters, selector agreement, anti-replay behavior and the original application observation. Counter increments can belong to unrelated traffic; an IKE SA without a matching child/data SA is insufficient."
      ]
    ],
    "comparison": [
      [
        "SPD",
        "Policy for bypass/discard/protect",
        "Match the intended traffic at the chosen observer."
      ],
      [
        "SAD",
        "Installed association state",
        "Direction and selectors must match."
      ],
      [
        "ESP versus AH",
        "Different protection capabilities",
        "AH is not a confidentiality mechanism."
      ]
    ],
    "example": "IKE SA exists but child SA is absent; is protected data delivery proven? No. Control negotiation and data protection have distinct state. Compare this with a different operational question: Does AH encrypt application content? No. Authentication/integrity protection is distinct from confidentiality. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "For the IPsec/IKEv2 design, IKE commonly uses UDP 500/4500 and native ESP is IP protocol 50, not TCP port 50. NAT traversal and other remote-access products have different transport policies.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show crypto ipsec sa",
        "explanation": "Observe the installed context for IPsec. Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Matching directional state and original protected request/response evidence. A peer-up status or unrelated counter is incomplete. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does AH encrypt application content?",
        "No. Authentication/integrity protection is distinct from confidentiality."
      ],
      [
        "Does an ESP counter increase prove this application succeeded?",
        "No. Correlate selectors, original traffic and application outcome."
      ],
      [
        "Why inspect NAT handling around policy selection?",
        "Translation can change the tuple or required encapsulation. The deployment must reconcile selection and observation points."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Verify authenticated peer identity and approved current transforms. Anti-replay rejects duplicates in its supported sequence-window context; it does not prove content is benign or application access is authorized.",
    "performance": "Overhead depends on headers, transforms, padding and NAT traversal. The worksheet does not encrypt packets or predict effective MTU, hardware acceleration or throughput.",
    "mistakes": [
      "Control negotiation and data protection have distinct state.",
      "The SAD holds association state rather than the policy decision itself.",
      "The outer route serves the tunnel peer path.",
      "It is not malware detection or user authorization."
    ],
    "prerequisites": [
      "s4-g5-t0",
      "s5-g1-t2"
    ],
    "related": [
      "s5-g4-t2"
    ],
    "lab": {
      "objective": "Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "IPsec boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Write one owned selector pair and separate inbound/outbound SA observations.",
        "Fault: remove only the declared matching child SA while leaving peer authentication true.",
        "Restore it; require protected counters for the original traffic and both application directions, not unrelated SA activity.",
        "Predict the baseline IPsec result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Record protected selectors, peer identity, mode, NAT handling and installed directional SAs before testing. Use supported platform guidance rather than a universal crypto-map recipe. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Matching directional state and original protected request/response evidence. A peer-up status or unrelated counter is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "SPD → SAD → ESP versus AH. Authentication/integrity protection is distinct from confidentiality. Correlate selectors, original traffic and application outcome.",
      "challenge": "Why inspect NAT handling around policy selection? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "SPD": "Policy for bypass/discard/protect. Match the intended traffic at the chosen observer.",
      "SAD": "Installed association state. Direction and selectors must match.",
      "ESP versus AH": "Different protection capabilities. AH is not a confidentiality mechanism."
    },
    "sources": [
      {
        "title": "RFC 4301 IPsec architecture",
        "url": "https://www.rfc-editor.org/rfc/rfc4301.html",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 IPsec virtual tunnel interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-ipsec-virt-tunnl-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g4-t1-QC2",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is an IPsec SA bidirectional?",
        "answer": "No; it is unidirectional.",
        "explanation": "Both directions need appropriate protection state.",
        "testedConcept": "Is an IPsec SA bidirectional?"
      },
      {
        "questionId": "s5-g4-t1-QC4",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does AH encrypt application content?",
        "answer": "No.",
        "explanation": "Authentication/integrity protection is distinct from confidentiality.",
        "testedConcept": "Does AH encrypt application content?"
      },
      {
        "questionId": "s5-g4-t1-QC8",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect NAT handling around policy selection?",
        "answer": "Translation can change the tuple or required encapsulation.",
        "explanation": "The deployment must reconcile selection and observation points.",
        "testedConcept": "Why inspect NAT handling around policy selection?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g4-t1-Q01",
        "topicId": "s5-g4-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "IKE SA exists but child SA is absent; is protected data delivery proven?",
        "answer": "No.",
        "explanation": "Control negotiation and data protection have distinct state.",
        "testedConcept": "IKE SA exists but child SA is absent; is protected data delivery proven?",
        "options": [
          "Only when both peers use private addresses.",
          "No.",
          "Yes; IKE state substitutes for all data SAs.",
          "Yes; a child SA is optional for protected traffic."
        ]
      },
      {
        "questionId": "s5-g4-t1-Q02",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is an IPsec SA bidirectional?",
        "answer": "No; it is unidirectional.",
        "explanation": "Both directions need appropriate protection state.",
        "testedConcept": "Is an IPsec SA bidirectional?"
      },
      {
        "questionId": "s5-g4-t1-Q03",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which database contains the traffic treatment policy?",
        "answer": "The SPD.",
        "explanation": "The SAD holds association state rather than the policy decision itself.",
        "testedConcept": "Which database contains the traffic treatment policy?"
      },
      {
        "questionId": "s5-g4-t1-Q04",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does AH encrypt application content?",
        "answer": "No.",
        "explanation": "Authentication/integrity protection is distinct from confidentiality.",
        "testedConcept": "Does AH encrypt application content?"
      },
      {
        "questionId": "s5-g4-t1-Q05",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does tunnel mode encapsulate?",
        "answer": "An inner IP packet under an outer IP header.",
        "explanation": "The outer route serves the tunnel peer path.",
        "testedConcept": "What does tunnel mode encapsulate?"
      },
      {
        "questionId": "s5-g4-t1-Q06",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an ESP counter increase prove this application succeeded?",
        "answer": "No.",
        "explanation": "Correlate selectors, original traffic and application outcome.",
        "testedConcept": "Does an ESP counter increase prove this application succeeded?"
      },
      {
        "questionId": "s5-g4-t1-Q07",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is anti-replay intended to reject?",
        "answer": "Repeated protected packets under the association sequence/window rules.",
        "explanation": "It is not malware detection or user authorization.",
        "testedConcept": "What is anti-replay intended to reject?"
      },
      {
        "questionId": "s5-g4-t1-Q08",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect NAT handling around policy selection?",
        "answer": "Translation can change the tuple or required encapsulation.",
        "explanation": "The deployment must reconcile selection and observation points.",
        "testedConcept": "Why inspect NAT handling around policy selection?"
      },
      {
        "questionId": "s5-g4-t1-Q09",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can this worksheet calculate real encryption throughput?",
        "answer": "No.",
        "explanation": "It traces supplied prerequisites without packet protection or hardware measurement.",
        "testedConcept": "Can this worksheet calculate real encryption throughput?"
      },
      {
        "questionId": "s5-g4-t1-Q10",
        "topicId": "s5-g4-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What supports recovery after an SA/selector fault?",
        "answer": "Matching directional state and original protected request/response evidence.",
        "explanation": "A peer-up status or unrelated counter is incomplete.",
        "testedConcept": "What supports recovery after an SA/selector fault?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g4-t2",
    "batch": "14",
    "title": "IKE",
    "subtitle": "Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-ike",
    "definition": "Internet Key Exchange authenticates peers and establishes keying/security association relationships for IPsec. This lesson centers on IKEv2; IKEv1 phase terminology must not be imposed on its different exchanges. IKE_SA_INIT establishes initial cryptographic negotiation material, and IKE_AUTH authenticates identities and ordinarily establishes the first child SA. Initial negotiation success alone is not authenticated peer acceptance.",
    "purpose": "Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault.",
    "mental": "Agree on compatible proposals and exchange initial keying material/nonces under IKEv2. Packet delivery on the negotiation transport is a prerequisite, not proof of successful identity validation. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "IKE_SA_INIT: Initial proposal/keying exchange. Peer authentication is not yet established.",
      "IKE_AUTH: Authenticated identity and initial child context. Verify the expected identity/trust policy.",
      "CREATE_CHILD_SA: Additional/rekey association exchange. Continuity requires separate observation.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Agree on compatible proposals and exchange initial keying material/nonces under IKEv2. Packet delivery on the negotiation transport is a prerequisite, not proof of successful identity validation.",
      "Authenticate the intended peer using the configured identity/trust policy and create the required child SA/selectors. Authentication failures differ from no compatible proposal and from protected-route failure.",
      "Additional child creation and rekeying use CREATE_CHILD_SA; retain lifetime/renewal evidence separately from application continuity. Reauthentication/rekey handling and liveness depend on the actual implementation and policy."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Internet Key Exchange authenticates peers and establishes keying/security association relationships for IPsec. This lesson centers on IKEv2; IKEv1 phase terminology must not be imposed on its different exchanges. IKE_SA_INIT establishes initial cryptographic negotiation material, and IKE_AUTH authenticates identities and ordinarily establishes the first child SA. Initial negotiation success alone is not authenticated peer acceptance."
      ],
      [
        "Identify the consuming boundary",
        "Agree on compatible proposals and exchange initial keying material/nonces under IKEv2. Packet delivery on the negotiation transport is a prerequisite, not proof of successful identity validation."
      ],
      [
        "Follow the actual decision",
        "Authenticate the intended peer using the configured identity/trust policy and create the required child SA/selectors. Authentication failures differ from no compatible proposal and from protected-route failure."
      ],
      [
        "Verify limits and recovery",
        "Additional child creation and rekeying use CREATE_CHILD_SA; retain lifetime/renewal evidence separately from application continuity. Reauthentication/rekey handling and liveness depend on the actual implementation and policy."
      ]
    ],
    "comparison": [
      [
        "IKE_SA_INIT",
        "Initial proposal/keying exchange",
        "Peer authentication is not yet established."
      ],
      [
        "IKE_AUTH",
        "Authenticated identity and initial child context",
        "Verify the expected identity/trust policy."
      ],
      [
        "CREATE_CHILD_SA",
        "Additional/rekey association exchange",
        "Continuity requires separate observation."
      ]
    ],
    "example": "IKE_SA_INIT completed; is the peer authenticated? No. IKE_AUTH is the distinct authenticated exchange context. Compare this with a different operational question: UDP reachability succeeds but identity fails; where is the fault? At peer authentication/trust policy. Opening more ports does not repair unacceptable identity. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "For the IPsec/IKEv2 design, IKE commonly uses UDP 500/4500 and native ESP is IP protocol 50, not TCP port 50. NAT traversal and other remote-access products have different transport policies.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show crypto ikev2 sa\nshow crypto ipsec sa",
        "explanation": "Observe the installed context for IKE. Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Expected authenticated peer, matching child state and original protected application operation. Transport reachability alone remains insufficient. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "UDP reachability succeeds but identity fails; where is the fault?",
        "At peer authentication/trust policy. Opening more ports does not repair unacceptable identity."
      ],
      [
        "Does a matching proposal alone authorize the application?",
        "No. Authenticated child/route state and application permission remain separate."
      ],
      [
        "Is rekey completion the same as uninterrupted application service?",
        "No. The original transaction needs continuity/recovery observation."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Do not disable peer verification to repair a mismatch. Use independently approved transform/trust policy; this course provides no real secrets or deployment-ready universal suite.",
    "performance": "Negotiation bursts, renewal intervals and server/key operations affect load. A declared authenticated checkbox measures neither cryptographic strength nor actual handshake latency.",
    "mistakes": [
      "IKE_AUTH is the distinct authenticated exchange context.",
      "IKEv2 is not described accurately by only IKEv1 phase labels.",
      "Restore the intended identity and approved trust configuration.",
      "Negotiation can succeed for unrelated selector scope."
    ],
    "prerequisites": [
      "s4-g5-t0",
      "s5-g1-t2"
    ],
    "related": [
      "s5-g4-t3"
    ],
    "lab": {
      "objective": "Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "IKE boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Separate underlay, initial exchange, authentication and child-SA evidence in the notebook.",
        "Fault: mark peer identity unacceptable while leaving transport reachability true.",
        "Restore the expected identity policy and require authenticated IKE plus matching child state before the original application test.",
        "Predict the baseline IKE result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Capture proposal, expected peer identity, trust anchor/shared-secret scope and child selectors on both endpoints. Preserve a supported baseline and independent console before a single owned identity-policy fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Expected authenticated peer, matching child state and original protected application operation. Transport reachability alone remains insufficient. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "IKE_SA_INIT → IKE_AUTH → CREATE_CHILD_SA. Opening more ports does not repair unacceptable identity. Authenticated child/route state and application permission remain separate.",
      "challenge": "Is rekey completion the same as uninterrupted application service? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "IKE_SA_INIT": "Initial proposal/keying exchange. Peer authentication is not yet established.",
      "IKE_AUTH": "Authenticated identity and initial child context. Verify the expected identity/trust policy.",
      "CREATE_CHILD_SA": "Additional/rekey association exchange. Continuity requires separate observation."
    },
    "sources": [
      {
        "title": "RFC 7296 IKEv2",
        "url": "https://www.rfc-editor.org/info/rfc7296/",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 IPsec virtual tunnel interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-ipsec-virt-tunnl-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g4-t2-QC2",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which IKEv2 exchange ordinarily establishes the first child SA?",
        "answer": "IKE_AUTH.",
        "explanation": "Later association creation/rekeying uses a different exchange.",
        "testedConcept": "Which IKEv2 exchange ordinarily establishes the first child SA?"
      },
      {
        "questionId": "s5-g4-t2-QC4",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "UDP reachability succeeds but identity fails; where is the fault?",
        "answer": "At peer authentication/trust policy.",
        "explanation": "Opening more ports does not repair unacceptable identity.",
        "testedConcept": "UDP reachability succeeds but identity fails; where is the fault?"
      },
      {
        "questionId": "s5-g4-t2-QC8",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is rekey completion the same as uninterrupted application service?",
        "answer": "No.",
        "explanation": "The original transaction needs continuity/recovery observation.",
        "testedConcept": "Is rekey completion the same as uninterrupted application service?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g4-t2-Q01",
        "topicId": "s5-g4-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "IKE_SA_INIT completed; is the peer authenticated?",
        "answer": "No.",
        "explanation": "IKE_AUTH is the distinct authenticated exchange context.",
        "testedConcept": "IKE_SA_INIT completed; is the peer authenticated?",
        "options": [
          "No.",
          "Yes; initial key exchange validates every identity.",
          "Yes; UDP delivery proves the trust anchor.",
          "Only when a proposal uses encryption."
        ]
      },
      {
        "questionId": "s5-g4-t2-Q02",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which IKEv2 exchange ordinarily establishes the first child SA?",
        "answer": "IKE_AUTH.",
        "explanation": "Later association creation/rekeying uses a different exchange.",
        "testedConcept": "Which IKEv2 exchange ordinarily establishes the first child SA?"
      },
      {
        "questionId": "s5-g4-t2-Q03",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which exchange creates additional or rekeyed child SAs?",
        "answer": "CREATE_CHILD_SA.",
        "explanation": "IKEv2 is not described accurately by only IKEv1 phase labels.",
        "testedConcept": "Which exchange creates additional or rekeyed child SAs?"
      },
      {
        "questionId": "s5-g4-t2-Q04",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "UDP reachability succeeds but identity fails; where is the fault?",
        "answer": "At peer authentication/trust policy.",
        "explanation": "Opening more ports does not repair unacceptable identity.",
        "testedConcept": "UDP reachability succeeds but identity fails; where is the fault?"
      },
      {
        "questionId": "s5-g4-t2-Q05",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should peer verification be disabled to resolve mismatch?",
        "answer": "No.",
        "explanation": "Restore the intended identity and approved trust configuration.",
        "testedConcept": "Should peer verification be disabled to resolve mismatch?"
      },
      {
        "questionId": "s5-g4-t2-Q06",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a matching proposal alone authorize the application?",
        "answer": "No.",
        "explanation": "Authenticated child/route state and application permission remain separate.",
        "testedConcept": "Does a matching proposal alone authorize the application?"
      },
      {
        "questionId": "s5-g4-t2-Q07",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why record both peers selectors?",
        "answer": "The installed child policy must protect the intended traffic.",
        "explanation": "Negotiation can succeed for unrelated selector scope.",
        "testedConcept": "Why record both peers selectors?"
      },
      {
        "questionId": "s5-g4-t2-Q08",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Is rekey completion the same as uninterrupted application service?",
        "answer": "No.",
        "explanation": "The original transaction needs continuity/recovery observation.",
        "testedConcept": "Is rekey completion the same as uninterrupted application service?"
      },
      {
        "questionId": "s5-g4-t2-Q09",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Which capacity issue accompanies many renewals?",
        "answer": "Negotiation and cryptographic operation load.",
        "explanation": "A worksheet does not benchmark handshake throughput.",
        "testedConcept": "Which capacity issue accompanies many renewals?"
      },
      {
        "questionId": "s5-g4-t2-Q10",
        "topicId": "s5-g4-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify an identity-policy repair?",
        "answer": "Expected authenticated peer, matching child state and original protected application operation.",
        "explanation": "Transport reachability alone remains insufficient.",
        "testedConcept": "How do you verify an identity-policy repair?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g4-t3",
    "batch": "14",
    "title": "Site-to-Site VPN",
    "subtitle": "Use two disposable gateways with one permitted application and a separate management path.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-site-vpn",
    "definition": "A site-to-site VPN joins selected networks through authenticated gateways. Gateway identity differs from the identities of individual application users behind them. Route-based and policy-based designs select traffic differently, so accepting one peer relationship does not prove every local source enters the intended tunnel. Both endpoint policy and underlay/return paths must agree with the same documented objective.",
    "purpose": "Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault.",
    "mental": "Define local and remote protected networks, gateway identities and the intended service tuple. Review overlap and address translation before selecting a route or traffic-selector policy. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Gateway identity: Authenticates the tunnel endpoint. Does not identify each inner user.",
      "Traffic selection: Route or policy chooses protected scope. Record the actual consuming design.",
      "Return path: Remote response uses intended policy. Outbound counters alone are insufficient.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Define local and remote protected networks, gateway identities and the intended service tuple. Review overlap and address translation before selecting a route or traffic-selector policy.",
      "Establish authenticated gateway and matching directional data associations. For a route-based design inspect the source routing table/VRF and tunnel attachment; for a policy-based design inspect the relevant selected tuple.",
      "Test the original local host toward the remote service, its protected reply and an explicitly prohibited tuple. Retain the negative observation without broadening all selectors, and verify recovery from the same host."
    ],
    "flow": [
      [
        "Define the protected operation",
        "A site-to-site VPN joins selected networks through authenticated gateways. Gateway identity differs from the identities of individual application users behind them. Route-based and policy-based designs select traffic differently, so accepting one peer relationship does not prove every local source enters the intended tunnel. Both endpoint policy and underlay/return paths must agree with the same documented objective."
      ],
      [
        "Identify the consuming boundary",
        "Define local and remote protected networks, gateway identities and the intended service tuple. Review overlap and address translation before selecting a route or traffic-selector policy."
      ],
      [
        "Follow the actual decision",
        "Establish authenticated gateway and matching directional data associations. For a route-based design inspect the source routing table/VRF and tunnel attachment; for a policy-based design inspect the relevant selected tuple."
      ],
      [
        "Verify limits and recovery",
        "Test the original local host toward the remote service, its protected reply and an explicitly prohibited tuple. Retain the negative observation without broadening all selectors, and verify recovery from the same host."
      ]
    ],
    "comparison": [
      [
        "Gateway identity",
        "Authenticates the tunnel endpoint",
        "Does not identify each inner user."
      ],
      [
        "Traffic selection",
        "Route or policy chooses protected scope",
        "Record the actual consuming design."
      ],
      [
        "Return path",
        "Remote response uses intended policy",
        "Outbound counters alone are insufficient."
      ]
    ],
    "example": "Gateway identities are valid; is every inner user authorized? No. Tunnel endpoint trust differs from application-user permission. Compare this with a different operational question: Why review overlapping private networks? The endpoints may not uniquely route the intended inner destination. Addressing/NAT design precedes acceptance. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "For the IPsec/IKEv2 design, IKE commonly uses UDP 500/4500 and native ESP is IP protocol 50, not TCP port 50. NAT traversal and other remote-access products have different transport policies.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show crypto ikev2 sa\nshow crypto ipsec sa\nshow ip route",
        "explanation": "Observe the installed context for Site-to-Site VPN. Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Repeat original bidirectional service and prohibited-flow tests with matching protected-path evidence. Do not stop at a tunnel-up icon. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why review overlapping private networks?",
        "The endpoints may not uniquely route the intended inner destination. Addressing/NAT design precedes acceptance."
      ],
      [
        "Should selector-any repair an unexplained failure?",
        "No. Restore the intended narrow scope and investigate the actual boundary."
      ],
      [
        "What negative test belongs in acceptance?",
        "An explicitly prohibited remote resource operation. Usability and least privilege require separate observations."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "A gateway-authenticated tunnel is not per-user authorization. Keep remote management and sensitive server access behind explicit resource policy.",
    "performance": "Overlapping addressing, asymmetric return and overhead can dominate troubleshooting. Measure path/MTU and endpoint CPU; the worksheet has no real tunnel traffic.",
    "mistakes": [
      "Tunnel endpoint trust differs from application-user permission.",
      "Installed association state can be unused by the original source.",
      "One direction does not prove the original transaction.",
      "A gateway-originated probe may use a different source or policy."
    ],
    "prerequisites": [
      "s4-g5-t0",
      "s5-g1-t2"
    ],
    "related": [
      "s5-g4-t4"
    ],
    "lab": {
      "objective": "Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Site-to-Site VPN boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record one local-host/remote-service flow and the protected selector/route scope on each site.",
        "Fault: clear only the protected outbound-route declaration while leaving authenticated SAs true.",
        "Restore the route and verify the original protected service plus a forbidden remote-management tuple.",
        "Predict the baseline Site-to-Site VPN result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use two disposable gateways with one permitted application and a separate management path. Save routes, policy attachment and NAT handling before a single owned protected-route fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Repeat original bidirectional service and prohibited-flow tests with matching protected-path evidence. Do not stop at a tunnel-up icon. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Gateway identity → Traffic selection → Return path. Addressing/NAT design precedes acceptance. Restore the intended narrow scope and investigate the actual boundary.",
      "challenge": "What negative test belongs in acceptance? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Gateway identity": "Authenticates the tunnel endpoint. Does not identify each inner user.",
      "Traffic selection": "Route or policy chooses protected scope. Record the actual consuming design.",
      "Return path": "Remote response uses intended policy. Outbound counters alone are insufficient."
    },
    "sources": [
      {
        "title": "RFC 4301 IPsec architecture",
        "url": "https://www.rfc-editor.org/rfc/rfc4301.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 7296 IKEv2",
        "url": "https://www.rfc-editor.org/info/rfc7296/",
        "checked": "2026-10-09"
      },
      {
        "title": "IOS XE 17 IPsec virtual tunnel interfaces",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-ipsec-virt-tunnl-0.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g4-t3-QC2",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What distinguishes route-based traffic selection?",
        "answer": "The intended route/tunnel attachment selects the protected path.",
        "explanation": "Policy-based selection relies on its applicable match policy.",
        "testedConcept": "What distinguishes route-based traffic selection?"
      },
      {
        "questionId": "s5-g4-t3-QC4",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review overlapping private networks?",
        "answer": "The endpoints may not uniquely route the intended inner destination.",
        "explanation": "Addressing/NAT design precedes acceptance.",
        "testedConcept": "Why review overlapping private networks?"
      },
      {
        "questionId": "s5-g4-t3-QC8",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What negative test belongs in acceptance?",
        "answer": "An explicitly prohibited remote resource operation.",
        "explanation": "Usability and least privilege require separate observations.",
        "testedConcept": "What negative test belongs in acceptance?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g4-t3-Q01",
        "topicId": "s5-g4-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Gateway identities are valid; is every inner user authorized?",
        "answer": "No.",
        "explanation": "Tunnel endpoint trust differs from application-user permission.",
        "testedConcept": "Gateway identities are valid; is every inner user authorized?",
        "options": [
          "Yes; gateway trust grants every inner operation.",
          "Yes; private addressing authenticates application users.",
          "Only if the tunnel is route-based.",
          "No."
        ]
      },
      {
        "questionId": "s5-g4-t3-Q02",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What distinguishes route-based traffic selection?",
        "answer": "The intended route/tunnel attachment selects the protected path.",
        "explanation": "Policy-based selection relies on its applicable match policy.",
        "testedConcept": "What distinguishes route-based traffic selection?"
      },
      {
        "questionId": "s5-g4-t3-Q03",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Tunnel exists but host route selects another path; what failed?",
        "answer": "The protected traffic-selection route.",
        "explanation": "Installed association state can be unused by the original source.",
        "testedConcept": "Tunnel exists but host route selects another path; what failed?"
      },
      {
        "questionId": "s5-g4-t3-Q04",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why review overlapping private networks?",
        "answer": "The endpoints may not uniquely route the intended inner destination.",
        "explanation": "Addressing/NAT design precedes acceptance.",
        "testedConcept": "Why review overlapping private networks?"
      },
      {
        "questionId": "s5-g4-t3-Q05",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Outbound encryption grows but reply is missing; next evidence?",
        "answer": "Remote return route/policy and corresponding inbound traffic.",
        "explanation": "One direction does not prove the original transaction.",
        "testedConcept": "Outbound encryption grows but reply is missing; next evidence?"
      },
      {
        "questionId": "s5-g4-t3-Q06",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should selector-any repair an unexplained failure?",
        "answer": "No.",
        "explanation": "Restore the intended narrow scope and investigate the actual boundary.",
        "testedConcept": "Should selector-any repair an unexplained failure?"
      },
      {
        "questionId": "s5-g4-t3-Q07",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Which observer should verify application recovery?",
        "answer": "The original local host toward the original remote service.",
        "explanation": "A gateway-originated probe may use a different source or policy.",
        "testedConcept": "Which observer should verify application recovery?"
      },
      {
        "questionId": "s5-g4-t3-Q08",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What negative test belongs in acceptance?",
        "answer": "An explicitly prohibited remote resource operation.",
        "explanation": "Usability and least privilege require separate observations.",
        "testedConcept": "What negative test belongs in acceptance?"
      },
      {
        "questionId": "s5-g4-t3-Q09",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can advertised link speed predict encrypted throughput?",
        "answer": "No.",
        "explanation": "Overhead, transforms and endpoint processing matter.",
        "testedConcept": "Can advertised link speed predict encrypted throughput?"
      },
      {
        "questionId": "s5-g4-t3-Q10",
        "topicId": "s5-g4-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept a restored protected route?",
        "answer": "Repeat original bidirectional service and prohibited-flow tests with matching protected-path evidence.",
        "explanation": "Do not stop at a tunnel-up icon.",
        "testedConcept": "How do you accept a restored protected route?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g4-t4",
    "batch": "14",
    "title": "Remote Access VPN",
    "subtitle": "Use one disposable identity and a least-privilege test role.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-remote-vpn",
    "definition": "Remote-access VPN policy admits an individual user/device to a scoped set of resources through a protected session. Authentication, assigned routes/DNS, endpoint posture and resource authorization are different obligations. A full-tunnel versus split-tunnel design changes where traffic is sent; neither automatically establishes the security of every endpoint or application.",
    "purpose": "Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role.",
    "mental": "Validate the intended server identity and user/device authentication using the chosen method. Apply MFA or certificate policy as designed; a password accepted by an unintended server is not a trusted session. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Ordered declared underlay/identity/child-SA/route/return/application prerequisites; no encryption, negotiation or measured traffic. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Protected session: Expected server and user/device relationship. Identity and transport trust both matter.",
      "Assigned policy: Routes, DNS and resource role. Verify actual client consumption.",
      "Revocation: Removes permitted session/resource use. Test denial under the implemented lifecycle.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Validate the intended server identity and user/device authentication using the chosen method. Apply MFA or certificate policy as designed; a password accepted by an unintended server is not a trusted session.",
      "Consume the assigned access role, client routes and DNS policy. Check whether each intended application enters the protected path and whether name resolution or local subnet overlap sends it elsewhere.",
      "Retest allowed and prohibited resources and revoke the owned session/identity as a separate denial test. A retained client profile or connected icon does not demonstrate fresh authorization after revocation."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Remote-access VPN policy admits an individual user/device to a scoped set of resources through a protected session. Authentication, assigned routes/DNS, endpoint posture and resource authorization are different obligations. A full-tunnel versus split-tunnel design changes where traffic is sent; neither automatically establishes the security of every endpoint or application."
      ],
      [
        "Identify the consuming boundary",
        "Validate the intended server identity and user/device authentication using the chosen method. Apply MFA or certificate policy as designed; a password accepted by an unintended server is not a trusted session."
      ],
      [
        "Follow the actual decision",
        "Consume the assigned access role, client routes and DNS policy. Check whether each intended application enters the protected path and whether name resolution or local subnet overlap sends it elsewhere."
      ],
      [
        "Verify limits and recovery",
        "Retest allowed and prohibited resources and revoke the owned session/identity as a separate denial test. A retained client profile or connected icon does not demonstrate fresh authorization after revocation."
      ]
    ],
    "comparison": [
      [
        "Protected session",
        "Expected server and user/device relationship",
        "Identity and transport trust both matter."
      ],
      [
        "Assigned policy",
        "Routes, DNS and resource role",
        "Verify actual client consumption."
      ],
      [
        "Revocation",
        "Removes permitted session/resource use",
        "Test denial under the implemented lifecycle."
      ]
    ],
    "example": "Connected VPN icon appears; is application access proven? No. Client path, role and application behavior need separate verification. Compare this with a different operational question: Does split tunneling send every flow through the VPN? No. Explicit route policy selects included and excluded traffic. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "For the IPsec/IKEv2 design, IKE commonly uses UDP 500/4500 and native ESP is IP protocol 50, not TCP port 50. NAT traversal and other remote-access products have different transport policies.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show crypto ikev2 sa",
        "explanation": "Observe the installed context for Remote Access VPN. Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Verify consumed routes/DNS/role, original permitted use and prohibited use. A connected icon remains only one observation. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does split tunneling send every flow through the VPN?",
        "No. Explicit route policy selects included and excluded traffic."
      ],
      [
        "Why check local subnet overlap?",
        "A client may route the intended destination locally. The actual client route can differ from gateway intent."
      ],
      [
        "Should every remote user inherit management access?",
        "No. Define a least-privilege resource scope."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect client endpoint and server trust. Explain split exclusions and credential/session revocation explicitly; being remote-connected is not a universal trusted-network membership.",
    "performance": "Concurrent sessions, encryption and endpoint network conditions affect capacity and user latency. This declaration trace does not install a client or benchmark a gateway.",
    "mistakes": [
      "Client path, role and application behavior need separate verification.",
      "Tunnel state does not establish correct naming.",
      "Authentication does not override resource authorization.",
      "Removing a database entry without observing enforcement is incomplete."
    ],
    "prerequisites": [
      "s4-g5-t0",
      "s5-g1-t2"
    ],
    "related": [
      "s5-g5-t0"
    ],
    "lab": {
      "objective": "Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Remote Access VPN boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record one protected application and one prohibited administration operation for a disposable user.",
        "Fault: retain valid identity but deny the requested role in the worksheet.",
        "Restore the intended restricted role and describe a separate revoke/reconnect test without using a real account.",
        "Predict the baseline Remote Access VPN result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use one disposable identity and a least-privilege test role. Record assigned address, routes, DNS and gateway/session context; preserve a separate administrator recovery route before changing a single owned role. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Verify consumed routes/DNS/role, original permitted use and prohibited use. A connected icon remains only one observation. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Protected session → Assigned policy → Revocation. Explicit route policy selects included and excluded traffic. The actual client route can differ from gateway intent.",
      "challenge": "Should every remote user inherit management access? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Protected session": "Expected server and user/device relationship. Identity and transport trust both matter.",
      "Assigned policy": "Routes, DNS and resource role. Verify actual client consumption.",
      "Revocation": "Removes permitted session/resource use. Test denial under the implemented lifecycle."
    },
    "sources": [
      {
        "title": "RFC 7296 IKEv2",
        "url": "https://www.rfc-editor.org/info/rfc7296/",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 8446 TLS 1.3",
        "url": "https://www.rfc-editor.org/rfc/rfc8446.html",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-207 zero trust",
        "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g4-t4-QC2",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why validate the gateway identity?",
        "answer": "To authenticate the intended protected endpoint.",
        "explanation": "Successful user credentials alone do not establish trusted server identity.",
        "testedConcept": "Why validate the gateway identity?"
      },
      {
        "questionId": "s5-g4-t4-QC4",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does split tunneling send every flow through the VPN?",
        "answer": "No.",
        "explanation": "Explicit route policy selects included and excluded traffic.",
        "testedConcept": "Does split tunneling send every flow through the VPN?"
      },
      {
        "questionId": "s5-g4-t4-QC8",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should every remote user inherit management access?",
        "answer": "No.",
        "explanation": "Define a least-privilege resource scope.",
        "testedConcept": "Should every remote user inherit management access?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g4-t4-Q01",
        "topicId": "s5-g4-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Connected VPN icon appears; is application access proven?",
        "answer": "No.",
        "explanation": "Client path, role and application behavior need separate verification.",
        "testedConcept": "Connected VPN icon appears; is application access proven?",
        "options": [
          "Yes; all client routes are protected automatically.",
          "Only if the user has a password.",
          "No.",
          "Yes; the icon verifies DNS and application permission."
        ]
      },
      {
        "questionId": "s5-g4-t4-Q02",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why validate the gateway identity?",
        "answer": "To authenticate the intended protected endpoint.",
        "explanation": "Successful user credentials alone do not establish trusted server identity.",
        "testedConcept": "Why validate the gateway identity?"
      },
      {
        "questionId": "s5-g4-t4-Q03",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What can wrong assigned DNS affect?",
        "answer": "Resolution and selection of the intended application endpoint.",
        "explanation": "Tunnel state does not establish correct naming.",
        "testedConcept": "What can wrong assigned DNS affect?"
      },
      {
        "questionId": "s5-g4-t4-Q04",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does split tunneling send every flow through the VPN?",
        "answer": "No.",
        "explanation": "Explicit route policy selects included and excluded traffic.",
        "testedConcept": "Does split tunneling send every flow through the VPN?"
      },
      {
        "questionId": "s5-g4-t4-Q05",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Valid identity but denied role: should access be granted?",
        "answer": "No.",
        "explanation": "Authentication does not override resource authorization.",
        "testedConcept": "Valid identity but denied role: should access be granted?"
      },
      {
        "questionId": "s5-g4-t4-Q06",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why check local subnet overlap?",
        "answer": "A client may route the intended destination locally.",
        "explanation": "The actual client route can differ from gateway intent.",
        "testedConcept": "Why check local subnet overlap?"
      },
      {
        "questionId": "s5-g4-t4-Q07",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What proves revocation behavior?",
        "answer": "The implemented session/resource denial at the original client.",
        "explanation": "Removing a database entry without observing enforcement is incomplete.",
        "testedConcept": "What proves revocation behavior?"
      },
      {
        "questionId": "s5-g4-t4-Q08",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should every remote user inherit management access?",
        "answer": "No.",
        "explanation": "Define a least-privilege resource scope.",
        "testedConcept": "Should every remote user inherit management access?"
      },
      {
        "questionId": "s5-g4-t4-Q09",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What capacity variables matter?",
        "answer": "Concurrent sessions, protection overhead and user-path conditions.",
        "explanation": "A single model trace supplies no gateway scale estimate.",
        "testedConcept": "What capacity variables matter?"
      },
      {
        "questionId": "s5-g4-t4-Q10",
        "topicId": "s5-g4-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept repaired remote policy?",
        "answer": "Verify consumed routes/DNS/role, original permitted use and prohibited use.",
        "explanation": "A connected icon remains only one observation.",
        "testedConcept": "How do you accept repaired remote policy?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g5-t0",
    "batch": "14",
    "title": "Firewall fundamentals",
    "subtitle": "Use a disposable boundary with required HTTPS and prohibited administration.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-firewall",
    "definition": "A firewall enforces an explicit traffic policy at a selected boundary. Stateless filters decide from packet fields; stateful inspection also uses admitted flow context. Neither automatically authenticates users or fixes application defects. Begin with a default-deny resource matrix and documented exceptions, then verify which interface, zone, session and translation context actually consumes it.",
    "purpose": "Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault.",
    "mental": "Describe permitted initiation using source, destination, protocol and service. Separate traffic to the firewall itself from transit traffic, and review address translation at the selected observation point. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Stateless permit: One packet decision. Return permission is separate.",
      "Stateful response: Belongs to an admitted valid flow. New reverse initiation is different.",
      "Application permission: Endpoint access decision. Firewall admission does not override it.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Describe permitted initiation using source, destination, protocol and service. Separate traffic to the firewall itself from transit traffic, and review address translation at the selected observation point.",
      "For stateful policy, distinguish a response belonging to admitted valid state from a new reverse-direction initiation. The worksheet consumes a declared valid-state flag; it does not create or authenticate a real connection.",
      "Retain rule/session evidence and the original allowed and prohibited application observations. A permitted filter result does not establish routing, content visibility or endpoint authorization; a timeout does not uniquely identify a firewall deny."
    ],
    "flow": [
      [
        "Define the protected operation",
        "A firewall enforces an explicit traffic policy at a selected boundary. Stateless filters decide from packet fields; stateful inspection also uses admitted flow context. Neither automatically authenticates users or fixes application defects. Begin with a default-deny resource matrix and documented exceptions, then verify which interface, zone, session and translation context actually consumes it."
      ],
      [
        "Identify the consuming boundary",
        "Describe permitted initiation using source, destination, protocol and service. Separate traffic to the firewall itself from transit traffic, and review address translation at the selected observation point."
      ],
      [
        "Follow the actual decision",
        "For stateful policy, distinguish a response belonging to admitted valid state from a new reverse-direction initiation. The worksheet consumes a declared valid-state flag; it does not create or authenticate a real connection."
      ],
      [
        "Verify limits and recovery",
        "Retain rule/session evidence and the original allowed and prohibited application observations. A permitted filter result does not establish routing, content visibility or endpoint authorization; a timeout does not uniquely identify a firewall deny."
      ]
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
    "example": "An admitted stateful response arrives; does it authorize new reverse initiation? No. Responses and new sessions have different policy meaning. Compare this with a different operational question: Why record NAT relative to rule evaluation? The tuple may be translated at different boundaries. Match the fields actually consumed by the selected policy. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Firewall policy has no intrinsic port; the classroom example uses HTTPS TCP destination 443 and distinguishes initiation from response. Actual zones/ASA rules use their observed tuple.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show ip access-lists",
        "explanation": "Observe the installed context for Firewall fundamentals. Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Required original service works while prohibited initiation remains denied. A broad permit may restore usability while breaking the security objective. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why record NAT relative to rule evaluation?",
        "The tuple may be translated at different boundaries. Match the fields actually consumed by the selected policy."
      ],
      [
        "What does the worksheet valid-state flag represent?",
        "A supplied condition, not a real tracked connection. No actual state creation, expiry or sequence validation occurs."
      ],
      [
        "Can encrypted admitted content still be harmful?",
        "Yes. Transport admission and content safety are different claims."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Restrict firewall administration and logging, including the management plane and secrets in configuration backups. Stateful admission does not make allowed encrypted content benign.",
    "performance": "Connection limits, inspection, logging and asymmetric paths affect performance. Measure the actual supported workload; this trace has no real session table or throughput estimate.",
    "mistakes": [
      "Responses and new sessions have different policy meaning.",
      "Path, listener, return policy and application failure can also time out.",
      "Endpoint authorization is independent.",
      "Transit policy does not necessarily govern to-device management."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g5-t1"
    ],
    "lab": {
      "objective": "Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Firewall fundamentals boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Declare an inspected forward initiation, then compare response versus new reverse initiation.",
        "Fault: select pass instead of inspect for the forward policy; remove the reverse permit and predict the response denial.",
        "Restore inspect and separately verify a prohibited new reverse connection remains denied on the planned target.",
        "Predict the baseline Firewall fundamentals result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable boundary with required HTTPS and prohibited administration. Preserve policy, translations, routes and independent management before one owned service-rule fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Required original service works while prohibited initiation remains denied. A broad permit may restore usability while breaking the security objective. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Stateless permit → Stateful response → Application permission. Match the fields actually consumed by the selected policy. No actual state creation, expiry or sequence validation occurs.",
      "challenge": "Can encrypted admitted content still be harmful? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Stateless permit": "One packet decision. Return permission is separate.",
      "Stateful response": "Belongs to an admitted valid flow. New reverse initiation is different.",
      "Application permission": "Endpoint access decision. Firewall admission does not override it."
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
    "quick": [
      {
        "questionId": "s5-g5-t0-QC2",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What makes a stateless filter different?",
        "answer": "It evaluates packet fields without creating connection state.",
        "explanation": "A forward permit does not automatically admit replies.",
        "testedConcept": "What makes a stateless filter different?"
      },
      {
        "questionId": "s5-g5-t0-QC4",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record NAT relative to rule evaluation?",
        "answer": "The tuple may be translated at different boundaries.",
        "explanation": "Match the fields actually consumed by the selected policy.",
        "testedConcept": "Why record NAT relative to rule evaluation?"
      },
      {
        "questionId": "s5-g5-t0-QC8",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can encrypted admitted content still be harmful?",
        "answer": "Yes.",
        "explanation": "Transport admission and content safety are different claims.",
        "testedConcept": "Can encrypted admitted content still be harmful?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g5-t0-Q01",
        "topicId": "s5-g5-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "An admitted stateful response arrives; does it authorize new reverse initiation?",
        "answer": "No.",
        "explanation": "Responses and new sessions have different policy meaning.",
        "testedConcept": "An admitted stateful response arrives; does it authorize new reverse initiation?",
        "options": [
          "Only when the port number is unchanged.",
          "No.",
          "Yes; every reverse session inherits the permit.",
          "Yes; responses grant universal authorization."
        ]
      },
      {
        "questionId": "s5-g5-t0-Q02",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What makes a stateless filter different?",
        "answer": "It evaluates packet fields without creating connection state.",
        "explanation": "A forward permit does not automatically admit replies.",
        "testedConcept": "What makes a stateless filter different?"
      },
      {
        "questionId": "s5-g5-t0-Q03",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A timeout follows a request; is firewall denial proven?",
        "answer": "No.",
        "explanation": "Path, listener, return policy and application failure can also time out.",
        "testedConcept": "A timeout follows a request; is firewall denial proven?"
      },
      {
        "questionId": "s5-g5-t0-Q04",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record NAT relative to rule evaluation?",
        "answer": "The tuple may be translated at different boundaries.",
        "explanation": "Match the fields actually consumed by the selected policy.",
        "testedConcept": "Why record NAT relative to rule evaluation?"
      },
      {
        "questionId": "s5-g5-t0-Q05",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does firewall permit override application denial?",
        "answer": "No.",
        "explanation": "Endpoint authorization is independent.",
        "testedConcept": "Does firewall permit override application denial?"
      },
      {
        "questionId": "s5-g5-t0-Q06",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does the worksheet valid-state flag represent?",
        "answer": "A supplied condition, not a real tracked connection.",
        "explanation": "No actual state creation, expiry or sequence validation occurs.",
        "testedConcept": "What does the worksheet valid-state flag represent?"
      },
      {
        "questionId": "s5-g5-t0-Q07",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect firewall administration separately?",
        "answer": "Its compromise can disable traffic controls.",
        "explanation": "Transit policy does not necessarily govern to-device management.",
        "testedConcept": "Why protect firewall administration separately?"
      },
      {
        "questionId": "s5-g5-t0-Q08",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can encrypted admitted content still be harmful?",
        "answer": "Yes.",
        "explanation": "Transport admission and content safety are different claims.",
        "testedConcept": "Can encrypted admitted content still be harmful?"
      },
      {
        "questionId": "s5-g5-t0-Q09",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Which load dimensions should be measured?",
        "answer": "Connections, inspection, logging and equivalent workload latency.",
        "explanation": "Rule count alone does not establish target capacity.",
        "testedConcept": "Which load dimensions should be measured?"
      },
      {
        "questionId": "s5-g5-t0-Q10",
        "topicId": "s5-g5-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What verifies repair of a required-service rule?",
        "answer": "Required original service works while prohibited initiation remains denied.",
        "explanation": "A broad permit may restore usability while breaking the security objective.",
        "testedConcept": "What verifies repair of a required-service rule?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g5-t1",
    "batch": "14",
    "title": "Zone Based Firewall",
    "subtitle": "Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-zbf",
    "definition": "Cisco Zone-Based Firewall groups interfaces into zones and attaches directional policy to a source/destination zone pair. An inspect action provides supported stateful handling; pass allows matched traffic without creating inspection state; drop rejects it. Inter-zone policy must be defined deliberately. Same-zone and self-zone behavior have separate defaults/controls and cannot be inferred from an ordinary inter-zone example.",
    "purpose": "Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment.",
    "mental": "Identify actual ingress/egress zones and any interface ACL that also consumes the traffic. Define the intended directional zone pair and attach the matching inspect-type policy; merely defining a class map has no service effect. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Zone pair: Directional source-to-destination policy. Wrong direction leaves the intended flow unprotected/unusable.",
      "Inspect: Supported stateful processing. Matching response state is separate from a new session.",
      "Pass: Permit without state creation. Reverse permission needs independent policy.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify actual ingress/egress zones and any interface ACL that also consumes the traffic. Define the intended directional zone pair and attach the matching inspect-type policy; merely defining a class map has no service effect.",
      "Classify the forward flow and apply inspect, pass or drop. A permitted ACL in a class map can select traffic for a drop action, so classification is not itself the enforcement decision.",
      "For a matching response, inspect state may supply reverse handling under the configured design; pass requires an independent reverse policy. Verify state and original service, then treat self-zone management and new reverse initiation separately."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Cisco Zone-Based Firewall groups interfaces into zones and attaches directional policy to a source/destination zone pair. An inspect action provides supported stateful handling; pass allows matched traffic without creating inspection state; drop rejects it. Inter-zone policy must be defined deliberately. Same-zone and self-zone behavior have separate defaults/controls and cannot be inferred from an ordinary inter-zone example."
      ],
      [
        "Identify the consuming boundary",
        "Identify actual ingress/egress zones and any interface ACL that also consumes the traffic. Define the intended directional zone pair and attach the matching inspect-type policy; merely defining a class map has no service effect."
      ],
      [
        "Follow the actual decision",
        "Classify the forward flow and apply inspect, pass or drop. A permitted ACL in a class map can select traffic for a drop action, so classification is not itself the enforcement decision."
      ],
      [
        "Verify limits and recovery",
        "For a matching response, inspect state may supply reverse handling under the configured design; pass requires an independent reverse policy. Verify state and original service, then treat self-zone management and new reverse initiation separately."
      ]
    ],
    "comparison": [
      [
        "Zone pair",
        "Directional source-to-destination policy",
        "Wrong direction leaves the intended flow unprotected/unusable."
      ],
      [
        "Inspect",
        "Supported stateful processing",
        "Matching response state is separate from a new session."
      ],
      [
        "Pass",
        "Permit without state creation",
        "Reverse permission needs independent policy."
      ]
    ],
    "example": "Forward policy uses pass without reverse permission; modeled response? Denied. Pass creates no inspection state for return handling. Compare this with a different operational question: Is merely defining a policy map sufficient? No. It must be attached to the consuming zone pair. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Firewall policy has no intrinsic port; the classroom example uses HTTPS TCP destination 443 and distinguishes initiation from response. Actual zones/ASA rules use their observed tuple.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show zone-pair security\nshow policy-map type inspect zone-pair session",
        "explanation": "Observe the installed context for Zone Based Firewall. Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Correct membership/attachment/session evidence and original permitted/denied operations. A defined object alone does not prove consumed behavior. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Is merely defining a policy map sufficient?",
        "No. It must be attached to the consuming zone pair."
      ],
      [
        "Does same-zone behavior follow every inter-zone default?",
        "No. Review supported same-zone controls and defaults explicitly."
      ],
      [
        "Can inspect state authorize unrelated reverse initiation?",
        "No. Matching responses differ from new connections."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Do not assign every interface to zones before verifying recovery dependencies. Self-zone management and existing interface ACLs require explicit independent review.",
    "performance": "Inspect-supported protocol behavior, connection scale and logging vary. The trace covers a supplied policy relation, not ALG behavior, reclassification or real session expiry.",
    "mistakes": [
      "Pass creates no inspection state for return handling.",
      "Classification selects a class whose action can be drop.",
      "Traffic to/from the router itself has a separate scope.",
      "Multiple consuming boundaries can explain a failure."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g5-t2"
    ],
    "lab": {
      "objective": "Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Zone Based Firewall boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Draw Users → Servers and Servers → Users as separate initiation directions; record inspect on the intended forward pair.",
        "Fault: change inspect to pass and examine a response without a reverse permit.",
        "Restore inspect, then add explicit self-zone management review rather than treating it as transit.",
        "Predict the baseline Zone Based Firewall result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Preserve zone memberships, zone pairs, class/policy objects and management path on a disposable supported router. Test one owned wrong-direction or pass-versus-inspect declaration and restore exact attachment. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Correct membership/attachment/session evidence and original permitted/denied operations. A defined object alone does not prove consumed behavior. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Zone pair → Inspect → Pass. It must be attached to the consuming zone pair. Review supported same-zone controls and defaults explicitly.",
      "challenge": "Can inspect state authorize unrelated reverse initiation? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Zone pair": "Directional source-to-destination policy. Wrong direction leaves the intended flow unprotected/unusable.",
      "Inspect": "Supported stateful processing. Matching response state is separate from a new session.",
      "Pass": "Permit without state creation. Reverse permission needs independent policy."
    },
    "sources": [
      {
        "title": "IOS XE 17 zone-based policy firewall",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-zone-pol-fw-xe.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g5-t1-QC2",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does a zone pair identify?",
        "answer": "A directional source/destination zone relationship.",
        "explanation": "Its reverse is a different initiation policy.",
        "testedConcept": "What does a zone pair identify?"
      },
      {
        "questionId": "s5-g5-t1-QC4",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is merely defining a policy map sufficient?",
        "answer": "No.",
        "explanation": "It must be attached to the consuming zone pair.",
        "testedConcept": "Is merely defining a policy map sufficient?"
      },
      {
        "questionId": "s5-g5-t1-QC8",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can inspect state authorize unrelated reverse initiation?",
        "answer": "No.",
        "explanation": "Matching responses differ from new connections.",
        "testedConcept": "Can inspect state authorize unrelated reverse initiation?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g5-t1-Q01",
        "topicId": "s5-g5-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Forward policy uses pass without reverse permission; modeled response?",
        "answer": "Denied.",
        "explanation": "Pass creates no inspection state for return handling.",
        "testedConcept": "Forward policy uses pass without reverse permission; modeled response?",
        "options": [
          "Denied.",
          "Permitted because pass creates state.",
          "Permitted because all reverse initiation is trusted.",
          "Always inspected regardless of action."
        ]
      },
      {
        "questionId": "s5-g5-t1-Q02",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What does a zone pair identify?",
        "answer": "A directional source/destination zone relationship.",
        "explanation": "Its reverse is a different initiation policy.",
        "testedConcept": "What does a zone pair identify?"
      },
      {
        "questionId": "s5-g5-t1-Q03",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Class-map ACL permits a tuple; may the policy drop it?",
        "answer": "Yes.",
        "explanation": "Classification selects a class whose action can be drop.",
        "testedConcept": "Class-map ACL permits a tuple; may the policy drop it?"
      },
      {
        "questionId": "s5-g5-t1-Q04",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is merely defining a policy map sufficient?",
        "answer": "No.",
        "explanation": "It must be attached to the consuming zone pair.",
        "testedConcept": "Is merely defining a policy map sufficient?"
      },
      {
        "questionId": "s5-g5-t1-Q05",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does an inter-zone example define self-zone management policy?",
        "answer": "No.",
        "explanation": "Traffic to/from the router itself has a separate scope.",
        "testedConcept": "Does an inter-zone example define self-zone management policy?"
      },
      {
        "questionId": "s5-g5-t1-Q06",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does same-zone behavior follow every inter-zone default?",
        "answer": "No.",
        "explanation": "Review supported same-zone controls and defaults explicitly.",
        "testedConcept": "Does same-zone behavior follow every inter-zone default?"
      },
      {
        "questionId": "s5-g5-t1-Q07",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why inspect interface ACLs too?",
        "answer": "They can affect traffic before the zone policy.",
        "explanation": "Multiple consuming boundaries can explain a failure.",
        "testedConcept": "Why inspect interface ACLs too?"
      },
      {
        "questionId": "s5-g5-t1-Q08",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can inspect state authorize unrelated reverse initiation?",
        "answer": "No.",
        "explanation": "Matching responses differ from new connections.",
        "testedConcept": "Can inspect state authorize unrelated reverse initiation?"
      },
      {
        "questionId": "s5-g5-t1-Q09",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this trace simulate an application inspection engine?",
        "answer": "No.",
        "explanation": "ALG, reclassification, expiry and device sessions are excluded.",
        "testedConcept": "Does this trace simulate an application inspection engine?"
      },
      {
        "questionId": "s5-g5-t1-Q10",
        "topicId": "s5-g5-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify restored zone-pair policy?",
        "answer": "Correct membership/attachment/session evidence and original permitted/denied operations.",
        "explanation": "A defined object alone does not prove consumed behavior.",
        "testedConcept": "How do you verify restored zone-pair policy?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g5-t2",
    "batch": "14",
    "title": "Cisco ASA fundamentals",
    "subtitle": "Use an isolated ASA context with console access and one owned flow.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-asa",
    "definition": "Cisco ASA software provides firewall policy, connection handling, translation and supported inspection. Routed mode and transparent mode attach to different forwarding designs; security contexts and management scope also affect interpretation. Interface security levels describe part of default policy behavior but cannot replace explicit least-privilege rules. This lesson uses ASA 9.20 documentation and does not equate ASA software with FTD.",
    "purpose": "Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax.",
    "mental": "Record mode, context, interface/nameif, route and translation context for the original flow. Determine the observed addresses at the applicable policy stage instead of assuming pre/post-NAT behavior from another product. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared initiation versus response and inspect/pass/drop action; no connection-table implementation, NAT, retransmission or expiry simulation. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "ASA software: Firewall operating software with supported services. Distinct from FTD product/policy management.",
      "NAT: Address/port translation. Does not authenticate application access.",
      "Connection/inspection: State and protocol handling. Correlate the original flow, not unrelated sessions.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Record mode, context, interface/nameif, route and translation context for the original flow. Determine the observed addresses at the applicable policy stage instead of assuming pre/post-NAT behavior from another product.",
      "Review the consuming access rule, connection and inspection policy. A static translation publishes addressing, but it is not itself application authentication or proof that the access policy admits the intended flow.",
      "Correlate allowed and denied original operations with scoped counters/connection state. State handling and inspection can affect response behavior; a generic inspect/pass classroom relation is not an ASA parser or feature emulator."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Cisco ASA software provides firewall policy, connection handling, translation and supported inspection. Routed mode and transparent mode attach to different forwarding designs; security contexts and management scope also affect interpretation. Interface security levels describe part of default policy behavior but cannot replace explicit least-privilege rules. This lesson uses ASA 9.20 documentation and does not equate ASA software with FTD."
      ],
      [
        "Identify the consuming boundary",
        "Record mode, context, interface/nameif, route and translation context for the original flow. Determine the observed addresses at the applicable policy stage instead of assuming pre/post-NAT behavior from another product."
      ],
      [
        "Follow the actual decision",
        "Review the consuming access rule, connection and inspection policy. A static translation publishes addressing, but it is not itself application authentication or proof that the access policy admits the intended flow."
      ],
      [
        "Verify limits and recovery",
        "Correlate allowed and denied original operations with scoped counters/connection state. State handling and inspection can affect response behavior; a generic inspect/pass classroom relation is not an ASA parser or feature emulator."
      ]
    ],
    "comparison": [
      [
        "ASA software",
        "Firewall operating software with supported services",
        "Distinct from FTD product/policy management."
      ],
      [
        "NAT",
        "Address/port translation",
        "Does not authenticate application access."
      ],
      [
        "Connection/inspection",
        "State and protocol handling",
        "Correlate the original flow, not unrelated sessions."
      ]
    ],
    "example": "A static translation exists; is application access proven? No. Translation, traffic policy and application permission are separate. Compare this with a different operational question: Does a high security level authenticate users? No. A zone/interface default is not protected identity. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Firewall policy has no intrinsic port; the classroom example uses HTTPS TCP destination 443 and distinguishes initiation from response. Actual zones/ASA rules use their observed tuple.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "ASA 9.20 reference · GUIDED NOT EXECUTED",
        "code": "show access-list\nshow conn\nshow xlate",
        "explanation": "Observe the installed context for Cisco ASA fundamentals. Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Repeat original required and prohibited operations with scoped rule/connection evidence. Do not accept an unrestricted permit merely because it restores reachability. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does a high security level authenticate users?",
        "No. A zone/interface default is not protected identity."
      ],
      [
        "What differs between routed and transparent designs?",
        "The forwarding attachment and interpretation context. Do not assume identical route/translation procedures."
      ],
      [
        "Does show conn for unrelated traffic establish this application?",
        "No. Correlate the original tuple and operation."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Restrict to-device management separately and review default same-security/inter-interface behavior in the exact design. Do not depend on a high security-level label as an identity check.",
    "performance": "State, inspections, logging and context allocation affect capacity. No ASA appliance, license, parser or throughput was exercised by this course.",
    "mistakes": [
      "Translation, traffic policy and application permission are separate.",
      "A connection in another context does not prove this flow.",
      "Use the exact ASA release and mode documentation.",
      "Application boundary rules alone are incomplete management protection."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g5-t3"
    ],
    "lab": {
      "objective": "Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Cisco ASA fundamentals boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record ASA mode/context and pre/post-translation intended tuple in the evidence notebook.",
        "Fault: keep translation present but remove the modeled forward permit.",
        "Restore the narrow permit and require original allowed/denied flow evidence rather than publishing a broad any-any exception.",
        "Predict the baseline Cisco ASA fundamentals result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated ASA context with console access and one owned flow. Preserve access-group, NAT, routes and service policy before testing a narrow required-service rule; use release-specific syntax. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Repeat original required and prohibited operations with scoped rule/connection evidence. Do not accept an unrestricted permit merely because it restores reachability. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "ASA software → NAT → Connection/inspection. A zone/interface default is not protected identity. Do not assume identical route/translation procedures.",
      "challenge": "Does show conn for unrelated traffic establish this application? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "ASA software": "Firewall operating software with supported services. Distinct from FTD product/policy management.",
      "NAT": "Address/port translation. Does not authenticate application access.",
      "Connection/inspection": "State and protocol handling. Correlate the original flow, not unrelated sessions."
    },
    "sources": [
      {
        "title": "Secure Firewall ASA 9.20 firewall services",
        "url": "https://www.cisco.com/c/en/us/td/docs/security/asa/asa920/configuration/firewall/asa-920-firewall-config/intro-fw-services.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g5-t2-QC2",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Are ASA software and FTD interchangeable policy systems?",
        "answer": "No.",
        "explanation": "Their products, configuration and management roles differ.",
        "testedConcept": "Are ASA software and FTD interchangeable policy systems?"
      },
      {
        "questionId": "s5-g5-t2-QC4",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a high security level authenticate users?",
        "answer": "No.",
        "explanation": "A zone/interface default is not protected identity.",
        "testedConcept": "Does a high security level authenticate users?"
      },
      {
        "questionId": "s5-g5-t2-QC8",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does show conn for unrelated traffic establish this application?",
        "answer": "No.",
        "explanation": "Correlate the original tuple and operation.",
        "testedConcept": "Does show conn for unrelated traffic establish this application?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g5-t2-Q01",
        "topicId": "s5-g5-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A static translation exists; is application access proven?",
        "answer": "No.",
        "explanation": "Translation, traffic policy and application permission are separate.",
        "testedConcept": "A static translation exists; is application access proven?",
        "options": [
          "Yes; publishing an address authenticates every user.",
          "Yes; translation overrides every access rule.",
          "Only when the security level is high.",
          "No."
        ]
      },
      {
        "questionId": "s5-g5-t2-Q02",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Are ASA software and FTD interchangeable policy systems?",
        "answer": "No.",
        "explanation": "Their products, configuration and management roles differ.",
        "testedConcept": "Are ASA software and FTD interchangeable policy systems?"
      },
      {
        "questionId": "s5-g5-t2-Q03",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the security context?",
        "answer": "It identifies the policy/state scope being observed.",
        "explanation": "A connection in another context does not prove this flow.",
        "testedConcept": "Why record the security context?"
      },
      {
        "questionId": "s5-g5-t2-Q04",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a high security level authenticate users?",
        "answer": "No.",
        "explanation": "A zone/interface default is not protected identity.",
        "testedConcept": "Does a high security level authenticate users?"
      },
      {
        "questionId": "s5-g5-t2-Q05",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a generic IOS ACL recipe certify ASA syntax?",
        "answer": "No.",
        "explanation": "Use the exact ASA release and mode documentation.",
        "testedConcept": "Can a generic IOS ACL recipe certify ASA syntax?"
      },
      {
        "questionId": "s5-g5-t2-Q06",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What differs between routed and transparent designs?",
        "answer": "The forwarding attachment and interpretation context.",
        "explanation": "Do not assume identical route/translation procedures.",
        "testedConcept": "What differs between routed and transparent designs?"
      },
      {
        "questionId": "s5-g5-t2-Q07",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why protect to-device management separately?",
        "answer": "It may consume different controls from transit traffic.",
        "explanation": "Application boundary rules alone are incomplete management protection.",
        "testedConcept": "Why protect to-device management separately?"
      },
      {
        "questionId": "s5-g5-t2-Q08",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does show conn for unrelated traffic establish this application?",
        "answer": "No.",
        "explanation": "Correlate the original tuple and operation.",
        "testedConcept": "Does show conn for unrelated traffic establish this application?"
      },
      {
        "questionId": "s5-g5-t2-Q09",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What should throughput evaluation include?",
        "answer": "State, inspection, logging and allocated appliance/context resources.",
        "explanation": "A classroom state declaration is no benchmark.",
        "testedConcept": "What should throughput evaluation include?"
      },
      {
        "questionId": "s5-g5-t2-Q10",
        "topicId": "s5-g5-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify a repaired access rule?",
        "answer": "Repeat original required and prohibited operations with scoped rule/connection evidence.",
        "explanation": "Do not accept an unrestricted permit merely because it restores reachability.",
        "testedConcept": "How do you verify a repaired access rule?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g5-t3",
    "batch": "14",
    "title": "Cisco Firepower concepts",
    "subtitle": "Use an isolated supported target and benign test content only.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-firepower",
    "definition": "Cisco Firepower concepts are taught here using the distinct Secure Firewall Threat Defense and management roles. FTD executes supported traffic/inspection policy; management tooling authors and deploys that policy. A saved management change is not evidence that the intended device received and enforced it. Access-control actions, intrusion policy, encrypted-content visibility and licensing/support scope must be reviewed separately.",
    "purpose": "Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here.",
    "mental": "Identify the managed device, interface/zone and selected access-control policy. Confirm the intended deployment reached the target rather than treating an edited rule in the management UI as active enforcement. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Management configuration: Authored desired policy. Deployment confirmation is separate.",
      "Device enforcement: Consumed access/inspection decision. Correlate device and original-client evidence.",
      "Visibility: Content available to the control. No event does not establish clean traffic.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify the managed device, interface/zone and selected access-control policy. Confirm the intended deployment reached the target rather than treating an edited rule in the management UI as active enforcement.",
      "Follow the actual access decision and applicable inspection policy. Intrusion detection/prevention needs relevant content visibility and a supported enforced rule; encrypted visibility or decryption choices have their own limits.",
      "Correlate device events with the original transaction and a harmless supplied rule marker. A monitor/alert result differs from an enforced block, and a lack of events may reflect bypass, missing visibility or logging rather than absence of threats."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Cisco Firepower concepts are taught here using the distinct Secure Firewall Threat Defense and management roles. FTD executes supported traffic/inspection policy; management tooling authors and deploys that policy. A saved management change is not evidence that the intended device received and enforced it. Access-control actions, intrusion policy, encrypted-content visibility and licensing/support scope must be reviewed separately."
      ],
      [
        "Identify the consuming boundary",
        "Identify the managed device, interface/zone and selected access-control policy. Confirm the intended deployment reached the target rather than treating an edited rule in the management UI as active enforcement."
      ],
      [
        "Follow the actual decision",
        "Follow the actual access decision and applicable inspection policy. Intrusion detection/prevention needs relevant content visibility and a supported enforced rule; encrypted visibility or decryption choices have their own limits."
      ],
      [
        "Verify limits and recovery",
        "Correlate device events with the original transaction and a harmless supplied rule marker. A monitor/alert result differs from an enforced block, and a lack of events may reflect bypass, missing visibility or logging rather than absence of threats."
      ]
    ],
    "comparison": [
      [
        "Management configuration",
        "Authored desired policy",
        "Deployment confirmation is separate."
      ],
      [
        "Device enforcement",
        "Consumed access/inspection decision",
        "Correlate device and original-client evidence."
      ],
      [
        "Visibility",
        "Content available to the control",
        "No event does not establish clean traffic."
      ]
    ],
    "example": "Policy was saved in management; is device enforcement proven? No. Deployment and actual consuming device state need separate evidence. Compare this with a different operational question: Content is not visible; does no detection imply safe traffic? No. Visibility limits can hide relevant content. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "IDS/IPS have no intrinsic protected-service port. WAF scope is HTTP-oriented; HTTP/HTTPS commonly use TCP 80/443 while HTTP/3 uses QUIC/UDP and requires supported inspection.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show version",
        "explanation": "Observe the installed context for Cisco Firepower concepts. Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Confirmed deployed enforcement plus original-client and device observations. A changed rule label alone is incomplete. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Content is not visible; does no detection imply safe traffic?",
        "No. Visibility limits can hide relevant content."
      ],
      [
        "Why record deployment version/device?",
        "To tie intended policy to the actual enforcement target. A management screenshot can describe unused configuration."
      ],
      [
        "Why review decryption privacy?",
        "Inspected content/logs may contain sensitive data. Visibility controls create their own handling obligations."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect management identities and inspect sensitive-data exposure before enabling decryption/logging. Product licensing, supported versions and hardware lifecycle must be checked for the real deployment.",
    "performance": "Inspection, logging and decryption alter resource demands. The detector worksheet consumes declared match/visibility flags and does not scan payloads or measure appliance performance.",
    "mistakes": [
      "Deployment and actual consuming device state need separate evidence.",
      "Passive detection is distinct from prevention.",
      "A signal needs context and outcome analysis.",
      "Use supplied declarations or an owned harmless marker."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g5-t4"
    ],
    "lab": {
      "objective": "Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Cisco Firepower concepts boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record policy version, intended device and deployment evidence separately from rule contents.",
        "Fault: keep a declared rule match but switch the inspection role to IDS/monitor behavior.",
        "Restore supported blocking enforcement and specify original-client denial plus device evidence required on a target.",
        "Predict the baseline Cisco Firepower concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use an isolated supported target and benign test content only. Preserve the exact deployed policy/version and rollback plan before a single owned monitor-versus-block comparison; no FTD/FMC is installed here. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Confirmed deployed enforcement plus original-client and device observations. A changed rule label alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Management configuration → Device enforcement → Visibility. Visibility limits can hide relevant content. A management screenshot can describe unused configuration.",
      "challenge": "Why review decryption privacy? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Management configuration": "Authored desired policy. Deployment confirmation is separate.",
      "Device enforcement": "Consumed access/inspection decision. Correlate device and original-client evidence.",
      "Visibility": "Content available to the control. No event does not establish clean traffic."
    },
    "sources": [
      {
        "title": "Cisco Secure Firewall threat protection practices",
        "url": "https://secure.cisco.com/secure-firewall/docs/threat-protection-best-practices",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-94 IDPS",
        "url": "https://csrc.nist.gov/pubs/sp/800/94/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g5-t3-QC2",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What role does FTD provide?",
        "answer": "Supported traffic and threat-policy execution on the device.",
        "explanation": "Management authoring is a different role.",
        "testedConcept": "What role does FTD provide?"
      },
      {
        "questionId": "s5-g5-t3-QC4",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Content is not visible; does no detection imply safe traffic?",
        "answer": "No.",
        "explanation": "Visibility limits can hide relevant content.",
        "testedConcept": "Content is not visible; does no detection imply safe traffic?"
      },
      {
        "questionId": "s5-g5-t3-QC8",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why review decryption privacy?",
        "answer": "Inspected content/logs may contain sensitive data.",
        "explanation": "Visibility controls create their own handling obligations.",
        "testedConcept": "Why review decryption privacy?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g5-t3-Q01",
        "topicId": "s5-g5-t3",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Policy was saved in management; is device enforcement proven?",
        "answer": "No.",
        "explanation": "Deployment and actual consuming device state need separate evidence.",
        "testedConcept": "Policy was saved in management; is device enforcement proven?",
        "options": [
          "Yes; management configuration is runtime evidence.",
          "Only if the policy has a readable name.",
          "No.",
          "Yes; saving a rule deploys to every device."
        ]
      },
      {
        "questionId": "s5-g5-t3-Q02",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What role does FTD provide?",
        "answer": "Supported traffic and threat-policy execution on the device.",
        "explanation": "Management authoring is a different role.",
        "testedConcept": "What role does FTD provide?"
      },
      {
        "questionId": "s5-g5-t3-Q03",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Supplied rule matches in IDS mode; expected worksheet result?",
        "answer": "Alert without inspection block.",
        "explanation": "Passive detection is distinct from prevention.",
        "testedConcept": "Supplied rule matches in IDS mode; expected worksheet result?"
      },
      {
        "questionId": "s5-g5-t3-Q04",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Content is not visible; does no detection imply safe traffic?",
        "answer": "No.",
        "explanation": "Visibility limits can hide relevant content.",
        "testedConcept": "Content is not visible; does no detection imply safe traffic?"
      },
      {
        "questionId": "s5-g5-t3-Q05",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Is a matching signature proof of successful exploitation?",
        "answer": "No.",
        "explanation": "A signal needs context and outcome analysis.",
        "testedConcept": "Is a matching signature proof of successful exploitation?"
      },
      {
        "questionId": "s5-g5-t3-Q06",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record deployment version/device?",
        "answer": "To tie intended policy to the actual enforcement target.",
        "explanation": "A management screenshot can describe unused configuration.",
        "testedConcept": "Why record deployment version/device?"
      },
      {
        "questionId": "s5-g5-t3-Q07",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should real malicious payloads be used in this lab?",
        "answer": "No.",
        "explanation": "Use supplied declarations or an owned harmless marker.",
        "testedConcept": "Should real malicious payloads be used in this lab?"
      },
      {
        "questionId": "s5-g5-t3-Q08",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why review decryption privacy?",
        "answer": "Inspected content/logs may contain sensitive data.",
        "explanation": "Visibility controls create their own handling obligations.",
        "testedConcept": "Why review decryption privacy?"
      },
      {
        "questionId": "s5-g5-t3-Q09",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What drives appliance inspection cost?",
        "answer": "Policy, visibility/decryption, connection workload and logging.",
        "explanation": "Declared signals do not benchmark the device.",
        "testedConcept": "What drives appliance inspection cost?"
      },
      {
        "questionId": "s5-g5-t3-Q10",
        "topicId": "s5-g5-t3",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept monitor-to-block recovery?",
        "answer": "Confirmed deployed enforcement plus original-client and device observations.",
        "explanation": "A changed rule label alone is incomplete.",
        "testedConcept": "How do you accept monitor-to-block recovery?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g5-t4",
    "batch": "14",
    "title": "IDS / IPS",
    "subtitle": "Use supplied detector cases or a disposable harmless marker application.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-ids-ips",
    "definition": "An IDS observes and reports signals; an inline IPS can enforce prevention under its policy. Detection methods include signatures and behavior-based analysis, but a match is not automatically a confirmed successful compromise. Placement and visibility determine what can be observed. A clean event list may mean no signal, no content, bypass or missing telemetry.",
    "purpose": "Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits.",
    "mental": "Identify the sensor path and whether traffic is mirrored/passive or actually traverses inline enforcement. Record encrypted-content visibility and the rule/version expected to recognize the chosen benign test marker. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "IDS: Observation and alert role. Does not inline-block by itself.",
      "IPS: Inline enforcement role under policy. Verify the traffic actually traverses it.",
      "Detection signal: Evidence requiring interpretation. Different from confirmed compromise.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify the sensor path and whether traffic is mirrored/passive or actually traverses inline enforcement. Record encrypted-content visibility and the rule/version expected to recognize the chosen benign test marker.",
      "Distinguish a rule signal from its action: alert/monitor, block, bypass or failure behavior. A blocking policy needs actual consumption at the intended inline boundary; a passive sensor cannot deny the packet by observation alone.",
      "Retain original-client and sensor evidence for one harmless marker, then restore the baseline and repeat intended service. Review false positives/negatives and fail-open/fail-closed behavior without inferring incident prevalence from the raw alert count."
    ],
    "flow": [
      [
        "Define the protected operation",
        "An IDS observes and reports signals; an inline IPS can enforce prevention under its policy. Detection methods include signatures and behavior-based analysis, but a match is not automatically a confirmed successful compromise. Placement and visibility determine what can be observed. A clean event list may mean no signal, no content, bypass or missing telemetry."
      ],
      [
        "Identify the consuming boundary",
        "Identify the sensor path and whether traffic is mirrored/passive or actually traverses inline enforcement. Record encrypted-content visibility and the rule/version expected to recognize the chosen benign test marker."
      ],
      [
        "Follow the actual decision",
        "Distinguish a rule signal from its action: alert/monitor, block, bypass or failure behavior. A blocking policy needs actual consumption at the intended inline boundary; a passive sensor cannot deny the packet by observation alone."
      ],
      [
        "Verify limits and recovery",
        "Retain original-client and sensor evidence for one harmless marker, then restore the baseline and repeat intended service. Review false positives/negatives and fail-open/fail-closed behavior without inferring incident prevalence from the raw alert count."
      ]
    ],
    "comparison": [
      [
        "IDS",
        "Observation and alert role",
        "Does not inline-block by itself."
      ],
      [
        "IPS",
        "Inline enforcement role under policy",
        "Verify the traffic actually traverses it."
      ],
      [
        "Detection signal",
        "Evidence requiring interpretation",
        "Different from confirmed compromise."
      ]
    ],
    "example": "A passive IDS reports a match; has it blocked the packet? No. Observation alone is not inline enforcement. Compare this with a different operational question: Can a signature match establish successful compromise? No. Correlate context and outcome independently. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "IDS/IPS have no intrinsic protected-service port. WAF scope is HTTP-oriented; HTTP/HTTPS commonly use TCP 80/443 while HTTP/3 uses QUIC/UDP and requires supported inspection.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show version",
        "explanation": "Observe the installed context for IDS / IPS. Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Original benign-marker behavior and scoped sensor observations agree, with permitted service retained. Do not equate one marker with coverage of every threat. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Can a signature match establish successful compromise?",
        "No. Correlate context and outcome independently."
      ],
      [
        "What is a false positive?",
        "A signal/action incorrectly classifying benign activity as relevant malicious activity. Evaluate intended service impact and rule context."
      ],
      [
        "Why define fail-open versus fail-closed?",
        "Sensor failure can either preserve forwarding or deny service. Availability and exposure tradeoffs must be explicit."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect sensor management and retained packet/event data. Rule matches can contain sensitive payloads; preserve only the scoped redacted evidence needed for investigation.",
    "performance": "Inspection load, packet loss and logging can reduce visibility or availability. The worksheet models declared signals only and supplies no detection-rate or false-positive benchmark.",
    "mistakes": [
      "Observation alone is not inline enforcement.",
      "Visibility, bypass and telemetry gaps remain possible.",
      "A passive mirror and inline path have different authority.",
      "A quiet dashboard alone cannot quantify it."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g5-t5"
    ],
    "lab": {
      "objective": "Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "IDS / IPS boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Compare the same declared visible match in IDS and blocking IPS modes.",
        "Fault: remove the visibility declaration while retaining the supplied match flag.",
        "Restore visibility and separate detection/enforcement evidence from actual incident confirmation.",
        "Predict the baseline IDS / IPS result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use supplied detector cases or a disposable harmless marker application. Do not generate live attacks or attach a traffic generator to production. Document sensor path and known visibility limits. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Original benign-marker behavior and scoped sensor observations agree, with permitted service retained. Do not equate one marker with coverage of every threat. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "IDS → IPS → Detection signal. Correlate context and outcome independently. Evaluate intended service impact and rule context.",
      "challenge": "Why define fail-open versus fail-closed? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "IDS": "Observation and alert role. Does not inline-block by itself.",
      "IPS": "Inline enforcement role under policy. Verify the traffic actually traverses it.",
      "Detection signal": "Evidence requiring interpretation. Different from confirmed compromise."
    },
    "sources": [
      {
        "title": "NIST SP 800-94 IDPS",
        "url": "https://csrc.nist.gov/pubs/sp/800/94/final",
        "checked": "2026-10-09"
      },
      {
        "title": "Cisco Secure Firewall threat protection practices",
        "url": "https://secure.cisco.com/secure-firewall/docs/threat-protection-best-practices",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g5-t4-QC2",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What must be true for modeled IPS blocking?",
        "answer": "Visible content, a supplied match and enabled blocking in IPS mode.",
        "explanation": "The worksheet declares these conditions rather than measuring them.",
        "testedConcept": "What must be true for modeled IPS blocking?"
      },
      {
        "questionId": "s5-g5-t4-QC4",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a signature match establish successful compromise?",
        "answer": "No.",
        "explanation": "Correlate context and outcome independently.",
        "testedConcept": "Can a signature match establish successful compromise?"
      },
      {
        "questionId": "s5-g5-t4-QC8",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why define fail-open versus fail-closed?",
        "answer": "Sensor failure can either preserve forwarding or deny service.",
        "explanation": "Availability and exposure tradeoffs must be explicit.",
        "testedConcept": "Why define fail-open versus fail-closed?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g5-t4-Q01",
        "topicId": "s5-g5-t4",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A passive IDS reports a match; has it blocked the packet?",
        "answer": "No.",
        "explanation": "Observation alone is not inline enforcement.",
        "testedConcept": "A passive IDS reports a match; has it blocked the packet?",
        "options": [
          "Only when the mirror port is enabled.",
          "No.",
          "Yes; every sensor can enforce inline denial.",
          "Yes; signature detection confirms prevention."
        ]
      },
      {
        "questionId": "s5-g5-t4-Q02",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What must be true for modeled IPS blocking?",
        "answer": "Visible content, a supplied match and enabled blocking in IPS mode.",
        "explanation": "The worksheet declares these conditions rather than measuring them.",
        "testedConcept": "What must be true for modeled IPS blocking?"
      },
      {
        "questionId": "s5-g5-t4-Q03",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "No alerts are present; is traffic definitely safe?",
        "answer": "No.",
        "explanation": "Visibility, bypass and telemetry gaps remain possible.",
        "testedConcept": "No alerts are present; is traffic definitely safe?"
      },
      {
        "questionId": "s5-g5-t4-Q04",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can a signature match establish successful compromise?",
        "answer": "No.",
        "explanation": "Correlate context and outcome independently.",
        "testedConcept": "Can a signature match establish successful compromise?"
      },
      {
        "questionId": "s5-g5-t4-Q05",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the actual sensor path?",
        "answer": "Placement determines what is observed or enforced.",
        "explanation": "A passive mirror and inline path have different authority.",
        "testedConcept": "Why record the actual sensor path?"
      },
      {
        "questionId": "s5-g5-t4-Q06",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is a false positive?",
        "answer": "A signal/action incorrectly classifying benign activity as relevant malicious activity.",
        "explanation": "Evaluate intended service impact and rule context.",
        "testedConcept": "What is a false positive?"
      },
      {
        "questionId": "s5-g5-t4-Q07",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What is a false negative?",
        "answer": "A relevant harmful event not detected by the control.",
        "explanation": "A quiet dashboard alone cannot quantify it.",
        "testedConcept": "What is a false negative?"
      },
      {
        "questionId": "s5-g5-t4-Q08",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Why define fail-open versus fail-closed?",
        "answer": "Sensor failure can either preserve forwarding or deny service.",
        "explanation": "Availability and exposure tradeoffs must be explicit.",
        "testedConcept": "Why define fail-open versus fail-closed?"
      },
      {
        "questionId": "s5-g5-t4-Q09",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this worksheet estimate detection accuracy?",
        "answer": "No.",
        "explanation": "It consumes rule-match and visibility declarations.",
        "testedConcept": "Does this worksheet estimate detection accuracy?"
      },
      {
        "questionId": "s5-g5-t4-Q10",
        "topicId": "s5-g5-t4",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify a restored detection path?",
        "answer": "Original benign-marker behavior and scoped sensor observations agree, with permitted service retained.",
        "explanation": "Do not equate one marker with coverage of every threat.",
        "testedConcept": "How do you verify a restored detection path?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g5-t5",
    "batch": "14",
    "title": "WAF concepts",
    "subtitle": "Use a disposable HTTP application or supplied cases.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-waf",
    "definition": "A web application firewall evaluates HTTP-oriented requests under a supported deployment and rule policy. It can enforce signals relevant to web attacks, but it does not fix application authorization, unsafe database construction or every business-logic flaw. Network port filtering and WAF parsing have different scopes. TLS termination/inspection placement determines whether request content is visible to the control.",
    "purpose": "Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model.",
    "mental": "Identify the client-to-proxy-to-origin path, trusted proxy metadata and TLS termination. A rule defined on a WAF that the client bypasses cannot protect the direct origin path. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared content visibility, rule match and enforcement; no payload scanner, attack generator or real IDS/IPS/WAF. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Network filter: Protocol/address/port policy. Does not parse full web semantics.",
      "WAF rule: HTTP-aware signal/action. Visibility and path consumption matter.",
      "Application authorization: Resource/business permission. A clean WAF result does not establish it.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify the client-to-proxy-to-origin path, trusted proxy metadata and TLS termination. A rule defined on a WAF that the client bypasses cannot protect the direct origin path.",
      "Apply the relevant parsed request/rule policy and action. Managed rules, exceptions and request normalization are implementation-specific; this worksheet consumes a declared match, not a regular-expression payload scanner.",
      "Test permitted application requests and an owned harmless rule marker from the original path. Preserve request IDs, action and origin outcome without recording secrets; a clean WAF decision does not override application identity/authorization."
    ],
    "flow": [
      [
        "Define the protected operation",
        "A web application firewall evaluates HTTP-oriented requests under a supported deployment and rule policy. It can enforce signals relevant to web attacks, but it does not fix application authorization, unsafe database construction or every business-logic flaw. Network port filtering and WAF parsing have different scopes. TLS termination/inspection placement determines whether request content is visible to the control."
      ],
      [
        "Identify the consuming boundary",
        "Identify the client-to-proxy-to-origin path, trusted proxy metadata and TLS termination. A rule defined on a WAF that the client bypasses cannot protect the direct origin path."
      ],
      [
        "Follow the actual decision",
        "Apply the relevant parsed request/rule policy and action. Managed rules, exceptions and request normalization are implementation-specific; this worksheet consumes a declared match, not a regular-expression payload scanner."
      ],
      [
        "Verify limits and recovery",
        "Test permitted application requests and an owned harmless rule marker from the original path. Preserve request IDs, action and origin outcome without recording secrets; a clean WAF decision does not override application identity/authorization."
      ]
    ],
    "comparison": [
      [
        "Network filter",
        "Protocol/address/port policy",
        "Does not parse full web semantics."
      ],
      [
        "WAF rule",
        "HTTP-aware signal/action",
        "Visibility and path consumption matter."
      ],
      [
        "Application authorization",
        "Resource/business permission",
        "A clean WAF result does not establish it."
      ]
    ],
    "example": "WAF permits a request; is application authorization proven? No. Business/resource permission belongs to the application. Compare this with a different operational question: Does a TCP port-443 permit parse HTTP attacks? No. Transport filtering differs from HTTP-aware policy. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "IDS/IPS have no intrinsic protected-service port. WAF scope is HTTP-oriented; HTTP/HTTPS commonly use TCP 80/443 while HTTP/3 uses QUIC/UDP and requires supported inspection.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Ubuntu 24.04 read-only reference",
        "code": "ss -lnt",
        "explanation": "Observe the installed context for WAF concepts. Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Harmless marker action, original normal application use and protected-origin path agree. One alert label is not enforcement proof. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Does a TCP port-443 permit parse HTTP attacks?",
        "No. Transport filtering differs from HTTP-aware policy."
      ],
      [
        "Why test normal users after tuning a rule?",
        "A false positive can disrupt intended service. A marker block alone misses operational acceptance."
      ],
      [
        "Does a WAF replace parameterized database access?",
        "No. Application construction and validation need independent protection."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect TLS keys, authentication tokens and sensitive request logs. Test application validation and parameterized data access independently; WAF coverage is not a substitute for them.",
    "performance": "Rule processing, body limits, exceptions and TLS visibility influence latency and coverage. This detector model does not implement HTTP parsing, normalize attacks or estimate a vendor detection rate.",
    "mistakes": [
      "Business/resource permission belongs to the application.",
      "The intended proxy boundary is bypassed.",
      "It consumes supplied match and visibility flags.",
      "Scope the exception to the justified endpoint/rule and retest."
    ],
    "prerequisites": [
      "s5-g1-t2"
    ],
    "related": [
      "s5-g6-t0"
    ],
    "lab": {
      "objective": "Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "WAF concepts boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the proxy/origin path and where HTTP content is visible after TLS handling.",
        "Fault: declare visible harmless rule match but disable blocking; distinguish alert from prevention.",
        "Restore blocking in the worksheet and require the marker denial and normal authorized application result on an optional target.",
        "Predict the baseline WAF concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable HTTP application or supplied cases. Scope exceptions to the actual endpoint/rule and test normal users after one owned monitor/block fault. Keep direct origin exposure in the threat model. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Harmless marker action, original normal application use and protected-origin path agree. One alert label is not enforcement proof. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Network filter → WAF rule → Application authorization. Transport filtering differs from HTTP-aware policy. A marker block alone misses operational acceptance.",
      "challenge": "Does a WAF replace parameterized database access? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Network filter": "Protocol/address/port policy. Does not parse full web semantics.",
      "WAF rule": "HTTP-aware signal/action. Visibility and path consumption matter.",
      "Application authorization": "Resource/business permission. A clean WAF result does not establish it."
    },
    "sources": [
      {
        "title": "Cloudflare WAF documentation",
        "url": "https://developers.cloudflare.com/waf/get-started/",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 8446 TLS 1.3",
        "url": "https://www.rfc-editor.org/rfc/rfc8446.html",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g5-t5-QC2",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Where must HTTP content be visible?",
        "answer": "At the control inspecting the request under the chosen TLS design.",
        "explanation": "Encrypted bytes alone may not expose relevant request semantics.",
        "testedConcept": "Where must HTTP content be visible?"
      },
      {
        "questionId": "s5-g5-t5-QC4",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a TCP port-443 permit parse HTTP attacks?",
        "answer": "No.",
        "explanation": "Transport filtering differs from HTTP-aware policy.",
        "testedConcept": "Does a TCP port-443 permit parse HTTP attacks?"
      },
      {
        "questionId": "s5-g5-t5-QC8",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a WAF replace parameterized database access?",
        "answer": "No.",
        "explanation": "Application construction and validation need independent protection.",
        "testedConcept": "Does a WAF replace parameterized database access?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g5-t5-Q01",
        "topicId": "s5-g5-t5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "WAF permits a request; is application authorization proven?",
        "answer": "No.",
        "explanation": "Business/resource permission belongs to the application.",
        "testedConcept": "WAF permits a request; is application authorization proven?",
        "options": [
          "No.",
          "Yes; clean web traffic is authorized automatically.",
          "Yes; no alert means every business operation is safe.",
          "Only if HTTPS is enabled."
        ]
      },
      {
        "questionId": "s5-g5-t5-Q02",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Where must HTTP content be visible?",
        "answer": "At the control inspecting the request under the chosen TLS design.",
        "explanation": "Encrypted bytes alone may not expose relevant request semantics.",
        "testedConcept": "Where must HTTP content be visible?"
      },
      {
        "questionId": "s5-g5-t5-Q03",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A client bypasses the WAF to the origin; is its rule consumed?",
        "answer": "No.",
        "explanation": "The intended proxy boundary is bypassed.",
        "testedConcept": "A client bypasses the WAF to the origin; is its rule consumed?"
      },
      {
        "questionId": "s5-g5-t5-Q04",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a TCP port-443 permit parse HTTP attacks?",
        "answer": "No.",
        "explanation": "Transport filtering differs from HTTP-aware policy.",
        "testedConcept": "Does a TCP port-443 permit parse HTTP attacks?"
      },
      {
        "questionId": "s5-g5-t5-Q05",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does this worksheet scan malicious payloads?",
        "answer": "No.",
        "explanation": "It consumes supplied match and visibility flags.",
        "testedConcept": "Does this worksheet scan malicious payloads?"
      },
      {
        "questionId": "s5-g5-t5-Q06",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why test normal users after tuning a rule?",
        "answer": "A false positive can disrupt intended service.",
        "explanation": "A marker block alone misses operational acceptance.",
        "testedConcept": "Why test normal users after tuning a rule?"
      },
      {
        "questionId": "s5-g5-t5-Q07",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Should a broad disable-all exception repair one false positive?",
        "answer": "No.",
        "explanation": "Scope the exception to the justified endpoint/rule and retest.",
        "testedConcept": "Should a broad disable-all exception repair one false positive?"
      },
      {
        "questionId": "s5-g5-t5-Q08",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a WAF replace parameterized database access?",
        "answer": "No.",
        "explanation": "Application construction and validation need independent protection.",
        "testedConcept": "Does a WAF replace parameterized database access?"
      },
      {
        "questionId": "s5-g5-t5-Q09",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What resource cost depends on body inspection?",
        "answer": "Parsing/rule processing and retained content/log volume.",
        "explanation": "The worksheet supplies no vendor latency estimate.",
        "testedConcept": "What resource cost depends on body inspection?"
      },
      {
        "questionId": "s5-g5-t5-Q10",
        "topicId": "s5-g5-t5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept restored WAF enforcement?",
        "answer": "Harmless marker action, original normal application use and protected-origin path agree.",
        "explanation": "One alert label is not enforcement proof.",
        "testedConcept": "How do you accept restored WAF enforcement?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g6-t0",
    "batch": "14",
    "title": "Zero Trust overview",
    "subtitle": "Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-zero-trust",
    "definition": "Zero trust organizes resource access around explicit identity, device, context and policy decisions rather than inherent trust in network location. The policy engine decides access, the policy administrator establishes/terminates the communication path and the policy enforcement point consumes the decision. Segmentation and protected transport can support this design, but neither a product name nor an internal source address implements the complete architecture.",
    "purpose": "Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal.",
    "mental": "Identify the requested resource and operation, subject identity, device signals and policy freshness. A successful earlier login is not a permanent authorization for every future resource. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Policy engine: Makes the resource access decision. Inputs require trustworthy provenance and freshness.",
      "Policy administrator: Establishes/terminates the policy path. Decision delivery and lifecycle are separate.",
      "Enforcement point: Consumes access policy on the resource path. A bypass invalidates the boundary.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify the requested resource and operation, subject identity, device signals and policy freshness. A successful earlier login is not a permanent authorization for every future resource.",
      "Evaluate the applicable policy and ensure its result reaches the enforcement point. A valid decision in an isolated server log can be unused if the resource path bypasses or never consumes it.",
      "Reassess under the chosen session/lifecycle policy and verify permitted and denied operations at the resource. Continuous evaluation is an architectural objective whose cadence/mechanism must be specified; this worksheet does not monitor real devices or revoke sessions."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Zero trust organizes resource access around explicit identity, device, context and policy decisions rather than inherent trust in network location. The policy engine decides access, the policy administrator establishes/terminates the communication path and the policy enforcement point consumes the decision. Segmentation and protected transport can support this design, but neither a product name nor an internal source address implements the complete architecture."
      ],
      [
        "Identify the consuming boundary",
        "Identify the requested resource and operation, subject identity, device signals and policy freshness. A successful earlier login is not a permanent authorization for every future resource."
      ],
      [
        "Follow the actual decision",
        "Evaluate the applicable policy and ensure its result reaches the enforcement point. A valid decision in an isolated server log can be unused if the resource path bypasses or never consumes it."
      ],
      [
        "Verify limits and recovery",
        "Reassess under the chosen session/lifecycle policy and verify permitted and denied operations at the resource. Continuous evaluation is an architectural objective whose cadence/mechanism must be specified; this worksheet does not monitor real devices or revoke sessions."
      ]
    ],
    "comparison": [
      [
        "Policy engine",
        "Makes the resource access decision",
        "Inputs require trustworthy provenance and freshness."
      ],
      [
        "Policy administrator",
        "Establishes/terminates the policy path",
        "Decision delivery and lifecycle are separate."
      ],
      [
        "Enforcement point",
        "Consumes access policy on the resource path",
        "A bypass invalidates the boundary."
      ]
    ],
    "example": "A user is on the internal LAN; is access inherently trusted? No. Location does not establish resource-specific identity/context permission. Compare this with a different operational question: Which component consumes policy on the traffic/resource path? The policy enforcement point. A decision that is not consumed does not enforce access. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Access policy has no intrinsic application port. Network access commonly uses EAPOL and RADIUS; requested resources retain their own actual service tuple.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show authentication sessions",
        "explanation": "Observe the installed context for Zero Trust overview. Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Original allowed/denied operations and fresh consumed decision evidence agree. Network location or a server Accept is incomplete proof. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Which component consumes policy on the traffic/resource path?",
        "The policy enforcement point. A decision that is not consumed does not enforce access."
      ],
      [
        "Why record policy freshness?",
        "A stale decision may not reflect current eligibility. Session validity and reassessment rules must be explicit."
      ],
      [
        "What makes a permitted-operation test insufficient alone?",
        "It does not verify denial or revocation boundaries. Least privilege needs positive and negative observations."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Network location and device profiling are signals, not blanket trust. Protect decision/enforcement administration and avoid turning availability exceptions into silent unrestricted access.",
    "performance": "Identity evaluation, policy calls and enforcement updates introduce latency and availability dependencies. Measure actual resource access and renewal/revocation behavior instead of claiming continuous verification from one checkbox.",
    "mistakes": [
      "Location does not establish resource-specific identity/context permission.",
      "Identity success does not override other required policy.",
      "Architecture includes resources, inputs, policy, enforcement and lifecycle.",
      "A classification signal can be wrong or spoofed."
    ],
    "prerequisites": [
      "s5-g2-t4",
      "s5-g2-t5"
    ],
    "related": [
      "s5-g6-t1"
    ],
    "lab": {
      "objective": "Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Zero Trust overview boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record identity, device eligibility, resource permission, fresh policy and consumed enforcement for one requested operation.",
        "Fault: leave identity valid but mark device/context policy unacceptable.",
        "Restore the intended policy and specify original-resource and revocation evidence separately from a decision-server log.",
        "Predict the baseline Zero Trust overview result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Define one resource-specific permitted operation, a prohibited management operation and the evidence needed for identity/device/context. Preserve independent recovery and explicit exceptions before a policy rehearsal. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Original allowed/denied operations and fresh consumed decision evidence agree. Network location or a server Accept is incomplete proof. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Policy engine → Policy administrator → Enforcement point. A decision that is not consumed does not enforce access. Session validity and reassessment rules must be explicit.",
      "challenge": "What makes a permitted-operation test insufficient alone? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Policy engine": "Makes the resource access decision. Inputs require trustworthy provenance and freshness.",
      "Policy administrator": "Establishes/terminates the policy path. Decision delivery and lifecycle are separate.",
      "Enforcement point": "Consumes access policy on the resource path. A bypass invalidates the boundary."
    },
    "sources": [
      {
        "title": "NIST SP 800-207 zero trust",
        "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g6-t0-QC2",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which component makes the access decision?",
        "answer": "The policy engine.",
        "explanation": "Policy administration and enforcement have separate roles.",
        "testedConcept": "Which component makes the access decision?"
      },
      {
        "questionId": "s5-g6-t0-QC4",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which component consumes policy on the traffic/resource path?",
        "answer": "The policy enforcement point.",
        "explanation": "A decision that is not consumed does not enforce access.",
        "testedConcept": "Which component consumes policy on the traffic/resource path?"
      },
      {
        "questionId": "s5-g6-t0-QC8",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What makes a permitted-operation test insufficient alone?",
        "answer": "It does not verify denial or revocation boundaries.",
        "explanation": "Least privilege needs positive and negative observations.",
        "testedConcept": "What makes a permitted-operation test insufficient alone?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g6-t0-Q01",
        "topicId": "s5-g6-t0",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "A user is on the internal LAN; is access inherently trusted?",
        "answer": "No.",
        "explanation": "Location does not establish resource-specific identity/context permission.",
        "testedConcept": "A user is on the internal LAN; is access inherently trusted?",
        "options": [
          "Yes; internal location is permanent trust.",
          "Yes; a subnet label grants every resource.",
          "Only if the host uses a private address.",
          "No."
        ]
      },
      {
        "questionId": "s5-g6-t0-Q02",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which component makes the access decision?",
        "answer": "The policy engine.",
        "explanation": "Policy administration and enforcement have separate roles.",
        "testedConcept": "Which component makes the access decision?"
      },
      {
        "questionId": "s5-g6-t0-Q03",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Valid identity but device policy fails; result here?",
        "answer": "Deny the declared operation.",
        "explanation": "Identity success does not override other required policy.",
        "testedConcept": "Valid identity but device policy fails; result here?"
      },
      {
        "questionId": "s5-g6-t0-Q04",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Which component consumes policy on the traffic/resource path?",
        "answer": "The policy enforcement point.",
        "explanation": "A decision that is not consumed does not enforce access.",
        "testedConcept": "Which component consumes policy on the traffic/resource path?"
      },
      {
        "questionId": "s5-g6-t0-Q05",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does buying one product implement all zero trust?",
        "answer": "No.",
        "explanation": "Architecture includes resources, inputs, policy, enforcement and lifecycle.",
        "testedConcept": "Does buying one product implement all zero trust?"
      },
      {
        "questionId": "s5-g6-t0-Q06",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record policy freshness?",
        "answer": "A stale decision may not reflect current eligibility.",
        "explanation": "Session validity and reassessment rules must be explicit.",
        "testedConcept": "Why record policy freshness?"
      },
      {
        "questionId": "s5-g6-t0-Q07",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does endpoint profiling prove protected identity?",
        "answer": "No.",
        "explanation": "A classification signal can be wrong or spoofed.",
        "testedConcept": "Does endpoint profiling prove protected identity?"
      },
      {
        "questionId": "s5-g6-t0-Q08",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What makes a permitted-operation test insufficient alone?",
        "answer": "It does not verify denial or revocation boundaries.",
        "explanation": "Least privilege needs positive and negative observations.",
        "testedConcept": "What makes a permitted-operation test insufficient alone?"
      },
      {
        "questionId": "s5-g6-t0-Q09",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What availability dependency can policy add?",
        "answer": "Identity/decision/enforcement communication and update paths.",
        "explanation": "Measure the actual transaction under the chosen failure policy.",
        "testedConcept": "What availability dependency can policy add?"
      },
      {
        "questionId": "s5-g6-t0-Q10",
        "topicId": "s5-g6-t0",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept restored resource policy?",
        "answer": "Original allowed/denied operations and fresh consumed decision evidence agree.",
        "explanation": "Network location or a server Accept is incomplete proof.",
        "testedConcept": "How do you accept restored resource policy?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g6-t1",
    "batch": "14",
    "title": "Network Access Control",
    "subtitle": "Use a disposable endpoint and restricted role.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-nac",
    "definition": "Network Access Control joins attachment policy, identity/device signals and enforcement to decide an endpoint access role. Authentication, profiling, posture assessment and remediation are different functions. A device classified as a printer is not thereby authenticated as an approved printer. Returned VLAN/ACL/role intent must be consumed by a supported network attachment, and application authorization remains outside the attachment decision.",
    "purpose": "Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement.",
    "mental": "Identify endpoint/session and the signal provenance: protected authentication, observed classification or posture evidence. State which are required for this role and which are exceptions. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Authentication: Protected identity result. Distinct from a profile label.",
      "Posture/profile: Eligibility and classification signals. Review freshness and spoofing limits.",
      "Role consumption: Enforced attachment policy. Returned attributes alone do not establish it.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Identify endpoint/session and the signal provenance: protected authentication, observed classification or posture evidence. State which are required for this role and which are exceptions.",
      "Evaluate the requested access or remediation policy and return supported authorization to the attachment. Validate the actual role/ACL/VLAN consumed, including host mode and feature support.",
      "Retest original permitted and prohibited resource operations and the designed posture-change/reassessment path. A successful remediation redirect is a different objective from full production-resource access."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Network Access Control joins attachment policy, identity/device signals and enforcement to decide an endpoint access role. Authentication, profiling, posture assessment and remediation are different functions. A device classified as a printer is not thereby authenticated as an approved printer. Returned VLAN/ACL/role intent must be consumed by a supported network attachment, and application authorization remains outside the attachment decision."
      ],
      [
        "Identify the consuming boundary",
        "Identify endpoint/session and the signal provenance: protected authentication, observed classification or posture evidence. State which are required for this role and which are exceptions."
      ],
      [
        "Follow the actual decision",
        "Evaluate the requested access or remediation policy and return supported authorization to the attachment. Validate the actual role/ACL/VLAN consumed, including host mode and feature support."
      ],
      [
        "Verify limits and recovery",
        "Retest original permitted and prohibited resource operations and the designed posture-change/reassessment path. A successful remediation redirect is a different objective from full production-resource access."
      ]
    ],
    "comparison": [
      [
        "Authentication",
        "Protected identity result",
        "Distinct from a profile label."
      ],
      [
        "Posture/profile",
        "Eligibility and classification signals",
        "Review freshness and spoofing limits."
      ],
      [
        "Role consumption",
        "Enforced attachment policy",
        "Returned attributes alone do not establish it."
      ]
    ],
    "example": "Endpoint is profiled as a printer; is protected identity proven? No. Classification differs from authenticated identity. Compare this with a different operational question: Why record the host/session scope? One endpoint result must not silently authorize unrelated hosts. Attachment and host mode determine consumption. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Access policy has no intrinsic application port. Network access commonly uses EAPOL and RADIUS; requested resources retain their own actual service tuple.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show authentication sessions",
        "explanation": "Observe the installed context for Network Access Control. Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Consumed restricted role, allowed/denied operations and remediation/reassessment behavior agree. A server-side success message alone is incomplete. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why record the host/session scope?",
        "One endpoint result must not silently authorize unrelated hosts. Attachment and host mode determine consumption."
      ],
      [
        "Should MAB be treated as equivalent to certificate-backed EAP?",
        "No. Its identification and spoofing boundaries differ."
      ],
      [
        "Does this worksheet assess a real endpoint agent?",
        "No. It consumes supplied eligibility and policy states."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Treat MAB/profiling and outage access as explicit bounded exceptions. Do not grant management privileges solely from a reported OS or vendor identifier.",
    "performance": "Authentication/posture bursts and reauthorization can affect client continuity. The worksheet consumes eligibility declarations, not agent health checks or live enforcement updates.",
    "mistakes": [
      "Classification differs from authenticated identity.",
      "The intended attachment must consume supported authorization.",
      "It is not unrestricted production permission.",
      "Availability handling must not become universal authorization."
    ],
    "prerequisites": [
      "s5-g2-t4",
      "s5-g2-t5"
    ],
    "related": [
      "s5-g6-t2"
    ],
    "lab": {
      "objective": "Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Network Access Control boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the approved identity, posture objective and intended restricted role for one endpoint.",
        "Fault: keep identity accepted but clear policy consumption in the worksheet.",
        "Restore consumed role and require original allowed/denied service plus the explicit remediation objective on a target.",
        "Predict the baseline Network Access Control result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use a disposable endpoint and restricted role. Plan an unacceptable posture declaration and a controlled remediation/recovery path; keep an independent administration session before enforcement. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Consumed restricted role, allowed/denied operations and remediation/reassessment behavior agree. A server-side success message alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Authentication → Posture/profile → Role consumption. Attachment and host mode determine consumption. Its identification and spoofing boundaries differ.",
      "challenge": "Does this worksheet assess a real endpoint agent? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Authentication": "Protected identity result. Distinct from a profile label.",
      "Posture/profile": "Eligibility and classification signals. Review freshness and spoofing limits.",
      "Role consumption": "Enforced attachment policy. Returned attributes alone do not establish it."
    },
    "sources": [
      {
        "title": "Cisco ISE 3.4 policy sets and segmentation",
        "url": "https://www.cisco.com/c/en/us/td/docs/security/ise/3-4/admin_guide/b_ise_admin_3_4/b_ISE_admin_segmentation.html",
        "checked": "2026-10-09"
      },
      {
        "title": "RFC 3748 EAP",
        "url": "https://www.rfc-editor.org/rfc/rfc3748.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g6-t1-QC2",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Valid credentials but posture fails; must full access be granted?",
        "answer": "No.",
        "explanation": "The chosen role policy can require independent eligibility.",
        "testedConcept": "Valid credentials but posture fails; must full access be granted?"
      },
      {
        "questionId": "s5-g6-t1-QC4",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the host/session scope?",
        "answer": "One endpoint result must not silently authorize unrelated hosts.",
        "explanation": "Attachment and host mode determine consumption.",
        "testedConcept": "Why record the host/session scope?"
      },
      {
        "questionId": "s5-g6-t1-QC8",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this worksheet assess a real endpoint agent?",
        "answer": "No.",
        "explanation": "It consumes supplied eligibility and policy states.",
        "testedConcept": "Does this worksheet assess a real endpoint agent?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g6-t1-Q01",
        "topicId": "s5-g6-t1",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Endpoint is profiled as a printer; is protected identity proven?",
        "answer": "No.",
        "explanation": "Classification differs from authenticated identity.",
        "testedConcept": "Endpoint is profiled as a printer; is protected identity proven?",
        "options": [
          "Yes; a printer label authorizes all traffic.",
          "Only if the profile was returned by RADIUS.",
          "No.",
          "Yes; profiling is cryptographic authentication."
        ]
      },
      {
        "questionId": "s5-g6-t1-Q02",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Valid credentials but posture fails; must full access be granted?",
        "answer": "No.",
        "explanation": "The chosen role policy can require independent eligibility.",
        "testedConcept": "Valid credentials but posture fails; must full access be granted?"
      },
      {
        "questionId": "s5-g6-t1-Q03",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "A VLAN attribute is returned; is switch enforcement established?",
        "answer": "No.",
        "explanation": "The intended attachment must consume supported authorization.",
        "testedConcept": "A VLAN attribute is returned; is switch enforcement established?"
      },
      {
        "questionId": "s5-g6-t1-Q04",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the host/session scope?",
        "answer": "One endpoint result must not silently authorize unrelated hosts.",
        "explanation": "Attachment and host mode determine consumption.",
        "testedConcept": "Why record the host/session scope?"
      },
      {
        "questionId": "s5-g6-t1-Q05",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What is remediation access?",
        "answer": "A restricted path intended to correct eligibility problems.",
        "explanation": "It is not unrestricted production permission.",
        "testedConcept": "What is remediation access?"
      },
      {
        "questionId": "s5-g6-t1-Q06",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Should MAB be treated as equivalent to certificate-backed EAP?",
        "answer": "No.",
        "explanation": "Its identification and spoofing boundaries differ.",
        "testedConcept": "Should MAB be treated as equivalent to certificate-backed EAP?"
      },
      {
        "questionId": "s5-g6-t1-Q07",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How should an outage exception be managed?",
        "answer": "Explicit scope, owner and recovery/expiry rules.",
        "explanation": "Availability handling must not become universal authorization.",
        "testedConcept": "How should an outage exception be managed?"
      },
      {
        "questionId": "s5-g6-t1-Q08",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does this worksheet assess a real endpoint agent?",
        "answer": "No.",
        "explanation": "It consumes supplied eligibility and policy states.",
        "testedConcept": "Does this worksheet assess a real endpoint agent?"
      },
      {
        "questionId": "s5-g6-t1-Q09",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Which load event needs separate testing?",
        "answer": "Authentication/posture and reauthorization bursts.",
        "explanation": "One accepted endpoint does not establish capacity.",
        "testedConcept": "Which load event needs separate testing?"
      },
      {
        "questionId": "s5-g6-t1-Q10",
        "topicId": "s5-g6-t1",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How is repaired NAC accepted?",
        "answer": "Consumed restricted role, allowed/denied operations and remediation/reassessment behavior agree.",
        "explanation": "A server-side success message alone is incomplete.",
        "testedConcept": "How is repaired NAC accepted?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "s5-g6-t2",
    "batch": "14",
    "title": "Cisco ISE concepts",
    "subtitle": "Use one disposable identity and a narrow test policy set.",
    "level": "Intermediate → Advanced",
    "minutes": 60,
    "interactive": "nsec-ise",
    "definition": "Cisco Identity Services Engine centralizes supported network-access and device-administration policy. Policy sets select context, authentication rules choose methods/identity sources and authorization rules return permission profiles. This lesson uses ISE 3.4 policy documentation; it does not imply every network device consumes every returned feature. Device administration TACACS+ and network-access RADIUS have distinct work centers and session objectives.",
    "purpose": "Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault.",
    "mental": "Select the applicable policy set from the request context in documented order. A rule in another set cannot repair a request that never selects that set; distinguish enabled, disabled and monitor behavior. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Declared protected identity/device/resource/freshness/enforcement policy conditions; no live posture, identity, policy-server or session queries. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Policy set: Selects request context. Order and status affect which rules are used.",
      "Authorization profile: Returned permission intent. NAD support/consumption is separate.",
      "Correlated evidence: Server request plus NAD and resource. An Accept alone is incomplete.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Select the applicable policy set from the request context in documented order. A rule in another set cannot repair a request that never selects that set; distinguish enabled, disabled and monitor behavior.",
      "Evaluate authentication and the authorization profile, preserving identity/source, conditions and result. Review exceptions and their scope before assuming an authenticated subject receives the intended restricted role.",
      "Correlate the request/session in Live Logs with consumed authorization on the NAD and the original resource operation. Logging acceptance does not prove the downloadable ACL/VLAN/role was supported, installed or effective."
    ],
    "flow": [
      [
        "Define the protected operation",
        "Cisco Identity Services Engine centralizes supported network-access and device-administration policy. Policy sets select context, authentication rules choose methods/identity sources and authorization rules return permission profiles. This lesson uses ISE 3.4 policy documentation; it does not imply every network device consumes every returned feature. Device administration TACACS+ and network-access RADIUS have distinct work centers and session objectives."
      ],
      [
        "Identify the consuming boundary",
        "Select the applicable policy set from the request context in documented order. A rule in another set cannot repair a request that never selects that set; distinguish enabled, disabled and monitor behavior."
      ],
      [
        "Follow the actual decision",
        "Evaluate authentication and the authorization profile, preserving identity/source, conditions and result. Review exceptions and their scope before assuming an authenticated subject receives the intended restricted role."
      ],
      [
        "Verify limits and recovery",
        "Correlate the request/session in Live Logs with consumed authorization on the NAD and the original resource operation. Logging acceptance does not prove the downloadable ACL/VLAN/role was supported, installed or effective."
      ]
    ],
    "comparison": [
      [
        "Policy set",
        "Selects request context",
        "Order and status affect which rules are used."
      ],
      [
        "Authorization profile",
        "Returned permission intent",
        "NAD support/consumption is separate."
      ],
      [
        "Correlated evidence",
        "Server request plus NAD and resource",
        "An Accept alone is incomplete."
      ]
    ],
    "example": "ISE returns an Accept; is requested resource access proven? No. NAD consumption and the original operation remain separate. Compare this with a different operational question: Why record the exact authorization profile? It identifies the returned permission intent. A generic success message omits resource scope. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "Access policy has no intrinsic application port. Network access commonly uses EAPOL and RADIUS; requested resources retain their own actual service tuple.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Cisco IOS XE 17 supported lab feature · GUIDED NOT EXECUTED",
        "code": "show authentication sessions",
        "explanation": "Observe the installed context for Cisco ISE concepts. Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Correlated selected set/rule/profile, NAD enforcement and original allowed/denied operations. Server-side acceptance alone is incomplete. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Why record the exact authorization profile?",
        "It identifies the returned permission intent. A generic success message omits resource scope."
      ],
      [
        "Are TACACS+ administration and RADIUS access the same objective?",
        "No. They use distinct policy/session scopes."
      ],
      [
        "Does a Live Log record prove a downloaded ACL was installed?",
        "No. Observe the consuming attachment independently."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Protect identity sources, management permissions and retained logs. Device profiling and exception policies require bounded ownership rather than blanket trust.",
    "performance": "Policy ordering, identity-source queries and enforcement updates affect latency. The worksheet evaluates declarations and does not install ISE, contact a directory or benchmark authentication rate.",
    "mistakes": [
      "NAD consumption and the original operation remain separate.",
      "Authorization determines the resulting operation/role permission.",
      "Support and installed enforcement must be verified for the target.",
      "Bound scope, owner and review/expiry are required."
    ],
    "prerequisites": [
      "s5-g2-t4",
      "s5-g2-t5"
    ],
    "related": [
      "lab-5"
    ],
    "lab": {
      "objective": "Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Owned client / identity → declared source attachment",
        "Cisco ISE concepts boundary → application / management objective",
        "Separate recovery console → scoped baseline / fault / restore record"
      ],
      "steps": [
        "Record the selected ISE policy set, identity source, authorization profile and NAD attachment in separate evidence rows.",
        "Fault: keep the returned role correct but clear the NAD-consumption declaration.",
        "Restore consumption and require correlated server session, installed restriction and original allowed/denied operations.",
        "Predict the baseline Cisco ISE concepts result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use one disposable identity and a narrow test policy set. Record selected set/rule/profile and NAD support; keep local-console recovery before one owned authorization/profile-consumption fault. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline."
      ],
      "verification": "Correlated selected set/rule/profile, NAD enforcement and original allowed/denied operations. Server-side acceptance alone is incomplete. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Policy set → Authorization profile → Correlated evidence. A generic success message omits resource scope. They use distinct policy/session scopes.",
      "challenge": "Does a Live Log record prove a downloaded ACL was installed? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Policy set": "Selects request context. Order and status affect which rules are used.",
      "Authorization profile": "Returned permission intent. NAD support/consumption is separate.",
      "Correlated evidence": "Server request plus NAD and resource. An Accept alone is incomplete."
    },
    "sources": [
      {
        "title": "Cisco ISE 3.4 policy sets and segmentation",
        "url": "https://www.cisco.com/c/en/us/td/docs/security/ise/3-4/admin_guide/b_ise_admin_3_4/b_ISE_admin_segmentation.html",
        "checked": "2026-10-09"
      },
      {
        "title": "Catalyst 9300 IOS XE 17.13 security configuration guide",
        "url": "https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-13/configuration_guide/sec/b_1713_sec_9300_cg.pdf",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "s5-g6-t2-QC2",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What chooses the request rule context?",
        "answer": "The selected policy set.",
        "explanation": "Rules inside an unrelated set do not apply to this request.",
        "testedConcept": "What chooses the request rule context?"
      },
      {
        "questionId": "s5-g6-t2-QC4",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the exact authorization profile?",
        "answer": "It identifies the returned permission intent.",
        "explanation": "A generic success message omits resource scope.",
        "testedConcept": "Why record the exact authorization profile?"
      },
      {
        "questionId": "s5-g6-t2-QC8",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a Live Log record prove a downloaded ACL was installed?",
        "answer": "No.",
        "explanation": "Observe the consuming attachment independently.",
        "testedConcept": "Does a Live Log record prove a downloaded ACL was installed?"
      }
    ],
    "exams": [
      {
        "questionId": "s5-g6-t2-Q01",
        "topicId": "s5-g6-t2",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "ISE returns an Accept; is requested resource access proven?",
        "answer": "No.",
        "explanation": "NAD consumption and the original operation remain separate.",
        "testedConcept": "ISE returns an Accept; is requested resource access proven?",
        "options": [
          "Only when the profile is named.",
          "No.",
          "Yes; Accept proves every NAD installed policy.",
          "Yes; a server log verifies the application."
        ]
      },
      {
        "questionId": "s5-g6-t2-Q02",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What chooses the request rule context?",
        "answer": "The selected policy set.",
        "explanation": "Rules inside an unrelated set do not apply to this request.",
        "testedConcept": "What chooses the request rule context?"
      },
      {
        "questionId": "s5-g6-t2-Q03",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "What do authentication rules determine?",
        "answer": "The supported identity method/source path.",
        "explanation": "Authorization determines the resulting operation/role permission.",
        "testedConcept": "What do authentication rules determine?"
      },
      {
        "questionId": "s5-g6-t2-Q04",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why record the exact authorization profile?",
        "answer": "It identifies the returned permission intent.",
        "explanation": "A generic success message omits resource scope.",
        "testedConcept": "Why record the exact authorization profile?"
      },
      {
        "questionId": "s5-g6-t2-Q05",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Can every NAD consume every profile feature?",
        "answer": "No.",
        "explanation": "Support and installed enforcement must be verified for the target.",
        "testedConcept": "Can every NAD consume every profile feature?"
      },
      {
        "questionId": "s5-g6-t2-Q06",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Are TACACS+ administration and RADIUS access the same objective?",
        "answer": "No.",
        "explanation": "They use distinct policy/session scopes.",
        "testedConcept": "Are TACACS+ administration and RADIUS access the same objective?"
      },
      {
        "questionId": "s5-g6-t2-Q07",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What risk accompanies a broad exception?",
        "answer": "It can bypass the intended restricted role.",
        "explanation": "Bound scope, owner and review/expiry are required.",
        "testedConcept": "What risk accompanies a broad exception?"
      },
      {
        "questionId": "s5-g6-t2-Q08",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Does a Live Log record prove a downloaded ACL was installed?",
        "answer": "No.",
        "explanation": "Observe the consuming attachment independently.",
        "testedConcept": "Does a Live Log record prove a downloaded ACL was installed?"
      },
      {
        "questionId": "s5-g6-t2-Q09",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What affects authentication latency?",
        "answer": "Policy/identity-source processing and request/enforcement load.",
        "explanation": "The worksheet does not benchmark ISE or a directory.",
        "testedConcept": "What affects authentication latency?"
      },
      {
        "questionId": "s5-g6-t2-Q10",
        "topicId": "s5-g6-t2",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you verify a repaired ISE access policy?",
        "answer": "Correlated selected set/rule/profile, NAD enforcement and original allowed/denied operations.",
        "explanation": "Server-side acceptance alone is incomplete.",
        "testedConcept": "How do you verify a repaired ISE access policy?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      }
    ]
  },
  {
    "id": "lab-5",
    "batch": "14",
    "title": "Network Security Lab",
    "subtitle": "Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery.",
    "level": "Intermediate → Advanced",
    "minutes": 120,
    "interactive": "nsec-security-lab",
    "definition": "The integrated Network Security Lab preserves the original Internet, DMZ, Users, Servers, Management, Guest and Backup zones. It starts from an explicit default-deny initiation matrix and permits only documented service paths. Browser rules are a classroom policy model, not a deployed firewall. The optional actual loopback fixture demonstrates an owned application access boundary, denial, fault, restore and cleanup; it does not create these network zones.",
    "purpose": "Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production.",
    "mental": "Assign resources and administrators to the seven zones and write required directional services. The supplied rules permit Internet-to-DMZ HTTPS, Users-to-Servers HTTPS, DMZ-to-Servers API TCP 8443, Management-to-DMZ/Users/Servers/Backup SSH, Guest-to-Internet HTTPS and Servers-to-Backup HTTPS. All other new initiation is denied in the classroom matrix. Treat the evidence as three layers: configured intent, consumed decision and observed original operation. Explicit seven-zone classroom service matrix and declared matching response state; no routing, DNS/time dependencies, identity checks or deployed firewall. A model result is a conditional conclusion from entered inputs; it is not a live device observation. Preserve the observer and policy scope when explaining a result, and state which evidence would be needed on a real target.",
    "components": [
      "Initiation matrix: Explicit directional service rules. Unlisted new flows are denied.",
      "Response relation: Reverse of an allowed forward flow plus declared state. New reverse initiation remains separate.",
      "Recovery notebook: Baseline, one owned fault and exact restore. Keep application fixture evidence separate from network policy.",
      "Observer and attachment: record the exact ingress, egress, session or role where the policy is consumed.",
      "Evidence record: baseline inputs → one owned fault → restored settings → original allowed and prohibited operations."
    ],
    "mechanism": [
      "Assign resources and administrators to the seven zones and write required directional services. The supplied rules permit Internet-to-DMZ HTTPS, Users-to-Servers HTTPS, DMZ-to-Servers API TCP 8443, Management-to-DMZ/Users/Servers/Backup SSH, Guest-to-Internet HTTPS and Servers-to-Backup HTTPS. All other new initiation is denied in the classroom matrix.",
      "Evaluate the chosen source/destination/protocol/service tuple against the explicit ordered rules and default deny. A declared valid response state can admit only the matching reverse of an allowed forward rule; it must not admit a new prohibited initiation. DNS/time/logging dependencies are deliberately not granted by this small matrix and must be designed explicitly on a target.",
      "Collect allowed and denied operations, independent identity/resource permission and recovery evidence. Remove only the owned Users-to-Servers permit for the fault, restore its exact entry and repeat the original permitted HTTPS and prohibited management access. The loopback application fixture supplies a separate actual request-level evidence record."
    ],
    "flow": [
      [
        "Define the protected operation",
        "The integrated Network Security Lab preserves the original Internet, DMZ, Users, Servers, Management, Guest and Backup zones. It starts from an explicit default-deny initiation matrix and permits only documented service paths. Browser rules are a classroom policy model, not a deployed firewall. The optional actual loopback fixture demonstrates an owned application access boundary, denial, fault, restore and cleanup; it does not create these network zones."
      ],
      [
        "Identify the consuming boundary",
        "Assign resources and administrators to the seven zones and write required directional services. The supplied rules permit Internet-to-DMZ HTTPS, Users-to-Servers HTTPS, DMZ-to-Servers API TCP 8443, Management-to-DMZ/Users/Servers/Backup SSH, Guest-to-Internet HTTPS and Servers-to-Backup HTTPS. All other new initiation is denied in the classroom matrix."
      ],
      [
        "Follow the actual decision",
        "Evaluate the chosen source/destination/protocol/service tuple against the explicit ordered rules and default deny. A declared valid response state can admit only the matching reverse of an allowed forward rule; it must not admit a new prohibited initiation. DNS/time/logging dependencies are deliberately not granted by this small matrix and must be designed explicitly on a target."
      ],
      [
        "Verify limits and recovery",
        "Collect allowed and denied operations, independent identity/resource permission and recovery evidence. Remove only the owned Users-to-Servers permit for the fault, restore its exact entry and repeat the original permitted HTTPS and prohibited management access. The loopback application fixture supplies a separate actual request-level evidence record."
      ]
    ],
    "comparison": [
      [
        "Initiation matrix",
        "Explicit directional service rules",
        "Unlisted new flows are denied."
      ],
      [
        "Response relation",
        "Reverse of an allowed forward flow plus declared state",
        "New reverse initiation remains separate."
      ],
      [
        "Recovery notebook",
        "Baseline, one owned fault and exact restore",
        "Keep application fixture evidence separate from network policy."
      ]
    ],
    "example": "Guest initiates SSH to Management; expected matrix result? Deny. No supplied permit authorizes that source/destination/service. Compare this with a different operational question: Disable only the Users-to-Servers rule; expected same request? Deny by default. The fault removes one explicit permit without broadening another path. In both cases, identify the responsible boundary and the observation that would support the conclusion. The worksheet changes a declaration, not a target device or captured packet.",
    "ports": "The supplied matrix uses TCP 443 for HTTPS, TCP 8443 for the DMZ API and TCP 22 for management. Other dependencies are intentionally not granted; response service ports are observed on the source side.",
    "commands": [
      {
        "filename": "guided-observation.txt",
        "platform": "Ubuntu 24.04 read-only reference",
        "code": "sha256sum labs/network-security-workbook.md",
        "explanation": "Observe the installed context for Network Security Lab. Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production. Validate syntax in the exact platform/release documentation; these are observation references, not deployment configuration.",
        "expected": "Retain observer, selected policy/attachment and relevant output. Restore the exact permit and repeat original allowed/denied operations with separate identity and evidence scope. A broad permit-any would fail the original security objective. A listing establishes only the fields it actually shows; correlate the original transaction separately."
      }
    ],
    "configuration": "Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production. Before attaching a policy, record the original object, all consumers and recovery path. The optional target procedure requires a disposable supported device/VM, console access and a securely saved scoped baseline. Build and inspect the owned policy before attachment; do not rely on the name or presumed defaults. Make one change in the intended context, collect its negative observation, restore the exact previous entry/attachment/state and retest the original allowed operation and intended denial. Configuration and parser behavior remain guided/unexecuted; the browser cannot certify vendor syntax or platform support.",
    "production": "Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production. Assign a policy owner, change window and recovery objective. Review dependent routing, name resolution, time, identity, logging and service availability at the same observer. Preserve support/version context and explicit exception ownership; a documented exception should expire or be reviewed rather than silently widening access.",
    "troubleshooting": [
      [
        "Disable only the Users-to-Servers rule; expected same request?",
        "Deny by default. The fault removes one explicit permit without broadening another path."
      ],
      [
        "Why retain separate Management and Backup zones?",
        "They have different privileged-service and data-protection objectives. A common unrestricted users rule would erase those boundaries."
      ],
      [
        "What does the actual loopback fixture prove?",
        "Its owned HTTP application allow/deny, fault/restore and cleanup behavior. It does not deploy seven zones, IPsec or a vendor firewall."
      ],
      [
        "Worksheet and target differ",
        "Check the exact version, attachment, packet/session observation and excluded mechanisms before changing policy. A model expectation is a hypothesis for target testing, not a captured outcome."
      ]
    ],
    "security": "Keep Management distinct from Users/Guest and restrict Backup paths. A broadly allowed response flag must never become a universal reverse-initiation exception. Use only disposable identities and harmless content.",
    "performance": "Measure rules, sessions, inspection, logging and service recovery on the chosen target. Exhaustive classroom tuple checks verify this matrix only; no physical scale, throughput or vendor deployment is claimed.",
    "mistakes": [
      "No supplied permit authorizes that source/destination/service.",
      "Application authorization still needs independent evidence.",
      "It must match the reverse of an allowed forward rule.",
      "Design and test their scoped rules separately for an actual deployment."
    ],
    "prerequisites": [
      "s5-g1-t2",
      "s5-g5-t0",
      "s5-g6-t0"
    ],
    "related": [
      "s5-g0-t3",
      "s5-g1-t2",
      "s5-g6-t0"
    ],
    "lab": {
      "objective": "Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production.",
      "requirements": "Browser for the synthetic exercise. Optional target procedures require an isolated supported lab, independent console recovery and exclusively owned state. Device configuration, physical forwarding and vendor integrations remain guided/unexecuted.",
      "topologyKind": "shared",
      "topology": [
        "Internet → DMZ public HTTPS",
        "DMZ → Servers API",
        "Users → Servers application HTTPS",
        "Management → DMZ / Users / Servers / Backup SSH",
        "Guest → Internet HTTPS",
        "Servers → Backup HTTPS",
        "Separate console → fault / exact restore evidence"
      ],
      "steps": [
        "Draw all seven zones and copy the supplied permit matrix into the evidence notebook with source, destination, protocol, port and owner.",
        "Confirm Users → Servers TCP 443 is permitted, Guest → Management TCP 22 is denied and Internet → Backup TCP 443 is denied.",
        "Fault: disable only the Users-to-Servers permit; verify that same HTTPS initiation now denies while Guest-to-Management stays denied.",
        "Restore the exact permit; repeat both original observations and separately compare a valid declared response with new reverse initiation.",
        "Optionally run the owned loopback Python fixture and inspect its request statuses, expected content and cleanup report. Its HTTP application allowlist is separate evidence, not a network-zone firewall deployment.",
        "Predict the baseline Network Security Lab result before selecting it. Record each input, the output and the scope statement. Select the contrast case and explain which result differs and which evidence remains unknown.",
        "Change a custom input using the keyboard, then reset. An invalid value must remove the stale output. Step through the four mechanism stages and read the static sequence; motion is optional.",
        "For the optional target rehearsal, preserve the exact owned baseline and verify a local recovery session. Use the worksheet and downloadable workbook first; optional target work needs isolated supported gateways/hosts and console recovery. Define every required dependency explicitly before deployment rather than copying the classroom matrix into production. The displayed observation commands are guided references; target parser acceptance, configuration and packet behavior were not executed for this lesson.",
        "Collect baseline, one-fault and exact-restore observations from the same source and attachment. Keep explicit policy rejection distinct from timeout; a timeout can reflect routing, return path, listener, policy or application failure. Restore before trying another fault.",
        "Finish by verifying both the required operation and the prohibited operation. Retain redacted evidence and remove only owned test state after recovery; do not save an experimental configuration over a production baseline.",
        "Run python labs/network-security-loopback.py --run for the separately scoped actual application boundary. Read its final evidence summary; no vendor firewall, VPN, AAA service or seven-zone network is deployed."
      ],
      "verification": "Restore the exact permit and repeat original allowed/denied operations with separate identity and evidence scope. A broad permit-any would fail the original security objective. Keep model input/output separate from actual timestamps, counters, session results and client observations. A complete recovery record contains original positive and negative operations after exact restore.",
      "troubleshooting": "Initiation matrix → Response relation → Recovery notebook. The fault removes one explicit permit without broadening another path. A common unrestricted users rule would erase those boundaries.",
      "challenge": "What does the actual loopback fixture prove? Explain the missing observation and why a configured object alone is insufficient.",
      "cleanup": "Reset worksheet inputs. Restore the exact owned target configuration/attachment and any supported recovery state. Verify original allowed and prohibited operations before removing owned artifacts or closing the separately preserved recovery session. Retain redacted evidence; never disclose passwords, private keys or real user data."
    },
    "glossary": {
      "Initiation matrix": "Explicit directional service rules. Unlisted new flows are denied.",
      "Response relation": "Reverse of an allowed forward flow plus declared state. New reverse initiation remains separate.",
      "Recovery notebook": "Baseline, one owned fault and exact restore. Keep application fixture evidence separate from network policy."
    },
    "sources": [
      {
        "title": "Cisco IOS XE 17 IP access-list overview",
        "url": "https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-access-list-ov-0.html",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-41 Rev. 1 firewall policy",
        "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
        "checked": "2026-10-09"
      },
      {
        "title": "NIST SP 800-207 zero trust",
        "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
        "checked": "2026-10-09"
      }
    ],
    "quick": [
      {
        "questionId": "lab-5-QC2",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Internet initiates HTTPS to DMZ; expected result?",
        "answer": "Permit by the explicit public-service rule.",
        "explanation": "Other DMZ operations remain unlisted and denied.",
        "testedConcept": "Internet initiates HTTPS to DMZ; expected result?"
      },
      {
        "questionId": "lab-5-QC4",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Disable only the Users-to-Servers rule; expected same request?",
        "answer": "Deny by default.",
        "explanation": "The fault removes one explicit permit without broadening another path.",
        "testedConcept": "Disable only the Users-to-Servers rule; expected same request?"
      },
      {
        "questionId": "lab-5-QC8",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does the actual loopback fixture prove?",
        "answer": "Its owned HTTP application allow/deny, fault/restore and cleanup behavior.",
        "explanation": "It does not deploy seven zones, IPsec or a vendor firewall.",
        "testedConcept": "What does the actual loopback fixture prove?"
      }
    ],
    "exams": [
      {
        "questionId": "lab-5-Q01",
        "topicId": "lab-5",
        "type": "multiple-choice",
        "difficulty": "Intermediate",
        "question": "Guest initiates SSH to Management; expected matrix result?",
        "answer": "Deny.",
        "explanation": "No supplied permit authorizes that source/destination/service.",
        "testedConcept": "Guest initiates SSH to Management; expected matrix result?",
        "options": [
          "Deny.",
          "Permit because Guest is internal.",
          "Permit because SSH authenticates before policy.",
          "Permit if Management is a private subnet."
        ]
      },
      {
        "questionId": "lab-5-Q02",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Internet initiates HTTPS to DMZ; expected result?",
        "answer": "Permit by the explicit public-service rule.",
        "explanation": "Other DMZ operations remain unlisted and denied.",
        "testedConcept": "Internet initiates HTTPS to DMZ; expected result?"
      },
      {
        "questionId": "lab-5-Q03",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Users initiate HTTPS to Servers; expected baseline?",
        "answer": "Permit by the owned application rule.",
        "explanation": "Application authorization still needs independent evidence.",
        "testedConcept": "Users initiate HTTPS to Servers; expected baseline?"
      },
      {
        "questionId": "lab-5-Q04",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Disable only the Users-to-Servers rule; expected same request?",
        "answer": "Deny by default.",
        "explanation": "The fault removes one explicit permit without broadening another path.",
        "testedConcept": "Disable only the Users-to-Servers rule; expected same request?"
      },
      {
        "questionId": "lab-5-Q05",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Does a valid response flag admit every reverse tuple?",
        "answer": "No.",
        "explanation": "It must match the reverse of an allowed forward rule.",
        "testedConcept": "Does a valid response flag admit every reverse tuple?"
      },
      {
        "questionId": "lab-5-Q06",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Intermediate",
        "question": "Why retain separate Management and Backup zones?",
        "answer": "They have different privileged-service and data-protection objectives.",
        "explanation": "A common unrestricted users rule would erase those boundaries.",
        "testedConcept": "Why retain separate Management and Backup zones?"
      },
      {
        "questionId": "lab-5-Q07",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Are DNS and time dependencies implicitly allowed here?",
        "answer": "No.",
        "explanation": "Design and test their scoped rules separately for an actual deployment.",
        "testedConcept": "Are DNS and time dependencies implicitly allowed here?"
      },
      {
        "questionId": "lab-5-Q08",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "What does the actual loopback fixture prove?",
        "answer": "Its owned HTTP application allow/deny, fault/restore and cleanup behavior.",
        "explanation": "It does not deploy seven zones, IPsec or a vendor firewall.",
        "testedConcept": "What does the actual loopback fixture prove?"
      },
      {
        "questionId": "lab-5-Q09",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "Can exhaustive tuple checks certify appliance throughput?",
        "answer": "No.",
        "explanation": "They verify this small classroom policy relation only.",
        "testedConcept": "Can exhaustive tuple checks certify appliance throughput?"
      },
      {
        "questionId": "lab-5-Q10",
        "topicId": "lab-5",
        "type": "short-answer",
        "difficulty": "Advanced",
        "question": "How do you accept the integrated recovery?",
        "answer": "Restore the exact permit and repeat original allowed/denied operations with separate identity and evidence scope.",
        "explanation": "A broad permit-any would fail the original security objective.",
        "testedConcept": "How do you accept the integrated recovery?"
      }
    ],
    "artifacts": [
      {
        "title": "Guided Network Security evidence workbook",
        "path": "labs/network-security-workbook.md"
      },
      {
        "title": "Owned loopback application boundary fixture",
        "path": "labs/network-security-loopback.py"
      }
    ]
  }
];
